<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择变量
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" placeholder="请输入变量名称或标识..." style="width: 200px" v-model="flvarMark"/>
        <span style="margin: 0;"><Button style="width:56px" type="info" :loading="isSpin" @click="getData(params, 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        loading: false,
        isSpin: false,
        noDataImg: '<div id="noData"></div>',
        data: [],
        total: NaN,
        flvarMark: '',
      }
    },
    props: {
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
          params.page = page
        }
        const data = deepCopy(params)
        data.flvarMark = t.flvarMark
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
        }).finally(() => {
                t.loading = false;
                t.isSpin = false;
        })
      },
      close() {
        this.flvarMark = ''
        this.params.page = 1
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
        this.close()
        this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
        this.$emit('closeUp')
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
        this.flvarMark = ''
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.order = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable.scss";
</style>
