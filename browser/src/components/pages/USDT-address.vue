<template>
  <div class="container">
    <!---->
    <div class="title">
      <img src="./../../../static/img/usdt.jpg" alt="">
      <span>USDT&nbsp;{{$t('text.address')}}：</span>
      <span>{{hashText}}</span>
      <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
        <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
      </el-tooltip>
    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.balance')}}</span>
          <span class="info">{{message.balance}} USDT</span>
        </p>
        <p>
          <span class="label">{{$t('text.firstTxn')}}</span>
          <span class="info"><span :class="colorChange(message.firstTxnValue)">{{message.firstTxnValue | numFilter}} USDT&nbsp;&nbsp;</span>{{message.firstTxnTime}}</span>
        </p>
        <!--<p>-->
          <!--<span class="label">{{$t('text.totalSend')}}</span>-->
          <!--<span class="info">{{message.totalSend}}  USDT</span>-->
        <!--</p>-->
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.txnCNum')}}</span>
          <span class="info">{{message.totalTxn}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.recentTxn')}}</span>
          <span class="info"><span :class="colorChange(message.lastTxnValue)">{{message.lastTxnValue| numFilter}} USDT&nbsp;&nbsp;</span>{{message.lastTxnTime}}</span>
        </p>
        <!--<p>-->
          <!--<span class="label">{{$t('text.total')}}</span>-->
          <!--<span class="info">{{message.totalReceived}} USDT</span>-->
        <!--</p>-->
      </div>
      <img :src="Config.baseUrl + '/api/qrcode/addressQrode?address='+message.hash+'&coinType='+message.coinType.toLowerCase()" target="_blank" alt="">
    </div>
    <!---->
    <div class="txn">
      <span class="txTitle">{{$t('text.txnRecord')}}</span>
      <div class="txHeader">
        <span class="txHash">{{$t('text.txnHash')}}</span>
        <span class="txStatus">{{$t('text.confirmStatus')}}</span>
        <span class="txSend">{{$t('text.inOrOut')}}（USDT）</span>
        <span class="txInput">{{$t('text.txnType')}}</span>
        <span class="txBal">{{$t('text.balance')}}（USDT）</span>
        <span class="txTime">{{$t('text.time')}}</span>
        <span class="txSet"></span>
      </div>
      <div class="adrMin" v-for="(site,index) in message.record2sVo">
        <div class="adrMinTop">
          <p class="txHash">
            <span>
                <a :href="tp+'/'+message.coinType.toLowerCase()+'/txn/'+site.txHash + '?pageNum=1'" target="_blank" @click.prevent="btcBlockTxnChange(site.txHash)">{{site.txHash}}</a>
              </span>
          </p>
          <p class="txStatus"><span :class="crColor(site.confirms)">{{site.confirms |confirms2}}</span>{{site.confirms |confirms}}</p>
          <p class="txSend" :class="colorChange(site.receivedStr)">{{site.receivedStr | numFilter}}</p>
          <p class="txInput">{{site.type}}</p>
          <p class="txBal">{{site.balanceStr}}</p>
          <p class="txTime">{{site.blockTime}}</p>
          <p class="txSet">
            <span>
              <li class="down pd" deg="90" @click="pullDown($event,index,site.txHash)"></li>
              <!--<li class="path" @click="btcBlockTxnChange(site.txHash)"></li>-->
            </span>
          </p>
        </div>
        <div class="hideBox" v-if="txnIndex == index +1" v-loading="loadIndex == index +1" element-loading-text="加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
          <div>
            <span class="minHash">
              <a :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+txnData.fromAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(txnData.fromAddress)">{{txnData.fromAddress}}</a>
            </span>
            <span class="minValue">{{txnData.amount |completeNum}}</span>
          </div>
          <span class="space"><img src="./../../assets/tr.png" alt=""></span>
          <div>
            <span class="minHash">
              <!--<span v-show="txnData.toAddress != null && txnData.toAddress != ''" class="tt" @click="btcTxnAddressChange(txnData.toAddress)">{{txnData.toAddress}}</span>-->
              <a v-show="txnData.toAddress != null && txnData.toAddress != ''" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+txnData.toAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(txnData.toAddress)">{{txnData.toAddress}}</a>
              <span v-show="txnData.toAddress == null || txnData.toAddress == ''" class="tt" style="cursor: default">{{txnData.typeStr}}</span></span>
            <span class="minValue2">{{txnData.amount | completeNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="pageBox">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="100"
        :current-page.sync="currentPage1"
        :total="message.totalTxn">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    var vm;
    export default {
      name: "BTC-address",
      props:{
        message:Object
      },
      data:function(){
        vm = this;
        return {
          hashText:this.message.hash,
          disabled:false,
          txnIndex:0,
          params:this.$route.params,
          txnData:{},
          outputInfos:[],
          inputVos:[],
          loadIndex:0,
          tp:window.location.protocol+'//'+window.location.host,
          currentPage1:1,
        }
        //data end
      },
      methods:{
        //复制成功
        handleSuccess:function(e) {
          //console.log(e);
          let that = this;
          that.disabled = true;
          setTimeout(() => {
            that.disabled = false;
          }, 1000)
        },
        //复制失败
        handleError:function(e) {

        },
        //大于0绿色，小于0红色
        colorChange:function(value){
          if(value > 0){
            return "add"
          }else {
            return "reduce"
          }
        },
        //点击下拉
        pullDown:function($event,index,txn){
          let that = this;
          let deg = $($event.currentTarget).attr("deg");
          $(".pd").removeClass("down2").addClass("down");
          console.log(window.location.host);
          that.getTxnData(txn)
          if(deg == "90"){
            that.txnIndex = index +1;
            that.loadIndex = index +1;
            that.txnData = {};
            $($event.currentTarget).removeClass("down").addClass("down2");
            $(".pd").attr("deg","90");
            $($event.currentTarget).attr("deg","0");
          }else {
            $($event.currentTarget).attr("deg","90");
            $($event.currentTarget).removeClass("down2").addClass("down");
            that.txnIndex = 0;
            that.loadIndex = 0;
          }
        },
        //获取交易信息
        getTxnData:function(id){
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
              that.$router.push({name:"noSec"})
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
              that.txnData = res.data.data;
              that.loadIndex =0;
            }
          })
        },
        //点击地址信息
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          that.$emit("btcTxnAddressChange",addressInfo)
        },
        //跳转到交易
        btcBlockTxnChange:function(txnInfo){
          let that = this;
          that.$emit("btcBlockTxnChange",txnInfo)
        },
        //分页
        handleCurrentChange:function(val) {
          const that = this;
          that.$emit('btcAddressPageChange',val-1);
          that.removeDown()
        },
        //去除下拉框
        removeDown:function(){
          let that = this;
          $(".pd").removeClass("down2").addClass("down");
          that.txnIndex = 0;
        },
        //不同状态不同颜色
        crColor:function(val){
          if(val > 0){
            return 'staNum'
          }else if(val == 0){
            return 'reduce'
          }else if(val == -1){
            return 'whi'
          }
        }
        //methods end
      },
      filters:{
        //字符串截取
        txHashChange:function(value){
          const str1 = value.slice(0,8);
          const str2 = value.slice(value.length -8,value.length)
          return str1 + "......" + str2
        },
        //大于0添加+
        numFilter:function(value){
          if(value > 0){
            return "+" + value
          }else {
            return value
          }
        },
        //次确认/不显示
        confirms:function(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else{
            return ""
          }
        },
        //0=未确认，-1=无效
        confirms2:function(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        //输入输出数字补全
        completeNum:function(value){
          return parseFloat(value).toFixed(8)
        },
      },
      mounted:function(){
        let that = this;
        that.currentPage1 = parseInt(that.$route.query.pageNum)
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 2.5rem 0 2.5rem;
  }
  /**/
  .title{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .title img{
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
  .title span{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
  }
  .item img{
    height: 1.05rem!important;
    width: auto;
  }
  .el-tooltip.item{
    width: 1.05rem;
    height: 1.05rem;
    margin-left: 0.5rem;
  }
  .copyBtn{
    cursor: pointer;
  }
  /**/
  .desc{
    width: 100%;
    margin-top: 2.25rem;
    display: flex;
    align-items: flex-end;
  }
  .desc div{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .desc span{
    width: 2.5rem;
    height: 100%;
  }
  .desc div p{
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    border-bottom: 1px solid #24262C;
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    line-height: 3rem;
  }
  .desc img{
    width: 7.5rem;
    height: 7.5rem;
    margin-left: 2rem;
  }
  .label{
    width: 8.25rem!important;
    color: #999999;
  }
  .info{
    flex: 1;
    color: #FFFFFF;
  }
  /**/
  .txn{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .txTitle{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    margin-top: 4rem;
  }
  .txHeader{
    width: 100%;
    height: 3rem;
    border-top: 1px solid #24262C;
    border-bottom: 1px solid #24262C;
    margin-top: 1.5rem;
    box-sizing: border-box;
    padding: 0 1rem;
    font-size: 1rem;
    color: #999999;
    display: flex;
    align-items: center;
  }
  .txHeader span{
    display: flex;
    align-items: center;
    text-align: left;
    height: 100%;
  }
  .txHash{
    width: 13.5%;
    position: relative;
  }
  .txHash span{
    width: 7.1875rem;
    padding: 0 0.75rem;
    background: #131518;
    border-radius: 4px;
    height: 2.25rem;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    /*float: left;*/
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height: 2.25rem;
    color: #00A0E9;
  }
  .txHash span:hover{
    width: auto;
  }
  .txStatus{
    width: 14.7%;
    color: #666666;
  }
  .txSend{
    width: 17.6%;
  }
  .txInput{
    width: 16.9%;
  }
  /*.txOutput{*/
    /*width: 8.8%;*/
  /*}*/
  .txBal{
    width: 14.7%;
  }
  .txTime{
    width: 16.2%;
  }
  .txSet{
    width: 6.4%;
  }
  .adrMin{
    width: 100%;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #24262C;
  }
  .adrMinTop{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .adrMinTop p{
    display: flex;
    height: 100%;
    align-items: center;
    text-align: left;
  }
  .txSet{
    width: 7.8%;

  }
  .txSet span{
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  li{
    list-style-type: none;
  }
  .down,.path,.down2{
    width: 1rem;
    height:1rem;
  }
  .down{
    margin-right: 1.25rem;
    background-image: url("./../../assets/txRight.png");
    background-size: 50% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .down:hover{
    background-image: url("./../../assets/txRightH.png");

  }
  .down2{
    margin-right: 1.25rem;
    background-image: url("./../../assets/txDown.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .down2:hover{
    background-image: url("./../../assets/txDownH.svg");

  }
  .path{
    background-image: url("./../../assets/path.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .path:hover{
    background-image: url("./../../assets/pathH.png");

  }
  .staNum{
    color: #FFB700 ;
    height: 100%;
    line-height: 2.45rem;
  }
  .add{
    color: #0CF5C0 !important;
  }
  .reduce{
    color: #ED1835 !important;
  }
  .whi{
    color: #FFFFFF !important;
  }
  .txMinList{
    width: 100%;
    box-sizing: border-box;
    padding: 0rem 2.5rem 0 2.5rem;
    display: flex;
    font-size: 0.875rem;
    background: #24262C;
    height: 6rem;
    align-items: center;
  }
  .txMinList div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .txMinList div{
    /*margin-bottom: 0.5625rem;*/
    display: flex;
    flex-direction: column;
  }
  .txMinList span{
    width: 16.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /*padding-bottom: 0.5625rem;*/
    box-sizing: border-box;
    /*margin-top: -1rem;*/
  }
  .inputHash{
    color: #00A0E9;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .inputHash img{
    cursor: pointer;
  }
  .inputValue{
    color: #0CF5C0;
    display: flex;
    align-items: center;
  }
  .inputReduce{
    color: #ED1835;
    display: flex;
    align-items: center;
  }
  .inputMin{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    justify-content: space-between;
  }
  .all{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    justify-content: flex-end !important;
  }
  .all span{
    width: auto !important;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    text-align: right !important;
  }
  .all span:hover{
    text-decoration: underline;
  }
  .pageBox{
    width: 100%;
    margin-top: 2.5rem;
    text-align: right;
    margin-bottom: 3rem;
  }
  .hideBox{
    width: 100%;
    box-sizing: border-box;
    background: #24262C;
    display: flex;
    align-items: center;
    height: 6rem;
    padding: 0 2.5rem;
  }
  .hideBox div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
  }
  .space{
    width: 13.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .minHash{
    display: flex;
    align-items: center;
    color: #00A0E9;
  }
  .minValue{
    color: #ED1835;
  }
  .minValue2{
    color: #0CF5C0;
  }
  .tt{
    cursor: pointer;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
  @media (max-width: 1380px) {
    .txMinList span{
      width: 10.875rem;
    }
  }
</style>
