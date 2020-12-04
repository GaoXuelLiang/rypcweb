<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <Row type="flex">
                    <Input v-show="false"
                           v-model="thisId" />
                    <i-col span="3">
                        <Upload action=""
                                :disabled="thisDis">
                            <span class="uploadBtn"
                                  :style="{background:thisDis?'#f3f3f3':''}">
                                <span>浏览</span>
                            </span>
                        </Upload>
                    </i-col>
                    <Row type="flex"
                         span="24"
                         class="flex-1">
                        <span v-if="thisValue && show "
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile"
                                   :style="{background:thisDis?'#f3f3f3':''}">
                                <img class="fileImg"
                                     src="../../../../static/fileImg/fileImg.png"
                                     alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}}{{value}}</span>
                            </i-col>
                            <i-col :span="thisDis ? 2 : 4"
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile2()"
                                        v-if="!loading">
                                    下载
                                </Button>
                            </i-col>
                        </span>
                    </Row>

                </Row>
            </FormItem>
        </i-col>
        <i-col span="21"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
    </div>
</template>
<script>
import { getDataLevelUserLoginData, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '@/axios/axios'

import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            file: '',
            filekey: this.fileKey,
            loadingStatus: false,
            loading: false,
            thisValue: this.value,
            thisId: this.id,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
        }
    },
    props: {
        fileKey: String,
        value: String,
        id: String,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    methods: {
        formValidate () {
            this.$emit('on-change', this.thisId)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        uploadFile2 () {
            const t = this
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APlogType: '导出',
                APfilekey: t.filekey,
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                        let link = document.createElement('a')
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.click()
                    }
                    this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                    localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
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
        thisId (val) {
            this.formValidate()
        },
        thisValue (val) {
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
            },
            deep: true,
        },
        dis: {
            handler: function (val) {
                this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
            },
            deep: true,
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/upload.scss";
/deep/ .ivu-btn {
    color: rgba(58, 141, 224, 1);
}
.flex {
    display: flex;
}
.flex-1 {
    flex: 1;
}
.width-100 {
    width: 100%;
}
.message {
    width: 100%;
    // border: 2px solid #f2f7fd;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #f2f7fd;
}
</style>
