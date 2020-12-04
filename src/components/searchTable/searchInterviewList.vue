<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <!--<Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_personalfile.fileQuery.searchTitle2')}}-->
          <Icon type="ios-bookmark" size="16"></Icon> 选择面试官
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="rinterviewerName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        data: [],
        total: NaN,
        rinterviewerName: '',
        searchText: '请输入面试官名称',
        params: {
          _mt:  this.$global.mt+'RecruiteInterviewer.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
//          empkiStatus: '\'00probation\',\'01active\'',
          logType: '员工弹出框',
        },
        searchCloumns: [
          {
            title: '面试官工号',
            key: 'rinterviewerPno',
            sortable: 'custom',
            width: 120,
          },
          {
            title: '面试官姓名',
            key: 'rinterviewerName',
            sortable: 'custom',
            width: 120,
          },
          {
            title: '面试官GID',
            key: 'rinterviewerGid',
            sortable: 'custom',
            width: 120,
          },
          {
            title: '公司',
            key: 'rinterviewerCompDis',
            sortable: 'custom',
            width: 200,
          },
          {
            title: '部门',
            key: 'rinterviewerDeptDis',
            sortable: 'custom',
            width: 200,
          },
          {
            title: this.$t('lang_personalfile.fileQuery.empcompPost'),
            key: 'rinterviewerPosition',
            sortable: 'custom',
            width: 200,
          },
        ],
      }
    },
    props: {
      empcompHirecompany: '',
      empcompDept: '',
    },
    mounted() {

    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        const data = deepCopy(t.params)
        data.rinterviewerName = t.rinterviewerName
        data.empcompHirecompany = t.empcompHirecompany
        data.empcompDept = t.empcompDept
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
        })
      },
      close() {
        this.rinterviewerName = ''
        this.params.page = 1
        this.$emit('closeEmp')
      },
      dbCkick(row) {
        const t = this
        this.close()
        t.$emit('inputEmp', row)
        t.$emit('closeEmp')
      },
      clear() {
        this.rinterviewerName = ''
        this.$emit('clear')
        this.$emit('closeEmp')
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData()
      },
      sortable(column) {
        this.params.sort = column.key
        if (column.order !== 'normal') {
          this.params.order = column.order
          this.getData()
        } else {
          this.params.order = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox{
      position:relative;
      width: 800px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;

        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
