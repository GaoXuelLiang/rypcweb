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
        <Input class="searchInput" :placeholder="searchText1" v-model="pmtypeCode"/>
        <Input class="searchInput" :placeholder="searchText2" v-model="pmtypeCode2"/>
        <span><Button type="info" style="width:56px" :loading="isSpin" @click="getData(params, 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <Button type="warning" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.APpage" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
      <update v-show="openUpdate"
                    ref="update"
                    :logType="$t('button.add')"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"></update>
    </div>
  </div>
</template>
<script>
// import { getDataLevelUserLoginNew } from '../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'
import update from '../../pages/rootManage/baselang/updBaseLang'
export default{
  data() {
    return {
      openUpdate:false,
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      pmtypeCode: '',
      pmtypeCode2:'',
      noDataImg: '<div id="noData"></div>',
    }
  },
  props: {
    searchTitle: String,
    searchText1: String,
    searchText2: String,
    searchCloumns: Array,
    params: Object,
  },
  components:{
    update
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
      data['lanCode'] = t.pmtypeCode
      data['lanCn'] = t.pmtypeCode2
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
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
      this.pmtypeCode = ''
      this.pmtypeCode2 = ''
      this.params.APpage = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row)
      this.$emit('closeUp')
    },
    clear() {
      this.$emit('clear')
      this.$emit('closeUp')
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
    sortable(column) {
      this.params.APsort = column.key
      this.params.APorder = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      } else {
        this.params.APorder = 'desc'
      }
    },

    openUp (id, logType, index) {
        const t = this
        t.openUpdate = true
        if (logType === this.$t('button.y.upd')) {
            t.$refs.update.getData(t.updateId)
        }
    },
    closeUp () {
        const t = this
        t.openUpdate = false
    },
    addNewArray (res) {
        const t = this
        if (t.data.length === 0) {
            t.data.push(res)
        } else {
            t.data.unshift(res)
        }
    },
    updateArray (res) {
        const t = this
        t.data.splice(t.index, 1, res)
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/table.scss";
  @import "../../sass/searchTable.scss";
  .ivu-btn{
    margin-right: 10px;
  }
</style>
