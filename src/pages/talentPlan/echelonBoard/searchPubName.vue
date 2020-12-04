<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{$t('lang_user.rootrole.information')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin-left:3px;"><Button type="primary"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
        <span style="margin-left:3px;"><Button type="warning"   @click="clear">{{$t('button.cle')}}</Button></span>
        <span style="margin-left:3px;"><Button type="primary" @click="saveName">{{$t('button.sav')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" width='45%' size="small" border ref="selection" :columns="searchCloumns" :data="data"
          @on-sort-change="sortable"
          @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"></Table>
        <div class="opSetting">
          <div @click="handelSelect">
            <span style="margin: 0;">
              <Button :disabled="nowSelectData.length? false :true" :size="buttonSize" type="primary" >
                选中
              </Button>
            </span>
          </div>
          <div class="spacing" @click="handleRemoveSelect">
            <span style="margin: 0;">
              <Button :disabled="nowSelectRightData.length? false :true" :size="buttonSize" type="primary">
                取消
              </Button>
            </span>
          </div>
        </div>
        <Table height="320" width='45%' size="small" border ref="selection" :columns="newSearchCloumns" :data="selectArr"
          @on-sort-change="sortable"
          @on-select="newselectedtable"  @on-select-cancel="newselectedtable" @on-select-all="newselectedtable"></Table>
      </row>
      <Page :current="params.page"  :total="total" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy, uniqObj } from '../../../lib/util'

export default{
  data() {
    return {
      data: [],
      total: NaN,
      pmtypeCode: '',
      searchText: this.$t('lang_user.rootrole.searchText'),
      params: {
        _mt:  this.$global.mt+'ViewEmpMaster.getPage',
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
      },
      searchCloumns: [
        {
          type: 'selection',
          width: 60,
        },
        {
          title: this.$t('lang_user.rootuser.name'),
          key: 'empCname',
        },
        {
          title: '人才库等级',
          key: 'empctLibrarylevelDis',
        },
      ],
      buttonSize: 'large',
      selectArr:[],
      nowSelectData:[], //左侧列表选中数据
      nowSelectRightData: [], // 右侧列表选中数据
      // 右侧表格数据
      newSearchCloumns: [
        {
          type: 'selection',
          width: 70,
        },
        {
          title: this.$t('lang_user.rootuser.name'),
          key: 'empCname',
        },
        {
          title: '人才库等级',
          key: 'empctLibrarylevelDis',
        },
      ],
    }
  },
  props: {
    talentNum: String,
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    getRightData(arr){
      const t = this
      t.selectArr = arr
    },
    getData(page) {
      const t = this
      if (this.params.order === 'normal') {
          this.params.order = 'desc'
      }
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      data['empCname'] = t.pmtypeCode
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
      this.params.page = 1
      this.pmtypeCode = ''
      this.selectArr = []
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key], row[t.searchCloumns[2].key], row[t.searchCloumns[3].key], row.id)
      this.$emit('closeUp')
      this.pmtypeCode = ''
    },
    clear() {
      this.pmtypeCode = ''
      this.getData(1)
//      this.$emit('clear')
//      this.$emit('closeUp')
    },
    sizeChange(size) {
      const t = this
      t.params.rows = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.params.page = page
      t.getData()
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(1)
      }
    },
    selectedtable(selection) {
			const newArr = []
			for (let i = 0; i < selection.length; i++) {
				newArr.push(selection[i])
			}
      this.nowSelectData = newArr
    },
    newselectedtable(selection) {
			const newArr = []
			for (let i = 0; i < selection.length; i++) {
				newArr.push(selection[i])
			}
      this.nowSelectRightData = newArr
		},
    // 选中
    handelSelect() {
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData)
      this.handleRemoveTabList(this.nowSelectData,  this.data);
      this.nowSelectData = [];
    },
    // 取消
    handleRemoveSelect() {
      this.data = this.handleConcatArr(this.data, this.nowSelectRightData)
      this.handleRemoveTabList(this.nowSelectRightData,  this.selectArr);
      this.nowSelectRightData = [];

    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);
      return arr;
    },
    handleRemoveTabList(isNeedArr,  originalArr) {
      if(isNeedArr.length && originalArr.length) {
         for(let i=0; i<isNeedArr.length; i++) {
            for(let k=0; k<originalArr.length; k++) {
              if(isNeedArr[i]["empCname"] === originalArr[k]["empCname"]) {
                originalArr.splice(k, 1);
              }
            }
         }
      }
    },
    saveName() {
      const t = this;
//      console.log(22, t.selectArr)
      if (t.selectArr.length === 0){
        t.$Modal.warning({
					title: this.$t('reminder.remind'),
					content: this.$t('reminder.leastone'),
				})
      } else {
        if (this.selectArr.length > 3) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('最多选择三个'),
          })
          // return;
        }
        const newName = []
        const newId = []
        for (let i = 0; i < t.selectArr.length; i++) {
          newName.push(t.selectArr[i].empCname)
          newId.push(t.selectArr[i].id)
        }
        t.$emit('changeinput', newName, newId, this.talentNum)
        t.$emit('closeUp')
        this.close()
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
      width: 1000px;
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
      .ivu-table {
        /*width: 100% !important;*/
      }
    }
  }
  .opSetting{
    text-align: center;
    margin: 20px;
  }
  .spacing{
    margin-top:10px;
  }
  .ivu-row {
    display: flex;
  }
  .ivu-table-wrapper{
    /*width: 45%;*/
  }
  th .ivu-table-cell {
    display: block;
  }

</style>
