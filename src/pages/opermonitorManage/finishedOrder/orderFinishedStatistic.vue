<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    &nbsp;{{$t('lang_operatmonitor.orderCountStatistic.title3')}}
                </p>
                <Row>
                    <i-col span="20"
                           style="width: 100% !important">
                        <Row>
                            <span @dblclick="dbHCompany">
                                <Input v-model="authorCompDis"
                                       style="width: 190px"
                                       icon="ios-search"
                                       :readonly="true"
                                       :placeholder="$t('lang_operatmonitor.orderCountStatistic.authorCompDis')"
                                       @on-click="selectHCompany" />
                            </span>
                            <Input :placeholder="$t('lang_operatmonitor.orderCountStatistic.orderTypeDis')"
                                   style="width: 200px"
                                   v-model="orderType" />
                            <span style="margin: 0;">
                                <Button :loading="isSpin"
                                        type="primary"
                                        @click="getData(1)">{{$t('button.ser')}}</Button>
                            </span>
                            <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        </Row>
                        <row class="table-form"
                             ref="table-form">
                            <Spin fix
                                  v-if="isSpin"
                                  size="large"></Spin>
                            <Table @on-select="selectedtable"
                                   @on-select-cancel="selectedtable"
                                   @on-sort-change="sortable"
                                   @on-select-all="selectedtable"
                                   @on-select-all-cancel="selectedtable"
                                   :height="tableheight"
                                   size="small"
                                   border
                                   ref="selection"
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
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                                    shape="circle"
                                    icon="md-refresh"
                                    style="margin-left: 20px;display: inline-block;"
                                    @click="getData(1)"></Button>
                        </Row>
                    </i-col>
                </Row>
            </card>
            </Col>
        </Row>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import advanced from '@/components/searchTable/searchAdvanced'
export default {
    name: 'orderFinishedStatistic',
    data () {
        return {
            isSpin: false,
            openHCompany: false,
            showAdvanced: false,
            tableheight: document.body.offsetHeight - 250,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.authorComp'),
                    key: 'authorCompDis',
                    //            sortable: 'custom',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.orderType'),
                    key: 'orderType',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.handleTeam'),
                    key: 'handleTeam',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.stdDltime'),
                    key: 'stdDltime',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.activeTime'),
                    key: 'activeTime',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.minHandletime'),
                    key: 'minHandletime',
                },
                {
                    title: this.$t('lang_operatmonitor.orderCountStatistic.maxHandletime'),
                    key: 'maxHandletime',
                },
            ],
            //      雇佣公司
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.compCnFullName'),
                    key: 'compFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.compEnFullName'),
                    key: 'compFnameEnDis',
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
            data: [],
            total: NaN,
            sort: 'orderType',
            order: 'asc',
            rows: 10,
            page: 1,
            index: 0,
            logType: '',
            authorComp: '',
            authorCompDis: '',
            orderType: '',
        }
    },
    components: {
        searchHCompany,
        advanced,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.authorComp = ''
            t.authorCompDis = ''
            t.orderType = ''
            t.getData(1)
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
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptCmutWorkoerder.getFinishedOrder',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                funId: '1',
                authorComp: t.authorComp,
                orderType: t.orderType,
                logType: '查询List',
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        inputHCompany (name, id) {
            const t = this
            t.authorCompDis = name
            t.authorComp = id
        },
        dbHCompany () {
            const t = this
            t.authorCompDis = ''
            t.authorComp = ''
        },
        // 表格操作发请求
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
.colTree {
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    padding-left: 10px;
    overflow: auto;
    border: 1px #efefef solid;
}
</style>
