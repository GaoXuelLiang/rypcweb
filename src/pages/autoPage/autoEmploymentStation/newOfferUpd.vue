<template>
  <div class="cover">
    <div class="box" id="kd">
      <div style="height: 100%;">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Tabs name="name1" @on-click="tabChange" type="card" style="height: 100%" value='a' ref="tabs">
        <TabPane label="录用信息查看" tab="name1" name='a'>
            <newOfferHire :id="id" ref="newOfferHire" 
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    :flowId='flowId'
                    :pkValue='pkValue'
                    :stepId='stepId'
                    :setpName='setpName'
                    :stepState='stepState'
                    :tbName='tbName'
                    :paramsNice='paramsNice'
                    :formColumns='formColumns'></newOfferHire>
        </TabPane>
        <TabPane label="offer发起" tab="name1" name='b'>
            <updateOffer :id="id" ref="updateOffer" 
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    :paramsNice='paramsNice'
                    @closeUp='handleReset'
                     ></updateOffer>
        </TabPane>
      </Tabs>
    </div>
    </div>
  </div>
</template>
<script>
    import {  getDataLevelUserLoginData } from '../../../axios/axios'
    import { isSuccess, deepCopy } from '../../../lib/util'
    import newOfferHire from './newOfferHire'
    import updateOffer from './updateOffer'
  export default {
    data() {
      return {
        companyId:'',
        // isSpin1: false,
        data: [],
        disabled: true,
        // params1: {
        //   _mt:  this.$global.mt+'SysFunctions.selPartSysFunctionsByTree',
        //   funType: '1admin',
        //   APisDis: '1',
        // },
        //     params: {
        //   _mt:  this.$global.mt+'SysFunctions.selSysFunctionsByTree',
        //   funType: '1admin',
        // },
        // // id: NaN,
        // dataInput: [],
        // wholeDdata: new Array(),
        // selectData: [],
        // proceListAll: [],
      }
    },
    components: {
      newOfferHire,
      updateOffer
    },
    props: {
        id: Number,
        logType: String,
        ids: String,
        selectionAlldata : Array,
        tableselected:Array,
        flowId: String,
        pkValue: String,
        stepId: String,
        setpName: String,
        stepState: String,
        tbName: String,
        formColumns: Array,
        index:Number,
        paramsNice:Object
    },
    mounted() {

    },
    methods: {
    //   getData(id,companyId) {
    //     this.$refs.tabs.activeKey = 'a'
    //     this.$nextTick(() => {
    //       if (document.body.clientHeight <= 630) {
    //         document.getElementById('kd').style.height = '90%'
    //         document.getElementById('col2').style.height = '410px'
    //       }
    //     })
    //     const t = this
    //     const data = deepCopy(t.params)
    //     if(companyId){
    //       t.companyId = companyId
    //     }
    //     data.companyId = companyId
    //     data.authRoleId = id
    //     data.funType = '6essmss'
    //     data.valid = '1'
    //     t.isSpin1 = true
    //     getDataLevelUserLoginData(data).then((res) => {
    //       t.isSpin1 = false
    //       if (isSuccess(res, t)) {
    //         if (JSON.stringify(res.data.content[0])!=='{}') {
    //           t.wholeDdata = res.data.content[0].value;
    //           t.wholeDdata[0].funPid = '0'
    //           t.getData1()
    //         }else{
    //            t.data = []
    //         }
    //       }
    //     }).catch(() => {
    //       t.isSpin1 = false
    //       t.$Modal.error({
    //         title: this.$t('reminder.err'),
    //         content: this.$t('reminder.errormessage'),
    //       })
    //     })
    //   },
    //   getData1() {
    //     const t = this
    //     const data = deepCopy(t.params1)
    //     data.authRoleId = t.id
    //     data.funType = '6essmss'
    //     data.companyId = t.companyId
    //     getDataLevelUserLoginData(data).then((res) => {
    //       if (isSuccess(res, t)) {
    //         if (JSON.stringify(res.data.content[0])!=='{}') {
    //           t.selectData = res.data.content[0].value;
    //           t.dataProcessing();
    //         }else{
    //           t.selectData = []
    //         }
    //       }
    //     }).catch(() => {
    //       t.$Modal.error({
    //         title: this.$t('reminder.err'),
    //         content: this.$t('reminder.errormessage'),
    //       })
    //     })
    //   },
    //   dataProcessing() {
    //     const t = this
    //     let proceList = []
    //     let shouldList = []
    //     t.proceListAll = []
    //     if (undefined == t.selectData || t.selectData.length == 0) {
    //       let list = [];
    //       for (let i = 0; i < t.wholeDdata.length; i++) {
    //         let map = {};
    //         map["funLancodeDis"] = t.wholeDdata[i].funLancodeDis;
    //         map["expand"] = false;
    //         map["funPid"] = t.wholeDdata[i].funPid;
    //         map["id"] = t.wholeDdata[i].id;
    //         list.push(map);
    //       }
    //       t.data = t.toTree(list);
    //       return;
    //     }
         
    //     for (let k = 0; k < t.selectData.length; k++) {
    //       proceList.push(t.selectData[k].id);
    //       t.proceListAll.push(t.selectData[k].id);
    //     }
    //     for (let p = 0; p < t.wholeDdata.length; p++) {
    //       let obj = {}
    //       obj['funLancodeDis'] = t.wholeDdata[p].funLancodeDis
    //       obj['expand'] = false
    //       obj['funPid'] = t.wholeDdata[p].funPid
    //       obj['id'] = t.wholeDdata[p].id
    //         for (let j = 0; j < proceList.length; j++) {
    //           if (obj['id'] === proceList[j]) {
           
    //             obj['checkedDes'] = true
    //             t.wholeDdata.forEach((item1) => {
    //               if (item1.funPid === obj['id']) {
    //                 obj['checkedDes'] = false
    //               }
    //             })
    //           }
    //         }
    //       shouldList.push(obj)
    //     }
    //     t.data = t.toTree(shouldList)
    //   },
    //   save() {
    //     const t = this
    //     const checkedId = []
    //     let ids = []
    //     for (let i = 0; i < t.$refs.tree.flatState.length; i++) {
    //       if (t.$refs.tree.flatState[i].node.indeterminate === true) {
    //         ids.push({
    //           sysFunctionsId: t.$refs.tree.flatState[i].node.id,
    //           funState: 2,
    //         })
    //       }
    //     }
    //     const checked = t.$refs.tree.getCheckedNodes()
    //     for (let i = 0; i < checked.length; i++) {
    //       checkedId.push(checked[i].id)
    //     }
    //     for (let j = 0; j < checkedId.length; j++) {
    //       ids.push({
    //         sysFunctionsId: checkedId[j],
    //         funState: 1,
    //       })
    //     }
    //     const data = {
    //       _mt:  this.$global.mt+'AuthRole.addOrUpdRoleFun',
    //       APfunId: '1',
    //       // companyId: '1',
    //       APcompanyId:t.companyId,
    //       APlogType: '节点分配',
    //       APauthRoleId: t.id,
    //       APdata: JSON.stringify(ids),
    //       // sysFunctionsIds: checkedId.toString(),
    //       // sysFunctionsIds: ret.toString(),
    //     }


    //     getDataLevelUserLoginData(data).then((res) => {
    //       if (isSuccess(res, t)) {
    //         t.$Modal.success({
    //           title: this.$t('reminder.suc'),
    //           content: this.$t('reminder.savsuccess'),
    //         })
    //         t.disabled = false
    //         // t.$emit('closeUp')
    //       }
    //     }).catch(() => {
    //       t.$Modal.error({
    //         title: this.$t('reminder.err'),
    //         content: this.$t('reminder.errormessage'),
    //       })
    //     })
    //   },
      /* 把后台数据转化为tree的格式 */
//       toTree(data) {
//         data.forEach((item) => {
//           item.expand = false
//           if (item.hasOwnProperty('checkedDes')) {
//             item.checked = item.checkedDes
//           } else {
//             item.checked = undefined
//           }
// //          item.checked = item.authRoleFunDis === '1'
//           item.title = item.funLancodeDis
//           delete item.children
//         })
//         const map = {}
//         data.forEach((item) => {
//           map[item.id] = item
//         })
//         const val = []
//         data.forEach((item) => {
//           const parent = map[item.funPid]
//           if (parent) {
//             (parent.children || (parent.children = [])).push(item)
//           } else {
//             item.expand = true
//             val.push(item)
//           }
//         })
//         return val
//       },
      handleReset() {
        const t = this
        t.$emit('closeUp')
      },
    //   resetTree() {
    //     this.treeData2(this.data, 'checked', false)
    //     this.treeData(this.data, 'checked', false)
    //   },
    //   allPick() {
    //     this.treeData2(this.data, 'checked', true)
    //   },
    //   expand() {
    //     this.treeData(this.data, 'expand', true)
    //   },
    //   disExpand() {
    //     this.treeData(this.data, 'expand', false)
    //   },
    //   /* 遍历树形数组对象 */
    //   treeData(data, item, value) {
    //     const t = this
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].children !== undefined) {
    //         data[i][item] = value
    //         t.treeData(data[i].children, item, value)
    //       }
    //     }
    //   },
    //   treeData2(data, item, value) {
    //     const t = this
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].children !== undefined) {
    //         t.treeData2(data[i].children, item, value)
    //       } else {
    //         data[i][item] = value
    //       }
    //     }
    //   },
      tabChange(index) {
        // if (index === 1) this.$refs.authSet.getData()
         if(index == "a"){
            this.$refs.newOfferHire.getById(this.pkValue)
        }else if (index == "b") {
           this.$refs.updateOffer.init()
        //   this.$refs.updateOffer.getData(this.companyId)
          // this.$refs.tabs.activeKey = 'a'
        }
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box{
    width: 1000px;
    width: 70%;
    max-height: 700px;
    // /*overflow-y: auto;*/
    padding: 50px 20px 0px 20px;
  }
// .col{
//   height: 470px;
//   // border: 1px #efefef solid;
//   /*padding: 20px 10px;*/
//   border-top: 2px solid rgba(9,161,252,1);
//   overflow: auto;
//   padding-left: 6px;
//   position: relative;
// }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .ivu-tabs-bar {
    margin-bottom: 10px;
  }
  /deep/ .ivu-tree-title{
    width: auto !important;
  }
</style>
