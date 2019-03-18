<template>
  <div class="project">
    <van-nav-bar title="归属项目" left-arrow @click-left="onClickLeft" right-text="确认" @click-right="onClickLeft"/>
    <van-search v-model="project.name" autofocus show-action @keyup="search" @cancel="onCancel" icon="clear" 
    @click-icon="project.name = ''" placeholder="请输入项目名"/>
    
    <van-list v-model="loading" :finished="finished">
      <van-cell v-for="item in list" :key="item.id" is-link :title="item.name" @click="chooseProj(item)"/>
    </van-list>

  </div>
</template>

<script>
  import lodash from 'lodash';
  import {
    NavBar,
    Search,
    Icon,
    Cell, 
    CellGroup,
    List,
    Toast
  } from 'vant';

  export default {

    data() {
      return {
          project: {
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
      [List.name]: List,
      [Toast.name]: Toast
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

      search() {
        this.mykeyup();
      },

      //匹配到内容后，按取消会在list前面显示匹配内容
      onCancel() {
        // if (this.list.length < 10) {
          for (let i = 0; i < 10; i++) {//Ajax
            this.list.push({id: i, name: '福田'+(i+1)});
          }
        // }
      },

      chooseProj(item) {
        this.$store.state.drafts.project = item;
      }
    },
    mounted: function() {
      for (let i = 0; i < 10; i++) {//Ajax
        this.list.push({id: i, name: '福田'+(i+1)});
      }
      
      this.mykeyup = _.debounce(function keyUp() {
        let val = this.project.name;
        if (!val) {
          Toast("请输入想要搜索的内容")
        }
        this.list = this.list.filter(i => i.name.includes(val));
      }, 500);
    }
  };
</script>

<style lang="less">
    @import "../assets/less/var.less";
    @baseheight: 60px;
    @smalltop: 370px;
    .project {

        .van-nav-bar {
            background: @defaultColor;
            margin-bottom: @baseheight/6;
            .van-icon {
                vertical-align: middle;
                color: @containBackColor;
            }
        }

        .van-nav-bar__title {
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
            padding: @baseheight/15 @basemar;
        }
        .van-icon-clear {
            position: absolute;
            right: 0;
            transform: translateY(-50%);
            color: #999;
        }

    }
</style>
