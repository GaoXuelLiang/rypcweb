<template>
    <div class="cover">
        <div class="box"
             style="padding: 50px 20px 0px 20px">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Tabs @on-click="getBtnData"
                  v-model="name"
                  type="card">
                <Spin size="large" fix v-if="spinShow"></Spin>
                <TabPane class="form" :label="$t('lang_role.adminfun.TabPane')"
                         name="sys1">
                    <Form class="tab-box"
                          ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="120">
                        <Row>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funCode')"
                                      prop="funCode">
                                <Input v-model="formValidate.funCode"
                                       :placeholder="$t('lang_role.adminfun.pfunCode')"></Input>
                            </FormItem>

                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funLancodeDis')"
                                      prop="funLancode">
                                <span @dblclick="clearDub">
                                    <Input v-model="funLancodeDis"
                                           :placeholder="$t('lang_role.adminfun.pfunLancodeDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           @on-click="pickData2" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funTypeDis')"
                                      prop="funType">
                                <Select v-model="formValidate.funType"
                                        :placeholder="$t('lang_role.adminfun.funType')"
                                        :transfer="true">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectPlatform"
                                            :key="index">
                                        {{item.paramInfoCn}}
                                    </Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funPidDis')"
                                      prop="funPid">
                                <span @dblclick="clear">
                                    <Input v-model="funPidDis"
                                           :placeholder="$t('lang_role.adminfun.pfunPidDis')"
                                           icon="ios-search"
                                           :readonly="true"
                                           @on-click="pickData" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="21" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.ppfunAction')"
                                      prop="funAction">
                                <Input v-model="formValidate.funAction"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_role.adminfun.pfunAction')"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funStyle')"
                                      prop="funStyle">
                                <Select v-model="formValidate.funStyle"
                                        :placeholder="$t('lang_role.adminfun.pfunStyle')"
                                        :transfer="true">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectFunStyle"
                                            :key="index">
                                        {{item.paramInfoCn}}
                                    </Option>
                                </Select>
                            </FormItem>
                            </Col>

                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funIsctrlbtn')"
                                      prop="funIsctrlbtn">
                                <RadioGroup v-model="formValidate.funIsctrlbtn" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funImg')">
                                <Input v-model="formValidate.funImg"
                                       :placeholder="$t('lang_role.adminfun.pfunImg')"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.funIsrpt')"
                                      prop="funIsrpt">
                                <RadioGroup v-model="formValidate.funIsrpt" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>

                            </Col>
                            <Col span="10" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.validDis')"
                                      prop="valid">
                                <RadioGroup v-model="formValidate.valid" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- 是否流程节点 -->
                            <FormItem :label="$t('lang_role.adminfun.funIsprocess')"
                                      prop="funIsprocess">
                                <RadioGroup v-model="formValidate.funIsprocess" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>

                            </Col>
                            <Col span="10" offset="1"
                                 v-show="formValidate.funIsprocess ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funProcesid')"
                                      prop="funProcesid">
                                <span @dblclick="clearDub3">
                                    <Input v-model="funProcesidDis"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_role.adminfun.pfunProcesid')"
                                           @on-click="pickData4" />
                                </span>
                            </FormItem>

                            </Col>
                            <Col span="10" offset="1">
                            <!-- 是否配置表单 -->
                            <FormItem :label="$t('lang_role.adminfun.funIsform')"
                                      prop="funIsform">
                                <RadioGroup v-model="formValidate.funIsform" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1"
                                 v-show=" formValidate.funIsform ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funIsctrlfield')"
                                      prop="funIsctrlfield">
                                <RadioGroup v-model="formValidate.funIsctrlfield" type="button" size="small">
                                    <Radio :label="item.paramCode"
                                           v-for="(item,index) in radioYesOrNo"
                                           :key="index">
                                        {{item.paramInfoCn}}
                                    </Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1"
                                 v-if=" formValidate.funIsform ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funFormtype')"
                                      prop="funFormtype">
                                <Select v-model="formValidate.funFormtype"
                                        transfer
                                        :placeholder="$t('lang_role.adminfun.pfunFormtype')"
                                        clearable>
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectFormtype"
                                            :key="index">
                                        {{item.paramInfoCn}}
                                    </Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1"
                                 v-show=" formValidate.funIsform ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funForm')"
                                      prop="funForm">
                                <span @dblclick="clearDub2">
                                    <Input v-model="funFormDis"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_role.adminfun.pfunForm')"
                                           @on-click="pickData3" />
                                </span>
                            </FormItem>
                            </Col>
                            <!-- 是否状态节点 -->
                            <Col span="10" offset="1">
                                <FormItem :label="$t('lang_role.adminfun.funState')"
                                        prop="funState">
                                    <RadioGroup v-model="formValidate.funState" type="button" size="small">
                                        <Radio :label="item.paramCode"
                                            v-for="(item,index) in radioYesOrNo"
                                            :key="index">
                                            {{item.paramInfoCn}}
                                        </Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                             <Col span="10" offset="1"
                                 v-show=" formValidate.funState ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funCategory')"
                                      prop="funCategory">
                                <span @dblclick="clearDub2">
                                    <Input v-model="funCategoryDis"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_role.adminfun.funCategory')"
                                           @on-click="pickState" />
                                </span>
                            </FormItem>
                            </Col>
                             <Col span="10" offset="1"
                                 v-show=" formValidate.funState ==='1' ? true : false">
                            <FormItem :label="$t('lang_role.adminfun.funDefault')"
                                      prop="funDefault">
                                <span @dblclick="clearDub2">
                                    <Input v-model="funDefaultDis"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_role.adminfun.funDefault')"
                                           @on-click="pickDefault" />
                                </span>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1"
                                 v-show="formValidate.valid !=='1'">
                            <FormItem :label="$t('lang_role.adminfun.invdate')"
                                      prop="invdate">
                                <DatePicker type="date"
                                            :placeholder="$t('lang_role.adminfun.pinvdate')"
                                            :editable="false"
                                            v-model="formValidate.invdate"
                                            :transfer="true"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                            </Col>
                             <!-- 选择树类型 -->
                            <Col span="10" offset="1">
                              <FormItem :label="$t('lang_role.adminfun.treeType')"
                                      prop="treeType">
                                <Select v-model="formValidate.treeType"
                                        :placeholder="$t('lang_role.adminfun.treeType')"
                                        :transfer="true">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectTtreetype"
                                            :key="index">
                                        {{item.paramInfoCn}}
                                    </Option>
                                </Select>

                            </FormItem> 
                            </Col>
                            <!-- 首页过滤参数 -->
                             <Col span="21" offset="1">
                            <FormItem :label="$t('lang_role.adminfun.homePageFiltering')">
                                <Input v-model="formValidate.funPageTerm"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_role.adminfun.homePageFiltering')"></Input>
                                       <span class="valColor">规则：字段属性名=值#字段属性名=值#</span>
                            </FormItem>
                            </Col>
                            <Col span="21" offset="1"
                                 v-show="formValidate.valid !=='1'">
                            <FormItem :label="$t('lang_role.adminfun.invreason')"
                                      prop="invreason">
                                <Input v-model="formValidate.invreason"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_role.adminfun.pinvreason')"></Input>
                            </FormItem>
                            </Col>
                            <Col span="21" offset="1"> 
                            <FormItem :label="$t('lang_role.adminpmtype.comment')"
                                      prop="comment"
                                      style="margin-bottom:0">
                                <Input v-model="formValidate.comment"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_role.adminpmtype.pcomment')"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <Row class="tab-btn">
                        <i-col span="21" offset="1">
                            <Row type="flex" justify="end">
                                <Button @click="handleReset">{{$t('button.cal')}}</Button>
                                <Button type="primary" style="margin-left:10px"
                                @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </Row>
                        </i-col>
                    </Row>
                </TabPane>
                <TabPane class="table" :label="$t('lang_role.adminfun.TabPane2')"
                         name="sys2"
                         :disabled="tabsDisable">
                    <Row style="margin-bottom: 10px;font-size:0" class="btnsgroup">
                        <Button type="warning"
                                @click="transfer">{{$t('button.add')}}</Button>
                        <Button type="error"
                                @click="deletemsgBtu">{{$t('button.del')}}</Button>
                    </Row>
                    <row style="margin-bottom: 10px;"
                         ref="table-form">
                        <Table stripe
                               :loading="loading"
                               @on-sort-change="sortable"
                               @on-selection-change="selectedtable"
                               :height="402"
                               :no-data-text="noDataImg"
                               size="small"
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex;margin-bottom:10px">
                        <Page :current="page"
                              :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="getData(1)"></Button>
                    </Row>
                </TabPane>
            </Tabs>

        </div>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="close"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
        <transition name="fade">
            <sysSeaTable v-show="openPick2"
                         :searchText="searchText2"
                         :searchCloumns="searchCloumns2"
                         :params="params2"
                         @closeUp="close"
                         @changeinput="changeinput2"
                         ref="sysSeaTable"></sysSeaTable>
        </transition>
        <transition name="fade">
            <searchTable2 v-show="openPick3"
                          @closeUp="close"
                          @changeinput="changeinput3"
                          ref="searchTable2"></searchTable2>
        </transition>
        <transition name="fade">
            <searchTable3 v-show="openPick4"
                          :searchText="searchText4"
                          :searchCloumns="searchCloumns4"
                          :params="params4"
                          @closeUp="close"
                          @changeinput="changeinput4"
                          ref="searchTable3"></searchTable3>
        </transition>
        <transition name="fade">
            <transfer v-show="openTransfer"
                      @closeTransfer="closeTransfer"
                      :id="id"
                      :listBtn="listBtn"
                      ref="transfer"
                      @getBtnData="getBtnData">
                      </transfer>
        </transition>
        <!-- 状态类型 -->
         <transition name="fade">
            <searchTableState v-show="openTableState"
                         @closeUp="close"
                         @changeinput="changeTableState"
                         @clear="clear"
                         ref="searchTableState"></searchTableState>
        </transition>
        <!-- 默认状态 -->
        <transition name="fade">
            <searchTableDefault v-show="openTableDefault"
                         @closeUp="close"
                         @changeinput="changeTableDefault"
                         @clear="clear"
                         :funCategoryid='formValidate.funCategory'
                         ref="searchTableDefault"></searchTableDefault>
        </transition>
    </div>
