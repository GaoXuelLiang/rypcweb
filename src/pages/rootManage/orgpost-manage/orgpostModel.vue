<template>
  <div class="table" style="max-height: 420px">
    <Row>
      <Col span="24">
        <Row>
          <Col span="6" class="colTree" >
            <!-- :loading="isloding" -->
            <div   class="divtree" :style="{height:treeheight + 'px'}">
              <Tree v-if="dataTree != ''" :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
              <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
            </div>
          </Col>
          <Col span="18" style="width: 73.3333% !important">
          <Row>
            <span style="margin: 0;"><Button type="primary" @click="jumpability()">选择能力指标</Button></span>
            <Button type="primary" @click="jumplevel()" >批量调整指标等级</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          </Row>
          <row class="table-form" ref="table-form">
            <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" height="420" size="small" border ref="selection" :columns="columns" :data="data"></Table>
          </row>
          <Row style="display: flex">
            <Page :total="total" :current="page" size="small"
              show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
              @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" >
            </Page>
            <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="search()">
            </Button>
          </Row>
          </Col>
        </Row>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <modelAbility @closePower="closePower" v-show="showModelAbility" ref="modelAbility"></modelAbility>
    <modellevel @closeLevel="closeLevel" v-show="showModellevel" ref="modellevel"></modellevel>
  </div>
</template>
<script>
  import modelAbility from './modelAbility'
  import modellevel from './modellevel'
  import update from './modelUpdate'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  export default{
    data() {
      return {
        loading: true,
        dataTree: [],
        treeheight: '420px',
        value: '',
        logType: '',
        openUpdate: false,
        showModelAbility: false,
        showModellevel: false,
        updateId: NaN,
        tableselected: [],
        newId:[],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left',
          },
          {
            title:'胜任指标编号',
            key: 'pqdIndexno',
            width: 150,
            fixed: 'left',
          },
          {
            title: '胜任指标类型',
            width: 150,
            key: 'pqdIndiType',
          },
          {
            title: '胜任指标名称',
            width: 180,
            key: 'pqdIndiName',
          },
          {
            title: '胜任指标描述',
            width: 180,
            key: 'pqdIndiDec',
          },
          {
            title: '关键行为描述',
            width: 180,
            key: 'pqdIndiActionDec',
          },
          {
            title: '胜任能力等级',
            key: 'pqdLevelDis',
            width: 180,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
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
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        params: {
          _mt:  this.$global.mt+'OrgPostqualifiedmodel.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'postCode',
          order: 'asc',
          logType: '查询',
        },
        postCode: '',
        postFnameDis: '',
        treeid: '',
        page: 1,
        logType: '',
        code:'',
        dataArr: []
      }
    },
    computed: {

    },
    components: {
      update,
      modelAbility,
      modellevel
    },
    props: {
      id: Number,
    },
    mounted() {
    },
    methods: {
      getData(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.pqdBillid = this.$store.state.user.masterPublicId
        const data = deepCopy(t.params)
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
      getTree() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'CompetenceIndex.getTree',
          rows: '100',
          page: '1',
        //  sort: 'unitCode',
          order: 'asc',
          logType: this.$t('button.ser'),

        }
        data.id = '0'
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
        this.page = 1
        this.getData()
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.competName  //树显示名字
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.competSuperior]  // 等级修改
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
          this.getData(this.treeid)
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData(this.treeid)
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData(this.treeid)
      },
      selectedtable(selection) {
        const newArr = []
        const newLevel = []
        const codeArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
          newLevel.push(selection[i].pqdIndexnoDis)
          codeArr.push(selection[i].pqdIndexno)
        }
        this.tableselected = newArr
        this.newId = newLevel
        this.code = codeArr
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
          _mt:  this.$global.mt+'OrgPostqualifiedmodel.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
        }).then((res) => {
          if (isSuccess(res, t)) {
             t.$Modal.success({
              title: this.$t("reminder.suc"),
              content: '删除成功'
            });
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        // t.$refs.update.getSelect()
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(id)
        }else {
          t.$refs.update.getCodeList()
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false

      },
      search() {
        this.treeid = ''
        this.params.page = 1
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
                type: data.postType === '01company' ? 'social-buffer' : data.postType === '70dept' ? 'ios-people' : 'person',
                size: data.postType === '01company' ? '15' : data.postType === '70dept' ? '15' : '10',
                color: data.postType === '01company' ? '#3399ff' : data.postType === '70dept' ? '#ff9900' : '#2fcc28',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
            ]),
          ])
      },
      jumpability() {
        const t = this
        const dataArr = []
        if(!t.data){
          t.$refs.modelAbility.nameData = ''
        }else {
          for(let i= 0;i<t.data.length;i++){
            if(t.data[i].pqdIfTwo == 0){
              let obj = {}
              obj = t.data[i]
              dataArr.push(obj)
            }
          }
          t.$refs.modelAbility.nameData = dataArr
        }
        t.showModelAbility = true
        t.$refs.modelAbility.getData()
      },
      closePower() {
        const t = this
        t.showModelAbility = false
        t.getData()
      },
      jumplevel() {
        const t = this
        const codeArr = []
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          for(let i= 0;i<t.data.length;i++){
            if(t.data[i].pqdIfTwo == 0){
              let obj = {}
              obj = t.data[i].pqdIndexno
              codeArr.push(obj)
            }
          }
          t.$refs.modellevel.code = codeArr.toString()
          t.$refs.modellevel.getSelect()
          t.$refs.modellevel.getData(t.newId)
          t.$refs.modellevel.selectId = t.newId.toString()
          t.showModellevel = true
          t.tableselected = []
          t.getTree()
        }
      },
      closeLevel() {
        const t = this
        t.tableselected = []
        t.showModellevel = false
        t.getData()
      }
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
		.ivu-table-tip {
			height: 400px;
      table {
        td{
          width: auto;
          max-height: 420px;
          height: 420px;
        }
      }
		}
  }
	.ivu-table-wrapper{
		max-height: 420px !important;
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
    height: 460px;
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>

