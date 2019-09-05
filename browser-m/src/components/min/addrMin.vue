<template>
    <div class="container">
      <div class="head">
        <span class="logo">
          <img :src="changeImage(message.coinType)" alt="">&nbsp;&nbsp;{{message.coinType | coinChange}}
        </span>
        <p class="min">
          <span class="label">{{$t('text.address')}}：</span>
          <span class="text hash">{{message.addressHash}}</span>
        </p>
      </div>
      <div class="body">
        <p class="min">
          <span class="label">{{$t('text.balance')}}</span>
          <span class="text">{{message.balance}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.txnCNum')}}</span>
          <span class="text">{{message.totalTxNum}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.firstTxn')}}</span>
          <span class="text tx"><li :class="addORReduce(message.firstTx)">{{message.firstTx | filterNum}} {{message.coinType | coinChange}}</li><li class="time">2018-08-11 09:33:01</li></span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.recentTxn')}}</span>
          <span class="text tx"><li :class="addORReduce(message.lastTx)">{{message.lastTx | filterNum}} {{message.coinType | coinChange}}</li><li class="time">2018-08-11 09:33:01</li></span>
        </p>
        <p class="detail">
          <span @click="addrDetail(message.coinType,message.addressHash)">{{$t('text.seeDetails')}}</span>
        </p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "addrMin",
      props:{
        message:Object
      },
      data(){
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
        //数值大于0绿色，小于0红色
        addORReduce(value){
          if(value > 0){
            return 'in'
          }else {
            return 'out'
          }
        },
        //查看地址详情
        addrDetail(coinType,key){
          let that = this;
          console.log("1111")
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"address",key:key}})
        },
        //
      },
      filters:{
        //数值大于0加+
        filterNum(value){
          if(value > 0){
            return "+" + value
          }else {
            return value
          }
        },
        //时间错转化为传统时间
        timeFilter(value){
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
        //bchsv转化为bsv
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
  .time{
    font-size: 0.75rem;
    vertical-align: bottom;
    display: flex;
    align-items: flex-end;
    padding-bottom: 1px;
  }
  .in{
    color: #0CF5C0;
  }
  .out{
    color: #ED1835;
  }
  .tx{
    display: flex;
    flex-direction:column;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .txB{
    height: 56px !important;
  }
</style>
