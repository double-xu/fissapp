<template>
  <div class="hello">
    <div class="profile-box">
      <div class="profiles">
        <img src="../assets/images/avatar.png" alt="" class="avatar">

        <div class="profile">
          <span class="name">{{$store.state.user.display_name}}</span>
          <span class="company">{{company}}</span>
        </div>
      </div>
    </div>

    <van-cell-group class="cell-groups">
      <van-cell title="个人资料" is-link @click="toPerdata">
        <img src="../assets/images/me_profile.png" alt="" slot="icon" class="icon"/>
      </van-cell>
      <van-cell title="我的收款账号" is-link @click="toAccountnum">
        <img src="../assets/images/me_payee.png" alt="" slot="icon" class="icon"/>
      </van-cell>
      <van-cell title="收款人信息" is-link @click="toPayee">
        <img src="../assets/images/me_accounts.png" alt="" slot="icon" class="icon"/>
      </van-cell>
    </van-cell-group>

    <van-cell title="退出登录" is-link @click="logout" class="logout"/>
  </div>
</template>

<script>
import {Cell, CellGroup} from 'vant';
import odoo from '../odoorpc';
// import axios from 'axios';
export default {
  name: "me",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
    }
  },
  computed: {
    company: function(){
      let $store = this.$store;
      return $store.state.user && $store.state.user.company_id
        && $store.state.user.company_id.length > 0 && $store.state.user.company_id[1];
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    // https://wechat.taiduplus.com/api/wechat/qrcode?userId=399
    showPayee() {
      console.log("准备请求");

    },
    toPerdata() {
      this.$router.push("perdata");
    },
    toAccountnum() {
      this.$router.push("accountnum");
    },
    toPayee() {
      this.$router.push("payee")
    }
  }
}
</script>

<style lang="less">
  @import "../assets/less/var.less";
  .logout {
    background-color: @defaultColor;
    color: white;
    margin-top: 10px;
    .van-cell__right-icon {
      color: white;
    }

  }

  .cell-groups {
    margin-bottom: 10px;
    img.icon {
      width: 33px;
      height: 33px;
      margin-right: 20px;
    }

    .van-cell {
      line-height: 35px;
    }

    .van-cell__right-icon {
      line-height: 35px;
    }
  }
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/less/var.less";
  .profile-box {
    background-color: @defaultColor;
    padding: 30px;
    margin-bottom: 10px;
    .profiles {

      display: flex;
      align-items: center;
      // 头像 + 图片
      // https://stackoverflow.com/questions/38287590/display-two-lines-of-text-beside-an-image
      .profile {
        color: white;
        display: inline-block;

        padding-left: 20px;
        .name {
          display: block;
          font-size: 16px;
          font-weight: bold;
        }
        .company {
          display: block;
          font-size: 14px;
          font-weight: bold;
        }

      }


      .avatar {
        border-radius: 50%;
        padding: 2px;
        width: 85px;

        border: 2px white solid;
      }
    }
  }
</style>
