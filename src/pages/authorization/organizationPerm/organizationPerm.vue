<template>
  <div class="table">
    <Row class="row">
      <Col span="24" class="col">
      <card class="card">
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          组织权限分配
        </p>
        <Row>
          <Col span="5" class="colTree">
            <div class="divtree" :style="{height:(treeheight) + 'px'}">
              <Tree v-if="dataTree != ''" :data="dataTree" :render="renderContent"></Tree>
              <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
            </div>
          </Col>
          <Col span="19">
          <Row class="btnHeight">
            <!-- <Input placeholder="请输入姓名" style="width: 180px" v-model="empCname"/>
            <Input placeholder="请输入登录名" style="width: 180px" v-model="empNo"/>
            <span style="margin: 0;"><Button type="primary" :loading="isSpin"  @click="search()">{{$t('button.ser')}}</Button></span> -->

            <!--<Dropdown>-->
              <!--<Button type="primary">-->
                <!--{{statusDis}}-->
                <!--<Icon type="md-arrow-dropdown" size="18"></Icon>-->
              <!--</Button>-->
              <!--<DropdownMenu slot="list" >-->
                <!--&lt;!&ndash;<span key="index" @click="getPageByState('',$t('button.all'))">&ndash;&gt;-->
                    <!--&lt;!&ndash;<DropdownItem name="">{{$t('button.all')}}</DropdownItem>&ndash;&gt;-->
                <!--&lt;!&ndash;</span>&ndash;&gt;-->
                <!--<span v-for="(item,index) in Empstatus" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">-->
										<!--<DropdownItem>{{item.paramInfoCn}}</DropdownItem>-->
									<!--</span>-->
              <!--</DropdownMenu>-->
            <!--</Dropdown>-->
            <!--<Button type="primary" @click="openUp1(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
            <Button class="btn" type="warning" v-if="pid" @click="openSelectUser(NaN, '选择用户')">{{$t('button.add')}}</Button>
            <Button class="btn" type="error" v-if="pid" @click="deletemsg">{{$t('button.del')}}</Button>
            <!--<Button type="primary"   @click="openPerson">推送主数据</Button>-->
            <!--<Button type="primary"   @click="importExcel">{{$t('button.imp')}}</Button>-->
          </Row>
          <row class="table-form" ref="table-form" :style="{marginTop:(pid?10:0) + 'px'}">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <Table :no-data-text="noDataImg" stripe @on-select="selectedtable" :loading="loading" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
            <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button>
          </Row>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <!--<transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>-->
    <!--<transition name="fade">-->
      <!--<update v-if="openUpdate" :pklv="pklv" @closeUp="closeUp" :logType="logType"></update>-->
    <!--</transition>-->
    <!--<transition name="fade">-->
    	<!--<addemployee v-show="openAddEmp" @closeEmp="closeEmp" :id="addEmpId" @getData="addNewArray" @update="updateArray" :logType="logType" ref="addemployee"></addemployee>-->
    <!--</transition>-->
    <!-- 推送主数据 -->
    <!--<transition name="fade">-->
      <!--<mainData v-show="openUpPerson" :mainType='mainType' :priValue='priValue' @closePerson="closePerson" @getData="getData" ref="modalPerson"></mainData>-->
    <!--</transition>-->
    <!--<transition name="fade">-->
      <!--<importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>-->
    <!--</transition>-->
    <!-- 选择用户 -->
    <transition name="fade">
      <userPage v-show="showMsg" :logType="logType" :pid="pid" :pname="pname" ref="userPage" @hideMsg="hideMsg"></userPage>
    </transition>
  </div>
