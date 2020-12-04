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
            <div style="padding-left: 25px;margin-right: 10px;margin-bottom: 20px;">
                <Form ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="120">
                    <Row>
                        <i-col span="11">
                            <FormItem label="员工工号"
                                      prop="appAnbrkEmpDis">
                                <span>
                                    <Input v-model="oldForm.empadjWorkno"
                                           placeholder="员工工号"
                                           disabled></Input>
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            <FormItem label="中文名"
                                      prop="empadjCname">
                                <span>
                                    <Input v-model="oldForm.empadjCname"
                                           placeholder="中文名"
                                           disabled></Input>
                                </span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <Col span="11">
                        <FormItem label="生效日期"
                                  prop="empadjEffectdate">
                            <DatePicker type="date"
                                        :editable="false"
                                        :transfer="true"
                                        style="width: 100%"
                                        placeholder="请选择生效日期"
                                        v-model="formValidate.empadjEffectdate"></DatePicker>
                        </FormItem>
                        </Col>
                        <!--<i-col span="11">-->
                        <!--<FormItem label="生效日期" prop="empadjEffectdate">-->
                        <!--<DatePicker type="date" :editable="false" :transfer="true" style="width: 100%" placeholder="请选择生效日期" v-model="formValidate.empadjEffectdate"></DatePicker>-->
                        <!--</FormItem>-->
                        <!--</i-col>-->
                    </Row>
                    <Row>
                        <i-col span="23">
                            <FormItem label="调整原因"
                                      prop="empadjReason">
                                <Input v-model="formValidate.empadjReason"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder='请输入调整原因'></Input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row style='text-align: center;margin-bottom: 14px;'>
                        <i-col span="11">
                            原信息
                        </i-col>
                        <i-col span="11"
                               offset="1">
                            调整信息
                        </i-col>
                    </Row>
                    <Row style="max-height: 240px;overflow-y: auto;">
                        <Row>
                            <i-col span="11">
                                <FormItem label="公司">
                                    <span>
                                        <Input v-model="oldForm.empadjOldCompDis"
                                               style="width: 100%"
                                               placeholder='公司'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="公司"
                                          prop="empadjNewComp">
                                    <span>
                                        <Input v-model="form.empadjNewCompDis"
                                               style="width: 100%"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择公司'
                                               @on-click="opencompetType('empadjNewComp')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="部门">
                                    <span>
                                        <Input v-model="oldForm.empadjOldDeptDis"
                                               style="width: 100%"
                                               placeholder='部门'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="部门"
                                          prop="empadjNewDept">
                                    <span>
                                        <Input v-model="form.empadjNewDeptDis"
                                               style="width: 100%"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择部门'
                                               @on-click="opencompetType('empadjNewDept')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="岗位">
                                    <span>
                                        <Input v-model="oldForm.empadjOldPostDis"
                                               style="width: 100%"
                                               placeholder='公司'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="岗位"
                                          prop="empadjNewPost">
                                    <span>
                                        <Input v-model="form.empadjNewPostDis"
                                               style="width: 100%"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择岗位'
                                               @on-click="opencompetType('empadjNewPost')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="成本中心">
                                    <span>
                                        <Input v-model="oldForm.empadjOldCostcenterDis"
                                               style="width: 100%"
                                               placeholder='成本中心'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="成本中心"
                                          prop="empadjNewCostcenter">
                                    <span>
                                        <Input v-model="form.empadjNewCostcenterDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择成本中心'
                                               @on-click="opencompetType('empadjNewCostcenter')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="雇佣地点">
                                    <span>
                                        <Input v-model="oldForm.empadjOldHirelocalDis"
                                               style="width: 100%"
                                               placeholder='雇佣地点'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="雇佣地点"
                                          prop="empadjNewHirelocal">
                                    <span>
                                        <Input v-model="form.empadjNewHirelocalDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择雇佣地点'
                                               @on-click="opencompetType('empadjNewHirelocal')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="工作地点">
                                    <span>
                                        <Input v-model="oldForm.empadjOldWorklocalDis"
                                               style="width: 100%"
                                               placeholder='工作地点'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="工作地点"
                                          prop="empadjNewWorklocal">
                                    <span>
                                        <Input v-model="form.empadjNewWorklocalDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择工作地点'
                                               @on-click="opencompetType('empadjNewWorklocal')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="业务上级经理">
                                    <span>
                                        <Input v-model="oldForm.empadjOldBusinmanagerDis"
                                               style="width: 100%"
                                               placeholder='业务上级经理'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="业务上级经理"
                                          prop="empadjNewBusinmanager">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewBusinmanagerDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择业务上级经理'
                                               @on-click="opencompetType('empadjNewBusinmanager')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="功能上级经理">
                                    <span>
                                        <Input v-model="oldForm.empadjOldFunmanageerDis"
                                               style="width: 100%"
                                               placeholder='功能上级经理'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="功能上级经理"
                                          prop="empadjNewFunmanageer">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewFunmanageerDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择功能上级经理'
                                               @on-click="opencompetType('empadjNewFunmanageer')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>

                        <!---->
                        <!---->
                        <!---->
                        <Row>
                            <i-col span="11">
                                <FormItem label="职位级别">
                                    <span>
                                        <Input v-model="oldForm.empadjOldPostlevelDis"
                                               placeholder='职位级别'
                                               style="width: 100%"
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="职位级别"
                                          prop="empadjNewPostlevel">
                                    <Select v-model="formValidate.empadjNewPostlevel">
                                        <Option :value="item.paramCode"
                                                :key="index"
                                                v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="薪资级别">
                                    <span>
                                        <Input v-model="oldForm.empadjOldSalalevelDis"
                                               style="width: 100%"
                                               placeholder='薪资级别'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="薪资级别"
                                          prop="empadjNewSalalevel">
                                    <Select v-model="formValidate.empadjNewSalalevel">
                                        <Option :value="item.paramCode"
                                                :key="index"
                                                v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="差旅级别">
                                    <span>
                                        <Input v-model="oldForm.empadjOldTravelevelDis"
                                               style="width: 100%"
                                               placeholder='差旅级别'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="差旅级别"
                                          prop="empadjNewTravelevel">
                                    <Select v-model="formValidate.empadjNewTravelevel">
                                        <Option :value="item.paramCode"
                                                :key="index"
                                                v-for="(item,index) in select2">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="行政级别">
                                    <span>
                                        <Input v-model="oldForm.empadjOldAdminlevelDis"
                                               style="width: 100%"
                                               placeholder='行政级别'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="行政级别"
                                          prop="empadjNewAdminlevel">
                                    <Select v-model="formValidate.empadjNewAdminlevel">
                                        <Option :value="item.paramCode"
                                                :key="index"
                                                v-for="(item,index) in select3">{{item.paramInfoName}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="薪资账套">
                                    <span>
                                        <Input v-model="oldForm.empadjOldSalarysetDis"
                                               style="width: 100%"
                                               placeholder='薪资账套'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="薪资账套"
                                          prop="empadjNewSalaryset">
                                    <Select v-model="formValidate.empadjNewSalaryset">
                                        <Option :value="item.payssCode"
                                                :key="index"
                                                v-for="(item,index) in select4">{{item.payssEN}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="个税缴纳地">
                                    <span>
                                        <Input v-model="oldForm.empadjOldTaxlocalDis"
                                               style="width: 100%"
                                               placeholder='个税缴纳地'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="个税缴纳地"
                                          prop="empadjNewTaxlocal">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewTaxlocalDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择个税缴纳地'
                                               @on-click="opencompetType('empadjNewTaxlocal')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="社保缴纳地">
                                    <span>
                                        <Input v-model="oldForm.empadjOldSocilocalDis"
                                               style="width: 100%"
                                               placeholder='社保缴纳地'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="社保缴纳地"
                                          prop="empadjNewSocilocal">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewSocilocalDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择社保缴纳地'
                                               @on-click="opencompetType('empadjNewSocilocal')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="社保政策">
                                    <span>
                                        <Input v-model="oldForm.empadjOldSocipolicyDis"
                                               style="width: 100%"
                                               placeholder='社保政策'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="社保政策"
                                          prop="empadjNewSocipolicy">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewSocipolicyDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择社保政策'
                                               @on-click="opencompetType('empadjNewSocipolicy')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="社保基数">
                                    <span>
                                        <Input v-model="oldForm.empadjOldSocibase"
                                               style="width: 100%"
                                               placeholder='社保基数'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="社保基数"
                                          prop="empadjNewSocibase">
                                    <span>
                                        <Input v-model="formValidate.empadjNewSocibase"
                                               style="width: 100%;"
                                               placeholder='请输入社保基数' />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="公积金缴纳地">
                                    <span>
                                        <Input v-model="oldForm.empadjOldFundlocalDis"
                                               style="width: 100%"
                                               placeholder='公积金缴纳地'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="公积金缴纳地"
                                          prop="empadjNewFundlocal">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewFundlocalDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择公积金缴纳地'
                                               @on-click="opencompetType('empadjNewFundlocal')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="公积金政策">
                                    <span>
                                        <Input v-model="oldForm.empadjOldFundpolicyDis"
                                               style="width: 100%"
                                               placeholder='公积金政策'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="公积金政策"
                                          prop="empadjNewFundpolicy">
                                    <span @dblclick="dbPost">
                                        <Input v-model="form.empadjNewFundpolicyDis"
                                               style="width: 100%;"
                                               icon="ios-search"
                                               :readonly="true"
                                               placeholder='请选择公积金政策'
                                               @on-click="opencompetType('empadjNewFundpolicy')" />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="11">
                                <FormItem label="公积金基数">
                                    <span>
                                        <Input v-model="oldForm.empadjOldFundbase"
                                               style="width: 100%"
                                               placeholder='公积金基数'
                                               disabled />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="11"
                                   offset="1">
                                <FormItem label="公积金基数"
                                          prop="empadjNewFundbase">
                                    <span>
                                        <Input v-model="formValidate.empadjNewFundbase"
                                               style="width: 100%;"
                                               placeholder='请输入社保基数' />
                                    </span>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="23">
                                <FormItem label="备注"
                                          prop="empadjNote">
                                    <Input v-model="formValidate.empadjNote"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           placeholder='请输入备注'></Input>
                                </FormItem>
                            </i-col>
                        </Row>
                    </Row>

                    <Row>
                        <i-col span="23">
                            <Row type="flex"
                                 justify="end">
                                <FormItem style='margin-bottom: 0;'>
                                    <Button style='margin-right: 10px;'
                                            @click="handleReset">{{$t('button.cal')}}</Button>
                                    <Button type="primary"
                                            :loading="isSpin"
                                            @click="handleSubmit"
                                            v-show="logType === '修改'">{{$t('button.sav')}}</Button>
                                </FormItem>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
            </div>
        </div>
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
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            isSpin: false,
            showModal: false,
            modiaContent: '',
            dataParame: {},
            oldForm: {
                empadjWorkno: '',
                empadjCname: '',
                empadjOldCompDis: '',
                empadjOldDeptDis: '',
                empadjOldPostDis: '',
                empadjOldCostcenterDis: '',
                empadjOldHirelocalDis: '',
                empadjOldWorklocalDis: '',
                empadjOldBusinmanagerDis: '',
                empadjOldFunmanageerDis: '',
                empadjOldPostlevelDis: '',
                empadjOldSalalevelDis: '',
                empadjOldTravelevelDis: '',
                empadjOldAdminlevelDis: '',
                empadjOldSalarysetDis: '',
                empadjOldTaxlocalDis: '',
                empadjOldSocilocalDis: '',
                empadjOldSocipolicyDis: '',
                empadjOldSocibase: '',
                empadjOldFundlocalDis: '',
                empadjOldFundpolicyDis: '',
                empadjOldFundbase: '',
            },
            form: {
                type: '',
                empadjNewCompDis: '',
                empadjNewDeptDis: '',
                empadjNewPostDis: '',
                empadjNewCostcenterDis: '',
                empadjNewHirelocalDis: '',
                empadjNewWorklocalDis: '',
                empadjNewBusinmanagerDis: '',
                empadjNewFunmanageerDis: '',
                empadjNewTaxlocalDis: '',
                empadjNewSocilocalDis: '',
                empadjNewSocipolicyDis: '',
                empadjNewFundlocalDis: '',
                empadjNewFundpolicyDis: '',

                empadjNewPostlevelDis: '',
                empadjNewSalalevelDis: '',
                empadjNewTravelevelDis: '',
                empadjNewAdminlevelDis: '',
                empadjNewSalarysetDis: '',
            },
            // 点击给关联指标弹窗传参调接口
            params: {
                _mt:  this.$global.mt+'RecruiteInterviewer.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
                roleType: '3user',
                normStatus: '02valid',
            },
            id: '',
            formValidate: {
                empadjEffectdate: '',
                empadjReason: '',
                empadjNewComp: '',
                empadjNewDept: '',
                empadjNewPost: '',
                empadjNewCostcenter: '',
                empadjNewHirelocal: '',
                empadjNewWorklocal: '',
                empadjNewBusinmanager: '',
                empadjNewFunmanageer: '',
                empadjNewPostlevel: '',
                empadjNewSalalevel: '',
                empadjNewTravelevel: '',
                empadjNewAdminlevel: '',
                empadjNewSalaryset: '',
                empadjNewTaxlocal: '',
                empadjNewSocilocal: '',
                empadjNewSocipolicy: '',
                empadjNewSocibase: '',
                empadjNewFundlocal: '',
                empadjNewFundpolicy: '',
                empadjNewFundbase: '',
                empadjNote: '',
            },
            appAnbrkEmpDis: '',
            appAnbrkCompidDis: '',
            appAnbrkDeptidDis: '',
            ruleValidate: {
                empadjNewComp: [
                    { required: true, message: '请选择公司', trigger: 'blur' },
                ],
                empadjNewDept: [
                    { required: true, message: '请选择部门', trigger: 'blur' },
                ],
                empadjNewPost: [
                    { required: true, message: '请选择岗位', trigger: 'blur' },
                ],
                empadjEffectdate: [
                    { required: true, type: 'date', message: '请选择生效日期', trigger: 'change' },
                ],
                empadjReason: [
                    { required: true, message: '请输入调整原因', trigger: 'blur' },
                ],
                //          empadjNewDept: [
                //            { required: true, message: '请选择部门', trigger: 'blur' },
                //          ],
                //          empadjNewPost: [
                //            { required: true, message: '请选择岗位', trigger: 'blur' },
                //          ],
                //          empadjNewCostcenter: [
                //            { required: true, message: '请选择成本中心', trigger: 'blur' },
                //          ],
                //          empadjNewHirelocal: [
                //            { required: true, message: '请选择雇佣地点', trigger: 'blur' },
                //          ],
                //          empadjNewWorklocal: [
                //            { required: true, message: '请选择工作地点', trigger: 'blur' },
                //          ],
                //          empadjNewBusinmanager: [
                //            { required: true, message: '请选择业务上级经理', trigger: 'blur' },
                //          ],
                //          empadjNewFunmanageer: [
                //            { required: true, message: '请选择功能上级经理', trigger: 'blur' },
                //          ],
            },
            select: [],
            select1: [],
            select2: [],
            select3: [],
            select4: [],
            checkShow: false,
        }
    },
    props: {
        logType: String,
    },
    components: {
    },
    methods: {
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'EmpBatchadjust.getById',
                    //            _mt:  this.$global.mt+'EmpBatchadjust.getPage',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.oldForm.empadjWorkno = res.data.content[0].empadjWorkno
                        t.oldForm.empadjCname = res.data.content[0].empadjCname
                        t.oldForm.empadjOldCompDis = res.data.content[0].empadjOldCompDis
                        t.oldForm.empadjOldDeptDis = res.data.content[0].empadjOldDeptDis
                        t.oldForm.empadjOldPostDis = res.data.content[0].empadjOldPostDis
                        t.oldForm.empadjOldCostcenterDis = res.data.content[0].empadjOldCostcenterDis
                        t.oldForm.empadjOldHirelocalDis = res.data.content[0].empadjOldHirelocalDis
                        t.oldForm.empadjOldWorklocalDis = res.data.content[0].empadjOldWorklocalDis
                        t.oldForm.empadjOldBusinmanagerDis = res.data.content[0].empadjOldBusinmanagerDis
                        t.oldForm.empadjOldFunmanageerDis = res.data.content[0].empadjOldFunmanageerDis
                        t.oldForm.empadjOldPostlevelDis = res.data.content[0].empadjOldPostlevelDis
                        t.oldForm.empadjOldSalalevelDis = res.data.content[0].empadjOldSalalevelDis
                        t.oldForm.empadjOldTravelevelDis = res.data.content[0].empadjOldTravelevelDis
                        t.oldForm.empadjOldAdminlevelDis = res.data.content[0].empadjOldAdminlevelDis
                        t.oldForm.empadjOldSalarysetDis = res.data.content[0].empadjOldSalarysetDis
                        t.oldForm.empadjOldTaxlocalDis = res.data.content[0].empadjOldTaxlocalDis
                        t.oldForm.empadjOldSocilocalDis = res.data.content[0].empadjOldSocilocalDis
                        t.oldForm.empadjOldSocipolicyDis = res.data.content[0].empadjOldSocipolicyDis
                        t.oldForm.empadjOldSocibase = res.data.content[0].empadjOldSocibase
                        t.oldForm.empadjOldFundlocalDis = res.data.content[0].empadjOldFundlocalDis
                        t.oldForm.empadjOldFundbase = res.data.content[0].empadjOldFundbase
                        t.oldForm.empadjOldFundpolicyDis = res.data.content[0].empadjOldFundpolicyDis
                        console.log(t.oldForm, '1111111111')
                        t.form.empadjNewCompDis = res.data.content[0].empadjNewCompDis
                        t.form.empadjNewDeptDis = res.data.content[0].empadjNewDeptDis
                        t.form.empadjNewPostDis = res.data.content[0].empadjNewPostDis
                        t.form.empadjNewCostcenterDis = res.data.content[0].empadjNewCostcenterDis
                        t.form.empadjNewHirelocalDis = res.data.content[0].empadjNewHirelocalDis
                        t.form.empadjNewWorklocalDis = res.data.content[0].empadjNewWorklocalDis
                        t.form.empadjNewBusinmanagerDis = res.data.content[0].empadjNewBusinmanagerDis
                        t.form.empadjNewFunmanageerDis = res.data.content[0].empadjNewFunmanageerDis
                        t.form.empadjNewTaxlocalDis = res.data.content[0].empadjNewTaxlocalDis
                        t.form.empadjNewSocilocalDis = res.data.content[0].empadjNewSocilocalDis
                        t.form.empadjNewSocipolicyDis = res.data.content[0].empadjNewSocipolicyDis
                        t.form.empadjNewFundlocalDis = res.data.content[0].empadjNewFundlocalDis
                        t.form.empadjNewFundpolicyDis = res.data.content[0].empadjNewFundpolicyDis
                        console.log(t.form, 't.form') // 't.form'
                        t.formValidate.empadjEffectdate = res.data.content[0].empadjEffectdate
                        //              t.formValidate.empadjEffectdate = res.data.content[0].empadjEffectdate === '' ? '' : new Date(res.data.content[0].empadjEffectdate)
                        t.formValidate.empadjReason = res.data.content[0].empadjReason
                        t.formValidate.empadjNewComp = res.data.content[0].empadjNewComp
                        t.formValidate.empadjNewDept = res.data.content[0].empadjNewDept
                        t.formValidate.empadjNewPost = res.data.content[0].empadjNewPost
                        t.formValidate.empadjNewCostcenter = res.data.content[0].empadjNewCostcenter
                        t.formValidate.empadjNewHirelocal = res.data.content[0].empadjNewHirelocal
                        t.formValidate.empadjNewWorklocal = res.data.content[0].empadjNewWorklocal
                        t.formValidate.empadjNewBusinmanager = res.data.content[0].empadjNewBusinmanager
                        t.formValidate.empadjNewFunmanageer = res.data.content[0].empadjNewFunmanageer
                        t.formValidate.empadjNewPostlevel = res.data.content[0].empadjNewPostlevel
                        t.formValidate.empadjNewSalalevel = res.data.content[0].empadjNewSalalevel
                        t.formValidate.empadjNewTravelevel = res.data.content[0].empadjNewTravelevel
                        t.formValidate.empadjNewAdminlevel = res.data.content[0].empadjNewAdminlevel
                        t.formValidate.empadjNewSalaryset = res.data.content[0].empadjNewSalaryset
                        // 反查的值
                        t.form.empadjNewPostlevelDis = res.data.content[0].empadjNewPostlevelDis
                        t.form.empadjNewSalalevelDis = res.data.content[0].empadjNewSalalevelDis
                        t.form.empadjNewTravelevelDis = res.data.content[0].empadjNewTravelevelDis
                        t.form.empadjNewAdminlevelDis = res.data.content[0].empadjNewAdminlevelDis
                        t.form.empadjNewSalarysetDis = res.data.content[0].empadjNewSalarysetDis

                        t.formValidate.empadjNewSocilocal = res.data.content[0].empadjNewSocilocal
                        t.formValidate.empadjNewSocipolicy = res.data.content[0].empadjNewSocipolicy
                        t.formValidate.empadjNewSocibase = res.data.content[0].empadjNewSocibase
                        t.formValidate.empadjNewFundlocal = res.data.content[0].empadjNewFundlocal
                        t.formValidate.empadjNewFundpolicy = res.data.content[0].empadjNewFundpolicy
                        t.formValidate.empadjNewFundbase = res.data.content[0].empadjNewFundbase
                        t.formValidate.empadjNote = res.data.content[0].empadjNote
                        console.log(t.formValidate, 't.formValidate') //
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                //          _mt:  this.$global.mt+'EmpBatchadjust.getPage',
                typeCode: 'postlevel,salarylevel,travellevel,adminlevel',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select = res.data.content[0].value[0].paramList
                    t.select1 = res.data.content[0].value[1].paramList
                    t.select2 = res.data.content[0].value[2].paramList
                    t.select3 = res.data.content[0].value[3].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 薪资账套
        getPaySelect () {
            const t = this
            getDataLevelUserLoginNew({
                //          _mt:  this.$global.mt+'PaySalSet.getSelectValue',
                _mt:  this.$global.mt+'EmpBatchadjust.getPage',
                logType: '薪资账套',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select4 = res.data.content[0].value
                    console.log(t.select4)
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data._mt =  this.$global.mt+'EmpBatchadjust.addOrUpd'
            data.logType = t.logType
            if (data.empadjEffectdate !== undefined) {
                data.empadjEffectdate = data.empadjEffectdate === '' ? '' : new Date(data.empadjEffectdate).format('yyyy-MM-dd')
            }
            if (t.checkRight()) {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        t.isSpin = true
                        if (t.logType === '修改') {
                            data.id = t.id
                        }
                        getDataLevelUserLoginNew(data).then((res) => {
                            t.isSpin = false
                            if (isSuccess(res, t)) {
                                if (t.logType === '修改') {
                                    t.$Modal.success({
                                        title: this.$t('reminder.suc'),
                                        content: this.$t('reminder.updsuccess'),
                                    })
                                    this.$emit('getData')
                                }
                                t.handleReset()
                            }
                        }).catch(() => {
                            t.isSpin = false
                            //              t.$Modal.error({
                            //                title: this.$t('reminder.err'),
                            //                content: this.$t('reminder.errormessage'),
                            //              })
                        })
                    }
                })
            } else {
                t.$Modal.warning({
                    title: '提示',
                    content: '调整信息与原信息相等,请做相关调整再保存!',
                })
            }
        },
        checkRight () {
            const t = this
            if (t.oldForm.empadjOldCompDis !== t.form.empadjNewCompDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldDeptDis !== t.form.empadjNewDeptDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldPostDis !== t.form.empadjNewPostDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldCostcenterDis !== t.form.empadjNewCostcenterDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldHirelocalDis !== t.form.empadjNewHirelocalDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldWorklocalDis !== t.form.empadjNewWorklocalDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldBusinmanagerDis !== t.form.empadjNewBusinmanagerDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldFunmanageerDis !== t.form.empadjNewFunmanageerDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldTaxlocalDis !== t.form.empadjNewTaxlocalDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldSocilocalDis !== t.form.empadjNewSocilocalDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldSocipolicyDis !== t.form.empadjNewSocipolicyDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldFundlocalDis !== t.form.empadjNewFundlocalDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldFundpolicyDis !== t.form.empadjNewFundpolicyDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldPostlevelDis !== t.form.empadjNewPostlevelDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldSalalevelDis !== t.form.empadjNewSalalevelDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldTravelevelDis !== t.form.empadjNewTravelevelDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldAdminlevelDis !== t.form.empadjNewAdminlevelDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldSalarysetDis !== t.form.empadjNewSalarysetDis) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldSocibase !== t.formValidate.empadjNewSocibase) {
                t.checkShow = true
            } else if (t.oldForm.empadjOldFundbase !== t.formValidate.empadjNewFundbase) {
                t.checkShow = true
            }
            return t.checkShow
        },
        /*
         *  弹出选择
         */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.form.type = type
            switch (type) {
                case 'sourceUnit':
                    if (t.form.oldUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择原公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.form.oldUnitId,
                    }
                    break
                case 'empadjNewComp':                   // 公司    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'org-company-std'
                    break
                case 'empadjNewDept':                   // 部门    -   	newCC
                    if (t.formValidate.empadjNewComp === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '请选择公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.formValidate.empadjNewComp,
                    }
                    t.modiaContent = 'org-department-std'
                    break
                case 'empadjNewPost':                   // 岗位    -   	newCC
                    if (t.formValidate.empadjNewDept === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '请选择部门',
                        })
                        return
                    }
                    t.dataParame = {
                        postUnit: t.formValidate.empadjNewDept,
                    }
                    t.modiaContent = 'org-post-std'
                    break
                case 'empadjNewCostcenter':                   // 新成本中心    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'org-costcenter-std'
                    break
                case 'empadjNewHirelocal':                   // 雇佣地点    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'base-city-std'
                    break
                case 'empadjNewWorklocal':                   // 工作地点    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'base-city-std'
                    break
                case 'empadjNewBusinmanager':                   // 业务上级经理    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'emp-base-std'
                    break
                case 'empadjNewFunmanageer':                   // 功能上级经理    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'emp-base-std'
                    break
                case 'empadjNewTaxlocal':                   // 个税缴纳地    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'base-city-std'
                    break
                case 'empadjNewSocilocal':                   // 社保缴纳地    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'base-city-std'
                    break
                case 'empadjNewSocipolicy':                   // 新成本中心    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'sihf-policy-std'
                    break
                case 'empadjNewFundlocal':                   // 公积金缴纳地
                    t.dataParame = {
                    }
                    t.modiaContent = 'base-city-std'
                    break
                case 'empadjNewFundpolicy':                   // 新成本中心    -   	newCC
                    t.dataParame = {
                    }
                    t.modiaContent = 'sihf-HFpolicy-std'  // 公积金政策
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.form.type) {
                case 'parentPost':
                    t.setData(t.form.type, t.form.type + 'Dis', row.postFnameEnDis, row.id)
                    break
                case 'empadjNewComp':
                    t.setData(t.form.type, t.form.type + 'Dis', row.unitsName, row.id)
                    t.changeUnit(row)
                    t.formValidate.empadjNewDept = ''
                    t.form.empadjNewDeptDis = ''
                    t.formValidate.empadjNewPost = ''
                    t.form.empadjNewPostDis = ''
                    break
                case 'empadjNewDept':
                    t.setData(t.form.type, t.form.type + 'Dis', row.unitsName, row.id)
                    t.changeUnit(row)
                    break
                case 'empadjNewPost':
                    t.setData(t.form.type, t.form.type + 'Dis', row.postFnameDis, row.id)
                    t.changePost(row)
                    break
                case 'empadjNewCostcenter':
                    t.setData(t.form.type, t.form.type + 'Dis', row.name, row.id)
                    break
                case 'empadjNewHirelocal':
                    t.setData(t.form.type, t.form.type + 'Dis', row.cityName, row.id)
                    t.changeHirelocal(row)
                    break
                case 'empadjNewWorklocal':
                    t.setData(t.form.type, t.form.type + 'Dis', row.cityName, row.id)
                    break
                case 'empadjNewBusinmanager':
                    t.setData(t.form.type, t.form.type + 'Dis', row.empCname, row.id)
                    break
                case 'empadjNewFunmanageer':
                    t.setData(t.form.type, t.form.type + 'Dis', row.empCname, row.id)
                    break
                case 'empadjNewTaxlocal':
                    t.setData(t.form.type, t.form.type + 'Dis', row.cityName, row.id)
                    break
                case 'empadjNewSocilocal':
                    t.setData(t.form.type, t.form.type + 'Dis', row.cityName, row.id)
                    break
                case 'empadjNewSocipolicy':
                    t.setData(t.form.type, t.form.type + 'Dis', row.sihfpcyCn, row.id)
                    break
                case 'empadjNewFundlocal':
                    t.setData(t.form.type, t.form.type + 'Dis', row.cityName, row.id)
                    break
                case 'empadjNewFundpolicy':
                    t.setData(t.form.type, t.form.type + 'Dis', row.sihfpcyCn, row.id)
                    break
            }
        },
        setData (type, typeDis, name, NewId) {
            this.formValidate[type] = NewId
            this.form[typeDis] = name
        },
        // 组织级联设置
        changeUnit (row) {
            const t = this
            t.form.empadjNewCostcenterDis = row.unitDfcostcenterName
            t.form.empadjNewWorklocalDis = row.unitDfhirecityName
            t.form.empadjNewHirelocalDis = row.unitDfworkcityName
            t.form.empadjNewTaxlocalDis = row.unitDfworkcityName
            t.form.empadjNewSocilocalDis = row.unitDfworkcityName
            t.form.empadjNewFundlocalDis = row.unitDfworkcityName
            t.formValidate.empadjNewCostcenter = row.unitDfcostcenter
            t.formValidate.empadjNewWorklocal = row.unitDfhirecity
            t.formValidate.empadjNewHirelocal = row.unitDfworkcity
            t.formValidate.empadjNewTaxlocal = row.unitDfworkcity
            t.formValidate.empadjNewSocilocal = row.unitDfworkcity
            t.formValidate.empadjNewFundlocal = row.unitDfworkcity
        },
        changePost (row) {
            const t = this
            t.form.empadjNewCostcenterDis = row.postDfcostcenterName
            t.form.empadjNewPostlevelDis = row.postDfpslevelName
            t.form.empadjNewSalalevelDis = row.postDfsallevelName
            t.form.empadjNewTravelevelDis = row.postDftrvlevelName
            t.formValidate.empadjNewCostcenter = row.postDfcostcenter
            t.formValidate.empadjNewPostlevel = row.postDfpslevel
            t.formValidate.empadjNewSalalevel = row.postDfsallevel
            t.formValidate.empadjNewTravelevel = row.postDftrvlevel
        },
        changeHirelocal (row) {
            const t = this
            t.form.empadjNewTaxlocalDis = row.cityName
            t.form.empadjNewSocilocalDis = row.cityName
            t.form.empadjNewFundlocalDis = row.cityName
            t.formValidate.empadjNewTaxlocal = row.id
            t.formValidate.empadjNewSocilocal = row.id
            t.formValidate.empadjNewFundlocal = row.id
        },
        dbPost () { },
        // 关闭弹窗
        handleReset () {
            const t = this
            t.oldForm.empadjWorkno = ''
            t.oldForm.empadjCname = ''
            t.oldForm.empadjOldCompDis = ''
            t.oldForm.empadjOldDeptDis = ''
            t.oldForm.empadjOldPostDis = ''
            t.oldForm.empadjOldCostcenterDis = ''
            t.oldForm.empadjOldHirelocalDis = ''
            t.oldForm.empadjOldWorklocalDis = ''
            t.oldForm.empadjOldBusinmanagerDis = ''
            t.oldForm.empadjOldFunmanageerDis = ''
            t.oldForm.empadjOldPostlevelDis = ''
            t.oldForm.empadjOldSalalevelDis = ''
            t.oldForm.empadjOldTravelevelDis = ''
            t.oldForm.empadjOldAdminlevelDis = ''
            t.oldForm.empadjOldSalarysetDis = ''
            t.oldForm.empadjOldTaxlocalDis = ''
            t.oldForm.empadjOldSocilocalDis = ''
            t.oldForm.empadjOldSocipolicyDis = ''
            t.oldForm.empadjOldSocibase = ''
            t.oldForm.empadjOldFundlocalDis = ''
            t.oldForm.empadjOldFundbase = ''
            t.oldForm.empadjOldFundpolicyDis = ''
            t.form.empadjNewCompDis = ''
            t.form.empadjNewDeptDis = ''
            t.form.empadjNewPostDis = ''
            t.form.empadjNewCostcenterDis = ''
            t.form.empadjNewHirelocalDis = ''
            t.form.empadjNewWorklocalDis = ''
            t.form.empadjNewBusinmanagerDis = ''
            t.form.empadjNewFunmanageerDis = ''
            t.form.empadjNewTaxlocalDis = ''
            t.form.empadjNewSocilocalDis = ''
            t.form.empadjNewSocipolicyDis = ''
            t.form.empadjNewFundlocalDis = ''
            t.form.empadjNewFundpolicyDis = ''
            t.form.empadjNewPostlevelDis = ''
            t.form.empadjNewSalalevelDis = ''
            t.form.empadjNewTravelevelDis = ''
            t.form.empadjNewAdminlevelDis = ''
            t.form.empadjNewSalarysetDis = ''
            t.formValidate.empadjEffectdate = ''
            t.formValidate.empadjReason = ''
            t.formValidate.empadjNewComp = ''
            t.formValidate.empadjNewDept = ''
            t.formValidate.empadjNewPost = ''
            t.formValidate.empadjNewCostcenter = ''
            t.formValidate.empadjNewHirelocal = ''
            t.formValidate.empadjNewWorklocal = ''
            t.formValidate.empadjNewBusinmanager = ''
            t.formValidate.empadjNewFunmanageer = ''
            t.formValidate.empadjNewPostlevel = ''
            t.formValidate.empadjNewSalalevel = ''
            t.formValidate.empadjNewTravelevel = ''
            t.formValidate.empadjNewAdminlevel = ''
            t.formValidate.empadjNewSalaryset = ''
            t.formValidate.empadjNewTaxlocal = ''
            t.formValidate.empadjNewSocilocal = ''
            t.formValidate.empadjNewSocipolicy = ''
            t.formValidate.empadjNewSocibase = ''
            t.formValidate.empadjNewFundlocal = ''
            t.formValidate.empadjNewFundpolicy = ''
            t.formValidate.empadjNewFundbase = ''
            t.formValidate.empadjNote = ''
            t.checkShow = false // 检测是否通过
            t.$refs.formValidate.resetFields()
            this.$emit('close')
        },
    },
}
</script>
<style lang="scss" scoped>
.cover {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
        .content {
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
