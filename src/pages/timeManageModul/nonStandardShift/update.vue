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
            <div style="padding-left: 25px;height: 410px;overflow-y: auto;margin-right: 10px;margin-bottom: 20px;"
                 ref="scrollBox">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="80">
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="公司名称"
                                  prop="attNostdCompanyName">
                            <Input v-model="formValidate.attNostdCompanyName"
                                   :disabled="disabled"
                                   placeholder="请选择公司"
                                   icon="ios-search"
                                   :readonly="true"
                                   @on-click="flag && pickDataComp()"></Input>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="班组"
                                  prop="attNostdTeamDis">
                            <Input v-model="formValidate.attNostdTeamDis"
                                   :disabled="disabled"
                                   placeholder="请选择班组"
                                   icon="ios-search"
                                   :readonly="true"
                                   @on-click="flag && pickDataTeam()" />
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="员工名称"
                                  prop="attNostdEmpName">
                            <Input v-model="formValidate.attNostdEmpName"
                                   :disabled="disabled"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="选择员工"
                                   @on-click="flag && showMsgBtn(NaN,logType)"></Input>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="员工编号"
                                  prop="">
                            <Input v-model="formValidate.attNostdEmpNo"
                                   disabled
                                   placeholder="请输入员工编号"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                             offset="1">
                        <FormItem label="班次"
                                  prop="attNostdShiftDis">
                            <Input v-model="formValidate.attNostdShiftDis"
                                   :disabled="disabled"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择班次"
                                   @on-click="flag && pickShift()"></Input>
                        </FormItem>
                        </Col>
                        <Col span="10"
                             offset="1">
                        <FormItem label="排班日期"
                                  prop="attNostdShiftdate">
                            <DatePicker v-model="formValidate.attNostdShiftdate"
                                        :disabled="disabled"
                                        type="date"
                                        placeholder="排班日期"
                                        :editable="false"
                                        style="width: 100%"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="21"
                             offset="1">
                        <FormItem label="备注"
                                  prop="">
                            <Input v-model="formValidate.comment"
                                   :disabled="disabled"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row v-show="showBtn">
                        <Col span="22">
                        <Row type="flex"
                             justify="end">
                            <FormItem>
                                <Button type="primary"
                                        @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <!-- 员工 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       :attNostdTeamid="formValidate.attNostdTeamid"
                       :comId="comId"
                       ref="staffPage"
                       @hideMsg="hideMsg"
                       @changeinput="changeinput"></staffPage>
        </transition>
        <!--选择班组-->
        <transition name="fade">
            <searchTeam v-show="openPickTeam"
                        :comId="comId"
                        @closeTeam="closeTeam"
                        @inputEmp="inputEmp"
                        ref="searchTeam"></searchTeam>
        </transition>
        <!-- 班次 -->
        <transition name="fade">
            <searchAtdRota v-show="openPickShift"
                           :comId="comId"
                           @closeEmp="closeAtd"
                           @inputEmp="inputAtd"
                           ref="searchAtdRota"></searchAtdRota>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import staffPage from './staffPage'
