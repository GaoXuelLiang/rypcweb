<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16" style="margin-right: 10px;"></Icon>&nbsp;选择分发对象
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="18"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.hireCompanyDis')" style="width: 200px" v-model="name"/>
        <span style="margin: 0;"><Button type="info"  @click="getData(params,id, 1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="info" @click="dbCkick">保存</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns"  @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :data="data"></Table>
      </row>
      <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopyNew } from '../../lib/util'

  export default{
    data() {
      return {
      	data: [],
        total: NaN,
        name: '',
        params: {
          // _mt: 'cfldviewEmpMaster.getPage',
          _mt:  this.$global.mt+'CfldsysUserinfo.getUserinfoByPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          logType: '查询',
          sysBsvalid: '1',
        },
        searchCloumns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '姓名',
            key: 'userName',
          },
          {
            title: '组织范围',
            key: 'sysOrgscope',
          },
        ],
        tableselected: [],
      }
    },
    props: {
    },
    mounted() {
    },
    methods: {
    	getData() {
        const t = this
        const data = deepCopyNew(t.params)
        // data.empCname = t.name
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
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    	close() {
    		const t = this
        this.postCode = ''
        t.data = []
        t.total = NaN
        this.params.page = 1
    		t.$emit('closePost')
    	},
    	clear() {
    		const t = this
        t.data = []
        t.total = NaN
        this.params.page = 1
    		t.$emit('closePost')
    	},
      selectedtable(selection) {
        this.tableselected = deepCopyNew(selection)
      },
    	dbCkick() {
    		const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          let NameArr = []
          let IdArr = []
          t.tableselected.forEach((item) => {
            NameArr.push(item.userName)
            IdArr.push(item.id)
          })
	        t.$emit('inputPost', NameArr, IdArr)
          t.$emit('closePost')
          t.tableselected = []
        }
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
