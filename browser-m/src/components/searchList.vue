<template>
  <div class="container" v-show="containerShow" @click="headerHide">
    <headVue v-on:childByValue="childByValue" v-on:childByValue2="childByValue2" ref="headerClick" @click.stop></headVue>
    <div class="list" :style="{minHeight:minHei + 'px'}">
      <p class="resTitle">
        <span class="key">“{{params.key}}”</span>&nbsp;&nbsp;{{total}} {{$t('text.resFooter')}}
      </p>
      <div v-for="site in listArr">
        <blockMin v-if="site.searchResultType == 'block'" :message="site"></blockMin>
        <txnMin v-if="site.searchResultType == 'txn'" :message="site"></txnMin>
        <addrMin v-if="site.searchResultType == 'address'" :message="site"></addrMin>
      </div>
    </div>
    <footerVue></footerVue>
  </div>
</template>

<script>
    import headVue from './public/header'
    import footerVue from './public/footerVue'
    import blockMin from './min/blockMin'
    import txnMin from './min/txnMin'
    import addrMin from './min/addrMin'
    var vm;
    export default {
      name: "searchList",
      components:{
        headVue,footerVue,blockMin,txnMin,addrMin
      },
      data(){
        vm = this;
        return {
          minHeight:0,
          params:this.$route.params,
          total:0,
          listArr:[],
          containerShow:false
        }
      },
      methods:{
        childByValue:function (childValue) {
          this.$router.push({name:"detail",params:{coinType:childValue.coinType,dataType:childValue.dataType,key:childValue.key},query:this.$route.query})
        },
        childByValue2:function (key) {
          let that = this;
          that.$router.push({name:"searchList",params:{key:key}})
          window.location.reload()
        },
        getList(){
          let that = this;
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
              coinType:"",
              key:that.params.key
            }
          }).then(res=>{
            let resp = res.data;
            if(resp.code == "0000"){
              if(resp.data == null || resp.data[0] == null){
                that.Cookies.set('searchWord',that.params.key);
                that.$router.push({name:"noSearch"})
              }else {
                that.listArr = resp.data;
                that.total = resp.data.length;
                that.containerShow = true;
              }
            }
          })
        },
        //首页隐藏
        headerHide(){
          let that = this;
          that.$refs.headerClick.hideClick()
        }
      },
      created(){
        let that = this;
        that.getList();
      },
      mounted(){
        let that = this;
        window.onpopstate = () =>{
          window.location.reload()
        }
        that.minHeight = $(window).height() - 158
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
  .list{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem;
    box-sizing: border-box;
  }
  .resTitle{
    text-align: left;
    font-family: Arial,PingFangSC-Regular;
    font-size: .875rem;
    color: #ffffff;
    letter-spacing: 0;
    margin: 1.5rem 0;
  }
  .resTitle span{
    word-wrap: break-word;
  }
  .key{
    color: #00A0E9;
  }
  li{
    list-style: none;
  }
</style>
