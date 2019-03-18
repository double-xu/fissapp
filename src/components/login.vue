<template>
  <div class="page-warp">

    <div class="login-panel">

      <img src="/static/mobile/images/logo-shadow.png" alt="LOGO图标" class="logo-shadow">

      <div class="options">
        <input type="text" placeholder="用户名: 随意输入" class="username" v-model="username"/>
        <input type="password" placeholder="密码" class="password" v-model="password"/>
        <input type="text" placeholder="公司域名" class="company" v-model="company"/>

        <p @click="forget">忘记密码</p>

        <a href="javascript:;" @click="login" class="action">
          登录
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';
import _ from 'lodash';
import odoo from '../odoorpc'

export default {
  name: 'HelloWorld',
  data () {
    return {
      username: "",
      password: "",
      company: ""
    }
  },
  mounted: function() {
    if (!_.isEmpty(this.$store.state.user)) {
      this.$router.push(this.$route.query.redirect || "/");
    }
  },
  methods: {
    login() {
      console.log("提交登录信息");

      let useOdoo = false;
      if (!useOdoo) {
        this.$store.commit('login', {display_name: this.username, company_id: [1, this.company]})
        Toast("登录成功");
        this.$router.push(this.$route.query.redirect || "/");
        return;
      }

      odoo.login("beta", this.username, this.password)
        .then(result => {

          odoo.call("res.users", "read", [[result.uid],  ["company_id", "name", "notify_email", "tz_offset", "email", "tz", "signature", "image", "lang", "display_name", "__last_update"]], {})
          .then(result => {
            console.log("result", result);
  
            this.$store.commit('login', result[0])
            Toast("登录成功");
            this.$router.push(this.$route.query.redirect || "/");
          }).catch(err => {
            console.error(err);
            Toast(err);
          })
        }).catch(err => {
          console.error(err);
          Toast(err);
        })
    }, 
    forget() {
      Toast("联系管理员重置密码");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/less/var.less";
  .page-warp {
    height: 100vh;
    background: url('/static/mobile/images/bg-star.jpg') no-repeat;
    overflow: hidden;
    background-size: 100% auto;

    display: flex;
    display: -webkit-flex;
    align-items: center;

    text-align: center;

    .login-panel {
      margin: auto;
    }

    .logo-shadow {
      width: 70%;
      margin-bottom: 30px;
    }


    .options {
      input {
        margin: 15px auto;
        display: block;
        width: 55%;
        height: 28px;
        border: 1px;

        text-indent: 25px;
        
        background-repeat: no-repeat;
        background-position: 5px;
        background-size: 15px 15px;
      }

      &> p {
        margin: 10px auto;
        width: 55%;
        text-align: left;
        font-size: 12px;
        color: white;
      }


      .username {
        background-image: url('../assets/images/user.png');

        &:focus {
          background-image: url('../assets/images/user_active.png');
        }
      }

      .password {
        background-image: url('../assets/images/lock.png');

        &:focus {
          background-image: url('../assets/images/lock_active.png');
        }
      }

      .company {
        background-image: url('../assets/images/link.png');

        &:focus {
          background-image: url('../assets/images/link_active.png');
        }
      }
    }
    a.action {
      display: inline-block;
      height: 30px;
      width: 56%;
      background-color: @defaultColor;
      text-decoration: none;
      color: white;
      font-size: 16px;
      line-height: 30px;
    }
  }
</style>