import searchHCompany from '../../../components/searchTable/searchHCompany'//公司
import searchAtdRota from '../../../components/searchTable/searchAttendanceRota'//班次
import searchTeam from './searchTeam' //班组
export default {
    data () {
        return {
            id: '',//数据id
            formValidate: {
                attNostdEmpName: '',//员工名称
                attNostdEmpid: '',//员工id
                attNostdEmpNo: '',//员工编号
                attNostdCompanyName: '',//公司名称
                attNostdCompany: '',//公司id
                attNostdTeamDis: '',//班组名称
                attNostdTeamid: '',//班组id
                attNostdShiftDis: '',//班次名称
                attNostdShiftid: '',//班次id
                attNostdShiftdate: '',//排班日期
                comment: ''//备注
            },
            ruleValidate: {
                attNostdCompanyName: [
                    { required: true, message: '请选择公司', trigger: 'change' }
                ],
                attNostdEmpName: [
                    { required: true, message: '请选择员工', trigger: 'change' }
                ],
                attNostdTeamDis: [
                    { required: true, message: '请选择班组', trigger: 'change' }
                ],
                attNostdShiftDis: [
                    { required: true, message: '请选择班次', trigger: 'change' }
                ],
                attNostdShiftdate: [
                    { required: true, type: 'date', message: '请选择排班日期', trigger: 'change' }
                ]
            },
            index: '',
            showMsg: false,//员工页面
            openPickTeam: false,//班组
            openPickShift: false,//班次
            comId: '',
            disabled: false,//查看时不可点击修改
            showBtn: true,//查看时没有保存按钮
            flag: true,//查看时无法点击
            openHCompany: false,//公司弹框
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                },
            ],
            paramsHCompany: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                unitType: '01company,10area',
                logType: '雇佣公司',
            },
        }
    },
    props: {
        logType: String
    },
    components: {
        staffPage,
        searchAtdRota,
        searchTeam,
        searchHCompany,
    },
    watch: {
        logType (newVal, oldVal) {
            if (newVal == this.$t('button.view')) {
                this.disabled = true;
                this.showBtn = false;
                this.flag = false;
            } else {
                this.disabled = false;
                this.showBtn = true;
                this.flag = true;
            }
        },
        'formValidate.attNostdCompany': {
            handler (newVal, oldVal) {
                // console.log(newVal,oldVal)
                if (this.logType !== this.$t('button.y.upd') && this.logType !== this.$t('button.view')) {
                    if (newVal !== oldVal) {
                        this.formValidate.attNostdEmpName = ''//员工名称
                        this.formValidate.attNostdEmpid = ''//员工id
                        this.formValidate.attNostdEmpNo = ''//员工编号
                        this.formValidate.attNostdTeamDis = ''//班组名称
                        this.formValidate.attNostdTeamid = ''//班组id
                    }
                } else {
                    console.log(newVal + 'new', oldVal + 'old')
                    if (oldVal) {
                        if (newVal !== oldVal) {
                            this.formValidate.attNostdEmpName = ''//员工名称
                            this.formValidate.attNostdEmpid = ''//员工id
                            this.formValidate.attNostdEmpNo = ''//员工编号
                            this.formValidate.attNostdTeamDis = ''//班组名称
                            this.formValidate.attNostdTeamid = ''//班组id
                        }
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        getData (id) {
            const t = this;
            if (id) {
                t.id = id;
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'AttendNostdshift.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        console.log(res)
                        t.formValidate.attNostdEmpName = res.data.content[0].attNostdEmpName;
                        t.formValidate.attNostdEmpid = res.data.content[0].attNostdEmpid;
                        t.formValidate.attNostdEmpNo = res.data.content[0].attNostdEmpNo;
                        t.formValidate.attNostdCompanyName = res.data.content[0].attNostdCompanyName;
                        t.formValidate.attNostdCompany = res.data.content[0].attNostdCompany;
                        t.formValidate.attNostdTeamDis = res.data.content[0].attNostdTeamDis;
                        t.formValidate.attNostdTeamid = res.data.content[0].attNostdTeamid;
                        t.formValidate.attNostdShiftDis = res.data.content[0].attNostdShiftDis;
                        t.formValidate.attNostdShiftid = res.data.content[0].attNostdShiftid;
                        t.formValidate.attNostdShiftdate = res.data.content[0].attNostdShiftdate;
                        t.formValidate.comment = res.data.content[0].comment;
                        t.comId = res.data.content[0].attNostdCompany;
                    }
                }).catch(() => {

                })
            }
        },
        showMsgBtn (id, logType, index) {
            const t = this;
            if (!t.formValidate.attNostdTeamDis) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择班组',
                })
            } else {
                t.showMsg = true;
                t.index = index;
                t.logType = logType;
                t.$refs.staffPage.getData();
            }

        },
        changeinput (row) {
            this.formValidate.attNostdEmpName = row.attTmmemEmpidDis//员工名称
            this.formValidate.attNostdEmpid = row.attTmmemEmpid//员工id
            this.formValidate.attNostdEmpNo = row.attTmmemEmpno//员工编号
            // console.log(row) 
        },
        hideMsg () {
            this.showMsg = false;
        },
        // 选择公司
        pickDataComp () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        inputHCompany (name, id) {
            const t = this
            t.formValidate.attNostdCompanyName = name;//公司名称
            t.formValidate.attNostdCompany = id;//公司id
            t.comId = id;
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        // 选择班组
        pickDataTeam () {
            const t = this
            if (!t.formValidate.attNostdCompanyName) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择公司',
                })
            } else {
                this.$refs.searchTeam.getData(1)
                this.openPickTeam = true
            }
        },
        inputEmp (row) {
            const t = this;
            t.formValidate.attNostdTeamid = row.id;
            t.formValidate.attNostdTeamDis = row.attTeamName;
        },
        closeTeam () {
            const t = this
            t.openPickTeam = false
        },
        // 选则班次
        pickShift () {
            const t = this
            if (!t.formValidate.attNostdCompanyName) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择员工',
                })
            } else {
                t.openPickShift = true
                t.$refs.searchAtdRota.getData()
            }
        },
        inputAtd (row, num) {
            const t = this;
            t.formValidate.attNostdShiftid = row.id;
            t.formValidate.attNostdShiftDis = row.attShifName;
        },
        closeAtd () {
            const t = this
            t.openPickShift = false
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt =  this.$global.mt+'AttendNostdshift.addOrUpd'
            data.logType = t.logType
            data.attNostdShiftdate = data.attNostdShiftdate ? new Date(data.attNostdShiftdate).format('yyyy-MM-dd') : '';
            console.log(data)
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if (t.logType === '修改') {
                        data.id = t.id
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
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
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 80// 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    })
                }
            })
        },
        clear () {
            this.formValidate.attNostdEmpName = '';
            this.formValidate.attNostdEmpid = '';
            this.formValidate.attNostdEmpNo = '';
            this.formValidate.attNostdCompanyName = '';
            this.formValidate.attNostdCompany = '';
            this.formValidate.attNostdTeamDis = '';
            this.formValidate.attNostdTeamid = '';
            this.formValidate.attNostdShiftDis = '';
            this.formValidate.attNostdShiftid = '';
            this.formValidate.attNostdShiftdate = '';
            this.formValidate.comment = '';
            this.$refs.formValidate.resetFields();
        },
        handleReset () {
            this.clear();
            this.$emit('close');
        }
    }
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