<template>
<div class="table">
  <Row>
    <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          人才梯队看板
        </p>
        <Row>
          <Col span="6" class="colTree" >
          <div class="divtree"  :style="{height:treeheight + 'px'}">
            <div class="tree_icon">
              <div>
                <span class="icon_tit">
                  <Icon type="logo-buffer" size="15" color="#3399ff"/>
                  <span>公司</span>
                </span>
                <span class="icon_tit">
                  <Icon type="ios-people" size="15" color="#ff9900"/>
                  <span>部门</span>
                </span>
                <span class="icon_tit">
                  <Icon type="ios-person" size="10" color="#2fcc28"/>
                  <span>岗位</span>
                </span>
              </div>
            </div>
            <Tree v-if="dataTree != ''" :data="dataTree" :load-data="loadData" :render="renderContent"></Tree>
            <Spin v-if="leftloading" size="large"  :style="{height:treeheight + 'px'}"></Spin>
          </div>
          </Col>
          <Col span="18" :style="{height:treeheight + 'px'}" style="overflow: auto">
          <!-- <span v-if="!rightloading">
            <Button v-if="showType" type="info" @click="setOrigent()">水平</Button>
            <Button v-else type="info" @click="setOrigent()">垂直</Button>
          </span> -->
          <!-- <Button type="info" @click="setOrigent">{{horizontal? '垂直': '水平'}}</Button>
            <Button type="info" @click="setExpand">{{expand}}</Button> -->
            <span  style="color:#bf0008;cursor:pointer;height:25px;display:inline-block">
              <span v-for="(item, index) in  backArr" :key="index" @click="returnTop(item,index)">{{item.name}}{{index == backArr.length-1 ? '': '>'}}</span>
            </span>
            <div class="box_tree" :style="{height:treeheight- 30 + 'px'}">
              <div v-if="rightloading" class="tree_center">
                <img draggable="false" class="right_img" src="../../../../static/talents/talent_key1.png" alt="">
                <div>请从组织树中选择岗位</div>
              </div>
              <Spin v-if="isloading" size="large" fix ></Spin>
              <orgTree class="tree"
                v-if="!isData"
                :data="data"
                :horizontal="horizontal"
                :collapsable="collapsable"
                :label-class-name="labelClassName"
                :render-content="renderContentRight"
                @on-expand="onExpand"
                @on-node-click="onNodeClick"/>
              <div v-if="isData&&!rightloading" style="margin-top:200px;">暂无信息，请重新选择岗位!</div>
            </div>
          </Col>
        </Row>
      </card>
    </Col>
  </Row>
  <!-- 梯队详情 -->
  <echelonUpdate v-show="isEchelonUpdate" @closeEchelon="closeEchelon" :userId="echelonId" :mainData="echelonData" ref="echelonUpdate"></echelonUpdate>
