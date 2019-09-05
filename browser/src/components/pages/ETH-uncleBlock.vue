<template>
  <div class="container">
    <!---->
    <div class="title">
      <div class="titleL">
        <img class="cointype"src="./../../../static/img/eth.png" alt="">
        <span class="titleText">ETH&nbsp;Uncle&nbsp;{{$t('text.block')}}：5000000</span>
      </div>
      <div class="titleR">
        <span>{{hashText}}</span>
        <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
          <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
        </el-tooltip>
      </div>
    </div>
    <div class="titleD">
      Nephew Height 6605176
    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.Confirmation')}}</span>
          <span class="info"><li ></li><li class="tt">100 Confirmations</li></span>
        </p>
        <p>
          <span class="label">{{$t('text.Timestamp')}}</span>
          <span class="info">2018/10/12  00:16:22</span>
        </p>
        <p>
          <span class="label">{{$t('text.GasUsed')}}</span>
          <span class="info">204,522 (2.56%)</span>
        </p>
        <p>
          <span class="label">{{$t('text.GasLimit')}}</span>
          <span class="info">8,000,029</span>
        </p>
        <p>
          <span class="label">{{$t('text.Difficulty')}}</span>
          <span class="info">3,134,092,125,640,590</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.UnclePosition')}}</span>
          <span class="info">0</span>
        </p>
        <p>
          <span class="label">{{$t('text.UnclesReward')}}</span>
          <span class="info">0 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.ParentHash')}}</span>
          <span class="info">0x9a8d46ce749df47220477a19980664ec829efcd3f328cab21612bdcc2d01d103</span>
        </p>
        <p>
          <span class="label">{{$t('text.MinedBy')}}</span>
          <span class="info">0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c</span>
        </p>
        <p>
          <span class="label">{{$t('text.Sha3Uncles')}}</span>
          <span class="info">0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ETH-block",
      data:function(){
        return {
          hashText:'0x9a8d46ce749df47220477a19980664ec829efcd3f328cab21612bdcc2d01d103',
          disabled:false,
        }
      },
      methods:{
        //复制
        handleSuccess:function(e) {
          //console.log(e);
          let that = this;
          that.disabled = true;
          // setTimeout(() => {
          //   that.disabled = false;
          // }, 1000)
        },
        handleError:function(e) {
        },
        //tab切换
        tabChangeClick:function(event){
          let that = this;
          $(event.currentTarget).addClass('tabChangeClick').siblings().removeClass("tabChangeClick")
        }
      }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    padding: 2rem 2.5rem;
    box-sizing: border-box;
    /*font-family: PingFangSC-Regular;*/
  }
  li{
    list-style: none;
  }
  .title{
    display: flex;
  }
  .titleL{
    display: flex;
    align-items: center;
  }
  .cointype{
    width: 1.25rem;
    height: 1.25rem;
  }
  .titleText{
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    margin-left: 0.5rem;
    color: #FFFFFF;
  }
  .titleBtn{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    margin-left: 1.5rem;
    background-image: url("./../../assets/before.png");
    cursor: pointer;
    background-size: 100% 100%;
  }
  .titleBtn:hover{
    background-image: url("./../../assets/beforeh.png");

  }
  .titleBtn1{
    width: 1.35rem;
    height: 1.375rem;
    display: inline-flex;
    background-image: url("./../../assets/after.png");
    cursor: pointer;
    background-size: 100% 100%;
    margin-left: 1rem;

  }
  .titleBtn1:hover{
    background-image: url("./../../assets/afterh.png");
  }
  .titleR{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .item img{
    height: 1.05rem!important;
    width: auto;
  }
  .el-tooltip.item{
    width: 1.05rem;
    height: 1.5rem;
    margin-left: 0.5rem;
  }
  .copyBtn{
    cursor: pointer;
  }
  /**/
  /**/
  .desc{
    width: 100%;
    margin-top: 2.25rem;
    display: flex;
  }
  .desc div{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .desc span{
    width: 2.5rem;
    height: 100%;
  }
  .desc div p{
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    border-bottom: 1px solid #24262C;
    /*font-family: PingFangSC-Regular;*/
    font-size: 1rem;
    line-height: 3rem;
  }
  .label{
     width: 8.25rem!important;
     color: #999999;
   }
  .label2{
    width: 8.25rem!important;
    color: #999999;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .info{
    flex: 1;
    color: #FFFFFF;
    /*display: flex;*/
    word-break: break-all;
    line-height: 20px;
    display: flex;
    align-items: center;
  }
  .erHash{
    font-size: 0.875rem;
    word-break: break-all;
    line-height: 1rem;
    display: flex;
    align-items: center;
  }
  .info2{
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    height: 60px !important;
    flex: 1;
    justify-content: center;

  }
  .ufnn{
    height: 60px !important;
    display: flex;
    flex-direction: row !important;
    padding: 0 1rem;
    border-bottom: 1px solid #24262C;
  }
  .info2 li{
    height: auto !important;
    width: 100%;
  }
  .info2 li:nth-child(2){
    color: #B8E986;
  }
  /**/
  .titleD{
    font-family: PingFangSC-Regular;
    font-size: 1.5rem;
    color: #FFFFFF;
    box-sizing: border-box;
    padding-left: 1.75rem;
  }
</style>
