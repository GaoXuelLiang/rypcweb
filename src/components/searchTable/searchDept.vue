<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_employee.searchColumn.selectDepart')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" placeholder="请输入部门名称"  v-model="unitsName"/>
        <span class="btnStyle">
          <Button type="info" style="width:56px" :loading="isSpin"  @click="getData(params, id, 1)">
            <span v-if="!isSpin">{{$t('button.ser')}}</span>
          </Button>
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin v-show="isSpin" size="large" fix></Spin>
        <Table :no-data-text="noDataImg" height="320" size="small" stripe ref="selection" :columns="searchDeptClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.APpage" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
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
        unitsName: '',
        isSpin: false,
        noDataImg: '<div id="noData"></div>',
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
        t.params.APpage = page
      }
      if (id) {
        t.params.unitPid = id
      }
      const data = deepCopy(t.params)
      data.unitFnameCn = t.unitsName
      for (const dat in data) {
				if (data[dat] === '') {
					delete data[dat]
				}
			}
			t.isSpin = true
			getDataLevelUserLoginData(data).then((res) => {
        t.isSpin = false
				if (isSuccess(res, t)) {
					t.data = res.data.content[0].rows
					t.total = res.data.content[0].records
				}
			}).catch(() => {
        t.isSpin = false
				t.$Modal.error({
					title: this.$t('reminder.err'),
					content: this.$t('reminder.errormessage'),
				})
			}).finally(()=>{
          t.isSpin = false
        })
		},
		close() {
			const t = this
      t.unitsName = ''
      t.data = []
      t.total = NaN
      this.params.APpage = 1
			t.$emit('closeDept')
    	},
    	clear() {
    		const t = this
        t.unitsName = ''
        t.data = []
        t.total = NaN
        this.params.APpage = 1
    		t.$emit('closeDept')
    	},
    	dbCkick(row) {
    		const t = this
        this.close()
	        t.$emit('inputDept', row.unitSnameCn, row.id)
	        t.$emit('closeDept')
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
  @import "../../sass/searchTable";
</style>
