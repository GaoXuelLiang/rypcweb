<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    TMC城市信息
                </p>
                <Row class="btnHeight">
                    <Input placeholder="请输入代码"
                           style="width: 200px"
                           v-model="name1" />
                    <Input placeholder="请输入名称"
                           style="width: 200px;margin-left:5px"
                           v-model="name2" />
                    <Input placeholder="请输入省份"
                           style="width: 200px;margin-left:5px"
                           v-model="name3" />
                    <Input placeholder="请输入区域"
                           style="width: 200px;margin-left:5px"
                           v-model="name4" />
                    <Input placeholder="请输入等级"
                           style="width: 200px;margin-left:5px"
                           v-model="name5" />
                    <!-- <span style="margin-left:5px"> -->
                    <!-- <Button type="info" :loading="isSpin"  @click="getData()">{{$t('button.ser')}}</Button></span> -->
                    <!-- <Button type="warining" v-if="AccessControl.toString().includes('button_add')" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="primary" v-if="AccessControl.toString().includes('button_datasame')" @click="send">数据同步</Button> -->
                    <btn-list @operatorBtn="operatorBtn"
                              @openUp="btnEvent"></btn-list>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Spin fix
                          v-if="isSpin"
                          size="large"></Spin>
                    <Table :height="tableheight"
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
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
                    ref="update"></update>
        </transition>
    </div>
</template>
<script>
import update from './addNewPlatEmpno'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'platEmpno',
    data () {
        return {
            name1: '',
            name2: '',
            name3: '',
            name4: '',
            name5: '',
            //        名称
            tmccityName: '',
            //        省份
            tmccityProvince: '',
            //        父级代码
            tmccityPid: '',
            isSpin: false,
            imp_mt:  this.$global.mt+'PlatEmpno.importData',
            openImport: false,
            expDataTital: [{ code: 'empno', name: this.$t('lang_platform.platEmpno.empno') }, { code: 'companys', name: this.$t('lang_platform.platEmpno.companys') }, { code: 'validName', name: this.$t('lang_platform.platEmpno.validName') },
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
                // {
                //   type: 'selection',
                //   width: 54,
                //   align: 'center',
                // },
                {
                    title: '代码',
                    key: 'tmccityCode',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '名称',
                    key: 'tmccityName',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '父级名称',
                    key: 'tmccityPname',
                    // width: 100,
                },
                {
                    title: '省份',
                    key: 'tmccityProvince',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '区域',
                    key: 'tmccityRegion',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '等级',
                    key: 'tmccityLevel',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '是否热点城市',
                    key: 'tmccityIshot',
                    // width: 110,
                    sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                },
                            }, params.row.tmccityIshot === '1' ? '是' : '否'),
                        ])

                    },
                },
                {
                    title: '缩写名称',
                    key: 'tmccityAbbname',
                    // width: 100,
                    sortable: 'custom',
                },
                {
                    title: '相邻城市',
                    key: 'tmccityNearby',
                    width: 300,
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        // return h('div', [
                        //   h('Button', {
                        //     props: {
                        //       type: 'success',
                        //       size: 'small',
                        //     },
                        //     style: {
                        //       display: this.AccessControl.toString().includes('button_view') === true ? 'inline' : 'none',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, this.$t('button.view'), params.index)
                        //       },
                        //     },
                        //   }, this.$t('button.view')),
                        // ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'tmccityCode',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            empno: '',
            companys: '',
            showAdvanced: false,
            AccessControl: [],
            btnArr: [] // 表格列按钮
        }
    },
    computed: {

    },
    components: {
        update,
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
            t.name1 = ''
            t.name2 = ''
            t.name3 = ''
            t.name4 = ''
            t.name5 = ''
            t.companys = ''
            t.getData(1)
        }
    },
    methods: {
        // 操作按钮渲染
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : "button_view" ? 'info' : 'primary',
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
        // 动态获取操作按钮
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
        // 按钮绑定事件
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
                case 'button_datasame':
                    this.send()
                    break;
                case 'button_query':
                    this.getData()
                    break;
            }
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'BaseTmccity.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                tmccityCode: t.name1,
                tmccityName: t.name2,
                tmccityProvince: t.name3,
                tmccityRegion: t.name4,
                tmccityLevel: t.name5
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.tmccityCode) data.tmccityCode = `${data.tmccityCode}&&1`
            if (data.tmccityName) data.tmccityName = `${data.tmccityName}&&1`
            if (data.tmccityProvince) data.tmccityProvince = `${data.tmccityProvince}&&1`
            if (data.tmccityRegion) data.tmccityRegion = `${data.tmccityRegion}&&1`
            t.data = []
            t.total = 0
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
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            //        t.$refs.update.getSelect()
            if (logType === this.$t('button.view')) {
                t.$refs.update.getData(id)
            }
        },
        closeUp () {
            const t = this
            t.openUpdate = false
        },
        /**
         * @name: 数据同步
         * @param {type} 
         * @return: 
         */
        send () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseTmccity.dataTmcSynch',
                funId: '1',
                logType: '数据同步',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '同步成功',
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        }
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
.ivu-input-wrapper,
.ivu-btn {
    margin-right: 5px;
}
</style>
