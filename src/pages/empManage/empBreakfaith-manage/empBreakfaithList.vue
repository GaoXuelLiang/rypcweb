<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>{{tagTitle}}
                </p>
                <Row>
                    <Col span="24">
                    <Row class="btnHeight">
                        <btnList @buttonExport="expData"
                                 @buttonAdd="openUp(ID,$t('button.add'),ID)"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 @buttonImport="importExcel"
                                 @moditySelect="modityChange"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"
                                 v-show="false">
                        </btnList>
                        <Row>
                            <Input v-model="searchParams.brkfCname"
                                   :placeholder="placeHolderDesc.brkfCname"
                                   style="width: 200px" />
                            <span style="margin: 0;">
                                <Button type="info"
                                        :loading="isSpin"
                                        @click="search()">
                                    <span v-if="!isSpin">{{$t('button.ser')}}</span>
                                </Button></span>
                            <Dropdown>
                                <Button type="primary">
                                    {{statusDis}}
                                    <Icon type="md-arrow-dropdown"
                                          size="18"></Icon>
                                </Button>
                                <DropdownMenu slot="list">
                                    <span key="index"
                                          @click="getPageByState('',$t('button.all'))">
                                        <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                                    </span>
                                    <span v-for="(item,index) in dropdownMenuList"
                                          :key="index"
                                          @click="getPageByState(item.paramCode,item.paramInfoCn)">
                                        <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                                    </span>
                                </DropdownMenu>
                            </Dropdown>
                            <!--  新增 -->
                            <Button type="warning"
                                    v-if="AccessControl.toString().includes('button_add')"
                                    v-show="dutyStatus === '01draft'"
                                    @click="openUp(ID,$t('button.add'))">{{$t('button.add')}}</Button>
                            <!--  生效 -->
                            <Button type="primary"
                                    v-if="AccessControl.toString().includes('button_valid')"
                                    v-show="dutyStatus === '01draft'"
                                    @click="modifystatus('02valid', '生效')">{{$t('status.valid')}}</Button>
                            <!--  s删除 -->
                            <Button type="error"
                                    v-if="AccessControl.toString().includes('button_del')"
                                    v-show="dutyStatus === '01draft'"
                                    @click="deletemsg">{{$t('button.del')}}</Button>
                            <!--  解除 -->
                            <Button type="error"
                                    v-if="AccessControl.toString().includes('button_relieve')"
                                    v-show="dutyStatus === '02valid'"
                                    @click="modifystatus('', '解除')">解除</Button>
                            <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        </Row>

                    </Row>
                    <!-- 表格 分页 -->
                    <commonPage :imp_mt="imp_mt"
                                :page_mt="page_mt"
                                :exp_mt="exp_mt"
                                :dele_mt="dele_mt"
                                :state_mt="state_mt"
                                :expDataTital="expDataTital"
                                @tableBtn="tableBtn"
                                ref="commonPage">
                    </commonPage>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
        <!--@closeUp="closeUp" v-show="openUpdate"-->
        <!--<transition name="fade">-->
        <!--<update :id="updateId"-->
        <!--:logType="logType"-->
        <!--:index="index"-->
        <!--:labelDesc="labelDesc"-->
        <!--:placeHolderDesc="placeHolderDesc"-->
        <!--@newData="addNewArray"-->
        <!--@update="updateArray"-->
        <!--:selectList="selectList"-->
        <!--ref="update"></update>-->
        <!--</transition>-->
        <div class="cover"
             v-if="modal">
            <div class="box">
                <div class="title">
                    <div class="title-text">
                        <Icon type="ios-bookmark"
                              size="16"></Icon>
                        添加
                    </div>
                    <Button type="text"
                            @click="handleReset">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div>
                <Row>
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100"
                          style="height: 100px">
                        <i-col span="11">
                            <FormItem label="解除联系人"
                                      prop="brkfRelievelink">
                                <Input placeholder="解除联系人"
                                       v-model="formValidate.brkfRelievelink"
                                       style="width: 100%"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="解除日期"
                                      prop="brkfRelievedate">
                                <DatePicker type="date"
                                            placeholder="解除日期"
                                            :editable="false"
                                            v-model="formValidate.brkfRelievedate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="解除原因"
                                      prop="brkfRelievereason">
                                <Input v-model="formValidate.brkfRelievereason"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="解除原因"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="23"
                               style="text-align: right">
                            <Button type="primary"
                                    @click="isSubmit">保存</Button>
                        </i-col>
                    </Form>
                </Row>
            </div>

        </div>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <transition name="fade">
            <empBreakchild v-show="newopenUpdate"
                           :pklv="pklv"
                           @closeUp="closeUp"
                           :logType="logType"
                           ref="empBreakchild"></empBreakchild>
        </transition>
    </div>

