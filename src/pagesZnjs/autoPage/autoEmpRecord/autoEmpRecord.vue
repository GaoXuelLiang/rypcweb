<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         @specialButton="btnEvents"
                         :isSpecial="isSpecial"></commonMainTable>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import validModel from '@/components/validModel/validModel'
//请求方法
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    data () {
        return {
            openValid: false,
            isSpecial: true,
            dom: '',
            filekey: ''
        }
    },
    components: {
        commonMainTable,
        validModel
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents (code, t, params) {
            const _t = this;
            if (code === "button_y_download") {
                // 下载
                let data = {
                    _mt: t.$global.mt + 'EmpRecord.getById',
                    APid: params.row.id,
                    APffk: 'gec' + t.funId,
                    APfunId: t.funId
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        if (JSON.stringify(res.data.content[0]) !== '{}') {
                            let resData = res.data.content[0];
                            _t.filekey = resData.emprecYj ? resData.emprecYj : '';
                            if (_t.filekey !== '') {
                                if (params.row.emprecType !== '03head') {
                                    _t.download()
                                } else {
                                    if (_t.isIE()) {
                                        window.location.href = pubsource.pub_pubf_downlink + _t.filekey.split(',')[1]
                                    } else {
                                        let doclink = pubsource.pub_pubf_downlink + _t.filekey.split(',')[1]
                                        let link = document.createElement('a')
                                        link.target = "_blank"
                                        link.href = doclink
                                        link.download = 'downloadfiletemp'
                                        link.click()
                                    }
                                }
                            }
                        }
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        //文件下载
        download () {
            const t = this
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APlogType: '导出',
                APfilekey: t.filekey.split(':')[1],
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey.split(':')[0])
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey.split(':')[0])
                        let link = document.createElement('a')
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.click()
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })

        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>
