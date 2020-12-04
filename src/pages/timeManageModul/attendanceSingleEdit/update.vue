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
            <Form class="content"
                  ref="upFormData"
                  :model="upFormData"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <i-col span="10">
                        <FormItem label="员工"
                                  prop="attUpdrecEmp">
                            <span @dblclick="clearUserid">
                                <Input v-model="attUpdrecEmpDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择员工"
                                       @on-click="pickUserData"></Input>
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="公司">
                            <Input v-model="attUpdrecCompidDis"
                                   disabled
                                   placeholder="公司"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="部门">
                            <Input v-model="attUpdrecDeptidDis"
                                   disabled
                                   placeholder="部门"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="员工工号">
                            <Input v-model="upFormData.attUpdrecEmpno"
                                   disabled
                                   placeholder="员工工号" />
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="考勤日期"
                                  prop="attUpdrecWorkdate">
                            <DatePicker type="date"
                                        :clearable='true'
                                        placeholder="请选择考勤日期"
                                        :editable="false"
                                        v-model="upFormData.attUpdrecWorkdate"
                                        style="width: 223px"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="打卡时间"
                                  prop="attUpdrecChkintime">
                            <!--<TimePicker confirm format="HH:mm" v-model="upFormData.attUpdrecChkintime" :editable='false' placeholder="请选择打卡时间" style="width: 223px"></TimePicker>-->
                            <DatePicker type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable='true'
                                        placeholder="请选择打卡时间"
                                        :editable="false"
                                        v-model="upFormData.attUpdrecChkintime"
                                        style="width: 223px"></DatePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="进出标志"
                                  prop="attUpdrecRemark">
                            <Select v-model="upFormData.attUpdrecRemark">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="修改原因"
                                  prop="attUpdrecUpdres">
                            <Select v-model="upFormData.attUpdrecUpdres">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注"
                                  prop="interviewertPscope">
                            <Input v-model="upFormData.comment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21"
                           offset="1">
                        <Row type="flex"
                             justify="end">
                            <FormItem>
                                <Button @click="handleReset"
                                        style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        :loading="isSpin"
                                        @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </Row>
                    </i-col>
                </Row>
            </Form>
        </div>
        <!-- 面试官 -->
        <transition name="fade">
            <searchEmpMaster v-show="openPickUser"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import searchEmpMaster from '../../../components/searchTable/searchSingleStaff'
