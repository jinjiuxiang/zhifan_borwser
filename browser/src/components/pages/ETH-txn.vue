<template>
  <div class="container">
    <!---->
    <div class="title">
      <div class="titleL">
        <img class="cointype" src="./../../../static/img/eth.png" alt="">
        <span class="titleText">ETH&nbsp;{{$t('text.Tx')}}：</span>
        <div class="titleR">
          <span><img src="./../../assets/img/op.png" alt="">&nbsp;{{hashText}}</span>
          <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
            <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!---->
    <div class="title2">
      Status :&nbsp;&nbsp;<span class="add"><img src="./../../assets/img/sucess.png" alt="">&nbsp;Sucess</span><span class="reduce"><img src="./../../assets/img/fail.png" alt="">&nbsp;Fail</span>
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
          <span class="label">{{$t('text.BlockHeight')}}</span>
          <span class="info">300000</span>
        </p>
        <p>
          <span class="label">{{$t('text.Nonce')}}</span>
          <span class="info">204,522 (2.56%)</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.Fee')}}</span>
          <span class="info">0.009685208 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.GasLimit')}}</span>
          <span class="info">0 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.GasPrice')}}</span>
          <span class="info">3.000000000000000000 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.GasUsed')}}</span>
          <span class="info">3.004148133096476986 ETH</span>
        </p>
      </div>
    </div>
    <!---->
    <div class="detail">
      <!---->
      <div class="tabChange">
         <span >Transactions</span>
      </div>
      <div class="tabDetail">
         <div class="tabHeader">
            <div>{{$t('text.Type')}}</div>
            <div>{{$t('text.From')}}</div>
            <div></div>
            <div>{{$t('text.To')}}</div>
            <div>{{$t('text.Value')}}</div>
         </div>
         <div class="tabBody">
            <div class="bodyHead">
              <div>Transcation</div>
              <div style="display: flex;align-items: center"><span class="imgBox"><img src="./../../assets/img/op.png" alt=""></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
              <div><img src="./../../assets/img/tra.png" alt=""></div>
              <div style="display: flex;align-items: center"><span class="imgBox"><img src="./../../assets/img/op.png" alt=""></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
              <div>828888.304880000000000000 ETH</div>
            </div>
           <div class="bodyHead">
             <div><img class="ntImg" src="./../../assets/img/sucess.png" alt="">&nbsp;&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Transcation</div>
             <div style="display: flex;align-items: center"><span class="imgBox"></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
             <div><img src="./../../assets/img/tra.png" alt=""></div>
             <div style="display: flex;align-items: center"><span class="imgBox"></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
             <div>828888.304880000000000000 ETH</div>
           </div>
           <div class="bodyHead">
             <div><img class="ntImg" src="./../../assets/img/sucess.png" alt="">&nbsp;&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Transcation</div>
             <div style="display: flex;align-items: center"><span class="imgBox"></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
             <div><img src="./../../assets/img/tra.png" alt=""></div>
             <div style="display: flex;align-items: center"><span class="imgBox"></span>&nbsp;<a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></div>
             <div>828888.304880000000000000 ETH</div>
           </div>
         </div>
      </div>
      <!---->
      <div class="tabChange2">
        <span>Input Data</span>
      </div>
      <div class="inputBox">
        0xa9059cbb000000000000000000000000f83a704dfeccd317ae518a3c64ff71cdfa1c806800000000000000000000000000000000000000000000009d3595ab2438d000000xa9059cbb000000000000000000000000f83a704dfeccd317ae518a3c64ff71cdfa1c806800000000000000000000000000000000000000000000009d3595ab2438d00000
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
          setTimeout(() => {
            that.disabled = false;
          }, 1000)
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
 .title2{
   font-family: PingFangSC-Medium;
   font-size: 1.25rem;
   color: #FFFFFF;
   box-sizing: border-box;
   padding-left: 1.75rem;
   display: flex;
   align-items: center;
 }
 .title2 span{
   display: flex;
   align-items: center;
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
    display: flex;
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

  .tabChange{
    width: 100%;
    border-bottom:1px solid #24262C;
    height: 3.125rem;
    display: flex;
    margin-top: 3rem;
  }
  .tabChange span{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    margin-right: 3rem;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 2px solid transparent;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .tabChange2{
    width: 100%;
    height: 3.125rem;
    display: flex;
    margin-top: 3rem;
  }
  .tabChange2 span{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    margin-right: 3rem;
    height: 100%;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .tabChangeClick{
    color: #00A0E9 !important;
    border-bottom: 2px solid #00A0E9 !important;
  }
  /**/
  .tabDetail{
    width: 100%;
  }
  .tabHeader{
    width: 100%;
    display: flex;
    align-items: center;
    height: 3rem;
    border-bottom:1px solid #24262C;
    color: #999999;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .bodyHead{
    width: 100%;
    display: flex;
    align-items: center;
    /*height: 3rem;*/
    /*border-bottom:1px solid #24262C;*/
    color: #FFFFFF;
    box-sizing: border-box;
    padding: 0 1rem;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  .bodyHead:nth-child(1){
    margin-top: 0.5rem;
  }
  .tabHeader div,.bodyHead div{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tabHeader div:nth-child(1),.bodyHead div:nth-child(1){
    width: 16%;
  }
  .tabHeader div:nth-child(2),.bodyHead div:nth-child(2){
    width: 30%;
   }
  .tabHeader div:nth-child(3),.bodyHead div:nth-child(3){
    width: 4%;
  }
  .tabHeader div:nth-child(4),.bodyHead div:nth-child(4){
    width: 30%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(5),.bodyHead div:nth-child(5){
    width: 20%;
    /*flex-grow: 1;*/
  }
  /**/
  .down,.path,.down2{
    width: 1rem;
    height:1rem;
  }
  .down{
    margin-right: 1.25rem;
    background-image: url("./../../assets/txRight.png");
    background-size: 50% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .down:hover{
    background-image: url("./../../assets/txRightH.png");
  }
  .path{
    background-image: url("./../../assets/path.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .path:hover{
    background-image: url("./../../assets/pathH.png");

  }
  .bodyDetail{
    background: #24262C;
  }
  .reduce{
    color:#ca162c;
  }
  .add{
    color: #0CF5C0;
  }
  .hash{
    color: #00A0E9;
  }
  a{
    color: #00A0E9;
    text-decoration: none;
  }
  .ntImg{
    width: 0.625rem;
    height: 0.625rem;
  }
  .imgBox{
    display: flex;align-items: center;width: 0.75rem;
  }
  .inputBox{
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 1rem;font-size: 0.875rem;
    color: #FFFFFF;
    background: #24262C;
    word-break: break-all;
  }
</style>
