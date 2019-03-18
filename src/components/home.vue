<template>
  <div>
    <section>
      <div class="hello-box">
        <div class="hello">
          <span class="name">你好，{{user.display_name}}：</span>
          <span class="message">欢迎来到FISS共享平台！在这里，你可以轻松完成费用报销、审核等流程……</span>
        </div>
      </div>

    </section>

    <section class="entry-box">
      <ul class="entry-ul">
        <li>
          <router-link to="costexp">
            <img src="../assets/images/nav_expense.png" alt="">
            费用报销

          </router-link>
        </li>
        <li>
          <router-link to="travelexp">
            <img src="../assets/images/nav_trip.png" alt="">
            差旅报销
          </router-link>
        </li>
        <li>
          <router-link to="loanbill">
            <img src="../assets/images/nav_loan.png" alt="">
            我要借款
          </router-link>
        </li>
        <li>
          <router-link to="process">
            <img src="../assets/images/nav_process.png" alt="">
            我的流程
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_sales.png" alt="">
            销售订单
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_incoming.png" alt="">
            移动收款
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_purchase.png" alt="">
            采购申请
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_stock.png" alt="">
            移动库存
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_money.png" alt="">
            资金掌控
          </router-link>
        </li>
        <li>
          <router-link to="expense">
            <img src="../assets/images/nav_chart.png" alt="">
            经营分析
          </router-link>
        </li>
        <li>
          <router-link to="approve">
            <img src="../assets/images/nav_review.png" alt="">
            业务审核
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    payee() {
      this.$router.push("expense");
    },
    travelexp() {
      this.$router.push("travelexp");
    },
    loanbill() {
      this.$router.push("loanbill");
    },
    process() {
      this.$router.push("process");
    },
    approve() {
      this.$router.push("approve");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/less/var.less";
.hello-box {
  // &::after {
  //   content: url('../assets/images/home-triangle.png');
  //   background-position: right;
  // }
  background-color: white;
  padding-bottom: 30px;
  margin-bottom: 10px;

  .hello {
    color: white;
    font-size: 16px;
    background-color: @defaultColor;
    padding: 30px 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    .name {
      font-weight: bold;
      display: block;
      margin-bottom: 10px;
    }
    .message {
      display: block;
    }
  }
}

.entry-box {
  background: white;
  .entry-ul {
    padding: 20px;
    li {
      display: inline-block;
      width: 23%;
      text-align: center;
      font-size: 13px;

      img {
        width: auto;
        height: 40px;
        display: block;
        margin: 10px auto;
      }

      a {
        display: block;
        padding: 5px;
        text-decoration: none;
        color: #231815;
      }

      a:focus {
        background-color: @defaultColor;
      }
    }
  }
}
</style>
