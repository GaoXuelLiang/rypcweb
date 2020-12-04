<template>
    <div class="table">
        <Row>
            <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    员工司龄分析
                </p>
                <Row style="font-size:0;">
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
                           :columns="columns"
                           :data="data"
                           :height="tableheight"
                           size="small"
                           stripe
                           ref="selection"></Table>
                </Row>
                <Row style="display: flex;align-items:center">
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
            /**
             * 表格
             */
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '公司名称',
                    key: 'empcaCompanyName',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '总人数',
                    key: 'empcaNumber',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '<1年',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empcaCompagenum1',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '占比',
                            key: 'empcaCompagerate1',
                            width: 80,
                            align: 'center'
                        }
                    ]
                },
                {
                    title: '1年≤Y<3年)',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empcaCompagenum2',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '占比',
                            key: 'empcaCompagerate2',
                            width: 80,
                            align: 'center'
                        }
                    ]
                },
                {
                    title: '3年≤Y<5年',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empcaCompagenum3',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '占比',
                            key: 'empcaCompagerate3',
                            width: 80,
                            align: 'center'
                        }
                    ]
                },
                {
                    title: '5年≤Y<10年',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empcaCompagenum4',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '占比',
                            key: 'empcaCompagerate4',
                            width: 80,
                            align: 'center'
                        }
                    ]
                },
                {
                    title: 'Y≥10年',
                    align: 'center',
                    children: [
                        {
                            title: '人数',
                            key: 'empcaCompagenum5',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '占比',
                            key: 'empcaCompagerate5',
                            width: 80,
                            align: 'center'
                        }
                    ]
                }
            ],
            data: [],
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
            /**
             * 导出 
            */
            expDataTital: [
                {
                    name: '公司名称',
                    code: 'empcaCompanyName'
                },
                {
                    name: '总人数',
                    code: 'empcaNumber'
                },
                {
                    name: '人数(<1年)',
                    code: 'empcaCompagenum1'
                },
                {
                    name: '占比(<1年)',
                    code: 'empcaCompagerate1'
                },
                {
                    name: '人数(1年≤Y<3年)',
                    code: 'empcaCompagenum2'
                },
                {
                    name: '占比(1年≤Y<3年)',
                    code: 'empcaCompagerate2'
                },
                {
                    name: '人数(3年≤Y<5年)',
                    code: 'empcaCompagenum3'
                },
                {
                    name: '占比(3年≤Y<5年)',
                    code: 'empcaCompagerate3'
                },
                {
                    name: '人数(5年≤Y<10年)',
                    code: 'empcaCompagenum4'
                },
                {
                    name: '占比(5年≤Y<10年)',
                    code: 'empcaCompagerate4'
                },
                {
                    name: '人数(Y≥10年)',
                    code: 'empcaCompagenum5'
                },
                {
                    name: '占比(Y≥10年)',
                    code: 'empcaCompagerate5'
                }
            ],
            openExp: false,
            filekey: '',
            filename: '',
            openExpDow: false,
            logType: '',
            index: 0,
            /**
             * 分页
             */
            page: 1,
            rows: 10,
            sort: 'id',
            order: 'desc',
            total: 0
        }
    },
    components: {
        expwindow,
        expdow,
        searchHCompany
    },
    mouted () {
        this.empdimCompanyDis = '';
        this.empdimCompany = '';
        this.tableselected = [];
    },
    methods: {
        /**
         * 表格
         * 
         */
        getData (page) {
            const t = this;
            if (page) {
                this.page = page;
            }
            let data = {
                _mt:  this.$global.mt+'AnsrptEmpCompageAnal.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                empcaCompanyid: t.empdimCompany,
                empcaCompanyName: t.empdimCompanyDis,
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
                if (selection[i].empcaCompanyName == '合计') {
                    continue;
                }
                newArr.push(selection[i].empcaCompanyid + ':' + selection[i].empcaCompanyName)
            }
            this.tableselected = newArr
            // console.log(selection)
        },
        handleSpan ({ row, column, rowIndex, columnIndex }) {
            // console.log(row)
            if (row.empcaCompanyName == '合计') {
                if (rowIndex === this.data.length - 1 && columnIndex === 1) {
                    return [1, 2]
                } else if (rowIndex === this.data.length - 1 && columnIndex === 0) {
                    return [0, 0]
                }
            }
        },
        /**
         * 公司
         */
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
         * 
         */
        expData () {
            const data = {
                // ids:this.empdimCompany?this.empdimCompany + ':' + this.empdimCompanyDis:''
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AnsrptEmpCompageAnal.export', data)
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
         * 
         */
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData()
        },
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getData()
        }
    }
}
</script>

<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.btn {
    margin-right: 5px;
}
</style>