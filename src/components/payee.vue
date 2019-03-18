<template>
  <div class="payee">
    <van-nav-bar title="收款人" left-arrow @click-left="onClickLeft" right-text="确认" @click-right="onClickLeft"/>
    <form action="/">
      <van-search v-model="payee.name" autofocus = "autofocus" @keyup="search" @cancel="onCancel" 
      icon="clear" @click-icon="payee.name = ''" placeholder="请输入收款人姓名"/>
    </form>

    <van-cell-group class="payeeinf" v-model="payone"> 
      <van-radio-group v-model="radio">
        <van-radio name="1"></van-radio>
      </van-radio-group>
      <van-cell class="bankdiv">
        <img src="https://apimg.alipay.com/combo.png?d=cashier&t=ABC">
      </van-cell>
      <van-cell-group class="info">
        <van-cell class="bankname" :value="bank.name"></van-cell>
        <van-cell class="banknum" :value="bank.number"></van-cell>
        <van-cell class="company" :value="company"></van-cell>
      </van-cell-group>
      <van-icon name="edit" @click="onEdit"/>
    </van-cell-group>

    <van-popup v-model="showEdit" position="bottom">
      <van-cell-group class="popupgro">
        <van-field v-model="bank.name" label="银行名称" disabled/>
        <van-field v-model="bank.number" @click-icon="bank.number = ''" label="银行卡号" 
        icon="clear" type="textarea" placeholder="卡号" rows="1" autosize/>
        <van-field v-model="company" @click-icon="company = ''" label="收款方名称" 
        icon="clear" type="textarea" placeholder="收款方名称" rows="1" autosize/>
      </van-cell-group>
      <van-button size="large" type="danger" @click="onSave">保存</van-button>
      <van-button size="large" @click="onDelete">删除收款人</van-button>
    </van-popup>

    <van-button bottom-action @click="newpayee">新建收款人</van-button>
    <van-popup v-model="showAdd" position="bottom">
      <van-cell-group class="popupgro">
        <van-field v-model="add.bankname" label="银行名称" disabled/>
        <van-field v-model="add.banknumber" @click-icon="add.banknumber = ''" label="银行卡号" 
        icon="clear" type="textarea" placeholder="卡号" rows="1" autosize/>
        <van-field v-model="add.newcompany" @click-icon="newcompany = ''" label="收款方名称" 
        icon="clear" type="textarea" placeholder="收款方名称" rows="1" autosize/>
      </van-cell-group>
      <van-button type="danger" size="large" @click="onAddSave">保存</van-button>
    </van-popup>
  </div>
</template>

<script>
  import lodash from 'lodash';
  import {
    NavBar,
    Search,
    Icon,
    Button,
    Toast,
    Cell,
    CellGroup,
    Popup,
    Field,
    Radio,
    RadioGroup,
    Dialog
  } from 'vant';

  export default {

    data() {
      return {
        payee: {
          name: ""
        },
        bank: {
          name: "建设银行",
          number: "6217002922222222222",
          id: 0
        },
        payone: true,
        company: "晖时",
        bankname: "",
        banknum: "",
        recename: "",
        list: [],
        loading: false,
        finished: true,
        showEdit: false,
        confirm: false,
        radio: "",
        showAdd: false,
        add: {
          bankname: "",
          banknumber: "",
          newcompany: ""
        }
      }
    },

    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Popup.name]: Popup,
      [Field.name]: Field,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Dialog.name]: Dialog
    },

    methods: {

      onClickLeft() {
        // this.$store.state.drafts.expense.name = this.payeename;
        this.$router.go(-1);
        //this.$router.push('expense');
      },

      onEdit() {
        this.showEdit = true;
      },

      onSave() {
        this.showEdit = false;
      },

      onAddSave(add) {
        this.showAdd = false;
        // if (onEdit) {
        //   this.list = this.list.map(item => item.id === add.id ? add : item);
        // } else {
        //   this.list.push(info);
        // }
        // this.chosenContactId = info.id;
      },

      onDelete() {
        // this.showEdit = false;
        Dialog.confirm({
          title: '提示',
          message: '确定要删除该收款人吗？'
        }).then(() => {
          // on confirm
          this.showEdit = false;
          
        }).catch(() => {
          // on cancel
        });
      },

      newpayee() {
        this.showAdd = true;
      },

      onConfirm() {
        this.onClickLeft();
      },

      onChoose(item) {
        this.$store.state.drafts.payee = item;
      },

      search() {
        this.mykeyup();
      },

      //匹配到内容后，按取消会在list前面显示匹配内容
      onCancel() {
        
      },
    },
    mounted: function() {
      this.mykeyup = _.debounce(function keyUp() {
        let val = this.payee.name;
        if (!val) {
          Toast("请输入想要搜索的内容")
        }
        this.list = this.list.filter(i => i.name.includes(val));
      }, 500);
    }
  };
</script>

<style lang="less">
  @import "../assets/less/var.less";
  @gray: #e5e5e5;
  @border: 1px solid @gray;
  @baseheight: 60px;
  @smalltop: 370px;

  .payee {
    * {
      margin: 0;
    }
    .van-nav-bar {
      background: @defaultColor;
      margin-bottom: @basemar;

      .van-icon {
        vertical-align: middle;
        color: @containBackColor;
      }
    }
    
    .van-nav-bar__title {
      color: @containBackColor;
      max-width: 100%;
    }

    .van-nav-bar__left {
      left: @basemar*2;
    }

    .van-nav-bar__text {
      color: @containBackColor;
    }

    .van-search {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;
      padding: @baseheight/15 @basemar;
    }

    .van-icon-clear {
      position: absolute;
      right: @basemar;
      transform: translateY(-50%);
      color: #999;
    }

    .payeeinf {
      position: relative;
      width: 90%;
      margin: @basemar 0 0 5%;
      height:120px;
      background: #0d357a;
      color: @containBackColor;
      border-radius: @basemar;
      .bankdiv {
        position: absolute;
        width: 29px;
        height: 29px;
        top: 35%;
        left: 13%;
        border-radius: 50%;
        overflow: hidden;
        img {
          position: absolute;
          top: -3px;
          left: 1px;
        }
      }
      
      .van-radio-group {
        position: absolute;
        width: 7%;
        margin-left: 3%;
        margin-top: 50px;
      }

      .van-radio .van-icon-checked {
        color: @defaultColor;
      }
      .van-icon-edit {
        float: right;
        margin: 50px 3% 0 0;
        font-size: 20px;
      }

      .info {
        float: left;
        margin: 30px 0 0 25%;
        background: transparent;
        .van-cell {
          background: transparent;
          padding: 0;
          color: @containBackColor;
        }
        .van-cell::after {
          border-bottom-width: 0;
        }

        .bankname {
          font-size: 20px;
          font-weight: bold;
        }
        .banknum {
          font-size: @basemar;
        }
        .company {
          font-weight: bold;
        }
      }
    }
    
    [class*=van-hairline]::after {
      border: none;
    }

    .van-hairline {
      .van-field {
        padding: 10px @basemar;
      }
    }

    .van-button--large {
      width: 90%;
      left: 5%;
      margin-top: @basemar;
    }

    .van-popup {
      width: 100%;
      height: 100%;
    }

    .van-cell__title {
      display: table-cell;
      width:20%;
      margin-left: @basemar;
      span {
        margin-left: 5px;
      }
    }

    .van-button--bottom-action {
      width: 80%;
      margin: @basemar 0 0 10%;
      border-radius: @basemar/3;
      background: @defaultColor;
    }
  }
</style>
