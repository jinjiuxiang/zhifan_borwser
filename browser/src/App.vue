<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'App',
    data:function(){
      return {
        minHeight:500,
        loadIndexM:true
      }
    },
    methods:{
      langChange:function(value){
        let that = this;
        Cookies.set("lang",value)
        that.$i18n.locale = value;
      },
      langFirst:function(){
        let that = this;
        let JsSrc =(navigator.language || navigator.browserLanguage).toLowerCase();
        console.log(JsSrc);
        Cookies.set("firstLang",JsSrc)
        if(JsSrc.indexOf('en') != -1){
          that.langChange('en')
        }else {
          that.langChange('zh')
        }
      }
    },
    mounted:function(){
      let that = this;
      if(Cookies.get("firstLang") == undefined){
        that.langFirst();
      }
      if($(window).height() > 500){
        that.minHeight = $(window).height()
      }else {
        that.minHeight = 500;
      }
      window.onresize = () => {
        return (() => {
          if($(window).height() > 500){
            that.minHeight = $(window).height()
          }else {
            that.minHeight = 500;
          }
        })()
      };
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: PingFangSC-Regular,黑体, Arial,'Avenir', Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 1400px;
    min-height: 500px;
    background: #191a1d;
  }
</style>
