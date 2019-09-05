<template>
    <div class="container">
      <div class="header" @click.stop>
        <p class="show">
          <span class="langSel" @click="langShow">{{langLabel}}&nbsp;<img src="./../../assets/down1.svg" alt="">&nbsp;
            <ul class="langHide" v-show="langHide" @click.stop>
              <li v-for="site in langOptions" :class="colorChoose2(site.value)" @click="langChange(site.value)">{{site.label}}</li>
            </ul>
          </span>
        </p>
      </div>
    </div>
</template>

<script>
    var vm;
    export default {
      name: "headerVue",
      data(){
        vm = this;
        return {
          selectName:'全币种',
          params:this.$route.params,
          selectVal:"",
          key:"",
          langHide:false,
          langOptions: [{
            value: 'zh',
            label: '中文'
          }, {
            value: 'en',
            label: 'Eng'
          }],
          langLabel:"中文",
          langVal:"zh",
          searchHide:true,
          fShow:false
        }
      },
      computed:{
        options2(){
          return [
            {
              value: '',
              label: this.$t("text.currencyKind")
            }, {
              value: 'btc',
              label: 'BTC'
            }, {
              value: 'bch',
              label: 'BCH'
            }, {
              value: 'ltc',
              label: 'LTC'
            }, {
              value: 'usdt',
              label: 'USDT'
            }
            ,{
              value: 'bchsv',
              label: 'BCHSV'
            }
          ]
        }
      },
      methods:{
        langShow(){
          let that = this;
          that.langHide = !that.langHide;
        },
        langChange(value){
          console.log(value);
          this.Cookies.set("lang",value)
          this.$i18n.locale = value;
          window.location.reload();
        },
        colorChoose(val){
          let that = this;
          if(val == that.selectVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        colorChoose2(val){
          let that = this;
          if(val == that.langVal){
            return "isSelect"
          }else {
            return false;
          }
        },
        showClick(){
          let that = this;
          that.hideShow = !that.hideShow;
        },
        selectChoose(label,val){
          let that = this;
          that.selectName = label;
          that.selectVal = val;
          that.showClick();
        },
        focusOn(){
          let that = this;
          that.fShow = true;
        },
        cancelClick(){
          let that = this;
          that.key = "";
          $(".text").focus();
        },
        qxClick(){
          let that = this;
          that.key = "";
          that.fShow = false;
          that.searchHide = !that.searchHide;
        },
        searchShow(){
          let that = this;
          that.searchHide = !that.searchHide;
        },
        getSearch(){
          let that = this;
          console.log(that.selectVal);
          console.log(that.key);
          if(that.key == ""){
            return false;
          }else {
            if(that.selectVal != ""){
              that.ajax.interceptors.response.use(function (response) {
                return response;
              }, function (err) {
                if (err && err.response) {
                  that.$router.push({name:"noserver"})
                  //window.location.href = "https://test.blockdigg.com/detail/noSec"
                }else{
                  err.message = '连接服务器失败!'
                }
              });
              that.ajax({
                methods:"get",
                url:that.Config.baseUrl +"/api/search",
                params:{
                  coinType:that.selectVal,
                  key:that.key
                }
              }).then(res =>{
                let resp = res.data;
                if(resp.code == "0000" && resp.data !=null && resp.data[0] != null){
                  if(resp.data[0].searchResultType == 'txn'&&(resp.data[0].confirmNum == 0 ||resp.data[0].confirmNum == null )){
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].txHash})

                  }else {
                    that.$emit('childByValue', {coinType:that.selectVal,dataType:resp.data[0].searchResultType,key:resp.data[0].id})
                  }
                }else if(resp.code == "0000" && (resp.data ==null || resp.data[0] == null)){
                  that.Cookies.set('selectWord',that.selectVal);
                  that.Cookies.set('searchWord',that.key);
                  that.$router.push({name:"noSearch"})
                  that.$emit('nolistChild',that.key)
                }else {
                  that.$message.error("查询失败")
                }
              })
            }else {
              that.$emit('childByValue2',that.key)
            }
          }
        },
        hideClick(flag){
          let that = this;
          that.langHide = false;
        }
      },
      filters:{
        nameChange(val){
          let that = this;
          if(val == '全币种'){
            return vm.$t("text.currencyKind")
          }else{
            return val
          }
        }
      },
      mounted(){
        let that = this;
        if(that.params.coinType != undefined){
          that.selectVal = that.params.coinType;
          that.options2.forEach((value =>{
            if(value.value == that.params.coinType.toLowerCase()){
              that.selectName = value.label;
            }
          }))
        }else {
          that.selectName = "全币种";
          that.selectVal = "";
        }
        if(that.Cookies.get("lang") == undefined){
          that.$i18n.locale = 'zh'
        }else {
          that.$i18n.locale = that.Cookies.get("lang");
          that.langVal = that.Cookies.get("lang");
          that.langOptions.forEach((val)=>{
            if(val.value == that.langVal){
              that.langLabel = val.label;
            }
          })
        }
      }
    }
</script>

<style scoped>
 .container{
   width: 100%;
   display: flex;
   height: 3.375rem;
 }
  .header{
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    box-sizing: border-box;
    background: #191a1d;
    align-items: center;
    padding: 0 0.75rem 0 1rem;
  }
  .show{
    display: flex;
    align-items: center;
  }
  .show img{
    width: 1.25rem;
  }
  .langSel{
    width: 3.75rem;
    display: flex;
    justify-content: flex-end;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FAFAFA;
    align-items: center;
    position: relative;
  }
  .langSel img{
    width: 10px;
    height: 6px;
  }
  li{
    list-style: none;
  }
  .langHide{
    width: 3.75rem;
    position: absolute;
    top: 1.5rem;
    right: 0rem;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
  }
  .langHide li{
    font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #FFFFFF;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 1rem;
  }
  .isSelect{
    color: #00A0E9 !important;
  }
  /**/
  .header2{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.75rem;
  }
  .coin{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-right: 6px;
    position: relative;
  }
  .nBtn{
    height: 0.75rem;
    display: flex;
    align-items: center;
  }
  .cancel{
    width: 0.75rem;
    height: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.5rem;
  }
  .cancel img{
    width: 10px;
    height: 10px;
  }
  .space{
    width: 1px;
    height: 100%;
    opacity: 0.4;
    background: #FFFFFF;
    margin: 0 4px;
  }
  .qx{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
  }
  .text{
    flex: 1;
    box-sizing: border-box;
    padding: 0 6px;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    outline: none;
    border: none;
    background: #191a1d;
  }
  .select{
    width: 100%;
    position: absolute;
    top: 1.5rem;
    background: #24262C;
    border-radius: 2px;
    padding: 6px 0;
  }
  .select li{
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #FFFFFF;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 6px;
  }
</style>








