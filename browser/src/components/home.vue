<template>
    <div class="container" @click="headHide" v-loading="loadIndex" element-loading-text="加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <!--头部多语言选择部分-->
      <headVue ref="headerClick" @click.stop v-on:loginShowNow="loginShowNow" v-on:outClick="outClick"></headVue>
      <div class="home" :style="{minHeight:minHeight + 'px'}">
        <img class="logo" :style="{marginTop:minMargin *2.5 + 'rem'}" src="./../assets/tilogo1.svg" alt="">
        <span class="logoText">{{$t('text.browser')}}</span>
        <div class="search" :style="{minWidth:minWidth + 'rem',marginTop:minMargin + 'rem'}">
          <span @click.stop class="select" @click="showClick">{{selectName | nameChange}} <img src="./../assets/down.png" alt="">
            <ul class="hideSel" v-show="hideShow" @click.stop>
              <li v-for="site in options2" :class="colorChoose(site.value)" @click="selectChoose(site.label,site.value)">{{site.label}}</li>
            </ul>
          </span>
          <input class="input" type="text" v-model="key" :placeholder="$t('text.placeHolder')" onkeyup="this.value=this.value.replace(/\s+/g,'')" @keyup.enter="getSearch">
          <span class="cancel" v-show="key != ''" @click="cancelClick"><img src="./../assets/cancel.svg" alt=""></span>
          <span class="searchBtn" @click="getSearch"><img src="./../assets/hsearch.svg" alt=""></span>
        </div>
        <!--最新区块-->
        <newBlock v-on:getShow="getShow"></newBlock>
      </div>
      <!--底部免责声明-->
      <footerVue></footerVue>
      <!--登陆弹窗（输入用户名密码）-->
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
      <!--导出数据界面-->
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
    import headVue from './public/header2'
    import footerVue from './public/footer';
    import newBlock from  './public/newBlock'
    var vm;
    export default {
      name: "home",
      components:{
        headVue,footerVue,newBlock
      },
      data:function(){
        vm = this;
        return {
          minHeight:0,
          minWidth:0,
          isOn:false,
          hideShow:false,
          selectName:"全币种",
          selectVal:"",
          key:"",
          minMargin:0,
          mainShow:false,
          loadIndex:true,
            loadIndexM:true,
            loginShow:0,
            outValue:'btc',
            outoOptions: [],
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
      computed:{
        options2:function(){
          return [
            {
              value: '',
              label: this.$t("text.currencyKind")
            }, {
              value: 'btc',
              label: 'BTC'
            }, {
              value: 'bch',
              label: 'BCH'
            }, {
              value: 'ltc',
              label: 'LTC'
            }, {
              value: 'usdt',
              label: 'USDT'
            }
            ,{
              value: 'bchsv',
              label: 'BSV'
            }
          ]
        }
      },
      methods:{
          //导出成功
          open1:function() {
              this.$notify({
                  title: '成功',
                  message: '导出成功',
                  type: 'success'
              });
          },
          //核对需要导出的地址是否正确
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
                          that.errorT = true;
                          //地址不正确消息提示
                          $('#cc').attr("style","border:1px solid red;flex:1")
                      }
                  }
              })
          },
          //获取可以进行文件导出的币种
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
          //显示登录页面
          loginShowNow:function(){
              let that  = this;
              that.loginShow = 1;
          },
          //登录页面切换
          loginShowNow2:function(){
              let that  = this;
              that.loginShow = 0;
          },
          //关闭导出数据窗口
          outClick:function(){
              let that = this;
              that.outShow = !that.outShow;
              that.outAddress = "";
              that.errorT = false;
          },
          //输入用户名密码进行登录校验
          loginClickT:function(){
              let that = this;
              that.ajax({
                  method:'get',
                  url:that.Config.baseUrl+"/info/extend/user/login",
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
          //验证码时间计时
          numT:function(){
              let that = this;
              that.num--;
              if(that.num <= 0){
                  //60s倒计时
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
              //开启计时器
              that.timer = setInterval(that.numT,1000)
          },
          //验证码获取请求
          sendCode:function(){
              let that = this;
              that.ajax.defaults.headers.get['token'] = that.Cookies.get("token");
              that.ajax({
                  method:'get',
                  url:that.Config.baseUrl+ "/info/extend/user/sms",
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
          //币种选择
          selectChoose:function(label,val){
            let that = this;
            that.selectName = label;
            that.selectVal = val;
            that.showClick();
          },
        //币种选择区域显示或隐藏
        showClick:function(){
          let that = this;
          that.hideShow = !that.hideShow;
        },
        //选中元素高亮
        colorChoose:function(val){
          let that = this;
          if(val == that.selectVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        //搜索
        getSearch:function(){
          let that = this;
          console.log(window.location)
          if(that.key == ""){
            //输入只为空不进行操作
            return false
          }else {
            if(that.selectVal != ""){
              //选择非全币种时操作
              //判断链接服务器是否成功
              that.ajax.interceptors.response.use(function (response) {
                return response;
              }, function (err) {
                if (err && err.response) {
                  that.$router.push({name:"noserver"})
                  //window.location.href = "https://test.blockdigg.com/detail/noSec"
                }else{
                  err.message = '连接服务器失败!'
                }
              });
              that.ajax({
                methods:"get",
                url:that.Config.baseUrl +"/api/search",
                params:{
                  coinType:that.selectVal,
                  key:that.key.replace(/\s*/g,"")
                }
              }).then(res=>{
                let resp = res.data;
                if(resp.code == "0000"){
                  if(resp.data !=null && resp.data[0] != null){
                    if(resp.data[0].searchResultType == 'txn'&&(resp.data[0].confirmNum == 0 ||resp.data[0].confirmNum == null )){
                      //判断是否是交易是交易跳到交易页面
                      that.$router.push({name:"detail",params:{coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].txHash},query:{pageNum:1,channelid:this.$route.query.channelId}})
                    }else {
                      //不是交易跳到其他页面
                      that.$router.push({name:"detail",params:{coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].id},query:{pageNum:1,channelid:this.$route.query.channelId}})
                    }
                  }else if(resp.data ==null || resp.data[0] == null){
                    //查询不到跳转到查询不到页面
                    that.Cookies.set('selectWord',that.selectVal);
                    that.Cookies.set('searchWord',that.key.replace(/\s*/g,""));
                    that.$router.push({name:"noSearch"})
                  }else {
                    that.$message.error("查询失败")
                  }
                }
              })
            }else {
              //跳转到搜索结果页
              that.$router.push({name:"searchList",params:{key:that.key}});
            }
          }
        },
        //点击清除按钮
        cancelClick:function(){
          let that = this;
          that.key = "";
          $(".input").focus()
        },
        //多语言选择区域显示或隐藏
        headHide:function(){
          let that = this;
          that.hideShow = false;
          that.$refs.headerClick.hideClick()
        },
        //获取到最新区块的数值后全部显示
        getShow:function(){
          let that = this;
          that.mainShow = true;
          that.loadIndex = false;
        }
      },
      filters:{
        //多币种中英文切换汉字处理
        nameChange:function(val){
          let that = this;
          if(val == '全币种'){
            return vm.$t("text.currencyKind")
          }else{
            return val
          }
        }
      },
      mounted:function(){
        //获取屏幕距离，保持全凭状态
        let that = this;
        //限制高度
        if($(window).height() > 500){
          that.minHeight = $(window).height() - 101
        }else {
          that.minHeight = 500;
        }
        //限制局部宽度
        if(($(window).width()*2)/80 > 37.5 ){
          that.minWidth = ($(window).width()*2)/80
        }else {
          that.minWidth = 37.5
        }
        if($(window).height()/192 > 2.5 ){
          that.minMargin = $(window).height()/160
        }else {
          that.minMargin = 2.5
        }
        //屏幕缩放时调节
        window.onresize = () => {
          return (() => {
            if($(window).height() > 500){
              that.minHeight = $(window).height() - 101
            }else {
              that.minHeight = 500;
            }
            if(($(window).width()*2)/80 > 37.5 ){
              that.minWidth = ($(window).width()*2)/80
            }else {
              that.minWidth = 37.5
            }
            if($(window).height()/192 > 2.5 ){
              that.minMargin = $(window).height()/192
            }else {
              that.minMargin = 2.5
            }
          })()
        };
        document.title = vm.$t("text.blockTitle");
        that.Cookies.set('pageNow','home');
          that.token = that.Cookies.get('tokenNew')
          that.outCoin();
      }
    }
</script>

<style scoped>
  input::-webkit-search-cancel-button{
    display: none;
  }
  input[type=search]::-ms-clear{
    display: none;
  }
  input::-ms-clear{display:none;}
  li{
    list-style: none;
  }
  .container{
    width: 100%;
    background-color: #191a1d;
  }
  .home{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo{
    /*margin-top: 10rem;*/
    width: 353px;
  }
  .logoText{
    width: 353px;
    margin: 0 auto;
    text-align: right;
    color: #ffffff;
    font-size: 20px;
  }
  .search{
    /*width: 37.5rem;*/
    height: 2.5rem;
    background: #24262C;
    border-radius: 2px;
    /*margin-top: 2.5rem;*/
    display: flex;
    align-items: center;
  }
  .select{
    width: 5.75rem;
    height: 100%;
    justify-content: center;
    font-size: 0.875rem;
    color: #FFFFFF;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px 0 0 2px;
  }
  .select img{
    margin-left: 0.5rem;
  }
  .input{
    flex: 1;
    height: 100%;
    outline: none;
    border: none;
    font-size: 14px;
    color: #FFFFFF;
    background: none;
  }
  .cancel{
    padding: 0 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .searchBtn{
    width: 4rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00A0E9;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
  }
  .hideSel{
    width: 5.75rem;
    box-sizing: border-box;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
    position: absolute;
    top: 3rem;
    left: 0rem;
    cursor: none;
  }
  .hideSel li{
    font-size: 14px;
    color: #FFFFFF;
    box-sizing: border-box;
    padding: 6px 1rem;
    cursor: pointer;
  }
  .hideSel li:hover{
    color: #00A0E9;
  }
  .isSelect{
    color: #00A0E9 !important;
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
    background:rgba(25,26,29,0.5);
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
