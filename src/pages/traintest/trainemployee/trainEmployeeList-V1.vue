<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>&nbsp;培训-员工信息
        </p>
        <Row>
          <Col span="24">
          <Row>
            <Input v-model="searchParams.trempWorkno"
                   placeholder="请输入工号"
                   style="width: 200px"/> <Input v-model="searchParams.trempName"
                                                 placeholder="请输入姓名"
                                                 style="width: 200px"/>
            <!-- 页面按钮 -->
            <btnList @buttonExport="expData"
                     @buttonAdd="openUp(NaN,'新增')"
                     @buttonDel="deletemsg"
                     @buttonSearch="search"
                     @buttonImport="importExcel"
                     @moditySelect="modityChange"
                     :btnData="btnData"
                     :FlowNode="FlowNode">
            </btnList>

          </Row>
          <!-- 表格 分页 -->
          <commonPage :imp_mt="imp_mt"
                      :page_mt="page_mt"
                      :exp_mt="exp_mt"
                      :dele_mt="dele_mt"
                      :state_mt="state_mt"
                      :expDataTital="expDataTital"
                      @tableBtn="tableBtn"
                      ref="commonPage">
          </commonPage>
          </Col>
        </Row>
      </card>
      </Col>
    </Row>
    <!-- 新增修改弹窗页面  v-show控制是否显示 :**是传递到子页面的值  @**是传递到子页面的方法 无需变更-->
    <transition name="fade">
      <update v-show="openUpdate"
              :id="updateId"
              :logType="logType"
              :index="index"
              @closeUp="closeUp"
              @newData="addNewArray"
              @update="updateArray"
              ref="update"></update>
    </transition>
    <!--搜索 弹出选择框  -->
    <transition name="fade">

    </transition>
  </div>
