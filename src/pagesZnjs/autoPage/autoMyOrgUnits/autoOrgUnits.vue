<template>
    <div class="table_box">
        <commonMainTable @specialButton="btnEvents"
                         :isSpecial="isSpecial"
                         @openUpdate="openUpd"
                         ref="commonMainTable"
                         @title="title"></commonMainTable>
        <transition name="fade">
            <autoChildBase v-if="openUpdate"
                           :logType="logType"
                           :mainTitle="titleName"
                           @closeUp="closeUpd"
                           :id="updateId"
                           @addNewArray="addNewArray"
                           @updateArray="updateArray"
                           ref="update"></autoChildBase>
        </transition>
        <!-- 生效、失效 -->
        <transition name="fade">
            <validModel v-if="openValid"
                        :logType="logType"
                        :dom="dom"
                        :isReason="true"
                        :ruleValidate="ruleValidate"
                        @closeValid="closeValid"
                        ref="validModel"></validModel>
        </transition>
        <!-- 推送主数据 -->
        <transition name="fade">
            <pushUpdate v-if="openPushUpdate"
                        :dom="dom"
                        :mtype="mtype"
                        :title="pushTitle"
                        @closePushUpdate="closePushUpdate"
                        ref="pushUpdate"></pushUpdate>
        </transition>
        <!-- 选择组织 -->
        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="close"
                            @changeinput="changeinput"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>
        <!-- 组织架构图 -->
        <transition name="fade">
            <orgframeChart v-show="openChart"
                           @closeChart="closeChart"
                           ref="orgframeChart"></orgframeChart>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from './autoOrgUnitsBase'
import validModel from '@/components/validModel/validModel'
import pushUpdate from '@/components/pushUpdate/pushUpdate'
import searchOrgframe from '@/components/searchTable/searchOrgframe'
import orgframeChart from './orgframeChart'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
            openValid: false,
            openPushUpdate: false,
            isSpecial: true,
            pushTitle: "推送组织数据更新",
            dom: '',
            mtype: 'orgUnit',
            openPick: false,
            openChart: false,
            searchCloumns: [
                {
                    title: '组织编码',
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '组织名称',
                    key: 'unitFnameCn',
                    sortable: 'custom',
                },
                {
                    title: '组织类型',
                    key: 'unitTypeDis',
                    sortable: 'custom',
                },
            ],
            params: {
                _mt: this.$global.mt + 'OrgUnits.getPage',
                APsort: 'id',
                APorder: 'asc',
                APffk: 'glc' + this.funId,
                AProws: 10,
                APpage: 1,
                APdata: '{}',
                unitPid: "",
            },
        }
    },
    components: {
        commonMainTable,
        autoChildBase,
        validModel,
        pushUpdate,
        searchOrgframe,
        orgframeChart
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        }
    },
    mounted () {

    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        btnEvents (code, t) {
            if (code === "button_valid" || code === "button_invalid") {
                this.dom = t
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: this.$t('reminder.leastone'),
                    })
                    return
                }
                if (code === "button_valid") {
                    this.logType = this.$t('button.eft')
                    if (t.tableselected.length > 1) {
                        t.$Modal.warning({
                            title: this.$t('reminder.remind'),
                            content: this.$t('reminder.onlyone'),
                        })
                        return
                    }
                    this.ruleValidate = {
                        validTime: [
                            {
                                required: true,
                                type: "date",
                                message: "生效日期不能为空",
                                trigger: "change"
                            }
                        ],
                    }
                } else if (code === "button_invalid") {
                    this.logType = this.$t('button.fai')
                    this.ruleValidate = {
                        invalidTime: [
                            {
                                required: true,
                                type: "date",
                                message: "失效日期不能为空",
                                trigger: "change"
                            }
                        ],
                    }
                }

                this.openValid = true;
            } else if (code === "button_pushUpdate") {
                this.openPushUpdate = true;
                this.dom = t
            } else if (code === "button_orgchart") {
                this.$refs.searchOrgframe.getData(this.params)
                this.openPick = true;
            }
        },
        title (val) {
            this.titleName = val
        },
        openUpd (val) {
            this.updateId = val.updateId;
            this.openUpdate = val.openUpdate
            this.logType = val.logType
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openUpdate = false
            // 关闭主子表弹窗把主表id置空
            const mainId = ''
            t.$store.commit('autoCommonPage/setMainId', mainId);
        },
        addNewArray (res) {
            const t = this
            t.$refs.commonMainTable.getUpData(res)
        },
        updateArray (res) {
            const t = this
            t.$refs.commonMainTable.updataTable(res)
        },
        // 改变logType--主子表新增成功后变为修改
        changeLogtype (logType) {
            const t = this;
            t.logType = logType;
        },
        //关闭推送主数据
        closePushUpdate () {
            this.openPushUpdate = false;
        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
            t.openPushUpdate = false;
        },
        //组织选择
        changeinput (name, id) {
            this.openPick = false
            this.$refs.orgframeChart.getData(id)
            this.openChart = true
        },
        //关闭组织框
        close () {
            this.openPick = false
        },
        //关闭组织图
        closeChart () {
            this.openChart = false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>