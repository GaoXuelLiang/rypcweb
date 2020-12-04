<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_approval.platapprovallist.title')}}
        </p>
        <Row class="btnHeight">
          <Input class="searchInput" :placeholder="$t('lang_approval.platapprovallist.aprvNameDis')" style="width: 200px" v-model="aprvName"/>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="md-arrow-dropdown" size="18"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin: 0;"><Button style="width:56px" type="info" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" v-show="aprvStatus === '' || aprvStatus === '01draft'" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="success" v-show="aprvStatus === '02valid'"  @click="modifystatu('01draft')">{{$t('status.draft')}}</Button>
          <Button type="primary" v-show="aprvStatus === '01draft' || aprvStatus === '03invalid'" @click="modifystatu('02valid')">{{$t('status.valid')}}</Button>
          <Button type="error" v-show="aprvStatus === '02valid'" @click="modifystatu('03invalid')">{{$t('status.invalid')}}</Button>
          <!--<Button type="error" v-show="aprvStatus === '01draft' || aprvStatus === '03invalid'" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-select="selectedtable" @on-select-cancel="selectedtable"@on-sort-change="sortable"   @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" size="small" ref="selection" :columns="columns" :data="$store.state.platApproval.mainTable"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUp="closeUp" ref="update"></update>
    </transition>
    <transition name="fade">
      <update-view v-show="openUpdateView" :logType="logType" @closeUp="closeUpView" ref="updateView"></update-view>
    </transition>
    <flowchat @closeUp="close" v-show="flowchat" ref="flowchat" logType="流程图编辑"></flowchat>
    <flowchat-view @closeUp="closeView" v-show="flowchatView" ref="flowchatView" logType="流程图编辑"></flowchat-view>
  </div>
</template>
<script>
  import update from '../platApproval/platApprovalBase.vue'
  import updateView from '../platApprovalView/platApprovalBase.vue'
  import flowchat from './flowchat.vue'
  import flowchatView from './flowchatView'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'

  export default{
    name:'platApprovalListNew',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg: '<div id="noData"></div>',
        logType: '',
        statusDis: this.$t('status.valid'),
        openUpdate: false,
        openUpdateView: false,
        flowchat: false,
        flowchatView: false,
        dropdownMenuList: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'left',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvCode'),
            key: 'aprvCode',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvName'),
            key: 'aprvName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvFormtype'),
            key: 'aprvFormtypeDis',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvForm'),
            key: 'aprvFormDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvVersion'),
            key: 'aprvVersion',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('lang_approval.platapprovallist.aprvStatus'),
            key: 'aprvStatusDis',
            sortable: 'custom',
//          width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px',
                    display: params.row.aprvStatus === '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUpView(params.row.id, this.$t('button.view'))
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
                    display: params.row.aprvStatus !== '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                    },
                  },
                }, this.$t('button.y.upd')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    // marginRight: '10px',
                    display: params.row.aprvStatus !== '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.open(params.row.id, params.row.aprvForm)
                    },
                  },
                }, this.$t('lang_approval.platapprovallist.flowConfig')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    // marginRight: '5px',
                    display: params.row.aprvStatus === '01draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openView(params.row.id)
                    },
                  },
                }, '流程查看'),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        select: this.$t('status.valid'),
        name: '',
        aprvStatus: '02valid',
        aprvCode: '',
        aprvName: '',
      }
    },
    computed: {

    },
    components: {
      update,
      flowchat,
      flowchatView,
      updateView,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.aprvName = ''
        t.aprvStatus = '02valid'
        t.statusDis = this.$t('status.valid')
        t.getData(1)
        t.getSelect()
      }
    },
    methods: {
      getData(page) {
        const t = this;
        t.loading = true;
        t.isSpin = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatApproval.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          aprvStatus: t.aprvStatus,
//          aprvCode: t.aprvCode,
          aprvName: t.aprvName,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('platApproval/setMainTable', res.data.content[0].rows)
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false;
          t.isSpin = false;
        })
      },
      // 获取下拉状态
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dropdownMenuList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.leastone'),
        	})
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatApproval.delByIds',
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
        		onCancel: () => {},
        	})
        }
      },
      open(id, aprvForm) {
        const t = this
        t.$store.commit('platApproval/setIndex')
//        t.$refs.flowchat.flstepFlow = id
        t.$refs.flowchat.getListById(id)
        t.$store.commit('flowStepData/setAprvForm', aprvForm)
        t.$store.commit('platApproval/setMainId', id)
        t.flowchat = true
      },
      openView(id, aprvForm) {
        const t = this
        t.$store.commit('platApproval/setIndex')
//        t.$refs.flowchat.flstepFlow = id
        t.$refs.flowchatView.getListById(id)
        t.$store.commit('flowStepData/setAprvForm', aprvForm)
        t.$store.commit('platApproval/setMainId', id)
        t.flowchatView = true
      },
      close() {
        const t = this
        t.flowchat = false
      },
      closeView() {
        const t = this
        t.flowchatView = false
      },
      openUp(id, logType, index) {
        const t = this
        t.$store.state.platApproval.mainLogType = logType
        t.openUpdate = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$refs.update.setMainId(id)
        t.index = index
      },
      openUpView(id, logType, index) {
        const t = this
        t.$store.state.platApproval.mainLogType = logType
        t.openUpdateView = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$refs.updateView.setMainId(id)
        t.index = index
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      closeUpView() {
        const t = this
        t.openUpdateView = false
      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoName) {
        const t = this
        if (paramCode === '00all') {
          t.aprvStatus = ''
        } else {
          t.aprvStatus = paramCode
        }
        t.getData(1)
        t.statusDis = paramInfoName
      },
      // 更新数据的状态
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = this.$t('status.valid')
        } else if (state === '03invalid') {
          logType = this.$t('status.invalid')
        } else if (state === '01draft') {
          logType = this.$t('status.draft')
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'PlatApproval.modifystatus',
            logType: logType,
            status: state,
            ids: t.tableselected.toString(),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getData(1)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('lang_approval.platapprovallist.oprclosed'),
              })
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
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
  // 
  @import "../../../sass/table.scss";
  .searchInput{
    margin-right: 5px;
  }
  .ivu-btn{
    margin-right: 5px;
  }
  /deep/ .ivu-table-cell {
    padding: 0 10px;
  }
</style>
