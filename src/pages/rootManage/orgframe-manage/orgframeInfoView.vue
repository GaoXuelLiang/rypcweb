<template>
    <div class="option-main">
        <div>
            <!-- <Spin size="large" fix
                               v-if="spinShow"></Spin>
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
            </div> -->
                    <div ref="scrollBox"
                        class="form_box">
                        <Form ref="formValidate"
                              :model="formValidate"
                              :rules="ruleValidate"
                              :label-width="135"
                              >
                              <Row>
                            <i-col span="10">
                                <FormItem :label="$t('lang_organization.orgframe.unitCode')"
                                          prop="unitCode">
                                    <Input v-model="formValidate.unitCode"
                                           :readonly="forbidden"
                                           :placeholder="$t('lang_organization.orgframe.unitCodeInp')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10" offset="1">
                                <FormItem :label="$t('lang_organization.orgframe.unitTypeName')"
                                          prop="unitType">
                                    <Select v-model="formValidate.unitType"
                                            @on-change="selectCompany"
                                            :disabled="logType === '修改'"
                                            :placeholder="$t('lang_organization.orgframe.unitTypeNameInp')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in selectUnitType"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            </Row>
                            <i-col span="10">
                                <FormItem :label="$t('lang_organization.orgcostcenter.cname')"
                                          prop="unitCn">
                                    <Input v-model="formValidate.unitCn"
                                           :placeholder="$t('lang_organization.orgcostcenter.cnameDis')"></Input>
                                </FormItem>
                            </i-col>
                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.compFnameEnDis')" prop="compFnameEnDis">-->
                            <!--                  <Input v-model="formValidate.compFnameEnDis" :placeholder="$t('lang_organization.orgframe.compFnameEnDisInp')"></Input>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <i-col span="10" offset="1">
                                <FormItem :label="$t('lang_organization.orgcostcenter.ename')"
                                          prop="unitEn">
                                    <Input v-model="formValidate.unitEn"
                                           :placeholder="$t('lang_organization.orgcostcenter.enameDis')"></Input>
                                </FormItem>
                            </i-col>
                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.compSnameEnDis')" prop="compSnameEnDis">-->
                            <!--                  <Input v-model="formValidate.compSnameEnDis" :placeholder="$t('lang_organization.orgframe.compSnameEnDisInp')"></Input>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <!--              @on-click="chooseLeader('unitGroupSeqcharger')"-->
                            <i-col span="10">
                                <FormItem :label="$t('lang_organization.orgframe.unitPname')"
                                          prop="unitPid">
                                    <span @dblclick="clearPid">
                                        <Input v-model="unitPname"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_organization.orgframe.unitPnameInp')"
                                               @on-click="pickData2" />
                                    </span>
                                </FormItem>
                            </i-col>
                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.unitLevel')" prop="unitLevel">-->
                            <!--                  <Select v-model="formValidate.unitLevel"  :placeholder="$t('lang_organization.orgframe.p_unitLevel')">-->
                            <!--                    <Option :value="item.paramCode" v-for="(item,index) in selectUnitlevel" :key="index">{{item.paramInfoCn}}</Option>-->
                            <!--                  </Select>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <i-col span="10" offset="1">
                                <FormItem :label="$t('lang_organization.orgframe.unitCharger')"
                                          prop="unitCharger">
                                    <span @dblclick="clearMgt">
                                        <Input v-model="unitChargerDis"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_organization.orgframe.p_unitCharger')"
                                               @on-click="pickData4" />
                                    </span>
                                </FormItem>
                            </i-col>

                            <i-col span="10"
                                   v-if="formValidate.unitType !== '01company'">
                                <FormItem label="分管领导"
                                          prop="unitChargeleader">
                                    <span @dblclick="clearLeader('unitChargeleaderDis')">
                                        <Input v-model="formValidate.unitChargeleaderDis"
                                               :readonly="forbidden"
                                               placeholder="分管领导"
                                               @on-click="chooseLeader('unitChargeleaderDis')"></Input>
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10" offset="1"
                                   v-show="formValidate.unitType === '70dept'">
                                <FormItem label="集团部门条线负责人">
                                    <span @dblclick="clearLeader('unitGroupSeqcharger')">
                                        <Input v-model="formValidate.unitGroupSeqchargerDis"
                                               :readonly="forbidden"
                                               placeholder="集团部门条线负责人"
                                               @on-click="pickData5"></Input>
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10" :offset="formValidate.unitType !== '70dept'?'1':''"
                                   v-if="formValidate.unitType !== '01company'">
                                <FormItem label="部门管理员"
                                          prop="unitDeptadmin">
                                    <span @dblclick="clearLeader('unitDeptadminDis')">
                                        <Input v-model="formValidate.unitDeptadminDis"
                                               :readonly="forbidden"
                                               placeholder="部门管理员"
                                               @on-click="chooseLeader('unitDeptadminDis')"></Input>
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10" 
                                   v-if="formValidate.unitType !== '70dept'">
                                <FormItem label="OA管理员账号"
                                          prop="">
                                    <Input v-model="formValidate.unitOaccount"
                                           placeholder="OA管理员账号"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10" offset="1"
                                   v-if="formValidate.unitType !== '70dept'">
                                <FormItem label="OA管理员密码"
                                          prop="">
                                    <Input v-model="formValidate.unitOaPwd"
                                           type="password"
                                           placeholder="OA管理员密码"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10" :offset="formValidate.unitType === '70dept'?'1':''">
                                <FormItem label="排序号"
                                          prop="unitOrder">
                                    <Input v-model="formValidate.unitOrder"
                                           placeholder="排序号"></Input>
                                </FormItem>
                            </i-col>

                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.unitDfcostcenter')" prop="unitDfcostcenter">-->
                            <!--                  <span @dblclick="clearCostcenter">-->
                            <!--                    <Input v-model="unitDfcostcenterName"  icon="ios-search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfcostcenterInp')"  @on-click="pickData3" />-->
                            <!--                  </span>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.unitDfhirecity')" prop="unitDfhirecity">-->
                            <!--                  <span @dblclick="clearDfhire">-->
                            <!--                    <Input v-model="unitDfhirecityName"  icon="ios-search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfhirecityInp')"  @on-click="pickData" />-->
                            <!--                  </span>-->
                            <!--              </FormItem>-->
                            <!--              </i-col>-->
                            <!--              <i-col span="11"  >-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.unitDfworkcity')" prop="unitDfworkcity">-->
                            <!--                  <span @dblclick="clearDfwork">-->
                            <!--                    <Input v-model="unitDfworkcityName"  icon="ios-search" :readonly="true" :placeholder="$t('lang_organization.orgframe.unitDfworkcityInp')"  @on-click="pickData1" />-->
                            <!--                  </span>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <!--              <i-col span="22"  v-if="formValidate.unitType === '01company'">-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.c_location')" prop="unitDlocation">-->
                            <!--                  <i-col span="20"  >-->
                            <!--                    <Input v-model="formValidate.unitDlocation" type="text" disabled :placeholder="$t('lang_organization.orgframe.c_locationSch')"></Input>-->
                            <!--                  </i-col>-->
                            <!--                  <i-col span="4">-->
                            <!--                    <Button style='width: 100%;' type="primary" @click="openMap">选取地点</Button>-->
                            <!--                  </i-col>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <!--              <i-col span="22" v-if="formValidate.unitType === '01company'" style="display: none">-->
                            <!--                <FormItem :label="$t('lang_organization.orgframe.unitAgentno')" prop="unitAgentno">-->
                            <!--                  <Input v-model="formValidate.unitAgentno" :placeholder="$t('lang_organization.orgframe.unitAgentnoInp')"></Input>-->
                            <!--                </FormItem>-->
                            <!--              </i-col>-->
                            <i-col span="10" :offset="formValidate.unitType !== '70dept'?'1':''">
                                <FormItem :label="$t('lang_organization.orgframe.validdate')"
                                          prop="validdate">
                                    <DatePicker type="date"
                                                :disabled="disabledVaild"
                                                :readonly="disabledVaild"
                                                :placeholder="$t('lang_organization.orgframe.validdateInp')"
                                                :editable="false"
                                                v-model="formValidate.validdate"
                                                style="width: 100%"></DatePicker>
                                </FormItem>
                            </i-col>
                            <i-col span="10" :offset="formValidate.unitType === '70dept'?'1':''">
                                <FormItem :label="$t('lang_organization.orgframe.invdate')"
                                          prop="invdate">
                                    <DatePicker type="date"
                                                disabled
                                                readonly
                                                :placeholder="$t('lang_organization.orgframe.invdateInp')"
                                                :editable="false"
                                                v-model="formValidate.invdate"
                                                style="width: 100%"></DatePicker>
                                </FormItem>
                            </i-col>
                            <i-col span="21">
                                <FormItem :label="$t('lang_organization.orgframe.invreason')"
                                          prop="invreason">
                                    <Input v-model="formValidate.invreason"
                                           disabled
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_organization.orgframe.invreasonInp')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21">
                                <FormItem :label="$t('lang_organization.orgframe.comment')"
                                          prop="comment">
                                    <Input v-model="formValidate.comment"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_organization.orgframe.commentInp')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10">
                                <FormItem label="状态"
                                          prop="postWorkyears">
                                    <Select v-model="formValidate.unitState"
                                            disabled>
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in selectPubstatus"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="21">
                                <FormItem label="修改历史"
                                          prop="comment" class="last-item">
                                    <Input v-model="formValidate.unitChghistory"
                                           disabled
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                                </FormItem>
                            </i-col>
                        </Form>
                        <Row class="row">
                            <i-col span="21" class="btn" style="padding-right:7px">
                                <Button @click="handleReset"
                                        class="btn1">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        :loading="isSpin"
                                        @click="handleSubmit"
                                        style="margin-left:8px">{{$t('button.sav')}}</Button>
                            </i-col>
                        </Row>
                    </div>

             <!-- <Row class="row">
                <i-col span="21" style="text-align:right;padding-right: 25px;">
                    <Button @click="handleReset"
                            class="btn1">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            :loading="isSpin"
                            @click="handleSubmit"
                            class="btn"
                            style="margin-left:8px">{{$t('button.sav')}}</Button>
                </i-col>
            </Row> -->
        </div>
        <transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        ref="searchCity"></searchCity>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick2"
                            :searchCloumns="searchCloumns2"
                            :params="params2"
                            @closeUp="close2"
                            @changeinput="changeinput2"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>
        <transition name="fade">
            <searchOrgcostcenter v-show="openPick3"
                                 :searchCloumns="searchCloumns3"
                                 :params="params3"
                                 @closeUp="close3"
                                 @changeinput="changeinput3"
                                 ref="searchOrgcostcenter"></searchOrgcostcenter>
        </transition>
        <!-- 员工 -->
        <transition name="fade">
            <staffPage v-show="openPick4"
                       :logType="logType"
                       ref="staffPage"
                       @hideMsg="close4"
                       @changeinput="changeinput4"></staffPage>
        </transition>
        <!-- 多选员工 -->
        <transition name="fade">
            <staffPageMult v-show="openPick5"
                           :logType="logType"
                           ref="staffPage1"
                           @hideMsg1="close5"
                           @changeinput="changeinput5"></staffPageMult>
        </transition>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
