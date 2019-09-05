<template>
  <div class="container">
    <!---->
    <div class="title">
      <img src="./../../../static/img/usdt.jpg" alt="">
      <span>USDT&nbsp;{{$t('text.txn')}}：</span>
      <span>{{hashText}}</span>
      <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
        <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
      </el-tooltip>
    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.confirmStatus')}}</span>
          <span class="info"><li :class="crColor(message.confirms)">{{message.confirms|confirms2}}</li><li class="tt">{{message.confirms|confirms}}</li></span>
        </p>
        <p>
          <span class="label">{{$t('text.blockTime')}}</span>
          <span class="info">{{message.time | timeFilter}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.txnAmount')}}</span>
          <span class="info">{{message.amount}}&nbsp;USDT</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.blockHeight')}}</span>
          <span class="info">{{message.blockHeight |esitIf}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.txnFee')}}</span>
          <span class="info">{{message.fee}}&nbsp;BTC</span>
        </p>
        <p>
          <span class="label">{{$t('text.txnType')}}</span>
          <span class="info">{{message.typeStr}}</span>
        </p>
      </div>
    </div>
    <!---->
    <div class="input">
        <div>{{$t("text.inputs")}}（1）</div>
        <span></span>
        <div>{{$t("text.outputs")}}（1）</div>
    </div>
    <!---->
    <div class="inputInfo">
       <div>
         <span class="inputHash">
           <!--<span  @click="btcTxnAddressChange(message.fromAddress)">{{message.fromAddress}}</span>-->
           <a :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+message.fromAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(message.fromAddress)">{{message.fromAddress}}</a>
         </span>
         <span class="inputReduce">{{message.amount |completeNum}}</span>
       </div>
      <span class="inputSpace"><img src="./../../assets/tr.png" alt=""></span>
      <div>
        <span class="inputHash">
          <!--<span v-show="message.toAddress != null && message.toAddress != ''" @click="btcTxnAddressChange(message.toAddress)">{{message.toAddress}}</span>-->
          <a v-show="message.toAddress != null && message.toAddress != ''" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+message.toAddress + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(message.toAddress)">{{message.toAddress}}</a>
          <span style="cursor: default" v-show="message.toAddress == null || message.toAddress == ''">{{message.typeStr}}</span></span>
        <span class="inputValue">{{message.amount | completeNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    var vm;
    export default {
      name: "USDT-txn",
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
          tp:window.location.protocol+'//'+window.location.host,
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
        //跳转地址
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          that.$emit("btcTxnAddressChange",addressInfo)
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
        }        //methods end
      },
      filters:{
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
        //时间错转化为传统时间
        timeFilter:function(value){
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
            return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
          }
        },
        //获取字符串长度
        lengthGet:function(value){
          if(value == null){
            return 0
          }else {
            return value.length
          }
        },
        //输入输出数字补全
        completeNum:function(value){
          return parseFloat(value).toFixed(8)
        },
        //判断是否为null
        esitIf:function(value){
          if(value == null){
            return '一'
          }else {
            return value
          }
        },
        //filters end
      }
    }
</script>

<style scoped>
  li{
    list-style: none;
  }
  .container{
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 2.5rem 0 2.5rem;
  }
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
  .input{
    width: 100%;
    margin-top: 5rem;
    border-top: 1px solid #24262C;
    display: flex;
    box-sizing: border-box;
    padding: 0 2.5rem;
    height: 3rem;
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    color: #999999;
  }
  .inputInfo{
    width: 100%;
    height: 13.375rem;
    display: flex;
    background: #24262C;
    box-sizing: border-box;
    padding: 0 2.5rem;
    /*font-family: PingFangSC-Regular;*/
    font-size: 14px;
  }
  .input div,.inputInfo div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .input span,.inputSpace{
    width: 16.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inputInfo span{
    display: flex;
    align-items: center;
  }
  .inputHash{
    color: #00A0E9;
    cursor: pointer;

  }
  .inputValue{
    color: #0CF5C0;
  }
  .minPath,.minPath2{
    width:0.875rem !important;
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
  .inputReduce{
    color: #ED1835;
    display: flex;
    align-items: center;
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
  .tt{
    color: #666666;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
</style>
