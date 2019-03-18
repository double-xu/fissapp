<template>
  <div class="perdata">
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft"/>

    <van-cell-group>
        <van-cell title="头像" required :value="perdata.tx" is-link @click="goTx"/>
        <van-cell title="姓名" required :value="$store.state.user.display_name" is-link disabled/>
        <van-cell title="部门" required v-model="dep" is-link @click="showDepart = true"/>
        <van-popup v-model="showDepart">
            <van-picker show-toolbar title="选择部门" :columns="columns" 
            @cancel="onCancel" @confirm="onConfirm"/>
        </van-popup>
    </van-cell-group>

    <van-cell-group>
        <van-cell title="电话" required :value="$store.state.perdata.tel" is-link @click="goTel"/>
        <van-cell title="微信号" required :value="$store.state.perdata.wechat" is-link @click="goWechat"/>
        <van-cell title="邮箱" required :value="$store.state.perdata.mail" is-link @click="goMail"/>
    </van-cell-group>

  </div>
</template>

<script>
    import {
        NavBar,
        CellGroup,
        Cell,
        Popup,
        Picker,
        Toast,
        Field
    } from 'vant';
    export default {

        data() {
            return {
                reason: "",
                note: "",
                showDepart: false,
                showTel: false,
                dep: "",
                perdata: {
                    depart: "",
                    tel: "",
                    wechat: "",
                    mail: ""
                },
                columns: ['财务部', '技术部', '产品部', '行政部']
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Toast.name]: Toast,
            [Field.name]: Field
        },

        computed: {
            user: function() {
                return this.$store.state.user;
            }
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },

            goTx() {
                this.$router.push('headscl');
            },

            goTel() {
                this.$router.push('tel');
            },
            beforeClose(action, done) {
                if (action === 'confirm') {
                    setTimeout(done, 1000);
                } else {
                    done();
                }
            },

            goWechat() {
                this.$router.push('wechat');
            },

            goMail() {
                this.$router.push('mail');
            },

            onConfirm(value) {
                let val = value;
                this.dep = val;
                this.showDepart = false;
            },

            onCancel() {
                this.showDepart = false;
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/var.less";
  .perdata {
    padding-bottom: 50px;

    &-cell-group {
      margin: @basemar 0;

      .van-cell__value {
        color: #999;
      }
    }

    .van-nav-bar {
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

    .tx {
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        position: absolute;
        margin-top: -38px;
        margin-left: 310px;
        padding: 0;
    }

    .van-popup {
        width: 80%;
    }

    .van-tabbar-item--active {
      color: #cc9646;
    }

    .van-cell__title .van-icon {
      margin-left: @basemar;
    }

    .van-cell__text {
      margin-left: @basemar;
    }

    .van-cell__label {
      margin-left: @basemar;
    }

    .van-cell-group {
      margin-top: @basemar;
    }
  }
</style>