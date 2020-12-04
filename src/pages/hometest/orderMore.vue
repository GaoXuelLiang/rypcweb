<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{$t('lang_homePage.order.mine')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <row class="table-form"
                 ref="table-form">
                <Table size="small"
                       border
                       ref="selection"
                       :columns="columns"
                       :data="data"
                       @on-select="selectedtable"
                       @on-select-cancel="selectedtable"
                       @on-select-all="selectedtable"
                       @on-select-all-cancel="selectedtable"
                       @on-sort-change="sortable">
                </Table>
            </row>
            <Row style="display: flex;margin-top: 10px;">
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          :current="page"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]">
                    </Page>
                </Row>
                <Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="refresh"></Button>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from "../../axios/axios"
import { isSuccess, deepCopy } from "../../lib/util"
export default {
    data () {
        return {
            tableselected: [],
            columns: [
                {
                    title: this.$t('lang_homePage.order.no'),
                    key: 'cmwdCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_homePage.order.type'),
                    key: 'cmwdTypeDis',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_homePage.order.peo'),
                    key: 'cmwdAuthorDis',
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    marginLeft: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.clickHandleing()
                                    },
                                },
                            }, this.$t('button.view')),
                        ])
                    },
                },
            ],
            data: [],
            page: 1,
            order: "desc",
            sort: "id",
            rows: 10,
            total: 0,
            params: '',
            type: '',
        };
    },
    props: {
    },
    mounted () {
    },
    methods: {
        getData (type) {
            const t = this
            t.type = type
            const data = {
                _mt: this.$global.mt + 'CmutWorkorder.getPage',
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                handleStatus: t.type
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
            })
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
            this.params = selection
        },
        search () {
            this.page = 1
            this.getData()
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
        refresh () {
            this.getData()
        },
        handleReset () {
            this.$emit("close")
            this.data = []
        },
        //点击到工单处理中的详情
        clickHandleing () {
            const t = this
            //根据code获取id 360200
            const data = {
                _mt: this.$global.mt + 'SysFunctions.getFunByCode',
                APfunCode: '360200',
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.id = res.data.content[0].id
                    const tag = {
                        title: '工单服务处理',
                        path: '/handleWorkOrder',
                        name: 'handleWorkOrder',
                        query: { id: t.id, code: '360200' },
                    }
                    this.$router.push({
                        path: 'handleWorkOrder', query: {
                            id: t.id,
                            code: '360200',
                        }
                    })
                    this.$store.commit('increateTag', tag)
                    t.$store.commit('workOrder/setHandleItem', 'handleing')
                    t.openUp(t.params)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //打开沟通详情
        openUp (row) {
            const t = this
            t.getFirstAttachData(row)
            t.$store.commit('workOrder/setHandleClick', row)
            t.$store.commit('workOrder/setHandleDetail', false)
            t.$store.commit('workOrder/setIsYesHandle', true)
            t.$store.commit('workOrder/setIsCommit', false)
        },
        //获取第一条沟通记录的附件信息
        getFirstAttachData (pRow) {
            const t = this
            if (pRow.cmwdAttach) {
                let attachData = pRow.cmwdAttach.split('|')
                let resAttch = []
                let fileType = ''
                for (let x = 0; x < attachData.length; x++) {
                    const t = this
                    let data = {
                        _mt: this.$global.mt + 'UuserMgmt.getfiletoken',
                        APisprivate: true,
                        APfilekey: attachData[x].split(':')[1],
                        APexpiresecs: 180,
                    }
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            resAttch.push({
                                kname: attachData[x].split(':')[0],
                                vname: attachData[x].split(':')[1],
                                kType: attachData[x].split(':')[0].split('.')[1],
                                upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(attachData[x].split(':')[1]),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
                pRow.cmwdAttach = resAttch
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.cover {
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
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
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
        .content {
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
