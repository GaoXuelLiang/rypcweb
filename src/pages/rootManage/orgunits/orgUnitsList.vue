﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
        {{$t('lang_organization.orgframe.title1')}}
        </p>
<!--        <Row>-->
<!--          <Input :placeholder="$t('lang_organization.orgframe.unitCodeInp1')" style="width: 200px" v-model="unitCode"/>-->
<!--          <Input :placeholder="$t('lang_organization.orgframe.compCOrENameInp')" style="width: 200px" v-model="compFnameCnDis"/>-->
<!--          <span style="margin: 0;"><Button type="primary"  @click="getData(1)">{{$t('button.ser')}}</Button></span>-->
<!--          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->

<!--          &lt;!&ndash;<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>&ndash;&gt;-->
<!--        </Row>-->
        <Row class="btnHeight">
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" :no-data-text="noDataImg" @on-select-cancel="selectedtable" :loading='loading' :height="tableheight" :current="page" @on-sort-change="sortable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  size="small" stripe ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
    <update v-show="openUpdate" :id="updateId" ref="update" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"></update>
    </transition>
  </div>
</template>
<script>
  import update from './updOrgUnits'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'

  export default{
    name: 'orgUnitsList',
    data() {
      return {
        noDataImg: '<div id="noData"></div>',
        loading:false,
        tableheight: document.body.offsetHeight - 250,
        value: '',
        isBtn:true,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_organization.orgframe.unitCode1'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgframe.compFnameCnDis'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_organization.orgframe.compSnameCnDis'),
            key: 'compFnameEnDis',
          },
          // {
          //   title: this.$t('lang_organization.orgframe.compFnameEnDis'),
          //   key: 'compSnameCnDis',
          // },
          // {
          //   title: this.$t('lang_organization.orgframe.compSnameEnDis'),
          //   key: 'compSnameEnDis',
          // },
          {
            title: this.$t('lang_organization.orgframe.validdate'),
            key: 'validdate',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'))
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'unitCode',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1',
        logType: this.$t('button.ser'),
        unitCode: '',
        compFnameCnDis: '',
      }
    },
    computed: {

    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    components: {
      update,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.unitCode = ''
        t.compFnameCnDis = ''
        t.getData(1)
      }
    },
    methods: {
      getData(page) {
        const t = this
        t.loading = true
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'OrgUnits.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '反查查询',
          unitCode: t.unitCode,
          compFnameCnDis: t.compFnameCnDis,
          id: pubsource.clientId,
          unitPid: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].total
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false
        })
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
      changeinput(name, id) {
        const t = this
        t.funPidDis = name
        t.funPid = id
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
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
             title: this.$t('reminder.remind'),
             content: this.$t('reminder.confirmdelete'),
             onOk: () => {
               getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgUnits.deleteByIds',
          funId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected.toString(),
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.$refs.update.formValidate.unitCode = ''
        t.$refs.update.formValidate.compSnameCnDis = ''
        t.$refs.update.formValidate.compSnameEnDis = ''
        t.$refs.update.formValidate.compFnameCnDis = ''
        t.$refs.update.formValidate.compFnameEnDis = ''
        t.$refs.update.formValidate.unitBkdesc = ''
        t.$refs.update.formValidate.validdate = ''
        t.$refs.update.formValidate.invdate = ''
        t.$refs.update.formValidate.invreason = ''
        t.openUpdate = false
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 0 0 10px 0px;
  }
  .margin-right-10{
    margin-right: 10px;
  }
</style>