</div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import { isSuccess, getUrlKey} from '../../../lib/util'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
import orgTree from './vueOrgTree/org-tree'
import echelonUpdate from './echelonUpdate'
export default {
  data() {
    return {
      treeheight: document.body.offsetHeight - 200,
      leftloading: true,
      dataTree: [],
      labelClassName: '',
      leftTreeid: '', //左侧点击树的id
      echType: '',// 左侧点击树的类型
      data: {},
      horizontal: false,
      collapsable: false,
      rightloading: true,
      rightImg: '',
      openUpdate: false,
      // showType: false,
      isData: true,
      expandAll: true,
      expand: this.$t('lang_organization.orgChart.shrinkage'),
      isloading: false,
      img11: require('../../../../static/talents/board_11.png'),
      img12: require('../../../../static/talents/board_12.png'),
      img13: require('../../../../static/talents/board_12_1.png'),
      img14: require('../../../../static/talents/board_11_1.png'),
      backArr: [],
      oldArr: [],
      rightNum: 0,
      isAddBack: true, //多次点击时返回上级判断
      updateId: '',
      updateData: {},
      isEchelonUpdate: false, // 梯队详情
      echelonData: {},
      echelonId: '',
      currEmp: {},
    }
  },
  // mounted() {
  //   this.getTree()
  // },
  mouted() {
    if (eval(getUrlKey('state').toLowerCase())) {
      const t = this
      t.getTree()
      t.data = {}
      t.dataTree = []
      t.backArr = []
      t.oldArr = []
    }
  },
  components: {
    orgTree,
    echelonUpdate
  },
  methods: {
    loadData(item, callback) {
      const t = this
      const data = {
        _mt:  this.$global.mt+'OrgPost.getTree',
        rows: '100',
        page: '1',
        sort: 'id',
        order: 'asc',
        logType: this.$t('button.ser'),
        id: item.id,
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          t.leftloading = false
          if(res.data.content[0].hasOwnProperty('value')){
            const newData = t.toTree(res.data.content[0].value)
            callback(newData)
          }
        }
      }).catch(() => {
        t.leftloading = false
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    getTree() {
      const t = this
      t.leftloading = true
      const data = {
        _mt:  this.$global.mt+'OrgPost.getTree',
        rows: '100',
        page: '1',
        sort: 'id',
        order: 'asc',
        logType: this.$t('button.ser'),
        id: '0',
      }
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          t.leftloading = false
          if(res.data.content[0].hasOwnProperty('value')){
            setTimeout(() => {
              t.dataTree = t.toTree(res.data.content[0].value)
            }, 500)
          }
        }
      }).catch(() => {
        t.leftloading = false
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    /* 把后台数据转化为tree的格式 左侧 */
    toTree(data) {
      data.forEach((item) => {
        item.expand = false
        item.checked = item.authRoleFunDis === '1'
        item.title = item.postCode
        delete item.children
      })
      const map = {}
      data.forEach((item) => {
        map[item.id] = item
      })
      const val = []
      data.forEach((item) => {
        const parent = map[item.postUnit]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          val.push(item)
        }
      })
      return val
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
          // h('img', {
          //   style: {
          //     width: '14px',
          //     height: '14px',
          //     marginRight: '8px',
          //   },
          //   attrs: {
          //     src: data.unitType === '01company' ? this.companyimg : data.unitType === 'cPost' ? this.keysimg : data.unitType === 'post' ? this.jobimg : this.deptimg,
          //   }
          // }),
          h('Icon', {
            props: {
              type: data.postType === '01company' ? 'logo-buffer' : data.postType === '70dept' ? 'ios-people' : 'ios-person',
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
    /* 树点击事件 */
    selectChange(e) {
      const t = this
      console.log(e)
      t.leftTreeid = e.id
      t.data = {}
      if(e.postType == 'post'){
        t.getRightDataTwo(e.id)
      }else {
        t.getRightData()
      }
    },
    /**--------------------------------------------------------------- */
    // 获取右侧梯队信息
    getRightData(index) {
      const t = this
      t.isloading = true
      if(!index){
        t.backArr = []
        t.rightNum = 0
      }
      const data = {
        _mt:  this.$global.mt+'OrgPost.getPostTreeByUnit',
        logType: '公司部门梯队信息',
        deptId: t.leftTreeid
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLogin(data).then((res) => {
        t.isloading = false
        if (isSuccess(res, t)) {
          t.rightloading = false
          if(res.data.content[0].hasOwnProperty('value')){
            t.isData = false
            t.data = res.data.content[0].value[0]
            t.oldArr = res.data.content[0].value
            if(index == 1&&t.isAddBack){
              t.toArr(t.oldArr)
            }
          }else {
            t.isData = true
          }
        }
      }).catch(() => {
        t.isloading = false
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    getRightDataTwo(id,index) {
      const t = this
      if(!index){
        t.backArr = []
        t.rightNum = 0
      }
      const data = {
        _mt:  this.$global.mt+'OrgPost.getPostTree',
        logType: '梯队信息',
        postId: id
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLogin(data).then((res) => {
        if (isSuccess(res, t)) {
          t.rightloading = false
          t.isloading = false
          if(res.data.content[0].hasOwnProperty('value')){
            t.isData = false
            t.data = res.data.content[0].value[0]
            t.oldArr = res.data.content[0].value
            if(index == 1&&t.isAddBack){
              t.toArr(t.oldArr)
            }
          }else {
            t.isData = true
          }
        }
      }).catch(() => {
        t.isloading = false
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    // 右侧树点击
    selectChangeRight(e){
      const t = this
      if(e.postAutoDesc == 1){
        return
      }
      if(e.isChildDis == 0){
        return
      }
      t.rightNum = t.rightNum + 1
      //判断重复点击返回上级数组push数据
      if(t.backArr.length > 0){
        t.backArr.forEach((ele)=>{
          if(ele.id == e.id){
            t.isAddBack = false
          }else {
            t.isAddBack = true
          }
        })
      }
      if(t.rightNum==1){
        t.toArr(t.oldArr)
      }
      if(e.isChildDis == 1){
        t.leftTreeid = e.id
        t.isloading = true
        if(e.postType == '01company'){
          t.getRightData(1)
        }else if(e.postType == '70dept') {
          t.echType = '02cadre'
          t.getRightData(1)
        }else{
          t.getRightDataTwo(e.id,1)
        }
      }
    },
    toArr(arr) {
      const t = this
      arr.forEach((e)=>{
        if(e.isSelf == 1){
          let obj = {}
          if(e.postType == '01company'){
            obj['type'] = '01company'
          }else if(e.postType == '70dept') {
            obj['type'] = '70dept'
          }else{
            obj['type'] = '03'
          }
          obj['id'] = e.id
          obj['name'] = e.postSnameCnDis
          t.backArr.push(obj)
        }
        if(e.children){
          t.toArr(e.children)
        }
      })
    },
    //返回上级
    returnTop(obj,index) {
      const t = this
      if(index == t.backArr.length-1){
        return
      }
      if(obj.type == '03'){
        t.getRightDataTwo(obj.id,2)
      }else {
        t.leftTreeid = obj.id
        t.getRightData(2)
      }
      if(index == 0){
        t.backArr = t.backArr.slice(0,index)
      }else{
        t.backArr = t.backArr.slice(0,index+1)
      }
      if(t.backArr.length == 0){
        t.rightNum =0
      }
    },
    renderContentRight(h, data) {
      return h('div', {
        style: {
          display: data.id ? 'inline-block' : 'none',
          width: '150px',
        },
      },[
        h('div', {
          style: {
            width:'150px',
            height:'30px',
            lineHeight:'30px',
            borderBottom: '1px solid #5BA1E7',
            backgroundColor: '#5BA1E7',
            color: '#fff',
          },
        },[
          h('span', {
            class: ['span_tit'],
            style: {
              width: data.isSelf == 1 ? '125px' : '145px',
              display: 'inline-block',
              padding: '0 5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              verticalAlign: 'middle',
              height: '30px',
            },
            domProps: {
              title: data.postSnameCnDis,
            },
          },data.postSnameCnDis),
          h('div', {
            class: ['div_tit' + data.id],
            style: {
              display: 'none',
              color: '#FFFFFF',
              zIndex: '22',
              backgroundColor: 'rgba(70,76,91,.9)',
              position: 'absolute',
              top: '0',
              left: '110px',
              textAlign: 'left',
              padding: '5px',
              whiteSpace: 'nowrap',
              borderRadius: '5px'
            },
            domProps: {
              innerHTML:
                      '<div>姓名：'+ (this.currEmp.hasOwnProperty('empCname') ? this.currEmp.empCname : '') + '\n' + '</div>'
                      +'<div>性别：'+ (this.currEmp.hasOwnProperty('empGenderDis') ? this.currEmp.empGenderDis : '') + '\n' + '</div>'
                      + '<div>岗位：'+ data.postSnameCnDis + '\n'+ '</div>'
                      + '<div>部门：'+ (this.currEmp.hasOwnProperty('empcompDeptDis') ? this.currEmp.empcompDeptDis : '') + '\n' + '</div>'
                      + '<div>司龄：'+ (this.currEmp.hasOwnProperty('ageOfCompany') ? this.currEmp.ageOfCompany : '') + '\n'+ '</div>'
                      + '<div>出生年月：'+ (this.currEmp.hasOwnProperty('empBirthdateDis') ? this.currEmp.empBirthdateDis : '')+ '</div>'
            }
          }),
          h('img',{
            attrs: {
              src:  '../../../../static/talents/echelon.png',
              draggable: 'false',
            },
            style: {
              verticalAlign: 'middle',
              display: data.id&&data.isSelf == 1 ? 'inline-block': 'none',
            },
          }),
        ]),
        h('div', {
          style: {
            width: '150px',
          },
        },[
          h('div', {
            style: {
              width: '55px',
              height: '60px',
              display: 'inline-block',
            },
          },[
            h('img', {
              attrs: {
              //  src: data.empNumber == 1 && JSON.parse(data.currEmp).hasOwnProperty('empphotouploadbigicon') ? (pubsource.pub_pubf_downlink + JSON.parse(data.currEmp).empphotouploadbigicon.split(',')[1]) :  '../../../../static/talents/board_more.png',
                src: '../../../../static/talents/board_more.png',
                draggable: 'false',
              },
              style: {
                maxWidth: '100%',
                margin: 'auto',
                maxHeight: '98%',
                display: 'inline-block',
              },
              on: {
                mouseenter: () => {
                  if(data.empNumber == 1){
                    this.currEmp = JSON.parse(data.currEmp)
                    document.getElementsByClassName('div_tit' + data.id)[0].style.display = 'inline-block'
                  }
                },
                mouseleave: () => {
                  if(data.empNumber == 1){
                    this.currEmp = {}
                    document.getElementsByClassName('div_tit' + data.id)[0].style.display = 'none'
                  }
                },
              },
             })
          ]),
          h('div',{
            style: {
              display: 'inline-block',
              padding: '5px 0 5px 5px',
              textAlign: 'left',
              verticalAlign: 'middle',
            }
          },[
            h('div',{
              style: {
                fontSize: '15px',
                width: '70px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: '20px',
                whiteSpace: 'nowrap'
              },
              domProps: {
                title: data.empNumber ? ('在岗' + data.empNumber + '人') : data.postAutoDesc == 1 ? '暂无权限' : '',
              },
            },data.empNumber ? ('在岗' + data.empNumber + '人')  : data.postAutoDesc == 1 ? '暂无权限' : (data.empNumber + '人')),
            h('div', {
              style: {
                color: '#5BA1E7',
                fontSize: '12px'
              }
            },[
              h('img', {
                attrs: {
                  src: data.postAutoDesc == 1 || data.empNumber  == 0 ?  this.img14 : this.img11
                },
                style: {
                  width: '22px',
                  height: '22px',
                  marginRight: '10px',
                  marginTop: '8px',
                  cursor: 'pointer',
                },
                domProps: {
                  title: data.postAutoDesc == 1 ? '暂无权限' : data.empNumber  == 0 ? '该岗位暂无梯队信息！': '' ,
                },
                on: {
                  click: () => {
                    this.openUp(data)
                  },
                },
              }),h('img', {
                attrs: {
                  src: data.isChildDis == 0 || data.postAutoDesc == 1 ?  this.img13 : this.img12,
                },
                style: {
                  width: '22px',
                  height: '22px',
                  marginTop: '8px',
                  cursor: 'pointer',
                },
                domProps: {
                  title: data.isChildDis == 1 && data.postAutoDesc != 1 ? '查看下级岗位' : data.isChildDis == 0 ? '无下级岗位' : data.postAutoDesc == 1 ? '暂无权限' : '',
                },
                on: {
                  click: () => {
                    this.selectChangeRight(data)
                  },
                },
              }),
            ])
          ])
        ])
      ])
    },
    onExpand: function (data) {
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    collapse(list) {
      let _this = this
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false
        }
        child.children && _this.collapse(child.children)
      })
    },
    onNodeClick(e, data) {
    },
    setExpand() {
      if (this.expand === this.$t('lang_organization.orgChart.expand')) {
        this.expand = this.$t('lang_organization.orgChart.shrinkage')
      } else {
        this.expand = this.$t('lang_organization.orgChart.expand')
      }
      this.expandAll = !this.expandAll
      this.expandChange()
    },
    expandChange: function () {
      this.toggleExpand(this.data, this.expandAll)
    },
    toggleExpand: function (data, val) {
      let _this = this
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          _this.$set(item, 'expand', val)
          if (item.children) {
            _this.toggleExpand(item.children, val)
          }
        })
      } else {
        this.$set(data, 'expand', val)
        if (data.children) {
          _this.toggleExpand(data.children, val)
        }
      }
    },
    setOrigent() {
      this.horizontal = !this.horizontal
    },
    //梯队详情
    closeEchelon() {
      this.isEchelonUpdate = false
    },
    openUp(data) {
      if(data.postAutoDesc == 1 || data.empNumber == 0){
        return
      }
      this.echelonData = data
      this.isEchelonUpdate = true
      this.$refs.echelonUpdate.getData(data.id)
    }
  }
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
  .box_tree {
    text-align: -webkit-center;
    text-align: center;
    overflow: auto;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    .tree {
      width: 100%;
      /deep/ .org-tree{
        margin: 0 auto;
      }
    }
    .tree_center {
      .right_img {
        width: 60%;
      }
    }
  }
  .colTree{
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
    padding-left: 10px;
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
    .tree_icon {
      border-bottom: 1px solid #ccc;
      font-size: 12px;
      margin-left: -10px;
      div {
        width: 100%;
        display: flex;
        padding-left: 10px;
        .icon_tit {
          flex: 1;
          text-align: left;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          img{
            width: 16px;
            height: 16px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
  }
  .span_tit:hover {
    .div_tit {
      display: inline-block !important;
    }
  }
</style>
