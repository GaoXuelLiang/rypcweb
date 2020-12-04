<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{title}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <i-col span="14">
                    <span @dblclick="clearData()"
                          v-if="title === '选择基准岗位'">
                        <Input v-model="postbsSeqDis"
                               style="width: 200px"
                               placeholder="请选择岗位条线"
                               @on-click="selectOpen()"></Input>
                    </span>
                    <Input :placeholder="searchText"
                           style="width: 200px"
                           v-model="pmtypeCode" />
                    <span style="margin: 0;"><Button type="primary" style="width:56px"
                                @click="getData(param, 1)">{{$t('button.ser')}}</Button></span>
                </i-col>
                <i-col span="10"
                       style="text-align: center">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;请选择基准岗位
                </i-col>
            </Row>
            <Row>
                <i-col span="14">
                    <row class="table-form"
                         ref="table-form">
                        <Table height="320"
                               size="small"
                               border
                               ref="selection"
                               :columns="searchCloumns"
                               @on-sort-change="sortable"
                               :data="data"
                               @on-row-dblclick="dbCkick"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtableCancel"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtableCancel"></Table>
                    </row>
                </i-col>
                <i-col span="3"
                       style="height: 320px;line-height: 320px;text-align: center">
                    <Button icon="ios-arrow-round-forward"
                            type="dashed"
                            size="small"
                            @click="moveData">添加</Button>
                </i-col>
                <i-col span="7"
                       style="height: 320px;overflow-y: scroll">
                    <Tag v-for="(item,index) in orgPostTag"
                         :key="index"
                         :name="index"
                         closable
                         @on-close="handleClose2"
                         size="large">{{item.orgPostName}}</Tag>
                    <!--        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>-->
                </i-col>
            </Row>
            <Row style="display: flex">
                <Page :total="total"
                      size="small"
                      show-elevator
                      show-sizer
                      :current="param.page"
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((param.page - 1) * param.rows + 1)}} - {{param.page*param.rows > total ? total : param.page*param.rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="getData(1)"></Button>
            </Row>
            <Row v-if="autoTableType !== 'unit'"
                 style="text-align: right">
                <Button type="primary"
                        @click="handleSubmit"
                        v-if="orgPostTag.length > 0">保存</Button>
            </Row>
        </div>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import searchTable from '../../../components/searchTableComponents/searchTable'
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy, uniqObj } from '../../../lib/util'
import Bus from '../bus'

export default {
    data () {
        return {
            orgPostTag: [],
            data: [],
            total: NaN,
            pmtypeCode: '',
            postbsSeqDis: '',
            selectionArr: [],
            title: searchTable[this.modiaContent].title,
            param: searchTable[this.modiaContent].param,
            valueText: searchTable[this.modiaContent].valueText,
            searchText: searchTable[this.modiaContent].searchText,
            searchCloumns: searchTable[this.modiaContent].searchCloumns,
            thisSffFilter: this.sffFilter,
            thisSffCascadeget: this.sffCascadeget,
            thisForm: this.form,

            showModal: false,
            dataParame: {},
        }
    },
    props: {
        modiaContent: String,
        sffFilter: String, // 过滤条件
        sffCascadeget: String, // 级联条件
        form: Object, // 表单数据
        autoTableType: String, // 单选还是多选
        tagForm: Object,
    },
    mounted () {
        if (this.autoTableType !== 'unit') { // 代表多选框
            this.searchCloumns.unshift({
                type: 'selection',
                width: 60,
                align: 'center',
            })
        }
        this.getData(searchTable[this.modiaContent].param, 1)
        this.changTagData(this.tagForm.thisValue, this.tagForm.thisId)
    },
    methods: {
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0)
            }
        },
        handleClose2 (event, tagIndex) {
            const t = this
            t.orgPostTag.forEach((item, index) => {
                if (index === tagIndex) {
                    for (let i in t.$refs.selection.objData) {
                        if (item.id === t.$refs.selection.objData[i].id) {
                            t.$refs.selection.objData[i]._isChecked = false
                        }
                    }
                }
            })
            this.orgPostTag.splice(tagIndex, 1)
            this.selectionArr.splice(tagIndex, 1)
        },
        // data's form is like this: 'key1=$value1;$value2=key2', the data has '$' is value
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            } else {
                let a = data.split(';')
                for (let i = 0; i < a.length; i++) {
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
            return arr
        },
        getData (param, page) {
            const t = this
            if (page) {
                t.param.page = page
            }
            const data = deepCopy(param)
            let rule = t.formData(t.thisSffFilter)
            if (rule) {
                for (let i = 0; i < rule.length; i++) {
                    if (this.$store.state.flowClmkMap.popForm[rule[i].value]) {
                        data[rule[i].key] = this.$store.state.flowClmkMap.popForm[rule[i].value]
                    } else {
                        for (let j = 0; j < Bus.arr.length; j++) {
                            if (Bus.arr[j][rule[i].value]) {
                                data[rule[i].key] = Bus.arr[j][rule[i].value]
                                break
                            }
                        }
                    }
                }
            }
            if (t.pmtypeCode !== '') {
                data[t.valueText] = t.pmtypeCode
            }
            if (t.title === '选择基准岗位') {
                data.postbsSeq = t.postbsSeq
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.$emit('closeUp')
            if (this.autoTableType !== 'unit') { // 代表多选框
                this.searchCloumns.splice(0, 1)
            }
        },
        dbCkick (row) {
            const t = this
            if (t.autoTableType !== 'unit') { // 代表多选框
                return
            }
            let aa = t.formData(t.thisSffCascadeget)
            let jldata = {}
            for (let i = 0; i < aa.length; i++) {
                jldata[aa[i].key] = row[aa[i].value]
            }
            t.$emit('setJLData', jldata)
            if (searchTable[this.modiaContent].code) {
                this.$emit('changeinput', row[t.valueText], row[searchTable[this.modiaContent].code])
            } else {
                this.$emit('changeinput', row[t.valueText], row.id)
            }
            this.$emit('closeUp')
        },
        selectedtable (selection) {
            const t = this
            selection.forEach((item) => {
                let obj = {}
                obj.id = item.id
                obj.orgPostName = item[t.valueText]
                this.selectionArr.push(obj)
            })
            t.selectionArr = uniqObj(t.selectionArr)
        },
        selectedtableCancel (selection, row) {
            const t = this
            if (row === undefined) {
                t.selectionArr = []
                return
            }
            t.selectionArr = t.selectionArr.filter((item, index) => {
                return item.id !== row.id
            })
        },
        moveData () {
            const t = this
            t.orgPostTag = []
            this.selectionArr.forEach((item, index) => {
                let obj = {}
                obj.id = item.id
                obj.orgPostName = item.orgPostName
                t.orgPostTag.push(obj)
            })
            t.orgPostTag = uniqObj(t.orgPostTag)
        },
        handleSubmit () {
            const t = this
            let id = []
            let value = []
            this.orgPostTag.forEach((item, index) => {
                id.push(item.id)
                value.push(item.orgPostName)
            })
            this.$emit('changeinput', id.join(), value.join())
            this.$emit('closeUp')
            this.selectionArr = []
            this.searchCloumns.splice(0, 1)
        },
        changTagData (value, id) {
            const t = this
            if (value && id) {
                id.split(',').forEach((item, index) => {
                    let obj = {}
                    obj.id = item
                    obj.orgPostName = value.split(',')[index]
                    t.orgPostTag.push(obj)
                    t.selectionArr.push(obj)
                })
            }
            t.orgPostTag = uniqObj(t.orgPostTag)
        },
        sizeChange (size) {
            const t = this
            t.param.rows = size
            t.getData(t.param)
        },
        pageChange (page) {
            const t = this
            t.param.page = page
            t.getData(t.param)
        },
        sortable (column) {
            this.param.sort = column.key
            this.param.order = column.order
            if (column.order !== 'normal') {
                this.getData(this.param)
            } else {
                this.param.order = 'desc'
            }
        },
        /*
        * 弹出选择
        * */
        selectOpen () {
            const t = this
            t.showModal = true
            t.modiaContent = 'org-Postseq-std'
        },
        clearData () {
            const t = this
            t.postbsSeqDis = ''
            t.postbsSeq = ''
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            t.postbsSeqDis = row.seqName
            t.postbsSeq = row.id
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin-bottom: 10px;
    /*overflow-y: scroll;*/
}
.ivu-table-overflowY {
    overflow-y: visible;
}
.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10003;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
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
</style>
