<template>
  <div class="loanbill">
    <van-nav-bar title="借款单填报" left-arrow @click-left="onClickLeft"/>

    <form>
        <van-cell-group>
            <van-field label="借款单号" :value="borrow.date" type="textarea" disabled required rows="1" autosize/>
            <van-field label="借款人" :value="$store.state.user.display_name" type="textarea" disabled required rows="1" autosize/>
            <van-field label="部门" :value="borrow.depart" type="textarea" disabled required rows="1" autosize/>
            <van-field v-model="number" v-on:blur="NumChange" @click-icon="number = ''" placeholder="单位：元" label="借款金额" icon="clear" required/>
            <van-field v-model="reason" v-on:blur="ReaChange" @click-icon="reason = ''" label="申请事由" icon="clear" type="textarea" placeholder="请填写" required rows="1" autosize/>
        </van-cell-group>

        <van-cell-group>
            <van-cell title="收款人/往来单位" required :value="payee.name" is-link @click="goPayee"/>
            <van-cell title="账号消息" required :value="payee.account" :label="payee.bank"/>
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
    </form>
        
    <van-row>
        <van-col span="12">
            <van-button type="submit" @click="onSubmit" bottom-action>确认提交</van-button>
        </van-col>
        <van-col span="12">
            <van-button bottom-action @click="goPayee">更改收款人</van-button>
        </van-col>
    </van-row>

  </div>
</template>

<script>
    import moment from 'moment'
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
        Toast
    } from 'vant';
    
    import {ImageReader, Icon as MandIcon, Toast as MandToast} from 'mand-mobile'
    import imageProcessor from 'mand-mobile/lib/image-reader/image-processor' // 图片处理插件，用法参考#imageProcessor

    export default {

        data() {
            return {
                borrow: {
                    date: "",
                    depart: "技术部"
                },
                number: "",
                reason: "",
                payee: {
                    name: "",
                    account: ""
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
            [ImageReader.name]: ImageReader,
            [MandIcon.name]: MandIcon,
            [MandToast.name]: MandToast,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [SubmitBar.name]: SubmitBar,
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Dialog.name]: Dialog,
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]: Toast
        },

        mounted: function(){
            if (this.$store.state.drafts.payee) {
                this.payee = this.$store.state.drafts.payee;
            }
            let date = moment().format('YYYYMMDDHHmm');
            this.borrow.date = date;
        },

        //借款金额及申请事由的暂存、以及获取value值的简便方法；提交成功的逻辑
        //                          
        //this.xxx(v-model='xxx')
        methods: {

            onClickLeft() {
                this.$router.go(-1);
            },

            expdetails() {
                this.$router.push('expdetails');
            },

            NumChange() {
                let num = this.number;
                // if (!num) {
                //     number.style.border = '1px solid red';
                // }
                if (!num) {
                    Toast('请输入借款金额');
                    return;
                } if (isNaN(num)) {
                    Toast('请输入数字');
                    return;
                } else {
                    let intnum = 1000*num;
                    console.log(intnum);
                }
            },

            ReaChange() {
                let rea = this.reason;
                if (!rea) {
                    Toast('请输入申请事由');
                    return;
                }
            },

            onSubmit() {
                let num = this.number,
                    rea = this.reason,
                    pname = this.$store.state.drafts.payee.name,
                    pacc = this.$store.state.drafts.payee.account;
                console.log(num,rea,pro,pname,pacc)
                if (!num||!rea||!pname||!pacc) {
                    Toast('请输入必填项');
                } else {
                    Toast('提交成功');
                }
            },

            goPayee() {
                this.$router.push('payee');
            },

            goProject() {
                this.$router.push('project');
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
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/less/var.less";
    .loanbill {
        .van-nav-bar {
            .van-icon {
                vertical-align: middle;
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

        .van-nav-bar .van-icon {
            color: @containBackColor;
        }

        .van-nav-bar__text {
            color: @containBackColor;
        }

        input {
            box-sizing: border-box;
            padding-left: 10px;
        }

        p {
            text-align: center;
        }

        .van-cell-group {
            margin-top: @basemar;
        }

        .van-button {
            margin: @basemar 0 0 10px;
            width: 85%;
        }

        .van-cell__label {
            font-size: 14px;
            line-height: 24px;
            float: right;
        }

        .van-button--submit {
            background-color: #ff4444;
        }
  
        .md-image-reader {
            border: 1px solid #c9c9c9;
        }

        .md-example-child-reader {
            .image-reader-list {
                margin-top: @basemar;
                .image-reader-item[data-v-43b0ea16] {
                    margin-left: @basemar*2;
                }
                .image-reader-item.add {
                    margin-left: @basemar*2;
                    top: @basemar;
                    margin-bottom: @basemar;
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