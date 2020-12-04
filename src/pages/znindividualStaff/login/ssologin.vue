<template>
    <div class="login-con">
        <!--     hxmarkpic-->
        <!--    <Card :bordered="false">-->
        <!--      <p slot="title">-->
        <!--        <Icon type="log-in"></Icon>-->
        <!--        &nbsp;{{ ssoUser }}正在单点登录...-->
        <!--      </p>-->
        <!--    </Card>-->
        正在登陆,请稍等......
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
        // let str = 'http://localhost.hrocloud.com:8080/#/ssologin?ticket=17521655640'
        this.getSSOUser(getUrlKey('ticket'))
    },
    methods: {
        getSSOUser (ticket) {
            const t = this
            getDataLevelNone({
                _mt: this.$global.mt + 'UserInfo.ssologin',
                APticket: ticket,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    setCookie('wtk', res.data.content[0].webToken)
                    setCookie('useId', res.data.content[0].uid)
                    setCookie('useName', res.data.content[0].username)
                    t.$store.commit('setName', res.data.content[0].username)
                    t.$store.commit('setUserId', res.data.content[0].uid)
                    t.$store.commit('setFunId', '0')
                    // if (res.data.content[0].hasOwnProperty('userFinalCompny')) {
                    //   t.$store.commit('setCompanyId', res.data.content[0].userFinalCompny)
                    // } else {
                    //   t.$store.commit('setCompanyId', '1000')
                    // }
                    // if (res.data.content[0].hasOwnProperty("userFinalroletype")) {
                    //   t.$store.commit('setRoleType', res.data.content[0].userFinalroletype)
                    // }
                    t.$router.push('/home')
                }
            }).catch(() => {
                t.$Modal.warning({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            })
        },
        ssologin () {
            const t = this
            getDataLevelNone({
                _mt: 'cflduserMgmt.SSOlogin',
                APloginCode: t.ssoUser,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    //            console.info(res)
                }
            }).catch(() => {
                t.$Modal.warning({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
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
