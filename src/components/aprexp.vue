<template>
  <div class="aprexp">
    <van-nav-bar title="单据审核" left-arrow @click-left="onClickLeft"/>

    <van-cell-group>
        <van-cell title="报销单号" :value="project.name"/>
        <van-cell title="申请人" />
        <van-cell title="部门" />
    </van-cell-group>

    <van-cell-group>
        <van-field label="申请事由" type="textarea" 
        rows="1" autosize/>
        <van-field label="备注" type="textarea" 
        rows="1" autosize/>
        <van-cell title="归属项目" :value="project.name"/>
        <van-cell title="报销详细" />
        <van-cell title="收款人/往来单位" :value="payee.name"/>
        <van-field :value="payee.account" :label="payee.bank" disabled/>
    </van-cell-group>

    <van-button type="primary">同意</van-button>
    <van-button type="danger">不同意</van-button>

    <!--<van-steps direction="vertical" :active="0" active-color="#f60">
        <van-step>
            <h3>领导审核</h3>
            <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
            <h3>部门经理审核</h3>
            <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
            <h3>申请提交</h3>
            <p>2016-07-10 09:30</p>
        </van-step>
    </van-steps>-->
    
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
                reason: "",
                note: "",
                payee: {

                },
                project: {

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
    .aprexp {

        .van-cell {
        padding: 10px @basemar*2;
        }

        .van-nav-bar__left {
            left: @basemar*2;
        }

        .van-nav-bar {
            background: @defaultColor;
            color: @containBackColor;
            margin-bottom: @basemar;
            .van-icon {
                vertical-align: middle;
                color: @containBackColor;
            }
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
            width: 40%;
            margin-bottom: 18px;
        }
    }
</style>
