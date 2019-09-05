<template>
    <div class="container">
      <div class="head">
        <span class="logo">
          <img :src="changeImage(message.coinType)" alt="">&nbsp;&nbsp;{{message.coinType | coinChange}}
        </span>
        <p class="min">
          <span class="label">{{$t('text.blockHsh')}}：</span>
          <span class="text hash">{{message.blockHash}}</span>
        </p>
      </div>
      <div class="body">
        <p class="min">
          <span class="label">{{$t('text.blockHeight')}}</span>
          <span class="text">{{message.blockHeight}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.numTxn')}}</span>
          <span class="text">{{message.totalTxNum}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.output')}}</span>
          <span class="text">{{message.totalOutput}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p class="min">
          <span class="label">{{$t('text.blockTime')}}</span>
          <span class="text">{{message.blockTime | timeFilter}}</span>
        </p>
        <p class="detail">
          <span @click="blockDetail(message.coinType,message.blockHeight)">{{$t('text.seeDetails')}}</span>
        </p>
      </div>
    </div>
</template>

<script>
    export default {
      name: "blockMin",
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
        //查看区块详情
        blockDetail(coinType,key){
          let that = this;
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"block",key:key}})
        },
      },
      filters:{
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
          return y + '.' + m + '.' + d+' '+h+':'+minute+':'+second;
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
    text-align: right;
  }
  .hash{
    font-size: 0.75rem;
    word-break: break-all;
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
</style>
