<template>
    <div class="expdetails">
        <van-nav-bar title="报销明细" left-arrow @click-left="onClickLeft"/>

        <van-cell-group>
            <van-cell title="费用类别" :value="costcag.name" required is-link @click="goCostcag"/>
            <van-cell title="费用承担组织/部门" :value="department.name" required is-link  @click="goDepartment"/>
            <van-field v-model="allnum" required @click-icon="allnum = ''" label="费用金额" icon="clear" type="textarea" 
            placeholder="请填写" rows="1" autosize/>
            <van-cell title="税率" :value="tax.per" required is-link  @click="goTax"/>
        </van-cell-group> 

        <!--<van-button type="primary" bottom-action @click="save">保存</van-button>-->
        <van-button bottom-action @click="saveadd">保存并添加下一条</van-button>
    </div>
</template>

<script>
    import {
        NavBar,
        CellGroup,
        Field,
        Cell,
        SubmitBar,
        Uploader,
        Icon,
        Button,
        Actionsheet,
        Toast
    } from 'vant';

    export default {
        data() {
            return {
                allnum: "",
                costcag: {

                },
                department: {

                },
                tax: {

                },
                imageList: {
                    reader0: [
                    
                    ],
                    reader1: [],
                }
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [SubmitBar.name]: SubmitBar,
            [Uploader.name]: Uploader,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet,
            [Toast.name]: Toast
        },

        mounted: function(){
            if (this.$store.state.drafts.costcag) {
                this.costcag = this.$store.state.drafts.costcag;
            }
            if (this.$store.state.drafts.department) {
                this.department = this.$store.state.drafts.department;
            }
            if (this.$store.state.drafts.tax) {
                this.tax = this.$store.state.drafts.tax;
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            goCostcag() {
                this.$router.push('costcategory');
            },
            goDepartment() {
                this.$router.push('department');
            },
            goTax() {
                this.$router.push('tax');
            },
            // save() {
            //     if (!this.costcag.name||!this.department.name||!this.allnum||!this.tax.per) {
            //         Toast("请填写好所有必填项");
            //     } else {
            //         Toast.success('保存成功');
            //         //信息保存到expense页面对应位置

            //         this.$router.push('expense');
            //     }
            // },
            saveadd() {
                if (!this.costcag.name||!this.department.name||!this.allnum||!this.tax.per) {
                    Toast("请填写好所有必填项");
                } else {
                    Toast.success('保存成功');
                    //信息保存到expense页面对应位置 
                    
                    //并刷新当前页面||清空数据
                    this.costcag.name = null;
                    this.department.name = null;
                    this.allnum = null;
                    this.tax.per = null;
                }
            }
        }
    };
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .expdetails {

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
            padding-left: @basemar;
        }

        .van-cell-group {
            margin-bottom: 20px;
        }

        .van-button {
            width: 90%;
            left: 5%;
            border-radius: @basemar/3;
        }

        .van-button--bottom-action.van-button--primary {
            margin-bottom: @basemar;
        }

        .van-uploader {
            margin-left: 3%;
        }
        
        .upload {
            margin-bottom: @basemar;
            display: flex;
        }
        
        .van-actionsheet {
            width: 90%;
            left: 5%;
            color: #5080b0;
            margin-bottom: @basemar;
            background-color: transparent;

            .van-actionsheet__cancel {
                font-weight: bold;
                border-radius: @basemar/3;
            }
        }

        .van-uploader {
            margin:10px 0 10px 0;
            flex: 1;
            text-align: center;
        }

        .van-popup {
            width: 82%;
        }


        .md-example-child-reader .image-reader-list[data-v-43b0ea16] {
            margin-bottom: @basemar;
        }

        .van-popup {
            width: 82%;
        }

        .md-image-reader {
            border: 1px solid #c9c9c9;
        }

        .md-example-child-reader .image-reader-list .image-reader-item[data-v-43b0ea16] {
            margin-bottom: @basemar;
        }

        .md-example-child-reader {
            .image-reader-list {
                margin-top: @basemar;
                .image-reader-item[data-v-43b0ea16] {
                    margin-left: @basemar*2;
                }
                .image-reader-item.add {
                    margin-left: @basemar*2;
                    p {
                        color: #666;
                    }
                }
            }
        }
    }
</style>
