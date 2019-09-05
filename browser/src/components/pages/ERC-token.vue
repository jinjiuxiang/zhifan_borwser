<template>
  <div class="container">
    <!---->
    <div class="title">
      <div class="titleL">
        <img class="cointype"src="./../../../static/img/eth.png" alt="">
        <span class="titleText">ERC-20 Token：&nbsp;Binance Token (BNB)</span>
      </div>
    </div>
    <div class="title" style="margin-top: 0.75rem">
      <div class="titleR">
        <span>ETH Contract： </span>
        <span class="hash"><a style="font-size: 1.25rem" href="">{{hashText}}</a></span>
        <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
          <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
        </el-tooltip>
      </div>
    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.TotalSupply')}}</span>
          <span class="info">888888.9877 7777 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.Holders')}}</span>
          <span class="info">298950 addresses</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.Decimals')}}</span>
          <span class="info">10</span>
        </p>
        <p>
          <span class="label">{{$t('text.Transfers')}}</span>
          <span class="info">474526</span>
        </p>
      </div>
    </div>
    <!---->
    <div class="detail">
      <!---->
      <div class="tabChange">
          <span class="tabChangeClick" @click="tabChangeClick($event,1)">Transfers</span>
          <span @click="tabChangeClick($event,2)">Top Holders</span>
      </div>
      <div class="numDetail">
          <span class="numMin" v-show="tabIndex == 1">999999 Transactions</span>
          <span class="numMin" v-show="tabIndex == 2">Top 200 Holders</span>
      </div>
      <div class="tabDetail" v-show="tabIndex == 1">
         <div class="tabHeader">
            <div>{{$t('text.TxHash')}}</div>
            <div>{{$t('text.From')}}</div>
            <div>{{$t('text.To')}}</div>
            <div>{{$t('text.Value')}}</div>
            <div>{{$t('text.Timestamp')}}</div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead">
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div class="add">8888888.888888888888</div>
              <div>2018-09-11 10:01:11</div>
            </div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead">
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div class="add">8888888.888888888888</div>
              <div>2018-09-11 10:01:11</div>
            </div>
         </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change=""
            :page-size="50"
            :total="200">
          </el-pagination>
        </div>
      </div>
      <!---->
      <div class="tabDetail" v-show="tabIndex == 2">
         <div class="tabHeader2">
           <div>{{$t('text.Rank')}}</div>
           <div>{{$t('text.Address')}}</div>
           <div>{{$t('text.Value')}}</div>
           <div>{{$t('text.Percentage')}}</div>
         </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
            <div>
              1
            </div>
            <div>
              <a style="font-size: 1.25rem" href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
            </div>
            <div>
              38556379.15075107 BNB
            </div>
            <div>99.9999%</div>
          </div>
        </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
            <div>
              1
            </div>
            <div>
              <a style="font-size: 1.25rem" href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
            </div>
            <div>
              38556379.15075107 BNB
            </div>
            <div>99.9999%</div>
          </div>
        </div>

        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change=""
            :page-size="50"
            :total="200">
          </el-pagination>
        </div>
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
          tabIndex:1
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
        tabChangeClick:function(event,index){
          let that = this;
          $(event.currentTarget).addClass('tabChangeClick').siblings().removeClass("tabChangeClick");
          that.tabIndex = index;
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
  .titleR{
    flex: 1;
    display: flex;
    /*justify-content: flex-end;*/
    align-items: center;
    /*font-family: PingFangSC-Medium;*/
    font-weight: 600;
    font-size: 1.25rem;
    color: #FFFFFF;
    letter-spacing: 0;
    box-sizing: border-box;
    padding-left: 1.75rem;
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
  .info li:nth-child(1){
    margin-right: 0.5rem;
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
    cursor: pointer;
    color: #FFFFFF;
    display: flex;
    align-items: center;
  }
  .tabChangeClick{
    color: #00A0E9 !important;
    border-bottom: 2px solid #00A0E9 !important;
  }

  /**/
  .numDetail{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.75rem;
    border-bottom:1px solid #24262C;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .numMin{
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #FFFFFF;
  }
  /**/
  .tabDetail{
    width: 100%;
  }
  .tabHeader,.tabHeader2{
    width: 100%;
    display: flex;
    align-items: center;
    height: 3rem;
    border-bottom:1px solid #24262C;
    color: #999999;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .bodyHead,.bodyHead2{
    width: 100%;
    display: flex;
    align-items: center;
    height: 3rem;
    border-bottom:1px solid #24262C;
    color: #FFFFFF;
    box-sizing: border-box;
    padding: 0 1rem;
  }
  .tabHeader div,.bodyHead div,.tabHeader2 div{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tabHeader div:nth-child(1), .bodyHead div:nth-child(1){
    width: 20%;
  }
  .tabHeader div:nth-child(2),.bodyHead div:nth-child(2){
    width: 20%;
    box-sizing: border-box;
    padding-left: 1rem;
   }
  .tabHeader div:nth-child(3),.bodyHead div:nth-child(3){
    width: 20%;
    box-sizing: border-box;
    padding-left: 1rem;
  }
  .tabHeader div:nth-child(4),.bodyHead div:nth-child(4){
    width: 20%;
    box-sizing: border-box;
    padding-left: 1rem;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(5),.bodyHead div:nth-child(5){
     width: 20%;
    box-sizing: border-box;
    padding-left: 1rem;
     /*flex-grow: 1;*/
   }
  .tabHeader2 div:nth-child(1),.bodyHead2 div:nth-child(1){
    width: 10%;
  }
  .tabHeader2 div:nth-child(2),.bodyHead2 div:nth-child(2){
    width: 45%;
  }
  .tabHeader2 div:nth-child(3),.bodyHead2 div:nth-child(3){
    width: 27%;
  }
  .tabHeader2 div:nth-child(4),.bodyHead2 div:nth-child(4){
    width: 18%;
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
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
  }
  .bodyDetailList{
    width: 100%;
    color: #e6e6e6;
    display: flex;
  }
  .bodyDetailList span{
    display: inline-flex;
  }
  .bodyDetailList span:nth-child(1){width: 16%}
  .bodyDetailList span:nth-child(2){width: 30%}
  .bodyDetailList span:nth-child(3){width: 4%}
  .bodyDetailList span:nth-child(4){width: 30%}
  .bodyDetailList span:nth-child(5){width: 20%}
  /**/
  a{
    color: #00A0E9;
    text-decoration: none;
  }
  .hashT1{
    width:calc(100% - 20px);
    overflow: hidden;
    box-sizing: border-box;
    background: #131518;
    border-radius: 4px;
    height: 2.25rem;
    line-height: 2.25rem;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding:0 1rem;
    color: #00A0E9;
  }
  .hashT1:hover{
    width: auto;
    overflow: inherit;
    z-index: 9;
  }
  .hash{
    color: #00A0E9;
  }
  .add{
    color: #0CF5C0 ;
  }
  .page{
    text-align: right;
    margin-top: 5rem;
  }
</style>