</template>
<script>
//  import update from './empPoBase'
//  import addemployee from './addNewEmployee'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginData } from '../../../axios/axios'
//  import mainData from '../../rootManage/orgframe-manage/components/mainData'
//  import importExcel from '../../../components/importModel/importParam'
import userPage from './userPage'

  export default{
    name: 'empMaster',
    data() {
      return {
        showMsg: false, // 选择用户
        openUpPerson: false, // 推送主数据
        openImport: false, // 推送主数据
        mainType: 'emplyee', // 推送主数据
        priValue:  this.$global.mt+'r_employee_', // 推送主数据
        isSpin: false,
        Empstatus: [], // 员工状态下拉选择
        dataTree: [],
        loading: true,
        treeheight: document.body.offsetHeight - 200,
        tableheight: document.body.offsetHeight - 250,
        value: '',
        logType: '',
        addEmpId: NaN,
        openAddEmp: false,
        openUpdate: false,
        imp_mt:  this.$global.mt+'EmpMaster.importEmpData',
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '姓名',
            key: 'userName',
//            width: 100,
          },
          {
            title: '登录名',
            key: 'loginName',
//            width: 100,
          },
//          {
//            title: this.$t('lang_employee.empmaster.empkiEmptypeName'),
//            key: 'empkiEmptypeDis',
//            width: 200,
//          },
//        {
//          title: this.$t('button.opr'),
//          key: 'action',
//          width: 64,
//          fixed: 'right',
//          align: 'center',
//          render: (h, params) => {
//            return h('div', [
//              h('Button', {
//                style: {
//                  display: this.empkiStatus !== '02inactive' ? 'inline' : 'none',
//                },
//                props: {
//                  type: 'success',
//                  size: 'small',
//                },
//                on: {
//                  click: () => {
//                    this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
//                  },
//                },
//              }, this.$t('button.y.upd')),
//              h('Button', {
//                style: {
//                  display: this.empkiStatus === '02inactive' ? 'inline' : 'none',
//                },
//                props: {
//                  type: 'success',
//                  size: 'small',
//                },
//                on: {
//                  click: () => {
//                    this.openUp(params.row.id, this.$t('button.view'), params.index)
//                  },
//                },
//              }, this.$t('button.view')),
//            ])
//          },
//        },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        empCname: '',
        empNo: '',
        empkiStatus: '01active',
        statusDis: '在职',
        treeid: '',
        treeType: '',
        pklv: '',
        pid: '',
        pname: '',
        showAdvanced: false,
        noDataImg: '<div id="noData"></div>',
        isBtn:false
      }
    },
    computed: {

    },
    components: {
//      update,
//      addemployee,
//      mainData,
//      importExcel,
      userPage,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.empCname = ''
        t.empNo = ''
        t.page= 1
        t.total = 0
        t.pid = ''
        t.pname = ''
        t.data = []
//        t.empkiStatus = '01active'
//        t.statusDis = '在职'
        // t.getData(1)
//        t.getSelect()
        t.isBtn = true
        let func = t.$resize.call(t);
        window.onresize = func;
        func();
        t.getTree()
      }
    },
    methods: {
      destroyed () {
          window.onresize = null;
      },
      // 选择用户
      openSelectUser(id, logType) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.$refs.userPage.getData()
      },
      hideMsg() {
        let t = this
        t.getData()
        t.showMsg = false
      },
      getData() {
        const t = this
        t.isSpin = true
        // if (id === '$') {
        //   id = ''
        // }
        // if (page) {
        //   t.page = page
        // }
        const dataPar = {
          _mt:  this.$global.mt+'AuthRolePower.getMgUserForOrgUnit',
          // rows: t.rows,
          // page: t.page,
          // sort: t.sort,
          // order: t.order,
          APlogType: '组织权限列表查询',
          APuserName: t.empCname,
          APloginName: t.empNo,
          APunitId: t.pid,
        }
        // if (value) {
        //   dataPar.searchData = JSON.stringify(value)
        // }
        for (const dat in dataPar) {
          if (dataPar[dat] === '') {
            delete dataPar[dat]
          }
        }
        t.data = []
        t.tableselected = []
        getDataLevelUserLoginData(dataPar).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].value || []
            t.total = t.data.length
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
//      getSelect() {
//        const t = this
//        getDataLevelUserLogin({
//          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
//          typeCode: 'empstatus',
//        }).then((res) => {
//          if (isSuccess(res, t)) {
//            t.Empstatus = res.data.content[0].value[0].paramList
//          }
//        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
//        })
//      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoName) {
        const t = this
        if (paramCode === '10all') {
          t.empkiStatus = ''
        } else {
          t.empkiStatus = paramCode
        }
        t.pid = ''
        t.getData(1)
        t.statusDis = paramInfoName
      },
      closeUp() {
        const t = this
        t.openUpdate = false
//        t.$refs.update.clear()
      },
      getTree() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'OrgUnits.getTree',
          AProws: '100',
          APpage: 1,
          APsort: 'unitCode',
          APorder: 'asc',
          APlogType: this.$t('button.ser'),
          APid: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.loading = true
        t.dataTree = []
        getDataLevelUserLoginData(data).then((res) => {
          t.loading = false
          if (isSuccess(res, t)) {
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value)
            }, 500)
          }
        }).catch(() => {
          t.loading = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 树点击事件 */
      selectChange(e) {
        this.treeid = e.id
        this.treeType = e.unitType
        this.page = 1
        this.pid = e.id
        this.isBtn = false
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
        this.pname = e.unitCode + ' ' + e.unitsSname
        this.getData()
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.unitCode + ' ' + item.unitsSname
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.unitPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            item.expand = true
            val.push(item)
          }
        })
        return val
      },
      addNewArray(res) {
        const t = this
        // t.data.unshift(res)
        // t.getTree()
         t.getData()
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
        t.getTree()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.pid = this.treeType + '$' + this.treeid
          this.getData()
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.pid = this.treeType + '$' + this.treeid
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.pid = this.treeType + '$' + this.treeid
        t.getData()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
        	t.$Modal.confirm({
        		title: this.$t('reminder.remind'),
        		content: this.$t('reminder.confirmdelete'),
        		onOk: () => {
        			getDataLevelUserLoginData({
                _mt:  this.$global.mt+'AuthRolePower.delMgUserForOrgUnit',
                APfunId: '1',
                APlogType: this.$t('button.del'),
                APunitId: t.pid,
                APsysUserIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  setTimeout(()=>{
                    t.$Modal.success({
                      title: t.$t('reminder.suc'),
                      content: '删除成功',
                    })
                  },300)
                  t.tableselected = []
                  // t.getTree()
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
        		},
        		onCancel: () => {},
        	})
        }
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp1(id, logType) {
        const t = this
        t.addEmpId = parseInt(id, 10)
        t.logType = logType
        t.openAddEmp = true
        t.$refs.addemployee.resetField()
      },
      openUp(id, logType, index) {
        const t = this
        t.openUpdate = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
        this.pklv = id
//        this.$store.commit('empPo/setChildId1', id)
//        this.$store.commit('empPo/setIndex', index)
//        if (id) {
//          t.$refs.update.getOptionData()
//        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeEmp() {
        const t = this
//        t.$refs.addemployee.formEmpValidate.baseGid = ''
	  		t.openAddEmp = false
      },
      search() {
        this.treeid = ''
        this.page = 1
        this.treeType = ''
        this.getData()
      },
      renderContent(h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
          },
        }, [
          h('Button', {
            props: {
              type: 'text',
              size: 'small',
            },
            on: {
              click: () => { this.selectChange(data) },
            },
          }, [
            h('Icon', {
              props: {
                type: data.unitType === '01company' ? 'ios-home' : data.unitType === '10area' ? 'md-contact' : data.unitType === '20city' ? 'md-contact' : data.unitType === '30busi' ? 'md-locate' : 'md-ionic',
                size: '15',
                color: data.unitType === '01company' ? '#15a1f7' : data.unitType === '10area' ? '#f97432' : data.unitType === '20city' ? '#f97432' : data.unitType === '30busi' ? '#f46186' : '#00bed5',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
          ]),
        ])
      },
      // 推送主数据
//      openPerson() {
//        this.openUpPerson = true
//      },
//      closePerson() {
//        const t = this
//        t.openUpPerson = false
//      },
//      closeImport() {
//        const t = this
//        t.openImport = false
//      },
//      importExcel() {
//        const t = this
//        t.openImport = true
//        t.$refs.importExcel.getDowModelFile()
//      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .table-form{
    margin-bottom: 10px;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .colTree{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
    padding-left: 6px;
    /*height: 750px;*/
    border-top: 2px solid rgba(9,161,252,1);
    overflow: auto;
    position: relative;
  }
  .btn{
    margin-right: 5px;
  }
  /deep/ .ivu-tree-title{
    width: auto !important;
  }
</style>
