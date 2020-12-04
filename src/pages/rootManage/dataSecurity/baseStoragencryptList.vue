<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
            	<p slot="title">
                    <Icon type="ios-bookmark"></Icon>&nbsp;{{tagTitle}}
                </p>
                <Row>
                    <Col span="24">
                    <Row>
							<Input v-model="searchParams.baseStgeptNo" placeholder="请输入序号" style="width: 150px"/>
							<Input v-model="searchParams.baseStgeptProperty" placeholder="请输入字段属性" style="width: 150px"/>
                        <!-- 页面按钮 -->
							<btnList @buttonExport="expData"
									@buttonAdd="openUp(NaN,$t('button.add'),NaN)"
									@buttonDel="deletemsg"
									@buttonSearch="search"
									@buttonImport="importExcel"
									@moditySelect="modityChange"
									:btnData="btnData"
									:FlowNode="FlowNode"
                  v-show="false">
							</btnList>
							<span style="margin: 0;"><Button type="primary"  @click="search()">{{$t('button.ser')}}</Button></span>
							<Dropdown>
								<Button type="primary">
									{{selectDis.ebpStatusDis}}
									<Icon type="md-arrow-dropdown" size="18"></Icon>
								</Button>
								<DropdownMenu slot="list" >
									<span v-for="(item,index) in TypeParamsList" :key="index" @click="selectedEbstatus(item.paramCode,item.paramInfoName)">
										<DropdownItem>{{item.paramInfoName}}</DropdownItem>
									</span>
								</DropdownMenu>
							</Dropdown>
							<Button type="primary" v-if="searchParams.baseStgeptStatus === '01draft' || searchParams.baseStgeptStatus === '' " @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
							<Button type="success" v-if="searchParams.baseStgeptStatus === '01draft'" @click="effectData('02valid')">生效</Button>
							<Button type="error" v-if="searchParams.baseStgeptStatus === '01draft'" @click="deletemsg">删除</Button>
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
import { isSuccess, getUrlKey } from "@/lib/util";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "@/axios/axios";
import { getSysLananges } from "@/lib/pub_fun";
import commonPage from '@/components/commonPage/commonPage';    //公共页面组件
import update from "./baseStoragencryptEdit";                    //新增修改组件
import btnList from "@/components/btnAuth/btnAuth.js";          //按钮组件

