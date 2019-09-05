<template>
  <div class="container">
    <!---->
    <div class="title">
      <div class="titleL">
        <img class="cointype"src="./../../../static/img/eth.png" alt="">
        <span class="titleText">ETH&nbsp;{{$t('text.block')}}：5000000</span>
        <span class="titleBtn"></span>
        <span class="titleBtn1"></span>
      </div>
      <div class="titleR">
        <span>{{hashText}}</span>
        <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
          <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
        </el-tooltip>
      </div>
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
          <span class="label">{{$t('text.NumberOfTx')}}</span>
          <span class="info">300000</span>
        </p>
        <p>
          <span class="label">{{$t('text.TotalTxValue')}}</span>
          <span class="info">0.123456 ETH</span>
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
        <p>
          <span class="label">{{$t('text.TotalDifficulty')}}</span>
          <span class="info">7,424,360,138,493,116,550,814</span>
        </p>

      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.TxFees')}}</span>
          <span class="info">0.009685208 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.UnclesReward')}}</span>
          <span class="info">0 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.BlockReward')}}</span>
          <span class="info">3.000000000000000000 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.TotalReward')}}</span>
          <span class="info">3.004148133096476986 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.MinedBy')}}</span>
          <span class="info">0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c</span>
        </p>
        <p>
          <span class="label">{{$t('text.Size')}}</span>
          <span class="info">24313 bytes</span>
        </p>
        <p>
          <span class="label">{{$t('text.Nonce')}}</span>
          <span class="info">0x2cec9b58004db95f</span>
        </p>
        <p>
          <span class="label">{{$t('text.Sha3Uncles')}}</span>
          <span class="info">0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347</span>
        </p>
        <div class="ufnn">
          <span class="label2">{{$t('text.ExtraData')}}</span>
          <span class="info2"><li style="word-break: break-all">0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347010811</li><li>010811/geth/go1.10/linux</li></span>
        </div>
      </div>
    </div>
    <!---->
    <div class="detail">
      <!---->
      <div class="tabChange">
          <span class="tabChangeClick" @click="tabChangeClick($event,1)">Transactions</span>
          <span @click="tabChangeClick($event,2)">Uncles (2)</span>
      </div>
      <div class="tabDetail" v-show="tabIndex == 1">
         <div class="tabHeader">
            <div>{{$t('text.TxHash')}}</div>
            <div>{{$t('text.From')}}</div>
            <div>{{$t('text.To')}}</div>
            <div>{{$t('text.Value')}}(ETH)</div>
            <div>{{$t('text.Fees')}}(ETH)</div>
            <div></div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead">
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div>828888.888888888888</div>
              <div>0.888888888888</div>
              <div>
                <span class="down"></span>
              </div>
            </div>
            <!---->
           <div class="bodyDetail">
              <p>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/fail.png" alt="">&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Token Transfer</span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span>187.07702978682025 ZRX</span>
              </p>
              <p>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/fail.png" alt="">&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Token Transfer</span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span>187.07702978682025 ZRX</span>
              </p>
           </div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead">
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div><span class="hashT1"><a href="">0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</a></span></div>
              <div>828888.888888888888</div>
              <div>0.888888888888</div>
              <div>
                <span class="down"></span>
              </div>
            </div>
            <!---->
           <div class="bodyDetail">
              <p>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/fail.png" alt="">&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Token Transfer</span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span>187.07702978682025 ZRX</span>
              </p>
              <p>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/fail.png" alt="">&nbsp;<img src="./../../assets/img/Path.png" alt="">&nbsp;Token Transfer</span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span style="display:flex;align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span class="hash">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</span>
                <span>187.07702978682025 ZRX</span>
              </p>
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
          <div>{{$t('text.Position')}}</div>
          <div>{{$t('text.Hash')}}</div>
          <div>{{$t('text.Reward')}}</div>
        </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
            <div>0</div>
            <div>0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</div>
            <div>88888888.304880000000000000</div>
          </div>
          <!---->
        </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
            <div>1</div>
            <div>0x338599ff41dd96802c0dbf3e9a2dba803387a27057e0179b57605a8acabde804</div>
            <div>88888888.304880000000000000</div>
          </div>
          <!---->
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
    display: flex;
    word-break: break-all;
    line-height: 20px;
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
    height: 70px !important;
    display: flex;
    flex-direction: row !important;
    padding: 0 1rem;
    border-bottom: 1px solid #24262C;
    align-items: center;
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
  .tabHeader div,.bodyHead div{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tabHeader div:nth-child(1),.bodyHead div:nth-child(1){
    width:19%;
  }
  .tabHeader div:nth-child(2),.bodyHead div:nth-child(2){
    width: 19%;
   }
  .tabHeader div:nth-child(3),.bodyHead div:nth-child(3){
    width: 19%;
  }
  .tabHeader div:nth-child(4),.bodyHead div:nth-child(4){
    width: 20%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(5),.bodyHead div:nth-child(5){
    width: 20%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(6),.bodyHead div:nth-child(6){
    width: 3%;
    /*flex-grow: 1;*/
  }
  .tabHeader2 div:nth-child(1),.bodyHead2 div:nth-child(1){
    width: 10%;
  }
  .tabHeader2 div:nth-child(2),.bodyHead2 div:nth-child(2){
    width: 60%;
  }
  .tabHeader2 div:nth-child(3),.bodyHead2 div:nth-child(3){
    width: 30%;
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
    box-sizing: border-box;
    padding:2rem 1rem;
  }
  .bodyDetail p{
    width: 100%;
    display: flex;
    font-size: 0.875rem;
    color: #ffffff;
    margin-top: 1rem;
  }
  .bodyDetail p:nth-child(1){
    margin-top: 0;
  }
  .bodyDetail p span:nth-child(1){
    width: 18%;
  }
  .bodyDetail p span:nth-child(2){
    width: 30%;
  }
  .bodyDetail p span:nth-child(3){
    width: 4%;
  }
  .bodyDetail p span:nth-child(4){
    width: 30%;
  }
  .bodyDetail p span:nth-child(5){
    width: 18%;
    text-align: right;
  }
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
  .page{
    text-align: right;
    margin-top: 5rem;
  }
</style>
