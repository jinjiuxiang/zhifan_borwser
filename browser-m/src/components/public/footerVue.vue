<template>
    <div class="container">
        <span class="click">
          <li @click="aboutUS">关于我们</li>
          <li @click="disclaimer">免责声明</li>
        </span>
      <span class="desc">© 2019 北京知帆科技有限公司 版权所有 京ICP备17074962号-1</span>
      <span class="desc" @click="linkClick"><img src="./../../assets/min.jpg" alt="">&emsp;京公网安备 11010802028427号</span>
    </div>
</template>

<script>
    export default {
      name: "footerVue",
      methods:{
        aboutUS(){
          window.open('https://www.chaindigg.com/')
        },
        disclaimer(){
          window.open('https://www.chaindigg.com/disclaimer')
        },
        linkClick(){
          window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802028427')
        }
      }
    }
</script>

<style scoped>
 .container{
   width: 100%;
   height: 6rem;
   background: #191a1d;
   border-top: 1px solid #24262C;
   margin-top: 2rem;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
  .click{
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FAFAFA;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .click li:first-child{
    margin-right: 2rem;
  }
  li{
    list-style: none;
  }
  .desc{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    width: 100%;
    text-align: center;
    margin-top: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
