<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    &nbsp;{{titleName}}
                </p>
                <Row>
                    <span v-for="(item, index) in searchInp"
                          :key="index + 'c'"
                          @dblclick.stop="clear(item.clmLayout, item.id)">
                        <DatePicker v-if="item.clmLayout == 22"
                                    v-model="item.name"
                                    type="month"
                                    format="yyyy-MM"
                                    :placeholder="'请选择' + item.clmDname"
                                    @on-change="monthChange(item)"
                                    :editable="false"
                                    style="width: 150px;"></DatePicker>
                        <Input v-if="item.clmLayout == 1"
                               v-model="item.name"
                               :placeholder="'请输入'+ item.clmDname"
                               type="text"
                               style="width: 150px;margin:3px" />
                        <Input v-else-if="item.clmLayout == 13"
                               v-model="item.name"
                               @on-click="pickData(item.clmSelOptMark,index)"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="'请选择'+ item.clmDname"
                               style="width: 150px;margin:3px" />
                        <Select v-else-if="item.clmLayout == 12"
                                v-model="item.name"
                                :placeholder="'请选择'+ item.clmDname"
                                style="width: 150px;margin:3px"
                                clearable>
                            <Option :value="ite.key"
                                    v-for="(ite,index3) in item.dataList"
                                    :key="index3">{{ite.value}}</Option>
                        </Select>
                    </span>
                    <span>
                        <Select v-model="stateValue"
                                style="width: 150px"
                                placeholder="选择流程状态"
                                clearable>
                            <Option :value="ite.key"
                                    v-for="(ite,index1) in stateList"
                                    :key="index1">{{ite.value}}</Option>
                        </Select>
                    </span>
                    <Button class="btns"
                            v-for="(item, index2) in btns"
                            :key="index2"
                            :type="item.btn_id === 'button_del' ? 'error':'primary'"
                            @click="btnFunction(item.btn_id)">{{item.btn_title}}</Button>
                    <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Spin fix
                          v-if="isSpin"
                          size="large"></Spin>
                    <Spin fix
                          v-if="isSpinTable"
                          size="large"></Spin>
                    <Table @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           border
                           :height="tableheight"
                           size="small"
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
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]">
                    </Page>
                    <Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="refresh">
                    </Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <selCountry v-show="openSelCountry"
                        selSort="id"
                        selOrder="asc"
                        @selOk="countrySelOk"
                        @close="closeSelCountry"
                        ref="selCountry"></selCountry>
        </transition>
        <commonFlowUpdate v-if="openTestUpd"
                          @close="closeTest"
                          ref="commonFlowUpdate"
                          @getData="getData"
                          :columns="columns"
                          :flowId="flowId"
                          :pkValue="pkValue"
                          :stepId="stepId"
                          :setpName="stepName"
                          :stepState="stepState"
                          :stepOrder="stepOrder"
                          :payproPeriod="payproPeriod">
        </commonFlowUpdate>
        <autoSearchtable autoTableType="unit"
                         v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="modiaContent"
                         @changeinput="changeinput">
        </autoSearchtable>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import selCountry from '../../../components/commonsel/selCountry'
import advanced from '@/components/searchTable/searchAdvanced'
import commonFlowUpdate from './commonFlowUpdate'
import autoSearchtable from '../searchTable/autoSearchtable'

