<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix v-if="spinShow"></Spin>
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
            <div class="table_form"
                 @scroll="formScroll">
                <Row>
                    <div ref="scrollBox">
                        <Form ref="formValidate"
                              :model="formValidate"
                              :rules="ruleValidate"
                              label-position="right"
                              :label-width="135">
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbOrder')"
                                          prop="flsdbOrder">
                                    <Input v-model="formValidate.flsdbOrder"
                                           :placeholder="$t('lang_flow.dataBlock.p_flsdbOrder')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbType')"
                                          prop="flsdbType">
                                    <Select v-model="formValidate.flsdbType"
                                            :placeholder="$t('lang_flow.dataBlock.p_flsdbType')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index1) in DBType"
                                                :key="index1">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbCode')"
                                          prop="flsdbCode">
                                    <span @dblclick="clearFlsdbCode">
                                        <Input v-model="formValidate.flsdbCode"
                                               :placeholder="$t('lang_flow.dataBlock.p_flsdbCode')"></Input>
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbCnName')"
                                          prop="flsdbCnName">
                                    <Input v-model="formValidate.flsdbCnName"
                                           :placeholder="$t('lang_flow.dataBlock.p_flsdbCnName')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbEnName')"
                                          prop="flsdbEnName">
                                    <Input v-model="formValidate.flsdbEnName"
                                           :placeholder="$t('lang_flow.dataBlock.p_flsdbEnName')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbDisclms')"
                                          prop="flsdbDisclms"
                                          v-if="formValidate.flsdbType ==='01form'">
                                    <Select v-model="formValidate.flsdbDisclms"
                                            :placeholder="$t('lang_flow.dataBlock.p_flsdbDisclms')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index2) in displayCol"
                                                :key="index2">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbSubformtype')"
                                          prop="flsdbSubformtype"
                                          v-if="formValidate.flsdbType ==='02subtable'">
                                    <Select v-model="formValidate.flsdbSubformtype"
                                            :placeholder="$t('lang_flow.dataBlock.p_flsdbSubformtype')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index2) in formType"
                                                :key="index2">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbSubform')"
                                          prop="flsdbSubform"
                                          v-if="formValidate.flsdbType ==='02subtable'">
                                    <span @dblclick="stClear">
                                        <Input v-model="flsdbSubformDis"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_flow.dataBlock.p_flsdbSubform')"
                                               @on-click="pickData" />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbSubisupd')"
                                          prop="flsdbSubisupd"
                                          v-if="formValidate.flsdbType ==='02subtable'">
                                    <RadioGroup v-model="formValidate.flsdbSubisupd"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in YesOrNoType"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbIschirdsum')"
                                          prop="" v-if="formValidate.flsdbType ==='02subtable'">
                                    <RadioGroup v-model="formValidate.flsdbIschirdsum"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in YesOrNoType"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbOptauth')"
                                          prop="flsdbOptauth">
                                    <Select v-model="formValidate.flsdbOptauth"
                                            :placeholder="$t('lang_flow.dataBlock.p_flsdbOptauth')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index3) in fieldAuth"
                                                :key="index3">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbFarela')"
                                          prop="flsdbFarela">
                                    <Input v-model="formValidate.flsdbFarela"
                                           :placeholder="$t('lang_flow.dataBlock.flsdbFarela')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbSubfilter')"
                                          v-if="formValidate.flsdbType ==='02subtable'">
                                    <Input v-model="formValidate.flsdbSubfilter"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_flow.dataBlock.p_flsdbSubfilter')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.flsdbDiscondition')">
                                    <span @dblclick="clearCondition">
                                        <Input v-model="formValidate.flsdbDiscondition"
                                               type="textarea"
                                               readonly="readonly"
                                               :autosize="{minRows: 2,maxRows: 5}"
                                               :placeholder="$t('lang_flow.dataBlock.p_flsdbDiscondition')"
                                               class="settlement"></Input>
                                    </span>
                                    <Button type="primary"
                                            @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_flow.dataBlock.comment')"
                                          style="margin-bottom:0 !important">
                                    <Input v-model="formValidate.comment"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_flow.dataBlock.p_comment')"></Input>
                                </FormItem>
                            </i-col>
                            <!-- <i-col span="21"
                                   offset="1">
                                <row type="flex"
                                     justify="end"
                                     class="btn">
                                    <FormItem>
                                        <Button @click="close"
                                                style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                        <Button type="primary"
                                                style="margin-left: 8px"
                                                @click="save">{{$t('button.sav')}}</Button>
                                    </FormItem>
                                </row>
                            </i-col> -->
                        </Form>
                    </div>
                </Row>
            </div>
            <Row>
                <i-col span="21"
                       offset="1">
                    <row type="flex"
                         justify="end"
                         :class="[isScorllY?'btnSize1':'btnSize']">
                        <Button @click="close">{{$t('button.cal')}}</Button>
                        <Button type="primary"
                                @click="save">{{$t('button.sav')}}</Button>
                    </row>
                </i-col>
            </Row>
        </div>
        <transition name="fade">
            <genrCondition v-show="openCondition"
                           @inputCondition="inputCondition"
                           @closeCondition="closeCondition"
                           ref="genrCondition"></genrCondition>
        </transition>
        <transition name="fade">
            <searchZHAndEn v-show="openPick0"
                           :searchText1="searchText01"
                           :searchText2="searchText02"
                           :searchTitle="searchTitle0"
                           :searchCloumns="searchCloumns0"
                           :params="params0"
                           @closeUp="closeTable"
                           @changeinput="changeinput0"
                           ref="searchZHAndEn"></searchZHAndEn>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         :searchCloumns="searchCloumns"
                         :searchTitle="searchTitle"
                         :searchText="searchText"
                         :params="params"
                         @closeUp="closeST"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
