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
      <Form ref="formValidate" :model="formValidate" style="height: 200px;overflow-y: auto" :rules="ruleValidate" :label-width="135" :disabled="logType === this.$t('button.view')">
          <Col span="22" >
        <FormItem label='重点工作事项' prop="prorepProject">
          <Input v-model="formValidate.prorepProject" type="textarea" :placeholder="$t('重点工作事项')"></Input>
        </FormItem>
          </Col>
          <Col span="22" >
          <FormItem label='完成情况说明' prop="prorepDesc">
            <Input v-model="formValidate.prorepDesc" type="textarea" :placeholder="$t('完成情况说明')"></Input>
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
//          完成情况说明"
          prorepDesc: '',
//          重点工作事项
          prorepProject: '',
          prorepDataid: '',
        },
        ruleValidate: {
          prorepProject: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          prorepDesc: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        },
        selectType1: [],
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      flowInfo: Object,
      roleContrl: Object,
    },
    // computed: {
    //   btnRole() {
    //     if (this.roleContrl.stepAuthLimits === '03submit' && this.roleContrl.flsdbOptauth === '02update' && this.roleContrl.thisStepState !== 'p_flowst_3' && this.roleContrl.thisStepState !== 'p_flowst_0') {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    // },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
//        t.formValidate.prorepDataid = localStorage.getItem('empId')
//        console.log(localStorage.getItem('empId'))
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ProReport.getById',
          id: id,
//          isHandover: t.isHandover,
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
//        data.prorepDataid = localStorage.getItem('empId')
        data.prorepFlowid = t.flowInfo.flowId
        data.prorepStepid = t.flowInfo.stepId
        data.prorepDataid = t.flowInfo.pkValue
        data._mt =  this.$global.mt+'ProReport.addOrUpd'
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
        console.log(data)
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
