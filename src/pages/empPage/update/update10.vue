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
            <Form class="content"
                  ref="upFormData"
                  :model="upFormData"
                  :rules="ruleValidate"
                  :label-width="135">
                <!--<Row>-->
                <!--<i-col span="10">-->
                <!--<FormItem label="开始时间" prop="empedSdate">-->
                <!--<DatePicker type="datetime" format="yyyy-MM-dd" clearable placeholder="请选择开始时间" :editable="false" v-model="upFormData.empedSdate" style="width: 223px"></DatePicker>-->
                <!--</FormItem>-->
                <!--</i-col>-->
                <!--<i-col span="10" offset="1">-->
                <!--<FormItem label="结束时间" prop="empedEdate">-->
                <!--<DatePicker type="datetime" format="yyyy-MM-dd" clearable placeholder="请选择结束时间" :editable="false" v-model="upFormData.empedEdate" style="width: 223px"></DatePicker>-->
                <!--</FormItem>-->
                <!--</i-col>-->
                <!--</Row>-->
                <Row>
                    <i-col span="10">
                        <FormItem label="地址类型"
                                  prop="empaddrType">
                            <Select v-model="upFormData.empaddrType"
                                    clearable
                                    @on-change="selChange">
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="国家"
                                  prop="empaddrCuntry">
                            <Select v-model="upFormData.empaddrCuntry"
                                    clearable>
                                <Option :value="item.id"
                                        :key="index"
                                        v-for="(item,index) in cityList">{{item.countryName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="省份"
                                  prop="empaddrProvince">
                            <span @dblclick="clearTempSet('empaddrProvince')">
                                <Input v-model="form.empaddrProvinceDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder='请选择省份'
                                       @on-click="opencompetType('empaddrProvince')" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="城市"
                                  prop="empaddrCity">
                            <span @dblclick="clearTempSet('empaddrCity')">
                                <Input v-model="form.empaddrCityDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder='请选择城市'
                                       @on-click="opencompetType('empaddrCity')" />
                            </span>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="详细地址"
                                  prop='empaddrStreet'>
                            <Input v-model="upFormData.empaddrStreet"
                                   placeholder="请输入详细地址"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-if="upFormData.empaddrType !== '01reside'">
                        <FormItem label="户口性质"
                                  prop="empaddrRegisterproperty">
                            <Select v-model="upFormData.empaddrRegisterproperty"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select2">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注"
                                  prop="empaddrComment">
                            <Input v-model="upFormData.empaddrComment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                </Row>

                <Row>
                    <i-col span="21"
                           offset="1">
                        <Row type="flex"
                             justify="end">
                            <FormItem>
                                <Button @click="handleReset"
                                        style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        :loading="isSpin"
                                        @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </Row>
                    </i-col>
                </Row>
            </Form>
        </div>
        <!-- 弹出搜索 -->
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
import validChenck from '../../../lib/pub_valid'
import { isSuccess, deepCopy } from '../../../lib/util'

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
            type: '', // 弹出搜索
            isSpin: false,
            select1: [],
            select2: [],
            cityList: [],
            id: '',
            upFormData: {
                //          empedSdate: '',
                //          empedEdate: '',
                empaddrType: '',
                empaddrCuntry: '',
                empaddrProvince: '',
                empaddrCity: '',
                empaddrStreet: '',
                empaddrComment: '',
                empaddrRegisterproperty: '',
            },
            form: {
                empaddrProvinceDis: '',
                empaddrCityDis: '',
            },
            ruleValidate: {
                //          empedSdate: [
                //            {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'},
                //          ],
                //          empedEdate: [
                //            {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'},
                //          ],
                empaddrType: [
                    { required: true, message: '请选择地址类型', trigger: 'change' },
                ],
                empaddrCuntry: [
                    { required: true, message: '请选择国家', trigger: 'change' },
                ],
                empaddrProvince: [
                    { required: true, message: '请选择省份', trigger: 'change' },
                ],
                empaddrCity: [
                    { required: true, message: '请选择城市', trigger: 'change' },
                ],
                empaddrStreet: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        logType: String,
    },
    components: {},
    mounted () {
        //      this.getSelect();
    },
    methods: {
        getData (item) {
            console.log(444444, item)
            this.upFormData = item
            this.form.empaddrProvinceDis = item.empaddrProvinceDis
            this.form.empaddrCityDis = item.empaddrCityDis
        },
        selChange (type) {
            console.log(88888, type)
            if (type === '01reside') this.upFormData.empaddrRegisterproperty = ''
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'addrtype,registerproperty',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select1 = res.data.content[0].value[0].paramList
                    t.select2 = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getCountry () {
            const t = this
            t.isSpin = true
            const data = {
                _mt:  this.$global.mt+'BaseCountry.getSelectValue',
                logType: t.$t('button.ser'),
            }
            t.cityList = []
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.cityList = res.data.content[0].value
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'EmpAddress.addOrUpd'
            data.logType = t.logType
            data.empaddrEmpid = localStorage.getItem('empId')
            //        for (const dat in data) {
            //          if (data[dat] === '') {
            //            delete data[dat]
            //          }
            //        }
            //        if (data.empedSdate !== undefined) {
            //          data.empedSdate = data.empedSdate === '' ? '' : new Date(data.empedSdate).format('yyyy-MM-dd')
            //        }
            //        if (data.empedEdate !== undefined) {
            //          data.empedEdate = data.empedEdate === '' ? '' : new Date(data.empedEdate).format('yyyy-MM-dd')
            //        }
            this.$refs.upFormData.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    if (data.createBy) delete data.createBy
                    if (data.createTime) delete data.createTime
                    if (data.deleteFlag) delete data.deleteFlag
                    if (data.updateBy) delete data.updateBy
                    if (data.updateTime) delete data.updateTime
                    if (t.logType === '修改') {
                        //              data.id = t.id
                    } else {
                        if (data.id) delete data.id
                        if (data.attShifIslateDis) delete data.attShifIslateDis
                        if (data.attShifIsearlyDis) delete data.attShifIsearlyDis
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                //                  t.$refs.upFormData.resetFields()
                                //                  t.$emit('getData', res.data.content[0])
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                            }
                            t.$emit('refresh', '10')
                            t.handleReset()
                        }
                    }).catch(() => {
                        t.isSpin = false
                        //              t.$Modal.error({
                        //                title: this.$t('reminder.err'),
                        //                content: this.$t('reminder.errormessage'),
                        //              })
                    })
                } else {
                }
            })
        },
        /*
       *  弹出选择
       */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.type = type
            switch (type) {
                case 'empaddrProvince':
                    t.dataParame = {
                        cityType: '01prov',
                        cityIsvalid: '1',
                    }
                    t.modiaContent = 'base-province-std'
                    break
                case 'empaddrCity':
                    //            if (t.form.empaddrProvinceDis === '') {
                    //              t.$Modal.warning({
                    //                title: this.$t('reminder.err'),
                    //                content: '请选择省份',
                    //              })
                    //              return
                    //            }
                    t.dataParame = {
                        cityType: '02city',
                        cityIsvalid: '1',
                        //              cityName: t.form.empaddrProvinceDis || '',
                    }
                    t.modiaContent = 'base-city-std'
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.type) {
                case 'empaddrProvince':
                    t.setData(t.type, t.type + 'Dis', row.id, row.cityName)
                    break
                case 'empaddrCity':
                    t.setData(t.type, t.type + 'Dis', row.id, row.cityName)
                    break
            }
        },
        setData (type, typeDis, NewId, name) {
            this.upFormData[type] = NewId
            this.form[typeDis] = name
            //        this.getData()
        },
        clearTempSet (type) {
            this.upFormData[type] = ''
            this.form[type + 'Dis'] = ''
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            t.upFormData = {
                empaddrType: '',
                empaddrCuntry: '',
                empaddrProvince: '',
                empaddrCity: '',
                empaddrStreet: '',
                empaddrComment: '',
                empaddrRegisterproperty: '',
            }
            t.form = {
                empaddrProvinceDis: '',
                empaddrCityDis: '',
            }
            this.$refs.upFormData.resetFields()
            this.$emit('closeUpd')
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
