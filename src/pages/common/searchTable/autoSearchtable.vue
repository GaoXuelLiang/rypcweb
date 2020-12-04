<template>
    <div class="background ">
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
                       @on-row-dblclick="dbCkick"
                       @on-selection-change="selectedtable"></Table>
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
import Bus from '../bus'

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
            param: "",
            valueText: "",
            searchText: "",
            searchCloumns: [],
            searchInp: [],
            thisSffFilter: this.sffFilter,
            thisSffCascadeget: this.sffCascadeget,
            thisForm: this.form,
            showModal: false,
            dataParame: {},
            dataSearch: {},
            mt: this.$global.mt + '',
            saveType: 'id',
        }
    },
    props: {
        modiaContent: String,
        sffFilter: String, // 过滤条件 id=$tableType
        sffCascadeget: String, // 级联条件 empnhPostlevel=$postDfpslevel;
        form: Object, // 表单数据
        autoTableType: String, // 单选还是多选
        dataKey: String
    },
    mounted () {
        this.getColumn();
    },
    computed: {
    },
    methods: {
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            } else {
                let a = data.split(';')
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== '') { // 去除空格的影响, 对过滤的影响
                        // 判断过滤条件是否包含'//'为自身最高级卡自身条件
                        if (a[i].indexOf('//') !== -1) {
                            let b = a[i].split('//')
                            let obj = {}
                            for (let j = 0; j < b.length; j++) {
                                if (b[j].substring(0, 1) !== '$') {
                                    obj['key'] = b[j]
                                } else {
                                    obj['value'] = b[j].substring(1)
                                }
                            }
                            arr.push(obj)
                        } else {
                            let b = a[i].split('=')
                            let obj = {}
                            for (let j = 0; j < b.length; j++) {
                                if (b[j].substring(0, 1) !== '$') {
                                    obj['key'] = b[j]
                                } else {
                                    obj['value'] = b[j].substring(1)
                                }
                            }
                            arr.push(obj)
                        }
                    }
                }
            }
            return arr
        },
        getColumn () {
            const t = this
            t.isSpin = true
            let data = {
                _mt: this.$global.mt + 'PlatAutoLayoutGetFlowList.getEditPopup',
                APlogType: 'getColumns',
                APid: t.dataKey
            }
            let obj = this.$store.state.flowClmkMap.setPopField
            if ((JSON.stringify(obj) !== "{}")) {
                data = Object.assign({}, data, obj)
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let aa = []
                    let data = res.data.content[0];
                    t.searchCloumns = data.columns;
                    if (this.autoTableType !== 'unit') { // 代表多选框
                        this.searchCloumns.unshift({
                            type: 'selection',
                            width: 60,
                            align: 'center', 
                        })
                    }  
                    aa = res.data.content[0].columns
                    for (let i in aa) {
                        aa[i]['render'] = (h, params) => {
                            let tt = params.row[aa[i].key];
                            if (true) {
                                 
                                 return h('Tooltip', {
                                        props: {
                                            trigger: 'hover',
                                            content:tt,
                                            placement: 'top',
                                        },
                                    }, [
                                        h('div', {
                                            style: {
                                                // width: '100%',
                                                height: '40px',
                                                lineHeight: '40px',
                                                textAlign: 'center',
                                                display: 'flex',
                                                alignItems: 'center',
                                            },
                                        }, [
                                            h('span', {
                                                style: {
                                                    display: 'inline-block',
                                                    fontSize: '12px',
                                                    verticalAlign: 'middle',
                                                },
                                            },tt),
                                        ], ''),
                                    ])
                            }
                        }
                    }
                     t.searchCloumns = aa;
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
            let data = deepCopy(t.param);
            if (JSON.stringify(this.dataSearch) !== "{}") {
                for (let v in this.dataSearch) {
                    data[v] = this.dataSearch[v]
                }
            }
            let rule = t.formData(t.thisSffFilter)
            if (rule) {
                for (let i = 0; i < rule.length; i++) {
                    // 判断过滤的value是否和保存vuex的弹窗字段匹配上，匹配上说明不是最高级，从vuex取值
                    if (this.$store.state.flowClmkMap.popForm[rule[i].value]) {
                        data[rule[i].key] = this.$store.state.flowClmkMap.popForm[rule[i].value]
                    } else {
                        data[rule[i].key] = rule[i].value
                    }

                    // if(this.$store.state.flowClmkMap.setLocalField) {

                    // }
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
            this.$emit('closeUp');
            if (this.autoTableType !== 'unit') { // 代表多选框
                this.searchCloumns.splice(0, 1)
            }
        },
        dbCkick (row) {
            const t = this;
            if (t.autoTableType !== 'unit') { // 代表多选框
                 if (t.saveType == 'id') {
                    t.$emit('changeinput', row[t.searchCloumns[1].key], row.id, 'dbClick')
                } else {
                    t.$emit('changeinput', row[t.searchCloumns[1].key], row[t.searchCloumns[1].key],'dbClick')
                }
            }else{
                if (t.saveType == 'id') {
                    t.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
                } else {
                    t.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[0].key])
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
        selectedtable (selection) {
            this.selectionArr = selection
        },
        handleSubmit () {
            const t = this
            let id = []
            let value = []
            this.selectionArr.forEach((item, index) => {
                id.push(item.id)
                value.push(item[t.searchCloumns[1].key])
            })
            this.$emit('changeinput', id.join(), value.join(),'submit')
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
/deep/ .ivu-tooltip-inner{
    max-width: none;
}
</style>
