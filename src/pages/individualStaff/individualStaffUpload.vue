<template>
    <div class="cover">
         <Spin size="large"
                  fix
                  v-if="loadingSpin"></Spin>
        <div class="box">
          
            <div class="title">
                <div class="title-logo">
                    <img src="../../../static/entryImg/huaxiaLogo.png" alt="">
                    <span>欢迎新同学加入~</span>
                </div>
                <div class="title-text">
                    <!-- <Icon type="ios-bookmark"
                          size="16"></Icon> -->
                   个人信息入职附件登记表
                </div>
                <!-- <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button> -->
            </div>
            <div class="newform" ref="nicework">
                <!-- banner -->
                <div class="banner">
                    <img src="../../../static/entryImg/banner.png" alt="">
                </div>
                <!-- 基本信息 -->
                 <div class="content"
                     ref="scrollBox"
                     @scroll="formScroll">
                    <!-- <row :class="thisSetpName===''?'table-form-nomar':'table-form'"
                         ref="table-form">
                        <Table v-show="thisPkValue!=='0'"
                               size="small"
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
                         :key="item.id"
                         v-show="thisSetpName !== ''">
                        <!--  -->
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <childTable :funId="item.flsdbSubform"
                                        :funCode="item.flsdbSubcode"
                                        :mainId="thisPkValue"
                                        :relazd="item.flsdbFarela"
                                        :flowId="flowId"
                                        :stepId="thisStepId"
                                        :flsdbIschirdsum="item.flsdbIschirdsum"
                                        :flsdbSubfilter="item.flsdbSubfilter"
                                        :formParams="formParams"
                                        :flsdbSubisupd="item.flsdbSubisupd"
                                        :thisStepState="thisStepState"
                                        :mainTbName="tbName"
                                        v-if="thisSetpName !== ''"
                                        @summary="summary"> </childTable>
                            <div class="dataBlocks"
                                 v-if="showSum && item.flsdbName === '原单位薪酬（奖金）'">
                                <div class="dataBlocksTitle"
                                     style="margin-top:10px">
                                    <Icon type="compose"
                                          style="margin-right: 5px;"></Icon>原单位薪酬（总计）
                                </div>
                                <div class="dataContent"
                                     style="padding-bottom:0">
                                    <sumTable :sumData="sumNum"
                                              :sumColumns="sumColumns"
                                              :dataBlocks="dataBlocks"
                                              :dom="dom"></sumTable>
                                </div>
                            </div>
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
                                    <span style="margin-left: 10px;">{{item2.time ? item2.time : ''}}</span>
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
                                            <Input :value="stepCode=='flow_entr_1040'?myName:item.flsdbMark.optuser"
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
                         v-show="thisStepState !== 'p_flowst_3' && thisStepState !== 'p_flowst_0'&& thisStepState !== 'p_flowst_4'">
                        <div class="footerChilden">
                            <Button type="primary"
                                    @click="save"
                                   
                                    :disabled="thisDis"
                                    :loading="loading1"><span v-show="!loading1">{{$t('button.sav')}}</span></Button>
                            <Button type="primary"
                                    :loading="loading1"
                                    @click="sendSign"
                                    v-show="qysBtn"><span v-show="!loading1">{{stepCode == "flow_prove_1000" ? '发送公司盖章' : '发送电子签'}}</span></Button>
                            <Button type="success"
                                    style="margin-left: 5px;"
                                    @click="isSubmit"
                                    :disabled="thisDis"
                                    :loading="loading1"
                                    v-show="thisPkValue !== '0'"><span v-show="!loading1">提交</span></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <transition name="fade">
            <emaillogView v-show="openUpdate"
                          logType="查询"
                          @closeUp="closeUp"
                          ref="update"></emaillogView>
        </transition>
    </div>
</template>
<script>
import commonSingleForm from '@/pages/common/commonCompanents/commonSingleForm'
import testUpdPage from '@/pages/common/commonList/commonSinglePageUpdate.vue'
import emaillogView from '@/pages/common/commonFlowList/emaillogView.vue'
import childTable from '@/pages/common/flowChildTable/childTable'
import sumTable from '@/pages/common/flowSumTable/sumTable'
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile,getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccessNew, 
    isSuccess,
    findComponentUpward,
    deepCopy,
    extendObject} from '@/lib/util'
