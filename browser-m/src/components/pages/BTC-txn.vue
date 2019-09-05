<template>
 <div class="container">
    <!--title-->
   <div class="title">
     <span class="titleCoin"><img :src="changeImage(message.coinType)" alt="">{{message.coinType | coinChange}} {{$t('text.txn')}}：</span>
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
       <span class="descText"><li :class="crColor(message.confirms)">{{message.confirms|confirms}}</li><li class="conPri">{{message.confirms|confirms2}}</li></span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockTime')}}</span>
       <span class="descText">{{message.time | timeFilter}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.blockHeight')}}</span>
       <span class="descText">{{message.blockHeight | esitIf}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.txnFee')}}</span>
       <span class="descText">{{message.fee}}&nbsp;{{message.coinType | coinChange}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.input')}}</span>
       <span class="descText">{{message.inputTotal}}&nbsp;{{message.coinType | coinChange}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.output')}}</span>
       <span class="descText">{{message.outputTotal}}&nbsp;{{message.coinType | coinChange}}</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.size')}}</span>
       <span class="descText">{{message.size}}&nbsp;Bytes</span>
     </p>
     <p class="descMin">
       <span class="descLabel">{{$t('text.lockTime')}}</span>
       <span class="descText">{{message.lockTime | lockTimeChange}}</span>
     </p>
   </div>
   <!--txn-->
   <div class="txn">
      <div class="inputBox">
        <p class="txnHead inputHead">
          <span class="inputNum">{{$t("text.input")}}（{{message.inputVos | lengthGet}}）</span>
          <span class="all" v-show="inputLength" @click="allClick">{{$t('text.viewAll')}} <img v-show="!inputImg" src="./../../assets/down1.svg" alt=""><img v-show="inputImg" src="./../../assets/up1.svg" alt=""></span>
        </p>
        <p class="inputHead2" v-show="inputHeadShow">
          <span class="inputNum">{{$t("text.input")}}（{{message.inputVos | lengthGet}}）</span>
          <span class="all" v-show="inputLength" @click="allClick">{{$t('text.viewAll')}} <img v-show="!inputImg" src="./../../assets/down1.svg" alt=""><img v-show="inputImg" src="./../../assets/up1.svg" alt=""></span>
        </p>
        <p class="txnBody">
          <span class="txnBodyMin" v-for="site in inpuArr2" :class="btcColorChange(site.preTx,site.addressHash,site.valueStr)">
             <li class="btnBef" v-show="message.confirms!=0" @click="btcTxnBeforeOrNextClick(site.preTx,site.addressHash,site.valueStr,message.id)" ><img v-show="site.addressHash !=null && site.addressHash.indexOf(':')==-1&& message.confirms!=0 && site.preTx != null" src="./../../assets/right.svg" alt=""></li>
             <li class="txnHash"  @click="txnAddressClick(site.addressHash)">{{site.addressHash | addressHashCheck}}</li>
             <li class="outPut" v-show="site.addressHash !=null && site.addressHash.indexOf(':')==-1">{{site.valueStr | completeNum}}</li>
           </span>
            <span class="coinbase" v-show="message.inputVos == null || message.inputVos.length == 0">
              Coinbase
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
          <span class="inputNum">{{$t("text.output")}}（{{message.outputInfos | lengthGet}}）</span>
          <span class="all" v-show="outputLength" @click="allClick2">{{$t('text.viewAll')}} <img v-show="!outputImg" src="./../../assets/down1.svg" alt=""><img v-show="outputImg" src="./../../assets/up1.svg" alt=""></span>
        </p>
        <p class="inputHead2" v-show="outputHeadShow">
          <span class="inputNum">{{$t("text.output")}}（{{message.outputInfos | lengthGet}}）</span>
          <span class="all" v-show="outputLength" @click="allClick2">{{$t('text.viewAll')}} <img v-show="!outputImg" src="./../../assets/down1.svg" alt=""><img v-show="outputImg" src="./../../assets/up1.svg" alt=""></span>
        </p>
        <p class="txnBody">
          <span class="txnBodyMin" v-for="site in outputArr2" :class="btcColorChange(site.inpoint.tx,site.outptVo.addressHash,site.outptVo.valueStr)">
             <li class="txnHash"  @click="txnAddressClick(site.outptVo.addressHash)">{{site.outptVo.addressHash | addressHashCheck}}</li>
             <li class="input" v-show="site.outptVo.addressHash !=null && site.outptVo.addressHash.indexOf(':')==-1">{{site.outptVo.valueStr | completeNum}}</li>
              <li class="btnBef2" v-show="message.confirms!=0" @click="btcTxnBeforeOrNextClick(site.inpoint.tx,site.outptVo.addressHash,site.outptVo.valueStr,message.id)"><img v-show="site.outptVo.addressHash !=null && site.outptVo.addressHash.indexOf(':')==-1&& message.confirms!=0 && site.inpoint.tx != null" src="./../../assets/left.svg" alt=""></li>
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
            params:this.$route.params,
            hashText:this.message.hash,
            disabled:false,
            inpuArr2:[],
            inputImg:false,
            inputLength:false,
            inputHeight:0,
            inputHeadShow:false,
            inputHeadTop:0,

            outputArr2:[],
            outputHeadShow:false,
            outputImg:false,
            outputLength:false,
            outputHeight:0,
            outputHeadTop:0,
            outputArr:[],
            inpuArr:[]
          }
      },
      methods:{
        handleSuccess(e) {
          //console.log(e);
          let that = this;
          that.disabled = true;
          setTimeout(() => {
            that.disabled = false;
          }, 1000)
        },
        handleError(e) {

        },
        //点击全部
        allClick(){
          let that = this;
          if(that.inputImg){
            that.inpuArr2 = that.inpuArr.slice(0,4);
            that.inputHeadShow = false;
          }else {
            that.inpuArr2 = that.inpuArr;
            that.$nextTick(() =>{
              that.checkSet();
            })
          }
          that.inputImg = !that.inputImg;
        },
        //点击全部2
        allClick2(){
          let that = this;
          if(that.outputImg){
            that.outputArr2 = that.outputArr.slice(0,4);
            that.outputHeadShow = false;
          }else {
            that.outputArr2 = that.outputArr;
            that.$nextTick(() =>{
              that.checkSet2();
            })
          }
          that.outputImg = !that.outputImg;
        },
        //判断位置
        checkSet(){
          let that = this;
          that.inputHeight = $(".inputBox").height() + $(".inputHead").offset().top -50;
          that.inputHeadTop = $(".inputHead").offset().top +50;
          console.log(that.inputHeight);
          console.log(that.inputHeadTop);
        },
        //判断位置
        checkSet2(){
          let that = this;
          that.outputHeight = $(".outputBox").height() + $(".outputHead").offset().top -50;
          that.outputHeadTop = $(".outputHead").offset().top +50;
          console.log(that.outputHeight);
          console.log(that.outputHeadTop);
        },
        //获取滚动位置
        handleScroll (ev) {
          let that = this;
          ev.stopPropagation();
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          // console.log(scrollTop);
          if(that.inputImg){
            if(scrollTop > that.inputHeadTop && scrollTop < that.inputHeight){
              that.inputHeadShow = true;
            }else {
              that.inputHeadShow = false;
            }
          }
          //
          if(that.outputImg){
            if(scrollTop > that.outputHeadTop && scrollTop < that.outputHeight){
              that.outputHeadShow = true;
            }else {
              that.outputHeadShow = false;
            }
          }
        },
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
            case 'TetherUS':
              return "/static/img/usdt.jpg";
              break;
            case 'BCHSV':
              return "/static/img/BSV.png";
              break;
          }
        },
        //地址信息点击
        txnAddressClick(val){
          let that = this;
          if(val == null || val.indexOf(':') != -1){
            return false
          }else {
            that.$emit('txnAddressClick',val)
          }

        },
        //前一交易后一交易
        btcTxnBeforeOrNextClick(val,addr,num,txn){
          console.log(val);
          let that = this;
          if(val == null){
            return false
          }else {
            that.Cookies.set("zf_addr",addr);
            that.Cookies.set("zf_num",num);
            that.Cookies.set("zf_txn",txn);
            that.$emit("btcTxnBeforeOrNextClick",val)
          }
        },
        //点击过的交易的颜色变化
        btcColorChange(value,addr,num){
          console.log(value);
          console.log(addr);
          console.log(num);
          let that = this;
          if(addr == that.Cookies.get("zf_addr") && num == that.Cookies.get("zf_num") && value ==that.Cookies.get("zf_txn")){
            return "colorChange"
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
        lengthGet(value){
          if(value == null){
            return 0
          }else {
            return value.length
          }
        },
        //判断地址哈希是否合法
        addressHashCheck(value){
          if(value == null || value.indexOf(':') != -1){
            return vm.$t('text.Unable')
          }else {
            return value;
          }
        },
        //锁定时间判断
        lockTimeChange(value){
          if(value <= 0){
            return '一'
          }else if(value.toString().length == 13){
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
          }else {
            return vm.$t('text.block')+':'+value
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
        //bchsv转化为bsv
        coinChange(val){
          if(val == 'BCHSV'){
            return 'BSV'
          }else {
            return val
          }
        }
      },
      mounted(){
        let that = this;
        //判断交易列表是否大于5
        if(that.message.inputVos != null && that.message.inputVos.length > 5){
          that.inpuArr2 = that.message.inputVos.slice(0,4);
          that.inpuArr = that.message.inputVos;
          that.inputLength = true;
        }else if(that.message.inputVos != null && that.message.inputVos.length <= 5 ){
          that.inpuArr2 = that.message.inputVos;
        }else {
          that.inpuArr2 = [];
        }
        if(that.message.outputInfos.length > 5){
          that.outputArr2 = that.message.outputInfos.slice(0,4);
          that.outputArr = that.message.outputInfos;
          that.outputLength = true;
        }else {
          that.outputArr2 = that.message.outputInfos;
        }
        window.addEventListener('scroll', that.handleScroll)
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
  /**/
  .input{
    color: #0CF5C0;
    display: flex;
    flex: 1;
    justify-content: flex-end;

  }
  .outPut{
    color: #ED1835;
    display: flex;
    flex: 1;
    justify-content: flex-end;
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
    padding: 1.875rem 0.5rem;
  }
  .txnBodyMin{
    width: 100%;
    display: flex;
    align-items: flex-start;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    /*margin-bottom: 0.5rem;*/
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;
    border-radius: 2px;
  }
  .txnBodyMin:last-child{
    margin-bottom: 0rem;
  }
  .txnHash{
    width: 55%;
    color: #00A0E9;
    word-break: break-all;
    display: flex;
    flex: 1;
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
  .coinbase{
    width: 100%;
    text-align: center;
    color: #ffffff;
  }
  .btnBef{
    display: flex;
    align-items: center;
    height: 12px;
    margin-top: 4px;
    width: 30px;
  }
  .btnBef img{
    height: 12px;
  }
  .btnBef2{
    display: flex;
    align-items: center;
    height: 12px;
    margin-top: 4px;
    width: 30px;
    justify-content: flex-end;
  }
  .btnBef2 img{
    height: 12px;
  }
  .colorChange{
    background: #1A1C20;
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
</style>
