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
                                :disabled="thisDis"
                                :before-upload="handleUpload">
                            <!-- <Button icon="md-cloud-upload"
                                    :disabled="thisDis">浏览</Button> -->
                            <span class="uploadBtn"
                                  :style="{background:thisDis?'#f3f3f3':''}">
                                <Icon type="md-cloud-upload"
                                      size="24" />
                                <span>浏览</span>
                            </span>
                        </Upload>
                    </i-col>
                    <Row type="flex"
                         span="21"
                         class="flex-1">
                        <span v-if="thisValue && show "
                              v-for="(item,index) in thisValue"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile"
                                   :style="{background:thisDis?'#f3f3f3':''}">
                                <img class="fileImg"
                                     src="../../../../static/fileImg/fileImg.png"
                                     alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.split(":")[0]}}</span>
                            </i-col>
                            <i-col :span="thisDis ? 2 : 4"
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile1(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span v-if="!thisDis">
                                    <Button type="text"
                                            @click="removeFile(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
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
import { getDataLevelUserLoginData, getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '@/axios/axios'

import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            file: '',
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
        fileKey: Array,
        value: Array,
        id: String,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        sffFilter: String, // 过滤条件
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    methods: {
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            } else {
                let a = data.split(';')
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== '') { // 去除空格的影响, 对过滤的影响
                        // 判断过滤条件是否包含'//'为自身最高级卡自身条件
                        if (a[i].indexOf('//') !== -1) {
                            let b = a[i].split('//')
                            let obj = {}
                            for (let j = 0; j < b.length; j++) {
                                if (b[j].substring(0, 1) !== '$') {
                                    obj['key'] = b[j]
                                } else {
                                    obj['value'] = b[j].substring(1)
                                }
                            }
                            arr.push(obj)
                        } else {
                            let b = a[i].split('=')
                            let obj = {}
                            for (let j = 0; j < b.length; j++) {
                                if (b[j].substring(0, 1) !== '$') {
                                    obj['key'] = b[j]
                                } else {
                                    obj['value'] = b[j].substring(1)
                                }
                            }
                            arr.push(obj)
                        }
                    }
                }
            }
            return arr
        },
        formValidate () {
            this.$emit('on-change', this.thisId)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        handleUpload (file) {
            const t = this
            // if (file.size > 10485760) {
            //     t.$Message.error({
            //         content: '文件大小超出最大范围！',
            //         duration: 2,
            //     })
            //     return false
            // }
            console.log(fileType, "fileType")
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.thisValue.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile1(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            } 
        },
        removeFile (filename, index) {
            const t = this
            let fileName = ''
            t.filekey.splice(index, 1)
            t.thisValue.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
        },
        uploadFile1 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            uploadFile(formData).then(res => {
                // 上传一个
                //          for (const key in res.data) {
                //          	t.filekey = res.data[key]
                //          	t.thisValue = key
                //        		t.thisId = key + ':' + res.data[key]
                //          }
                // 上传多个
                let fileName = ''
                for (const key in res.data) {
                    t.filekey.push(key + ':' + res.data[key])
                    t.thisValue.push(key)
                }
                t.filekey.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
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
        uploadFile2 (fileName, index) {
            const t = this;
            if (t.sffFilter && t.sffFilter !== '') {
                let rule = t.formData(t.sffFilter)
                if (rule[0].value === 'pub') {
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_pubf_downlink + t.filekey[index].split(':')[1]
                    } else {
                        let doclink = pubsource.pub_pubf_downlink + t.filekey[index].split(':')[1]
                        let link = document.createElement('a')
                        link.target = "_blank"
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.click()
                    }
                }
            } else {
                const t = this
                let data = {
                    _mt: this.$global.mt + 'UserInfo.getfiletoken',
                    APisprivate: true,
                    APlogType: '导出',
                    APfilekey: t.filekey[index].split(':')[1],
                    APexpiresecs: 180,
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                        if (this.isIE()) {
                            window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.thisValue[index].split(':')[0])
                        } else {
                            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.thisValue[index].split(':')[0])
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
            }
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
