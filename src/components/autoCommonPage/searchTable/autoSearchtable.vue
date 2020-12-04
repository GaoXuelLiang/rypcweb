<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{title}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <span v-for="(item, index) in searchInp"
                      :key="index + 'c'">
                    <Input v-model="item.name"
                           :placeholder="'请输入'+ item.clmDname"
                           type="text"
                           class="searchInput" />
                </span>
                <Button class="btns"
                        type="info"
                        :loading="isSpin"
                        :style="{width:'56px'}"
                        @click="search()">
                    <span v-if="!isSpin">
                        查询
                    </span>
                </Button>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Table height="320"
                       size="small"
                       :loading="isSpin"
                       :no-data-text="noDataImg"
                       stripe
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
            </row>
            <Row type="flex">
                <Page :total="total"
                      size="small"
                      show-elevator
                      show-sizer
                      :current="param.APpage"
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((param.APpage - 1) * param.AProws + 1)}} - {{param.APpage*param.AProws > total ? total : param.APpage*param.AProws}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="search"></Button>
            </Row>
            <Row v-if="autoTableType !== 'unit'"
                 style="text-align: right">
                <Button type="primary"
                        @click="handleSubmit"
                        v-if="selectionArr.length > 0">保存</Button>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            data: [],
            isSpin: false,
            total: NaN,
            pmtypeCode: '',
            postbsSeqDis: '',
            selectionArr: [],
            noDataImg: '<div id="noData"></div>',
            title: "",
            param: {},
            valueText: "",
            searchText: "",
            searchCloumns: [],
            searchInp: [],
            thisSffFilter: this.sffFilter,
            thisSffCascadeget: this.sffCascadeget,
            showModal: false,
            dataParame: {},
            dataSearch: {},
            mt: this.$global.mt,
            saveType: 'id',
            saveParams: ''
        }
    },
    props: {
        sffFilter: String, // 过滤条件
        sffCascadeget: String, // 级联条件
        autoTableType: String, // 单选还是多选
        dataKey: Number,
        searchValue: Array
    },
    computed: {
    },
    mounted () {
        this.getColumn();
    },
    methods: {
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            }
            let a = data.split(';')
            for (let v of a) {
                if (v !== '') { // 去除空格的影响, 对过滤的影响
                    // 判断过滤条件是否包含'//'为自身最高级卡自身条件
                    if (v.indexOf('//') !== -1) {
                        let b = v.split('//')
                        let obj = {}
                        for (let k of b) {
                            if (k.substring(0, 1) !== '$') {
                                obj['key'] = k
                            } else {
                                obj['value'] = k.substring(1)
                            }
                        }
                        obj.self = '1',
                            arr.push(obj)
                    } else if (v.indexOf('**') !== -1) {
                        this.saveParams = v.split('**')[1]
                    } else {
                        let b = v.split('=')
                        let obj = {}
                        for (let k of b) {
                            if (k.substring(0, 1) !== '$') {
                                obj['key'] = k
                            } else {
                                obj['value'] = k.substring(1)
                            }
                        }
                        arr.push(obj)
                    }
                }
            }
            return arr
        },
        getColumn () {
            const t = this
            t.isSpin = true
            console.log(t.dataKey, 'tdatakeyyyy')
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getEditPopup',
                APlogType: 'getColumns',
                APid: t.dataKey
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    t.searchCloumns = data.columns;
                    // console.log(this.autoTableType,"this.autoTableType !== 'unit'")
                    if (this.autoTableType && this.autoTableType !== 'unit') { // 代表多选框
                        this.searchCloumns.unshift({
                            type: 'selection',
                            width: 60,
                            align: 'center',
                        })
                    }
                    t.saveType = ""
                    let newArr = t.searchCloumns.filter((item) => {
                        if (item.key == 'id') t.saveType = "id";
                        return item.key !== 'id';
                    });
                    t.searchCloumns = newArr;
                    t.title = data.flowName;
                    t.tbName = data.tbName;
                    if (res.data.content[0].hasOwnProperty('qryFields')) {
                        t.searchInp = res.data.content[0].qryFields.columns
                    }
                    t.param = {
                        _mt: t.mt + t.tbName + ".getPage",
                        APsort: "id",
                        APorder: "asc",
                        AProws: 10,
                        APpage: 1,
                        APffk: `gep${t.dataKey}`
                    }
                    t.getData()
                }

            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getData () {
            const t = this
            t.isSpin = true
            const data = deepCopy(t.param);
            if (JSON.stringify(this.dataSearch) !== "{}") {
                for (let v in this.dataSearch) {
                    data[v] = this.dataSearch[v]
                }
            }
            let rule = t.formData(t.thisSffFilter);
            let serchData = {}
            t.searchValue.map((item) => {
                serchData[item.clmName] = item.id ? item.id : ''
            })
            if (rule && rule.length > 0) {
                for (let v of rule) {
                    if (serchData[v.value]) {
                        data[v.key] = serchData[v.value]
                    } else if (v.self === '1') {
                        data[v.key] = v.value
                    }
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
                t.isSpin = false
            })
        },
        search () {
            this.dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.id) {
                    this.dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        this.dataSearch[e.clmName] = e.name
                    } else {
                        delete this.dataSearch[e.clmName]
                    }
                }
            })
            this.param.APpage = 1;
            this.getData()
        },
        close () {
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this;
            if (t.autoTableType && t.autoTableType !== 'unit') { // 代表多选框

                if (t.saveType == 'id') {
                    t.$emit('changeinput', row[t.searchCloumns[1].key], row.id, 'dbClick')
                } else {
                    if (t.saveParams !== '') {
                        t.$emit('changeinput', row[t.searchCloumns[1].key], row[t.saveParams], 'dbClick')
                    } else {
                        t.$emit('changeinput', row[t.searchCloumns[1].key], row[t.searchCloumns[1].key], 'dbClick')
                    }
                }

            } else {

                if (t.saveType == 'id') {
                    t.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
                } else {
                    if (t.saveParams !== '') {
                        t.$emit('changeinput', row[t.searchCloumns[0].key], row[t.saveParams])
                    } else {
                        t.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[0].key])
                    }
                }
            }
            let aa = t.formData(t.thisSffCascadeget)
            let jldata = {}
            for (let i = 0; i < aa.length; i++) {
                jldata[aa[i].key] = row[aa[i].value]
            }

            t.$emit('setJLData', jldata)
            t.$emit('closeUp')
        },
        handleSubmit () {
            const t = this
            let id = []
            let value = []
            this.selectionArr.forEach((item, index) => {
                id.push(item.id)
                value.push(item[t.searchCloumns[1].key])
            })
            this.$emit('changeinput', id.join(), value.join(), 'submit')
            this.$emit('closeUp')
            this.selectionArr = []
            this.searchCloumns.splice(0, 1)
        },
        sizeChange (size) {
            const t = this
            t.param.AProws = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.param.APpage = page
            t.getData()
        },
        sortable (column) {
            this.param.APsort = column.key
            this.param.APorder = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.param.APorder = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/searchTable.scss";
</style>
