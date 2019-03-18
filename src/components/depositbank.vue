<template>
  <div class="depositbank">
    <van-nav-bar title="开户行" left-arrow @click-left="onClickLeft" right-text="确认" @click-right="onClickLeft"/>
    <van-search v-model="depbank.name" icon="clear" @click-icon="depbank.name = ''" placeholder="请输入开户行名称"/>
    </van-search>

    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" :key="item.id" is-link :title="item.name" @click="chooseDepbank(item)"/>
    </van-list>

  </div>
</template>

<script>
  import {
    NavBar,
    Search,
    Icon,
    Cell, 
    CellGroup,
    List
  } from 'vant';

  export default {

    data() {
      return {
        depbank: {
          name: ""
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
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [List.name]: List
    },

    methods: {

      onClickLeft() {
        // this.$store.state.drafts.expense.name = this.payeename;
        this.$router.go(-1);
        //this.$router.push('expense');
      },

      onConfirm() {
        this.onClickLeft();
      },

      chooseDepbank(item) {
        this.$store.state.drafts.depbank = item;
      }
    },
    mounted: function() {
      for (let i = 0; i < 10; i++) {//Ajax
        this.list.push({id: i, name: '建设银行'+(i+1)});
      }
    }
  };
</script>

<style lang="less">
  @import "../assets/less/var.less";
  @baseheight: 60px;
  @smalltop: 370px;
  @bg: #feef98;

  .depositbank {
    .van-nav-bar {
        background: @defaultColor;
        margin-bottom: @baseheight/6;
        .van-icon {
            vertical-align: middle;
        }
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

    .van-search {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;
      padding: @baseheight/15 @baseheight/4;
    }
    .van-icon-clear {
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      color: #999;
    }
  }
</style>