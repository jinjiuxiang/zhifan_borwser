<template>
 <div class="container">
    <!--title-->
   <div class="title">
     <span class="titleCoin"><img src="./../../../static/img/usdt.jpg" alt="">USDT {{$t('text.txn')}}：</span>
     <span class="TitleHash">{{hashText}}
     <el-tooltip class="item" style="display: inline-flex;vertical-align:bottom;margin-left: 0.75rem" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
       <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img style="width: 14px;height: 100%" src="./../../assets/copy.png" alt=""></div>
     </el-tooltip>
     </span>
   </div>
   <!--desc-->
   <div class="desc">
     <p class="descMin">
       <span class="descLabel">{{$t('text.confirmStatus')}}</span>
       <span class="descText"><li :class="crColor(message.confirms)">{{message.confirms|confirms}}</li><li class="uc">{{message.confirms|confirms2}}</li></span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockTime')}}</span>
       <span class="descText">{{message.time | timeFilter}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockHeight')}}</span>
       <span class="descText">{{message.blockHeight |esitIf}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnFee')}}</span>
       <span class="descText">{{message.fee}} BTC</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnAmount')}}</span>
       <span class="descText">{{message.amount}} USDT</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnType')}}</span>
       <span class="descText">{{message.typeStr}}</span>
     </p>
   </div>
   <!--txn-->
   <div class="txn">
      <div class="inputBox">
        <p class="txnHead inputHead">
          <span class="inputNum">{{$t("text.input")}}（1）</span>
        </p>
        <p class="txnBody">
           <span class="txnBodyMin">
             <li class="txnHash" @click="txnAddressClick(message.fromAddress)">{{message.fromAddress}}</li>
             <li class="outPut">{{message.amount | completeNum}}</li>
           </span>
        </p>
      </div>
     <!---->
     <div class="space">
       <img src="./../../assets/fei.svg" alt="">
     </div>
     <!---->
      <div class="outputBox">
        <p class="txnHead outputHead">
          <span class="inputNum">{{$t("text.output")}}（1）</span>
        </p>
        <p class="txnBody">
           <span class="txnBodyMin">
             <li class="txnHash" v-show="message.toAddress != null && message.toAddress != ''" @click="txnAddressClick(message.toAddress)">{{message.toAddress}}</li>
             <li class="txnHash" v-show="message.toAddress == null || message.toAddress == ''">{{message.typeStr}}</li>
             <li class="input">{{message.amount | completeNum}}</li>
           </span>
        </p>
      </div>
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
      data(){
        vm = this;
        return {
          hashText:this.message.hash,
          disabled:false,
        }
      },
      methods:{
        //复制成功
        handleSuccess(e) {
          //console.log(e);
          let that = this;
          that.disabled = true;
          setTimeout(() => {
            that.disabled = false;
          }, 1000)
        },
        //复制失败
        handleError(e) {

        },
        //地址信息点击
        txnAddressClick(val){
          let that = this;
          that.$emit('txnAddressClick',val)
        },
        //不同状态不同颜色
        crColor(val){
          if(val > 0){
            return 'staNum'
          }else if(val == 0){
            return 'reduce'
          }else if(val == -1){
            return 'whi'
          }
        }
      },
      filters:{
        //是否确认
        confirms(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        //次确认/不显示
        confirms2(value){
          if(value > 0){
            return vm.$t('text.checkNum');
          }else {
            return ""
          }
        },
        //时间戳转化为传统时间
        timeFilter(value){
          if(value == null){
            return '一'
          }else {
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
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
          }
        },
        //获取长度
        getLength(value){
          if(value == null){
            return 0;
          }else {
            return value.length
          }
        },
        //大小处理
        sizeChange(value){
          return value / 1000;
        },
        //前一区块是否存在
        preBlock(value){
          if(value == "null" || value == null || value == ""){
            return '一'
          }else {
            return value
          }
        },
        //版本处理
        decimalChange([coinType,value]){
          if(coinType == 'LTC'){
            return value
          }else {
            return'0x' +value.toString(16);
          }
        },
        //判断是否为null
        esitIf(value){
          if(value == null){
            return '一'
          }else {
            return value
          }
        },
        //输入输出数字补全
        completeNum(value){
          return parseFloat(value).toFixed(8)
        },
      },
      mounted(){
        let that = this;
      }
    }
</script>

<style scoped>
  li{
    list-style: none;
  }
 .container{
   width: 100%;
   background: #191a1d;
 }
  /**/
  .title{
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 1.25rem 1rem 1.5rem 1rem;
    align-items: flex-start;
    /*background: pink;*/
  }
  .titleCoin{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .titleCoin img{
    width: 1.25rem;
    margin-right: 0.5rem;
  }
  .TitleHash{
    flex: 1;
    word-break: break-word;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    vertical-align: middle;
    line-height: 21px;
  }
  /**/
  .desc{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 0.75rem;
  }
  .descMin{
    width: 100%;
    display: flex;
    height: 2.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #24262C;
    align-items: center;
  }
  .descMin:nth-child(1){
    border-top: 1px solid #24262C;
  }
  .descLabel{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #999999;
    padding-right: 1rem;
  }
  .descText{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .goBtn,.goBtn2{
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 1rem;
  }
  .goBtn{
    background-image: url("./../../assets/before.png");
    background-size: 100% 100%;
  }
  .goBtn2{
    background-image: url("./../../assets/after.png");
    background-size: 100% 100%;
  }
  .height{
    color: #00A0E9;
  }
  .confirms{
    color: #FFB700;
  }
  .conPri{
    color: #2A2A2A;
  }
  .out{
    color: #ED1835;
  }
  .erHash{
    font-size: 12px;
    word-break: break-all;
    text-align: right;
  }
  /**/
  /**/
  .input{
    color: #0CF5C0;
  }
  .outPut{
    color: #ED1835;
  }
  .page{
    text-align: center;
    box-sizing: border-box;
    padding: 2rem 0;
  }
  .time{
    font-size: 0.75rem;
    vertical-align: bottom;
    display: flex;
    align-items: flex-end;
    padding-bottom: 1px;
  }
  /**/
  .txn{
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.75rem;
    margin-top: 2.5rem;
  }
  .inputBox,.outputBox{
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    background: #24262C;
    border-radius: 2px;
  }
  .outputBox{

  }
  .txnHead{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.8125rem;
    padding: 0 1rem;
    border-bottom: 1px solid #1A1C20;
  }
  .inputNum{
    font-family: PingFangSC-Medium;
    font-size: 0.875rem;
    color: #999999;
  }
  .all{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .all img{
    margin-left: 0.5rem;
    width: 0.75rem;
  }
  .txnBody{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1.875rem 1rem;
  }
  .txnBodyMin{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .txnBodyMin:last-child{
    margin-bottom: 0rem;
  }
  .txnHash{
    width: 55%;
    color: #00A0E9;
    word-break: break-all;
  }
  .space{
    width: 100%;
    height: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inputHead2{
    position: fixed;
    top: 0;
    background: #24262C;
    left: 0.75rem;
    right: 0.75rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.8125rem;
    padding: 0 1rem;
    border-bottom: 1px solid #1A1C20;
  }
  .uc{
    color: #666666 !important;
  }
  .reduce{
    color: #ED1835 !important;
  }
  .whi{
    color: #FFFFFF !important;
  }
  .staNum{
    color: #FFB700 ;
  }
</style>
