<template>
    <div class="container">
      <div class="head">
        <span class="logo">
          <img :src="changeImage(message.coinType)" alt="">&nbsp;&nbsp;{{message.coinType | coinChange}}
        </span>
        <p class="min">
          <span class="label">{{$t('text.txnHash')}}：</span>
          <span class="text hash">{{message.txHash}}</span>
        </p>
      </div>
      <div class="body">
        <p class="min">
          <span class="label">{{$t('text.blockHeight')}}</span>
          <span class="text">{{message.blockHeight | blockHei}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.txnAmount')}}</span>
          <span class="text">{{message.totalIncome}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.txnFee')}}</span>
          <span class="text">{{message.transactionFee}}&nbsp;{{message.coinType | danWei | coinChange}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.confirmStatus')}}</span>
          <span class="text"><li :class="crColor(message.confirmNum)">{{message.confirmNum | confirms2}}</li><li class="uc">{{message.confirmNum | confirms}}</li></span>
        </p>
        <p class="detail">
          <span @click="txnDetail(message.coinType,message.txHash)">{{$t('text.seeDetails')}}</span>
        </p>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "blockMin",
      props:{
        message:Object
      },
      data(){
        vm = this;
        return {

        }
      },
      methods:{
        //动态加载币种图片
        changeImage(value){
          switch (value) {
            case 'BTC':
              return "/static/img/btc.png";
              break;
            case  'BCH':
              return "/static/img/bch.jpg";
              break;
            case  'LTC':
              return "/static/img/ltc.png";
              break;
            case 'USDT':
              return "/static/img/usdt.jpg";
              break;
            case 'BCHSV':
              return "/static/img/BSV.png";
              break;
          }
        },
        //查看交易详情
        txnDetail(coinType,key){
          let that = this;
          console.log("1111")
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"txn",key:key}})
        },
        //不同状态显示不同颜色
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
        //快高度是否存在
        blockHei(value){
          if(value == null){
            return "一"
          }else {
            return value
          }
        },
        //usdt交易费单位btc
        danWei(value){
          if(value == "USDT"){
            return "BTC"
          }else {
            return value
          }
        },
        //次确认/不显示
        confirms(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else{
            return ""
          }
        },
        //0=未确认，-1=无效
        confirms2(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        //bchsv转化bsv
        coinChange(val){
          if(val == 'BCHSV'){
            return 'BSV'
          }else {
            return val
          }
        }
      }
    }
</script>

<style scoped>
  li{
    list-style: none;
  }
  .container{
    background: #24262C;
    border-radius: 2px;
    width: 100%;
    margin-bottom: 1rem;
  }
  .head{
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid  #131518;
  }
  .logo{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size:0.875rem;
    color: #FFFFFF;
    margin-bottom: 0.75rem;
  }
  .logo img{
    width: 22px;
    height: 22px;
  }
  .min{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .label{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #999999;
    min-width: 5rem;
  }
  .text{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .hash{
    font-size: 0.75rem;
    word-break: break-all;
    text-align: right;
  }
  /**/
  .body{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1rem;
  }
  .body .min{
    margin-bottom: 0.85rem;
  }
  .detail{
    width: 100%;
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #00A0E9;
  }
  .confirms{
    color: #FFB700;
  }
  .uc{
    color: #666666;
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
