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
                      :label-width="100">
                    <Row>
                        <Col span="11">
                        <FormItem label="年度"
                                  :label-width="110"
                                  prop="appAnbrkYear">
                            <span>
                                <Select v-model="formValidate.appAnbrkYear"
                                        placeholder="请输入年度">
                                    <Option :value="item.fyYear"
                                            v-for="(item,index) in selectFyear"
                                            :key="index">{{item.fyYear}}</Option>
                                </Select>
                            </span>
                        </FormItem>

                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="员工"
                                  :label-width="110"
                                  prop="appAnbrkEmpDis">
                            <span @dblclick="clearUnit">
                                <Input placeholder="员工"
                                       v-model="formValidate.appAnbrkEmpDis"
                                       @on-click="selectComp(3)" />
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem prop="appAnbrkCompidDis"
                                  :label-width="110"
                                  label="公司">
                            <span @dblclick="clearUnit">
                                <Input placeholder="请输入公司名称"
                                       v-model="formValidate.appAnbrkCompidDis"
                                       @on-click="selectComp(1)" />
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem prop="appAnbrkDeptidDis"
                                  :label-width="110"
                                  label="部门">
                            <span @dblclick="clearUnit">
                                <Input placeholder="请输入部门名称"
                                       v-model="formValidate.appAnbrkDeptidDis"
                                       @on-click="selectComp(2)" />
                            </span>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="岗位"
                                  :label-width="110"
                                  prop="appAnbrkPostidDis">
                            <!--<Input v-model="formValidate.appAnbrkPostidDis"  placeholder="请输入岗位"></Input>-->
                            <span @dblclick="clearUnit">
                                <Input placeholder="请输入岗位名称"
                                       v-model="formValidate.appAnbrkPostidDis"
                                       @on-click="selectComp(4)" />
                            </span>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="员工号"
                                  :label-width="110"
                                  prop="appAnbrkEmpno">
                            <Input v-model="formValidate.appAnbrkEmpno"
                                   placeholder="请输入员工号"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="年假配额(小时)"
                                  :label-width="110"
                                  prop="appAnbrkQuota">
                            <Input v-model="formValidate.appAnbrkQuota"
                                   placeholder="请输入年假配额"></Input>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="年假配额(天)"
                                  :label-width="110">
                            <Input v-model="appAnbrkQuotaDays"
                                   icon="ios-search"
                                   :readonly="true"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="年假已休(小时)"
                                  :label-width="110"
                                  prop="appAnbrkFinished">
                            <!--<DatePicker type="date" placeholder="请输入年假已休" :editable="false" v-model="formValidate.appAnbrkFinished" style="width: 100%"></DatePicker>-->
                            <Input v-model="formValidate.appAnbrkFinished"
                                   placeholder="请输入年假已休"></Input>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="年假已休(天)"
                                  :label-width="110">
                            <!--<DatePicker type="date" placeholder="请输入年假已休" :editable="false" v-model="formValidate.appAnbrkFinished" style="width: 100%"></DatePicker>-->
                            <Input v-model="appAnbrkFinishedDays"
                                   icon="ios-search"
                                   :readonly="true"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="审批中年假(小时)"
                                  :label-width="110"
                                  prop="appAnbrkApping">
                            <!--<Select  clearable v-model="formValidate.appAnbrkApping"   placeholder="请输入审批中年假">-->
                            <!--<Option :value="item.paramCode" v-for="(item,index) in select" :key="index">{{item.paramInfoName}}</Option>-->
                            <!--</Select>-->
                            <Input v-model="formValidate.appAnbrkApping"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="审批中年假(天)"
                                  :label-width="110"
                                  prop="appAnbrkApping">
                            <!--<Select  clearable v-model="formValidate.appAnbrkApping"   placeholder="请输入审批中年假">-->
                            <!--<Option :value="item.paramCode" v-for="(item,index) in select" :key="index">{{item.paramInfoName}}</Option>-->
                            <!--</Select>-->
                            <Input v-model="formValidate.appAnbrkApping"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="剩余年假(小时)"
                                  :label-width="110"
                                  prop="appAnbrkSerplus">
                            <Input v-model="formValidate.appAnbrkSerplus"
                                   placeholder="请输入剩余年假"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="11"
                             offset="1">
                        <FormItem label="剩余年假(天)"
                                  :label-width="110"
                                  prop="appAnbrkSerplus">
                            <Input v-model="appAnbrkSerplusDays"
                                   placeholder="请输入剩余年假"
                                   disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="23">
                        <FormItem label="备注">
                            <!--<Select  clearable v-model="formValidate.appAnbrkApping"   placeholder="请输入审批中年假">-->
                            <!--<Option :value="item.paramCode" v-for="(item,index) in select" :key="index">{{item.paramInfoName}}</Option>-->
                            <!--</Select>-->
                            <Input v-model="formValidate.comment"
                                   type="textarea"
                                   placeholder="备注"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="23">
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
        <!--公司选择弹框-->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        const numValidate = (rule, value, callback) => {
            let reg = /^[0-9]+.?[0-9]*$/;
            if (!isNaN(value)) {
                if (!reg.test(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('请输入数字值'));
            }
        }
        const daysValidate1 = (rule, value, callback) => {
            if (parseInt(value) > parseInt(this.formValidate.appAnbrkQuota)) {
                callback(new Error('已休年假不能大于配额年假'))
            } else {
                callback()
            }
        }
        const daysValidate2 = (rule, value, callback) => {
            if (parseInt(value) < parseInt(this.formValidate.appAnbrkFinished)) {
                callback(new Error('配额年假不能小于已休年假'))
            } else {
                callback()
            }
        }
        return {
            showModal: false,
            isSpin: false,
            selectFyear: [],
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
            appAnbrkQuotaDays: '',//年假配额天数显示
            appAnbrkFinishedDays: '',//年假已休天数显示
            appAnbrkSerplusDays: '',//剩余年假天数显示
            formValidate: {
                appAnbrkEmpno: '',
                appAnbrkYear: '',
                appAnbrkCompid: '',
                appAnbrkQuota: '',
                appAnbrkFinished: '',
                appAnbrkApping: '0.0',
                appAnbrkDeptid: '',
                appAnbrkSerplus: '',
                appAnbrkPostidDis: '',
                appAnbrkPostid: '',
                appAnbrkEmp: '',
                appAnbrkEmpDis: '',
                appAnbrkCompidDis: '',
                appAnbrkDeptidDis: '',
                comment: '',
            },
            //        form: {
            //          id: '',
            //          appAnbrkCompid: '', // 公司名称
            //          appAnbrkCompidDis: '', // 公司名称
            //          appAnbrkDeptid: '', // 部门
            //          appAnbrkDeptidDis: '', // 部门
            //          empName: '', // 名字
            //          appAnbrkEmp: '', // 汇报人
            //          appAnbrkEmpDis: '', // 汇报人
            //          empkiTraineeounds: '', //
            //          appAnbrkPostidDis: '', // 岗位
            //          appAnbrkPostid: '', // 岗位
            //        },
            ruleValidate: {
                appAnbrkYear: [
                    { required: true, message: '请输入年度', trigger: 'change' },
                ],
                appAnbrkQuota: [
                    { required: true, message: '请输入年假配额', trigger: 'blur' },
                    { validator: numValidate, message: '请输入数值', trigger: 'blur' },
                    { validator: daysValidate2, message: '配额年假不能小于已休年假', tigger: 'change' }
                ],
                appAnbrkFinished: [
                    { required: true, message: '请输入年假已休', trigger: 'blur' },
                    { validator: numValidate, message: '请输入数值', trigger: 'blur' },
                    { validator: daysValidate1, message: '已休年假不能大于配额年假', tigger: 'change' }
                ],
                // appAnbrkApping: [
                //   { required: true, message: '请输入审批中年假', trigger: 'blur' },
                // ],
                // appAnbrkSerplus: [
                //   { required: true, message: '请输入剩余年假', trigger: 'blur' },
                // ],
                appAnbrkEmpDis: [
                    { required: true, message: '请选择员工', trigger: 'change' },
                ],
                appAnbrkCompidDis: [
                    { required: true, message: '请选择公司', trigger: 'change' },
                ],
                appAnbrkDeptidDis: [
                    { required: true, message: '请选择部门', trigger: 'change' },
                ],
                appAnbrkPostidDis: [
                    { required: true, message: '请选择岗位', trigger: 'change' },
                ],
                appAnbrkEmpno: [
                    { required: true, message: '请填写员工号', trigger: 'change' },
                ],
            },
            select: [],
        }
    },
    props: {
        logType: String,
    },
    watch: {
        'formValidate.appAnbrkQuota': {//年假配额
            handler (newVal, oldVal) {
                if (newVal === '' || isNaN(newVal)) {
                    this.appAnbrkQuotaDays = '';
                } else {
                    this.appAnbrkQuotaDays = this.hourChangeDay(newVal);
                }
                if (this.formValidate.appAnbrkFinished && !isNaN(newVal)) {
                    this.formValidate.appAnbrkSerplus = parseInt(newVal) < parseInt(this.formValidate.appAnbrkFinished) ? 0 : (newVal - this.formValidate.appAnbrkFinished).toFixed(1);//已休年假不能大于配额年假
                    this.appAnbrkSerplusDays = parseInt(newVal) < parseInt(this.formValidate.appAnbrkFinished) ? 0 : ((this.appAnbrkQuotaDays * 10 - this.appAnbrkFinishedDays * 10) / 10).toFixed(1);//防止小数减去小数出现精度丢失
                } else {
                    this.formValidate.appAnbrkSerplus = 0;
                    this.appAnbrkSerplusDays = 0
                }
            },
            deep: true,
            immediate: true
        },
        'formValidate.appAnbrkFinished': {//年假已休
            handler (newVal, oldVal) {
                if (newVal === '' || isNaN(newVal)) {
                    this.appAnbrkFinishedDays = '';
                } else {
                    this.appAnbrkFinishedDays = this.hourChangeDay(newVal);
                }
                if (this.formValidate.appAnbrkQuota && !isNaN(newVal)) {
                    this.formValidate.appAnbrkSerplus = parseInt(newVal) > parseInt(this.formValidate.appAnbrkQuota) ? 0 : (this.formValidate.appAnbrkQuota - newVal).toFixed(1);
                    this.appAnbrkSerplusDays = parseInt(newVal) > parseInt(this.formValidate.appAnbrkQuota) ? 0 : ((this.appAnbrkQuotaDays * 10 - this.appAnbrkFinishedDays * 10) / 10).toFixed(1);
                } else {
                    this.formValidate.appAnbrkSerplus = 0;
                    this.appAnbrkSerplusDays = 0;
                }
            },
            deep: true,
            immediate: true
        },

    },
    components: {},
    mouted () {
        this.getFiscalYearSelect()
        this.formValidate.appAnbrkEmpDis = ''
        this.formValidate.appAnbrkCompidDis = ''
        this.formValidate.appAnbrkDeptidDis = ''
        this.formValidate.appAnbrkPostidDis = ''
    },
    methods: {
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'ApplyAnandbrk.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        console.log(res.data.content[0])
                        t.formValidate.appAnbrkEmpno = res.data.content[0].appAnbrkEmpno
                        t.formValidate.appAnbrkYear = res.data.content[0].appAnbrkYear
                        t.formValidate.appAnbrkQuota = (res.data.content[0].appAnbrkQuota * 1).toFixed(1)
                        t.formValidate.appAnbrkFinished = (res.data.content[0].appAnbrkFinished * 1).toFixed(1)
                        t.formValidate.appAnbrkApping = res.data.content[0].appAnbrkApping ? (res.data.content[0].appAnbrkApping * 1).toFixed(1) : '0.0'
                        t.formValidate.appAnbrkSerplus = (res.data.content[0].appAnbrkSerplus * 1).toFixed(1)
                        t.formValidate.appAnbrkPostidDis = res.data.content[0].appAnbrkPostidDis
                        t.formValidate.appAnbrkEmp = res.data.content[0].appAnbrkEmp
                        t.formValidate.appAnbrkEmpDis = res.data.content[0].appAnbrkEmpDis
                        t.formValidate.appAnbrkCompid = res.data.content[0].appAnbrkCompid
                        t.formValidate.appAnbrkCompidDis = res.data.content[0].appAnbrkCompidDis
                        t.formValidate.appAnbrkDeptid = res.data.content[0].appAnbrkDeptid
                        t.formValidate.appAnbrkDeptidDis = res.data.content[0].appAnbrkDeptidDis
                        t.formValidate.comment = res.data.content[0].comment
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'annualevalHandltype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select = res.data.content[0].value[0].paramList
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
            console.log(data)
            data._mt =  this.$global.mt+'ApplyAnandbrk.addOrUpd'
            data.logType = t.logType
            //        if (data.appAnbrkFinished !== undefined) {
            //          data.appAnbrkFinished = data.appAnbrkFinished === '' ? '' : new Date(data.appAnbrkFinished).format('yyyy-MM-dd')
            //        }
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
                                //                  t.$Modal.success({
                                //                    title: this.$t('reminder.suc'),
                                //                    content: this.$t('reminder.addsuccess'),
                                //                  })
                                t.$refs.formValidate.resetFields()
                                this.$emit('getData')
                            }
                            if (t.logType === '修改') {
                                //                  t.$Modal.success({
                                //                    title: this.$t('reminder.suc'),
                                //                    content: this.$t('reminder.updsuccess'),
                                //                  })
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
        /*
       * 弹出选择
       * */
        selectComp (ind) {
            const t = this
            if (ind === 1) {
                t.modiaContent = 'org-org-std'
                t.dataParame = {
                    unitPid: 0,
                }
            } else if (ind === 2) {
                t.modiaContent = 'org-department-std'
                t.dataParame = {
                    //          unitPid: '',
                }
            } else if (ind === 3) {
                //          t.modiaContent = 'user-info-std'
                t.modiaContent = 'emp-base-std'
            } else if (ind === 4) {
                t.modiaContent = 'org-post-std'
                //          t.dataParame = {
                //            unitPid: 0,
                //          }
            }
            t.inde = ind
            t.showModal = true
        },
        clearUnit () {
            const t = this
            t.formValidate.appAnbrkCompid = ''
            t.formValidate.appAnbrkCompidDis = ''
            t.formValidate.appAnbrkDeptid = ''
            t.formValidate.appAnbrkDeptidDis = ''
            t.formValidate.EmpName = ''
            t.formValidate.appAnbrkEmp = ''
            t.formValidate.appAnbrkEmpDis = ''
        },
        // 选择公司的弹出处理
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            //        console.log(row)
            if (t.inde === 1) {
                // 公司名称
                t.formValidate.appAnbrkCompidDis = row.unitsName
                t.formValidate.appAnbrkCompid = row.id
            } else if (t.inde === 2) {
                // 部门
                t.formValidate.appAnbrkDeptidDis = row.unitsName
                t.formValidate.appAnbrkDeptid = row.id
            } else if (t.inde === 3) {
                // 汇报人
                console.log(row)
                console.log(row.empcompHirecompanyDis, row.empcompDeptDis, row.empkiWorkno)
                // 汇报人
                t.formValidate.appAnbrkEmpDis = row.empName
                t.formValidate.appAnbrkEmp = row.id
                // 公司名称
                t.formValidate.appAnbrkCompidDis = row.empcompHirecompanyDis
                t.formValidate.appAnbrkCompid = row.empcompHirecompany
                // 部门
                t.formValidate.appAnbrkDeptidDis = row.empcompDeptDis
                t.formValidate.appAnbrkDeptid = row.empcompDept
                // 岗位
                t.formValidate.appAnbrkPostidDis = row.empcompPostDis
                t.formValidate.appAnbrkPostid = row.empcompPost
                // 员工工号
                t.formValidate.appAnbrkEmpno = row.empkiWorkno
            } else if (t.inde === 4) {
                // 岗位
                t.formValidate.appAnbrkPostidDis = row.postSnameDis
                t.formValidate.appAnbrkPostid = row.id
            }
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            this.$refs.formValidate.resetFields()
            this.formValidate.comment = ''
            this.$emit('close')
        },
        // 获取年假
        getFiscalYearSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
                data: '{}',
                logType: this.$t('button.ser'),
            }).then((res) => {
                console.log(res.data.content[0].value)
                if (isSuccess(res, t)) {
                    t.selectFyear = (res.data.content[0].value)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            })
        },
        // 小时转换天数
        hourChangeDay (num) {
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
