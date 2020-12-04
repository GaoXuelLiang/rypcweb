<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    合同公司管理
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row>
                        <span class="btn">
                            <Input placeholder="合同公司名称"
                                   style="width: 200px"
                                   v-model="form.concompName" />
                        </span>
                        <!--<span @dblclick="clearUnit">-->
                        <!--<Input placeholder="	所属组织" style="width: 200px"  v-model="form.concompUnitDis" @on-click="selectComp"/>-->
                        <!--</span>-->
                        <!-- <span><Button type="info" :loading="isSpin"  @click="search()">{{$t('button.ser')}}</Button></span> -->
                        <!-- <Button class="btn" type="warning" v-if="AccessControl.toString().includes('button_add')" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button class="btn" type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button class="btn" type="primary"  v-if="AccessControl.toString().includes('button_export')" @click="expData">{{$t('button.exp')}}</Button>
            <Button class="btn" type="primary" v-if="AccessControl.toString().includes('button_import')"  @click="importExcel">{{$t('button.imp')}}</Button> -->
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        <btn-list @operatorBtn="operatorBtn"
                                  @openUp="btnEvent"
                                  ref="btnList">
                        </btn-list>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table :no-data-text="noDataImg"
                               :height="tableheight"
                               size="small"
                               stripe
                               ref="selection"
                               :columns="columns"
                               :data="data"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable">
                        </Table>
                    </row>
                    <Row style="display: flex">
                        <Row style="display: flex">
                            <Page :total="total"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  placement="top"
                                  :current="page"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size-opts="[10, 20, 50, 100]">
                            </Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        </Row>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUpd="closeUpd"
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
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import update from './update.vue'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'contractCompany',
    data () {
        return {
            showModal: false,
            modiaContent: 'org-org-std',
            dataParame: {},
            isSpin: false,
            openUpdate: false,
            tableheight: document.body.offsetHeight - 250,
            tableselected: [],
            updateId: NaN,
            AccessControl: [],
            form: {
                id: '',
                concompName: '', //编号
                concompUnit: '', //名称
                concompUnitDis: '', //名称
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '合同公司编码',
                    key: 'concompCode',
                    sortable: 'custom',
                },
                {
                    title: '合同公司名称',
                    key: 'concompName',
                    sortable: 'custom',
                },
                {
                    title: '所属组织',
                    key: 'concompUnitDis',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 80,
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        // return h('div', [
                        // 	h('Button', {
                        // 		props: {
                        // 			type: 'info',
                        // 			size: 'small',
                        // 		},
                        // 		style: {
                        // 			marginLeft: '5px',
                        //       display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                        //     },
                        // 		on: {
                        // 			click: () => {
                        // 				this.openUp(params.row.id, this.$t('button.y.upd'))
                        // 			},
                        // 		},
                        // 	}, this.$t('button.y.upd')),
                        // ])
                    },
                },
            ],
            imp_mt:  this.$global.mt+'OrgContractcompany.importData',
            openImport: false,
            expDataTital: [
                { code: 'concompCode', name: '合同公司编码' },
                { code: 'concompName', name: '合同公司名称' },
                { code: 'concompUnit', name: '所属组织' }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            data: [],
            logType: '',
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            showAdvanced: false,
            btnArr: [], // 表格列按钮
            noDataImg:  '<div id="noData"></div>'
        }
    },
    components: {
        update,
        advanced,
        expwindow,
        expdow,
        importExcel,
        btnList
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.form.concompName = ''
            t.form.concompUnit = ''
            t.sort = 'id'
            t.getData(1)
        }
    },
    methods: {
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : 'primary',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                this.openUp(params.row.id, item.name, params.index)
                            },
                        },
                    }, item.name),
                )
            })
            return arr
        },
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
        btnEvent (code) {
            switch (code) {
                case 'button_query':
                    this.search()
                    break;
                case 'button_add':
                    this.openUp(NaN, this.$t('button.add'))
                    break;
                case 'button_del':
                    this.deletemsg()
                    break;
                case 'button_export':
                    this.expData()
                    break;
                case 'button_import':
                    this.importExcel()
                    break;
            }
        },
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
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'OrgContractcompany.getPage',
                funId: t.funId,
                logType: t.$t('button.ser'),
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                concompName: t.form.concompName,
                concompUnit: t.form.concompUnit,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true
            t.$refs.btnList.loading = true
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                t.$refs.btnList.loading = false
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
                t.$refs.btnList.loading = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
                t.$refs.btnList.loading = false
            })
        },
        // 新增修改后刷新页面
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
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
                            _mt:  this.$global.mt+'OrgContractcompany.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        // 新增
        openUp (id, logType) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        search () {
            this.page = 1
            this.getData()
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
        refresh () {
            this.getData(1)
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
            const data = {
                countryCname: this.countryCname,
                countryEname: this.countryEname,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'OrgContractcompany.export', data)
            this.openExp = true
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        /*
        * 弹出选择
        * */
        selectComp () {
            const t = this
            t.dataParame = {
                unitPid: 0,
            }
            t.showModal = true
        },
        clearUnit () {
            const t = this
            t.form.concompUnitDis = ''
            t.form.concompUnit = ''
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            console.log(row)
            t.form.concompUnitDis = row.unitsName
            t.form.concompUnit = row.id
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
.btn {
    margin-right: 5px;
}
</style>
