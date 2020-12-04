<template>
    <card :bordered="false"
          class="card_box">
        <p slot="title"
           class="title">
            <span class="title-tip"></span>
            <span>{{$t('lang_homePage.workno.title')}}</span>
        </p>
        <div class="block">
            <div class="data_block"
                 style="background-color: #f7fcff;">
                <div class="data_title">
                    {{$t('lang_homePage.workno.empIdnum')}}
                </div>
                <div class="data_content">
                    <div class="img_box"></div>
                    <div>{{empIdnum}}</div>
                </div>
            </div>
            <!--        <div class="data_block" style="background-color: #f6fcf3;">-->
            <!--          <div class="data_title">-->
            <!--            {{$t('lang_homePage.workno.postIdnum')}}-->
            <!--          </div>-->
            <!--          <div class="data_content">-->
            <!--            <div style="background-image: url('../../../static/homeImg/00.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>-->
            <!--            <div>{{postIdnum}}</div>-->
            <!--          </div>-->
            <!--        </div>-->
        </div>
    </card>
</template>
<script>
import { isSuccess, deepCopy } from '../../lib/util'
import { getDataLevelUserLoginData } from '../../axios/axios'

export default {
    data () {
        return {
            empIdnum: '',
            postIdnum: '',
        }
    },
    mounted () {
        this.getDate()
    },
    methods: {
        getDate () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'AnsrptStatistics.Nostatistics',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    const result = res.data.content[0].value
                    t.empIdnum = result.split(',')[0]
                    t.postIdnum = result.split(',')[1]
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/homeComponent.scss";
.short {
    height: 220px;
}
.data_block {
    height: 100%;
    padding: 0 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .data_title {
        height: 40px;
        font-weight: bold;
        line-height: 40px;
    }
    .data_content {
        display: flex;
        font-size: 36px;
        justify-content: space-between;
        .img_box {
            background-image: url("../../../static/homeImg/DQRS.png");
            width: 60px;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center;
        }
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
.title-tip {
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(0, 162, 255, 1);
}
</style>
