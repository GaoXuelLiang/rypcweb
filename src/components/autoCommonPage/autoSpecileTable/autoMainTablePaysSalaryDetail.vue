<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-19 13:38:23
 * @LastEditTime: 2020-12-03 11:00:06
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{titleName}}
                </p>
                <Row>
                    <Col span="4"
                         v-if="isTree"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:(treeheight - 8) + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    </Col>
                    <Col :span="isTree?20:24">
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
                                      @click="getPageByState(item.bNoLanCn,item.bNoCode,item.buttonList,item.oprBtn)">
                                    <DropdownItem>{{item.bNoLanCn}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
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
                        <!-- <Button class="btns" type="primary" @click="advSearch()">高级查询</Button> -->
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
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <transition name="fade">
            <autoChildBase v-if="openUpdate"
                           :logType="logType"
                           :mainTitle="titleName"
                           @closeUp="closeUpdChild"
                           :id="updateId"
                           @addNewArray="addNewArray"
                           @changeLogtype="changeLogtype"
                           @update="updateArray"
                           ref="update"></autoChildBase>
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
</template>    
<script>
//按钮事件
import { btnEvent } from '@/components/specialButton/index'
//自动布局主子表弹窗页面
import autoChildBase from '@/components/autoCommonPage/autoCommonBase'
//请求方法
import { getDataLevelUserLoginData } from '@/axios/axios'
//功能方法
import { isSuccess, deepCopy, getUrlKey } from '@/lib/util'
//高级查询
import selCountry from '@/components/commonsel/selCountry'
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
import autoMainUpd from '../autoMainUpd'
export default {
    mixins: [mixinTable],
    name: 'autoMainTable',
    data () {
        return {
            selectionAlldata:[],
            selectKey: null,
            // 显示按钮状态
            showBtnStatus: false,
            // 状态描述
            statusDis: '',
            // 按钮状态
            status: '',
            // 状态按钮列表
            dropdownMenuList: [],
            // 导出
            openExp: false,
            openExpDow: false,
            // 导出字段
            expDataTital: [],
            //显示树
            isTree: false,
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
            //主子表弹窗显示状态
            openUpdate: false,
            //表格loading
            isSpinTable: false,
            //获取列
            isSpin: false,
            //表格高度
            treeheight: 0,
            //树状图数据
            dataTree: [],
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
            //树类型
            judTreeType: '',
            //树节点id
            treeid: '',
            //树状图mt参数
            treeInterface: '',
            //操作类型
            logType: '',
            //首页过滤参数
            homePageFiltering: '',
            //按钮code
            btnCode:''
        }
    },
    props: {
        //特殊按钮事件
        isSpecial: {
            type: Boolean,
            default: false
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
        isSpecialViewTree: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        }
    },
    components: {
        autoMainUpd,
        importExcel,
        selCountry,
        autoSearchtable,
        expwindow,
        expdow,
        autoChildBase
    },
    mounted () {
        this.initData()
    },
    methods: {
        //初始化数据
        initData () {
            const t = this
            if (eval(getUrlKey('state').toLowerCase())) {
                t.cityName = '';
                t.logType = "";
                t.searchInp = [];
                t.dataSearch = [];
                t.tableselected = [];
                t.selectionAlldata = [];
                t.total = 0;
                t.index = 0;
                t.sort = 'id';
                t.order = 'desc';
                t.rows = 10;
                t.page = 1;
                t.paysRollProject()
            }
        },
         paysRollProject(id,relationship,paycphCompany){
            const t = this
            if(id){
                t.accountid = id
            }
            if(relationship){
                t.relationship = relationship
            }
            if(paycphCompany){
                t.paycphCompany = paycphCompany
            }
            // t.initChildData()
            t.data = []
            t.isSpin = true
            t.tableselected = []
            t.expDataTital = []
            let data = {};
            if(this.$global.mt=='xian'){
                // data._mt = this.$global.mt +"PaysRuster.getRusterPage";
                // data.APsort = 'id';
                // data.APorder = "desc";
                // data.AProws = 10;
                // data.APpage = 1;
                // data.APffk = `glc${t.funId}`
                 data._mt = this.$global.mt + "PaysProject.getListProPage";
                data.APsort = 'id';
                data.APorder = "desc";
                data.AProws = 10;
                data.APpage = 1;
                data.APffk = `glc${t.funId}`
                data.proIspayref  = 1
                data.proIsuse = 1
                data.atyId = id
            }else if(this.$global.mt=='znjs'){
                data._mt = this.$global.mt + "PaysProject.getListProPage";
                data.APsort = 'id';
                data.APorder = "desc";
                data.AProws = 10;
                data.APpage = 1;
                data.APffk = `glc${t.funId}`
                data.proIspayref  = 1
                data.proIsuse = 1
                data.atyId = id
            }
            getDataLevelUserLoginData(data).then((res) => {
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
                    let autobtns= [{btn_title: "导出", btn_id: "button_export"}]
                    autobtns.map((item) => {
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
                    // t.titleName = res.data.content[0].flowName
                    if(this.$global.mt=='xian'){
                        // t.titleName = '薪酬花名册'
                        // t.$emit("title", t.titleName)
                        // t.tbName = "PaysRuster"
                        t.titleName = '薪资账套明显'
                        t.$emit("title", t.titleName)
                        t.tbName = "PayList"
                        if(t.relationship =='dad'){
                            t.sformParentfield = "payhrcId"
                        }else{
                            t.sformParentfield = "PI0004"
                        }
                    }else if(this.$global.mt=='znjs'){
                        t.titleName = '薪资账套明显'
                        t.$emit("title", t.titleName)
                        t.tbName = "PayList"
                        if(t.relationship =='dad'){
                            t.sformParentfield = "payhrcId"
                        }else{
                            t.sformParentfield = "PI0004"
                        }

                    }
                    // projSalproid
                    t.imp_mt = this.$global.mt + t.tbName + '.importData'
                    aa = res.data.content[0].columns
                    // for(let i=0;i<aa.length;i++){
                    //     if((aa[i].key).indexOf('_')!==-1){
                    //        aa[i].key = this.transformStr(aa[i].key)
                    //     }
                    //     console.log(aa)
                    // }
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
                    let btnCenter = {
                        align: "center",
                        className: "",
                        sortable: "custom",
                        title: "",
                        type: "selection",
                        width: "60"
                    }
                    t.columns.unshift(btnCenter)
                    // t.columns.push(btnColums)
                    let autoqryFields = {}
                    // if(this.$global.mt =='xian'){
                    //       autoqryFields = {
                    //     columnOptions:[],
                    //     columns:[
                    //         {clmChgjs: "",
                    //         clmChgjs_dis: "",
                    //         clmDbName: "per_empName",
                    //         clmDefDis: true,
                    //         clmDescribe: "",
                    //         clmDname: "姓名",
                    //         clmIsupdate: false,
                    //         clmLayout: 1,
                    //         clmLength: 0,
                    //         clmName: "empName",
                    //         clmProperty: "01system",
                    //         clmSelOpt: 0,
                    //         clmSelOptType: "01none",
                    //         clmcascadeget: "",
                    //         clmfilter: "",
                    //         columnValid: [],
                    //         lowerSize: 1,
                    //         optionsindex: 0,
                    //         updFormat: "",
                    //         upperSize: 10240},
                    //         {
                    //        clmChgjs: "",
                    //         clmChgjs_dis: "",
                    //         clmDbName: "s_entryTime",
                    //         clmDefDis: true,
                    //         clmDescribe: "",
                    //         clmDname: "开始日期",
                    //         clmIsupdate: false,
                    //         clmLayout: 80,
                    //         clmLength: 0,
                    //         clmName: "sEntryTime",
                    //         clmProperty: "01system",
                    //         clmSelOpt: 0,
                    //         clmSelOptType: "03dict",
                    //         clmcascadeget: "",
                    //         clmfilter: "",
                    //         columnValid: [],
                    //         lowerSize: 0,
                    //         optionsindex: 0,
                    //         updFormat: "",
                    //         upperSize: 0
                    //         }, {
                    //         clmChgjs: "",
                    //         clmChgjs_dis: "",
                    //         clmDbName: "e_entryTime",
                    //         clmDefDis: true,
                    //         clmDescribe: "",
                    //         clmDname: "结束日期",
                    //         clmIsupdate: false,
                    //         clmLayout: 80,
                    //         clmLength: 0,
                    //         clmName: "eEntryTime",
                    //         clmProperty: "01system",
                    //         clmSelOpt: 0,
                    //         clmSelOptType: "03dict",
                    //         clmcascadeget: "",
                    //         clmfilter: "",
                    //         columnValid: [],
                    //         lowerSize: 0,
                    //         optionsindex: 0,
                    //         updFormat: "",
                    //         upperSize: 0
                    //         }
                    //     ]}
                    // }else if(this.$global.mt =='znjs'){
                    //            autoqryFields = {
                    //         columnOptions:[],
                    //         columns:[
                    //             {clmChgjs: "",
                    //             clmChgjs_dis: "",
                    //             clmDbName: "Sala_empname",
                    //             clmDefDis: true,
                    //             clmDescribe: "",
                    //             clmDname: "姓名",
                    //             clmIsupdate: false,
                    //             clmLayout: 1,
                    //             clmLength: 0,
                    //             clmName: "PI0003",
                    //             clmProperty: "01system",
                    //             clmSelOpt: 0,
                    //             clmSelOptType: "01none",
                    //             clmcascadeget: "",
                    //             clmfilter: "",
                    //             columnValid: [],
                    //             lowerSize: 1,
                    //             optionsindex: 0,
                    //             updFormat: "",
                    //             upperSize: 10240}
                    //         ]}
                    // }
                    autoqryFields = {
                            columnOptions:[],
                            columns:[
                                {clmChgjs: "",
                                clmChgjs_dis: "",
                                clmDbName: "Sala_empname",
                                clmDefDis: true,
                                clmDescribe: "",
                                clmDname: "姓名",
                                clmIsupdate: false,
                                clmLayout: 1,
                                clmLength: 0,
                                clmName: "PI0003",
                                clmProperty: "01system",
                                clmSelOpt: 0,
                                clmSelOptType: "01none",
                                clmcascadeget: "",
                                clmfilter: "",
                                columnValid: [],
                                lowerSize: 1,
                                optionsindex: 0,
                                updFormat: "",
                                upperSize: 10240}
                            ]}
                    if (autoqryFields) {
                        t.searchInp = autoqryFields.columns
                        let list1 = autoqryFields.columnOptions
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
                t.isSpin = false;
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //关闭子表
        closeUpdChild () {
            const t = this
            t.openUpdate = false
            // 关闭主子表弹窗把主表id置空
            const mainId = ''
            t.$store.commit('autoCommonPage/setMainId', mainId);
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openUpdate = false
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
                t.logType = t.$t('button.y.upd')

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
            // if (t.funStyle === '03main') {
            //     let obj = {
            //         'openUpdate': true,
            //         'updateId': Number(id),
            //         logType: t.logType
            //     }
            //     if (t.isSpecial) {
            //         t.$emit("openUpdate", obj)
            //     } else {
            //         t.openUpd(obj)
            //     }
            //     t.$store.commit('autoCommonPage/setMainId', Number(id));
            // } else {
                t.openMainUpd = true
                t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id))
                 t.$store.commit('autoCommonPage/setMainId', Number(id));
            // }
        },
        // 选择的数据
        selectedtable(selection){
            // 定义一个空数组
            const newArr = [];
            // 遍历
            for(let i = 0; i < selection.length; i++){
                // 添加到
                newArr.push(selection[i].id);
            }
            // 选中
            this.tableselected = newArr;
            // 选中的全数据
            this.selectionAlldata = selection
        },
        //打开主子表弹窗
        openUpd (val) {
            const t = this
            t.updateId = val.updateId;
            t.openUpdate = val.openUpdate
            t.logType = val.logType
        },
        //获取树
        getTree () {
            const t = this
            if (t.judTreeType != '01none' && t.judTreeType != '' && t.judTreeType != undefined) {
                t.isTree = true
                t.judTreeType == '05unittree' ? t.treeInterface = 'OrgUnits.getTree' : t.treeInterface = 'BaseCity.getTree'
                const data = {
                    _mt: this.$global.mt + this.treeInterface,
                    AProws: '100',
                    APpage: 1,
                    APsort: 'unitCode',
                    APorder: 'asc',
                    id: '0',
                    status: t.tbName == 'OrgUnits' ? t.status : '02valid'
                }
                for (const dat in data) {
                    if (data[dat] === '') {
                        delete data[dat]
                    }
                }
                if (t.judTreeType == '09citytree') {
                    delete data.status
                }

                t.loading = true
                t.dataTree = []
                getDataLevelUserLoginData(data).then((res) => {
                    t.loading = false
                    if (isSuccess(res, t)) {
                        if(res.data.content[0].value) {
                            if (t.judTreeType == '05unittree') {
                                setTimeout(() => {
                                    t.dataTree = t.toTree(res.data.content[0].value)
                                }, 500)
                            } else {
                                res.data.content[0].value.push({
                                    id: '0',
                                    cityName: this.$t('lang_baseManage.baseCity.allCountry'),
                                })
                                t.dataTree = t.toTree(res.data.content[0].value)
                            }
                        }
                    }
                }).catch(() => {
                    t.loading = false
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            } else {
                t.isTree = false
            }
        },
        //渲染树形结构
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                },
            }, [
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small',
                    },
                    on: {
                        // click: () => { this.selectChange(data) },
                    },
                }, [
                    h('Icon', {
                        props: {
                            type: this.judTreeType == '05unittree' ? (data.unitType === '01company' ? 'ios-home' : data.unitType === '10area' ? 'md-contact' : data.unitType === '20city' ? 'md-contact' : data.unitType === '30busi' ? 'md-locate' : 'md-ionic') : (data.cityType === '01prov' ? 'md-home' : data.cityType === '02city' ? 'md-home' : data.cityType === '03county' ? 'md-home' : 'md-home'),
                            size: '15',
                            color: this.judTreeType == '05unittree' ? (data.unitType === '01company' ? '#15a1f7' : data.unitType === '10area' ? '#f97432' : data.unitType === '20city' ? '#f97432' : data.unitType === '30busi' ? '#f46186' : '#00bed5') : (data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff'),
                        },
                        style: {
                            marginRight: '8px',
                        },
                    }),
                    h('span', data.title),
                ]),
            ])
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
            t.getTree()
        },
        //按钮事件
        btnFunction (btnId) {
            const t = this
            console.log(btnId, 'btnid')
            t.btnCode = btnId
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
                // case "button_valid":
                //     t.changeMsg('.setStatus', this.$t('reminder.confirmvalid'), this.$t('lang_cmut.cmutCorpora.valid'), '02valid')
                //     break
                // case "button_invalid":
                //     t.changeMsg('.setStatus', this.$t('reminder.confirminvalid'), this.$t('lang_cmut.cmutCorpora.invalid'), '03invalid')
                //     break
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
            //     if (t.funStyle === '03main') {
            //         let obj = {
            //             'openUpdate': true,
            //             logType: t.$t('button.add')
            //         }
            //         if (t.isSpecial) {
            //             t.$emit("openUpdate", obj)
            //         } else {
            //             t.openUpd(obj)
            //         }
            //     } else {
                    t.openMainUpd = true
                    const id = 0
                    t.$nextTick(() => t.$refs.autoMainUpd.getColumn(id))
                // }

            } else {
                t.$emit("specialButton", btnId, t)
            }
        },
        //查询事件
        queryEvent () {
            console.log(this, 'tttts')
            let dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.id) {
                    dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        if (this.titleName === '管理员岗位权限') {
                            dataSearch[e.clmName] = `'${e.name}'`
                        } else {
                            dataSearch[e.clmName] = e.name
                        }

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
            if (this.showBtnStatus) {
                dataSearch.status = this.status
            }
            if (this.isTree) {
                dataSearch.unitPid = this.treeid
            }
            this.expData(dataSearch)
        },
        //特殊按钮事件
        specialEvent (btnId) {
            const t = this;
            // let tb = t.$global.mt + t.tbName;
            if (this.isSpecial) {
                this.$emit("specialButton", btnId, t)
            } else if (this.isSpecialViewTree) {
                this.$emit("specialButton", btnId, t)
            }
            if (btnEvent[t.tbName]) {
                if( btnEvent[t.tbName][btnId]){
                     btnEvent[t.tbName][btnId].call(this, t)
                }
            }
        },
        //树点击事件 
        selectChange (e) {
            if (this.judTreeType == '05unittree') {
                this.treeid = e[0].id
                this.page = 1

            } else if (this.judTreeType == '09citytree') {
                this.treeid = e[0].id
                this.page = 1
            }

            this.getData()
        },
        //把后台数据转化为tree的格式 
        toTree (data) {
            let empName;
            if(pubsource.param_mt === 'xian') {
                empName = 'unitEmpIdDis';
            }
            if(pubsource.param_mt === 'znjs') {
                empName = 'unitEmpidDis';
            }
            data.forEach((item) => {
                item.checked = item.authRoleFunDis === '1'
                if(this.judTreeType == '05unittree') {
                    if(item[empName] !== undefined && item[empName] !== '') {
                        item.title = item.unitFnameCn + ' -- ' + item[empName];
                    }else {
                        item.title = item.unitFnameCn;
                    } 
                }else {
                    item.title = item.cityName;
                }
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = this.judTreeType == '05unittree' ? map[item.unitPid] : map[item.cityPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    item.expand = true
                    val.push(item)
                }
            })
            return val
        },
        //导入
        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
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
            t.$refs.expwindow.getData( expMt, data,t.expDataTital)
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
            t.data = []
            t.loading = true
            t.isSpin = true
            t.dataTree = []
            t.tableselected = []
            t.selectionAlldata = []
            t.status = '';
            t.dropdownMenuList = [];
            t.showBtnStatus = false;
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
                    t.expDataTital = [];
                    t.judTreeType = res.data.content[0].treeType;
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
                                    ],
                                    oprBtn: [
                                        {
                                            btn_title: t.$t('button.view'),
                                            type: "info",
                                            btn_id: "button_view"
                                        },
                                    ]
                                }
                                for (let i = 0; i < item.buttonList.length; i++) {
                                    if (item.buttonList[i].btnCheckSign === '1') {
                                        if (item.buttonList[i].btnLancode.indexOf('_y_') != -1) {
                                            var obj = {
                                                btn_title: item.buttonList[i].btnLanCn,
                                                btn_id: item.buttonList[i].btnLancode
                                            }
                                            if (item.buttonList[i].btnLancode === 'button_y_upd') {
                                                obj1.oprBtn.splice(0, 1, obj)
                                            } else {
                                                obj1.oprBtn.push(obj)
                                            }

                                        } else {
                                            var obj2 = {
                                                name: item.buttonList[i].btnLanCn,
                                                type: t.btnType(item.buttonList[i].btnLancode),
                                                code: item.buttonList[i].btnLancode
                                            }
                                            obj1.buttonList.push(obj2)
                                        }
                                    }
                                }
                                t.dropdownMenuList.push(obj1);
                            }
                            console.log(t.btns, 'btnsss')
                        })
                        for (let j = 0; j < t.dropdownMenuList.length; j++) {
                            if (res.data.content[0].funDefault == t.dropdownMenuList[j].bNoCode) {
                                t.statusDis = t.dropdownMenuList[j].bNoLanCn
                                t.status = res.data.content[0].funDefault
                                t.btns = t.dropdownMenuList[j].buttonList
                                t.oprBtn = t.dropdownMenuList[j].oprBtn
                            }
                        }
                    } else {
                        res.data.content[0].btns.map((item) => {
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
                    }
                    console.log(this.btns, '2222222222')
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
                    if (t.isSpecial) {
                        t.$emit("title", t.titleName)
                    }
                    t.tbName = res.data.content[0].tbName
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
                        console.log('hereee')
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
                        this.getTree()
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
            console.log(this.btns, '33333333333')
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
        //获取页面数据
        getData () {
            console.log('走进来')
            const t = this
            t.isSpinTable = true
            let data = {};
            if (Object.keys(t.dataSearch).length > 0) {
                data = deepCopy(t.dataSearch)
            }

            if (t.homePageFiltering !== '' && t.homePageFiltering !== undefined) {
                let homePage = t.homePageFiltering.split('#')
                homePage.forEach((val, index) => {
                    if (val !== '') {
                        let sp = val.split('=')
                        if (!data.hasOwnProperty(sp[0])) {
                            data[sp[0]] = sp[1]
                        }
                    }
                })
            }
            // data._mt = this.$global.mt + t.tbName + '.getPage';
           
            data._mt = this.$global.mt + t.tbName+'.selRuster';
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APffk = `glc${t.funId}`
            if (t.judTreeType == '09citytree') {
                data.cityPid = t.treeid
            } else if (t.judTreeType == '05unittree') {
                data.unitPid = t.treeid
            }
            if (t.showBtnStatus) {
                if (t.status == '01all') {
                    t.status = '01all'
                }
                data.status = t.status
            }

            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
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
        //修改数据
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
            t.getTree()
        },
        //操作数据方法
        changeMsg (mt, reminder, type, code) {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else if (t.tableselected.length > 1&&mt!=='.delByIds') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.onlyone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: reminder,
                    onOk: () => {
                        let data = {
                            _mt: this.$global.mt + t.tbName + mt,
                            APfunId: '1',
                            APlogType: type,
                            APids: t.tableselected.toString(),
                        }
                        if (code) {
                            data.APstatus = code;
                        }
                        // 区分管理员，业务，自助用户删除加参数
                        if (this.$route.name == 'autoUserMange') {
                            data.APstateType = '1'
                        } else if (this.$route.name == 'autoBusinessUserMange') {
                            data.APstateType = '2'
                        } else if (this.$route.name == 'autoSelfUser') {
                            data.APstateType = '3'
                        }
                        getDataLevelUserLoginData(data).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                                t.getTree()
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
        //切换状态按钮
        getPageByState (name, code, list, oprBtn) {
            const t = this;
            t.page = 1;
            t.statusDis = name;
            t.status = code;
            t.btns = list;
            t.oprBtn = oprBtn;
            t.tableselected = [];
            t.selectionAlldata = [];
            t.getData();
            t.getTree();
        }
    },
    watch: {
        '$route' () {
            const path = this.$route.path
            // autoShouldcalculated路由为薪资核算(多处页面用到)
            if (path === '/autoCommonPage' || path === '/autoShouldcalculated' || path === '/autoEmproster'||path === '/autoPaysSalaryDetail') {
                this.initData()
            }
        }
    }

}
</script>
<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
</style>

