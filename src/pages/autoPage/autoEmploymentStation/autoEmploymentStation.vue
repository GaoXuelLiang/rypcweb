<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-11-18 17:00:17
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" @specialButton="btnEvents" @title="title" @openUpdate="openUpd" :isSpecial='true' ></commonMainTable>
        <transition name="fade">
            <autoChildBase v-if="openUpdate"
                           :logType="logType"
                           :mainTitle="titleName"
                           @closeUp="closeUpd"
                           :id="updateIdView"
                           @changeLogtype="changeLogtype"
                           @addNewArray="addNewArray"
                           @updateArray="updateArray"
                           ref="update"></autoChildBase>
        </transition>
        <transition name="fade">
            <updateOffer v-if="openUpdatOffer"
                    :id="updateOfferId"
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    :empName='empName'
                    :empCompany='empCompany'
                    ref="updateOffer"></updateOffer>
        </transition>
         <transition name="fade">
            <updateBackMange v-show="openBackMange"
                    :id="updateBackMangeId"
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    ref="updateBackMange"></updateBackMange>
        </transition>
        <transition name="fade">
            <backUpload v-show="openbackUpload"
                    :id="backUploadId"
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    ref="backUpload"></backUpload>
        </transition>
         <transition name="fade">
            <empEntry v-if="openempEntry"
                    :id="entryId"
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    :flowId='flowId'
                    :pkValue='pkValue'
                    :stepId='stepId'
                    :setpName='setpName'
                    :stepState='stepState'
                    :tbName='tbName'
                    :formColumns='formColumns'
                    ref="empEntry"></empEntry>
        </transition>
         <transition name="fade">
            <newOfferUpd v-if="opennewOfferUpd"
                    :id="entryId"
                    :selectionAlldata ='selectionAlldata'
                    :tableselected = 'tableselected'
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    :flowId='flowId'
                    :pkValue='pkValue'
                    :stepId='stepId'
                    :setpName='setpName'
                    :stepState='stepState'
                    :tbName='tbName'
                    :paramsNice= 'paramsNice'
                    :formColumns='formColumns'
                    ref="newOfferUpd"></newOfferUpd>
        </transition>
        <transition name="fade">
            <updatePlace v-if="openUpdatePlace" @closeUp="closeUp" ref="updatePlace"></updatePlace>
        </transition>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import {
    isSuccess,
    findComponentUpward,
    deepCopy,
    extendObject
} from '@/lib/util'
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pages/autoPage/autoEmpBaseinfo/autoEmpBaseinfoBase'
import updateOffer from './updateOffer'
import updateBackMange from './updateBackMange'
import backUpload from './backUpload'
import empEntry from './empEntry'
import newOfferUpd from './newOfferUpd'
import updatePlace from './updatePlace'
import importExcel from './importModel/importParam'

