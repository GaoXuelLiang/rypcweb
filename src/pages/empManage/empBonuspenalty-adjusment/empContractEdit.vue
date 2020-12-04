<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon size="16" style="margin-right: 11px;" type="ios-bookmark"></Icon>&nbsp;{{logType}}
        </div>
        <Button @click="handleReset" type="text">
          <Icon size="20" type="md-close"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 480px;overflow-y: auto;">
          <Form :disabled="logType === $t('button.view') ? true : false" :rules="ruleValidate" :label-width="120" :model="form" ref="form">
            <i-col span="11">
              <FormItem label="员工姓名" prop="empctNameDis">
                <Input v-model="form.empctNameDis" disabled />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="员工工号" prop="empctWorkNoDis">
                <Input v-model="form.empctWorkNoDis" :disabled="ind == 1"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="雇佣公司" prop="empctHirecompanyDis">
                <Input v-model="form.empctHirecompanyDis" @on-click="openTable('org-org-std')"  :disabled="ind == 1"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="部门" prop="empctDeptDis">
                <Input v-model="form.empctDeptDis" @on-click="openTable('org-department-std')"  :disabled="ind == 1"/>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同主体公司" prop="empctMaincompDis">
                <Input v-model="form.empctMaincompDis" @on-click="openTable('org-conComp-std')" />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同签订类型" prop="empctSigntype">
                <Select v-model="form.empctSigntype" disabled>
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus0" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同编号" prop="empctContractno" v-if="logType === '查看'">
                <Input v-model="form.empctContractno"  />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同期限类别" prop="empctContracttype">
                <Select v-model="form.empctContracttype" disabled>
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus1" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同期限" prop="empctContractperiod">
                <Select v-model="form.empctContractperiod" disabled>
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus2" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="是否退休返聘" prop="empctIsrehire">
                <Select v-model="form.empctIsrehire" disabled>
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus3" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同类别" prop="empctCategory">
                <Select v-model="form.empctCategory" disabled>
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus5" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同开始日" prop="empctContractsdate">
                <DatePicker type="date" placeholder="合同开始日" :editable="false" v-model="form.empctContractsdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同到期日" prop="empctContractedate">
                <DatePicker type="date" placeholder="合同到期日" :editable="false" v-model="form.empctContractedate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="合同工作时间" prop="empctContractworktime">
                <Select v-model="form.empctContractworktime" :disabled="ind == 1">
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus4" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" v-if="logType === '查看'">
              <FormItem label="合同到期通知天数" prop="empctContractprom">
                <Select v-model="form.empctContractprom">
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus6" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" v-if="logType === '查看'">
              <FormItem label="试用期期限" prop="empctContractprom">
                <Select v-model="form.empctProbation">
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus7" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" v-if="logType === '查看'">
            <FormItem label="试用开始日期" prop="empctProbationSdate">
              <Input v-model="form.empctProbationSdate" />
            </FormItem>
          </i-col>
            <i-col span="11" v-if="logType === '查看'">
            <FormItem label="试用到期日" prop="empctProbationdate">
              <Input v-model="form.empctProbationdate" />
            </FormItem>
          </i-col>
            <i-col span="11" v-if="logType === '查看'">
              <FormItem label="试用到期通知天数" prop="empctProbationprom">
                <Select v-model="form.empctProbationprom">
                  <Option :value="item.paramCode" v-for="(item,index) in Empstatus6" :key="index">{{item.paramInfoCn}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="11" v-if="logType === '查看'">
              <FormItem label="转正日期" prop="empctProbationTranferdate">
                <Input v-model="form.empctProbationTranferdate" />
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="生效日期" prop="empctSdate">
                <DatePicker type="date" placeholder="生效日期" :editable="false" v-model="form.empctSdate" style="width: 100%" :disabled="ind == 1"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="失效日期" prop="empctEdate">
                <DatePicker type="date" placeholder="失效日期" :editable="false" v-model="form.empctEdate" style="width: 100%" :disabled="ind == 1"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="22">
              <FormItem :label="$t('lang_employee.empContractList.empctComment')" prop="empctComment">
                <Input :autosize="{minRows: 2,maxRows: 5}" type="textarea" v-model="form.empctComment"  />
              </FormItem>
            </i-col>
          </Form>
        </Row>
        <Row>
          <Col span="21" offset="1" style="text-align: right">
            <Button @click="handleSubmit" type="primary" style="margin-left: 8px">保存</Button>
          </Col>
        </Row>
      </div>
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
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        ind: 0,
        form: {},
        Empstatus0: [],
        Empstatus1: [],
        Empstatus2: [],
        Empstatus3: [],
        Empstatus4: [],
        Empstatus5: [],
        Empstatus6: [],
        Empstatus7: [],
        showModal: false,
        modiaContent: '',
        dataParame: {},
        ruleValidate: {
          empctHirecompanyDis: [
            { required: true, message: '请输入雇佣公司', trigger: 'blur' },
          ],
          empctDeptDis: [
            { required: true, message: '请输入部门', trigger: 'blur' },
          ],
          empctMaincompDis: [
            { required: true, message: '请输入合同主体公司', trigger: 'blur' },
          ],
          empctContractsdate: [
            { required: true, type: 'date', message: '请输入合同开始日', trigger: 'blur' },
          ],
          empctContractedate: [
            { required: true, type: 'date', message: '请输入合同到期日', trigger: 'blur' },
          ],
          empctSdate: [
            { required: true, type: 'date', message: '请输入生效日期', trigger: 'blur' },
          ],
          empctEdate: [
            { required: true, type: 'date', message: '请输入失效日期', trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
//      setIndex: Number,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id, ind) {
        const t = this
        t.ind = ind
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'EmpContract.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.form = res.data.content[0]
            if (t.logType === '修改') {
              t.form.empctSigntype = '03upd'
              t.form.empctContracttype = '02nonfixedperiod'
              t.form.empctContractperiod = '99'
              t.form.empctIsrehire = '1'
              t.form.empctCategory = '02service'
              t.form.empctComment = ''
              delete t.form.createBy
              delete t.form.createTime
              delete t.form.deleteFlag
            }
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
          // 合同签订类型 合同期限类型 合同期限 是否退休返聘 合同工作时间 合同类型 合同到期通知天数 试用期限
          typeCode: 'contract_signtype,contrpertype,contperiod,yesno,worktimetype,contractcategary,noticedays,probperiod',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Empstatus0 = res.data.content[0].value[0].paramList
            t.Empstatus1 = res.data.content[0].value[1].paramList
            t.Empstatus2 = res.data.content[0].value[2].paramList
            t.Empstatus3 = res.data.content[0].value[3].paramList
            t.Empstatus4 = res.data.content[0].value[4].paramList
            t.Empstatus5 = res.data.content[0].value[5].paramList
            t.Empstatus6 = res.data.content[0].value[6].paramList
            t.Empstatus7 = res.data.content[0].value[7].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        const t = this
        t.$emit('closeUp')
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.form)
        data.logType = t.logType
        data.id = t.id
        if (t.ind === 1) {
          data._mt =  this.$global.mt+'EmpContract.updContractcompany'
        } else {
          data._mt =  this.$global.mt+'EmpContract.updCategory'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.empctContractsdate !== undefined) {
          data.empctContractsdate = new Date(data.empctContractsdate).format('yyyy-MM-dd')
        }
        if (data.empctContractedate !== undefined) {
          data.empctContractedate = new Date(data.empctContractedate).format('yyyy-MM-dd')
        }
        if (data.empctSdate !== undefined) {
          data.empctSdate = new Date(data.empctSdate).format('yyyy-MM-dd')
        }
        if (data.empctEdate !== undefined) {
          data.empctEdate = new Date(data.empctEdate).format('yyyy-MM-dd')
        }
//        console.log(data)
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.updsuccess'),
                })
                t.$emit('update', res.data.content[0])
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      /*
       * 弹出选择
      * */
      openTable(type) {
        const t = this
        t.modiaContent = type
        if (type === 'org-org-std') {
          t.dataParame = {
            unitPid: 0,
          }
        } else {
          t.dataParame = {}
        }
        t.showModal = true
      },
      clearUnit() {
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
        switch (type) {
          case 'org-org-std':
            t.form.empctHirecompanyDis = row.unitsName
            t.form.empctHirecompany = row.id
                break
          case 'org-department-std':
            t.form.empctDeptDis = row.unitsName
            t.form.empctDept = row.id
            break
          case 'org-conComp-std':
            t.form.empctMaincompDis = row.concompName
            t.form.empctMaincomp = row.id
            break
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box{
      position:relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 0px 30px 20px;
      border-radius: 11px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
      .title{
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
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .option-main{
    position: relative;
    height: 480px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 115px;
    }
    .btn1{
      position: absolute;
      bottom: 20px;
      right: 170px;
    }
  }
</style>
