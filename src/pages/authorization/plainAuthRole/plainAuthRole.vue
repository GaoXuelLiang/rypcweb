<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_role.adminrole.title1')}}
        </p>
        <Row class="btnHeight">
          <Input class="searchInput" :placeholder="$t('lang_role.adminrole.proleCode')" style="width: 200px" v-model="roleCode"/>
          <Input class="searchInput" :placeholder="$t('lang_role.adminrole.proleCname')" style="width: 200px" v-model="roleCname"/>
          <span style="margin: 0;"><Button type="info" :loading="isSpin" style="width:56px"
                                           @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" size="small" ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange"
                @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
          <Button size="small" shape="circle" icon="md-refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"
              @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <tree v-if="showTree" :roleName="roleName" :id="treeId" @closePower="closePower" @closePowers="closePowers"
          ref="tree"></tree>
  </div>
</template>
<script>
  import update from './addAndUpdRole'
  import tree from './tree'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess,getUrlKey} from '../../../lib/util'

  export default {
    name: 'plainAuthRole',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg: '<div id="noData"></div>',
        treeId: '',
        value: '',
        logType: '',
        showTree: false,
        openUpdate: false,
        updateId: NaN,
        selectRolegrpType: [],
        tableselected: [],
        delCheck: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.roleCode'),
            key: 'roleCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.adminrole.roleCname'),
            key: 'roleCname',
            sortable: 'custom',
          },
          // {
          //   title: this.$t('lang_role.adminrole.roleEname'),
          //   key: 'roleEname',
          //   sortable: 'custom',
          // },
          {
            title: this.$t('lang_role.adminrole.roleTypeDis'),
            key: 'roleTypeDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.adminrole.validDis'),
            key: 'validDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_role.adminrole.invdate'),
            key: 'invdate',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 150,
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
                  on: {
                    click: () => {
                      this.power(params.row.id, params.row.roleCname)
                    },
                  },
                }, this.$t('lang_user.rootrole.assauth')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        roleCode: '',
        roleCname: '',
        roleType: '',
        roleName: '',
      }
    },
    computed: {},
    components: {
      update,
      tree,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.roleCode = ''
        t.roleCname = ''
        t.getData(1)
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
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt:  this.$global.mt+'AuthRole.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          roleCode: t.roleCode,
          roleCname: t.roleCname,
          roleType: '3user',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
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
        const newArr2 = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
          newArr2.push(selection[i].roleCode)
        }
        this.tableselected = newArr.toString()
        this.delCheck = newArr2.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          const newArr = t.delCheck.split(',')
          if (t.delCheck.indexOf('rolehrbp') === -1) {
            t.$Modal.confirm({
              title: this.$t('reminder.remind'),
              content: this.$t('reminder.confirmdelete'),
              onOk: () => {
                getDataLevelUserLogin({
                  _mt:  this.$global.mt+'AuthRole.delByIds',
                  logType: this.$t('button.del'),
                  delIds: t.tableselected,
                }).then((res) => {
                  if (isSuccess(res, t)) {
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
          } else {
            t.$Modal.warning({
              title: this.$t('reminder.err'),
              content: this.$t('lang_role.adminrole.checkHr'),
            })
          }
        }
      },
      power(id, roleCname) {
        const t = this
        t.treeId = id
        t.roleName = roleCname
        t.showTree = true
      },
      closePower() {
        const t = this
//        t.showTree = false
      },
      closePowers() {
        const t = this
        t.showTree = false
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getSelect()
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
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
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
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
