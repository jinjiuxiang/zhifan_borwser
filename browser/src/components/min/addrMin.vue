<template>
    <div class="container">
      <span class="hash"><img :src="changeImage(message.coinType)" alt=""> {{message.coinType | coinChange}} {{$t('text.address')}}：{{message.addressHash}}</span>
      <div class="desc">
         <div class="left">
            <p class="min">
              <span class="label">{{$t('text.balance')}}：</span>
              <span class="text">{{message.balance}}&nbsp;{{message.coinType | coinChange}}</span>
            </p>
           <p class="min">
             <span class="label">{{$t('text.txnCNum')}}：</span>
             <span class="text">{{message.totalTxNum}}</span>
           </p>
         </div>
        <span class="space"></span>
        <div class="right">
          <p class="min">
            <span class="label">{{$t('text.firstTxn')}}：</span>
            <span class="text"><li :class="addORReduce(message.firstTx)">{{message.firstTx | filterNum}} {{message.coinType | coinChange}}</li>&nbsp;&nbsp;<li>{{message.firstTxTime | timeFilter}}</li></span>
          </p>
          <p class="min">
            <span class="label">{{$t('text.recentTxn')}}：</span>
            <span class="text"><li :class="addORReduce(message.lastTx)">{{message.lastTx | filterNum}} {{message.coinType | coinChange}}</li>&nbsp;&nbsp;<li>{{message.lastTxTime | timeFilter}}</li></span>
          </p>
        </div>
        <div class="click">
          <span class="detail" @click="addrDetail(message.coinType,message.addressHash)">{{$t('text.seeDetails')}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "addrMin",
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
        //数值大于0绿色，数值小于0红色
        addORReduce:function(value){
          if(value > 0){
            return 'in'
          }else {
            return 'out'
          }
        },
        //点击查看详情跳转地址详情页
        addrDetail:function(coinType,key){
          let that = this;
          //console.log("1111")
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"address",key:key},query:{pageNum:1,channelid:that.$route.query.channelId}})
        },
        //
      },
      filters:{
        //数值大于0前面添加+号
        filterNum:function(value){
          if(value > 0){
            return "+" + value
          }else {
            return value
          }
        },
        //将时间戳转化为传统时间格式
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
        //将BCHSV转化成BSV
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
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
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
    box-sizing: border-box;
    padding: 0 1rem;
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
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    color: #999999;
    width: 8.25rem;
  }
  .text{
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
  }
  .in{
    color: #0CF5C0;
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
</style>