import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import valid from '../../../lib/pub_valid'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            isSpin: false,
            selectYesNo: [],
            select: [],
            select1: [],
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
            searchCloumns: [
                {
                    title: '指标名称',
                    key: 'normName',
                },
                {
                    title: '指标描述',
                    key: 'normDesc',
                    // width: 253,
                },
            ],
            evatLevelDis: '',
            evatNormDis: '',
            id: '',
            upFormData: {
                id: '',
                attUpdrecEmp: '',
                attUpdrecCompid: '',
                attUpdrecDeptid: '',
                attUpdrecEmpno: '',
                attUpdrecWorkdate: '',
                attUpdrecChkintime: '',
                attUpdrecRemark: '',  // 进出标志
                attUpdrecUpdres: '',  // 修改原因
                comment: '',

            },
            loadingStatus: false,
            file: '',
            filekey: '',
            ruleValidate: {
                attUpdrecEmp: [
                    { required: true, message: '请选择员工', trigger: 'change' },
                ],
                attUpdrecWorkdate: [
                    { required: true, type: 'date', message: '请选择考勤日期', trigger: 'change' },
                ],
                attUpdrecChkintime: [
                    { required: true, type: 'date', message: '请选择打卡时间', trigger: 'change' },
                ],
                attUpdrecRemark: [
                    { required: true, message: '请选择进出标志', trigger: 'change' },
                ],
                attUpdrecUpdres: [
                    { required: true, message: '请选择修改原因', trigger: 'change' },
                ],
            },
            blackHrm: '',
            blackHrmDis: '',
            attUpdrecEmp: '', // 员工
            attUpdrecEmpDis: '',
            attUpdrecCompid: '', // 公司
            attUpdrecCompidDis: '',
            attUpdrecDeptid: '', // 部门
            attUpdrecDeptidDis: '',
            openPickUser: false,
            // 岗位
            openPost: false,
            searchPostClo: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                    key: 'postFnameEnDis',
                },
            ],
            paramsPost: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '岗位',
            },
        }
    },
    props: {
        logType: String,
        years: Array,
    },
    components: {
        searchEmpMaster,
    },
    mounted () {

    },
    methods: {
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'AttendUpdrecord.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.upFormData.id = res.data.content[0].id;
                        t.upFormData.attUpdrecEmp = res.data.content[0].attUpdrecEmp
                        t.attUpdrecEmpDis = res.data.content[0].attUpdrecEmpDis
                        t.upFormData.attUpdrecCompid = res.data.content[0].attUpdrecCompid
                        t.attUpdrecCompidDis = res.data.content[0].attUpdrecCompidDis
                        t.upFormData.attUpdrecDeptid = res.data.content[0].attUpdrecDeptid
                        t.attUpdrecDeptidDis = res.data.content[0].attUpdrecDeptidDis
                        t.upFormData.attUpdrecEmpno = res.data.content[0].attUpdrecEmpno
                        t.upFormData.attUpdrecWorkdate = res.data.content[0].attUpdrecWorkdate
                        t.upFormData.attUpdrecChkintime = res.data.content[0].attUpdrecChkintime
                        t.upFormData.attUpdrecRemark = res.data.content[0].attUpdrecRemark
                        t.upFormData.attUpdrecUpdres = res.data.content[0].attUpdrecUpdres
                        t.upFormData.comment = res.data.content[0].comment
                        if (res.data.content[0].contractWeixinflag) {
                            t.file = {};
                            t.file.name = res.data.content[0].contractWeixinflag.split(':')[0].toString();
                            t.filekey = res.data.content[0].contractWeixinflag.split(':')[1].toString();
                        }
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
                typeCode: 'attCommute,reasons ',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    this.select = res.data.content[0].value[0].paramList || []
                    this.select1 = res.data.content[0].value[1].paramList || []
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
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'AttendUpdrecord.addOrUpd'
            data.logType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.attUpdrecWorkdate !== undefined) {
                data.attUpdrecWorkdate = data.attUpdrecWorkdate === '' ? '' : new Date(data.attUpdrecWorkdate).format('yyyy-MM-dd')
            }
            if (data.attUpdrecChkintime !== undefined) {
                data.attUpdrecChkintime = data.attUpdrecChkintime === '' ? '' : new Date(data.attUpdrecChkintime).format('yyyy-MM-dd hh:mm')
            }
            this.$refs.upFormData.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    if (t.logType === '修改') {
                        data.id = t.id
                    } else {
                        delete data.id
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.upFormData.resetFields()
                                t.$emit('getData', res.data.content[0])
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
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
                        tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        //         t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    })
                }
            })
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            this.$refs.upFormData.resetFields()
            t.attUpdrecEmpDis = '';
            t.attUpdrecCompidDis = '';
            t.attUpdrecDeptidDis = '';
            for (let key in t.upFormData) {
                t.upFormData[key] = ''
            }
            this.$emit('closeUpd')
        },
        /**
         * 选择雇员
         */
        pickUserData () {
            const t = this;
            t.$refs.searchEmpMaster.getData();
            t.openPickUser = true;
        },
        closeEmp () {
            const t = this
            t.openPickUser = false
        },
        inputEmp (row) {
            const t = this
            t.upFormData.attUpdrecEmpno = row.empkiWorkno;
            //        t.upFormData.rinterviewerName = row.empName;
            t.attUpdrecEmpDis = row.empName; // 员工
            t.upFormData.attUpdrecEmp = row.id;
            t.attUpdrecCompidDis = row.empcompHirecompanyDis; // 公司id
            t.upFormData.attUpdrecCompid = row.empcompHirecompany;
            t.attUpdrecDeptidDis = row.empcompDeptDis; // 部门id
            t.upFormData.attUpdrecDeptid = row.empcompDept;
        },
        clearUserid () {
            const t = this
            this.$refs.upFormData.resetFields()
            t.upFormData.attUpdrecEmpno = '';
            //        t.upFormData.rinterviewerName = '';
            t.attUpdrecEmpDis = '';
            t.upFormData.attUpdrecEmp = '';
            t.attUpdrecCompidDis = '';
            t.upFormData.attUpdrecCompid = '';
            t.attUpdrecDeptidDis = '';
            t.upFormData.attUpdrecDeptid = '';
        },
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
