<template>
    <div class="option-main"
         ref="scrollBox">
        <Row>
            <Form :model="form"
                  label-position="right"
                  :rules="ruleValidate"
                  ref="form"
                  :label-width="120">
                <Row>
                    <i-col span="10">
                        <FormItem label="公司"
                                  prop='attRdsfHircompany'>
                            <span @dblclick="dbPost('attRdsfHircompany')">
                                <Input v-model="form.attRdsfHircompanyDis"
                                       style="width: 100%;;"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder='请选择公司'
                                       @on-click="opencompetType('attRdsfHircompany')" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="轮次名称"
                                  prop='attRdsfName'>
                            <Input v-model="form.attRdsfName"
                                   placeholder="请输入轮次名称"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="节假日规则"
                                  prop='attRdsfHolidayrule'>
                            <Select v-model="form.attRdsfHolidayrule"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select3">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="轮次周期类型"
                                  prop="attRdsfPeriodtype">
                            <Select v-model="form.attRdsfPeriodtype"
                                    clearable
                                    @on-change="selChange">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriodtype === 'byMonth'">
                        <FormItem label="轮次周期（天）"
                                  prop='attRdsfPeriod'>
                            <Input v-model="form.attRdsfPeriod"
                                   placeholder="请输入轮次周期（天）"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           v-if="form.attRdsfPeriodtype === 'byWeek'">
                        <FormItem label="轮次周期（天）">
                            <Input v-model="form.attRdsfPeriod"
                                   placeholder="轮次周期（天）"
                                   disabled></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <!--<FormItem label="轮次开始时间" prop="attRdsfStartdate">-->
                        <!--<DatePicker type="datetime" format="yyyy-MM-dd" clearable placeholder="请选择轮次开始时间" :editable="false" :confirm="false" v-model="form.attRdsfStartdate"></DatePicker>-->
                        <!--</FormItem>-->
                        <FormItem label="轮次开始时间"
                                  prop="attRdsfStartdate"
                                  v-if="form.attRdsfPeriodtype === 'byMonth'">
                            <Select v-model="form.attRdsfStartdate"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="轮次开始时间"
                                  prop="attRdsfStartdate"
                                  v-if="form.attRdsfPeriodtype === 'byWeek'">
                            <Select v-model="form.attRdsfStartdate"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select2">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>

                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 1)">
                        <FormItem label="轮次01"
                                  prop='attRdsfR01'>
                            <span @dblclick="clearUserid(1)">
                                <Input v-model="form.attRdsfR01Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(1)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 2)">
                        <FormItem label="轮次02"
                                  prop='attRdsfR02'>
                            <span @dblclick="clearUserid(2)">
                                <Input v-model="form.attRdsfR02Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(2)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 3)">
                        <FormItem label="轮次03"
                                  prop='attRdsfR03'>
                            <span @dblclick="clearUserid(3)">
                                <Input v-model="form.attRdsfR03Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(3)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 4)">
                        <FormItem label="轮次04"
                                  prop='attRdsfR04'>
                            <span @dblclick="clearUserid(4)">
                                <Input v-model="form.attRdsfR04Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(4)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 5)">
                        <FormItem label="轮次05"
                                  prop='attRdsfR05'>
                            <span @dblclick="clearUserid(5)">
                                <Input v-model="form.attRdsfR05Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(5)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 6)">
                        <FormItem label="轮次06"
                                  prop='attRdsfR06'>
                            <span @dblclick="clearUserid(6)">
                                <Input v-model="form.attRdsfR06Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(6)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 7)">
                        <FormItem label="轮次07"
                                  prop='attRdsfR07'>
                            <span @dblclick="clearUserid(7)">
                                <Input v-model="form.attRdsfR07Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(7)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 8)">
                        <FormItem label="轮次08"
                                  prop='attRdsfR08'>
                            <span @dblclick="clearUserid(8)">
                                <Input v-model="form.attRdsfR08Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(8)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 9)">
                        <FormItem label="轮次09"
                                  prop='attRdsfR09'>
                            <span @dblclick="clearUserid(9)">
                                <Input v-model="form.attRdsfR09Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(9)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 10)">
                        <FormItem label="轮次10"
                                  prop='attRdsfR10'>
                            <span @dblclick="clearUserid(10)">
                                <Input v-model="form.attRdsfR10Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(10)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>

                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 11)">
                        <FormItem label="轮次11"
                                  prop='attRdsfR11'>
                            <span @dblclick="clearUserid(11)">
                                <Input v-model="form.attRdsfR11Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(11)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 12)">
                        <FormItem label="轮次12"
                                  prop='attRdsfR12'>
                            <span @dblclick="clearUserid(12)">
                                <Input v-model="form.attRdsfR12Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(12)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 13)">
                        <FormItem label="轮次13"
                                  prop='attRdsfR13'>
                            <span @dblclick="clearUserid(13)">
                                <Input v-model="form.attRdsfR13Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(13)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 14)">
                        <FormItem label="轮次14"
                                  prop='attRdsfR14'>
                            <span @dblclick="clearUserid(14)">
                                <Input v-model="form.attRdsfR14Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(14)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 15)">
                        <FormItem label="轮次15"
                                  prop='attRdsfR15'>
                            <span @dblclick="clearUserid(15)">
                                <Input v-model="form.attRdsfR15Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(15)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 16)">
                        <FormItem label="轮次16"
                                  prop='attRdsfR16'>
                            <span @dblclick="clearUserid(16)">
                                <Input v-model="form.attRdsfR16Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(16)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 17)">
                        <FormItem label="轮次17"
                                  prop='attRdsfR17'>
                            <span @dblclick="clearUserid(17)">
                                <Input v-model="form.attRdsfR17Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(17)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 18)">
                        <FormItem label="轮次18"
                                  prop='attRdsfR18'>
                            <span @dblclick="clearUserid(18)">
                                <Input v-model="form.attRdsfR18Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(18)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 19)">
                        <FormItem label="轮次19"
                                  prop='attRdsfR19'>
                            <span @dblclick="clearUserid(19)">
                                <Input v-model="form.attRdsfR19Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(19)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 20)">
                        <FormItem label="轮次20"
                                  prop='attRdsfR20'>
                            <span @dblclick="clearUserid(20)">
                                <Input v-model="form.attRdsfR20Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(20)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>

                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 21)">
                        <FormItem label="轮次21"
                                  prop='attRdsfR21'>
                            <span @dblclick="clearUserid(21)">
                                <Input v-model="form.attRdsfR21Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(21)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 22)">
                        <FormItem label="轮次22"
                                  prop='attRdsfR22'>
                            <span @dblclick="clearUserid(22)">
                                <Input v-model="form.attRdsfR22Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(22)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 23)">
                        <FormItem label="轮次23"
                                  prop='attRdsfR23'>
                            <span @dblclick="clearUserid(23)">
                                <Input v-model="form.attRdsfR23Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(23)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 24)">
                        <FormItem label="轮次24"
                                  prop='attRdsfR24'>
                            <span @dblclick="clearUserid(24)">
                                <Input v-model="form.attRdsfR24Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(24)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 25)">
                        <FormItem label="轮次25"
                                  prop='attRdsfR25'>
                            <span @dblclick="clearUserid(25)">
                                <Input v-model="form.attRdsfR25Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(25)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 26)">
                        <FormItem label="轮次26"
                                  prop='attRdsfR26'>
                            <span @dblclick="clearUserid(26)">
                                <Input v-model="form.attRdsfR26Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(26)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 27)">
                        <FormItem label="轮次27"
                                  prop='attRdsfR27'>
                            <span @dblclick="clearUserid(27)">
                                <Input v-model="form.attRdsfR27Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(27)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 28)">
                        <FormItem label="轮次28"
                                  prop='attRdsfR28'>
                            <span @dblclick="clearUserid(28)">
                                <Input v-model="form.attRdsfR28Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(28)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 29)">
                        <FormItem label="轮次29"
                                  prop='attRdsfR29'>
                            <span @dblclick="clearUserid(29)">
                                <Input v-model="form.attRdsfR29Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(29)" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 30)">
                        <FormItem label="轮次30"
                                  prop='attRdsfR30'>
                            <span @dblclick="clearUserid(30)">
                                <Input v-model="form.attRdsfR30Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(30)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>

                <Row>
                    <i-col span="10">
                        <FormItem label="轮次31"
                                  prop='attRdsfR31'
                                  v-if="form.attRdsfPeriod && (Number(form.attRdsfPeriod) >= 31)">
                            <span @dblclick="clearUserid(31)">
                                <Input v-model="form.attRdsfR31Dis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择班次"
                                       @on-click="pickUserData(31)" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
        </Row>
        <Button class="btn"
                :loading="isSpin"
                type="primary"
                @click="save">{{$t('button.sav')}}</Button>

        <!-- 班次 -->
        <transition name="fade">
            <searchEmpMaster v-if="openPickUser"
                             :comId="form.attRdsfHircompany"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"
                             :num='num'></searchEmpMaster>
        </transition>
        <!-- 弹出搜索 -->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="modiaContent"
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import searchEmpMaster from '../../../components/searchTable/searchAttendanceRota'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
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
            showModal: false, // 弹出搜索
            modiaContent: '', // 弹出搜索
            dataParame: {}, // 弹出搜索
            searchType: '', // 弹出搜索
            isSpin: false,
            // selectLayoutMode: [],
            select: [],
            select1: [],
            select2: [],
            select3: [],//节假日规则
            form: {
                attRdsfHircompany: '',
                attRdsfHircompanyDis: '',
                attRdsfName: '',
                attRdsfHolidayrule: '',//节假日规则
                attRdsfPeriodtype: '',
                attRdsfPeriod: '',
                attRdsfStartdate: '',
                attRdsfR01Dis: '',
                attRdsfR01: '',
            },
            page: 1,
            sihfpcyAreaName: '',
            // 点击给考核模板弹窗传参调接口
            params: {
                _mt:  this.$global.mt+'RecruiteInterviewert.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            ruleValidate: {
                attRdsfHircompany: [
                    { required: true, message: '请选择公司', trigger: 'change' },
                ],
                attRdsfName: [
                    { required: true, message: '请输入轮次名称', trigger: 'blur' },
                ],
                attRdsfPeriodtype: [
                    { required: true, message: '请选择轮次周期类型', trigger: 'change' },
                ],
                attRdsfHolidayrule: [
                    { required: true, message: '请选择节假日类型', trigger: 'change' }
                ],
                attRdsfPeriod: [
                    { required: true, message: '请输入轮次周期', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
                attRdsfStartdate: [
                    { required: true, message: '请选择轮次开始时间', trigger: 'change' },
                ],
            },
            openPickUser: false,
            num: 0,
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    components: {
        searchEmpMaster,
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getdata (id) {
            if (id) {
                const t = this
                const params = {
                    _mt:  this.$global.mt+'AttendRoundshift.getById',
                    id: id,
                    logType: '根据id查询',
                    funId: '1'
                }
                getDataLevelUserLogin(params).then((res) => {
                    if (isSuccess(res, t)) {
                        t.form = res.data.content[0];
                        t.$emit('getCompanyId', t.form.attRdsfHircompany);//将公司id传递给父组件
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        save () {
            const t = this
            const data = deepCopy(t.form)
            data._mt =  this.$global.mt+'AttendRoundshift.addOrUpd'
            data.logType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            for (let i = 1; i < 32; i++) {
                if (i < 10) i = '0' + i
                if (i <= Number(data.attRdsfPeriod)) {
                    if (!data['attRdsfR' + i]) {
                        t.$Modal.warning({
                            title: this.$t('reminder.remind'),
                            content: '请选择轮次' + i,
                        })
                        return
                    }
                } else {
                    delete data['attRdsfR' + i + 'Dis']
                    delete data['attRdsfR' + i]
                }
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    if (t.id) data.id = t.id
                    //            if (t.logType === '修改') {
                    //              data.id = t.id
                    //            } else {
                    //              if(data.id) delete data.id
                    //            }
                    if (data.createTime) delete data.createTime
                    if (data.createBy) delete data.createBy
                    if (data.deleteFlag) delete data.deleteFlag
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: '保存成功',
                                })
                                this.$emit('newdata', res.data.content[0])
                                t.id = Number(res.data.content[0].id)
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                this.$emit('setId', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        t.isSpin = false
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        //              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    })
                }
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'attRdsfPeriodtype,attRdsfStartdateByMonth,attRdsfStartdateByWeek,rdsfholidayrule',
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
        clear () {
            let t = this
            t.form = {
                attRdsfHircompany: '',
                attRdsfHircompanyDis: '',
                attRdsfName: '',
                attRdsfPeriodtype: '',
                attRdsfHolidayrule: '',
                attRdsfPeriod: '',
                attRdsfStartdate: '',
                attRdsfR01Dis: '',
                attRdsfR01: '',
            }
        },
        /**
         * 选择班次
         */
        pickUserData (num) {
            const t = this;
            if (!t.form.attRdsfHircompany) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择公司',
                })
                return
            }
            t.num = num
            t.openPickUser = true;
            //        t.$refs.searchEmpMaster.getData();
        },
        closeEmp () {
            const t = this
            t.openPickUser = false
        },
        inputEmp (row, numm) {
            const t = this
            numm = numm + ''
            numm.length === 1 ? numm = '0' + numm : numm
            //        console.log('numm---22', numm);
            t.form['attRdsfR' + numm + 'Dis'] = row.attShifName;
            t.form['attRdsfR' + numm] = row.id;
        },
        clearUserid (numm) {
            const t = this
            numm = numm + ''
            numm.length === 1 ? numm = '0' + numm : numm
            t.form['attRdsfR' + numm + 'Dis'] = '';
            t.form['attRdsfR' + numm] = '';
        },
        // 轮次周期类型改变
        selChange (type) {
            if (type === 'byWeek') {
                this.form.attRdsfPeriod = '7'
            } else {
                this.form.attRdsfPeriod = ''
            }
        },
        /*
       *  弹出选择
       */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.searchType = type
            switch (type) {
                case 'attRdsfHircompany':
                    t.dataParame = {
                    }
                    t.modiaContent = 'org-org-std'
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.searchType) {
                case 'attRdsfHircompany':
                    t.setData(t.searchType, t.searchType + 'Dis', row.id, row.unitsName)
                    break
            }
        },
        setData (searchType, searchTypeDis, NewId, name) {
            this.form[searchType] = NewId
            this.form[searchTypeDis] = name
            console.log(111, this.form)
        },
        dbPost (searchType) {
            this.form[searchType] = ''
            this.form[searchType + 'Dis'] = ''
            console.log(222, this.form)
        },
    },
}
</script>
<style lang="scss" scoped>
.option-main {
    position: relative;
    height: 500px;
    overflow: scroll;
    .btn {
        float: right;
        margin-right: 26px;
    }
}
</style>
