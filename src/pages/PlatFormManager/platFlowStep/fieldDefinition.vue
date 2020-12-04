<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    字段权限分配
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row>
                <Col span="8"
                     class="txtsize">可选择字段</Col>
                <Col span="15"
                     offset="1"
                     class="txtsize">已选择字段</Col>
            </Row>
            <Row class="positionBox">
                <Col span="8">
                <!-- 可选择字段表格 -->
                <Table stripe
                       :loading="loading"
                       :no-data-text="noDataImg"
                       ref="optionalField"
                       :columns="optionalFieldColumns"
                       :data="optionalFieldData"
                       @on-selection-change="selectOpt"
                       height="450"></Table>
                <!-- <Row style="display: flex">          <Page :total="total1" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" style="margin-top:20px;":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row> -->
                </Col>
                <Col span="1">
                <ButtonGroup vertical
                             size="small"
                             class="btnFa">
                    <Button size="small"
                            icon="ios-arrow-up"
                            @click="toTop(1)"></Button>
                    <Button size="small"
                            icon="ios-arrow-forward"
                            @click="toRight()"></Button>
                    <Button size="small"
                            icon="ios-arrow-back"
                            @click="toLeft()"></Button>
                    <Button size="small"
                            icon="ios-arrow-down"
                            @click="toTop(2)"></Button>
                </ButtonGroup>
                </Col>
                <Col span="15">
                <!-- 已选择字段表格 -->
                <Table stripe
                       :loading="loading"
                       :no-data-text="noDataImg"
                       ref="selectedField"
                       :columns="selectedFieldColumns"
                       :data="selectedFieldData"
                       height="450"
                       @on-selection-change="selectOpt2"
                       @on-select-cancel="cancelSelect"></Table>
                <!-- <Row style="display: flex">          <Page :total="total2" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange2" @on-change="pageChange2" style="margin-top:20px;":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row> -->
                <div style="text-align: right;">
                    <Button @click="close" class="position">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            class="position"
                            @click="saveField()">{{$t('button.sav')}}</Button>
                </div>
                </Col>
            </Row>
        </div>
    </div>

