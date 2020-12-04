<template>
    <div class="skinPeeler">
        <Card style="width:844px;height:534px">
            <p slot="title">
                {{$t('lang_homePage.menuItem.skinpeeler')}}
            </p>
            <span slot="extra"
                  @click="close">
                <Icon type="md-close"
                      size="20"></Icon>
            </span>
            <ul>
                <li v-for="(item,index) in bgGroup"
                    :key="index">
                    <div class="item-img">
                        <img :src="item.src"
                             alt="">
                        <div class="item-cover"
                             v-show="bgSkin == item.name">{{$t('lang_homePage.skinpeelers.current')}}</div>
                    </div>
                    <div class="item-des">
                        <span>{{item.des}}</span>
                        <Button :class="'btn'+item.name"
                                @click="changeSkin(item.name,index)">{{$t('lang_homePage.skinpeelers.immediately')}}</Button>
                    </div>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    data () {
        return {
            bgSkin: '',
            bgSkinColor: '',
            bgIndex: '',
            bgGroup:[],
            hxBgGroup: [
                {
                    des: this.$t('lang_homePage.skinpeelers.classic'),
                    src: '../../../static/background/blackBg.png',
                    name: 'black'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.blue'),
                    src: '../../../static/background/blueBg.png',
                    name: 'blue'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.green'),
                    src: '../../../static/background/greenBg.png',
                    name: 'green'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.Navyblue'),
                    src: '../../../static/background/navyBlueBg.png',
                    name: 'navyBlue'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.red'),
                    src: '../../../static/background/redBg.png',
                    name: 'red'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.Deeppurple'),
                    src: '../../../static/background/purple.png',
                    name: 'purple'
                }
            ],
            znBgGroup: [
                {
                    des: this.$t('lang_homePage.skinpeelers.classic'),
                    src: '../../../static/background/greenBlackBg.png',
                    name: 'greenBlack'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.black'),
                    src: '../../../static/background/blackBg.png',
                    name: 'black'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.green'),
                    src: '../../../static/background/greenBg.png',
                    name: 'green'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.Navyblue'),
                    src: '../../../static/background/navyBlueBg.png',
                    name: 'navyBlue'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.red'),
                    src: '../../../static/background/redBg.png',
                    name: 'red'
                },
                {
                    des: this.$t('lang_homePage.skinpeelers.Deeppurple'),
                    src: '../../../static/background/purple.png',
                    name: 'purple'
                }
            ]
        }
    },
    created () {

    },
    mounted () {
        switch(pubsource.param_mt) {
            case 'xian':
                this.bgSkin = localStorage.getItem('userThemes') == null ? 'red' : localStorage.getItem('userThemes');
                this.bgGroup = this.hxBgGroup;
                break;
            case 'znjs':
                this.bgSkin = localStorage.getItem('userThemes') == null ? 'greenBlack' : localStorage.getItem('userThemes');
                this.bgGroup = this.znBgGroup;
                break;
        }
        console.log()
    },
    methods: {
        // 换肤
        changeSkin (name, index) {
            if (!name) {
                return
            } else {
                switch (name) {
                    case 'blue':
                        this.bgSkin = 'blue'
                        this.bgSkinColor = '#3394FF'
                        break;
                    case 'green':
                        this.bgSkin = 'green'
                        this.bgSkinColor = '#2FAF98'
                        break;
                    case 'navyBlue':
                        this.bgSkin = 'navyBlue'
                        this.bgSkinColor = '#3B5999'
                        break;
                    case 'red':
                        this.bgSkin = 'red'
                        this.bgSkinColor = '#CC4649'
                        break;
                    case 'purple':
                        this.bgSkin = 'purple'
                        this.bgSkinColor = '#37385C'
                        break;
                    case 'greenBlack':
                        this.bgSkin = 'greenBlack'
                        this.bgSkinColor = '#294834'
                        break;
                    default:
                        this.bgSkin = ''
                        this.bgSkinColor = '#2d8cf0'
                        break;
                }
                localStorage.setItem('myColors',this.bgSkinColor)
                this.$store.commit('setMyColor',this.bgSkinColor)
                let data = {}
                let params = {
                    _mt: this.$global.mt + 'UserInfo.updInstall',
                    APfunId: localStorage.userId,
                    APlogType: '主题颜色',
                }
                data = deepCopy(params)
                data.userThemes = name
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, this)) {
                        console.log(res)
                        if(res.data.content[0].value == '1') { 
                            this.$emit('changeBgSkin', this.bgSkin, this.bgSkinColor, name)
                            this.close()
                        }
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                }).finally(() => {

                })
            }
        },
        close () {
            const t = this;
            t.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
.skinPeeler {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    /deep/ .ivu-card {
        border-radius: 6px !important;
    }
    .ivu-card-head p {
        font-size: 16px !important;
        font-weight: 500 !important;
        color: #17233d !important;
    }
    /deep/ .ivu-card-head {
        padding: 14px 20px !important;
    }
    /deep/ .ivu-card-extra {
        cursor: pointer;
    }
    /deep/ .ivu-card-body {
        padding: 20px !important;
    }
    ul {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
        li {
            width: 254px;
            height: 212px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 1px 8px 0px rgba(0, 21, 41, 0.15);
            border-radius: 4px;

            .item-img {
                width: 100%;
                height: 162px;
                overflow: hidden;
                position: relative;

                .item-cover {
                    width: 100%;
                    height: 0;
                    opacity: 0.62;
                    background: rgba(50, 44, 46, 1);
                    font-size: 16px;
                    color: rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    z-index: 10;
                    transition: all 0.3s ease-out;
                }
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    transition: all 1s;
                }
                img:hover {
                    transform: scale(1.1, 1.1);
                    -webkit-transform: scale(
                        1.1,
                        1.1
                    ); /*兼容-webkit-引擎浏览器*/
                    -moz-transform: scale(1.1, 1.1); /*兼容-moz-引擎浏览器*/
                    -o-transform: scale(1.1, 1.1);
                    -ms-transform: scale(1.1, 1.1);
                }
            }
            .item-des {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    margin-left: 20px;
                    font-size: 16px;
                }
                button {
                    margin-right: 20px;
                    color: #fff !important;
                }
                .btnblack {
                    background: #2d8cf0 !important;
                }
                .btnblack:hover {
                    background: #5cadff !important;
                    color: #fff !important;
                    border-color: #5cadff !important;
                }
                .btnblue {
                    background: #51a3ff !important;
                }
                .btnblue:hover {
                    background: #6facf2 !important;
                    color: #fff !important;
                    border-color: #6facf2 !important;
                }
                .btngreen {
                    background: #2fae97 !important;
                }
                .btngreen:hover {
                    background: #46c2ab !important;
                    color: #fff !important;
                    border-color: #46c2ab !important;
                }
                .btnnavyBlue {
                    background: #4564a8 !important;
                }
                .btnnavyBlue:hover {
                    background: #6a89cc !important;
                    color: #fff !important;
                    border-color: #6a89cc !important;
                }
                .btnred {
                    background: #cc4649 !important;
                }
                .btnred:hover {
                    background: #d85558 !important;
                    color: #fff !important;
                    border-color: #d85558 !important;
                }
                .btnpurple {
                    background: #4a4c7f !important;
                }
                .btnpurple:hover {
                    background: #595b99 !important;
                    color: #fff !important;
                    border-color: #595b99 !important;
                }
                .btngreenBlack {
                    background: #358559 !important;
                }
                .btngreenBlack:hover {
                    background: #3C9664 !important;
                    color: #fff !important;
                    border-color: #3C9664 !important;
                }
            }
        }
        .item-img:hover > .item-cover {
            height: 100%;
        }
    }
    ul > li:nth-child(1) {
        margin-bottom: 20px;
    }
    ul > li:nth-child(2) {
        margin: 0 20px 20px;
    }
    ul > li:nth-child(3) {
        margin-bottom: 20px;
    }
    ul > li:nth-child(5) {
        margin: 0 20px;
    }
}
</style>