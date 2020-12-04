<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    合同协议管理
                </p>
                <Row class="btnHeight">
                    <Input :placeholder="$t('lang_employee.empContractList.empctWorkNoDis')"
                           style="width: 200px"
                           v-model="empctWorkNoDis" />
                    <Input :placeholder="$t('lang_employee.empContractList.empctNameDis')"
                           style="width: 200px"
                           v-model="empctNameDis" />
                    <!-- <span style="margin: 0;"><Button type="info" :loading="isSpin" 
                                           @click="getData(1)">{{$t('button.ser')}}</Button></span> -->
                    <!-- <span style="margin: 0;"><Button v-if="AccessControl.toString().includes('button_alteration')" type="primary" @click="contractChange">合同变更</Button></span> -->
                    <!--          <span style="margin: 0;"><Button type="primary" @click="contractChange(1)">合同主体变更</Button></span>-->
                    <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    <btnList @operatorBtn="operatorBtn"
                             @openUp="btnEvent"
                             ref="btnList"></btnList>
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
                           :no-data-text="noDataImg"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          :current="page"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page * rows > total ? total : page * rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
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
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import update from './empContractEdit'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'empContractList',
    data () {
        return {
            isSpin: false,
            noDataImg: '<div id="noData"></div>',
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_employee.empContractList.empctWorkNo'),
                    key: 'empctWorkNoDis',
                    width: 100,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctName'),
                    key: 'empctNameDis',
                    width: 70,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctHirecompany'),
                    key: 'empctHirecompanyDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.empContractList.empctDept'),
                    key: 'empctDeptDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.empContractList.empctContracttype'),
                    key: 'empctContracttypeDis',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctContractperiod'),
                    key: 'empctContractperiodDis',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctContractsdate'),
                    key: 'empctContractsdate',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctContractedate'),
                    key: 'empctContractedate',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctProbation'),
                    key: 'empctProbationDis',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empContractList.empctProbationdate'),
                    key: 'empctProbationdate',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            empctWorkNoDis: '',
            empctNameDis: '',
            AccessControl: [],
            showAdvanced: false,
            btnArr: []
        }
    },
    computed: {},
    components: {
        update,
        advanced,
        btnList,
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
            t.empctWorkNoDis = ''
            t.empctNameDis = ''
            t.getData(1)
            t.$refs.update.getSelect()
        }
    },
    methods: {
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            t.$refs.btnList.loading = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt: this.$global.mt + 'EmpContract.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                empctWorkNoDis: t.empctWorkNoDis,
                empctNameDis: t.empctNameDis,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                t.isSpin = false
                t.$refs.btnList.loading = false
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
                t.$refs.btnList.loading = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
                t.$refs.btnList.loading = false
            })
        },
        /**
         * 排序
         * @param column
         */
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
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : 'info',
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
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
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
                case 'button_pinyin':
                    this.send()
                    break;
                case 'button_alteration':
                    this.contractChange()
                    break;
                case 'button_query':
                    this.getData(1)
                    break;
            }
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
        /**
         * 打开编辑页面
         * @param id
         * @param logType
         * @param index
         */
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getData(id)
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.selection.selectAll(false)
        },
        contractChange (ind) {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '选择变更的数据',
                })
            } else if (t.tableselected.length > 1) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '只能选择一条数据',
                })
            } else {
                t.updateId = parseInt(t.tableselected.toString(), 10)
                t.logType = '修改'
                t.openUpdate = true
                // t.index = index
                t.$refs.update.getData(Number(t.tableselected.toString()), ind)
                t.tableselected = []
            }
        },
        updateArray (res) {
            const t = this
            t.data.forEach((item, index) => {
                if (item.id === res.id) {
                    t.data[index] = res
                    this.$refs.selection.$refs.tbody.objData[index]._isChecked = false
                }
            })
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
.ivu-input-wrapper {
    margin-right: 5px;
}
</style>
