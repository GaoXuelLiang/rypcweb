<template>
    <div class="commonFlowList">
        <!-- <div class="cover"> -->
            <!-- <div class="box"> -->
                <Spin size="large"
                      v-if="loadingSpin"
                      fix></Spin>

                <!-- <div class="title">
                    <div class="title-text">
                        <Icon type="ios-bookmark"
                              size="16"></Icon>{{thisSetpName===''?$t('button.add'):thisSetpName}}
                    </div>
                    <Button type="text"
                            @click="close">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div> -->
                <div class="content"
                     @scroll="formScroll">
                    <!-- <row :class="thisSetpName===''?'table-form-nomar':'table-form'"
                         ref="table-form">
                        <Table v-show="thisPkValue!=='0'"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="data"
                               :loading="data.length === 0"></Table>
                    </row> -->
                    <div class="dataBlocks"
                         v-for="(item, index) in dataBlocks"
                         :key="index">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <commonSingleForm v-if="item.blockColumn"
                                              :formData1="item.blockColumn"
                                              :formlist="item.formlist"
                                              :tbName="tbName"
                                              :flowInfo="flowInfo"
                                              :roleContrl="{
                                                stepAuthLimits:stepAuthLimits,
                                                flsdbOptauth: item.flsdbOptauth,
                                                thisStepState: thisStepState,
                                                }"
                                              :disabled="disabled || item.flsdbOptauth === '01view'"
                                              @formDataSubmit='submitData'
                                              :ref="'block' + item.id"
                                              :lebWidth="200">
                            </commonSingleForm>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         v-for="(item, index) in ChildDataBloks"
                         :key="item.flsdbMark">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <childTable :funId="item.flsdbSubform"
                                        :mainId="pkValue"
                                        :relazd="item.flsdbFarela"
                                        :flowId="flowId"
                                        :stepId="stepId"
                                        :flsdbIschirdsum="item.flsdbIschirdsum"
                                        :flsdbSubfilter="item.flsdbSubfilter"
                                        :formParams="formParams"
                                        :flsdbSubisupd="item.flsdbSubisupd"
                                        :thisStepState="thisStepState"
                                        :mainTbName="tbName"
                                        @summary="summary"> </childTable>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         v-if="showSum">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>原单位薪酬（总计）
                        </div>
                        <div class="dataContent">
                            <sumTable :sumData="sumNum"
                                      :sumColumns="sumColumns"
                                      :dataBlocks="dataBlocks"
                                      :dom="dom"></sumTable>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         v-for="(item, index) in mailRecords"
                         :key="'info1-'+index">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <div class="docs"
                                 v-for="(item2, index2) in item.flsdbMark"
                                 :key="index2">
                                <a href="javascript:;"
                                   @click="openUp(item2.mailId)">
                                    <Icon type="email"></Icon>
                                    {{item2.object}}
                                </a>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         :key="'info2-'+index"
                         v-for="(item, index) in docs">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <div class="docs">
                                <a href="javascript:;"
                                   v-for="(item2, index2) in item.flsdbMark"
                                   :key="index2"
                                   @click="downloadDocs(item2.url,item2.name, item2.id)">
                                    <Icon type="ios-download"></Icon>
                                    {{item2.name}}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="dataBlocks"
                         :key="'info3-'+index"
                         v-for="(item, index) in operation">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <div class="">
                                <Form label-position="right"
                                      :label-width="200">
                                    <Row>
                                        <Col span="10"
                                             offset="1">
                                        <FormItem label="操作人:">
                                            <Input :value="item.flsdbMark.optuser"
                                                   disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="10"
                                             offset="1">
                                        <FormItem label="更新时间:">
                                            <Input :value="item.flsdbMark.opttime"
                                                   disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="stepOrApproval === '0'"
                     class="footer_box">
                    <div class="footer"
                         v-show="thisStepState !== 'p_flowst_3' && thisStepState !== 'p_flowst_0'">
                        <div class="footerChilden"
                             v-show="stepAuthLimits == '03submit'">
                            <Button type="primary"
                                    @click="save"
                                    :loading="loading1"><span v-show="!loading1">{{$t('button.sav')}}</span></Button>
                            <Button type="success"
                                    style="margin-left: 5px;"
                                    @click="isSubmit"
                                    :loading="loading1"
                                    v-show="thisPkValue !== '0'"><span v-show="!loading1">提交</span></Button>
                        </div>
                    </div>
                </div>

            <!-- </div> -->
        <!-- </div> -->
        <!-- <transition name="fade">
            <emaillogView v-show="openUpdate"
                          logType="查询"
                          @closeUp="closeUp"
                          ref="update"></emaillogView>
        </transition> -->
    </div>
