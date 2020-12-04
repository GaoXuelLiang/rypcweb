<template>
  <div class="background">
    <div class="backbox">
       <Spin size="large" fix v-if="spinShow">
      </Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_employee.searchColumn.nationName')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input placeholder="请输入名称" class="searchInput" style="width: 200px" v-model="nationName"/>
        <span style="margin: 0;"><Button class="btnStyle" style="width:56px" :loading="isSpin" type="info"  @click="search">
         <span v-if="!isSpin">{{$t('button.ser')}}</span> </Button>
          
          </span>
        <span style="margin: 0;"><Button class="btnStyle" type="warning" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" stripe ref="selection" :no-data-text="noDataImg" :columns="searchClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        spinShow:false,
        isSpin:false,
        noDataImg: '<div id="noData"></div>',
      	data: [],
        total: NaN,
      	nationName: '',
      }
    },
    props: {
    	searchClo: Array,
    	params: Object,
    },
    mounted() {

    },
    methods: {
      search() {
        this.params.APpage = 1
        this.getData(this.params)
      },
    	getData(params) {
        const t = this
        t.spinShow = true
        t.isSpin = true
        const data = deepCopy(params)
				data.lanCn = t.nationName
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
           t.isSpin = false
          t.spinShow = false
        })
    	},
    	close() {
    		const t = this
        this.nationName = ''
        this.params.APpage = 1
    		t.$emit('closeEmp')
    	},
    	clear() {
    		const t = this
    		t.$emit('closeEmp')
    	},
    	dbCkick(row) {
    		const t = this
        t.$emit('inputNation', row[t.searchClo[0].key], row.lanCode)
        this.close()
        t.$emit('closeEmp')
    	},
    	sortable(column) {
        this.params.APsort = column.key
        this.params.APorder = column.order
        if (column.APorder !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.APorder = 'desc'
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
