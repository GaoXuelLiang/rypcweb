<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>双选平台</span>
            </p>
            <RadioGroup v-model="dbValue"
                        slot="extra"
                        @on-change="getSelData">
                <Radio :label="item.code"
                       v-for="(item,index) in dbType"
                       :key="index">{{item.value}}</Radio>
            </RadioGroup>
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
        <Modal v-model="mask"
               :width="100"
               :height="0"
               :closable="false"
               :draggable="true">
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
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, getCookie, deepCopy } from '@/lib/util'
import Bus from '@/lib/bus'

import huntingJob from "@/components/huntingJob/huntingJob";
export default {
    data () {
        return {
            isSpin: false,
            mask: false,
            loading: false,
            // 双选
            params1: {
                _mt: this.$global.mt + "OrgPostrelease.getPage",
                APsort: "id",
                APorder: "desc",
                AProws: 10,
                APpage: 1,
                APffk: "glc1860",
                APfunId: 1860,
                APsign: "",
            },
            // 投递
            params2: {
                // _mt: this.$global.mt + "EmpAcceptrec.getPage",
                _mt: this.$global.mt + "OrgPostrelease.getPage",
                APsort: "id",
                APorder: "desc",
                AProws: 10,
                APpage: 1,
                APffk: "glc1860",
                APfunId: 1860,
                APsign: "",
                APacrstatus: "01all"
            },
            // 投递状态
            mine: "Zz",
            openhuntingJob: false,
            noData: '<div id="noDataSta"></div>',
            dbValue: "01db",
            dbType: [
                {
                    code: "01db",
                    value: "双选竞聘岗位"
                },
                {
                    code: "02mi",
                    value: "我的投递"
                }
            ],
            columns: [],
            columns1: [
                {
                    title: '序号',
                    key: 'index',
                    width: 80,
                    align: 'center',
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
                    title: '双选活动',
                    key: 'poreAcmidDis',
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'poreUnitidDis',
                    align: 'center',
                },
                {
                    title: '部门',
                    key: 'poreDeptidDis',
                    align: 'center',
                },
                {
                    title: '招聘人数',
                    key: 'poreRecnum',
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'luyongSign',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.luyongSign === "已投递") {
                            return h("span", {
                                'style': {
                                    'color': '#19be6b'
                                }
                            }, params.row.luyongSign)

                        } else {
                            // return h('span',{
                            //    'style':{
                            //         'color':'#ed4014'
                            //     } 
                            // },params.row.luyongSign)
                        }
                    }
                },
            ],
            columns2: [
                {
                    title: '序号',
                    key: 'index',
                    width: 80,
                    align: 'center',
                },
                {
                    title: '招聘岗位',
                    // key: 'acrPostidDis',
                    key: "porePostidDis",
                    align: 'center',
                },
                {
                    title: '双选活动',
                    // key: 'acrReledeadlineDis',
                    key: 'poreAcmidDis',
                    align: 'center',
                },
                {
                    title: '公司',
                    // key: 'acrUnitidDis',
                    key: 'poreUnitidDis',
                    align: 'center',
                },
                {
                    title: '部门',
                    // key: 'acrDeptidDis',
                    key: 'poreDeptidDis',
                    align: 'center',
                },
                {
                    title: '投递时间',
                    // key: 'acrTdtime',
                    key: 'poreAcrtdtimedateDis',
                    align: 'center',
                },
                {
                    title: '录用结果',
                    // key: 'acrStatusDis',
                    key: 'poreAcrstatusDis',
                    align: 'center',
                    render: (h, params) => {
                        if (params.row.poreAcrstatusDis === "未录用") {
                            return h("span", {
                                'style': {
                                    'color': '#ed4014'
                                }
                            }, params.row.poreAcrstatusDis)

                        } else {
                            return h('span', {
                                'style': {
                                    'color': '#19be6b'
                                }
                            }, params.row.poreAcrstatusDis)
                        }
                    }
                },
            ],
            data: [],
        }
    },
    computed: {
        //角色
        userId () {
            return this.$store.state.user.empId;
        },
    },
    components: {
        huntingJob,
    },
    mounted () {
        this.initTableData(this.dbValue);
    },
    methods: {
        getSelData (val) {
            let valr = val
            this.initTableData(valr);
        },
        initTableData (val) {
            if (val === "01db") {
                this.columns = this.columns1;
                this.getData(val)
            } else {
                this.columns = this.columns2;
                this.getData(val)
            }
        },
        getData (val) {
            const t = this;
            t.loading = true;
            // let data = deepCopy(t.params1);
            let data = {};
            if (val === "01db") {
                // 双选
                // data.APsign = "SXType"
                data = deepCopy(t.params1);
                data.APsign = "sx"
                data.status = "02statusType"
            } else if (val === "02mi") {
                // 投递
                data = deepCopy(t.params2);
                data.APsign = "mi";
                data.APacrEmpid = t.userId;
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].rows) {
                        t.loading = false;
                        // t.data = res.data.content[0].rows;
                        let datas = res.data.content[0].rows;
                        datas.forEach((item, index) => {
                            if (item) {
                                // console.log(item,"item");
                                item.index = index + 1;
                            }
                        })
                        t.data = datas;
                    }
                }
            }).catch(() => {
                t.loading = false;
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
            t.mask = true;
            t.openhuntingJob = true;
            t.$refs.huntingJob.showMine(t.mine, val.luyongSign);
            t.$refs.huntingJob.getFormData(val.id);
        },
        closehuntingJob (tdStatus) {
            const t = this;
            t.mask = false;
            t.openhuntingJob = false;
            if (tdStatus) {
                t.getData("01db");
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
        }

        // table {
        //     width: 100%;
        //     height: 347px;
        // }
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
/deep/ .ivu-modal-wrap {
    z-index: 1001 !important;
}
/deep/ .ivu-modal-footer {
    border-top: none !important;
}
</style>
