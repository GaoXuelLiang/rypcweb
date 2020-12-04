<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.wxcontract.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="420" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
      <!-- <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button> -->
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
        tableselected: '',
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxcontract.contactMark'),
            key: 'contactMark',
            align: 'left',
          },
          {
            title: this.$t('lang_approval.wxcontract.contactName'),
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
      getdata() {
        const t = this
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
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getdata()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata()
        } else {
          this.order = 'desc'
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
          _mt:  this.$global.mt+'VMailContact.aprAddwxCon',
          APfunId: '1',
          APlogType: this.$t('button.ser'),
          APid: t.tableselected,
          APstepMailId: t.$store.state.platApproval.childId4,
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
            t.$store.commit('platApproval/addNewArrayChildTable5', res.data.content[0].value)
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.addsuccess'),
            })
          }
          t.close()
        }).catch(() => {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.dataExists'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
 
</style>
