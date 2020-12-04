<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"  fix v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>{{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="content form_box">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      label-position="right"
                      :label-width="135">
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcOrder')"
                                  prop="flsdcOrder"
                                  class="marNT">
                            <Input v-model="formValidate.flsdcOrder"
                                   :placeholder="$t('lang_flow.docTemplate.p_flsdcOrder')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcType')"
                                  prop="flsdcType"
                                  class="marNT">
                            <Select v-model="formValidate.flsdcType"
                                    :placeholder="$t('lang_flow.docTemplate.p_flsdcType')">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in tempType"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>

                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcTempname')"
                                  prop="flsdcTempname">
                            <Input v-model="formValidate.flsdcTempname"
                                   :placeholder="$t('lang_flow.docTemplate.p_flsdcTempname')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcOtherdcidDis')"
                                  prop="flsdcOtherdcid">
                            <span @dblclick="clear">
                                <Input v-model="flsdcOtherdcidDis"
                                       :placeholder="$t('lang_flow.docTemplate.p_flsdcOtherdcidDis')"
                                       @on-click="pickData" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="21"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcDoctemp')"
                                  prop="flsdcDoctemp" class="formItem">
                            <Row>
                                <i-col span="6">
                                    <Upload :before-upload="handleUpload"
                                            action=" ">
                                        <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_flow.docTemplate.plat_scan')}}</Button> -->
                                        <span class="uploadBtn"> 
                                            <Icon type="md-cloud-upload" size="24"/>
                                            <span>点击选择文件</span> 
                                        </span>
                                    </Upload>
                                </i-col>
                                <i-col span="17">
                                    <!--<span v-if="file !== '' ">Upload file: {{ file.name }} <Button type="text" @click="uploadFile1" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>-->
                                    <span v-if="file !== '' " class="file">
                                        <i-col span="20">
                                            <!-- <Input v-model="file.name"
                                                   readonly="readonly">
                                            <span slot="prepend">
                                                <Icon type="folder"
                                                      size="16"></Icon>
                                            </span>
                                            </Input> -->
                                            <div class="upFile">
                                                <img class="fileImg" src="../../../../static/fileImg/fileImg.png" alt="">
                                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file.name}}</span>
                                            </div>
                                        </i-col>
                                        <i-col span="4">
                                            <Button type="text"
                                                    @click="uploadLocalFile"
                                                    v-if="loadingStatus">
                                                {{$t('lang_flow.docTemplate.plat_upload')}}
                                            </Button>
                                            <Button type="text"
                                                    @click="downloadFile"
                                                    v-if="!loadingStatus">
                                                {{$t('lang_flow.docTemplate.plat_download')}}
                                            </Button>
                                        </i-col>
                                    </span>
                                </i-col>
                            </Row>
                        </FormItem>
                    </i-col>
                    <i-col span="21"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcGenconditionDis')"
                                  prop="flsdcGenconditionDis">
                            <span @dblclick="clearCondition">
                                <Input v-model="formValidate.flsdcGenconditionDis"
                                       readonly="readonly"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_flow.docTemplate.p_flsdcGenconditionDis')"
                                       class="settlement"></Input>
                            </span>
                            <Button type="primary"
                                    @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcIsvalid')"
                                  prop="flsdcIsvalid">
                            <RadioGroup v-model="formValidate.flsdcIsvalid" type="button" size="small">
                                <Radio :label="item.paramCode"
                                       v-for="(item,index) in yesOrNo"
                                       :key="index">{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="21"
                           offset="1"
                           v-show="formValidate.flsdcIsvalid === '0'?true:false">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcInvreason')"
                                  prop="flsdcInvreason">
                            <Input v-model="formValidate.flsdcInvreason"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_flow.docTemplate.p_flsdcInvreason')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcIspdf')"
                                  prop="flsdcIspdf">
                            <RadioGroup v-model="formValidate.flsdcIspdf" type="button" size="small">
                                <Radio :label="item.paramCode"
                                       v-for="(item,index) in yesOrNo"
                                       :key="index">{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col>
                    <i-col span="21"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.comment')">
                            <Input v-model="formValidate.comment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_flow.docTemplate.p_comment')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcCuslkstr')"
                                  prop="flsdcCuslkstr">
                            <Input v-model="formValidate.flsdcCuslkstr"
                                   :placeholder="$t('lang_flow.docTemplate.p_flsdcCuslkstr')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.docTemplate.flsdcPoplkstr')"
                                  prop="flsdcPoplkstr">
                            <Input v-model="formValidate.flsdcPoplkstr"
                                   :placeholder="$t('lang_flow.docTemplate.p_flsdcPoplkstr')"></Input>
                        </FormItem>
                    </i-col>
                     <i-col span="10"
                           offset="1">
                        <FormItem label="电子签文档标识"
                                  prop="">
                            <Input v-model="formValidate.flsdcEsignmark"
                                   placeholder="请输入电子签文档标识"></Input>
                        </FormItem>
                    </i-col>
                     <i-col span="10"
                           offset="1">
                        <FormItem label="电子签文档名称"
                                  prop="">
                            <Input v-model="formValidate.flsdcEsigndocname"
                                   placeholder="请输入电子签文档名称"></Input>
                        </FormItem>
                    </i-col>
                </Form>
                <i-col span="21"
                       offset="1">
                    <row type="flex"
                         justify="end"
                         class="btnStyle">
                        <Button @click="close">{{$t('button.cal')}}</Button>
                        <Button class="btn"
                                type="primary"
                                style="margin-left: 8px"
                                @click="save">{{$t('button.sav')}}</Button>
                    </row>
                </i-col>
            </Row>

        </div>
        <transition name="fade">
            <searchTable v-show="openPick"
                         :searchTitle="searchTitle1"
                         :searchText="searchText1"
                         :searchCloumns="searchCloumns"
                         :params="params"
                         @closeUp="closeTable"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
        <transition name="fade">
            <genrCondition v-show="openCondition"
                           @inputCondition="inputCondition"
                           @closeCondition="closeCondition"
                           ref="genrCondition"></genrCondition>
        </transition>
    </div>
</template>
<script>
// import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import {getDataLevelUserLoginData,uploadFile} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchTable'
import genrCondition from './genrCondition'

export default {
    data () {
        return {
            spinShow: false,
            file: '',
            filekey: '',
            transmitName: '',
            transmitValue: '',
            loadingStatus: false,
            yesOrNo: [],
            tempType: [],
            flsdcTypeDis: '',
            flsdcIsvalidDis: '',
            flsdcOtherdcidDis: '',
            flsdcDoctempDis: '',
            flsdcIspdfDis: '',
            openPick: false,
            openCondition: false,
            //      logType: '',
            //     id: '',
            formValidate: {
                _mt:  this.$global.mt+'PlatFlsDoc.addOrUpd',
                flsdcStep: '',
                flsdcOrder: '',
                flsdcType: '',
                flsdcDoctemp: '',
                flsdcGencondition: '',
                flsdcGenconditionDis: '',
                flsdcIsvalid: '1',
                flsdcInvreason: '',
                flsdcOtherdcid: '',
                flsdcTempname: '',
                flsdcIspdf: '0',
                comment: '',
                APfunId: '1',
                APlogType: '',
            },
            ruleValidate: {
                flsdcOrder: [
                    { required: true, message: this.$t('lang_flow.docTemplate.rule_flsdcOrder'), trigger: 'blur' },
                ],
                flsdcType: [
                    { required: true, message: this.$t('lang_flow.docTemplate.rule_flsdcType'), trigger: 'blur' },
                ],
                flsdcTempname: [
                    { required: true, message: this.$t('lang_flow.docTemplate.rule_flsdcTempname'), trigger: 'blur' },
                ],
                flsdcDoctemp: [
                    { required: true, message: this.$t('lang_flow.docTemplate.rule_flsdcDoctemp'), trigger: 'blur' },
                ],
                flsdcInvreason: [
                    { required: true, message: this.$t('lang_flow.docTemplate.rule_flsdcInvreason'), trigger: 'blur' },
                ],
            },
            searchTitle1: this.$t('lang_flow.searchCloumns.searchTitle1'),
            searchText1: this.$t('lang_flow.searchCloumns.searchText1'),
            searchCloumns: [
                {
                    title: this.$t('lang_flow.searchCloumns.flvarName'),
                    key: 'flsdcTempname',
                    width: 253,
                },
                {
                    title: this.$t('lang_flow.searchCloumns.flvarMark'),
                    key: 'flsdcStepDis',
                    width: 253,
                },
            ],
            params: {
                _mt:  this.$global.mt+'PlatFlsDoc.getByPreStep',
                APsort: 'id',
                APorder: 'desc',
                AProws: 10,
                APpage: 1,
                APfunId: '1',
                targetType: 'flowOther',
                flsdcStep: this.$store.state.flowStepData.mainId,
            },
        }
    },
    props: {
        logType: '',
        id: '',
    },
    components: {
        searchTable,
        genrCondition,
    },
    mounted () {
        this.getSelect()
        this.getFormData(this.id)
    },
    methods: {
        close () {
            this.clear()
            this.$emit('hideMsg')
        },
        getFormData (id) {
            const t = this;
            if (!id) {
                return
            }
            t.spinShow = true;
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'PlatFlsDoc.getById',
                APid: id,
                APlogType: this.$t('button.ser'),
                APfunId: '1',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.flsdcOrder = res.data.content[0].flsdcOrder
                    t.formValidate.flsdcType = res.data.content[0].flsdcType
                    t.formValidate.flsdcIspdf = res.data.content[0].flsdcIspdf
                    t.formValidate.flsdcDoctemp = res.data.content[0].flsdcDoctemp
                    t.formValidate.flsdcGencondition = res.data.content[0].flsdcGencondition
                    t.formValidate.flsdcGenconditionDis = res.data.content[0].flsdcGenconditionDis
                    t.formValidate.flsdcIsvalid = res.data.content[0].flsdcIsvalid
                    t.formValidate.flsdcInvreason = res.data.content[0].flsdcInvreason
                    t.formValidate.flsdcOtherdcid = res.data.content[0].flsdcOtherdcid
                    t.formValidate.flsdcTempname = res.data.content[0].flsdcTempname
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.flsdcCuslkstr = res.data.content[0].flsdcCuslkstr
                    t.formValidate.flsdcPoplkstr = res.data.content[0].flsdcPoplkstr
                    t.formValidate.flsdcEsignmark = res.data.content[0].flsdcEsignmark
                    t.formValidate.flsdcEsigndocname = res.data.content[0].flsdcEsigndocname
                    t.flsdcTypeDis = res.data.content[0].flsdcTypeDis
                    t.flsdcIsvalidDis = res.data.content[0].flsdcIsvalidDis
                    t.flsdcOtherdcidDis = res.data.content[0].flsdcOtherdcidDis
                    t.flsdcIspdfDis = res.data.content[0].flsdcIspdfDis
                    t.file = { name: res.data.content[0].flsdcDoctemp.split(':')[0] }
                    t.filekey = res.data.content[0].flsdcDoctemp.split(':')[1]
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.spinShow = false;
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,doctemptype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.tempType = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.flsdcStep = t.$store.state.flowStepData.mainId
            data.APlogType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            if (t.formValidate.flsdcIsvalid === '1') {
                delete t.ruleValidate.flsdcInvreason
            } else {
                t.ruleValidate.flsdcInvreason = [
                    { required: true, message: '请输入失效原因', trigger: 'blur' },
                ]
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (!t.id) {
                                // 更新主表数据（无需重新加载）
                                t.$store.commit('flowStepData/addNewArrayChildTable2', res.data.content[0])
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$store.commit('flowStepData/updateArrayChildTable2', res.data.content[0])
                                //            更新主表数据（无需重新加载）
                            }
                            t.clear()
                            t.close()
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        handleUpload (file) {
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                this.file = file
                this.loadingStatus = true
                return false
            } else {
                this.$Message.error({
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
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.file = { name: key }
                    t.filekey = res.data[key]
                    t.formValidate.flsdcDoctemp = key + ':' + res.data[key]
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
        downloadFile () {
            const t = this
            let data = {
                _mt:  this.$global.mt+'UserInfo.getfiletoken',
                APisprivate: true,
                // logType: '导出',
                APfilekey: t.filekey,
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    localStorage.pageOpenedListAll = localStorage.pageOpenedList
                    let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
                    //            window.location.href = doclink
                    let link = document.createElement('a')
                    link.href = doclink
                    link.download = "downloadfiletemp"
                    link.click()
                    this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pickData () {
            const t = this
            t.openPick = true
            t.$refs.searchTable.getData(t.params)
        },
        closeTable () {
            const t = this
            t.openPick = false
        },
        changeinput (name, id) {
            const t = this
            t.flsdcOtherdcidDis = name
            t.formValidate.flsdcOtherdcid = id
        },
        inputCondition (name, value) {
            const t = this
            t.formValidate.flsdcGenconditionDis = name
            t.formValidate.flsdcGencondition = value
        },
        clear () {
            const t = this
            //        t.logType = ''
            t.formValidate.flsdcOrder = ''
            t.formValidate.flsdcType = ''
            t.formValidate.flsdcDoctemp = ''
            t.formValidate.flsdcIspdf = ''
            t.formValidate.flsdcGencondition = ''
            t.formValidate.flsdcGenconditionDis = ''
            t.formValidate.flsdcIsvalid = ''
            t.formValidate.flsdcInvreason = ''
            t.formValidate.flsdcOtherdcid = ''
            t.formValidate.flsdcTempname = ''
            t.formValidate.comment = ''
            t.flsdcTypeDis = ''
            t.flsdcIsvalidDis = ''
            t.flsdcIspdfDis = ''
            t.file = ''
            t.$refs.formValidate.resetFields()
        },
        generConditionNow (id) {
            const t = this
            if (t.formValidate.flsdcGenconditionDis && t.formValidate.flsdcGencondition) {
                t.transmitName = t.formValidate.flsdcGenconditionDis
                t.transmitValue = t.formValidate.flsdcGencondition
                t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
            }
            t.openCondition = true
        },
        closeCondition () {
            const t = this
            t.openCondition = false
        },
        clearCondition () {
            const t = this
            t.transmitName = ''
            t.transmitValue = ''
            t.formValidate.flsdcGenconditionDis = ''
            t.formValidate.flsdcGencondition = ''
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
@import "../../../sass/upload.scss";
</style>
