<template>
    <div class="container">
      <span class="hash"><img :src="changeImage(message.coinType)" alt=""> {{message.coinType | coinChange}} {{$t('text.txn')}}：{{message.txHash}}</span>
      <div class="desc">
         <div class="left">
            <p class="min">
              <span class="label">{{$t('text.blockHeight')}}：</span>
              <span class="text">{{message.blockHeight | blockHei}}</span>
            </p>
           <p class="min">
             <span class="label">{{$t('text.txnFee')}}：</span>
             <span class="text">{{message.transactionFee}}&nbsp;{{message.coinType | danWei | coinChange}}</span>
           </p>
         </div>
        <span class="space"></span>
        <div class="right">
          <p class="min">
            <span class="label">{{$t('text.txnAmount')}}：</span>
            <span class="text">{{message.totalIncome}}&nbsp;{{message.coinType | coinChange}}</span>
          </p>
          <p class="min">
            <span class="label">{{$t('text.confirmStatus')}}：</span>
            <span class="text"><li :class="crColor(message.confirmNum)">{{message.confirmNum | confirms2}}</li><li class="tt">{{message.confirmNum | confirms}}</li></span>
          </p>
        </div>
        <div class="click">
          <span class="detail" @click="txnDetail(message.coinType,message.txHash)">{{$t('text.seeDetails')}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "txnMin",
      data:function(){
        vm = this;
        return {

        }
      },
      props:{
        message:Object
      },
      methods:{
        //根据币种不同动态加载对应币种的图片
        changeImage:function(value){
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
        //点击查看详情跳转到交易详情页
        txnDetail:function(coinType,key){
          let that = this;
          //console.log("1111")
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"txn",key:key}})
        },
        //根据状态的值的不同显示不同的颜色
        crColor:function(val){
          if(val > 0){
            return 'confirms'
          }else if(val == 0){
            return 'out'
          }else if(val == -1){
            return 'whi'
          }
        }
      },
      filters:{
        //快高度为null的时候显示-
        blockHei:function(value){
          if(value == null){
            return "一"
          }else {
            return value
          }
        },
        //交易费的单位 usdt时为btc
        danWei:function(value){
          if(value == "USDT"){
            return "BTC"
          }else {
            return value
          }
        },
        //状态码大于0时显示数值，小于0时不显示
        confirms:function(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else{
            return ""
          }
        },
        // >0为value， 0=未确认，-1=无效
        confirms2:function(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        //将bchsv转化为bsv
        coinChange:function(val){
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
 .container{
   width: 100%;
   background: #24262C;
   border-radius: 2px;
   display: flex;
   flex-direction: column;
   margin-bottom: 4rem;
 }
  .hash{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.875rem 1rem;
    font-family: PingFangSC-Medium,sans-serif;
    font-size: 1rem;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .hash img{
    height: 1.25rem;
    width: 1.25rem;
    margin-right: 0.5rem;
  }
  .desc{
    width: 100%;
    display: flex;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .left,.right{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .space{
    width: 2.5rem;
    height: 100%;
  }
  .min{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .left .min:first-child{
    border-bottom: 1px solid #1A1C20;
  }
 .right .min:first-child{
   border-bottom: 1px solid #1A1C20;
 }
  .label{
    /*font-family: PingFangSC-Regular,sans-serif;*/
    font-size: 1rem;
    color: #999999;
    width: 8.25rem;
  }
  .text{
    /*font-family: PingFangSC-Regular,sans-serif;*/
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .out{
    color: #ED1835;
  }
  li{
    list-style: none;
  }
  .confirms{
    color: #FFB700;
  }
 .whi{
   color: #FFFFFF !important;
 }
 .detail{
   background: #24262C;
   border: 1px solid #FFFFFF;
   border-radius: 2px;
   width: 5rem;
   height: 1.75rem;
   display: flex;
   justify-content: center;
   align-items: center;
   /*font-family: PingFangSC-Regular;*/
   font-size: 0.875rem;
   color: #FFFFFF;
   margin-bottom: 18px;
   cursor: pointer;
 }
 .detail:hover{
   border: 1px solid #00A0E9;
   color: #00A0E9;
 }
 .click{
   display: flex;
   align-items: flex-end;
   margin-left: 5.5rem;
   margin-right: 1rem;
 }
  .tt{
    color: #666666 !important;
  }
</style>
