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
                                  prop="attExerecEmp">
                            <span @dblclick="clearUserid">
                                <Input v-model="attExerecEmpDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择员工"
                                       @on-click="pickUserData"></Input>
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="员工工号">
                            <Input v-model="upFormData.attExerecEmpno"
                                   disabled
                                   placeholder="员工工号" />
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="修改原因"
                                  prop="attExerecUpdres">
                            <Select v-model="upFormData.attExerecUpdres">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="进出标志"
                                  prop="attExerecRemark">
                            <Select v-model="upFormData.attExerecRemark">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="打卡时间"
                                  prop="attExerecChkintime">
                            <DatePicker type="datetime"
                                        format="yyyy-MM-dd HH:mm"
                                        :clearable='true'
                                        placeholder="请选择打卡时间"
                                        :editable="false"
                                        v-model="upFormData.attExerecChkintime"
                                        style="width: 223px"></DatePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注">
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
                                <Button @click="handleReset">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        :loading="isSpin"
                                        @click="handleSubmit"
                                        style="margin-left: 8px">{{$t('button.sav')}}</Button>
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
                attExerecEmp: '',
                attExerecEmpno: '',
                attExerecUpdres: '',  // 修改原因
                attExerecRemark: '',  // 进出标志
                attExerecChkintime: '',  // 打卡时间
                comment: '',

            },
            loadingStatus: false,
            file: '',
            filekey: '',
            ruleValidate: {
                attExerecEmp: [
                    { required: true, message: '请选择员工', trigger: 'change' },
                ],
                attExerecRemark: [
                    { required: true, message: '请选择进出标志', trigger: 'change' },
                ],
                attExerecUpdres: [
                    { required: true, message: '请选择修改原因', trigger: 'change' },
                ],
                attExerecChkintime: [
                    { required: true, type: 'date', message: '请选择打卡时间', trigger: 'change' },
                ],
            },
            blackHrm: '',
            blackHrmDis: '',
            attExerecEmp: '', // 员工
            attExerecEmpDis: '',
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
        mainId: String,
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
                    _mt:  this.$global.mt+'AttendExcerec.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.upFormData.id = res.data.content[0].id;
                        t.upFormData.attExerecEmp = res.data.content[0].attExerecEmp
                        t.attExerecEmpDis = res.data.content[0].attExerecEmpDis
                        t.upFormData.attExerecEmpno = res.data.content[0].attExerecEmpno
                        t.upFormData.attExerecRemark = res.data.content[0].attExerecRemark
                        t.upFormData.attExerecUpdres = res.data.content[0].attExerecUpdres
                        t.upFormData.attExerecChkintime = res.data.content[0].attExerecChkintime
                        t.upFormData.comment = res.data.content[0].comment
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
            console.log('t.mainId', t.mainId);
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'AttendExcerec.addOrUpd'
            data.attExerecExeid = t.mainId
            data.logType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.attExerecChkintime !== undefined) {
                data.attExerecChkintime = data.attExerecChkintime === '' ? '' : new Date(data.attExerecChkintime).format('yyyy-MM-dd hh:mm')
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
                                this.$emit('getData', t.mainId)
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                this.$emit('getData', t.mainId)
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
                }
            })
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            this.$refs.upFormData.resetFields()
            t.attExerecEmpDis = '';
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
            t.upFormData.attExerecEmpno = row.empkiWorkno;
            //        t.upFormData.rinterviewerName = row.empName;
            t.attExerecEmpDis = row.empName; // 员工
            t.upFormData.attExerecEmp = row.id;
        },
        clearUserid () {
            const t = this
            this.$refs.upFormData.resetFields()
            t.upFormData.attExerecEmpno = '';
            //        t.upFormData.rinterviewerName = '';
            t.attExerecEmpDis = '';
            t.upFormData.attExerecEmp = '';
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
