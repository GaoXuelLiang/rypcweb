<template>
    <div class="login">
        <!-- <div class="login_top">
      <div class="login_img">
        <img src="../../../static/empPage/LOGO3.png" alt="">
        <img src="../../../static/img/xuhui.png" alt="">
        <span>人力资源管理平台</span>
      </div>
    </div> -->
        <!-- <div class="login_font">
            <span>{{$t('title')}}</span>
        </div> -->
        <transition name="component-fade"
                    mode="out-in">
            <router-view />i
        </transition>
        <div class="login_bg">
            <transition-group name="hehe">
                <div class="login_mid"
                     v-for="(image,i) of img_thumb_List"
                     :key="image"
                     v-show='i==mark'>
                    <div :style="{backgroundSize:'100% 100%',backgroundRepeat:'no-repeat',width:'100%',height:'100%',backgroundImage: 'url('+image+')'}"></div>
                </div>
            </transition-group>
        </div>
        <!--<div class="login_fot">POWEREDBY HROCLOUD.COM</div>--S>
  <!-- <div class="logo_con"></div>
  <div class="test_con"></div> -->
        <!-- <div class="bg_control"
             ref="popUp">
            <transition name="fade">
                <div class="control_unit"
                     v-show="isShow">
                    <div class="control_unit_top">
                        <span>{{$t('lang_login.bg.clickCBg')}}</span>
                        <span>
                            {{$t('lang_login.bg.autoPlay')}}
                            <Checkbox @on-change="play()"
                                      v-model="single"></Checkbox>
                        </span>
                        <span>
                            {{$t('lang_login.bg.playSpeed')}}
                            <InputNumber :max="10"
                                         :min="1"
                                         :disabled="disabled"
                                         @on-change="changePlay()"
                                         v-model="value1"></InputNumber>
                        </span>
                    </div>
                    <div class="control_unit_img">
                        <div class="img_thumb"
                             v-for="(item,index) of img_thumb_List"
                             :key="index"
                             @click="changeBg(index)">
                            <img :src="item"
                                 alt="背景缩略图">
                        </div>
                    </div>
                </div>
            </transition>
            <div class="control_icon">
                <div class="control_icon_pad"
                     @click="controlShow">
                    <img src="../../../../static/img/control.png"
                         alt="">
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            single: false,
            value1: 1,
            isShow: false,
            disabled: true,
            mark: '0',
            timer: null,
            img_thumb_List: [
                '../../../../static/img/loginMain6.jpg',
                // '../../../../static/img/loginMain1.jpg',
                // '../../../../static/img/loginMain2.png',
                // '../../../../static/img/loginMain3.png',
                // '../../../../static/img/loginMain4.png',
                // '../../../../static/img/loginMain5.png',
            ]
        }
    },
    created () {
        this.setImg()
    },
    mounted () {
        let t = this;
        document.addEventListener('mouseup', (e) => {
            let popUp = t.$refs.popUp
            if (popUp) {
                if (!popUp.contains(e.target)) {
                    t.isShow = false
                }
            }
        })
    },
    methods: {
        //缩略图控制
        // controlShow () {
        //     this.isShow = !this.isShow
        // },
        // //改变背景
        // changeBg (index) {
        //     const t = this
        //     t.mark = index
        //     localStorage.setItem('choseimg', index)
        // },
        // autoPlay () {
        //     const t = this
        //     if (t.mark < t.img_thumb_List.length - 1) {
        //         t.mark++;
        //     } else {
        //         t.mark = 0;
        //     }
        // },
        //自动播放
        // play () {
        //     const t = this
        //     console.log(t.single)
        //     //t.single = true
        //     // t.disabled = false
        //     if (t.timer != null) {
        //         clearInterval(t.timer);
        //         t.timer = null;
        //     }
        //     if (t.single) {
        //         t.disabled = false
        //         t.timer = setInterval(t.autoPlay, t.value1 * 1000)
        //     } else {
        //         t.disabled = true
        //         clearInterval(t.timer);
        //         t.timer = null;
        //     }
        // },
        //设置背景图存储本地
        setImg () {
            const t = this
            if (localStorage.getItem("choseimg") != null) {
                t.mark = localStorage.getItem('choseimg')
            } else {
                t.mark = 0
            }
        },
        //数字框控制轮播时间
        // changePlay () {
        //     const t = this
        //     clearInterval(t.timer);
        //     t.timer = null;
        //     if (t.value1) {
        //         t.timer = setInterval(t.autoPlay, t.value1 * 1000)
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    /*background-image: url('../../../static/img/login_bg.jpg');*/
    /*background-size: cover;*/
    background-position: center;
    position: relative;
    .login_font {
        width: 100%;
        // height: 10%;
        color: white;
        font-size: 2.375rem;
        text-align: center;
        line-height: 2.375rem;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -780%); /*向左向上分别平移自身的一半*/
        -webkit-transform: translate(-50%, -780%);
        -moz-transform: translate(-50%, -780%);
        z-index: 1;
        letter-spacing: 5px;
    }
    .login_top {
        width: 100%;
        height: 10%;
        color: white;
        padding-left: 40px;
        position: absolute;
        top: 30px;
        .login_img {
            width: 350px;
            padding-top: 10px;
            display: flex;
            align-items: center;
            img {
                margin-right: 10px;
            }
            span {
                font-size: 20px;
                font-weight: bold;
                padding-top: 10px;
            }
        }
        /*.login_img{*/
        /*  width:450px;*/
        /*  padding-top: 10px;*/
        /*  display: flex;*/
        /*  align-items: center;*/
        /*  img{*/
        /*    width:170px;*/
        /*    height: 40px;*/
        /*    margin-right: 10px;*/
        /*  }*/
        /*  span{*/
        /*    font-size: 20px;*/
        /*    font-weight: bold;*/
        /*    padding-top: 10px;*/
        /*  }*/
        /*}*/
    }
    .login_mid {
        width: 100%;
        height: 100%;
        // background-image: url('../../../static/img/loginMain1.png');
        background-size: cover;
    }
    .login_bg {
        width: 100%;
        height: 100%;
    }
    .login_fot {
        width: 100%;
        height: 10%;
        color: white;
        font-size: 14px;
        text-align: center;
        line-height: 63.5px;
        font-weight: bold;
        position: absolute;
        bottom: 0;
    }
    .logo_con {
        position: absolute;
        top: 50px;
        left: 100px;
        width: 200px;
        height: 50px;
        /*background-image: url('../../../static/img/HROCloud_Logo_.png');*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .test_con {
        position: absolute;
        top: 65px;
        left: 300px;
        width: 200px;
        height: 25px;
        // background-image: url('../../../static/img/z.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .bg_control {
        width: 370px;
        position: absolute;
        right: 40px;
        bottom: 40px;
        z-index: 1;
        .control_unit {
            width: 370px;
            height: 132px;
            font-size: 14px;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            margin-bottom: 5px;
            padding: 18px 20px;
            .control_unit_top {
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
                margin-bottom: 14px;
            }
            .control_unit_img {
                display: flex;
                justify-content: space-between;
                .img_thumb {
                    width: 58px;
                    height: 58px;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .control_icon {
            display: flex;
            justify-content: flex-end;
            .control_icon_pad {
                position: relative;
                cursor: pointer;
                width: 66px;
                height: 66px;
                background-color: #1c57a5;
                border-radius: 6px;
                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
}

/deep/ .ivu-input-number {
    width: 46px;
    height: 18px;
    border: 1px solid rgba(191, 191, 191, 1);
    border-radius: 2px;
    line-height: 0;
}

/deep/ .ivu-input-number-handler-down-inner {
    height: 10px;
    line-height: 10px;
}
/deep/ .ivu-input-number-handler-up-inner {
    height: 10px;
    line-height: 6px;
}
/deep/ .ivu-input-number-handler {
    height: 9px;
}
/deep/ .ivu-input-number-input {
    height: 18px;
}
.hehe-enter,
.hehe-leave-to {
    opacity: 0.78;
}
.hehe-enter-to,
.hehe-leave {
    opacity: 1;
}
.hehe-enter-active,
.hehe-leave-active {
    transition: all 0.2s ease;
}
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
}
</style>
