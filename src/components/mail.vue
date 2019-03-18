<template>
  <div class="mail">
    <van-nav-bar title="编辑邮箱" right-text="保存" left-arrow 
    @click-left="onClickLeft" @click-right="onClickRight"/>
    <van-cell-group>
        <van-field v-model="perdata.mail" @click-icon="perdata.mail = ''" icon="clear" placeholder="请填写邮箱" />
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
                    mail:""
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
                let mailval = this.perdata.mail,
                    regmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
                if (mailval) {
                    if (regmail.test(mailval)) {
                        this.$store.commit('update', {mail: this.perdata.mail});   
                        this.$router.go(-1);
                    } else {
                        Toast("邮箱格式错误！");
                    }
                } else {
                    Toast("请输入邮箱！");
                }
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/var.less";
    .mail {
        padding-bottom: 50px;

        .van-cell-group {
            width: 90%;
            left: 5%;
            margin-top: @basemar;
        }

        .van-nav-bar {
            background: @defaultColor;
        }

        .van-nav-bar__title {
            color: @containBackColor;
        }

        .van-nav-bar__left {
            left: @basemar*2;
        }

        .van-nav-bar__text {
            color: @containBackColor;
            margin: 0;
        }
        
        .van-nav-bar .van-icon {
            color: @containBackColor;
        }
    }
</style>
