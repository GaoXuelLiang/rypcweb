<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{searchTitle}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="flvarName"/>
        <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin" @click="getData(params, 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin: 0;"><Button type="warning"   @click="clear">清空</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320"  size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer :current="params.APpage" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  // import { getDataLevelUserLoginNew } from '../../axios/axios'
  import {getDataLevelUserLoginData} from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'
import flowStepData from '../../pages/PlatFormManager/platFlowStep/flowStepData'

  export default{
    data() {
      return {
        loading: false,
        isSpin: false,
        data: [],
        total: NaN,
        flvarName: '',
        noDataImg: '<div id="noData"></div>',
      }
    },
    props: {
      searchText: String,
      searchTitle: String,
      searchCloumns: Array,
      params: Object,
    },
    mounted() {

    },
    methods: {
      getData(params, page) {
        const t = this;
        t.loading = true;
        t.isSpin = true;
        if (page) {
          params.APpage = page
        }
        const data = deepCopy(params)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        data.flvarName = t.flvarName
        getDataLevelUserLoginData(data).then((res) => {
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
      close() {
        this.flvarName = ''
        this.params.APpage = 1
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
//      console.log(row)
        this.close()
        t.$emit('changeinput', row[t.searchCloumns[0].key], row.flvarFlow, row.flvarRtndatafmt, row.flvarValresource, row[t.searchCloumns[1].key])
        t.$emit('closeUp')
      },
      sizeChange(size) {
        const t = this
        t.params.AProws = size
        t.getData(t.params)
      },
      pageChange(page) {
        const t = this
        t.params.APpage = page
        t.getData(t.params)
      },
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.params.APsort = column.key
        this.params.APorder = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.APorder = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable";

.ivu-btn {
  margin-right: 10px;
}
</style>
