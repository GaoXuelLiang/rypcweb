<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.imp.fileFuncodeDis')"
                              prop="fileFuncode">
                        <span @dblclick="clearfuncode">
                            <Input v-model="fileFuncodeDis"
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_role.imp.pfileFuncodeDis')"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem :label="$t('lang_role.imp.up1')" class="formItem">
                        <Row>
                            <i-col span="6">
                                <input type="file"
                                    name="file"
                                    @change="fileModelChange"
                                    id="fileinputModel"
                                    class="fileinput"
                                    accept=".xls,.xlsx" />
                                <label class="uploadBtn"
                                    for="fileinputModel">
                                        <Icon type="md-cloud-upload" size="24"/>
                                        <span>点击选择文件</span> 
                                        <!-- {{$t('lang_role.imp.up3')}} -->
                                        </label>
                            </i-col>
                            <i-col span="18">
                                <span v-if="formValidate.fileKey!==''" class="file">
                                    <div class="upFile"> 
                                        <img class="fileImg" src="../../../../static/fileImg/fileImg.png" alt="">
                                        <span class="fileName">{{$t('lang_role.imp.up2')}} {{ formValidate.fileName}}</span>
                                    </div>
                                    <a href="javascript:;"
                                    @click="downloadDocs(formValidate.fileKey, formValidate.fileName)">下载</a>
                                </span>
                            </i-col>
                        </Row>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem :label="$t('lang_role.imp.comment')"
                              prop="desc">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_role.imp.pcomment')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    >{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    style="margin-left: 8px"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <transition name="fade">
            <searchPubFun v-show="openPick"
                          @closeUp="close"
                          @changeinput="changeinput"
                          ref="searchPubFun"></searchPubFun>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchPubFun from '../../../components/searchTable/searchPubFun'

export default {
    data () {
        return {
            spinShow: false,
            formValidate: {
                _mt:  this.$global.mt+'PlatFileexcel.addOrUpd',
                fileFuncode: '',
                comment: '',
                fileKey: '',
                fileName: '',
            },
            openPick: false,
            fileFuncodeDis: '',
            params: {
                _mt:  this.$global.mt+'SysFunctions.getSysFunctionsByPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
            },
            ruleValidate: {
                fileFuncode: [
                    { required: true, message: this.$t('lang_role.imp.pfileFuncodeDis'), trigger: 'change' },
                ],
            },
        }
    },
    components: {
        searchPubFun,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (id) {
            const t = this;
            t.spinShow = true;
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatFileexcel.getById',
                id: id,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.fileFuncode = res.data.content[0].fileFuncode
                    t.fileFuncodeDis = res.data.content[0].fileFuncodeDis
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.fileKey = res.data.content[0].fileName.split(':')[1]
                    t.formValidate.fileName = res.data.content[0].fileName.split(':')[0]
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false;
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            let fileName = data.fileName + ':' + data.fileKey
            delete data.fileKey
            data.fileName = fileName
            console.log(data)
            this.$refs.formValidate.validate((valid) => {
                console.log(valid)
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            let obj = {
                                fileFuncode: res.data.content[0].fileFuncode,
                                fileFuncodeDis: res.data.content[0].fileFuncodeDis,
                                id: res.data.content[0].id,
                                fileName: res.data.content[0].fileName.split(":")[0]
                            }
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()

                                t.$emit('getData', obj)
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', obj)
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        close () {
            const t = this
            t.openPick = false
            t.$refs.searchPubFun.pmtypeCode = ''
        },
        changeinput (name, id, funcode) {
            const t = this
            t.fileFuncodeDis = name
            t.formValidate.fileFuncode = funcode
        },
        pickData () {
            const t = this
            t.$refs.searchPubFun.getData()
            t.openPick = true
        },
        fileModelChange () {
            const t = this
            console.info(document.getElementById('fileinputModel'))
            console.info(document.getElementById('fileinputModel').files[0].name)
            let filename = document.getElementById('fileinputModel').files[0].name
            let fileType = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase()
            if (fileType !== 'xls' && fileType !== 'xlsx') {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_role.imp.contentw'),
                })
                return
            }
            const formData = new FormData()
            formData.append('upfile', document.getElementById('fileinputModel').files[0])
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.formValidate.fileKey = res.data[key]
                    t.formValidate.fileName = key
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_role.imp.contentw'),
                })
            })
        },
        handleReset () {
            this.$emit('closeUp')
        },
        downloadDocs (url, filename) {
            const t = this
            let data = {
                _mt:  this.$global.mt+'UserInfo.getfiletoken',
                isprivate: true,
                logType: '下载',
                filekey: url,
                expiresecs: 180,
            }
            getDataLevelUserLogin(data).then((res) => {
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
                    content: this.$t('lang_role.imp.downlo'),
                })
            })
        },
        clearfuncode () {
            const t = this
            t.fileFuncodeDis = ''
            t.formValidate.fileFuncode = ''
        },
    },
    watch: {},
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
@import "../../../sass/upload.scss";

.fileinput {
    display: none;
}

.cover .box {
    width: 900px;
}
</style>
