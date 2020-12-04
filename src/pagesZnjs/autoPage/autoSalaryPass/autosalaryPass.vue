<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{'工资单'}}
                </p>
                <Row>
                    <Col>
                    <Row class="btnHeight">
                        <span @dblclick="clearDate(1)">
                            <DatePicker v-model="sPdate"
                                        type="month"
                                        format="yyyy-MM"
                                        placeholder="请选择开始年月"
                                        @on-change="monthChange"
                                        :editable="false"
                                        class="table_search_int pickData"></DatePicker>
                        </span>
                        <span @dblclick="clearDate(2)">
                            <DatePicker v-model="ePdate"
                                        type="month"
                                        format="yyyy-MM"
                                        placeholder="请选择结束年月"
                                        @on-change="monthChange"
                                        :editable="false"
                                        class="table_search_int pickData"></DatePicker>
                        </span>
                        <Button class="btns"
                                type="primary"
                                @click="search()">
                            <span>
                                {{'查询'}}
                            </span>
                        </Button>
                    </Row>
                    <Row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpinTable"
                              size="large"></Spin>
                        <Table @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               :no-data-text="noData"
                               size="small"
                               ref="selection"
                               :columns="columns"
                               stripe
                               :data="data"></Table>
                    </Row>
                    <Row type="flex">
                        <Page :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              :current='page'
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]">
                        </Page>
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                class="refresh"
                                @click="refresh">
                        </Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <autoSalary v-show="openSalaryModel"
                        @closeSalaryModel='closeSalaryModel'
                        ref="autoSalary"></autoSalary>
        </transition>
        <transition name="fade">
            <!-- <autoSalaryPassUpd v-if="openSalaryPassUpd"
                               @closeUpd='closeUpd'
                               :logType='logType'
                               @updataTable='updataTable'
                               @getUpData='getUpData'
                               ref="autoSalaryPassUpd"></autoSalaryPassUpd> -->

            <autoSalaryPassUpd v-show="openSalaryPassUpd"
                               @closeSalaryPassUpd='closeSalaryPassUpd'
                               :salaryId="salaryId"
                               :dataId="dataId"
                               ref="autoSalaryPassUpd"></autoSalaryPassUpd>
        </transition>
    </div>
</template>    
<script>
//请求方法
import { getDataLevelUserLoginData } from '@/axios/axios'
//功能方法
import { isSuccess, deepCopy } from '@/lib/util'
//表格共有数据
import { mixinTable } from '@/mixins/table';
// 薪资密码
import autoSalaryPassUpd from './autoSalaryPassUpd'
import autoSalary from './autoSalary';
export default {
    mixins: [mixinTable],
    name: 'autosalaryPass',
    data () {
        return {
            selectionAlldata: [],
            columns: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "所属公司",
                    key: "plsUnitidDis",
                    sortable: "custom",
                },
                {
                    title: "月份",
                    key: "plsSalcycle",
                    sortable: "custom",
                },
                {
                    title: '操作',
                    key: 'action',
                    width: '120',
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                attrs: {

                                },
                                on: {
                                    click: () => {
                                        this.openSalaryPassModel(params.row)
                                    },
                                },
                            }, '查看工资单'),
                        ])
                    }
                }
            ],
            salaryId: "",
            dataId: "",
            page: 1,
            rows: 10,
            sort: "id",
            order: "desc",
            total: NaN,
            data: [],
            noData: '<div id="noData"></div>',
            sPdate: "",
            ePdate: "",
            msg: "",
            //loading状态
            loading: false,
            //当前数据id
            updateId: NaN,
            //表格loading
            isSpinTable: false,
            //表格选中数据
            tableselected: [],
            // 密码弹窗状态
            openSalaryPassUpd: false,
            openSalaryModel: false,
        }
    },
    props: {
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        },
        empId () {
            return this.$store.state.user.empId;
        },
    },
    components: {
        autoSalaryPassUpd,
        autoSalary
    },
    mounted () {
        this.getData()
    },
    methods: {
        // 选择的数据
        selectedtable (selection) {
            // 定义一个空数组
            const newArr = [];
            // 遍历
            for (let i = 0; i < selection.length; i++) {
                // 添加到
                newArr.push(selection[i].id);
            }
            // 选中
            this.tableselected = newArr;
            // 选中的全数据
            this.selectionAlldata = selection
        },
        //刷新页面
        refresh () {
            const t = this;
            t.getData();
        },
        search () {
            const t = this;
            t.getData();
        },
        //获取页面数据
        getData () {
            const t = this
            t.isSpinTable = true
            let params = {
                _mt: this.$global.mt + "PayList.getView",
                APsort: "id",
                APorder: "desc",
                AProws: 10,
                APpage: 1,
                APffk: `glc${t.funId}`,
                APfunId: t.funId,
            };
            params.plsEmpid = t.empId;
            if (t.sPdate && t.sPdate !== "") {
                params.APsdate = new Date(t.sPdate).format('yyyy-MM')
            }
            if (t.ePdate && t.ePdate !== "") {
                params.APedate = new Date(t.ePdate).format('yyyy-MM')
            }
            getDataLevelUserLoginData(params).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.tableselected = []
                }
                t.isSpinTable = false
            }).catch(() => {
                t.isSpinTable = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //清空搜索条件
        clearDate (val) {
            const t = this;
            if (val === 1) {
                // 清空开始时间
                t.sPdate = "";

            } else if (val === 2) {
                // 清空结束时间
                t.ePdate = "";
            }
        },
        // 查看工资单
        openSalaryPassModel (val) {
            const t = this;
            t.salaryId = val.plsAccid;
            t.dataId = val.id;
            t.openSalaryPassUpd = true;
        },
        closeSalaryPassUpd (closeStatus) {
            const t = this
            t.openSalaryPassUpd = false;
            if (closeStatus === "ok") {
                t.openSalary()
            }
        },
        //日期月份修改
        monthChange (msg) {
            const t = this;
            if (t.sPdate && t.ePdate) {
                let sDate = (new Date(t.sPdate)).getTime();
                let eDate = (new Date(t.ePdate)).getTime();
                if (sDate >= eDate) {
                    t.ePdate = "";
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '开始年月不能大于结束年月',
                    })
                    return
                }
            }
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
        openSalary () {
            const t = this;
            t.openSalaryModel = true;
            t.$refs.autoSalary.lookSalary(t.salaryId, t.dataId);
        },
        closeSalaryModel () {
            const t = this;
            t.openSalaryModel = false;
        },
    },
    watch: {
    }

}
</script>
<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
</style>