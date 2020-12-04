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
                        <Input v-model="searchParams.ebpCname"
                               :placeholder="placeHolderDesc.ebpCname"
                               style="width: 200px" />
                        <!-- 页面按钮 -->
                        <!--<Select v-model="searchParams.ebpStatus" clearable style="width: 160px;"  @on-change="search" :placeholder="placeHolderDesc.ebpStatus" >-->
                        <!--<Option :value="item.paramCode" v-for="(item,index) in TypeParams[7]" :key="index">{{item.paramInfoCn}}</Option>-->
                        <!--</Select>-->
                        <Select v-model="searchParams.ebpType"
                                clearable
                                style="width: 200px;"
                                @on-change="search"
                                :placeholder="placeHolderDesc.ebpType">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in TypeParams[1]"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Button style="width:56px"
                                type="info"
                                :loading="isSpin"
                                @click="search()">
                            <span v-if="!isSpin">{{$t('button.ser')}}</span>
                        </Button>
                        <Dropdown>
                            <Button type="primary">
                                {{selectDis.ebpStatusDis}}
                                <Icon type="md-arrow-dropdown"
                                      size="18"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <span key="index"
                                      @click="selectedEbstatus('',$t('button.all'))">
                                    <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                                </span>
                                <span v-for="(item,index) in TypeParams[7]"
                                      :key="index"
                                      @click="selectedEbstatus(item.paramCode,item.paramInfoName)">
                                    <DropdownItem>{{item.paramInfoName}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>

                        <!--<Dropdown>-->
                        <!--<Button type="primary">-->
                        <!--{{selectDis.ebpTypeDis}}-->
                        <!--<Icon type="md-arrow-dropdown" size="18"></Icon>-->
                        <!--</Button>-->
                        <!--<DropdownMenu slot="list" >-->
                        <!--<span v-for="(item,index) in TypeParams[1]" :key="index" @click="selectedEbpType(item.paramCode,item.paramInfoName)">-->
                        <!--<DropdownItem>{{item.paramInfoName}}</DropdownItem>-->
                        <!--</span>-->
                        <!--</DropdownMenu>-->
                        <!--</Dropdown>-->

                        <btnList @buttonExport="expData"
                                 @buttonAdd="openUp(NaN,$t('button.add'),NaN)"
                                 @buttonDel="deletemsg"
                                 @buttonSearch="search"
                                 @buttonImport="importExcel"
                                 @moditySelect="modityChange"
                                 :btnData="btnData"
                                 :FlowNode="FlowNode"
                                 v-show="false">
                        </btnList>

                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        <Button type="warning"
                                v-if="searchParams.ebpStatus === '01draft' && AccessControl.toString().includes('button_add')"
                                @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                        <Button type="primary"
                                v-if="searchParams.ebpStatus === '01draft' && AccessControl.toString().includes('button_valid')"
                                @click="effectData('02valid')">生效</Button>
                        <Button type="error"
                                v-if="searchParams.ebpStatus === '01draft' && AccessControl.toString().includes('button_del')"
                                @click="deletemsg">删除</Button>
                        <Button type="error"
                                v-if="searchParams.ebpStatus === '02valid' && searchParams.ebpType === '02punish' && AccessControl.toString().includes('button_relieve')"
                                @click="relieve">解除</Button>
                        <Button type="error"
                                v-if="searchParams.ebpStatus === '02valid' && searchParams.ebpType === '02punish' && AccessControl.toString().includes('button_break')"
                                @click="intoBreakFaith">纳入失信名单</Button>
                        <Button type="error"
                                v-if="searchParams.ebpStatus === '03relieve' && searchParams.ebpType === '02punish' && AccessControl.toString().includes('button_conduct')"
                                @click="relieveBreakFaith">撤销失信名单</Button>
                    </Row>
                    <!-- 表格 分页 -->
                    <commonPage :imp_mt="imp_mt"
                                :page_mt="page_mt"
                                :exp_mt="exp_mt"
                                :dele_mt="dele_mt"
                                :state_mt="state_mt"
                                :expDataTital="expDataTital"
                                @tableBtn="tableBtn"
                                @changeLoading="changeLoading"
                                ref="commonPage">
                    </commonPage>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
        <!--<transition name="fade">-->
        <!--<update v-show="openUpdate"-->
        <!--:id="updateId"-->
        <!--:logType="logType"-->
        <!--:index="index"-->
        <!--:labelDesc="labelDesc"-->
        <!--:placeHolderDesc="placeHolderDesc"-->
        <!--:TypeParams="TypeParams"-->
        <!--@closeUp="closeUp"-->
        <!--@newData="addNewArray"-->
        <!--@update="updateArray"-->
        <!--ref="update"></update>-->
        <!--</transition>-->
        <!--搜索 弹出选择框  -->
        <transition name="fade">
            <reliveInformation v-show="openRelive"
                               :logType="logType"
                               :labelDesc="labelDesc"
                               :relieveTitle="relieveTitle"
                               :reliveIds="reliveIds"
                               :relieveType="relieveType"
                               :placeHolderDesc="placeHolderDesc"
                               @closeUp="closeRelieve"
                               ref="reliveInformation"></reliveInformation>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import { isSuccess, getUrlKey } from '@/lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios"
import { getSysLananges } from '@/lib/pub_fun'
import commonPage from '@/components/commonPage/commonPage'    // 公共页面组件
//import update from './empBonuspenaltyEdit'                    // 新增修改组件
import btnList from '@/components/btnAuth/btnAuth.js'         // 按钮组件
import reliveInformation from './reliveInformation' // 解除或者撤销信息的编写
import advanced from '@/components/searchTable/searchAdvanced'

export default {
    name: 'empBonuspenalty_Atgv',
    data () {
        return {
            AccessControl: [],
            showAdvanced: false,
            labelDesc: { ebpCname: "", ebpAlias: "", ebpFirstname: "", ebpLastname: "", ebpIdtype: "", ebpIdno: "", ebpCompany: "", ebpDept: "", ebpPosition: "", ebpBusiarea: "", ebpType: "", ebpAwardtype: "", ebpAwardway: "", ebpAwarddate: "", ebpAwardlink: "", ebpBreaktype: "", ebpPunishtype: "", ebpPunishdate: "", ebpBreaklink: "", ebpRelieve: "", ebpRelievereason: "", ebpRelievedate: "", ebpRelievelink: "", ebpStatus: "", ebpComment: "", },
            placeHolderDesc: { ebpCname: "", ebpAlias: "", ebpFirstname: "", ebpLastname: "", ebpIdtype: "", ebpIdno: "", ebpCompany: "", ebpDept: "", ebpPosition: "", ebpBusiarea: "", ebpType: "", ebpAwardtype: "", ebpAwardway: "", ebpAwarddate: "", ebpAwardlink: "", ebpBreaktype: "", ebpPunishtype: "", ebpPunishdate: "", ebpBreaklink: "", ebpRelieve: "", ebpRelievereason: "", ebpRelievedate: "", ebpRelievelink: "", ebpStatus: "", ebpComment: "", },
            //  ruleDesc: {ebpCname:"",ebpAlias:"",ebpFirstname:"",ebpLastname:"",ebpIdtype:"",ebpIdno:"",ebpCompany:"",ebpDept:"",ebpPosition:"",ebpBusiarea:"",ebpType:"",ebpAwardtype:"",ebpAwardway:"",ebpAwarddate:"",ebpAwardlink:"",ebpBreaktype:"",ebpPunishtype:"",ebpPunishdate:"",ebpBreaklink:"",ebpRelieve:"",ebpRelievereason:"",ebpRelievedate:"",ebpRelievelink:"",ebpStatus:"",ebpComment:"",},
            // 导入的mt名称
            imp_mt: this.$global.mt + 'EmpBonuspenalty.importData',
            // 导出的mt名称
            exp_mt: this.$global.mt + 'EmpBonuspenalty.export',
            // 导出字段设置, code字段名 name列名
            expDataTital: [
                { code: "ebpCname", name: "" },
                { code: "ebpAlias", name: "" },
                { code: "ebpFirstname", name: "" },
                { code: "ebpLastname", name: "" },
                { code: "ebpIdtype", name: "" },
                { code: "ebpIdno", name: "" },
                { code: "ebpCompany", name: "" },
                { code: "ebpDept", name: "" },
                { code: "ebpPosition", name: "" },
                { code: "ebpBusiarea", name: "" },
                { code: "ebpType", name: "" },
                { code: "ebpAwardtype", name: "" },
                { code: "ebpAwardway", name: "" },
                { code: "ebpAwarddate", name: "" },
                { code: "ebpAwardlink", name: "" },
                { code: "ebpBreaktype", name: "" },
                { code: "ebpPunishtype", name: "" },
                { code: "ebpPunishdate", name: "" },
                { code: "ebpBreaklink", name: "" },
                { code: "ebpRelieve", name: "" },
                { code: "ebpRelievereason", name: "" },
                { code: "ebpRelievedate", name: "" },
                { code: "ebpRelievelink", name: "" },
                { code: "ebpStatus", name: "" },
                { code: "ebpComment", name: "" },
            ],
            // 表格列字段
            columns: [
                { type: "selection", width: 54, fixed: "left", align: "center" },
                { key: "ebpCname", title: "", sortable: "custom", width: 220 },
                // { key: "ebpAlias", title: "", sortable: "custom" , width : 220 },
                // { key: "ebpFirstname", title: "", sortable: "custom" , width : 220 },
                // { key: "ebpLastname", title: "", sortable: "custom" , width : 220 },
                { key: "ebpIdtypeDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpIdno", title: "", sortable: "custom", width: 220 },
                { key: "ebpCompanyDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpDeptDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpPositionDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpBusiarea", title: "", sortable: "custom", width: 220 },
                { key: "ebpTypeDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpAwardtypeDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpAwardwayDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpAwarddate", title: "", sortable: "custom", width: 220 },
                { key: "ebpAwardlink", title: "", sortable: "custom", width: 220 },
                { key: "ebpBreaktypeDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpPunishtypeDis", title: "", sortable: "custom", width: 220 },
                { key: "ebpPunishdate", title: "", sortable: "custom", width: 220 },
                { key: "ebpBreaklink", title: "", sortable: "custom", width: 220 },
                //  { key: "ebpRelieveDis", title: "", sortable: "custom" , width : 220},
                //  { key: "ebpRelievereason", title: "", sortable: "custom" , width : 220},
                //  { key: "ebpRelievedate", title: "", sortable: "custom" , width : 220},
                //  { key: "ebpRelievelink", title: "", sortable: "custom" , width : 220},
                { key: "ebpStatusDis", title: "", sortable: "custom", width: 220 },
            ],
            // 表格获取数据mt名称
            page_mt: this.$global.mt + 'EmpBonuspenalty.getPage',
            // 删除数据mt名称
            dele_mt: this.$global.mt + 'EmpBonuspenalty.delByIds',
            // 修改流程状态mt名称
            state_mt: this.$global.mt + 'EmpBonuspenalty.setStateByIds',
            // 表格 id
            //  updateId: NaN,
            // 操作类型
            logType: '',
            // 对应列表index
            index: 0,
            // 显示隐藏新增修改弹窗的变量
            //  openUpdate: false,
            // 搜索参数
            searchParams: {
                ebpCname: '',
                ebpStatus: '',
                ebpType: '',  // 默认查询所有
            },
            // 下拉按钮显示值
            selectDis: {
                ebpStatusDis: '全部',
                ebpTypeDis: '',
            },
            // 证件类型，奖惩类型，奖励类型,奖励方式,违规类型，处分类型，是否,状态 7中
            typeCode: 'idtype,rptype,rewardreason,rewardstyle,illegaltype,punishtype,yesno,rpstatus',
            TypeParams: [],
            // 弹出选择框
            // 查询选项
            openRelive: false,
            relieveTitle: '解除详情',
            relieveType: '', // 弹出页面的类型 01relieve: 解除; 02brekfaith: 撤销失信名单
            reliveIds: '',
            isSpin: false
        }
    },
    components: {
        commonPage, // 页面公共组件
        btnList,    // 按钮组件
        //  update, // 新增修改组件
        reliveInformation, // 解除或者撤销信息的编辑
        advanced,
    },
    computed: {
        // 按钮数据
        btnData () {
            return this.$store.state.btnOperate.btnData
        },
        // 判断是不是流程节点
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode
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
    // created() {
    //   const t = this
    //   let tempObj = {}
    //   tempObj.ebpStatus = this.searchParams.ebpStatus
    //   t.$store.commit('commonPage/setParams', tempObj)
    // },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        let t = this
        let tempObj = {}
        tempObj.ebpStatus = this.searchParams.ebpStatus
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
        changeLoading (val) {
            this.isSpin = val
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
            let lanCodes = 'ebp_cname,ebp_alias,ebp_firstname,ebp_lastname,ebp_idtype,ebp_idno,ebp_company,ebp_dept,ebp_position,ebp_busiarea,ebp_type,ebp_awardtype,ebp_awardway,ebp_awarddate,ebp_awardlink,ebp_breaktype,ebp_punishtype,ebp_punishdate,ebp_breaklink,ebp_relieve,ebp_relievereason,ebp_relievedate,ebp_relievelink,ebp_status,ebp_comment'
            getSysLananges('common', lanCodes).then((res) => {
                if (isSuccess(res, t)) {
                    let lans = res.data.content[0]
                    if (lans !== undefined) {
                        lans = lans.value
                        lans.forEach((item, index) => {
                            t.labelDesc[item.lanCode] = item.lanDesc
                            t.placeHolderDesc[item.lanCode] = t.$t('reminder.plsInput') + item.lanDesc
                            // t.ruleDesc[item.lanCode] = item.lanDesc + t.$t('lang_evaluation.evaluation.notNull') // 配置在多语言里面
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
                            // for (let i = 0; i < t.expDataTital.length; i++) {
                            //   if (t.expDataTital[i].code === item.lanCode) {
                            //     t.expDataTital[i].name = item.lanDesc
                            //     break
                            //   }
                            // }
                        })
                    }
                    // 设置修改页面字段的rule message
                    // const updRule = t.$refs.update.ruleValidate
                    // for (let prop in updRule) {
                    //   for (let i = 0; i < updRule[prop].length; i++) {
                    //     if (updRule[prop][i].required) {
                    //       updRule[prop][i].message = t.ruleDesc[prop]
                    //       break
                    //     }
                    //   }
                    // }
                }
            })
            //            .catch((err) => {
            //	          this.$Modal.error({
            //	            title: this.$t('reminder.err'),
            //	            content: this.$t('reminder.errormessage'),
            //	          })
            //	        })
            t.$refs.commonPage.columns = t.columns
            //          t.$store.commit('commonPage/setColumns', this.columns)
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
        // code
        selectedEbpType (key, value) {
            this.searchParams.ebpType = key
            this.selectDis.ebpTypeDis = value
            this.search()
        },
        // code
        selectedEbstatus (key, value) {
            this.searchParams.ebpStatus = key
            this.selectDis.ebpStatusDis = value
            this.search()
        },
        // 生效按钮
        effectData (status) {
            const t = this
            if (t.$refs.commonPage.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
                return
            }
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'EmpBonuspenalty.updState',
                ids: t.$refs.commonPage.tableselected.toString(),
                status: status,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '生效成功!',
                    })
                    t.$refs.commonPage.modityChange()
                }
            })
            //            .catch(() => {
            //            this.$Modal.error({
            //              title: this.$t('reminder.err'),
            //              content: this.$t('reminder.errormessage'),
            //            })
            //          })
        },
        // 解除按钮
        relieve () {
            const t = this
            if (t.$refs.commonPage.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
                return
            }
            t.reliveIds = t.$refs.commonPage.tableselected.toString()
            t.relieveTitle = '解除详情'
            t.relieveType = '01relieve'
            t.openRelive = true
        },
        closeRelieve () {
            const t = this
            t.search()
            t.openRelive = false
        },
        // 纳入失信名单
        intoBreakFaith () {
            const t = this
            if (t.$refs.commonPage.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
                return
            }
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '确认纳入失信名单?',
                onOk: () => {
                    // 添加请求模块
                    getDataLevelUserLogin({
                        _mt: this.$global.mt + 'EmpBonuspenalty.istBrkFaith',
                        ids: t.$refs.commonPage.tableselected.toString(),
                    }).then((res) => {
                        if (isSuccess(res, t)) {
                            t.search()
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: '纳入失信名单成功!',
                            })
                        }
                    }).catch(() => {
                        //                t.$Modal.error({
                        //                  title: this.$t('reminder.err'),
                        //                  content: this.$t('reminder.errormessage'),
                        //                })
                    })
                    t.$refs.commonPage.modityChange()
                },
                onCancel: () => { },
            })
        },
        // 撤销失信名单
        relieveBreakFaith () {
            const t = this
            if (t.$refs.commonPage.tableselected.length === 0) {
                this.$Message.warning('请至少选择一条数据')
                return
            }
            t.relieveType = '02brekfaith'
            t.relieveTitle = '撤销详情'
            t.reliveIds = t.$refs.commonPage.tableselected.toString()
            t.openRelive = true
        },
        // 打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this
            //            t.updateId = parseInt(id, 10)
            //            t.logType = logType
            //            t.openUpdate = true
            //            t.index = index
            //            t.$refs.update.disabled = false
            //            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
            //                t.$refs.update.getData(id)
            //            }
            //            if (logType === this.$t('button.view')) {
            //                t.$refs.update.disabled = true
            //            }
            this.$router.push({
                path: t.$route.name + '_Edit',
                query: {
                    dataid: id,
                    logType: encodeURI(logType),
                    id: t.$route.query.id,
                    state: true
                }
            })
        },
        // 点击表格查看或修改事件
        tableBtn (res) {
            let id = res.id
            let logType = res.name
            let index = res.index
            this.openUp(id, logType, index)
        },
        // 关闭新增修改弹窗
        //        closeUp() {
        //            this.openUpdate = false
        //        },
        //        // 新增后表格数据添加
        //        addNewArray(res) {
        //            this.$refs.commonPage.data.unshift(res)
        //        },
        //        // 修改后表格数据更新
        //        updateArray(res) {
        //            this.$refs.commonPage.data.splice(this.index, 1, res)
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
            this.$refs.commonPage.modifystatus(type, name)
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
                logType: '查询下拉数据',
                typeCode: t.typeCode,
            }).then(res => {
                if (isSuccess(res, t)) {
                    let selectValueList = res.data.content[0].value
                    for (let i = 0; i < selectValueList.length; i++) {
                        t.TypeParams.push(selectValueList[i].paramList)
                    }
                }
            })
            //              .catch(() => {
            //              this.$Message.error(this.$t('reminder.errormessage'))
            //            })
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
.ivu-input-wrapper {
    margin-right: 5px;
}
.ivu-btn {
    margin-right: 5px;
}
.ivu-select {
    margin-right: 5px;
}
</style>
