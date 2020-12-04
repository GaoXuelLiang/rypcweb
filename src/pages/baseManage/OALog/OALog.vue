<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    OA接口日志
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row class="btnHeight">
                        <span>
                            <Input class="searchInput"
                                   placeholder="请输入接口类型"
                                   style="width: 200px"
                                   v-model="form.name1" />
                        </span>
                        <span>
                            <Input class="searchInput"
                                   placeholder="请输入请求类型"
                                   style="width: 200px"
                                   v-model="form.name2" />
                        </span>
                        <span>
                            <Input class="searchInput"
                                   placeholder="请输入请求URL"
                                   style="width: 200px"
                                   v-model="form.name3" />
                        </span>
                        <!--<span>-->
                        <!--<Input placeholder="请输入班次名称" style="width: 200px" v-model="form.attShifName"/>-->
                        <!--</span>-->
                        <span style="margin: 0;">
                            <Button style="width:56px"
                                    type="info"
                                    :loading="isSpin"
                                    @click="search()"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                        <Button type="primary"
                                @click="expData">{{$t('button.exp')}}</Button>
                        <!--<Button type="primary" v-if="AccessControl.toString().includes('button_add')" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>-->
                        <!--<Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>-->
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Table stripe
                               :loading="loading"
                               :height="tableheight"
                               :no-data-text="noDataImg"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               size="small"
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex">
                        <Page :current="page"
                              :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]">
                        </Page>
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span>
                        </span>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="getData(1)"></Button>
                    </Row>
                    <!-- <Row style="display: flex">
	          <Row style="display: flex">
              <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" >
              </Page>
              <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
	            <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
            </Row>
          </Row> -->
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
        <!--<advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>-->
        <!--导出-->
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
    </div>
</template>
<script>
import update from './update'
//  import advanced from '@/components/searchTable/searchAdvanced'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginData } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'

export default {
    name: 'attendanceSet',
    components: {
        update,
        //      advanced,
        expwindow,
        expdow,
    },
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            noDataImg: '<div id="noData"></div>',
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            expDataTital: [
                { code: 'id', name: 'ID' },
                { code: 'createTime', name: '时间' },
                { code: 'oalogInttype', name: '接口类型' },
                { code: 'oalogType', name: '请求类型' },
                { code: 'oalogUrl', name: '请求URL' },
                { code: 'oalogReqbody', name: '请求数据' },
                { code: 'oalogResponse', name: '返回信息' },
                { code: 'comment', name: '备注' },
            ],
            imp_mt: 'BaseOalog.importData',
            openSearchNormActive: false,
            showAdvanced: false,
            tableheight: document.body.offsetHeight - 245,
            logType: '',
            openUpdate: false,
            tableselected: [],
            form: {
                name1: '', // 班次编号
                name2: '', // 班次
                name3: '', // 班次
            },
            columns: [
                //          {
                //            type: 'selection',
                //            width: 60,
                //            align: 'center',
                //          },
                //          ID，创建时间，接口类型，请求类型，请求URL
                {
                    title: 'ID',
                    key: 'id',
                    // width: 70,
                    //            sortable: 'custom',
                },
                {
                    title: '时间',
                    key: 'createTime',
                    // width: 150,
                },
                {
                    title: '接口类型',
                    key: 'oalogInttype',
                    // width: 130,
                },
                {
                    title: '请求类型',
                    key: 'oalogType',
                    // width: 90,
                },
                {
                    title: '请求URL',
                    key: 'oalogUrl',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 80,
                    render: (h, params) => {
                        return h('div', [
                            //                h('Button', {
                            //                  props: {
                            //                    type: 'info',
                            //                    size: 'small',
                            //                  },
                            //                  style: {
                            ////                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                            //                    display: params.row.attShifCode !== 'BC00001' ? 'inline' : 'none',
                            //                  },
                            //                  on: {
                            //                    click: () => {
                            //                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                            //                    },
                            //                  },
                            //                }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    //                    marginRight: '5px',
                                    //                    display: params.row.attShifCode === 'BC00001' ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'))
                                    },
                                },
                            }, this.$t('button.view')),
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
            AccessControl: [],
        }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
         if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.form.name1 = ''
            t.form.name2 = ''
            t.form.name3 = ''
            t.getData(1)
        }
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        refresh () {
            this.getData()
        },
        getData (page, value) {
            const t = this
            t.loading = true;
            t.isSpin = true;
            if (page) {
                t.page = page
            }
            const data = {
                //          _mt: 'BaseOalog.getPage',
                _mt: 'BaseOalog.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                APlogType: t.$t('button.ser'),
                oalogInttype: t.form.name1,
                oalogType: t.form.name2,
                oalogUrl: t.form.name3,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.oalogInttype) data.oalogInttype = `${data.oalogInttype}&&1`
            if (data.oalogType) data.oalogType = `${data.oalogType}&&1`
            if (data.oalogUrl) data.oalogUrl = `${data.oalogUrl}&&1`
            t.data = [];
            t.total = 0;
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    //            this.btnControl(this).then((res1) => {
                    //              if (isSuccess(res1, t)) {
                    //                res1.data.content[0].value.forEach((item) => {
                    //                  t.AccessControl.push(item.btnLancode)
                    //                })
                    //              }
                    //            }).catch((err) => {
                    //              console.log(err)
                    //            })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
                t.isSpin = false;
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
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt+'BaseOalog.delByIds',
                            APfunId: '1',
                            APlogType: this.$t('button.del'),
                            APdelIds: t.tableselected.toString(),
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
        openUp (id, logType, index) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            t.index = index
            // 获取编号
            if (logType === this.$t('button.add')) {
                //          t.$refs.update.getCode()
            }
            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
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
        // 导出
        expData () {
            const t = this
            const data = {
                //          plogFlowid: t.flowInfo.pkValue,
                //          plogWorkno: t.pacemCname
                oalogInttype: t.form.name1,
                oalogType: t.form.name2,
                oalogUrl: t.form.name3,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'BaseOalog.export', data)
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
//
@import "../../../sass/table.scss";
@import "../../../sass/searchTable.scss";
.searchInput {
    margin-right: 5px;
}
.ivu-btn {
    margin-right: 5px;
}
/deep/ .ivu-table-cell {
    padding: 0 10px;
}
</style>
