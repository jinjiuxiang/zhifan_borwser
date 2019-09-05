<template>
    <div class="container" @click="headerHide" v-loading="loadIndexM" element-loading-text="加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <!--头部搜索和多语言切换-->
      <headerVue v-on:childByValue="childByValue" v-on:childByValue2="childByValue2" v-on:loadingAdd="loadingAdd" v-on:loginShowNow="loginShowNow" v-on:outClick="outClick" ref="headerClick" @click.stop></headerVue>
      <div class="detail" :style="{minHeight:minHeight + 'px'}">
        <!--usdt交易详情页-->
        <USDT_txn v-if="finalData.coinType =='USDT'&& finalData.dataType =='txn'" :message="finalData" v-on:btcTxnAddressChange="btcTxnAddressChange"></USDT_txn>
        <!--btc等交易详情页-->
        <BTC_txn v-if="finalData.coinType != 'USDT'&&finalData.dataType =='txn'" :message="finalData" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_txn>
        <!--usdt区块详情页-->
        <USDT_block v-if="finalData.coinType =='USDT'&& finalData.dataType =='block'" :message="finalData" v-on:btcPageChange="btcPageChange" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:getBeforeBlock="getBeforeBlock"></USDT_block>
        <!--btc等区块详情页-->
        <BTC_block v-if="finalData.coinType != 'USDT'&& finalData.dataType =='block'" :message="finalData" v-on:btcPageChange="btcPageChange" v-on:getBeforeBlock="getBeforeBlock" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_block>
        <!--btc等地址详情页-->
        <BTC_address v-if="finalData.coinType != 'USDT'&&finalData.coinType != 'BCH'&&finalData.coinType != 'BCHSV' && finalData.dataType =='address'" :message="finalData" v-on:btcAddressPageChange="btcAddressPageChange" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BTC_address>
        <!--usdt地址详情页-->
        <USDT_address v-if="finalData.coinType =='USDT'&& finalData.dataType =='address'" :message="finalData" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcAddressPageChange="btcAddressPageChange"></USDT_address>
        <!--bch地址详情页-->
        <BCH_address v-if="finalData.coinType != 'USDT'&&(finalData.coinType == 'BCH' || finalData.coinType == 'BCHSV') && finalData.dataType =='address'" :message="finalData" v-on:btcAddressPageChange="btcAddressPageChange" v-on:btcBlockTxnChange="btcBlockTxnChange" v-on:btcTxnAddressChange="btcTxnAddressChange" v-on:btcTxnBeforeOrNextClick="btcTxnBeforeOrNextClick"></BCH_address>
      </div>
      <!--免责声明-->
      <footerVue></footerVue>
      <!--复层-->
      <div class="login" v-if="loginShow == 1">
        <div class="loginMin">
          <span class="close" @click="loginShowNow2"><img style="width: 18px" src="./../assets/img/err.png" alt=""></span>
          <span class="loginMinText1">登录</span>
          <div class="inputBox">
            <span class="imageBox"><img src="./../assets/img/user.svg" alt=""></span>
            <input class="inputText" type="text" v-model="userName">
          </div>
          <div class="inputBox">
            <span class="imageBox"><img src="./../assets/img/lock.png" alt=""></span>
            <input class="inputText" type="password" v-model="passWord">
          </div>
          <div style="text-align: right">
            <el-tooltip class="item" effect="dark" content="请联系Chaindigg重置密码" placement="top-end">
              <span class="forgetPwd" style="width: auto">忘记密码？</span>
            </el-tooltip>
          </div>
          <div style="display: flex;justify-content: center">
            <span class="loginBtn" style="width: 100%" @click="loginClickT">登录</span>
          </div>
          <span class="bottomText"><img src="./../assets/img/til.png" alt="">&emsp;内测阶段暂不开放注册，敬请期待</span>
        </div>
      </div>
      <!--手机验证码-->
        <div class="login" v-show="loginShow==2">
            <div class="loginMin" style="display: flex;">
                <span class="close" @click="loginShowNow2"><img style="width: 18px" src="./../assets/img/err.png" alt=""></span>
                <span class="loginMinText1">手机验证</span>
                <div class="mobMin" style="margin-top:40px">
                    <input type="text" class="mobNumber" v-model="code" @keyup.enter="checkCode">
                    <span class="code" @click="sendCodeS" v-show="codeSend">发送验证码</span>
                    <span class="code" style="background: #8E8E93 " v-show="codeland" >已发送({{num}})</span>
                    <span class="code"  @click="sendCodeS" v-show="codeRe">重新发送</span>
                </div>
                <span class="forGet1" style="margin-top: 24px;text-align: right;margin-top: 30px">
              <el-tooltip class="item" effect="dark" content="请联系Chaindigg修改手机号" placement="top-end">
                 <span class="forgetPwd">手机号不可用？</span>
              </el-tooltip>
            </span>
                <div style="display: flex;justify-content: center;margin-top: 30px">
                    <span class="loginBtn" style="width: 100%" @click="checkCode">登录</span>
                </div>
            </div>
        </div>

        <!--隔层2-->
      <div class="out" v-if="outShow">
        <div class="outMin">
          <span class="close" @click="outClick"><img style="width: 18px" src="./../assets/img/err.png" alt=""></span>
          <span class="outText1">导出地址交易记录</span>
          <span style="color: #e8bf6a;font-size: 12px;margin-top: 20px">提示:导出的数据截止到前一天，并非实时数据</span>
          <div class="outMin2">
            <span class="outText2" style="width: 110px">请选择币种</span>
            <el-select v-model="outValue" style="color: #FFFFFF;" placeholder="请选择">
              <el-option
                      v-for="item in outoOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="outMin3">
            <span class="outText2" style="width: 110px">请输入地址</span>
            <el-input id="cc" style="flex: 1;color: #ffffff;" v-model="outAddress" placeholder=""></el-input>
          </div>
          <span v-show="errorT"  style="font-size: 12px;color: red;text-align: left;margin-top: 5px;box-sizing: border-box;padding-left: 110px">请填写正确地址</span>
          <div style="text-align: center;margin-top: 38px;display: flex;justify-content: center">
            <span class="loginBtn" @click="checkAddress()">导出</span>
            <a id="tcl" style="display: none" :href="Config.baseUrl+'/info/extend/download/address?coinType='+outValue+'&addressHash='+outAddress + '&random=' + token" class="loginBtn">导出</a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import headerVue from "./public/header"
    import footerVue from "./public/footer"
    import USDT_txn from './pages/USDT-txn'
    import BTC_txn from './pages/BTC-tx'
    import USDT_block from './pages/USDT-block'
    import BTC_block from './pages/BTC-block'
    import BTC_address from './pages/BTC-address'
    import USDT_address from './pages/USDT-address'
    import BCH_address from './pages/BCH-address'
    import ETH_block from './pages/ETH-block'
    import ETH_uncleBlock from './pages/ETH-uncleBlock'
    import ETH_txn from './pages/ETH-txn'
    import ETH_address from './pages/ETH-address'
    import ERC_token from './pages/ERC-token'
    import ETH_Add from './pages/ETH-add-address'
    var vm;
    export default {
      name: "detail",
      data:function(){
        vm = this;
        return {
          minHeight:0,
          params:this.$route.params,
          finalData:{},
          hide:false,
          loadIndexM:true,
          loginShow:0,
          outValue:'btc',
            outoOptions: [{
                value: 'btc',
                label: 'BTC'
            }, {
                value: 'ltc',
                label: 'LTC'
            }, {
                value: 'bch',
                label: 'BCH'
            }, {
                value: 'bchsv',
                label: 'BCHSV'
            }],
            outAddress:"",
            outShow:false,
            num:60,
            code:'',
            codeSend:true,
            codeland:false,
            codeRe:false,
            userName:'',
            passWord:'',
            token:'',
            errorT:false

        }
      },
      components:{
        headerVue,footerVue,USDT_txn,BTC_txn,USDT_block,BTC_block,BTC_address,USDT_address,BCH_address,ETH_block,ETH_uncleBlock,ETH_txn,ETH_address,ERC_token,ETH_Add
      },
      methods:{
          //导出成功显示
          open1:function() {
              this.$notify({
                  title: '成功',
                  message: '导出成功',
                  type: 'success'
              });
          },
          //核对是否是可导出地址
          checkAddress:function(){
              let that = this;
              that.ajax({
                  method:"get",
                  url:that.Config.baseUrl+'/info/extend/download/check',
                  params:{
                      coinType:that.outValue,
                      addressHash:that.outAddress
                  }
              }).then(res=>{
                  if(res.data.code == "0000"){
                      if(res.data.data){
                        //地址正确实现隐藏导出按钮自行点击进行下载
                        that.errorT = false;
                          that.open1()
                          window.open($("#tcl").attr('href'),'_self');
                          that.outShow = false;
                          $('#cc').attr("style","flex:1")
                      }else {
                        //地址不正确消息提示
                        that.errorT = true;
                          $('#cc').attr("style","border:1px solid red;flex:1")
                      }
                  }
              })
          },
          //获取可导出的币种列表
          outCoin:function(){
              let that = this;
              that.ajax({
                  method:"get",
                  url:that.Config.baseUrl+'/info/extend/coin/list'
              }).then(res=>{
                  if(res.data.code == "0000"){
                      that.outoOptions = res.data.data;
                  }
              })
          },
          //登录信息请求
          loginClickT:function(){
              let that = this;
              that.ajax({
                  method:'get',
                  url:that.Config.baseUrl + "/info/extend/user/login",
                  params:{
                    userName:that.userName,
                    password:that.$md5('chaindigg'+that.$md5(that.passWord))
                  }
              }).then(res=>{
                  console.log(res);
                  if(res.data.code == "0000"){
                    //登录名校验成功后开启手机验证码校验涂层
                    that.loginShow = 2;
                      that.Cookies.set("username",that.userName);
                      // that.Cookies.set("password",that.password);
                      that.Cookies.set("token",res.data.data);
                  }else {
                    that.$message.error(res.data.desc)
                  }
              })
          },
          //发送验证码
          //
          numT:function(){
              let that = this;
              that.num--;
              if(that.num <= 0){
                  //69s倒计时
                  that.num = 60;
                  clearInterval(that.timer);
                  that.codeSend = false;
                  that.codeland = false;
                  that.codeRe = true;
              }
          },
          //点击发送验证码
          sendCodeS:function(){
              let that = this;
              that.codeSend = false;
              that.codeland = true;
              that.codeRe = false;
              that.sendCode();
              that.timer = setInterval(that.numT,1000)
          },
          //获取验证码
          sendCode:function(){
              let that = this;
              that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
              that.ajax({
                  method:'get',
                  url:that.Config.baseUrl + "/info/extend/user/sms",
                  params:{
                      randNum:Math.random() * (100000000 - 0) + 0
                  }
              }).then(res=>{
                  if(res.data.code == '0000'){
                      that.$message.success("验证码发送成功")
                  }
              })
          },
          //校验验证码
          checkCode:function(){
              let that = this;
              if(that.code != ''){
                  that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
                  that.ajax({
                      method:'get',
                      url:that.Config.baseUrl + "/info/extend/user/sms/check",
                      params:{
                          code:that.code
                      }
                  }).then(res=>{
                      console.log(res);
                      if(res.data.code == '0000'){
                        //登录成功后涂层重置
                        that.Cookies.set("tokenNew",res.data.data);
                          that.loginShow = 0;
                          window.location.reload();
                      }else {
                          that.$message.error(res.data.desc)
                      }
                  })
              }else {

              }
          },
         //添加loading
        loadingAdd:function(){
          let that = this;
          that.loadIndexM = true;
        },
        //显示登录s
          loginShowNow:function(){
            let that  = this;
            that.loginShow = 1;
          },
          loginShowNow2:function(){
              let that  = this;
              that.loginShow = 0;
          },
        //关闭显示框
          outClick:function(){
            let that = this;
            that.outShow = !that.outShow;
            that.outAddress = "";
            that.errorT = false;

          },
        //单币种选择搜索跳转详情页
        childByValue:function (childValue) {
          //console.log(childValue);
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:{pageNum:1,channelid:this.$route.query.channelId}})
          window.location.reload()
        },
        //全币种选择搜索跳转搜索列表页
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
        },
        //根据搜索条件的类型不同，进行不同的搜索
        getFinalData:function(dataType,key,page){
          let that = this;
          //搜索类型为区块调用
          if(dataType == 'block'){
            console.log('block');
            that.getBlockData(key,page);
          }else if(dataType == 'txn'){
            //搜索类型为交易调用
            console.log("txn");
            that.getTxnData(key)
          }else if(dataType == 'address'){
            //搜索类型为地址调用
            console.log("address");
            that.getAddressData(key,page)
          }

        },
        //获取区块数据
        getBlockData:function(id,page){
          const that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          //判断时区块id还是区块hash
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              pageSize:100,
              pageNumber:page,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              pageSize:100,
              pageNumber:page,
              channelId:channelid
            }
          }
          //判断服务器是否链接成功
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
              //window.location.href = "http://10.0.0.38:8081/nosec"
              //window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/block",
            params:data
          }).then(function (res) {
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length != 0){
              //搜索结果不为空
              that.finalData = res.data.data;
              document.title=res.data.data.coinType+" "+vm.$t('text.titleBlock') + " #"+res.data.data.id+"-"+vm.$t('text.blockTitle');
              that.Cookies.set('preCoinType',data.coinType);
              that.Cookies.set('preDataType',that.params.dataType);
              that.Cookies.set('preKey',that.params.key);
              window.scrollTo(0,0);
              that.$nextTick(()=>{
                that.loadIndexM = false;

              })
            }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              //搜索结果为空
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch",params:{key:that.params.key}})
            }
          })
        },
        //点击分页发起请求
        btcPageChange:function(pageNum){
          const that = this;
          this.$router.push({name:"detail",params:that.params,query:{pageNum:pageNum+1,channelid:that.$route.query.channelId}})
          pageNum = that.$route.query.pageNum-1;
          that.getBlockData(that.params.key,pageNum);
          that.loadIndexM = true;
        },
        //点击前一区块或后裔区块发送的请求
        getBeforeBlock:function(beforeNum){
          const that = this;
          if(beforeNum != null){
            //前一区块存在
            that.$route.params.key = beforeNum;
            //that.params.id = beforeNum;

            //that.getBlockData(that.parameters)
            this.$router.push({name:"detail",params:that.params,query:{pageNum:1,channelid:that.$route.query.channelId}})
          }
          window.location.reload()
        },
        //获取交易信息
        getTxnData:function(id){
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
          //判断服务器是否链接成功
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
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
              //返回结果不为空
              that.finalData = res.data.data;
              console.log(that.finalData);
              document.title=res.data.data.coinType+ " " +vm.$t('text.titleTxn') + " "+res.data.data.hash+"-"+vm.$t('text.blockTitle');
              that.Cookies.set('preCoinType',data.coinType)
              that.Cookies.set('preDataType',that.params.dataType)
              that.Cookies.set('preKey',that.params.key)
              that.loadIndexM = false;
            }
            if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              //返回结果为空
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch",params:{key:that.params.key}})
            }
          })
        },
        //点击详情页面中的交易哈希
        btcBlockTxnChange:function(value){
          const that = this;
          that.loadIndexM = true;
          this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:{channelid:that.$route.query.channelId}})
          window.location.reload();
        },
        //点击详情页面中的地址哈希
        btcTxnAddressChange:function(value){
          const that = this;
          this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'address',key:value},query:{pageNum:1,channelid:that.$route.query.channelId}})
          window.location.reload();
        },
        //获取地址信息
        getAddressData:function(id,page){
          let that = this;
          let reg = /^[0-9]+.?[0-9]*$/;
          let channelid = "";
          if(that.$route.query.channelId == undefined){
            channelid = ""
          }else {
            channelid = that.$route.query.channelId
          }
          //判断时地址id还是地址hash
          if(reg.test(id)){
            var data = {
              coinType:that.params.coinType,
              id:id,
              pageSize:100,
              pageNumber:page,
              channelId:channelid
            }
          }else {
            var data = {
              coinType:that.params.coinType,
              hash:id,
              pageSize:100,
              pageNumber:page,
              channelId:channelid
            }
          }
          //服务器链接是否成功
          that.ajax.interceptors.response.use(function (response) {
            return response;
          }, function (err) {
            if (err && err.response) {
              that.$router.push({name:"noserver"})
              //window.location.replace( "https://test.blockdigg.com/noServers")
            }else{
              err.message = '连接服务器失败!'
            }
          });
          that.ajax({
            methods:"get",
            url:that.Config.baseUrl+"/api/address",
            params:data
          }).then(function (res) {
            if(res.data.code == "0000" && res.data.data != null && res.data.data.length !=0){
              //返回结果不为空
              that.finalData = res.data.data;
              console.log(that.finalData);
              if(res.data.data.coinType == "BCH"){
                //判断是否是bch（浏览器title名称）
                document.title=res.data.data.coinType+ " " +vm.$t('text.titleAddress') + " "+res.data.data.cashAddr+"-"+vm.$t('text.blockTitle');
              }else {
                document.title=res.data.data.coinType+ " " +vm.$t('text.titleAddress') + " "+res.data.data.hash+"-"+vm.$t('text.blockTitle');

              }
              that.Cookies.set('preCoinType',data.coinType)
              that.Cookies.set('preDataType',that.params.dataType)
              that.Cookies.set('preKey',that.params.key)
              window.scrollTo(0,0)
              that.loadIndexM = false;
            }else if(res.data.code == "0000" && (res.data.data == null || res.data.data.length == 0)){
              //返回结果为空
              console.log("1111")
              that.Cookies.set('searchWord',that.params.key);
              that.$router.push({name:"noSearch",params:{key:that.params.key}})
            }
          }).catch(err =>{
            that.$message.error(err.error)
            //console.log(err);

          })
        },
        //点击地址详情页的分页
        btcAddressPageChange:function(pageNum){
          const that = this;
          that.$router.push({name:"detail",params:that.params,query:{pageNum:pageNum+1,channelid:that.$route.query.channelId}})
          pageNum = that.$route.query.pageNum-1;
          that.getAddressData(that.params.key,pageNum)
          that.loadIndexM = true;
        },
        //点击前一交易后一交易
        btcTxnBeforeOrNextClick:function(value){
          const that = this;
          this.$router.push({name:"detail",params:{coinType:that.params.coinType,dataType:'txn',key:value},query:that.$route.query})
          window.location.reload();
        },
        //首页隐藏
        headerHide:function(){
          let that = this;
          that.$refs.headerClick.hideClick()
        }
      },
      mounted:function(){
        let that = this;
        window.onpopstate = () =>{
          window.location.reload()
        }
        if($(window).height() > 500){
          that.minHeight = $(window).height() - 101
        }else {
          that.minHeight = 500;
        }
        window.onresize = () => {
          return (() => {
            if($(window).height() > 500){
              that.minHeight = $(window).height() - 101
            }else {
              that.minHeight = 500;
            }
          })()
        };
        that.Cookies.set("zf_channelId",JSON.stringify(that.$route.query));
        console.log(that.$route.query.pageNum);
        that.getFinalData(that.params.dataType,that.params.key,that.$route.query.pageNum-1);
        that.Cookies.set('pageNow','detail');
        //mounted end
        $("#mmmc").css("display","none");
          that.token = that.Cookies.get('tokenNew')
          that.outCoin();

      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #191a1d;

  }
  .detail{
    width: 100%;
  }
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #191a1d;
    justify-content: center;
  }
  .loginMin{
    width: 540px;
    height: 582px;
    display: flex;
    background: #24262C;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 100px;
    flex-direction: column;
    position: relative;
  }
  .loginMinText1{
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 2.67px;
    margin-top: 90px;
    margin-bottom: 40px;
  }
  .inputBox{
    background: #24262C;
    border: 1px solid #383A40;
    border-radius: 2px;
    width: 340px;
    height: 40px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 24px;
  }
  .imageBox{
    width: 50px;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .inputText{
    flex: 1;
    background: #24262C;
    border: none;
    outline: none;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
  }
  .forgetPwd{
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
  }
  .loginBtn{
    width: 100%;
    height: 40px;
    background: #00A0E9;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 40px;
    text-align: center;
    margin-top: 24px;
    cursor: pointer;
  }
  .bottomText{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 110px;
    display: flex;
    align-items: center;
  }
  .close{
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
  /**/
  .out{
    position: fixed;
    background: #191a1d;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .outMin{
    background: #24262C;
    border-radius: 2px;
    width: 544px;
    height: 406px;
    box-sizing: border-box;
    padding: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .outText1{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
  }
  .outText2{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
  }
  .outMin2{
    margin-top: 48px;
    display: flex;
    align-items: center;
  }
  .outMin3{
    display: flex;
    align-items: center;
    margin-top: 24px;
  }
  .loginBtn{
    width: 88px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-select .el-input.is-focus .el-input__inner{
    color: #ffffff !important;
  }
  .el-input--suffix .el-input__inner{
    color: #ffffff !important;

  }
  .el-input__inner{
    color: #ffffff !important;
  }
  #cc input{
    color: #ffffff !important;
  }
  /**/
  .mobMin{
    display: flex;
    margin-top: 30px;
  }
  .mobNumber{
    background: #F1F1F2;
    border: 1px solid #E6E6E6;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    width: 12.25rem;
    height: 2.5rem;
    padding: 0 0.75rem;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #333333;
    margin-right: 1rem;
  }
  .code{
    width: 8rem;
    height: 2.5rem;
    background: #00A0E9;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    letter-spacing: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .radio{
    margin-top: 24px;
  }
  .mct{
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
  }
  a{
    text-decoration: none;
  }
</style>
