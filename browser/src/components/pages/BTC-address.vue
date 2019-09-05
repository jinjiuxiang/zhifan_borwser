<template>
  <div class="container">
    <!---->
    <div class="title">
      <img :src="changeImage(message.coinType)" alt="">
      <span>{{message.coinType}}&nbsp;{{$t('text.address')}}：</span>
      <span>{{hashText}}</span>
      <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
        <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
      </el-tooltip>
    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.balance')}}</span>
          <span class="info">{{message.balance}}&nbsp;{{message.coinType}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.firstTxn')}}</span>
          <span class="info"><span :class="changeColor(message.firstTxnVO.receivedStr)">{{message.firstTxnVO.receivedStr| numFilter}}&nbsp;{{message.coinType}} </span>&nbsp;&nbsp;{{message.firstTxnVO.blockTime}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.totalSend')}}</span>
          <span class="info">{{message.totalSend}}&nbsp;{{message.coinType}}</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.txnCNum')}}</span>
          <span class="info">{{message.totalTxn}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.recentTxn')}}</span>
          <span class="info"><span :class="changeColor(message.lastTxnVO.receivedStr)">{{message.lastTxnVO.receivedStr | numFilter}}&nbsp;{{message.coinType}}</span>&nbsp;&nbsp;{{message.lastTxnVO.blockTime}}</span>
        </p>
        <p>
          <span class="label">{{$t('text.total')}}</span>
          <span class="info">{{message.totalReceived}}&nbsp;{{message.coinType}}</span>
        </p>
      </div>
      <img :src="Config.baseUrl + '/api/qrcode/addressQrode?address='+message.hash+'&coinType='+message.coinType.toLowerCase()" target="_blank" alt="">
    </div>
    <!---->
    <div class="txn">
      <span class="txTitle">{{$t('text.txnRecord')}}</span>
      <div class="txHeader" v-show="message.record2sVo.length>0">
        <span class="txHash">{{$t('text.txnHash')}}</span>
        <span class="txStatus">{{$t('text.confirmStatus')}}</span>
        <span class="txSend">{{$t('text.inOrOut')}}（{{message.coinType}}）</span>
        <span class="txInput">{{$t('text.inputNum')}}</span>
        <span class="txOutput">{{$t('text.outputNum')}}</span>
        <span class="txBal">{{$t('text.balance')}}（{{message.coinType}}）</span>
        <span class="txTime">{{$t('text.time')}}</span>
        <span class="txSet"></span>
      </div>
      <div class="adrMin" v-show="message.record2sVo.length>0" v-for="(site,index) in message.record2sVo">
        <div class="adrMinTop">
          <p class="txHash">
            <!--<span>{{site.txHash}}</span>-->
            <span>
                <a :href="tp+'/'+message.coinType.toLowerCase()+'/txn/'+site.txHash + '?pageNum=1'" target="_blank" @click.prevent="btcBlockTxnChange(site.txHash)">{{site.txHash}}</a>
              </span>
          </p>
          <p class="txStatus"><span :class="crColor(site.confirms)">{{site.confirms|confirms}}</span><span class="cr">{{site.confirms|confirms2}}</span></p>
          <p class="txSend" :class="changeColor(site.receivedStr)">{{site.receivedStr | numFilter}}</p>
          <p class="txInput">{{site.inputNum}}</p>
          <p class="txOutput">{{site.outputNum}}</p>
          <p class="txBal">{{site.balanceStr}}</p>
          <p class="txTime">{{site.blockTime}}</p>
          <p class="txSet">
            <span>
              <li class="down pd" deg="90" @click="pullDown($event,index,site.txHash)"></li>
              <!--<li class="path" @click="btcBlockTxnChange(site.txHash)"></li>-->
            </span>
          </p>
        </div>
       <div style="width: 100%" v-loading="loadIndex == index +1" element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
         <p class="mmTitle" v-show="txnIndex == index +1">
           <span>{{$t("text.inputs")}}({{txnData.inputVos | lengthGet}})</span>
           <span class="zz"></span>
           <span>{{$t("text.outputs")}}({{txnData.outputInfos | lengthGet}})</span>
         </p>
         <div class="txMinList" v-if="txnIndex == index +1">
           <div>
             <div class="inputMin" v-for="site2 in inputVos" v-show="inputVos != null || inputVos.length != 0">
               <p class="inputHash">
                 <img v-show="site2.addressHash !=null && site2.addressHash.indexOf(':')==-1&& txnData.confirms!=0 && site2.preTx != null" @click="btcTxnBeforeOrNextClick(site2.preTx,site2.addressHash,site2.valueStr,txnData.id)"  src="./../../assets/w.png" alt="">&nbsp;&nbsp;
                 <span v-show="site2.addressHash == null || site2.addressHash.indexOf(':') != -1"  @click="btcTxnAddressChange(site2.addressHash)" :class="addressColor(site2.addressHash)">{{site2.addressHash | addressHashCheck}}</span>
                 <a v-show="site2.addressHash != null && site2.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site2.addressHash + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(site2.addressHash)">{{site2.addressHash}}</a>
               </p>
               <p class="inputReduce" v-show="site2.addressHash !=null && site2.addressHash.indexOf(':')==-1">{{site2.valueStr| completeNum}}</p>
             </div>
             <p class="coinBase" v-show="inputVos == null || inputVos.length == 0">
               Coinbase
             </p>
             <div class="all" v-show="txnData.inputVos != null && txnData.inputVos.length > 5">
               <span @click="allIn($event)" all="0">显示全部输入</span>
             </div>
           </div>
           <span><img src="./../../assets/tr.png" alt=""></span>
           <div>
             <div class="inputMin" v-for="site3 in outputInfos">
               <p class="inputHash">
                 <a v-show="site3.outptVo.addressHash != null && site3.outptVo.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site3.outptVo.addressHash + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(site3.outptVo.addressHash)">{{site3.outptVo.addressHash}}</a>
                 <span v-show="site3.outptVo.addressHash == null || site3.outptVo.addressHash.indexOf(':') != -1" @click="btcTxnAddressChange(site3.outptVo.addressHash)" :class="addressColor(site3.outptVo.addressHash)">{{site3.outptVo.addressHash| addressHashCheck}}</span>
                 &nbsp;&nbsp;<img v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1&& txnData.confirms!=0 && site3.inpoint.tx != null" @click="btcTxnBeforeOrNextClick(site3.inpoint.tx,site3.outptVo.addressHash,site3.outptVo.valueStr,txnData.id)" src="./../../assets/w1.png" alt=""></p>
               <p class="inputValue" v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1">{{site3.outptVo.valueStr |completeNum}}</p>
             </div>
             <div class="all" v-show="txnData.outputInfos != null && txnData.outputInfos.length > 5">
               <span @click="allOut($event)" all="0">显示全部输出 </span>
             </div>
           </div>
         </div>
       </div>
      </div>
      <div class="noList" v-show="message.record2sVo.length==0">
        <img src="./../../assets/no.png" alt="">
        <span>{{$t('text.noTxnRecord')}}</span>
      </div>
    </div>
    <!---->
    <div class="pageBox" v-show="message.record2sVo.length>0">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        :total="message.total">
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
          loadIndex:0,
          tp:window.location.protocol+'//'+window.location.host,
          currentPage1:1,
        }
        //data end
      },
      methods:{
        //复制成功提示
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
        //数值大于0显示绿色，小于0显示红色
        changeColor:function(value){
          if(value >=0){
            return "add"
          }else {
            return "reduce"
          }
        },
        //点击下拉
        pullDown:function($event,index,txn){
          let that = this;
          let deg = $($event.currentTarget).attr("deg");
          $(".pd").removeClass("down2").addClass("down");
          //下拉框显示
          if(deg == "90"){
            that.txnData = {};
            that.inputVos = [];
            that.outputInfos = [];
            that.txnIndex = index + 1;
            that.loadIndex = index + 1;
            that.getTxnData(txn,index)
            $($event.currentTarget).removeClass("down").addClass("down2");
            $(".pd").attr("deg","90");
            $($event.currentTarget).attr("deg","0");

          }else {
            //下拉框收起
            $($event.currentTarget).attr("deg","90");
            $($event.currentTarget).removeClass("down2").addClass("down");
            that.txnIndex = 0;
            that.loadIndex = 0;
          }
        },
        //获取交易信息
        getTxnData:function(id,index){
          let that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              channelId:channelid
            }
          }
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noSec"})
              // window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/txn",
            params:data
          }).then(function (res) {
           // console.log(res);
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              that.txnData = res.data.data;
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
              that.loadIndex = 0;

            }
          })
        },
        //全部输入
        allIn:function($event){
          let that = this;
          let all = $($event.currentTarget).attr("all");
          that.inputVos = that.txnData.inputVos;
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
        //点击分页
        handleCurrentChange:function(val) {
          const that = this;
          that.$emit('btcAddressPageChange',val-1)
          that.removeDown();
        },
        //跳转到交易
        btcBlockTxnChange:function(txnInfo){
          let that = this;
          that.$emit("btcBlockTxnChange",txnInfo)
        },
        //跳转地址
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          if(addressInfo == null || addressInfo.indexOf(':') != -1){
            return false
          }else {
            that.$emit("btcTxnAddressChange",addressInfo)
          }
        },
        //去除下拉框
        removeDown:function(){
          let that = this;
          $(".pd").removeClass("down2").addClass("down");
          that.txnIndex = 0;
        },
        //点击前一交易和后一交易
        btcTxnBeforeOrNextClick:function(val,addr,num,txn){
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
        //只留字符串前后
        txHashChange:function(value){
          const str1 = value.slice(0,8);
          const str2 = value.slice(value.length -8,value.length)
          return str1 + "......" + str2
        },
        //数值大于0加+
        numFilter:function(value){
          if(value > 0){
            return "+" + value
          }else {
            return value
          }
        },
        // 0=未确认，-1=无效
        confirms:function(value){
          if(value > 0){
            return value
          }else if (value == 0) {
            return vm.$t('text.noCheck')
          }else if(value == -1){
            return vm.$t('text.Invalid')
          }
        },
        // 次确认/不显示
        confirms2:function(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else {
            return ""
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
      },
      mounted:function(){
        let that = this;
        that.currentPage1 = parseInt(that.$route.query.pageNum)
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 2.5rem 0 2.5rem;
  }
  /**/
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
  /**/
  .desc{
    width: 100%;
    margin-top: 2.25rem;
    display: flex;
    align-items: flex-end;
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
  .desc img{
    width: 7.5rem;
    height: 7.5rem;
    margin-left: 2rem;
  }
  .label{
    width: 8.25rem!important;
    color: #999999;
  }
  .info{
    flex: 1;
    color: #FFFFFF;
  }
  /**/
  .txn{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .txTitle{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    margin-top: 4rem;
  }
  .txHeader{
    width: 100%;
    height: 3rem;
    border-top: 1px solid #24262C;
    border-bottom: 1px solid #24262C;
    margin-top: 1.5rem;
    box-sizing: border-box;
    padding: 0 1rem;
    font-size: 1rem;
    color: #999999;
    display: flex;
    align-items: center;
  }
  .txHeader span{
    display: flex;
    align-items: center;
    text-align: left;
    height: 100%;
  }
  .txHash{
    width: 13.5%;
    position: relative;
  }
  .txHash span{
    width: 7.1875rem;
    padding: 0 0.75rem;
    background: #131518;
    border-radius: 4px;
    height: 2.25rem;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    /*float: left;*/
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height: 2.25rem;
    color: #00A0E9;
  }
  .txHash span:hover{
    width: auto;
  }
  .txStatus{
    width: 14.7%;
  }
  .txSend{
    width: 17.6%;
  }
  .txInput{
    width: 8.1%;
  }
  .txOutput{
    width: 8.8%;
  }
  .txBal{
    width: 14.7%;
  }
  .txTime{
    width: 16.2%;
  }
  .txSet{
    width: 6.4%;
  }
  .adrMin{
    width: 100%;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 1px solid #24262C;
  }
  .adrMinTop{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .adrMinTop p{
    display: flex;
    height: 100%;
    align-items: center;
    text-align: left;
  }
  .txSet{
    width: 7.8%;

  }
  .txSet span{
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  li{
    list-style-type: none;
  }
  .down,.path,.down2{
    width: 1rem;
    height:1rem;
  }
  .down{
    margin-right: 1.25rem;
    background-image: url("./../../assets/txRight.png");
    background-size: 50% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .down:hover{
    background-image: url("./../../assets/txRightH.png");

  }
  .down2{
    margin-right: 1.25rem;
    background-image: url("./../../assets/txDown.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .down2:hover{
    background-image: url("./../../assets/txDownH.svg");

  }
  .path{
    background-image: url("./../../assets/path.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .path:hover{
    background-image: url("./../../assets/pathH.png");

  }
  .staNum{
    color: #FFB700 ;
    height: 100%;
    line-height: 2.45rem;
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
  .txMinList{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2.5rem 1rem 2.5rem;
    display: flex;
    font-size: 0.875rem;
    background: #24262C;
    align-items: center;
  }
  .txMinList div{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .txMinList div{
    margin-bottom: 0.2625rem;
    display: flex;
    flex-direction: column;
  }
  .txMinList span{
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
    align-items: flex-start;
    /*cursor: pointer;*/
    flex: 1;
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
  .inputHash img{
    cursor: pointer;
    margin-top: 4px;
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
    padding-bottom: 0.2625rem;
    justify-content: space-between;
    align-items: flex-start !important;
    min-height: 20px;
  }
  .all{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    justify-content: flex-end !important;
  }
  .all span{
    width: auto !important;
    font-size: 0.875rem;
    color: rgba(255,255,255,0.8);
    cursor: pointer;
    text-align: right !important;
  }
  .all span:hover{
    text-decoration: underline;
  }
  .pageBox{
    width: 100%;
    margin-top: 2.5rem;
    text-align: right;
    margin-bottom: 3rem;
  }
  .coinBase{
    /*font-family: PingFangSC-Regular;*/
    font-size: 14px;
    color: #ffffff;
    display: flex;
    text-align: center;
    height: 100%;
    /*margin-top: -0.4rem;*/
    align-items: center;
  }
  .noList{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 9.75rem;
  }
  .noList span{
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    color: #FFFFFF;
    margin-top: 1.6875rem;
  }
  /*.tt{*/
    /*color: #2A2A2A;*/
    /*font-family: PingFangSC-Regular;*/
  /*}*/
  .mmTitle{
    width: 100%;
    display: flex;
    /*font-family: PingFangSC-Regular;*/
    font-size: 16px;
    color: #999999;
    background: #24262C;
    padding: 32px 2.5rem 0 2.5rem;
    box-sizing: border-box;
  }
  .mmTitle span:nth-child(1){
    flex: 1;
  }
  .mmTitle span:nth-child(3){
    flex: 1;
  }
  .zz{
    width: 16.875rem !important;
  }
  .cr{
    color: #666666 !important;
  }
  .ff{
    cursor: default !important;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
  @media (max-width: 1380px) {
    .txMinList span{
      width: 6.875rem;
    }
    .zz{
      width: 6.875rem !important;
    }
  }
</style>
