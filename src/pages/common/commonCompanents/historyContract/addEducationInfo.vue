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
      <Form ref="formValidate" :model="formValidate" style="height: 200px;overflow-y: auto" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="12" >
          <FormItem label="请选择公司名称" prop="empctHirecompanyDis">
            <span @dblclick="clearUnit">
            <Input placeholder="请选择公司名称" style="width: 293px"  v-model="formValidate.empctHirecompanyDis"
            @on-click="selectComp(1)" disabled/>
            </span>
          </FormItem>
          </Col>
          <Col span="12" >
          <FormItem label="请选择部门名称" prop="empctDeptDis" >
          <span @dblclick="clearUnit" >
            	<Input placeholder="请选择部门名称" style="width: 293px"  v-model="formValidate.empctDeptDis"
                     @on-click="selectComp(2)" disabled/>
           </span>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="合同期限类别" prop="empctContracttype">
              <Select v-model="formValidate.empctContracttype" disabled>
                <Option :value="item.paramCode" v-for="(item,index) in Empstatus1" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="合同期限" prop="empctContractperiod">
              <Select v-model="formValidate.empctContractperiod" disabled>
                <Option :value="item.paramCode" v-for="(item,index) in Empstatus2" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <Col span="12" >
          <FormItem label="合同开始日" prop="empctContractsdate">
            <DatePicker type="date" placeholder="合同开始日" style="width: 100%" v-model="formValidate.empctContractsdate" disabled></DatePicker>
          </FormItem>
          </Col>
          <Col span="12" >
          <FormItem label="合同到期日" prop="empctContractedate">
            <DatePicker type="date" placeholder="合同到期日" style="width: 100%" v-model="formValidate.empctContractedate" disabled></DatePicker>
          </FormItem>
          </Col>
        </Row>
          <Row type="flex" justify="end">
            <FormItem>
              <!--<Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
              <!--<Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>-->
            </FormItem>
          </Row>
          </Col>
      </Form>
    </div>
    <!--公司选择弹框-->
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
//          雇佣公司
          empctHirecompany: '',
//          雇佣公司
          empctHirecompanyDis: '',
//          部门
          empctDept: '',
//          部门
          empctDeptDis: '',
//          合同期限类别
          empctContracttype: '',

//          合同期限类别
          empctContracttypeDis: '',
//          合同期限
          empctContractperiod: '',
//          合同开始日
          empctContractsdate: '',
//          合同到期日
          empctContractedate: '',
        },
        ruleValidate: {
          empctHirecompanyDis: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empctDeptDis: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empctContracttype: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empctContractperiod: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          empctContractsdate: [
            { required: true, message: '不能为空' },
          ],
          empctContractedate: [
            { required: true, message: '不能为空' },
          ],
        },
        Empstatus1: [],
        Empstatus2: [],
        inde: 0,
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
          _mt:  this.$global.mt+'EmpContract.getById',
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
//          _mt:  this.$global.mt+'EmpContract.getSelectValue',
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          // selectType,degreelevel,schooltype,learnstyle,yseno
          // 获取到下拉菜单的数据的 typeCode
          typeCode: 'contrpertype,contperiod',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Empstatus1 = res.data.content[0].value[0].paramList
            t.Empstatus2 = res.data.content[0].value[1].paramList
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
        data.empctContractsdate = new Date(data.empctContractsdate).format('yyyy-MM-dd')
        data.empctContractedate = new Date(data.empctContractedate).format('yyyy-MM-dd')
        data._mt =  this.$global.mt+'EmpContract.addOrUpd'
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
//      selectOpen() {
//        const t = this
//        t.showModal = true
//      },
      /*
* 弹出选择
* */
      selectComp(ind) {
        const t = this
        if (ind === 1) {
          t.modiaContent = 'org-org-std'
          t.dataParame = {
            unitPid: 0,
          }
//          t.form.EmpComp = ''
        } else if (ind === 2) {
          t.modiaContent = 'org-department-std'
          t.dataParame = {
//          unitPid: '',
          }
        }
        t.inde = ind
        t.showModal = true
      },

      clearUnit() {
        const t = this
        t.formValidate.empctHirecompany = ''
        t.formValidate.empctHirecompanyDis = ''
        t.formValidate.empctDept = ''
        t.formValidate.empctDeptDis = ''
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
        if (t.inde === 1) {
          // 公司名称
          t.formValidate.empctHirecompanyDis = row.compFnameCnDis
          t.formValidate.empctHirecompany = row.id
        } else if (t.inde === 2) {
          // 部门
          t.formValidate.empctDeptDis = row.unitsName
          t.formValidate.empctDept = row.id
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
