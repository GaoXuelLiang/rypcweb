<template>
  <div class="background">
    <div class="backbox">
       <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin-left: 8px;"><Button type="info" :loading="isSpin" @click="getData(params)" style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin-left: 8px;"><Button type="warning"  @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <i-col span="19">
         <Table @on-selection-change="selectedtable" :no-data-text="noDataImg" height="320" :row-class-name="addRowClass" stripe size="small"  ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data"></Table>
        </i-col>
        <i-col span="4" offset="1">
          <div class="btn-group">
            <Button type="primary" @click="handleSelectAll(true)" >{{$t('lang_user.rootrole.allPick')}}</Button>
            <Button type="primary" @click="handleSelectAll(false)">{{$t('lang_user.rootrole.resetTree')}}</Button>
            <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
          </div>
        </i-col>
      </row>
      <!--<Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>-->
    </div>
  </div>
</template>
<script>
// import { getDataLevelUserLoginNew } from '../../../axios/axios'
import {  getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default{
  data() {
    return {
      noDataImg: '<div id="noData"></div>',
      isSpin:false,
      spinShow:false,
      data: [],
      tableselected: [],
      total: NaN,
      pmtypeCode: '',
      id: '',
      searchText: this.$t('lang_user.rootgrprole.searchText'),
      searchCloumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootgrprole.roleCname'),
            key: 'roleCname',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuserrole.authGrpDis'),
            key: 'authGrpDis',
            sortable: 'custom',
          },
        ],
        params: {
          _mt:  this.$global.mt+'AuthRole.getAuthRoleByPage',
          APsort: 'id',
          APorder: 'desc',
          AProws: '1000',
          APpage: '1',
          AProleType: '1admin',
        },
    }
  },
  props: {
    // searchText: String,
    // searchCloumns: Array,
    // params: Object,
    // roleUserName: String,
    // id:String,
    logType:String
  },
  mounted() {
  },
  methods: {
    getData(id) {
      const t = this
      t.id = id
      t.spinShow = true
      t.isSpin = true
      const data = deepCopy(t.params)
      data['rootCompId'] = localStorage.companyId
      data['roleCname'] = t.pmtypeCode
      data['authGroupSign'] = 2
      data['userIdSign'] = t.id
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginData(data).then((res) => {
        if (isSuccess(res, t)) {
          for (const dat in res.data.content[0].rows) {
            if (res.data.content[0].rows[dat].authGroupTitl === '1') {
              res.data.content[0].rows[dat]['_checked'] = true
              res.data.content[0].rows[dat]['_disabled'] = true
            }
            if (res.data.content[0].rows[dat].authGroupCheckd === '1') {
              res.data.content[0].rows[dat]['_checked'] = true
            }
          }
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      }).finally(()=>{
        t.spinShow = false
        t.isSpin = false
      })
    },
    addRowClass(row) {
      if (row.authGroupTitl === '1') {
        return 'demo-table-error-row'
      }
      return ''
    },
    close() {
      this.pmtypeCode = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
      this.$emit('closeUp')
    },
    clear() {
      // this.$emit('clear')
      this.$emit('closeUp')
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    selectedtable(selection) {
      const newArr = []
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id)
      }
      this.tableselected = newArr.toString()
    },
    updStateRoleMe() {
      const t = this
      const arr = t.$refs.selection.getSelection()
      let ids = ''
      const idsArr = []
      for (let i = 0; i < arr.length; i++) {
        idsArr.push(arr[i].id)
      }
      ids = idsArr.join(',')
      getDataLevelUserLoginData({
        _mt:  this.$global.mt+'SysUserinfo.setRoleByIds',
        APlogType: '分配权限',
        APauthRoleId: ids,
        AProletype: '1admin',
        APid: t.id,
      }).then((res) => {
        if (isSuccess(res, t)) {
          t.$Modal.success({
            title: this.$t('reminder.suc'),
            content: this.$t('reminder.savsuccess'),
          })
          t.close()
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    sortable(column) {
      this.params.sort = column.column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      }
    },
  },
}
</script>
<style lang="scss">
  @import "../../../sass/table";
</style>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
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
    width: 750px;
    background-color: #fff;
    padding: 50px 20px 3px 20px;
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
