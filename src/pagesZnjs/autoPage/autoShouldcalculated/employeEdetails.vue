<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-09-27 20:05:18
 * @LastEditTime: 2020-11-02 15:25:33
 * @LastEditors: Sok
-->
<template>
    <div class='nice'>
        <!-- <autoChildTable 
            :logType='logType'
            @close='close'
            @specialButton="btnEvents"
            ref="autoChildTable"></autoChildTable> -->
         <autoChildTable 
            :logType='logType'
            @close='close'
            @specialButton="btnEvents"
            ref="autoChildTable"></autoChildTable>
        <transition name="fade">
            <autoChildTabbleZnsalary
                v-show='openZnsalary'
                :logTypes='logTypes'
                @close='closeZnsalary'
                ref="autoChildTabbleZnsalary"></autoChildTabbleZnsalary>
        </transition>
    </div>
</template>
<script>
import autoChildTable from '@/components/autoCommonPage/autoSpecileTable/autoChildTablespecile'
// import autoChildTable from '@/components/autoCommonPage/autoSpecileTable/autoChildTablespeclle'
import autoChildTabbleZnsalary from '@/components/autoCommonPage/autoSpecileTable/autoChildTabbleZnsalary'
import { isSuccess, deepCopy } from '@/lib/util'
import { getDataLevelUserLoginData } from '@/axios/axios'
export default {
    data (){
        return {
            childFun:[],
            openZnsalary:false,
            logTypes:''
        }
    },
    components: {
        autoChildTable,
        autoChildTabbleZnsalary
    },
    props: {
        mainTitle: String,
        index: Number,
        id: Number,
        logType: String,
        accountId :String
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        },
        mainId () {
            return this.$store.state.autoCommonPage.mainId;
        },
    },
    mounted () {
         this.getChildId()
    },
    methods:{
        close(){
            const t = this
            t.$emit('closeEmploye')
            t.$store.commit('setChildFunId', '')
            t.childFun = ''
        },
        closeZnsalary(){
            const t = this
            t.openZnsalary = false
            t.$store.commit('setChildsChildFunId', '')
            t.childFun = ''
        },
        // 获取子表id
        getChildId () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysFunctions.getChiSysFunctionsList',
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.childFun = res.data.content[0].value
                    t.$store.commit('setChildFunId',  t.childFun[0].id)
                    t.$refs.autoChildTable.getColumns()
                    //  t.$refs.autoChildTable.paysRollProject(t.accountId)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
       //特殊按钮事件
        btnEvents (code, t ,params) {
            if (code === "button_y_employee") {
               this.openZnsalary =  true
               this.logTypes = '员工薪资明细'
                // this.getChildIdsChild()
                this.$refs.autoChildTabbleZnsalary.paysRollProject(this.accountId,params.row.paycphCompany)
            }
        },
           // 获取子表id
        getChildIdsChild () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysFunctions.getChiSysFunctionsList',
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.childFun = res.data.content[0].value
                    t.$store.commit('setChildsChildFunId',  t.childFun[0].id)
                    t.$refs.autoChildTablepay.getColumns()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    }
}
</script>