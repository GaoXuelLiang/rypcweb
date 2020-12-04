<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>选择员工
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" placeholder="请输入员工姓名" v-model="empCname"/>
        <span class="btnStyle">
          <Button type="info" style="width:56px" :loading="spinShow"  @click="search">
            <span v-if="!spinShow">{{$t('button.ser')}}</span>
          </Button>
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Table :no-data-text="noDataImg" height="320" size="small" stripe ref="selection" :columns="searchCloumns" @on-sort-change="sortable" @on-selection-change="selectChange" @on-select-cancel="selectCancel" @on-row-dblclick="dbCkick" :data="data"></Table>
          <!-- @on-row-dblclick="dbCkick" -->
      </row>
      <row style="display: flex">
        <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </row>
    </div>
    <transition name="fade">
      <searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
    </transition>
  </div>
</template>
<script>
  import searchDept from '../../../components/searchTable/searchDept'
  import { getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default{
    components: {
        searchDept,
    },
    data() {
      return {
        title: '选择考核对象',
        data: [],
        total: NaN,
        post: '',
        postId: '',
        showSearchPost: false,
        newArr: [],
        current: 1,
        empCname: '',
        searchCloumns: [
          {
            title: '员工姓名',
            key: 'empCname',
          },
          {
            title: this.$t('lang_performance.fileClass.checkCompany'),
            key: 'empcompHirecompanyDis',
          },
          {
            title: this.$t('lang_performance.fileClass.checkSection'),
            key: 'empcompDeptDis',
          },
          {
            title: this.$t('lang_performance.fileClass.checkStation'),
            key: 'empcompPostDis',
          },
        ],
        params: {
            _mt:  this.$global.mt+'ViewEmpMaster.getPage',
            funId: '1',
            logType: '查询要添加的员工信息列表',
            rows: 10,
            page: 1,
            sort: 'id',
            order: 'asc',
        },
        //      部门
        empcompDept: '',
        empcompDeptDis: '',
        openDept: false,
        searchDeptClo: [
          {
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'compFnameCnDis',
          },
          {
            title: this.$t('lang_employee.searchColumn.departEnFullName'),
            key: 'compFnameEnDis',
          },
        ],
        paramsDept: {
          _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          funId: '1106',
          logType: '部门',
          unitType: '70dept',
        },
        noDataImg: '<div id="noData"></div>',
        spinShow: false
      }
    },
    props: {
        logType: String,
        id: Number,
    },
    mounted() {

    },
    methods: {
      dbCkick(row) {
        const t = this
        t.empCname = ''
        this.$emit('changeinput', row.empCname, row.id)
        this.getData()
        t.close()
      },
      search() {
        this.params.page = 1
        this.getData()
      },
        getData() {
            const t = this
            t.spinShow = true
            t.data = []
            let data = deepCopy(t.params)
            data.empCname = t.empCname
            data.empcompPost = t.postId
            data.empcompDept = t.empcompDept
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.current = res.data.content[0].page
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
              t.spinShow = false
          })
        },
        close() {
            this.normName = ''
            this.params.page = 1
            this.data = []
            this.$emit('hideMsg')
        },
        // 保存选择的员工
        save(){
            let t = this;
            let params2 = {
                _mt:  this.$global.mt+'EvaluationTargetemp.addList',
                funId: '1',
                logType: '新增考核对象',
                evateEmpid: t.newArr.toString(),
                evateActionid: this.id
            }
            getDataLevelUserLoginNew(params2).then((res) => {
                t.newArr = [];
                if (isSuccess(res, t)) {
                    t.close();
                }
            }).catch(() => {
                t.newArr = []
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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
        // 点击弹出岗位弹窗
        selectPerid(){
            let t = this
            t.showSearchPost = true
        },
        // 双击清除选中岗位
        dbPeriod(){
            let t = this
            t.post = ''
            t.postId = ''
        },
        // 关闭岗位弹窗
        closeUpP(){
            let t = this
            t.showSearchPost = false
        },
        // 双击选中岗位
        changeinputP(row,id){
            let t = this
            t.showSearchPost = false
            t.post = row.postFnameCnDis
            t.postId = id
        },
        // 多选触发函数
        selectChange(row){
            let t = this;
            for(let i = 0; i <= row.length-1; i++){
                if(t.newArr.indexOf(row[i].id) == -1){
                    t.newArr.push(row[i].id)
                }
            }
        },
        // 取消选中时触发
        selectCancel(selection,row){
            let t = this
            for(let i = 0; i <= t.newArr.length-1; i++){
                if(t.newArr[i] == row.id){
                    t.newArr.splice(i,1)
                }
            }
        },
        // 修改列表排序
        sortable(column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.params.order = 'desc'
            }
        },
      // 选择部门
      pickDepart() {
        const t = this
          const paramsDept = deepCopy(t.paramsDept)
          t.$refs.searchDept.getData(paramsDept, '')
          t.openDept = true
      },
      inputDept(name, id) {
        const t = this
        t.empcompDeptDis = name
        t.empcompDept = id
      },
      clearDepart() {
        const t = this
        t.empcompDeptDis = ''
        t.empcompDept = ''
      },
      closeDept() {
        const t = this
        t.$refs.searchDept.unitCode = ''
        t.openDept = false
      },
    },
  }
</script>
<style lang="scss" scoped>
   @import "../../../sass/searchTable";

</style>
