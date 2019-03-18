<template>
  <div class="headscl">
    <van-nav-bar title="修改头像" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
    import {
    NavBar
    } from 'vant';

    export default {

      data() {
        return {
        }
      },

      components: {
        [NavBar.name]: NavBar
      },

      methods: {
        onClickLeft() {
          this.$router.go(-1);
        }
      }
    }
</script>

<style lang="less">
  @import "../assets/less/var.less";
  .headscl {
    padding-bottom: 50px;
    .van-nav-bar {
      background: @defaultColor;
      color: white;
      .van-icon {
        color: white;
      }
    }
    &-cell-group {
      margin: @basemar 0;

      .van-cell__value {
        color: #999;
      }
    }

    .van-nav-bar__left {
      left: @basemar*2;
    }
  }
</style>
