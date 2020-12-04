<template>
    <div class="table">
        <Row>
            <Col span="24">

            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_baseManage.baseCity.title')}}
                </p>
                <Row>
                    <!--<Col span="4" class="colTree">-->
                    <!--<div class="divtree" :style="{height:treeheight + 'px'}">-->
                    <!--<Tree :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>-->
                    <!--</div>-->
                    <!--</Col>-->
                    <Col span="5"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:(treeheight - 8) + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    <!-- <div class="refresh" style="margin-top:10px">
              <Button size="small" shape="circle" icon="md-refresh" @click="getTree()"></Button>
            </div> -->
                    </Col>

                    <Col span="19">
                    <Row class="font btnHeight">
                        <Input :placeholder="$t('lang_baseManage.baseCity.cityNameDis')"
                               style="width: 200px"
                               v-model="cityName" />
                        <Input :placeholder="$t('lang_baseManage.baseCity.cityCode1Dis')"
                               style="width: 200px"
                               v-model="cityCode1" />
                        <!-- <span style="margin: 0;"><Button type="info"  :loading="isSpin"  @click="search()">{{$t('button.ser')}}</Button></span> -->
                        <Dropdown class="dropdown">
                            <Button type="primary">
                                {{select}}
                                <Icon type="md-arrow-dropdown"
                                      size="18"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <span @click="selected('',$t('button.all'))">
                                    <DropdownItem name="">{{$t('button.all')}}</DropdownItem>
                                </span>
                                <span v-for="(item,index) in selectCityType"
                                      :key="index"
                                      @click="selected(item.paramCode,item.paramInfoCn)">
                                    <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                        <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary" v-if="AccessControl.toString().includes('button_exp')"  @click="expData">{{$t('button.exp')}}</Button>
            <Button type="primary" class="btnTop" v-if="AccessControl.toString().includes('button_imp')"  @click="importExcel">{{$t('button.imp')}}</Button> -->
                        <btnList @operatorBtn="operatorBtn"
                                 @openUp="btnEvent"
                                 ref="btnList"></btnList>
                        <!-- <Button type="primary" class="btnTop" v-if="AccessControl.toString().includes('button_pinyin')" @click="send">转拼音编码</Button> -->
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
                               :no-data-text="noDataImg"
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
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="getData(1)"></Button>
                    </Row>
                    </Col>

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
    </div>
