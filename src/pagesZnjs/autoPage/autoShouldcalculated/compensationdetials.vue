<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-09-27 20:05:18
 * @LastEditTime: 2020-11-10 15:30:35
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
            <autoChildTablepay
                v-if='openPays'
                :logTypes='logTypes'
                @close='closepay'
                ref="autoChildTablepay"></autoChildTablepay>
        </transition>
    </div>
</template>
<script>
// import autoChildTable from '@/components/autoCommonPage/autoSpecileTable/autoChildTablespecile'
import autoChildTable from '@/components/autoCommonPage/autoSpecileTable/autoChildTablespeclle'
import autoChildTablepay from '@/components/autoCommonPage/autoSpecileTable/autoChildTablepay'
import { isSuccess, deepCopy } from '@/lib/util'
import { getDataLevelUserLoginData } from '@/axios/axios'
export default {
    data (){
        return {
            childFun:[],
            openPays:false,
            logTypes:''
        }
    },
    components: {
        autoChildTable,
        autoChildTablepay
    },
    props: {
        mainTitle: String,
        index: Number,
        id: Number,
        logType: String,
        accountId :String,
        relationship:String,
        paycphCompany:String
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        }
    },
    mounted () {
         this.getChildId()
    },
    methods:{
        close(){
            const t = this
            t.$emit('closeCompensation')
            t.$store.commit('setChildFunId', '')
            t.childFun = ''
        },
        closepay(){
            const t = this
            t.openPays = false
            t.$store.commit('setChildFunId', '')
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
                    t.$store.commit('setChildFunId',  t.childFun[1].id)
                    // t.$refs.autoChildTable.getColumns()
                     t.$refs.autoChildTable.paysRollProject(t.accountId,t.relationship,t.paycphCompany)
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
            if (code === "button_y_particulars") {
               this.openPays =  true
               this.logTypes = '薪资明细'
                this.getChildIdsChild()
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