</template>
<script>
  import {isSuccess} from "@/lib/util";
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from "@/axios/axios";
  import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
  import update from "./trainEmployeeEdit";                    //新增修改组件
  import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

  export default {
    data() {
      return {
        // 导入的mt名称
        imp_mt:  this.$global.mt+'TrainEmployee.importData',
        // 导出的mt名称
        exp_mt:  this.$global.mt+'TrainEmployee.export',
        // 导出字段设置, code字段名 name列名
        expDataTital: [
          {code: "trempWorkno", name: "工号"},
          {code: "trempName", name: "姓名"},
          {code: "trempTenderDis", name: "性别"},
          {code: "trempEntrydate", name: "入职日期"},
          {code: "trempAddress", name: "地址"},
          {code: "trempVipDis", name: "是否VIP"},
          {code: "trempHistoryDis", name: "是否V前员工"},
          {code: "trempMarriage", name: "婚姻状况"},
          {code: "trempReason", name: "雇佣原因"},
          {code: "trempSfiscalyearDis", name: "财年"},
          {code: "trempSfiscalyearDisMark1", name: "财年标识1"},
          {code: "trempEfiscalyearDis", name: "财年"},
          {code: "trempEfiscalyearDisMark1", name: "财年标识1"},
          {code: "trempBasesal", name: "基本工资"},
          {code: "comment", name: "备注"},
        ],
        // 表格列字段
        columns: [
          {type: "selection", width: 54, fixed: "left", align: "center"},
          {key: "trempWorkno", title: "工号", sortable: "custom", width: 220,yesNo:'1'},
          {key: "trempName", title: "姓名", sortable: "custom", width: 220},
          {key: "trempTenderDis", title: "性别", sortable: "custom", width: 220},
          {key: "trempEntrydate", title: "入职日期", sortable: "custom", width: 220},
          {key: "trempAddress", title: "地址", sortable: "custom", width: 220},
          {key: "trempVipDis", title: "是否VIP", sortable: "custom", width: 220},
          {key: "trempHistoryDis", title: "是否V前员工", sortable: "custom", width: 220},
          {key: "trempMarriage", title: "婚姻状况", sortable: "custom", width: 220},
          {key: "trempReason", title: "雇佣原因", sortable: "custom", width: 220},
          {key: "trempSfiscalyearDis", title: "财年", sortable: "custom", width: 220},
          {key: "trempSfiscalyearDisMark1", title: "财年标识1", sortable: "custom", width: 220},
          {key: "trempEfiscalyearDis", title: "财年", sortable: "custom", width: 220},
          {key: "trempEfiscalyearDisMark1", title: "财年标识1", sortable: "custom", width: 220},
          {key: "trempBasesal", title: "基本工资", sortable: "custom", width: 220},
          {key: "comment", title: "备注", sortable: "custom", width: 220},

        ],
        // 表格获取数据mt名称
        page_mt:  this.$global.mt+'TrainEmployee.getPage',
        // 删除数据mt名称
        dele_mt:  this.$global.mt+'TrainEmployee.delByIds',
        // 修改流程状态mt名称
        state_mt:  this.$global.mt+'TrainEmployee.setStateByIds',
        //表格 id
        updateId: NaN,
        //操作类型
        logType: "",
        //对应列表index
        index: 0,
        //显示隐藏新增修改弹窗的变量
        openUpdate: false,
        //搜索参数
        searchParams: {
          trempWorkno: "",
          trempName: "",

        },
        typeCode: "",
        //弹出选择框

      };
    },
    components: {

      commonPage, //页面公共组件
      btnList,    //按钮组件
      update     //新增修改组件
    },
    computed: {
      //按钮数据
      btnData() {
        return this.$store.state.btnOperate.btnData;
      },
      //判断是不是流程节点
      FlowNode() {
        return this.$store.state.btnOperate.isFlowNode;
      },
    },
    beforeCreate() {
      //清空搜索数据
      this.$store.commit('commonPage/setParams', "")
    },
    mounted() {
      //列表字段存储
      this.getColumns();

    },
    methods: {
      //获取列表项字段
      getColumns() {
        this.$store.commit('commonPage/setColumns', this.columns)
      },
      //删除
      deletemsg() {
        this.$refs.commonPage.deletemsg()
      },
      //页面查询
      search() {
        this.$store.commit('commonPage/setParams', this.searchParams)
        this.$refs.commonPage.search();
      },
      //打开新增或修改弹窗
      openUp(id, logType, index) {
        const t = this;
        t.updateId = parseInt(id, 10);
        t.logType = logType;
        t.openUpdate = true;
        t.index = index;
        t.$refs.update.disabled = false;
        if (logType === '修改' || logType === "查看") {
          t.$refs.update.getData(id);
        }
        if (logType === "查看") {
          t.$refs.update.disabled = true;
        }
      },
      //点击表格查看或修改事件
      tableBtn(res) {
        let id = res.id;
        let logType = res.name;
        let index = res.index;
        this.openUp(id, logType, index);
      },
      //关闭新增修改弹窗
      closeUp() {
        this.openUpdate = false;
      },
      //新增后表格数据添加
      addNewArray(res) {
        this.$refs.commonPage.data.unshift(res);
      },
      //修改后表格数据更新
      updateArray(res) {
        this.$refs.commonPage.data.splice(this.index, 1, res);
      },
      //导出
      expData() {
        this.$refs.commonPage.expData()
      },
      //导入
      importExcel() {
        this.$refs.commonPage.importExcel()
      },
      //状态操作按钮
      modifystatus(type, name) {
        this.$refs.commonPage.modifystatus(type, name)
      },
      //修改流程状态
      modityChange() {
        this.$refs.commonPage.modityChange()
      },
      //获取下拉列表数据
      getSelectValue() {
        const t = this;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          logType: '查询下拉数据',
          typeCode: t.typeCode
        }).then(res => {
          if (isSuccess(res, t)) {

          }
        })
          .catch(() => {
            this.$Message.error(this.$t("reminder.errormessage"));
          });
      },

    }
  };
</script>

<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }
</style>
