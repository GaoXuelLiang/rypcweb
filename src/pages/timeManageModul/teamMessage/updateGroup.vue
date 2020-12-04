<template>
    <div class="option-main">
        <Row>
            <Form :model="form"
                  label-position="right"
                  :rules="ruleValidate"
                  ref="form"
                  :label-width="120">
                <Row>
                    <i-col span="10">
                        <FormItem label="班组编码"
                                  prop='attTeamCode'>
                            <Input v-model="form.attTeamCode"
                                   disabled
                                   placeholder="班组编码"></Input>
                        </FormItem>
                    </i-col>
                    <!--<i-col span="10" offset="1">-->
                    <!--<FormItem label="班组名称" prop='attTeamName'>-->
                    <!--<Input v-model="form.attTeamName" placeholder="请输入班组名称"></Input>-->
                    <!--</FormItem>-->
                    <!--</i-col>-->
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="公司"
                                  prop='attTeamHircompany'>
                            <span @dblclick="dbPost('attTeamHircompany')">
                                <Input v-model="form.attTeamHircompanyDis"
                                       style="width: 100%;;"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder='请选择公司'
                                       @on-click="opencompetType('attTeamHircompany')" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="班组名称"
                                  prop='attTeamName'>
                            <Input v-model="form.attTeamName"
                                   placeholder="请输入班组名称"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="轮次名称">
                            <span @dblclick="clearTeam">
                                <Input v-model="form.attTeamRoundName"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择轮次"
                                       @on-click="pickLunci" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="轮次周期"
                                  prop='attTeamRoundNnm'>
                            <span>
                                <Input v-model="form.attTeamRoundNnm"
                                       disabled
                                       placeholder="轮次周期" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注"
                                  prop="interviewertPscope">
                            <Input v-model="form.comment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
        </Row>
        <Button class="btn"
                :loading="isSpin"
                type="primary"
                @click="save">{{$t('button.sav')}}</Button>

        <!-- 轮次 -->
        <transition name="fade">
            <searchTeam v-show="openPickTeam"
                        :comId="form.attTeamHircompany"
                        @closeEmp="closeTeam"
                        @inputEmp="inputTeam"
                        ref="searchTeam"></searchTeam>
        </transition>
        <!-- 班次 -->
        <transition name="fade">
            <searchEmpMaster v-show="openPickUser"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"
                             :num='num'></searchEmpMaster>
        </transition>
        <!-- 弹出搜索 -->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="modiaContent"
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import searchTeam from '../../../components/searchTable/searchAttendanceTeam'
import searchEmpMaster from '../../../components/searchTable/searchAttendanceRota'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            showModal: false, // 弹出搜索
            modiaContent: '', // 弹出搜索
            dataParame: {}, // 弹出搜索
            searchType: '', // 弹出搜索
            isSpin: false,
            select: [],
            form: {
                attTeamHircompany: '',
                attTeamHircompanyDis: '',
                attTeamCode: '',
                attTeamName: '',
                attTeamRoundName: '',
                attTeamRoundNnm: '',
                comment: '',
            },
            page: 1,
            sihfpcyAreaName: '',
            // 点击给考核模板弹窗传参调接口
            params: {
                _mt:  this.$global.mt+'RecruiteInterviewert.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            ruleValidate: {
                attTeamHircompany: [
                    { required: true, message: '请选择公司', trigger: 'change' },
                ],
                attTeamCode: [
                    { required: true, message: '班次编码', trigger: 'blur' },
                ],
                attTeamName: [
                    { required: true, message: '请输入班组名称', trigger: 'blur' },
                ],
                // attTeamRoundName: [
                //   {required: true, message: '请选择轮次', trigger: 'change'},
                // ],
            },
            openPickUser: false,
            openPickTeam: false,
            num: 0,
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchTeam,
        searchEmpMaster,
    },
    mounted () {
        //      this.getSelect()
    },
    methods: {
        // 获取编号
        getCode () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'AttendTeam.getCode',
                logType: '获取编号',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.form.attTeamCode = res.data.content[0].value;
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getdata (id) {
            if (id) {
                const t = this
                const params = {
                    _mt:  this.$global.mt+'AttendTeam.getById',
                    id: id,
                    logType: '根据id查询',
                    funId: '1'
                }
                getDataLevelUserLogin(params).then((res) => {
                    if (isSuccess(res, t)) {
                        t.form = res.data.content[0]
                        this.$emit('newdata', res.data.content[0])
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        save () {
            const t = this
            const data = deepCopy(t.form)
            data._mt =  this.$global.mt+'AttendTeam.addOrUpd'
            data.logType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    if (t.id) data.id = t.id
                    //            if (t.logType === '修改') {
                    //              data.id = t.id
                    //            } else {
                    //              if(data.id) delete data.id
                    //            }
                    if (data.createTime) delete data.createTime
                    if (data.createBy) delete data.createBy
                    if (data.deleteFlag) delete data.deleteFlag
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: '保存成功',
                                })
                                //                  this.$emit('setId', Number(res.data.content[0].id))
                                this.$emit('newdata', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                this.$emit('setId', res.data.content[0])
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
            let t = this
            t.form = {
                attTeamHircompany: '',
                attTeamHircompanyDis: '',
                attTeamCode: '',
                attTeamName: '',
                attTeamRoundName: '',
                attTeamRoundNnm: '',
                comment: '',
            }
            t.$refs.form.resetFields();
        },
        /**
         * 选择轮次
         */
        pickLunci () {
            const t = this;
            if (!t.form.attTeamHircompany) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择公司',
                })
                return
            }
            t.$refs.searchTeam.getData();
            t.openPickTeam = true;
        },
        closeTeam () {
            const t = this
            t.openPickTeam = false
        },
        inputTeam (row) {
            this.form.attTeamRoundName = row.attRdsfName
            this.form.attTeamRoundNnm = row.attRdsfPeriod
            this.form.attTeamRoundid = row.id
            //        this.form.attTeamShiftName = row.attShifName
        },
        clearTeam () {
            const t = this
            this.$refs.form.resetFields()
            //        t.upFormData.rinterviewerPno = '';
        },
        /**
         * 选择班次
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
            this.form.attTeamShiftid = row.id
        },
        clearUserid () {
            const t = this
            this.$refs.form.resetFields()
            //        t.upFormData.rinterviewerPno = '';
        },
        /*
       *  弹出选择
       */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.searchType = type
            switch (type) {
                case 'attTeamHircompany':
                    t.dataParame = {
                    }
                    t.modiaContent = 'org-org-std'
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.searchType) {
                case 'attTeamHircompany':
                    t.setData(t.searchType, t.searchType + 'Dis', row.id, row.unitsName)
                    break
            }
        },
        setData (searchType, searchTypeDis, NewId, name) {
            this.form[searchType] = NewId
            this.form[searchTypeDis] = name
            console.log(111, this.form)
        },
        dbPost (searchType) {
            this.form[searchType] = ''
            this.form[searchType + 'Dis'] = ''
            console.log(222, this.form)
        },

    },
}
</script>
<style lang="scss" scoped>
.option-main {
    position: relative;
    height: 500px;
    overflow: scroll;
    .btn {
        float: right;
        margin-right: 26px;
    }
}
</style>
