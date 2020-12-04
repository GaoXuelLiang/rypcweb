<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-09-27 20:02:33
 * @LastEditTime: 2020-11-23 22:22:37
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         @openUpdate='openUpdate'
                         @specialButton="btnEvents"></commonMainTable>
        <!-- 员工明细 -->
        <transition name="fade">
            <employeEdetails  v-if="openEmploye"
                         :logType="logType"
                         @closeEmploye="closeEmploye"
                         :accountId = 'accountId'
                         ref="employeEdetails"></employeEdetails>
        </transition>
        <transition name="fade">
            <importExcelDetail v-show="opendetailImport"
                         :impid="updateId"
                         :imp_mt="imp_mtDetail"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcelDetail>
        </transition>
        <!-- 导出 -->
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoSpecileTable/autoMainTableSpecile'
import employeEdetails from './employeEdetails'
import importExcelDetail from '@/components/importModel/importParam'
import { isSuccess, deepCopy } from '@/lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLoginData } from '@/axios/axios'
//导出
import expwindow from './fileOperations/expSms'
import expdow from './fileOperations/expdow'
export default {
    data () {
        return {
            isSpecial: true,
            openEmploye: false,
            logType: '',
            selectionAlldata:[],
            accountId:'',
            opendetailImport:false,
            imp_mtDetail:'',
            updateId:0,
            openExp: false,
            openExpDow: false,
            filekey: '',
            filename: '',
            tableselected: [],
            expDataTital:[],
            childFun: ''
		}
    },
    components: {
        commonMainTable,
        employeEdetails,
        importExcelDetail,
        expwindow, 
        expdow
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        // 
        openUpdate(){
            const t = this
            t.openEmploye =  true 
        },
        closeEmploye(){
            const t = this 
            t.openEmploye = false
        },
        //特殊按钮事件
        btnEvents (code, t ,params) {
            if (code === "button_y_particulars") {
               this.openEmploye =  true
               this.logType = '员工明细'
               this.selectionAlldata = t.selectionAlldata
                // const ids = []
                // for(let i = 0; i <  t.selectionAlldata.length; i++){
                //     // 添加到
                //     ids.push(t.selectionAlldata[i].busiRollid)
                // }
                this.accountId= params.row.busiRollid
                 t.$store.commit('autoCommonPage/setMainId', params.row.id);
            }else if(code ==='bn_exppay'){
                // 导出
                this.tableselected = t.tableselected;
                let ids = []
                if(this.tableselected.length>1){
                     t.$Modal.warning({
                        title: '提示',
                        content: '请选择一条薪资数据导出'
                    })
                }else if(this.tableselected.length==0){
                    let id = '11'
                    this.getChildId(id, t)
                    // this.$nextTick(()=>{this.paysRollProject(id,t)})
                }else{
                    for(let i of t.selectionAlldata){
                        ids.push(i.busiRollid)
                    }
                    let id = ids.toString()
                    this.getChildId(id, t)
                    // this.$nextTick(()=>{this.paysRollProject(id,t)})
                }
            }else if(code ==='bn_imppay'){
                // 导入
                const t = this
                t.getChildId()
                t.imp_mtDetail = this.$global.mt+'PaysSalaryDetail.importData'
                t.opendetailImport = true
                
            }
        },
         paysRollProject(id,dom){
            const t = this
            t.expDataTital = []
            let data = {};
            data._mt = this.$global.mt + "PaysRollProject.getListProPage";
            data.APsort = 'id';
            data.APorder = "desc";
            data.AProws = 10;
            data.APpage = 1;
            data.APffk = `glc${this.$store.state.user.childFunId}`
            data.projIsstart = 1
            data.projIspayrollpro = 1
            data.projRollid = id
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let aa = []
                    aa = res.data.content[0].columns
                    // 导出字段
                    for (let i in aa) {
                        let codeObj = {}
                        codeObj.code = aa[i].key
                        codeObj.name = aa[i].title
                        if (codeObj.code != undefined && codeObj.name !== '操作') {
                            t.expDataTital.push(codeObj)
                        }
                        aa[i]['render'] = (h, params) => {
                            let tt = params.row[aa[i].key];
                            if (tt && tt !== '') {
                                if (aa[i].key == 'fileKey') {
                                    tt = tt.split(":")[0]
                                }
                            }
                        }
                    }
                    this.exportEvent(dom)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
         // 获取子表id
        getChildId (id, dom) {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysFunctions.getChiSysFunctionsList',
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.childFun = res.data.content[0].value
                    t.$store.commit('setChildFunId',  t.childFun[0].id)  
                    t.$store.commit('setChildFunCode',t.childFun[0].funCode)
                    if(id){
                        this.paysRollProject(id,dom)
                    }
                    
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        closeImport(){
            const t = this
            t.opendetailImport = false
            t.imp_mtDetail = ''
            t.$store.commit('setChildFunId', '')  
            t.$store.commit('setChildFunCode','') 
            t.$refs.commonMainTable.$refs.selection.selectAll(false)
        },
        //导出事件
        exportEvent (t) {
            let dataSearch = {}
            let treeType = ''
            t.searchInp.forEach((e) => {
                if (e.id) {
                    dataSearch[e.clmName] = e.id
                } else {
                    if (e.name) {
                        dataSearch[e.clmName] = e.name
                    } else {
                        delete dataSearch[e.clmName]
                    }
                }
            })
            for(let key in dataSearch) {
                if(key !== 'busiBperDis' && key !== 'busiEperDis') {
                    delete dataSearch[key]
                }
            }
            if(t.tableselected.length || (dataSearch.hasOwnProperty('busiBperDis') && dataSearch.hasOwnProperty('busiEperDis'))) {
                this.expData(dataSearch)
            }else {
                t.$Modal.warning({
                    title: '提示',
                    content: '请选择数据或者选择日期区间'
                })
            }
        },
        //导出
        expData (value) {
            const t = this;
            let data = {}
            // Mt接口
            let expMt = this.$global.mt + 'PaysSalaryDetail.export'
            if (value) {
                data = deepCopy(value)
            }
            t.$refs.expwindow.getData(expMt, data,t.expDataTital)
            t.openExp = true
        },
        //设置文件
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        //关闭导出
        closeExp () {
            const t = this
            t.openExp = false
            t.$store.commit('setChildFunId', '')  
            t.$store.commit('setChildFunCode','') 
            t.$refs.commonMainTable.$refs.selection.selectAll(false)
        },
        //关闭导出
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
            t.$store.commit('setChildFunId', '')  
            t.$store.commit('setChildFunCode','')
            t.$refs.commonMainTable.$refs.selection.selectAll(false)
        },
    }
}
</script>

<style lang="scss" scoped>
</style>