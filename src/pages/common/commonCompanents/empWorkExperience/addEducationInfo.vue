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
            <FormItem label="开始时间" prop="empnhweSdate">
              <DatePicker type="date" placeholder="开始时间" style="width: 100%" v-model="formValidate.empnhweSdate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="结束时间" prop="empnhweEdate">
              <DatePicker type="date" placeholder="结束时间" style="width: 100%" v-model="formValidate.empnhweEdate"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="工作单位" prop="empnhweComp">
              <Input v-model="formValidate.empnhweComp" placeholder="工作单位"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="工作部门" prop="empnhweDept">
              <Input v-model="formValidate.empnhweDept" placeholder="工作部门"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="工作职务/岗位" prop="empnhwePost">
              <Input v-model="formValidate.empnhwePost" placeholder="工作职务/岗位"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" >
            <FormItem label="主要业绩/成果" prop="empnhwePerformance">
              <Input v-model="formValidate.empnhwePerformance" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="主要业绩/成果"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="证明人" prop="empnhweContact">
              <Input v-model="formValidate.empnhweContact" placeholder="证明人"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="联系电话" prop="empnhwePhone">
              <Input v-model="formValidate.empnhwePhone" placeholder="联系电话"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" >
            <FormItem label="薪资" prop="empnhweSalary">
              <Input v-model="formValidate.empnhweSalary"  placeholder="薪资"></Input>
            </FormItem>
          </Col>
          <Col span="11" >
            <FormItem label="离职原因" prop="empnhweLeavereason">
              <span>
                 <Input v-model="formValidate.empnhweLeavereasonDis"  placeholder="离职原因" @on-click="selectOpen"></Input>
              </span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="22" >
          <FormItem label="备注" prop="empnhweComment">
            <Input v-model="formValidate.empnhweComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseCountry.countryCode3Dis')"></Input>
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
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        showModal: false,
        modiaContent: 'base-leave-rea',
        dataParame: {},
        formValidate: {
          empnhweSdate: '',
          empnhweEdate: '',
          empnhweComp: '',
          empnhweDept: '',
          empnhwePost: '',
          empnhwePerformance: '',
          empnhweContact: '',
          empnhwePhone: '',
          empnhweSalary: '',
          empnhweLeavereasonDis: '',
          empnhweLeavereason: '',
          empnhweComment: '',
        },
        ruleValidate: {
          empnhweSdate: [
            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
          ],
          empnhweEdate: [
            { required: true, type: 'date', message: '不能为空', trigger: 'blur' },
          ],
          empnhweComp: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
//          empnhweDept: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
          empnhwePost: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
//          empnhwePerformance: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhweContact: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhwePhone: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhweLeavereason: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
//          empnhweSalary: [
//            { required: true, message: '不能为空', trigger: 'blur' },
//          ],
        },
        education1: [],
        education2: [],
        education3: [],
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      flowInfo: Object,
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'EmpFlowNewHireWorkExp.getById',
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
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data._mt =  this.$global.mt+'EmpFlowNewHireWorkExp.addOrUpd'
        // data.empNewhireFlowid = t.flowInfo.flowId
        // data.empNewhireStepid = t.flowInfo.stepId
        data.empnhweDataid = t.flowInfo.pkValue
        data.logType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        if (data.empnhweSdate !== undefined) {
          data.empnhweSdate = data.empnhweSdate === '' ? '' : new Date(data.empnhweSdate).format('yyyy-MM-dd')
        }
        if (data.empnhweEdate !== undefined) {
          data.empnhweEdate = data.empnhweEdate === '' ? '' : new Date(data.empnhweEdate).format('yyyy-MM-dd')
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
        t.formValidate.empnhweLeavereason = ''
        t.formValidate.empnhweLeavereasonDis = ''
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        t.formValidate.empnhweLeavereasonDis = row.levaCname
        t.formValidate.empnhweLeavereason = row.id
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
