<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    选择薪资项目
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input class="inp"
                       placeholder="请输入薪资项目名称"
                       v-model="name" />
                <span class="btn">
                    <Button type="info"
                            :loading="isSpin"
                            @click="getData(params, '1')">
                        <span v-if="!isSpin">{{$t('button.ser')}}</span>
                    </Button>
                </span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Spin size="large" fix
                                   v-if="spinShow"></Spin>
                <Table height="320"
                       size="small"
                       stripe
                       :no-data-text="noDataImg"
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
            </row>
            <Row style="display: flex">
                <Page :total="total"
                      :current="current"
                      size="small"
                      show-elevator
                      show-sizer
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
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
            noDataImg: '<div id="noData"></div>',
            total: 0,
            current: 0,
            name: '',
            isSpin: false,
            spinShow: false,
        }
    },
    props: {
        searchCloumns: Array,
        params: Object,
    },
    mounted () {

    },
    methods: {
        getData (params, page) {
            const t = this
            t.isSpin = true
            const data = deepCopy(params)
            if (page) {
                data.APpage = page
            }
            data.salNamecn = t.name
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.spinShow = true
            getDataLevelUserLoginData(data).then((res) => {
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
            }).finally(() => {
                t.spinShow = false
            })
        },
        close () {
            this.name = ''
            this.params.APpage = 1
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this
            this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
            t.close()
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
            this.$emit('clear')
            this.$emit('closeUp')
        },
        sortable (column) {
            this.params.APsort = column.key
            this.params.APorder = column.order
            if (column.APorder !== 'normal') {
                this.getData(this.params)
            } else {
                this.params.APorder = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable.scss";
.inp {
    width: 200px;
}
.btn {
    margin-left: 10px;
}
</style>
