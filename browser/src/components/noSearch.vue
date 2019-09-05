<template>
    <div class="container" @click="headerHide">
      <!--头部搜索和多语言切换-->
      <headerVue v-on:childByValue="childByValue" v-on:nolistChild="nolistChild" v-on:childByValue2="childByValue2" ref="headerClick" v-on:loginShowNow="loginShowNow" v-on:outClick="outClick" @click.stop></headerVue>
      <div class="detail" :style="{minHeight:minHeight + 'px'}">
        <img src="./../assets/nosearch.png" alt="" :style="{marginTop:minHeight/2-152 + 'px'}">
        <span class="text">{{$t('text.noListLeft')}} “{{value}}” {{$t('text.noListRight')}}</span>
        <span class="text" style="margin-top: 1rem">{{$t('text.newNoList')}}</span>
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
    var vm;
    export default {
      name: "noSearch",
      data:function(){
        vm =this;
        return {
          minHeight:0,
          value:"",
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
        headerVue,footerVue
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
        //校验是否是可导出的地址
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
                          that.errorT = false;
                          that.open1()
                          window.open($("#tcl").attr('href'),'_self');
                          that.outShow = false;
                          $('#cc').attr("style","flex:1")
                      }else {
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
          //显示登录s
          loginShowNow:function(){
              let that  = this;
              that.loginShow = 1;
          },
          loginShowNow2:function(){
              let that  = this;
              that.loginShow = 0;
          },
          //关闭显示
          outClick:function(){
              let that = this;
              that.outShow = !that.outShow;
              that.outAddress = "";
            that.errorT = false;
          },
          //登录信息提交
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
                    //登录成功掩饰手机验证码涂层
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
                        //验证码校验成功页面刷新
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
        //单币种选择跳转到详情页
        childByValue:function (childValue) {
          //console.log(childValue);
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:JSON.parse(this.Cookies.get("zf_channelId"))})
        },
        //全币种选择跳转到搜索列表页
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
        },
        //但其那页面搜索依旧没有结果
        nolistChild:function(value){
          let that = this;
          that.value = value;
        },
        //返回上一页面
        backPreClick:function(){
          if(this.Cookies.get('pageNow') == 'home'){
            this.$router.push({name:"home"})
          }else if(this.Cookies.get('pageNow') == 'detail'){
            this.$router.push({name:"detail",params:{coinType:this.Cookies.get('preCoinType'),dataType:this.Cookies.get('preDataType'),key:this.Cookies.get('preKey')},query:JSON.parse(this.Cookies.get("zf_channelId"))})
          }
        },
        //返回首页
        getHome:function(){
          this.$router.push({name:"home"})
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
          that.backPreClick();
          //window.history.go(-1);
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
        }
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
          history.pushState(null, null, document.URL);
        });
        that.value = that.Cookies.get('searchWord');
        document.title = vm.$t("text.blockTitle")
          that.token = that.Cookies.get('tokenNew')

          that.outCoin();

          //mounted end
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .detail img{
    height: 152px;
    width: 180px;
  }
  .text{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
    letter-spacing: 0;
    width: 54rem;
    text-align: center;
    margin-top: 3rem;
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
