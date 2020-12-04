<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="blocksTitle">
                <Icon type="compose"
                      style="margin-right: 5px;"></Icon>
                选择集团班次
            </div>
            <Row class="table-form">
                <span>
                    <Input placeholder="请输入班次名称"
                           style="width: 200px"
                           v-model="name1" />
                </span>
                <span style="margin: 0;"><Button type="primary"
                            @click="search"
                            :loading="isSpin">{{$t('button.ser')}}</Button></span>
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
                       height="250"
                       size="small"
                       border
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"></Table>
                <!-- @on-row-dblclick="dbCkick" -->
            </row>
            <Row style="display: flex">
                <Page :total="total"
                      :current="params.page"
                      size="small"
                      show-elevator
                      show-sizer
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="refresh"></Button>
            </Row>

            <div class="blocksTitle"
                 style="margin-top: 20px;">
                <Icon type="compose"
                      style="margin-right: 5px;"></Icon>
                选择目标公司
            </div>
            <Row>
                <Form class="content"
                      ref="upFormData"
                      :label-width="135">
                    <Row>
                        <i-col span="11">
                            <FormItem label="目标公司"
                                      prop='attShifmorningoff'>
                                <span @dblclick="dbHCompany">
                                    <Input v-model="positionCompDis"
                                           style="width: 100%;"
                                           icon="ios-search"
                                           :readonly="true"
                                           placeholder="请选择目标公司"
                                           @on-click="selectHCompany" />
                                </span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="23">
                            <Row type="flex"
                                 justify="end">
                                <FormItem>
                                    <Button type="primary"
                                            :loading="isSpin"
                                            @click="save">{{$t('button.sav')}}</Button>
                                </FormItem>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
            </Row>
        </div>
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
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    components: {
        searchHCompany,
    },
    data () {
        return {
            startTime: '', // 开始日期
            endTime: '', // 结束日期
            isSpin: false,
            data: [],
            total: NaN,
            post: '',
            postId: '',
            showSearchPost: false,
            newArr: [],
            current: 1,
            empCname: '',
            searchCloumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                // {
                //   title: '班次编号',
                //   key: 'attShifCode',
                //   width: 140,
                //   sortable: 'custom',
                // },
                {
                    title: '班次名称',
                    key: 'attShifName',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'attShifHircompanyDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '上班时间',
                    key: 'attShifSworktime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '下班时间',
                    key: 'attShifEworktime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '上班上限（分）',
                    key: 'attShifUpstime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '下班下限（分）',
                    key: 'attShifDownetime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '午休开始时间',
                    key: 'attShifmorningoff',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: '午休结束时间',
                    key: 'attShifAfternoonwork',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: '下班卡开始时间',
                    key: 'attShifOutchktime',
                    sortable: 'custom',
                    width: 140,
                },
            ],
            params: {
                _mt:  this.$global.mt+'AttendShift.getCompanyPage',
                funId: '1',
                logType: '集团班次',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'asc',
                funId: '1',
            },
            //      雇佣公司
            openHCompany: false,
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
            ],
            paramsHCompany: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                unitType: '01company,10area',
                logType: '雇佣公司',
            },
            positionComp: '',
            positionCompDis: '',
            name1: '', // 班次名称
        }
    },
    props: {
        logType: String,
    },
    mounted () {

    },
    methods: {
        search () {
            this.params.page = 1
            this.getData()
        },
        getData () {
            const t = this
            let data = deepCopy(t.params)
            data.attShifName = this.name1
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.current = res.data.content[0].page
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.name1 = ''
            this.positionComp = ''
            this.positionCompDis = ''
            this.newArr = []
            this.params.page = 1
            this.$emit('hideMsg')
        },
        // 保存选择的员工
        save () {
            let t = this
            if (t.newArr.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return
            }
            if (!t.positionComp) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择目标公司',
                })
                return
            }
            let params2 = {
                _mt:  this.$global.mt+'AttendShift.shiftCopy',
                funId: '1',
                logType: '复制集团班次',
                ids: t.newArr.toString(),
                attShifHircompany: t.positionComp,
            }
            getDataLevelUserLogin(params2).then((res) => {
                t.newArr = []
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '复制成功',
                    })
                    t.$emit('getData')
                    t.close()
                }
            }).catch(() => {
                t.newArr = []
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        refresh () {
            this.getData()
        },
        sizeChange (size) {
            const t = this
            t.params.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.params.page = page
            t.getData()
        },
        // 勾选
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.newArr = newArr
        },
        // 多选触发函数
        selectChange (row) {
            let t = this;
            for (let i = 0; i <= row.length - 1; i++) {
                if (t.newArr.indexOf(row[i].id) == -1) {
                    t.newArr.push(row[i].id)
                }
            }
        },
        // 取消选中时触发
        selectCancel (selection, row) {
            let t = this
            for (let i = 0; i <= t.newArr.length - 1; i++) {
                if (t.newArr[i] == row.id) {
                    t.newArr.splice(i, 1)
                }
            }
        },
        // 修改列表排序
        sortable (column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.params.order = 'desc'
            }
        },
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        inputHCompany (name, id) {
            const t = this
            t.positionCompDis = name
            t.positionComp = id
        },
        dbHCompany () {
            const t = this
            t.positionCompDis = ''
            t.positionComp = ''
            t.clearDepart()
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin-bottom: 10px;
}

.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 800px;
        background-color: #fff;
        padding: 60px 20px 0px 20px;
        border-radius: 10px;
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
.blocksTitle {
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    margin-bottom: 10px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
}
</style>
