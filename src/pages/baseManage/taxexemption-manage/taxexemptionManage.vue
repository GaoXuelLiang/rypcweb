<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    &nbsp;{{$t('lang_baseManage.baseTaxexemption.title')}}
                </p>
                <Row>
                    <Dropdown>
                        <Button type="primary">
                            {{select}}
                            <Icon type="md-arrow-dropdown"
                                  size="18"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <span key="index"
                                  @click="selected('',$t('button.all'))">
                                <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                            </span>
                            <span v-for="(item,index) in selectEmpType"
                                  :key="index"
                                  @click="selected(item.paramCode,item.paramInfoCn)">
                                <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                            </span>
                        </DropdownMenu>
                    </Dropdown>
                    <Button type="primary"
                            v-if="AccessControl.toString().includes('button_add')"
                            @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="error"
                            v-if="AccessControl.toString().includes('button_del')"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                    <Button type="primary"
                            v-if="AccessControl.toString().includes('button_exp')"
                            @click="expData">{{$t('button.exp')}}</Button>
                    <Button type="primary"
                            v-if="AccessControl.toString().includes('button_imp')"
                            @click="importExcel">{{$t('button.imp')}}</Button>
                    <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Spin fix
                          v-if="isSpin"
                          size="large"></Spin>
                    <Table @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
                           :height="tableheight"
                           size="small"
                           border
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          :current="page"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         @getData="getData"
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import update from './addNewTaxexemption'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import advanced from '../../../components/searchTable/searchAdvanced'

export default {
    name: 'taxexemptionManage',
    data () {
        return {
            isSpin: false,
            imp_mt:  this.$global.mt+'BaseTaxexemption.importData',
            openImport: false,
            expDataTital: [{ code: 'taxexeEmptypeName', name: this.$t('lang_baseManage.baseTaxexemption.taxexeEmptypeName') }, { code: 'taxexeThreshold', name: this.$t('lang_baseManage.baseTaxexemption.taxexeThreshold') },
            { code: 'taxexeSdate', name: this.$t('lang_baseManage.baseTaxexemption.taxexeSdate') }, { code: 'taxexeEdate', name: this.$t('lang_baseManage.baseTaxexemption.taxexeEdate') },
            { code: 'comment', name: this.$t('lang_baseManage.baseTaxexemption.comment') }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            selectEmpType: [],
            tableheight: document.body.offsetHeight - 250,
            value: '',
            select: this.$t('button.all'),
            logType: '',
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_baseManage.baseTaxexemption.taxexeEmptypeName'),
                    key: 'taxexeEmptypeName',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_baseManage.baseTaxexemption.taxexeThreshold'),
                    key: 'taxexeThreshold',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_baseManage.baseTaxexemption.taxexeSdate'),
                    key: 'taxexeSdate',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_baseManage.baseTaxexemption.taxexeEdate'),
                    key: 'taxexeEdate',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 64,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            taxexeEmptypeName: '',
            AccessControl: [],
            showAdvanced: false,
        }
    },
    computed: {

    },
    components: {
        update,
        expwindow,
        expdow,
        importExcel,
        advanced
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.taxexeEmptypeName = ''
            t.select = this.$t('button.all')
            t.getData(1)
            t.getSelect()
        }
    },
    methods: {
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'BaseTaxexemption.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                taxexeEmptype: t.taxexeEmptypeName,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    this.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        expData () {
            const t = this
            const data = {
                taxexeEmptype: t.taxexeEmptypeName,
            }
            this.$refs.expwindow.getData(this.expDataTital, 'baseTaxexemption.export', data)
            this.openExp = true
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirmdelete'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'BaseTaxexemption.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: his.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        selected (key, name) {
            this.select = name
            this.taxexeEmptypeName = key
            this.getData(1)
        },
        open () {
            const t = this
            t.opendialog = true
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'emptype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectEmpType = (res.data.content[0].value[0].paramList)
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            //        t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.formValidate.taxexeEmptype = ''
            t.$refs.update.formValidate.taxexeEmptypeName = ''
            t.$refs.update.formValidate.taxexeThreshold = ''
            t.$refs.update.formValidate.taxexeSdate = ''
            t.$refs.update.formValidate.taxexeEdate = ''
            t.$refs.update.formValidate.comment = ''
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
