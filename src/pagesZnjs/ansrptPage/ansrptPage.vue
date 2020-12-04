<template>
    <div class="commonFlowList">
        <div class="cover">
            <div class="box">
                <Spin size="large"
                      v-if="loadingSpin"
                      fix></Spin>

                <div class="title">
                    <div class="title-text">
                        <Icon type="ios-bookmark"
                              size="16"></Icon>
                        {{aprvrelTitle}}
                    </div>
                </div>
                <div class="content"
                     ref="scrollBox">
                    <div class="dataBlocks"
                         v-for="(item, index) in dataBlocks"
                         :ref="item.flsdbOrder"
                         :key="item.flsdbOrder">
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
                                              :disabled="updateForm() ? true : (item.flsdbOptauth === '01view' || disabledForm)"
                                              :ref="'block' + item.id"
                                              @formDataSubmit='submitData'
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
                                        :funCode="item.flsdbSubcode"
                                        :mainId="pkValue"
                                        :relazd="item.flsdbFarela"
                                        :flowId="flowId"
                                        :stepId="stepId"
                                        :flsdbSubfilter="item.flsdbSubfilter"
                                        :formParams="formParams"
                                        :flsdbSubisupd="clStatus === '01hand' ?item.flsdbSubisupd:'0'"
                                        :mainTbName="tbName"> </childTable>
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
                         v-for="(item, index) in operation"
                         :key="index">
                        <div class="dataBlocksTitle">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                        </div>
                        <div class="dataContent">
                            <div class="operation">
                                <span style="margin-right: 10px;">操作人:</span><span style="margin-right: 120px;">{{item.flsdbMark.optuser}}</span>
                                <span style="margin-right: 10px;">更新时间:</span><span style="margin-right: 120px;">{{item.flsdbMark.opttime}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="approvRecord"
                         v-if="isHaveRecord">
                        <div class="dataBlocksTitle2">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>审批记录
                        </div>
                        <div class="recordContent">
                            <div v-for="(item, index) in approvRecordList"
                                 :key="index"
                                 class="recordClass">
                                {{item.aprdStepname}}&nbsp;&nbsp;{{item.aprdStepidDis}}&nbsp;&nbsp;{{item.aprdApproverDis}}&nbsp;&nbsp;{{item.aprdAprvtime}}&nbsp;&nbsp;{{item.aprdAprvresultDis}}&nbsp;&nbsp;<span v-if="item.aprdAprvopinion">( 意见： {{item.aprdAprvopinion}} )</span>

                            </div>
                        </div>
                    </div>
                    <div class="approvIdea"
                         v-if="aprdAprvresult === '00processing' && inform ">
                        <div class="dataBlocksTitle2">
                            <Icon type="compose"
                                  style="margin-right: 5px;"></Icon>我的审批
                        </div>
                        <Form ref="formValidate"
                              :model="formValidate"
                              :rules="ruleValidate"
                              :label-width="135">
                            <Row>
                                <i-col span="9"
                                       offset="2"
                                       style="margin-right: 15px;">
                                    <FormItem label="审批人">
                                        <Input v-model="formValidate.aprdApproverDis"
                                               style="width: 85%;"
                                               disabled></Input>
                                    </FormItem>
                                </i-col>
                                <i-col span="9"
                                       offset="1">
                                    <FormItem label="审批时间">
                                        <DatePicker type="datetime"
                                                    placeholder="请选择审批时间..."
                                                    disabled
                                                    style="width: 95%;"
                                                    v-model="formValidate.aprdAprvtime"></DatePicker>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="9"
                                       offset="2">
                                    <FormItem label="审批结论"
                                              prop="aprdAprvresult">
                                        <Select @on-change="selectAprd"
                                                placeholder="请选择审批结论..."
                                                v-model="formValidate.aprdAprvresult"
                                                style="width: 85%;">
                                            <Option :value="item.paramCode"
                                                    v-for="(item,index) in resultList"
                                                    :key="index">{{item.paramInfoCn}}</Option>
                                        </Select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="19"
                                       offset="2"
                                       v-if="!aprdAprvopinionFlag">
                                    <FormItem label="审批意见"
                                              prop="aprdAprvopinion">
                                        <Input type="textarea"
                                               :autosize="{minRows: 2,maxRows: 5}"
                                               placeholder="请填写审批意见..."
                                               v-model="formValidate.aprdAprvopinion"></Input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="19"
                                       offset="2"
                                       v-if="aprdAprvopinionFlag">
                                    <FormItem label="审批意见">
                                        <Input type="textarea"
                                               :autosize="{minRows: 2,maxRows: 5}"
                                               placeholder="请填写审批意见..."
                                               v-model="formValidate.aprdAprvopinion"></Input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div v-if="inform">
                    <div class="footer"
                         v-if="aprvStepid !== '0'">
                        <div v-if="aprdAprvresult === '00processing'">
                            <Button type="success"
                                    style="margin-left: 5px;"
                                    @click="isAprSubmit">提交</Button>
                        </div>
                    </div>
                    <div class="footer_box"
                         v-else>
                        <div class="footer"
                             v-if="clStatus === '01hand'">
                            <div class="footerChilden">
                                <Button type="success"
                                        style="margin-left: 5px;"
                                        @click="isSubmit"
                                        :loading="loading1"><span v-show="!loading1">提交</span></Button>
                            </div>
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
                                        :disabled="thisDis"
                                        @click="isSubmit"
                                        :loading="loading1"><span v-show="!loading1">提交</span></Button>
                            </div>
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
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, findComponentUpward, deepCopy, extendObject } from '@/lib/util'
import validCode from '@/pages/common/commonCompanents/validCode'
import { onChange } from '@/pages/common/onChange/index'
import childTable from '@/pages/common/flowChildTable/childTable'
import emaillogView from '@/pages/common/commonFlowList/emaillogView'
import { isField } from '@/lib/pub_isField'
// import { delete } from 'vue/types/umd'
export default {
    data () {
        return {
            //数据块loading
            loadingSpin: false,
            //邮件状态
            openUpdate: false,
            myName: '',
            //操作按钮状态
            loading1: false,
            //table数据
            data: [],
            //table列数据
            columns: [],
            //数据块
            dataBlocks: [],
            //disabled状态
            disabled: false,
            //dataBlocks存储数据
            dataBlocksFake: [],
            //表单数据
            formData: {},
            //表单提交数据
            formDataSubmit: {},
            // {物理列名：字段中文名}
            clmMap: {},
            //表名
            tbName: '',
            //步骤权限
            stepAuthLimits: '03submit',
            //子集数据块
            ChildDataBloks: [],
            //步骤code
            stepCode: '',
            //步骤状态
            thisStepState: this.stepState,
            //步骤名称
            thisSetpName: this.setpName,
            //新增的审批数据
            formValidate: {
                aprdApprover: this.aprvrelaApproverid,
                aprdApproverDis: '',
                aprdAprvtime: new Date(),
                aprdAprvresult: '',
                aprdAprvopinion: '',
            },
            aprdAprvopinionFlag: false,
            //审批信息
            aprdAprvresult: '',
            //审批下拉数据
            resultList: [],
            //审批纪录列表
            approvRecordList: [],
            //验证规则
            ruleValidate: {
                aprdAprvresult: [
                    { required: true, message: '请选择审批结论', trigger: 'change' },
                ],
                aprdAprvopinion: [
                    { required: true, message: '请填写审批意见', trigger: 'blur' },
                ],
            },
            blockStepId: '',
            //是否有审批记录
            isHaveRecord: false,
            //操作数据
            operation: [],
            //文档数据
            docs: [],
            //邮件数据
            mailRecords: [],
            //束流信息
            flowInfo: {
                flowId: this.flowId,
                pkValue: this.pkValue,
                stepId: this.stepId,
                stepName: this.setpName,
            },
            //审批ID
            aprdAprvid: '',
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
            //电子签
            qysBtn: false,
            displayHide: true,
            niceData: {},
            valueMap: {},
            formParams: {},
            disabledForm: this.dbcdType === '02approval' ? true : false,
            dbcdType: this.$route.params.dbcdType,
            aprvStepid: this.$route.params.aprvStepid,
            funId: this.$route.params.funId,
            stepId: this.$route.params.stepId,
            aprvrelTitle: this.$route.params.dbcdTitle,
            aprvrelaRecordidAll: this.$route.params.recdId,
            flowId: this.$route.params.flowId,
            pkValue: this.$route.params.dataId,
            aprvrelaApproverid: this.$route.params.recUserId,
            clStatus: this.$route.params.clStatus,
            homePageFiltering: this.$route.params.homePageFiltering
        }
    },
    mounted () {
        this.init()
    },
    components: {
        commonSingleForm,
        childTable,
        emaillogView
    },
    computed: {
        inform () {
            let rtn = true;
            if (this.dbcdType) {
                if (this.dbcdType.trim() === '04inform') { rtn = false; }
            }
            return rtn;
        },
        updateForm () {
            return () => {
                let rtn = false;
                if (this.dbcdType === '02approval') {
                    rtn = true;
                } else if (this.clStatus === '02processed' && this.dbcdType === '03process') {
                    rtn = true;
                }
                return rtn;
            }
        },
        popFormNice () {
            return this.$store.state.flowClmkMap.popForm;
        },
        userId () {
            return localStorage.userId
        },
    },
    methods: {
        // 初始化
        init () {
            // 获取下拉框
            this.getSelect();
            this.getColumns()
        },

        // 获取当前选中数据流程table
        getById () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + t.tbName + '.getById',
                APid: t.pkValue,
                APlogType: '获取单条数据',
                APffk: `gec${this.funId}${this.flowId}${this.stepId}${this.aprvrelaApproverid}`
            }).then((res) => {
                t.niceData = res.data.content[0];
                if (this.aprvStepid === '0') {
                    t.getDataBlock()
                } else {

                    t.getAnsrptRecord()

                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                // t.loading = false
            })
        },
        // 获取表格字段
        getColumns () {
            const t = this
            t.loadingSpin = true
            let aa = []
            // 获取块级数据
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'PlatAutoLayoutGetFlowList.getListColumn',
                AProleType: t.$store.state.user.roleType,
                APfunId: t.funId,
                APlogType: 'getListColumn',
                APisTodo: true
            }).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.tbName = res.data.content[0].tbName;
                    t.getById()
                    let aa = JSON.parse(JSON.stringify(res.data.content[0].columns));
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
                                                cursor: 'pointer',
                                            },
                                            on: {
                                                click: () => {
                                                    this.pkValue = params.row.id
                                                    this.stepId = params.row[params.column.key].split('$')[1]
                                                    if (params.row[params.column.key].split('$')[3] === 'p_flowst_0') {
                                                        return
                                                    }
                                                    this.thisStepState = params.row[params.column.key].split('$')[3]
                                                    this.stepOrApproval = params.row[params.column.key].split('$')[6] // 判断是步骤流程还是审批流程
                                                    this.thisSetpName = 'Step ' + params.row[params.column.key].split('$')[2] + ': ' + params.row[params.column.key].split('$')[5]
                                                    this.getDataBlock()
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
                    }
                    t.columns = aa;
                    // t.getData()
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.loadingSpin = false
            }).finally(() => {
                t.loadingSpin = false
            })
        },
        // 获取表单数据       
        getData () {
            const t = this
            t.data = [];
            const data = {};
            data._mt = this.$global.mt + t.tbName + '.getPage';
            if (t.homePageFiltering !== '' && t.homePageFiltering !== undefined) {
                let homePage = t.homePageFiltering.split(';')
                for (let v of homePage) {
                    if (v !== '') {
                        if (v.indexOf('//') !== -1) {
                            let b = v.split('//')
                            data._mt = this.$global.mt + b[1];
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
            data.APsort = 'id';
            data.APorder = 'desc';
            data.AProws = '1';
            data.APpage = '1';
            data.AProleType = t.$store.state.user.roleType;
            data.APffk = `glc${t.funId}|${t.flowId}|${t.userId}`;
            data.APfunId = t.funId;
            data.APdata = JSON.stringify({
                id: t.pkValue
            })
            getDataLevelUserLoginData(data).then((res) => {
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
        selectAprd (value) {
            if (value === '02noneapproved') {
                this.aprdAprvopinionFlag = false
            } else {
                this.aprdAprvopinionFlag = true
            }
        },
        //  获取审批记录
        getAnsrptRecord () {
            const t = this
            t.loadingSpin = true
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAprvrecord.getList',
                APdataId: t.pkValue,
                APflowId: t.flowId
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.approvRecordList = res.data.content[0].value
                        // t.aprdAprvid = t.approvRecordList[0].aprdAprvid
                        t.isHaveRecord = true
                        t.getAprvDataBlock()
                        t.getApvRecordInfo()
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.loadingSpin = false
            }).finally(() => {
                t.loadingSpin = false
            })
        },
        // 获取审批信息
        getApvRecordInfo () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAprvrecord.getApvRecordInfo',
                APaprvRecordid: t.aprvrelaRecordidAll,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.aprdAprvresult = res.data.content[0].aprdAprvresult;
                    t.formValidate.aprdApproverDis = res.data.content[0].aprdApproverDis;
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.loadingSpin = false
            }).finally(() => {
                t.loadingSpin = false
            })
        },
        // 获取下数据
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'approveresult',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.resultList = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 获取审批数据块
        getAprvDataBlock () {
            const t = this
            t.loadingSpin = true
            t.dataBlocks = []
            t.dataBlocksFake = []
            t.operation = []
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoApprovalEditAgwService.getDataBlock',
                APaprdApprover: t.aprvrelaApproverid, // 员工端人id
                APaprdBillid: '1', // 单据id
                APaprvrelaStepid: t.stepId,
                APaprvrelaRecordid: t.aprvrelaRecordidAll,
                AProleType: t.$store.state.user.roleType, // 角色类型
                APlogType: 'getDataBlock3', // 主键值
                APpkValue: t.pkValue,
            }).then((res) => {
                t.dataBlocksFake = res.data.content[0].dataBlocks;
                t.stepId = res.data.content[0].stepId;
                t.stepAuthLimits = res.data.content[0].stepAuth;
                t.stepCode = res.data.content[0].stepCode;
                t.ChildDataBloks = [];
                t.aprdAprvid = res.data.content[0].flowId;
                //form表单块
                let forms = t.dataBlocksFake.find((value) => value.flsdbType == '01form');
                if (forms !== undefined) {
                    t.getColumnapprover()
                }
                for (let v of t.dataBlocksFake) {
                    if (v.flsdbType === '02subtable') {
                        t.ChildDataBloks.push(v)
                    } else if (v.flsdbType === 'operation') {
                        v.flsdbMark = JSON.parse(v.flsdbMark)
                        t.operation.push(v)
                    }
                }

            }).catch((err) => {
                t.loadingSpin = false
            }).finally(() => {
                // t.loadingSpin = false
            })
        },
        //发送电子签
        sendSign () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'QysEsign.sendEsign',
                APflowId: t.flowId,
                APstepId: t.thisStepId,
                APdataId: t.pkValue,
                APlogType: "发送电子签"
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.getById()
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
        },
        // 获取流程数据块
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
                APstepId: t.stepId, // 流程步骤ID
                AProleType: t.$store.state.user.roleType, // 角色类型
                APpkValue: t.pkValue, // 主键值
                APisTodo: true
            }).then((res) => {
                t.dataBlocksFake = res.data.content[0].dataBlocks;
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
                        t.ChildDataBloks.push(v)
                    } else if (v.flsdbType === 'operation') {
                        v.flsdbMark = JSON.parse(v.flsdbMark)
                        t.operation.push(v)
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
                    } else if (v.flsdbType === 'mailRecords') {
                        v.flsdbMark = JSON.parse((v.flsdbMark).replace(/[\r\n]/g, ""))
                        t.mailRecords.push(v)
                    }
                }
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                t.loadingSpin = false
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
            let showEvents = {}; //显示隐藏事件
            let setValEvents = {}; //设值逻辑事件
            let clmmap = {}
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
                //电子签
                if (columns[i].clmLayout == 74) {
                    if (columns[i].clmfilter && columns[i].clmfilter !== '') {
                        let filter = columns[i].clmfilter.split("#");
                        t.qysBtn = filter.some((value, index) => {
                            return value == t.thisStepId;
                        })
                    }
                }
                //储存弹出框
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
            console.log(formData, '表单数据')
            return formData
        },
        // 获取表单字段配置
        getColumn () {
            const t = this;
            t.loadingSpin = true;

            const params = {
                _mt: this.$global.mt + 'PlatAutoLayoutGetEdit.getEditColumn',
                APflowId: t.flowId, // 流程ID
                APstepId: t.stepId, // 流程步骤ID
                APpkValue: t.pkValue,
                APfunId: t.funId
            };

            if (t.aprvStepid !== '0') {
                params.APparentfield = t.aprdAprvid
            }
            getDataLevelUserLoginData(params).then(async (res) => {
                console.log(res, "res")
                if (JSON.stringify(res.data.content[0]) !== "{}") {
                    //  if (this.aprvStepid === '0') {
                    t.dataBlocks = []; // 进入之后每次清空datablock里的数据
                    let bb = t.dataBlocksFake.filter(item => {
                        return item.flsdbType === '01form'
                    })
                    t.tbName = res.data.content[0].tbName
                    // t.getById()
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
                    console.log(bb, "bb")
                    t.dataBlocks = bb
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
        // 获取表单字段配置
        getColumnapprover () {
            const t = this
            t.loadingSpin = true
            const params = {
                _mt: this.$global.mt + 'PlatAutoLayoutGetEdit.getEditColumn',
                APflowId: t.flowId, // 流程ID
                APstepId: t.stepId, // 流程步骤ID
                APpkValue: t.pkValue,
                APfunId: t.funId
            }
            if (t.aprvStepid !== '0') {
                params.APparentfield = t.aprdAprvid
            }
            getDataLevelUserLoginData(params).then(async (res) => {
                console.log(res, "res")
                if (JSON.stringify(res.data.content[0]) !== "{}") {

                    t.dataBlocks = []; // 进入之后每次清空datablock里的数据
                    let bb = t.dataBlocksFake.filter(item => {
                        return item.flsdbType === '01form'
                    })
                    // t.tbName = res.data.content[0].tbName
                    // t.getById()
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
                    console.log(bb, "bb")
                    t.dataBlocks = bb
                    t.getValueMap(t.dataBlocks)
                    var formName = t.tbName + t.$global.mt
                    if (onChange.hasOwnProperty(formName)) {
                        setTimeout(() => {
                            onChange[formName].all_dis.call(this)
                        }, 500)
                    }
                }
            }).catch((res) => {

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
        // 确认是否关闭
        close () {
            const t = this
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '是否确认关闭？',
                onOk: () => {
                    t.$emit('close')
                },
            })
        },
        // 确认是否提交
        isAprSubmit () {
            const t = this
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.$Modal.confirm({
                        title: this.$t('reminder.remind'),
                        content: '是否确认提交？',
                        onOk: () => {
                            t.aprSubmit()
                        },
                    })
                }
            })
        },
        // 提交审批信息
        async aprSubmit () {
            const t = this
            t.loadingSpin = true
            t.loading1 = true
            let pkValue = JSON.stringify({ id: t.pkValue })
            let a = true
            const data1 = deepCopy(t.formValidate)
            // 判断是否会签需多传值
            data1.aprdAprvtime = new Date(data1.aprdAprvtime).format('yyyy-MM-dd hh:mm:ss')
            const data = {
                _mt: this.$global.mt + t.tbName + '.submit',
                APlogType: '提交审批',
                APaprvrelaFlowid: t.aprdAprvid,
                APaprdStepid: t.aprvStepid,
                AProleType: t.$store.state.user.roleType,
                APfunId: t.funId,
                APflowId: t.flowId,
                APstepId: t.stepId,
                APsubType: 'aprvSubmit',
                APrecdid: t.aprvrelaRecordidAll,
                APaprvData: JSON.stringify(data1),
                APdata: pkValue
                // APdata: t.formDataSubmit
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }

            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.init();
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '提交成功',
                    })
                    // t.$emit('close')
                    // t.$emit('getAllData')
                    // t.$emit('getAllDataMain')
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loadingSpin = false
            })
            //     }
            // })
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
                            console
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
                    t.loadingSpin = false
                    return
                }
                t.formDataSubmit._mt = this.$global.mt + t.tbName + '.submit'
                t.formDataSubmit.APtbName = t.tbName
                t.formDataSubmit.APstepId = t.stepId
                t.formDataSubmit.APfunId = t.funId
                t.formDataSubmit.AProleType = t.$store.state.user.roleType // 角色类型
                t.formDataSubmit.APflowId = t.flowId
                t.formDataSubmit.id = t.pkValue
                t.formDataSubmit.APlogType = '提交'
                t.formDataSubmit.APdealType = '-1'
                t.formDataSubmit.APclmMap = JSON.stringify(t.clmMap)
                getDataLevelUserLoginData(t.formDataSubmit).then((res) => {
                    t.loading1 = false
                    if (isSuccess(res, t)) {
                        t.init();
                        t.$Modal.success({
                            title: '提交成功',
                            content: '提交成功',
                        })
                    }
                }).catch(() => {
                    t.loading1 = false
                    t.loadingSpin = false
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                }).finally(() => {
                    t.loadingSpin = false
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
                            let b = true
                            console.log(this.$children[i], "this.$children[i] ")
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
                t.formDataSubmit.APstepId = t.stepId
                t.formDataSubmit.AProleType = t.$store.state.user.roleType // 角色类型
                t.formDataSubmit.APflowId = t.flowId
                t.formDataSubmit.id = t.pkValue
                t.formDataSubmit.APlogType = '保存'
                t.formDataSubmit.APfunId = t.funId
                t.formDataSubmit.APdealType = '-1'
                t.formDataSubmit.APclmMap = JSON.stringify(t.clmMap)
                if (t.formDataSubmit.hasOwnProperty('empbcContent')) { // 用来判断提交时是否有多选框  有的话需要把值转为字符串传到后台
                    t.formDataSubmit.empbcContent = t.formDataSubmit.empbcContent.join(',')
                }
                getDataLevelUserLoginData(t.formDataSubmit).then((res) => {
                    t.loading1 = false
                    if (isSuccess(res, t)) {
                        this.getData()
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
        // 关闭当前流程
        closeFlow () {
            this.$emit('close')
        },
    },
    watch: {

    },
}
</script>
<style lang="scss" scoped>
.commonFlowList {
    width: 100%;
    height: 100%;
}
.cover {
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        .title {
            display: flex;
            height: 50px;
            width: 100%;
            line-height: 50px;
            justify-content: center;
            align-items: center;
            padding-left: 20px;
            border-bottom: 1px solid #efefef;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}

// 流程配置平台，特殊条件设置样式
.settlement {
    width: 83%;
    margin-right: 20px;
}

.content {
    overflow-y: auto;
    flex: 1;
    background-color: #f9f9f9;
    .table-form {
        margin-top: 0;
        margin-bottom: 20px;
    }
    .dataBlocks {
        .dataBlocksTitle {
            /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
            background-color: rgba(39, 142, 255, 0.2);
            font-size: 14px;
            padding: 0 20px;
            height: 26px;
            font-weight: bold;
            line-height: 26px;
        }
        .dataContent {
            position: relative;
            background-color: #f9f9f9;
            /*padding-right: 100px;*/
            // padding-top: 30px;
            // padding-bottom: 10px;
            padding: 10px 0;
            /*width: 1100px;*/
            .operation {
                text-align: left;
                padding: 0 0 0 180px;
            }
            .docs {
                padding: 0 0 20px 100px;
                display: flex;
                flex-direction: column;
            }
        }
    }
}
.footer {
    padding: 0px 30px;
    display: flex;
    justify-content: flex-end;
}
.approvRecord {
    /*margin-bottom: 10px;*/
}
.approvIdea {
    .dataBlocksTitle2 {
        /*margin-bottom: 10px;*/
    }
    .ivu-form {
        background-color: #f9f9f9;
        padding: 20px;
    }
}
.dataBlocksTitle2 {
    /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
}
.recordTitleClass {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    /*margin-left: 180px;*/
}
.recordClass {
    height: 36px;
    line-height: 36px;
    margin: 0 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.recordContent {
    background-color: #f9f9f9;
}
.aprdAprvopinion {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
