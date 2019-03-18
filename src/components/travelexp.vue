<template>
  <div class="travelexp">
    <van-nav-bar title="差旅报销" left-arrow @click-left="onClickLeft"/>
    <van-notice-bar mode="closeable" :scrollable="true">
    亲爱的{{$store.state.user.display_name}}，您共有{{list.length}}笔差旅借款未报销，借款总金额为：元。记得尽早报销呦！
    </van-notice-bar>
    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" value="冲这笔" is-link :key="item.id" :title="item.name" :label="item.proj + '  ' + item.money" @click="exp()"/>
    </van-list>

    <van-button type="primary" bottom-action @click = "exp">差旅报销</van-button>
    <van-button bottom-action @click = "mytra">我的差旅</van-button>
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
  NoticeBar 
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
    [NoticeBar.name]: NoticeBar
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
    exp() {
        this.$router.push('travelreim');
    },
    mytra() {
        this.$router.push('mytravel');
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
    .travelexp {
        .van-list {
            margin-top: @basemar;
        }
        padding-bottom: 50px;

        &-cell-group {
            margin: @basemar 0;

            .van-cell__value {
                color: #999;
            }
        }

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

        .van-tabbar-item--active {
            color: #cc9646;
        }

        .van-cell__title .van-icon {
            margin-left: @basemar;
        }

        .van-cell__text {
            margin-left: @basemar;
        }

        .van-cell__value {
            overflow: initial;
        }

        .van-cell-group {
            margin-top: @basemar;
        }

        .van-button--bottom-action {
            margin-top: @basemar;
            width: 80%;
            left: 10%;
        }
    }
</style>
