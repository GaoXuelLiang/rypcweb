<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitCode')"
                                      prop="unitCode">
                                <Input v-model="formValidate.unitCode"
                                       :readonly="forbidden"
                                       :placeholder="$t('lang_organization.orgframe.unitCodeInp')"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitTypeName')"
                                      prop="unitType">
                                <Select v-model="formValidate.unitType"
                                        :disabled="logType === '修改'"
                                        disabled
                                        :placeholder="$t('lang_organization.orgframe.unitTypeNameInp')">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectUnitType"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.compFnameCnDis')"
                                      prop="compFnameCnDis">
                                <Input v-model="formValidate.compFnameCnDis"
                                       :placeholder="$t('lang_organization.orgframe.compFnameCnDisInp')"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.compFnameEnDis')"
                                      prop="compFnameEnDis">
                                <Input v-model="formValidate.compFnameEnDis"
                                       :placeholder="$t('lang_organization.orgframe.compFnameEnDisInp')"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.compSnameCnDis')"
                                      prop="compSnameCnDis">
                                <Input v-model="formValidate.compSnameCnDis"
                                       :placeholder="$t('lang_organization.orgframe.compSnameCnDisInp')"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.compSnameEnDis')"
                                      prop="compSnameEnDis">
                                <Input v-model="formValidate.compSnameEnDis"
                                       :placeholder="$t('lang_organization.orgframe.compSnameEnDisInp')"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitPname')"
                                      prop="unitPid">
                                <span @dblclick="clearPid">
                                    <Input v-model="formValidate.unitPname"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_organization.orgframe.unitPnameInp')"
                                           @on-click="pickData2" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitLevel')"
                                      prop="unitLevel">
                                <Select v-model="formValidate.unitLevel"
                                        :placeholder="$t('lang_organization.orgframe.p_unitLevel')">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in selectUnitlevel"
                                            :key="index">{{item.paramInfoCn}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <!--负责人-->
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitCharger')"
                                      prop="unitCharger">
                                <span @dblclick="clearMgt">
                                    <Input v-model="formValidate.unitChargerDis"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_organization.orgframe.p_unitCharger')"
                                           @on-click="pickData4" />
                                </span>
                            </FormItem>
                        </i-col>
                        <!--默认成本中心-->
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitDfcostcenter')"
                                      prop="unitDfcostcenter">
                                <span @dblclick="clearCostcenter">
                                    <Input v-model="formValidate.unitDfcostcenterName"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_organization.orgframe.unitDfcostcenterInp')"
                                           @on-click="pickData3" />
                                </span>
                            </FormItem>
                        </i-col>
                        <!--默认雇佣地点-->
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitDfhirecity')"
                                      prop="unitDfhirecity">
                                <span @dblclick="clearDfhire">
                                    <Input v-model="formValidate.unitDfhirecityName"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_organization.orgframe.unitDfhirecityInp')"
                                           @on-click="pickData" />
                                </span>
                            </FormItem>
                        </i-col>
                        <!--默认工作地点-->
                        <i-col span="11">
                            <FormItem :label="$t('lang_organization.orgframe.unitDfworkcity')"
                                      prop="unitDfworkcity">
                                <span @dblclick="clearDfwork">
                                    <Input v-model="formValidate.unitDfworkcityName"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_organization.orgframe.unitDfworkcityInp')"
                                           @on-click="pickData1" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem :label="$t('lang_organization.orgframe.comment')"
                                      prop="comment">
                                <Input v-model="formValidate.comment"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       :placeholder="$t('lang_organization.orgframe.commentInp')"></Input>
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>
            </div>
            <Button @click="handleReset"
                    class="btn1">{{$t('button.cal')}}</Button>
            <Button type="primary"
                    @click="handleSubmit"
                    class="btn">{{$t('button.sav')}}</Button>
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
        <!--选择地点-->
        <transition name='fade'>
            <map-select ref="mapSelect"
                        :position="position"
                        @set-position="setPostion"
                        @set-position-error="positionError" />
        </transition>
    </div>
</template>
<script>
import MapSelect from '../MapSelect.vue';
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import searchCity from '../../../../components/searchTable/searchCity'
import searchOrgframe from '../../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../../components/searchTable/searchOrgcostcenter'
import staffPage from '../staffPage.vue'

export default {
    data () {
        return {
            type: '',
            distype: false,
            forbidden: null,
            popup: '',
            value: '',
            selectUnitType: [],
            selectUnitlevel: [],
            selectPubstatus: [],
            formValidate: {
                unitCode: '',
                NewUnitCode: '',
                unitType: '',
                compFnameCnDis: '',
                compFnameEnDis: '',
                compSnameCnDis: '',
                compSnameEnDis: '',
                unitPid: '',
                unitDfcostcenter: '',
                unitState: '0105draft',
                unitChghistory: '',
                unitDfhirecity: '',
                unitDfworkcity: '',
                validdate: '',
                invreason: '',
                unitLevel: '',
                unitCharger: '',
                comment: '',
                unitDlocation: '',
                unitDfcostcenterName: '', // 成本中心
                unitDfhirecityName: '', // 雇佣地点
                unitChargerDis: '', // 负责人
                unitDfworkcityName: '', // 工作地点
                unitLevelDis: '', // 管理等级
                unitPidCode: '',
                unitPname: '',
            },
            openPick: false,
            openPick2: false,
            openPick3: false,
            openPick4: false,
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
                compFnameCnDis: [
                    { required: true, message: this.$t('lang_organization.orgframe.compFnameCnDisInp'), trigger: 'blur' },
                ],
                compFnameEnDis: [
                    { required: true, message: this.$t('lang_organization.orgframe.compFnameEnDisInp'), trigger: 'blur' },
                ],
                compSnameCnDis: [
                    { required: true, message: this.$t('lang_organization.orgframe.compSnameCnDisInp'), trigger: 'blur' },
                ],
                compSnameEnDis: [
                    { required: true, message: this.$t('lang_organization.orgframe.compSnameEnDisInp'), trigger: 'blur' },
                ],
                unitAgentno: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitAgentnoInp'), trigger: 'blur' },
                ],
                unitDlocation: [
                    { required: true, message: this.$t('lang_organization.orgframe.c_locationSch'), trigger: 'blur' },
                ],
                unitType: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitTypeNameInp'), trigger: 'blur' },
                ],
                unitPid: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitPnameInp'), trigger: 'blur' },
                ],
                unitLevel: [
                    { required: true, message: this.$t('lang_organization.orgframe.unitLevel'), trigger: 'blur' },
                ],
                validdate: [
                    { required: true, type: 'date', message: this.$t('lang_organization.orgframe.validdateInp'), trigger: 'change' },
                ],
                unitDfhirecity: [
                    { required: true, message: '填写雇佣地点', trigger: 'change' },
                ],
                unitDfworkcity: [
                    { required: true, message: '填写工作地点', trigger: 'change' },
                ],
                unitDfcostcenter: [
                    { required: true, message: '填写成本中心', trigger: 'change' },
                ],
                unitCharger: [
                    { required: true, message: '填写负责人', trigger: 'change' },
                ],
            },
            position: {},
        }
    },
    props: {
        logType: String,
        index: Number,
    },
    components: {
        searchCity,
        searchOrgframe,
        searchOrgcostcenter,
        staffPage,
        MapSelect,
    },
    updated () {

    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getData (row) {
            const t = this
            t.formValidate.unitCode = row.unitCode
            if (row.hasOwnProperty('NewUnitCode')) {
                t.formValidate.NewUnitCode = row.NewUnitCode
                t.formValidate.unitDfcostcenter = row.unitDfcostcenter
                t.formValidate.unitDfcostcenterName = row.unitDfcostcenterName // 成本中心 row.unitDfcostcenterName
                t.formValidate.unitChargerDis = row.unitChargerDis // 负责人
                t.formValidate.unitCharger = row.unitCharger
                // row.unitPid 所属上级
                t.formValidate.unitPid = row.unitPid
                // row.unitPname
                t.formValidate.unitPname = row.unitPname
            } else {
                t.formValidate.NewUnitCode = row.unitCode
                t.formValidate.unitDfcostcenter = row.unitDfcostcenter // row.unitDfcostcenter
                t.formValidate.unitDfcostcenterName = row.unitDfcostcenterName // 成本中心 row.unitDfcostcenterName
                t.formValidate.unitChargerDis = row.unitChargerDis // 负责人
                t.formValidate.unitCharger = row.unitCharger
                // row.unitPid  所属上级
                t.formValidate.unitPid = row.unitPid
                // row.unitPname
                t.formValidate.unitPname = row.unitPname
            }
            t.formValidate.compFnameCnDis = row.compFnameCnDis
            t.formValidate.compFnameEnDis = row.compFnameEnDis
            t.formValidate.compSnameCnDis = row.compSnameCnDis
            t.formValidate.compSnameEnDis = row.compSnameEnDis
            t.formValidate.unitDlocation = row.unitDlocation
            t.formValidate.unitXlocation = row.unitXlocation
            t.formValidate.unitYlocation = row.unitYlocation
            t.formValidate.unitChghistory = row.unitChghistory
            t.formValidate.validdate = row.validdate
            t.formValidate.invreason = row.invreason
            t.formValidate.comment = row.comment
            t.formValidate.unitType = row.unitType
            t.formValidate.unitState = row.unitState
            if (row.unitDfhirecity === '' || row.unitDfhirecity === '0') {
                t.formValidate.unitDfhirecity = ''
                t.formValidate.unitDfhirecityName = '' // 雇佣地点
            } else {
                t.formValidate.unitDfhirecity = row.unitDfhirecity
                t.formValidate.unitDfhirecityName = row.unitDfhirecityName // 雇佣地点
            }
            if (row.unitDfworkcity === '' || row.unitDfworkcity === '0') {
                t.formValidate.unitDfworkcity = ''
                t.formValidate.unitDfworkcityName = '' // 工作地点
            } else {
                t.formValidate.unitDfworkcity = row.unitDfworkcity
                t.formValidate.unitDfworkcityName = row.unitDfworkcityName // 工作地点
            }
            t.formValidate.unitLevelDis = row.unitLevelDis
            t.formValidate.unitLevel = row.unitLevel
            t.formValidate.unitPidCode = row.unitPidCode
            t.type = row.unitType
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
        handleSubmit () {
            // NewUnitCode
            const t = this
            if (t.formValidate.NewUnitCode === t.formValidate.unitCode) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '组织编码必须修改',
                })
                return
            }
            const data = deepCopy(t.formValidate)
            if (t.type === '70dept' && data.unitType === '01company') {
                t.$Modal.warning({
                    title: this.$t('reminder.err'),
                    content: this.$t('lang_organization.orgframe.reminderErr'),
                })
                return
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$emit('closeUp')
                    this.$emit('addNewComp', data)
                }
            })
            console.log(t.unitPname)
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
        changeinput (name, id) {
            const t = this
            if (t.popup === '0') {
                t.formValidate.unitDfhirecityName = name
                t.formValidate.unitDfhirecity = id
            } else if (t.popup === '1') {
                t.formValidate.unitDfworkcityName = name
                t.formValidate.unitDfworkcity = id
            }
        },
        changeinput2 (name, id, centerName, center, type) {
            const t = this
            // t.formValidate.unitType = type
            t.formValidate.unitPname = name
            t.formValidate.unitPid = id
            t.formValidate.unitDfcostcenter = center
            t.formValidate.unitDfcostcenterName = centerName
            t.type = type
        },
        changeinput3 (name, id) {
            const t = this
            t.formValidate.unitDfcostcenterName = name
            t.formValidate.unitDfcostcenter = id
        },
        changeinput4 (name, id) {
            const t = this
            t.formValidate.unitChargerDis = name
            t.formValidate.unitCharger = id
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
                t.$refs.searchOrgframe.getData(this.params2)
                t.openPick2 = true
            }
        },
        pickData3 () {
            const t = this
            t.$refs.searchOrgcostcenter.getData(this.params3)
            t.openPick3 = true
        },
        pickData4 () {
            const t = this
            t.openPick4 = true
            t.$refs.staffPage.getData()
        },
        clearPid () {
            const t = this
            t.formValidate.unitPname = ''
            t.formValidate.unitPid = ''
        },
        clearDfhire () {
            const t = this
            t.formValidate.unitDfhirecityName = ''
            t.formValidate.unitDfhirecity = ''
        },
        clearDfwork () {
            const t = this
            t.formValidate.unitDfworkcityName = ''
            t.formValidate.unitDfworkcity = ''
        },
        clearCostcenter () {
            const t = this
            t.formValidate.unitDfcostcenterName = ''
            t.formValidate.unitDfcostcenter = ''
        },
        clearMgt () {
            const t = this
            t.formValidate.unitChargerDis = ''
            t.formValidate.unitCharger = ''
        },
        handleReset () {
            //        this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
        },
        // 打开地图
        openMap () {
            this.$refs.mapSelect.showMap();
        },
        setPostion (position) {
            this.position = position
            this.isShow = true
            this.formValidate.unitDlocation = this.position.name
            this.formValidate.unitXlocation = this.position.longitude
            this.formValidate.unitYlocation = this.position.latitude
        },
        positionError (msg) {
            this.showTip(msg || '地址选择失败')
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd";
.option-main {
    position: relative;
    height: 500px;
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 60px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 124px;
}
</style>
