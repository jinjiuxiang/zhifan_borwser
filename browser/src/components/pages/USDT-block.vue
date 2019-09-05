<template>
    <div class="container">
      <!---->
      <div class="title">
      <div class="titleL">
        <img class="cointype" src="./../../../static/img/usdt.jpg" alt="">
        <span class="titleText">USDT&nbsp;{{$t('text.block')}}：{{message.id}}</span>
        <span class="titleBtn" v-show="message.pBlockVo.preBlockId != null" @click="getBeforeBlock(message.pBlockVo.preBlockId)"></span>
        <span class="titleBtn1" v-show="message.pBlockVo.nextBlockId != null" @click="getBeforeBlock(message.pBlockVo.nextBlockId)"></span>
      </div>
      <div class="titleR">
        <span>{{hashText}}</span>
        <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
          <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
        </el-tooltip>
      </div>
    </div>

      <!---->
      <div class="desc">
        <div>
          <p>
            <span class="label">{{$t('text.confirmStatus')}}</span>
            <span class="info"><li  :class="crColor(message.pBlockVo.confirms)">{{message.pBlockVo.confirms |confirms2}}</li><li class="tt1">{{message.pBlockVo.confirms |confirms}}</li></span>
          </p>
          <p>
            <span class="label">{{$t('text.blockTime')}}</span>
            <span class="info">{{message.pBlockVo.time|timeFilter}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.totalTxnFee')}}</span>
            <span class="info">{{message.fee}}&nbsp;BTC</span>
          </p>
        </div>
        <span></span>
        <div>
          <p>
            <span class="label">{{$t('text.txnNum')}}</span>
            <span class="info">{{message.totalTxn}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.totalOutput')}}</span>
            <span class="info">{{message.outputTotal}}&nbsp;{{message.coinType}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.version')}}</span>
            <span class="info">{{[message.coinType,message.pBlockVo.version]|decimalChange}}</span>
          </p>
        </div>
      </div>
      <!---->
      <div class="txRecord">
        <span class="txTitle">{{$t('text.txnRecord')}}</span>
        <div class="txHead" v-show="message.txnInfoVoList.length >0">
          <span class="txHash">{{$t('text.txnHash')}}</span>
          <span class="txType">{{$t('text.txnType')}}</span>
          <span class="txValue">{{$t('text.txnAmount')}}（USDT)</span>
          <span class="txFee">{{$t('text.txnFee')}}（BTC)</span>
          <span class="txBtn"></span>
        </div>
        <div class="txBox" v-show="message.txnInfoVoList.length >0" v-for="(site,index) in message.txnInfoVoList">
          <p class="headMin">
             <span class="txHash">
               <!--{{site.hash}}-->
               <a :href="tp+'/'+message.coinType.toLowerCase()+'/txn/'+site.hash + '?pageNum=1'" target="_blank" @click.prevent="btcBlockTxnChange(site.hash)">{{site.hash}}</a>
             </span>
             <span class="txType">{{site.typeStr}}</span>
             <span class="txValue">{{site.amount}}</span>
             <span class="txFee">{{site.fee}}</span>
             <span class="txBtn">
              <li class="down pd" deg="90" @click="pullDown($event,index,site.hash)"></li>
              <!--<li class="path" @click="btcBlockTxnChange(site.hash)"></li>-->
            </span>
          </p>
          <div class="hideBox" v-if="txnIndex == index +1" v-loading="loadIndex == index +1" element-loading-text="加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
              <div>
                <span class="minHash">
                  <!--<span class="tt" @click="btcTxnAddressChange(txnData.fromAddress)">{{txnData.fromAddress}}</span>-->
                  <a class="tt" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+txnData.fromAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(txnData.fromAddress)">{{txnData.fromAddress}}</a>
                </span>
                <span class="minValue">{{txnData.amount |completeNum}}</span>
              </div>
              <span class="space"><img src="./../../assets/tr.png" alt=""></span>
              <div>
                <span class="minHash">
                  <!--<span class="tt" v-show="txnData.toAddress != null && txnData.toAddress != ''" @click="btcTxnAddressChange(txnData.toAddress)">{{txnData.toAddress}}</span>-->
                  <a class="tt" v-show="txnData.toAddress != null && txnData.toAddress != ''" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+txnData.toAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(txnData.toAddress)">{{txnData.toAddress}}</a>
                  <span class="tt" v-show="txnData.toAddress == null || txnData.toAddress == ''" style="cursor: default">{{txnData.typeStr}}</span>
                </span>
                <span class="minValue2">{{txnData.amount | completeNum}}</span>
              </div>
          </div>
        </div>
        <div class="noList" v-show="message.txnInfoVoList.length == 0">
          <img src="./../../assets/no.png" alt="">
          <span>{{$t('text.noTxnRecord')}}</span>
        </div>
      </div>
      <!---->
      <div class="pageBox" v-show="message.txnInfoVoList.length >0">
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
      name: "USDT-block",
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
        //点击下拉
        pullDown:function($event,index,txn){
          let that = this;
          let deg = $($event.currentTarget).attr("deg");
          $(".pd").removeClass("down2").addClass("down");
          console.log(window.location.host);
          that.getTxnData(txn)
          if(deg == "90"){
            that.txnIndex = index +1;
            that.loadIndex = index + 1;
            $($event.currentTarget).removeClass("down").addClass("down2");
            $(".pd").attr("deg","90");
            $($event.currentTarget).attr("deg","0");
            that.txnData = {};
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
            console.log(res);
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              that.txnData = res.data.data;
              that.loadIndex = 0;
            }
          })
        },
        //分页
        handleCurrentChange:function(val) {
          const that = this;
          that.$emit('btcPageChange',val-1);
          that.removeDown()
        },
        //跳转到交易
        btcBlockTxnChange:function(txnInfo){
          let that = this;
          that.$emit("btcBlockTxnChange",txnInfo)
        },
        //跳转地址
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          if(addressInfo == null || addressInfo.indexOf(':') != -1){
            return false
          }else {
            that.$emit("btcTxnAddressChange",addressInfo)
          }
        },
        //前后区块跳转
        getBeforeBlock:function(val){
          let that = this;
          that.$emit("getBeforeBlock",val)
        },
        //去除下拉框
        removeDown:function(){
          let that = this;
          $(".pd").removeClass("down2").addClass("down");
          that.txnIndex = 0;
          that.loadIndex = 0;
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
        //时间戳转化为传统时间
        timeFilter:function(value){
          var date = new Date(value);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
        },
        //获取字符串长度
        getLength:function(value){
          if(value == null){
            return 0;
          }else {
            return value.length
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
        //版本号处理
        decimalChange:function([coinType,value]){
          if(coinType == 'LTC'){
            return value
          }else {
            return '0x' + value.toString(16);
          }
        },
        //大小处理
        sizeChange:function(value){
          return value /1000
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
    padding: 2rem 2.5rem;
    box-sizing: border-box;
    /*font-family: PingFangSC-Regular;*/

  }
  /**/
  .tt{
    cursor: pointer;
  }
  /**/
  .title{
    display: flex;
  }
  .titleL{
    display: flex;
    align-items: center;
  }
  .cointype{
    width: 1.25rem;
    height: 1.25rem;
  }
  .titleText{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    margin-left: 0.5rem;
    color: #FFFFFF;
  }
  .titleBtn{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    margin-left: 1.5rem;
    /*margin-right: 1rem;*/
    background-image: url("./../../assets/before.png");
    cursor: pointer;
    background-size: 100% 100%;
  }
  .titleBtn:hover{
    background-image: url("./../../assets/beforeh.png");

  }
  .titleBtn1{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    margin-left: 1rem;
    background-image: url("./../../assets/after.png");
    cursor: pointer;
    background-size: 100% 100%;
  }
  .titleBtn1:hover{
    background-image: url("./../../assets/afterh.png");
  }
  .titleR{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .item img{
    height: 1.05rem!important;
    width: auto;
  }
  .el-tooltip.item{
    width: 1.05rem;
    height: 1.5rem;
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
  .label{
    width: 8.25rem!important;
    color: #999999;
  }
  .info{
    flex: 1;
    color: #FFFFFF;
    display: flex;
  }
  /**/
  .txRecord{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .txTitle{
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: #FFFFFF;
  }
  .txHead{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #24262C;
    border-top: 1px solid #24262C;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #999999;
  }
  .txHash{
    width: 75.8%;
    /*min-width: 40rem;*/
  }
  .txType{
    width: 23.3%;
    /*min-width: 17rem;*/
  }
  .txValue{
    width: 20%;
    /*min-width: 14rem;*/
  }
  .txFee{
    width: 14%;
    /*min-width: 10rem;*/
  }
  .txBtn{
    flex: 1;
    min-width: 3.3125rem;
    text-align: right;
    display: flex;
  }
  .txBox{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .headMin{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    border-bottom: 1px solid #24262C;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #FFFFFF;
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
  .minPath,.minPath2{
    width:0.875rem;
    height: 0.875rem;
    background: pink;
    display: inline-flex;
  }
  .minPath{
    margin-right: 0.4rem;
    background: url("./../../assets/w.png") no-repeat center;
    cursor: pointer;
  }
  .minPath:hover{
    background: url("./../../assets/wH.png") no-repeat center;
  }
  .minPath2{
    margin-left: 0.4rem;
    background: url("./../../assets/w1.png") no-repeat center;
    cursor: pointer;
  }
  .minPath2:hover{
    background: url("./../../assets/w1H.png") no-repeat center;

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
  .pageBox{
    width: 100%;
    margin-top: 2.5rem;
    text-align: right;
    margin-bottom: 3rem;
  }
  .noList{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 9.75rem;
  }
  .noList span{
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    color: #FFFFFF;
    margin-top: 1.6875rem;
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
  .staNum{
    color: #FFB700 ;
    height: 100%;
  }
  .tt1{
    color: #666666;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
</style>
