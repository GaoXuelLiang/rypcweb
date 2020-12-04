<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>投递员工列表
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <!-- <Input :placeholder="$t('lang_employee.searchColumn.bankCnameDis')" class="searchInput" style="width: 200px" v-model="bankCname"/>
        <span style="margin: 0;">
          <Button type="info" class="btnStyle" style="width:56px" :loading="isSpin"  @click="search">
          <span v-if="!isSpin">{{$t('button.ser')}}</span>
          </Button>
        </span> -->
        <Select v-model="selStatus"
                placeholder="请选择录用状态"
                class="pickData"
                @on-change="selData"
                clearable>
                <Option v-for="(item,index) in selList"
                        :value="item.code"
                        :key="index">{{item.name}}</Option>
        </Select>
        <span style="margin: 0;" v-show="type === 0 && selly"><Button class="btnStyle" type="success" :loading="isSpin" @click="iSData(1)"><span>录用</span></Button></span>
        <span style="margin: 0;" v-show="type === 0 && selisly"><Button class="btnStyle" type="success"  :loading="isSpin" @click="iSData(2)"><span>不录用</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" 
               size="small"
               stripe
               :loading="loading"
               :no-data-text="noDataImg"
               ref="selection"
               :columns="searchBankCol"
               @on-select="selectedtable"
               @on-select-cancel="selectedtable"
               @on-select-all="selectedtable"
               :data="data"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
        <Button size="small"
                shape="circle"
                icon="md-refresh"
                class="refresh"
                @click="refresh">
        </Button>
      </Row>
    </div>
    <!-- 我的简历 -->
    <Modal v-model="myResumeShow"
            :width="100"
            :height="100"
            :closable="false"
            :footer-hide="true"
            :draggable="true">
          <transition name="fade">
              <myResume v-show="myResumeShow"
                        @closeEmpInfo="closeEmpInfo"
                        :empId="dataEmpId"
                        ref="myResume"></myResume>
          </transition>
    </Modal>
  </div>
</template>
<script>
  import { getDataLevelUserLoginData } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

