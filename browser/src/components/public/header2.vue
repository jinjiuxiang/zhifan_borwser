<template>
    <div class="container flex">
        <!---->
        <span class="lang" v-if="!outShow" @click="loginClick">登录</span>
        <!--多语言切换-->
        <span class="lang flex" v-if="outShow" style="margin-right: 1rem;width: auto" @click.stop @click="langShow2"><img style="width: 12px" src="./../../assets/img/user.svg" alt="">&nbsp;&nbsp;{{userName}}&nbsp;<img src="./../../assets/down.png" alt="">
          <ul class="langHide" v-show="langHide2" @click.stop>
            <li @click="outClick" style="text-align: center">数据导出</li>
            <li @click="escClick" style="text-align: center">退出登录</li>
          </ul>
        </span>
      <span class="lang flex" @click.stop @click="langShow">{{langLabel}}&nbsp;<img src="./../../assets/down.png" alt="">
        <ul class="langHide" v-show="langHide" @click.stop>
          <li v-for="site in langOptions" :class="colorChoose2(site.value)" @click="langChange(site.value)">{{site.label}}</li>
        </ul>
      </span>
    </div>
</template>

<script>
    export default {
      name: "headerVue",
      data:function(){
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
              label: 'BCHSV'
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
        //退出登录
          outClick:function(){
              let that = this;
              that.$emit("outClick");
              that.langHide2 = false;
          },
        //语言选择框显示
          langShow2:function(){
              let that = this;
              that.langHide2 = !that.langHide2;
          },
        showClick:function(){
          let that = this;
          that.hideShow = !that.hideShow;
        },
        selectChoose:function(label,val){
          let that = this;
          that.selectName = label;
          that.selectVal = val;
          that.showClick();
        },
        colorChoose:function(val){
          let that = this;
          if(val == that.selectVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        colorChoose2:function(val){
          let that = this;
          if(val == that.langVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        //开始搜索
        getSearch:function(){
          let that = this;
          console.log(that.selectVal);
          console.log(that.key);
          if(that.key == ""){
            //搜索内容为空时不做任何操作
            return false;
          }else {
            if(that.selectVal != ""){
              //选择其他币种
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
                  key:that.key
                }
              }).then(res =>{
                let resp = res.data;
                if(resp.code == "0000" && resp.data !=null && resp.data[0] != null){
                  if(resp.data[0].searchResultType == 'txn'&&(resp.data[0].confirmNum == 0 ||resp.data[0].confirmNum == null )){
                    //查询结果为交易
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].txHash})

                  }else {
                    //查询结果不为交易
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].id})
                  }
                }else if(resp.code == "0000" && (resp.data ==null || resp.data[0] == null)){
                  that.Cookies.set('selectWord',that.selectVal);
                  that.Cookies.set('searchWord',that.key);
                  that.$router.push({name:"noSearch"})
                  that.$emit('nolistChild',that.key)
                }else {
                  that.$message.error("查询失败")
                }
              })
            }else {
              console.log("选择全币种")
            }
          }
        },
        langShow:function(){
          let that = this;
          that.langHide = !that.langHide;
        },
        langChange:function(value){
          console.log(value);
          this.Cookies.set("lang",value)
          this.$i18n.locale = value;
          window.location.reload();
        },
        hideClick:function(flag){
          let that = this;
          that.langHide = false;
            that.langHide2 = false;
        }
      },
      mounted:function(){
        let that = this;
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
      justify-content: flex-end;
    }
  .flex{
    display: flex;
    align-items: center;
    box-sizing: border-box;
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
    height: 1.5rem;
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
    font-size: 0.875rem;
  }
  .search input::-moz-placeholder{
    color: rgba(153,153,153,0.6);
    font-size: 0.875rem;
  }
  .search input:-ms-input-placeholder{
    color: rgba(153,153,153,0.6);
    font-size: 0.875rem;
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
    .el-input__inner{
        color: #ffffff !important;
    }
</style>
