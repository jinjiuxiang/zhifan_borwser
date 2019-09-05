<template>
    <div class="container">
      <span class="min label">{{$t('text.newBlock')}}：</span>
      <span class="min label" v-for="site in all"> {{site.coin | upper}}：<span class="number" @click="blockDetail(site.coin,site.maxBlock)">{{site.maxBlock}}</span></span>
    </div>
</template>

<script>
    export default {
      name: "newBlock",
      data:function(){
        return {
          all:[]
        }
      },
      methods:{
        //获取当其那最新的区块
        getData:function(){
          let that = this;
          that.ajax({
            method:"get",
            url:that.Config.baseUrl + "/api/coinMaxBlock"
          }).then(res=>{
            if(res.data.code == "0000"){
              that.all = res.data.data;
              that.$nextTick(() =>{
                that.$emit('getShow')
              })
            }
          })
        },
        //点击查看区块详情
        blockDetail:function(coinType,key){
          let that = this;
          //console.log("1111")
          if(coinType == 'bsv'){
            coinType = 'bchsv'
          }
          that.$router.push({name:"detail",query:{pageNum:1},params:{coinType:coinType.toLowerCase(),dataType:"block",key:key}})
        },
      },
      mounted:function(){
        let that = this;
        that.getData();
      },
      filters:{
        //币种大小写转换
        upper:function(val){
          return val.toUpperCase()
        }
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  .min{
    margin:0 20px;
  }
  .label{
    font-size: 14px;
    color: #999999;
  }
  .number{
    color: #00A0E9;
    cursor: pointer;
  }
</style>
