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
          <Col span="11" >
            <FormItem label="审批步骤" prop="aprdStepidDis">
              <Input v-model="formValidate.aprdStepidDis" placeholder="审批步骤"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="审批人" prop="aprdApprover">
              <Input v-model="formValidate.aprdApprover" placeholder="审批人"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="审批时间" prop="aprdAprvtime">
              <Input v-model="formValidate.aprdAprvtime" placeholder="审批时间"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="审批结论" prop="aprdAprvresult">
              <Input v-model="formValidate.aprdAprvresult" placeholder="审批结论"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="审批意见" prop="aprdAprvopinion">
              <Input v-model="formValidate.aprdAprvopinion" placeholder="审批意见"></Input>
            </FormItem>
          </Col>
        </Row>

       <!-- <Row>
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
          <Col span="22" >
          <FormItem label='备注' prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseCountry.countryCode3Dis')"></Input>
          </FormItem>
          </Col>
        </Row>-->
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
   <!-- <autoSearchtable
      v-if="showModal"
      @closeUp="closeModal"
      :modiaContent=modiaContent
      :dataParame=dataParame
      dataType="row"
      @changeinput="changeinput1"
      urlType="loginNew">
    </autoSearchtable>-->
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
          aprdStepidDis: '',
          aprdApprover: '',
          aprdAprvtime: '',
          aprdAprvresult: '',
          aprdAprvopinion: '',
        },
        ruleValidate: {
//          empNewhireEmpno: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empedSdate: [
//            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
//          ],
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
//      this.getSelect()
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
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
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
