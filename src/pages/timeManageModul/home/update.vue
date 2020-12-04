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
                <Row>
                    <i-col span="10">
                        <FormItem label="班次编号">
                            <!--  prop='attShifCode' -->
                            <Input v-model="upFormData.attShifCode"
                                   disabled
                                   placeholder="班次编号"></Input>
                        </FormItem>
                    </i-col>
                    <!-- <i-col span="10" offset="1">
            <FormItem label="班次名称" prop='attShifName'>
              <Input v-model="upFormData.attShifName" :disabled="logType ==='查看'" placeholder="请输入班次名称"></Input>
            </FormItem>
          </i-col> -->
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="公司"
                                  prop='attShifHircompany'>
                            <span @dblclick="dbPost('attShifHircompany')">
                                <Input v-model="upFormData.attShifHircompanyDis"
                                       style="width: 100%;;"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder='请选择公司'
                                       @on-click="opencompetType('attShifHircompany')" />
                            </span>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="班次名称"
                                  prop='attShifName'>
                            <Input v-model="upFormData.attShifName"
                                   :disabled="logType ==='查看'"
                                   placeholder="请输入班次名称"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row v-show="logType !=='查看'">
                    <i-col span="10">
                        <FormItem label="上班时间"
                                  prop='attShifSworktime'>
                            <TimePicker confirm
                                        format="HH:mm"
                                        v-model="upFormData.attShifSworktime"
                                        :editable='false'
                                        placeholder="请选择上班时间"
                                        style="width: 223px"></TimePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="下班时间"
                                  prop='attShifEworktime'>
                            <TimePicker confirm
                                        format="HH:mm"
                                        v-model="upFormData.attShifEworktime"
                                        :editable='false'
                                        placeholder="请选择下班时间"
                                        style="width: 223px"></TimePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row v-show="logType !=='查看'">
                    <i-col span="10">
                        <FormItem label="上班上限（分）"
                                  prop='attShifUpstime'>
                            <Input v-model="upFormData.attShifUpstime"
                                   placeholder="请输入上班上限"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="下班下限（分）"
                                  prop='attShifDownetime'>
                            <Input v-model="upFormData.attShifDownetime"
                                   placeholder="请输入下班上限"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <!--<Row>-->
                <!--<i-col span="10">-->
                <!--<FormItem label="允许迟到" prop="salpltkpIsmain">-->
                <!--<RadioGroup v-model="upFormData.attShifIslate">-->
                <!--<Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>-->
                <!--</RadioGroup>-->
                <!--</FormItem>-->
                <!--</i-col>-->
                <!--<i-col span="10" offset="1">-->
                <!--<FormItem label="允许早退" prop="salpltkpIsmain">-->
                <!--<RadioGroup v-model="upFormData.attShifIsearly">-->
                <!--<Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>-->
                <!--</RadioGroup>-->
                <!--</FormItem>-->
                <!--</i-col>-->
                <!--</Row>-->
                <Row v-show="logType !=='查看'">
                    <i-col span="10">
                        <FormItem label="午休开始时间"
                                  prop='attShifmorningoff'>
                            <TimePicker confirm
                                        format="HH:mm"
                                        v-model="upFormData.attShifmorningoff"
                                        :editable='false'
                                        placeholder="请选择午休开始时间"
                                        style="width: 223px"></TimePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="午休结束时间"
                                  prop='attShifAfternoonwork'>
                            <TimePicker confirm
                                        format="HH:mm"
                                        v-model="upFormData.attShifAfternoonwork"
                                        :editable='false'
                                        placeholder="请选择午休结束时间"
                                        style="width: 223px"></TimePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row v-show="logType !=='查看'">
                    <i-col span="10">
                        <FormItem label="下班卡开始时间"
                                  prop='attShifOutchktime'>
                            <!--<Input v-model="upFormData.attShifEarlynum"   placeholder="请输入允许迟到时间"></Input>-->
                            <TimePicker confirm
                                        format="HH:mm"
                                        v-model="upFormData.attShifOutchktime"
                                        :editable='false'
                                        placeholder="请选择下班卡开始时间"
                                        style="width: 223px"></TimePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注"
                                  prop="interviewertPscope">
                            <Input v-model="upFormData.comment"
                                   type="textarea"
                                   :disabled="logType ==='查看'"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row v-show="logType !=='查看'">
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
                         :modiaContent="modiaContent"
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
            searchType: '', // 弹出搜索
            isSpin: false,
            selectYesNo: [],
            id: '',
            upFormData: {
                attShifHircompany: '',
                attShifHircompanyDis: '',
                id: '',
                attShifCode: '',
                attShifName: '',
                attShifSworktime: '',
                attShifEworktime: '',
                attShifUpstime: '',
                attShifDownetime: '',
                //          attShifIslate: '0',
                //          attShifIsearly: '0',
                attShifmorningoff: '', //
                attShifAfternoonwork: '', // 允许迟到时间
                attShifOutchktime: '', // 允许迟到时间
                comment: '',
            },
            ruleValidate: {
                attShifHircompany: [
                    { required: true, message: '请选择公司', trigger: 'change' },
                ],
                attShifCode: [
                    { required: true, message: '请输入班次编号', trigger: 'blur' },
                ],
                attShifName: [
                    { required: true, message: '请输入班次名称', trigger: 'blur' },
                ],
                attShifSworktime: [
                    { required: true, message: '请选择上班时间', trigger: 'change' },
                ],
                attShifEworktime: [
                    { required: true, message: '请选择下班时间', trigger: 'change' },
                ],
                attShifUpstime: [
                    { required: true, message: '请输入上班上限', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
                attShifDownetime: [
                    { required: true, message: '请输入下班下限', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
                attShifmorningoff: [
                    { required: true, message: '请选择午休开始时间', trigger: 'change' },
                ],
                attShifAfternoonwork: [
                    { required: true, message: '请选择午休结束时间', trigger: 'change' },
                ],
                attShifOutchktime: [
                    { required: true, message: '请选择下班卡开始时间', trigger: 'change' },
                ],
            },
        }
    },
    props: {
        logType: String,
    },
    components: {},
    mounted () {
        this.getSelect();
    },
    methods: {
        getCode () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'AttendShift.getCode',
                logType: '获取编号',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.upFormData.attShifCode = res.data.content[0].value;
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'AttendShift.getById',
                    logType: '查询单条数据',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.upFormData = res.data.content[0];
                        //              t.upFormData.id = res.data.content[0].id;
                        t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
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
                typeCode: 'yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectYesNo = res.data.content[0].value[0].paramList
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
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'AttendShift.addOrUpd'
            data.logType = t.logType
            //        for (const dat in data) {
            //          if (data[dat] === '') {
            //            delete data[dat]
            //          }
            //        }
            this.$refs.upFormData.validate((valid) => {
                t.$nextTick(() => {
                    let tt = document.querySelectorAll('.ivu-form-item-error')
                    tt[0].querySelector('.ivu-input').focus()
                })
                if (valid) {
                    t.isSpin = true
                    if (t.logType === '修改') {
                        data.id = t.id
                    } else {
                        if (data.id) delete data.id
                        if (data.createTime) delete data.createTime
                        if (data.attShifIslateDis) delete data.attShifIslateDis
                        if (data.attShifIsearlyDis) delete data.attShifIsearlyDis
                        if (data.deleteFlag) delete data.deleteFlag
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.upFormData.resetFields()
                                t.$emit('getData', res.data.content[0])
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
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
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        //              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    })
                }
            })
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            //        t.upFormData.attShifIslate = '0';
            //        t.upFormData.attShifIsearly = '0';
            t.upFormData = {
                attShifHircompany: '',
                attShifHircompanyDis: '',
                id: '',
                attShifCode: '',
                attShifName: '',
                attShifSworktime: '',
                attShifEworktime: '',
                attShifUpstime: '',
                attShifDownetime: '',
                attShifmorningoff: '',
                attShifAfternoonwork: '', // 允许迟到时间
                attShifOutchktime: '', // 允许迟到时间
                comment: '',
            }
            this.$refs.upFormData.resetFields()
            this.$emit('closeUpd')
        },
        /*
       *  弹出选择
       */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.searchType = type
            switch (type) {
                case 'attShifHircompany':
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
                case 'attShifHircompany':
                    t.setData(t.searchType, t.searchType + 'Dis', row.id, row.unitsName)
                    break
            }
        },
        setData (searchType, searchTypeDis, NewId, name) {
            this.upFormData[searchType] = NewId
            this.upFormData[searchTypeDis] = name
        },
        dbPost (searchType) {
            this.upFormData[searchType] = ''
            this.upFormData[searchType + 'Dis'] = ''
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
