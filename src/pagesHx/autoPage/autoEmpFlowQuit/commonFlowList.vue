<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{titleName}}
                </p>
                <Row class="btnHeight">
                    <span v-for="(item, index) in searchInp"
                          :key="index + 'c'"
                          @dblclick.stop="clear(item.clmLayout, item.id)">
                        <DatePicker v-if="item.clmLayout == 22||item.clmLayout == 80"
                                    v-model="item.name"
                                    type="month"
                                    format="yyyy-MM"
                                    :placeholder="'请选择' + item.clmDname"
                                    @on-change="monthChange(item)"
                                    :editable="false"
                                    class="table_search_int"></DatePicker>
                        <DatePicker v-if="item.clmLayout == 3"
                                    v-model="item.name"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    :placeholder="'请选择' + item.clmDname"
                                    @on-change="dateChange(item)"
                                    :editable="false"
                                    class="table_search_int"></DatePicker>
                        <Input v-if="item.clmLayout == 1"
                               v-model="item.name"
                               :placeholder="'请输入'+ item.clmDname"
                               type="text"
                               class="table_search_int" />
                        <Input v-else-if="item.clmLayout == 13"
                               v-model="item.name"
                               @on-click="pickData(item,index)"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="'请选择'+ item.clmDname"
                               class="table_search_int pickData" />
                        <Select v-else-if="item.clmLayout == 12||item.clmLayout == 11"
                                v-model="item.name"
                                :placeholder="'请选择'+ item.clmDname"
                                class="table_search_int"
                                clearable>
                            <Option :value="ite.key"
                                    v-for="(ite,index3) in item.dataList"
                                    :key="index3">{{ite.value}}</Option>
                        </Select>
                    </span>
                    <span>
                        <Select v-model="stateValue"
                                style="width: 200px;margin-right:10px;margin-bottom: 10px;"
                                placeholder="选择流程状态"
                                clearable>
                            <Option :value="ite.key"
                                    v-for="(ite,index1) in stateList"
                                    :key="index1">{{ite.value}}</Option>
                        </Select>
                    </span>
                    <Dropdown class="btns"
                              v-if="showBtnStatus">
                        <Button type="primary">
                            {{statusDis}}
                            <Icon type="md-arrow-dropdown"
                                  size="18"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <span v-for="(item,index) in dropdownMenuList"
                                  :key="index"
                                  @click="getPageByState(item.bNoLanCn,item.bNoCode,item.buttonList)">
                                <DropdownItem>{{item.bNoLanCn}}</DropdownItem>
                            </span>
                        </DropdownMenu>
                    </Dropdown>
                    <Button class="btns"
                            v-for="(item, index2) in btns"
                            :key="index2"
                            :type="item.type"
                            :loading="item.name=='查询'?isSpinTable:false"
                            :style="{width:item.name=='查询'?'56px':''}"
                            @click="btnFunction(item.code)">
                        <span v-if="item.name=='查询'?!isSpinTable:true">
                            {{ item.name }}
                        </span>
                    </Button>
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
                    <Table @on-selection-change="selectedtable"
                           :height="tableheight+10"
                           :no-data-text="noData"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           stripe
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
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
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
            <commonFlowUpdate v-if="openTestUpd"
                              @close="closeTest"
                              ref="commonFlowUpdate"
                              @getData="getData"
                              :formColumns="formColumn"
                              :tbName="tbName"
                              :flowId="flowId"
                              :pkValue="pkValue"
                              :stepId="stepId"
                              :setpName="stepName"
                              :stepState="stepState"
                              :stepOrder="stepOrder"
                              :newMt="newMt"
                              :payproPeriod="payproPeriod">
            </commonFlowUpdate>
        </transition>
        <transition name="fade">
            <autoSearchtable autoTableType="unit"
                             v-if="showModal"
                             @closeUp="closeModal"
                             :dataKey="dataKey"
                             :sffFilter='sffFilter'
                             @changeinput="changeinput">
            </autoSearchtable>
        </transition>
        <transition name="fade">
            <advanced v-show="showAdvanced"
                      @closeAdvanced="closeAdvanced"
                      ref="advanced"
                      @getData="getData"></advanced>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy, getUrlKey } from '@/lib/util'
