<template>
    <div>
        <div class="expense">
            <van-nav-bar title="报销单填报" left-arrow @click-left="onClickLeft"/>

            <van-cell-group>
                <van-field required :value="exp.kind" disabled class="disascel"/>
                <van-field required :value="exp.state" disabled class="disascel"/>
                <van-field placeholder="报销金额" required :value="exp.number" disabled class="disascel"/>
                <van-field placeholder="结算方式" required v-model="way" @click="showWay=true" class="disascel"/>
                <van-icon name="arrow" class="ctwayinp"/>
                <van-popup v-model="showWay">
                    <van-picker show-toolbar title="结算方式" :columns="columns" 
                    @cancel="onCancel" @confirm="onConfirm"/>
                </van-popup>
                <van-field v-model="reason" @click-icon="reason = ''" label="申请事由" 
                icon="clear" type="textarea" placeholder="请填写" required rows="1" autosize/>
                <van-cell title="归属项目" required :value="project.name" is-link class="pro" @click="goProject"/>
            </van-cell-group> 

            <van-cell-group>
                <van-cell title="报销明细" class="orgfont" @click="expdetal">
                    <van-icon slot="right-icon" name="add-o" class="van-cell__right-icon" />
                </van-cell>
            </van-cell-group> 

            <van-cell-group class="payeeinf">
                <van-cell title="收款人:" disabled :value="$store.state.user.display_name"/>
                <van-cell title="收款账号:" disabled :value="creditnum"/>
                <van-cell title="收款银行:" disabled :value="duebank.name"/>
            </van-cell-group> 
            
            <div class="md-example-child md-example-child-reader md-example-child-reader-0">
                <ul class="image-reader-list">
                    <li
                        class="image-reader-item"
                        v-for="(img, index) in imageList['reader0']"
                        :key="index"
                        :style="{
                        'backgroundImage': `url(${img})`,
                        'backgroundPosition': 'center center',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundSize': 'cover'
                        }">
                        <md-icon
                        class="image-reader-item-del"
                        name="circle-cross"
                        color="#666"
                        @click.native="onDeleteImage('reader0', index)">
                        </md-icon>
                    </li>
                    <li class="image-reader-item add">
                        <md-image-reader
                        name="reader0"
                        @select="onReaderSelect"
                        @complete="onReaderComplete"
                        @error="onReaderError"
                        is-multiple
                        ></md-image-reader>
                        <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                        <p>上传照片</p>
                    </li>
                </ul>
            </div>
            
            <van-button type="primary" bottom-action>保存</van-button>
            <van-button bottom-action @click="goPayee" class="changepay">更改收款人</van-button>
        </div>
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
        Popup,
        Picker,
        Toast
    } from 'vant';

    import {ImageReader, Icon as MandIcon, Toast as MandToast} from 'mand-mobile'
    import imageProcessor from 'mand-mobile/lib/image-reader/image-processor' // 图片处理插件，用法参考#imageProcessor


    export default {
        data() {
            return {
                allnum: "",
                costcag: {

                },
                creditnum: "",
                duebank: {
                    name: ""
                },
                department: {

                },
                project: {
                    name: ""
                },
                columns: ['银行转账', '现金结算', '网上支付'],
                exp: {
                    kind: "冲借款",
                    state: "待付款",
                    number: ""
                },
                reason: "",
                way: "",
                showWay: false,
                imageList: {
                    reader0: [],
                    reader1: [],
                }
            }
        },

        components: {
            [NavBar.name]: NavBar,
            [ImageReader.name]: ImageReader,
            [MandIcon.name]: MandIcon,
            [MandToast.name]: MandToast,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [SubmitBar.name]: SubmitBar,
            [Uploader.name]: Uploader,
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Actionsheet.name]: Actionsheet,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
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
            onConfirm(value, index) {
                this.way = value;
                this.showWay = false
            },

            goProject() {
                this.$router.push('project');
            },

            onCancel() {
                this.showWay = false
            },

            expdetal() {
                this.$router.push('expdetails');
            },
            
            onReaderSelect() {
                MandToast.loading('图片读取中...')
            },
            onReaderComplete(name, {dataUrl}) {
                const demoImageList = this.imageList[name] || []

                demoImageList.push(dataUrl)
                this.$set(this.imageList, name, demoImageList)

                MandToast.hide()
            },
            onReaderError({msg}) {
                MandToast.failed(msg)
            },
            onDeleteImage(name, index) {
                const demoImageList = this.imageList[name] || []
                demoImageList.splice(index, 1)
                this.$set(this.imageList, name, demoImageList)
            },
            goPayee() {
                this.$router.push('payee');
            },
            itinerary() {
                this.$router.push('itinerary')
            }
        }
    };
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .expense {

        .van-nav-bar {
            background: @defaultColor;
            margin-bottom: @basemar;
            .van-icon {
                vertical-align: middle;
                color: @containBackColor;
            }
        }

        .pro {
            .van-cell__right-icon {
                margin-right: @basemar;
            }
        }

        .van-nav-bar__left {
            left: @basemar*2;
        }

        .disascel {
            width: 46%;
            display: inline-block;
        }

        .van-cell {
            padding-left: @basemar*2;
        }

        .ctwayinp {
            position: absolute;
            color: #808080;
            font-size: 12px;
            right: 28px;
            top: @basemar*4;
            transform: rotate(90deg);
        }

        .van-cell__value {
            overflow: initial;
        }

        .van-nav-bar__title {
            color: @containBackColor;
        }

        .van-nav-bar .van-icon {
            color: @containBackColor;
            vertical-align: middle;
        }

        .van-cell-group {
            margin-bottom: @basemar;
        }

        .van-button {
            width: 90%;
            left: 5%;
            margin-bottom: @basemar;
        }

        .van-cell--required::before {
            padding-left: @basemar;
        }

        .van-icon-add-o:before {
            margin-right: @basemar*2;
            font-size: 16px;
        }

        .orgfont {
            color: @defaultColor;
        }

        .payeeinf { 
            margin-bottom: 0;
            .van-cell:not(:last-child)::after {
                border-bottom-width: 0;
            }   
            .van-cell {
                background: @defaultColor;
                color: @containBackColor;
                .van-cell__value {
                    text-align: left;
                    margin-right: @basemar*12;
                }
            }
        }

        .changepay {
            background: @defaultColor;
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

<style lang="stylus" scoped>
.md-example-child-reader
  .image-reader-list
    float left 
    width 100%
    .image-reader-item
      position relative
      float left
      width 23.5%
      padding-bottom 23.5%
      margin-bottom 2%
      background color-bg-base
      box-sizing border-box
      list-style none
      border-radius radius-normal
      hairline(all, color-border-base)
      background-size cover
      &:nth-of-type(4n)
        margin-right 0
      &.add 
        .md-icon
          width 16px
          height 16px
          position absolute
          top 40%
          left 50%
          transform translate(-50%, -50%)
          opacity .5
        p
          position absolute
          top 50%
          left 0
          width 100%
          margin-top 15px
          font-size font-minor-normal
          color color-text-disabled 
          text-align center
      .image-reader-item-del
        width 16px
        height 16px
        position absolute
        top 5px
        right 5px
        z-index 3
        border-radius radius-circle
</style>

           