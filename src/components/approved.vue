<template>
  <div class="approved">
    <van-nav-bar title="已完成审批" left-arrow @click-left="onClickLeft"/>

    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" :key="item.id" :title="item.name" :label="item.proj + '  ' + item.money"/>
      <van-tag plain type="primary">已完成</van-tag>
      <van-tag plain>已完成</van-tag>
      <van-tag plain type="danger">已完成</van-tag>
      <van-tag plain type="success">已完成</van-tag>
    </van-list>
    
  </div>
</template>

<script>
    import {
    NavBar,
    Cell,
    Tag,
    List
    } from 'vant';

    export default {

        data() {
            return {
                reason: "",
                note: "",
                payee: {

                },
                project: {

                },
                list: [],
                loading: false,
                finished: true
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [Cell.name]: Cell,
            [Tag.name]: Tag,
            [List.name]: List
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
        },
        mounted: function() {
            for (let i = 0; i < 4; i++) {//Ajax
                this.list.push({id: i, name: '借款申请' + (i+ 1),proj: i % 2 == 0 ? '上海差旅费' : '招待费', money: '200' + (i+1)+"元" });
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .approved {
        .van-cell {
            padding: 10px @basemar*2;
        }

        .van-nav-bar__left {
            left: @basemar*2;
        }

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
        }

        .cen {
            text-align: center;
        }

        .van-cell-group {
            margin-bottom: @basemar;
        }

        .van-button--normal {
            margin-left: 14%;
        }

        .van-step--vertical {
            height: 50px;
        }

        h3 {
            margin-bottom: 10px;
            margin-top: 10px;
        }

        p {
            margin-top: 10px;
        }

        .van-button {
            margin-left: 10%;
            width: 20%;
            margin-bottom: 18px;
        }

        .van-tag {
            float: right;
            margin-right: 35px;
        }

        .van-tag--plain {
            margin-top: -158px;
        }

        .van-tag--primary {
            margin-top: -215px;
        }

        .van-tag--danger {
            margin-top: -98px;
        }

        .van-tag--success {
            margin-top: -39px;
        }
    }
</style>
