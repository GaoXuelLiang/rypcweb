<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <Row>
                    <Col>
                    <Row class="btnHeight">
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
                                        class="table_search_int pickData"></DatePicker>
                            <DatePicker v-if="item.clmLayout == 3"
                                        v-model="item.name"
                                        :placeholder="'请选择' + item.clmDname"
                                        @on-change="DataChange(item)"
                                        :editable="false"
                                        class="table_search_int pickData"></DatePicker>
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
                                    class="table_search_int pickData"
                                    clearable>
                                <Option :value="ite.key"
                                        v-for="(ite,index3) in item.dataList"
                                        :key="index3">{{ite.value}}</Option>
                            </Select>
                        </span>
                        <Button class="btns"
                                v-for="(item, index2) in btns"
                                :key="index2"
                                :type="item.type"
                                :loading="item.name=='查询'?isSpinTable:false"
                                :style="{width:item.name=='查询'?'56px':''}"
                                v-show="stepState?true:(item.name=='查询'?true:false)"
                                @click="btnFunction(item.code)">
                            <span v-if="item.name=='查询'?!isSpinTable:true">
                                {{ item.name }}
                            </span>
                        </Button>
                    </Row>
                    <Row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Spin fix
                              v-if="isSpinTable"
                              size="large"></Spin>
                        <Table @on-selection-change="selectedtable"
                               @on-sort-change="sortable"
                               :height="200"
                               :no-data-text="`暂无数据`"
                               size="small"
                               ref="selection"
                               :columns="columns"
                               stripe
                               :show-summary="summary"
                               :summary-method="handleSummary"
                               :data="data"></Table>
                    </Row>
                    <Row type="flex">
                        <Page :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              :current='page'
                              :page-size="rows"
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
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :dataKey="dataKey"
                         :sffFilter="sffFilter"
                         :searchValue="searchInp"
                         @changeinput="changeinput">
        </autoSearchtable>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :mainId='mainId'
                         :imp_mt="imp_mt"
                         :funCode="funCode"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <transition name="fade">
            <autoMainUpd v-if="openMainUpd"
                         @closeUpd='closeUpd'
                         :logType='logType'
                         :funId="funId"
                         @updataTable='updataTable'
                         @getUpData='getUpData'
                         ref="autoMainUpd"></autoMainUpd>
        </transition>
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
        <autoChildTabbleZnsalary v-show="openZnsalary"
                                 @close="closeZnsalary"
                                 :logTypes="logType"
                                 :childMainId="childMainId"
                                 ref="autoChildTabbleZnsalary"></autoChildTabbleZnsalary>
    </div>