import advanced from '@/components/searchTable/searchAdvanced'
import commonFlowUpdate from './commonFlowUpdate'
import autoSearchtable from '@/pages/common/searchTable/autoSearchtable'
//按钮事件
import { btnEvent } from '@/components/specialButton/index'
export default {
    name: 'commonFlowList',
    data () {
        return {
            sffFilter: '',
            //tableloading
            isSpinTable: false,
            //配置项loading
            isSpin: false,
            //表格高度
            tableheight: 0,
            //操作类型
            logType: '',
            //查询显示状态
            showAdvanced: false,
            //流程表单显示状态
            openTestUpd: false,
            //表格选中项
            tableselected: [],
            //表格列配置
            columns: [],
            //表名
            tbName: '',
            //按钮数据
            btns: [{
                name: this.$t('button.ser'),
                type: "info",
                code: "button_query"
            }],
            //当前数据id
            updateId: NaN,
            //表格数据
            data: [],
            //总页数
            total: 0,
            //当前点击数据index
            index: 0,
            //排序字段
            sort: 'id',
            //排序方式
            order: 'desc',
            //rows
            rows: '10',
            //page
            page: '1',
            //流程ID
            flowId: '',
            //步骤id
            stepId: '',
            //主键id
            pkValue: '',
            //步骤状态
            stepState: '',
            //步骤名称
            stepName: '',
            //步骤序号
            stepOrder: '',
            //期间
            payproPeriod: '',
            //步骤数据
            step: [],
            //节点名称
            titleName: '',
            //流程步骤
            flowStep: {
                width: 65,
                title: '步骤',
                align: 'center',
            },
            //快速查询条件
            searchInp: [],
            //快速查询弹出框显示状态
            showModal: false,
            //弹出框index
            num: '',
            //流程状态数据
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
            //当前选择状态
            stateValue: 'p_flowst_2',
            //步骤状态图片
            flowImg: {
                "p_flowst_0": require('../../../../static/img/p_flowst_0.png'),
                "p_flowst_1": require('../../../../static/img/p_flowst_1.png'),
                "p_flowst_2": require('../../../../static/img/p_flowst_2.png'),
                "p_flowst_3": require('../../../../static/img/p_flowst_3.png'),
                "p_flowst_4": require('../../../../static/img/p_flowst_3.png'),
            },
            //步骤背景样式
            flowStateBg: {
                "p_flowst_0": "",
                "p_flowst_1": "#FD914F",
                "p_flowst_2": "#FD914F",
                "p_flowst_3": "",
                "p_flowst_4": "",
            },
            //步骤字体颜色
            fontColor: {
                "p_flowst_0": "#666666",
                "p_flowst_1": "#ffffff",
                "p_flowst_2": "#ffffff",
                "p_flowst_3": "#5AC01B",
                "p_flowst_4": "#5AC01B",
            },
            //暂无数据
            noData: '<div id="noData"></div>',
            //快速查询数据
            dataSearch: {},
            formColumn: [],
            // 状态按钮
            showBtnStatus: false,
            //首页过滤参数
            homePageFiltering: '',
            //获取页面newMt
            newMt: '',
            statusDis: '',
            dropdownMenuList: [],
            status: '',
        }
    },
    props: {
        //特殊按钮事件
        isSpecial: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        },
        userId () {
            return localStorage.userId
        },
    },
    components: {
        commonFlowUpdate,
        autoSearchtable,
        advanced,
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
        this.getColumns()
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        // 按钮事件
        btnFunction (btnId) {
            const t = this
            switch (btnId) {
                case "button_add":
                    t.addEvent(btnId)
                    break
                case "button_query":
                    t.queryEvent()
                    break
                case "button_del":
                    t.deletemsg()
                    break
                case "button_flowStop":
                    t.stopFlow()
                    break
                case "button_export":
                    break
                case "button_import":
                    break

                default:
                    t.specialEvent(btnId)
                    break
            }
        },
        // 特殊按钮事件 
        specialEvent (btnId) {
            const t = this;
            if (t.isSpecial) {
                t.$emit("specialButton", btnId, t)
            }
            if (btnEvent[t.tbName]) {
                if (btnEvent[t.tbName][btnId]) {
                    btnEvent[t.tbName][btnId].call(this, t)
                }
            }
        },
        //新增
        addEvent (btnId) {
            this.stepId = '0'
            this.stepState = ''
            this.pkValue = '0'
            this.openTestUpd = true
            localStorage.setItem('flowStatus', 'add')
        },
        //中止流程
        stopFlow () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: "是否确认中止流程",
                    onOk: () => {
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + t.tbName + '.stopFlow',
                            APlogType: "中止流程",
                            APids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == '1') {
                                    t.tableselected = []
                                    this.$Message.success("操作成功");
                                    t.getData()
                                } else {
                                    t.$Modal.error({
                                        title: this.$t('reminder.err'),
                                        content: this.$t('reminder.errormessage'),
                                    })
                                }
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
        //快速查询
        queryEvent () {
            const t = this;
            t.dataSearch = {}
            t.searchInp.forEach((e) => {
                if (e.id) {
                    t.dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        t.dataSearch[e.clmName] = e.name
                    } else {
                        delete t.dataSearch[e.clmName]
                    }
                }
            })
            t.getData(t.dataSearch)
        },
        //
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        //刷新
        refresh () {
            this.getData()
        },
        //获取列配置
        getColumns () {
            const t = this
            if (this.$global.mt == 'xian') {
                this.stateList = [
                    {
                        value: '处理中',
                        key: 'p_flowst_2'
                    },
                    {
                        value: '已完成',
                        key: 'p_flowst_3'
                    },
                    {
                        value: '全部',
                        key: 'all'
                    }
                ]
            } else {
                this.stateList = [
                    {
                        value: '处理中',
                        key: 'p_flowst_2'
                    },
                    {
                        value: '已完成',
                        key: 'p_flowst_3'
                    },
                    {
                        value: '已终止',
                        key: 'p_flowst_4'
                    }
                ]
            }
            t.data = []
            t.isSpin = true
            t.showBtnStatus = false
            t.tableselected = []
            t.dropdownMenuList = []
            t.status = ''
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getListColumn',
                AProleType: t.$store.state.user.roleType,
                APlogType: 'getListColumn',
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    let columns = JSON.parse(JSON.stringify(res.data.content[0].columns));
                    t.$store.commit('flowList/setTableColumns', res.data.content[0].columns)
                    let aa = []
                    t.btns = [{
                        name: t.$t('button.ser'),
                        type: "info",
                        code: "button_query"
                    }];
                    t.page = 1
                    t.rows = 10
                    t.totol = 0
                    t.oprBtn = [
                        {
                            btn_title: t.$t('button.view'),
                            type: "info",
                            btn_id: "button_view"
                        },
                    ]
                    t.homePageFiltering = res.data.content[0].funPageTerm;
                    if (res.data.content[0].stateBtns.length > 0) {
                        t.showBtnStatus = true;
                        res.data.content[0].stateBtns.map((item) => {
                            if (item.bNoCheckSign === '1') {
                                //bNoCode 状态编码
                                //bNoLanCn 状态名称
                                //buttonList 状态按钮列表
                                //bNoCheckSign 状态是否显示
                                var obj1 = {
                                    bNoCode: item.bNoCode,
                                    bNoLanCn: item.bNoLanCn,
                                    buttonList: [
                                        {
                                            name: t.$t('button.ser'),
                                            type: "info",
                                            code: "button_query"
                                        }
                                    ]
                                }
                                for (let i = 0; i < item.buttonList.length; i++) {
                                    if (item.buttonList[i].btnCheckSign === '1') {
                                        var obj2 = {
                                            name: item.buttonList[i].btnLanCn,
                                            type: t.btnType(item.buttonList[i].btnLancode),
                                            code: item.buttonList[i].btnLancode
                                        }
                                        obj1.buttonList.push(obj2)
                                    }
                                }
                                t.dropdownMenuList.push(obj1);
                            }
                            console.log(t.dropdownMenuList, 'dropdownMenuList')
                        })
                        t.statusDis = t.dropdownMenuList[0].bNoLanCn
                        t.status = t.dropdownMenuList[0].bNoCode
                        t.btns = t.dropdownMenuList[0].buttonList
                        // for (let j = 0; j < t.dropdownMenuList.length; j++) {
                        //     if (res.data.content[0].funDefault == t.dropdownMenuList[j].bNoCode) {
                        //         t.statusDis = t.dropdownMenuList[j].bNoLanCn
                        //         t.status = res.data.content[0].funDefault
                        //         t.btns = t.dropdownMenuList[j].buttonList
                        //     }
                        // }
                    } else {
                        res.data.content[0].btns.map((item) => {
                            var obj = {
                                name: item.btn_title,
                                type: t.btnType(item.btn_id),
                                code: item.btn_id
                            }
                            t.btns.push(obj);
                        })
                    }
                    t.flowId = res.data.content[0].flowId
                    t.titleName = res.data.content[0].flowName
                    t.tbName = res.data.content[0].tbName

                    aa = columns

                    for (let i = 0; i < aa.length; i++) {
                        aa[i].sortable = false;
                        if (aa[i].className !== '') {
                            if (aa[i].stepOrder && aa[i].stepOrder !== "") {
                                aa[i].title = "【" + aa[i].stepOrder + "】" + aa[i].title
                            }
                            let rowParams = {}
                            aa[i]['render'] = (h, params) => {
                                rowParams = params
                                let bb = []
                                if (params.row[aa[i].key]) {
                                    bb = params.row[aa[i].key].split('$')
                                }
                                let text = ''
                                let show = ''
                                switch (bb[3]) {
                                    case 'p_flowst_0':
                                        show = '未开启'
                                        break
                                    case 'p_flowst_1':
                                        show = '待处理'
                                        break
                                    case 'p_flowst_2':
                                        show = '处理中'
                                        break
                                    case 'p_flowst_3':
                                        show = '已完成'
                                        break
                                    case 'p_flowst_4':
                                        show = '已终止'
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
                                                    this.stepName = `${t.titleName} 第${aa[i].stepOrder}步 ` + params.row[params.column.key].split('$')[5]
                                                    this.payproPeriod = params.row.payproPeriod
                                                    this.openUp(params.row.id, stepId, params.index)
                                                    localStorage.setItem('flowStatus', 'upd')
                                                },
                                            },
                                        }, [
                                            h('div', {
                                                style: {
                                                    width: '68px',
                                                    height: '24px',
                                                    borderRadius: '4px',
                                                    backgroundColor: this.flowStateBg[params.row[params.column.key].split('$')[3]],
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                },
                                            }, [
                                                h('img', {
                                                    attrs: {
                                                        src: this.flowImg[params.row[params.column.key].split('$')[3]],
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
                                                        color: this.fontColor[params.row[params.column.key].split('$')[3]],
                                                        fontSize: '12px',
                                                        verticalAlign: 'middle',
                                                    },
                                                }, show),
                                            ], ''),
                                        ], ''),
                                    ])
                                }
                                return h()
                            }
                        }
                        if (!aa[i].width) {
                            aa[i].width = t.sumWidth(aa[i].title)
                        }
                    }
                    t.columns = aa
                    const companyId = Number(localStorage.getItem('companyId'))
                    if (res.data.content[0].hasOwnProperty('qryFields')) {
                        t.searchInp = res.data.content[0].qryFields.columns
                        console.log('hereee');
                        if (companyId) {
                            t.searchInp = t.searchInp.filter(item => {
                                if (item.clmName !== 'companyId') {
                                    return true
                                }
                            })
                        }
                        let list1 = res.data.content[0].qryFields.columnOptions
                        for (let j = 0; j < t.searchInp.length; j++) {
                            for (let k = 0; k < list1.length; k++) {
                                if (t.searchInp[j].clmLayout == 12 || t.searchInp[j].clmLayout == 11) {
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
                    this.$nextTick(() => {
                        let func = this.$resize.call(this);
                        func(10);
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
        // 计算列表宽度
        sumWidth (title) {
            let w = 0
            let s = 0
            if (title) {
                if (title.length < 3) {
                    w = 120
                } else if (title.length < 5) {
                    w = 80
                } else {
                    w = 40
                }
                s = title.length * 12 + w
            }
            return s
        },
        //按钮颜色
        btnType (code) {
            let type = "primary";
            switch (code) {
                case "button_add":
                    type = 'warning'
                    break
                case "button_del":
                    type = 'error'
                    break
                case "button_invalid":
                    type = 'error'
                    break
                case "button_confirm":
                    type = 'success'
                    break
                case "button_submit":
                    type = 'success'
                    break
            }
            return type;
        },
        //打开表单
        openUp (pkValue, stepId, index) {
            this.stepId = stepId
            this.pkValue = pkValue
            this.index = index
            this.openTestUpd = true
            // 调用弹窗表单列数据
            // this.$nextTick(() => t.$refs.commonFlowUpdate.getColumns(pkValue))
        },
        //关闭表单
        closeTest () {
            this.stepName = ''
            this.stepOrder = ''
            this.openTestUpd = false;
            this.getData();
        },
        //获取表格数据
        getData (value, value1) {
            const t = this
            t.isSpinTable = true
            let data = {}
            if (Object.keys(t.dataSearch).length > 0) {
                data = deepCopy(t.dataSearch)
            }
            if (value1) {
                data.searchData = JSON.stringify(value1)
            }
            data._mt = this.$global.mt + t.tbName + '.getPage';
            if (t.homePageFiltering !== '' && t.homePageFiltering !== undefined) {
                let homePage = t.homePageFiltering.split(';')
                for (let v of homePage) {
                    if (v !== '') {
                        if (v.indexOf('//') !== -1) {
                            let b = v.split('//')
                            data._mt = this.$global.mt + b[1];
                            t.newMt = b[1];
                        } else {
                            let c = v.split('#')
                            c.forEach((val, index) => {
                                if (val !== '') {
                                    let sp = val.split('=')
                                    if (!data.hasOwnProperty(sp[0])) {
                                        data[sp[0]] = sp[1]
                                    }
                                }
                            })
                        }
                    }
                }
            }
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APffk = `glc${this.funId}|${this.flowId}|${this.userId}`;
            data.AProleType = t.$store.state.user.roleType;
            if (t.showBtnStatus) {
                data.status = t.status
            }
            data.flowState = t.stateValue;
            if (t.stateValue == 'all' && t.$global.mt == 'xian') {
                data.flowState = ''
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].rows.length == 0) {
                        t.data = []
                        t.totol = 0
                        return
                    }
                    t.data = JSON.parse(res.data.content[0].rows)
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpinTable = false
            })
        },
        //新增数据
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
        },
        //修改数据
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        //排序
        sortable (column) {
            this.sort = column.key
            if (column.order !== 'normal') {
                this.order = column.order
                this.getData()
            }
        },
        //改变行数
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        //改变页码
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        //获取选中项
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        //删除
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
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + t.tbName + '.delByIds',
                            APfunId: '1',
                            APlogType: this.$t('button.del'),
                            // tbName: t.tbName,
                            APids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                // this.$Message.success(this.$t("reminder.operatsuccess"));
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
        //过滤条件过滤
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            }
            let a = data.split(';')
            for (let v of a) {
                if (v !== '') { // 去除空格的影响, 对过滤的影响
                    // 判断过滤条件是否包含'//'为自身最高级卡自身条件
                    if (v.indexOf('//') !== -1) {
                        let b = v.split('//')
                        let obj = {}
                        for (let k of b) {
                            if (k.substring(0, 1) !== '$') {
                                obj['key'] = k
                            } else {
                                obj['value'] = k.substring(1)
                            }
                        }
                        arr.push(obj)
                    } else {
                        let b = v.split('=')
                        let obj = {}
                        for (let k of b) {
                            if (k.substring(0, 1) !== '$') {
                                obj['key'] = k
                            } else {
                                obj['value'] = k.substring(1)
                            }
                        }
                        arr.push(obj)
                    }
                }
            }
            return arr
        },
        //打开快速查询弹出框
        pickData (item, index) {
            this.dataKey = item.clmSelOpt
            this.sffFilter = item.clmfilter;
            if (this.sffFilter && this.sffFilter !== '') {
                let rule = this.formData(this.sffFilter)
                if (rule) {
                    for (let k of rule) {
                        for (let j of this.searchInp) {
                            if (k.value === j.clmName) {
                                if (!j.id || j.id === '') {
                                    let dis = j.clmDname
                                    this.$Modal.warning({
                                        title: this.$t('reminder.remind'),
                                        content: '请先选择' + dis,
                                    })
                                    return
                                }

                            }
                        }
                    }
                }
            }
            // this.dataKey = value
            this.showModal = true
            this.num = index
        },
        //清楚弹出框数据
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
        //获取弹出框数据
        changeinput (value, id) {
            for (let i = 0; i < this.searchInp.length; i++) {
                this.searchInp[this.num].name = value
                this.searchInp[this.num].id = id
            }
        },
        //关闭弹出框
        closeModal () {
            this.showModal = false
        },
        //月份change
        monthChange (item) {
            if (item.name) {
                item.name = new Date(item.name).format('yyyy-MM')
            }
        },
        dateChange (item) {
            if (item.name) {
                item.name = new Date(item.name).format('yyyy-MM-dd')
            }
        },
        //切换状态按钮
        getPageByState (name, code, list) {
            const t = this;
            t.page = 1;
            t.statusDis = name;
            t.status = code;
            t.btns = list;
            t.tableselected = [];
            t.getData();
        }
    },
    watch: {
        $route (value, from) {
            if (value.name === 'commonFlowList') {
                this.stateValue = 'p_flowst_2';
                this.getColumns()
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
@import "~@/sass/autoFlowList.scss";
</style>