// import MapSelect from './MapSelect.vue';
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile, uploadimage } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchCity from '../../../components/searchTable/searchCity'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
import staffPage from './staffPage'
import staffPageMult from './components/staffPageMult'
import validChenck from '../../../lib/pub_valid'

export default {
    data () {
        const syssmsNocheck = (rule, value, callbackFun) => {
            if (validChenck.val_number101(value)) {
                return callbackFun()
            }
            return callbackFun(new Error(rule.message))
        }
        return {
            showModal: false,
            selectType: '',
            modiaContent: 'emp-base-std-name',
            dataParame: {},
            isSpin: false,
            type: '',
            distype: false,
            forbidden: null,
            popup: '',
            value: '',
            selectUnitType: [],
            selectUnitlevel: [],
            selectPubstatus: [],
            formValidate: {
                _mt:  this.$global.mt+'OrgUnits.addOrModifyOrgUnits',
                unitCode: '',
                unitOrder: '',
                unitType: '',
                unitOaccount: '',
                unitOaPwd: '',
                unitPid: '',
                unitState: '0105draft',
                unitChghistory: '',
                validdate: new Date(),
                invdate: '',
                invreason: '',
                unitCharger: '',
                comment: '',
                funId: '1',
                logType: '',
                unitCn: '',
                unitEn: '',
                unitGroupSeqchargerDis: '',
                unitGroupSeqcharger: '',
                unitDeptadmin: '',
                unitChargeleader: '',
                unitDeptadminDis: '',
                unitChargeleaderDis: '',
            },
            openPick: false,
            openPick2: false,
            openPick3: false,
            openPick4: false,
            openPick5: false,
            unitPname: '',
            unitChargerDis: '',
            params: {
                _mt:  this.$global.mt+'BaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
                data: '{"cityIsvalid" : "1"}',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            params2: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                unitPid: 0,
                unitType: '',
            },
            searchCloumns2: [
                {
                    title: this.$t('lang_organization.orgframe.unitCode'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgframe.compCOrEName'),
                    key: 'unitsName',
                },
                {
                    title: this.$t('lang_organization.orgframe.unitTypeName'),
                    key: 'unitTypeName',
                },
            ],
            params3: {
                _mt:  this.$global.mt+'OrgCostcenter.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '成本中心查询',
                data: '{}',
            },
            searchCloumns3: [
                {
                    title: this.$t('lang_organization.orgcostcenter.costCode'),
                    key: 'costCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.cname'),
                    key: 'cname',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.ename'),
                    key: 'ename',
                },
            ],
            ruleValidate: {
                unitCode: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitCodeInp'), trigger: 'blur' },
                ],
                unitOaccount: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                unitOrder: [
                    { required: true, message: '排序号不能为空', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
                unitGroupSeqchargerDis: [
                    { required: true, message: '集团部门条线负责人不能为空', trigger: 'blur' },
                ],
                // unitOaPwd: [
                //   { required: true, message: '不能为空', trigger: 'blur' },
                // ],
                //          unitChargeleader: [
                //            { required: true, message: '请选择分管领导', trigger: 'blur' },
                //          ],
                //          unitDeptadmin: [
                //            { required: true, message: '请选择部门管理员', trigger: 'blur' },
                //          ],
                //          unitCharger: [
                //            { required: true, message: '请选择负责人', trigger: 'blur' },
                //          ],
                unitCn: [
                    { required: true, message: this.$t('lang_organization.orgcostcenter.cnameDis'), trigger: 'blur' },
                ],
                unitEn: [
                    { required: true, message: this.$t('lang_organization.orgcostcenter.enameDis'), trigger: 'blur' },
                ],
                unitType: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitTypeNameInp'), trigger: 'blur' },
                ],
                //          unitPid: [
                //            { required: true, message: this.$t('lang_organization.orgframe.unitPnameInp'), trigger: 'blur' },
                //          ],
                validdate: [
                    { required: true, type: 'date', message: this.$t('lang_organization.orgframe.validdateInp'), trigger: 'change' },
                ],
                unitDfworkcity: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitDfworkcity'), trigger: 'blur' },
                ],
            },
            position: {},
            file: '',
            filekey: '',
            spinShow: false
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
        disabledVaild: Boolean,
    },
    components: {
        searchCity,
        searchOrgframe,
        searchOrgcostcenter,
        staffPage,
        staffPageMult,
        // MapSelect,
    },
    updated () {

    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'OrgUnits.getById',
                id: id,
                funId: '1',
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res.data.content[0])
                    t.formValidate.unitCode = res.data.content[0].unitCode
                    t.formValidate.unitOaccount = res.data.content[0].unitOaccount
                    t.formValidate.unitOaPwd = res.data.content[0].unitOaPwd
                    t.formValidate.unitCn = res.data.content[0].compFnameCnDis
                    t.formValidate.unitEn = res.data.content[0].compFnameEnDis
                    t.formValidate.unitXlocation = res.data.content[0].unitXlocation
                    t.formValidate.unitYlocation = res.data.content[0].unitYlocation
                    t.formValidate.unitChghistory = res.data.content[0].unitChghistory
                    t.formValidate.validdate = res.data.content[0].validdate
                    t.formValidate.invdate = res.data.content[0].invdate
                    t.formValidate.invreason = res.data.content[0].invreason
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.unitPid = res.data.content[0].unitPid
                    t.formValidate.unitType = res.data.content[0].unitType
                    t.formValidate.unitState = res.data.content[0].unitState
                    t.unitPname = res.data.content[0].unitPname
                    t.unitChargerDis = res.data.content[0].unitChargerDis
                    t.formValidate.unitCharger = res.data.content[0].unitCharger
                    t.type = res.data.content[0].unitType
                    t.formValidate.unitChargeleader = res.data.content[0].unitChargeleader
                    t.formValidate.unitChargeleaderDis = res.data.content[0].unitChargeleaderDis
                    t.formValidate.unitDeptadmin = res.data.content[0].unitDeptadmin
                    t.formValidate.unitDeptadminDis = res.data.content[0].unitDeptadminDis
                    t.formValidate.unitGroupSeqchargerDis = res.data.content[0].unitGroupSeqchargerDis
                    t.formValidate.unitGroupSeqcharger = res.data.content[0].unitGroupSeqcharger
                    if (res.data.content[0].unitOrder) {
                        t.formValidate.unitOrder = res.data.content[0].unitOrder
                    } else {
                        t.formValidate.unitOrder = 0
                    }
                    if (id === res.data.content[0].companyId) {
                        t.forbidden = 'readonly'
                        t.distype = true
                    } else {
                        t.forbidden = null
                        t.distype = false
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false
            })
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        resetFields () {
            this.$refs.formValidate.resetFields()
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'orgunittype,unitlevel,pubstatus2',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectUnitType = res.data.content[0].value[0].paramList
                    t.selectUnitlevel = res.data.content[0].value[1].paramList
                    t.selectPubstatus = res.data.content[0].value[2].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        render1 () {
            this.$Modal.confirm({
                ref: 'imgEdit',
                onOk: () => {
                    const formData = new FormData(document.getElementById('fileinput1'))
                    uploadimage(formData).then((res) => {
                        alert(res)
                    }).catch((res) => {
                        alert(res)
                    })
                },
                attrs: {
                    id: 'foo',
                },
                render: (h) => {
                    return h(imgEdit, {
                        props: {
                            value: this.value,
                        },
                        on: {
                            change: (val) => {
                                this.value = val
                            },
                        },

                    })
                },

            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.type === '70dept' && data.unitType === '01company') {
                t.$Modal.success({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_organization.orgframe.reminderErr'),
                })
                return
            }
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            if (data.validdate !== undefined) {
                data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
            }
            if (data.invdate !== undefined) {
                data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (typeof data.unitOrder === 'number') {
                data.unitOrder = data.unitOrder.toString()
            }
            delete data.unitDeptadminDis
            delete data.unitChargeleaderDis
            console.log(data)
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()
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
                        t.isSpin = false
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        // tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 50 // 有滚动的滚动到未填项
                    })
                }
            })
        },
        close () {
            const t = this
            t.openPick = false
        },
        close2 () {
            const t = this
            t.openPick2 = false
        },
        close3 () {
            const t = this
            t.openPick3 = false
        },
        close4 () {
            const t = this
            t.openPick4 = false
        },
        close5 () {
            const t = this
            t.openPick5 = false
        },
        changeinput (name, id) {
            const t = this
            if (t.popup === '0') {
                t.unitDfhirecityName = name
                t.formValidate.unitDfhirecity = id
            } else if (t.popup === '1') {
                t.unitDfworkcityName = name
                t.formValidate.unitDfworkcity = id
            }
        },
        changeinput2 (name, id, centerName, center, type, unitOrder) {
            const t = this
            // t.formValidate.unitType = type
            t.unitPname = name
            t.formValidate.unitPid = id
            t.formValidate.unitOrder = ''
            t.type = type
        },
        changeinput3 (name, id) {
            const t = this
            t.unitDfcostcenterName = name
            t.formValidate.unitDfcostcenter = id
        },
        changeinput4 (name, id) {
            const t = this
            t.unitChargerDis = name
            t.formValidate.unitCharger = id
        },
        changeinput5 (empCname, id) {
            const t = this
            t.formValidate.unitGroupSeqcharger = empCname.join(',')
            t.formValidate.unitGroupSeqchargerDis = id.join(',')
        },
        pickData () {
            const t = this
            t.popup = '0'
            t.$refs.searchCity.getData(this.params, '02city\',\'03county')
            t.openPick = true
        },
        pickData1 () {
            const t = this
            t.popup = '1'
            t.$refs.searchCity.getData(this.params)
            t.openPick = true
        },
        pickData2 () {
            if (this.forbidden === null) {
                const t = this
                // t.params2.unitType = this.formValidate.unitType
                console.log(t.params2)
                t.$refs.searchOrgframe.getData(this.params2)
                t.openPick2 = true
            }
        },
        pickData4 () {
            const t = this
            t.openPick4 = true
            t.$refs.staffPage.getData()
        },
        pickData5 () {
            const t = this
            t.openPick5 = true
            t.$refs.staffPage1.getData()
        },
        clearPid () {
            const t = this
            t.unitPname = ''
            t.formValidate.unitPid = ''
        },
        clearMgt () {
            const t = this
            t.unitChargerDis = ''
            t.formValidate.unitCharger = ''
        },
        handleReset () {
            this.$emit('closeUp')
            this.file = ''
        },
        selectCompany (paramCode) {
            const t = this
            if (t.formValidate.unitType !== '') {
                if (paramCode === t.formValidate.unitType) {
                    t.unitPname = ''
                    t.formValidate.unitPid = ''
                }
            }
        },
        /*
           弹出选择
         */
        closeModal () {
            this.showModal = false
        },
        chooseLeader (type) {
            const t = this
            t.selectType = type
            t.showModal = true
        },
        changeinput1 (row, type) {
            const t = this
            if (type === 'emp-base-std-name') {
                if (t.selectType === 'unitChargeleaderDis') {
                    t.formValidate.unitChargeleader = row.id
                    t.formValidate.unitChargeleaderDis = row.empCname
                } else if (type === 'unitDeptadminDis') {
                    t.formValidate.unitDeptadmin = row.id
                    t.formValidate.unitDeptadminDis = row.empCname
                } else {
                    t.formValidate.unitGroupSeqcharger = row.id
                    t.formValidate.unitGroupSeqchargerDis = row.empCname
                }
            }
            console.log(t.formValidate)
        },
        clearLeader (type) {
            const t = this
            if (type === 'unitChargeleaderDis') {
                t.formValidate.unitChargeleader = ''
                t.formValidate.unitChargeleaderDis = ''
            } else if (type === 'unitDeptadminDis') {
                t.formValidate.unitDeptadmin = ''
                t.formValidate.unitDeptadminDis = ''
            } else {
                t.formValidate.unitGroupSeqchargerDis = ''
                t.formValidate.unitGroupSeqcharger = ''
            }
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/mainChildUpdate.scss";
// .last-item{
//     margin-bottom: 0 !important;
// }
// .row{
//     margin: 20px 0;
// }
</style>
