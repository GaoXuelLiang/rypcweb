<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <!--<Row>-->
            <!--原公司&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input placeholder="选择原公司" style="width: 200px" v-model="form.sourceComp" icon="ios-search" :readonly="true" -->
            <!--@on-click="opencompetType('sourceComp')"/>-->
            <!--原组织单元<Input placeholder="原组织单元" style="width: 200px" v-model="form.sourceUnit" icon="ios-search" :readonly="true"  @on-click="opencompetType('sourceUnit')"-->
            <!--/>-->
            <!--</Row>-->
            <!--<Row>-->
            <!--目标公司&nbsp&nbsp&nbsp&nbsp<Input placeholder="选择目标公司" style="width: 200px" v-model="form.targetComp" icon="ios-search" :readonly="true" -->
            <!--@on-click="opencompetType('targetComp')"/>-->
            <!--目标组织单元<Input placeholder="目标组织单元" style="width: 200px" v-model="form.targetUnit" icon="ios-search" :readonly="true"  @on-click="opencompetType('targetUnit')"-->
            <!--/>-->
            <!--</Row>-->
            <Row style="max-height: 530px;overflow-y: auto">
                <Row style="width: 900px;margin-bottom: 10px">
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100">
                        <i-col span="11">
                            <FormItem label="选择原公司"
                                      style="margin-bottom: 10px">
                                <Input placeholder="选择原公司"
                                       v-model="form.sourceComp"
                                       icon="ios-search"
                                       :readonly="true"
                                       @on-click="opencompetType('sourceComp')" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="原组织单元"
                                      style="margin-bottom: 10px">
                                <Input placeholder="原组织单元"
                                       v-model="form.sourceUnit"
                                       icon="ios-search"
                                       :readonly="true"
                                       @on-click="opencompetType('sourceUnit')" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="选择目标公司"
                                      style="margin-bottom: 10px">
                                <Input placeholder="选择目标公司"
                                       v-model="form.targetComp"
                                       icon="ios-search"
                                       :readonly="true"
                                       @on-click="opencompetType('targetComp')" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="目标组织单元"
                                      style="margin-bottom: 10px">
                                <Input placeholder="目标组织单元"
                                       v-model="form.targetUnit"
                                       icon="ios-search"
                                       :readonly="true"
                                       @on-click="opencompetType('targetUnit')" />
                            </FormItem>
                        </i-col>

                        <i-col span="11">
                            <FormItem label="生效日期"
                                      prop="validDate"
                                      style="margin-bottom: 15px">
                                <DatePicker type="date"
                                            placeholder="生效日期"
                                            :editable="false"
                                            v-model="formValidate.validDate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="原组织单元失效日期"
                                      prop="oldUnitInvDate"
                                      style="margin-bottom: 15px">
                                <DatePicker type="date"
                                            placeholder="原组织单元失效日期"
                                            :editable="false"
                                            v-model="formValidate.oldUnitInvDate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="22">
                            <FormItem label="合并原因"
                                      prop="mergerReson"
                                      style="margin-bottom: 15px">
                                <Input v-model="formValidate.mergerReson"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"></Input>
                            </FormItem>
                        </i-col>
                    </Form>
                </Row>
                <Row>
                    <Col class="col"
                         span="24">
                    <div style="height:25px;line-height:25px;">
                        <!--<span style="height:25px;display:inline-block;text-align:center">{{$t('lang_performance.explain.explain')}}</span>-->
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:25px;text-align:center">新编码</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:25px;text-align:center">新成本中心</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:30px;text-align:center">直接上级岗位</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:50px;text-align:center">并入岗位</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:10px;text-align:center">并入组织单元</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:25px;text-align:center">上级组织单元</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:-5px;text-align:center">合并类型</span>
                        <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:-28px;text-align:center">组织类型</span>
                    </div>
                    <Tree v-if="data != ''"
                          :data="data"
                          multiple
                          ref="tree"
                          :render="renderContent"
                          @on-toggle-expand="toggleExpand"></Tree>
                    <!--<Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>-->
                    </Col>
                    <!--<Col span="4" offset="2">-->
                    <!--<div class="btn-group">-->
                    <!--<Button type="primary" @click="save">{{$t('button.sav')}}</Button>-->
                    <!--</div>-->
                    <!--</Col>-->
                </Row>
            </Row>
            <Row style="text-align: right">
                <Button type="primary"
                        @click="handleSubmit"
                        v-show="btnShow"
                        class="btn">{{$t('button.sav')}}</Button>
            </Row>
        </div>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            id: NaN,
            loading: true,
            showModal: false,
            btnShow: true,
            treeheight: document.body.offsetHeight - 200,
            mapId: [],
            item: {},
            score: '',
            data: [],
            dataDInput: [],
            olddata: [],
            modiaContent: '',
            dataParame: {},
            form: {
                sourceComp: '', // 原公司
                oldUnitId: '', // 原公司id
                sourceUnit: '', // 原组织
                sourceUnitId: '', // 原组织id
                targetComp: '', // 目标公司
                newUnitId: '', // 目标公司id
                targetUnit: '', // 目标组织
                targetUnitId: '', // 目标组织id
                type: '',
            },
            formValidate: {
                mergerReson: '',  // 合并原因
                validDate: '',    // 生效日期
                oldUnitInvDate: '', // 原组织失效日期
                oldUnitId: '', // 原组织
                newUnitId: '', // 目标组织
            },
            ruleValidate: {
                mergerReson: [
                    { required: true, message: '请输入合并原因', trigger: 'blur' },
                ],
                validDate: [
                    { required: true, type: 'date', message: '请输入生效日期', trigger: 'change' },
                ],
                oldUnitInvDate: [
                    { required: true, type: 'date', message: '请输入原组织失效日期', trigger: 'change' },
                ],
            },
            selectModel: [
                {
                    paramInfoCn: 0,
                    paramInfoName: '迁入',
                },
                {
                    paramInfoCn: 1,
                    paramInfoName: '合并',
                },
                {
                    paramInfoCn: 2,
                    paramInfoName: '迁入已有组织',
                },
                {
                    paramInfoCn: 3,
                    paramInfoName: '随部门迁入',
                },
            ],
            reasonId: '',
            controlIndex: '',
            oldIndex: '',
        }
    },
    components: {
    },
    props: {
        logType: String,
    },
    mounted () { },
    methods: {
        clearDis () {
            this.olddata.forEach((item, index) => {
                delete item.newParentIdDis
                delete item.mergerUnitDis
                delete item.mergerPostDis
                delete item.parentPostDis
                delete item.newCCDis
                delete item.expand
                delete item.checked
                delete item.title
                if (item.hasOwnProperty('children')) {
                    delete item.children
                }
            })
            return this.olddata
        },
        handleSubmit () {
            const t = this
            t.formValidate.oldUnitId = t.form.oldUnitId
            t.formValidate.newUnitId = t.form.newUnitId
            const data = deepCopy(t.formValidate)
            //        data.orgUnit = t.clearDis()
            data.orgUnit = t.olddata
            data._mt =  this.$global.mt+'OrgUnits.handleMergerBusiness'
            if (data.validDate !== undefined) {
                data.validDate = data.validDate === '' ? '' : new Date(data.validDate).format('yyyy-MM-dd')
            }
            if (data.oldUnitInvDate !== undefined) {
                data.oldUnitInvDate = data.oldUnitInvDate === '' ? '' : new Date(data.oldUnitInvDate).format('yyyy-MM-dd')
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (res.data.content[0].value === 'success') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: '合并成功',
                                })
                                t.$refs.formValidate.resetFields()
                                //                  t.$emit('closeUp')
                                t.handleReset()
                            } else {
                                t.$Modal.warning({
                                    title: this.$t('reminder.remind'),
                                    content: res.data.content[0].value,
                                })
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        getData () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'OrgUnits.getFixedTree',
                logType: '查询指标分解',
                sort: 'id',
                order: 'desc',
                id: t.form.sourceUnitId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data1 = res.data.content[0].value
                    t.olddata = res.data.content[0].value
                    let data2 = []
                    data1.forEach((item, index) => {
                        Number(item.mergerType)
                        data2.push(item)
                    })
                    t.data = t.toTree(data2)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        save () {
            const t = this;
            this.score = "";
            let scoreDList = [];
            let scoreLst = [];
            for (let i = 0; i <= this.dataDInput.length - 1; i++) {
                // if (scoreDList.indexOf(this.dataDInput[i].id) == -1) {
                scoreDList.push(this.dataDInput[i].id);
                scoreLst.push(JSON.stringify(this.dataDInput[i]));
                // }
            }
            this.score = scoreLst.join("#");
            const data = {
                _mt:  this.$global.mt+'EvaluationResolve.addOrUpd',
                logType: '考核目标分解保存',
                funId: '1',
                data: this.score,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (this.score == '') {
                t.$Modal.info({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_performance.reminder.update'),
                })
            } else {
                getDataLevelUserLogin(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: this.$t('reminder.savsuccess'),
                        })
                        t.$emit('closePower')
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        renderContent (h, { root, node, data }) {
            const t = this
            t.dataInput = []
            return h(
                'span',
                {
                    style: {
                        display: data.unitType === 'empEducationInfos' ? 'none' : 'inline-block',
                        width: '100%',
                    },
                },
                [
                    //            h('Icon', {
                    //              props: {
                    //                type:
                    //                  data.unitType === '01company' ? 'social-buffer' :
                    //                    data.unitType === '70dept' ? 'social-codepen' : '',
                    //                size: '15',
                    //                color:
                    //                  data.unitType === '01company' ? '#3399ff' :
                    //                    data.unitType === '70dept' ? 'rgb(255, 145, 228)' : '',
                    //              },
                    //              style: {
                    //                marginRight: '8px',
                    //              },
                    //            }),
                    h('Icon', {
                        props: {
                            type: data.unitTempType === 'unit' ? 'social-buffer' : 'ios-people',
                            size: '15',
                            color: data.unitTempType === 'unit' ? '#3399ff' : '#ff9900',
                        },
                        style: {
                            marginRight: '8px',
                        },
                    }),
                    h('span', [h('span', data.title)]),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('input', {
                                props: Object.assign({}),
                                domProps: {
                                    value: data.newUnitCode,
                                    placeholder: '新编码',
                                    disabled: data.unitTempType === 'unit' && data.mergerType == 0 || data.unitTempType === 'post' && data.mergerType == 2 || data.mergerType == 3 ? false : true,
                                },
                                style: {
                                    marginRight: '8px',
                                    height: '32px',
                                    lineHeight: '32px',
                                    padding: 0,
                                    textAlign: 'center',
                                    width: '130px',
                                    borderRadius: '2px',
                                    border: '1px solid #ddd',
                                },
                                on: {
                                    blur: $event => {
                                        let olddata = t.olddata
                                        olddata.forEach((item, index) => {
                                            if (data.id === olddata[index].id) {
                                                olddata[index].newUnitCode = $event.target.value
                                            }
                                        })
                                        t.olddata = olddata
                                        t.data = t.toTree(olddata)
                                    },
                                },
                            }, '新编码-newUnitCode'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('Input', {
                                props: {
                                    value: data.newCCDis,
                                    icon: data.unitTempType === 'unit' && data.mergerType == 0 || data.unitTempType === 'post' && data.mergerType == 2 || data.mergerType == 3 ? 'search' : '',
                                    disabled: data.unitTempType === 'unit' && data.mergerType == 0 || data.unitTempType === 'post' && data.mergerType == 2 || data.mergerType == 3 ? false : true,
                                    placeholder: '新成本中心',
                                },
                                style: {
                                    textAlign: 'center',
                                    width: '125px',
                                },
                                on: {
                                    'on-click': (v) => {
                                        t.opencompetType('newCC', data.id)
                                    },
                                },
                            }, '新成本中心'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('Input', {
                                props: {
                                    value: data.parentPostDis,
                                    icon: data.unitTempType === 'post' && data.mergerType == 2 || data.mergerType == 3 ? 'search' : '',
                                    disabled: data.unitTempType === 'post' && data.mergerType == 2 || data.mergerType == 3 ? false : true,
                                    placeholder: '直接上级岗位',
                                },
                                style: {
                                    textAlign: 'center',
                                    width: '125px',
                                },
                                on: {
                                    'on-click': (v) => {
                                        t.opencompetType('parentPost', data.id)
                                    },
                                },
                            }, '直接上级岗位'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('Input', {
                                props: {
                                    value: data.mergerPostDis,
                                    icon: data.unitTempType === 'post' && data.mergerType == 1 ? 'search' : '',
                                    disabled: data.unitTempType === 'post' && data.mergerType == 1 ? false : true,
                                    placeholder: '并入岗位',
                                },
                                style: {
                                    textAlign: 'center',
                                    width: '125px',
                                },
                                on: {
                                    'on-click': (v) => {
                                        t.opencompetType('mergerPost', data.id)
                                    },
                                },
                            }, '并入岗位'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('Input', {
                                props: {
                                    value: data.mergerUnitDis,
                                    icon: data.unitTempType === 'unit' && data.mergerType == 1 ? 'search' : '',
                                    disabled: data.unitTempType === 'unit' && data.mergerType == 1 ? false : true,
                                    placeholder: '并入组织单元',
                                },
                                style: {
                                    textAlign: 'center',
                                    width: '125px',
                                },
                                on: {
                                    'on-click': (v) => {
                                        t.opencompetType('mergerUnit', data.id)
                                    },
                                },
                            }, '并入组织单元'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'flex',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('Input', {
                                props: {
                                    value: data.newParentIdDis,
                                    icon: data.unitTempType === 'unit' && data.mergerType == 0 || data.unitTempType === 'post' && data.mergerType == 2 ? 'search' : '',
                                    disabled: data.unitTempType === 'unit' && data.mergerType == 0 || data.unitTempType === 'post' && data.mergerType == 2 ? false : true,
                                    placeholder: '上级组织单元',
                                },
                                style: {
                                    textAlign: 'center',
                                    width: '125px',
                                },
                                on: {
                                    'on-click': (v) => {
                                        t.opencompetType('newParentId', data.id)
                                    },
                                },
                            }, '上级组织单元'),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('select', {
                                on: {
                                    click: (v) => {
                                        let i = v;
                                        //                      console.log(v)
                                        //                      console.log(v.path[0].selectedIndex)
                                        let dataIndex = v.path[0].selectedIndex === -1 ? 1 : v.path[0].selectedIndex
                                        let currentParamInfoCn = t.selectModel[dataIndex].paramInfoCn
                                        t.control = false
                                        let olddata = t.olddata
                                        olddata.forEach((item, index) => {
                                            if (data.unitPid === olddata[index].id) {
                                                t.oldIndex = index   //  拿到组织的下标
                                            }
                                            if (data.id === olddata[index].id) {
                                                t.controlIndex = index  // 拿到岗位的下标
                                                olddata[index].mergerType = t.selectModel[dataIndex].paramInfoCn
                                                if (currentParamInfoCn === 1 && data.unitTempType === 'unit') { // 组织合并 清除组织迁入
                                                    olddata[index].newParentId = ''
                                                    olddata[index].newParentIdDis = ''
                                                    olddata[index].newCC = ''
                                                    olddata[index].newCCDis = ''
                                                    olddata[index].newUnitCode = ''
                                                }
                                                if (currentParamInfoCn === 0 && data.unitTempType === 'unit') { // 组织迁入 清除组织合并
                                                    olddata[index].mergerUnit = ''
                                                    olddata[index].mergerUnitDis = ''
                                                }
                                                if (currentParamInfoCn === 1 && data.unitTempType === 'post') {  // 岗位合并 清除岗位迁入
                                                    olddata[index].newParentId = ''
                                                    olddata[index].newParentIdDis = ''
                                                    olddata[index].parentPost = ''
                                                    olddata[index].parentPostDis = ''
                                                    olddata[index].newCC = ''
                                                    olddata[index].newCCDis = ''
                                                    olddata[index].newUnitCode = ''
                                                }
                                                if (currentParamInfoCn === 2 && data.unitTempType === 'post') {  // 岗位迁入已有组织 清除岗位迁入
                                                    olddata[index].mergerPost = ''
                                                    olddata[index].mergerPostDis = ''
                                                    olddata[index].parentPost = ''
                                                    olddata[index].parentPostDis = ''
                                                    olddata[index].newCC = ''
                                                    olddata[index].newCCDis = ''
                                                    olddata[index].newUnitCode = ''
                                                }
                                                if (data.unitPid !== olddata[t.oldIndex].id && currentParamInfoCn == 3) {
                                                    if (currentParamInfoCn === 3 && data.unitTempType === 'post') {  // 岗位随部门迁入 清除岗位迁入
                                                        olddata[index].parentPost = ''
                                                        olddata[index].parentPostDis = ''
                                                        olddata[index].mergerPost = ''
                                                        olddata[index].mergerPostDis = ''
                                                        olddata[index].newCC = ''
                                                        olddata[index].newCCDis = ''
                                                        olddata[index].newUnitCode = ''
                                                        olddata[index].newParentId = ''
                                                        olddata[index].newParentIdDis = ''
                                                    }
                                                }
                                                if (data.unitPid === olddata[t.oldIndex].id && currentParamInfoCn == 3) {
                                                    if (olddata[t.oldIndex].mergerType == '1') {
                                                        t.$Modal.warning({
                                                            title: this.$t('reminder.err'),
                                                            content: '当前岗位的部门合并类型为合并，故当前岗位合并类型不能选择为随部门迁入，',
                                                        })
                                                        olddata[t.controlIndex].mergerType = '1'
                                                    }
                                                }
                                            }
                                        })
                                        t.olddata = olddata
                                        t.data = t.toTree(olddata)
                                        console.log(olddata, 't.datat.data')
                                    },
                                },
                                domProps: {
                                    value: Number(data.mergerType),
                                },
                                style: {
                                    width: '70px',
                                    height: '32px',
                                    textAlign: 'center',
                                    //                    display: t.selectId.includes(data.id)  ?  'block' : 'none',
                                },
                            }, [
                                t.selectModel.map(item => {
                                    return h('option', {
                                        domProps: {  // domProps 用于原生 props用于组件
                                            value: item.paramInfoCn,
                                            label: item.paramInfoName,
                                        },
                                        style: {
                                            display: data.unitTempType === 'unit' ? (item.paramInfoCn === 0 || item.paramInfoCn === 1 ? 'block' : 'none') : (data.unitTempType === 'post' && item.paramInfoCn === 0 ? 'none' : 'block')
                                        },
                                    })
                                }),
                            ]),
                        ],
                    ),
                    h(
                        'span',
                        {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '5px',
                            },
                        },
                        [
                            h('p', {
                                props: Object.assign({}),
                                domProps: {
                                    value: data.proResult,
                                },
                                style: {
                                    marginRight: '8px',
                                    height: '32px',
                                    lineHeight: '32px',
                                    padding: 0,
                                    textAlign: 'center',
                                    width: '50px',
                                    borderRadius: '2px',
                                    border: '1px solid #ddd',
                                },
                            }, data.unitTempType === 'unit' ? '组织' : '岗位'),
                        ],
                    ),
                ],
            )
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.expand = true;
                // item.checked = item.authRoleFunDis === '1'
                item.checked = false;
                item.title = item.unitCode
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.unitPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        handleReset () {
            const t = this
            t.$emit('closeUp')
            t.data = []
            for (const dat in t.form) {
                t.form[dat] = ''
            }
            t.formValidate.validDate = ''
            t.formValidate.mergerReson = ''
            t.formValidate.oldUnitInvDate = ''
            t.$refs.formValidate.resetFields()
        },
        toggleExpand () {
            this.treeData(this.data, 'expand', true)
        },
        resetTree () {
            this.treeData2(this.data, 'checked', false)
            this.treeData(this.data, 'checked', false)
        },
        allPick () {
            this.treeData2(this.data, 'checked', true)
        },
        /* 遍历树形数组对象 */
        treeData (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    data[i][item] = value
                    t.treeData(data[i].children, item, value)
                }
            }
        },
        treeData2 (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    t.treeData2(data[i].children, item, value)
                } else {
                    data[i][item] = value
                }
            }
        },
        openUp () {
            alert(111)
        },
        /*
         弹出选择
       */
        opencompetType (type, id) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.form.type = type
            if (type === 'sourceComp' || type === 'targetComp') {
                t.dataParame = {
                    unitType: '01company',
                }
            }
            if (type === 'sourceComp') { // 原组织单元
                t.form.sourceUnit = ''
                t.form.sourceUnitId = ''
            }
            if (type === 'targetComp') { // 目标组织单元  targetComp
                t.form.targetUnit = ''
                t.form.targetUnitId = ''
            }
            switch (type) {
                case 'sourceUnit':
                    if (t.form.oldUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择原公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.form.oldUnitId,
                    }
                    break
                case 'targetUnit':
                    if (t.form.newUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择目标公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.form.newUnitId,
                    }
                    break
                case 'newParentId':              // 上级组织单元  -   newParentId   传目标组织id查询  form.targetUnitId
                    if (t.form.targetUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择目标公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.form.targetUnitId,
                    }
                    t.reasonId = id
                    break
                case 'mergerUnit':              // 并入组织单元  -   mergerUnit     传目标组织id查询  form.targetUnitId
                    if (t.form.targetUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择目标公司',
                        })
                        return
                    }
                    t.dataParame = {
                        unitPid: t.form.targetUnitId,
                    }
                    t.reasonId = id
                    break
                case 'mergerPost':               // 并入岗位      -   mergerPost     传目标组织id查询  form.targetUnitId
                    if (t.form.targetUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择目标公司',
                        })
                        return
                    }
                    t.modiaContent = 'org-post-std'
                    t.dataParame = {
                        postUnit: t.form.targetUnitId,
                    }
                    t.reasonId = id
                    break
                case 'parentPost':              // 直接上级岗位  -   parentPost      传目标组织id查询  form.targetUnitId
                    if (t.form.targetUnitId === '') {
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '先选择目标公司',
                        })
                        return
                    }
                    t.modiaContent = 'org-post-std'
                    t.dataParame = {
                        postUnit: t.form.targetUnitId,
                    }
                    t.reasonId = id
                    break
                case 'newCC':                   // 新成本中心    -   	newCC
                    t.dataParame = {}
                    t.modiaContent = 'org-costcenter-std'
                    t.reasonId = id
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.form.type) {
                case 'sourceComp': // 原公司
                    t.form.sourceComp = row.compFnameCnDis
                    t.form.oldUnitId = row.id
                    break
                case 'targetComp': // 目标公司
                    t.form.targetComp = row.compFnameCnDis
                    t.form.newUnitId = row.id
                    break
                case 'sourceUnit': // 原组织
                    t.form.sourceUnit = row.compFnameCnDis
                    t.form.sourceUnitId = row.id
                    t.getData()
                    break
                case 'targetUnit': // 目标组织
                    t.form.targetUnit = row.compFnameCnDis
                    t.form.targetUnitId = row.id
                    if (t.form.targetUnitId === t.form.sourceUnitId) {
                        t.btnShow = false
                        t.$Modal.warning({
                            title: this.$t('reminder.err'),
                            content: '相同组织不需要进行合并',
                        })
                    } else {
                        t.btnShow = true
                    }
                    t.getData()
                    break
                case 'newParentId':
                    t.setData(t.form.type, t.form.type + `Dis`, row.compFnameCnDis, row.id)
                    break
                case 'mergerUnit':
                    t.setData(t.form.type, t.form.type + `Dis`, row.compFnameCnDis, row.id)
                    break
                case 'mergerPost':
                    t.setData(t.form.type, t.form.type + `Dis`, row.postFnameEnDis, row.id)
                    break
                case 'parentPost':
                    t.setData(t.form.type, t.form.type + `Dis`, row.postFnameEnDis, row.id)
                    break
                case 'newCC':
                    t.setData(t.form.type, t.form.type + `Dis`, row.cname, row.id)
                    break
            }
        },
        setData (type, type1, name, NewId) {
            const t = this
            let olddata = t.olddata
            olddata.forEach((item, index) => {
                if (t.reasonId === olddata[index].id) {
                    olddata[index][type] = NewId
                    olddata[index][type1] = name
                }
            })
            t.olddata = olddata
            t.data = t.toTree(olddata)
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.cover .box {
    min-width: 1350px;
}
.col {
    height: 280px;
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
}
.btn-group {
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
</style>
