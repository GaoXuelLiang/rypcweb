<template>
    <div class="cover">
        <div class="box"
             style="width: 1200px;padding: 40px 0px 10px 0px;">
            <!-- <Spin size="large"
                  fix
                  v-if="spinShow"></Spin> -->
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div id="flowChart">
                <div class="operating">
                    <div class="btn-group">
                        <div class="btn"
                             @click="addCircle('start')"
                             title="开始节点"
                             style="color: #19be6b !important;">
                            <i class="iconfont icon-ellipse"></i>
                        </div>
                        <div class="btn"
                             @click="addCircle('end')"
                             title="结束节点"
                             style="color: #FB011A !important;">
                            <i class="iconfont icon-ellipse"></i>
                        </div>
                        <div class="btn"
                             @click="addBlank()"
                             title="聚合节点"
                             style="color: #c6b7ff !important;">
                            <i class="iconfont icon-ellipse"></i>
                        </div>
                        <!--            <div class="btn" @click="addRect('step')" title="步骤节点" style="color: #5cadff !important;">-->
                        <!--              <i class="iconfont icon-icon-changfangxing"></i>-->
                        <!--            </div>-->
                        <div class="btn"
                             @click="addRect('approval')"
                             title="审批节点"
                             style="color: #f1a710 !important;">
                            <i class="iconfont icon-icon-changfangxing"></i>
                        </div>
                    </div>
                    <div class="btn-group">
                        <div class="btn"
                             @click="addArrowLine"
                             title="箭头直线">
                            <i class="iconfont icon-jiantouzhixian"></i>
                        </div>
                        <div class="btn"
                             @click="addArrowSmooth"
                             title="箭头曲线">
                            <i class="iconfont icon-jiantouquxian"></i>
                        </div>
                    </div>
                    <div class="btn-group">
                        <div class="btn"
                             @click="changeMode('edit')"
                             title="编辑模式">
                            <i class="iconfont icon-icon-bianji"></i>
                        </div>
                        <div class="btn"
                             @click="changeMode('drag')"
                             title="拖拽模式">
                            <i class="iconfont icon-tuozhuai"></i>
                        </div>
                    </div>
                    <div class="btn-group"
                         v-show="delShow">
                        <div class="btn"
                             @click="del"
                             style="margin-top: 5px;"
                             title="删除">
                            <i class="el-icon-delete"></i>
                        </div>
                    </div>
                    <div class="btn-save">
                        <div class="btn"
                             @click="save"
                             title="保存">
                            保存
                        </div>
                    </div>
                </div>
                <Spin fix
                      size="large"
                      v-if="loading"></Spin>
            </div>
        </div>
        <updFlowStep v-show="showStep"
                     @closeUp="closeNode"
                     @editNodeFlowChart="editNodeFlowChart"
                     ref="flowStep"></updFlowStep>
        <updFlsRelation v-show="showLine"
                        @closeUp="closeLine"
                        @editLineFlowChart="editLineFlowChart"
                        ref="flowLine"></updFlsRelation>
    </div>
</template>

<script>
//import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '@/axios/axios'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import updFlowStep from './flowStep/baseInfo'
import updFlsRelation from './flowStep/updFlsRelation'

