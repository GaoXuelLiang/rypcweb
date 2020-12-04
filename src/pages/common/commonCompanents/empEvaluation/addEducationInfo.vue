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
      <Form ref="formValidate" :model="formValidate" style="height: 400px;overflow-y: auto" :rules="ruleValidate" :label-width="135">
          <Col span="11" >
        <FormItem label='专业技能' prop="proevaPerf">
          <Input v-model="formValidate.proevaPerf" :max="10" :min="1" :placeholder="$t('专业技能')" @on-change="onChange"></Input>
        </FormItem>
          </Col>
          <Col span="11" >
          <FormItem label='经验学识' prop="proevaExp">
            <Input v-model="formValidate.proevaExp" :max="10" :min="1" :placeholder="$t('经验学识分')" @on-change="onChange"></Input>
          </FormItem>
          </Col>
        <Col span="11" >
        <FormItem label='创新能力' prop="proevaCreate">
          <Input v-model="formValidate.proevaCreate" :max="10" :min="1" :placeholder="$t('创新能力分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='组织能力' prop="proevaOrg">
          <Input v-model="formValidate.proevaOrg" :max="10" :min="1" :placeholder="$t('组织能力分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='工作态度' prop="proevaAttitude">
          <Input v-model="formValidate.proevaAttitude" :max="10" :min="1" :placeholder="$t('工作态度分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='工作效率' prop="proevaEfficiency">
          <Input v-model="formValidate.proevaEfficiency" :max="10" :min="1" :placeholder="$t('工作效率分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='沟通协调' prop="proevaComm">
          <Input v-model="formValidate.proevaComm" :max="10" :min="1" :placeholder="$t('沟通协调分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='工作配合度' prop="proevaFit">
          <Input v-model="formValidate.proevaFit" :max="10" :min="1" :placeholder="$t('工作配合度分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='学习能力' prop="proevaStudy">
          <Input v-model="formValidate.proevaStudy" :max="10" :min="1" :placeholder="$t('学习能力分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='可塑性' prop="proevaPlasticity">
          <Input v-model="formValidate.proevaPlasticity" :max="10" :min="1" :placeholder="$t('可塑性分')" @on-change="onChange"></Input>
        </FormItem>
        </Col>
        <Col span="11" >
        <FormItem label='合计' prop="proevaTotal">
          <Input disabled v-model="formValidate.proevaTotal" :placeholder="$t('合计分')"></Input>
        </FormItem>
        </Col>
          <Col span="22" >
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
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

  export default {
    data() {
      return {
        isSpin: false,
        showModal: false,
        modiaContent: 'org-org-std',
        dataParame: {},
        formValidate: {
//          评分人类型
          proevaTester: '',
//          专业技能"
          proevaPerf: '',
//          经验学识
          proevaExp: '',
//          创新能力"
          proevaCreate: '',
//          组织能力
          proevaOrg: '',
//          工作态度"
          proevaAttitude: '',
//          工作效率
          proevaEfficiency: '',
//          沟通协调"
          proevaComm: '',
//          工作配合度
          proevaFit: '',
//          学习能力"
          proevaStudy: '',
//          可塑性
          proevaPlasticity: '',
//          合计
          proevaTotal: '',
          proevaDataid: '',
        },
        ruleValidate: {
          proevaPerf: [
            { required: true, message: '不能为空', trigger: 'blur' },
//            { type: 'string', min: 1, max: 2, message: '不可以超过10', trigger: 'blur' },
          ],
          proevaExp: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaCreate: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaOrg: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaAttitude: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaEfficiency: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaComm: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaFit: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaStudy: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          proevaPlasticity: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        },
        // 下拉菜单的数据
        selectType1: [],
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
          _mt:  this.$global.mt+'ProEmpeva.getById',
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
          // selectType,degreelevel,schooltype,learnstyle,yseno
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectType1 = res.data.content[0].value[0].paramList
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
//        data.proevaDataid = localStorage.getItem('empId')
        console.log(t.flowInfo.flowId, t.flowInfo.stepId, t.flowInfo.pkValue)
        data.prorepFlowid = t.flowInfo.flowId
        data.prorepStepid = t.flowInfo.stepId
        data.proevaDataid = t.flowInfo.pkValue
        data._mt =  this.$global.mt+'ProEmpeva.addOrUpd'
        if (t.logType === this.$t('button.add')) {
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
        console.log(data)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
              console.log(data)
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
//                  t.$emit('getData', res.data.content[0])
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
      // 当上面的输入框输入的时候触发并且改变总和值
      onChange() {
        const t = this.formValidate
        t.proevaTotal = +(t.proevaPerf) + +(t.proevaExp) + +(t.proevaCreate) + +(t.proevaOrg) + +(t.proevaAttitude) + +(t.proevaEfficiency) + +(t.proevaComm) + +(t.proevaFit) + +(t.proevaStudy) + +(t.proevaPlasticity)
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
