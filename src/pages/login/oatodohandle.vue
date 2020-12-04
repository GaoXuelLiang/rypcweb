<template>
    <div class="login-con">
        登录中, 请稍等......
    </div>
</template>

<script>
import { getDataLevelNone } from '../../axios/axios'
import { setCookie, isSuccess, getUrlKey } from '../../lib/util'

export default {
    data () {
        return {
            ssoUser: '',
        }
    },
    mounted () {
        this.$Loading.start()
        this.ssologin(getUrlKey('param'), getUrlKey('token'))
    },
    methods: {
        ssologin (param, token) {
            const t = this
            getDataLevelNone({
                _mt: 'hrssc' + 'UserInfo.todoSsologin',
                APtoken: token,
                APparam: param,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    setCookie('wtk', res.data.content[0].webToken)
                    localStorage.setItem('_tk', res.data.content[0].token)
                    setCookie('useId', res.data.content[0].uid)
                    setCookie('useName', res.data.content[0].userName)
                    t.$store.commit('setName', res.data.content[0].username)
                    t.$store.commit('setUserId', res.data.content[0].uid)
                    t.$store.commit('setuserThemes', (res.data.content[0].userThemes ? res.data.content[0].userThemes : "black"))
                    if (res.data.content[0].hasOwnProperty('userFinalCompny')) {
                        t.$store.commit('setCompanyId', res.data.content[0].userFinalCompny)
                    } else {
                        t.$store.commit('setCompanyId', '1000')
                    }
                    if (res.data.content[0].hasOwnProperty("userFinalroletype")) {
                        t.$store.commit('setRoleType', res.data.content[0].userFinalroletype)
                    }
                    if (localStorage.getItem('roleType') === null) {
                        // t.$store.commit('setRoleType', '3user')
                    } else {
                        t.$store.commit('setRoleType', localStorage.getItem('roleType'))
                    }
                    let curPubDbrecd = res.data.content[0].curPubDbrecd;
                    t.$router.push({ name: 'ansrptPage', params: { 'aprvStepid': curPubDbrecd.aprvStepid, 'dbcdType': curPubDbrecd.dbcdType, 'dataId': curPubDbrecd.dataId, 'dbcdTitle': curPubDbrecd.dbcdTitle, 'flowId': curPubDbrecd.flowId, 'funId': curPubDbrecd.funId, "recUserId": curPubDbrecd.recUserId, "recdId": curPubDbrecd.recdId, "stepId": curPubDbrecd.stepId, "clStatus": curPubDbrecd.clStatus, "homePageFiltering": curPubDbrecd.homePageFiltering } })
                }
            }).catch(() => {
                this.$Modal.warning({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.login-con {
    position: absolute;
    right: 34%;
    top: 44%;
    transform: translateY(-60%);
    width: 300px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
    .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
    }
}
</style>
