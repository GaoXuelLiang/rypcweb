<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix v-if="spinShow"></Spin>
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
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <div ref="scrollBox"
                         style="max-height: 420px;overflow-y: auto;">
                        <Form ref="formValidate"
                            :model="formValidate"
                            :rules="ruleValidate"
                            :label-width="135">
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpCompany"
                                        prop="ebpCompany">
                                    <span @dblclick="dbHCompany">
                                        <Input v-model="formValidate.ebpCompanyDis"
                                            style="width: 100%"
                                            icon="ios-search"
                                            :readonly="true"
                                            :placeholder="placeHolderDesc.ebpCompany"
                                            @on-click="selectHCompany" />
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpDept"
                                        prop="ebpDept">
                                    <span @dblclick="clearDepart">
                                        <Input v-model="formValidate.ebpDeptDis"
                                            style="width: 100%"
                                            icon="ios-search"
                                            :readonly="true"
                                            :placeholder="placeHolderDesc.ebpDept"
                                            @on-click="pickDepart" />
                                    </span>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpPosition"
                                        prop="ebpPosition">
                                    <span @dblclick="dbPost">
                                        <Input :placeholder="placeHolderDesc.ebpPosition"
                                            icon="ios-search"
                                            :readonly="true"
                                            v-model="formValidate.ebpPositionDis"
                                            @on-click="selectPost" />
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpBusiarea"
                                        prop="ebpBusiarea">
                                    <Input v-model="formValidate.ebpBusiarea"
                                        :placeholder="placeHolderDesc.ebpBusiarea"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="姓名"
                                        prop="ebpCname">
                                    <Input v-model="formValidate.ebpCname"
                                        @on-click="opencompetType('ebpCname')"
                                        :placeholder="placeHolderDesc.ebpCname"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpIdtype"
                                        prop="ebpIdtype">
                                    <Select v-model="formValidate.ebpIdtype"
                                            :placeholder="placeHolderDesc.ebpIdtype"
                                            disabled>
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[0]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <!--<Col span="10" offset="1">-->
                                <!--<FormItem :label="labelDesc.ebpAlias" prop="ebpAlias">-->
                                <!--<Input v-model="formValidate.ebpAlias" :placeholder="placeHolderDesc.ebpAlias"></Input>-->
                                <!--</FormItem>-->
                                <!--</Col>-->
                            </Row>

                            <!--<Row>-->
                            <!--<Col span="10" offset="1">-->
                            <!--<FormItem :label="labelDesc.ebpFirstname" prop="ebpFirstname">-->
                            <!--<Input v-model="formValidate.ebpFirstname" disabled :placeholder="placeHolderDesc.ebpFirstname"></Input>-->
                            <!--</FormItem>-->
                            <!--</Col>-->
                            <!--<Col span="10" offset="1">-->
                            <!--<FormItem :label="labelDesc.ebpLastname" prop="ebpLastname">-->
                            <!--<Input v-model="formValidate.ebpLastname" disabled :placeholder="placeHolderDesc.ebpLastname"></Input>-->
                            <!--</FormItem>-->
                            <!--</Col>-->
                            <!--</Row>-->
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpIdno"
                                        prop="ebpIdno">
                                    <Input v-model="formValidate.ebpIdno"
                                        disabled
                                        :placeholder="placeHolderDesc.ebpIdno"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpType"
                                        prop="ebpType">
                                    <Select v-model="formValidate.ebpType"
                                            :placeholder="placeHolderDesc.ebpType">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[1]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '01reward'">
                                <FormItem :label="labelDesc.ebpAwardtype"
                                        prop="ebpAwardtype">
                                    <Select v-model="formValidate.ebpAwardtype"
                                            :placeholder="placeHolderDesc.ebpAwardtype">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[2]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '01reward'">
                                <FormItem :label="labelDesc.ebpAwardway"
                                        prop="ebpAwardway">
                                    <Select v-model="formValidate.ebpAwardway"
                                            :placeholder="placeHolderDesc.ebpAwardway">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[3]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '02punish'">
                                <FormItem :label="labelDesc.ebpBreaktype"
                                        prop="ebpBreaktype">
                                    <Select v-model="formValidate.ebpBreaktype"
                                            :placeholder="placeHolderDesc.ebpBreaktype">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[4]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '01reward'">
                                <FormItem :label="labelDesc.ebpAwarddate"
                                        prop="ebpAwarddate">
                                    <DatePicker type="date"
                                                :editable="false"
                                                :transfer="true"
                                                style="width: 100%"
                                                :placeholder="placeHolderDesc.ebpAwarddate"
                                                v-model="formValidate.ebpAwarddate"></DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="21"
                                    offset="1"
                                    v-if="formValidate.ebpType === '01reward'">
                                <FormItem :label="labelDesc.ebpAwardlink"
                                        prop="ebpAwardlink">
                                    <Input v-model="formValidate.ebpAwardlink"
                                        type="textarea"
                                        :autosize="{minRows: 2,maxRows: 5}"
                                        :placeholder="placeHolderDesc.ebpAwardlink"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '02punish'">
                                <FormItem :label="labelDesc.ebpPunishtype"
                                        prop="ebpPunishtype">
                                    <Select v-model="formValidate.ebpPunishtype"
                                            :placeholder="placeHolderDesc.ebpPunishtype">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[5]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpType === '02punish'">
                                <FormItem :label="labelDesc.ebpPunishdate"
                                        prop="ebpPunishdate">
                                    <DatePicker type="date"
                                                :editable="false"
                                                :transfer="true"
                                                style="width: 100%"
                                                :placeholder="placeHolderDesc.ebpPunishdate"
                                                v-model="formValidate.ebpPunishdate"></DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="21"
                                    offset="1"
                                    v-if="formValidate.ebpType === '02punish'">
                                <FormItem :label="labelDesc.ebpBreaklink"
                                        prop="ebpBreaklink">
                                    <Input v-model="formValidate.ebpBreaklink"
                                        type="textarea"
                                        :autosize="{minRows: 2,maxRows: 5}"
                                        :placeholder="placeHolderDesc.ebpBreaklink"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpRelieve"
                                        prop="ebpRelieve">
                                    <RadioGroup v-model="formValidate.ebpRelieve"
                                                :placeholder="placeHolderDesc.ebpRelieve">
                                        <Radio :label="item.paramCode"
                                            disabled
                                            v-for="(item,index) in TypeParams[6]"
                                            :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="21"
                                    offset="1"
                                    v-if="formValidate.ebpRelieve === '1'">
                                <FormItem :label="labelDesc.ebpRelievereason"
                                        prop="ebpRelievereason">
                                    <Input v-model="formValidate.ebpRelievereason"
                                        disabled
                                        type="textarea"
                                        :autosize="{minRows: 2,maxRows: 5}"
                                        :placeholder="placeHolderDesc.ebpRelievereason"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1"
                                    v-if="formValidate.ebpRelieve === '1'">
                                <FormItem :label="labelDesc.ebpRelievedate"
                                        prop="ebpRelievedate">
                                    <DatePicker type="date"
                                                :editable="false"
                                                disabled
                                                :transfer="true"
                                                style="width: 100%"
                                                :placeholder="placeHolderDesc.ebpRelievedate"
                                                v-model="formValidate.ebpRelievedate"></DatePicker>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="21"
                                    offset="1"
                                    v-if="formValidate.ebpRelieve === '1'">
                                <FormItem :label="labelDesc.ebpRelievelink"
                                        prop="ebpRelievelink">
                                    <Input v-model="formValidate.ebpRelievelink"
                                        disabled
                                        type="textarea"
                                        :autosize="{minRows: 2,maxRows: 5}"
                                        :placeholder="placeHolderDesc.ebpRelievelink"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpStatus"
                                        prop="ebpStatus">
                                    <Select v-model="formValidate.ebpStatus"
                                            disabled
                                            :placeholder="placeHolderDesc.ebpStatus">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in TypeParams[7]"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="21"
                                    offset="1">
                                <FormItem :label="labelDesc.ebpComment"
                                        prop="ebpComment" class="last-item">
                                    <Input v-model="formValidate.ebpComment"
                                        type="textarea"
                                        :autosize="{minRows: 2,maxRows: 5}"
                                        :placeholder="placeHolderDesc.ebpComment"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </div>
            <Row class="row">
                <i-col span="21" offset="1" style="text-align:right;padding-right: 7px;">
                    <Button @click="handleReset"
                            style="margin-right: 8px;">{{$t('button.cal')}}</Button>
                    <Button :disabled="disabled"
                            type="primary"
                            @click="handleSubmit"
                            v-show="!isSearch">{{$t('button.sav')}}</Button>
                </i-col>
            </Row>
        </div>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <!-- 部门 -->
        <transition name="fade">
            <searchDept v-show="openDept"
                        @closeDept="closeDept"
                        :searchDeptClo="searchDeptClo"
                        @inputDept="inputDept"
                        :params="paramsDept"
                        ref="searchDept"></searchDept>
        </transition>
        <!--岗位-->
        <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import searchPost from '../../../components/searchTable/searchPost'
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy, getUrlKey } from '@/lib/util'
import { getSysLananges } from '@/lib/pub_fun'

