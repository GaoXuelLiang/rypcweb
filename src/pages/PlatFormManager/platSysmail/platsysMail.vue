<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_platdoc.platMail.title')}}
        </p>
        <Row class="btnHeight">
          <Input class="searchInput" :placeholder="$t('lang_platdoc.platMail.sysmailNoDis')" style="width: 160px" v-model="sysmailNo"/>
          <Input class="searchInput" :placeholder="$t('lang_platdoc.platMail.sysmailNameDis')" style="width: 160px" v-model="sysmailName"/>
          <Input class="searchInput" :placeholder="$t('lang_platdoc.platMail.sysmailObjectDis')" style="width: 160px" v-model="sysmailObject"/>
          <Input class="searchInput" :placeholder="$t('lang_platdoc.platMail.sysmailToDis')" style="width: 160px" v-model="sysmailTo"/>
          <Input class="searchInput" :placeholder="$t('lang_platdoc.platMail.sysmailCcDis')" style="width: 160px" v-model="sysmailCc"/>
          <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :no-data-text="noDataImg" :height="tableheight" @on-selection-change="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" ref="update" ></update>
    </transition>
  </div>
</template>
<script>
  import update from './platMailBase'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'

  export default{
    name: 'platSysMail',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg:'<div id="noData"></div>',
        value: '',
        logType: '',
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
            title: this.$t('lang_platdoc.platMail.sysmailNo'),
            key: 'sysmailNo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailName'),
            key: 'sysmailName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailNo'),
            key: 'sysmailObject',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailTo'),
            key: 'sysmailTo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailCc'),
            key: 'sysmailCc',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailSendcondition'),
            key: 'sysmailSendcondition',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailIsvalid'),
            key: 'sysmailIsvalidDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailIsencrypt'),
            key: 'sysmailIsencryptDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailFlow'),
            key: 'sysmailFlowDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMail.sysmailFlowstep'),
            key: 'sysmailFlowstepDis',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
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
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        sysmailNo: '',
        sysmailObject: '',
        sysmailTo: '',
        sysmailCc: '',
        sysmailName: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.sysmailNo = ''
        t.sysmailObject = ''
        t.sysmailTo = ''
        t.sysmailCc = ''
        t.sysmailName = ''
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
        const data = {
          _mt:  this.$global.mt+'PlatSysmail.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询List',
          sysmailNo: t.sysmailNo,
          sysmailObject: t.sysmailObject,
          sysmailTo: t.sysmailTo,
          sysmailCc: t.sysmailCc,
          sysmailName: t.sysmailName,
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
                _mt:  this.$global.mt+'PlatSysmail.delByIds',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.deletesuccess'),
                  })
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
        t.openUpdate = true
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('platSysMailJS/setMainId', id)
        this.$store.commit('platSysMailJS/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
        t.$refs.update.getOption(logType)
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        // this.getData()
        t.$refs.update.clear()
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
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

    /deep/ .ivu-btn>.ivu-icon {
      width: 100%;
    }
</style>