</template>
<script>
import update from './cityInfoView'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'cityManage',
    data () {
        return {
            noDataImg: '<div id="noData"></div>',
            isSpin: false,
            imp_mt:  this.$global.mt+'BaseCity.importData',
            openImport: false,
            expDataTital: [
                { code: 'cityName', name: this.$t('lang_baseManage.baseCity.cityName') },
                { code: 'cityCode1', name: this.$t('lang_baseManage.baseCity.cityCode1') },
                { code: 'cityCode2', name: this.$t('lang_baseManage.baseCity.cityCode2') },
                { code: 'cityCode3', name: this.$t('lang_baseManage.baseCity.cityCode3') },
                { code: 'cityTypeName', name: this.$t('lang_baseManage.baseCity.cityTypeName') },
                { code: 'cityPname', name: this.$t('lang_baseManage.baseCity.cityPname') },
                { code: 'cityIsvalidName', name: this.$t('lang_baseManage.baseCity.cityIsvalidName') },
                // { code: 'cityIssbName', name: this.$t('lang_baseManage.baseCity.cityIssbName') },
                // { code: 'cityIshfName', name: this.$t('lang_baseManage.baseCity.cityIshfName') },
                // { code: 'cityIstaxName', name: this.$t('lang_baseManage.baseCity.cityIstaxName') },
                { code: 'comment', name: '备注' }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            dataTree: [],
            selectCityType: [],
            treeheight: document.body.offsetHeight - 200,
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
                    fixed: 'left',
                    align: 'center',
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                    fixed: 'left',
                    width: 150,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityCode1'),
                    key: 'cityCode1',
                    sortable: 'custom',
                    width: 110,
                    //          width: 90,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityCode2'),
                    key: 'cityCode2',
                    sortable: 'custom',
                    width: 110,
                    //          width: 90,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityCode3'),
                    key: 'cityCode3',
                    sortable: 'custom',
                    width: 110,
                    //          width: 90,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 110,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityPname'),
                    key: 'cityPname',
                    sortable: 'custom',
                    width: 110,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityIsvalidName'),
                    key: 'cityIsvalidName',
                    sortable: 'custom',
                    width: 110,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityIssbName'),
                    key: 'cityIssbName',
                    sortable: 'custom',
                    width: 150,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityIshfName'),
                    key: 'cityIshfName',
                    sortable: 'custom',
                    width: 180,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityIstaxName'),
                    key: 'cityIstaxName',
                    sortable: 'custom',
                    width: 150,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        //[
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
                        //         this.openUp(params.row.id, '修改', params.index)
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
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            cityName: '',
            cityTypeName: '',
            cityCode1: '',
            cityPid: '',
            treeid: '',
            AccessControl: [],
            loading: false,
            btnArr: []
        }
    },
    computed: {
        tagName () {
            return this.$store.state.app.tagName
        },
    },
    components: {
        update,
        expwindow,
        expdow,
        importExcel,
        btnList
    },
    //    mounted() {
    //      this.getSelect()
    //      this.getData(1)
    //      this.getTree()
    //    },
    //    watch:{
    //      $route(to,from){
    //        console.log(to, '--------2222222222222---------')
    //        console.log(this.tagName, '--------222222222222222---------')
    //        if (to.query.state && this.tagName === to.name) {
    //          this.getSelect()
    //          this.getData(1)
    //          this.getTree()
    //        }
    //      }
    //    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        getData (page, value) {
            const t = this
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'BaseCity.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                cityName: t.cityName,
                cityType: t.cityTypeName,
                cityCode1: t.cityCode1,
                cityPid: t.cityPid,
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
            })
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
        getTree () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'BaseCity.getTree',
                rows: '100',
                page: '1',
                sort: 'id',
                order: 'asc',
                logType: this.$t('button.ser'),
                id: '0',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.dataTree = []
            t.loading = true
            getDataLevelUserLoginNew(data).then((res) => {
                t.loading = false
                if (isSuccess(res, t)) {
                    res.data.content[0].value.push({
                        id: '0',
                        cityName: this.$t('lang_baseManage.baseCity.allCountry'),
                    })
                    t.dataTree = t.toTree(res.data.content[0].value)
                }
            }).catch(() => {
                t.loading = false
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
                cityName: this.cityName,
                cityType: this.cityTypeName,
                cityCode1: this.cityCode1,
            }
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'BaseCity.export', data)
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
        /* 树点击事件 */
        selectChange (e) {
            this.treeid = e.id
            this.cityPid = this.treeid
            this.getData(1)
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.checked = item.authRoleFunDis === '1'
                item.title = item.cityName
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.cityPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)

                } else {
                    val.push(item)
                    item.expand = true
                }
            })
            return val
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
            t.getTree()
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
            t.getTree()
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
                            _mt:  this.$global.mt+'BaseCity.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getTree()
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
            // t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
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
                    this.search()
                    break;
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.formValidate.cityName = ''
            t.$refs.update.formValidate.cityType = ''
            t.$refs.update.formValidate.cityCode1 = ''
            t.$refs.update.formValidate.cityCode2 = ''
            t.$refs.update.formValidate.cityCode3 = ''
            t.$refs.update.formValidate.cityTypeName = ''
            t.$refs.update.formValidate.cityPid = ''
            t.$refs.update.cityPname = ''
            t.$refs.update.distype = false
            t.$refs.update.formValidate.cityIsvalid = ''
            t.$refs.update.formValidate.cityIstax = ''
            t.$refs.update.formValidate.cityIssb = ''
            t.$refs.update.formValidate.cityIshf = ''
            t.$refs.update.formValidate.comment = ''
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'citytype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectCityType = (res.data.content[0].value[0].paramList)
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        selected (key, name) {
            this.select = name
            this.cityTypeName = key
            this.getData(1)
        },
        search () {
            this.cityPid = ''
            this.page = 1
            this.getData(1)
        },
        renderContent (h, { root, node, data }) {
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
                    h('Icon', {
                        props: {
                            type: data.cityType === '01prov' ? 'md-home' : data.cityType === '02city' ? 'md-home' : data.cityType === '03county' ? 'md-home' : 'md-home',
                            size: '15',
                            color: data.cityType === '01prov' ? '#ff9900' : data.cityType === '02city' ? '#39c263' : data.cityType === '03county' ? '#bf3319' : '#3399ff',
                        },
                        style: {
                            marginRight: '8px',
                        },
                    }),
                    h('span', data.title),
                ]),
            ])
        },
        /**
         * @name: 转拼音编码
         * @param {type} 
         * @return: 
         */
        send () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseCity.updCodetoPinYin',
                funId: '1',
                logType: '转拼音编码',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '转换成功',
                    })
                    t.getData()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        }
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.cityName = ''
            t.cityCode1 = ''
            t.cityTypeName = ''
            t.select = this.$t('button.all'),
                this.getSelect()
            this.getData(1)
            this.getTree()
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
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    border-top: 2px solid;
    border-top-color: rgba(9, 161, 252, 1);
    padding-left: 6px;
    /*height: 750px;*/
    overflow: auto;
    position: relative;
}
/deep/ .ivu-tree-title {
    width: auto !important;
}
.ivu-input-wrapper {
    margin-right: 5px;
}
.dropdown {
    margin-right: 5px;
}
</style>