</template>
<script>
import searchTableDefault from '../../../components/searchTable/searchTableDefault'
import searchTableState from '../../../components/searchTable/searchParamType'
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import searchTable from '../../../components/searchTable/searchPubFun'
import searchTable2 from '../../../components/searchTable/searchPubTab'
import searchTable3 from '../../../components/searchTable/searchBaseBak'
import sysSeaTable from '../../../components/searchTable/sysSeaTable'
import transfer from './transfer'
import { isSuccess, deepCopy } from '../../../lib/util'


export default {
    data () {
        const validate = (rule, value, callback) => {
            if (value === undefined && this.formValidate.valid !== '1') {
                callback(new Error('请选择失效日期'))
            } else {
                callback()
            }
        }
        return {
            openTableDefault:false,
            openTableState:false,
            xxxx:'',
            noDataImg:'<div id="noData"></div>',
            spinShow: false,
            loading: false,
            name: 'sys1',
            tableselected: [],
            selectFormtype: [],
            radioYesOrNo: [],
            selectPlatform: [],
            selectFunStyle: [],
            selectTtreetype:[],
            showIsprocess: true,
            showIsprocess2: false,
            showIsprocess3: false,
            offsetVal: '0',
            offsetStepCheck: '1',
            offsetVal2: '1',
            openPick: false,
            openPick2: false,
            openPick3: false,
            openPick4: false,
            openTransfer: false,
            offsetVal3: '',
            funPidDis: '',
            funLancodeDis: '',
            funProcesidDis: '',
            funFormDis: '',
            // 状态节点选择类别及默认状态反查
            funCategoryDis:'',
            funDefaultDis:'',
            tabsDisable: true,
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminfun.btnOrder'),
                    key: 'btnOrder',
                    sortable: 'custom',
                    //          width: 253,
                },
                {
                    title: this.$t('lang_role.adminfun.btnLanCn'),
                    key: 'btnLanCn',
                    sortable: 'custom',
                    //          width: 253,
                },
                {
                    title: this.$t('lang_role.adminfun.btnLanCnEn'),
                    key: 'btnLanCnEn',
                    sortable: 'custom',
                    //          width: 253,
                },
            ],
            data: [],
            sort: 'id',
            order: 'asc',
            rows: 10,
            page: 1,
            total: NaN,
            formValidate: {
                _mt:  this.$global.mt+'SysFunctions.addOrUpdSysFunctions',
                funCode: '',
                funType: '',
                funLancode: '',
                funPid: '',
                funAction: '',
                funStyle: '',
                funFormtype: '',
                funIsform: '1',
                funIsctrlbtn: '0',
                funIsrpt: '0',
                funIsprocess: '1',
                valid: '1',
                funProcesid: '',
                invdate: '',
                funForm: '',
                invreason: '',
                comment: '',
                funIsctrlfield: '0',
                funImg: '',
                // 是否状态节点(添加状态)
                funState:'0',
                funCategory:'',
                funDefault:'',
                treeType:'',
                funPageTerm:''
            },
            searchText2: this.$t('lang_role.adminfun.searchText2'),
            searchCloumns2: [
                {
                    title: this.$t('lang_role.adminfun.lanCn'),
                    key: 'lanCn',
                    width: 253,
                },
                {
                    title: this.$t('lang_role.adminfun.lanCode'),
                    key: 'lanCode',
                    width: 253,
                },
            ],
            params2: {
                _mt:  this.$global.mt+'BaseLang.getPage',
                sort: 'lanCode',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '弹出框',
            },
            searchText4: this.$t('lang_role.adminfun.searchText4'),
            searchCloumns4: [
                {
                    title: this.$t('lang_role.adminfun.flowName'),
                    key: 'flowName',
                    width: 150,
                    sortable: 'custom',
                },
            ],
            params4: {
                _mt:  this.$global.mt+'PlatFlow.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '查询List',
                flowStatus: '02valid',
            },
            ruleValidate: {
                funCode: [
                    { required: true, message: this.$t('lang_role.adminfun.pfunCode'), trigger: 'blur' },
                ],
                funStyle: [
                    { required: true, message: this.$t('lang_role.adminfun.funSign'), trigger: 'blur' },
                ],
                funType: [
                    { required: true, message: this.$t('lang_role.adminfun.funType'), trigger: 'blur' },
                ],
                funLancode: [
                    { required: true, message: this.$t('lang_role.adminfun.pfunLancodeDis'), trigger: 'blur' },
                ],
                funFormtype: [
                    { required: true, message: this.$t('lang_role.adminfun.pfunStyle'), trigger: 'blur' },
                ],
                invdate: [
                    { required: true, validator: validate, trigger: 'change' },
                ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchTable,
        searchTable2,
        searchTable3,
        sysSeaTable,
        transfer,
        searchTableState,
        searchTableDefault
    },
    computed: {
        listBtn () {
            let temArr = []
            this.data.forEach(item => {
                temArr.push(item.btnLancode)
            })
            return temArr
        },
        dateOffset(){
            if(this.formValidate.funIsprocess === '1' && this.formValidate.funIsform !== '1'){
                return ''
            }
            if(this.formValidate.funIsprocess !== '1' && this.formValidate.funIsform === '1'){
                return ''
            }
            if(this.formValidate.funIsprocess !== '1' && this.formValidate.funIsform !== '1'){
                return 1
            }
            if(this.formValidate.funIsprocess === '1' && this.formValidate.funIsform === '1'){
                return 1
            }
        }
    },
    updated () {

    },
    // watch:{
    //     // xxxx
    //     'formValidate.funIsprocess':{
    //         handler:(newV,oldV)=>{
    //             console.log(newV,oldV)
    //         },
    //         deep:true,
    //         immediate:true
    //     },
    //     'formValidate.funIsform':{
    //         handler:(newV,oldV)=>{
    //             console.log(newV,oldV)
    //         },
    //         deep:true,
    //         immediate:true
    //     }
    // },
    methods: {
        // 默认状态弹窗
        pickDefault(){
            const t = this
            t.openTableDefault = true
            t.$refs.searchTableDefault.getData()
        },
         // 默认状态选择字段
       changeTableDefault(name, code){
            const t = this
            t.funDefaultDis = name
            t.formValidate.funDefault = code
        },
        // 状态类别
        changeTableState(name, id){
            const t = this
            t.funCategoryDis = name
            t.formValidate.funCategory = id
        },
        // 选择状态类别
        pickState(){
            const t = this
            t.$refs.searchTableState.getData()
            t.openTableState = true
        },
        getData (id) {
            const t = this;
            t.spinShow = true;
            t.loading = true;
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'SysFunctions.selSysFunctionsByIds',
                ids: id,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.funCode = res.data.content[0].value[0].funCode
                    t.formValidate.funType = res.data.content[0].value[0].funType
                    t.formValidate.funPid = res.data.content[0].value[0].funPid
                    t.funPidDis = res.data.content[0].value[0].funPidDis
                    t.formValidate.funLancode = res.data.content[0].value[0].funLancode
                    t.formValidate.funAction = res.data.content[0].value[0].funAction
                    t.formValidate.funStyle = res.data.content[0].value[0].funStyle
                    t.formValidate.funIsctrlbtn = res.data.content[0].value[0].funIsctrlbtn
                    t.formValidate.funIsrpt = res.data.content[0].value[0].funIsrpt
                    t.formValidate.funIsprocess = res.data.content[0].value[0].funIsprocess
                    t.formValidate.valid = res.data.content[0].value[0].valid
                    t.formValidate.funProcesid = res.data.content[0].value[0].funProcesid
                    t.formValidate.invdate = res.data.content[0].value[0].invdate
                    t.formValidate.invreason = res.data.content[0].value[0].invreason
                    t.formValidate.comment = res.data.content[0].value[0].comment
                    t.formValidate.funFormtype = res.data.content[0].value[0].funFormtype
                    t.formValidate.funForm = res.data.content[0].value[0].funForm
                    t.formValidate.funIsform = res.data.content[0].value[0].funIsform
                    // 状态节点返回
                    t.formValidate.funState = res.data.content[0].value[0].funState
                    t.formValidate.funCategory = res.data.content[0].value[0].funCategory
                    t.funCategoryDis = res.data.content[0].value[0].funCategoryDis
                    t.formValidate.funDefault = res.data.content[0].value[0].funDefault
                    t.funDefaultDis = res.data.content[0].value[0].funDefaultDis
                    t.funFormDis = res.data.content[0].value[0].funFormDis
                    t.funLancodeDis = res.data.content[0].value[0].funLancodeDis
                    t.funProcesidDis = res.data.content[0].value[0].funProcesidDis
                    t.formValidate.funImg = res.data.content[0].value[0].funImg
                    t.formValidate.treeType =res.data.content[0].value[0].treeType
                    t.formValidate.funPageTerm =res.data.content[0].value[0].funPageTerm
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false;
                t.loading = false;
            })
        },
        getBtnData (name) {
            if (name === 0) {
                return
            }
            const t = this
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'SysFunbutton.getSysFunbuttonByPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                btnFunid:t.$store.state.sysFunctionsJS.mainId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].total
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        transfer () {
            this.$refs.transfer.getData()
            this.openTransfer = true
        },
        deletemsgBtu () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'SysFunbutton.delByIds',
                    logType: this.$t('button.del'),
                    delIds: t.tableselected.toString(),
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.getBtnData()
                        t.tableselected = []
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        closeTransfer () {
            this.openTransfer = false
        },
        close () {
            const t = this
            t.openPick = false
            t.openPick2 = false
            t.openPick3 = false
            t.openPick4 = false
            t.openTableState = false
            t.openTableDefault = false
        },
        clear () {
            const t = this
            t.funPidDis = ''
            t.formValidate.funPid = ''
        },
        closeUpd () {
            const t = this
            t.id = ''
        },
        clearDub () {
            const t = this
            t.funLancodeDis = ''
            t.formValidate.funLancode = ''
        },
        clearDub2 () {
            const t = this
            t.funFormDis = ''
            t.formValidate.funForm = ''
        },
        clearDub3 () {
            const t = this
            t.funProcesidDis = ''
            t.formValidate.funProcesid = ''
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getBtnData()
            } else {
                this.order = 'desc'
            }
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'bustype,funstyle,yesno,formtype,treeType',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectPlatform = res.data.content[0].value[0].paramList
                    t.selectFunStyle = res.data.content[0].value[1].paramList
                    t.radioYesOrNo = res.data.content[0].value[2].paramList
                    t.selectFormtype = res.data.content[0].value[3].paramList
                    t.selectTtreetype = res.data.content[0].value[4].paramList
                    for (let i = 0; i < t.selectPlatform.length; i++) {
                        if (t.selectPlatform[i].paramCode === '3call' || t.selectPlatform[i].paramCode === '3user-hrbp' || t.selectPlatform[i].paramCode === '4coe') {
                            t.selectPlatform.splice(i, 1)
                        }
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        tabsSure (id) {
            if (id) {
                this.tabsDisable = false
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
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            //        if (data.funIsprocess === '1') {
            //          data.funIsform = '0'
            //        }
            if (data.invdate !== undefined && data.invdate !== '') {
                data.invdate = new Date(data.invdate).format('yyyy-MM-dd')
            }
            for (const dat in data) {
                if (data[dat] === undefined || data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            //                t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$store.commit('sysFunctionsJS/setMainId',res.data.content[0].id)
                                t.id = res.data.content[0].id
                                t.tabsSure(t.id)
                                //                  t.$refs.formValidate.resetFields()

                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        pickData () {
            const t = this
            t.$refs.searchTable.getData(this.params)
            t.openPick = true
        },
        pickData2 () {
            const t = this
            t.$refs.sysSeaTable.getData(t.params2)
            t.openPick2 = true
        },
        pickData3 () {
            const t = this
            t.$refs.searchTable2.getData(t.params3)
            t.openPick3 = true
        },
        pickData4 () {
            const t = this
            t.$refs.searchTable3.getData(t.params4)
            t.openPick4 = true
        },
        changeinput (name, id) {
            const t = this
            t.funPidDis = name
            t.formValidate.funPid = id
        },
        changeinput2 (name, code) {
            const t = this
            t.funLancodeDis = name
            t.formValidate.funLancode = code
        },
        changeinput3 (name, code) {
            const t = this
            t.funFormDis = name
            t.formValidate.funForm = code
        },
        changeinput4 (name, code) {
            const t = this
            t.funProcesidDis = name
            t.formValidate.funProcesid = code
        },
        handleReset () {
            this.$emit('closeUp')
        },
        //      changeIsprocess() {
        //        const t = this
        //        if (t.formValidate.funIsprocess === '1') {
        //          t.showIsprocess = true
        //          t.showIsprocess2 = false
        //          t.showIsprocess3 = false
        //          t.offsetVal = '0'
        //          t.offsetVal2 = '1'
        //          t.offsetVal3 = '0'
        //          t.formValidate.funIsform = '0'
        //        } else {
        //          t.showIsprocess = false
        //          t.showIsprocess2 = true
        //          t.showIsprocess3 = true
        //          t.offsetVal = '1'
        //          t.offsetVal3 = '1'
        //          t.offsetVal2 = '0'
        //          t.formValidate.funIsform = '1'
        //        }
        //      },
        //      changeIsprocess2() {
        //        const t = this
        //        if (t.formValidate.funIsform === '1') {
        //          t.showIsprocess3 = true
        //          t.offsetVal3 = '1'
        //          t.offsetVal = '1'
        //        } else {
        //          t.showIsprocess3 = false
        //          t.offsetVal3 = '0'
        //          t.offsetVal = '1'
        //        }
        //      },
    },
    watch: {},
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.valColor{
    color: red;
}
.box{
    max-height:600px;
}
.tab-box {
    overflow-y: auto;
    height: 412px;
}

.tab-btn {
    margin-top:20px;
    font-size:0;
    padding-right: 7px;
}
//
@import "../../../sass/table.scss";
.btnsgroup{
    button:nth-child(1){
        margin-right: 10px;
    }
}
/deep/ .ivu-tabs-bar{
    margin-bottom:0px;
}
.ivu-tabs{
    .form{
        margin-top:20px;

        /deep/ .ivu-form-item-content{
            line-height:2;
        }
    }
    .table{
        margin-top:10px;
    }
}
</style>
