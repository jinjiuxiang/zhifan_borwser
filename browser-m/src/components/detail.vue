<template>
    <div class="container" @click="headerHide">
      <!--头部输入框-->
      <headerVue v-on:childByValue="childByValue" v-on:childByValue2="childByValue2" ref="headerClick" @click.stop></headerVue>
      <div class="detail" :style="{minHeight:minHei + 'px'}">
        <!--btc区块详情页-->
        <BTC_block v-if="finalData.coinType != 'USDT'&& finalData.dataType =='block'" :message="finalData" v-on:blockTxnClick="blockTxnClick" v-on:blockClick="blockClick" v-on:btcBlockPageChange="btcBlockPageChange"></BTC_block>
        <!--usdt区块详情页-->
        <USDT_block v-if="finalData.coinType =='USDT'&& finalData.dataType =='block'" :message="finalData" v-on:btcBlockPageChange="btcBlockPageChange" v-on:blockTxnClick="blockTxnClick" v-on:blockClick="blockClick"></USDT_block>
        <!--btc地址详情页-->
        <BTC_address v-if="finalData.coinType != 'USDT'&&finalData.coinType != 'BCH'&&finalData.coinType != 'BCHSV' && finalData.dataType == 'address'" :message="finalData" v-on:bchAddressPageChange="bchAddressPageChange" v-on:blockTxnClick="blockTxnClick"></BTC_address>
        <!--bch地址详情页-->
        <BCH_address v-if="finalData.coinType != 'USDT'&&(finalData.coinType == 'BCH' || finalData.coinType == 'BCHSV') && finalData.dataType =='address'" :message="finalData" v-on:bchAddressPageChange="bchAddressPageChange" v-on:blockTxnClick="blockTxnClick"></BCH_address>
        <!--usdt地址详情页-->
        <USDT_address v-if="finalData.coinType =='USDT'&& finalData.dataType =='address'" :message="finalData" v-on:bchAddressPageChange="bchAddressPageChange" v-on:blockTxnClick="blockTxnClick"></USDT_address>
        <!--btc交易详情页-->
        <BTC_txn v-if="finalData.coinType != 'USDT'&&finalData.dataType =='txn'" :message="finalData" v-on:txnAddressClick="txnAddressClick" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_txn>
        <!--usdt交易详情页-->
        <USDT_txn v-if="finalData.coinType =='USDT'&& finalData.dataType =='txn'" :message="finalData" v-on:txnAddressClick="txnAddressClick"></USDT_txn>
      </div>
      <!--免责声明-->
      <footerVue></footerVue>
    </div>
</template>

