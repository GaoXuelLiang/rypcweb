<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div style="padding-left: 25px;max-height: 410px;overflow-y: auto;margin-right: 10px;margin-bottom: 20px;"
                 ref="scrollBox">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="80">
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="员工"
                                  prop="appOthlvEmp">
                            <span>
                                <Input v-model="formValidate.appOthlvEmpDis"
                                       :disabled="logType === '修改'"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="选择员工"
                                       @on-click="showMsgBtn(NaN,$t('button.add'))"></Input>
                                <Input v-model="formValidate.appOthlvEmp"
                                       v-show="false"></Input>
                                <Input v-model="formValidate.appOthlvEmpno"
                                       v-show="false"></Input>
                                <Input v-model="formValidate.appOthlvPostid"
                                       v-show="false"></Input>
                                <Input v-model="formValidate.id"
                                       v-show="false"></Input>
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="公司">
                            <span>
                                <Input disabled
                                       v-model="formValidate.appOthlvCompid"
                                       v-show="false"></Input>
                                <Input disabled
                                       v-model="formValidate.appOthlvCompidDis"></Input>
                                <Input disabled
                                       v-model="formValidate.companyId"
                                       v-show="false"></Input>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem prop="appOthlvDeptid"
                                  label="部门">
                            <span>
                                <Input v-model="formValidate.appOthlvDeptidDis"
                                       disabled></Input>
                                <Input v-model="formValidate.appOthlvDeptid"
                                       v-show="false"></Input>
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期类型"
                                  prop="appOthlvType"
                                  v-show="showAppOthlvType">
                            <span>
                                <!--<Input v-model="formValidate.appOthlvAntranfer" :disabled="logType === '修改'"  placeholder="假期类型下拉选择"></Input>-->
                                <Select v-model="formValidate.appOthlvType">
                                    <Option :value="item.paramCode"
                                            :key="index"
                                            v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                                </Select>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>

                        <Col span="10"
                             offset="1">
                        <FormItem label="假期配额(小时)"
                                  prop="appOthlvQuota">
                            <span>
                                <Input v-model="formValidate.appOthlvQuota"
                                       placeholder="假期配额（小时）"></Input>
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期配额(天)">
                            <span>
                                <Input v-model="appOthlvQuota"
                                       placeholder="假期配额（天）"
                                       icon="ios-search"
                                       :readonly="true"></Input>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期已休(小时)"
                                  prop="appOthlvFinished">
                            <span>
                                <Input v-model="formValidate.appOthlvFinished"
                                       placeholder="假期已休（小时）"></Input>
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期已休(天)">
                            <span>
                                <Input v-model="appOthlvFinished"
                                       placeholder="假期已休（天）"
                                       icon="ios-search"
                                       :readonly="true"></Input>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="审批中假期(小时)"
                                  prop="appOthlvApping">
                            <Input v-model="formValidate.appOthlvApping"
                                   placeholder="审批中假期（小时）"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="审批中假期(天)">
                            <Input v-model="appOthlvApping"
                                   placeholder="审批中假期（小时）"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期剩余(小时)"
                                  prop="appOthlvSerplus">
                            <span>
                                <Input v-model="formValidate.appOthlvSerplus"
                                       placeholder="假期剩余（小时）"
                                       disabled></Input>
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="假期剩余(天)">
                            <span>
                                <Input v-model="appOthlvSerplus"
                                       placeholder="假期剩余（天）"
                                       disabled></Input>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="生效时间"
                                  prop="appOthlvEffdate">
                            <span>
                                <DatePicker @on-change="onChange(1)"
                                            type="date"
                                            placeholder="生效时间"
                                            :editable="false"
                                            v-model="formValidate.appOthlvEffdate"
                                            style="width: 100%"></DatePicker>
                            </span>
                        </FormItem>
                        </Col>

                        <Col span="10"
                             offset="1">
                        <FormItem label="失效时间"
                                  prop="appOthlvInvdate">
                            <span>
                                <DatePicker @on-change="onChange(2)"
                                            type="date"
                                            placeholder="失效时间"
                                            :editable="false"
                                            v-model="formValidate.appOthlvInvdate"
                                            style="width: 100%"></DatePicker>
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="21"
                             offset="1">
                        <FormItem label="备注">
                            <Input v-model="formValidate.comment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="22">
                        <Row type="flex"
                             justify="end">
                            <FormItem>
                                <Button type="primary"
                                        :loading="isSpin"
                                        @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!-- 员工 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       ref="staffPage"
                       @hideMsg="hideMsg"
                       @changeinput="changeinput"
                       @apply_ot="applyOt"></staffPage>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import staffPage from './staffPage'

