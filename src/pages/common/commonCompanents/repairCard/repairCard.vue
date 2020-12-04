<template>
  <div class="table">
    <Row>
      <i-Col span="24">
        <card>
          <Row v-if="btnRole">
            <!--<Button type="primary"  @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
            <Button type="primary"  @click="pickDataTeam">{{$t('button.add')}}</Button>
            <Button type="error"    @click="deletemsg">{{$t('button.del')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <Table @on-select="selectedtable" @on-select-cancel="selectedtable"  @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
            <Page :total="total" size="small"  show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
            <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
          </Row>
        </card>
      </i-Col>
    </Row>
    <transition name="fade">
      <update v-show="openEduUpdate" :flowInfo="flowInfo" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <!--选择班组-->
    <transition name="fade">
      <searchFyteam v-show="openPickTeam" @closeUp="closeTeam" @getData="getData" :flowInfo="flowInfo" @changeinput="changeinputTeam"
                    ref="searchFyteam"></searchFyteam>
    </transition>
  </div>
</template>
<script>
  import update from './addEducationInfo'
  import searchFyteam from './searchFyteam'
  import { isSuccess, getUrlKey } from '../../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  export default{
    name: 'countryManage',
    data() {
      return {
        openPickTeam: false, // 新增弹出
        sicalcTeam: [], // 新增弹出
        sicalcTeamDis: '', // 新增弹出
        isSpin: false,
        tableheight: 200,
        logType: '',
        openEduUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: this.chlcolumns,
        data: [],
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
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                  display: this.btnRole ? 'none' : 'inline-block',
                },
                on: {
                  click: () => {
                    this.openUp(params.row.id, this.$t('button.view'), params.index)
                  },
                },
              }, this.$t('button.view')),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {
                  marginRight: '10px',
                  display: this.btnRole ? 'inline-block' : 'none',
                },
                on: {
                  click: () => {
                    this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                  },
                },
              }, this.$t('button.y.upd')),
            ])
          },
        },
        paramEmppId: '',
      }
    },
    components: {
      update,
      searchFyteam,
    },
    props: {
      chlcolumns: Array,
      clmCustomrouter: String,
      flowInfo: Object,
      roleContrl: Object,
    },
    computed: {
      btnRole() {
//        console.log(11111, this.roleContrl);

         if (this.roleContrl.stepAuthLimits === '03submit' && this.roleContrl.flsdbOptauth === '02update' && this.roleContrl.thisStepState !== 'p_flowst_3' && this.roleContrl.thisStepState !== 'p_flowst_0') {
           return true
         } else {
           return false
         }
      },
      emppId() {
        return this.$store.state.flowClmkMap.emppId
      },
    },
    watch: {
      emppId(val) {
        this.paramEmppId = val
        if (this.paramEmppId) {
          this.getData(1)
        }
      },
    },
    mounted() {
      const t = this
//      t.chlcolumns.push(t.revise)  // 隐藏修改查看
//      t.getData(1)
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
          _mt:  this.$global.mt+'ApplyAdditionaldetail.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '流程子集',
          addiDataid: t.flowInfo.pkValue,
//          addiDataid: t.$store.state.flowClmkMap.popForm.attRecName || t.$store.state.flowClmkMap.emppId,
//          addiDataid: t.paramEmppId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin = true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.isSpin = false
//          t.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
        })
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
//        console.log(t.data)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
                _mt:  this.$global.mt+'ApplyAdditionaldetail.delByIds',
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
            onCancel: () => {},
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
        if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.paramEmppId = ''
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openEduUpdate = false
      },
      // 新增弹出框start
      clearTeam() {
        const t = this
        t.sicalcTeamDis = ''
        t.sicalcTeam = ''
      },
      pickDataTeam() {
        const t = this
        const empId = this.$store.state.flowClmkMap.popForm.attRecName
        if (!empId) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请选择员工',
          })
          return
        }
        this.$refs.searchFyteam.getData(1, empId)
        this.openPickTeam = true
      },
      closeTeam() {
        const t = this
        t.openPickTeam = false
      },
      changeinputTeam(arrDis, arr) {
        const t = this
        t.sicalcTeamDis = arrDis.join(',')
        t.sicalcTeam = arr
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
