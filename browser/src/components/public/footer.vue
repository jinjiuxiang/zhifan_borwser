<template>
   <div class="container">
      <span @click="aboutUS">关于我们</span>
      <span @click="disclaimer">免责声明</span>
      <span>© 2019 北京知帆科技有限公司 版权所有 京ICP备17074962号-1 &emsp;&emsp;<span class="cm" @click="linkClick" style="display: flex;align-items: center"><img src="./../../assets/min.jpg" alt="">&emsp;京公网安备 11010802028427号</span></span>
   </div>
</template>

<script>
    export default {
      name: "footerVue",
      methods:{
        //点击关于我们
        aboutUS:function(){
          window.open('https://www.chaindigg.com/')
        },
        //点击免责声明
        disclaimer:function(){
          window.open('https://www.chaindigg.com/disclaimer')
        },
        //点击京公网安备
        linkClick:function(){
          window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
        }
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 2.25rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container span{
    /*font-family: PingFangSC-Regular;*/
    font-size: 0.75rem;
    color: #666666;
    cursor: pointer;
  }
  .container span:nth-child(1):hover{
    color: #ffffff;
  }
  .container span:nth-child(2):hover{
    color: #ffffff;
  }
  .container span:nth-child(2){
    margin: 0 2.5rem 0 2rem;
  }
  .container span:nth-child(3){
    /*color: #999999;*/
    cursor: text;
    display: flex;
    align-items: center;
  }
</style>
