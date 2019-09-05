<template>
 <div class="container">
    <!--title-->
   <div class="title">
     <span class="titleCoin"><img src="./../../../static/img/usdt.jpg" alt="">USDT {{$t('text.address')}}：</span>
     <span class="TitleHash">{{hashText}}
     <el-tooltip class="item" style="display: inline-flex;vertical-align:bottom;margin-left: 0.75rem" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
       <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img style="width: 14px;height: 100%" src="./../../assets/copy.png" alt=""></div>
     </el-tooltip>
     </span>
   </div>
   <!--desc-->
   <div class="desc">
     <p class="descMin">
       <span class="descLabel">{{$t('text.balance')}}</span>
       <span class="descText">{{message.balance}} USDT</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnCNum')}}</span>
       <span class="descText">{{message.totalTxn}}</span>
     </p>
     <p class="descMin txB">
       <span class="descLabel">{{$t('text.firstTxn')}}</span>
       <span class="descText tx"><li :class="colorChange(message.firstTxnValue)">{{message.firstTxnValue|numFilter}} USDT</li><li class="time">{{message.firstTxnTime}}</li></span>
     </p>
     <p class="descMin txB">
       <span class="descLabel">{{$t('text.recentTxn')}}</span>
       <span class="descText tx"><li :class="colorChange(message.lastTxnValue)">{{message.lastTxnValue|numFilter}} USDT</li><li class="time">{{message.lastTxnTime}}</li></span>
     </p>
   </div>
   <!--txn-->
   <div class="txn">
     <span class="txnTitle">{{$t('text.txnRecord')}}</span>
     <div class="txnMin" v-show="message.record2sVo.length >0" v-for="site in message.record2sVo">
       <p class="txnHead">
         <span class="txnLabel">{{$t('text.txnHash')}}</span>
         <span class="txnText txnHash" @click="blockTxnClick(site.txHash)">{{site.txHash}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.time')}}</span>
         <span class="txnText">{{site.blockTime}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.inOrOut')}}（USDT）</span>
         <span class="txnText" :class="colorChange(site.receivedStr)">{{site.receivedStr | numFilter}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.balance')}}</span>
         <span class="txnText">{{site.balanceStr}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.txnType')}}</span>
         <span class="txnText">{{site.type}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.confirmStatus')}}</span>
         <span class="txnText"><li :class="crColor(site.confirms)">{{site.confirms |confirms}}</li><li class="uc">{{site.confirms |confirms2}}</li></span>
       </p>
     </div>
     <div class="noList" v-show="message.record2sVo.length ==0">
       <img src="./../../assets/no.png" alt="">
       <span>{{$t('text.noTxnRecord')}}</span>
     </div>
   </div>
   <!--page-->
   <div class="page" v-show="message.record2sVo.length >0">
     <el-pagination
       background
       layout="pager"
       :pager-count="5"
       :page-size="20"
       @current-change="handleCurrentChange"
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
        //数值大于0绿色，小于0红色
        colorChange(value){
          if(value > 0){
            return "input"
          }else {
            return "out"
          }
        },
        //点击分页
        handleCurrentChange(val) {
          let that = this;
          that.$emit('bchAddressPageChange',{page:val-1,scrollTop:that.scrollTop})
        },
        //点击交易hash
        blockTxnClick(val){
          let that = this;
          that.$emit('blockTxnClick',val)
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
        //数值大于0加+
        numFilter(value){
          if(value > 0){
            return "+" + value
          }else {
            return value
          }
        },
        //0=未确认，-1=无效
        confirms(value){
          if(value > 0){
            return value ;
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
      },
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
    color: #ED1835 !important;
  }
  .erHash{
    font-size: 12px;
    word-break: break-all;
    text-align: right;
  }
  /**/
  .txn{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2.5rem 0.75rem;
  }
  .txnTitle{
    font-family: PingFangSC-Medium;
    font-size: 1rem;
    color: #999999;
  }
  .txnMin{
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.75rem;
    background: #24262C;
    margin-top: 1rem;
  }
  .txnLabel{
    padding-right: 1.75rem;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
  }
  .txnText{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    display: flex;
    align-items: flex-end;
  }
  .txnHead{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 0.875rem 0;
    border-bottom: 1px solid #1A1C20 ;
    margin-bottom: 1.5rem;
  }
  .txnBody{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }
  .txnBody:last-child{
    margin-bottom: 1.5rem;
  }
  .txnHash{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #00A0E9;
    word-break: break-all;
    text-align: right;
  }
  .input{
    color: #0CF5C0;
  }
  .outPut{
    color: #ED1835;
  }
  .page{
    text-align: center;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .time{
    font-size: 0.75rem;
    vertical-align: bottom;
    display: flex;
    align-items: flex-end;
    padding-bottom: 1px;
  }
  .addr{
    font-size: 0.75rem;
  }
  .tx{
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    justify-content: center;
    box-sizing: border-box;
  }
  .txB{
    height: 56px !important;
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
  .uc{
    color: #666666;
  }
  .noList{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .noList img{
    width: 80px;
    margin-top: 40px;
  }
  .noList span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 16px;
  }
</style>
