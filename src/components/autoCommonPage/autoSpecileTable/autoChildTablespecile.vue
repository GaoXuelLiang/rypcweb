<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <!-- <div class="content-main autoChildTable"> -->
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
                    <Select v-else-if="item.clmLayout == 12"
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
                        :loading="item.code==btnCode?isSpinTable:false"
                        :style="{width:item.name=='查询'?'56px':''}"
                        @click="btnFunction(item.code)">
                    <span v-if="item.code==btnCode?!isSpinTable:true">
                        {{ item.name }}
                    </span>
                </Button>
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
                       @on-sort-change="sortable"
                       :height="childTableHeight"
                       :no-data-text="noData"
                       size="small"
                       ref="selection"
                       :columns="columns"
                       stripe
                       :data="data"></Table>
            </row>
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
            <transition name="fade">
                <autoSearchtable v-if="showModal"
                                 @closeUp="closeModal"
                                 :dataKey="dataKey"
                                 :sffFilter="sffFilter"
                                 :searchValue="searchInp"
                                 @changeinput="changeinput">
                </autoSearchtable>
            </transition>
            <transition name="fade">
                <importExcel v-show="openImport"
                             :impid="updateId"
                             :imp_mt="imp_mt"
                             @closeImport="closeImport"
                             ref="importExcel"></importExcel>
            </transition>
            <transition name="fade">
                <autoMainUpd v-if="openMainUpd"
                             @closeUpd='closeUpd'
                             :logType='logType'
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
        </div>
    </div>
