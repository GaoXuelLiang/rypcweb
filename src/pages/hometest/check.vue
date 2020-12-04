<template>
    <i-col class="col"
           span="24">
        <card :bordered="false">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span style="margin-left: 5px;">{{$t('lang_homePage.attendance.title')}}</span>
            </p>
            <div class="short">
                <div class="short_tit"
                     style="color:#e17ca4">
                    <div style="border: 8px solid #e17ca4;"
                         class="short_peo">
                        <span class="peo_num">{{peopleNum.signNums}}</span>
                        {{$t('lang_homePage.new.peo')}}
                    </div>
                    <div class="peo_txt">{{$t('lang_homePage.attendance.sign')}}</div>
                </div>
                <div class="short_tit"
                     style="color:#f5a55d">
                    <div style="border: 8px solid #f5a55d;"
                         class="short_peo">
                        <span class="peo_num">{{peopleNum.leaveNums}}</span>
                        {{$t('lang_homePage.new.peo')}}
                    </div>
                    <div class="peo_txt">{{$t('lang_homePage.attendance.leave')}}</div>
                </div>
                <div class="short_tit"
                     style="color:#d1a7f9">
                    <div style="border: 8px solid #d1a7f9;"
                         class="short_peo">
                        <span class="peo_num">{{peopleNum.overtimeNums}}</span>
                        {{$t('lang_homePage.new.peo')}}
                    </div>
                    <div class="peo_txt">{{$t('lang_homePage.attendance.Business')}}</div>
                </div>
                <!--        <div class="short_tit"  style="color:#a3d3fb">-->
                <!--          <div style="border: 8px solid #a3d3fb;" class="short_peo">-->
                <!--            <span  class="peo_num">{{peopleNum.travelNums}}</span>-->
                <!--            {{$t('lang_homePage.new.peo')}}-->
                <!--          </div>-->
                <!--          <div class="peo_txt">本月调动</div>-->
                <!--        </div>-->
                <!--        <div class="short_tit" style="color:#fc928b">-->
                <!--          <div style="border: 8px solid #fc928b;" class="short_peo">-->
                <!--            <span  class="peo_num">{{peopleNum.travelNums}}</span>-->
                <!--            {{$t('lang_homePage.new.peo')}}-->
                <!--          </div>-->
                <!--          <div class="peo_txt">本月离职</div>-->
                <!--        </div>-->
            </div>
        </card>
    </i-col>
</template>
<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, getCookie, } from '../../lib/util'
export default {
    data () {
        return {
            peopleNum: {}
        }
    },
    watch: {
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'AnsrptTimeManage.getObjByAuth',
                APlogType: '查询考勤',
            }
            getDataLevelUserLoginData(data).then((res) => {
                // if (isSuccess(res, t)) {
                if (JSON.stringify(res.data.content[0]) !== '{}') {
                    t.peopleNum = res.data.content[0]
                }
                // }
            }).catch(() => {
                // t.$Modal.error({
                //   title: this.$t('reminder.err'),
                //   content: this.$t('reminder.errormessage'),
                // })
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.ivu-card-head {
    padding: 0;
    border: none;
}
.col {
    margin-bottom: 10px;
    padding-right: 0;
}
.short {
    height: 150px;
    display: flex;
    padding-top: 10px;
    .short_tit {
        flex: 1;
        text-align: center;
        .short_peo {
            width: 90px;
            height: 90px;
            text-align: center;
            line-height: 80px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 50%;
            margin-bottom: 15px;
            font-size: 12px;
            .peo_num {
                font-size: 24px;
                font-weight: bold;
            }
        }
        .peo_txt {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>
