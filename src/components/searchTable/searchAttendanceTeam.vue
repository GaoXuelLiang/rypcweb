<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <!--<Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_personalfile.fileQuery.searchTitle2')}}-->
          <Icon type="ios-bookmark" size="16"></Icon> 选择轮次
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input placeholder="班次名称" style="width: 200px" v-model="attRdsfName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning"   @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin fix v-if="isSpin" size="large"></Spin>
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
      isSpin: false,
      data: [],
      total: NaN,
      attRdsfName: '',
      params: {
        _mt:  this.$global.mt+'AttendRoundshift.getPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '轮次列表查询',
      },
      searchCloumns: [
        {
          title: '轮次名称',
          key: 'attRdsfName',
          sortable: 'custom',
        },
        {
          title: '公司',
          key: 'attRdsfHircompanyDis',
        },
      ],
    }
  },
  props: {
    comId: '', // 公司id
    num: ''
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
      data.attRdsfName = t.attRdsfName
      data.attRdsfHircompany = t.comId
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
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    close() {
      this.attRdsfName = ''
      this.params.page = 1
      this.$emit('closeEmp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      t.$emit('inputEmp', row, t.num)
      t.$emit('closeEmp')
    },
    clear() {
      this.attRdsfName = ''
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