</template>
<script>
import commonSingleForm from '../../common/commonCompanents/commonSingleForm'
import testUpdPage from '../../common/commonList/commonSinglePageUpdate.vue'
// import emaillogView from '../../common/commonList/emaillogView.vue'
import childTable from '../../common/flowChildTable/childTable'
import sumTable from '../../common/flowSumTable/sumTable'
import { getDataLevelUserLoginData } from '@/axios/axios'
import {
    isSuccess,
    findComponentUpward,
    deepCopy,
    extendObject
} from '@/lib/util'
import { isField } from '@/lib/pub_isField'
import validCode from '../../common/commonCompanents/validCode'
import {
    onChange
} from '../../common/onChange/index'
import Bus from '../../common/bus'

export default {
    data () {
        return {
            //数据块loading
            loadingSpin: false,
            //邮件状态
            openUpdate: false,
            //数据块
            dataBlocks: [],
            //disabled状态
            disabled: this.stepState === 'p_flowst_3',
            //按钮loading状态
            loading1: false,
            //dataBlocks存储数据
            dataBlocksFake: [],
            //表单数据
            formData: {},
            //表单提交数据
            formDataSubmit: {},
            //表单字段
            clmMap: {},
            //步骤code
            stepCode: '',
            //table数据
            data: [],
            //table列数据
            columns: [],
            //主键
            thisPkValue: this.pkValue,
            //步骤
            thisStepId: this.stepId,
            //步骤状态
            thisStepState: this.stepState,
            //是否审批节点
            stepOrApproval: '0',
            //步骤名称
            thisSetpName: this.setpName,
            //操作人数据
            operation: [],
            //文档数据
            docs: [],
            //邮件数据
            mailRecords: [],
            //步骤权限
            stepAuthLimits: '',
            //子集数据块
            ChildDataBloks: [],
            // 弹出框，{物理列名：字段中文名}
            clmkvMap: {},
            // 该步骤，所有表单，布局为弹出框的数据 key, value
            popForm: {},
            // 流程图片
            flowImg: {
                "p_flowst_0": require('../../../../static/img/p_flowst_0.png'),
                "p_flowst_1": require('../../../../static/img/p_flowst_1.png'),
                "p_flowst_2": require('../../../../static/img/p_flowst_2.png'),
                "p_flowst_3": require('../../../../static/img/p_flowst_3.png'),
            },
            //流程状态颜色
            flowStateBg: {
                "p_flowst_0": "",
                "p_flowst_1": "#FD914F",
                "p_flowst_2": "#FD914F",
                "p_flowst_3": "",
            },
            //字体颜色
            fontColor: {
                "p_flowst_0": "#666666",
                "p_flowst_1": "#ffffff",
                "p_flowst_2": "#ffffff",
                "p_flowst_3": "#5AC01B",
            },
            //流程信息
            flowInfo: {
                flowId: this.flowId,
                pkValue: this.pkValue,
                stepId: this.stepId,
                stepName: this.setpName,
            },
            //主表关联字段
            relazd: '',
            //表单数据字段
            formParams: {},
            niceData: '',
            valueMap: {},
            /**
             * 子表总计
             */
            showSum: false,
            sumData: [],
            sumNum: [],
            sumColumns: [],
            dom: this
        }
    },
    props: {
        flowId: String,
        pkValue: String,
        stepId: String,
        setpName: String,
        stepState: String,
        tbName: String,
        formColumns: Array
    },
    created () {

    },
    mounted () {
        this.init()
    },
    components: {
        commonSingleForm,
        // emaillogView,
        testUpdPage,
        childTable,
        sumTable
    },
    computed: {
        tableColumns () {
            console.log(this.$store.state.flowList.tableColumns, "tableColumns")
            return this.$store.state.flowList.tableColumns;
        },
        funId () {
            return this.$store.state.user.funId
        },
        userId () {
            return localStorage.userId
        },
        popFormNice () {
            return this.$store.state.flowClmkMap.popForm;
        }
    },
    methods: {
        // 初始化
        init () {
            if (this.thisSetpName !== '') {
                this.getById(this.thisPkValue)
            } else {
                this.getDataBlock()
            }
        },
        // 是否超出滚动
        isScorll () {
            const scroll = document.getElementsByClassName('table-form')
            scroll[0].scrollHeight > scroll[0].clientHeight || scroll[0].offsetHeight > scroll[0].clientHeight ? this.isScorllY = true : this.isScorllY = false
        },
        // 获取数据块
        getDataBlock () {
            const t = this
            t.loadingSpin = true
            t.dataBlocks = []
            t.dataBlocksFake = []
            t.operation = []
            t.docs = []
            t.mailRecords = []
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowEdit.getDataBlock',
                APflowId: t.flowId, // 流程ID
                APstepId: t.thisStepId, // 流程步骤ID
                AProleType: t.$store.state.user.roleType, // 角色类型
                APpkValue: t.thisPkValue, // 主键值
                APfunId:1974
            }).then((res) => {
                t.dataBlocksFake = res.data.content[0].dataBlocks;
                t.thisStepId = res.data.content[0].stepId;
                t.stepAuthLimits = res.data.content[0].stepAuth;
                t.stepCode = res.data.content[0].stepCode;
                t.ChildDataBloks = [];
                //form表单块
                let forms = t.dataBlocksFake.find((value) => value.flsdbType == '01form');
                if (forms !== undefined) {
                    t.getColumn()
                }
                for (let v of t.dataBlocksFake) {
                    if (v.flsdbType === '02subtable') {
                        if (t.thisSetpName !== '' || v.flsdbFarela && v.flsdbFarela !== '') {
                            t.ChildDataBloks.push(v);
                        }
                    } else if (v.flsdbType === 'docs') {
                        v.flsdbMark = JSON.parse(v.flsdbMark)
                        v.flsdbMark = v.flsdbMark.map((item) => {
                            let a = item.file.split(':')
                            return {
                                name: a[0],
                                url: a[1],
                                id: item.id,
                            }
                        })
                        t.docs.push(v)
                    } else if (v.flsdbType === 'operation') {
                        v.flsdbMark = JSON.parse(v.flsdbMark)
                        t.operation.push(v)
                    } else if (v.flsdbType === 'mailRecords') {
                        v.flsdbMark = JSON.parse(v.flsdbMark)
                        t.mailRecords.push(v)
                    }
                }
            }).catch((err) => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {

            })
        },
        // 打开邮件
        openUp (id) {
            const t = this
            t.openUpdate = true
            t.$refs.update.getData(id)
        },
        // 关闭邮件
        closeUp () {
            this.openUpdate = false
        },
        // 格式化数据     
        getFormDataSubmit (data, res) {
            const t = this
            let columns = data // 字段
            let formData = {}
            let form = {} // 表单
            let ruler = {} // 校验规则
            let dis = {} // 是否禁止修改
            let clmmap = {}
            let showEvents = {}; //显示隐藏事件
            let setValEvents = {}; //设值逻辑事件
            for (let c of columns) {
                if (c.clmValue == undefined) {
                    c.clmValue = ''
                }
            }
            if (columns == []) {
                return
            }
            for (let i = 0; i < columns.length; i++) {
                // 获取getByid数据重新给赋值
                if (res != undefined) {
                    for (let j in res) {
                        if (j == columns[i].clmName) {
                            columns[i].clmValue = res[j]
                        } else if (j == columns[i].clmName + "Dis") {
                            columns[i].clmDisValue = res[j]
                        }
                    }
                } else {
                    // 判断是否有默认值
                    if (columns[i].sffDefault) {
                        columns[i].clmValue = columns[i].sffDefault
                    } else {
                        columns[i].clmValue = ''
                    }
                }
                if (columns[i].clmLayout === 20) {
                    // 当数据类型为checkBox group时，需要数据类型为数组
                    if (columns[i].clmValue !== '') {
                        form[columns[i].clmName] = columns[i].clmValue.split(',')
                    } else {
                        form[columns[i].clmName] = []
                    }
                } else {
                    // form[columns[i].clmName] = columns[i].clmValue
                    // 判断表单是否有值 有值取clmValue字段值 无值取默认字段
                    form[columns[i].clmName] = (columns[i].clmValue !== '' ? columns[i].clmValue : (columns[i].sffDefault !== undefined ? columns[i].sffDefault : ''))
                }
                if (columns[i].clmName !== 'companyId') {
                    clmmap[columns[i].clmName] = columns[i].clmDbName
                }
                if (columns[i].columnValid) {
                    ruler[columns[i].clmName] = []
                    for (let j = 0; j < columns[i].columnValid.length; j++) {
                        ruler[columns[i].clmName].push({
                            validator: (rule, value, callback) => {
                                if (columns[i].clmfilter) {
                                    let arr = [];
                                    let results = false
                                    let data = columns[i].clmfilter
                                    let a = data.split(";");
                                    for (let i = 0; i < a.length; i++) {
                                        if (a[i] !== "") {
                                            // 去除空格的影响, 对过滤的影响
                                            let b = a[i].split("=");
                                            let obj = {};
                                            for (let j = 0; j < b.length; j++) {
                                                if (b[j].substring(0, 1) !== "$") {
                                                    obj["key"] = b[j];
                                                } else {
                                                    obj["value"] = b[j].substring(1);
                                                }
                                            }
                                            arr.push(obj);
                                        }
                                    }
                                    arr.forEach((item, index) => {
                                        for (let k in t.popFormNice) {
                                            if (item.key == k && item.value == t.popFormNice[k]) {
                                                results = true
                                            }
                                            if (t.popFormNice[columns[i].clmName] == '') {
                                                results = true
                                            }
                                        }
                                    })
                                    if (!validCode[rule.valid](value) && results) {
                                        callback(new Error(rule.message));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    let newVal = '';
                                    let isTime = '';
                                    let clmvValue = columns[i].columnValid[j].clmvValue
                                    if (clmvValue) {
                                        if (clmvValue.indexOf('@') > -1) {
                                            newVal = clmvValue.split('@')[0]
                                            isTime = clmvValue.split('@')[1]
                                        } else {
                                            newVal = columns[i].columnValid[j].clmvValue
                                        }
                                    }
                                    if (isTime) {
                                        if (!validCode[rule.valid](value, t.popFormNice[newVal], isTime)) {
                                            columns.find(item => {
                                                if (item.clmName === newVal) {
                                                    this.newName = item.clmDname ? item.clmDname : ''
                                                    rule.message = rule.message + this.newName
                                                    callback(new Error())
                                                }
                                            })
                                            callback(new Error(rule.message));
                                        } else {
                                            callback();
                                        }
                                    } else {
                                        // console.log(columns[i])
                                        if (!validCode[rule.valid](value, newVal)) {
                                            callback(new Error(rule.message));
                                        } else {
                                            callback();
                                        }
                                    }
                                }
                            },
                            trigger: 'change',
                            required: "true",
                            message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                            valid: columns[i].columnValid[j].clmvMod,
                        })
                    }
                }
                //储存弹出框
                if (columns[i].clmLayout == 13 || columns[i].clmLayout == 12 || columns[i].clmLayout == 11 || columns[i].clmLayout == 1 || columns[i].clmLayout == 3) {
                    this.popForm[columns[i].clmName] = columns[i].clmValue;
                    this.clmkvMap[columns[i].clmName] = columns[i].clmDname;
                }
                //添加显示隐藏事件
                if (columns[i].clmChgjs_dis && columns[i].clmChgjs_dis !== "") {
                    showEvents[columns[i].clmName] = columns[i].clmChgjs_dis;
                }
                //添加设置值事件
                if (columns[i].clmChgjs && columns[i].clmChgjs !== "") {
                    setValEvents[columns[i].clmName] = columns[i].clmChgjs;
                }
                if (columns[i].clmDefDis === false) {
                    // 默认是否显示
                    delete form[columns[i].clmName]
                }
                if (columns[i].clmIsupdate === true) {
                    dis[columns[i].clmName] = true
                } else {
                    dis[columns[i].clmName] = false
                }
            }
            if (form.id == '') {
                delete form.id
            }
            // 弹出选择
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].clmLayout == 13) {
                    if (columns[i].clmValue == undefined) {
                        this.popForm[columns[i].clmName] = ''
                    } else {
                        this.popForm[columns[i].clmName] = columns[i].clmValue
                    }

                }
            }
            for (const dat in form) {
                if (form[dat] === undefined) {
                    form[dat] = ''
                }
            }

            form._mt = this.$global.mt + 'PlatAutoLayoutSave.addOrUpd'
            form.APlogType = '保存'
            formData.form = form
            formData.ruler = ruler
            formData.clmmap = clmmap
            formData.dis = dis
            formData.showEvents = showEvents;
            formData.setValEvents = setValEvents;
            console.log(formData, '表单数据')
            return formData
        },
        // 获取表格字段
        getColumns () {
            const t = this
            t.loadingSpin = true
            let aa = []
            let w = 20;
            aa = JSON.parse(JSON.stringify(t.tableColumns))
            // 获取byid数据
            // t.getById(t.thisPkValue)
            // 获取块级数据
            this.getDataBlock()
            // if (aa[0].type == 'selection') {
            //     aa.splice(0, 1)
            // }
            // for (let i = 0; i < aa.length; i++) {
            //     aa[i].sortable = false
            //     if (aa[i].className !== '') {
            //         if (aa[i].stepOrder && aa[i].stepOrder !== "") {
            //             aa[i].title = "【" + aa[i].stepOrder + "】" + aa[i].title
            //         }

            //         aa[i]['render'] = (h, params) => {
            //             if (this.stepId === params.row[params.column.key].split('$')[1]) {
            //                 this.stepOrApproval = params.row[params.column.key].split('$')[6] // 判断是步骤流程还是审批流程
            //             }
            //             let bb = []
            //             if (params.row[aa[i].key]) {
            //                 bb = params.row[aa[i].key].split('$')
            //             }
            //             let text = ''
            //             let show = ''
            //             switch (bb[3]) {
            //                 case 'p_flowst_0':
            //                     show = '未开启'
            //                     break
            //                 case 'p_flowst_1':
            //                     show = '待处理'
            //                     break
            //                 case 'p_flowst_2':
            //                     show = '处理中'
            //                     break
            //                 case 'p_flowst_3':
            //                     show = '已完成'
            //                     break
            //             }
            //             if (bb[2]) {
            //                 text = '[ ' + bb[2] + ' ]'
            //             }
            //             if (text !== '') {
            //                 return h('Tooltip', {
            //                     props: {
            //                         trigger: 'hover',
            //                         content: show,
            //                         placement: 'top',
            //                     },
            //                     style: {
            //                         height: '100%',
            //                         width: '100%',
            //                     },
            //                 }, [
            //                     h('div', {
            //                         style: {
            //                             width: '100%',
            //                             height: '40px',
            //                             lineHeight: '40px',
            //                             textAlign: 'center',
            //                             display: 'flex',
            //                             alignItems: 'center',
            //                             cursor: 'pointer',
            //                         },
            //                         on: {
            //                             click: () => {
            //                                 this.thisPkValue = params.row.id
            //                                 this.thisStepId = params.row[params.column.key].split('$')[1]
            //                                 if (params.row[params.column.key].split('$')[3] === 'p_flowst_0') {
            //                                     return
            //                                 }
            //                                 this.thisStepState = params.row[params.column.key].split('$')[3]
            //                                 this.stepOrApproval = params.row[params.column.key].split('$')[6] // 判断是步骤流程还是审批流程
            //                                 this.thisSetpName = 'Step ' + params.row[params.column.key].split('$')[2] + ': ' + params.row[params.column.key].split('$')[5]
            //                                 this.getDataBlock()
            //                             },
            //                         },
            //                     }, [
            //                         h('div', {
            //                             style: {
            //                                 width: '64px',
            //                                 height: '22px',
            //                                 borderRadius: '4px',
            //                                 backgroundColor: this.flowStateBg[params.row[params.column.key].split('$')[3]],
            //                                 justifyContent: 'center',
            //                                 alignItems: 'center',
            //                                 display: 'flex',
            //                             },
            //                         }, [
            //                             h('img', {
            //                                 attrs: {
            //                                     src: this.flowImg[params.row[params.column.key].split('$')[3]],
            //                                     draggable: 'false',
            //                                 },
            //                                 style: {
            //                                     display: 'inline-block',
            //                                     width: '16px',
            //                                     height: '16px',
            //                                     marginRight: '4px',
            //                                 },
            //                             }),
            //                             h('span', {
            //                                 style: {
            //                                     display: 'inline-block',
            //                                     color: this.fontColor[params.row[params.column.key].split('$')[3]],
            //                                     fontSize: '12px',
            //                                     verticalAlign: 'middle',
            //                                 },
            //                             }, show),
            //                         ], ''),
            //                     ], ''),
            //                 ])
            //             }
            //             return h()
            //         }
            //     }
            //     if (aa[i].title && aa[i].title.length < 6) {
            //         w = 60;
            //     } else {
            //         w = 20;
            //     }
            //     aa[i].width = 12 * aa[i].title.length + w;
            // }
            // t.columns = aa
            // this.getData()
        },
        // 获取表单数据       
        getData () {
            const t = this
            t.data = []
            getDataLevelUserLoginData({
                _mt: this.$global.mt + t.tbName + '.getPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: '1',
                APpage: '1',
                AProleType: t.$store.state.user.roleType,
                APlogType: 'getPage',
                APffk: `glc${this.funId}`,
                APdata: JSON.stringify({
                    id: t.thisPkValue
                }),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = JSON.parse(res.data.content[0].rows)
                    for (let i = 0; i < t.data.length; i++) {
                        t.data[i].cellClassName = {}
                        for (let item in t.data[i]) {
                            if (typeof t.data[i][item] === 'string') {
                                if (t.data[i][item].split('$').length > 1) {
                                    t.data[i].cellClassName[item] = t.data[i][item].split('$')[3]
                                }
                            }
                        }
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                // t.loadingSpin =false
            })
        },
        // 获取表单字段配置
        getColumn () {
            const t = this
            t.loadingSpin = true;
            const params = {
                _mt: this.$global.mt + 'PlatAutoLayoutGetEdit.getEditColumn',
                APflowId: t.flowId, // 流程ID
                APstepId: t.thisStepId, // 流程步骤ID
                APpkValue: t.thisPkValue,
                APfunId:1974
            }
            getDataLevelUserLoginData(params).then((res) => {
                console.log(res, "res")
                if (JSON.stringify(res.data.content[0]) !== "{}") {
                    t.dataBlocks = []; // 进入之后每次清空datablock里的数据
                    let bb = t.dataBlocksFake.filter(item => {
                        return item.flsdbType === '01form'
                    })
                    for (let v of bb) {
                        v.blockColumn = res.data.content[0];
                        let dataColumn = [];
                        for (let k of res.data.content[0].columns) {
                            if (k.flowDataid && k.flowDataid === v.id) {
                                dataColumn.push(k)
                            }
                        }
                        v.formlist = t.getFormDataSubmit(dataColumn, t.niceData);
                    }
                    t.dataBlocks = bb;
                    t.getValueMap(t.dataBlocks)
                    this.$store.commit("flowClmkMap/setClmkvMap", this.clmkvMap);
                    this.clmkvMap = {}; // 清空
                    this.$store.commit("flowClmkMap/setPopForm", this.popForm);
                    this.popForm = {}; // 清空
                    var formName = t.tbName + t.$global.mt
                    if (onChange.hasOwnProperty(formName)) {
                        setTimeout(() => {
                            onChange[formName].all_dis.call(this)
                        }, 500)
                    }
                }
            }).catch((res) => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.loadingSpin = false
            }).finally(() => {
                t.loadingSpin = false
            })
        },
        //获取块显示
        getValueMap (dataBlocks) {
            const t = this
            t.valueMap = {}
            for (let i = 0; i < dataBlocks.length; i++) {
                let item = dataBlocks[i].blockColumn.columns
                for (let j = 0; j < item.length; j++) {
                    if (item[j].flowDataid === dataBlocks[i].id) {
                        t.valueMap[item[j].clmName] = 'block' + dataBlocks[i].id
                    }
                }
            }
        },
        // 获取当前选中数据
        getById (id) {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + t.tbName+'.getById',
                APid: id,
                APlogType: '获取单条数据',
                APfunId:1974,
                APffk: `gec${this.funId}${this.flowId}${this.stepId}${this.userId}`
            }).then((res) => {
                t.niceData = res.data.content[0]
                t.$nextTick(() => {
                    t.isScorll()
                    t.getColumns()
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                // t.loading = false
            })
        },
        // 关闭流程弹窗
        close () {
            const t = this
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '是否确认关闭？',
                onOk: () => {
                    localStorage.setItem('apptrOrder', '')
                    t.docs = []
                    t.operation = []
                    t.mailRecords = []
                    t.$emit('closeUp')
                },
            })
        },
        // 下载附件
        downloadDocs (url, filename, id) {
            const t = this
            let data = {
                _mt: this.$global.mt + 'SubGetList.getfiletoken',
                APisprivate: true,
                APlogType: '下载',
                APfilekey: url,
                APexpiresecs: 180,
                APflowId: t.flowId, // 流程ID
                APdataId: id, // 流程ID
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
                        let link = document.createElement('a')
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.click()
                    }
                    this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                    localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                }
            }).catch(() => {
                //	        t.$Modal.error({
                //	          title: this.$t('reminder.err'),
                //	          content: this.$t('reminder.errormessage'),
                //	        })
            })
        },
        // 确定是否提交
        isSubmit () {
            const t = this
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '是否确认提交？',
                onOk: () => {
                    t.submit()
                },
            })
        },
        // 提交
        async submit () {
            const t = this
            t.loading1 = true
            t.loadingSpin = true
            t.formDataSubmit = {}
            try {
                let a = true
                for (let i = 0; i < this.$children.length; i++) {
                    if (this.$children[i].$options) {
                        if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                            let b = true
                            if (this.$children[i].$children[0].$children[0].$children[0].clmCustomrouter === undefined) {
                                b = await this.$children[i].validForm()
                            }
                            if (!b) {
                                a = false
                            }
                            extendObject(t.formDataSubmit, t.$children[i].formDataSubmit)
                            extendObject(t.clmMap, t.$children[i].clmMap)
                        }
                    }
                }
                if (!a) {
                    t.loading1 = false
                    t.loadingSpin = false
                    return
                }
                let c = true
                let obj = t.formDataSubmit
                c = isField(t.stepCode, obj, t)
                if (!c) {
                    t.loading1 = false
                    return
                }
                t.formDataSubmit._mt = this.$global.mt + t.tbName + '.submit'
                t.formDataSubmit.APtbName = t.tbName
                t.formDataSubmit.APstepId = t.thisStepId
                t.formDataSubmit.AProleType = t.$store.state.user.roleType // 角色类型
                t.formDataSubmit.APflowId = t.flowId
                t.formDataSubmit.id = t.thisPkValue
                t.formDataSubmit.APfunId = '1974'
                t.formDataSubmit.APlogType = '提交'
                t.formDataSubmit.APclmMap = JSON.stringify(t.clmMap)
                getDataLevelUserLoginData(t.formDataSubmit).then((res) => {
                    t.loading1 = false
                    if (isSuccess(res, t)) {
                        let data = {}
                        data._mt = this.$global.mt + t.tbName + '.submit'
                        data.APtbName = t.tbName
                        data.APstepId = t.thisStepId
                        data.AProleType = t.$store.state.user.roleType // 角色类型
                        data.APflowId = t.flowId
                        data.APid = t.thisPkValue
                        data.APlogType = 'submit'
                        t.thisStepState = 'p_flowst_3'
                        t.getById(this.thisPkValue)
                        t.$emit('getData')
                        t.$Modal.success({
                            title: '提交成功',
                            content: '提交成功',
                        })
                        t.loadingSpin = true
                    } else {
                        t.loadingSpin = false
                    }
                }).catch(() => {
                    t.loading1 = false
                    t.loadingSpin = false
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            } catch (res) {
            }
        },
        // 保存方法
        async save () {
            const t = this
            t.loading1 = true
            t.loadingSpin = true
            t.formDataSubmit = {}
            try {
                let a = true
                for (let i = 0; i < this.$children.length; i++) {
                    if (this.$children[i].$options) {
                        if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                            let b = true;
                            if (this.$children[i].$children[0].$children[0].$children[0].clmCustomrouter === undefined) {
                                b = await this.$children[i].validForm()
                            }
                            if (!b) {
                                a = false
                            }
                            extendObject(t.formDataSubmit, t.$children[i].formDataSubmit)
                            extendObject(t.clmMap, t.$children[i].clmMap)
                        }
                    }
                }
                if (!a) {
                    t.loading1 = false
                    t.loadingSpin = false
                    return
                }
                t.formDataSubmit._mt = this.$global.mt + t.tbName + '.save'
                t.formDataSubmit.APtbName = t.tbName
                t.formDataSubmit.APstepId = t.thisStepId
                t.formDataSubmit.AProleType = t.$store.state.user.roleType // 角色类型
                t.formDataSubmit.APflowId = t.flowId
                t.formDataSubmit.id = t.thisPkValue
                t.formDataSubmit.APlogType = '保存'
                t.formDataSubmit.APfunId = '1974'
                t.formDataSubmit.APclmMap = JSON.stringify(t.clmMap)
                if (t.formDataSubmit.hasOwnProperty('empbcContent')) { // 用来判断提交时是否有多选框  有的话需要把值转为字符串传到后台
                    t.formDataSubmit.empbcContent = t.formDataSubmit.empbcContent.join(',')
                }
                getDataLevelUserLoginData(t.formDataSubmit).then((res) => {
                    t.loading1 = false
                    if (isSuccess(res, t)) {
                        if (t.thisPkValue === '0') {
                            t.thisPkValue = res.data.content[0].id
                            // t.thisStepId = res.data.content[0].value.split('_')[1]
                            // t.getData()
                            t.$emit('getData')
                            t.thisSetpName = this.$t('button.y.upd')
                        }
                        // this.getData()
                        // this.getDataBlock()
                        t.$Modal.success({
                            title: '保存成功',
                            content: '保存成功',
                        })
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                }).finally(() => {
                    t.loading1 = false
                    t.loadingSpin = false
                })
            } catch (res) {
                t.loading1 = false
            }
        },
        //监听表单字段
        submitData (val) {
            const t = this;
            t.formDataSubmit = {}
            for (let i = 0; i < this.$children.length; i++) {
                if (this.$children[i].$options) {
                    if (this.$children[i].$options._componentTag === 'commonSingleForm') {
                        extendObject(t.formDataSubmit, t.$children[i].formDataSubmit)
                    }
                }
            }
            t.formParams = t.formDataSubmit;

        },
        //form滚动事件
        formScroll () {
            let selectDom = document.getElementsByClassName("ivu-select-visible");
            let datePickerDom = document.getElementsByClassName(
                "ivu-date-picker-focused"
            );
            if (selectDom.length > 0 || datePickerDom.length > 0) {
                let modal = document.getElementsByClassName("cover")[0];
                modal.click();
            }
        },
        // 接受总计数据
        summary (obj, columns) {
            // console.log(obj,"objjjjjjjjjjjj")
            // console.log(columns,"columnssss")
            // this.sumData.push(obj);
            this.sumData[obj.index] = obj;
            this.sumColumns = columns;
            // console.log(this.sumData,"datadddd")
            this.formatSumdata(this.sumData, columns)
        },
        // 格式化总计数据
        formatSumdata (arr, columns) {
            let obj = {};
            let sums = {};
            let sum = [];
            let fixGrowth = 0;
            let emphYgcost = '';
            this.sumNum = [];
            console.log(arr,"arrr")
            arr.forEach(item => {
                if (item.ycprKemuDis === '固定收入合计') {
                    this.sumNum.push(item)
                    this.$store.commit('flowList/setFixedIncome',item.ycprYtaxf);
                    let fixSum = Number(item.ycprYtaxf);
                    // console.log(this,"this")
                    // console.log(fixSum,"fixSum")
                    if(this.valueMap.emphYgcost && this.$refs[this.valueMap.emphYgcost][0].formshow.hasOwnProperty('emphYgcost')) {
                        emphYgcost = this.formDataSubmit.emphYgcost;
                        // console.log(emphYgcost,"emphYgcost")
                        if(!isNaN(emphYgcost) && Number(emphYgcost)) {
                            fixGrowth = ((Number(emphYgcost) - fixSum) / Number(emphYgcost)).toFixed(2);
                            // console.log(fixGrowth,"fixGrowth")
                            this.$refs[this.valueMap.emphYgcz][0].formDataSubmit.emphYgcz = fixGrowth;
                        }else {
                            this.$refs[this.valueMap.emphYgcz][0].formDataSubmit.emphYgcz = '0.00';
                        }
                    }
                } else if (item.ycprKemuDis === '浮动收入合计') {
                    sum.push(item)
                }
            })

            // console.log(this.sumNum,"summnmnmnm")
            // console.log(arr,"arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
            columns.forEach((column, index) => {
                const key = column.key;
                let values = sum.map(item => Number(item[key]));
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[key] = v.toFixed(2)
                } else {
                    sums[key] = '浮动收入合计'
                }
            })
            this.sumNum.push(sums)
            this.showSum = true;
        }
    },
    watch: {
        thisStepState (value) {
            if (value === 'p_flowst_3') {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
    },
}

</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd.scss";
@import "~@/sass/commonFlowUpd.scss";
/deep/.footer_box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* position: absolute; */
    height: 46px;
    width: 100%;
    line-height: 52px;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    right: 0;
}
</style>
