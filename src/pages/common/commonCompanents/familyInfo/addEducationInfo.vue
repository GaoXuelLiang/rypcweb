<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" style="height: 450px;overflow-y: auto" :rules="ruleValidate" :label-width="135" :disabled="logType === this.$t('button.view')">
          <Col span="11" >
          <FormItem label=" 成员关系" prop="empnhfmRelation">
            <Select v-model="formValidate.empnhfmRelation" placeholder=" 成员关系" >
              <Option :value="item.paramCode" v-for="(item,index) in selectType1" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="姓名" prop="empnhfmCname">
            <!--<Select v-model="formValidate.empnhfmCname"   placeholder="姓名" >-->
              <!--<Option :value="item.paramCode" v-for="(item,index) in selectType2" :key="index">{{item.paramInfoCn}}</Option>-->
            <!--</Select>-->
            <Input v-model="formValidate.empnhfmCname" placeholder="姓名"></Input>
          </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="证件类型" prop="empnhfmIdtype">
            <Select v-model="formValidate.empnhfmIdtype"   placeholder="证件类型" @on-change="selectVal">
              <Option :value="item.paramCode" v-for="(item,index) in selectType2" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="证件号码" prop="empnhfmIdno">
              <Input v-model="formValidate.empnhfmIdno" placeholder="证件号码"  ></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="性别" prop="empnhfmGender">
              <Select v-model="formValidate.empnhfmGender"   placeholder="性别" >
                <Option :value="item.paramCode" v-for="(item,index) in selectType3" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="出生日期" prop="empnhfmBirthdate">
              <DatePicker type="date" placeholder="出生日期" style="width: 100%" v-model="formValidate.empnhfmBirthdate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="联系电话" prop="empnhfmPhone">
              <Input v-model="formValidate.empnhfmPhone" placeholder="联系电话"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="婚育状况" prop="empnhfmMarriage">
              <Select v-model="formValidate.empnhfmMarriage"   placeholder="婚育状况" >
                <Option :value="item.paramCode" v-for="(item,index) in selectType4" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="政治面貌" prop="empnhfmPolitical">
              <Select v-model="formValidate.empnhfmPolitical"   placeholder="政治面貌" >
                <Option :value="item.paramCode" v-for="(item,index) in selectType5" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="国籍" prop="empnhfmCuntry">
              <Select v-model="formValidate.empnhfmCuntry" placeholder="国籍" >
                <Option :value="item.id" v-for="(item,index) in selectType6" :key="index">{{item.countryCname}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="居住地址" prop="empnhfmAddress">
              <Input v-model="formValidate.empnhfmAddress" placeholder="居住地址"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="邮编" prop="empnhfmZip">
            <Input v-model="formValidate.empnhfmZip" placeholder="邮编"></Input>
          </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="工作单位" prop="empnhfmCompany">
              <Input v-model="formValidate.empnhfmCompany" placeholder="工作单位"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="职务" prop="empnhfmPost">
            <Input v-model="formValidate.empnhfmPost" placeholder="职务"></Input>
          </FormItem>
          </Col>
<!--          <Col span="22" >-->
<!--          <FormItem label='备注' prop="comment">-->
<!--            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseCountry.countryCode3Dis')"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
          <Col span="22" >
          <Row type="flex" justify="end">
            <FormItem>
<!--              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
              <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
      </Form>
    </div>
    <autoSearchtable
      v-if="showModal"
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  import pubValid from '../../../../lib/pub_valid'

  export default {
    data() {
      return {
        isSpin: false,
        showModal: false,
        modiaContent: 'org-org-std',
        dataParame: {},
        formValidate: {
//          "雇员ID
          empnhfmDataid: '',
//          成员关系
          empnhfmRelation: '',
//          姓名
          empnhfmCname: '',
//          证件类型
          empnhfmIdtype: '',
//          证件号码
          empnhfmIdno: '',
//          性别
          empnhfmGender: '',
//          出生日期
          empnhfmBirthdate: '',
//          联系电话
          empnhfmPhone: '',
//          婚育状况
          empnhfmMarriage: '',
//          政治面貌
          empnhfmPolitical: '',
//          国籍
          empnhfmCuntry: '',
//          居住地址
          empnhfmAddress: '',
//          邮编
          empnhfmZip: '',
//          工作单位
          empnhfmCompany: '',
//          职务
          empnhfmPost: '',
        },
        ruleValidate: {
          empnhfmDataid: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empnhfmRelation: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empnhfmCname: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
//          empnhfmIdtype: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmIdno: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
          empnhfmGender: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
//          empnhfmBirthdate: [
//            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmPhone: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmMarriage: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmPolitical: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmCuntry: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmAddress: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmZip: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmCompany: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhfmPost: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
        },
        selectType1: [],
        selectType2: [],
        selectType3: [],
        selectType4: [],
        selectType5: [],
        selectType6: [],
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      flowInfo: Object,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'EmpFlowNewHireFamily.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
          }
        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          // selectType,degreelevel,schooltype,learnstyle,yseno
          typeCode: 'relationship,idtype,gender,marrystatus,political',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectType1 = res.data.content[0].value[0].paramList
            t.selectType2 = res.data.content[0].value[1].paramList
            t.selectType3 = res.data.content[0].value[2].paramList
            t.selectType4 = res.data.content[0].value[3].paramList
            t.selectType5 = res.data.content[0].value[4].paramList
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseCountry.getSelectValue',
                data: '{}',
                logType: '国家查询',
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.selectType6 = res.data.content[0].value
                }
              }).catch(() => {
//                this.$Modal.error({
//                  title: this.$t('reminder.err'),
//                  content: this.$t('reminder.errormessage'),
//                })
              })
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data._mt =  this.$global.mt+'EmpFlowNewHireFamily.addOrUpd'
        // data.empNewhireFlowid = t.flowInfo.flowId
        // data.empNewhireStepid = t.flowInfo.stepId
        data.empnhfmDataid = t.flowInfo.pkValue
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
           if (data[dat] === '') {
             delete data[dat]
           }
        }
        if (data.empnhfmBirthdate !== undefined) {
          data.empnhfmBirthdate = data.empnhfmBirthdate === '' ? '' : new Date(data.empnhfmBirthdate).format('yyyy-MM-dd')
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
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
//              this.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
            })
          }
        })
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
      /*
      * 弹出选择
      * */
      selectOpen() {
        const t = this
        t.showModal = true
      },
      clearData() {
        const t = this
        t.form.concompUnitDis = ''
        t.form.concompUnit = ''
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        t.form.concompUnitDis = row.unitsName
        t.form.concompUnit = row.id
      },
      // changeOut() {
      //   console.log(111)
      //   console.log(pubValid.val_iden())
      //   let idcard = this.formValidate.empnhfmIdno
      //   if (idcard.length === 18) {
      //     if (idcard.substr(16, 1) % 2 === 1) {
      //       console.log('man')
      //     } else {
      //       console.log('woman')
      //     }
      //   }
      // },
      selectVal(val) {
        this.formValidate.empnhfmGender = ''
        this.formValidate.empnhfmBirthdate = ''
        this.formValidate.empnhfmIdno = ''
      },
    },
    watch: {
      /// 01id
      'formValidate.empnhfmIdno' : {
        handler(newVal, oldVal) {
          let idcard = newVal
          let date = newVal
          if (this.formValidate.empnhfmIdtype === '01id') {
            if (idcard.length === 18) {
              if (idcard.substr(16, 1) % 2 === 1) {
                this.formValidate.empnhfmGender = '01male'
              } else {
                this.formValidate.empnhfmGender = '02female'
              }
              this.formValidate.empnhfmBirthdate = date.substring(6,14)
            }
          }
        },
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
