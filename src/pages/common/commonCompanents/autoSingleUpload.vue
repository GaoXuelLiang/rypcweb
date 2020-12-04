<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <Row>
                    <Input v-show="false" v-model="thisId"/>
                    <!-- <i-col span="6">
                        <input type="file"
                               name="file"
                               @change="fileModelChange"
                               id="fileinputModel"
                               class="fileinput"
                               :disabled="thisDis"
                               accept=".xls,.xlsx,.doc,.pdf,.docx," />
                        <label class="uploadBtn"
                               for="fileinputModel">
                            <Icon type="md-cloud-upload"
                                  size="24" />
                            <span>{{$t('lang_role.imp.up3')}}</span>
                        </label>
                    </i-col>
                    <i-col span="18">
                        <span v-if="thisValue && show"
                              class="file">
                            <div class="upFile">
                                <img class="fileImg"
                                     src="../../../../static/fileImg/fileImg.png"
                                     alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{ filename}}</span>
                            </div>
                            <a href="javascript:;"
                               @click="downloadDocs(fileKey, filename)">下载</a>
                        </span>
                    </i-col> -->

                    <i-col span="6">
                        <Upload :before-upload="handleUpload"
                                action=" "
                                :disabled="thisDis">
                            <span class="uploadBtn" :style="{background:thisDis?'#f3f3f3':'',cursor:thisDis?'not-allowed':'pointer'}">
                                <Icon type="md-cloud-upload"
                                      size="24" />
                                <span>{{$t('lang_role.imp.up3')}}</span>
                            </span>
                        </Upload>
                    </i-col>
                    <i-col span="12">
                        <span v-if="filename && show"
                              class="file" :style="{background:thisDis?'#f3f3f3':''}">
                            <i-col span="20">
                                <div class="upFile">
                                    <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                    <span class="fileName">{{$t('lang_role.imp.up2')}} {{ filename}}</span>
                                </div>
                            </i-col>
                            <i-col span="10">
                                <Button type="text"
                                        @click="uploadLocalFile"
                                        v-if="loadingStatus">
                                    {{$t('lang_platdoc.platDoc.plat_upload')}}
                                </Button>
                                <Button type="text"
                                        @click="removeFile"
                                        v-if="loadingStatus">
                                    删除
                                </Button>
                                <Button type="text"
                                        @click="downloadFile"
                                        v-if="!loadingStatus">
                                    {{$t('lang_platdoc.platDoc.plat_download')}}
                                </Button>
                            </i-col>
                        </span>
                    </i-col>
                </Row>
            </FormItem>
        </i-col>
        <!-- <i-col span="21"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col> -->
        <i-col span="21"
               offset="1"
               v-if="message">
                <FormItem style="margin: 0">
                    <Row type="flex">
                        <i-col span="24">
                            <div class="message">{{message}}</div>
                        </i-col>
                    </Row>
                </FormItem>
        </i-col>
    </div>
</template>
<script>
import {getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '@/axios/axios'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            file: '',
            filename: this.fileName,
            filekey: this.fileKey,
            loadingStatus: false,
            loading: [],
            thisValue: this.value,
            thisId: this.id,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
        }
    },
    props: {
        fileKey: String,
        fileName: String,
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
        handleUpload (file) {
            console.log(fileType, "fileType")
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file = file
                this.filename = file.name
                this.loadingStatus = true
                return false
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
            
        },
        uploadLocalFile () {
            const t = this
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.thisId = `${key}:${res.data[key]}`
                    t.filekey = res.data[key]
                    t.thisValue = res.data[key]
                }
                t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '上传成功',
                    onOk: () => {
                        t.loadingStatus = false
                    },
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        removeFile () {
            const t = this
            t.thisId = ''
            t.filekey = ''
            t.filename = ''
            t.thisValue = ''
        },
        downloadFile () {
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
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filename)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filename)
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
        formValidate () {
            this.$emit('on-change', this.thisId)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
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
.fileinput {
    display: none;
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
