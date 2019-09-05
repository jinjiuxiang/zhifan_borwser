<template>
    <div class="container">
      <!---->
      <!---->
      <div class="title">
        <div class="titleL">
          <img class="cointype" :src="changeImage(message.coinType)" alt="">
          <span class="titleText">{{message.coinType | coinChange}}&nbsp;{{$t('text.block')}}：{{message.id}}</span>
          <span class="titleBtn" v-show="message.pBlockVo.preBlockId != null" @click="getBeforeBlock(message.pBlockVo.preBlockId)"></span>
          <span class="titleBtn1" v-show="message.pBlockVo.nextBlockId != null" @click="getBeforeBlock(message.pBlockVo.nextBlockId)"></span>
        </div>
        <div class="titleR">
          <span>{{hashText}}</span>
          <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
            <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
          </el-tooltip>
        </div>
      </div>
      <!---->
      <div class="desc">
        <div>
          <p>
            <span class="label">{{$t('text.confirmStatus')}}</span>
            <span class="info"><li :class="crColor(message.pBlockVo.confirms)">{{message.pBlockVo.confirms | confirms2}}</li><li class="tt">{{message.pBlockVo.confirms | confirms}}</li></span>
          </p>
          <p>
            <span class="label">{{$t('text.blockTime')}}</span>
            <span class="info">{{message.pBlockVo.time | timeFilter}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.blockSize')}}</span>
            <span class="info">{{message.pBlockVo.size | sizeChange}}&nbsp;KB</span>
          </p>
          <p>
            <span class="label">{{$t('text.totalTxnFee')}}</span>
            <span class="info">{{message.fee}} {{message.coinType | coinChange}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.version')}}</span>
            <span class="info">{{[message.coinType,message.pBlockVo.version]|decimalChange}}</span>
          </p>
        </div>
        <span></span>
        <div>
          <p>
            <span class="label">{{$t('text.txnNum')}}</span>
            <span class="info">{{message.totalTxn}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.totalOutput')}}</span>
            <span class="info">{{message.outputTotal}} {{message.coinType | coinChange}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.blockReward')}}</span>
            <span class="info">{{message.reward}}  {{message.coinType | coinChange}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.randomNum')}}</span>
            <span class="info">{{message.pBlockVo.nonce}}</span>
          </p>
          <p>
            <span class="label">{{$t('text.blockHash')}}</span>
            <span class="info erHash">{{message.pBlockVo.merkleRoot}}</span>
          </p>
        </div>
      </div>
      <!--<button @click="daochu">导出</button>-->
      <!--<a target="_blank" href="http://10.0.0.34:9021/download/address?coinType=btc&addressHash=test">导出</a>-->
      <!---->
      <div class="txCon">
        <span class="txTitle">{{$t('text.txnRecord')}}</span>
        <div class="txHeader" v-show="message.txnInfoVoList.length >0" >
          <span class="txHash">{{$t('text.txnHash')}}</span>
          <span class="txInput">{{$t('text.totalInput')}}（{{message.coinType | coinChange}}）</span>
          <span class="txOutput">{{$t('text.totalOutput')}}（{{message.coinType | coinChange}}）</span>
          <span class="txFee">{{$t('text.txnFee')}}（{{message.coinType | coinChange}}）</span>
          <span class="txInputNum">{{$t('text.inputNum')}}</span>
          <span class="txOutputNum">{{$t('text.outputNum')}}</span>
          <span class="txSet"></span>
        </div>
        <div class="txMin"  v-show="message.txnInfoVoList.length >0" v-for="(site,index) in message.txnInfoVoList">
          <div class="txMinTop">
            <p class="txHash">
              <!--<span>{{site.hash}}</span>-->
              <span>
                <a :href="tp+'/'+message.coinType.toLowerCase()+'/txn/'+site.hash + '?pageNum=1'" target="_blank" @click.prevent="btcBlockTxnChange(site.hash)">{{site.hash}}</a>
              </span>
            </p>
            <p class="txInput">{{site.inputTotal}}</p>
            <p class="txOutput">{{site.outputTotal}}</p>
            <p class="txFee">{{site.fee}}</p>
            <p class="txInputNum">{{site.inputs | getLength}}</p>
            <p class="txOutputNum">{{site.outputs | getLength}}</p>
            <p class="txSet">
            <span>
              <li class="down pd" deg="90" @click="pullDown($event,index,site.hash)"></li>
              <!--<li class="path" @click="btcBlockTxnChange(site.hash)"></li>-->
            </span>
            </p>
          </div>
          <div style="width: 100%" v-loading="loadIndex == index +1" element-loading-text="加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
            <p class="mmTitle" v-show="txnIndex == index +1">
              <span>{{$t("text.inputs")}}&nbsp;&nbsp;({{txnData.inputVos | lengthGet}})</span>
              <span class="zz"></span>
              <span>{{$t("text.outputs")}}&nbsp;&nbsp;({{txnData.outputInfos | lengthGet}})</span>
            </p>
            <div class="txMinList"  style="min-height: 30px" v-show="txnIndex == index +1">
              <div class="txnList">
                <div class="inputMin" v-for="site2 in inputVos" v-show="inputVos!= null || inputVos.length != 0">
                  <p class="inputHash">
                    <img v-show="site2.addressHash !=null && site2.addressHash.indexOf(':')==-1 && txnData.confirms!=0 && site2.preTx != null" @click="btcTxnBeforeOrNextClick(site2.preTx,site2.addressHash,site2.valueStr,txnData.id)" src="./../../assets/w.png" alt="">&nbsp;&nbsp;
                    <span v-show="site2.addressHash == null || site2.addressHash.indexOf(':') != -1"  @click="btcTxnAddressChange(site2.addressHash)" :class="addressColor(site2.addressHash)">{{site2.addressHash | addressHashCheck}}</span>
                    <a v-show="site2.addressHash != null && site2.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site2.addressHash +'?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(site2.addressHash)">{{site2.addressHash}}</a>
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
              <div class="txnList">
                <div class="inputMin" v-for="site3 in outputInfos">
                  <p class="inputHash" >
                    <a v-show="site3.outptVo.addressHash != null && site3.outptVo.addressHash.indexOf(':') == -1" :href="tp+'/'+message.coinType.toLowerCase()+'/address/'+site3.outptVo.addressHash + '?pageNum=1'" target="_blank" @click.prevent="btcTxnAddressChange(site3.outptVo.addressHash)">{{site3.outptVo.addressHash}}</a>
                    <span v-show="site3.outptVo.addressHash == null || site3.outptVo.addressHash.indexOf(':') != -1" @click="btcTxnAddressChange(site3.outptVo.addressHash)" :class="addressColor(site3.outptVo.addressHash)">{{site3.outptVo.addressHash| addressHashCheck}}</span>
                    &nbsp;&nbsp;<img @click="btcTxnBeforeOrNextClick(site3.inpoint.tx,site3.outptVo.addressHash,site3.outptVo.valueStr,txnData.id)" v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1&& txnData.confirms!=0&&site3.inpoint.tx!=null"  src="./../../assets/w1.png" alt=""></p>
                  <p class="inputValue" v-show="site3.outptVo.addressHash !=null && site3.outptVo.addressHash.indexOf(':')==-1">{{site3.outptVo.valueStr |completeNum}}</p>
                </div>
                <div class="all" v-show="txnData.outputInfos != null && txnData.outputInfos.length > 5">
                  <span @click="allOut($event)" all="0">显示全部输出 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="noList" v-show="message.txnInfoVoList.length == 0">
          <img src="./../../assets/no.png" alt="">
          <span>{{$t('text.noTxnRecord')}}</span>
        </div>
      </div>
      <!---->
      <!---->
      <div class="pageBox" v-show="message.txnInfoVoList.length >0">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          :total="message.totalTxn">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "BTC-block",
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
          txnData:[],
          outputInfos:[],
          inputVos:[],
          show:false,
          loadIndex:0,
          tp:window.location.protocol+'//'+window.location.host,
          currentPage1:1,
        }
        //data end
      },
      methods:{
        daochu:function(){
          let that = this;
          that.ajax({
            method:'get',
            url:'http://10.0.0.34:9021/download/address?coinType=btc&addressHash=test'
          }).then(res=>{
            console.log(res);
          })
        },
        //去除下拉框
        removeDown:function(){
          let that = this;
          $(".pd").removeClass("down2").addClass("down");
          that.txnIndex = 0;
          that.loadIndex = 0;
        },
        //复制
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
        //点击下拉
        pullDown:function($event,index,txn){
          let that = this;
          let deg = $($event.currentTarget).attr("deg");
          $(".pd").removeClass("down2").addClass("down");
          let us = $($event.currentTarget).parent().parent().parent().next();
          if(deg == "90"){
            that.loadIndex = index + 1;
            that.getTxnData(txn,index,us)
            $($event.currentTarget).removeClass("down").addClass("down2");
            $(".pd").attr("deg","90");
            $($event.currentTarget).attr("deg","0");
            that.txnIndex = index +1;
            that.txnData = [];
            that.inputVos = [];
            that.outputInfos = [];
          }else {
            $($event.currentTarget).attr("deg","90");
            $($event.currentTarget).removeClass("down2").addClass("down");
            that.txnIndex = 0;
            that.loadIndex = 0;
          }
          //$($event.currentTarget).parent().parent().parent().next().slideToggle();

        },
        //获取交易信息
        getTxnData:function(id,index,us){
          let that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          //判断是交易id还是交易hash
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
          //服务器链接是否成功
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
            //console.log(res);
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              that.$nextTick(() =>{
                that.txnData = res.data.data;
               // console.log(that.txnData);
                if(that.txnData.outputInfos!=null && that.txnData.outputInfos.length > 5){
                  that.outputInfos = that.txnData.outputInfos.slice(0,5);
                }else {
                  that.outputInfos = that.txnData.outputInfos;
                 // console.log(that.outputInfos);
                }
                if(that.txnData.inputVos!=null &&that.txnData.inputVos.length > 5){
                  that.inputVos = that.txnData.inputVos.slice(0,5);
                }else {
                  that.inputVos = that.txnData.inputVos;
                }
                //console.log(that.inputVos);
                that.$nextTick(()=>{
                  that.loadIndex = 0;

                })
                // us.slideToggle();
              })
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
        //分页
        handleCurrentChange:function(val) {
          const that = this;
          that.$emit('btcPageChange',val-1);
          that.removeDown();
        },
        //前后区块跳转
        getBeforeBlock:function(val){
          let that = this;
          //console.log(val);
          that.$emit("getBeforeBlock",val)
        },
        //跳转到交易
        btcBlockTxnChange:function(txnInfo){
          let that = this;
          that.$emit("btcBlockTxnChange",txnInfo)
        },
        //动态调整图片
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
        //跳转地址
        btcTxnAddressChange:function(addressInfo){
          let that = this;
          if(addressInfo == null || addressInfo.indexOf(':') != -1){
            return false
          }else {
            that.$emit("btcTxnAddressChange",addressInfo)
          }
        },
        //点击前一区块或后一区块
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
        //截取字符串
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
        //获取字符串长度
        getLength:function(value){
          if(value == null){
            return 0;
          }else {
            return value.length
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
        //次确认/不显示
        confirms:function(value){
          if(value > 0){
            return vm.$t('text.checkNum')
          }else{
            return ""
          }
        },
        //0=未确认 -1=无效
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
        //bchsv转化为bsv
        coinChange:function(val){
          if(val == 'BCHSV'){
            return 'BSV'
          }else {
            return val
          }
        }
      },
      mounted:function(){
        let that  = this;
        that.currentPage1 = parseInt(that.$route.query.pageNum)
        $(".txMinList").css("display","none")
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    padding: 2rem 2.5rem;
    box-sizing: border-box;
    /*font-family: PingFangSC-Regular;*/

  }
  /**/
  .title{
    display: flex;
  }
  .titleL{
    display: flex;
    align-items: center;
  }
  .cointype{
    width: 1.25rem;
    height: 1.25rem;
  }
  .titleText{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    margin-left: 0.5rem;
    color: #FFFFFF;
  }
  .titleBtn{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    margin-left: 1.5rem;
    background-image: url("./../../assets/before.png");
    cursor: pointer;
    background-size: 100% 100%;
  }
  .titleBtn:hover{
    background-image: url("./../../assets/beforeh.png");

  }
  .titleBtn1{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    background-image: url("./../../assets/after.png");
    cursor: pointer;
    background-size: 100% 100%;
    margin-left: 1rem;

  }
  .titleBtn1:hover{
    background-image: url("./../../assets/afterh.png");
  }
  .titleR{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .item img{
    height: 1.05rem!important;
    width: auto;
  }
  .el-tooltip.item{
    width: 1.05rem;
    height: 1.5rem;
    margin-left: 0.5rem;
  }
  .copyBtn{
    cursor: pointer;
  }
  /**/
  /**/
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
  .erHash{
    font-size: 0.875rem;
    word-break: break-all;
    line-height: 1rem;
    display: flex;
    align-items: center;
  }
  /**/
  .txCon{
    width: 100%;
     display: flex;
    flex-direction: column;
  }
  .txTitle{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 20px;
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
    width: 15.5%;
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
    color: #4A90E2;
  }
  .txHash span:hover{
    width: auto;
  }
  .txInput{
    width: 17.87%;
  }
  .txOutput{
    width: 17.87%;
  }
  .txFee{
    width: 17.87%;
  }
  .txInputNum{
    width: 14.3%;
  }
  .txOutputNum{
    width: 8.8%;
  }
  .txSet{
    width: 7.8%;

  }
  .txSet span{
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .txMin{
    width: 100%;
    border-bottom: 1px solid #24262C;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .txMinTop{
    width: 100%;
    height: 3rem;
    box-sizing: border-box;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .txMinTop p{
    display: flex;
    height: 100%;
    align-items: center;
    text-align: left;
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
  .txMinList{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 2.5rem;
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
    /*margin-bottom: 0.5625rem;*/
    display: flex;
    flex-direction: column;
  }

  .txMinList span{
    width: 16.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /*padding-bottom: 0.5625rem;*/
    box-sizing: border-box;
  }
  .inputHash{
    color: #00A0E9;
    display: flex;
    align-items: flex-start;
    /*cursor: pointer;*/
    flex: 1;
    justify-content: flex-start !important;
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
  .txnList .inputMin:last-child{
    padding-bottom: 0;

  }
  .inputMin{
    width: 100%;
    display: flex;
    flex-direction: row !important;
    padding-bottom: 0.5625rem;
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
  @media (max-width: 1380px) {
    .txMinList span{
      width: 10.875rem;
    }
    .zz{
      width: 10.875rem !important;
    }
  }
</style>
