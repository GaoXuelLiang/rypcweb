﻿<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    银行信息管理
                </p>
                <Row class="btnHeight">
                    <!--          <Input :placeholder="$t('lang_platform.platEmpno.empnoDis')" style="width: 200px" v-model="empno"/>-->
                    <Input placeholder="请输入银行名称"
                           style="width: 200px"
                           v-model="cpbkBank" />
                    <Input placeholder="请输入公司名称"
                           style="width: 200px"
                           v-model="cpbkAreacompDis" />
                    <!-- <span style="margin: 0;"><Button type="info" :loading="isSpin"   @click="getData(1)">{{$t('button.ser')}}</Button></span> -->
                    <!--         
     <Button type="primary" @click="openIn($t('button.ini'))">{{$t('button.ini')}}</Button>-->
                    <!-- <Button type="warning"  v-if="AccessControl.toString().includes('button_add')" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error"  v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button> -->
                    <!--<Button type="primary" @click="expData">{{$t('button.exp')}}</Button>-->
                    <!--          <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>-->
                    <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    <btnList @operatorBtn="operatorBtn"
                             @openUp="btnEvent"
                             ref="btnList"></btnList>
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
                           :no-data-text="noDataImg"
                           :height="tableheight"
                           size="small"
                           stripe
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
import update from './addNewPlatEmpno'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'bankManage',
    data () {
        return {
            isSpin: false,
            noDataImg: '<div id="noData"></div>',
            imp_mt:  this.$global.mt+'BaseCompbankmapping.importData',
            openImport: false,
            expDataTital: [{ code: 'empno', name: this.$t('lang_platform.platEmpno.empno') }, { code: 'cpbkAreacompDis', name: this.$t('lang_platform.platEmpno.companys') }, { code: 'validName', name: this.$t('lang_platform.platEmpno.validName') },
            { code: 'comment', name: this.$t('lang_platform.platEmpno.comment') }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            openUpdate: false,
            openInit: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },

                {
                    title: '编码',
                    key: 'cpbkCode',
                    sortable: 'custom',
                },
                {
                    title: '银行名称',
                    key: 'cpbkName',
                    sortable: 'custom',
                },
                {
                    title: '公司范围',
                    key: 'cpbkAreacompDis',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        //   h('Button', {
                        //     props: {
                        //       type: 'success',
                        //       size: 'small',
                        //     },
                        //     style: {
                        //       display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                        //       },
                        //     },
                        //   }, this.$t('button.y.upd')),
                        // ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            empno: '',
            cpbkAreacompDis: '',
            cpbkBank: '',
            showAdvanced: false,
            AccessControl: [],
            btnArr: []
        }
    },
    computed: {

    },
    components: {
        update,
        expwindow,
        expdow,
        importExcel,
        advanced,
        btnList
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.cpbkAreacompDis = ''
            t.cpbkBank = ''
            t.getData(1)
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
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
            //console.log(btnList,'9999999999')
        },
        btnEvent (code) {
            switch (code) {
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
                case 'button_pinyin':
                    this.send()
                    break;
                case 'button_query':
                    this.getData(1)
                    break;
            }
        },
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
        getData (page, value) {
            const t = this
            t.isSpin = true
            t.$refs.btnList.loading = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'BaseCompbankmapping.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                cpbkAreacompDis: t.cpbkAreacompDis,
                cpbkName: t.cpbkBank,
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
            const data = {
                empno: this.empno,
                companys: this.companys,
            }
            this.$refs.expwindow.getData(this.expDataTital, 'platEmpno.export', data)
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
                            _mt:  this.$global.mt+'BaseCompbankmapping.delByIds',
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
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        open () {
            const t = this
            t.opendialog = true
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
        openIn (logType) {
            const t = this
            t.logType = logType
            t.openInit = true
            //        t.$refs.update.getSelect()
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.formValidate.empno = ''
            t.$refs.update.formValidate.companys = ''
            t.$refs.update.formValidate.valid = ''
            t.$refs.update.formValidate.comment = ''
        },
        closeInit () {
            const t = this
            t.openInit = false
            t.$refs.init.formValidate.sEmpNo = ''
            t.$refs.init.formValidate.companys = ''
            t.$refs.init.formValidate.eEmpNo = ''
            t.getData()
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
.ivu-input-wrapper {
    margin-right: 5px;
}
</style>
