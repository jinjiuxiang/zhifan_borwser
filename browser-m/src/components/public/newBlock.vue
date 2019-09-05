<template>
  <div class="container">
    <span class="title">{{$t('text.newBlock')}}：</span>
    <p class="coin">
      <span v-for="site in all">{{site.coin | upper}}</span>
    </p>
    <p class="number">
      <span v-for="site in all" @click="blockDetail(site.coin,site.maxBlock)">{{site.maxBlock}}</span>
    </p>
  </div>
</template>

<script>
    export default {
      name: "newBlock",
      data(){
        return {
          all:[]
        }
      },
      methods:{
        getData(){
          let that = this;
          that.ajax({
            method:"get",
            url:that.Config.baseUrl+"/api/coinMaxBlock"
          }).then(res=>{
            console.log(res);
            if(res.data.code == "0000"){
              that.all = res.data.data;
              that.$nextTick(() =>{
                that.$emit('getShow')
              })
            }
          })
        },
        blockDetail(coinType,key){
          let that = this;
          if(coinType == 'bsv'){
            coinType = 'bchsv'
          }
          that.$router.push({name:"detail",params:{coinType:coinType.toLowerCase(),dataType:"block",key:key}})
        },
      },
      mounted(){
        let that = this;
        that.getData();
      },
      filters:{
        upper(val){
          return val.toUpperCase()
        }
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 0.75rem;
    margin-top: 40px;
  }
  .title{
    font-size: 12px;
    color: #999999;
  }
  .coin{
    width: 100%;
    display: flex;
    align-items: center;
    height: 22px;
    background: rgba(255,255,255,0.1);
    margin-top: 13px;
  }
  .coin span{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #FFFFFF;
  }
  .number{
    background: #24262C;
    width: 100%;
    height: 22px;
    display: flex;
  }
  .number span{
    font-size: 12px;
    color: #00A0E9;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
