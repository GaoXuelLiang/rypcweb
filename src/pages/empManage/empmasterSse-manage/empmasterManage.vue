<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_employee.empmaster.title')}}
        </p>
        <Row>
          <row class="table-form" ref="table-form">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <Table @on-select="selectedtable" :loading="loading" @on-select-cancel="selectedtable" stripe @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="search()"></Button></Row>
        </Row>
      </card>
      </Col>
    </Row>
    <!--<transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>-->
    <transition name="fade">
      <update v-if="openUpdate" :pklv="pklv" @closeUp="closeUp" :logType="logType"></update>
    </transition>
    <transition name="fade">
    	<addemployee v-show="openAddEmp" @closeEmp="closeEmp" :id="addEmpId" @getData="addNewArray" @update="updateArray" :logType="logType" ref="addemployee"></addemployee>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import update from '../empmaster-manage/empPoBase'
  import addemployee from '../empmaster-manage/addNewEmployee'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import advanced from '../../../components/searchTable/searchAdvanced'

  export default{
    name: 'empMaster',
    data() {
      return {
        isSpin: false,
        Empstatus: [], // 员工状态下拉选择
        dataTree: [],
        loading: true,
        treeheight: document.body.offsetHeight - 200,
        tableheight: document.body.offsetHeight - 220,
        value: '',
        logType: '',
        addEmpId: NaN,
        openAddEmp: false,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_employee.empmaster.empCname'),
            key: 'empCname',
            // width: 100,
          },
          {
            title: this.$t('lang_employee.empmaster.empGenderDis'),
            key: 'empGenderDis',
            // width: 70,
          },
          {
            title: this.$t('lang_employee.empmaster.companyName'),
            key: 'empcompHirecompanyDis',
            // width: 200,
          },
          {
            title: this.$t('lang_employee.empmaster.deptName'),
            key: 'empcompDeptDis',
            // width: 200,
          },
          {
            title: this.$t('lang_employee.empmaster.empcompPostDis'),
            key: 'empcompPostDis',
            // width: 200,
          },
          // {
          //   title: this.$t('lang_employee.empmaster.empGid'),
          //   key: 'empGid',
          //   width: 120,
          // },
          {
            title: this.$t('lang_employee.empmaster.empcompEntrydate'),
            key: 'empcompEntrydate',
            // width: 100,
          },
          {
            title: this.$t('lang_employee.empmaster.empkiWorkno'),
            key: 'empkiWorkno',
            // width: 120,
          },
//          {
//            title: this.$t('lang_employee.empmaster.empkiEmptypeName'),
//            key: 'empkiEmptypeDis',
//            width: 200,
//          },
        {
          title: this.$t('button.opr'),
          key: 'action',
          // width: 80,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                style: {
                  display: this.empkiStatus !== '02inactive' ? 'inline' : 'none',
                },
                props: {
                  type: 'success',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                  },
                },
              }, this.$t('button.y.upd')),
              h('Button', {
                style: {
                  display: this.empkiStatus === '02inactive' ? 'inline' : 'none',
                },
                props: {
                  type: 'info',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.openUp(params.row.id, this.$t('button.view'), params.index)
                  },
                },
              }, this.$t('button.view')),
            ])
          },
        },
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
        empkiStatus: '',
        statusDis: '',
        treeid: '',
        treeType: '',
        pklv: '',
        pid: '',
        showAdvanced: false,
      }
    },
    computed: {

    },
    components: {
      update,
      addemployee,
      advanced
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.empCname = ''
        t.empNo = ''
        t.pid = ''
        t.empkiStatus = '01active'
        t.statusDis = '在职'
        t.getData(1)
        t.getSelect()
      }
    },
    methods: {
      advSearch() {
        this.showAdvanced = true
        this.$nextTick(()=>{
          this.$refs.advanced.getData()
        })
      },
      closeAdvanced() {
        this.showAdvanced = false
      },
      getData(page,value) {
        const t = this
        t.isSpin = true
        // if (id === '$') {
        //   id = ''
        // }
        if (page) {
          t.page = page
        }
        const dataPar = {
          _mt:  this.$global.mt+'ViewEmpMaster.getESSPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '员工主数据查询',
        }
        if (value) {
          dataPar.searchData = JSON.stringify(value)
        }
        for (const dat in dataPar) {
          if (dataPar[dat] === '') {
            delete dataPar[dat]
          }
        }
        getDataLevelUserLoginNew(dataPar).then((res) => {
          t.isSpin = false
          t.loading = false
          if (isSuccess(res, t)) {
          	t.data = []
            if (res.data.content[0].rows) {
              for (let i = 0; i < res.data.content[0].rows.length; i++) {
                t.data.push({
                  id: res.data.content[0].rows[i].id,
                  empCname: res.data.content[0].rows[i].empCname,
                  empcompHirecompanyDis: res.data.content[0].rows[i].empcompHirecompanyDis,
                  empcompEntrydate: res.data.content[0].rows[i].empcompEntrydate,
                  empcompDeptDis: res.data.content[0].rows[i].empcompDeptDis,
                  empGenderDis: res.data.content[0].rows[i].empGenderDis,
                  empGid: res.data.content[0].rows[i].empGid,
                  empcompPostDis: res.data.content[0].rows[i].empcompPostDis,
                  empkiWorkno: res.data.content[0].rows[i].empkiWorkno,
                  empkiEmptypeDis: res.data.content[0].rows[i].empkiEmptypeDis,
                })
              }
              t.total = res.data.content[0].records
            }
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'empstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.Empstatus = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
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
          rows: '100',
          page: 1,
          sort: 'unitCode',
          order: 'asc',
          logType: this.$t('button.ser'),
          id: '0',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value)
            }, 500)
          }
        }).catch(() => {
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
        this.pid = e.unitType + '$' + e.id
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
            val.push(item)
          }
        })
        return val
      },
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
        t.getTree()
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
        			getDataLevelUserLogin({
          _mt:  this.$global.mt+'EmpMaster.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.tableselected = []
            t.getTree()
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
        t.$refs.addemployee.formEmpValidate.baseGid = ''
	  		t.$refs.addemployee.formEmpValidate.baseCname = ''
	  		t.$refs.addemployee.formEmpValidate.baseAlias = ''
	  		t.$refs.addemployee.formEmpValidate.baseLastname = ''
	  		t.$refs.addemployee.formEmpValidate.baseFirstname = ''
	  		t.$refs.addemployee.formEmpValidate.idsType = ''
	  		t.$refs.addemployee.formEmpValidate.idsNo = ''
	  		t.$refs.addemployee.formEmpValidate.baseBirthdate = ''
	  		t.$refs.addemployee.formEmpValidate.baseGender = ''
	  		t.$refs.addemployee.formEmpValidate.baseMarriage = ''
	  		t.$refs.addemployee.formEmpValidate.baseNation = ''
	  		t.$refs.addemployee.formEmpValidate.basePolitical = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechnicaltitle = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechspec = ''
	  		t.$refs.addemployee.formEmpValidate.baseFirstworkdate = ''
	  		t.$refs.addemployee.formEmpValidate.baseTechdate = ''
	  		t.$refs.addemployee.formEmpValidate.pkiWorkno = ''
	  		t.$refs.addemployee.formEmpValidate.pkiEmptype = ''
	  		t.$refs.addemployee.formEmpValidate.compHirecompany = ''
	  		t.$refs.addemployee.formEmpValidate.compDept = ''
	  		t.$refs.addemployee.formEmpValidate.compPost = ''
	  		t.$refs.addemployee.formEmpValidate.compCostcenter = ''
	  		t.$refs.addemployee.formEmpValidate.compHirelocation = ''
	  		t.$refs.addemployee.formEmpValidate.compWorklocation = ''
	  		t.$refs.addemployee.formEmpValidate.compBuspmp = ''
	  		t.$refs.addemployee.formEmpValidate.compFunpmp = ''
	  		t.$refs.addemployee.formEmpValidate.compEntrydate = ''
	  		t.$refs.addemployee.formEmpValidate.compServicedate = ''
	  		t.$refs.addemployee.formEmpValidate.compCertificatedate = ''
	  		t.$refs.addemployee.formEmpValidate.compHr = ''
	  		t.$refs.addemployee.formEmpValidate.ctContracttype = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractperiod = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractsdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractedate = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractprom = ''
	  		t.$refs.addemployee.formEmpValidate.ctConfidential = ''
	  		t.$refs.addemployee.formEmpValidate.ctContractworktime = ''
	  		t.$refs.addemployee.formEmpValidate.ctSigndate = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbation = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbationdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctProbationprom = ''
	  		t.$refs.addemployee.formEmpValidate.salPostlevel = ''
	  		t.$refs.addemployee.formEmpValidate.salSalarylevel = ''
	  		t.$refs.addemployee.formEmpValidate.salTravellevel = ''
	  		t.$refs.addemployee.formEmpValidate.salAdminlevel = ''
	  		t.$refs.addemployee.formEmpValidate.salSalaryset = ''
	  		t.$refs.addemployee.formEmpValidate.bkBank = ''
	  		t.$refs.addemployee.formEmpValidate.bkAccount = ''
	  		t.$refs.addemployee.formEmpValidate.bkAccnane = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefitlocation = ''
	  		t.$refs.addemployee.formEmpValidate.sbHfundlocatio = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefitpolicy = ''
	  		t.$refs.addemployee.formEmpValidate.sbBenefittype = ''
	  		t.$refs.addemployee.formEmpValidate.edEducationlevel = ''
	  		t.$refs.addemployee.formEmpValidate.edCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.edSchool = ''
	  		t.$refs.addemployee.formEmpValidate.edDegree = ''
	  		t.$refs.addemployee.formEmpValidate.edSpecialty = ''
	  		t.$refs.addemployee.formEmpValidate.edSdate = ''
	  		t.$refs.addemployee.formEmpValidate.edEdate = ''
	  		t.$refs.addemployee.formEmpValidate.ctaMobile = ''
	  		t.$refs.addemployee.formEmpValidate.ctaPhone = ''
	  		t.$refs.addemployee.formEmpValidate.ctaPersmail = ''
	  		t.$refs.addemployee.formEmpValidate.ctaCompmail = ''
	  		t.$refs.addemployee.formEmpValidate.ctaQq = ''
	  		t.$refs.addemployee.formEmpValidate.ctaWechat = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmergcontact = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcrelation = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcphone = ''
	  		t.$refs.addemployee.formEmpValidate.ctaEmcaddr = ''
	  		t.$refs.addemployee.formEmpValidate.addCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.addProvince = ''
	  		t.$refs.addemployee.formEmpValidate.addCity = ''
	  		t.$refs.addemployee.formEmpValidate.addStreet = ''
	  		t.$refs.addemployee.formEmpValidate.addZip = ''
	  		t.$refs.addemployee.formEmpValidate.addrCuntry = ''
	  		t.$refs.addemployee.formEmpValidate.addrProvince = ''
	  		t.$refs.addemployee.formEmpValidate.addrCity = ''
	  		t.$refs.addemployee.formEmpValidate.addrStreet = ''
	  		t.$refs.addemployee.formEmpValidate.addrRegisterproperty = ''
	  		t.$refs.addemployee.formEmpValidate.addrZip = ''
        t.$refs.addemployee.cropedImg = ''
        t.$refs.addemployee.cropedImgDis = ''
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
                type: data.unitType === '01company' ? 'social-buffer' : 'ios-people',
                size: '15',
                color: data.unitType === '01company' ? '#3399ff' : '#ff9900',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
          ]),
        ])
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
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
  	padding-left: 10px;
  	box-sizing: border-box;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
