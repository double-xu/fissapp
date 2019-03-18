<template>
  <div class="hello">
    <h4>消息</h4>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '没有找到页面'
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-align: center;
  }
</style>
