<template>
 <div class="container">
    <!--title-->
   <div class="title">
     <span class="titleCoin"><img src="./../../../static/img/usdt.jpg" alt=""> USDT {{$t('text.block')}}：</span>
     <span class="TitleHash">{{hashText}}
     <el-tooltip class="item" style="display: inline-flex;vertical-align:bottom;margin-left: 0.75rem" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
       <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img style="width: 14px;height: 100%" src="./../../assets/copy.png" alt=""></div>
     </el-tooltip>
     </span>
   </div>
   <!--desc-->
   <div class="desc">
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockHeight')}}</span>
       <span class="descText"> <li class="goBtn" v-show="message.pBlockVo.preBlockId != null" @click="blockClick(message.pBlockVo.preBlockId)"></li> <li class="goBtn2" v-show="message.pBlockVo.nextBlockId != null" @click="blockClick(message.pBlockVo.nextBlockId)"></li>&nbsp;&nbsp;&nbsp;{{message.id}}</span>
     </p>
     <p class="descMin">
        <span class="descLabel">{{$t('text.confirmStatus')}}</span>
        <span class="descText"><li :class="crColor(message.pBlockVo.confirms)">{{message.pBlockVo.confirms | confirms}}</li><li class="conPri">{{message.pBlockVo.confirms | confirms2}}</li></span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnNum')}}</span>
       <span class="descText">{{message.totalTxn}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockTime')}}</span>
       <span class="descText">{{message.pBlockVo.time|timeFilter}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.totalTxnFee')}}</span>
       <span class="descText">{{message.fee}} BTC</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.totalOutput')}}</span>
       <span class="descText">{{message.outputTotal}}&nbsp;{{message.coinType}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.version')}}</span>
       <span class="descText">{{[message.coinType,message.pBlockVo.version] | decimalChange}}</span>
     </p>
   </div>
   <!--txn-->
   <div class="txn">
     <span class="txnTitle">{{$t('text.txnRecord')}}</span>
     <div class="txnMin" v-show="message.txnInfoVoList.length >0" v-for="site in message.txnInfoVoList">
       <p class="txnHead">
         <span class="txnLabel">{{$t('text.txnHash')}}</span>
         <span class="txnText txnHash" @click="blockTxnClick(site.hash)">{{site.hash}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.txnType')}}</span>
         <span class="txnText">{{site.typeStr}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.txnFee')}}（BTC）</span>
         <span class="txnText">{{site.fee}}</span>
       </p>
       <p class="txnBody">
         <span class="txnLabel">{{$t('text.txnAmount')}}（USDT）</span>
         <span class="txnText">{{site.amount}}</span>
       </p>
     </div>
     <div class="noList" v-show="message.txnInfoVoList.length == 0">
       <img src="./../../assets/no.png" alt="">
       <span>{{$t('text.noTxnRecord')}}</span>
     </div>
   </div>
   <!--page-->
   <div class="page" v-show="message.txnInfoVoList.length >0">
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
      name: "USDT-block",
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
        //点击分页
        handleCurrentChange(val) {
          let that = this;
          that.$emit('btcBlockPageChange',{page:val-1,scrollTop:that.scrollTop})
        },
        //交易哈希点击事件
        blockTxnClick(val){
          let that = this;
          that.$emit('blockTxnClick',val)
        },
        //点击区块高度
        blockClick(val){
          let that = this;
          if(val != null){
            that.$emit('blockClick',val)
          }else {
            return false
          }
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
            return value;
          }else {
            return vm.$t('text.noCheck')
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
    color: #999999;
    /*color: #2A2A2A;*/
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
  .reduce{
    color: #ED1835 !important;
  }
  .whi{
    color: #FFFFFF !important;
  }
  .staNum{
    color: #FFB700 ;
    /*height: 100%;*/
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
