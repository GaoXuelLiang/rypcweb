<template>
    <i-col class="col"
           span="24">
        <Card :bordered="false">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span style="margin-left: 5px;">{{$t('lang_homePage.Staff.title')}}</span>
            </p>
            <!-- <a href="#" slot="extra" >
        <Icon type="ios-more" size="18" />
      </a> -->
            <div class="inner">
                <div class="inner_block"
                     style="background-color: #f6fcf3;color:#c3e0b5">
                    <div class="inner_title">
                        {{$t('lang_homePage.Staff.tmonth')}}
                        <!-- 当月入职 -->
                    </div>
                    <div class="inner_content">
                        <i style="background: url('../../../static/homeImg/DYRZ.png') no-repeat;"></i>
                        <div v-show="peopleObj"><span>{{peopleObj.empNewhireCount}}</span>{{$t('lang_homePage.new.peo')}}</div>
                    </div>
                </div>
                <div class="inner_block"
                     style="background-color: #f7fcff;color:#c5e9fe">
                    <div class="inner_title">
                        {{$t('lang_homePage.Staff.member')}}
                        <!-- 当月转正 -->
                    </div>
                    <div class="inner_content">
                        <i style="background: url('../../../static/homeImg/DQRS.png') no-repeat;"></i>
                        <div v-show="peopleObj"><span>{{peopleObj.empProCount}}</span>{{$t('lang_homePage.new.peo')}}</div>
                    </div>
                </div>
                <div class="inner_block"
                     style="background-color: #fff5f5;color:#ffcbc7">
                    <div class="inner_title">
                        {{$t('lang_homePage.Staff.renew')}}
                        <!-- 当月离职 -->
                    </div>
                    <div class="inner_content">
                        <i style="background: url('../../../static/homeImg/DYXQ.png') no-repeat;"></i>
                        <div v-show="peopleObj"><span>{{peopleObj.empDisCount}}</span>{{$t('lang_homePage.new.peo')}}</div>
                    </div>
                </div>
                <div class="inner_block"
                     style="background-color: #faf5ff;color:#e3cafc">
                    <div class="inner_title">
                        {{$t('lang_homePage.Staff.mobilize')}}
                        <!-- 当月离职 -->
                    </div>
                    <div class="inner_content">
                        <i style="background: url('../../../static/homeImg/DYDD.png') no-repeat;"></i>
                        <div v-show="peopleObj"><span>{{peopleObj.empDisCount}}</span>{{$t('lang_homePage.new.peo')}}</div>
                    </div>
                </div>
                <div class="inner_block"
                     style="background-color: #fffcf5;color:#f5e5be">
                    <div class="inner_title">
                        {{$t('lang_homePage.Staff.departure')}}
                        <!-- 当月离职 -->
                    </div>
                    <div class="inner_content">
                        <i style="background: url('../../../static/homeImg/DQLZ.png') no-repeat;"></i>
                        <div v-show="peopleObj"><span>{{peopleObj.empDisCount}}</span>{{$t('lang_homePage.new.peo')}}</div>
                    </div>
                </div>
            </div>
        </Card>
    </i-col>
</template>
<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, getCookie, } from '../../lib/util'
export default {
    data () {
        return {
            len: '',
            wid: '',
            womenLen: '',
            girlWid: '',
            allPeople: '',
            peopleObj: {},

        }
    },
    mounted () {
        // this.getDataSex()
        this.getDataPeo()
    },
    methods: {
        getDataSex () {
            const t = this
            //   const data = {
            //     _mt:  this.$global.mt+'AnsrptStatistics.getGenderStatisticForPc',
            //     logType: '查询性别分析',
            //   }
            //   getDataLevelUserLogin(data).then((res) => {
            //     if (isSuccess(res, t)) {
            //       if (res.data.content[0].hasOwnProperty('value') && res.data.content[0].value != 'null') {
            //         let Value = res.data.content[0].value.split(',')
            //         t.allPeople = Value[0]
            //         t.len =  Value[1]
            //         t.womenLen = Value[2]
            //         t.wid ='width'+ ':' + t.len
            //         t.girlWid ='width'+ ':' + (100 - t.len.replace(/%/, "") - 3) + '%'
            //       }
            //     }
            //   }).catch(() => {
            //     t.$Modal.error({
            //       title: this.$t('reminder.err'),
            //       content: this.$t('reminder.errormessage'),
            //     })
            //   })
        },
        getDataPeo () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'AnsrptEmpChg.rtnEveryStateAuth',
                APlogType: '查询当月人数变动',
            }
            getDataLevelUserLoginData(data).then((res) => {
                // if (isSuccess(res, t)) {
                if (JSON.stringify(res.data.content[0]) !== '{}') {
                    t.peopleObj = res.data.content[0]
                }
                // }
            }).catch(() => {
                // t.$Modal.error({
                //   title: this.$t('reminder.err'),
                //   content: this.$t('reminder.errormessage'),
                // })
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.inner {
    height: 155px;
    display: flex;
    .inner_num {
        width: 100%;
        height: 0.6rem;
        border-radius: 5rem;
        background-color: #f9c6ef;
        border: 1px solid #f9c6ef;
        margin-top: 5px;
        div {
            background-color: #3ba8fc;
            height: 0.5rem;
            border-top-left-radius: 5rem;
            border-bottom-left-radius: 5rem;
        }
    }
    .inner_txt {
        width: 100%;
        margin-top: 8px;
        font-weight: bold;
        span {
            display: inline-block;
            text-align: center;
        }
    }
    .inner_block {
        height: 120px;
        padding: 0 10px;
        width: 100%;
        margin-top: 10px;
        .inner_title {
            height: 40px;
            font-weight: bold;
            line-height: 40px;
            margin-bottom: 20px;
        }
        .inner_content {
            display: flex;
            justify-content: space-between;
            i {
                display: inline-block;
                width: 50px;
                height: 50px;
                background-size: 100%;
                background-position: center;
            }
            span {
                font-size: 36px;
                font-weight: bold;
            }
        }
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>
