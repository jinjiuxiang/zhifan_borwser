<template>
   <div class="container" @click="headerHide">
     <!--头部输入框，多语言选择-->
     <headerVue v-on:childByValue="childByValue" v-on:childByValue2="childByValue2" ref="headerClick" @click.stop></headerVue>
     <div class="noPage" :style="{minHeight:minHei + 'px'}">
       <img src="./../assets/404.png" alt="" :style="{marginTop:105 + 'px'}">
       <span class="text">您访问的页面不存在</span>
       <p class="btnBox">
          <span @click="backPreClick">{{$t('text.Return')}}</span>
          <span @click="getHome">{{$t('text.Home')}}</span>
       </p>
     </div>
     <!--免责声明-->
     <footerVue></footerVue>
   </div>
</template>

<script>
    import headerVue from "./public/header"
    import footerVue from "./public/footerVue"
    var vm;
    export default {
      name: "noPage",
      data(){
        vm = this;
        return {
          minHeight:0,
          params:this.$route.params,
        }
      },
      components:{
        headerVue,footerVue
      },
      methods:{
        //但币种选择跳转到详情页面
        childByValue:function (childValue) {
          console.log(childValue);
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:this.$route.query})
        },
        //全币种选择跳转到搜索列表页
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
        },
        //返回上一页
        backPreClick(){
          if(this.Cookies.get('pageNow') == 'home'){
            this.$router.push({name:"home"})
          }else if(this.Cookies.get('pageNow') == 'detail'){
            this.$router.push({name:"detail",params:{coinType:this.Cookies.get('preCoinType'),dataType:this.Cookies.get('preDataType'),key:this.Cookies.get('preKey')},query:JSON.parse(this.Cookies.get("zf_channelId"))})
          }
        },
        //返回首页
        getHome(){
          this.$router.push({name:"home"})
        },
        //首页隐藏
        headerHide(){
          let that = this;
          that.$refs.headerClick.hideClick()
        }
      },
      mounted(){
        let that = this;
        window.onpopstate = () =>{
          that.backPreClick();
        }
        that.minHeight = $(window).height() - 158
        // window.onresize = () => {
        //   return (() => {
        //     that.minHeight = $(window).height() - 158
        //   })()
        // };
        //禁止浏览器后退事件
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
          history.pushState(null, null, document.URL);
        });
        document.title = vm.$t("text.blockTitle")

        //mounted end
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    background-color: #191a1d;
  }
  .noPage{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .noPage img{
    width: 120px;
  }
  .text{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 47px;
  }
  .btnBox{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 17px;
  }
  .btnBox span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .btnBox span:nth-child(1){
    border: 1px solid #00A0E9;
    border-radius: 18px;
    color: #00A0E9;
    margin-right: 1.5rem;
  }
  .btnBox span:nth-child(2){
    background: #00A0E9;
    border-radius: 18px;
    color: #FFFFFF;
  }
</style>