</template>
<script>
import { btnEvent } from '@/components/specialButton/index'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy, getUrlKey } from '@/lib/util'
import importExcel from '@/components/importModel/importParam'
// 导出
import expwindow from '@/components/fileOperations/expSms'
import expdow from '@/components/fileOperations/expdow'
import autoSearchtable from '@/components/autoCommonPage/searchTable/autoSearchtable'// 自动布局新增修改页面
import autoMainUpd from '../autoMainUpd'
export default {
    name: 'autoChildTable',
    data () {
        return {
            // // 排序
            // openOrder:false,
            // 导出
            openExp: false,
            openExpDow: false,
            // 导出字段
            expDataTital: [],
            filekey: '',
            filename: '',
            openImport: false,
            imp_mt: '',
            openUpdate: false,
            isSpinTable: false,
            isSpin: false,
            childTableHeight: 500,
            pageHeight: 'autoChildTable',
            // logType: '',
            openMainUpd: false,
            updateId: NaN,
            tableselected: [],
            columns: [],
            tbName: '',
            btns: [{
                name: this.$t('button.ser'),
                type: "info",
                code: "button_query"
            }],
            oprBtn: [
                {
                    btn_title: this.$t('button.view'),
                    type: "info",
                    btn_id: "button_view"
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            titleName: '',
            searchInp: [],
            showModal: false,
            dataKey: '',
            num: '',
            mt: this.$global.mt + '',
            // 弹出框过滤
            sffFilter: '',
            funStyle: "",
            noData: '<div id="noData"></div>',
            sformParentfield: '',
            // 操作按钮宽度
            operationWidth: '',
            //按钮code
            btnCode: ''
        }
    },
    computed: {
        mainId () {
            return this.$store.state.autoCommonPage.mainId;
        },
        logType1 () {//主节点的操作类型
            return this.$store.state.autoCommonPage.logType
        },
        funId () {
            return this.$store.state.user.childFunId;
        }
    },
    props: {
        logType: String,
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
    },
    components: {
        autoMainUpd,
        importExcel,
        autoSearchtable,
        expwindow,
        expdow,
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
        // 关闭弹窗
        close () {
            const t = this
            t.$emit('close')
        },
        // 新增不刷新
        getUpData (res) {
            const t = this
            t.data.unshift(res)
        },
        //修改不刷新
        updataTable (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openUpdate = false
            t.openMainUpd = false
            // t.$nextTick(() => { t.getData() })
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        // 操作按钮
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
            } else {
                this.$emit("specialButton", name.btn_id, t, params)
                return;
            }
            t.openMainUpd = true
            t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id))
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        btnFunction (btnId) {

            const t = this
            t.btnCode = btnId
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
                case "button_export":
                    t.exportEvent()
                    break
                case "button_import":
                    t.importExcel()
                    break
                case "button_init":
                    t.init()
                    break
                default:
                    t.specialEvent(btnId)
                    break
            }
        },
        //新增
        addEvent (btnId) {
            const t = this
            t.logType = t.$t('button.add')
            if (!t.isSpecialAdd) {
                t.openMainUpd = true
                const id = 0
                t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id, t.sformParentfield, t.mainId))
            } else {
                t.$emit("specialButton", btnId, t)
            }
        },
        //查询
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
            this.getData(dataSearch)
        },
        //特殊按钮事件
        specialEvent (btnId) {
            const t = this;
            // let tb = t.$global.mt + t.tbName;
            if (this.isSpecial) {
                this.$emit("specialButton", btnId, t)
            }
            if (btnEvent[t.tbName]) {
                btnEvent[t.tbName][btnId].call(this, t)
            }
            // if (btnEvent[tb]) {
            //     btnEvent[tb][btnId].call(this, t)
            // }
        },
        // 导入
        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        //导出事件
        exportEvent () {
            let dataSearch = {}
            let treeType = ''
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
        // 导出
        expData (value) {
            const t = this;
            let data = {}
            // Mt接口
            let expMt = this.$global.mt + t.tbName + '.export'
            if (value) {
                data = deepCopy(value)
            }
            data[t.sformParentfield] = t.mainId
            t.$refs.expwindow.getData(expMt, data)
            t.openExp = true
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        refresh () {
            this.page = 1
            this.getData()
        },
        getColumns () {
            const t = this
            t.initChildData()
            t.data = []
            t.isSpin = true
            t.tableselected = []
            t.expDataTital = []
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getListColumn',
                AProleType: localStorage.roleType,
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    let aa = []
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
                    res.data.content[0].btns.map((item) => {
                        if (item.btn_id.indexOf('_y_') != -1) {
                            if (item.btn_id === 'button_y_upd') {
                                if (t.logType1 !== t.$t('button.view')) t.oprBtn.splice(0, 1, item)
                            } else {
                                t.oprBtn.push(item)
                            }
                        } else {
                            let type = "primary";
                            switch (item.btn_id) {
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
                            var obj = {
                                name: item.btn_title,
                                type: type,
                                code: item.btn_id
                            }
                            if (t.logType1 === t.$t('button.view')) {
                                if (obj.code === 'button_export') {
                                    t.btns.push(obj)
                                }
                            } else {
                                t.btns.push(obj);
                            }
                        }
                    })
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
                    t.titleName = res.data.content[0].flowName
                    t.$emit("title", t.titleName)
                    t.tbName = res.data.content[0].tbName
                    t.sformParentfield = res.data.content[0].sformParentfield
                    t.imp_mt = this.$global.mt + t.tbName + '.importData'
                    aa = res.data.content[0].columns

                    t.funStyle = res.data.content[0].funStyle

                    // 导出字段
                    for (let i in aa) {
                        let codeObj = {}
                        codeObj.code = aa[i].key
                        codeObj.name = aa[i].title
                        if (codeObj.code != undefined && codeObj.name !== '操作') {
                            t.expDataTital.push(codeObj)
                        }
                        aa[i]['render'] = (h, params) => {
                            let tt = params.row[aa[i].key];
                            if (tt && tt !== '') {
                                if (aa[i].key == 'fileKey') {
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
                    t.columns.push(btnColums)
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
                    this.getData()
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
        sum (arr) {
            var s = 0;
            arr.forEach(function (val, idx, arr) {
                s += val;
            }, 0);
            return s;
        },
        //操作按钮
        generaBtn (h, params) {
            let arr = []
            this.oprBtn.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btn_id === 'button_y_upd' ? 'success' : 'primary',
                            size: 'small',
                        },
                        style: {
                            marginLeft: this.oprBtn.length > 1 ? "5px" : " ",
                            marginRight: this.oprBtn.length > 1 ? "5px" : " ",
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
        getData (value, value1) {
            const t = this
            t.isSpinTable = true
            let data = {}
            if (value) {
                data = deepCopy(value)
            }
            if (value1) {
                data.searchData = JSON.stringify(value1)
            }
            data._mt = this.$global.mt + t.tbName + '.getPage';
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APlogType = 'getPage';
            data.APffk = `glc${this.funId}`;
            data[t.sformParentfield] = t.mainId
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let filterObj = {}   // 子表table带出显示
                    let obj = this.$store.state.flowClmkMap.localField
                    console.log(obj, 'table全局')
                    for (let k in obj) {
                        t.columns.find(item => {
                            if ('key' in item) {
                                if (k == item.key) {
                                    filterObj[k] = obj[k]
                                }
                            }
                        })
                    }
                    if (res.data.content[0].rows) {
                        t.data = res.data.content[0].rows.map(item => {
                            return item = Object.assign({}, filterObj, item)
                        })
                    }
                    t.total = res.data.content[0].records
                    t.$store.commit('autoCommonPage/setChildTable', t.data)
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
                            APlogType: this.$t('button.del'),
                            APids: t.tableselected.toString(),
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
                        t.$refs.selection.selectAll(false)
                    },
                })
            }
        },
        //初始化
        init () {
            const t = this;
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '确定初始化',
                onOk: () => {
                    const data = {
                        _mt: this.$global.mt + t.tbName + '.initData',
                        APpid: t.mainId,
                        APlogType: '初始化',
                    }
                    t.isSpinTable = true;
                    getDataLevelUserLoginData(data).then(res => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == '1') {
                                    t.tableselected = []
                                    t.isSpinTable = false;
                                    this.getData()
                                }
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }).finally(() => {
                        t.isSpinTable = false;
                    })
                },
                onCancel: () => { },
            })
        },
        pickData (value, index) {
            this.dataKey = value.clmSelOpt
            this.sffFilter = value.clmfilter;
            if (this.sffFilter && this.sffFilter !== '') {
                let rule = this.formData(this.sffFilter)
                if (rule) {
                    console.log(rule, 'rule')
                    console.log(this.searchInp, 'searchinp')
                    for (let k of rule) {
                        for (let j of this.searchInp) {
                            if (k.value === j.clmName) {
                                console.log(j.value, 'valyeee')
                                // if (!j.value || j.value === '') {
                                if (j.value === '') {
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
        },
        //初始化子表数据
        initChildData () {
            const t = this;
            t.total = 0;
            t.index = 0;
            t.sort = 'id';
            t.order = 'desc';
            t.rows = 10;
            t.page = 1;
            // t.logType = '';
            t.searchInp = [];
            t.tableselected = [];
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/childTable.scss";
.table-form {
    margin-bottom: 10px;
}
.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 1200px;
        background-color: #fff;
        padding: 50px 20px 10px 20px;
        border-radius: 10px;
        .btnHeight {
            margin-bottom: 10px;
            margin-right: 10px;
            vertical-align: middle;
            .table_search_int {
                width: 200px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .pickData {
                cursor: pointer;
            }

            .btns {
                margin-bottom: 10px;
                margin-right: 10px;
                vertical-align: middle;
            }
        }
        .refresh {
            margin-left: 20px;
            display: inline-block;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
</style>

