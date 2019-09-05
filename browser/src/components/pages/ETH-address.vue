<template>
  <div class="container">
    <!---->
    <div class="title">
      <div class="titleL">
        <img class="cointype"src="./../../../static/img/eth.png" alt="">
        <span class="titleText">ETH&nbsp;{{$t('text.Address')}}：</span>
        <div class="titleR">
          <span>{{hashText}}</span>
          <el-tooltip class="item" :value="disabled" :manual="true" effect="dark" :content="$t('text.copy')" placement="top">
            <div class="copyBtn" v-clipboard="hashText" @success="handleSuccess" @error="handleError"><img src="./../../assets/copy.png" alt=""></div>
          </el-tooltip>
        </div>
      </div>

    </div>
    <!---->
    <div class="desc">
      <div>
        <p>
          <span class="label">{{$t('text.Balance')}}</span>
          <span class="info">888888.9877 7777 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.FirstTx')}}</span>
          <span class="info"><li>+200 ETH</li><li>2018-09-11 10:01:1</li></span>
        </p>
        <p>
          <span class="label">{{$t('text.TotalReceived')}}</span>
          <span class="info">300000</span>
        </p>
      </div>
      <span></span>
      <div>
        <p>
          <span class="label">{{$t('text.NumberOfTx')}}</span>
          <span class="info">0.009685208 ETH</span>
        </p>
        <p>
          <span class="label">{{$t('text.LatestTx')}}</span>
          <span class="info"><li>+200 ETH</li><li>2018-09-11 10:01:1</li></span>
        </p>
        <p>
          <span class="label">{{$t('text.TotalSent')}}</span>
          <span class="info">3.000000000000000000 ETH</span>
        </p>
      </div>
      <p style="display: inline-flex;align-items: flex-start;margin-left: 40px">
        <img src="./../../assets/img/ercode.png" alt="" style="height: 120px;">

      </p>
    </div>
    <!---->
    <div class="detail">
      <!---->
      <div class="tabChange">
          <span class="tabChangeClick" @click="tabChangeClick($event,1)">Transactions</span>
          <span @click="tabChangeClick($event,2)">Internal Tx</span>
          <span @click="tabChangeClick($event,3)">ERC20 Token Tx</span>
      </div>
      <div class="numDetail" v-show="tabIndex == 1">
          <span class="numMin">999999 Transactions</span>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="numDetail" v-show="tabIndex == 2">
          <span class="numMin">999999 Transactions</span>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="numDetail" v-show="tabIndex == 3">
          <span class="numMin">999999 Transactions</span>
        <div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="tabDetail" v-show="tabIndex == 1">
         <div class="tabHeader">
            <div>{{$t('text.TxHash')}}</div>
            <div>{{$t('text.Block')}}</div>
            <div>{{$t('text.From')}}</div>
            <div>{{$t('text.To')}}</div>
            <div>{{$t('text.RecievdSent')}} (ETH)</div>
            <div>{{$t('text.Fee')}} (ETH)</div>
            <div>{{$t('text.Timestamp')}}</div>
            <div></div>
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
                6581666
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
              <div class="add">+8888888.888888888888</div>
              <div>0.888888888888</div>
              <div>2018-09-11 10:01:11</div>
              <div>
                <span class="down"></span>
              </div>
            </div>
            <!---->
           <div class="bodyDetail">
              <div class="bodyDetailList">
                <span style="align-items: center"><img class="ntImg" src="./../../assets/img/fail.png" alt="">&nbsp;&nbsp;Internal Tx</span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="justify-content: flex-end">187.07702978682025 ETH</span>
              </div>
              <div class="bodyDetailList">
                <span style="align-items: center"><img class="ntImg" src="./../../assets/img/fail.png" alt="">&nbsp;&nbsp;Internal Tx</span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="justify-content: flex-end">187.07702978682025 ETH</span>
              </div>
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
                6581666
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
              <div class="add">+8888888.888888888888</div>
              <div>0.888888888888</div>
              <div>2018-09-11 10:01:11</div>
              <div>
                <span class="down"></span>
              </div>
            </div>
            <!---->
           <div class="bodyDetail">
              <div class="bodyDetailList">
                <span style="align-items: center"><img class="ntImg" src="./../../assets/img/fail.png" alt="">&nbsp;&nbsp;Internal Tx</span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="justify-content: flex-end">187.07702978682025 ETH</span>
              </div>
              <div class="bodyDetailList">
                <span style="align-items: center"><img class="ntImg" src="./../../assets/img/fail.png" alt="">&nbsp;&nbsp;Internal Tx</span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="align-items: center"><img src="./../../assets/img/tra.png" alt=""></span>
                <span><a href="">0xA031bcF69cAD620dEb1129c574AF64bA125CD631</a></span>
                <span style="justify-content: flex-end">187.07702978682025 ETH</span>
              </div>
           </div>
         </div>
        <!---->
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
      <div class="tabDetail" v-show="tabIndex == 2">
         <div class="tabHeader2">
            <div>{{$t('text.TxHash')}}</div>
            <div>{{$t('text.Block')}}</div>
            <div>{{$t('text.From')}}</div>
            <div>{{$t('text.To')}}</div>
            <div>{{$t('text.RecievdSent')}} (ETH)</div>
            <div>{{$t('text.Timestamp')}}</div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead2">
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                6581666
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
              <div class="add">+8888888.888888888888</div>
              <div>2018-09-11 10:01:11</div>
            </div>
         </div>
         <div class="tabBody">
            <!---->
            <div class="bodyHead2">
              <div>
                <span class="hashT1">
                  <a href="">0xB31F80BFA401279cDAC32d199C56494EF2d8fB9c</a>
                </span>
              </div>
              <div>
                6581666
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
              <div class="add">+8888888.888888888888</div>
              <div>2018-09-11 10:01:11</div>
            </div>
         </div>
        <!---->
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
      <div class="tabDetail" v-show="tabIndex == 3">
        <div class="tabHeader2">
          <div>{{$t('text.TxHash')}}</div>
          <div>{{$t('text.From')}}</div>
          <div>{{$t('text.To')}}</div>
          <div>{{$t('text.RecievdSent')}} (ETH)</div>
          <div>{{$t('text.Token')}}</div>
          <div>{{$t('text.Timestamp')}}</div>
        </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
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
            <div class="add">+8888888.888888888888</div>
            <div>
              <a href="" style="text-decoration: underline">Token Name</a>
            </div>
            <div>2018-09-11 10:01:11</div>
          </div>
        </div>
        <div class="tabBody">
          <!---->
          <div class="bodyHead2">
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
            <div class="add">+8888888.888888888888</div>
            <div>
              <a href="" style="text-decoration: underline">Token Name</a>
            </div>
            <div>2018-09-11 10:01:11</div>
          </div>
        </div>
        <!---->
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
          tabIndex:1,
          options: [{
            value: '全部',
            label: '全部'
          }, {
            value: '转入',
            label: '转入'
          }, {
            value: '转出',
            label: '转出'
          }],
          value: '',
          cities: [{
            value: 'Beijing',
            label: '北京'
          }, {
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Nanjing',
            label: '南京'
          }, {
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }],
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
  .tabHeader div,.bodyHead div,.bodyHead2 div{
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tabHeader div:nth-child(1), .bodyHead div:nth-child(1){
    width: 12%;
  }
  .tabHeader div:nth-child(2),.bodyHead div:nth-child(2){
    width: 10%;
    box-sizing: border-box;
    padding-left: 1rem;
   }
  .tabHeader div:nth-child(3),.bodyHead div:nth-child(3){
    width: 12%;
    box-sizing: border-box;
    padding-left: 1rem;
  }
  .tabHeader div:nth-child(4),.bodyHead div:nth-child(4){
    width: 12%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(5),.bodyHead div:nth-child(5){
     width: 20%;
     /*flex-grow: 1;*/
   }
  .tabHeader div:nth-child(6),.bodyHead div:nth-child(6){
    width: 18%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(7),.bodyHead div:nth-child(7){
    width: 12%;
    /*flex-grow: 1;*/
  }
  .tabHeader div:nth-child(8),.bodyHead div:nth-child(8){
    width: 4%;
    /*flex-grow: 1;*/
  }
  .tabHeader2 div:nth-child(1),.bodyHead2 div:nth-child(1){
    width: 18%;
  }
  .tabHeader2 div:nth-child(2),.bodyHead2 div:nth-child(2){
    width: 16%;
  }
  .tabHeader2 div:nth-child(3),.bodyHead2 div:nth-child(3){
    width: 16%;
  }
  .tabHeader2 div:nth-child(4),.bodyHead2 div:nth-child(4){
    width: 20%;
  }
  .tabHeader2 div:nth-child(5),.bodyHead2 div:nth-child(5){
    width: 16%;
  }
  .tabHeader2 div:nth-child(6),.bodyHead2 div:nth-child(6){
    width: 14%;
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
    padding: 1rem 4% 1rem 1rem;
  }
  .bodyDetailList{
    width: 100%;
    color: #e6e6e6;
    display: flex;
    margin-top: 0.5rem;
  }
  .bodyDetailList:nth-child(1){
    margin-top: 0;
  }
  .bodyDetailList span{
    display: inline-flex;
    font-size: 0.875rem;
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
  .ntImg{
    width: 0.625rem;
    height: 0.625rem;
  }
  .page{
    text-align: right;
    margin-top: 5rem;
  }
  .reduce{
    color:#ca162c;
  }
  .add{
    color: #0CF5C0;
  }
</style>
