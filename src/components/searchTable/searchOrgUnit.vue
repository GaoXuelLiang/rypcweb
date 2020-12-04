<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_payroll.salaryBase.searchCmp')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="unitsName" />
        <span style="margin-left:5px;">
          <Button type="primary" 
                  @click="getData()" 
                  :loading="loading"
                  ><span v-show="!loading">{{$t('button.ser')}}</span></Button>
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" :no-data-text="noDataImg" stripe ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="APpage" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((APpage - 1) * AProws + 1)}} - {{APpage*AProws > total ? total : APpage*AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
      data: [],
      total: NaN,
      type: '01company',
      unitsName: '',
      loading: false,
      noDataImg: '<div id="noData"></div>',
      searchText: this.$t('lang_payroll.salaryBase.unitsNameIns'),
      searchText2: this.$t('lang_payroll.salaryBase.unitsNameIns2'),
      _mt:  this.$global.mt+'OrgUnits.getPage',
      APsort: 'id',
      APorder: 'desc',
      AProws: 10,
      APpage: 1,
      searchCloumns: [
        {
          title: this.$t('lang_payroll.salaryBase.unitCode'),
          key: 'unitCode',
          sortable: 'custom',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameCnDis'),
          key: 'unitFnameCn',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameEnDis'),
          key: 'unitFnameEn',
        },
      ],
      searchCloumns2: [
        {
          title: this.$t('lang_payroll.salaryBase.unitCode2'),
          key: 'unitCode',
          sortable: 'custom',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameCnDis2'),
          key: 'compFnameCnDis',
        },
        {
          title: this.$t('lang_payroll.salaryBase.compFnameEnDis2'),
          key: 'compFnameEnDis',
        },
      ],
    }
  },
  props: {
  },
  computed: {
    funId () {
      return this.$store.state.user.funId
    }
  },
  mounted() {

  },
  methods: {
    getData(type, page) {
      const t = this
      t.loading = true;
      let data = {
        _mt: t.$global.mt+'OrgUnits.getPage',
        APsort: t.APsort,
        APorder: t.APorder,
        AProws: t.AProws,
        APpage: t.APpage,
        APffk: '',
        unitType:'01company'
      }
      if(this.unitsName) {
        data.unitFnameCn = this.unitsName
      }
      getDataLevelUserLoginData(data).then((res) => {
        if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
        t.loading = false;
      }).catch(() => {
        t.loading = false;
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    close() {
      this.unitsName = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
      this.$emit('closeUp')
    },
    clear() {
      this.$emit('clear')
      this.$emit('closeUp')
    },
    sizeChange(size) {
      const t = this
      t.AProws = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.APpage = page
      t.getData()
    },
    sortable(column) {
      this.APsort = column.key
      // borderTopRightRadius.APorder = column.order
      if (column.order !== 'normal') {
        this.getData()
      } else {
        this.APorder = 'desc'
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
    padding: 50px 20px 10px 20px;
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