export default {
	  name: 'baseStoragencryptList_Atgv',
    data () {
        return {
            labelDesc: {baseStgeptNo:"",baseStgeptProperty:"",baseStgeptDesc:"",baseStgeptLogdesfrmt:"",baseStgeptStatusDis:"",baseStgeptVdate:"",comment:"",},
            placeHolderDesc: {baseStgeptNo:"",baseStgeptProperty:"",baseStgeptDesc:"",baseStgeptLogdesfrmt:"",baseStgeptStatusDis:"",baseStgeptVdate:"",comment:"",},
            ruleDesc: {baseStgeptNo:"",baseStgeptProperty:"",baseStgeptDesc:"",baseStgeptLogdesfrmt:"",baseStgeptStatusDis:"",baseStgeptVdate:"",comment:"",},
            // 导入的mt名称
            imp_mt:  this.$global.mt+'BaseStoragencrypt.importData',
            // 导出的mt名称
            exp_mt:  this.$global.mt+'BaseStoragencrypt.export',
            // 导出字段设置, code字段名 name列名
            expDataTital: [
              { code: "baseStgeptNo", name: "" },
              { code: "baseStgeptProperty", name: "" },
              { code: "baseStgeptDesc", name: "" },
              { code: "baseStgeptLogdesfrmt", name: "" },
              { code: "baseStgeptStatusDis", name: "" },
              { code: "baseStgeptVdate", name: "" },
              { code: "comment", name: "" },
            ],
            // 表格列字段
            columns: [
            	{ type : "selection" , width: 54 , fixed : "left" , align : "center" },
              { key: "baseStgeptNo", title: "", sortable: "custom" , width : 220},
              { key: "baseStgeptProperty", title: "", sortable: "custom" , width : 220},
              { key: "baseStgeptDesc", title: "", sortable: "custom" , width : 220},
              { key: "baseStgeptLogdesfrmtDis", title: "", sortable: "custom" , width : 220},
              { key: "baseStgeptStatusDis", title: "", sortable: "custom" , width : 220},
              { key: "baseStgeptVdate", title: "", sortable: "custom" , width : 220},
            ],
            // 表格获取数据mt名称
            page_mt:  this.$global.mt+'BaseStoragencrypt.getPage',
            // 删除数据mt名称
            dele_mt:  this.$global.mt+'BaseStoragencrypt.delByIds',
            // 修改流程状态mt名称
            state_mt:  this.$global.mt+'BaseStoragencrypt.setStateByIds',
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
              baseStgeptNo: "",
              baseStgeptProperty: '',
							baseStgeptStatus: '02valid',
            },
            // 证件类型，奖惩类型，奖励类型,奖励方式,违规类型，处分类型，是否,状态 7中
						typeCode: 'idtype,rptype,rewardreason,rewardstyle,illegaltype,punishtype,yesno,rpstatus',
						//弹出选择框
            TypeParams: [],
			      TypeParamsList: [],
						// 下拉按钮显示值
						selectDis: {
							ebpStatusDis: '已生效',
							ebpTypeDis: '',
            },


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
        // 标题
        tagTitle() {
            return this.$store.state.app.tagTitle
        },
    },
    beforeCreate () {
        //清空搜索数据
        this.$store.commit('commonPage/setParams', "")
    },
    created() {
        const t = this
      let tempObj = {}
      tempObj.baseStgeptNo = this.searchParams.baseStgeptNo
      tempObj.baseStgeptProperty = this.searchParams.baseStgeptProperty
      tempObj.baseStgeptStatus = this.searchParams.baseStgeptStatus
      t.$store.commit('commonPage/setParams', tempObj)
    },
		mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
      let tempObj = {}
      this.searchParams.baseStgeptStatus = '02valid'
      this.searchParams.baseStgeptProperty = ''
      this.searchParams.baseStgeptNo = ''
      this.selectDis = {
        ebpStatusDis: '已生效',
        ebpTypeDis: '',
      }
      tempObj.baseStgeptNo = this.searchParams.baseStgeptNo
      tempObj.baseStgeptProperty = this.searchParams.baseStgeptProperty
      tempObj.baseStgeptStatus = this.searchParams.baseStgeptStatus
      t.$store.commit('commonPage/setParams', tempObj)
      this.$refs.commonPage.getData(1)
      this.viewlistArr = [
          {
          modityName: undefined,
          btnName: "button_opt_view",
          name: "查看",
          type: "primary",
        }
      ]
      this.updatelistArr = [
        {
          modityName: undefined,
          btnName: "button_opt_upd",
          name: "修改",
          type: "success",
        },
        {
          modityName: undefined,
          btnName: "button_opt_view",
          name: "查看",
          type: "primary",
        }
      ]
      this.getSelectValue()
      // 列表字段存储
      this.getColumns()
      this.$store.commit('btnOperate/setTableButton', this.viewlistArr)
    }
    },
    methods: {
        //获取列表项字段
        getColumns () {
	        const t = this
	        let lanCodes = 'base_stgept_no,base_stgept_property,base_stgept_desc,base_stgept_logdesfrmt,baseStgeptLogdesfrmtDis,base_stgept_status,baseStgeptStatusDis,base_stgept_vdate,comment'
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
          // 数据查询不显示问题
	        t.$refs.commonPage.columns = t.columns
          // t.$store.commit('commonPage/setColumns', this.columns)
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
        // code
        selectedEbstatus(key, value) {
          this.searchParams.baseStgeptStatus = key
          this.selectDis.ebpStatusDis = value
          if(key == '02valid'){
            this.$store.commit('btnOperate/setTableButton', this.viewlistArr)
          }else {
            this.$store.commit('btnOperate/setTableButton', this.updatelistArr)
          }
          this.search()
        },
        // 获取下拉列表数据
        getSelectValue() {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                logType: '查询下拉数据',
                typeCode: t.typeCode,
            }).then(res => {
                if (isSuccess(res, t)) {
                  let selectValueList = res.data.content[0].value
                  for (let i = 0; i < selectValueList.length; i++) {
                    t.TypeParams.push(selectValueList[i].paramList)
                  }
                  if(t.TypeParams[7]){
										t.TypeParamsList = t.TypeParams[7].slice(0,2)
									}
                }
            }).catch(() => {
              this.$Message.error(this.$t('reminder.errormessage'))
            })
				},
				// 生效按钮
        effectData(status) {
          const t = this
          if (t.$refs.commonPage.tableselected.length === 0) {
            this.$Message.warning('请至少选择一条数据')
            return
          }
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'BaseStoragencrypt.updState',
            ids: t.$refs.commonPage.tableselected.toString(),
            status: status,
            effDate: new Date().format('yyyy-MM-dd hh:mm')
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '生效成功!',
              })
              t.$refs.commonPage.modityChange()
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
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
