<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <!-- <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{$t('lang_employee.searchColumn.post')}} -->
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;选择公司
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="inp searchInput" placeholder="请输入中文名称" style="width: 200px" v-model="searchName"/>
        <span class="btn">
          <Button type="info" class="btnStyle" style="width:56px" :loading="isSpin" @click="getData()">
            <span v-if="!isSpin">{{$t('button.ser')}}</span>
          </Button>
        </span>
        <span class="btn"><Button type="warning" class="btnStyle" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin v-show="isSpin" size="large" fix></Spin>
        <Table :no-data-text="noDataImg" height="320" size="small" stripe ref="selection" :columns="searchPostClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>

  // import { getDataLevelUserLoginData } from '@/axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
      	data: [],
        total: NaN,
        searchName: "",
        name: '',
        isSpin: false,
        noDataImg: '<div id="noData"></div>',
        params: {
          _mt:  this.$global.mt+'OrgUnits.getPage',
          APsort: 'id',
          APorder: 'desc',
          AProws: 10,
          APpage: 1,
          APffk: 0,
          APlogType: '公司弹出框',
        }, 
        searchPostClo: [
          {
            title: '中文全称',
            key: 'unitFnameCn',
  //          sortable: 'custom',
            // width: 379,
          },
          {
            title: '组织编码',
            key: 'unitCode',
  //          sortable: 'custom',
            // width: 380,
          },
          {
            title: '所属上级',
            key: 'unitPidDis',
  //          sortable: 'custom',
            // width: 380,
          },
          {
            title: '组织范围',
            key: 'unitScope',
  //          sortable: 'custom',
            // width: 380,
          },
          {
            title: '组织类型',
            key: 'unitType',
  //          sortable: 'custom',
            // width: 380,
          },
        ]
      }
    },
    props: {
     
    },
    mounted() {

    },
    methods: {
      getData() {
        const t = this
        const data = deepCopy(t.params)
          if (t.searchName) {
            data['unitFnameCn'] = t.searchName;
          }
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
        t.data = []
        t.total = NaN
        this.params.APpage = 1
    		t.$emit('closeCom')
    	},
    	clear() {
    		const t = this
        t.data = []
        t.total = NaN
        this.params.APpage = 1
    		t.$emit('closeCom')
    	},
    	dbCkick(row) {
    		const t = this
        this.close()
          t.$emit('inputCom', row.unitFnameCn, row)
	        t.$emit('closeCom')
    	}, 
    	sortable(column) {
        this.params.APsort = column.key
        this.params.APorder = column.order
        if (column.order !== 'normal') {
          this.getData()
        } else {
          this.params.order = 'desc'
        }
      },
    	sizeChange(size) {
	        const t = this
	        t.params.AProws = size
	        t.getData()
	      },
	      pageChange(page) {
	        const t = this
	        t.params.APpage = page
	        t.getData()
	      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable";
  .inp{
    width: 200px;
  }
</style>