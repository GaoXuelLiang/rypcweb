<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_user.rootrole.title2')}}
        </p>
        <Row class="btnHeight">
          <Input :placeholder="$t('lang_user.rootrole.proleCode')" style="width: 200px" v-model="roleCode"/>
          <Input :placeholder="$t('lang_user.rootrole.proleCname')" style="width: 200px;margin-left:5px" v-model="roleCname"/>
          <span style="margin-left: 5px;"><Button type="info"  style="width:56px" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" style="margin-left: 5px;" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

          <Button type="error" style="margin-left: 5px;" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" :no-data-text="noDataImg" :height='tableheight' @on-select-cancel="selectedtable" @on-sort-change="sortable"  :loading = 'loading' @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  size="small" stripe ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"  ref="update"></update>
    <tree v-show="showTree" :roleName="roleName" @closePower="closePower" ref="tree"></tree>
  </div>
</template>
<script>
  import update from './addAndUpdRole'
  import tree from './tree'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default{
    data() {
      return {
        noDataImg: '<div id="noData"></div>',
        isSpin:false,
        loading:false,
        tableheight: document.body.offsetHeight - 240,
        value: '',
        logType: '',
        showTree: false,
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
            title: this.$t('lang_user.rootrole.roleCode'),
            key: 'roleCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.companyIdDis'),
            key: 'companyIdDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.roleCname'),
            key: 'roleCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.roleTypeDis'),
            key: 'roleTypeDis',
            sortable: 'custom',
          },

          {
            title: this.$t('lang_user.rootrole.validDis'),
            key: 'validDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.invdate'),
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
                      this.power(params.row.id, params.row.companyId, params.row.roleCname)
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
        rows: '10',
        page: '1',
        roleCode: '',
        roleCname: '',
        roleName: '',
        roleType: '',
      }
    },
    computed: {

    },
    components: {
      update,
      tree,
    },
    mounted() {
      this.getData(1)
       let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
      getData(page) {
        const t = this
        t.loading = true
        t.isSpin = true
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt:  this.$global.mt+'AuthRole.getAuthRoleByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          roleCode: t.roleCode,
          roleCname: t.roleCname,
          roleType: '1admin',
          authGroupSign: '999',
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
//            alert(t.total)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false
          t.isSpin = false
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
          this.getData(1)
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
            content: this.$t('lang_user.rootrole.delTips'),
            onOk: () => {
            getDataLevelUserLogin({
          _mt:  this.$global.mt+'AuthRole.delByIds',
          funId: '1',
          companyId: '1',
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
      power(id, companyId, roleCname) {
        const t = this
        t.roleName = roleCname
        t.$refs.tree.getData(id, companyId)
        t.showTree = true
      },
      closePower() {
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
        t.$refs.update.clearCheck()
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
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }

</style>
