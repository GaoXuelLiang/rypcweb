<template>
  <div class="cover">
    <div class="box" style="width: 1200px;padding: 40px 0px 10px 0px;">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div id="flowChart">
        <div class="operating">
          <div class="btn-group">
            <div class="btn" @click="addCircle('start')" title="开始节点" style="color: #19be6b !important;">
              <i class="iconfont icon-ellipse"></i>
              <!--icon-circle-oeps-->
            </div>
            <div class="btn" @click="addCircle('end')" title="结束节点" style="color: #FB011A !important;">
              <i class="iconfont icon-ellipse"></i>
            </div>
            <div class="btn" @click="addRect('step')" title="步骤节点" style="color: #5cadff !important;">
              <i class="iconfont icon-icon-changfangxing"></i>
              <!--icon-square-oeps-->
            </div>
            <div class="btn" @click="addRect('approval')" title="审批节点" style="color: #f1a710 !important;">
              <i class="iconfont icon-icon-changfangxing"></i>
            </div>
          </div>
          <div class="btn-group">
            <div class="btn" @click="addArrowLine" title="箭头直线">
              <i class="iconfont icon-jiantouzhixian"></i>
            </div>
            <div class="btn" @click="addArrowSmooth" title="箭头曲线">
              <i class="iconfont icon-jiantouquxian"></i>
            </div>
          </div>
          <div class="btn-group">
            <div class="btn" @click="changeMode('edit')" title="编辑模式">
              <i class="iconfont icon-icon-bianji"></i>
            </div>
            <div class="btn" @click="changeMode('drag')" title="拖拽模式">
              <i class="iconfont icon-tuozhuai"></i>
            </div>
          </div>
          <div class="btn-group" v-show="delShow">
            <div class="btn" @click="del" style="margin-top: 5px;" title="删除">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="btn-save">
            <div class="btn" @click="save"  title="保存">
              保存
            </div>
          </div>
        </div>
        <Spin fix size="large" v-if="loading"></Spin>
      </div>
    </div>
    <updFlowStep v-show="showStep" @closeUp="closeNode" @editNodeFlowChart="editNodeFlowChart"
                 ref="flowStep"></updFlowStep>
    <updFlsRelation v-show="showLine" @closeUp="closeLine" @editLineFlowChart="editLineFlowChart"
                    ref="flowLine"></updFlsRelation>
  </div>
</template>

