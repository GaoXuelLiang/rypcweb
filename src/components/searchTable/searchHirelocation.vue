<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择城市
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.cityNameDis')" class="searchInput" v-model="cityName"/>
        <span style="margin: 0;"><Button type="info" style="width:56px" class="btnStyle" :loading="isSpin"  @click="search">
          <span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin: 0;"><Button type="warning" class="btnStyle" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" stripe :no-data-text="noDataImg" ref="selection" :columns="searchHirelocationClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
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
        isSpin:false,
        noDataImg: '<div id="noData"></div>',
        data: [],
        total: NaN,
        cityName: '',
        theCityType: '',
      }
    },
    props: {
    	params: Object,
    	searchHirelocationClo: Array,
    	logType: String,
    },
    mounted() {

    },
    methods: {
      search() {
        this.params.APpage = 1
        this.getData(this.params, this.theCityType,this.cityName)
      },
      getData(params, cityType,cityName) {
        const t = this
        const data = deepCopy(params)
        if (t.theCityType === '') {
          t.theCityType = cityType
        }
        data.cityType = t.theCityType
        if(t.cityName ===''){
        
           t.cityName = cityName
        }
         data.cityName = t.cityName
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin = true
        getDataLevelUserLoginData(data).then((res) => {
          t.isSpin =false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.isSpin =false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        this.cityName = ''
        this.params.APpage = 1
        this.$emit('closeHirelocation')
      },
      dbCkick(row) {
        const t = this
        if (t.logType === '雇佣地点') {
        	this.$emit('inputHirelocation',row.cityName, row.id)
        }
        if (t.logType === '工作地点') {
        	this.$emit('inputWorklocation',row.cityName, row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.benefitlocation')) {
        	this.$emit('inputBenefitlocation', row[t.searchHirelocationClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.hfundlocatio')) {
        	this.$emit('inputHfundlocatio', row[t.searchHirelocationClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.province')) {
        	this.$emit('inputProvince', row[t.searchHirelocationClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.city')) {
        	this.$emit('inputCity', row[t.searchHirelocationClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.rProvince')) {
        	this.$emit('inputrProvince', row[t.searchHirelocationClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.rCity')) {
        	this.$emit('inputrCity', row[t.searchHirelocationClo[0].key], row.id)
        }
        this.$emit('closeHirelocation')
        this.close()
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
        this.$emit('closeHirelocation')
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
</style>
