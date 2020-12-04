<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_role.adminpminfo.pminfotitle')}}
                </p>
                <Row class="btnHeight">
                    <Input v-model="paramCode"
                           :placeholder="$t('lang_role.adminpminfo.pparamCode')"
                           style="width: 200px" />
                    <span @dblclick="clear">
                        <Input v-model="paramName"
                               :placeholder="$t('lang_role.adminpminfo.pparamName')"
                               icon="ios-search"
                               :readonly="true"
                               style="width: 200px;margin-left:5px"
                               @on-click="pickData" />
                    </span>
                    <Input v-model="paramInfoName"
                           :placeholder="$t('lang_role.adminpminfo.pparamInfoName')"
                           style="width: 200px;margin-left:5px" />
                    <span style="margin-left: 5px;"><Button type="info"
                                :loading="isSpin"
                                @click="getData(1)" style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <Button type="warning"
                            style="margin-left: 5px;"
                            @click="openUp(NaN,$t('button.add'),0)">{{$t('button.add')}}</Button>

                    <Button type="error"
                            style="margin-left: 5px;"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-sort-change="sortable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           :loading='loading'
                           size="small"
                           stripe
                            :no-data-text="noDataImg"
                           ref="selection"
                           :columns="columns"
                           :data="data"
                           :height='tableheight'></Table>
                </row>
                <Row style="display: flex">
                    <Page :current="page"
                          :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                    <Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="closeUp"
                         @changeinput="changeinput"
                         @clear="clear"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
import update from './updateParamInfo'
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchParamType'

export default {
    name: 'baseParamInfo',
    data () {
        return {
               noDataImg: '<div id="noData"></div>',
            isSpin: false,
            loading: false,
            tableheight: document.body.offsetHeight - 240,
            value: '',
            logType: '',
            openUpdate: false,
            openPick: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminpminfo.paramCode'),
                    key: 'paramCode',
                    sortable: 'custom',
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminpminfo.paramTypeDis'),
                    key: 'paramTypeDis',
                    sortable: 'custom',
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminpminfo.paramInfoName'),
                    key: 'paramInfoName',
                    sortable: 'custom',
                    //          width: 150,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                        ])
                    },
                },
            ],
            data: [],
            total: NaN, // 总页数
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            paramCode: '',
            paramType: '',
            paramName: '',
            paramInfoName: '',
        }
    },
    computed: {},
    components: {
        update,
        searchTable,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.paramCode = ''
            t.paramType = ''
            t.paramName = ''
            t.paramInfoName = ''
            t.getData(1)
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
    methods: {
        getData (page) {
            const t = this
            t.loading = true
            t.isSpin = true
            if (page) {
                t.page = page
            }
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getParamInfoByPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                paramCode: t.paramCode,
                paramType: t.paramType,
                paramInfoName: t.paramInfoName,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false
                t.isSpin = false
            })
        },
        changeinput (name, id) {
            const t = this
            t.paramName = name
            t.paramType = id
        },
        clear () {
            const t = this
            t.paramName = ''
            t.paramType = ''
        },
        pickData () {
            this.$refs.searchTable.getData()
            this.openPick = true
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
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData(1)
            } else {
                this.order = 'desc'
            }
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr.toString()
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
                            _mt:  this.$global.mt+'BaseParamInfo.delByIds',
                            funId: '1',
                            companyId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected,
                        }).then((res) => {
                            if (isSuccess(res, t)) {
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
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(t.updateId)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.$refs.searchTable.pmtypeCode = ''
            t.$refs.update.paramName = ''
            t.$refs.update.formValidate.paramType = ''
            t.$refs.update.formValidate.paramCode = ''
            t.$refs.update.formValidate.paramInfoName = ''
            t.$refs.update.formValidate.comment = ''
            t.$refs.update.formValidate.paramInfoCn = ''
            t.$refs.update.paramTypeDis = ''
            t.$refs.update.formValidate.paramInfoEn = ''
            t.openUpdate = false
            t.openPick = false
        },
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
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
