<template>
  <div class="hello">
    <h3>没有找到页面, 返回 <router-link to="/">首页</router-link> </h3>
    <h3>或者 返回 <a href="#" @click.prevent="goback">上一页</a></h3>
    
  </div>
</template>

<script>
export default {
  props: ['message'],
  name: 'NotFound',
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
