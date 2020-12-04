<template>
    <div class="background">
        <div class="title">
            <div class="backbox">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{title}}
                    <Button type="text"
                            @click="close"
                            style="float:right;">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div>
                <row class="table-form"
                     ref="table-form">
                    <Form :model="upFormData"
                          :rules="ruleValidate"
                          ref="upFormData"
                          :label-width="120">
                        <i-col span="11">
                            <FormItem label="排班日期"
                                      prop="tinterviewerPno">
                                <DatePicker type="date"
                                            placeholder="排班日期"
                                            :editable="false"
                                            format="yyyy-MM-dd"
                                            v-model="upFormData.attRddlDate"
                                            style='width: 228px;'></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="轮次名称">
                                <Input v-model="upFormData.attRddlRoundidDis"
                                       disabled
                                       placeholder="轮次名称"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="班次名称"
                                      icon="ios-search"
                                      :readonly="true">
                                <!-- <Select v-model="upFormData.attRddlShiftname" clearable>
                  <Option :value="item.id" :key="index" v-for="(item,index) in select">{{item.attShifName}}
                  </Option>
                </Select> -->
                                <Input v-model="upFormData.attRddlShiftnameDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickShift()" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="日期类型"
                                      icon="ios-search"
                                      :readonly="true">
                                <Select v-model="upFormData.attRddlDatetype"
                                        clearable>
                                    <Option :value="item.paramCode"
                                            :key="index"
                                            v-for="(item,index) in select1">{{item.paramInfoName}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="备注"
                                      prop="interviewertPscope">
                                <Input v-model="upFormData.comment"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注"></Input>
                            </FormItem>
                        </i-col>
                    </Form>
                </row>
                <div class="btn">
                    <Button type="primary"
                            :loading="isSpin"
                            style="margin-right: 50px "
                            @click="save">{{$t('button.sav')}}</Button>
                </div>
            </div>
        </div>
        <!-- 班次 -->
        <transition name="fade">
            <searchAtdRota v-if="openPickShift"
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
import searchAtdRota from '../../../components/searchTable/searchAttendanceRota'//班次
export default {
    data () {
        return {
            isSpin: false,
            title: '修改',
            id: '',
            openPickShift: false,//班次
            openPickUser: false,
            upFormData: {
                id: '',
                tinterviewerPno: '',
                tinterviewerGid: '',
                tinterviewertName: '',
                tinterviewertPosition: '',
            },
            ruleValidate: {
                tinterviewerPno1: [
                    { required: true, message: '请选择面试官', trigger: 'blur' },
                ],
            },
            select: [],
            select1: [],
            id: '', // 获取详情用id
        }
    },
    props: {
        comId: String,//公司id
        tinterviewertTeamid: '', // 小组id   tinterviewertTeamid
    },
    components: {
        searchAtdRota
    },
    mounted () {
        this.getSelect()
        this.getBanName()
    },
    methods: {
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'AttendRounddetail.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.upFormData = res.data.content[0];
                        //              t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        save () {
            if (this.upFormData.attRddlDate !== undefined) {
                this.upFormData.attRddlDate = this.upFormData.attRddlDate === '' ? '' : new Date(this.upFormData.attRddlDate).format('yyyy-MM-dd')
            }
            const t = this
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'AttendRounddetail.addOrUpd'
            data.logType = '排班明细修改'
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('reminder.updsuccess'),
                            })
                            t.close();
                            t.$emit('getData')
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
        close () {
            let t = this
            t.$refs.upFormData.resetFields()
            t.clearUserid()
            this.$emit('hideChangeCharge');
        },
        /**
         * 选择班次
         */
        pickShift () {
            const t = this
            t.openPickShift = true
        },
        inputAtd (row, num) {
            const t = this;
            t.upFormData.attRddlShiftname = row.id;
            t.upFormData.attRddlShiftnameDis = row.attShifName;
        },
        closeAtd () {
            const t = this
            t.openPickShift = false
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
            console.log('row---', row);
            t.upFormData.id = row.id;
            t.upFormData.tinterviewerPno = row.rinterviewerPno;
            t.upFormData.tinterviewerGid = row.rinterviewerGid;
            t.upFormData.tinterviewertName = row.rinterviewerName;
            t.tinterviewerCompDis = row.rinterviewerCompDis; // 公司id
            t.upFormData.tinterviewerComp = row.rinterviewerComp;
            t.tinterviewerDeptDis = row.rinterviewerDeptDis; // 部门id
            t.upFormData.tinterviewerDept = row.rinterviewerDept;
            t.upFormData.tinterviewertPosition = row.rinterviewerPosition;
        },
        clearUserid () {
            const t = this
            this.$refs.upFormData.resetFields()
            t.upFormData.tinterviewerPno = '';
            t.upFormData.tinterviewerGid = '';
            t.upFormData.tinterviewertName = '';
            t.tinterviewerCompDis = '';
            t.upFormData.tinterviewerComp = '';
            t.tinterviewerDeptDis = '';
            t.upFormData.tinterviewerDept = '';
            t.upFormData.tinterviewertPosition = '';
        },
        // 获取日期类型
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'datetype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select1 = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 获取班次名称
        getBanName () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'AttendShift.getPage',
                rows: 1000,
                page: 1,
                sort: 'id',
                order: 'desc',
                logType: t.$t('button.ser'),
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.select = res.data.content[0].rows || []
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },

    }
}
</script>
<style lang="scss" scoped>
.background {
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
    .backbox {
        position: relative;
        width: 800px;
        background-color: #fff;
        padding: 20px 20px 30px 20px;
        border-radius: 10px;
        .title-text {
            font-weight: bold;
            font-size: 14px;
            padding: 20px;
            padding-top: 0;
        }
        .btn {
            text-align: right;
        }
    }
}

.upd-goal {
    z-index: 1001;
}
</style>
