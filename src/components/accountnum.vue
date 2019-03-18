<template>
  <div class="accountnum">
    <van-nav-bar title="收款账号" left-arrow @click-left="onClickLeft"/>
    <form class="accform">
      <van-cell-group>
        <van-field label="收款人姓名" v-model="$store.state.user.display_name" required disabled/>
        <van-field v-model="creditnum" @click-icon="creditnum = ''" label="收款人卡号" icon="clear" type="textarea" 
        placeholder="请填写" required rows="1" autofocus autosize @keyup="crednuminp" />
        <van-cell title="收款银行" :value="duebank.name" required disabled/>
        <van-cell title="开户行" :value="depbank.name" required @click="goDepositbank"/>
      </van-cell-group>
    </form>

    <van-button bottom-action @click="save">保存</van-button>
  </div>
</template>

<script>
  import {
    NavBar,
    Cell,
    CellGroup,
    Field,
    Button,
    Toast
  } from 'vant';
  import axios from 'axios'
  import banks from '../assets/data/bankname.json'

  export default {
    data() {
      return {
        payeename: "",
        creditnum: "",
        depbank: {
          
        },
        duebank: {
          
        }
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Button.name]: Button,
      [Toast.name]: Toast
    },

    mounted: function(){
      if (this.$store.state.drafts.depbank) {
        this.depbank = this.$store.state.drafts.depbank;
      }
      this.mykeyup = _.debounce(function keyUp() {
        let val = this.creditnum,
            cremat = /^([1-9]{1})(\d{15}|\d{18})$/;
        if (val) {
          if (!cremat.test(val)) {
            Toast("请输入正确的银行卡号！");
          } else {
            let crnum = this.creditnum;
            //根据用户输入卡号返回银行名称

          let data = {
            "bank": "ABC",
            "cardType": "DC",
            "key": "6228430120000000000",
            "messages": [],
            "stat": "ok",
            "validated": Math.random() > 0.5
          }

          let bank = data.bank;
          console.log(bank)
          // axios.post('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=crnum&cardBinCheck=true', {
            
          // })
          
          // .then(function (data) {
          //   console.log(data);
          // })
          // .catch(function (error) {
          //   Toast('请求错误！')
          // });
          }
        }
      }, 1000);
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      goDepositbank() {
        this.$router.push('depositbank');
      },
      crednuminp() {
        this.mykeyup();
      },
      save() {
        if (!this.creditnum) {
          Toast("请填写好所有必填项！")
        } else {
          Toast.success('保存成功');
          //表单提交
        }
      }
    }
  };
</script>

<style lang="less">
  @import "../assets/less/var.less";
  .accountnum {
    .van-nav-bar {
      margin-bottom: @basemar;
      background: @defaultColor;
    }

    .van-nav-bar__title {
      color: @containBackColor;
    }

    .van-cell {
      padding: 10px @basemar*2;
    }

    .van-nav-bar__left {
      left: @basemar*2;
    }

    .van-cell--required::before {
      margin-left: @basemar;
    }
    
    .van-cell__value {
      color:  @defaultTitleColor;
    }

    .van-nav-bar .van-icon {
      color:  @containBackColor;
    }

    .van-button--bottom-action {
      width: 80%;
      margin: @basemar 0 0 10%;
      background: @defaultColor;
    }
  }
</style>