export default {
    data () {
        return {
            empGender: '',
            showMsg: false,
            appVacType: '',
            isSpin: false,
            showAppOthlvType: false,//根据员工性别显示假期类型
            // 点击给关联指标弹窗传参调接口
            params: {
                _mt:  this.$global.mt+'RecruiteInterviewer.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
                roleType: '3user',
                normStatus: '02valid',
            },
            id: '',
            appOthlvQuota: '',//假期配额天数
            appOthlvFinished: '',//假期已休天数
            appOthlvApping: '',//审批中天数
            appOthlvSerplus: '',//假期剩余天数
            formValidate: {
                appOthlvEmp: '',
                comment: '',
                appOthlvEmpDis: '',
                appOthlvCompidDis: '',
                appOthlvDeptidDis: '',
                appOthlvEffdate: '',
                appOthlvInvdate: '',
                appOthlvQuota: '',//假期配额小时
                appOthlvType: '',//假期类型
                appOthlvFinished: 0,//假期已休
                appOthlvApping: '0.0'//审批中假期
            },
            //        appOthlvEmpDis: '',
            //        appOthlvCompidDis: '',
            //        appOthlvDeptidDis: '',
            ruleValidate: {
                appOthlvEmp: [
                    { required: true, message: '请选择员工', trigger: 'blur' },
                ],
                //          appOthlvCompid: [
                //            { required: true, message: '请选择公司', trigger: 'blur' },
                //          ],
                //          appOthlvDeptid: [
                //            { required: true, message: '请选择部门', trigger: 'blur' },
                //          ],
                appOthlvType: [
                    { required: true, message: '请选择假期类型', trigger: 'blur' },
                ],
                //          appOthlvApping: [
                //            { required: true, message: '请填写审批中假期' },
                //          ],
                appOthlvQuota: [
                    { required: true, message: '请填写假期配额', trigger: 'blur' },
                ],
                //          appOthlvFinished: [
                //            { required: true, message: '请填写假期已休' },
                //          ],
                //          appOthlvSerplus: [
                //            { required: true, message: '请填写假期剩余' },
                //          ],
                //          appOthlvYear: [
                //            { required: true, message: '请选择年度' },
                //          ],
                appOthlvEffdate: [
                    { required: true, type: 'date', message: '请选择生效日期', trigger: 'change' },
                ],
                appOthlvInvdate: [
                    { required: true, type: 'date', message: '请选择失效日期', trigger: 'change' },
                ],
            },
            select: [],
        }
    },
    mouted () {
        //      var state = eval(getUrlKey('state').toLowerCase())
        //      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.appVacType = ''
        t.getSelect()
        //      }
    },
    props: {
        logType: String,
    },
    components: {
        staffPage,
    },
    watch: {
        'formValidate.appOthlvQuota': {//假期配额
            handler (newVal, oldVal) {
                if (newVal && !isNaN(newVal)) {//非空并且不为NaN
                    this.appOthlvQuota = this.hourChangeDay(newVal);//配额挑天数
                    console.log(isNaN(this.formValidate.appOthlvFinished))
                    if (this.formValidate.appOthlvFinished && !isNaN(this.formValidate.appOthlvFinished)) {
                        this.formValidate.appOthlvSerplus = parseInt(newVal) > parseInt(this.formValidate.appOthlvFinished) ? (newVal - parseInt(this.formValidate.appOthlvApping) - this.formValidate.appOthlvFinished).toFixed(1) : 0;//剩余小时
                        this.appOthlvSerplus = parseInt(newVal) > parseInt(this.formValidate.appOthlvFinished) ? ((this.appOthlvQuota * 10 - this.appOthlvApping * 10 - this.appOthlvFinished * 10) / 10).toFixed(1) : 0;//剩余天数
                    } else {
                        if (!this.formValidate.appOthlvFinished) {
                            this.formValidate.appOthlvSerplus = newVal;
                            this.appOthlvSerplus = this.appOthlvQuota;
                        } else {
                            this.formValidate.appOthlvSerplus = 0;
                            this.appOthlvSerplus = 0;
                        }
                    }
                } else {
                    this.appOthlvQuota = '';
                    this.formValidate.appOthlvSerplus = 0;
                    this.appOthlvSerplus = 0;
                }
            },
            deep: true,
            immediate: true
        },
        'formValidate.appOthlvFinished': {//假期已休
            handler (newVal, oldVal) {
                newVal = newVal ? newVal : 0;
                if (!isNaN(newVal)) {
                    this.appOthlvFinished = this.hourChangeDay(newVal);//已休天数
                    if (this.formValidate.appOthlvQuota && !isNaN(this.formValidate.appOthlvQuota)) {
                        this.formValidate.appOthlvSerplus = parseInt(this.formValidate.appOthlvQuota) > parseInt(newVal) ? (this.formValidate.appOthlvQuota - parseInt(this.formValidate.appOthlvApping) - newVal).toFixed(1) : 0;
                        this.appOthlvSerplus = parseInt(this.formValidate.appOthlvQuota) > parseInt(newVal) ? ((this.appOthlvQuota * 10 - this.appOthlvApping * 10 - this.appOthlvFinished * 10) / 10).toFixed(1) : 0;
                    } else {
                        this.formValidate.appOthlvSerplus = 0;
                        this.appOthlvSerplus = 0;
                    }
                } else {
                    this.appOthlvFinished = '';
                    this.formValidate.appOthlvSerplus = 0;
                    this.appOthlvSerplus = 0;
                }
            },
            deep: true,
            immediate: true
        },
        'formValidate.appOthlvApping': {
            handler (newVal, oldVal) {
                this.appOthlvApping = this.hourChangeDay(newVal)//审批天数
            },
            deep: true,
            immediate: true
        },
        'formValidate.appOthlvEmpDis': {
            handler (newVal, oldVal) {
                this.showAppOthlvType = newVal ? true : false
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        //      根据选择的人员的性别算出有哪些假期类型
        applyOt (res) {  //  empGender = '01male'
            let empGender = res.empGender
            this.empGender = empGender
            if (empGender) {
                this.getSelect()
            }
        },
        onChange (inde) {
            const t = this
            // 开始时间
            let appOthlvEffdate = t.formValidate.appOthlvEffdate
            // 结束时间
            let appOthlvInvdate = t.formValidate.appOthlvInvdate

            // 判断结束时间不能小于开始时间
            if (appOthlvEffdate && appOthlvInvdate) {
                let _begintime = new Date(appOthlvEffdate).getTime()
                let _endtime = new Date(appOthlvInvdate).getTime()
                if (_endtime < _begintime) {
                    if (inde === 1) {
                        t.formValidate.appOthlvEffdate = ''
                        t.$Modal.warning({
                            title: '提示',
                            content: '失效时间不能生效小于时间，请重新选择生效时间',
                        })
                    } else {
                        t.formValidate.appOthlvInvdate = ''
                        t.$Modal.warning({
                            title: '提示',
                            content: '失效时间不能生效小于时间，请重新选择失效时间',
                        })
                    }
                }
            }
            console.log(inde)
        },
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'ApplyOtherleveal.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.formValidate.id = res.data.content[0].id
                        t.formValidate.appOthlvEmp = res.data.content[0].appOthlvEmp
                        t.formValidate.comment = res.data.content[0].comment
                        t.formValidate.appOthlvEmpDis = res.data.content[0].appOthlvEmpDis
                        t.formValidate.appOthlvCompidDis = res.data.content[0].appOthlvCompidDis
                        t.formValidate.appOthlvYear = res.data.content[0].appOthlvYear
                        t.formValidate.appOthlvCompid = res.data.content[0].appOthlvCompid
                        t.formValidate.appOthlvDeptid = res.data.content[0].appOthlvDeptid
                        t.formValidate.appOthlvDeptidDis = res.data.content[0].appOthlvDeptidDis
                        t.formValidate.appOthlvType = res.data.content[0].appOthlvType
                        t.formValidate.appOthlvApping = res.data.content[0].appOthlvApping ? (res.data.content[0].appOthlvApping * 1).toFixed(1) : '0.0'
                        t.formValidate.appOthlvQuota = (res.data.content[0].appOthlvQuota * 1).toFixed(1)
                        t.formValidate.appOthlvFinished = (res.data.content[0].appOthlvFinished * 1).toFixed(1)
                        t.formValidate.appOthlvSerplus = (res.data.content[0].appOthlvSerplus * 1).toFixed(1)
                        t.formValidate.appOthlvEmpno = res.data.content[0].appOthlvEmpno
                        t.formValidate.appOthlvPostid = res.data.content[0].appOthlvPostid
                        t.formValidate.appOthlvEffdate = res.data.content[0].appOthlvEffdate
                        t.formValidate.appOthlvInvdate = res.data.content[0].appOthlvInvdate
                        t.appOthlvQuota = res.data.content[0].appOthlvQuotaHour//假期配额
                        t.appOthlvFinished = res.data.content[0].appOthlvFinishedHour//假期已休
                        t.appOthlvSerplus = res.data.content[0].appOthlvSerplusHour//假期剩余
                    }
                }).catch(() => {
                    //            this.$Modal.error({
                    //              title: this.$t('reminder.err'),
                    //              content: this.$t('reminder.errormessage'),
                    //            })
                })
            }
            // 获取休假规则
        },
        resetFields () {
            const t = this

            t.formValidate.appOthlvEmpDis = ''
            t.formValidate.appOthlvEmp = ''
            t.formValidate.appOthlvEmpno = ''
            t.formValidate.appOthlvPostid = ''
            // 公司
            t.formValidate.appOthlvCompid = ''
            t.formValidate.appOthlvCompidDis = ''
            t.formValidate.companyId = ''
            // 部门
            t.formValidate.appOthlvDeptid = ''
            t.formValidate.appOthlvDeptidDis = ''

            t.$refs.formValidate.resetFields();//清空表单校验
        },
        changeinput (name, id, empcompHirecompany, empcompHirecompanyDis, empcompDept, empcompDeptDis, companyId, empGid, empcompPost) {
            const t = this
            // 员工
            t.formValidate.appOthlvEmpDis = name
            t.formValidate.appOthlvEmp = id
            t.formValidate.appOthlvEmpno = empGid
            t.formValidate.appOthlvPostid = empcompPost
            // 公司
            t.formValidate.appOthlvCompid = empcompHirecompany
            t.formValidate.appOthlvCompidDis = empcompHirecompanyDis
            t.formValidate.companyId = companyId
            // 部门
            t.formValidate.appOthlvDeptid = empcompDept
            t.formValidate.appOthlvDeptidDis = empcompDeptDis
            t.showMsg = false
            t.showAppOthlvType = true;
        },
        showMsgBtn (id, logType, index) {
            const t = this
            t.showMsg = true
            t.index = index
            t.logType = logType
            t.$refs.staffPage.getData()
        },
        hideMsg () {
            let t = this
            t.showMsg = false
        },
        // 下拉获取非年假假期类型   empGender = '01male'
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'leaveType',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value[0].paramList.length > 0) {
                        let arrs = []
                        console.log(res.data)
                        arrs = res.data.content[0].value[0].paramList
                        arrs = arrs.slice(1, arrs.length)
                        t.select = arrs
                        t.select.splice(0, 3)
                        console.log(t.select)
                        if (this.empGender === '01male') {
                            t.select.splice(1, 1)
                            t.select.splice(5, 1)
                        } else {
                            t.select.splice(2, 1)
                            t.select.splice(t.select.length - 1, 1)
                        }
                    } else {
                        t.select = []
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt =  this.$global.mt+'ApplyOtherleveal.addOrUpd'
            data.logType = t.logType
            data.appOthlvEffdate = data.appOthlvEffdate ? new Date(data.appOthlvEffdate).format('yyyy-MM-dd') : '';
            data.appOthlvInvdate = data.appOthlvInvdate ? new Date(data.appOthlvInvdate).format('yyyy-MM-dd') : '';
            console.log(data)
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    if (t.logType === '修改') {
                        data.id = t.id
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()
                                this.$emit('getData')
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                this.$emit('getData')
                            }
                            t.handleReset()
                        }
                    }).catch(() => {
                        t.isSpin = false
                        //              t.$Modal.error({
                        //                title: this.$t('reminder.err'),
                        //                content: this.$t('reminder.errormessage'),
                        //              })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        //              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 80// 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    })
                }
            })
        },
        // 关闭弹窗
        handleReset () {
            //        const t = this
            this.resetFields()
            this.showAppOthlvType = false
            this.$emit('close')
        },
        // 小时转换天数
        hourChangeDay (num) {
            // debugger
            return num == '' ? 0 : (num * 1 / 7.5).toFixed(1);
        }
    },
}
</script>
<style lang="scss" scoped>
.cover {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
        .content {
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
