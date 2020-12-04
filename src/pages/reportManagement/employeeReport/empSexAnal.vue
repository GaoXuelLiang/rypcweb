<template>
    <div class="table">
        <Row>
            <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    员工性别分析
                </p>
                <Row style="font-size:0">
                    <span class="btn"
                          @dblclick="opencompet">
                        <Input v-model="empdimCompanyDis"
                               style="width: 200px"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="请选择公司"
                               @on-click="selectHCompany" />
                    </span>
                    <Button class="btn"
                            type="info"
                            @click="getData(1)">{{$t('button.ser')}}</Button>
                    <Button class="btn"
                            type="primary"
                            @click="expData">{{$t('button.exp')}}</Button>
                </Row>
                <Row class="table-form">
                    <Spin fix
                          v-if="isSpin"
                          size="large"></Spin>
                    <Table :span-method="handleSpan"
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
                           :columns="columns"
                           :data="data"
                           :height="tableheight"
                           size="small"
                           stripe
                           ref="selection"></Table>
                </Row>
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
            </Card>
            </Col>
        </Row>
        <!-- 导出 -->
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
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
    </div>
</template>

<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
export default {
    data () {
        return {
            /**表格 */
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empsaCompany',
                    // width:100,
                    align: 'center',
                    // sortable:'custom'
                },
                {
                    title: '总人数',
                    key: 'empsaNumber',
                    // width:100,
                    align: 'center',
                    // sortable:'custom'
                },
                {
                    title: '男',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empsaMannum',
                            // width:100,
                            align: 'center',
                            // sortable:'custom'
                        },
                        {
                            title: '占比',
                            key: 'empsaManrate',
                            // width:100,
                            align: 'center',
                            // sortable:'custom'
                        }
                    ]
                },
                {
                    title: '女',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empsaWomannum',
                            align: 'center',
                            // width:100,
                            // sortable:'custom'
                        },
                        {
                            title: '占比',
                            key: 'empsaWomanrate',
                            // width:100,
                            align: 'center',
                            // sortable:'custom'
                        }
                    ]
                }
            ],
            data: [],
            tableselected: [],
            /**公司 */
            openHCompany: false,
            empdimCompanyDis: '',
            empdimCompany: '',
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                }
            ],
            paramsHCompany: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                logType: '雇佣公司',
                unitType: '01company,10area',
                unitState: '0206valid'
            },
            /**导出 */
            expDataTital: [
                {
                    name: '公司',
                    code: 'empsaCompany'
                },
                {
                    name: '总人数',
                    code: 'empsaNumber'
                },
                {
                    name: '人数男',
                    code: 'empsaMannum'
                },
                {
                    name: '占比男',
                    code: 'empsaManrate'
                },
                {
                    name: '人数女',
                    code: 'empsaWomannum'
                },
                {
                    name: '占比女',
                    code: 'empsaWomanrate'
                }
            ],
            openExp: false,
            filekey: '',
            filename: '',
            openExpDow: false,
            logType: '',
            index: 0,
            /**分页 */
            page: 1,
            rows: 10,
            sort: 'id',
            order: 'desc',
            total: 0
        }
    },
    components: {
        searchHCompany,
        expwindow,
        expdow
    },
    mouted () {
        this.empdimCompanyDis = '';
        this.empdimCompany = '';
    },
    methods: {
        /**
         * 表格
         */
        getData (page) {
            const t = this;
            if (page) {
                this.page = page;
            }
            let data = {
                _mt:  this.$global.mt+'AnsrptEmpSexAnal.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                empsaCompanyid: t.empdimCompany,
                empsaCompany: t.empdimCompanyDis
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true;
            getDataLevelUserLoginNew(data).then(res => {
                t.isSpin = false;
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                if (selection[i].empsaCompany == '合计') {
                    continue;
                }
                newArr.push(selection[i].empsaCompanyid + ':' + selection[i].empsaCompany)
            }
            this.tableselected = newArr
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
        handleSpan ({ row, column, rowIndex, columnIndex }) {
            if (row.empsaCompany == '合计') {
                // console.log(row)
                if (rowIndex === this.data.length - 1 && columnIndex === 1) {
                    return [1, 2]
                } else if (rowIndex === this.data.length - 1 && columnIndex === 0) {
                    return [0, 0]
                }
            }
        },
        // 选择公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        inputHCompany (name, id) {
            const t = this
            // console.log(a,b,c,row)
            t.empdimCompanyDis = name
            t.empdimCompany = id
        },
        opencompet () {
            const t = this
            t.empdimCompanyDis = ''
            t.empdimCompany = ''
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        /**
         * 导出
         */
        expData () {
            const data = {
                // empsaCompanyid: this.empdimCompany
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AnsrptEmpSexAnal.export', data)
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
        /**
         * 分页
         */
        sizeChange (size) {
            this.rows = size;
            this.getData();
        },
        pageChange (page) {
            this.page = page;
            this.getData();
        }
    }
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