<script>
    import BTC_block from './pages/BTC-block'
    import USDT_block from './pages/USDT-block'
    import BTC_address from './pages/BTC-address'
    import BCH_address from './pages/BCH-address'
    import USDT_address from './pages/USDT-address'
    import BTC_txn from './pages/BTC-txn'
    import USDT_txn from './pages/USDT-txn'
    import headerVue from './public/header'
    import footerVue from './public/footerVue'
    var vm;
    export default {
      name: "detail",
      components:{
        BTC_block,USDT_block,BTC_address,BCH_address,USDT_address,BTC_txn,USDT_txn,headerVue,footerVue
      },
      data(){
        vm = this;
        return {
          minHeight:0,
          params:this.$route.params,
          finalData:{},
        }
      },
      methods:{
        //单币种选择
        childByValue:function (childValue) {
          //console.log(childValue);
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:this.$route.query})
          window.location.reload()
        },
        //全币种选择
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
        },
        //根据输入内容的类型不同调取不同的方法
        getFinalData(dataType,key){
          let that = this;
          if(dataType == 'block'){
            console.log('block');
            that.getBlockData(key,0);
          }else if(dataType == 'txn'){
            console.log("txn");
            that.getTxnData(key)
          }else if(dataType == 'address'){
            console.log("address");
            that.getAddressData(key,0)
          }
        },
        //获取区块数据
        getBlockData(id,page){
          const that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              pageSize:20,
              pageNumber:page,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              pageSize:20,
              pageNumber:page,
              channelId:channelid
            }
          }
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
              //window.location.href = "http://10.0.0.38:8081/nosec"
              //window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/block",
            params:data
          }).then(function (res) {
            console.log(res);
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              that.finalData = res.data.data;
              document.title=res.data.data.coinType+" "+vm.$t('text.titleBlock') + " #"+res.data.data.id+"-"+vm.$t('text.blockTitle');
              that.Cookies.set('preCoinType',data.coinType);
              that.Cookies.set('preDataType',that.params.dataType);
              that.Cookies.set('preKey',that.params.key);
              window.scrollTo(0,0)
            }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch"})
            }
          })
        },
        //点击区块中交易
        blockTxnClick(value){
          let that = this;
          that.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:that.$route.query});
          window.location.reload()
        },
        //点击前一区块/或后一区块
        blockClick(value){
          let that = this;
          that.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'block',key:value},query:that.$route.query});
          window.location.reload()
        },
        //区块中分页
        btcBlockPageChange(msg){
          const that = this;
          that.getBlockData(that.params.key,msg.page,msg.scrollTop);

        },
        //获取交易信息
        getTxnData(id){
          let that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              channelId:channelid
            }
          }
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
              // window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/txn",
            params:data
          }).then(function (res) {
            //console.log(res);
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              that.finalData = res.data.data;
              console.log(that.finalData);
              document.title=res.data.data.coinType+ " " +vm.$t('text.titleTxn') + " "+res.data.data.hash+"-"+vm.$t('text.blockTitle');
              that.Cookies.set('preCoinType',data.coinType)
              that.Cookies.set('preDataType',that.params.dataType)
              that.Cookies.set('preKey',that.params.key)
            }
            if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch"})
            }
          })
        },
        //点击地址哈希
        txnAddressClick(value){
          let that = this;
          this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'address',key:value},query:that.$route.query})
          window.location.reload()
        },
        //获取地址信息
        getAddressData(id,page){
          let that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              pageSize:20,
              pageNumber:page,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              pageSize:20,
              pageNumber:page,
              channelId:channelid
            }
          }
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
              //window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/address",
            params:data
          }).then(function (res) {
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length !=0){
              that.finalData = res.data.data;
              console.log(that.finalData);
              if(res.data.data.coinType == "BCH"){
                document.title=res.data.data.coinType+ " " +vm.$t('text.titleAddress') + " "+res.data.data.cashAddr+"-"+vm.$t('text.blockTitle');

              }else {
                document.title=res.data.data.coinType+ " " +vm.$t('text.titleAddress') + " "+res.data.data.hash+"-"+vm.$t('text.blockTitle');

              }
              that.Cookies.set('preCoinType',data.coinType)
              that.Cookies.set('preDataType',that.params.dataType)
              that.Cookies.set('preKey',that.params.key)
              window.scrollTo(0,0)
            }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch"})
            }
          }).catch(err =>{
            that.$message.error(err.error)
            //console.log(err);

          })
        },
        //地址中分页
        bchAddressPageChange(msg){
          const that = this;
          that.getAddressData(that.params.key,msg.page,msg.scrollTop);
        },
        //点击前一交易和后一交易
        btcTxnBeforeOrNextClick(value){
          const that = this;
          this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:that.$route.query})
          window.location.reload();
        },
        //首页隐藏
        headerHide(){
          let that = this;
          that.$refs.headerClick.hideClick()
        }
      },
      mounted(){
        let that = this;
        window.onpopstate = () =>{
          window.location.reload()
        }
        that.minHeight = $(window).height() - 158;
        that.Cookies.set("zf_channelId",JSON.stringify(that.$route.query));
        that.getFinalData(that.params.dataType,that.params.key);
        that.Cookies.set('pageNow','detail');

      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #191a1d;

  }
  .detail{
    width: 100%;
  }

</style>
