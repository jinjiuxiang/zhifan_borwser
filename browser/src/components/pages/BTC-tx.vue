<template>
  <div class="container">
    <!---->
    <div class="title">
      <img :src="changeImage(message.coinType)" alt="">
      <span>{{message.coinType | coinChange}}&nbsp;{{$t('text.txn')}}：</span>
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
          <span class="label">{{$t('text.input')}}</span>
          <span class="info">{{message.inputTotal}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.size')}}</span>
          <span class="info">{{message.size}}&nbsp;Bytes</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.blockHeight')}}</span>
          <span class="info">{{message.blockHeight | esitIf}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.txnFee')}}</span>
          <span class="info">{{message.fee}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.output')}}</span>
          <span class="info">{{message.outputTotal}}&nbsp;{{message.coinType | coinChange}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.lockTime')}}</span>
          <span class="info">{{message.lockTime | lockTimeChange}}</span>
        </p>
      </div>
    </div>
    <!---->
    <div class="input">
      <div>{{$t("text.inputs")}}（{{message.inputVos | lengthGet}}）</div>
      <span></span>
      <div>{{$t("text.outputs")}}（{{message.outputInfos | lengthGet}}）</div>
    </div>
    <!---->
    <div class="inputInfo">
        <div class="" >
          <div class="inputMin" v-for="site2 in inputVos" v-show="inputVos != null || inputVos.length != 0" :class="btcColorChange(site2.preTx,site2.addressHash,site2.valueStr)">
            <p class="inputHash">
              <img v-show="site2.addressHash !=null && site2.addressHash.indexOf(':')==-1&& txnData.confirms!=0 && site2.preTx != null" @click="btcTxnBeforeOrNextClick(site2.preTx,site2.addressHash,site2.valueStr,message.id)"  src="./../../assets/w.png" alt="">&nbsp;&nbsp;
              <span v-show="site2.addressHash == null || site2.addressHash.indexOf(':') != -1" @click="btcTxnAddressChange(site2.addressHash)" :class="addressColor(site2.addressHash)">{{site2.addressHash | addressHashCheck}}</span>
              <a v-show="site2.addressHash != null && site2.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site2.addressHash + '?pageNum=1'" target="_blank" :class="addressColor(site2.addressHash)" @click.prevent="btcTxnAddressChange(site2.addressHash)">{{site2.addressHash}}</a>
            </p>
            <p class="inputReduce" v-show="site2.addressHash !=null && site2.addressHash.indexOf(':')==-1">{{site2.valueStr| completeNum}}</p>
          </div>
          <p class="coinBase" v-show="inputVos == null || inputVos.length == 0">
            Coinbase
          </p>
          <div class="all" v-show="txnData.inputVos != null && txnData.inputVos.length > 5">
            <span  @click="allIn($event)" all="0">显示全部输入</span>
          </div>
        </div>
        <span class="uImg"><img src="./../../assets/tr.png" alt=""></span>
        <div>
          <div class="inputMin" v-for="site3 in outputInfos" :class="btcColorChange(site3.inpoint.tx,site3.outptVo.addressHash,site3.outptVo.valueStr)">
            <p class="inputHash">
              <span v-show="site3.outptVo.addressHash == null || site3.outptVo.addressHash.indexOf(':') != -1" @click="btcTxnAddressChange(site3.outptVo.addressHash)" :class="addressColor(site3.outptVo.addressHash)">{{site3.outptVo.addressHash| addressHashCheck}}</span>
              <a v-show="site3.outptVo.addressHash != null && site3.outptVo.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site3.outptVo.addressHash + '?pageNum=1'" target="_blank" :class="addressColor(site3.outptVo.addressHash)" @click.prevent="btcTxnAddressChange(site3.outptVo.addressHash)">{{site3.outptVo.addressHash}}</a>
              &nbsp;&nbsp;<img v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1&& txnData.confirms!=0 && site3.inpoint.tx != null" @click="btcTxnBeforeOrNextClick(site3.inpoint.tx,site3.outptVo.addressHash,site3.outptVo.valueStr,message.id)"  src="./../../assets/w1.png" alt=""></p>
            <p class="inputValue" v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1">{{site3.outptVo.valueStr |completeNum}}</p>
          </div>
          <div class="all" v-show="txnData.outputInfos != null && txnData.outputInfos.length > 5">
            <span @click="allOut($event)" all="0">显示全部输出 </span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    var vm;
    export default {
      name: "BTC-tx",
      props:{
        message:Object
      },
      data:function(){
        vm = this;
        return {
          hashText:this.message.hash,
          disabled:false,
          txnData:{},
          inputVos:[],
          outputInfos:[],
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
        handleError:function(e) {

        },
        //前一交易后一交易
        btcTxnBeforeOrNextClick:function(val,addr,num,txn){
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
        //动态加载币种图片
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
            case 'TetherUS':
              return "/static/img/usdt.jpg";
              break;
            case 'BCHSV':
              return "/static/img/BSV.png";
              break;
          }
        },
        //颜色调整
        changeColor:function(value){
          if(value >=0){
            return "inputValue"
          }else {
            return "inputReduce"
          }
        },
        //全部输入
        allIn:function($event){
          let that = this;
          that.inputVos = that.txnData.inputVos;
          let all = $($event.currentTarget).attr("all");
          if(all == "0"){
            $($event.currentTarget).attr("all","1");
            $($event.currentTarget).text("收起全部输入")
            that.inputVos = that.txnData.inputVos;
          }else {
            $($event.currentTarget).attr("all","0");
            $($event.currentTarget).text("显示全部输入")
            that.inputVos = that.txnData.inputVos.slice(0,5);
          }
        },
        //全部输出
        allOut:function($event){
          let that = this;
          let all = $($event.currentTarget).attr("all");
          if(all == "0"){
            $($event.currentTarget).attr("all","1");
            $($event.currentTarget).text("收起全部输出")
            that.outputInfos = that.txnData.outputInfos;
          }else {
            $($event.currentTarget).attr("all","0");
            $($event.currentTarget).text("显示全部输出")
            that.outputInfos = that.txnData.outputInfos.slice(0,5);
          }
        },
        //跳转地址信息
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          if(addressInfo == null || addressInfo.indexOf(':') != -1){
            return false
          }else {
            that.$emit("btcTxnAddressChange",addressInfo)
          }
        },
        //上一次点击的交易颜色变化
        btcColorChange:function(value,addr,num){
          console.log(value);
          console.log(addr);
          console.log(num);
          let that = this;
          if(addr == that.Cookies.get("zf_addr") && num == that.Cookies.get("zf_num") && value ==that.Cookies.get("zf_txn")){
            return "colorChange"
          }
        },
        //不同状态显示不同颜色
        crColor:function(val){
          if(val > 0){
            return 'staNum'
          }else if(val == 0){
            return 'reduce'
          }else if(val == -1){
            return 'whi'
          }
        },
        //判断地址是否解析
        addressColor:function(value){
          if(value == null || value.indexOf(':') != -1){
            return 'ff'
          }else {
            return false;
          }
        },
        //methods end
      },
      filters:{
        //字符串截取
        txHashChange:function(value){
          const str1 = value.slice(0,8);
          const str2 = value.slice(value.length -8,value.length)
          return str1 + "......" + str2
        },
        //时间戳转化为传统时间
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
        //字符串长度获取
        lengthGet:function(value){
          if(value == null){
            return 0
          }else {
            return value.length
          }
        },
        //次确认/不显示
        confirms:function(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else{
            return ""
          }
        },
        // 0=未确认，-1=无效
        confirms2:function(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        //版本号处理
        decimalChange:function([coinType,value]){
          if(coinType == 'LTC'){
            return value
          }else {
            return '0x' + value.toString(16);
          }
        },
        //大小处理
        sizeChange:function(value){
          return value /1000
        },
        //判断是否为null
        esitIf:function(value){
          if(value == null){
            return '一'
          }else {
            return value
          }
        },
        //锁定时间解析
        lockTimeChange:function(value){
          let that = this;
          if(value <=0){
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
            return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
          }else if(value.toString().length != 13){
            return vm.$t('text.block')+':'+value
          }
        },
        //判断地址哈希是否合法
        addressHashCheck:function(value){
          if(value == null || value.indexOf(':') != -1){
            return vm.$t('text.Unable')
          }else {
            return value;
          }
        },
        //输入输出数字补全
        completeNum:function(value){
          return parseFloat(value).toFixed(8)
        },
        //bchsv转为bsv
        coinChange:function(val){
          if(val == 'BCHSV'){
            return 'BSV'
          }else {
            return val
          }
        }
      },
      mounted:function(){
        let that = this;
        that.txnData = that.message;
        //判断交易列表的否大于5
        if(that.txnData.outputInfos!=null && that.txnData.outputInfos.length > 5){
          that.outputInfos = that.txnData.outputInfos.slice(0,5);
        }else {
          that.outputInfos = that.txnData.outputInfos;
        }
        if(that.txnData.inputVos!=null &&that.txnData.inputVos.length > 5){
          that.inputVos = that.txnData.inputVos.slice(0,5);
        }else {
          that.inputVos = that.txnData.inputVos;
        }
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
    box-sizing: border-box;
    padding: 2rem 2.5rem;
    display: flex;
    font-size: 0.875rem;
    align-items: center;
    background: #24262C;
  }
  .input div,.inputInfo div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .inputInfo div{
    margin-bottom: 0.5625rem;
    display: flex;
    flex-direction: column;
  }
  .input span,.inputInfo span{
    width: 16.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.5625rem;
    box-sizing: border-box;
  }
  .inputHash{
    color: #00A0E9;
    display: flex;
    align-items: center;
    /*cursor: pointer;*/
    flex: 1;
    justify-content: flex-start !important;
  }
  .inputHash img{
    cursor: pointer;
  }
  .inputHash span{
    width: auto !important;
    padding: 0;
    display: flex;
    /*flex: 1;*/
    justify-content: flex-start;
    word-break: break-all;
    align-items: flex-start;
    cursor: pointer;
  }
  .inputValue{
    color: #0CF5C0;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
  .inputReduce{
    color: #ED1835;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
  .inputMin{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    /*padding-bottom: 0.2625rem;*/
    justify-content: space-between;
    align-items: flex-start !important;
    min-height: 20px;
    padding: 7px 12px;
  }
  .all{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    justify-content: flex-end !important;
  }
  .all span{
    width: auto;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
  .all span:hover{
    text-decoration: underline;
  }
  .coinBase{
    /*font-family: PingFangSC-Regular;*/
    font-size: 14px;
    color: #ffffff;
    display: flex;
    text-align: center;
    height: 100%;
    margin-top: -0.4rem;
  }
  .uImg{
    margin-top: -0.7rem;
  }
  .colorChange{
    background: #1A1C20;
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
  .ff{
    cursor: default !important;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
  @media (max-width: 1440px) {
    /*.input span,.inputInfo span{*/
      /*width: 6.875rem !important;*/
    /*}*/
    /*.uImg{*/
      /*width: 6.875rem !important;*/
    /*}*/
  }
</style>
