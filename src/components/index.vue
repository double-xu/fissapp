<template>
  <div>
    <router-view class="tab-box"/>
    <van-tabbar v-model="active" >
      <van-tabbar-item :to="routes[0]">
        <span>首页</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? iconIndex.active : iconIndex.normal" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="routes[1]">
        <span>消息</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? iconMessages.active : iconMessages.normal" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="routes[2]">
        <span>通讯录</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? iconContact.active : iconContact.normal" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="routes[3]">
        <span>我的</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? iconMe.active : iconMe.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
  
  export default {
    name: 'tab-container',
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    data() {
      return {
        active: 0,
        routes: ['/home', 'messages', '/contacts', '/me'],
        iconIndex: {
          normal: require("../assets/images/home.png"),
          active: require("../assets/images/home_active.png")
        },
        iconMessages: {
          normal: require("../assets/images/message.png"),
          active: require("../assets/images/message_active.png")
        },
        iconContact: {
          normal: require("../assets/images/contact.png"),
          active: require("../assets/images/contact_active.png")
        },
        iconMe: {
          normal: require("../assets/images/me.png"),
          active: require("../assets/images/me_active.png")
        },
      }
    },
    mounted: function() {//解决一些跳转之后，active 不正常的问题
      for (let i = 0, len = this.routes.length; i < len ; i++) {
        if (this.routes[i] == this.$route.path) {//表明是激活的
          this.active = i;
          break;//一次就好
        }
          // console.log("当前route", this.$route.path, this.routes[i]);
      }
    }
  }
</script>

<style lang="less">
@import "../assets/less/var.less";
.van-tabbar {
  height: 60px;
}
.van-tabbar-item {
  color: @defaultTitleColor;
  font-size: 13px;
}
.van-tabbar-item--active {
  color: @defaultColor;
}
.van-tabbar-item__icon img {
  width: auto;
  height: 25px;
}


</style>
