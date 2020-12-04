<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.contract.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" height="410" size="small" ref="selection" :columns="columns" :data="data"></Table>
    </row>
     <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <Row>
        <Col span="24">
        <Row type="flex"
              justify="end" class="btnSize2">
            <Button type="primary"
                    @click="save">{{$t('button.sav')}}</Button>
        </Row>
        </Col>
      </Row>
  </div>
    </div>
  </div>
</template> 
<script>

  //import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        noDataImg: '<div id="noData"></div>',
        tableselected: '',
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.contract.contactMark'),
            key: 'contactMark',
            align: 'left',
          },
          {
            title: this.$t('lang_approval.contract.contactName'),
            key: 'contactName',
            align: 'left',
          },
        ],
        data: [],
      }
    },
    props: {
      conttype: String,
    },
    components: {
    },
    methods: {
      getData() {
        const t = this;
        t.loading = true;
        const data = {
          _mt:  this.$global.mt+'VMailContact.getPage',
          APfunId: '1',
          APlogType: this.$t('button.ser'),
          APsort: t.sort,
          APorder: t.order,
          AProws: t.rows,
          APpage: t.page,
          APcontactflowType: 'approvalFlow',
          APcontactFlowid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(() => {
            t.loading = false;
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
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      showMsgBtn() {
        this.showMsg = true
      },
      close() {
        this.tableselected = ''
        this.$emit('hideMsg')
      },
      save() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'VMailContact.aprAdd',
          APfunId: '1',
          APlogType: '新增',
          APid: t.tableselected,
          APreceiveType: t.conttype,
          APstepMailId: t.$store.state.platApproval.childId2,
        }

        if (!data.id) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
          return
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value === undefined) {
              t.$Modal.error({
                title: this.$t('reminder.remind'),
                content: this.$t('reminder.dataExists'),
              })
            } else {
              t.$store.commit('platApproval/addNewArrayChildTable3', res.data.content[0].value)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
              t.close()
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .content-main{
    height: 500px;
    .table-form{
      margin: 10px 0;
    }
  }
  .btn{
    position: absolute;
    bottom: 50px;
    right: 36px;
  }
</style>
