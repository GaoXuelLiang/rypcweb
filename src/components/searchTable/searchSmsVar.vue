<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;短信变量
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input placeholder="请输入短信变量名称..." style="width: 200px" v-model="syssmsvarName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(params, 1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning"   @click="clear">清空</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchSmsVar" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator :current="params.page" show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        syssmsvarName: '',
      }
    },
    props: {
    	params: Object,
    	searchSmsVar: Array,
    },
    mounted() {

    },
    methods: {
    	getData(params, page) {
	    	const t = this
        if (page) {
          params.page = page
        }
	        const data = deepCopy(params)
			data.syssmsvarName = t.syssmsvarName
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
    		const t = this
        t.syssmsvarName = ''
        this.params.page = 1
    		t.$emit('closeSmsVar')
    	},
    	clear() {
    		const t = this
        t.syssmsvarName = ''
    		t.$emit('closeSmsVar')
    	},
    	dbCkick(row) {
    		const t = this
        this.close()
	        t.$emit('inputSmsVar', row[t.searchSmsVar[0].key], row.id)
	        t.$emit('closeSmsVar')
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