export default {
    data () {
        return {
            spinShow: false,
            labelDesc: { ebpCname: "", ebpAlias: "", ebpFirstname: "", ebpLastname: "", ebpIdtype: "", ebpIdno: "", ebpCompany: "", ebpDept: "", ebpPosition: "", ebpBusiarea: "", ebpType: "", ebpAwardtype: "", ebpAwardway: "", ebpAwarddate: "", ebpAwardlink: "", ebpBreaktype: "", ebpPunishtype: "", ebpPunishdate: "", ebpBreaklink: "", ebpRelieve: "", ebpRelievereason: "", ebpRelievedate: "", ebpRelievelink: "", ebpStatus: "", ebpComment: "", },
            placeHolderDesc: { ebpCname: "", ebpAlias: "", ebpFirstname: "", ebpLastname: "", ebpIdtype: "", ebpIdno: "", ebpCompany: "", ebpDept: "", ebpPosition: "", ebpBusiarea: "", ebpType: "", ebpAwardtype: "", ebpAwardway: "", ebpAwarddate: "", ebpAwardlink: "", ebpBreaktype: "", ebpPunishtype: "", ebpPunishdate: "", ebpBreaklink: "", ebpRelieve: "", ebpRelievereason: "", ebpRelievedate: "", ebpRelievelink: "", ebpStatus: "", ebpComment: "", },
            ruleDesc: { ebpCname: "", ebpAlias: "", ebpFirstname: "", ebpLastname: "", ebpIdtype: "", ebpIdno: "", ebpCompany: "", ebpDept: "", ebpPosition: "", ebpBusiarea: "", ebpType: "", ebpAwardtype: "", ebpAwardway: "", ebpAwarddate: "", ebpAwardlink: "", ebpBreaktype: "", ebpPunishtype: "", ebpPunishdate: "", ebpBreaklink: "", ebpRelieve: "", ebpRelievereason: "", ebpRelievedate: "", ebpRelievelink: "", ebpStatus: "", ebpComment: "", },
            openHCompany: false,  // 雇佣公司
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.compCnFullName'),
                    key: 'compFnameCnDis',
                },
            ],
            paramsHCompany: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                unitType: '01company,10area',
                logType: '雇佣公司',
            },
            openDept: false, // 部门弹出选择
            searchDeptClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.departCnFullName'),
                    key: 'compFnameCnDis',
                },
            ],
            paramsDept: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1106',
                logType: '部门',
                unitType: '70dept,20city,30busi',
            },
            // 岗位
            openPost: false,
            searchPostClo: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFnameCnDis',
                },
            ],
            paramsPost: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '岗位',
            },
            // ---------------------------------------------
            disabled: false,    // 表结构的信息
            formValidate: {
                _mt:  this.$global.mt+'EmpBonuspenalty.addOrUpd',
                ebpEmpid: '',
                ebpCname: '',
                ebpAlias: '',
                ebpFirstname: '',
                ebpLastname: '',
                ebpIdtype: '',
                ebpIdno: '',
                ebpCompany: '',
                ebpCompanyDis: '',
                ebpDept: '',
                ebpDeptDis: '',
                ebpPosition: '',
                ebpPositionDis: '',
                ebpBusiarea: '',
                ebpType: '01reward',
                ebpAwardtype: 'rdrs001',
                ebpAwardway: 'rdst001',
                ebpAwarddate: '',
                ebpAwardlink: '',
                ebpBreaktype: '',
                ebpPunishtype: '',
                ebpPunishdate: '',
                ebpBreaklink: '',
                ebpRelieve: '0',
                ebpRelievereason: '',
                ebpRelievedate: '',
                ebpRelievelink: '',
                ebpStatus: '01draft',
                ebpComment: '',
            },
            ruleValidate: {
                ebpCname: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                ebpAlias: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                //          ebpFirstname: [
                //            { required: true, message: '', trigger: 'blur' },
                //          ],
                //          ebpLastname: [
                //            { required: true, message: '', trigger: 'blur' },
                //          ],
                //          ebpIdtype: [
                //            { required: true, message: '', trigger: 'blur' },
                //          ],
                //          ebpIdno: [
                //            { required: true, message: '', trigger: 'blur' },
                //          ],
                ebpCompany: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpDept: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpPosition: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpBusiarea: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                ebpType: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpAwardtype: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpAwardway: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpAwardlink: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                ebpBreaktype: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpPunishtype: [
                    { required: true, message: '', trigger: 'change' },
                ],
                ebpBreaklink: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                ebpAwarddate: [
                    { required: true, type: 'date', message: '', trigger: 'change' },
                ],
                ebpPunishdate: [
                    { required: true, type: 'date', message: '', trigger: 'change' },
                ],
            },
            showModal: false,
            modiaContent: '',
            dataParame: {},
            id: NaN,
            logType: '',
            TypeParams: [],
            typeCode: 'idtype,rptype,rewardreason,rewardstyle,illegaltype,punishtype,yesno,rpstatus',
            isSearch: false,
        }
    },
    components: {
        searchHCompany,
        searchDept,
        searchPost,
    },
    props: {
        //      id: Number,
        //      logType: String,
        //      index: Number,
        //      labelDesc: Object,
        //      placeHolderDesc: Object,
        //      TypeParams: Array,
    },
    updated () {

    },
    // mounted() {
    //   // 列表字段存储
    //   this.getColumns()
    //   this.getSelectValue()
    //   if (this.$route.name.endsWith('_Edit')) {
    //     this.id = this.$route.query.dataid
    //     this.logType = decodeURI(decodeURI(this.$route.query.logType))
    //     this.isSearch = this.$route.query.isSearch
    //     this.getData(this.id)
    //   }
    //   // if (this.id) {
    //   //   this.getData(this.id)
    //   // }
    // },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            this.getColumns()
            this.getSelectValue()
            if (this.$route.name.endsWith('_Edit')) {
                this.id = this.$route.query.dataid
                this.logType = decodeURI(decodeURI(this.$route.query.logType))
                this.isSearch = this.$route.query.isSearch
                this.getData(this.id)
            }
        }
    },
    methods: {
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
                            t.ruleDesc[item.lanCode] = item.lanDesc + t.$t('lang_evaluation.evaluation.notNull') // 配置在多语言里面
                            //                for (let i = 0; i < t.columns.length; i++) {
                            //                  let keylen = 0
                            //                  if (t.columns[i].key !== undefined) {
                            //                    keylen = t.columns[i].key.length
                            //                  }
                            //                  // 如果尾部是dis. 如果尾部是dis的形式。取值
                            //                  if (t.columns[i].key === item.lanCode || t.columns[i].key !== undefined
                            //                    && t.columns[i].key.endsWith('Dis') && t.columns[i].key.substring(0, keylen - 3) === item.lanCode) {
                            //                    t.columns[i].title = item.lanDesc
                            //                    break
                            //                  }
                            //                }
                            //                for (let i = 0; i < t.expDataTital.length; i++) {
                            //                  if (t.expDataTital[i].code === item.lanCode) {
                            //                    t.expDataTital[i].name = item.lanDesc
                            //                    break
                            //                  }
                            //                }
                        })
                    }
                    // 设置修改页面字段的rule message
                    const updRule = t.ruleValidate
                    for (let prop in updRule) {
                        for (let i = 0; i < updRule[prop].length; i++) {
                            if (updRule[prop][i].required) {
                                updRule[prop][i].message = t.ruleDesc[prop]
                                break
                            }
                        }
                    }
                }
            })
            //          .catch((err) => {
            //          this.$Modal.error({
            //            title: this.$t('reminder.err'),
            //            content: this.$t('reminder.errormessage'),
            //          })
            //        })
            t.$store.commit('commonPage/setColumns', this.columns)
        },
        getData (id) {
            if (id) {
                const t = this
                t.spinShow = true
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'EmpBonuspenalty.getById',
                    id: id,
                    logType: '根据id获取数据',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.formValidate.ebpCname = res.data.content[0].ebpCname
                        t.formValidate.ebpAlias = res.data.content[0].ebpAlias
                        t.formValidate.ebpFirstname = res.data.content[0].ebpFirstname
                        t.formValidate.ebpLastname = res.data.content[0].ebpLastname
                        t.formValidate.ebpIdtype = res.data.content[0].ebpIdtype
                        t.formValidate.ebpIdno = res.data.content[0].ebpIdno
                        t.formValidate.ebpCompany = res.data.content[0].ebpCompany
                        t.formValidate.ebpCompanyDis = res.data.content[0].ebpCompanyDis
                        t.formValidate.ebpDept = res.data.content[0].ebpDept
                        t.formValidate.ebpDeptDis = res.data.content[0].ebpDeptDis
                        t.formValidate.ebpPosition = res.data.content[0].ebpPosition
                        t.formValidate.ebpPositionDis = res.data.content[0].ebpPositionDis
                        t.formValidate.ebpBusiarea = res.data.content[0].ebpBusiarea
                        t.formValidate.ebpType = res.data.content[0].ebpType
                        t.formValidate.ebpAwardtype = res.data.content[0].ebpAwardtype
                        t.formValidate.ebpAwardway = res.data.content[0].ebpAwardway
                        if (res.data.content[0].ebpAwarddate !== undefined) {
                            t.formValidate.ebpAwarddate = res.data.content[0].ebpAwarddate === '' ? '' : new Date(res.data.content[0].ebpAwarddate)
                        }
                        t.formValidate.ebpAwardlink = res.data.content[0].ebpAwardlink
                        t.formValidate.ebpBreaktype = res.data.content[0].ebpBreaktype
                        t.formValidate.ebpPunishtype = res.data.content[0].ebpPunishtype
                        t.formValidate.ebpPunishdate = res.data.content[0].ebpPunishdate
                        if (res.data.content[0].ebpPunishdate !== undefined) {
                            t.formValidate.ebpPunishdate = res.data.content[0].ebpPunishdate === '' ? '' : new Date(res.data.content[0].ebpPunishdate)
                        }
                        t.formValidate.ebpBreaklink = res.data.content[0].ebpBreaklink
                        t.formValidate.ebpRelieve = res.data.content[0].ebpRelieve
                        t.formValidate.ebpRelievereason = res.data.content[0].ebpRelievereason
                        t.formValidate.ebpRelievedate = res.data.content[0].ebpRelievedate
                        if (res.data.content[0].ebpRelievedate !== undefined) {
                            t.formValidate.ebpRelievedate = res.data.content[0].ebpRelievedate === '' ? '' : new Date(res.data.content[0].ebpRelievedate)
                        }
                        t.formValidate.ebpRelievelink = res.data.content[0].ebpRelievelink
                        t.formValidate.ebpStatus = res.data.content[0].ebpStatus
                        t.formValidate.ebpComment = res.data.content[0].ebpComment
                        t.spinShow = false
                    }
                })
            }
            //          .catch(() => {
            //          this.$Modal.error({
            //            title: this.$t('reminder.err'),
            //            content: this.$t('reminder.errormessage'),
            //          })
            //        })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            if (data.ebpAwarddate !== undefined) {
                data.ebpAwarddate = data.ebpAwarddate === '' ? '' : new Date(data.ebpAwarddate).format('yyyy-MM-dd')
            }
            if (data.ebpPunishdate !== undefined) {
                data.ebpPunishdate = data.ebpPunishdate === '' ? '' : new Date(data.ebpPunishdate).format('yyyy-MM-dd')
            }
            if (data.ebpRelievedate !== undefined) {
                data.ebpRelievedate = data.ebpRelievedate === '' ? '' : new Date(data.ebpRelievedate).format('yyyy-MM-dd')
            }

            // 根据奖惩类型， 添加移除校验
            if (this.formValidate.ebpType === '01reward') {
                data.ebpBreaktype = ''
                data.ebpPunishtype = ''
                data.ebpBreaklink = ''
                data.ebpPunishdate = ''
                delete this.ruleValidate.ebpBreaktype
                delete this.ruleValidate.ebpPunishtype
                delete this.ruleValidate.ebpBreaklink
                delete this.ruleValidate.ebpPunishdate
                this.ruleValidate.ebpAwardtype = [
                    { required: true, message: '', trigger: 'change' },
                ]
                this.ruleValidate.ebpAwardway = [
                    { required: true, message: '', trigger: 'change' },
                ]
                this.ruleValidate.ebpAwardlink = [
                    { required: true, message: '', trigger: 'blur' },
                ]
                this.ruleValidate.ebpAwarddate = [
                    { required: true, type: 'date', message: '', trigger: 'change' },
                ]
            } else {
                data.ebpAwardtype = ''
                data.ebpAwardway = ''
                data.ebpAwardlink = ''
                data.ebpAwarddate = ''
                delete this.ruleValidate.ebpAwardtype
                delete this.ruleValidate.ebpAwardway
                delete this.ruleValidate.ebpAwardlink
                delete this.ruleValidate.ebpAwarddate
                this.ruleValidate.ebpBreaktype = [
                    { required: true, message: '', trigger: 'change' },
                ]
                this.ruleValidate.ebpPunishtype = [
                    { required: true, message: '', trigger: 'change' },
                ]
                this.ruleValidate.ebpBreaklink = [
                    { required: true, message: '', trigger: 'blur' },
                ]
                this.ruleValidate.ebpPunishdate = [
                    { required: true, type: 'date', message: '', trigger: 'change' },
                ]
            }

            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                //                  t.$refs.formValidate.resetFields()
                                //                  t.$emit('newData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                            t.handleReset()
                        }
                    })
                    //              .catch(() => {
                    //              this.$Modal.error({
                    //                title: this.$t('reminder.err'),
                    //                content: this.$t('reminder.errormessage'),
                    //              })
                    //            })
                }
            })
        },
        handleReset () {
            this.formValidate.ebpEmpid = ''
            this.formValidate.ebpCname = ''
            this.formValidate.ebpAlias = ''
            this.formValidate.ebpFirstname = ''
            this.formValidate.ebpLastname = ''
            this.formValidate.ebpIdtype = ''
            this.formValidate.ebpIdno = ''
            this.formValidate.ebpCompany = ''
            this.formValidate.ebpCompanyDis = ''
            this.formValidate.ebpDept = ''
            this.formValidate.ebpDeptDis = ''
            this.formValidate.ebpPosition = ''
            this.formValidate.ebpPositionDis = ''
            this.formValidate.ebpBusiarea = ''
            this.formValidate.ebpType = '01reward'
            this.formValidate.ebpAwardtype = 'rdrs001'
            this.formValidate.ebpAwardway = 'rdst001'
            this.formValidate.ebpAwarddate = ''
            this.formValidate.ebpAwardlink = ''
            this.formValidate.ebpBreaktype = ''
            this.formValidate.ebpPunishtype = ''
            this.formValidate.ebpPunishdate = ''
            this.formValidate.ebpBreaklink = ''
            this.formValidate.ebpRelieve = '1'
            this.formValidate.ebpRelievereason = ''
            this.formValidate.ebpRelievedate = ''
            this.formValidate.ebpRelievelink = ''
            this.formValidate.ebpStatus = '01draft'
            this.formValidate.ebpComment = ''
            //        this.$emit('closeUp')
            this.$router.go(-1)
            this.$refs.formValidate.resetFields()
        },
        /**
         * 公司弹出框
         */
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        inputHCompany (name, id) {
            const t = this
            if (t.formValidate.ebpCompany === id) {
                return
            }
            t.formValidate.ebpCompanyDis = name
            t.formValidate.ebpCompany = id
            t.clearDepart()
        },
        dbHCompany () {
            const t = this
            t.formValidate.ebpCompanyDis = ''
            t.formValidate.ebpCompany = ''
            t.clearDepart()
        },
        /**
         * 部门弹出框
         */
        pickDepart () {
            const t = this
            if (t.formValidate.ebpCompany === '' || t.formValidate.ebpCompany === undefined) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empHireCompDis'),
                })
            } else {
                const paramsDept = deepCopy(t.paramsDept)
                t.$refs.searchDept.getData(paramsDept, '')
                t.openDept = true
            }
        },
        inputDept (name, id) {
            const t = this
            if (t.formValidate.ebpDept === id) {
                return
            }
            t.formValidate.ebpDeptDis = name
            t.formValidate.ebpDept = id
            t.dbPost()
        },
        clearDepart () {
            const t = this
            t.formValidate.ebpDeptDis = ''
            t.formValidate.ebpDept = ''
            t.dbPost()
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
        /**
         * 选择岗位弹出框
         */
        selectPost () {
            const t = this
            if (t.formValidate.ebpDept === '' || t.formValidate.ebpDept === undefined) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empPostDis'),
                })
            } else {
                const paramsPost = deepCopy(t.paramsPost)
                //          t.$refs.searchPost.getData(paramsPost, 'unit' + t.formValidate.ebpDept)
                t.$refs.searchPost.getData(paramsPost, '')
                t.openPost = true
            }
        },
        closePost () {
            const t = this
            t.$refs.searchPost.postCode = ''
            t.openPost = false
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.formValidate.ebpPositionDis = name
            t.formValidate.ebpPosition = id
        },
        dbPost () {
            const t = this
            t.formValidate.ebpPositionDis = ''
            t.formValidate.ebpPosition = ''
        },
        /*
         弹出选择
       */
        opencompetType (type) {
            this.dataParame = {}
            switch (type) {
                case 'ebpCname':
                    if (this.formValidate.ebpPosition === '') {
                        this.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '请先选择岗位',
                        })
                        return
                    }
                    console.log(this.formValidate.ebpPosition, 'this.formValidate.ebpPosition')
                    this.modiaContent = 'emp-base-std-name'
                    this.dataParame = {
                        empcompPost: this.formValidate.ebpPosition,
                    }
                    break
            }
            this.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            switch (type) {
                case 'emp-base-std-name':
                    t.formValidate.ebpEmpid = row.id
                    t.formValidate.ebpCname = row.empCname
                    t.formValidate.ebpFirstname = row.empFirstname
                    t.formValidate.ebpLastname = row.empEname
                    t.formValidate.ebpIdtype = row.empidType
                    t.formValidate.ebpIdno = row.empidNo
                    t.ebpCnameDis = row.empCname
                    break
            }
        },
        // 获取下拉列表数据
        getSelectValue () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
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
            //          .catch(() => {
            //          this.$Message.error(this.$t('reminder.errormessage'))
            //        })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.option-main {
    position: relative;
}
.last-item{
    margin-bottom: 0 !important;
}
.row{
    margin: 20px 0;
}
</style>
