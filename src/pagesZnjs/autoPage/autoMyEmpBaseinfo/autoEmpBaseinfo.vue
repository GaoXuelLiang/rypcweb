<template>
    <div class="table_box">
        <commonMainTable @specialButton="specialButton"
                         :isSpecialAdd="isSpecial"
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
        <transition name="fade">
            <empUpd v-if="openAddEmp"
                    @closeEmp="closeEmp"
                    :id="updateId"
                    @getData="addNewArray"
                    @update="updateArray"
                    :logType="logType"
                    ref="addemployee"></empUpd>
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
        <transition name="fade">
             <resume v-show="myResumeShow"
                :empId="empId"
                @closeEmpInfo="closeResume"
                            ref="myResume"></resume>
        </transition>
    </div>
</template>
<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pages/autoPage/autoMyEmpBaseinfo/autoEmpBaseinfoBase'
import empUpd from './addNewEmployee'
import resume from '@/pages/empzz/myResume'
import pushUpdate from '@/components/pushUpdate/pushUpdate'
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
            myResumeShow:false,
            isSpecial: true,
            openAddEmp: false,
            openPushUpdate: false,
            pushTitle: "推送员工数据更新",
            mtype: 'emplyee',
            dom: '',
            empId:'',
        }
    },
    components: {
        commonMainTable,
        autoChildBase,
        empUpd,
        pushUpdate,
        resume
    },
    mounted () {
    },
    destroyed () {
    },
    mouted () {
    },
    methods: {
        specialButton (code, t) {
            if (code == "button_add") {
                this.openAddEmp = true
            } else if (code === "button_pushUpdate") {
                this.openPushUpdate = true;
                this.dom = t
            }else if(code === 'btn_y_resume'){
                this.empId = t.updateId.toString()
                this.myResumeShow = true
                this.$nextTick(()=>{

                    this.$refs.myResume.getData()
                })
            } else if (code === "button_updateDD") {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '请确定是否同步钉钉数据',
                    onOk: () => {
                        let data = {
                            _mt: this.$global.mt + 'MasterDataPush.synchDingding',
                            APmtype: this.mtype,
                        }
                        getDataLevelUserLoginData(data).then((res) => {
                            if (isSuccess(res, t)) {
                                t.getData();
                                t.getTree();
                                t.$Message.success({
                                    title: "成功",
                                    content: '同步钉钉数据成功'
                                });
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => {
                    },
                })
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
        closeResume(){
            const t = this
            t.myResumeShow = false
            t.empId = ""
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
        closeEmp () {
            const t = this
            t.openAddEmp = false
        },
        //关闭推送主数据
        closePushUpdate () {
            this.openPushUpdate = false;
        },
    }
}
</script>
<style lang="scss" scoped>
</style>