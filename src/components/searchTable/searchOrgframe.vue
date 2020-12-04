<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>选择组织
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input class="searchInput"
                       placeholder="请输入公司名称"
                       v-model="unitName" />
                <span class="btnStyle">
                    <Button type="info"
                            style="width:56px"
                            :loading="spinShow"
                            @click="getData(params, 1)">
                        <span v-if="!spinShow">{{$t('button.ser')}}</span>
                    </Button>
                </span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Spin size="large" fix
                                   v-if="spinShow"></Spin>
                <Table :no-data-text="noDataImg"
                       height="320"
                       size="small"
                       stripe
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
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
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}} {{$t('reminder.of')}} <span>{{total}}</span></span>
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
            total: NaN,
            unitName: '',
            noDataImg: '<div id="noData"></div>',
            spinShow: false
        }
    },
    props: {
        searchText: String,
        searchCloumns: Array,
        params: Object,
    },
    mounted () {

    },
    methods: {
        getData (params, page) {
            const t = this
            if (page) {
                params.APpage = page
            }
            const data = deepCopy(params)
            data.unitFnameCn = t.unitName
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.spinShow = true
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
                t.spinShow = false
            })
        },
        close () {
            this.unitName = ''
            this.params.page = 1
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this
            this.close()
            this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
            this.$emit('closeUp')
        },
        sizeChange (size) {
            const t = this
            t.params.AProws = size
            t.getData(t.params)
        },
        pageChange (page) {
            const t = this
            t.params.APpage = page
            t.getData(t.params)
        },
        clear () {
            this.unitName = ''
            this.params.APpage = 1
            this.$emit('clear')
            this.$emit('closeUp')
        },
        sortable (column) {
            this.params.APsort = column.key
            this.params.APorder = column.order
            if (column.order !== 'normal') {
                this.getData(this.params)
            } else {
                this.params.APorder = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable";
</style>
