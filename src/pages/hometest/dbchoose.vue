<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>双选平台</span>
            </p>
            <div class="block">
                <Spin fix
                      v-if="isSpin"></Spin>
                <Table size="small"
                       ref="selection"
                       :columns="columns"
                       stripe
                       :loading="loading"
                       :no-data-text="noData"
                       :data="data"></Table>
            </div>
        </Card>
        <Modal v-model="modal1"
               :width="100"
               :height="100"
               :closable="false"
               :draggable="true">
            <!-- <transition name="fade">
                <empMailingList v-show="openEmpMailList"
                                :type="lyType"
                                @closeEmpMailList="closeEmpMailList"
                                ref="empMailingList">
                </empMailingList>
            </transition> -->
            <transition name="fade">
                <huntingJob v-show="openhuntingJob"
                            @closehuntingJob="closehuntingJob"
                            ref="huntingJob">
                </huntingJob>
            </transition>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, getCookie } from "@/lib/util";
//
// import empMailingList from "@/components/empMailingList/empMailingList";
import huntingJob from "@/components/huntingJob/huntingJob";
import Bus from "@/lib/bus";
export default {
    data () {
        return {
            isSpin: false,
            loading: false,
            noData: '<div id="noDataSta"></div>',
            columns: [
                {
                    title: "序号",
                    key: "index",
                    width: 80,
                    align: "center"
                },
                {
                    title: "招聘岗位",
                    key: "porePostidDis",
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            this.openZpPost(params.row);
                                        }
                                    }
                                },
                                params.row.porePostidDis
                            )
                        ]);
                    }
                },
                {
                    title: "双选活动",
                    key: "poreAcmidDis",
                    align: "center"
                },
                {
                    title: "公司",
                    key: "poreUnitidDis",
                    align: "center"
                },
                {
                    title: "部门",
                    key: "poreDeptidDis",
                    align: "center"
                },
                {
                    title: "招聘人数",
                    key: "poreRecnum",
                    align: "center"
                },
                {
                    title: "投递人数",
                    key: "poreSendnum",
                    align: "center",
                    // render: (h, params) => {
                    //     return h("div", [
                    //         h(
                    //             "a",
                    //             {
                    //                 props: {
                    //                     type: "primary",
                    //                     size: "small"
                    //                 },
                    //                 style: {},
                    //                 on: {
                    //                     click: () => {
                    //                         this.openTdSum(params.row);
                    //                     }
                    //                 }
                    //             },
                    //             params.row.poreSendnum
                    //         )
                    //     ]);
                    // }
                }
            ],
            data: [],
            // 区分主表
            lyType: 0,
            modal1: false,
            mine: 'Hr',
            params: {
                _mt: this.$global.mt + "OrgPostrelease.getPage",
                APsort: "id",
                APorder: "asc",
                AProws: 10,
                APpage: 1,
                APffk: `glc1860`,
            },
            openEmpMailList: false,
            openhuntingJob: false,
        };
    },
    computed: {

    },
    components: {
        // empMailingList,
        huntingJob
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this;
            t.loading = true;
            let data = {
                _mt: this.$global.mt + "OrgPostrelease.getPage",
                APsort: "id",
                APorder: "asc",
                AProws: 10,
                APpage: 1,
                // APffk: `glc${t.funId}`,
                APffk: "glc1860",
                status: "02statusType"
            };
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    // console.log(res.data.content[0].rows,"双选平台数据")
                    // t.data = res.data.content[0].rows;
                    let datas = res.data.content[0].rows;
                    datas.forEach ((item,index) => {
                        if (item) {
                            // console.log(item,"item");
                            item.index = index + 1;
                        }
                    })
                    t.data = datas;
                    t.loading = false
                }
            }).catch(() => {
                t.loading = false
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false
            })
        },
        // 招聘岗位
        openZpPost (val) {
            const t = this;
            t.modal1 = true;
            t.params = val;
            t.openhuntingJob = true;
            t.$refs.huntingJob.showMine(t.mine, "hrNull");
            // t.$refs.huntingJob.getFormData(val.id,val.poreUnitid);
            t.$refs.huntingJob.getFormData(val.id);
        },
        closehuntingJob () {
            const t = this;
            t.modal1 = false;
            t.openhuntingJob = false;
        },
        // // 投递人数
        // openTdSum (val) {
        //     const t = this;
        //     t.modal1 = true;
        //     t.params = val;
        //     t.openEmpMailList = true;
        //     t.$refs.empMailingList.getData(val.id, val.porePostid);
        // },
        // closeEmpMailList () {
        //     const t = this;
        //     t.modal1 = false;
        //     t.openEmpMailList = false;
        // }
    },
    watch: {}
};
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
    /deep/ .ivu-table-wrapper {
        height: 100%;
    }
    .block {
        font-size: 12px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        /deep/ .ivu-table-tip {
            border-bottom: none;
            min-height: 40vh;
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
/deep/ .ivu-modal-body {
    padding: 0;
}
/deep/ .ivu-modal {
    width: 80% !important;
}
/deep/ .ivu-modal-content {
    border: none;
    box-shadow: none !important;
    background: transparent !important;
}
/deep/ .ivu-modal-footer {
    border-top: none !important;
}
</style>
