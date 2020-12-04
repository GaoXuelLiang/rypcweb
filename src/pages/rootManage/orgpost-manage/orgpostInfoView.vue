<template>
    <!-- <div class="cover"> -->
    <div>
        <!-- <div class="box"> -->
        <!-- <div class="option-main"> -->
        <!-- <Row > -->
        <Form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="135">
            <!--<i-col span="11">-->
            <!--<FormItem label="公司" prop="postUnit">-->
            <!--<span @dblclick="clearPid1">-->
            <!--<Input v-model="formValidate.postUnitcompDis"  icon="ios-search" :readonly="true" placeholder="公司"  @on-click="pickData1" />-->
            <!--</span>-->
            <!--</FormItem>-->
            <!--</i-col>-->
            <row>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_organization.orgpost.postCode')"
                              prop="postCode">
                        <Input v-model="formValidate.postCode"
                               :placeholder="$t('lang_organization.orgpost.postCodeInp')"></Input>
                    </FormItem>
                </i-col>
            </row>
            <!-- <i-col span="10" offset="1">
                <FormItem label="所属公司"
                          prop="postUnitcompDis">
                    <span @dblclick="clearPid1">
                        <Input v-model="formValidate.postUnitcompDis"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="所属公司"
                               @on-click="pickDataJob('org-company-std')"
                               @dblclick="clearJobid('4')" />
                    </span>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem label="所属部门"
                          prop="postUnit">
                    <span @dblclick="clearPid">
                        <Input v-model="postUnitName"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="所属部门"
                               @on-click="pickData" />
                    </span>
                </FormItem>
            </i-col> -->
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgcostcenter.cname')"
                          prop="postCn">
                    <Input v-model="formValidate.postCn"
                           :placeholder="$t('lang_organization.orgcostcenter.cnameDis')"></Input>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgcostcenter.ename')"
                          prop="postEn">
                    <Input v-model="formValidate.postEn"
                           :placeholder="$t('lang_organization.orgcostcenter.enameDis')"></Input>
                </FormItem>
            </i-col>
            <!--<i-col span="11">-->
            <!--<FormItem :label="$t('lang_organization.orgpost.postFnameEnDis')" prop="postFnameEnDis">-->
            <!--<Input v-model="formValidate.postFnameEnDis" :placeholder="$t('lang_organization.orgpost.postFnameEnDisInp')"></Input>-->
            <!--</FormItem>-->
            <!--</i-col>-->
            <!--<i-col span="11" offset="1">-->
            <!--<FormItem :label="$t('lang_organization.orgpost.postSnameEnDis')" prop="postSnameEnDis">-->
            <!--<Input v-model="formValidate.postSnameEnDis" :placeholder="$t('lang_organization.orgpost.postSnameEnDisInp')"></Input>-->
            <!--</FormItem>-->
            <!--</i-col>-->
            <i-col span="10" offset="1">
                <FormItem label="排序号"
                          prop="postOrder">
                    <Input v-model="formValidate.postOrder"
                           placeholder="请输入正整数"></Input>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem label="岗位类型"
                          prop="postStyle">
                    <Select v-model="formValidate.postStyle"
                            placeholder="请选择岗位类型">
                        <Option :value="item.paramCode"
                                v-for="(item,index) in benchposttypes"
                                :key="index">{{item.paramInfoCn}}</Option>
                    </Select>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.postSup')"
                          prop="postSuperior">
                    <span>
                        <Input v-model="postSuperiorDis"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_organization.orgpost.postSup')"
                               @on-click="pickDataJob('base-choose-job')"
                               @dblclick="clearJobid('2')" />
                    </span>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.workPlace')"
                          prop="postLocation">
                    <span>
                        <!-- -->
                        <Input v-model="postLocationDis"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="请选择工作地点"
                               @on-click="pickDataCity"
                               @dblclick="clearCityid" />
                    </span>
                </FormItem>
            </i-col>
            <!-- 岗位序列 -->
            <i-col span="10" offset="1">
                <FormItem label="岗位条线"
                          prop="postSeq">
                    <span>
                        <Input v-model="postSeqDis"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="请选择岗位条线"
                               @on-click="pickDataJob('org-Postseq-std')"
                               @dblclick="clearJobid('1')" />
                    </span>
                </FormItem>
            </i-col>
            <!-- <i-col span="11" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.postDfpslevel')" prop="postDfpslevel">
              <Select v-model="formValidate.postDfpslevel"  :placeholder="$t('lang_organization.orgpost.postDfpslevelInp')">
                <Option :value="item.paramCode" v-for="(item,index) in selectDfpslevel" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>-->
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.postDfpslevel')"
                          prop="postDfpslevel">
                    <span>
                        <Input v-model="formValidate.postDfpslevel"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_organization.orgpost.postDfpslevelInp')"
                               @on-click="pickDataJob('org-postlevel-std')"
                               @dblclick="clearJobid('3')" />
                    </span>
                </FormItem>
            </i-col>

            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.validdate')"
                          prop="validdate">
                    <DatePicker type="date"
                                :placeholder="$t('lang_organization.orgpost.validdateInp')"
                                :readonly="logType === $t('button.y.upd') && formValidate.postStatus !== '0105draft' && formValidate.postStatus !== '0203tovalid'"
                                :disabled="logType === $t('button.y.upd') && formValidate.postStatus !== '0105draft' && formValidate.postStatus !== '0203tovalid' "
                                :editable="false"
                                v-model="formValidate.validdate"
                                style="width: 100%"></DatePicker>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.invdate')"
                          prop="invdate">
                    <DatePicker type="date"
                                disabled
                                readonly
                                :placeholder="$t('lang_organization.orgpost.invdateInp')"
                                :editable="false"
                                v-model="formValidate.invdate"
                                style="width: 100%"></DatePicker>
                </FormItem>
            </i-col>
            <i-col span="21" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.invreason')"
                          prop="invreason">
                    <Input v-model="formValidate.invreason"
                           type="textarea"
                           disabled
                           :autosize="{minRows: 2,maxRows: 5}"
                           :placeholder="$t('lang_organization.orgpost.invreasonInp')"></Input>
                </FormItem>
            </i-col>
            <i-col span="21" offset="1">
                <FormItem :label="$t('lang_organization.orgpost.comment')"
                          prop="comment">
                    <Input v-model="formValidate.comment"
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           :placeholder="$t('lang_organization.orgpost.commentInp')"></Input>
                </FormItem>
            </i-col>
            <i-col span="10" offset="1">
                <FormItem label="状态"
                          prop="postWorkyears">
                    <Select v-model="formValidate.postStatus"
                            disabled
                            :placeholder="$t('lang_organization.orgpost.expreReq')">
                        <Option :value="item.paramCode"
                                v-for="(item,index) in selectPubstatus"
                                :key="index">{{item.paramInfoCn}}</Option>
                    </Select>
                </FormItem>
            </i-col>
            <i-col span="21" offset="1">
                <FormItem label="修改历史"
                          prop="comment" class="last-item">
                    <Input v-model="formValidate.postUprecord"
                           disabled
                           type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </i-col>
        </Form>
        <row class="row">
            <i-col span="21" offset="1" style="padding-right: 7px;">
                <Row type="flex"
                    justify="end">
                    <Button @click="closeDialog"
                            class="btn1">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            :loading="isSpin"
                            @click="handleSubmit"
                            style="margin-left:8px;">{{$t('button.sav')}}</Button>
                </Row>
            </i-col>
        </row>
        <!-- </Row> -->

        <!-- </div> -->
        <!-- </div> -->
        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="close"
                            @changeinput="changeinput"
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
        <transition name="fade">
            <searchCity v-show="openPickCity"
                        ref="searchCity"
                        :searchCloumns="searchCloumnsCity"
                        :params="paramsCity"
                        @closeUp="closeCity"
                        @changeinput="changeinputCity">
            </searchCity>
        </transition>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent='modiaContent'
                         @changeinput="changeinput1"
                         dataType="row"
                         :dataParame="dataParame"
                         urlType='loginNew'>
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import validChenck from '@/lib/pub_valid'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
import searchCity from '../../../components/searchTable/searchCity'
import searchJobHigher from '../../../components/searchTable/searchJobHigher'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'

