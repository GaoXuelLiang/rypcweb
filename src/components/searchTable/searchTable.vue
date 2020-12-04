<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                          {{searchTitle ? searchTitle:$t('lang_payroll.platAplInfo.table')}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input class="searchInput"
                       :placeholder="searchText"
                       v-model="pmtypeCode" />
                <span style="margin: 0;"><Button style="width:56px" type="info" :loading="isSpin"
                            @click="getData('', 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Table stripe
                       :loading="loading"
                       height="320"
                       size="small"
                       ref="selection"
                       :columns="searchCloumns"
                       :no-data-text="noDataImg"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
            </row>
            <Row style="display: flex">
                <Page :total="total"
                      size="small"
                      :current="params.APpage"
                      show-elevator
                      show-sizer
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}} {{$t('reminder.of')}} <span>{{total}}</span></span>
            </Row>
            <!--<Page :total="total" size="small" show-elevator show-sizer :current="params.page" placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>-->
        </div>
    </div>
</template>
<script>
// import { getDataLevelUserLoginNew } from '../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            loading: false,
            isSpin: false,
            data: [],
            total: NaN,
            pmtypeCode: '',
            noDataImg: '<div id="noData"></div>',
        }
    },
    props: {
        searchText: String,
        searchCloumns: Array,
        params: Object,
        searchTitle: String,
    },
    mounted () {

    },
    methods: {
        getData (params, page) {
            const t = this;
            t.loading = true;
            t.isSpin = true;
            if (page) {
                t.params.APpage = page
            }
            const data = deepCopy(t.params)
            // data[t.searchCloumns[0].key] = t.pmtypeCode
            getDataLevelUserLoginData(data).then((res) => {
                console.log(res)
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.loading = false;
                t.isSpin = false;
            })
        },
        close () {
            this.pmtypeCode = ''
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this
            this.close()
            this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
            this.$emit('closeUp')
        },
        clear () {
            this.pmtypeCode = ''
            this.params.APpage = 1
            this.$emit('clear')
            this.$emit('closeUp')
        },
        sizeChange (size) {
            const t = this
            t.params.AProws = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.params.APpage = page
            t.getData()
        },
        sortable (column) {
            this.params.APsort = column.key
            this.params.APorder = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.params.APorder = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable.scss";
</style>
