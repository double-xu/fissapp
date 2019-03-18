<template>
  <div class="exprocedure">
    <van-nav-bar title="差旅报销进度" left-arrow @click-left="onClickLeft"/>

    <van-cell-group>
        <van-field label="借款人" type="textarea" v-model="$store.state.user.display_name" rows="1" autosize/>
        <van-field label="部门" type="textarea" v-model="dep" rows="1" autosize/>
        <van-cell title="费用承担部门" :value="project.name"/>
        <van-cell title="报销金额" :value="item.money"/>
    </van-cell-group>

    <van-steps direction="vertical" :active="0" active-color="#f60">
        <van-step>
            <h3>领导审核</h3>
            <p>{{leaderev.time}}</p>
        </van-step>
        <van-step>
            <h3>部门经理审核</h3>
            <p>{{depmanagrev.time}}</p>
        </van-step>
        <van-step>
            <h3>申请提交</h3>
            <p>{{applsubmit.time}}</p>
        </van-step>
    </van-steps>
    
  </div>
</template>

<script>
    import {
        NavBar,
        CellGroup,
        Field,
        Cell,
        SubmitBar,
        Button,
        Icon,
        Dialog,
        Step, 
        Steps 
    } from 'vant';

    export default {

        data() {
            return {
                project: {
                    name: ""
                },
                dep: "",
                item: {
                    money: ""
                },
                leaderev: {
                    time: "2018-5-20 17:00"
                },
                depmanagrev: {
                    time: "2018-5-20 14:00"
                },
                applsubmit: {
                    time: "2018-5-20 10:00"
                }
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [SubmitBar.name]: SubmitBar,
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            [Step.name]: Step,
            [Steps.name]: Steps
        },

        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="less">
    @import "../assets/less/var.less";

    .exprocedure {

        .van-nav-bar {
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

        .van-cell--required::before {
            margin-left: @basemar;
        }

        .van-nav-bar__title {
            background: @defaultColor;
            color: @containBackColor;
            max-width: 100%;
        }

        .van-nav-bar__text {
            color: @containBackColor;
        }

        .cen {
            text-align: center;
        }

        .van-nav-bar__left {
            margin-bottom: 4px;
        }

        .van-cell-group {
            margin-bottom: @basemar;
        }

        .van-button--normal {
            margin-left: 14%;
        }

        .van-step--vertical {
            height: 50px;
        }

        h3 {
            margin-bottom: 10px;
            margin-top: 10px;
        }

        p {
            margin-top: 10px;
        }

        .van-button {
            margin-left: 6%;
            width: 24%;
            margin-bottom: 18px;
        }
    }
</style>
