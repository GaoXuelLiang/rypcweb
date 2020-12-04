<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_employee.searchColumn.selectDepart')}}
        </div>
        <img class="btn_img" @click="close" src="../../../../static/largeScreen/popup_close.png" alt="">
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.departDis')" style="width: 200px" v-model="unitsName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(params, id, 1)">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" ref="selection" :columns="searchDeptClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px;color:#fff"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default{
    data() {
      return {
      	data: [],
        total: NaN,
        unitsName: '',
      }
    },
    props: {
		  searchDeptClo: Array,
		  params: Object,
		  id: String,
	  },
	mounted() {

	},
	methods: {
		getData(params, id, page) {
			const t = this
      if (page) {
        t.params.page = page
      }
      if (id) {
        t.params.unitPid = id
      }
      const data = deepCopy(t.params)
      data.unitsName = t.unitsName
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
      t.unitsName = ''
      t.data = []
      t.total = NaN
      this.params.page = 1
			t.$emit('closeDept')
    	},
    	clear() {
    		const t = this
        t.unitsName = ''
        t.data = []
        t.total = NaN
        this.params.page = 1
    		t.$emit('closeDept')
    	},
    	dbCkick(row) {
    		const t = this
        this.close()
	        t.$emit('inputDept', row.unitsName, row.id)
	        t.$emit('closeDept')
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
   
/deep/ .ivu-input {
  border: 1px solid #2d8cf0;
  height: 30px;
  line-height: 30px;
}
/deep/ .ivu-select-item-focus, .ivu-select-item:hover{
  background: unset;
}
/deep/ .ivu-table-body {
  border-bottom: none !important;
  background-color: #11162f !important;
}
/deep/ .ivu-table th {
  border-bottom:1px solid rgba(0,144,255,1);
  background-color:#11162f;
  color: #fff;
}
/deep/ .ivu-table td {
  background-color:#11162f;
  color: #fff;
  border-bottom: 1px solid rgba(0,144,255,1);
}
/deep/ .ivu-page-prev {
  background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/  .ivu-page-next {
   background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/ .ivu-select {
   background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/ .ivu-select-selection {
  background-color:#11162f;
  color: #fff;
  border: 1px solid rgba(0,144,255,1);
}
/deep/ .ivu-select-item {
  background-color:#11162f;
  color: #fff;
}
/deep/ .ivu-select-dropdown {
  background-color:#11162f;
}
/deep/ .ivu-page-item {
  background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/  .ivu-page-options-elevator {
  color: #fff;
}
/deep/  .ivu-page-options-elevator input {
  background-color:rgba(0,0,0,0.1);
  color: #fff;
  border: 1px solid #2d8cf0;
}
/deep/ .ivu-btn:hover {
  color: none !important; 
  background-color: none !important; 
  border-color: none !important;
}
.btn_img{
  width: 36px;
  height: 36px;
  margin: 10px 20px 0 0;
  cursor: pointer;
}
  .table-form{
    margin-bottom: 10px;
    color: transparent;
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
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      background: url('../../../../static/largeScreen/popup_bg.png') no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 13px;
        left: 0;
        color: #fff;

        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
