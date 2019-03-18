<template>
  <div class="tel">
    <van-nav-bar title="编辑号码" right-text="保存" left-arrow 
    @click-left="onClickLeft" @click-right="onClickRight"/>
    <van-cell-group>
        <van-field v-model="perdata.tel" autofocus @click-icon="perdata.tel = ''" icon="clear" placeholder="请填写号码" />
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
                    tel:""
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
                let regex = /^1[3|4|5|8][0-9]\d{4,8}$/,
                    telval = this.perdata.tel; 
                if (telval) {
                    if (regex.test(telval)){
                        this.$store.commit('update', {tel: this.perdata.tel});   
                        this.$router.go(-1);
                    } else {
                        Toast("号码格式错误！");
                    }
                } else {
                    Toast("请输入电话号码！");
                }
            }
        }
    }
</script>

<style lang="less">
  @import "../assets/less/var.less";
    .tel {
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

        .van-nav-bar .van-icon {
            color: @containBackColor;
        }

        .van-nav-bar__text {
            color: @containBackColor;
        }

    }
</style>
