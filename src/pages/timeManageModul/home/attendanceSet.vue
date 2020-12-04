<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    员工排班查询
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row>
                        <span @dblclick="clearTeam">
                            <Input @on-click="pickDataTeam"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择班组"
                                   style="width: 200px"
                                   v-model="form.attTeamName" />
                        </span>
                        <!--<span @dblclick="clearPeriod">-->
                        <!--&lt;!&ndash;<Input @on-click="pickDataPeriod"  icon="ios-search" :readonly="true"&ndash;&gt;-->
                        <!--&lt;!&ndash;placeholder="请选择期间"&ndash;&gt;-->
                        <!--&lt;!&ndash;style="width: 200px" v-model="sicalcPeriodDis"/>&ndash;&gt;-->

                        <DatePicker type="date"
                                    placeholder="开始时间"
                                    style="width: 200px"
                                    v-model="form.QSdate"></DatePicker>
                        <DatePicker type="date"
                                    placeholder="结束时间"
                                    style="width: 200px"
                                    v-model="form.QEdate"></DatePicker>
                        <!--</span>-->
                        <!--<span>-->
                        <!--<Input placeholder="请输入班次名称" style="width: 200px" v-model="form.attShifName"/>-->
                        <!--</span>-->
                        <span style="margin: 0;"><Button type="primary"
                                    :loading="isSpin"
                                    @click="search()">{{$t('button.ser')}}</Button></span>
                        <!--  v-if="AccessControl.toString().includes('button_export')" -->
                        <Button type="primary"
                                @click="expData">{{$t('button.exp')}}</Button>
                        <!--<Button type="primary" v-if="AccessControl.toString().includes('button_add')" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>-->
                        <!--<Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>-->
                        <!--<Button type="primary" v-if="AccessControl.toString().includes('button_copygroup')" @click="showMsgBtn">复制集团</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex">
                        <Row style="display: flex">
                            <Page :total="total"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  placement="top"
                                  :current="page"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size-opts="[10, 20, 50, 100]">
                            </Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        </Row>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    :attEmpsfPeriod='sicalcPeriod'
                    :qijian='qijian'
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>

        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <!-- 复制集团 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       ref="staffPage"
                       @getData="getData"
                       @hideMsg="hideMsg"></staffPage>
        </transition>

        <!--选择班组-->
        <transition name="fade">
            <searchFyteam v-show="openPickTeam"
                          @closeUp="closeTeam"
                          @changeinput="changeinputTeam"
                          ref="searchFyteam"></searchFyteam>
        </transition>
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
    </div>
</template>
<script>
import staffPage from './staffPage'
import update from './paySalplanView'
import searchFyteam from '../../../components/searchTable/searchFyteam'
import advanced from '@/components/searchTable/searchAdvanced'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceStasffss',
    components: {
        staffPage,
        update,
        advanced,
        searchFyteam,
        expwindow,
        expdow,
    },
    data () {
        return {
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            openPickTeam: false,
            showMsg: false,
            isSpin: false,
            openSearchNormActive: false,
            showAdvanced: false,
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            openUpdate: false,
            tableselected: [],
            sicalcPeriod: '',
            sicalcPeriodDis: '',
            updateId: '',
            qijian: '',
            form: {
                id: '',
                QSdate: '', // 开始时间
                QEdate: '', // 结束时间
                attTeamName: '', // 班组名称
                teamid: '',  // 班组id
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    //            align: 'center',
                },
                {
                    title: '期间',
                    key: 'attRddlPeriod',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '员工姓名',
                    key: 'attTmmemEmpidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'attTmmemCompidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attTmmemDeptidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '班组名称',
                    key: 'attTeamName',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '排班日期',
                    key: 'attRddlDate',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '班次名称',
                    key: 'attShifName',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '上班时间',
                    key: 'attShifSworktime',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '下班时间',
                    key: 'attShifEworktime',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '日期类型',
                    key: 'attRddlDatetypeDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 120,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    //                    icon: 'calendar',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, '排班明细', params.index, params.row.attEmpsfPeriod)
                                    },
                                },
                            }, '排班明细'),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            AccessControl: [],
            expDataTital: [
                { code: 'attRddlPeriod', name: '期间' },
                { code: 'attTmmemEmpidDis', name: '员工姓名' },
                { code: 'attTmmemCompidDis', name: '公司' },
                { code: 'attTmmemDeptidDis', name: '部门' },
                { code: 'attTeamName', name: '班组名称' },
                { code: 'attRddlDate', name: '排班日期' },
                { code: 'attShifName', name: '班次名称' },
                { code: 'attShifSworktime', name: '上班时间' },
                { code: 'attShifEworktime', name: '下班时间' },
                { code: 'attRddlDatetypeDis', name: '日期类型' },
            ],
        }
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.form.QSdate = ''
            t.form.QEdate = ''
            t.form.attTeamName = ''
            t.getData(1)
            t.getBtn()
        }
    },
    methods: {
        getBtn () {
            const t = this
            this.btnControl(this).then((res1) => {
                if (isSuccess(res1, t)) {
                    res1.data.content[0].value.forEach((item) => {
                        t.AccessControl.push(item.btnLancode)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        refresh () {
            this.getData()
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'ViewEmpshifts.getPageForComplexQuery',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: t.$t('button.ser'),
                QSdate: t.form.QSdate,
                QEdate: t.form.QEdate,
                teamid: t.form.teamid,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.data = []
            t.total = 0
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    //            this.btnControl(this).then((res1) => {
                    //              if (isSuccess(res1, t)) {
                    //                res1.data.content[0].value.forEach((item) => {
                    //                  t.AccessControl.push(item.btnLancode)
                    //                })
                    //              }
                    //            }).catch((err) => {
                    //              console.log(err)
                    //            })
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 新增修改后刷新页面
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        openUp (id, logType, index, PeriodDiss) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            t.$refs.update.TransformationMode(2)
            t.$refs.update.getTable()
            t.$refs.update.getSelectDate()
            t.$refs.update.getBanName()
            // Bus.$emit('onChange', id)
            //        t.$refs.update.getSelect()
            if (logType === '排班明细') {
                t.$refs.update.getTime(id, PeriodDiss.substr(0, 4) + PeriodDiss.substr(4))
                t.$refs.update.getDetail(id)
            } else {
                this.qijian = t.sicalcPeriodDis // 期间
                t.$refs.update.getTime(id, t.sicalcPeriodDis)
            }
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.planId = ''
            // t.$refs.update.formValidate = ''
        },
        expData () {
            const data = {}
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'ViewEmpshifts.export', data)
            this.openExp = true
        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirmdelete'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'AttendShift.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        search () {
            this.page = 1
            this.getData()
        },
        /**
         * @name: 复制集团
         * @param {type}
         * @return:
         */
        showMsgBtn () {
            const t = this
            t.showMsg = true
            t.logType = '复制集团'
            t.$refs.staffPage.getData()
        },
        hideMsg () {
            let t = this
            t.showMsg = false
        },


        // 轮次弹出框start
        clearTeam () {
            const t = this
            t.form.attTeamName = ''
            t.form.teamid = ''
        },

        closeTeam () {
            const t = this
            t.openPickTeam = false
        },

        changeinputTeam (arrDis, arr) {
            const t = this
            console.log(arrDis[0])
            console.log(arr[0])
            t.form.attTeamName = arrDis.join(',')
            t.form.teamid = arr.join(',')
        },

        pickDataTeam () {
            const t = this
            this.$refs.searchFyteam.getData()
            this.openPickTeam = true
        },

    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
