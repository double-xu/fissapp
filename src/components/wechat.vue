<template>
  <div class="wechat">
    <van-nav-bar title="编辑微信号" right-text="保存" left-arrow 
    @click-left="onClickLeft" @click-right="onClickRight"/>
    <van-cell-group>
        <van-field v-model="perdata.wechat" @click-icon="perdata.wechat = ''" icon="clear" placeholder="请填写微信号" />
    </van-cell-group>
  </div>
</template>

<script>
    import {
        NavBar,
        Field,
        CellGroup,
        Toast 
    } from 'vant';

    export default {

        data() {
            return {
                perdata: {
                    wechat:""
                }
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Toast.name]: Toast
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                let wechatval = this.perdata.wechat,
                    regwechat = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/; 
                if (wechatval) {
                    if (regwechat.test(wechatval)) {
                        this.$store.commit('update', {wechat: this.perdata.wechat});   
                        this.$router.go(-1);
                    } else {
                        Toast("微信号格式错误！");
                    }
                } else {
                    Toast("请输入微信号！");
                }
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/var.less";
    .wechat {
        padding-bottom: 50px;

        .van-nav-bar {
            background: @defaultColor;
        }

        .van-nav-bar__title {
            color: @containBackColor;
        }

        .van-nav-bar .van-icon {
            color: @containBackColor;
        }

        .van-cell-group {
            width: 90%;
            left: 5%;
            margin-top: @basemar;
        }

        .van-nav-bar__left {
            left: @basemar*2;
        }

        .van-nav-bar__text {
            color: @containBackColor;
            margin: 0;
        }

    }
</style>