import { isField } from '@/lib/pub_isField'
import validCode from '@/pages/common/commonCompanents/validCode'
import {
    onChange
} from '@/pages/common/onChange/index'
import Bus from '@/pages/common/bus'
export default {
    data () {
        return {
       //数据块loading
            loadingSpin: false,
            //邮件状态
            openUpdate: false,
            myName: '',
            //保存提交置灰
            thisDis: false,
            //数据块
            dataBlocks: [],
            //disabled状态
            disabled: this.stepState === 'p_flowst_3' || this.thisStepState === 'p_flowst_4',
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
            // thisPkValue: this.pkValue,
            //步骤
            // thisStepId: this.stepId,
            //步骤状态
            // thisStepState: this.stepState,
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
                "p_flowst_0": require('../../../static/img/p_flowst_0.png'),
                "p_flowst_1": require('../../../static/img/p_flowst_1.png'),
                "p_flowst_2": require('../../../static/img/p_flowst_2.png'),
                "p_flowst_3": require('../../../static/img/p_flowst_3.png'),
                "p_flowst_4": require('../../../static/img/p_flowst_4.png'),
            },
            //流程状态颜色
            flowStateBg: {
                "p_flowst_0": "",
                "p_flowst_1": "#FD914F",
                "p_flowst_2": "#FD914F",
                "p_flowst_3": "",
                "p_flowst_4": "",
            },
            //字体颜色
            fontColor: {
                "p_flowst_0": "#666666",
                "p_flowst_1": "#ffffff",
                "p_flowst_2": "#ffffff",
                "p_flowst_3": "#5AC01B",
                "p_flowst_4": "#d1363a",
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
            //契约锁按钮
            qysBtn: false,
            niceData: '',
            valueMap: {},
            /**
             * 子表总计
             */
            showSum: false,
            sumData: [],
            sumNum: [],
            sumColumns: [],
            dom: this,
            qysBtnName: this.stepCode == "flow_prove_1000" ? '发送公司盖章' : '发送电子签',
            tbName:'EmpFlowEntr',
            thisPkValue:'',
            flowId:'',
            thisStepId:'',
            thisStepState:'',
            tableColumns:[],
            // setpName:
        }
    },
    components: {
        commonSingleForm,
        emaillogView,
        testUpdPage,
        childTable,
        sumTable
    },
    props: {
        // flowId: String,
        // pkValue: String,
        // stepId: String,
        // setpName: String,
        // stepState: String,
        // tbName: String,
        // newMt: String,
        // formColumns: Array
    },
    updated () {

    },
    mounted(){
        this.init()
    },
    computed: {
        // tableColumns () {
        //     console.log(this.$store.state.flowList.tableColumns, "tableColumns")
        //     return this.$store.state.flowList.tableColumns;
        // },
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
    destroyed () {
        window.onresize = null;
    },
    methods: {
        // 初始化
        init () {
            this.$store.commit('setFunId', '1975')
            this.$store.commit('setRoleType','3user')
            this.initNewData()
            // if (this.thisSetpName !== '') {
            //     this.getById(this.thisPkValue)
            // } else {
            //     this.getDataBlock()
            // }
        },
        initNewData(){
            const t = this
             t.loadingSpin = true
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'EmpFlowEntr.selDaisyIds',
            }).then((res) => {
                t.thisPkValue = res.data.content[0].thisPkValue
                t.flowId = res.data.content[0].flowId
                t.thisStepId = res.data.content[0].thisStepId
                t.thisStepState = res.data.content[0].stepState
                t.$nextTick(() => {
                    // t.isScorll()
                    this.getById(this.thisPkValue)
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loadingSpin = false
            })
        },
        // 是否超出滚动
        isScorll () {
            const scroll = document.getElementsByClassName('table-form')
            if(scroll[0].scrollHeight){
                scroll[0].scrollHeight > scroll[0].clientHeight || scroll[0].offsetHeight > scroll[0].clientHeight ? this.isScorllY = true : this.isScorllY = false
            }
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
                        t.ChildDataBloks.push(v);
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
                        v.flsdbMark = JSON.parse((v.flsdbMark).replace(/[\r\n]/g, ""))
                        t.mailRecords.push(v)
                    }
                }
            }).catch((err) => {
                t.loadingSpin = false
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
                if (res != undefined && res != '') {
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
                        if (columns[i].clmLayout === 13) { //弹出框
                            console.log(columns[i], "columns")
                            let value = columns[i].sffDefault.split('&');
                            columns[i].clmValue = value[0];
                            columns[i].clmDisValue = value[1];
                        } else {
                            columns[i].clmValue = columns[i].sffDefault;
                        }
                        // columns[i].clmValue = columns[i].sffDefault
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
                                !value ? value = '' : value
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
                                    if ((value === "" && !rule.required)) {
                                        callback();
                                    } else {
                                        if (!validCode[rule.valid](value) && results) {
                                            callback(new Error(rule.message));
                                        } else {
                                            callback();
                                        }
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
                                    if ((value === "" && !rule.required)) {
                                        callback();
                                    } else {
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
                                }
                            },
                            trigger: 'change',
                            required: columns[i].columnValid[j].clmvIsmust,
                            message: columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                            valid: columns[i].columnValid[j].clmvMod,
                        })
                    }
                }
                //储存弹出框
                if (columns[i].clmLayout == 74) {
                    if (columns[i].clmfilter && columns[i].clmfilter !== '') {
                        let filter = columns[i].clmfilter.split("#");
                        t.qysBtn = filter.some((value, index) => {
                            return value == t.thisStepId;
                        })
                    }
                }
                if (columns[i].clmLayout == 13 || columns[i].clmLayout == 12 || columns[i].clmLayout == 11 || columns[i].clmLayout == 1 || columns[i].clmLayout == 3 || columns[i].clmLayout == 90 || columns[i].clmLayout == 92 || columns[i].clmLayout == 74) {
                    if (columns[i].clmValue && columns[i].clmValue !== '') {
                        t.popForm[columns[i].clmName] = columns[i].clmValue;
                        t.clmkvMap[columns[i].clmName] = columns[i].clmDname;
                    } else if (columns[i].sffDefault && columns[i].sffDefault !== '') {
                        t.popForm[columns[i].clmName] = columns[i].sffDefault;
                        t.clmkvMap[columns[i].clmName] = columns[i].clmDname;
                    } else {
                        t.popForm[columns[i].clmName] = "";
                        t.clmkvMap[columns[i].clmName] = columns[i].clmDname;
                    }
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
            // console.log(formData, '表单数据')
            return formData
        },
        // 获取表格字段
        getColumns () {
            const t = this
            t.loadingSpin = true
             getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getListColumn',
                AProleType: t.$store.state.user.roleType,
                APlogType: 'getListColumn',
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.tableColumns = JSON.parse(JSON.stringify(res.data.content[0].columns));
                }
            })
            let aa = []
            aa = JSON.parse(JSON.stringify(t.tableColumns))
            // 获取byid数据
            // t.getById(t.thisPkValue)
            // 获取块级数据
            this.getDataBlock()
            if (aa[0].type == 'selection') {
                aa.splice(0, 1)
            }
            for (let i = 0; i < aa.length; i++) {
                aa[i].sortable = false
                if (aa[i].className !== '') {
                    if (aa[i].stepOrder && aa[i].stepOrder !== "") {
                        aa[i].title = "【" + aa[i].stepOrder + "】" + aa[i].title
                    }
                    aa[i]['render'] = (h, params) => {
                        if (this.stepId === params.row[params.column.key].split('$')[1]) {
                            this.stepOrApproval = params.row[params.column.key].split('$')[6] // 判断是步骤流程还是审批流程
                        }
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
                                        height: '40px',
                                        lineHeight: '40px',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: params.row[params.column.key].split('$')[3] === 'p_flowst_0' || params.row[params.column.key].split('$')[4] === 'none' ? '' : 'pointer',
                                    },
                                    on: {
                                        click: () => {
                                            this.thisPkValue = params.row.id
                                            this.thisStepId = Number(params.row[params.column.key].split('$')[1])
                                            let stepAuth = params.row[params.column.key].split('$')[4];
                                            if (params.row[params.column.key].split('$')[3] === 'p_flowst_0' || stepAuth === 'none') {
                                                return
                                            }
                                            this.thisStepState = params.row[params.column.key].split('$')[3]
                                            this.stepOrApproval = params.row[params.column.key].split('$')[6] // 判断是步骤流程还是审批流程
                                            this.thisSetpName = 'Step ' + params.row[params.column.key].split('$')[2] + ': ' + params.row[params.column.key].split('$')[5]
                                            this.getById(t.thisPkValue)
                                        },
                                    },
                                }, [
                                    h('div', {
                                        style: {
                                            width: '64px',
                                            height: '22px',
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
                aa[i].width = t.sumWidth(aa[i].title)
            }
            t.columns = aa
            // this.getData()
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
        // 获取表单数据
        getData () {
            const t = this
            t.data = [];
            let mt = ""
            if (t.newMt !== '') {
                mt = this.$global.mt + t.newMt
            } else {
                mt = this.$global.mt + t.tbName + '.getPage'
            }
            getDataLevelUserLoginData({
                _mt: mt,
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
                _mt: this.$global.mt + t.tbName + '.getById',
                APid: id,
                APlogType: '获取单条数据',
                APffk: `gec${this.funId}${this.flowId}${this.stepId}${this.userId}`
            }).then((res) => {
                t.niceData = res.data.content[0]
                t.myName = res.data.content[0].entEmpname
                t.$nextTick(() => {
                    // t.isScorll()
                    // t.getColumns()
                   this.getDataBlock()
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
                    t.$emit('close')
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
            let termroleType = localStorage.roleType;
            if (termroleType === "3user" && this.stepCode === "flow_termination_1100") {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '是否确认提交？',
                    onOk: () => {
                        // t.submit()
                        // t.$Message.warning('请提醒员工在离职日期前确保完成报销审批', 5000)
                        setTimeout(() => {
                            this.$Modal.warning({
                                title: this.$t('reminder.remind'),
                                content: "请提醒员工在离职日期前确保完成报销审批",
                            })
                        }, 500);
                        t.submit()
                    },
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '是否确认提交？',
                    onOk: () => {
                        t.submit()
                    },
                })
            }
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
                        // t.getById(this.thisPkValue)
                        // t.$emit('getData')
                        t.$Modal.success({
                            title: '提交成功',
                            content: '提交成功',
                        })
                        t.loadingSpin = true
                        setTimeout(()=>{
                            // 清除保存状态
                            t.$Modal.remove()
                            t.$router.push('/NewemployeeLoginmain/NewemployeeLogin')
                            // 禁止回退
                            history.pushState(null, null, document.URL);
                            window.addEventListener('popstate', function () {
                                history.pushState(null, null, document.URL);
                            });
                        },2000)
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
        //保存验证错误
        validateError () {
            this.$nextTick(() => {
                let tt = document.querySelectorAll(".ivu-form-item-error");
                this.$refs.scrollBox.scrollTop = tt[0].parentNode.offsetParent.offsetParent.offsetTop;
            });
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
                    t.validateError()
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
                t.formDataSubmit.APclmMap = JSON.stringify(t.clmMap)
                if (t.formDataSubmit.hasOwnProperty('empbcContent')) { // 用来判断提交时是否有多选框  有的话需要把值转为字符串传到后台
                    t.formDataSubmit.empbcContent = t.formDataSubmit.empbcContent.join(',')
                }
                getDataLevelUserLoginData(t.formDataSubmit).then((res) => {
                    t.loading1 = false
                    if (isSuccess(res, t)) {
                        if (t.thisPkValue === '0') {
                            t.thisPkValue = res.data.content[0].id;
                            t.pkValue = res.data.content[0].id;
                            t.thisStepId = res.data.content[0].curStep
                            // t.$emit('getData')
                            t.thisSetpName = this.$t('button.y.upd')
                        }
                        t.getById(t.thisPkValue)
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
            this.sumData[obj.index] = obj;
            this.sumColumns = columns;
            this.formatSumdata(this.sumData, columns)
        },
        // 格式化总计数据
        formatSumdata (arr, columns) {
            const t = this;
            let obj = {};
            let sums = {};
            let sum = [];
            let fixGrowth = 0;
            let emphYgcost = '';
            this.sumNum = [];
            arr.forEach(item => {
                if (item.ycprKemuDis === '固定收入合计') {
                    this.sumNum.push(item)
                    this.$store.commit('flowList/setFixedIncome', item.ycprYtaxf);
                    let fixSum = Number(item.ycprYtaxf);
                    if (t.valueMap.emphYgcost &&
                        t.$refs[t.valueMap.emphYgcost][0] &&
                        t.$refs[t.valueMap.emphYgcost][0].formshow.hasOwnProperty('emphYgcost')) {
                        emphYgcost = this.formDataSubmit.emphYgcost;
                        if (!isNaN(emphYgcost) && Number(emphYgcost) && fixSum) {
                            fixGrowth = ((Number(emphYgcost) - fixSum) / Number(emphYgcost) * 100).toFixed(2);
                            this.$refs[this.valueMap.emphYgcz][0].formDataSubmit.emphYgcz = fixGrowth;
                        } else {
                            this.$refs[this.valueMap.emphYgcz][0].formDataSubmit.emphYgcz = '0.00';
                        }
                    }
                } else if (item.ycprKemuDis === '浮动收入合计') {
                    sum.push(item)
                }
            })

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
        },
        sendSign () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'QysEsign.sendEsign',
                APflowId: t.flowId,
                APstepId: t.thisStepId,
                APdataId: t.thisPkValue,
                APlogType: "发送电子签"
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.getById(t.thisPkValue)
                        t.$Modal.success({
                            title: '发送成功',
                            content: '发送成功',
                        })
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading1 = false
            })
        }
    },
     watch: {
        thisStepState (value) {
            if (value === 'p_flowst_3' || value === 'p_flowst_4') {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
    .dataBlocks{
        padding: 0 50px;
    }
    /deep/.ivu-radio-group-button .ivu-radio-wrapper-checked {
            background: #D85558 !important;
            border-color: #D85558 !important;
            color: #fff !important;
            box-shadow: -1px 0 0 0 #D85558;
            -webkit-box-shadow: -1px 0 0 0 #D85558 !important;
            box-shadow: -1px 0 0 0 #D85558 !important;
    }
    /deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
        color: #fff !important;
    }
    /deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:before {
        width: 0;
        background: #CC4649;
    }
.footer_box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    // position: absolute;
    height: 52px;
    width: 100%;
    line-height: 52px;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    right: 0;
}
.footer_box .footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    width: 100%;
    margin-right: 2%;
}
/deep/  .uploadBtn .ivu-icon {
    color: #CC4649 !important;
}
.ivu-btn-primary {
    background-color: #CC4649 !important;
    border-color: #CC4649 !important;
}
.ivu-btn-success {
    background-color: #CC4649 !important;
    border-color: #CC4649 !important;
}
/deep/.cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    /* align-items: center; */
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    background-image: url(../../../static/entryImg/background.png);
    background-size: cover;
    .box {
        position: absolute;
        width: 100%;
        background: none;
        padding: 130px 200px 0px 200px;
        // border-radius: 10px;
        max-height: 100%;
        overflow: auto;
    }

}
.cover .box .title {
    // display: -webkit-box;
    // display: -ms-flexbox;
    display: block;
    position: fixed;
    height: auto;
    width: 100%;
    // line-height: 40px;
    // -webkit-box-pack: justify;
    // -ms-flex-pack: justify;
    // justify-content: center;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    padding-left: 0;
    top: 0;
    // border-bottom: 1px solid #efefef;
    left: 0;
    z-index: 1000;
    background: #fff;
}
.cover .box .title .title-logo {
    padding: 15px 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    img{
        width: 200px;
        height: 44px;
        display: block;
    }
}
.cover .box .title .title-text {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    background: rgba(191, 0, 8, 1);
    text-align: center;
}
.cover .box .newform{
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    box-shadow: 0px 5px 10px 5px #f5f5f5;
}
.ios-search {
  cursor: pointer;
}
.cover .box .form {
    max-height: 1000px;
    overflow-y: visible;
    margin: 10px;
    scrollbar-width: thin;
}

.dataBlocksTitle {
    font-size: 14px;
    color: #333333;
    position: relative;
    font-weight: bold;
    margin: 0 0 30px 0px;
    border-left-color: #D85558 !important;
    border-left: 4px solid #09A1FB;
    padding: 0 10px;
    span{
        display: block;
        width: 110px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 0;
        left: 40px;
    }
}
.table-form{
    margin: 10px 0;
}
.ivu-date-picker {
    display: inline-block;
    line-height: normal;
    cursor: pointer;
}
.banner {
    padding: 0 50px;
    margin: 10px 0 30px 0;
    img{
        width: 100%;
    }
}
// /deep/ .firstblocks  .ivu-form .ivu-form-item-label {
//         font-size: 12px !important;
//         height: 32px !important;
//         width: 70% !important;
//     }
/deep/ .firstblocks .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 0 !important;
}
/deep/ .specialment1 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 80px !important;
}
/deep/ .specialment2 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 135px !important;
}
/deep/ .specialment3 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 50px !important;
}
/deep/ .specialment4 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 85px !important;
}
/deep/ .specialment5 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 85px !important;
}
/deep/ .specialment6 .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 130px !important;
}
/deep/ .specialmentComment .ivu-form-item-content {
    font-size: 12px !important;
    margin-left: 50px !important;
}
.ivu-upload-select{
    cursor: pointer;
}
.firstblock{
    padding: 0px 50px 20px 50px;
}
.firstblocks{
    padding: 40px 50px 20px 50px;
}
.addDataClass{
    margin-left: 17px;
    .addCursor{
        cursor: pointer;
        display: flex;
        span{
            padding-left: 5px;
        }
    }
}
.message {
    background-color: #f7e2e4;
    padding: 0 10px;
}
.uploadBtn{
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    span{
        padding-left: 10px;
    }
}
    /deep/ .firstblock .ivu-table .demo-table-info-row td {
        background-color: #f7e2e4 !important;
        color: #333;
    }
    .ivu-table .demo-table-error-row td {
        background-color: #7ccd7c !important;
        color: #fff;
    }
    .ivu-table .demo-error-row td {
        /* background-color: #ff0000 !important; */
        color: #f00;
    }
    .ivu-table .demo-table-warning1-row td {
        background-color: #ed4014;
        color: #fff;
    }
    .ivu-radio-group-small .ivu-radio-wrapper-checked {
        background: #be0008;
        color: #fff;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked {
        background: #be0008;
        border-color: #be0008;
        color: #fff;
        box-shadow: 1px 0 0 0 #be0008;
        z-index: 1;
    }
    /deep/ .ivu-radio-group-button .ivu-radio-wrapper:after, .ivu-radio-group-button .ivu-radio-wrapper:before{
        display: none;
    }
    /deep/.firstblock .ivu-radio-checked .ivu-radio-inner {
        border-color: #be0008;
    }
    /deep/.firstblock .ivu-radio-inner:after {
        background-color: #be0008;
    }
     /deep/.ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:first-child{
        box-shadow: 0 0 0 0px rgba(45,140,240,.2);
    }
    .ivu-icon-md-alert:before {
        content: "\F333";
        color: #eb9d20;
    }

    // @import "~@/sass/updateAndAdd.scss";
    // @import "~@/sass/commonFlowUpd.scss";
</style>
