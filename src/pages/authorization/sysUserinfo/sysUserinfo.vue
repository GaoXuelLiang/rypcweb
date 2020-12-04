<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
        {{$t('lang_user.rootrole.title1')}}
        </p>
        <Row class="btnHeight">
          <Input :placeholder="$t('lang_user.rootuser.placeholdername')" style="width: 200px" v-model="userName"/>
          <Dropdown style="margin-left: 5px;">
            <Button type="primary">
              {{statusDis}}
              <Icon type="md-arrow-dropdown" size="18"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <span style="margin-left: 5px;"><Button type="info"  :loading="isSpin" @click="getData(1)"  style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning" style="margin-left: 5px;" @click="pickData" v-show="userStatus !=='03invalid' ? true : false">{{$t('lang_user.rootuser.add')}}</Button>
          <span style="margin-left: 5px;" v-show="userStatus ==='01draft' ? true : false">
          <Button type="success" @click="updStateRootUser('1','生效')">{{$t('lang_user.rootuser.valid')}}</Button>
          </span>
          <span style="margin-left: 5px;" v-show="userStatus ==='02valid' ? true : false">
          <Button type="error" @click="updStateRootUser('0','失效')">{{$t('lang_user.rootuser.invalid')}}</Button>
             </span>
          <span style="margin-left: 5px;" v-show="userStatus ==='03invalid' ? true : false">
          <Button type="primary" @click="updStateRootUser('1','退回')">{{$t('lang_user.rootuser.valid')}}</Button>
             </span>
          <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
        </Row>
        <!--<Row>-->
          <!--<RadioGroup v-model="userStatus" v-for="(item,index) in dropdownMenuList" :key="index" style="margin-top: 5px"  @on-change="getPageByState(item.paramCode,item.paramInfoName)">-->
            <!--<Radio :label="item.paramCode">{{item.paramInfoName}}</Radio>-->
          <!--</RadioGroup>-->
        <!--</Row>-->
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  size="small" stripe ref="selection"
                 :columns="columns" :data="data" :no-data-text="noDataImg" :loading='loading' :height='tableheight'></Table>
        </row>
        <Row style="display: flex">          <Page :current="page"  :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
              @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <searchPubUser v-show="openPick"  @closeUp="closeUp" @changeinput="changeinput" ref="searchPubUser"></searchPubUser>
    </transition>
  </div>
</template>
<script>
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
  import searchPubUser from '../../../components/searchTable/searchPubUser'
  import {isSuccess,getUrlKey} from '../../../lib/util'

  export default {
    data() {
      return {
        noDataImg: '<div id="noData"></div>',
        isSpin:false,
        loading:false,
        tableheight: document.body.offsetHeight - 240,
        userStatus: '02valid',
        value: '',
        statusDis: this.$t('lang_user.rootuser.valid'),
        eakeEffect: 0,
        eakeinvalid: 1,
        openPick: false,
        opendialog: false,
        tableselected: [],
        dropdownMenuList: [],
        select: '已生效',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'userName',
//          width: 150,
            sortable: 'custom',
          },
//           {
//             title: this.$t('lang_user.rootuser.mobileNo'),
//             key: 'mobileNo',
// //          width: 150,
//             sortable: 'custom',
//           },
          {
            title: this.$t('lang_user.rootrole.loginName'),
            key: 'loginName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
//          width: 180,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.sysRootvalidDis'),
            key: 'sysRootvalidDis',
//          width: 120,
            sortable: 'custom',
          },
        ],
        searchText: '请输入用户名称或手机号或登录名',
        searchCloumns: [
          {
            title: this.$t('lang_user.rootuser.name'),
            key: 'name',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.mobileNo'),
            key: 'mobileNo',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootrole.loginName'),
            key: 'loginName',
//          width: 150,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_user.rootuser.email'),
            key: 'email',
//          width: 180,
            sortable: 'custom',
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        userName: '',
        logType: '',
        sysRootvalid: '1',
      }
    },
    computed: {},
    components: {
      searchPubUser,
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.userStatus = '02valid'
        t.userName = ''
        t.sysRootvalid = '1'
        t.statusDis = this.$t('lang_user.rootuser.valid')
        t.getData(1)
        t.getSelect()
      }
    },
    methods: {
      getData(page) {
        const t = this
        t.loading = true
        t.isSpin = true
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          _mt:  this.$global.mt+'SysUserinfo.getSysUserinfoByPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          userName: t.userName,
          sysUserSign: '1',
          sysRootvalid: t.sysRootvalid,
          sysIsroot: '1',
          logType: '超级用户管理列表查询',
        }
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
        }).finally(()=>{
          t.loading = false
          t.isSpin = false
        })
      },
      pickData() {
        this.$refs.searchPubUser.getData()
        this.openPick = true
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      addSysRootUser() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'SysUserinfo.addOrUpdSysUserinfo',
          logType: '新增',
          companyId: '1',
          sysUserid: t.sysUserid,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.addsuccess'),
              onOk: () => {
                t.getData(1)
              },
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      updStateRootUser(state, logType) {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: '请确定失效该条数据？',
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'SysUserinfo.updStateRootUserByIds',
                funId: '1',
                companyId: '1',
                logType: logType,
                ids: t.tableselected,
                state: state,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData(1)
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
          })
        }
      },
//      deletemsg() {
//        const t = this
//        if (t.tableselected.length === 0) {
//          t.$Modal.warning({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.leastone'),
//          })
//        } else {
//          t.$Modal.confirm({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.confirmdelete'),
//            onOk: () => {
//              t.delUserChec()
//            },
//            onCancel: () => {
//            },
//          })
//        }
//      },
      delUserChec(){
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysUserinfo.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
//            t.$Modal.success({
//              title: this.$t('reminder.suc'),
//              content: '删除成功',
//              onOk: () => {
                t.getData(1)
//              },
//            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      changeinput(name, email, loginName, id) {
        const t = this
        t.sysUserid = id
        t.addSysRootUser()
      },
      clear() {
        const t = this
        t.sysUserid = ''
      },
      open() {
        const t = this
        t.opendialog = true
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openPick = false
        t.pmtypeCode = false
        t.$refs.searchPubUser.pmtypeCode = ''
      },
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let statusList = res.data.content[0].value[0].paramList
            for (let i = 0; i < statusList.length; i++) {
                if (statusList[i].paramCode !== '01draft') {
                  t.dropdownMenuList.push(statusList[i])
                }
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getPageByState(paramCode, paramInfoName) {
        const t = this
        t.userStatus = paramCode
        if (t.userStatus === '02valid') {
          t.sysRootvalid = '1'
        } else if (t.userStatus === '03invalid') {
          t.sysRootvalid = '0'
        } else {
          t.sysRootvalid = ''
        }
        t.getData(1)
        t.statusDis = paramInfoName
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

</style>
