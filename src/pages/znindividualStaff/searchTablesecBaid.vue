<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>{{$t('lang_employee.searchColumn.bankCname')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.bankCnameDis')" class="searchInput" style="width: 200px" v-model="bankCname"/>
        <span style="margin: 0;"><Button type="info" class="btnStyle" style="width:56px" :loading="isSpin"  @click="search">
          <span v-if="!isSpin">{{$t('button.ser')}}</span>
          </Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" stripe :loading='isSpin' :no-data-text="noDataImg" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbClick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginData } from '../../axios/axios'
  import { isSuccessNew, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        data: [],
        isSpin:false,
        noDataImg: '<div id="noData"></div>',
        total: NaN,
        bankCname: '',
        searchCloumns: [
            {
                title: "银行代码/行号",
                key: "bankCode"
            },
            {
                title: "银行中文名",
                key: "bankCname"
            }
        ],
        params: {
            _mt:   this.$global.mt+"BaseBankinfo.getPage",
            APsort: "id",
            APorder: "asc",
            AProws: 10,
            APpage: 1,
            APlogType: "查询",
            APffk:0
        }
      }
    },
    props: {
    	// params: Object,
        // searchBankCol: Array,
        typeName:String
    },
    mounted() {

    },
    methods: {
      search() {
        this.params.APpage = 1
        this.getData(this.params)
      },
    getData() {
        const t = this
        const data = deepCopy(t.params)
        data.bankCname = t.bankCname
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin =true
        getDataLevelUserLoginData(data).then((res) => {
          t.isSpin =false
          if (isSuccessNew(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.isSpin =true
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
            t.isSpin =false
        })
      },
      dbClick(row) {
      	const t = this
        this.close()
        if(t.typeName=='工资银行'){
            t.$emit('changeinputsecBaid', row)
        }else if(t.typeName=='报销银行'){
            t.$emit('changeinputsecBaid1', row)
        }
      	t.$emit('closeUp')
      },
    	close() {
    		const t = this
        this.params.APpage = 1
        t.bankCname = ''
    		t.$emit('closeUp')
    	},
    	clear() {
    		const t = this
    		t.$emit('closeUp')
    	},
    	sortable(column) {
	        this.params.APsort = column.key
	        this.params.APorder = column.order
	        if (column.order !== 'normal') {
	          this.getData(this.params)
	        }
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
    },
  }
</script>
<style lang="scss" scoped>
 @import '../../sass/searchTable.scss'
</style>