</template>
<script>
// import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2 } from '../../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            loading: false,
            noDataImg: '<div id="noData"></div>',
            // 可选择字段表格分页
            total1: NaN,
            sort1: 'sffOrder',
            order1: 'asc',
            rows1: '0',
            page1: '0',
            // 已选择字段表格分页
            total2: NaN,
            sort2: 'flsdbfdOrder',
            order2: 'asc',
            rows2: '0',
            page2: '0',
            // 可选择字段表格开始
            optionalFieldColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '字段显示名',
                    key: 'sffFieldNameDis',
                    align: 'center',
                },
                {
                    title: '布局类型',
                    key: 'sffLayoutDis',
                    align: 'center',
                },
            ],
            optionalFieldData: [],  //  从后台接收到的值
            optSelected: [],        //  存放左边已选择的值
            optSelected2: [],       //  存放右边已选择的值
            // 可选择字段表格结束
            // 已选择字段表格开始
            selectArr: [],          //  存放默认是否显示的option值
            powerSelected: [],      //  存放权限的option值
            selectedFieldColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '字段显示名',
                    key: 'flsdbfdFieldDis',
                    align: 'center',
                },
                {
                    title: '布局类型',
                    key: 'layouType',
                    align: 'center',
                },
                {
                    title: '默认是否显示',
                    align: 'center',
                    render: (h, params) => {
                        let opts = []
                        for (let i = 0; i < this.selectArr.length; i++) {
                            opts.push(h('i-option', {
                                props: {
                                    value: this.selectArr[i].paramCode,
                                },
                            }, this.selectArr[i].paramInfoName))
                        }
                        return h('div', [
                            h('i-select', {
                                props: {
                                    value: this.selectedFieldData[params.index].flsdbfdDisdefault,
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.selectedFieldData[params.index].flsdbfdDisdefault = value
                                    },
                                },
                            }, opts),
                        ])
                    },
                },
                {
                    title: '处理权限',
                    style: 'min-width:120px;',
                    align: 'center',
                    render: (h, params) => {
                        let opts = []
                        for (let i = 0; i < this.powerSelected.length; i++) {
                            opts.push(h('Option', {
                                props: {
                                    value: this.powerSelected[i].paramCode,
                                    transfer: true,
                                },
                            }, this.powerSelected[i].paramInfoName))
                        }
                        return h('div', [
                            h('Select', {
                                props: {
                                    value: this.selectedFieldData[params.index].flsdbfdOptauth,
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.selectedFieldData[params.index].flsdbfdOptauth = value
                                    },
                                },
                            }, opts),
                        ])
                    },
                },
            ],
            selectedFieldData: [],  //  存放用户向右移动的值
            Datablock: '',
            // 已选择字段表格结束
        }
    },
    props: {
    },
    components: {
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        // 可选择字的请求
        getOptional (id) {
            const t = this;
            t.loading = true;
            const data = {
                _mt:  this.$global.mt+'PlatSformfield.getFieldList',
                APflowId: t.$store.state.flowStepData.flowId,
                APlogType: this.$t('button.ser'),
                AProws: t.rows1,
                APpage: t.page1,
                APsort: t.sort1,
                APorder: t.order1,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.optionalFieldData = res.data.content[0].rows
                    // t.resetField()
                    // t.total1 = res.data.content[0].records
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
            })
        },
        // 可选择字的请求----------------------------------
        // 已经选择字的请求
        getselected (id) {
            const t = this;
            t.loading = true;
            t.Datablock = id
            const data = {
                _mt:  this.$global.mt+'PlatFlsdbField.getPage',
                flsdbfdDatablock: t.Datablock,
                APflowId: t.$store.state.flowStepData.flowId,
                APlogType: this.$t('button.ser'),
                AProws: t.rows2,
                APpage: t.page2,
                APsort: t.sort2,
                APorder: t.order2,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (Object.keys(res.data.content[0]).length !== 0) {
                        t.selectedFieldData = res.data.content[0].rows
                        // t.total2 = res.data.content[0].records
                    } else {
                        t.selectedFieldData = []
                        t.total2 = 0
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
            })

        },
        // 已经选择字的请求--------------------------------
        // 可选择字段的分页
        /* sizeChange(size) {
          const t = this
          t.rows1 = size
          t.getOptional()
        },
        pageChange(page) {
          const t = this
          t.page1 = page
          t.getOptional()
        }, */
        // 可选择字段的分页--------------------------------
        // 已經选择字段的分页
        /* sizeChange2(size) {
          const t = this
          t.rows2 = size
          t.getselected(t.Datablock)
        },
        pageChange2(page) {
          const t = this
          t.page2 = page
          t.getselected(t.Datablock)
        }, */
        // 已經选择字段的分页--------------------------------
        // 关闭流程定义弹窗页面
        close () {
            this.$emit('hideField')
        },
        // 关闭流程定义弹窗页面----------------------------
        // 可选择字段的选中方法
        selectOpt (selection) {
            this.optSelected = selection
        },
        // 可选择字段的选中方法----------------------------
        // 已选择字段的选中方法
        selectOpt2 (selection) {
            this.optSelected2 = selection
        },
        // 已选择字段的选中方法----------------------------
        // 向右移动可选择字段数据到右侧已选择字段
        toRight () {
            const t = this
            // 去重
            if (t.selectedFieldData.length !== 0) {
                for (const dat1 in t.optSelected) {
                    if (t.optSelected[dat1].sffFieldNameDis) {
                        for (const dat2 in t.selectedFieldData) {
                            if (t.selectedFieldData[dat2].flsdbfdFieldDis) {
                                if (t.optSelected[dat1].sffFieldNameDis === t.selectedFieldData[dat2].flsdbfdFieldDis) {
                                    t.optSelected.splice(dat1, 1)
                                    // return
                                }
                            }
                        }
                    }
                }
            }
            t.selectedFieldData.push(...t.optSelected)
            t.selectedFieldData.forEach((item, index) => {
                let flag1 = item.sffFieldNameDis
                let flag2 = item.sffLayoutDis
                let flag3 = item.sffPhyfield
                if (flag1) {
                    item['flsdbfdFieldDis'] = flag1
                    item['layouType'] = flag2
                    item['flsdbfdDisdefault'] = ''
                    item['flsdbfdOptauth'] = t.powerSelected[1].paramCode
                    item['flsdbfdDisdefault'] = t.selectArr[0].paramCode
                    item['flsdbfdField'] = flag3
                }
            })
            // t.removeSet(t.optSelected, t.optionalFieldData)
        },
        // 向右移动可选择字段数据到右侧已选择字段----------
        // 左移已选择字段
        toLeft () {
            const t = this
            t.moveLeft(t.optSelected2, t.selectedFieldData)
            t.optSelected2.forEach((item, index) => {
                let flag1 = item.flsdbfdFieldDis
                let flag2 = item.layouType
                let flag3 = item.flsdbfdField
                if (flag1) {
                    item['sffFieldNameDis'] = flag1
                    item['sffLayoutDis'] = flag2
                    item['sffPhyfield'] = flag3
                }
            })
            // t.optionalFieldData.unshift(...t.optSelected2)
        },
        // 左移已选择字段----------------------------------
        // 向上、向下移已选择字段
        cancelSelect (selection, row) {
            if (row._checked) {
                for (let i = 0; i < this.selectedFieldData.length; i++) {
                    if (row.id === this.selectedFieldData[i].id) {
                        this.selectedFieldData[i]._checked = false
                    }
                }
            }
        },
        toTop (num) {
            const t = this
            const keys = []
            for (let i = 0; i < t.selectedFieldData.length; i++) {
                keys.push(t.selectedFieldData[i])
            }
            if (num === 1) {
                // 向上
                let flag = false
                for (let i = 0; i < keys.length; i++) {
                    if (t.optSelected2.containsObj(keys[i]) && !t.optSelected2.containsObj(keys[i - 1]) && i > 0) {
                        keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
                        keys[i - 1]._checked = true
                        flag = true
                    }
                }
                if (flag) {
                    t.selectedFieldData = keys
                }
            } else if (num === 2) {
                // 向下
                let flag = false
                for (let i = keys.length - 2; i > -1; i--) {
                    if (t.optSelected2.containsObj(keys[i]) && !t.optSelected2.containsObj(keys[i + 1]) && i > -1) {
                        keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
                        keys[i + 1]._checked = true
                        flag = true
                    }
                }
                if (flag) {
                    t.selectedFieldData = keys
                }
            }
        },
        // 向上、向下移已选择字段--------------------------------
        // 获取可选择字段option的值
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,datafieldauth',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectArr = res.data.content[0].value[0].paramList  //  默认是否显示的option的值
                    t.powerSelected = res.data.content[0].value[1].paramList.splice(0, 2)  //  权限的option的值
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        // 获取可选择字段option的值------------------------
        // 保存提交已选择字段
        saveField () {
            const t = this
            const field = t.selectedFieldData.map(item => {
                return {
                    flsdbfdField: item.flsdbfdField,
                    flsdbfdDisdefault: item.flsdbfdDisdefault,
                    flsdbfdOptauth: item.flsdbfdOptauth ? item.flsdbfdOptauth : '',
                }
            })
            let fieldString = JSON.stringify(field)
            const data = {
                _mt:  this.$global.mt+'PlatFlsdbField.addOrUpd',
                flsdbfdDatablock: t.Datablock,
                flowId: t.$store.state.flowStepData.flowId,
                stepBlockData: fieldString,
                APlogType: '新增',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '保存成功',
                    })
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 保存提交已选择字段-------------------------------
        // 向左移动字段公共方法
        removeSet (arr1, arr2) {
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
        moveLeft (arr1, arr2) {
            for (const dat1 in arr1) {
                if (arr1[dat1].flsdbfdFieldDis) {
                    for (const dat2 in arr2) {
                        if (arr2[dat2].flsdbfdFieldDis) {
                            if (arr1[dat1].flsdbfdFieldDis === arr2[dat2].flsdbfdFieldDis) {
                                arr2.splice(dat2, 1)
                            }
                        }
                    }
                }
            }
        },
        moveLeft2 (arr1, arr2) {
            for (const dat1 in arr1) {
                if (arr1[dat1].flsdbfdFieldDis) {
                    for (const dat2 in arr2) {
                        if (arr2[dat2].sffFieldNameDis) {
                            if (arr1[dat1].flsdbfdFieldDis === arr2[dat2].sffFieldNameDis) {
                                arr2.splice(dat2, 1)
                            }
                        }
                    }
                }
            }
        },
        // 向左移动字段公共方法 end----------------------------------
        resetField () {
            const t = this
            t.moveLeft2(t.selectedFieldData, t.optionalFieldData)
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/authTable.scss";
// @import "../../../sass/searchTable.scss";
</style>