</template>
<script>
import empBreakchild from './empBreakchild'
import { isSuccess, getUrlKey } from "@/lib/util";
import advanced from '@/components/searchTable/searchAdvanced'
import { getDataLevelUserLoginData } from "@/axios/axios";
import { getSysLananges } from "@/lib/pub_fun";
import commonPage from '@/components/commonPage/commonPage';    // 公共页面组件
// import update from "./empBreakfaithEdit";                    // 新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";
import { deepCopy } from "../../../lib/util";          // 按钮组件

export default {
    name: 'empBreakfaith_Atgv',
    data () {
        return {
            ID: '',
            // 重新自动化布局
            newopenUpdate: false,
            pklv: '',
            isSpin: false,
            showAdvanced: false,
            //            labelDesc: {brkfCname:"",brkfAlias:"",brkfFirstname:"",brkfLastname:"",brkfIdtype:"",brkfIdno:"",brkfCompany:"",brkfDept:"",brkfPosition:"",brkfBusiarea:"",brkfBreaktype:"",brkfPunishtype:"",brkfPunishdate:"",brkfBreaklink:"",brkfRelieve:"",brkfRelievedate:"",brkfRelievelink:"",brkfStatus:"",brkfEbpid:"",ebpComment:"",},
            placeHolderDesc: { brkfCname: "", brkfAlias: "", brkfFirstname: "", brkfLastname: "", brkfIdtype: "", brkfIdno: "", brkfCompany: "", brkfDept: "", brkfPosition: "", brkfBusiarea: "", brkfBreaktype: "", brkfPunishtype: "", brkfPunishdate: "", brkfBreaklink: "", brkfRelieve: "", brkfRelievedate: "", brkfRelievelink: "", brkfStatus: "", brkfEbpid: "", ebpComment: "", },
            //            ruleDesc: {brkfCname:"",brkfAlias:"",brkfFirstname:"",brkfLastname:"",brkfIdtype:"",brkfIdno:"",brkfCompany:"",brkfDept:"",brkfPosition:"",brkfBusiarea:"",brkfBreaktype:"",brkfPunishtype:"",brkfPunishdate:"",brkfBreaklink:"",brkfRelieve:"",brkfRelievedate:"",brkfRelievelink:"",brkfStatus:"",brkfEbpid:"",ebpComment:"",},
            // 导入的mt名称
            imp_mt: this.$global.mt + 'EmpBreakfaith.importData',
            // 导出的mt名称
            exp_mt: this.$global.mt + 'EmpBreakfaith.export',
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "brkfCname", name: "" },
                //                { code: "brkfAlias", name: "" },
                //                { code: "brkfFirstname", name: "" },
                //                { code: "brkfLastname", name: "" },
                { code: "brkfIdtype", name: "" },
                { code: "brkfIdno", name: "" },
                { code: "brkfCompany", name: "" },
                { code: "brkfDept", name: "" },
                { code: "brkfPosition", name: "" },
                { code: "brkfBusiarea", name: "" },
                { code: "brkfBreaktype", name: "" },
                { code: "brkfPunishtype", name: "" },
                { code: "brkfPunishdate", name: "" },
                { code: "brkfBreaklink", name: "" },
                { code: "brkfRelieve", name: "" },
                { code: "brkfRelievedate", name: "" },
                { code: "brkfRelievelink", name: "" },
                { code: "brkfStatus", name: "" },
                { code: "brkfEbpid", name: "" },
                { code: "ebpComment", name: "" },
            ],
            // 表格列字段
            columns: [
                { type: "selection", width: 54, fixed: "left", align: "center" },
                { key: "brkfCname", title: "", sortable: "custom", width: 220 },
                //              { key: "brkfAlias", title: "", sortable: "custom" , width : 220},
                //              { key: "brkfFirstname", title: "", sortable: "custom" , width : 220},
                //              { key: "brkfLastname", title: "", sortable: "custom" , width : 220},
                { key: "brkfIdtypeDis", title: "", sortable: "custom", width: 220 },
                { key: "brkfIdno", title: "", sortable: "custom", width: 220 },
                { key: "brkfCompany", title: "", sortable: "custom", width: 220 },
                { key: "brkfDept", title: "", sortable: "custom", width: 220 },
                { key: "brkfPosition", title: "", sortable: "custom", width: 220 },
                { key: "brkfBusiarea", title: "", sortable: "custom", width: 220 },
                { key: "brkfBreaktypeDis", title: "", sortable: "custom", width: 220 },
                { key: "brkfPunishtypeDis", title: "", sortable: "custom", width: 220 },
                { key: "brkfPunishdate", title: "", sortable: "custom", width: 220 },
                { key: "brkfBreaklink", title: "", sortable: "custom", width: 220 },
                { key: "brkfRelieveDis", title: "", sortable: "custom", width: 220 },
                { key: "brkfStatusDis", title: "", sortable: "custom", width: 220 },
            ],
            // 表格获取数据mt名称
            page_mt: this.$global.mt + 'EmpBreakfaith.getPage',
            // 删除数据mt名称
            dele_mt: this.$global.mt + 'EmpBreakfaith.delByIds',
            // 修改流程状态mt名称
            state_mt: this.$global.mt + 'EmpBreakfaith.updState',
            //表格 id
            //            updateId: NaN,
            //操作类型
            logType: "",
            //对应列表index
            index: 0,
            //搜索参数
            searchParams: {
                brkfCname: '',
                brkfStatus: '',
            },
            typeCode: "rpstatus",
            //弹出选择框
            /* 生效失效 */
            dutyStatus: '',
            statusDis: '全部',
            dropdownMenuList: [],
            selectList: [],
            tempObj: {
                brkfStatus: '',
            },
            formValidate: {
                brkfRelievereason: '',
                brkfRelievedate: '',
                brkfRelievelink: '',
            },
            ruleValidate: {
                brkfRelievereason: [
                    { required: true, message: '解除原因', trigger: 'blur' },
                ],
                brkfRelievedate: [
                    { required: true, type: 'date', message: '解除日期', trigger: 'change' },
                ],
                brkfRelievelink: [
                    { required: true, message: '解除联系人', trigger: 'change' },
                ],
            },
            modal: false,
            AccessControl: [],
        }
    },
    components: {
        commonPage, // 页面公共组件
        btnList,    // 按钮组件
        //        update, // 新增修改组件
        advanced,
        empBreakchild
    },
    computed: {
        // 按钮数据
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        // 判断是不是流程节点
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        },
        // 标题
        tagTitle () {
            return this.$store.state.app.tagTitle
        },
    },
    beforeCreate () {
        // 清空搜索数据
        this.$store.commit('commonPage/setParams', '')
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        const t = this

        let tempObj = {}
        tempObj.brkfStatus = this.dutyStatus
        t.$store.commit('commonPage/setParams', tempObj)
        if (eval(getUrlKey('state').toLowerCase())) {
            this.getSelectValue()
            // 列表字段存储
            this.getColumns()
            this.$refs.commonPage.getData(1)
            this.btnControl(this).then((res1) => {
                if (isSuccess(res1, t)) {
                    res1.data.content[0].value.forEach((item) => {
                        t.AccessControl.push(item.btnLancode)
                    })
                }
            }).catch((err) => {

                console.log(err)
            })
        }
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
        getData (page, value) {
            let t = this
            t.$refs.commonPage.getData(page, value)
        },
        // 获取列表项字段
        getColumns () {
            const t = this
            let lanCodes = 'brkf_cname,brkf_alias,brkf_firstname,brkf_lastname,brkf_idtype,brkf_idno,brkf_company,brkf_dept,brkf_position,brkf_busiarea,brkf_breaktype,brkf_punishtype,brkf_punishdate,brkf_breaklink,brkf_relieve,brkf_relievereason,brkf_relievedate,brkf_relievelink,brkf_status,brkf_ebpid,ebp_comment'
            getSysLananges('common', lanCodes).then((res) => {
                if (isSuccess(res, t)) {
                    let lans = res.data.content[0]
                    if (lans !== undefined) {
                        lans = lans.value
                        //                console.info('lans', lans)
                        lans.forEach((item, index) => {
                            //	                t.labelDesc[item.lanCode] = item.lanDesc
                            t.placeHolderDesc[item.lanCode] = t.$t('reminder.plsInput') + item.lanDesc
                            //	                t.ruleDesc[item.lanCode] = item.lanDesc + t.$t('reminder.notNull')
                            // 设置字段title
                            for (let i = 0; i < t.columns.length; i++) {
                                let keylen = 0
                                if (t.columns[i].key !== undefined) {
                                    keylen = t.columns[i].key.length
                                }
                                // 如果尾部是dis. 如果尾部是dis的形式。取值
                                if (t.columns[i].key === item.lanCode || t.columns[i].key !== undefined
                                    && t.columns[i].key.endsWith('Dis') && t.columns[i].key.substring(0, keylen - 3) === item.lanCode) {
                                    t.columns[i].title = item.lanDesc
                                    t.columns[1].title = '姓名'
                                    break
                                }
                            }
                            //	                for (let i = 0; i < t.columns.length; i++) {
                            //	                  if (t.columns[i].key === item.lanCode) {
                            //	                    t.columns[i].title = item.lanDesc
                            //	                    break
                            //	                  }
                            //	                }
                            // 设置导出字段name
                            for (let i = 0; i < t.expDataTital.length; i++) {
                                if (t.expDataTital[i].code === item.lanCode) {
                                    t.expDataTital[i].name = item.lanDesc
                                    break
                                }
                            }
                            //                  t.expDataTital[0].name = '姓名'
                            //                  console.log(t.expDataTital[0].name)
                        })
                    }
                    // 设置修改页面字段的rule message
                    //	            const updRule = t.$refs.update.ruleValidate
                    //	            for (let prop in updRule) {
                    //	              for (let i = 0; i < updRule[prop].length; i++) {
                    //	                if (updRule[prop][i].required) {
                    //	                  updRule[prop][i].message = t.ruleDesc[prop]
                    //	                  break
                    //	                }
                    //	              }
                    //	            }
                }
            })
            //            .catch((err, t) => {
            //	          this.$Modal.error({
            //	            title: t.$t('reminder.err'),
            //	            content: t.$t('reminder.errormessage'),
            //	          })
            //	        })
            t.$refs.commonPage.columns = t.columns
        },
        // 删除
        deletemsg () {
            this.$refs.commonPage.deletemsg()
        },
        // 页面查询
        search () {
            this.$store.commit('commonPage/setParams', this.searchParams)
            this.$refs.commonPage.search()
        },
        // 打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this
            //            t.updateId = parseInt(id, 10);
            //            t.logType = logType;
            //            t.$refs.update.openUpdate = true;
            //            t.index = index;
            //            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
            //                t.$refs.update.getData(id);
            //            }
            //            if (logType === this.$t('button.view')) {
            //                t.$refs.update.disabled = true;
            //            }
            // this.$router.push({
            //   path: t.$route.name + '_Edit',
            //   query: {
            //     dataid: id,
            //     logType: encodeURI(logType),
            //     id: t.$route.query.id,
            //     state: true,
            //   }
            // })
            t.newopenUpdate = true
            // if(id!== NaN){
            t.logType = logType;
            if (id) {
                t.pklv = id
            } else {
                t.pklv = '0'
            }

            t.$nextTick(() => t.$refs.empBreakchild.getColumn())

            // }else{

            // }
        },
        // 点击表格查看或修改事件
        tableBtn (res) {
            let id = res.id
            let logType = res.name
            let index = res.index
            this.openUp(id, logType, index)
        },
        // 关闭新增修改弹窗
        closeUp () {
            this.newopenUpdate = false;
        },
        // 新增后表格数据添加
        //        addNewArray (res) {
        //            this.$refs.commonPage.data.unshift(res);
        //        },
        // 修改后表格数据更新
        //        updateArray (res) {
        //            this.$refs.commonPage.data.splice(this.index, 1, res);
        //        },
        // 导出
        expData () {
            this.$refs.commonPage.expData()
        },
        // 导入
        importExcel () {
            this.$refs.commonPage.importExcel()
        },
        // 状态操作按钮
        modifystatus (type, name) {
            const t = this
            if (type === '') {
                if (t.$refs.commonPage.tableselected.length > 0) {
                    this.modal = true
                } else {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '选择一条数据',
                    })
                }
                return
            }
            t.$refs.commonPage.state_mt = this.$global.mt + 'EmpBreakfaith.updState'  // 生效
            t.$refs.commonPage.modifystatus(type, name)
        },
        // 修改流程状态
        modityChange () {
            this.$refs.commonPage.modityChange()
        },
        // 获取下拉列表数据
        getSelectValue () {
            const t = this
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                logType: 'rpstatus,idtype,illegaltype,punishtype,yesno,rpstatus',
                typeCode: t.typeCode,
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.dropdownMenuList = res.data.content[0].value[0].paramList
                }
            })
            //                .catch(() => {
            //                    this.$Message.error(this.$t("reminder.errormessage"))
            //                })
        },
        /**
         * 状态的更改
         * @param paramCode
         * @param paramInfoName
         */
        getPageByState (paramCode, paramInfoName) {
            const t = this
            if (paramCode === '0001all') {
                t.dutyStatus = ''
                t.searchParams.brkfStatus = ''
            } else {
                t.dutyStatus = paramCode
            }
            t.tempObj.brkfStatus = t.dutyStatus
            t.searchParams.brkfStatus = t.dutyStatus
            t.$store.commit('commonPage/setParams', this.searchParams)
            t.$refs.commonPage.getData()
            t.statusDis = paramInfoName
        },
        handleReset () {
            this.modal = false
            this.formValidate = {}
        },
        isSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            t.$refs.commonPage.state_mt = this.$global.mt + 'EmpBreakfaith.updRelieve'
            if (data.brkfRelievedate !== undefined) {
                data.brkfRelievedate = data.brkfRelievedate === '' ? '' : new Date(data.brkfRelievedate).format('yyyy-MM-dd')
            }
            t.$store.commit('commonPage/setParams', data)
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.modal = false
                    t.$refs.commonPage.modifystatus('', '解除')
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
.ivu-input-wrapper {
    margin-right: 5px;
}
.ivu-btn {
    margin-right: 5px;
}
</style>
