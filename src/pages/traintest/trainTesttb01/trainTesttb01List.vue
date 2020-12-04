<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
            	<p slot="title">
                    <Icon type="ios-bookmark"></Icon>&nbsp;{{$t('lang_train.trainTesttb01.title')}}
                </p>
                <Row>
                    <Col span="24">
                    <Row>
    <Input v-model="searchParams.trtb01Col01"
        :placeholder="placeHolderDesc.trtb01Col01" style="width: 200px"/>
    <Input v-model="searchParams.trtb01Col02"
        :placeholder="placeHolderDesc.trtb01Col02" style="width: 200px"/>

                        <!-- 页面按钮 -->
    <btnList @buttonExport="expData"
        @buttonAdd="openUp(NaN,$t('button.add'),NaN)"
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
                    :labelDesc="labelDesc"
              	    :placeHolderDesc="placeHolderDesc"
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
import { isSuccess,getUrlKey } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { getSysLananges } from "@/lib/pub_fun";
import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
import update from "./trainTesttb01Edit";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

export default {
    name: 'trainTesttb01_Atgv',
    data () {
        return {
            labelDesc: {trtb01Col01:"",trtb01Col02:"",trtb01Col03:"",trtb01Col04:"",trtb01Col05:"",trtb01Col06:"",trtb01Col07:"",trtb01Col08:"",comment:"",},
            placeHolderDesc: {trtb01Col01:"",trtb01Col02:"",trtb01Col03:"",trtb01Col04:"",trtb01Col05:"",trtb01Col06:"",trtb01Col07:"",trtb01Col08:"",comment:"",},
            ruleDesc: {trtb01Col01:"",trtb01Col02:"",trtb01Col03:"",trtb01Col04:"",trtb01Col05:"",trtb01Col06:"",trtb01Col07:"",trtb01Col08:"",comment:"",},
            // 导入的mt名称
            imp_mt:  this.$global.mt+'TrainTesttb01.importData',
            // 导出的mt名称
            exp_mt:  this.$global.mt+'TrainTesttb01.export',
            // 导出字段设置, code字段名 name列名
            expDataTital: [
    { code: "trtb01Col01", name: "" },
    { code: "trtb01Col02", name: "" },
    { code: "trtb01Col03", name: "" },
    { code: "trtb01Col04", name: "" },
    { code: "trtb01Col05", name: "" },
    { code: "trtb01Col06", name: "" },
    { code: "trtb01Col07", name: "" },
    { code: "trtb01Col08", name: "" },
    { code: "comment", name: "" },
            ],
            // 表格列字段
            columns: [
            	{ type : "selection" , width: 54 , fixed : "left" , align : "center" },
    { key: "trtb01Col01", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col02", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col03", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col04", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col05", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col06", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col07", title: "", sortable: "custom" , width : 220},
    { key: "trtb01Col08", title: "", sortable: "custom" , width : 220},

            ],
            // 表格获取数据mt名称
            page_mt:  this.$global.mt+'TrainTesttb01.getPage',
            // 删除数据mt名称
            dele_mt:  this.$global.mt+'TrainTesttb01.delByIds',
            // 修改流程状态mt名称
            state_mt:  this.$global.mt+'TrainTesttb01.setStateByIds',
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
    trtb01Col01: "",
    trtb01Col02: "",

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
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        //判断是不是流程节点
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        },
    },
    beforeCreate () {
        //清空搜索数据
        this.$store.commit('commonPage/setParams', "")
    },
//    mounted () {
//        //列表字段存储
//        this.getColumns();
//
//    },
  mouted() {
      const t = this
      t.getColumns()
  },
    methods: {
        //获取列表项字段
        getColumns () {
	        const t = this
	        let lanCodes = 'trtb01_col01,trtb01_col02,trtb01_col03,trtb01_col04,trtb01_col05,trtb01_col06,trtb01_col07,trtb01_col08,comment'
	        getSysLananges('common', lanCodes).then((res) => {
	          if (isSuccess(res, t)) {
	            let lans = res.data.content[0]
	            if (lans !== undefined) {
	              lans = lans.value
//                console.info('lans', lans)
	              lans.forEach((item, index) => {
	                t.labelDesc[item.lanCode] = item.lanDesc
	                t.placeHolderDesc[item.lanCode] = t.$t('reminder.plsInput') + item.lanDesc
	                t.ruleDesc[item.lanCode] = item.lanDesc + t.$t('reminder.notNull')
	                //设置字段title
	                for (let i = 0; i < t.columns.length; i++) {
	                  if (t.columns[i].key === item.lanCode) {
	                    t.columns[i].title = item.lanDesc
	                    break
	                  }
	                }
	                //设置导出字段name
	                for (let i = 0; i < t.expDataTital.length; i++) {
	                  if (t.expDataTital[i].code === item.lanCode) {
	                    t.expDataTital[i].name = item.lanDesc
	                    break
	                  }
	                }
	              })
	            }
	            // 设置修改页面字段的rule message
	            const updRule = t.$refs.update.ruleValidate
	            for (let prop in updRule) {
	              for (let i = 0; i < updRule[prop].length; i++) {
	                if (updRule[prop][i].required) {
	                  updRule[prop][i].message = t.ruleDesc[prop]
	                  break
	                }
	              }
	            }
	          }
	        }).catch((err, t) => {
	          this.$Modal.error({
	            title: t.$t('reminder.err'),
	            content: t.$t('reminder.errormessage'),
	          })
	        })

            t.$store.commit('commonPage/setColumns', this.columns)
        },
        //删除
        deletemsg () {
            this.$refs.commonPage.deletemsg()
        },
        //页面查询
        search () {
            this.$store.commit('commonPage/setParams', this.searchParams)
            this.$refs.commonPage.search();
        },
        //打开新增或修改弹窗
        openUp (id, logType, index) {
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.openUpdate = true;
            t.index = index;
            t.$refs.update.disabled = false;
            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
                t.$refs.update.getData(id);
            }
            if (logType === this.$t('button.view')) {
                t.$refs.update.disabled = true;
            }
        },
        //点击表格查看或修改事件
        tableBtn (res) {
            let id = res.id;
            let logType = res.name;
            let index = res.index;
            this.openUp(id, logType, index);
        },
        //关闭新增修改弹窗
        closeUp () {
            this.openUpdate = false;
        },
        //新增后表格数据添加
        addNewArray (res) {
            this.$refs.commonPage.data.unshift(res);
        },
        //修改后表格数据更新
        updateArray (res) {
            this.$refs.commonPage.data.splice(this.index, 1, res);
        },
        //导出
        expData () {
            this.$refs.commonPage.expData()
        },
        //导入
        importExcel () {
            this.$refs.commonPage.importExcel()
        },
        //状态操作按钮
        modifystatus (type, name) {
            this.$refs.commonPage.modifystatus(type, name)
        },
        //修改流程状态
        modityChange () {
            this.$refs.commonPage.modityChange()
        },
        //获取下拉列表数据
        getSelectValue () {
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