export default {
    data () {
        const syssmsNocheck = (rule, value, callbackFun) => {
            if (validChenck.val_number101(value)) {
                return callbackFun()
            }
            return callbackFun(new Error(rule.message))
        }
        return {
            isSpin: false,
            value: '',
            newId: '',
            showModal: false,
            validInvShow: true,
            dataParame: {},
            modiaContent: '',
            selectDfpslevel: [],
            selectDfsallevel: [],
            selectDftrvlevel: [],
            selectPostseq: [],
            selectDegreeReq: [],
            selectExpreReq: [],
            selectGenderReq: [],
            selectWorkHour: [],
            selectPubstatus: [],
            benchposttypes: [],
            newPostCode: '',
            formValidate: {
                _mt:  this.$global.mt+'OrgPost.addOrUpd',
                postCode: '',
                postStatus: '0105draft',
                postDfsallevel: '',
                postDftrvlevel: '',
                postUnit: '',
                postDfcostcenter: '',
                postSnameEnDis: '',
                postFnameEnDis: '',
                postCn: '',
                postEn: '',
                postSeq: '',
                postDfpslevel: '',
                validdate: '',
                invdate: '',
                invreason: '',
                comment: '',
                postUprecord: '',
                funId: '1',
                logType: '',
                postPlanauth: '', // 岗位计划编制
                postCurauth: '', // 岗位现有编制
                postJobaim: '', // 岗位工作目标
                postEdu: '', // 学历要求
                postSex: '', // 性别要求
                postSage: '', // 年龄要求
                postEage: '',
                postWorkyears: '', // 工作经验要求
                postMajor: '', // 专业要求
                postManhour: '', // 工时要求
                postLocation: '',
                postSuperior: '',
                postDuty: '',  // 职务
                postStyle: '',  // 岗位类型
                postStyleDis: '',  // 岗位类型
                postOrder: '',  // 排序号
                postUnitcomp: '',
                postUnitcompDis: '',
            },
            postSup: '',
            postLocationDis: '', // 工作地点
            postSuperiorDis: '', // 直接上级岗位
            postSeqDis: '', // 岗位序列
            //        postDfpslevelDis: '', // 默认职位级别
            postDutyDis: '', // 职务
            openPick: false,
            openPick3: false,
            openPickCity: false,
            openPickJob: false,
            postUnitName: '',
            postDfcostcenterName: '',
            queryLevel: '',
            params: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                // unitPid: 0,
                //          unitType: '70dept'
            },
            paramsCity: {
                _mt:  this.$global.mt+'BaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: '10',
                page: '1',
                funId: '1',
                logType: this.$t('button.ser'),
                data: '{"cityType":"02city", "cityIsvalid" : "1"}',
            },
            paramsJob: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                sort: 'id',
                order: 'desc',
                rows: '10',
                page: '1',
                funId: '1',
                logType: this.$t('button.ser'),
            },
            searchCloumns: [
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
            searchCloumnsCity: [
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
            searchCloumnsJob: [
                {
                    title: '岗位编号',
                    key: 'jobName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: '直接上级岗位',
                    key: 'jobName',
                    sortable: 'custom',
                    width: 380,
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
                postCode: [
                    { required: true, message: this.$t('lang_organization.orgpost.postCodeInp'), trigger: 'blur' },
                ],
                postCn: [
                    { required: true, message: this.$t('lang_organization.orgcostcenter.cnameDis'), trigger: 'blur' },
                ],
                postEn: [
                    { required: true, message: this.$t('lang_organization.orgcostcenter.enameDis'), trigger: 'blur' },
                ],
                postFnameEnDis: [
                    { required: true, message: this.$t('lang_organization.orgpost.postFnameEnDisInp'), trigger: 'blur' },
                ],
                postSnameEnDis: [
                    { required: true, message: this.$t('lang_organization.orgpost.postSnameEnDisInp'), trigger: 'blur' },
                ],
                //          postSeq: [
                //            { required: true, message: this.$t('lang_organization.orgpost.p_postSeq'), trigger: 'change' },
                //          ],
                postUnitName: [
                    { required: true, message: this.$t('lang_organization.orgpost.postUnitNameInp'), trigger: 'blur' },
                ],
                postUnit: [
                    { required: true, message: this.$t('lang_organization.orgpost.postUnitNameInp'), trigger: 'blur' },
                ],
                postUnitcompDis: [
                    { required: true, message: this.$t('选择所属公司'), trigger: 'blur' },
                ],
                postStyle: [
                    { required: true, message: '请选择岗位类型', trigger: 'change' },
                ],
                validdate: [
                    { required: true, type: 'date', message: this.$t('lang_organization.orgpost.validdateInp'), trigger: 'change' },
                ],
                //          postPlanauth: [
                //            { required: true, message: this.$t('lang_organization.orgpost.p_postpla'), trigger: 'blur' },
                //            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                //          ],
                //          postDuty: [
                //            { required: true, message: '请选择职务', trigger: 'change' },
                //          ],
                //          postLocation: [
                //            { required: true, message: '请选择工作地点', trigger: 'change' },
                //          ],
                //          postSuperior: [
                //            { required: true, message: '请选择直接上级岗位', trigger: 'change' },
                //          ],
                postDfsallevel: [
                    { required: true, message: this.$t('lang_organization.orgpost.postDfsallevelInp'), trigger: 'change' },
                ],
                //          postDftrvlevel: [
                //            { required: true, message: this.$t('lang_organization.orgpost.postDftrvlevelInp'), trigger: 'change' },
                //          ],
                //          postOrder: [
                //            { required: true, message: '排序号不能为空', trigger: 'blur' },
                //            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                //          ],
                //          postStyle: [
                //            { required: true, message: '请选择岗位类型', trigger: 'change' },
                //          ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchOrgframe,
        searchOrgcostcenter,
        searchCity,
        searchJobHigher,
    },
    updated () {

    },
    mounted () {
        this.getSelect()
        this.getSelectValue()
    },
    methods: {
        getData (id) {
            const t = this
            //        t.newId = id
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'OrgPost.getById',
                id: id,
                funId: '1',
                logType: 'Id查询',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.postCode = res.data.content[0].postCode
                    t.newPostCode = res.data.content[0].postCode
                    t.formValidate.postCn = res.data.content[0].postCn
                    t.formValidate.postEn = res.data.content[0].postEn
                    t.formValidate.postFnameEnDis = res.data.content[0].postFnameEnDis
                    t.formValidate.postSnameEnDis = res.data.content[0].postSnameEnDis
                    t.formValidate.postDfpslevel = res.data.content[0].postDfpslevel
                    t.formValidate.postDfsallevel = res.data.content[0].postDfsallevel
                    t.formValidate.postDftrvlevel = res.data.content[0].postDftrvlevel
                    t.formValidate.postPlanauth = res.data.content[0].postPlanauth
                    t.formValidate.invreason = res.data.content[0].invreason
                    t.formValidate.postJobaim = res.data.content[0].postJobaim
                    t.formValidate.postEdu = res.data.content[0].postEdu
                    t.formValidate.postSex = res.data.content[0].postSex
                    t.formValidate.postSage = res.data.content[0].postSage
                    t.formValidate.postEage = res.data.content[0].postEage
                    t.formValidate.postWorkyears = res.data.content[0].postWorkyears
                    t.formValidate.postMajor = res.data.content[0].postMajor
                    t.formValidate.postManhour = res.data.content[0].postManhour
                    t.formValidate.validdate = res.data.content[0].validdate
                    t.formValidate.invreason = res.data.content[0].invreason
                    t.formValidate.invdate = res.data.content[0].invdate
                    t.formValidate.invreason = res.data.content[0].invreason
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.postSeq = res.data.content[0].postSeq
                    t.formValidate.postStatus = res.data.content[0].postStatus
                    t.formValidate.postUnit = res.data.content[0].postUnit
                    t.formValidate.postSuperior = res.data.content[0].postSuperior
                    t.formValidate.postLocation = res.data.content[0].postLocation
                    t.formValidate.postUprecord = res.data.content[0].postUprecord
                    t.formValidate.postOrder = res.data.content[0].postOrder
                    t.formValidate.postStyle = res.data.content[0].postStyle
                    t.formValidate.postStyleDis = res.data.content[0].postStyleDis
                    t.postUnitName = res.data.content[0].postUnitName
                    t.postLocationDis = res.data.content[0].postLocationDis
                    t.unitDfhirecityName = res.data.content[0].unitDfhirecityName
                    t.unitDfworkcityName = res.data.content[0].unitDfworkcityName
                    t.postDfcostcenterName = res.data.content[0].postDfcostcenterName
                    t.postSuperiorDis = res.data.content[0].postSuperiorDis
                    t.postDutyDis = res.data.content[0].postDutyDis
                    t.formValidate.postDuty = res.data.content[0].postDuty
                    t.postSeqDis = res.data.content[0].postSeqDis
                    t.formValidate.postUnitcompDis = res.data.content[0].postUnitcompDis
                    t.formValidate.postUnitcomp = res.data.content[0].postUnitcomp
                    if (t.logType === this.$t('status.copy')) {
                        this.$store.commit('setMasterPublicListHide')
                    } else {
                        this.$store.commit('setMasterPublicListShow')
                    }
                    this.$store.commit('setMasterPublicId', res.data.content[0].id)
                    t.queryLevel = res.data.content[0].postDfpslevel
                    sessionStorage.setItem('queryLevel', JSON.stringify(t.queryLevel))
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.$emit('changeSpin')
            })
        },
        getJob (id) {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'ViewEmpMaster.getByPostId',
                postId: id,
                funId: '1',
                logType: '岗位现有编制',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.postCurauth = res.data.content[0].value
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'postlevel,salarylevel,travellevel,postseq,education,recruitgender,workyReq,woktReq,pubstatus2,benchposttype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectDfpslevel = res.data.content[0].value[0].paramList
                    t.selectDfsallevel = res.data.content[0].value[1].paramList
                    t.selectDftrvlevel = res.data.content[0].value[2].paramList
                    t.selectPostseq = res.data.content[0].value[3].paramList
                    t.selectDegreeReq = res.data.content[0].value[4].paramList
                    t.selectGenderReq = res.data.content[0].value[5].paramList
                    t.selectExpreReq = res.data.content[0].value[6].paramList
                    t.selectWorkHour = res.data.content[0].value[7].paramList
                    t.selectPubstatus = res.data.content[0].value[8].paramList
                    t.benchposttypes = res.data.content[0].value[9].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getSelectValue () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'OrgPostlevelmapping.getSelectValue',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    console.log(res)
                    // t.selectDfpslevel = res.data.content[0].value[0].paramList
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
            if (t.logType === this.$t('button.y.upd') || t.logType === this.$t('status.copy')) {
                data.id = t.newId
            }
            if (t.logType === this.$t('status.copy')) {
                if (t.formValidate.postCode === t.newPostCode) {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '岗位复制编码不能与原编码相同',
                    })
                    return
                }
                data.postStatus = '0105draft'
            }
            if (data.validdate !== undefined) {
                data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
            }
            if (data.invdate !== undefined) {
                data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
            }
            if (t.logType === this.$t('status.copy')) {
                data._mt =  this.$global.mt+'OrgPost.copyData'
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                //                  t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                                this.$store.commit('setMasterPublicListShow')
                            } else if (t.logType === this.$t('status.copy')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: '复制成功',
                                })
                                //                  t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                                this.$store.commit('setMasterPublicListShow')
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                            this.$store.commit('setMasterPublicId', res.data.content[0].id)
                            //                t.$emit('closeUp')
                        }
                    }).catch(() => {
                        t.isSpin = false
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
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
        closeCity () {
            const t = this
            t.openPickCity = false
        },
        closeJob () {
            const t = this
            t.openPickJob = false
        },
        changeinput (name, id, costname, costid) {
            const t = this
            t.postUnitName = name
            t.formValidate.postUnit = id
            t.postDfcostcenterName = costname
            t.formValidate.postDfcostcenter = costid
        },
        changeinput3 (name, id) {
            const t = this
            t.postDfcostcenterName = name
            t.formValidate.postDfcostcenter = id
        },
        changeinputCity (name, id) {
            const t = this
            t.postLocationDis = name
            t.formValidate.postLocation = id
        },
        pickDataCity () {
            const t = this
            t.$refs.searchCity.getData(this.paramsCity)
            t.openPickCity = true
        },
        pickDataJob (type) {
            const t = this
            t.showModal = true
            t.modiaContent = type
            if (type === 'org-duty') {
                /*  需要前后关联  */
                this.dataParame = {
                    dutyStatus: '02valid',
                }
            } else {
                this.dataParame = {}
            }
        },
        pickData () {
            const t = this
            if (t.formValidate.postUnitcompDis === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择公司',
                })
                return
            }
            t.$refs.searchOrgframe.getData(this.params)
            t.openPick = true
        },
        pickData1 () {
            const t = this
            t.$refs.searchOrgframe.getData(this.params)
            t.openPick = true
        },
        pickData3 () {
            const t = this
            return
            t.$refs.searchOrgcostcenter.getData(this.params3)
            t.openPick3 = true
        },
        clearPid () {
            const t = this
            t.postUnitName = ''
            t.formValidate.postUnit = ''
        },
        clearPid1 () {
            const t = this
            t.formValidate.postUnitcomp = ''
            t.formValidate.postUnitcompDis = ''
        },
        clearCityid () {
            const t = this
            t.postLocationDis = ''
            t.formValidate.postLocation = ''
        },
        clearJobid (type) {
            const t = this
            if (type === 1) {
                t.postSup = ''
                t.formValidate.postSuperior = ''
            } else if (type === 2) {
                t.postSeqDis = ''
                t.formValidate.postSeq = ''
            } else if (type === 4) {
                t.formValidate.postUnitcomp = ''
                t.formValidate.postUnitcompDis = ''
            } else {
                t.formValidate.postDfpslevel = ''
            }
        },
        clearCostcenter (name) {
            const t = this
            if (name == 'postDuty') {
                t.postDutyDis = ''
                t.formValidate.postDuty = ''
            } else {
                return
                t.postDfcostcenterName = ''
                t.formValidate.postDfcostcenter = ''
            }

        },
        closeDialog(){
            this.$emit('closeDialog')
        },
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.postUnitName = ''
            this.postDfcostcenterName = ''
            this.newPostCode = ''
            this.postSeqDis = ''
            this.postDutyDis = ''
            this.postLocationDis = ''
            this.postSuperiorDis = ''
            this.$emit('closeView')
        },
        /*
         弹出选择
       */
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row, type) {
            console.log(type)
            if (type === 'base-choose-job') {
                this.postSuperiorDis = row.postFnameCnDis
                this.formValidate.postSuperior = row.id
            } else if (type === 'org-duty') {
                this.postDutyDis = row.dutyName
                this.formValidate.postDuty = row.id
                this.formValidate.postDfpslevel = row.dutyLevel
            } else if (type === 'org-Postseq-std') {
                this.postSeqDis = row.seqName
                this.formValidate.postSeq = row.id
            } else if (type === 'org-company-std') {
                console.log(row)
                this.formValidate.postUnitcompDis = row.compFnameCnDis
                this.formValidate.postUnitcomp = row.id
            } else {
                //          this.postDfpslevelDis = row.positionLevel
                this.formValidate.postDfpslevel = row.positionLevel
            }
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.ivu-form {
    height: 400px;
    overflow: auto;
}
.age .ivu-input-wrapper {
    width: 45%;
}
.ivu-form-item .ivu-form-item-content {
    margin-left: 0 !important;
}
.last-item{
    margin-bottom: 0 !important;
}
.row{
    margin: 20px 0;
}
</style>