import myResume from "../../pages/empzz/myResume";
  export default{
    data() {
      return {
        data: [],
        isSpin:false,
        loading: false,
        noDataImg: '<div id="noData"></div>',
        total: 0,
        params: {
          _mt: this.$global.mt + "EmpAcceptrec.getPage",
          APid: "",
          APsort: "id",
          APorder: "desc",
          AProws: 10,
          APpage: 1,
          APffk: "glc1860",
          APfunId: 1860,
          APsign: "",
          APacrstatus: "01all"
        },
        params2: {
          _mt: this.$global.mt + "EmpAcceptrec.setStatus",
          APids: "",
          APsort: "id",
          APorder: "desc",
          AProws: 10,
          APpage: 1,
          APffk: "glc1860",
          APfunId: 1860,
        },
        postId: "",
        selStatus:"01all", 
        selly: true,
        selisly: true,
        selList: [
          {
            code: "01all",
            name: "全部"
          },
          {
            code: "02statusLY",
            name: "未录用"
          },
          {
            code: "01statusLY",
            name: "已录用"
          },
        ],
        id: "",
        status: "",
        myResumeShow: false,
        dataEmpId: "",
        tableselected: [],
        searchBankCol:[ 
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "员工姓名",
            key: "acrEmpidDis",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {},
                    on: {
                      click: () => {
                        this.openResume(params.row.acrEmpid);
                      }
                    }
                  },
                  params.row.acrEmpidDis
                )
              ]);
            }
          },
          {
            title: "当前公司",
            key: "acrUnitidDis",
            align: "center",
            render: (h, params) => {
                        return h("div", [
                            h("Tooltip", {
                                props: {
                                    content: params.row.acrUnitidDis,
                                },
                            }, params.row.acrUnitidDis),
                        ]);
                    },
          },
          {
            title: "当前部门",
            key: "acrDeptidDis",
            align: "center",
            render: (h, params) => {
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            content: params.row.acrDeptidDis,
                            },
                          }, params.row.acrDeptidDis)
                        ])
                    }
          },
          {
            title: "当前岗位",
            key: "acrPostidDis",
            align: "center",
            render: (h, params) => {
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            content: params.row.acrPostidDis,
                            },
                          }, params.row.acrPostidDis)
                        ])
                    }
          },
          {
            title: "当前职等",
            key: "acrRankidDis",
            align: "center",
            render: (h, params) => {
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            content: params.row.acrRankidDis,
                            },
                          }, params.row.acrRankidDis)
                        ])
                    }
          },
          {
            title: "投递时间",
            key: "acrTdtime",
            align: "center",
            render: (h, params) => {
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            content: params.row.acrTdtime,
                            },
                          }, params.row.acrTdtime)
                        ])
                    }
          },
          {
            title: "录用结果",
            key: "acrStatusDis",
            align: "center",
            render: (h, params) => {
                      return h('div', [
                        h('Tooltip', {
                          props: {
                            content: params.row.acrStatusDis,
                            },
                          }, params.row.acrStatusDis)
                        ])
                    }
          },
          
        ]
      }
    },
    props: {
      // searchBankCol: Array,
      type: Number
    },
    components: {
        myResume,
    },
    mounted() {
    },
    methods: {
      refresh () {
        const t = this;
        t.getData(t.id,t.postId)
      },
      selData(val) {
        const t = this;
        t.selStatus = val;
        if (val === "01statusLY") {
          // 已录用
          t.params.APacrstatus = "01statusLY"
          t.selisly = true;
          t.selly = false;
        }  else if (val === "02statusLY") {
          // 未录用
          t.params.APacrstatus = "02statusLY"
          t.selisly = false;
          t.selly = true;
        } else {
          // 全部
          t.params.APacrstatus = "01all";
          t.selisly = true;
          t.selly = true;
        }
        t.getData(t.id,t.postId)
      },
    	getData(id,postId) {
        const t = this
        t.id = id;
        if (postId) {
          t.postId = postId;
        }
        t.loading = true;
        const data = deepCopy(t.params)
        data.APid = t.id;
        data.acrPostid = t.postId;
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false;
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.loading = false;
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(() => {
            t.loading = false;
        })
      },
      iSData (val) {
        const t = this;
        if (t.tableselected.length === 0) {
            t.$Modal.warning({
                title: this.$t('reminder.remind'),
                content: this.$t('reminder.leastone'),
            })
        } else {
          if (val == 1){
            t.$Modal.confirm({
              title: this.$t('reminder.remind'),
              content: "您确定录用已选中员工吗？",
              onOk: () => {
                t.status = "01statusLY"
                t.lyFun(t.status);
              },
              onCancel: () => {
                t.loading = false;
              },
            })
          } else {
            // t.status = "02statusLY"
            // t.lyFun(t.status);
            t.$Modal.confirm({
              title: this.$t('reminder.remind'),
              content: "您确定不录用已选中员工吗？",
              onOk: () => {
                t.status = "02statusLY"
                t.lyFun(t.status);
              },
              onCancel: () => {
                t.loading = false;
              },
            })
          }
        }
      },
      lyFun (val) {
        const t = this;
        t.loading = true;
        let data = deepCopy(t.params2);
        data.APacrstatus = val;
        data.APids = t.tableselected.toString();
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.loading = false;
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            if (res.data.content[0].value === 1) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: "录用成功",
              })
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: "操作成功",
              })
            }
            t.getData(t.id,t.postId)
          }
        }).catch(() => {
          t.loading = false;
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(() => {
            t.loading = false
        })
      },
      openResume (id) {
            const t = this;
            t.myResumeShow = true;
            t.dataEmpId = id;
            t.$nextTick(() => { 
              t.$refs.myResume.getData();
            })
      },
      closeEmpInfo () {
          const t = this;
          t.myResumeShow = false;
      },
    	close() {
    		const t = this
        this.params.APpage = 1
        t.selStatus = "01all"
        t.params.APacrstatus = "01all"
    		t.$emit('closeEmpMailList')
    	},
    	clear() {
        const t = this
        t.selStatus = "01all"
        t.params.APacrstatus = "01all"
    		t.$emit('closeEmpMailList')
    	},
    	// sortable(column) {
	    //     this.params.APsort = column.key
	    //     this.params.APorder = column.order
	    //     if (column.order !== 'normal') {
	    //       this.getData()
	    //     }
      //   },
      selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
      },
    	sizeChange(size) {
	        const t = this
	        t.params.AProws = size
	        t.getData(t.id,t.postId)
	      },
	    pageChange(page) {
	        const t = this
	        t.params.APpage = page
	        t.getData(t.id,t.postId)
	      },
    },
  }
</script>
<style lang="scss" scoped>
 @import '../../sass/searchTable.scss';
 .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  background: #19be6b;
 }
 .pickData {
   width: 200px;
   color: #ffffff;
   margin-right: 10px;
 }
 .refresh {
   margin-left: 10px;
 }
/deep/ .ivu-modal-body {
    padding: 0;
}
/deep/ .ivu-modal {
    width: 80% !important;
}
/deep/ .ivu-modal-content {
    border: none;
    box-shadow: none !important;
    background: transparent !important;
}
/deep/ .ivu-modal-footer {
    border-top: none !important;
}
</style>
