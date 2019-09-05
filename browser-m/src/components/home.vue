<template>
    <div class="container" @click="headHide" v-show="mainShow">
      <!--头部输入框，多语言切换-->
      <headVue ref="headerClick" @click.stop></headVue>
      <div class="home" :style="{minHeight:minHeight + 'px'}">
        <img class="logo" :style="{marginTop:minHeight/3.5 + 'px'}" v-show="$i18n.locale == 'en'" src="./../assets/logoh.svg" alt="">
        <img class="logo" :style="{marginTop:minHeight/3.5 + 'px'}" v-show="$i18n.locale == 'zh'" src="./../assets/logoh1.svg" alt="">
        <div class="search">
          <span @click.stop class="coin" @click="showClick">{{selectName | nameChange}}&nbsp;&nbsp;<img src="./../assets/downt.svg" alt="">
            <ul class="select" v-show="hideShow" @click.stop>
              <li v-for="site in options2" :class="colorChoose(site.value)" @click="selectChoose(site.label,site.value)">{{site.label}}</li>
            </ul>
          </span>
          <input class="text" type="text" :placeholder="$t('text.placeHolder')" v-model="key" @focus="focusOn" @keyup.enter="getSearch">
          <span class="nBtn">
            <li class="cancel" @click="cancelClick" v-show="key != ''"><img src="./../assets/cancelm.svg" alt=""></li>
            <li class="space" v-show="fShow"></li>
            <li class="qx" v-show="fShow" @click="getSearch">搜索</li>
          </span>
          <span class="searchBtn" v-show="!fShow">
             <img src="./../assets/searchm.svg" alt="">
          </span>
        </div>
        <!--最新区块-->
        <newBlock v-on:getShow="getShow"></newBlock>
      </div>
      <!--免责声明-->
      <footVue></footVue>
    </div>
</template>

<script>
    import headVue from './public/header2'
    import footVue from './public/footerVue';
    import newBlock from './public/newBlock'
    var vm;
    export default {
      name: "home",
      components:{
        headVue,footVue,newBlock
      },
      data(){
        vm = this;
        return {
          minHeight:0,
          fShow:false,
          key:"",
          hideShow:false,
          selectName:'全币种',
          params:this.$route.params,
          selectVal:"",
          mainShow:false
        }
      },
      computed:{
        options2(){
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
        //获取焦点
        focusOn(){
          let that = this;
          that.fShow = true;
        },
        //清空输入框内容
        cancelClick(){
          let that = this;
          that.key = "";
          $(".text").focus();
        },
        //点击取消按钮
        qxClick(){
          let that = this;
          that.key = "";
          that.fShow = false;
        },
        //开始搜索
        getSearch(){
          let that = this;
          console.log(window.location)
          if(that.key == ""){
            return false
          }else {
            if(that.selectVal != ""){
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
              }).then(res=>{
                let resp = res.data;
                if(resp.code == "0000"){
                  if(resp.data !=null && resp.data[0] != null){
                    if(resp.data[0].searchResultType == 'txn'&&(resp.data[0].confirmNum == 0 ||resp.data[0].confirmNum == null )){
                      that.$router.push({name:"detail",params:{coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].txHash}})
                    }else {
                      that.$router.push({name:"detail",params:{coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].id}})
                    }
                  }else if(resp.data ==null || resp.data[0] == null){
                    that.Cookies.set('selectWord',that.selectVal);
                    that.Cookies.set('searchWord',that.key);
                    that.$router.push({name:"noSearch"})
                  }else {
                    that.$message.error("查询失败")
                  }
                }
              })
            }else {
              that.$router.push({name:"searchList",params:{key:that.key}});
            }
          }
        },
        //币种选择区显示或隐藏
        showClick(){
          let that = this;
          that.hideShow = !that.hideShow;
        },
        //币种选择
        selectChoose(label,val){
          let that = this;
          that.selectName = label;
          that.selectVal = val;
          that.showClick();
        },
        //选择的节点高亮
        colorChoose(val){
          let that = this;
          if(val == that.selectVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        //对应的取消
        headHide(){
          let that = this;
          that.hideShow = false;
          that.$refs.headerClick.hideClick()
        },
        //最新区块数据到了全部渲染
        getShow(){
          let that = this;
          that.mainShow = true;
        }
      },
      filters:{
        //币种选择的中英文转换
        nameChange(val){
          let that = this;
          if(val == '全币种'){
            return vm.$t("text.currencyKind")
          }else{
            return val
          }
        }
      },
      mounted(){
        let that = this;
        that.minHeight = $(window).height() - 184
        // window.onresize = () => {
        //   return (() => {
        //     that.minHeight = $(window).height() - 158
        //   })()
        // };
        document.title = vm.$t("text.blockTitle");
        that.Cookies.set('pageNow','home');

      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #191a1d;
  }
  .home{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding:0 0.75rem;
  }
  .search{
    width: 100%;
    height: 2.5rem;
    background: #24262C;
    border-radius: 2px;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .coin{
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    position: relative;
    padding-left: 0.75rem;
  }
  .coin img{
    width: 10px;
  }
  li{
    list-style: none;
  }
  .select{
    width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
  }
  .select li{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 0px 6px 12px;
  }
  .nBtn{
    height: 0.75rem;
    display: flex;
    align-items: center;
  }
  .cancel{
    width: 0.75rem;
    height: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.5rem;
  }
  .cancel img{
    width: 10px;
    height: 10px;
  }
  .space{
    width: 1px;
    height: 100%;
    opacity: 0.4;
    background: #FFFFFF;
    margin: 0 4px;
  }
  .qx{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.75rem;
  }
  .text{
    flex: 1;
    box-sizing: border-box;
    padding: 0 6px;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    outline: none;
    border: none;
    background: none;
  }
  .searchBtn{
    display: flex;
    align-items: center;
    padding-right: 0.75rem;
  }
  .isSelect{
    color: #00A0E9 !important;
  }
</style>
