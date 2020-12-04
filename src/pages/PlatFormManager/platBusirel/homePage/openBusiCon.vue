<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    &nbsp;业务联系人定义
                </p>
                <Row :style="{height:divheight + 'px'}"
                     :gutter="20">
                    <Table :columns="columns"
                           :data="messageData"
                           :height="tableHeight"
                           style="margin-bottom: 10px;"></Table>
                    <Row style="display: flex">
                        <Page :total="total"
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
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <busidetail v-show="isBusi"
                        ref="busidetail"
                        @closeUp="closeUp"></busidetail>
        </transition>
    </div>
</template>
<script>
import busidetail from './busiConDetail'
import { getDataLevelUserLoginData } from '../../../../axios/axios'
import { isSuccess } from '../../../../lib/util'

export default {
    data () {
        return {
            divheight: document.body.offsetHeight - 200,
            tableHeight: document.body.offsetHeight - 230,
            messageData: [],
            isBusi: false,
            columns: [
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerConperson'),
                    key: 'platSerConperson',
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
                    title: this.$t('lang_platBusirel.platBusirel.platSerTime'),
                    key: 'platSerTime',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerTel'),
                    key: 'platSerTel',
                },
                {
                    title: this.$t('lang_platBusirel.platBusirel.platSerEmail'),
                    key: 'platSerEmail',
                },
            ],
            total: NaN, // 总页数
            sort: 'id',
            order: 'desc',
            rows: '10',
            page: '1',
        }
    },
    computed: {

    },
    components: {
        busidetail,
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            const tData = {}
            const data = {
                _mt: this.$global.mt + 'PlatBusirel.getPage',
                APfunId: 1,
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                APdata: JSON.stringify(tData),
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].rows) {
                        t.messageData = res.data.content[0].rows
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
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
        //    rowClick(row) {
        //    	const t = this
        //    	t.isBusi = true
        //    	t.$refs.busidetail.getData(row)
        //    },
        closeUp () {
            const t = this
            t.isBusi = false
        },
    },
}
</script>
<style lang="scss" scoped>
</style>
