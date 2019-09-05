<template>
    <div class="container flex">
      <div class="flex">
        <img class="logo"  @click.stop @click="getBack" src="./../../assets/logo.svg" alt="">
        <!--搜索框-->
        <div class="search flex" @click.stop>
        <span class="select flex" @click="showClick">{{selectName | nameChange}}<img src="./../../assets/down.png" alt="">
          <ul class="hideSel" v-show="hideShow" @click.stop>
            <li v-for="site in options2" :class="colorChoose(site.value)"  @click="selectChoose(site.label,site.value)">{{site.label}}</li>
          </ul>
        </span>
          <input class="input" type="text" :placeholder="$t('text.placeHolder')" v-model="key" onkeyup="this.value=this.value.replace(/\s+/g,'')" @keyup.enter="getSearch">
          <span class="cancel" v-show="key != ''" @click="cancelClick"><img  src="./../../assets/cancel.svg" alt=""></span>
          <span class="searchBtn flex" @click="getSearch"><img src="./../../assets/search.png" alt=""></span>
        </div>
      </div>
      <div class="flex">
        <!---->
        <span class="lang" v-if="!outShow" @click="loginClick">登录</span>
        <!--多语言切换-->
        <span class="lang flex" v-if="outShow" style="margin-right: 1rem;width: auto" @click.stop @click="langShow2"><img style="width: 12px" src="./../../assets/img/user.svg" alt="">&nbsp;&nbsp;{{userName}}&nbsp;<img src="./../../assets/down.png" alt="">
          <ul class="langHide" v-show="langHide2" @click.stop>
            <li @click="outClick" style="text-align: center">数据导出</li>
            <li @click="escClick" style="text-align: center">退出登录</li>
          </ul>
        </span>

        <!--多语言切换-->
        <span class="lang flex" @click.stop @click="langShow">{{langLabel}}&nbsp;<img src="./../../assets/down.png" alt="">
        <ul class="langHide" v-show="langHide" @click.stop>
          <li v-for="site in langOptions" :class="colorChoose2(site.value)" @click="langChange(site.value)">{{site.label}}</li>
        </ul>
      </span>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "headerVue",
      data:function(){
        vm = this;
        return {
          hideShow:false,
          selectName:'全币种',
          params:this.$route.params,
          selectVal:"",
          key:"",
          langHide:false,
          langHide2:false,
          langOptions: [{
            value: 'zh',
            label: '简体中文'
          }, {
            value: 'en',
            label: 'English'
          }],
          langLabel:"简体中文",
          langVal:"zh",
            outShow:false,
            userName:""
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
          escClick:function(){
              let that = this;
              that.Cookies.remove('tokenNew')
              that.Cookies.remove('username')
              window.location.reload()
          },
        //点击登录
        loginClick:function(){
          let that = this;
          that.$emit("loginShowNow")
        },
          outClick:function(){
            let that = this;
            that.$emit("outClick");
            that.langHide2 = false;
          },
        //币种选择框显示或着隐藏
        showClick:function(){
          let that = this;
          that.hideShow = !that.hideShow;
        },
        //币种选择
        selectChoose:function(label,val){
          let that = this;
          that.selectName = label;
          that.selectVal = val;
          that.showClick();
        },
        //选择的dom高亮
        colorChoose:function(val){
          let that = this;
          if(val == that.selectVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        //选择的dom高亮
        colorChoose2:function(val){
          let that = this;
          if(val == that.langVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        //搜索
        getSearch:function(){
          let that = this;
          console.log(that.selectVal);
          console.log(that.key);
          if(that.key == ""){
            //收缩内容为空不进行操作
            return false;
          }else {
            if(that.selectVal != ""){
              //搜索为其他币种时
              that.$emit('loadingAdd')
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
              }).then(res =>{
                let resp = res.data;
                if(resp.code == "0000" && resp.data !=null && resp.data[0] != null){
                  if(resp.data[0].searchResultType == 'txn'&&(resp.data[0].confirmNum == 0 ||resp.data[0].confirmNum == null )){
                    //收缩结果为交易时
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].txHash})

                  }else {
                    //搜索结果不是交易时
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].id})
                  }
                }else if(resp.code == "0000" && (resp.data ==null || resp.data[0] == null)){
                  that.Cookies.set('selectWord',that.selectVal);
                  that.Cookies.set('searchWord',that.key.replace(/\s*/g,""));
                  that.$router.push({name:"noSearch"})
                  that.$emit('nolistChild',that.key.replace(/\s*/g,""))
                }else {
                  that.$message.error("查询失败")
                }
              })
            }else {
              //搜索为全币种时
              that.$emit('childByValue2',that.key.replace(/\s*/g,""))
            }
          }
        },
        //语言选择框显示或隐藏
        langShow:function(){
          let that = this;
          that.langHide = !that.langHide;
        },
          langShow2:function(){
              let that = this;
              that.langHide2 = !that.langHide2;
          },
        //语言选择
        langChange:function(value){
          console.log(value);
          this.Cookies.set("lang",value)
          this.$i18n.locale = value;
          window.location.reload();
        },
        //返回首页
        getBack:function(){
          let that = this;
          that.$router.push({name:"home"})
        },
        //输入框清空点击
        cancelClick:function(){
          let that = this;
          that.key = "";
          $(".input").focus()
        },
        //币种选择框和语言选择框都清除
        hideClick:function(flag){
          let that = this;
          that.langHide = false;
          that.hideShow = false;
          that.langHide2 = false;
        }
      },
      filters:{
        //币种选择中英文替换
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
        let that = this;
        //根据url中的币种来确定当前的币种选择
        if(that.params.coinType != undefined){
          that.selectVal = that.params.coinType;
          that.options2.forEach((value =>{
            if(value.value == that.params.coinType.toLowerCase()){
              that.selectName = value.label;
            }
          }))
        }else {
          that.selectName = "全币种";
          that.selectVal = "";
        }
        //有缓存的选择语言时就用选择的语言，缓存中没有的话默认为中文
        if(that.Cookies.get("lang") == undefined){
          that.$i18n.locale = 'zh'
        }else {
          that.$i18n.locale = that.Cookies.get("lang");
          that.langVal = that.Cookies.get("lang");
          that.langOptions.forEach((val)=>{
            if(val.value == that.langVal){
              that.langLabel = val.label;
            }
          })
        }
        if(that.Cookies.get('tokenNew') == undefined){
            that.outShow = false;
        }else {
            that.outShow = true;
            that.userName = that.Cookies.get('username')
        }
      }
    }
