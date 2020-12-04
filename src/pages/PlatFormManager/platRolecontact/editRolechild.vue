<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix
                               v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row>
                <Form :model="form"
                      ref="form"
                      label-position="right"
                      :rules="ruleValidate"
                      :label-width="135">
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('lang_authorization.platRole.platRolechildType')"
                                      prop="platRolechildType">
                                <Select v-model="form.platRolechildType"
                                        @on-change="selChangeType"
                                        :placeholder="$t('lang_authorization.platRole.platRolechildTypeDis')"
                                        :transfer="true">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in rolecontType"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="10"
                               offset="1">
                            <FormItem :label="$t('lang_authorization.platRole.platRolechildEmpid')"
                                      v-show="!showDesc">
                                <Input v-model="platRolechildEmpidDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       :placeholder="$t('lang_authorization.platRole.platRolechildEmpidDis')"
                                       @on-click="pickGetData" />
                                <!--<Input v-model="platRolechildEmpidDis" icon="ios-search" :readonly="true" @on-click="pickGetData" placeholder="请选择员工"></Input>-->
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('lang_authorization.platRole.platRolechildVailddate')"
                                      prop="platRolechildVailddate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_authorization.platRole.platRolechildVailddateDis')"
                                            :editable="false"
                                            v-model="form.platRolechildVailddate"
                                            :transfer="true"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="10"
                               offset="1">
                            <FormItem :label="$t('lang_authorization.platRole.platRolechildInvailddate')">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_authorization.platRole.platRolechildInvailddateDis')"
                                            :editable="false"
                                            v-model="form.platRolechildInvailddate"
                                            :transfer="true"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                    </Row>
                    <i-col span="10">
                        <FormItem label="姓名"
                                  v-show="showDesc">
                            <Input v-model="form.platRolechildCnname"
                                   placeholder="请输入姓名"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_authorization.platRole.platRolechildMail')"
                                  v-show="showDesc">
                            <Input v-model="form.platRolechildMail"
                                   :placeholder="$t('lang_authorization.platRole.platRolechildMailDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10">
                        <FormItem :label="$t('lang_authorization.platRole.platRolechildTel')"
                                  v-show="showDesc">
                            <Input v-model="form.platRolechildTel"
                                   :placeholder="$t('lang_authorization.platRole.platRolechildTelDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_authorization.platRole.platRolechildPhone')"
                                  v-show="showDesc">
                            <Input v-model="form.platRolechildPhone"
                                   :placeholder="$t('lang_authorization.platRole.platRolechildPhoneDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="21">
                        <FormItem :label="$t('lang_authorization.platRole.comment')"
                                  prop="comment">
                            <Input v-model="form.platRolechildNote"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="21">
                        <row type="flex"
                             justify="end">
                            <FormItem label=""
                                      prop="comment">
                                <Button @click="close"
                                        style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        style="margin-left: 8px"
                                        :loading="isSpin"
                                        @click="save">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </row>
                    </i-col>
                </Form>
            </Row>
            <transition name="fade">
                <searchManager v-show="openManger"
                               :logType="logType1"
                               @closeManger="closeManger"
                               :searchMangerClo="searchMangerClo"
                               @inputManger="inputManger"
                               :params="paramsManger"
                               ref="searchManager"></searchManager>
            </transition>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchManager from '../../../components/searchTable/searchManager'