export default {
    name: 'index',
    data () {
        return {
            // spinShow: false,
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
            apstAprvid: '', // 流程Id
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
    mounted () {
        this.initG6()
    },
    methods: {
        handleReset () {
            const t = this
            t.$emit('closeUp')
            t.node = {}
            t.net.destroy()
            t.initG6()
            t.delShow = false
            t.loading = false
        },
        closeNode () {
            this.showStep = false
        },
        closeLine () {
            this.showLine = false
        },
        editNodeFlowChart (data) {
            this.net.update(this.activation, {
                //          label: '[' + ' ' + data.apstCode + ']' + '\n' + ' ' + data.apstName,
                label: data.apstName,
                apstCode: data.apstCode,
                flstepDisorder: data.flstepDisorder,
            })
        },
        editLineFlowChart (data) {
            this.net.update(this.activation, {
                label: data.apstrelConditiontitle,
            })
        },
        initG6 () {
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
                //          console.log(obj, 'obj')
                if (t.isNode) {
                    let data = {
                        nodeClass: obj.nodeType,
                        nodeId: obj.id,
                        nodeShape: obj.shape,
                        nodeX: obj.x,
                        nodeY: obj.y,
                        nodeSize: obj.size.join(','),
                        nodeColor: obj.color,
                        apstAprvid: t.apstAprvid,
                    }
                    if (!(obj.hasOwnProperty('setpBlockId'))) { //  没有 setpBlockId 属于新增一个块
                        this.states = 'add'
                        this.lineId = ''
                    } else {
                        this.states = 'update'
                        this.lineId = obj.setpBlockId
                    }
                    switch (obj.nodeType) { //  设置节点颜色进行保存
                        case 'start':
                            data.nodeColor = '#19be6b'
                            break
                        case 'end':
                            data.nodeColor = '#FB011A'
                            break
                        case 'step':
                            data.nodeColor = '#5cadff'
                            break
                        case 'approval':
                            data.nodeColor = '#f1a710'
                            break
                    }
                    t.addNode(data)
                } else {
                    let data = {
                        apstrelSourcenodeid: obj.source,
                        apstrelTargetnodeid: obj.target,
                        apstrelShape: obj.shape,
                        apstrelAprvid: t.apstAprvid,
                    }
                    if (obj.hasOwnProperty('sourceAnchor')) {
                        data.apstrelSourceanchor = obj.sourceAnchor
                    }
                    if (obj.hasOwnProperty('targetAnchor')) {
                        data.apstrelTargetanchor = obj.targetAnchor
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
        addCircle (type) {
            this.net.beginAdd('node', {
                shape: 'circle',
                nodeType: type === 'start' ? 'start' : 'end',
                color: type === 'start' ? '#19be6b' : '#FB011A',
                label: type === 'start' ? '开始' : '结束',
                size: [60, 25], // 设置大小
            })
        }, // 添加起始节点
        addBlank () {
            this.net.beginAdd('node', {
                shape: 'circle',
                nodeType: 'gather',
                color: '#c6b7ff',
                label: '',
                size: [25, 25], // 设置大小
            })
        }, // 添加空节点
        addRect (type) {
            this.net.beginAdd('node', {
                shape: 'rect',
                nodeType: type === 'step' ? 'step' : 'approval',
                color: type === 'step' ? '#5cadff' : '#f1a710',  // 设置颜色
                size: [100, 50], // 设置大小
            })
        }, // 添加常规节点
        addArrowSmooth () {
            this.net.beginAdd('edge', {
                shape: 'smoothArrow',
            })
        }, // 添加箭头曲线
        addArrowLine () {
            this.net.beginAdd('edge', {
                shape: 'arrow',
            })
        }, // 添加箭头直线
        changeMode (mode) {
            this.net.changeMode(mode)
        }, // 拖拽与编辑模式的切换
        del () {
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
        copy () {
            this.net.copy()
        },
        paste () {
            this.net.paste()
        },
        clearView () {
            this.type = ''
            this.net.changeData()
        },   // 清空视图
        source (nodes, edges, type) {
            this.type = type
            this.net.changeData(nodes, edges)
        },  // 更新数据
        addNode (dataSource) {
            const t = this
            let data = {}
            data = deepCopy(dataSource)
            data._mt = this.$global.mt + 'PlatAprvstep.addOrUpd'
            data.APlogType = '新增块'
            data.APsaveType = '1'
            data.id = t.lineId
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let type = res.data.content[0].nodeClass
                    if (this.states === 'add') {
                        this.net.update(this.activation, {
                            setpBlockId: res.data.content[0].id,
                            // setpBlockId  后台返回的数据块id 后期用到
                        })
                    }
                    if (type === 'start' || type === 'end' || type === 'gather') {
                        return
                    }
                    this.$refs.flowStep.setId(res.data.content[0].id)
                    this.$refs.flowStep.formValidate.apstIscompbch = '1'
                    this.showStep = true
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addLine (dataSource, controlPoints) {
            const t = this
            let data = {}
            data = deepCopy(dataSource)
            data._mt = this.$global.mt + 'PlatAprvsteprelation.addOrUpd'
            data.APlogType = '新增线'
            data.id = t.lineId
            getDataLevelUserLoginData(data).then((res) => {
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
        addLineControlPoint (LineData, controlPoints) {
            const t = this
            let data = {}
            let arr = []
            controlPoints.forEach((item, index) => {
                let obj = {
                    anstlrptPointx: item.x,
                    anstlrptPointy: item.y,
                }
                arr.push(obj)
            })
            data._mt = this.$global.mt + 'PlatAnstrlpoint.addOrUpd'
            data.APlogType = '新增线中的点'
            data.anstlrptId = LineData.id
            data.controlPoints = arr
            getDataLevelUserLoginData(data).then((res) => {
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
        getListById (id) {
            const t = this
            t.loading = true
            t.$store.commit('flowStepData/setFlowId', id)
            const data = {
                _mt: this.$global.mt + 'PlatAprvstep.getByFlowId',
                APlogType: '流程编辑',
                apstAprvid: id,
                isDisStartAndEnd: '1',
                APfunId: '2222'
            }
            t.apstAprvid = id
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let nodeData = res.data.content[0].value
                    this.getListByIdEdge(id, nodeData)
                }
            }).catch(() => {
                t.loading = false
                console.log('获取块')
            })
        },
        getListByIdEdge (id, nodeData) {
            const t = this
            const data = {
                _mt: this.$global.mt + 'PlatAprvsteprelation.getByAprvId',
                APaprvId: id,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (JSON.stringify(res.data.content[0]) !== '{}') {
                        let lineData = res.data.content[0].value
                        t.changeFlowChat(nodeData, lineData)
                    } else {
                        t.changeFlowChat(nodeData, [])
                    }
                }
            }).catch((err) => {
                console.log(err)
                t.loading = false
                console.log('获取线')
            })
        },
        changeFlowChat (nodeData, lineData) {
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
                        apstCode: item1.hasOwnProperty('apstCode') ? item1.apstCode : '',
                    }
                    switch (nodeObj.nodeType) {
                        case 'start':
                            nodeObj.label = '开始'
                            break
                        case 'end':
                            nodeObj.label = '结束'
                            break
                        case 'gather':
                            nodeObj.label = ''
                            break
                        case 'step':
                            if (item1.hasOwnProperty('apstName')) {
                                if (item1.apstName.length > 7) {
                                    nodeObj.label = item1.hasOwnProperty('apstCode') ? item1.apstName.substring(0, 5) + '...' : ''
                                } else {
                                    nodeObj.label = item1.hasOwnProperty('apstCode') ? item1.apstName : ''
                                }
                            } else {
                                nodeObj.label = item1.hasOwnProperty('apstCode') ? '' : ''
                            }
                            break
                        case 'approval':
                            if (item1.hasOwnProperty('apstName')) {
                                if (item1.apstName.length > 7) {
                                    nodeObj.label = item1.hasOwnProperty('apstCode') ? item1.apstName.substring(0, 5) + '...' : ''
                                } else {
                                    nodeObj.label = item1.hasOwnProperty('apstCode') ? item1.apstName : ''
                                }
                            } else {
                                nodeObj.label = item1.hasOwnProperty('apstCode') ? '' : ''
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
                                x: item3.anstlrptPointx,
                                y: item3.anstlrptPointy,
                            }
                            controlPoints.push(obj)
                        })
                    } else {
                        controlPoints = []
                    }
                    let lineObj = {
                        setpLineId: item2.id,
                        shape: item2.apstrelShape,
                        source: item2.apstrelSourcenodeid,
                        target: item2.apstrelTargetnodeid,
                        controlPoints: controlPoints,
                        label: item2.hasOwnProperty('apstrelConditiontitle') ? item2.apstrelConditiontitle : '',
                    }
                    if (item2.hasOwnProperty('apstrelSourceanchor')) {
                        lineObj.sourceAnchor = Number(item2.apstrelSourceanchor)
                    }
                    if (item2.hasOwnProperty('apstrelTargetanchor')) {
                        lineObj.targetAnchor = Number(item2.apstrelTargetanchor)
                    }
                    if (controlPoints.length === 0) {
                        delete lineObj.controlPoints
                    }
                    edges.push(lineObj)
                })
            } else {
                edges = []
            }
            console.log(nodes, edges)
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
        save () {
            const t = this
            let data = this.net.save().source
            console.log(data, 'data')
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
                    apstCode: item1.apstCode,
                    apstAprvid: t.apstAprvid,
                }
                if (nodeData.nodeClass === 'start' || nodeData.nodeClass === 'end' || nodeData.nodeClass === 'gather') {
                    delete nodeData.apstCode
                }
                nodes.push(nodeData)
            })
            data.edges.forEach((item2) => {
                let controlPoints = []
                if (item2.hasOwnProperty('controlPoints')) {
                    for (let i = 0; i < item2.controlPoints.length; i++) {
                        let obj = {
                            anstlrptPointx: Number(item2.controlPoints[i].x).toFixed(2),
                            anstlrptPointy: Number(item2.controlPoints[i].y).toFixed(2),
                        }
                        controlPoints.push(obj)
                    }
                } else {
                    controlPoints = []
                }
                let lineData = {
                    apstrelSourcenodeid: item2.source,
                    apstrelTargetnodeid: item2.target,
                    apstrelShape: item2.shape,
                    id: item2.setpLineId,
                    apstrelAprvid: t.apstAprvid,
                    controlPoint: controlPoints,
                }
                if (item2.hasOwnProperty('sourceAnchor')) {
                    lineData.apstrelSourceanchor = item2.sourceAnchor
                }
                if (item2.hasOwnProperty('targetAnchor')) {
                    lineData.apstrelTargetanchor = item2.targetAnchor
                }
                edges.push(lineData)
            })
            //        console.log(edges, nodes)
            t.saveData(edges, nodes)
        }, // 保存
        saveData (edges, nodes) {
            const t = this
            let data = {}
            t.loading = true
            data._mt = this.$global.mt + 'PlatApprStepChart.addOrUpd'
            data.APlogType = '保存All'
            data.edges = edges
            data.nodes = nodes
            getDataLevelUserLoginData(data).then((res) => {
                if (JSON.stringify(res.data.content[0]) === '{}') {
                    t.loading = false
                    if (isSuccess(res, t)) {
                        console.log(res)
                    }
                } else {
                    t.loading = false
                    t.$Modal.success({
                        title: t.$t('reminder.suc'),
                        content: t.$t('reminder.savsuccess'),
                    })
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
        delNet () {
            let t = this
            t.net.del()
        },
        deleteNode () {
            let t = this
            let data2 = {
                _mt: this.$global.mt + 'PlatAprvstep.delByNodeId',
                APlogType: '刪除',
                APnodeId: t.delMesg.get('model').id,
                APapvId: t.apstAprvid,
                APfunId: 11
            }
            getDataLevelUserLoginData(data2).then((res2) => {
                if (isSuccess(res2, this)) {
                    if (res2.data.content[0].value === 1) {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: t.$t('reminder.deletesuccess'),
                        })
                        t.delMesg = ''
                        t.net.del()
                        t.delShow = false
                    }
                }
            }).catch((res2) => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: res2,
                })
            })
        },
        deleteLines () {
            let t = this
            let data = t.delMesg.get('model')
            let data2 = {
                _mt: this.$global.mt + 'PlatAprvsteprelation.delByNode',
                APlogType: '刪除',
                APfunId: '22',
                APsourcenodeid: data.source,
                APtargetnodeid: data.target,
                APapvId: t.apstAprvid
            }
            getDataLevelUserLoginData(data2).then((res2) => {
                if (isSuccess(res2, t)) {
                    if (res2.data.content[0].value === 1) {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: t.$t('reminder.deletesuccess'),
                        })
                        t.net.del()
                        t.delMesg = ''
                        t.delShow = false
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
@import "../../../sass/updateAndAdd";

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
        border-top: 1px solid #dce3e8;
        border-bottom: 1px solid #dce3e8;
        border-left: 1px solid #dce3e8;
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
        border-left: 1px solid #e6e9ed;
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
            border: 1px solid #e9e9e9;
            color: #767a85;
            border-radius: 2px;
            background: #fafafe;
        }
    }
    .el-form-item {
        margin-bottom: 0 !important;
    }
}
.btn-save {
    border-right: 1px solid #efefef;
    display: inline-block;
    padding-left: 10px;
    padding-right: 14px;
    position: relative;
    width: 55px;
    .btn {
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
