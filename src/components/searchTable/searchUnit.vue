<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    选择业务单位
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <span>
                    <Input v-model="param.unitFnameCn"
                           :placeholder="'请输入公司名称'"
                           type="text"
                           class="searchInput" />
                </span>
                <Button class="btns"
                        type="info"
                        :loading="isSpin"
                        :style="{width:'56px'}"
                        @click="getData">
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
                        @click="getData"></Button>
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
            noDataImg: '<div id="noData"></div>',
            total: NaN,
            param: {
                _mt: this.$global.mt + 'OrgUnits.getPage',
                APpage: 1,
                AProws: 10,
                APsort: 'id',
                APorder: 'desc',
                APffk: `glc${this.funId}`,
                unitType: '01company',
                unitFnameCn:''
            },
            searchCloumns: [
                {
                    title: '编码',
                    key: 'unitCode'
                },
                {
                    title: '中文全称',
                    key: 'unitFnameCn'
                },
                {
                    title: '类型',
                    key: 'unitTypeDis'
                }
            ],
        }
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        }
    },
    mounted () {
    },
    methods: {
        getData () {
            const t = this
            t.isSpin = true
            const data = deepCopy(t.param);
            for(let dat in data) {
                if(data[dat] === '') {
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
                t.isSpin = false
            })
        },
        clear () {
            this.param.unitFnameCn = ''
            this.param.APpage = 1;
        },
        close () {
            this.$emit('closeUnit')
            // this.clear();
        },
        dbCkick (row) {
            const t = this;
            t.$emit('changeinput', row.unitFnameCn, row.id)
            t.$emit('closeUnit')
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
