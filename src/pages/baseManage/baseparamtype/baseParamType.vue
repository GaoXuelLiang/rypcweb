<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
         {{$t('lang_role.adminpmtype.pmtypetitle')}}
        </p>
        <Row class="btnHeight">
          <Input placeholder="请输入参数类型名称" style="width: 200px" v-model="pmtypeName"/>
          <span style="margin-left: 5px;"><Button type="info" :loading="isSpin"
                                           @click="getData(1)" style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" style="margin-left: 5px;" @click="openUp(NaN,$t('button.add'),0)">{{$t('button.add')}}</Button>
          <Button type="error" style="margin-left: 5px;" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" style="margin-left: 5px;" @click="importExcel">{{$t('button.imp')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  size="small" stripe ref="selection"
                 :columns="columns" :data="data"  :no-data-text="noDataImg"  :loading = 'loading' :height='tableheight'></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
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
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt" @closeImport="closeImport"
                   ref="importExcel"></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './updateParamType'
  import importExcel from '../../../components/importModel/importParam'
  import {getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess,getUrlKey} from '../../../lib/util'

  export default {
    name: 'baseParamType',
    data() {
      return {
        noDataImg: '<div id="noData"></div>',
        isSpin:false,
        loading:false,
        tableheight: document.body.offsetHeight - 240,
        value: '',
        opendialog: false,
        openImport: false,
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
            title: this.$t('lang_role.adminpmtype.pmtypeCode'),
            key: 'pmtypeCode',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.adminpmtype.pmtypeName'),
            key: 'pmtypeName',
            sortable: 'custom',
//            width: 150,
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
                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        index: 0,
        likeName: '',
        pmtypeCode: '',
        pmtypeName: '',
        mobileNo: '',
        logType: '',
        imp_mt:  this.$global.mt+'BaseParamType.importData',
      }
    },
    computed: {},
    components: {
      update,
      importExcel,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.pmtypeName = ''
        t.getData(1)
      }
    },
    mounted () {
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
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamType.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          pmtypeName: t.pmtypeName,
        }).then((res) => {
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
          t.loading = false
          t.isSpin = false
        })
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
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
                _mt:  this.$global.mt+'BaseParamType.deleteByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(1)
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
        t.openUpdate = true
        t.index = index
        t.logType = logType
        t.$refs.update.getSelect()
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
        // t.$refs.importExcel.getDowModelFile()
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.pmtypeName = ''
        t.$refs.update.formValidate.pmtypeCode = ''
        t.$refs.update.formValidate.pmtypeIsupdate = '1'
        t.$refs.update.formValidate.comment = ''
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

</style>