export default {
    data () {
        return {
            spinShow: false,
            isSpin: false,
            platRolechildEmpidDis: '',
            openManger: false,
            logType1: this.$t('lang_authorization.platRole.searchColumn.title'),
            rolecontType: [],
            form: {
                platRolechildCnname: '',
                platRolechildType: '01emplyee',
                platRolechildEmpid: '',
                platRolechildEnname: '',
                platRolechildMail: '',
                platRolechildTel: '',
                platRolechildPhone: '',
                platRolechildVailddate: '',
                platRolechildInvailddate: '',
                platRolechildNote: '',
                platRolecontactId: '',
            },
            ruleValidate: {
                platRolechildType: [
                    { required: true, message: this.$t('lang_authorization.platRole.platRolechildTypeDis'), trigger: 'blur' },
                ],
                platRolechildVailddate: [
                    { required: true, type: 'date', message: this.$t('lang_authorization.platRole.platRolechildVailddateDis'), trigger: 'change' },
                ],
            },
            showDesc: false,
            rowId: '',
            searchMangerClo: [
                {
                    title: this.$t('lang_authorization.platRole.searchColumn.empCname'),
                    key: 'empCname',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_authorization.platRole.searchColumn.empGid'),
                    key: 'empGid',
                    sortable: 'custom',
                },
            ],
            paramsManger: {
                _mt: this.$global.mt + 'EmpBase.getPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: 10,
                APpage: 1,
                APdata: '{}',
            },
        }
    },
    props: {
        id: Number,
        logType: String,
    },
    components: {
        searchManager,
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        setRowId (id) {
            const t = this
            t.rowId = id
            t.getdata(id)
        },
        setIdname (idname) {
            const t = this
            t.form.cptcOptionDis = idname
        },
        getdata (rowId) {
            const t = this
            t.spinShow = true
            const params = {
                _mt: this.$global.mt + 'PlatRolechild.getById',
                APid: rowId,
            }
            getDataLevelUserLoginData(params).then((res) => {
                if (isSuccess(res, t)) {
                    t.form.platRolechildCnname = res.data.content[0].platRolechildCnname
                    t.form.platRolechildType = res.data.content[0].platRolechildType
                    t.form.platRolechildEmpid = res.data.content[0].platRolechildEmpid
                    t.form.platRolechildEnname = res.data.content[0].platRolechildEnname
                    t.form.platRolechildTel = res.data.content[0].platRolechildTel
                    t.form.platRolechildPhone = res.data.content[0].platRolechildPhone
                    t.form.platRolechildVailddate = res.data.content[0].platRolechildVailddate
                    t.form.platRolechildInvailddate = res.data.content[0].platRolechildInvailddate
                    t.form.platRolechildNote = res.data.content[0].platRolechildNote
                    t.form.platRolecontactId = res.data.content[0].platRolecontactId
                    t.form.platRolechildMail = res.data.content[0].platRolechildMail
                    t.platRolechildEmpidDis = res.data.content[0].platRolechildEmpidDis
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false
            })
        },
        pickGetData () {
            const t = this
            t.$refs.searchManager.getData(this.paramsManger)
            t.openManger = true
        },
        closeManger () {
            const t = this
            t.$refs.searchManager.empCname = ''
            t.openManger = false
        },
        inputManger (name, id) {
            const t = this
            alert(name)
            t.platRolechildEmpidDis = name
            t.form.platRolechildEmpid = id
        },
        save () {
            const t = this
            const params = deepCopy(t.form)
            params._mt = this.$global.mt + 'PlatRolechild.addOrUpd'
            params.APlogType = this.$t('button.add')
            params.platRolecontactId = t.$store.state.platRole.mainId
            for (const dat in params) {
                if (t.rowId) {
                    params.APlogType = this.$t('button.y.upd')
                    params.id = t.rowId
                }
                if (params[dat] === '') {
                    delete params[dat]
                }
            }
            if (params.platRolechildVailddate !== undefined) {
                params.platRolechildVailddate = new Date(params.platRolechildVailddate).format('yyyy-MM-dd')
            }
            if (params.platRolechildInvailddate !== undefined) {
                params.platRolechildInvailddate = new Date(params.platRolechildInvailddate).format('yyyy-MM-dd')
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginData(params).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.close()
                            if (!t.rowId) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                //              t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        t.isSpin = false
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        clear () {
            const t = this
            t.form.platRolechildCnname = ''
            t.form.platRolechildType = '01emplyee'
            t.form.platRolechildEmpid = ''
            t.form.platRolechildEnname = ''
            t.form.platRolechildTel = ''
            t.form.platRolechildPhone = ''
            t.form.platRolechildVailddate = ''
            t.form.platRolechildInvailddate = ''
            t.form.platRolechildNote = ''
            t.form.platRolecontactId = ''
            t.form.platRolechildMail = ''
            t.platRolechildEmpidDis = ''
            t.$refs.form.resetFields()
        },
        close () {
            this.$emit('hideMsg')
            this.clear()
        },
        selChangeType () {
            if (t.form.platRolechildType === '01emplyee') {
                t.showDesc = false
            } else {
                t.showDesc = true
            }
        },
        //      获取下拉菜单
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'roleconttype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.rolecontType = res.data.content[0].value[0].paramList
                }
                t.benchpoststatus.unshift(
                    {
                        postbsStatus: '01emplyee',
                        paramInfoCn: '关联员工',
                    },
                )
            }).catch(() => {
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
</style>
