<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          审批服务跟踪
        </p>
        <Row style="font-size:0;">
          <Input class="btn" placeholder="请输入审批标题" style="width: 200px" v-model="apblTitlecn"/>
          <Select class="btn" v-model="sibaBussource" clearable style="width: 200px;" placeholder="选择审批状态" >
            <Option :value="item.paramCode" v-for="(item,index) in bussourceType" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <span class="btn">
            <Button type="info"  @click="getData(1)">{{$t('button.ser')}}</Button>
            <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
          </span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table :no-data-text="noDataImg" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"  @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" :height="tableheight" size="small" stripe ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
	    <commonFlowUpdate v-if="openTestUpd"
	                      @close="closeTest"
	                      ref="commonFlowUpdate"
	                      :pkValue="pkValue"
	                      :aprvrelaStepidAll="flowId"
	                      :aprvrelTitle="aprvrelTitle"
	                      :aprdBillid="aprdBillid"
                        :displayHide="displayHide"
                        isType="approval"
      >
	    </commonFlowUpdate>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
	import commonFlowUpdate from '../../ansrptManage/toDoListManage/commonFlowUpdate'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import advanced from '@/components/searchTable/searchAdvanced'
  export default{
    name: 'platAprvbill',
    data() {
      return {
        tableheight: document.body.offsetHeight - 250,
        value: '',
        showAdvanced: false,
        openTestUpd: false,
        displayHide: false,
        tableselected: [],
        bussourceType: [
          {
            paramCode: '00processing',
            paramInfoCn: '审批中'
          },
          {
            paramCode: '01approved',
            paramInfoCn: '审批通过'
          },
        ],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '审批流程',
            key: 'apblAprvidDis',
            sortable: 'custom',
          },
          {
            title: '审批标题中文',
            key: 'apblTitlecn',
            sortable: 'custom',
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top-start', color: 'white' },
              }, [
                params.row.apblTitlecn,
                h('span', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    color: 'white',
                  },
                }, params.row.apblTitlecn),
              ])
            },
          },
          {
            title: '提交人',
            key: 'createByDis',
            sortable: 'custom',
          },
          {
            title: '提交时间',
            key: 'createTime',
            sortable: 'custom',
          },
          {
            title: '状态',
            key: 'apblStatusDis',
            sortable: 'custom',
          },
          {
            title: '审批完成时间',
            key: 'apblRestime',
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
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
                      this.openUp(params.row, '查看')
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        index: 0,
        apblTitlecn: '',
        aprvrelTitle: '',
        logType: '',
        flowId: '',
        pkValue: '',
        aprdBillid: '',
        sibaBussource: '',
        noDataImg:  '<div id="noData"></div>'
      }
    },
    computed: {

    },
    components: {
      commonFlowUpdate,
      advanced,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.apblTitlecn = ''
        t.sibaBussource = ''
        t.getData(1)
      }
    },
    methods: {
      advSearch() {
        this.showAdvanced = true
        this.$nextTick(() => {
          this.$refs.advanced.getData()
        })
      },
      closeAdvanced() {
        this.showAdvanced = false
      },
      getData(page, value) {
        const t = this
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatAprvbill.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          apblTitlecn: t.apblTitlecn,
          apblStatus: t.sibaBussource
        }
        if (value) {
          data.searchData = JSON.stringify(value)
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
        })
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
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
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      openUp(row, logType) {
        const t = this
        t.flowId = row.apblAprvid
        t.pkValue = row.apblDataid
        t.aprdBillid = row.id
        t.aprvrelTitle = row.apblTitlecn
        t.openTestUpd = true
      },
      closeTest() {
      	const t = this
        t.openTestUpd = false
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
  .btn{
    margin-right: 8px;
  }
</style>
