<template>
  <div class="tax">
    <van-nav-bar title="选择税率" left-arrow @click-left="onClickLeft" right-text="确认" @click-right="onClickLeft"/>
    <van-search v-model="tax.per" autofocus show-action @keyup="search" @cancel="onCancel" icon="clear" @click-icon="tax.per = ''" placeholder="请输入税率"/>
    </van-search>

    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" :key="item.id" is-link :title="item.per" @click="onChoose(item)"/>
    </van-list>
  </div>
</template>

<script>
    import lodash from 'lodash';
    import {
        NavBar,
        Search,
        Icon,
        Popup,
        Radio,
        Cell, 
        CellGroup, 
        RadioGroup,
        Button,
        List,
        Toast
    } from 'vant';

    export default {

        data() {
            return {
                tax: {
                    per: ""
                },
                list: [],
                loading: false,
                finished: true
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [Search.name]: Search,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [Radio.name]: Radio,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [RadioGroup.name]: RadioGroup,
            [Button.name]: Button,
            [List.name]: List,
            [Toast.name]: Toast
        },

        methods: {

            onClickLeft() {
                this.$router.go(-1);
            },

            onConfirm() {
                this.onClickLeft();
            },

            onChoose(item) {
                this.$store.state.drafts.tax = item;
            },

            search() {
                this.mykeyup();
            },

            //匹配到内容后，按取消会在list前面显示匹配内容
            onCancel() {
                for (let i = 0; i < 10; i++) {//Ajax
                    this.list.push({id: i, per: (3+i)+'%'});
                }
            },
        },
        mounted: function() {
            for (let i = 0; i < 10; i++) {//Ajax
                this.list.push({id: i, per: (3+i)+'%'});
            }

            this.mykeyup = _.debounce(function keyUp() {
                let val = this.tax.per;
                if (!val) {
                    Toast("请输入想要搜索的内容")
                }
                this.list = this.list.filter(i => i.per.includes(val));
            }, 1000);
        }
    };
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .tax {

        .van-nav-bar {
            background: @defaultColor;
            color: @containBackColor;
            margin-bottom: @basemar;
            .van-icon {
                vertical-align: middle;
                color: @containBackColor;
            }
        }

        .van-nav-bar__text {
            color: @containBackColor;
             margin: 0;
        }

        .van-search {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            box-sizing: border-box;
            padding: 4px @basemar;
            margin-bottom: @basemar;
        }

        .van-cell {
            padding: 10px @basemar*2;
        }

        .van-nav-bar__left {
            left: @basemar*2
        }

        .van-icon-clear {
            position: absolute;
            right: 0;
            transform: translateY(-50%);
            color: #999;
        }

        .van-button--primary {
            width: 80%;
            margin: 20px 0 0 10%;
            border-radius: @basemar/3;
        }

    }
</style>
