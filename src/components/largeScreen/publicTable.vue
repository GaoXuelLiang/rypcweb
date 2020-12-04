<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;选择公司
                </div>
                <img class="btn_img"
                     @click="close"
                     src="../../../static/largeScreen/popup_close.png"
                     alt="">
            </div>
            <Row class="table-form">
                <Input placeholder="请输入公司编码"
                       style="width: 150px"
                       v-model="pmtypeCode" />
                <span style="margin: 0;"><Button type="primary"
                            icon="ios-search"
                            @click="getData()">{{$t('button.ser')}}</Button></span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <!-- <Spin fix v-if="isSpin" size="large"></Spin> -->
                <Table height="320"
                       size="small"
                       ref="selection"
                       style="background:transparent"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       :data="data"
                       @on-row-dblclick="dbCkick"></Table>
            </row>
            <Row style="display: flex">
                <Page :total="total"
                      size="small"
                      show-elevator
                      show-sizer
                      :current="params.page"
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            data: [],
            total: NaN,
            pmtypeCode: '',
            isSpin: false
        }
    },
    props: {
        searchCloumns: Array,
        params: Object,
        searchText3: String,
        title: String,
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            t.isSpin = true
            const data = deepCopy(t.params)
            if (t.pmtypeCode !== '') {
                data.pmtypeCode = t.pmtypeCode
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.isSpin = false
                    t.data = JSON.parse(res.data.content[0].value)
                    //            t.total = res.data.content[0].records
                }
            }).catch((err) => {
                t.isSpin = false
                console.log(err)
            })
        },
        close () {
            this.pmtypeCode = ''
            this.params.page = 1
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this
            this.close()
            this.$emit('changeinput', row.compSnameCnDis, row.id)
            this.$emit('closeUp')
        },
        clear () {
            this.pmtypeCode = ''
            this.close()
            this.$emit('clear')
            this.$emit('closeUp')
        },
        sizeChange (size) {
            const t = this
            t.params.rows = size
            t.getData(t.params)
        },
        pageChange (page) {
            const t = this
            t.params.page = page
            t.getData(t.params)
        },
        sortable (column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (column.order !== 'normal') {
                this.getData(this.params)
            } else {
                this.params.order = 'desc'
            }
        },
    },
}
</script>
<style lang="scss" scoped>
/deep/ .ivu-input {
    border: 1px solid #2d8cf0;
}
/deep/ .ivu-table-body {
    border-bottom: none !important;
}
/deep/ .ivu-table th {
    border-bottom: 1px solid rgba(0, 144, 255, 1);
    background-color: #11162f;
    color: #fff;
}
/deep/ .ivu-table td {
    background-color: #11162f;
    color: #fff;
}
/deep/ .ivu-page-prev {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
/deep/ .ivu-page-next {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
/deep/ .ivu-select {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
/deep/ .ivu-select-selection {
    background-color: #11162f;
    color: #fff;
    border: 1px solid rgba(0, 144, 255, 1);
}
/deep/ .ivu-select-item {
    background-color: #11162f;
    color: #fff;
}
/deep/ .ivu-select-dropdown {
    background-color: #11162f;
}
/deep/ .ivu-page-item {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
}
/deep/ .ivu-page-options-elevator {
    color: #fff;
}
/deep/ .ivu-page-options-elevator input {
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
    border: 1px solid #2d8cf0;
}
/deep/ .ivu-btn:hover {
    color: none !important;
    background-color: none !important;
    border-color: none !important;
}
.btn_img {
    width: 36px;
    height: 36px;
    margin: 10px 20px 0 0;
    cursor: pointer;
}
.table-form {
    margin-bottom: 10px;
    color: transparent;
}
.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 800px;
        // background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        background: url("../../../static/largeScreen/popup_bg.png") no-repeat;
        background-size: 100% 100%;
        background-position: 100% 100%;
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 13px;
            left: 0;
            color: #fff;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
</style>