</script>

<style scoped>
  input::-ms-clear{display:none;}
    .container{
      width: 100%;
      height: 4rem;
      padding: 0 2.5rem;
      /*font-family: PingFangSC-Regular;*/
      -moz-user-select:none; /*火狐*/
      -webkit-user-select:none; /*webkit浏览器*/
      -ms-user-select:none; /*IE10*/
      -khtml-user-select:none; /*早期浏览器*/
      user-select:none;
      border-bottom: 1px solid #000000;
      justify-content: space-between;
    }
  .flex{
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .logo{
    cursor: pointer;
  }
  .search{
    width: 40.5rem;
    height: 2rem;
    background: #24262C;
    border-radius: 2px;
    margin-left: 10.875rem;
  }
  .select{
    width: 5.75rem;
    height: 100%;
    justify-content: center;
    font-size: 0.875rem;
    color: #FFFFFF;
    cursor: pointer;
    position: relative;
  }
  .select img{
    margin-left: 0.5rem;
  }
  .search input{
    flex: 1;
    height: 100%;
    outline: none;
    background: none;
    border: none;
    color: #ffffff;
  }
  .searchBtn{
    width: 3rem;
    height: 100%;
    background: #00A0E9;
    justify-content: center;
    cursor: pointer;
  }
  .search input::-webkit-input-placeholder{
    color: rgba(153,153,153,0.6);
    font-size: 11px;
  }
  .search input::-moz-placeholder{
    color: rgba(153,153,153,0.6);
    font-size: 11px;
  }
  .search input:-ms-input-placeholder{
    color: rgba(153,153,153,0.6);
    font-size: 11px;
  }
  .hideSel{
    width: 5.75rem;
    box-sizing: border-box;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
    position: absolute;
    top: 2.5rem;
    left: 0rem;
    cursor: none;
  }
  li{
    list-style: none;
  }
  .hideSel li{
    /*font-family: PingFangSC-Regular;*/
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
  /**/
  .lang{
    width: 5.5rem;
    /*font-family: PingFangSC-Regular;*/
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    line-height: 16px;
    cursor: pointer;
    position: relative;
  }
  .langHide{
    width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
  }
  .langHide li{
    width: 100%;
    padding: 6px 1rem;
    box-sizing: border-box;
    /*font-family: PingFangSC-Regular;*/
    font-size: 14px;
    color: #FFFFFF;
    opacity: 1 !important;
  }
  .langHide li:hover{
    color: #00A0E9;
  }
    .cancel{
      padding: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
</style>
