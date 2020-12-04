<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    考勤基础项目
                </p>
                <!-- v-if="AccessControl.toString().includes('button_add')" -->
                <!--  v-if="AccessControl.toString().includes('button_del')" -->
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row class="btnHeight">
                        <span>
                            <Input placeholder="请输入项目编号"
                                   style="width: 200px"
                                   v-model="form.attShifCode" />
                        </span>
                        <span>
                            <Input placeholder="请输入项目名称"
                                   style="width: 200px;margin-left:5px"
                                   v-model="form.attShifName" />
                        </span>
                        <span style="margin-left: 5px;"><Button type="info"
                                    :loading="isSpin"
                                    @click="search()">{{$t('button.ser')}}</Button></span>
                        <!--<Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>-->
                        <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               :loading='loading'
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
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUpd="closeUpd"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
    </div>
</template>
<script>
import update from './update'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceSet',
    components: {
        update,
    },
    data () {
        return {
            isSpin: false,
            loading: false,
            openSearchNormActive: false,
            tableheight: document.body.offsetHeight - 240,
            logType: '',
            openUpdate: false,
            tableselected: [],
            form: {
                id: '',
                attShifName: '', // 班次编号
                attShifCode: '', // 班次
            },
            columns: [
                //          {
                //            type: 'selection',
                //            width: 60,
                //            align: 'center',
                //          },
                {
                    title: '项目编号',
                    key: 'attBsitNo',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '项目名称',
                    key: 'attBsitName',
                },
                {
                    title: '项目说明',
                    key: 'attBsitDesc',
                },
                {
                    title: '单位',
                    key: 'attBsitUnitDis',
                },
                //          {
                //            title: this.$t('button.opr'),
                //            key: 'action',
                //            align: 'center',
                //            fixed: 'right',
                //            width: 100,
                //            render: (h, params) => {
                //              return h('div', [
                //                h('Button', {
                //                  props: {
                //                    type: 'info',
                //                    size: 'small',
                //                  },
                //                  style: {
                ////                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                //                  },
                //                  on: {
                //                    click: () => {
                //                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                //                    },
                //                  },
                //                }, '修改'),
                //              ])
                //            },
                //          },
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
            t.form.attShifCode = ''
            t.form.attShifName = ''
            t.getData(1)
        }
    },
    methods: {
        refresh () {
            this.getData()
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            t.loading = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AttendBaseitem.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: t.$t('button.ser'),
                attBsitNo: t.form.attShifCode,
                attBsitName: t.form.attShifName,
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
                .finally(() => {
                    t.loading = false
                    t.isSpin = false
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
                            _mt:  this.$global.mt+'AttendBaseitem.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
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
        openUp (id, logType, index) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            t.index = index
            t.$refs.update.getSelect()
            // 获取编号
            if (logType === this.$t('button.add')) {
                //          t.$refs.update.getCode()
            }
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
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
