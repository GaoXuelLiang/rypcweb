<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_authorization.platRolecont.title')}}
                </p>
                <Row class="btnHeight">
                    <Input :placeholder="$t('lang_authorization.platRolecont.platRolecontCodeDis')"
                           style="width: 160px"
                           v-model="platRolecontCode" />
                    <Input :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')"
                           style="width: 160px"
                           v-model="platRolecontCnname" />
                    <!-- <span style="margin: 0;"><Button type="info"  :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button></span> -->
                    <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" @click="openUp('',$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button> -->
                    <!--<Button type="primary"   v-if="AccessControl.toString().includes('button_exp')" @click="expData">{{$t('button.exp')}}</Button>-->
                    <!--<Button type="primary"  v-if="AccessControl.toString().includes('button_imp')" @click="importExcel">{{$t('button.imp')}}</Button>-->
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
                    <Table @on-selection-change="selectedtable"
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
                    @closeUp="closeUp"
                    :index="index"
                    @updateArray="updateArray"
                    @addNewArray="addNewArray"
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
                         @getData="getData"
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
import update from './platRoleBase'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'platRolecontact',
    data () {
        return {
            isSpin: false,
            imp_mt: this.$global.mt + 'PlatRolecontact.importData',
            noDataImg: '<div id="noData"></div>',
            openImport: false,
            expDataTital: [{ code: 'platRolecontCode', name: this.$t('lang_authorization.platRolecont.platRolecontCode') }, { code: 'platRolecontCnname', name: this.$t('lang_authorization.platRolecont.platRolecontCnname') },
            { code: 'platRolecontEnname', name: this.$t('lang_authorization.platRolecont.platRolecontEnname') }, { code: 'platRolecontDesc', name: this.$t('lang_authorization.platRolecont.platRolecontDesc') },
            { code: 'platRolecontNoticeDis', name: this.$t('lang_authorization.platRolecont.platRolecontNoticeDis') }, { code: 'platRolecontPhone', name: this.$t('lang_authorization.platRolecont.platRolecontPhone') },
            { code: 'platRolecontSms', name: this.$t('lang_authorization.platRolecont.platRolecontSms') }, { code: 'platRolecontUnifiedcn', name: this.$t('lang_authorization.platRolecont.platRolecontUnifiedcn') },
            { code: 'platRolecontUnifieden', name: this.$t('lang_authorization.platRolecont.platRolecontUnifieden') }, { code: 'platRolecontMail', name: this.$t('lang_authorization.platRolecont.platRolecontMail') },
            { code: 'platRolecontVaildDis', name: this.$t('lang_authorization.platRolecont.platRolecontVaild') }, { code: 'platRolecontNote', name: this.$t('lang_authorization.platRolecont.platRolecontNote') }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            tableheight: document.body.offsetHeight - 250,
            value: '',
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
                    title: this.$t('lang_authorization.platRolecont.platRolecontCode'),
                    key: 'platRolecontCode',
                    width: 180,
                    sortable: 'custom',
                    resizable: true,
                },
                {
                    title: '角色名称',
                    key: 'platRolecontCnname',
                    width: 150,
                    sortable: 'custom',
                    resizable: true,
                },
                // {
                //   title: this.$t('lang_authorization.platRolecont.platRolecontEnname'),
                //   key: 'platRolecontEnname',
                //   width: 150,
                //   sortable: 'custom',
                // },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontDesc'),
                    key: 'platRolecontDesc',
                    width: 180,
                    sortable: 'custom',
                    resizable: true,
                },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontNotice'),
                    key: 'platRolecontNoticeDis',
                    width: 150,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontPhone'),
                    key: 'platRolecontPhone',
                    width: 150,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontSms'),
                    key: 'platRolecontSms',
                    width: 180,
                    sortable: 'custom',
                },
                {
                    title: '统一联系人',
                    key: 'platRolecontUnifiedcn',
                    width: 200,
                    sortable: 'custom',
                },
                // {
                //   title: this.$t('lang_authorization.platRolecont.platRolecontUnifieden'),
                //   key: 'platRolecontUnifieden',
                //   width: 150,
                //   sortable: 'custom',
                // },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontMail'),
                    key: 'platRolecontMail',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_authorization.platRolecont.platRolecontVaild'),
                    key: 'platRolecontVaildDis',
                    width: 150,
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
            platRolecontCode: '',
            platRolecontCnname: '',
            AccessControl: [],
            showAdvanced: false,
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
        this.getData(1)
    },
    destroyed () {
        window.onresize = null;
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
            t.$refs.btnList.loading = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt: this.$global.mt + 'PlatRolecontact.getPage',
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                platRolecontVaild: '1',
                platRolecontCode: t.platRolecontCode,
                platRolecontCnname: t.platRolecontCnname,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
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
            })
        },
        closeImport () {
            const t = this
            t.openImport = false
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
                    this.getData(1)
                    break
            }
        },
        importExcel () {
            const t = this
            t.openImport = true
            t.$refs.importExcel.geRtDowModelFile()
        },
        expData () {
            const data = {
                platRolecontCode: this.platRolecontCode,
                platRolecontCnname: this.platRolecontCnname,
            }
            this.$refs.expwindow.getData(this.expDataTital, 'platRolecontact.export', data)
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
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
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
                    content: this.$t('reminder.leastone'),
                    onOk: () => {
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + 'PlatRolecontact.delByIds',
                            APlogType: this.$t('button.del'),
                            APdelIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData(1)
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
            t.index = index
            t.openUpdate = true
            //      将本条数据的id传入mainid（如果有的话）
            this.$store.commit('platRole/setMainId', id)
            this.$store.commit('platRole/setIndex', index)
            if (id) {
                t.$refs.update.getOptionData()
            }
            t.$refs.update.getOption(logType)
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.clear()
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
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