<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
  import { isSuccess, deepCopy } from '@/lib/util'
  import updFlowStep from '../../platFlowStep/updFlowStep.vue'
  import updFlsRelation from '../../platFlowStep/updFlsRelation'

  export default {
    name: 'index',
    data() {
      return {
        node: {},
        action: '',
        name: '',
        nodeType: '',
        color: '',
        net: '',
        Util: '',
        activation: '', // 当前激活的节点
        isNode: false, // 当前是节点
        checked: true,  // 网格对齐
        oldColor: '',    // 获取节点本身颜色
        type: '',        // 有值为编辑状态
        flstepFlow: '',
        lineId: '',
        states: 'add',
        showStep: false,
        showLine: false,
        delShow: false,
        delMesg: '', // 删除信息
        loading: false,
      }
    },
    props: {
      logType: String,
    },
    components: {
      updFlowStep,
      updFlsRelation,
    },
    mounted() {
      this.initG6()
    },
    methods: {
      handleReset() {
        const t = this
        t.$emit('closeUp')
        t.node = {}
        t.net.destroy()
        t.initG6()
        t.delShow = false
        t.loading = false
      },
      closeNode() {
        this.showStep = false
      },
      closeLine() {
        this.showLine = false
      },
      editNodeFlowChart(data) {
        this.net.update(this.activation, {
          label: '[' + ' ' + data.flstepDisorder + ']' + '\n' + ' ' + data.flstepName,
          flstepCode: data.flstepCode,
          flstepDisorder: data.flstepDisorder,
        })
      },
      editLineFlowChart(data) {
        this.net.update(this.activation, {
          label: data.flsrelConditiontitle,
        })
      },
      initG6() {
        let t = this
        t.Util = G6.Util
        let grid
        grid = {
          forceAlign: true, // 是否支持网格对齐
          cell: 25,         // 网格大小
        }
        t.net = new G6.Net({
          id: 'flowChart',
          mode: 'edit',
          grid: grid,
          width: 1200,
          height: 550,
        })
        /**
         *点击空白处
         */
        t.net.on('click', (ev) => {
          t.delShow = false
        })
        t.net.on('itemclick', (ev) => {
          t.delMesg = ev.item
          t.delShow = true
        })
        t.net.on('dblclick', (ev) => {
          t.isNode = t.Util.isNode(ev.item)
          t.activation = ev.item
          let obj = ev.item.get('model')
//          console.log(obj)
          if (t.isNode) {
            let data = {
              nodeClass: obj.nodeType,
              nodeId: obj.id,
              nodeShape: obj.shape,
              nodeX: obj.x,
              nodeY: obj.y,
              nodeSize: obj.size.join(','),
              nodeColor: obj.color,
              flstepFlow: t.flstepFlow,
            }

            if (!(obj.hasOwnProperty('setpBlockId'))) { //  没有 setpBlockId 属于新增一个块
              this.states = 'add'
              this.lineId = ''
            } else {
              this.states = 'update'
              this.lineId = obj.setpBlockId
            }
            switch (obj.nodeType) { //  设置节点颜色进行保存
              case 'start' :
                data.nodeColor = '#19be6b'
                break
              case 'end' :
                data.nodeColor = '#FB011A'
                break
              case 'step' :
                data.nodeColor = '#5cadff'
                break
              case 'approval' :
                data.nodeColor = '#f1a710'
                break
            }
            t.addNode(data)
          } else {
            let data = {
              sourceNodeid: obj.source,
              targetNodeid: obj.target,
              flsrelShape: obj.shape,
              flsrelFlow: t.flstepFlow,
            }
            if (obj.hasOwnProperty('sourceAnchor')) {
              data.flsrelSourceanchor = obj.sourceAnchor
            }
            if (obj.hasOwnProperty('targetAnchor')) {
              data.flsrelTargetanchor = obj.targetAnchor
            }
            if (!(obj.hasOwnProperty('setpLineId'))) { //  没有 setpLineId 属于新增一条线
              this.states = 'add'
              this.lineId = ''
            } else {
              this.states = 'update'
              this.lineId = obj.setpLineId
            }
            t.addLine(data, obj.controlPoints)
          }
          t.color = obj.color
        })
        /**
         * 鼠标移入移出事件改变颜色
         */
        t.net.on('itemmouseenter', ev => {
          const item = ev.item
          t.oldColor = item.get('model').color     // 获取节点颜色
          t.net.update(item, {
            color: '#108EE9',
          })
          t.net.refresh()
        })
        t.net.on('itemmouseleave', ev => {
          const item = ev.item
          t.net.update(item, {
            color: t.oldColor,
          })
          t.net.refresh()
        })
        t.net.source(this.node.nodes, this.node.edges)
        t.net.changeMode('default')
        t.net.render()
      },
      addCircle(type) {
        this.net.beginAdd('node', {
          shape: 'circle',
          nodeType: type === 'start' ? 'start' : 'end',
          color: type === 'start' ? '#19be6b' : '#FB011A',
          label: type === 'start' ? '开始' : '结束',
          size: [60, 25], // 设置大小
        })
      }, // 添加起始节点
      addRect(type) {
        this.net.beginAdd('node', {
          shape: 'rect',
          nodeType: type === 'step' ? 'step' : 'approval',
          color: type === 'step' ? '#5cadff' : '#f1a710',  // 设置颜色
          size: [100, 50], // 设置大小
        })
      }, // 添加常规节点
      addArrowSmooth() {
        this.net.beginAdd('edge', {
          shape: 'smoothArrow',
        })
      }, // 添加箭头曲线
      addArrowLine() {
        this.net.beginAdd('edge', {
          shape: 'arrow',
        })
      }, // 添加箭头直线
      changeMode(mode) {
        this.net.changeMode(mode)
      }, // 拖拽与编辑模式的切换
      del() {
        const t = this
        let delData = t.delMesg.get('model')
        if (delData.hasOwnProperty('setpBlockId')) {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: this.deleteNode,
          })
        } else if (delData.hasOwnProperty('setpLineId')) {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: this.deleteLines,
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: this.delNet,
          })
        }
      },
      copy() {
        this.net.copy()
      },
      paste() {
        this.net.paste()
      },
      clearView() {
        this.type = ''
        this.net.changeData()
      },   // 清空视图
      source(nodes, edges, type) {
        this.type = type
        this.net.changeData(nodes, edges)
      },  // 更新数据
      addNode(dataSource) {
        const t = this
        let data = {}
        data = deepCopy(dataSource)
        data._mt =  this.$global.mt+'PlatFlowstep.addOrUpd'
        data.logType = '新增块'
        data.saveType = '1'
        data.id = t.lineId
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let type = res.data.content[0].nodeClass
            if (this.states === 'add') {
              this.net.update(this.activation, {
                setpBlockId: res.data.content[0].id,
                // setpBlockId  后台返回的数据块id 后期用到
              })
            }
            if (type === 'start' || type === 'end') {
              return
            }
            this.$refs.flowStep.setMainId(res.data.content[0].id)
            this.showStep = true
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      addLine(dataSource, controlPoints) {
        const t = this
        let data = {}
        data = deepCopy(dataSource)
        data._mt =  this.$global.mt+'PlatFlsRelation.addOrUpd'
        data.logType = '新增线'
        data.id = t.lineId
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (this.states === 'add') {
              t.lineId = res.data.content[0].id
              this.net.update(this.activation, {
                setpLineId: res.data.content[0].id,
                // setpLineId  需要用到后台返回的数据块id 后期用到 不用本身自己生成的
              })
            }
            this.$refs.flowLine.setLineId(res.data.content[0].id)
            this.showLine = true
            this.addLineControlPoint(res.data.content[0], controlPoints)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      addLineControlPoint(LineData, controlPoints) {
        const t = this
        let data = {}
        let arr = []
        controlPoints.forEach((item, index) => {
          let obj = {
            flwstlrptPointx: item.x,
            flwstlrptPpointy: item.y,
          }
          arr.push(obj)
        })
        data._mt =  this.$global.mt+'PlatFlwstrlpoint.addOrUpd'
        data.logType = '新增线中的点'
        data.flwstlrptId = LineData.id
        data.controlPoints = arr
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
//            console.log(res.data)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      * 获取nodo节点
      * */
      getListById(id) {
        const t = this
        t.loading = true
        t.$store.commit('flowStepData/setFlowId', id)
        const data = {
          _mt:  this.$global.mt+'PlatFlowstep.getByFlowId',
          logType: '获取块',
          flstepFlow: id,
          isDisStartAndEnd: '1',
        }
        t.flstepFlow = id
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let nodeData = res.data.content[0].value
            this.getListByIdEdge(id, nodeData)
          }
        }).catch(() => {
          t.loading = false
          console.log('获取块')
        })
      },
      getListByIdEdge(id, nodeData) {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatFlsRelation.getByNewFlowId',
          logType: '获取线',
          flowId: id,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let lineData = []
            if (JSON.stringify(res.data.content[0]) !== '{}') {
              lineData = res.data.content[0].value
            } else {
              lineData = []
            }
            t.changeFlowChat(nodeData, lineData)
          }
        }).catch((err) => {
          console.log(err)
          t.loading = false
          console.log('获取线')
        })
      },
      changeFlowChat(nodeData, lineData) {
        let nodes = []
        let edges = []
        if (nodeData.length > 0) {
          nodeData.forEach((item1, index) => {
            let nodeObj = {
              setpBlockId: item1.id,
              id: item1.nodeId,
              color: item1.nodeColor,
              nodeType: item1.nodeClass,
              shape: item1.nodeShape,
              size: item1.nodeSize.split(','),
              x: Number(item1.nodeX),
              y: Number(item1.nodeY),
              flstepCode: item1.hasOwnProperty('flstepCode') ? item1.flstepCode : '',
              flstepDisorder: item1.hasOwnProperty('flstepDisorder') ? item1.flstepDisorder : '',
            }
            switch (nodeObj.nodeType) {
              case 'start' :
                nodeObj.label = '开始'
                break
              case 'end' :
                nodeObj.label = '结束'
                break
              case 'step' :
                if (item1.hasOwnProperty('flstepName')) {
                  if (item1.flstepName.length > 7) {
                    nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName.substring(0, 5) + '...' : ''
                  } else {
                    nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName : ''
                  }
                } else {
                  nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName : ''
                }
                break
              case 'approval' :
                if (item1.hasOwnProperty('flstepName')) {
                  if (item1.flstepName.length > 7) {
                    nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName.substring(0, 5) + '...' : ''
                  } else {
                    nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName : ''
                  }
                } else {
                  nodeObj.label = item1.hasOwnProperty('flstepDisorder') ? '[' + ' ' + item1.flstepDisorder + ' ' + ']' + '\n' + item1.flstepName : ''
                }
                break
            }
            nodes.push(nodeObj)
          })
        }
        if (lineData.length > 0) {
          lineData.forEach((item2, index) => {
            let controlPoints = []
            if (item2.hasOwnProperty('pointList') && item2.pointList.length > 1) {
              item2.pointList.forEach((item3, index1) => {
                let obj = {
                  x: item3.flwstlrptPointx,
                  y: item3.flwstlrptPpointy,
                }
                controlPoints.push(obj)
              })
            } else {
              controlPoints = []
            }
            let lineObj = {
              setpLineId: item2.id,
              shape: item2.flsrelShape,
              source: item2.sourceNodeid,
              target: item2.targetNodeid,
              controlPoints: controlPoints,
              label: item2.hasOwnProperty('flsrelConditiontitle') ? item2.flsrelConditiontitle : '',
            }
            if (item2.hasOwnProperty('flsrelSourceanchor')) {
              lineObj.sourceAnchor = Number(item2.flsrelSourceanchor)
            }
            if (item2.hasOwnProperty('flsrelTargetanchor')) {
              lineObj.targetAnchor = Number(item2.flsrelTargetanchor)
            }
            if (controlPoints.length === 0) {
              delete lineObj.controlPoints
            }
            edges.push(lineObj)
          })
        } else {
          edges = []
        }
//        debugger
//        console.log(nodes, edges)
        this.node = {
          nodes: nodes,
          edges: edges,
        }
        let _saveData = this.net.save()
        this.net.destroy()
        this.initG6()
        this.net.read(_saveData)
        this.net.render()
        this.loading = false
      },
      save() {
        const t = this
        let data = this.net.save().source
//        console.log(data, 'data')
        let nodes = []
        let edges = []
        data.nodes.forEach((item1) => {
          let nodeData = {
            nodeClass: item1.nodeType,
            nodeId: item1.id,
            nodeShape: item1.shape,
            nodeX: item1.x,
            nodeY: item1.y,
            nodeSize: item1.size.join(','),
            nodeColor: item1.color,
            id: item1.setpBlockId,
            flstepCode: item1.flstepCode,
            flstepDisorder: item1.flstepDisorder,
            flstepFlow: t.flstepFlow,
          }
          if (nodeData.nodeClass === 'start' || nodeData.nodeClass === 'end') {
            delete nodeData.flstepCode
            delete nodeData.flstepDisorder
          }
          nodes.push(nodeData)
        })
        data.edges.forEach((item2) => {
          let controlPoints = []
          if (item2.hasOwnProperty('controlPoints')) {
            for (let i = 0; i < item2.controlPoints.length; i++) {
              let obj = {
                flwstlrptPointx: Number(item2.controlPoints[i].x).toFixed(2),
                flwstlrptPpointy: Number(item2.controlPoints[i].y).toFixed(2),
              }
              controlPoints.push(obj)
            }
          } else {
            controlPoints = []
          }
          let lineData = {
            sourceNodeid: item2.source,
            targetNodeid: item2.target,
            flsrelShape: item2.shape,
            id: item2.setpLineId,
            flsrelFlow: t.flstepFlow,
            controlPoint: controlPoints,
          }
          if (item2.hasOwnProperty('sourceAnchor')) {
            lineData.flsrelSourceanchor = item2.sourceAnchor
          }
          if (item2.hasOwnProperty('targetAnchor')) {
            lineData.flsrelTargetanchor = item2.targetAnchor
          }
          edges.push(lineData)
        })
//        console.log(edges, nodes)
        t.saveData(edges, nodes)
      }, // 保存
      saveData(edges, nodes) {
        const t = this
        let data = {}
        t.loading = true
        data._mt =  this.$global.mt+'PlatFlowStepChart.addOrUpd'
        data.logType = '保存All'
        data.edges = edges
        data.nodes = nodes
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0]) !== '{}') {
              t.loading = false
              t.$Modal.success({
                title: t.$t('reminder.suc'),
                content: t.$t('reminder.savsuccess'),
              })
            } else {
              t.loading = false
            }
          } else {
            t.loading = false
          }
        }).catch(() => {
          t.loading = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*   删除  */
      delNet() {
        let t = this
        t.net.del()
      },
      deleteNode() {
        let t = this
        let data2 = {
          _mt:  this.$global.mt+'PlatFlowstep.delByIds',
          logType: '刪除',
          delIds: t.delMesg.get('model').setpBlockId,
        }
        getDataLevelUserLogin(data2).then((res2) => {
          if (isSuccess(res2, this)) {
            if (res2.data.content[0].value === 1) {
              t.$Modal.success({
                title: t.$t('reminder.suc'),
                content: t.$t('reminder.deletesuccess'),
              })
              t.delMesg = ''
              t.net.del()
            }
          }
        }).catch((res2) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res2,
          })
        })
      },
      deleteLines() {
        let t = this
        let data = t.delMesg.get('model')
        let data2 = {
          _mt:  this.$global.mt+'PlatFlsRelation.delByNodeId',
          logType: '刪除',
          sourceNodeid: data.source,
          targetNodeid: data.target,
        }
        getDataLevelUserLogin(data2).then((res2) => {
          if (isSuccess(res2, t)) {
            if (res2.data.content[0].value === 1) {
              t.$Modal.success({
                title: t.$t('reminder.suc'),
                content: t.$t('reminder.deletesuccess'),
              })
              t.net.del()
              t.delMesg = ''
            }
          }
        }).catch((res2) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res2,
          })
        })
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";

  #flowChart {
    border: 1px solid #ebeef5;
    position: relative;
    overflow: hidden;
  }

  .operating {
    position: absolute;
    z-index: 99;
    background-color: #ffffff;
    /*padding: 20px 10px;*/
    box-shadow: 1px 1px 4px 0 #ccc;
  }

  .info {
    position: absolute;
    right: 0;
    z-index: 99;
    box-shadow: 1px 1px 4px 0 #ccc;
    .title {
      height: 40px;
      padding-left: 10px;
      border-top: 1px solid #DCE3E8;
      border-bottom: 1px solid #DCE3E8;
      border-left: 1px solid #DCE3E8;
      background: rgb(235, 238, 242);
      line-height: 40px;
      span {
        font-size: 14px;
      }
    }
    .content {
      background: rgba(247, 249, 251, 0.45);
      width: 200px;
      height: 800px;
      border-left: 1px solid #E6E9ED;
      padding: 10px;
    }
  }

  .btn-group {
    border-right: 1px solid #efefef;
    display: inline-block;
    padding-left: 10px;
    padding-right: 14px;
    &:last-of-type {
      border-right: 0;
    }
    .btn {
      display: inline-block;
      margin: 2px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(233, 233, 233, 0);
      i {
        font-size: 20px;
      }
      &:hover {
        border: 1px solid #E9E9E9;
        color: #767A85;
        border-radius: 2px;
        background: #FAFAFE;
      }
    }
    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
  .btn-save{
    border-right: 1px solid #efefef;
    display: inline-block;
    padding-left: 10px;
    padding-right: 14px;
    position: relative;
    width: 55px;
    .btn{
      display: inline-block;
      width: 45px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(233, 233, 233, 0);
      position: absolute;
      top: -20px;
      left: 3px;
      background: #2d8cf0;
      color: white;
      font-size: 12px;
      border-radius: 5px;
    }
  }
</style>
