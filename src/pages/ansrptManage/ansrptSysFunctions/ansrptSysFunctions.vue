<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    用户权限查询
                </p>
                <Row class="btnHeight">
                    <span @dblclick="clearUser">
                        <Input class="searchInput"
                               v-model="userName"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="请选择用户"
                               style="width: 200px"
                               @on-click="pickData" />
                    </span>
                    <span style="margin: 0;"><Button style="56px" type="info"
                                :loading="isSpin"
                                @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table stripe
                           :loading="loading"
                           :height="tableheight"
                           :no-data-text="noDataImg"
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-sort-change="sortable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
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
        <transition name="fade">
            <searchPubUser v-show="openPickUser"
                           @closeUp="closeUp"
                           @changeinput="changeinput"
                           @clear="clearUser"
                           ref="searchPubUser"></searchPubUser>
        </transition>
    </div>
</template>
<script>
import update from './editAnsrptSysFunctions'
import { getDataLevelUserLogin, getDataLevelUserLoginNew,getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import searchPubUser from '../../../components/searchTable/searchPubUser'

export default {
    name: 'ansrptSysFunctions',
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            noDataImg: '<div id="noData"></div>',
            value: '',
            openPickUser: false,
            opendialog: false,
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
                    title: '用户姓名',
                    key: 'userName',
                    sortable: 'custom',
                },
                {
                    title: '功能节点名称',
                    key: 'funLancodeDis',
                    sortable: 'custom',
                },
                //          {
                //            title: this.$t('button.opr'),
                //            key: 'action',
                //            width: 64,
                //            fixed: 'right',
                //            align: 'center',
                //            render: (h, params) => {
                //              return h('div', [
                //                h('Button', {
                //                  props: {
                //                    type: 'success',
                //                    size: 'small',
                //                  },
                //                  on: {
                //                    click: () => {
                //                      this.openUp(params.row.id, '查看')
                //                    },
                //                  },
                //                }, '查看'),
                //              ])
                //            },
                //          },
            ],
            data: [],
            total: NaN, // 总页数
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            index: 0,
            likeName: '',
            pmtypeCode: '',
            mobileNo: '',
            logType: '',
            userId: '',
            userName: '',
        }
    },
    computed: {

    },
    components: {
        update,
        searchPubUser,
    },
    mounted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.userId = ''
            t.userName = ''
            t.getData(1)
        }
    },
    methods: {
        getData (page) {
            const t = this;
            t.loading = true;
            t.isSpin = true;
            if (page) {
                t.page = page
            }
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptSysFunctions.getPage',
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                userIdFun: t.userId,
                APlogType: "chaxun",
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
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
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData(1)
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
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
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
                            _mt:  this.$global.mt+'AuthSysLog.delByIds',
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
        open () {
            const t = this
            t.opendialog = true
        },
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.openUpdate = true
            t.index = index
            t.logType = logType
            if (logType === '查看') {
                t.$refs.update.getData(t.updateId)
            }
        },
        changeinput (name, mobileNo, email, loginName, id) {
            const t = this
            t.userName = name
            t.userId = id
            console.log(mobileNo + email + loginName)
        },
        clearUser () {
            const t = this
            t.userName = ''
            t.userId = ''
        },
        pickData () {
            this.$refs.searchPubUser.getData()
            this.openPickUser = true
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.openPickUser = false
            t.$refs.update.formValidate.pmtypeName = ''
            t.$refs.update.formValidate.pmtypeCode = ''
            t.$refs.update.formValidate.pmtypeIsupdate = '1'
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
//
@import "../../../sass/table.scss";
  .searchInput{
    margin-right: 5px;
  }
  .ivu-btn{
    margin-right: 5px;
  }
/deep/ .ivu-table-cell {
    padding: 0 10px;
}
</style>