</template>    
<script>
//按钮事件
import { btnEvent } from '@/components/specialButton/index'
//请求方法
import { getDataLevelUserLoginData } from '@/axios/axios'
//功能方法
import { isSuccess, deepCopy, getUrlKey } from '@/lib/util'
//表格共有数据
import { mixinTable } from '@/mixins/table';
//导入
import importExcel from '@/components/importModel/importParam'
//导出
import expwindow from '@/components/fileOperations/expSms'
import expdow from '@/components/fileOperations/expdow'
//弹出选择框
import autoSearchtable from '@/components/autoCommonPage/searchTable/autoSearchtable'
// 自动布局单表新增修改页面
import autoMainUpd from './childTableUpd'
// 特殊 员工明细
import autoChildTabbleZnsalary from '@/components/autoCommonPage/autoSpecileTable/autoChildTabbleZnsalary'
export default {
    mixins: [mixinTable],
    name: 'childTable',
    data () {
        return {
            // 导出
            openExp: false,
            openExpDow: false,
            // 导出字段
            expDataTital: [],
            //导出文件
            filekey: '',
            filename: '',
            // 导入
            openImport: false,
            //loading状态
            loading: false,
            //当前数据id
            updateId: NaN,
            //导入mt
            imp_mt: '',
            //表格loading
            isSpinTable: false,
            //获取列
            isSpin: false,
            //主表修改弹窗显示状态
            openMainUpd: false,
            //表格选中数据
            tableselected: [],
            //表名
            tbName: '',
            //按钮数据
            btns: [{
                name: this.$t('button.ser'),
                type: "info",
                code: "button_query"
            }],
            //操作按钮数据
            oprBtn: [],
            //节点名称
            titleName: '',
            //快速查询数据
            searchInp: [],
            //快速搜索
            dataSearch: {},
            //搜索弹出框显示状态
            showModal: false,
            //弹出框配置ID
            dataKey: '',
            //弹出框index
            num: '',
            // 弹出框过滤
            sffFilter: '',
            //节点类型
            funStyle: "",
            // 操作按钮宽度
            operationWidth: '',
            //操作类型
            logType: '',
            //主表字段
            sformParentfield: '',
            //关联主表字段值
            relazdVal: "",
            // 单表总计
            sumData: {},
            // 多表总计
            sumColumn: [
                {
                    key: "ycprKemuDis",
                    title: "薪酬科目"
                },
                {
                    key: "ycprYtaxf",
                    title: "年度税前"
                },
                {
                    key: "ycprYtaxh",
                    title: "年度税后"
                },
                {
                    key: "ycprMaxf",
                    title: "月度税前"
                },
                {
                    key: "ycprMaxh",
                    title: "月度税后"
                }
            ],
            /**
             * 员工明细
             */
            openZnsalary: false,
            //首页过滤参数
            homePageFiltering: '',
            //子表id
            childMainId: '0',
        }
    },
    props: {
        //funid
        funId: {
            type: String,
        },
        //步骤
        stepId: {
            type: Number,
        },
        //流程
        flowId: {
            type: String,
        },
        //主表id
        mainId: {
            type: String
        },
        //过滤条件
        flsdbSubfilter: {
            type: String
        },
        //操作权限
        flsdbSubisupd: {
            type: String
        },
        // 是否合计
        flsdbIschirdsum: {
            type: String
        },
        //特殊事件
        isSpecial: {
            type: Boolean
        },
        //特殊新增事件
        isSpecialAdd: {
            type: Boolean,
            default: false
        },
        //特殊修改事件
        isSpecialUpd: {
            type: Boolean,
            default: false
        },
        //特殊查看事件
        isSpecialView: {
            type: Boolean,
            default: false
        },
        //主表关联字段
        relazd: {
            type: String,
            default: ''
        },
        formParams: {
            type: Object,
        },
        thisStepState: {
            type: String
        },
        mainTbName: {
            type: String
        },
        funCode: {
            type: String
        }
    },
    components: {
        autoMainUpd,
        importExcel,
        autoSearchtable,
        expwindow,
        expdow,
        autoChildTabbleZnsalary
    },
    computed: {
        summary () {
            let rtn = false;
            if (this.flsdbIschirdsum === '1' && this.data.length && this.mainId !== '0') rtn = true;
            return rtn;
        },
        stepState () {
            let rtn = false;
            if (this.thisStepState !== 'p_flowst_3' && this.thisStepState !== 'p_flowst_4') {
                rtn = true;
            }
            return rtn;
        }
    },
    mounted () {
        this.initData()
        // console.log(this.thisStepState,"thisStepState")
    },
    methods: {
        //初始化数据
        initData () {
            const t = this
            t.logType = "";
            t.searchInp = [];
            t.dataSearch = [];
            t.tableselected = [];
            t.data = []
            t.loading = true
            t.isSpin = true
            t.total = 0;
            t.index = 0;
            t.sort = 'id';
            t.order = 'desc';
            t.rows = 10;
            t.page = 1;
            t.btns = [{
                name: t.$t('button.ser'),
                type: "info",
                code: "button_query"
            }];
            t.oprBtn = [
                {
                    btn_title: t.$t('button.view'),
                    type: "info",
                    btn_id: "button_view"
                },
            ]
            t.getColumns()
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openMainUpd = false
        },
        //关闭导入
        closeImport () {
            const t = this
            t.openImport = false
        },
        //操作按钮
        openUp (id, name, index, params) {
            const t = this;
            t.index = index;
            t.updateId = Number(id);
            if (name.btn_id == 'button_y_upd') {
                if (t.isSpecialUpd) {
                    this.$emit("specialButton", name.btn_id, t);
                    return;
                } else {
                    t.$store.commit('autoCommonPage/setLogType', t.$t('button.y.upd'));
                }
                t.logType = t.$t('button.y.upd');
            } else if ((name.btn_id == 'button_view')) {
                if (t.isSpecialView) {
                    this.$emit("specialButton", name.btn_id, t);
                    return;
                } else {
                    t.$store.commit('autoCommonPage/setLogType', t.$t('button.view'));
                }
                t.logType = t.$t('button.view')
            } else if ((name.btn_id == 'button_y_specialDel')) {
                this.specialDel(params.row)
                return;
            } else if ((name.btn_id === 'button_y_employee')) {
                this.openUpZnsalary(params);
                return;
            } else {
                this.$emit("specialButton", name.btn_id, t, params)
                return;
            }
            t.openMainUpd = true
            t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id))
        },
        //关闭导入
        closeImport () {
            const t = this
            t.openImport = false
        },
        //新增数据
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        //按钮事件
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
                    t.changeMsg('.delByIds', this.$t('reminder.confirmdelete'), this.$t('button.del'))
                    break
                case "button_export":
                    t.exportEvent()
                    break
                case "button_import":
                    t.importExcel()
                    break
                case "button_regular":
                    t.changeMsg('.setStatus', this.$t('reminder.confirmPositive'), this.$t('button.positive'), '01active')
                    break
                case "button_leave":
                    t.changeMsg('.setStatus', this.$t('reminder.confirmDeparture'), this.$t('button.departure'), '02inactive')
                    break
                default:
                    t.specialEvent(btnId)
                    break
            }
        },
        //新增事件
        addEvent (btnId) {
            const t = this;
            t.logType = t.$t('button.add')
            t.$store.commit('autoCommonPage/setLogType', t.$t('button.add'))
            if (!t.isSpecialAdd) {
                t.openMainUpd = true
                const id = 0;
                if (t.relazd !== '') {
                    t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id, t.relazd, t.relazdVal))
                } else {
                    t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id, t.sformParentfield, t.mainId))
                }
            } else {
                t.$emit("specialButton", btnId, t)
            }
        },
        //查询事件
        queryEvent () {
            let dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.id) {
                    dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        dataSearch[e.clmName] = e.name
                    } else {
                        delete dataSearch[e.clmName]
                    }
                }
            })
            this.page = 1;
            this.dataSearch = dataSearch;
            this.getData()
        },
        //导出事件
        exportEvent () {
            let dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.id) {
                    dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        dataSearch[e.clmName] = e.name
                    } else {
                        delete dataSearch[e.clmName]
                    }
                }
            })
            this.expData(dataSearch)
        },
        //特殊按钮事件
        specialEvent (btnId) {
            const t = this;
            if (this.isSpecial) {
                this.$emit("specialButton", btnId, t)
            } else if (this.isSpecialViewTree) {
                this.$emit("specialButton", btnId, t)
            }
            if (btnEvent[t.tbName]) {
                btnEvent[t.tbName][btnId].call(this, t)
            }
        },
        //导入
        importExcel () {
            const t = this
            t.openImport = true
        },
        //导出
        expData (value) {
            const t = this;
            let data = {}
            // Mt接口
            let expMt = this.$global.mt + t.tbName + '.export'
            if (value) {
                data = deepCopy(value)
            }
            if (t.relazd !== '') {
                data[t.relazd] = t.relazdVal
            } else {
                data[t.sformParentfield] = t.mainId
            }

            t.$refs.expwindow.getData(expMt, data, this.expDataTital)
            t.openExp = true
        },
        //关闭导出
        closeExp () {
            const t = this
            t.openExp = false
        },
        //设置文件
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        //关闭导出
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        //刷新页面
        refresh () {
            let dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.id) {
                    dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        dataSearch[e.clmName] = e.name
                    } else {
                        delete dataSearch[e.clmName]
                    }
                }
            })
            this.page = 1;
            this.dataSearch = dataSearch;
            this.getData()
        },
        //获取页面配置数据
        getColumns () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getListColumn',
                AProleType: localStorage.roleType,
                APfunId: t.funId,
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    let aa = res.data.content[0].columns
                    t.titleName = res.data.content[0].flowName;
                    t.tbName = res.data.content[0].tbName
                    t.sformParentfield = res.data.content[0].sformParentfield
                    t.imp_mt = this.$global.mt + t.tbName + '.importData'
                    t.funStyle = res.data.content[0].funStyle
                    t.btnList(res.data.content[0].btns)
                    t.btnWidth()
                    t.expDataArr(aa)
                    if (t.isSpecial) {
                        t.$emit("title", t.titleName)
                    }
                    //列表显示顺序
                    for (let i = 1; i < aa.length; i++) {
                        for (let j = 1; j < aa.length - i; j++) {
                            if (aa[j].clmLorder * 1 > aa[j + 1].clmLorder * 1) {
                                let column = aa[j];
                                aa[j] = aa[j + 1];
                                aa[j + 1] = column;
                            }
                        }
                    }
                    t.columns = aa;
                    const companyId = Number(localStorage.getItem('companyId'))
                    if (companyId) {
                        t.columns = t.columns.filter(item => {
                            if (item.key !== 'companyIdDis') {
                                return true
                            }
                        })
                    }
                    let btnColums = {
                        title: this.$t('button.opr'),
                        width: this.operationWidth,
                        key: 'action',
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', this.generaBtn(h, params))
                        }
                    }
                    t.homePageFiltering = res.data.content[0].funPageTerm;
                    t.columns.push(btnColums);
                    if (res.data.content[0].hasOwnProperty('qryFields')) {
                        t.searchInp = res.data.content[0].qryFields.columns
                        if (companyId) {
                            t.searchInp = t.searchInp.filter(item => {
                                if (item.clmDname !== '所属公司') {
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
                    if (t.mainId !== '0') {
                        if (t.tbName) {
                            this.getData()
                        }
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
        //按钮
        btnList (btns) {
            const t = this;
            if (t.flsdbSubisupd === '1') {
                btns.map((item) => {
                    if (item.btn_id.indexOf('_y_') != -1) {
                        if (item.btn_id === 'button_y_upd') {
                            t.oprBtn.splice(0, 1, item)
                        } else {
                            t.oprBtn.push(item)
                        }
                    } else {
                        var obj = {
                            name: item.btn_title,
                            type: t.btnType(item.btn_id),
                            code: item.btn_id
                        }
                        t.btns.push(obj);
                    }
                })
            } else {
                btns.map((item) => {
                    if (item.btn_id.indexOf('_y_') != -1) {
                        if (item.btn_id !== 'button_y_upd') {
                            t.oprBtn.push(item)
                        }
                    }
                })
            }
        },
        // 按钮颜色
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
        //计算按钮长度
        sum (arr) {
            var s = 0;
            arr.forEach(function (val, idx, arr) {
                s += val;
            }, 0);
            return s;
        },
        //按钮宽度
        btnWidth () {
            let btntitle = []
            this.oprBtn.forEach((item) => {
                let nice = item.btn_title.length
                btntitle.push(nice)
            })
            let btnlength = this.sum(btntitle)
            if (btnlength == 2 || btnlength == undefined || btnlength == '') {
                this.operationWidth = 80
            } else {
                this.operationWidth = 80 + btnlength * 15
            }
        },
        //导出字段
        expDataArr (columns) {
            const t = this;
            for (let i in columns) {
                let codeObj = {}
                codeObj.code = columns[i].key
                codeObj.name = columns[i].title
                if (codeObj.code != undefined && codeObj.name !== '操作') {
                    t.expDataTital.push(codeObj)
                }
                columns[i]['render'] = (h, params) => {
                    let tt = params.row[columns[i].key];
                    if (tt && tt !== '') {
                        if (columns[i].key == 'fileKey') {
                            tt = tt.split(":")[0]
                        }
                    }
                    return h('Tooltip', {
                        props: {
                            trigger: 'hover',
                            content: tt,
                            placement: 'top',
                        },
                    }, [
                        h('div', {
                            style: {
                                width: '100%',
                                height: '40px',
                                lineHeight: '40px',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                            },
                        }, [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    fontSize: '12px',
                                    verticalAlign: 'middle',
                                },
                            }, tt),
                        ], ''),
                    ])
                }
            }
        },
        //操作按钮
        generaBtn (h, params) {
            let arr = []
            this.oprBtn.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btn_id === 'button_y_upd' ? 'success' : (item.btn_id === 'button_y_specialDel' ? 'error' : 'primary'),
                            size: 'small',
                        },
                        style: {
                            marginLeft: this.oprBtn.length > 1 ? "5px" : " ",
                            marginRight: this.oprBtn.length > 1 ? "5px" : " ",
                            display: params.row.aprdIsdelflag === '0' ? 'none' : 'inline-block'
                        },
                        on: {
                            click: () => {
                                this.openUp(params.row.id, item, params.index, params)
                            },
                        },
                    }, item.btn_title),
                )
            })
            return arr
        },
        //获取页面数据
        getData () {
            const t = this;
            let data = {};
            if (Object.keys(t.dataSearch).length > 0) {
                data = deepCopy(t.dataSearch)
            }
            data._mt = this.$global.mt + t.tbName + '.getPage';
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APffk = `glc${t.funId}`
            data.APfunId = t.funId;
            if (t.relazd !== '') {
                t.relazdVal = t.formParams[t.relazd];
                console.log(t.relazdVal, "relazdVal")
                data[t.relazd] = t.relazdVal;
                if (!t.relazdVal || t.relazdVal === "") {
                    return
                }
            } else {
                data[t.sformParentfield] = t.mainId
            }
            t.isSpinTable = true
            if (t.flsdbSubfilter !== '' && t.flsdbSubfilter !== undefined) {
                let homePage = t.flsdbSubfilter.split('#')
                homePage.forEach((val, index) => {
                    if (val !== '') {
                        let sp = val.split('=')
                        if (!data.hasOwnProperty(sp[0])) {
                            data[sp[0]] = sp[1]
                        }
                    }
                })
            }
            if (t.homePageFiltering !== '' && t.homePageFiltering !== undefined) {
                let filterParam = t.homePageFiltering.split('#')
                filterParam.forEach((val, index) => {
                    if (val !== '') {
                        let sp = val.split('=')
                        data[sp[0]] = sp[1]
                    }
                })
            }
            if (t.tbName === 'PlatAprvrecord') {
                data.aprdFlowid = t.flowId;
                data.aprdFlowidStep = t.stepId
            }

            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.sumNoData();
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
        //修改数据
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        // 特殊删除方法
        specialDel (row) {
            const t = this;
            getDataLevelUserLoginData({
                _mt: t.$global.mt + t.tbName + '.getById',
                APid: row.id,
                APffk: `gec${t.funId}`,
            }).then(res => {
                if (res.data.content[0]) {
                    let data = res.data.content[0]
                    if (data.aprdIsdelflag === '0') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '该数据是系统生成，不可删除',
                        })
                    } else {
                        t.$Modal.confirm({
                            title: this.$t('reminder.remind'),
                            content: this.$t('reminder.confirmdelete'),
                            onOk: () => {
                                let data = {
                                    _mt: this.$global.mt + t.tbName + '.delByIds',
                                    APfunId: '1',
                                    APlogType: this.$t('button.del'),
                                    APids: row.id,
                                }
                                getDataLevelUserLoginData(data).then((res) => {
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
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })

        },
        //操作数据方法
        changeMsg (mt, reminder, type, code) {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: reminder,
                    onOk: () => {
                         let data = {
                            APfunId: '1',
                            APlogType: type,
                            APids: t.tableselected.toString(),
                        }
                        if(t.tbName==='PlatAprvrecord'){
                            data._mt = this.$global.mt + 'PlatAprvrecord.delApvPathByIds'
                        }else{
                            data._mt = this.$global.mt + t.tbName + mt
                        }
                        
                        if (code) {
                            data.APstatus = code;
                        }
                        getDataLevelUserLoginData(data).then((res) => {
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
        //打开搜索弹出框
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
            this.showModal = true
            this.num = index
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
        //清空搜索条件
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
        //搜索弹出框赋值
        changeinput (value, id) {
            for (let i = 0; i < this.searchInp.length; i++) {
                this.searchInp[this.num].name = value
                this.searchInp[this.num].id = id
            }
        },
        //关闭搜索弹出框
        closeModal () {
            this.showModal = false
        },
        //日期月份修改
        monthChange (item) {
            if (item.name) {
                item.name = new Date(item.name).format('yyyy-MM')
            }
        },
        //日期修改
        DataChange (item) {
            if (item.name) {
                item.name = new Date(item.name).format('yyyy-MM-dd')
            }
        },
        // 子表总计
        handleSummary ({ columns, data }) {
            const sums = {};
            let arr = [];
            let obj = {};
            let sp = this.flsdbSubfilter.split('=');
            let sumColumn = [];
            columns.forEach((column, index) => {
                const key = column.key;
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: '小计'
                    };
                    return;
                }
                if (index === 1) {
                    sumColumn.push({
                        key,
                        title: '薪酬科目'
                    })
                }
                const values = data.map(item => Number(item[key]));// && key !== 'ycprYnum'
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    if (key === 'ycprYnum') {
                        sums[key] = {
                            key,
                            value: 'N/A'
                        };
                    } else {
                        sums[key] = {
                            key,
                            value: v.toFixed(2)
                        };
                    }
                    let col = ['ycprYtaxh', 'ycprYtaxf', 'ycprMaxh', 'ycprMaxf'];
                    switch (sp[1]) {
                        case 'wages':
                            obj.ycprKemuDis = '固定收入合计';
                            obj.index = 0;
                            break;
                        case 'subsidy':
                            obj.ycprKemuDis = '浮动收入合计';
                            obj.index = 1;
                            break;
                        case 'reward':
                            obj.ycprKemuDis = '浮动收入合计';
                            obj.index = 2;
                            break;
                    }
                    for (let i = 0; i < col.length; i++) {
                        if (key === col[i]) {
                            // sumColumn.push({
                            //     key,
                            //     title: column.title
                            // })
                            obj[key] = v.toFixed(2);
                            break;
                        }
                    }
                } else {
                    sums[key] = {
                        key,
                        value: 'N/A'
                    };
                }
            });
            this.sumData = obj;
            // this.sumColumn = sumColumn;
            return sums;
        },
        sumNoData () {
            if (this.data.length === 0 && this.flsdbIschirdsum === '1') {
                let obj = {
                    ycprYtaxh: '0.00',
                    ycprYtaxf: '0.00',
                    ycprMaxh: '0.00',
                    ycprMaxf: '0.00'
                };
                let sp = this.flsdbSubfilter.split('=');
                switch (sp[1]) {
                    case 'wages':
                        obj.ycprKemuDis = '固定收入合计';
                        obj.index = 0;
                        break;
                    case 'subsidy':
                        obj.ycprKemuDis = '浮动收入合计';
                        obj.index = 1;
                        break;
                    case 'reward':
                        obj.ycprKemuDis = '浮动收入合计';
                        obj.index = 2;
                        break;
                }
                // console.log(obj,"dataObj")
                this.$emit('summary', obj, this.sumColumn)
            }
        },
        /**
         * 员工明细
         */
        openUpZnsalary (params) {
            const t = this;
            t.openZnsalary = true;
            t.childMainId = params.row.id;
            t.logType = '员工薪资明细';
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'PayCphsdetail.getById',
                APid: params.row.id,
                APffk: '0'
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    t.$store.commit('autoCommonPage/setMainId', params.row.id);
                    t.$refs.autoChildTabbleZnsalary.paysRollProject(data.paycphAtyid, data.paycphCompany);
                }
            })
        },
        closeZnsalary () {
            const t = this;
            t.openZnsalary = false;
        }
    },
    watch: {
        mainId (val) {
            if (this.tbName && this.tbName !== '') {
                this.getData();
            }
        },
        formParams: {
            handler (val, oldval) {
                if (val.hasOwnProperty(this.relazd)) {
                    this.relazdVal = val[this.relazd];
                    let oldVal = oldval[this.relazd]
                    if (this.relazdVal !== '' && oldVal !== this.relazdVal) {
                        if (this.mainId === '0') {
                            this.refresh()
                        } else if (this.tbName && this.tbName !== '') {
                            this.refresh()
                        }
                    } else if (this.relazdVal === '') {
                        const t = this
                        t.data = []
                        t.total = 0;
                        t.index = 0;
                        t.rows = 10;
                        t.page = 1;
                    }
                }
            },
            deep: true,
        },
        stepState: {
            handler (newVal, oldVal) {
                if (!newVal) {
                    let obj = {
                        btn_title: this.$t('button.view'),
                        type: "info",
                        btn_id: "button_view"
                    }
                    this.oprBtn.map((item, index) => {
                        if (item.btn_id === 'button_y_upd') {
                            this.oprBtn.splice(index, 1, obj)
                        }
                    })
                }
            },
            deep: true,
        },
        sumData: {
            handler (newVal, oldVal) {
                if (newVal) {
                    this.$emit('summary', newVal, this.sumColumn)
                }
            },
            deep: true,
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
</style>

