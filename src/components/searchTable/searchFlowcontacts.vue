<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_payroll.platAplInfo.seachFlowcontacts')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_payroll.platAplInfo.flcontNameIns')" style="width: 200px" v-model="flcontName"/>
        <span style="margin: 0;"><Button type="primary" class="btn" :loading="isSpin" @click="getData(params)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe height="320" :no-data-text="noDataImg" size="small" :loading="isSpin" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  //import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        isSpin:false,
        data: [],
        total: NaN,
        flcontName: '',
        current: NaN,
        flcontFlowType: '',
        flcontFlowId: '',
        noDataImg: '<div id="noData"></div>',
      }
    },
    props: {
      searchText: String,
      searchCloumns: Array,
      params: Object,
      searchText1: String,
      searchText2: String,
    },
    mounted() {

    },
    methods: {
      getData(params, flcontFlowType, flcontFlowId) {
        const t = this
        t.isSpin = true
        const data = deepCopy(params)
        data.flcontName = t.flcontName
        if (t.flcontFlowType === '') {
          t.flcontFlowType = flcontFlowType
          t.flcontFlow = flcontFlowId
        }
        // data.flcontFlowType = t.flcontFlowType
        data.flcontFlow = flcontFlowId
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            t.current = res.data.content[0].page
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.isSpin = false
        })
      },
      close() {
        this.flcontName = ''
        this.params.page = 1
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
        this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
        this.close()
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData(t.params)
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData(t.params)
      },
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable";
  .btn{
    margin-left: 10px;
    width:56px;
  }
  .inp{
    width: 200px;
  }
</style>
