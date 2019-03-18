<template>
  <div class="mytravl">
    <van-nav-bar title="差旅报销列表" left-arrow @click-left="onClickLeft"/>

    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" is-link :key="item.id" :title="item.name" :label="item.proj + '  ' + item.money" @click="gotocheck()"/>
      <van-tag plain type="primary">已提交</van-tag>
      <van-tag plain>审核中</van-tag>
      <van-tag plain type="danger">已驳回</van-tag>
      <van-tag plain type="success">审核通过</van-tag>
    </van-list>
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

      toInapr() {
        this.$router.push('inapproval');
      },

      done() {
        this.$router.push('done');
      },

      approve() {
        this.$router.push('approve');
      },
      gotocheck() {
        this.$router.push('exprocedure');
      }
    },
    mounted: function() {
      for (let i = 0; i < 4; i++) {//Ajax
        this.list.push({id: i, name: '借款申请' + (i+ 1),proj: i % 2 == 0 ? '上海差旅费' : '招待费', money: '200' + (i+1)+"元" });
        // let celltxt = this.list[0].text;
        // console.log(celltxt)
      }
    }
  };
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .mytravl {
        padding-bottom: 50px;

        &-cell-group {
            margin: @basemar 0;

            .van-cell__value {
                color: #999;
            }
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
        
        .van-cell {
        padding: 10px @basemar*2;
        }

        .van-nav-bar__left {
        left: @basemar*2;
        }

        .van-nav-bar__title {
            background: @defaultColor;
            color: @containBackColor;
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

        .van-cell__right-icon {
            padding-top: 7px;
        }
    }
</style>
