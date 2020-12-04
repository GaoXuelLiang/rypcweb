<template>
    <card :bordered="false"
          class="card_box">
        <p slot="title"
           class="title"><span class="title-tip"></span><span>用户统计</span></p>
        <a href="#"
           slot="extra">
            <Icon type="ios-more"
                  size="18" />
        </a>
        <div class="data">
            <div class="data_block"
                 style="background-color: #fff8f9;">
                <div class="data_title">
                    用户总数
                </div>
                <div class="data_content">
                    <div style="background-image: url('../../../static/homeImg/15.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
                    <div> {{userInfo.userCount}}</div>
                </div>
            </div>
            <div class="data_block"
                 style="background-color: #f6fcf3;">
                <div class="data_title">
                    当前生效
                </div>
                <div class="data_content">
                    <div style="background-image: url('../../../static/homeImg/13.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
                    <div> {{userInfo.nowValidCount}}</div>
                </div>
            </div>
            <div class="data_block"
                 style="background-color: #fffcf5;">
                <div class="data_title">
                    待生效
                </div>
                <div class="data_content">
                    <div style="background-image: url('../../../static/homeImg/12.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
                    <div> {{userInfo.toDayInvalidCount}}</div>
                </div>
            </div>
            <div class="data_block"
                 style="background-color: #f7fcff;">
                <div class="data_title">
                    今日新增
                </div>
                <div class="data_content">
                    <div style="background-image: url('../../../static/homeImg/11.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
                    <div> {{userInfo.insertConunt}}</div>
                </div>
            </div>
            <div class="data_block"
                 style="background-color: #f6f6f6;">
                <div class="data_title">
                    当前失效
                </div>
                <div class="data_content">
                    <div style="background-image: url('../../../static/homeImg/14.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
                    <div> {{userInfo.nowInValidCount}}</div>
                </div>
            </div>
        </div>
    </card>
</template>
<script>
import { isSuccess, deepCopy } from '../../lib/util'
import { getDataLevelUserLoginData } from '../../axios/axios'
import Bus from '../../lib/bus'
export default {
    data () {
        return {
            userInfo: '',
        }
    },
    mounted () {
        this.getIndexFun()
    },
    methods: {
        getIndexFun () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'UserInfo.getIndexUserCount',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    this.userInfo = res.data.content[0]
                    Bus.$emit('setCommonFlag', true)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        changeinput (name, id) {
            const t = this
            t.rolegrpCode = name
            t.rolegrpCname = id
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/homeComponent.scss";
.col {
    padding-right: 0;
}
.data {
    width: 100%;
    display: flex;
    .data_block {
        padding: 0 10px;
        width: 19%;
        margin-right: 1%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .data_title {
            font-weight: bold;
        }
        .data_content {
            display: flex;
            font-size: 36px;
            line-height: 60px;
            justify-content: space-between;
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
