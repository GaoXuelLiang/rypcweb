<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_platBusirel.platBusirel.title')}}
                </p>
                <Row class="btnHeight">
                    <Input :placeholder="$t('lang_platBusirel.platBusirel.p_platSerConperson')"
                           style="width: 200px"
                           v-model="platSerConperson" />
                    <Input :placeholder="$t('lang_platBusirel.platBusirel.platSerTeam')"
                           style="width: 200px;margin-left:5px"
                           v-model="platSerTeam" />
                    <Input :placeholder="$t('lang_platBusirel.platBusirel.platSerRange')"
                           style="width: 200px;margin-left:5px"
                           v-model="platSerRange" />
                    <span style="margin-left:5px"><Button type="info"
                                :loading="isSpin"
                                @click="getData(1)"
                                style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <Button type="warning"
                            style="margin-left:5px"
                            @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="error"
                            style="margin-left:5px"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table :no-data-text="noDataImg"
                           @on-select="selectedtable"
                           :height='tableheight'
                           @on-select-cancel="selectedtable"
                           :loading='loading'
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
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
    </div>
</template>
<script>
import update from './platBusireAddOrUpd'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginData } from '../../../axios/axios'

export default {
    name: 'platBusirelManage',
    data () {
        return {
            noDataImg: '<div id="noData"></div>',
            isSpin: false,
            tableheight: document.body.offsetHeight - 240,
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
                    title: this.$t('lang_platBusirel.platBusirel.platSerConperson'),
                    key: 'platSerConperson',
                    // sortable: 'custom',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerTeam'),
                    key: 'platSerTeam',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerLevelName'),
                    key: 'platSerLevelName',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerRange'),
                    key: 'platSerRange',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerTime'),
                    key: 'platSerTime',
                    // sortable: 'custom',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerTel'),
                    key: 'platSerTel',
                    // sortable: 'custom',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerEmail'),
                    key: 'platSerEmail',
                    // sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
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
            platSerConperson: '',
            platSerTeam: '',
            platSerRange: '',
            loading: false
        }
    },
    computed: {

    },
    components: {
        update,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.platSerConperson = ''
            t.platSerTeam = ''
            t.platSerRange = ''
            t.getData(1)
        }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        getData (page) {
            const t = this
            if (page) {
                t.page = page
            }
            t.loading = true
            t.isSpin = true
            const data = {
                _mt: this.$global.mt + 'PlatBusirel.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                APlogType: this.$t('button.ser'),
                platSerConperson: t.platSerConperson,
                platSerTeam: t.platSerTeam,
                platSerRange: t.platSerRange,
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
                t.loading = false
                t.isSpin = false
            })
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
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + 'PlatBusirel.delByIds',
                            APfunId: '1',
                            APlogType: this.$t('button.del'),
                            APids: t.tableselected.toString(),
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
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.formValidate.platSerConperson = ''
            t.$refs.update.formValidate.platSerTel = ''
            t.$refs.update.formValidate.platSerEmail = ''
            t.$refs.update.formValidate.platSerTeam = ''
            t.$refs.update.formValidate.platSerLevel = ''
            t.$refs.update.formValidate.platSerRange = ''
            t.$refs.update.formValidate.platSerTime = ''
            t.$refs.update.formValidate.platSerComment = ''
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
</style>