export default {
    name: 'commonFlowList',
    data () {
        return {
            isSpinTable: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 280,
            value: '',
            logType: '',
            showAdvanced: false,
            openUpdate: false,
            openTestUpd: false,
            updateId: NaN,
            tableselected: [],
            columns: [],
            tbName: '',
            btns: [],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: '10',
            page: '1',
            countryId: '',
            countryCn: '',
            openSelCountry: false,
            flowId: '',
            stepId: '',
            pkValue: '',
            funId: this.$store.state.user.childFunId,
            stepState: '',
            stepName: '',
            stepOrder: '',  // 步骤序号
            payproPeriod: '',  // 期间
            step: [],
            titleName: '',
            flowStep: {
                width: 65,
                title: '步骤',
                align: 'center',
            },
            searchInp: [],
            showModal: false,
            modiaContent: '',
            num: '',
            stateList: [
                {
                    value: '处理中',
                    key: 'p_flowst_2'
                },
                {
                    value: '已完成',
                    key: 'p_flowst_3'
                }
            ],
            stateValue: 'p_flowst_2',
            img1: require('../../../../static/img/p_flowst_1.png'),
            img2: require('../../../../static/img/p_flowst_2.png'),
            img3: require('../../../../static/img/p_flowst_3.png'),
        }
    },
    computed: {

    },
    components: {
        selCountry,
        commonFlowUpdate,
        autoSearchtable,
        advanced,
    },
    mounted () {
        this.getColumns()
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
        refresh () {
            this.getColumns()
        },
        getColumns () {
            const t = this
            t.data = []
            t.isSpin = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatAutoLayoutGetFlowList.getListColumn',
                roleType: t.$store.state.user.roleType,
                logType: 'getListColumn',
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    let aa = []
                    t.flowId = res.data.content[0].flowId
                    t.btns = res.data.content[0].btns
                    t.titleName = res.data.content[0].flowName
                    t.tbName = res.data.content[0].tbName
                    aa = res.data.content[0].columns
                    for (let i = 0; i < aa.length; i++) {
                        aa[i].sortable = false
                        if (!aa[i].width) {
                            aa[i].width = 120
                        } else {
                            aa[i].width = 60
                        }
                        if (aa[i].className !== '') {
                            aa[i].width = 120
                            aa[i]['render'] = (h, params) => {
                                let bb = []
                                if (params.row[aa[i].key]) {
                                    bb = params.row[aa[i].key].split('$')
                                }
                                //  ["1004", "1481", "1", "p_flowst_3", "03submit", "Payroll Log Upload", "0"]
                                let text = ''
                                let show = ''
                                switch (bb[3]) {
                                    case 'p_flowst_0': show = '未开启'
                                        break
                                    case 'p_flowst_1': show = '待处理'
                                        break
                                    case 'p_flowst_2': show = '处理中'
                                        break
                                    case 'p_flowst_3': show = '已完成'
                                        break
                                }
                                if (bb[2]) {
                                    text = '[ ' + bb[2] + ' ]'
                                }
                                if (text !== '') {
                                    return h('Tooltip', {
                                        props: {
                                            trigger: 'hover',
                                            content: show,
                                            placement: 'top',
                                        },
                                        style: {
                                            height: '100%',
                                            width: '100%',
                                        },
                                    }, [
                                        h('div', {
                                            style: {
                                                width: '100%',
                                                //                          height: '100%',
                                                height: '40px',
                                                lineHeight: '40px',
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                            },
                                            on: {
                                                click: async () => {
                                                    let stepId = params.row[params.column.key].split('$')[1]
                                                    this.stepState = params.row[params.column.key].split('$')[3]
                                                    this.stepOrder = params.row[params.column.key].split('$')[2]
                                                    if (this.stepState === 'p_flowst_0') {
                                                        return
                                                    }
                                                    this.stepName = params.row[params.column.key].split('$')[5]
                                                    this.payproPeriod = params.row.payproPeriod
                                                    await this.getData()
                                                    this.openUp(params.row.id, stepId, params.index)
                                                },
                                            },
                                        }, [
                                            h('div', {
                                                style: {
                                                    width: '64px',
                                                    height: '22px',
                                                    borderRadius: '4px',
                                                    backgroundColor: params.row[params.column.key].split('$')[3] === 'p_flowst_3' ? '#8EE296' : (params.row[params.column.key].split('$')[3] === 'p_flowst_2' ? '#FFCF7D' : '#FCAF9B'),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: params.row[params.column.key].split('$')[3] === 'p_flowst_0' ? 'none' : 'flex',
                                                },
                                            }, [
                                                h('img', {
                                                    attrs: {
                                                        src: params.row[params.column.key].split('$')[3] === 'p_flowst_3' ? this.img3 : (params.row[params.column.key].split('$')[3] === 'p_flowst_2' ? this.img2 : this.img1),
                                                        draggable: 'false',
                                                    },
                                                    style: {
                                                        display: 'inline-block',
                                                        width: '16px',
                                                        height: '16px',
                                                        marginRight: '4px',
                                                    },
                                                }),
                                                h('span', {
                                                    style: {
                                                        display: 'inline-block',
                                                        color: '#fff',
                                                        fontSize: '12px',
                                                        verticalAlign: 'middle',
                                                    },
                                                }, text),
                                            ], ''),
                                            h('div', {
                                                style: {
                                                    width: '64px',
                                                    height: '22px',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#fff',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: params.row[params.column.key].split('$')[3] === 'p_flowst_0' ? 'flex' : 'none',
                                                },
                                            }, [
                                                h('span', {
                                                    style: {
                                                        display: 'inline-block',
                                                        color: '#515a6e',
                                                        fontSize: '12px',
                                                        verticalAlign: 'middle',
                                                    },
                                                }, text),
                                            ], '')
                                        ], ''),
                                    ])
                                }
                                return h()
                            }
                        }
                    }
                    t.columns = aa
                    if (res.data.content[0].hasOwnProperty('qryFields')) {
                        t.searchInp = res.data.content[0].qryFields.columns
                        let list1 = res.data.content[0].qryFields.columnOptions
                        for (let j = 0; j < t.searchInp.length; j++) {
                            for (let k = 0; k < list1.length; k++) {
                                if (t.searchInp[j].clmLayout == 12) {
                                    if (t.searchInp[j].clmName == list1[k].clmName) {
                                        t.searchInp[j].dataList = list1[k].clmOptionList
                                    }
                                }
                            }
                        }
                    }
                    if (this.$store.state.user.funId) {
                        this.getData()
                    }
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        formColumns (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].className !== '') {
                    this.step.push(data[i].key)
                }
            }
        },
        btnFunction (btnId) {
            //        console.log(btnId)
            if (btnId === 'button_add') {
                this.stepId = '0'
                this.stepState = ''
                this.pkValue = '0'
                this.openTestUpd = true
            } else if (btnId === 'button_query') {
                let dataSearch = {}
                this.searchInp.forEach((e) => {
                    if (e.id) {
                        dataSearch[e.clmName] = e.id + '&&' + e.clmLayout
                    } else {
                        if (e.name) {
                            dataSearch[e.clmName] = e.name + '&&' + e.clmLayout
                        } else {
                            delete dataSearch[e.clmName]
                        }
                    }
                })
                this.getData(dataSearch)
            } else if (btnId === 'button_del') {
                this.deletemsg()
            } else if (btnId === 'button_report') {
                //          this.deletemsg()
            }
        },
        openUp (pkValue, stepId, index) {
            this.stepId = stepId
            this.pkValue = pkValue
            this.index = index
            this.openTestUpd = true
        },
        closeTest () {
            this.stepName = ''
            this.stepOrder = ''
            this.openTestUpd = false
        },
        getData (value, value1) {
            const t = this
            t.isSpinTable = true
            let data = {}
            if (value) {
                data = deepCopy(value)
            }
            // const data = {
            //   _mt: 'elkplatAutoLayoutGetFlowList.getPage',
            //   sort: t.sort,
            //   order: t.order,
            //   rows: t.rows,
            //   page: t.page,
            //   roleType: t.$store.state.user.roleType,
            //   logType: 'getPage',
            // }
            if (value1) {
                data.searchData = JSON.stringify(value1)
            }
            data._mt =  this.$global.mt+'PlatAutoLayoutGetFlowList.getPage',
                data.sort = t.sort,
                data.order = t.order,
                data.rows = t.rows,
                data.page = t.page,
                data.roleType = t.$store.state.user.roleType,
                data.logType = 'getPage',
                data.flowState = t.stateValue
            data.flowState = t.stateValue
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = JSON.parse(res.data.content[0].rows)
                    for (let i = 0; i < t.data.length; i++) {
                        t.data[i].cellClassName = {}
                        for (let item in t.data[i]) {
                            if (typeof t.data[i][item] === 'string') {
                                if (t.data[i][item].split('$').length > 1) {
                                    //                    t.data[i].cellClassName[item] = t.data[i][item].split('$')[3]
                                }
                            }
                        }
                    }
                    t.total = res.data.content[0].records
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
        sortable (column) {
            this.sort = column.key
            if (column.order !== 'normal') {
                this.order = column.order
                this.getData()
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
                            _mt:  this.$global.mt+'PlatAutoLayoutDel.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            tbName: t.tbName,
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
        pickCountrySel () {
            this.$refs.selCountry.getData()
            this.openSelCountry = true
        },
        countrySelOk (countryId, countryCn) {
            //        alert(countryId + ' ' + countryCn)
            this.countryId = countryId
            this.countryCn = countryCn
        },
        closeSelCountry () {
            this.openSelCountry = false
        },
        pickData (value, index) {
            this.modiaContent = value
            this.showModal = true
            this.num = index
        },
        clear (type, id) {
            for (let i = 0; i < this.searchInp.length; i++) {
                if (type === this.searchInp[i].clmLayout && id === this.searchInp[i].id) {
                    this.searchInp[i].name = ''
                    this.searchInp[i].id = ''
                    let obj = this.searchInp[i]
                    obj.name = ''
                    obj.id = ''
                    this.$set(this.searchInp, i, obj)
                }
            }
        },
        changeinput (value, id) {
            for (let i = 0; i < this.searchInp.length; i++) {
                this.searchInp[this.num].name = value
                this.searchInp[this.num].id = id
            }
        },
        closeModal () {
            this.showModal = false
        },
        monthChange (item) {
            if (item.name) {
                item.name = new Date(item.name).format('yyyy-MM')
            }
        }
    },
    watch: {
        $route (value, from) {
            if (value.name === 'commonFlowList') {
                this.getColumns()
            }
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
.btns {
    margin-right: 5px;
}
.table-form {
    margin-top: 10px;
    .ivu-table {
        .p_flowst_0 {
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_1 {
            /*background-color: #ffc100;*/
            background-color: #fff !important;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_1:hover {
            /*transition: all .3s;*/
            /*background-color: #edb300;*/
        }
        .p_flowst_2 {
            /*background-color: #4472c5;*/
            background-color: #fff !important;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_2:hover {
            /*transition: all .3s;*/
            /*background-color: #395fa5;*/
        }
        .p_flowst_3 {
            /*background-color: #70ad46;*/
            background-color: #fff !important;
            color: #fff;
            cursor: pointer;
            .ivu-table-cell {
                height: 40px;
                padding: 0;
            }
        }
        .p_flowst_3:hover {
            /*transition: all .3s;*/
            /*background-color: #598937;*/
        }
    }
}

/deep/ .ivu-tooltip-rel {
    height: 100% !important;
}
/deep/ .ivu-table th {
    height: auto;
    white-space: normal;
}
/deep/ .ivu-table-cell {
    white-space: normal !important;
    word-wrap: normal !important;
}
</style>

