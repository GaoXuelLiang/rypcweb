<template>
  <div>
    <Row>
      <Col class="col" span="6" id="col1" style="margin-right: 10px">
      <Spin fix v-if="isSpin1" size="large"></Spin>
        <Tree :data="data" show-checkbox ref="tree" @on-select-change="selectChange"></Tree>
      </Col>
      <Col span="17" >
        <Spin fix v-if="isSpin2" size="large"></Spin>
        <Tabs type="card" name="name2" ref="tabs">
          <TabPane :label="$t('lang_role.adminrole.flagBox')" style="height:450px;overflow:auto !important" :disabled="flagBox.funIsctrlbtn !== '1'" tab="name2">
            <div v-if="flagBox.funIsctrlbtn === '1'">
              <div class="btn-group">
                <Button type="primary" @click="selectAllCheck">{{$t('lang_user.rootrole.allPick')}}</Button>
                <Button type="primary" @click="checkReC" v-show="!btnStatus">{{$t('lang_user.rootrole.checkReC')}}</Button>
                <Button type="primary" @click="resetAllCheck">{{$t('lang_user.rootrole.resetTree')}}</Button>
                <Button type="primary" @click="saveBtn">{{$t('button.sav')}}</Button>
            </div>
              <div style="margin-top: 20px;">
                <CheckboxGroup v-model="checkboxValue" v-show="!btnStatus">
                  <Checkbox v-for="(item, index) in checkbox" :key="index" :label="item.btnLancode">{{item.btnLanCn}}
                  </Checkbox>
                </CheckboxGroup>
                <div class="btnStatus" v-show="btnStatus" v-for="(item,index) in checkbox" :key="index">
                  <!-- 按钮状态 -->
                  <div class="status" :id="item.bNoCode">
                    <Checkbox :value="item.bNoCheckSign=='1'?item.bNoCode:'0'" 
                              :true-value="item.bNoCode"
                              false-value="0"
                              @on-change="statusSelect">
                      {{item.bNoLanCn}}
                    </Checkbox>
                  </div>
                  <!-- 按钮列表 -->
                  <div class="btnList" v-show="item.bNoCheckSign=='1'">
                    <CheckboxGroup v-model="btnsCheck[item.bNoCode]">
                      <Checkbox v-for="(x,y) in item.buttonList" 
                                :key="y" 
                                :label="x.btnLancode">
                                <span>{{x.btnLanCn}}</span>
                      </Checkbox> 
                    </CheckboxGroup>
                  </div>
                </div>
            </div>
          </div>
        </TabPane>
          <TabPane :label="$t('lang_role.adminrole.flow')" style="position:relative;height:450px;" :disabled="flagBox.funIsprocess !== '1'"
                 tab="name2">
            <div v-if="flagBox.funIsprocess === '1'">
            <Spin size="large" v-if='spinShow' fix></Spin>
            <div v-else>
              <Row>
                <i-col span="3" style="margin-bottom: 10px;">
                  <Button type="primary" @click="saveColumn4">{{$t('button.sav')}}</Button>
                </i-col>
                <i-col span="21">
                  <RadioGroup v-model="stepWay" @on-change="getWay" style="line-height: 30px; font-weight: bold;">
                    <Radio v-for="(item, index) in radioBox" :key="index" :label="item.paramCode"
                           style="font-size:14px; margin-right:30px;">{{item.paramInfoCn}}
                    </Radio>
                  </RadioGroup>
                </i-col>
              </Row>
              <div style="height: 315px;overflow-y: auto;width: 100%;padding:0 10px;">
                <div class="flowBox" v-for="(item, index) in flowArr" :key="index" @click="getIndex(index)">
                  <!-- 父级 start -->
                  <div :id="item.id" class="father"
                       style="display: flex;justify-content: space-between;margin: 10px 0;line-height: 32px;">
                    <Checkbox :value="item.isChecked === '1'?item.id:false" @on-change="flowSelect"
                              :true-value="item.id" false-value="false" style="font-size:14px; font-weight:bold;">
                      {{index + 1}}、{{item.flstepName}}
                    </Checkbox>
                    <div>
                      <span style="margin-right: 20px;">{{$t('lang_role.adminrole.floauth')}}</span>
                      <Select style="width:200px" @on-change="flowChange" transfer v-model="item.handleStatus">
                        <Option v-for="(option, index3) in select" :key="index3" :value="option.paramCode">
                          {{option.paramInfoCn}}
                        </Option>
                      </Select>
                    </div>
                  </div>
                  <!-- 父级 end-->
                  <!-- 子级 start -->
                  <div v-show="!item.disabled" v-if="item.flstepName"
                       style="width: 100%;border: 1px #999 dashed;padding: 10px 20px 10px 20px;">
                    <div v-for="(item2 ,index2) in item.dbList" :id="item2.id" :key="index2" class="father"
                         style="display: flex;justify-content: space-between;margin: 10px 0;line-height: 32px;"
                         @click="getIndex2(index2)">
                      <Checkbox @on-change="flowSelect2" :value="item2.isChecked==='1'?item2.id:false"
                                :true-value="item2.id" false-value="false" style="font-size:12px; font-weight:normal;">
                        {{index2 + 1}}、{{item2.flsdbCnName}}
                      </Checkbox>
                      <div>
                        <span style="margin-right: 20px;">{{$t('lang_role.adminrole.floauth')}}</span>
                        <Select style="width:200px" transfer @on-change="flowChange2"
                                :disabled="item.handleStatus === '01view' ? true : false" v-model="item2.handleStatus">
                          <Option v-for="(option, index3) in select2" :key="index3" :value="option.paramCode">
                            {{option.paramInfoCn}}
                          </Option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <!-- 子级end -->
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {getDataLevelUserLoginData } from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        companyId:'',
        isSpin1: false,
        isSpin2: false,
        flagBox: [],
        showPage1: false, //  控制显示按钮
        showPage2: false, //  控制显示列表字段、编辑字段
        showPage3: false, //  控制显示分配流程
        spinShow: true,
        radioBox: [],
        stepWay: '01All',
        flowId: '', //  流程id
        defaultName: 'gaga',
        copyArr: [],  //  flowArr镜像数组
        faIndex: '',  //  父级的index
        faValue: '',  //  父级的select value
        chIndex: '',  //  子级的index
        chValue: '',  //  子级的select value
        data: [],
        btnFunId: '', // 点击的节点id
        disabledGroup: [],
        checkboxValue: [],
        checkboxValueNew: [],
        checkboxValueAll: [],
        checkbox: [],
        flowArr: [],
        flowArrNew: [],
        select: [],
        select2: [],
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffFieldNameDis'),
            key: 'sffFieldNameDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffPropertyDis'),
            key: 'sffPropertyDis',
            align: 'center',
          },
        ],
        selectColumns1: [],
        data1: [],
        columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffFieldNameDis'),
            key: 'sffFieldNameDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffPropertyDis'),
            key: 'sffPropertyDis',
            align: 'center',
          },
        ],
        data2: [],
        columns3: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffFieldNameDis'),
            key: 'sffFieldNameDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffPropertyDis'),
            key: 'sffPropertyDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffLayoutDis'),
            key: 'sffLayoutDis',
            align: 'center',
          },
        ],
        selectColumns3: [],
        data3: [],
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffFieldNameDis'),
            key: 'sffFieldNameDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffPropertyDis'),
            key: 'sffPropertyDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.sffLayoutDis'),
            key: 'sffLayoutDis',
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminrole.ffLayo'),
            align: 'center',
            render: (h, params) => {
              let nodes = []
              for (let i = 0; i < this.select.length; i++) {
                nodes.push(h('Option', {
                  props: {
                    value: this.select[i].paramCode,
                  },
                }, this.select[i].paramInfoCn))
              }
              return h('div', [
                h('Select', {
                  props: {
                    value: this.data4[params.index].fieldauth,
                    transfer: true,
                  },
                  on: {
                    'on-change': (value) => {
                      this.data4[params.index].fieldauth = value
                    },
                  },
                }, nodes),
              ])
            },
          },
          {
            title:  this.$t('lang_role.adminrole.ffLayodis'),
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Checkbox', {
                  props: {
                    value: this.data4[params.index].disdefault === '1',
                  },
                  on: {
                    'on-change': (value) => {
                      this.data4[params.index].disdefault = value
                    },
                  },
                }),
              ])
            },
          },
        ],
        data4: [],
        params: {
          _mt:  this.$global.mt+'SysFunctions.selPartSysFunctionsByTree',
          funType: '1admin',
        },
        optRightArr1: [], //  存放分配列表字段已选择数据
        optRightArr2: [], //  存放分配编辑字段已选择数据
        btnsCheck:{
          
        },
        allCheck:{},
        btnStatus:false
      }
    },
    props: {
      id: '',
    },
    mounted() {
      this.getData()
      this.getSelect()
    },
    methods: {
      getSelect() {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          APtypeCode: 'datafieldauth,flowstepdis',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.select = res.data.content[0].value[0].paramList
            t.select2.push(t.select[0])
            t.select2.push(t.select[1])
            // t.select2.push(t.select[2])
            t.radioBox = res.data.content[0].value[1].paramList
            this.$nextTick(() => {
              if (document.body.clientHeight <= 630) {
                document.getElementById('kd').style.height = '90%'
                document.getElementById('col1').style.height = '410px'
              }
            })
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 获取树的数据
      * */
      getData(companyId) {

        const t = this
        const data = deepCopy(t.params)
        data.authRoleId = t.id
        data.funType = '6essmss'
        t.isSpin1 = true
         if(companyId){
          t.companyId = companyId
        }
        data.companyId = companyId
        getDataLevelUserLoginData(data).then((res) => {
          t.isSpin1 = false
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0])!=='{}' && res.data.content[0].value) {
              t.data = t.toTree(t.deleteNode(res.data.content[0].value))
            }else{
              t.data = []
            }
          }
        }).catch(() => {
          t.isSpin1 = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.disableCheckbox = true
          item.title = item.funLancodeDis
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.funPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            item.expand = true
            val.push(item)
          }
        })
        return val
      },
      /*
      * 分配列表字段左侧表格
      * */
      getClumns1(id) {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatSformfield.getBySfform',
          APorder: 'asc',
          APsort: 'sffOrder',
          sffIsvalid: '1',
          sffIslist: '1',
          sffForm: id,
           APcompanyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.data1 = res.data.content[0].value
              // t.moveLeft(t.data2, t.data1)
            } else {
              t.data1 = []
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
       * 分配列表字段右侧
       * */
      getClumns2(id) {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'AuthRolePower.getFunfieldList',
          btnFunId: id,
          roleid: t.id,
          APlogType: this.$t('button.ser'),
           companyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.data2 = res.data.content[0].value
            } else {
              t.data2 = []
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 保存列表字段1
      * */
      saveClumns1() {
        const t = this
        const field = t.data2.map(item => {
          return item.sffPhyfield ? item.sffPhyfield : item.field
        })
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'AuthRolePower.addFunfieldList',
          btnFunId: t.btnFunId,
          roleid: t.id,
          field: field.join(),
          APlogType: '修改',
          companyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 分配列表左侧选中方法
      * */
      selectColumn1(param) {
        this.selectColumns1 = param
      },
      /*
      * 分配编辑字段左侧
      * */
      getClumns3(id) {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatSformfield.getBySfform',
          APorder: 'asc',
          APsort: 'sffOrder',
          sffForm: id,
          sffIsvalid: '1',
          APlogType: this.$t('button.ser'),
          APcompanyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.data3 = res.data.content[0].value
              // t.moveLeft(t.data4, t.data3)
            } else {
              t.data3 = []
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
       * 编辑列表左侧选中方法
       * */
      selectColumn3(param) {
        this.selectColumns3 = param
      },
      /*
      * 保存编辑字段方法
      * */
      saveColumn3() {
        const t = this
        const field = t.data4.map(item => {
          return {
            field: item.sffPhyfield,
            fieldauth: item.fieldauth ? item.fieldauth : '',
            disdefault: item.disdefault ? 1 : 0,
          }
        })
        // console.log(JSON.stringify(field))
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'AuthRolePower.addFunfieldEdit',
          btnFunId: t.btnFunId,
          roleid: t.id,
          APdata: JSON.stringify(field),
          logType: '修改',
          companyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 分配编辑字段右侧
      * */
      getColumns4(id) {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'AuthRolePower.getFunfieldEdit',
          btnFunId: id,
          roleid: t.id,
          APlogType: this.$t('button.ser'),
          companyId:t.companyId
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.data4 = res.data.content[0].value
              for (let i = 0; i < t.data4.length; i++) {
                t.data4[i]['sffPhyfield'] = t.data4[i].field
              }
            } else {
              t.data4 = []
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 删除没有选中的节点
      * */
      deleteNode(data) {
        return data.filter(item => item.authRoleFunDis === '1')
      },
      /* 遍历树形数组对象 */
      treeData(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            data[i][item] = value
            t.treeData(data[i].children, item, value)
          }
        }
      },
      treeData2(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            t.treeData2(data[i].children, item, value)
          } else {
            data[i][item] = value
          }
        }
      },
      selectChange(param) {
        console.log(param)
        if (param.length === 0) {
          return
        }
        this.isSpin2 = true
        this.flagBox = []
        this.flagBox = param[0]
        if(this.flagBox.funIsctrlbtn == 1){
          this.$refs.tabs.activeKey = 0
        }else if (this.flagBox.funIsform == 1){
          this.$refs.tabs.activeKey = 1
        }else if (this.flagBox.funIsprocess == 1){
          this.$refs.tabs.activeKey = 3
        }
        this.btnFunId = param[0].id
        if (param[0].funProcesid) {
          this.getFlowstep(param[0].funProcesid)  //  分配流程
        }
        if (param[0].funForm) {
          this.getClumns1(param[0].funForm)       //  分配列表字段(左边)
          this.getClumns3(param[0].funForm)       //  分配编辑字段(左边)
        } else {
          this.data1 = []
          this.data3 = []
        }
        this.getClumns2(param[0].id)              //  分配列表字段(右边)
        this.getColumns4(param[0].id)             //  分配编辑字段(右边)
        this.getCheckBox(param[0].id)             //  分配按钮
      },
      getWay(value) {
        this.stepWay = value
      },
      /*
      * 获取流程节点
      * */
      getFlowstep(id) {
        const t = this
        t.flowId = id
        t.faIndex = ''
        t.chIndex = ''
        t.copyArr = []
        t.spinShow = true
        const data = {
          _mt:  this.$global.mt+'PlatFlowstep.getAllStepAndBlock',
          APflstepFlow: id,
          AProleId: t.id,
          companyId:t.companyId
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              let ge = res.data.content[0].value
              for (let i = 0; i < ge.length; i++) {
                ge[i].disabled = true
                if (ge[i].dbList) {
                  for (let j = 0; j < ge[i].dbList.length; j++) {
                    ge[i].dbList[j].disabled = true
                  }
                }
              }
              t.flowArr = ge
              // 创建镜像数组
              for (let i = 0; i < t.flowArr.length; i++) {
                t.copyArr.push({
                  funProcesid: '',
                  flowstepid: t.flowArr[i].id,
                  optauth: '',
                  dbList: [],
                  handleStatus: '',
                })
                if (t.flowArr[i].dbList) {
                  for (let j = 0; j < t.flowArr[i].dbList.length; j++) {
                    t.copyArr[i].dbList.push({
                      flowstdbid: '',
                      handleStatus: '',
                    })
                  }
                }
              }
              // 创建镜像数组--------------------------------
              for (let i = 0; i < t.flowArr.length; i++) {
                if (t.flowArr[i].isChecked === '1') {
                  t.flowArr[i].disabled = false
                  t.copyArr[i].funProcesid = t.flowArr[i].flstepFlow
                  t.copyArr[i].optauth = t.flowArr[i].handleStatus
                  t.copyArr[i].handleStatus = t.flowArr[i].handleStatus
                  for (let j = 0; j < t.flowArr[i].dbList.length; j++) {
                    if (t.flowArr[i].dbList[j].isChecked === '1') {
                      t.faIndex = i
                      t.chIndex = j
                      t.copyArr[i].dbList[j].flowstdbid = t.flowArr[i].dbList[j].id
                      t.copyArr[i].dbList[j].handleStatus = t.flowArr[i].dbList[j].handleStatus
                    }
                    if (t.flowArr[i].dbList[j].handleStatus === t.select[0].paramCode) {
                      t.chValue = t.select[0].paramCode
                      t.copyArr[i].dbList[j].handleStatus = t.select[0].paramCode
                      // t.flowArr[i].dbList[j].handleStatus = t.select[1].paramCode
                      let obj = t.flowArr[i].dbList[j]
                      obj.handleStatus = t.select[0].paramCode
                      t.$set(t.flowArr[i].dbList, j, obj)
                    }
                    if (t.flowArr[i].dbList[j].handleStatus === t.select[1].paramCode) {
                      t.chValue = t.select[1].paramCode
                      t.copyArr[i].dbList[j].handleStatus = t.select[1].paramCode
                      // t.flowArr[i].dbList[j].handleStatus = t.select[1].paramCode
                      let obj = t.flowArr[i].dbList[j]
                      obj.handleStatus = t.select[1].paramCode
                      t.$set(t.flowArr[i].dbList, j, obj)
                    }
                  }
                }
              }
            } else {
              t.flowArr = []
            }
          }
          t.spinShow = false
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 点击流程父级checkbox
      * */
      flowSelect(value) {
        const t = this
        if (value !== 'false') {
          setTimeout(() => {
            console.log(t.flowArr)
            console.log(t.copyArr)
            console.log(t.faIndex)
            console.log(value)
            for (let i = 0; i < t.flowArr.length; i++) {
              if (value === t.flowArr[i].id) {
                t.flowArr[i].disabled = false
                break
              }
            }
            for (let i = 0; i < t.flowArr.length; i++) {
              for (let j = 0; j < t.flowArr[i].dbList.length; j++) {
                t.flowArr[i].dbList[j].isChecked = '1'
                if (t.flowArr[i].id === value) {
                  // t.copyArr[i].dbList.forEach((item, index) => {
                  //
                  // })
                  t.copyArr[i].dbList[j].flowstdbid = t.flowArr[i].dbList[j].id
                  t.copyArr[i].dbList[j].handleStatus = t.flowArr[i].dbList[j].handleStatus
                }
              }
            }
            // ----------------- By Andy
            t.copyArr[t.faIndex].flowstepid = value
            t.copyArr[t.faIndex].funProcesid = t.flowArr[t.faIndex].flstepFlow
            t.copyArr[t.faIndex].handleStatus = t.faValue
            t.copyArr[t.faIndex].optauth = t.faValue
            console.log(t.flowArr, 'true----flowArr')
            console.log(t.copyArr, 'true----copyArr')
          }, 10)
        } else {
          console.log(t.copyArr, '111')
          /*
          * 如果是取消选择，先取父级元素，获取id,再从数组中删除元素
          * */
          const fatNode = event.target.parentNode.parentNode.parentNode
          t.faValue = ''
          for (let i = 0; i < t.copyArr.length; i++) {
            if (fatNode.id === t.copyArr[i].flowstepid) {
              t.copyArr[i].funProcesid = ''
              t.copyArr[i].handleStatus = ''
              t.copyArr[i].optauth = ''
              // t.copyArr[i].dbList = []
              for (let j = 0; j < t.copyArr[i].dbList.length; j++) {
                t.copyArr[i].dbList[j].handleStatus = ''
              }
              break
            }
          }
          console.log(t.copyArr, '222')
          console.log(t.faValue, '333')
          for (let i = 0; i < t.flowArr.length; i++) {
            if (fatNode.id === t.flowArr[i].id) {
              t.flowArr[i].disabled = true
              t.flowArr[i].handleStatus = ''
              t.flowArr[i].optauth = ''
              for (let j = 0; j < t.flowArr[i].dbList.length; j++) {
                t.flowArr[i].dbList[j].handleStatus = ''
              }
              // t.flowArr[i].dbList = []
              break
            }
          }
        }
      },
      // 父级下拉
      flowChange(value) {
        const t = this
        console.log(value, '父级下拉')
        console.log(t.copyArr, 't.copyArr')
        console.log(t.flowArr, 'flowArr')
        console.log(t.faIndex, 'faIndex')
        if (value !== false) {
          t.faValue = value
          t.copyArr[t.faIndex].optauth = t.faValue
          t.copyArr[t.faIndex].handleStatus = t.faValue
          if (value === '01view') { //  查看
            console.log(11111)
            for (let i = 0; i < t.copyArr[t.faIndex].dbList.length; i++) {
              console.log(222222)
              t.chIndex = i
              console.log(i, 'i')
              let obj = t.flowArr[t.faIndex].dbList[i]
              obj.handleStatus = '01view'
              t.$set(t.flowArr[t.faIndex].dbList, i, obj)
              // t.flowArr[t.faIndex].dbList[i].handleStatus = '01view'
              t.copyArr[t.faIndex].dbList[i].handleStatus = '01view'
              console.log(t.copyArr, 't.copyArr1')
              console.log(t.flowArr, 'flowArr1')
              console.log(t.faIndex, 'faIndex1')
            }
          } else if (value === '02update') { //  修改
            for (let i = 0; i < t.copyArr[t.faIndex].dbList.length; i++) {
              t.chIndex = i
              t.copyArr[t.faIndex].dbList[i].handleStatus = '02update'
              if (t.flowArr[t.faIndex].dbList[i].handleStatus) {
                let obj = t.flowArr[t.faIndex].dbList[i]
                obj.handleStatus = '02update'
                t.$set(t.flowArr[t.faIndex].dbList, i, obj)
                // t.flowArr[t.faIndex].dbList[i].handleStatus = '02update'
              } else {
                let obj = t.flowArr[t.faIndex].dbList[i]
                obj.handleStatus = '02update'
                t.$set(t.flowArr[t.faIndex].dbList, i, obj)
                // t.flowArr[t.faIndex].dbList[i]['handleStatus'] = '02update'
              }
            }
          } else if (value === '03submit') { //  可提交
            for (let i = 0; i < t.copyArr[t.faIndex].dbList.length; i++) {
              t.chIndex = i
              let obj = t.flowArr[t.faIndex].dbList[i]
              obj.handleStatus = '02update'
              t.$set(t.flowArr[t.faIndex].dbList, i, obj)
              t.copyArr[t.faIndex].dbList[i].handleStatus = '02update'
              // t.flowArr[t.faIndex].dbList[i].handleStatus = '02update'
            }
          }
        }
      },
      getIndex(index) {
        const t = this
        this.faIndex = index
      },
      /*
      *分配流程父级 end ----------------------------------------
      */
      /*
      *分配流程子级 start
      */
      getIndex2(index2) {
        this.chIndex = index2
      },
      flowSelect2(value) {
        const t = this
        if (value !== 'false') {
          t.copyArr[t.faIndex].dbList[t.chIndex].flowstdbid = value
          // by andy
//        t.copyArr[t.faIndex].dbList[t.chIndex].handleStatus = t.chValue
        } else {
          /*
          * 如果是取消选择，先取父级元素，获取id,再从数组中删除元素
          * */
          const fatNode = event.target.parentNode.parentNode.parentNode
          for (let i = t.copyArr.length - 1; i >= 0; i--) {
            for (let j = t.copyArr[i].dbList.length - 1; j >= 0; j--) {
              if (fatNode.id === t.copyArr[i].dbList[j].flowstdbid) {
                t.copyArr[i].dbList[j].flowstdbid = ''
                t.copyArr[i].dbList[j].handleStatus = ''
                t.flowArr[i].dbList[j].handleStatus = ''
                break
              }
            }
          }
        }
      },
      flowChange2(value) {
        const t = this
        t.chValue = value
        t.copyArr[t.faIndex].dbList[t.chIndex].handleStatus = t.chValue
      },
      /*
      *分配流程子级 end -----------------------------------------
      */
      /*
      * 点击flowradio
      * */
      flowRadioSelect(value) {
        const fatNode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode
        for (let i = 0; i < this.checkboxValueNew.length; i++) {
          if (fatNode.id === this.checkboxValueNew[i].funProcesid) {
            this.checkboxValueNew[i].optauth = value
            break
          }
        }
      },
      /*
      * 获取checkbox选项
      * */
      getCheckBox(id) {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AuthRolePower.getFunBtnTree',
          APbtnFunId: id,
          AProleid: t.id,
           companyId:t.companyId
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              if(!res.data.content[0].value[0].bNoCode){
                t.btnStatus = false;
                t.checkbox = res.data.content[0].value[0].buttonList
                t.checkboxValueAll = t.checkbox.map(item => {
                  return item.btnLancode
                })
                setTimeout(() => {
                  let newArr = []
                  for (let i = 0; i < t.checkbox.length; i++) {
                    if (t.checkbox[i].btnCheckSign === '1') {
                      newArr.push(t.checkbox[i].btnLancode)
                    }
                  }
                  t.checkboxValue = newArr
                }, 10)
              }else{
                t.btnStatus = true;
                t.checkbox = res.data.content[0].value
                t.checkbox.map(item => {
                  let obj1Arr = []
                  let obj2Arr = []
                  for(let i=0;i<item.buttonList.length;i++){
                    obj1Arr.push(item.buttonList[i].btnLancode)
                    if(item.buttonList[i].btnCheckSign === '1'){
                      obj2Arr.push(item.buttonList[i].btnLancode)
                    }
                  }
                  t.allCheck[item.bNoCode] = obj1Arr
                  t.btnsCheck[item.bNoCode] = obj2Arr
                })
              }
              // console.log(t.allCheck,t.btnsCheck)
            } else {
              t.checkbox = []
              t.allCheck = {}
              t.btnsCheck = {}
              t.checkboxValueAll = []
              t.checkboxValue = []
            }
            this.isSpin2 = false
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
          this.isSpin2 = false
        })
      },
      /**
       * 按钮状态显示隐藏按钮列表
       */
      statusSelect(value){
        const t = this;
        if(value!=='0'){
          for (let i = 0; i < t.checkbox.length; i++) {
            if (value === t.checkbox[i].bNoCode) {
              t.checkbox[i].bNoCheckSign = '1';
              break;
            }
          }
        }else{
          const fatNode = event.target.parentNode.parentNode.parentNode;
          for(let i=0;i<t.checkbox.length;i++){
            if(fatNode.id === t.checkbox[i].bNoCode){
              t.checkbox[i].bNoCheckSign = '0';
              break;
            }
          }
        }
      },
      /*
      * 保存分配按钮方法
      * */
      saveBtn() {
        // debugger;
        const t = this
        console.log('codes-----codes')
        console.log(t.btnFunId)
        console.log('codes-----codes')
        let codes
        if(t.btnStatus){
          let allCheck = deepCopy(this.btnsCheck);
          for(let v of this.checkbox){
            if(v.bNoCheckSign==='0'){
              delete allCheck[v.bNoCode];
            }
          }
          if(JSON.stringify(allCheck) !== '{}'){
            codes = JSON.stringify(allCheck)
          }else{
            codes = ''
          }
        }else{
          codes = t.checkboxValue.join()
        }
        // console.log(codes,"codes")
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'AuthRolePower.addFunBtnTree',
          APcompanyId:t.companyId,
          APbtnLancodes: codes,
          APbtnFunId: t.btnFunId,
          AProleid: t.id,
          APlogType: '保存',
          APtype:t.btnStatus?'1':'2'/** 1是按钮有状态节点，2是按钮没有状态节点 */
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            // t.getCheckBox(t.btnFunId)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 全选按钮方法
      * */
      selectAllCheck() {
        if(this.btnStatus){
          this.btnsCheck = this.allCheck
          this.checkbox.forEach(item => {
            item.bNoCheckSign = '1'
            for(let i=0;i<item.buttonList.length;i++){
              item.buttonList[i].btnCheckSign = '1'
            }
          })
        }else{
          this.checkboxValue = this.checkboxValueAll
        }
      },
      /*
      * 重置按钮方法
      * */
      resetAllCheck() {
        if(this.btnStatus){
          this.btnsCheck = {}
          this.checkbox.forEach(item => {
            item.bNoCheckSign = '0'
            for(let i=0;i<item.buttonList.length;i++){
              item.buttonList[i].btnCheckSign = '0'
            }
          })
        }else{
          this.checkboxValue = []
        }
      },
      /*
      * 反选方法
      * */
      checkReC() {
        const t = this
        let arr = []
        for (let i = 0; i < t.checkboxValueAll.length; i++) {
          if (!t.checkboxValue.includes(t.checkboxValueAll[i])) {
            arr.push(t.checkboxValueAll[i])
          }
        }
        t.checkboxValue = arr
      },
      /*
      * checkbox改变触发
      * */
      checkBoxChange() {
        // console.log(event)
      },
      // 分配列表字段已选择字段的选中方法
      optRight1(select) {
        this.optRightArr1 = select
      },
      // 分配列表字段已选择选中方法  end---------------------------
      // 分配编辑字段已选择字段的选中方法
      optRight2(select) {
        this.optRightArr2 = select
      },
      // 分配编辑字段已选择选中方法  end---------------------------
      // 向上、向下移已选择字段
      cancelSelect1(selection, row) {
        if (row._checked) {
          for (let i = 0; i < this.data2.length; i++) {
            if (row.id === this.data2[i].id) {
              this.data2[i]._checked = false
            }
          }
        }
      },
      cancelSelect2(selection, row) {
        if (row._checked) {
          for (let i = 0; i < this.data4.length; i++) {
            if (row.id === this.data4[i].id) {
              this.data4[i]._checked = false
            }
          }
        }
      },
      toMove(num) {
        const t = this
        const keys = []
        if (num === 1 || num === 2) {
          for (let i = 0; i < t.data2.length; i++) {
            keys.push(t.data2[i])
          }
        } else if (num === 3 || num === 4) {
          for (let i = 0; i < t.data4.length; i++) {
            keys.push(t.data4[i])
          }
        }
        if (num === 1) {  //  分配列表字段向上移动
          let flag = false
          for (let i = 0; i < keys.length; i++) {
            if (t.optRightArr1.containsObj(keys[i]) && !t.optRightArr1.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data2 = keys
          }
        } else if (num === 2) {  //  分配列表字段向下移动
          let flag = false
          for (let i = keys.length - 2; i > -1; i--) {
            if (t.optRightArr1.containsObj(keys[i]) && !t.optRightArr1.containsObj(keys[i + 1]) && i > -1) {
              keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
              keys[i + 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data2 = keys
          }
        } else if (num === 3) { //  分配编辑字段向上移动
          let flag = false
          for (let i = 0; i < keys.length; i++) {
            if (t.optRightArr2.containsObj(keys[i]) && !t.optRightArr2.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data4 = keys
          }
        } else if (num === 4) { //  分配编辑字段向下移动
          let flag = false
          for (let i = keys.length - 2; i > -1; i--) {
            if (t.optRightArr2.containsObj(keys[i]) && !t.optRightArr2.containsObj(keys[i + 1]) && i > -1) {
              keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
              keys[i + 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data4 = keys
          }
        }
      },
      // 向上、向下移已选择字段    end-----------------------------
      /*
      * 移动字段数据到右侧
      * */
      toRight(num) {
        const t = this
        if (num === 1) {  //  移动列表字段数据到右侧
          t.DuplicateRemove(t.selectColumns1, t.data2, num)
          // t.moveLeft(t.selectColumns1, t.data1)
        } else if (num === 2) { //  移动编辑字段数据到右侧
          t.DuplicateRemove(t.selectColumns3, t.data4, num)
          // t.moveLeft(t.selectColumns3, t.data3)
          // for (const dat in t.data4) {
          //   t.data4[dat].fieldauth = '02view'
          // }
        }
      },
      // 移动字段数据到右侧  end-----------------------------------
      // 右侧字段左移（删除）
      toLeft(num) {
        const t = this
        if (num === 1) {
          t.moveLeft(t.optRightArr1, t.data2) //  分配列表字段
          // t.data1.unshift(...t.optRightArr1)
        } else if (num === 2) {
          t.moveLeft(t.optRightArr2, t.data4, num) //  分配编辑字段
          // t.data3.unshift(...t.optRightArr2)
        }
      },
      // 右侧字段左移（删除）end-----------------------------------
      // 右移字段去重公共方法
      DuplicateRemove(arr1, arr2, num) {
        if (arr1.length !== 0) {
          for (const dat1 in arr1) {
            if (arr1[dat1].sffFieldNameDis) {
              for (const dat2 in arr2) {
                if (arr2[dat2].sffFieldNameDis) {
                  if (arr1[dat1].sffFieldNameDis === arr2[dat2].sffFieldNameDis) {
                    arr1.splice(dat1, 1)
                    // return
                  }
                }
              }
            }
          }
        }
        if (num === 2) {
          arr1.forEach((item, index) => {
            item['fieldauth'] = this.select[1].paramCode
          })
        }
        arr2.push(...arr1)
      },
      // 右移字段去重公共方法end-----------------------------------
      // 向左移动字段公共方法
      moveLeft(arr1, arr2) {
        for (const dat1 in arr1) {
          if (arr1[dat1].sffFieldNameDis) {
            for (const dat2 in arr2) {
              if (arr2[dat2].sffFieldNameDis) {
                if (arr1[dat1].sffFieldNameDis === arr2[dat2].sffFieldNameDis) {
                  arr2.splice(dat2, 1)
                }
              }
            }
          }
        }
      },
      // 向左移动字段公共方法 end----------------------------------
      /*
      * 保存流程
      * */
      saveFlow() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AuthRolePower.addFunFlowstep',
          APbtnFunId: t.id,
          APlogType: '保存',
          APdata: '',
           APcompanyId:t.companyId
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.checkbox = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*  保存分配流程  */
      saveColumn4() {
        const t = this
        console.log(t.copyArr)
        let newArr = t.copyArr.map(item => {
          return item
        })
        // console.log(newArr)
        // 1、一维数组去空
        for (let i = newArr.length - 1; i >= 0; i--) {
          if (newArr[i].funProcesid === '') {
            console.log(newArr)
            newArr.splice(i, 1)
          }
        }
        console.log(newArr)
        for (let i = newArr.length - 1; i >= 0; i--) {
          if (newArr[i].optauth === '' || newArr[i].optauth === undefined) {
            this.$Modal.warning({
              title: this.$t('lang_role.adminrole.wartatle'),
              content: this.$t('lang_role.adminrole.warcontent'),
            })
            return
          }
        }
        // 2、二维数组去空
        for (let j = newArr.length - 1; j >= 0; j--) {
          for (let k = newArr[j].dbList.length - 1; k >= 0; k--) {
            if (newArr[j].dbList[k].flowstdbid === '') {
              newArr[j].dbList.splice(k, 1)
            }
          }
        }
        console.log(newArr)
        for (let j = newArr.length - 1; j >= 0; j--) {
          for (let k = newArr[j].dbList.length - 1; k >= 0; k--) {
            if (newArr[j].dbList.length > 0) {
              if (newArr[j].dbList[k].handleStatus === '' || newArr[j].dbList[k].handleStatus === undefined) {
                console.log(newArr[j].dbList[k].handleStatus)
                console.log(j)
                console.log(k)
                this.$Modal.warning({
                  title: this.$t('lang_role.adminrole.wartatle'),
                  content: this.$t('lang_role.adminrole.warcontent2'),
                })
                return
              }
            }
          }
        }
        console.log(newArr)
        // dbList
        t.checkboxValueNew = newArr
        const data = {
          _mt:  this.$global.mt+'AuthRolePower.addFunFlowstep',
          AProleid: t.id,
          APfunProcesid: t.flowId,
          APbtnFunId: t.btnFunId,
          APflowstepdis: t.stepWay,
          APlogType: '保存',
          APdata: JSON.stringify(t.checkboxValueNew),
          APcompanyId:t.companyId
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            t.getFlowstep(t.flowId)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*  保存分配流程 end------------------------------------------*/
    },
  }
</script>
<style lang="scss" scoped>
  .col {
    height: 470px;
    border-top: 2px solid rgba(9,161,252,1);
    overflow: auto;
    padding-left: 6px;
    position: relative;
  }

  .btnFa {
    padding-top: 100px;
    display: flex;
    justify-content: center;
  }
  .status{
    margin:20px 0 10px;
  }
  .btnList{
    width: 100%;
    border: 1px #999 dashed;
    padding: 10px 20px 10px 20px;
  }
  /deep/ .ivu-tree-title{
    width: auto !important;
  }
</style>
