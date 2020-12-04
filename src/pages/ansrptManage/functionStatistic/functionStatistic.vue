<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_ansrptEmpSihf.functionStatistic.title')}}
                </p>
                <Row class="btnHeight">
                    <Select class="searchInput"
                            style="width: 200px"
                            v-model="selectedType"
                            :placeholder="selectStatus"
                            @on-change="changeStatus">
                        <Option :value="item.id"
                                v-for="(item,key) in selectStatusCloumns"
                                :key="key">{{item.status}}</Option>
                    </Select>
                    <span @dblclick="clearatsk"
                          v-if="autoTaskShow">
                        <Input class="searchInput"
                               v-model="userName"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="selectUser"
                               style="width: 200px"
                               @on-click="pickData" />
                    </span>
                    <span style="margin: 0;"
                          v-if="autoTaskShow">
                        <Button style="width:56px" type="info"
                                :loading="isSpin"
                                @click="getfunctionData"><span v-if="!isSpin">{{$t('lang_ansrptEmpSihf.functionStatistic.query')}}</span></Button></span>
                    <span style="margin: 0;"
                          v-if="queryPieShow"><Button type="primary"
                                @click="queryChart">{{$t('lang_ansrptEmpSihf.functionStatistic.statistics')}}</Button>
                    </span>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table stripe
                           :loading="loading"
                           :height="tableheight"
                           :no-data-text="noDataImg"
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          :current="page"
                          show-elevator
                          show-sizer
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <searchPubUser v-show="openPick"
                           @closeUp="close"
                           @changeinput="changeinput"
                           ref="searchPubUser"></searchPubUser>
        </transition>
        <transition name="fade">
            <showEchartPie v-show="openEchart"
                           :userId="userId"
                           :selectedType="selectedType"
                           @closeUp="closeEchart"
                           ref="showEchartPie"></showEchartPie>
        </transition>
    </div>
</template>
<script>
import searchPubUser from '../../../components/searchTable/searchPubUser'
import showEchartPie from './showEchartPie'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginData } from '../../../axios/axios'

export default {
    name: 'functionStatistic',
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            noDataImg: '<div id="noData"></div>',
            value: '',
            userId: '',
            selectedType: 2,
            userName: '',
            openPick: false,
            openEchart: false,
            autoTaskShow: false,
            queryPieShow: false,
            selectStatus: this.$t('lang_ansrptEmpSihf.functionStatistic.statusF'),
            selectUser: this.$t('lang_ansrptEmpSihf.functionStatistic.userInfo'),
            tableselected: [],
            selectStatusCloumns: [
                {
                    id: 0,
                    status: this.$t('lang_ansrptEmpSihf.functionStatistic.functionNode')
                }, {
                    id: 1,
                    status: this.$t('lang_ansrptEmpSihf.functionStatistic.userNode')
                }],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_ansrptEmpSihf.functionStatistic.functionNode'),
                    key: 'log_funname',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_ansrptEmpSihf.functionStatistic.visits'),
                    key: 'log_opttype',
                    sortable: 'custom',
                }
            ],
            data: [],
            total: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
        }
    },
    computed: {

    },
    components: {
        searchPubUser,
        showEchartPie,
    },
    methods: {
        getData () {
            const t = this;
            t.loading = true;
            t.isSpin = true;
            const data = {
                _mt:  this.$global.mt+'AnsrptSysLogs.getPage',
                log_userid: t.userId,
                APlogType: "查询",
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                userFunType: t.selectedType
            }
            if (0 == t.selectedType) {
                delete data.log_userid;
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.data = [];
            t.total = 0;
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res)
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
                t.isSpin = false;
            })
        },
        getfunctionData () {
            if (this.userName) {
                this.queryPieShow = true;
            }
            this.getData();
        },
        changeStatus () {
            let t = this;
            if (1 == t.selectedType) {
                t.autoTaskShow = true;
                t.queryPieShow = false;
                t.getData();
            }
            if (0 == t.selectedType) {
                t.autoTaskShow = false;
                t.queryPieShow = true;
                t.clearatsk();
                t.getData();
            }
        },
        queryChart () {
            this.openEchart = true;
            this.$refs.showEchartPie.getData();
        },
        closeEchart () {
            this.openEchart = false;
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
            this.tableselected = newArr.toString()
        },
        open () {
            const t = this
            t.opendialog = true
        },
        close () {
            const t = this
            t.openPick = false
        },
        changeinput (name, re, tr, yt, id) {
            const t = this;
            t.userName = name;
            t.userId = id;
        },
        pickData () {
            const t = this
            t.$refs.searchPubUser.getData()
            t.openPick = true
        },
        clearatsk () {
            const t = this
            t.userId = ''
            t.userName = ''
        },
    },
    mounted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.selectedType = ''
            t.data = ''
             t.getData()
        }
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
//
@import "../../../sass/table.scss";
  .searchInput{
    margin-right: 5px;
  }
  .ivu-btn{
    margin-right: 5px;
  }
/deep/ .ivu-table-cell {
    padding: 0 10px;
}
</style>
