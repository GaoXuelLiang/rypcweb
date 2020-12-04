<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>我的电子档案</span>
            </p>
            <div class="block">
                <Spin fix
                      v-if="isSpin"></Spin>
                <Table size="small"
                        ref="selection"
                        :columns="columns"
                        stripe
                        :no-data-text="noData"
                        height="350"
                        :data="data"></Table>
            </div>
        </Card>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, getCookie, } from '@/lib/util'
import Bus from '@/lib/bus'
export default {
    data () {
        return {
            isSpin: false,
            noData: '<div id="noDataNote"></div>',
            columns: [
                // {
                //     title: '档案类型',
                //     key: 'e1',
                //     align: 'left',
                // },
                {
                    title: '档案名称',
                    key: 'emprecName',
                    align: 'left',
                },
                {
                    title: '下载',
                    key: 'e3',
                    align: 'left',
                    render: (h, params) => {
                         return h('Icon', {
                                props: {
                                    type: 'md-cloud-download',
                                    size:'22',
                                },
                                style:{
                                     cursor: 'pointer'
                                },
                                on: {
                                    click: () => { this.downloadFile(params.row) },
                                },
                            });
                        }
                },
                {
                    title: '更新时间',
                    key: 'createTime',
                    align: 'left',
                }
            ],
            data: [],
        }
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
        empId () {
            return this.$store.state.user.empId;
        },
        funId () {
            return this.$store.state.user.funId
        },
    },
    components: {
    },
    mounted () {
        // let newArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        // this.data = newArr.map((item, index) => {
        //     return {
        //         e1: '可更新项目类型模板',
        //         e2: '经常性项目',
        //         e3: '中南公司',
        //         e4: '2107-12-3 15:40',
        //     };
        // });
        this.getData()
    },
    methods: {
        getData () {
            const t = this;

            getDataLevelUserLoginData({
                _mt:this.$global.mt+'EmpRecord.getPage',
                APsort:'id',
                APorder:'desc',
                AProws:'10',
                APpage:'1',
                APlogType:'getPage',
                APfunId: t.funId,
                APffk :`glc${t.funId}`,
                empId:t.empId
                //empId:'1445'
            }).then((res) => {
                if (isSuccess(res, t)) {
                    // t.data = res.data.content[0].rows
                    let datas = res.data.content[0].rows
                    datas.forEach(item => {
                        if (item.createTime) {
                            item.createTime = new Date(item.createTime).format("yyyy-MM-dd")
                        }
                    });
                    t.data = datas;
                    console.log(res)
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
         downloadFile (row) {
            const t = this
            let filekey = row.emprecYj.split(':')[1]
            let filekeys = row.emprecYj.split(':')[0]
            const type = row.emprecType
            console.log(row,'2222222')
            if(type=='03head'){
                if (this.isIE()) {
                    window.location.href = pubsource.pub_pubf_downlink + filekey
                } else {
                    let doclink = pubsource.pub_pubf_downlink + filekey
                    let link = document.createElement('a')
                    link.target = "_blank"
                    link.href = doclink
                    link.download = 'downloadfiletemp'
                    link.click()
                }
            }else{
                let data = {
                    _mt: this.$global.mt + 'UserInfo.getfiletoken',
                    APisprivate: true,
                    APlogType: '导出',
                    APfilekey: filekey,
                    APexpiresecs: 180,
                }
                getDataLevelUserLoginData(data).then((res) => {
                    
                    if (isSuccess(res, t)) {
                        
                        localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                        if (this.isIE()) {
                            window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filekeys)
                        } else {
                            let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filekeys)
                            let link = document.createElement('a')
                            link.href = doclink
                            link.download = 'downloadfiletemp'
                            link.click()
                        }
                        this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                        localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
    },
    watch: {
    },
}

</script>

<style lang="scss" scoped>
.card_box {
    width: 100%;
    height: 100%;
    .card {
        width: 100%;
        height: 100%;
    }
    /deep/ .ivu-table-header thead tr th {
        background-color: #fff !important;
    }
    /deep/ .ivu-card-body {
        height: calc(100% - 37px);
    }
    .block {
        font-size: 12px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        /deep/ .ivu-table-tip {
            border-bottom: none;
        }
    }
    .title {
        display: flex;
        justify-content: start;
        align-items: center;
    }
}

/deep/ .ivu-card-extra {
    top: 8px;
}
</style>
