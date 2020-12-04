<template>
  <div class="table">
    <Row>
      <i-Col span="24">
        <card>
          <Row v-if="btnRole">
            <!--<Button type="primary" @click="openUp(ids == undefined ? NaN:ids ,$t('button.add'))">{{$t('button.add')}}-->
            <!--</Button>-->
            <!--<Button type="error"    @click="deletemsg">{{$t('button.del')}}</Button>-->
          </Row>

          <row class="table-form" ref="table-form">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <!--<Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"-->
            <!--@on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>-->

            <Table :columns="columns" :data="data">
              <template slot-scope="{ row, index }" slot="proevaTester">
                <Input type="text" v-model="proevaTester" v-if="editIndex === index" disabled/>
                <!--<span v-else>{{ row.name }}</span>-->
                <span v-else>{{ row.proevaTester }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaPerf">
                <Input type="text" v-model="proevaPerf" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaPerf }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaExp">
                <Input type="text" v-model="proevaExp" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaExp }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaCreate">
                <Input type="text" v-model="proevaCreate" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaCreate }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaOrg">
                <Input type="text" v-model="proevaOrg" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaOrg }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaAttitude">
                <Input type="text" v-model="proevaAttitude" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaAttitude }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaEfficiency">
                <Input type="text" v-model="proevaEfficiency" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaEfficiency }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaComm">
                <Input type="text" v-model="proevaComm" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaComm }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaFit">
                <Input type="text" v-model="proevaFit" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaFit }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaStudy">
                <Input type="text" v-model="proevaStudy" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaStudy }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaPlasticity">
                <Input type="text" v-model="proevaPlasticity" v-if="editIndex === index"/>
                <span v-else>{{ row.proevaPlasticity }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="proevaTotal">
                <Input type="text" v-model="proevaTotal" v-if="editIndex === index" disabled/>
                <span v-else>{{ row.proevaTotal }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                  <Button @click="handleSave(index)">保存</Button>
                  <Button @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                  <Button @click="handleEdit(row, index)" :disabled="row.proevaTester === '自评分数' || row.proevaTester === '领导评分'">修改</Button>
                </div>
              </template>
            </Table>
          </row>
        </card>
      </i-Col>
    </Row>
    <transition name="fade">
      <update v-show="openEduUpdate" :flowInfo="flowInfo" :id="updateId" :logType="logType" :index="index"
              @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './addEducationInfo'
  import {isSuccess, getUrlKey} from '../../../../lib/util'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../../axios/axios'

  export default {
    name: 'countryManage',
    data() {
      return {
        ids: '',
        isSpin: false,
        tableheight: 200,
        logType: '',
        openEduUpdate: false,
        updateId: NaN,
        tableselected: [],
//        name: ['自评分数', '领导评分'],
        columns: [
          {
            title: '10分制',
            slot: 'proevaTester',
            width: 89,
          },
          {
            title: '专业技能',
            slot: 'proevaPerf',
            width: 91,
          },
          {
            title: '经验学识',
            slot: 'proevaExp',
            width: 91,
          },
          {
            title: '创新能力',
            slot: 'proevaCreate',
            width: 91,
          },
          {
            title: '组织能力',
            slot: 'proevaOrg',
            width: 91,
          },
          {
            title: '工作态度',
            slot: 'proevaAttitude',
            width: 91,
          },
          {
            title: '工作效率',
            slot: 'proevaEfficiency',
            width: 91,
          },
          {
            title: '沟通协调',
            slot: 'proevaComm',
            width: 91,
          },
          {
            title: '配合度',
            slot: 'proevaFit',
            width: 77,
          },
          {
            title: '学习能力',
            slot: 'proevaStudy',
            width: 91,
          },
          {
            title: '可塑性',
            slot: 'proevaPlasticity',
            width: 77,
          },
          {
            title: '合计',
            slot: 'proevaTotal',
            width: 64,
          },
          {
            width: 64,
            title: '操作',
            slot: 'action',
          },
        ],
        data: [
          {
            proevaTester: '领导评分',
            proevaPerf: '0',
            proevaExp: '0',
            proevaCreate: '0',
            proevaOrg: '0',
            proevaAttitude: '0',
            proevaEfficiency: '0',
            proevaComm: '0',
            proevaFit: '0',
            proevaStudy: '0',
            proevaPlasticity: '0',
            proevaTotal: '0',
          }, {
            proevaTester: '领导评分',
            proevaPerf: '0',
            proevaExp: '0',
            proevaCreate: '0',
            proevaOrg: '0',
            proevaAttitude: '0',
            proevaEfficiency: '0',
            proevaComm: '0',
            proevaFit: '0',
            proevaStudy: '0',
            proevaPlasticity: '0',
            proevaTotal: '0',
          },
        ],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 评分人类型
        proevaPerf: '',  // 专业技能
        proevaExp: '',  // 经验学识
        proevaCreate: '',  // 创新能力
        proevaOrg: '',  // 组织能力
        proevaAttitude: '',  // 工作态度
        proevaEfficiency: '',  // 工作效率
        proevaComm: '',  // 沟通协调
        proevaFit: '',  // 工作配合度
        proevaStudy: '',  // 学习能力
        proevaPlasticity: '',  // 可塑性
        proevaTotal: '',  // 合计
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        revise: {
          width: 120,
          title: this.$t('button.opr'),
          key: 'action',
          fixed: 'right',
          align: 'center',
        },
      }
    },
    components: {
      update,
    },
    props: {
      chlcolumns: Array,
      clmCustomrouter: String,
      flowInfo: Object,
      roleContrl: Object,
    },
    computed: {
      btnRole() {
        if (this.roleContrl.stepAuthLimits === '03submit' && this.roleContrl.flsdbOptauth === '02update' && this.roleContrl.thisStepState !== 'p_flowst_3' && this.roleContrl.thisStepState !== 'p_flowst_0') {
          return true
        } else {
          return false
        }
      },
    },
    mounted() {
      const t = this
      t.chlcolumns.push(t.revise)
      let chlcolumns = t.chlcolumns.length
      t.getData(1)
    },
    methods: {
      refresh() {
        this.getData(1)
      },
      getData(page, value) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'ProEmpeva.getPage',
//          _mt:  this.$global.mt+'EmpFlowNewHireWorkExp.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '流程子集',
          proevaTester: '领导评分',
          proevaFlowid: t.flowInfo.flowId,
          proevaStepid: t.flowInfo.stepId,
          proevaDataid: t.flowInfo.pkValue,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin = true
        getDataLevelUserLoginNew(data).then((res) => {
//          console.log(res)
          t.ids = res.data.content[0].rows[0].id
          t.isSpin = false
          if (isSuccess(res, t)) {
            if (res.data.content[0].rows.length > 0) {
              t.data = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
          }
        }).catch(() => {
          t.isSpin = false
          // t.$Modal.error({
          //   title: this.$t('reminder.err'),
          //   content: this.$t('reminder.errormessage'),
          // })
        })
      },
      addNewArray(res) {
        const t = this
//        t.data.unshift(res)
        t.getData(1)
      },
      updateArray(res) {
        const t = this
        t.getData(1)
//        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'EmpFlowNewHireWorkExp.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
          })
        }
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openEduUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.add')) {
//          console.log(id)
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openEduUpdate = false
      },
      handleEdit(row, index) {
        this.editName = row.name
        this.proevaPerf = row.proevaPerf
        this.proevaExp = row.proevaExp
        this.proevaCreate = row.proevaCreate
        this.proevaOrg = row.proevaOrg
        this.proevaAttitude = row.proevaAttitude
        this.proevaEfficiency = row.proevaEfficiency
        this.proevaComm = row.proevaComm
        this.proevaFit = row.proevaFit
        this.proevaStudy = row.proevaStudy
        this.proevaPlasticity = row.proevaPlasticity
        this.proevaTotal = row.proevaTotal
        this.editIndex = index
      },
      handleSave(index) {
        const t = this.data[index]
        t.name = this.editName
        t.proevaPerf = this.proevaPerf
        t.proevaExp = this.proevaExp
        t.proevaCreate = this.proevaCreate
        t.proevaOrg = this.proevaOrg
        t.proevaAttitude = this.proevaAttitude
        t.proevaEfficiency = this.proevaEfficiency
        t.proevaComm = this.proevaComm
        t.proevaFit = this.proevaFit
        t.proevaStudy = this.proevaStudy
        t.proevaPlasticity = this.proevaPlasticity

        t.proevaTotal = +(t.proevaPerf) + +(t.proevaExp) + +(t.proevaCreate) + +(t.proevaOrg) + +(t.proevaAttitude) + +(t.proevaEfficiency) + +(t.proevaComm) + +(t.proevaFit) + +(t.proevaStudy) + +(t.proevaPlasticity)

//        t.proevaDataid = localStorage.getItem('empId')
        t._mt =  this.$global.mt+'ProEmpeva.addOrUpd'
        t.logType = '修改'
//        t.createBy = localStorage.getItem('empId')
        t.proevaFlowid = this.flowInfo.flowId
        t.proevaStepid = this.flowInfo.stepId
        t.proevaDataid = this.flowInfo.pkValue

        delete this.data[index].isSpin
        delete this.data[index].deleteFlag
        delete this.data[index].createBy
        delete this.data[index].createTime
        delete this.data[index].updateBy
        delete this.data[index].name


        if (t.proevaPerf > 10 || t.proevaPerf < 0 || t.proevaExp > 10 || t.proevaExp < 0 || t.proevaCreate > 10 || t.proevaCreate < 0 || t.proevaOrg > 10 || t.proevaOrg < 0 || t.proevaAttitude > 10 || t.proevaAttitude < 0 || t.proevaEfficiency > 10 || t.proevaEfficiency < 0 || t.proevaComm > 10 || t.proevaComm < 0 || t.proevaFit > 10 || t.proevaFit < 0 || t.proevaStudy > 10 || t.proevaStudy < 0 || t.proevaPlasticity > 10 || t.proevaPlasticity < 0 || isNaN(t.proevaTotal)){
          // this.$Message.error('数值评分在请输入在0-10之间')
          this.$Modal.warning({
            title: '提示',
            content: '数值评分在请输入在0-10之间',
          })
          return false
        }
          getDataLevelUserLoginNew(this.data[index]).then((res) => {
            this.$Message.success('修改成功')
            t.getData()
          })

        this.editIndex = -1
      },
      getBirthday(birthday) {
        const date = new Date(parseInt(birthday))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${month}-${day}`
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .ivu-table-cell{
    padding-left:0px !important;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
