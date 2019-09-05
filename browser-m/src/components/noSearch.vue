<template>
    <div class="container" @click="headerHide">
      <headerVue v-on:childByValue="childByValue" v-on:nolistChild="nolistChild" v-on:childByValue2="childByValue2" ref="headerClick" @click.stop></headerVue>
      <div class="detail" :style="{minHeight:minHei + 'px'}">
        <img src="./../assets/nosearch.png" alt="" :style="{marginTop:105 + 'px'}">
        <span class="text">{{$t('text.noListLeft')}} “{{value}}” {{$t('text.noListRight')}}</span>
        <span class="text" style="margin-top: 1rem">{{$t('text.newNoList')}}</span>
      </div>
      <footerVue></footerVue>
    </div>
</template>

<script>
    import headerVue from "./public/header"
    import footerVue from "./public/footerVue"
    var vm;
    export default {
      name: "noSearch",
      data(){
        vm =this;
        return {
          minHeight:0,
          value:""
        }
      },
      components:{
        headerVue,footerVue
      },
      methods:{
        childByValue:function (childValue) {
          //console.log(childValue);
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:JSON.parse(this.Cookies.get("zf_channelId"))})
        },
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
        },
        nolistChild(value){
          let that = this;
          that.value = value;
          window.location.reload()
        },
        backPreClick(){
          if(this.Cookies.get('pageNow') == 'home'){
            this.$router.push({name:"home"})
          }else if(this.Cookies.get('pageNow') == 'detail'){
            this.$router.push({name:"detail",params:{coinType:this.Cookies.get('preCoinType'),dataType:this.Cookies.get('preDataType'),key:this.Cookies.get('preKey')},query:JSON.parse(this.Cookies.get("zf_channelId"))})
          }
        },
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
        that.$router.push({name:"noSearch"})
        that.minHeight = $(window).height() - 158;
        // window.onresize = () => {
        //   return (() => {
        //     that.minHeight = $(window).height() - 158
        //   })()
        // }
        // history.pushState(null, null, document.URL);
        // window.addEventListener('popstate', function () {
        //   history.pushState(null, null, document.URL);
        // });
        console.log(that.minHei);
        that.value = that.Cookies.get('searchWord');
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
  .detail{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .detail img{
    /*height: 152px;*/
    width: 129px;
  }
  .text{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    width: 237px;
    margin-top: 60px;
    word-break: break-all;
  }
</style>
