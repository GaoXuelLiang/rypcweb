<template>
    <div class="table">
        <Row>
            <i-col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        班组信息管理
                    </p>
                    <Row>
                        <i-col span="20"
                               style="width:100% !important;">
                            <Row class="btnHeight">
                                <span>
                                    <Input placeholder="请输入班组编码"
                                           style="width: 200px"
                                           v-model="attTeamCode" />
                                </span>
                                <span>
                                    <Input placeholder="请输入班组名称"
                                           style="width: 200px"
                                           v-model="attTeamName" />
                                </span>
                                <span style="margin: 0;"><Button type="info"
                                            :loading="isSpin"
                                            @click="search()">{{$t('button.ser')}}</Button></span>
                                <Button type="warning"
                                        v-if="AccessControl.toString().includes('button_add')"
                                        @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
                                <Button type="error"
                                        v-if="AccessControl.toString().includes('button_del')"
                                        @click="deletemsg">{{$t('button.del')}}</Button>
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
    </div>
</template>
<script>
import update from './updateBase'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'teamMessage',
    components: {
        update,
    },
    data () {
        return {
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
                },
                {
                    title: '班组编码',
                    key: 'attTeamCode',
                    sortable: 'custom',
                },
                {
                    title: '班组名称',
                    key: 'attTeamName',
                    sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'attTeamHircompanyDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '轮次名称',
                    key: 'attTeamRoundName',
                    sortable: 'custom',
                },
                {
                    title: '轮次周期',
                    key: 'attTeamRoundNnm',
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    marginLeft: '5px',
                                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, '修改'),
                        ])
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
            attTeamCode: '',
            attTeamName: '',
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
            t.attTeamCode = ''
            t.attTeamName = ''
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
            const data = {
                _mt:  this.$global.mt+'AttendTeam.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                attTeamCode: t.attTeamCode,
                attTeamName: t.attTeamName,
                logType: this.$t('button.ser'),
            }
            if (page) {
                t.page = page
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
            //        t.data.unshift(res)
            t.getData()
        },
        updateArray (res) {
            const t = this
            //        t.data.splice(t.index, 1, res)
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
                            _mt:  this.$global.mt+'AttendTeam.delByIds',
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
            if (logType === this.$t('button.add')) {
                t.$refs.update.getCode()
            }
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
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
        // 点击选择搜索考核模板
        selectPerid () {
            const t = this;
            t.openSearchNormActive = true;
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
