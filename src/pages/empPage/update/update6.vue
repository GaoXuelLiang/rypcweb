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
                        <FormItem label="生效日期"
                                  prop="empbkSdate">
                            <DatePicker type="datetime"
                                        format="yyyy-MM-dd"
                                        clearable
                                        placeholder="请选择生效日期"
                                        :editable="false"
                                        disabled
                                        v-model="upFormData.empbkSdate"
                                        style="width: 223px"></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="失效日期"
                                  prop="empbkEdate">
                            <DatePicker type="datetime"
                                        format="yyyy-MM-dd"
                                        clearable
                                        placeholder="请选择失效日期"
                                        :editable="false"
                                        disabled
                                        v-model="upFormData.empbkEdate"
                                        style="width: 223px"></DatePicker>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="账号类型"
                                  prop="empbkType">
                            <Select v-model="upFormData.empbkType"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="银行名称"
                                  prop="empbkBasebank">
                            <Select v-model="upFormData.empbkBasebank"
                                    clearable>
                                <Option :value="item.paramCode"
                                        :key="index"
                                        v-for="(item,index) in select1">{{item.paramInfoName}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="开户银行"
                                  prop='empbkBank'>
                            <Input v-model="upFormData.empbkBank"
                                   placeholder="请输入开户银行"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="账号"
                                  prop='empbkAccount'>
                            <Input v-model="upFormData.empbkAccount"
                                   placeholder="请输入账号"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem label="户名"
                                  prop='empbkAccnane'>
                            <Input v-model="upFormData.empbkAccnane"
                                   placeholder="请输入户名"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21">
                        <FormItem label="备注"
                                  prop="empbkComment">
                            <Input v-model="upFormData.empbkComment"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入备注"></Input>
                        </FormItem>
                    </i-col>
                </Row>

                <!--<Row>-->
                <!--<i-col span="10">-->
                <!--<span @dblclick="clearTempSet">-->
                <!--</span>-->
                <!--<FormItem label="户名" prop='attShifCode'>-->
                <!--<Input v-model="tempSetDis" style="width: 200px;"  icon="ios-search" :readonly="true" placeholder='请选择盘点模板'  @on-click="opencompetType('tempSet')"/>-->
                <!--</FormItem>-->
                <!--</i-col>-->
                <!--</Row>-->

                <!-- <Row>
          <i-col span="10">
            <FormItem label="上班时间" prop='attShifSworktime'>
              <TimePicker confirm format="HH:mm" v-model="upFormData.attShifSworktime" :editable='false' placeholder="请选择上班时间" style="width: 223px"></TimePicker>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="下班时间" prop='attShifEworktime'>
              <TimePicker confirm format="HH:mm" v-model="upFormData.attShifEworktime" :editable='false' placeholder="请选择下班时间" style="width: 223px"></TimePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="上班上限（分）" prop='attShifUpstime'>
              <Input v-model="upFormData.attShifUpstime"   placeholder="请输入上班上限"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="下班下限（分）" prop='attShifDownetime'>
              <Input v-model="upFormData.attShifDownetime" placeholder="请输入下班上限"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="允许迟到" prop="salpltkpIsmain">
              <RadioGroup v-model="upFormData.attShifIslate">
                <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="允许早退" prop="salpltkpIsmain">
              <RadioGroup v-model="upFormData.attShifIsearly">
                <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="下班卡开始时间" prop='attShifOutchktime'>
              &lt;!&ndash;<Input v-model="upFormData.attShifEarlynum"   placeholder="请输入允许迟到时间"></Input>&ndash;&gt;
              <TimePicker confirm format="HH:mm" v-model="upFormData.attShifOutchktime" :editable='false' placeholder="请选择下班卡开始时间" style="width: 223px"></TimePicker>
            </FormItem>
          </i-col>
        </Row>-->

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
            selectYesNo: [],
            select: [],
            select1: [],
            id: '',
            upFormData: {
                //          id: '',
                empbkSdate: new Date(),
                empbkEdate: new Date('9999-12-31'),
                empbkType: '',
                empbkBasebank: '',
                empbkBank: '',
                empbkAccount: '',
                empbkAccnane: '',
                empbkComment: '',
                //          attShifIslate: '0',
                //          attShifIsearly: '0',
            },
            ruleValidate: {
                //          empbkSdate: [
                //            {required: true, message: '请选择生效日期', trigger: 'change'},
                //          ],
                //          empbkEdate: [
                //            {required: true, message: '请选择失效日期', trigger: 'change'},
                //          ],
                empbkType: [
                    { required: true, message: '请选择账号类型', trigger: 'change' },
                ],
                empbkBasebank: [
                    { required: true, message: '请选择银行名称', trigger: 'change' },
                ],
                empbkBank: [
                    { required: true, message: '请输入开户银行', trigger: 'blur' },
                ],
                empbkAccount: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                empbkAccnane: [
                    { required: true, message: '请输入户名', trigger: 'blur' },
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
            console.log(444444, item);
            this.upFormData = item
        },
        /* getData(id) {
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
         },*/
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'salacctype,banktype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    //            t.selectYesNo = res.data.content[0].value[0].paramList
                    t.select = res.data.content[0].value[0].paramList
                    t.select1 = res.data.content[0].value[1].paramList
                    console.log(6666, t.select1);
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
            data._mt =  this.$global.mt+'EmpBank.addOrUpd'
            data.logType = t.logType
            data.empbkEmpid = localStorage.getItem('empId')
            //        for (const dat in data) {
            //          if (data[dat] === '') {
            //            delete data[dat]
            //          }
            //        }
            if (data.empbkSdate !== undefined) {
                data.empbkSdate = data.empbkSdate === '' ? '' : new Date(data.empbkSdate).format('yyyy-MM-dd')
            }
            if (data.empbkEdate !== undefined) {
                data.empbkEdate = data.empbkEdate === '' ? '' : new Date(data.empbkEdate).format('yyyy-MM-dd')
            }
            this.$refs.upFormData.validate((valid) => {
                //          t.$nextTick(() => {
                //            let tt = document.querySelectorAll('.ivu-form-item-error')
                //            tt[0].querySelector('.ivu-input').focus()
                //          })
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
                            t.$emit('refresh', '6')
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
                    //            t.$nextTick(() => {
                    //              let tt = document.querySelectorAll('.ivu-form-item-error')
                    //              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                    ////              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
                    //            })
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
                case 'tempSet':
                    t.dataParame = {
                        tempSdate: 'all',
                        // tempSdate: '01edit',
                    }
                    t.modiaContent = 'talent-pub-temp'
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
                case 'tempSet':
                    t.setData(t.type, t.type + 'Dis', row.id, row.tempName, row)
                    break
            }
        },
        setData (type, typeDis, NewId, name, row) {
            this[type] = NewId
            this[typeDis] = name
            this.temModul = row
            this.getCol()
            this.getData()
        },
        clearTempSet () {
            this.tempSet = ''
            this.tempSetDis = ''
            this.tempName = ''
            this.tableselected = []
            this.temCol = []
            this.columns = []
            this.expDataTital = []
            this.data = []
            this.total = 0
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            t.upFormData = {
                empbkSdate: new Date(),
                empbkEdate: new Date('9999-12-31'),
                empbkType: '',
                empbkBasebank: '',
                empbkBank: '',
                empbkAccount: '',
                empbkAccnane: '',
                empbkComment: '',
                //          attShifIslate: '0',
                //          attShifIsearly: '0',
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
