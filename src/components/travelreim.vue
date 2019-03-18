<template>
  <div class="travelreim">
    <van-nav-bar title="差旅报销单填报" left-arrow @click-left="onClickLeft"/>

    <van-cell-group>
        <!--<van-field label="差旅报销单单号" :value="trav.date" type="textarea" disabled required rows="1" autosize/>-->
        <van-field label="借款人" :value="$store.state.user.display_name" type="textarea" disabled required rows="1" autosize/>
        <van-field v-model="reason" autofocus @click-icon="reason = ''" label="申请事由" icon="clear" type="textarea" 
        placeholder="请填写" required rows="1" autosize/>
        <van-cell title="结算方式" required v-model="way" is-link @click="showWay=true"/>
        <van-popup v-model="showWay">
            <van-picker show-toolbar title="结算方式" :columns="columns" 
            @cancel="onCancel" @confirm="onConfirm"/>
        </van-popup>
    </van-cell-group>

    <van-cell-group>
        <van-cell title="归属项目" required :value="project.name" is-link @click="goProject"/>
        <van-cell title="收款人/往来单位" required :value="payee.name"  is-link @click="goPayee"/>
        <van-cell title="银行卡信息" :value="payee.bank+payee.account" required is-link disabled/>
        <van-cell title="行程单" required :value="person.name"  is-link @click="goItinerary"/>
        <van-field label="报销总金额" v-model="talamount" required disabled/>
        <van-field label="冲借款" v-model="borwamount" required disabled/>
        <van-field label="待付款总金额" v-model="payamount" required disabled/>
    </van-cell-group>
    
    <van-row>
        <van-col span="12">
            <van-button type="primary" @click="onSubmit" bottom-action>确认提交</van-button>
        </van-col>
        <van-col span="12">
            <van-button bottom-action @click="goPayee">更改收款人</van-button>
        </van-col>
    </van-row>
    
  </div>
</template>

<script>
    import moment from 'moment';
    import {
        NavBar,
        CellGroup,
        Field,
        Cell,
        SubmitBar,
        Button,
        Icon,
        Dialog,
        Row,
        Col,
        Picker,
        Popup,
        Toast 
    } from 'vant';

    export default {

        data() {
            return {
                reason: "",
                note: "",
                showWay: false,
                way: "银行转账",
                talamount: "",
                borwamount: "",
                payamount: "",
                columns: ['银行转账', '现金结算', '网上支付'],
                payee: {

                },
                project: {

                },
                person: {

                },
                trav: {
                    // date: "",
                    depart: ""
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
            [Row.name]: Row,
            [Col.name]: Col,
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Toast.name]: Toast
        },

        mounted: function(){
            if (this.$store.state.drafts.payee) {
                this.payee = this.$store.state.drafts.payee;
            }
            if (this.$store.state.drafts.project) {
                this.project = this.$store.state.drafts.project;
            }
            if (this.$store.state.drafts.itinerary) {
                this.itinerary = this.$store.state.drafts.itinerary;
            }
            
            // let date = moment().format('YYYYMMDDHHmm');
            // this.trav.date = date;
        },

        methods: {

            onClickLeft() {
                this.$router.go(-1);
            },

            expdetails() {
                this.$router.push('expdetails');
            },

            onSubmit() {
                if (!this.reason||!this.way||!this.$store.state.drafts.project.name||
                !this.$store.state.drafts.payee.name||!this.$store.state.drafts.payee.bank
                ||!this.$store.state.drafts.payee.account||!this.$store.state.drafts.person.name||
                !this.talamount||!this.borwamount||!this.payamount) {
                    Toast('请填写好所有必填项')
                }
            },

            goPayee() {
                this.$router.push('payee');
            },

            goProject() {
                this.$router.push('project');
            },

            goItinerary() {
                this.$router.push('itinerary');
            },

            onConfirm(value, index) {
                this.way = value;
                this.showWay = false
            },

            onCancel() {
                this.showWay = false
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/var.less";

    .travelreim {

        .van-nav-bar {
            background: @defaultColor;
            color: @containBackColor;
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

        .van-nav-bar .van-icon {
            color: @containBackColor;
        }

        .van-nav-bar__text {
            color: @containBackColor;
        }

        p {
            text-align: center;
        }

        .van-cell-group {
            margin-top: @basemar;
        }

        .van-popup {
            width: 80%;
        }

        .van-button {
            border-radius: 5px;
            margin: @basemar 0 0 @basemar;
            width: 85%;
        }

    }
</style>