// import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { getDataLevelUserLoginData } from '@/axios/axios'
//  import sffSysoptTable from '../../../components/searchTable/sffSysoptTable'
import searchZHAndEn from '../../../components/searchTable/searchZHAndEn'
import searchTable from '../../../components/searchTable/searchTable'
import { isSuccess, deepCopy } from '../../../lib/util'
import genrCondition from './genrCondition'

export default {
    data () {
        return {
            isScorllY: null,
            spinShow: false,
            openPick0: false,
            openPick: false,
            openCondition: false,
            DBType: [],
            fieldAuth: [],
            displayCol: [],
            formType: [],
            YesOrNoType: [],
            flsdbTypeDis: '',
            flsdbOptauthDis: '',
            flsdbDisclmsDis: '',
            transmitName: '',
            transmitValue: '',
            flsdbSubformtypeDis: '',
            flsdbSubformDis: '',
            formValidate: {
                _mt: this.$global.mt + 'PlatflsDBlock.addOrUpd',
                flsdbStep: '',
                flsdbOrder: '',
                flsdbType: '01form',
                flsdbCode: '',
                flsdbCnName: '',
                flsdbEnName: '',
                flsdbDiscondition: '',
                flsdbconditionMark: '',
                flsdbOptauth: '',
                flsdbDisclms: '',
                flsdbSubformtype: '',
                flsdbOnlymark: '',
                flsdbSubform: '',
                flsdbSubfilter: '',
                flsdbSubisupd: '1',
                flsdbIschirdsum: '0',
                flsdbFarela: '',
                comment: '',
                APfunId: '1',
                APlogType: '',
            },
            searchCloumns0: [
                {
                    title: this.$t('lang_sysform.promCloumns.lanCode'),
                    key: 'lanCode',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanCn'),
                    key: 'lanCn',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanEn'),
                    key: 'lanEn',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchCloumns: [
                {
                    title: this.$t('lang_role.adminlog.log_funname'),
                    key: 'funFnameCnDis',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_user.rootrole.companyIdDis'),
                    key: 'companyIdDis',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchTitle0: this.$t('lang_sysform.promCloumns.title'),
            searchText01: this.$t('lang_sysform.promCloumns.searchText2'),
            searchText02: this.$t('lang_sysform.promCloumns.searchText3'),
            searchTitle: this.$t('lang_flow.searchCloumns.searchTitle'),
            searchText: this.$t('lang_flow.searchCloumns.searchText'),
            params0: {
                _mt: this.$global.mt + 'BaseLang.getPage',
                APsort: 'lanCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                // APfunId: '1',
                // APlogType: this.$t('button.ser'),
            },
            params: {
                _mt: this.$global.mt + 'SysFunctions.getPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: 10,
                APpage: 1,
                APfunId: '1',
                APffk: 0,
                APlogType: this.$t('button.ser'),
            },
            ruleValidate: {
                flsdbOrder: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbOrder'), trigger: 'blur' },
                ],
                flsdbType: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbType'), trigger: 'blur' },
                ],
                flsdbCode: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbCode'), trigger: 'blur' },
                ],
                flsdbCnName: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbCnName'), trigger: 'blur' },
                ],
                flsdbEnName: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbEnName'), trigger: 'blur' },
                ],
                flsdbOptauth: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbOptauth'), trigger: 'change' },
                ],
                flsdbDisclms: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbDisclms'), trigger: 'blur' },
                ],
                //          flsdbSubisupd: [
                //            { required: true, message: '请选择子集是否可修改', trigger: 'blur' },
                //          ],
                flsdbSubformtype: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbSubformtype'), trigger: 'change' },
                ],
                flsdbSubform: [
                    { required: true, message: this.$t('lang_flow.dataBlock.p_flsdbSubform'), trigger: 'change' },
                ],
            },
        }
    },
    props: {
        logType: String,
    },
    components: {
        searchTable,
        genrCondition,
        searchZHAndEn
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        close () {
            this.clear()
            this.$emit('hideMsg')
        },
        getFormData (id) {
            const t = this;
            t.spinShow = true;
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatflsDBlock.getById',
                APid: id,
                APlogType: this.$t('button.ser'),
                APfunId: '1',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.flsdbOrder = res.data.content[0].flsdbOrder
                    t.formValidate.flsdbType = res.data.content[0].flsdbType
                    t.formValidate.flsdbCode = res.data.content[0].flsdbCode
                    t.formValidate.flsdbCnName = res.data.content[0].flsdbCnName
                    t.formValidate.flsdbEnName = res.data.content[0].flsdbEnName
                    t.formValidate.flsdbDiscondition = res.data.content[0].flsdbDiscondition
                    t.formValidate.flsdbconditionMark = res.data.content[0].flsdbconditionMark
                    t.formValidate.flsdbOptauth = res.data.content[0].flsdbOptauth
                    t.formValidate.flsdbDisclms = res.data.content[0].flsdbDisclms
                    t.formValidate.flsdbOnlymark = res.data.content[0].flsdbOnlymark
                    t.formValidate.flsdbSubformtype = res.data.content[0].flsdbSubformtype
                    t.formValidate.flsdbSubform = res.data.content[0].flsdbSubform
                    t.formValidate.flsdbSubfilter = res.data.content[0].flsdbSubfilter
                    t.formValidate.flsdbSubisupd = res.data.content[0].flsdbSubisupd ? res.data.content[0].flsdbSubisupd : '1',
                        t.flsdbTypeDis = res.data.content[0].flsdbTypeDis
                    t.flsdbDisclmsDis = res.data.content[0].flsdbDisclmsDis
                    t.flsdbOptauthDis = res.data.content[0].flsdbOptauthDis
                    t.flsdbSubformtypeDis = res.data.content[0].flsdbSubformtypeDis
                    t.flsdbSubformDis = res.data.content[0].flsdbSubformDis
                    t.formValidate.flsdbFarela = res.data.content[0].flsdbFarela
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
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'datablocktype,datafieldauth,datablockcolumns,formtype,yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.DBType = res.data.content[0].value[0].paramList
                    t.fieldAuth = res.data.content[0].value[1].paramList
                    t.displayCol = res.data.content[0].value[2].paramList
                    t.formType = res.data.content[0].value[3].paramList
                    t.YesOrNoType = res.data.content[0].value[4].paramList
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            if (data.flsdbType === '02subtable') {
                delete this.ruleValidate.flsdbDisclms
                //          delete this.ruleValidate.flsdbOptauth
            } else {
                //          this.ruleValidate.flsdbOptauth = [
                //            { required: true, message: '操作权限', trigger: 'change' },
                //          ]
                this.ruleValidate.flsdbDisclms = [
                    { required: true, message: '显示列', trigger: 'change' },
                ]
            }
            data.flsdbStep = t.$store.state.flowStepData.mainId
            data.APlogType = t.logType
            data.id = t.$store.state.flowStepData.childId1
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (!t.$store.state.flowStepData.childId1) {
                                t.$store.commit('flowStepData/addNewArrayChildTable1', res.data.content[0])
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$store.commit('flowStepData/updateArrayChildTable1', res.data.content[0])
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
        // 当改变表单的Type是，出现相应的填写项
        //      chgByType(value) {
        //        if (value === '02subtable') {
        //          delete this.ruleValidate.flsdbDisclms
        //          delete this.ruleValidate.flsdbOptauth
        //        } else {
        //          this.ruleValidate.flsdbOptauth = [
        //            { required: true, message: '操作权限', trigger: 'change' },
        //          ]
        //          this.ruleValidate.flsdbDisclms = [
        //            { required: true, message: '显示列', trigger: 'change' },
        //          ]
        //        }
        //      },
        pickData (param) {
            const t = this
            if (param === 'flsdbCode') {
                t.$refs.searchZHAndEn.getData(this.params0)
                t.openPick0 = true
            } else {
                t.$refs.searchTable.getData(this.params)
                t.openPick = true
            }
        },
        changeinput0 (row) {
            const t = this
            t.formValidate.flsdbCode = row.lanCode
            t.formValidate.flsdbCnName = row.lanCn
            t.formValidate.flsdbEnName = row.lanEn
        },
        changeinput (name, code) {
            const t = this
            t.flsdbSubformDis = name
            t.formValidate.flsdbSubform = code
        },
        stClear () {
            const t = this
            t.flsdbSubformDis = ''
            t.formValidate.flsdbSubform = ''
        },
        clearFlsdbCode () {
            const t = this
            t.formValidate.flsdbCode = ''
            t.formValidate.flsdbCnName = ''
            t.formValidate.flsdbEnName = ''
        },
        closeST () {
            const t = this
            t.openPick = false
        },
        closeTable () {
            const t = this
            t.openPick0 = false
        },
        clear () {
            const t = this
            t.formValidate.flsdbOrder = ''
            t.formValidate.flsdbType = '01form'
            t.formValidate.flsdbCnName = ''
            t.formValidate.flsdbEnName = ''
            t.formValidate.flsdbDiscondition = ''
            t.formValidate.flsdbconditionMark = ''
            t.formValidate.flsdbOptauth = ''
            t.formValidate.flsdbDisclms = ''
            t.formValidate.flsdbOnlymark = ''
            t.formValidate.flsdbSubformtype = ''
            t.formValidate.flsdbSubform = ''
            t.formValidate.flsdbSubfilter = ''
            t.formValidate.flsdbFarela = ''
            t.flsdbTypeDis = ''
            t.flsdbDisclmsDis = ''
            t.flsdbOptauthDis = ''
            t.flsdbSubformtypeDis = ''
            t.flsdbSubformDis = ''
            t.$refs.formValidate.resetFields()
        },
        generConditionNow (id) {
            const t = this
            if (t.formValidate.flsdbDiscondition && t.formValidate.flsdbconditionMark) {
                t.transmitName = t.formValidate.flsdbDiscondition
                t.transmitValue = t.formValidate.flsdbconditionMark
                // t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
            }
            t.openCondition = true
        },
        closeCondition () {
            const t = this
            t.openCondition = false
        },
        inputCondition (name, value) {
            const t = this
            t.formValidate.flsdbDiscondition = name
            t.formValidate.flsdbconditionMark = value
        },
        clearCondition () {
            const t = this
            t.formValidate.flsdbDiscondition = ''
            t.formValidate.flsdbconditionMark = ''
        },
        //form滚动事件
        formScroll () {
            let selectDom = document.getElementsByClassName("ivu-select-visible");
            let datePickerDom = document.getElementsByClassName(
                "ivu-date-picker-focused"
            );
            if (selectDom.length > 0 || datePickerDom.length > 0) {
                let modal = document.getElementsByClassName("cover")[0];
                modal.click();
            }
            this.isScorll()
        },
        // 是否超出滚动
        isScorll () {
            this.$nextTick(() => {
                const scroll = document.getElementsByClassName("table_form");
                scroll[0].scrollHeight > scroll[0].clientHeight ||
                    scroll[0].offsetHeight > scroll[0].clientHeight
                    ? (this.isScorllY = true)
                    : (this.isScorllY = false);
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
</style>
