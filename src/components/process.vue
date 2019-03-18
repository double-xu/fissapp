<template>
  <div class="process">
    <van-nav-bar title="我的流程" left-arrow @click-left="onClickLeft"/>

    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" is-link :key="item.id" :title="item.name" :label="item.proj + '  ' + item.money" @click="gotocheck()"/>
      <van-tag plain type="primary">已提交</van-tag>
      <van-tag plain>审批中</van-tag>
      <van-tag plain type="danger">审核完成</van-tag>
      <van-tag plain type="success">已付款</van-tag>
    </van-list>

    <van-cell-group>
      <van-cell icon="tosend" value="5" is-link @click="toPending">
        <template slot="title">
          <span class="van-cell-text">待处理</span>
        </template>
      </van-cell>

      <van-cell icon="passed" value="8" is-link @click="done">
        <template slot="title">
          <span class="van-cell-text">已完成</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import {
    NavBar,
    Panel,
    Icon,
    GoodsAction,
    GoodsActionBigBtn,
    Tabbar, 
    TabbarItem,
    Cell, 
    CellGroup,
    List,
    Button,
    Tag 
  } from 'vant';

  export default {
    components: {
      [NavBar.name]: NavBar,
      [Panel.name]: Panel,
      [Icon.name]: Icon,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [List.name]: List,
      [Button.name]: Button,
      [Tag.name]: Tag
    },

    data() {
      return {
        active: 2,
        receipt: {
          name: ""
        },
        list: [],
        loading: false,
        finished: true
      };
    },

    methods: {

      onClickLeft() {
        this.$router.go(-1);
      },

      toPending() {
        this.$router.push('pending');
      },

      done() {
        this.$router.push('done');
      },

      approve() {
        this.$router.push('approve');
      },
      gotocheck() {
        this.$router.push('aprexp');
      }
    },
    mounted: function() {
      for (let i = 0; i < 4; i++) {//Ajax
        this.list.push({id: i, name: '借款申请' + (i+ 1),proj: i % 2 == 0 ? '上海差旅费' : '招待费', money: '200' + (i+1)+"元" });
      }
    }
  };
</script>

<style lang="less">
  @import "../assets/less/var.less";
  .process {

    .van-cell {
      padding: 10px @basemar*2;
    }

    .van-nav-bar__left {
        left: @basemar*2;
    }

    &-cell-group {
        margin: @basemar 0;

    }

    .van-cell__value {
        color: #999;
        margin-right: @basemar*8;
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

    .van-cell__value span {
        display: block;
        width: 20px;
        height: @basemar+5px;
        border: 1px solid red;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        color: red;
        margin-right: -@basemar;
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

    .van-tag {
        float: right;
        margin-right: @basemar*3;
    }

    
    .van-list {
        .van-cell__right-icon {
            margin-top: 7px;
        }
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

    .van-button {
        position: absolute;
        top: 52PX;
        right: 50px;
    }

    .van-cell-group {
        margin-top: @basemar;
    }
  }
</style>