export default {
    data () {
        return {
            paramsNice:{},
            opennewOfferUpd:false,
            openempEntry:false,
            empName:'',
            empCompany:'',
            titleName: '',
            openUpdate: '',
            updateIdView: NaN,
            openbackUpload:false,
            openBackMange:false,
            openUpdatOffer: false,
            openUpdatePlace: false,
            updateOfferId: NaN,
            updateBackMangeId:NaN,
            logType: '',
            index: 0,
            isSpecialUpd:true,
            isSpecialAdd:true,
            isSpecialView:true,
            selectionAlldata:[],
            tableselected:[],
            // 背景资料上传
            backUploadId: '',
            entryId:'',
            flowId:'1064',
            pkValue:'0',
            stepId:'0',
            setpName:'',
            stepState:'',
            tbName:'EmpFlowEntr',
            formColumns:[],
            // 导入
            openImport: false,
            imp_mt: '',
        }
    },
    components: {
        commonMainTable,
        updateOffer,
        updateBackMange,
        backUpload,
        autoChildBase,
        empEntry,
        newOfferUpd,
        updatePlace,
        importExcel
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents(code,t,params){
            if(code ==='button_y_offer'){
                t.logType = "Offer发起"
                // if (t.tableselected.length === 0) {
                //     t.$Modal.warning({
                //             title: t.$t("reminder.remind"),
                //             content: t.$t("reminder.leastone")
                //         });
                //         return   
                // }else if(t.tableselected.length>1){
                //         t.$Modal.warning({
                //             title: t.$t("reminder.remind"),
                //             content: 'Offer发放只可单条发放'
                //         });
                //         return   
                // } 
                this.selectionAlldata = t.selectionAlldata
                this.tableselected = t.tableselected
                this.openUp(t.updateId, t.logType, t.index,params) 
                
            }else if(code ==='button_backInformation'){
                t.logType = "背调信息"
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                            title: t.$t("reminder.remind"),
                            content: t.$t("reminder.leastone")
                        });
                        return   
                }else if(t.tableselected.length>1){
                        t.$Modal.warning({
                            title: t.$t("reminder.remind"),
                            content: '背调信息只可单条上传'
                        });
                        return   
                } 
                this.selectionAlldata = t.selectionAlldata
                this.tableselected = t.tableselected
                this.openUpbackMange(t.updateId, t.logType, t.index) 
            }else if(code ==='button_backMangeUpload'){
                 t.logType = "背调资料上传"
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                            title: t.$t("reminder.remind"),
                            content: t.$t("reminder.leastone")
                        });
                        return   
                }else if(t.tableselected.length>1){
                        t.$Modal.warning({
                            title: t.$t("reminder.remind"),
                            content: '背调资料只可单条上传'
                        });
                        return   
                } 
                this.selectionAlldata = t.selectionAlldata
                this.tableselected = t.tableselected
                this.openUpbackUpload(t.updateId, t.logType, t.index)
            }else if(code ==='button_y_entry'){
                t.logType = "入职发起"
                // if (t.tableselected.length === 0) {
                //     t.$Modal.warning({
                //             title: t.$t("reminder.remind"),
                //             content: t.$t("reminder.leastone")
                //         });
                //         return   
                // }else if(t.tableselected.length>1){
                //         t.$Modal.warning({
                //             title: t.$t("reminder.remind"),
                //             content: '请选择单条数据发起入职'
                //         });
                //         return   
                // } 
                this.selectionAlldata = t.selectionAlldata
                this.tableselected = t.tableselected
                this.openEntry(t.updateId, t.logType, t.index,params)
            }else if(code === 'button_y_oneBtn') {
                this.openUpdatePlace = true
                this.$nextTick(() => {
                    this.$refs.updatePlace.getData(params.row.id)
                })
            }else if(code === 'button_backResImport') {
                this.imp_mt = t.$global.mt +  'EmpMaback.importData'
                this.openImport = true
            }
        },
        openEntry(id, logType, index,params){
            const t = this
            t.logType = logType
            // t.setpName = logType
            // const ids = []
            // for(let i = 0; i <  t.selectionAlldata.length; i++){
            //     // 添加到
            //    ids.push(t.selectionAlldata[i].id)
            // }
            const data = {
                _mt: t.$global.mt + "EmpMaemp.sendByIds",
                APlogType: t.$t("button.entry"),
                AProleType: t.$store.state.user.roleType,
                // APids: ids.toString()
                APids: params.row.id
            };
            if(params.row.maemflagDis === 'false') {
                t.$Modal.confirm({
                    title: '提示',
                    content: '当前候选人暂未录入背调结果信息，确认发起入职吗？',
                    onOk: () => {
                        t.byEntry(data)
                    },
                    onCancel: () => {
                    }
                })
            }else {
               t.byEntry(data) 
            }
            // t.isSpinTable = true;
            // t.$refs.empEntry.getById(ids.toString())
        },
        byEntry (data) {
            const t = this;
            t.$refs.commonMainTable.isSpinTable = true
            getDataLevelUserLoginData(data).then(res => {
                try {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].value > 0) {
                            // t.tableselected = [];
                            // t.getData();
                            this.pkValue = res.data.content[0].value.toString()
                            this.stepId = '1699'
                            this.stepState = ''
                            this.setpName = '入职发起'
                            this.flowId ='1064'
                            this.tbName = 'EmpFlowEntr'
                            t.openempEntry = true
                            // t.$Modal.success({
                            //     title: t.$t("reminder.suc"),
                            //     content: t.$t("reminder.sponsorSucess"),
                            // });
                        }else{
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.sponsorError"),
                            });
                        }
                    }
                } catch (res) {
                    t.$Modal.error({
                        title: t.$t("reminder.err"),
                        content: t.$t("reminder.errormessage")
                    });
                }
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t("reminder.err"),
                    content: t.$t("reminder.errormessage")
                });
            }).finally(() => {
               t.$refs.commonMainTable.isSpinTable = false
            });
        },
        // 背景资料上传
        openUpbackUpload(id, logType, index){
            const t = this
            t.openbackUpload = true
            t.logType = logType
            t.backUploadId = parseInt(id, 10)
            const ids = []
            for(let i = 0; i <  t.selectionAlldata.length; i++){
                // 添加到
               ids.push(t.selectionAlldata[i].id)
            }
            t.$refs.backUpload.getByid(ids.toString())
        },
        openUpbackMange(id, logType, index){
            const t = this
            t.openBackMange = true
            t.updateBackMangeId = parseInt(id, 10)
            t.logType = logType
            t.$refs.updateBackMange.getSelect()
            const ids = []
            for(let i = 0; i <  t.selectionAlldata.length; i++){
                // 添加到
               ids.push(t.selectionAlldata[i].id)
            }
            t.$refs.updateBackMange.getByid(ids.toString())
            // t.$refs.updateBackMange.formValidate.unitIdDis = t.selectionAlldata[0].unitIdDis
        },
         openUp (id, logType, index,params) {
            const t = this
            t.entryId = parseInt(params.row.id, 10)
            t.logType = logType
            t.index = index
            const ids = []
            const Name = []
            const Company = []
            for(let i = 0; i <  t.selectionAlldata.length; i++){
                // 添加到
                ids.push(t.selectionAlldata[i].empmId)
                Name.push(t.selectionAlldata[i].empmName)
                Company.push(t.selectionAlldata[i].unitIdDis)
            }
            t.empName = Name.toString()
            t.empCompany = Company.toString()
            this.pkValue = params.row.empmId
            // this.pkValue = ids.toString()
            this.stepState = 'p_flowst_3'
            this.stepId = '1691'
            this.setpName = '录用信息'
            this.flowId ='1061'
            this.tbName = 'EmpFlowHire'
            this.paramsNice = params
            // t.openUpdatOffer = true
            t.opennewOfferUpd = true 
        },
        closeUp () {
            const t = this
            t.$refs.commonMainTable.tableselected = []
            // 取消选中
            t.$refs.commonMainTable.$refs.selection.selectAll(false)
            t.openUpdatOffer = false;
            t.openBackMange = false;
            t.openbackUpload = false;
            t.openempEntry = false
            t.opennewOfferUpd = false
            t.openUpdatePlace = false
            this.stepName = ''
            this.stepOrder = ''
        },
        title (val) {
            console.log(val, 'vallll')
            this.titleName = val
        },
        openUpd (val) {
            this.updateIdView = val.updateId;
            this.openUpdate = val.openUpdate
            this.logType = val.logType
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        addNewArray (res) {
            const t = this
            t.$refs.commonMainTable.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.$refs.commonMainTable.data.splice(t.index, 1, res)
        },
        // 改变logType--主子表新增成功后变为修改
        changeLogtype(logType){
            const t = this;
            t.logType = logType;
        },
        /**
         * 导入
         */
        closeImport () {
            const t = this
            t.openImport = false
            t.$refs.commonMainTable.getData()
        },
         //form滚动事件
        formScroll () {
            let selectDom = document.getElementsByClassName("ivu-select-visible");
            let datePickerDom = document.getElementsByClassName(
                "ivu-date-picker-focused"
            );
            if (selectDom.length > 0 || datePickerDom.length > 0) {
                let modal = document.getElementsByClassName("cover")[0];
                modal.click();
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.table /deep/ .ivu-select-dropdown{
        // width: 110px;
}
.table  /deep/ .ivu-dropdown-item {
    width: 100%;
}
.table /deep/ .ivu-select-dropdown {
  width: auto;
}
</style>