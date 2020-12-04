<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{$t('lang_fileOperation.import.impResult')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row type="flex"
                 justify="space-between"
                 v-if="stateShow">
                <i-col span="12"
                       style="line-height: 32px"
                       v-if="filekey !== ''">
                    <Button icon="link"
                            @click="dowFile">{{$t('lang_fileOperation.import.downloadFail')}}</Button>
                </i-col>
                <i-col span="12"
                       style="line-height: 32px;"
                       v-if="filekey !== ''">
                </i-col>
                <i-col span="12"
                       style="line-height: 32px;"
                       v-if="filekey === ''">
                    导入成功
                </i-col>
                <i-col span="24"
                       style="line-height: 32px;min-height: 40px;max-height: 160px;overflow-y: auto; padding-bottom: 10px"
                       v-if="file">
                    {{ improwsnomatch }} <span v-if="improwsnomatch !== ''">{{$t('lang_fileOperation.import.fieldsNoImport')}}</span>
                </i-col>
            </Row>
            <Row v-if="!stateShow">
                <i-col span="12"
                       style="line-height: 32px;">
                    {{impStatusDesc}}
                </i-col>
            </Row>
        </div>
    </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
//  import pubsources from '../../lib/pub_source'


import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: { groupId: 1 },
            loadingStatus: false,
            logType: '',
            file: false,
            filekey: '',
            priToken: '',
            improwsnomatch: '',
            impStatusDesc: '',
            stateShow: true,
        }
    },
    props: {
    },
    updated () {

    },
    methods: {
        handleReset () {
            this.$emit('closeImportFail')
            this.improwsnomatch = ''
            this.priToken = ''
            this.filekey = ''
        },
        dowFile () {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
                window.location.href = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
            } else {
                let doclink = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
                let link = document.createElement('a')
                link.href = doclink
                link.download = 'downloadfiletemp'
                link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
        },
        setFailMessage (improwsnomatch) {
            this.file = true
            this.stateShow = true
            this.improwsnomatch = improwsnomatch
        },
        setFailstatusDesc (impStatusDesc) {
            this.stateShow = false
            this.impStatusDesc = impStatusDesc
        },
        importFailDowFile (filekey) {
            const t = this
            t.stateShow = true
            t.filekey = filekey
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APfilekey: filekey,
                APexpiresecs: 18000,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.priToken = res.data.content[0].value
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
.cover {
    .box {
        width: 500px;
        padding-bottom:20px;
    }
}
</style>
