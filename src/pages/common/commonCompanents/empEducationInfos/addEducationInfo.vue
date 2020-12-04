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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135" :disabled="logType === this.$t('button.view')">
        <Row>
<!--          <Col span="11" >-->
<!--          <FormItem label="员工工号" prop="empNewhireEmpno">-->
<!--            <Input v-model="formValidate.empNewhireEmpno" placeholder="员工工号"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
          <Col span="11" >
          <FormItem label="学历" prop="empedQualifications">
            <Select v-model="formValidate.empedQualifications"   placeholder="学历" >
              <Option :value="item.paramCode" v-for="(item,index) in education1" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="学位" prop="empedDegree">
              <Select v-model="formValidate.empedDegree"   placeholder="学位" >
                <Option :value="item.paramCode" v-for="(item,index) in education2" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="国家" prop="empedCuntry">
              <Select v-model="formValidate.empedCuntry"   placeholder="国家" >
                <Option :value="item.id" v-for="(item,index) in education6" :key="index">{{item.countryName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="院校类型" prop="empedSchooltype">
            <Select v-model="formValidate.empedSchooltype"   placeholder="院校类型" >
              <Option :value="item.paramCode" v-for="(item,index) in education3" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col span="11" >
            <FormItem label="学校" prop="empedSchool">
              <Input v-model="formValidate.empedSchool" placeholder="学校"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="专业" prop="empedSpecialty">
            <Input v-model="formValidate.empedSpecialty" placeholder="专业"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>


          <Col span="11" >
            <FormItem label="学习方式" prop="empedLearntype">
              <Select v-model="formValidate.empedLearntype"   placeholder="学习方式" >
                <Option :value="item.paramCode" v-for="(item,index) in education4" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="开始时间" prop="empedSdate">
            <DatePicker type="date" placeholder="开始时间." style="width: 100%" v-model="formValidate.empedSdate"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="结束时间" prop="empedEdate">
              <DatePicker type="date" placeholder="结束时间." style="width: 100%" v-model="formValidate.empedEdate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label="是否第一学历" prop="empedIsfirstqua">
            <!--<Select v-model="formValidate.empedIsfirstqua"   placeholder="是否第一学历" >-->
            <!--<Option :value="item.paramCode" v-for="(item,index) in education5" :key="index">{{item.paramInfoCn}}</Option>-->
            <!--</Select>-->
            <RadioGroup v-model="formValidate.empedIsfirstqua" type="button" size="small">
              <Radio label="1">
                <span>是</span>
              </Radio>
              <Radio label="0">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="是否最高学历" prop="empedIshighest">
              <!--<Select v-model="formValidate.empedIshighest"   placeholder="是否最高学位" >-->
                <!--<Option :value="item.paramCode" v-for="(item,index) in education5" :key="index">{{item.paramInfoCn}}</Option>-->
              <!--</Select>-->
              <RadioGroup v-model="formValidate.empedIshighest">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" >
          <FormItem label='备注' prop="empedComment">
            <Input v-model="formValidate.empedComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" >
          <Row type="flex" justify="end">
            <FormItem>
<!--              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
              <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        showModal: false,
        modiaContent: 'org-org-std',
        dataParame: {},
        formValidate: {
          empNewhireEmpno: '',
          empedQualifications: '',
          empedDegree: '',
          empedEducationlevel: '',
          empedCuntry: '1127',
          empedSchooltype: '',
          empedSchool: '',
          empedSpecialty: '',
          empedLearntype: '0200',
          empedSdate: '',
          empedEdate: '',
          empedIsfirstqua: '1',
          empedIshighest: '1',
          empedComment: '',
        },
        ruleValidate: {
          empNewhireEmpno: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedQualifications: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedDegree: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedEducationlevel: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedCuntry: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedSchooltype: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedSchool: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
//          empedSpecialty: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
          empedLearntype: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedSdate: [
            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
          ],
          empedEdate: [
            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
          ],
          empedIsfirstqua: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empedIshighest: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        },
        education1: [],
        education2: [],
        education3: [],
        education4: [],
        education5: [],
        education6: [],
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
          _mt:  this.$global.mt+'EmpNewhireEducation.getById',
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
          // education,degreelevel,schooltype,learnstyle,yseno
          typeCode: 'education,degreelevel,schooltype,learnstyle,yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.education1 = res.data.content[0].value[0].paramList
            t.education2 = res.data.content[0].value[1].paramList
            t.education3 = res.data.content[0].value[2].paramList
            t.education4 = res.data.content[0].value[3].paramList
            t.education5 = res.data.content[0].value[4].paramList
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseCountry.getSelectValue',
                data: '{}',
                logType: '国家查询',
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.education6 = res.data.content[0].value
                }

                t.benchpoststatus.unshift(
                  {
                    postbsStatus: '0200',
                    paramInfoCn: '全日制',
                  }, {
                    postbsStatus: '1127',
                    paramInfoCn: '中国',
                  },
                )
              }).catch(() => {
//                this.$Modal.error({
//                  title: this.$t('reminder.err'),
//                  content: this.$t('reminder.errormessage'),
//                })
              })
          }
        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data._mt =  this.$global.mt+'EmpNewhireEducation.addOrUpd'
        data.empNewhireFlowid = t.flowInfo.flowId
        data.empNewhireStepid = t.flowInfo.stepId
        data.empNewhireDataid = t.flowInfo.pkValue
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
           if (data[dat] === '') {
             delete data[dat]
           }
        }
        if (data.empedEdate !== undefined) {
          data.empedEdate = data.empedEdate === '' ? '' : new Date(data.empedEdate).format('yyyy-MM-dd')
        }
        if (data.empedSdate !== undefined) {
          data.empedSdate = data.empedSdate === '' ? '' : new Date(data.empedSdate).format('yyyy-MM-dd')
        }
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
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
