<template>
    <div class="table">
        <Row>
            <i-col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        排班轮次管理
                    </p>
                    <Row>
                        <i-col span="20"
                               style="width:100% !important;">
                            <Row class="btnHeight">
                                <span>
                                    <Input placeholder="请输入轮次名称"
                                           style="width: 200px"
                                           v-model="attRdsfName" />
                                </span>
                                <span>
                                    <Input placeholder="请输入轮次周期"
                                           style="width: 200px"
                                           v-model="attRdsfPeriod" />
                                </span>
                                <!-- <span style="margin: 0;"><Button type="info" :loading="isSpin" 
                                               @click="search()">{{$t('button.ser')}}</Button></span> -->
                                <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
              <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>
              <Button type="primary" v-if="AccessControl.toString().includes('button_copygroup')" @click="showMsgBtn">复制集团</Button> -->
                                <btn-list @operatorBtn="operatorBtn"
                                          @openUp="btnEvent"></btn-list>
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
                                       stripe
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
                        </i-col>
                    </Row>
                </card>
            </i-col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!-- 复制集团 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       ref="staffPage"
                       @getData="getData"
                       @hideMsg="hideMsg"></staffPage>
        </transition>
    </div>
</template>
<script>
import staffPage from './staffPage'
import update from './updateBase'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'attendanceRota',
    components: {
        staffPage,
        update,
        btnList
    },
    data () {
        return {
            showMsg: false,
            isSpin: false,
            checkTemplate: '',
            openSearchNormActive: false,
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            openUpdate: false,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '轮次名称',
                    key: 'attRdsfName',
                    width: 140,
                    sortable: 'custom',
                    fixed: 'left',
                },
                {
                    title: '公司',
                    key: 'attRdsfHircompanyDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '节假日规则',
                    key: 'attRdsfHolidayruleDis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次周期类型',
                    key: 'attRdsfPeriodtypeDis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次周期(天)',
                    key: 'attRdsfPeriod',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次开始时间',
                    key: 'attRdsfStartdateDis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次01',
                    key: 'attRdsfR01Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次02',
                    key: 'attRdsfR02Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次03',
                    key: 'attRdsfR03Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次04',
                    key: 'attRdsfR04Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次05',
                    key: 'attRdsfR05Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次06',
                    key: 'attRdsfR06Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次07',
                    key: 'attRdsfR07Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次08',
                    key: 'attRdsfR08Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次09',
                    key: 'attRdsfR09Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次10',
                    key: 'attRdsfR10Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次11',
                    key: 'attRdsfR11Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次12',
                    key: 'attRdsfR12Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次13',
                    key: 'attRdsfR13Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次14',
                    key: 'attRdsfR14Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次15',
                    key: 'attRdsfR15Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次16',
                    key: 'attRdsfR16Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次17',
                    key: 'attRdsfR17Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次18',
                    key: 'attRdsfR18Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次19',
                    key: 'attRdsfR19Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次20',
                    key: 'attRdsfR20Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次21',
                    key: 'attRdsfR21Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次22',
                    key: 'attRdsfR22Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次23',
                    key: 'attRdsfR23Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次24',
                    key: 'attRdsfR24Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次25',
                    key: 'attRdsfR25Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次26',
                    key: 'attRdsfR26Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次27',
                    key: 'attRdsfR27Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次28',
                    key: 'attRdsfR28Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次29',
                    key: 'attRdsfR29Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次30',
                    key: 'attRdsfR30Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '轮次31',
                    key: 'attRdsfR31Dis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        // return h('div', [
                        //   h('Button', {
                        //     props: {
                        //       type: 'info',
                        //       size: 'small',
                        //     },
                        //     style: {
                        //       display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                        //       },
                        //     },
                        //   }, '修改'),
                        // ])
                    },
                },
            ],
            // 点击给考核模板弹窗传参调接口
            params: {
                _mt:  this.$global.mt+'AttendRoundshift.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            attRdsfName: '',
            attRdsfPeriod: '',
            AccessControl: [],
            btnArr: [] // 表格列按钮
        }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.attRdsfName = ''
            t.attRdsfPeriod = ''
            t.getData(1)
        }
    },
    methods: {
        // 操作按钮渲染
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : 'primary',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                this.openUp(params.row.id, item.name, params.index)
                            },
                        },
                    }, item.name),
                )
            })
            return arr
        },
        // 动态获取操作按钮
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
        // 按钮绑定事件
        btnEvent (code) {
            switch (code) {
                case 'button_add':
                    this.openUp(NaN, this.$t('button.add'))
                    break;
                case 'button_del':
                    this.deletemsg()
                    break;
                case 'button_export':
                    this.expData()
                    break;
                case 'button_import':
                    this.importExcel()
                    break;
                case 'button_query':
                    this.search()
                    break;
            }
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
                _mt:  this.$global.mt+'AttendRoundshift.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                attRdsfName: this.attRdsfName,
                attRdsfPeriod: this.attRdsfPeriod,
                logType: this.$t('button.ser'),
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.data = [];
            t.total = 0;
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    this.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addNewArray (res) {
            const t = this
            // t.data.unshift(res)
            t.getData()
        },
        updateArray (res) {
            const t = this
            // t.data.splice(t.index, 1, res)
            t.getData()
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
                            _mt:  this.$global.mt+'AttendRoundshift.delByIds',
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
                    onCancel: () => {
                    },
                })
            }
        },
        openUp (id, logType, index) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            t.index = index
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            } else if (logType === this.$t('button.add')) {
                // t.$refs.update.getData('');
            }
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            // t.$refs.update.upFormData.id = '';
        },
        search () {
            this.page = 1
            this.getData()
        },
        // renderContent(h, { root, node, data }) {
        //   return h('span', {
        //     style: {
        //       display: 'inline-block',
        //       width: '100%',
        //     },
        //   }, [
        //      h('Button', {
        //          props: {
        //          type: 'text',
        //          size: 'small',
        //          },
        //         on: {
        //            click: () => { this.selectChange(data) },
        //         },
        //      }, [
        //       h('Icon', {
        //         props: {
        //           type: data.cityType === '01prov' ? 'android-home' : data.cityType === '02city' ? 'android-locate' : data.cityType === '03county' ? 'android-pin' : 'home',
        //           size: '15',
        //           color: data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff',
        //         },
        //         style: {
        //           marginRight: '8px',
        //         },
        //       }),
        //       h('span', data.title),
        //       ]),
        //     ])
        // },
        // 点击选择搜索考核模板
        selectPerid () {
            const t = this;
            t.openSearchNormActive = true;
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
.ivu-input-wrapper,
.ivu-btn {
    margin-right: 5px;
}
</style>
