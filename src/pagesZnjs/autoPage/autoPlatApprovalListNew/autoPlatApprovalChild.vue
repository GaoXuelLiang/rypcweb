<template>
    <div>
        <autoChildTable 
                        :isSpecial='true' @specialButton="btnEvents"
                        ref="autoChildTable"></autoChildTable>
        <!-- 字段定义 -->
        <fieldDefinition v-show="showField" @hideField="hideField" ref="fieldDefinition"></fieldDefinition>
        <!-- 邮件接收人，抄送人 -->
        <chosedContact v-show="showConMsg" @hideMsg="hideConMsg" ref="chosedContact" :logType="logType"></chosedContact>
        <!-- 邮件变量 -->
        <mailVar v-show="showVarMsg" @hideMsg="hideVarMsg" ref="mailVar"></mailVar>
        <!-- 短信接收人 -->
        <smsToList v-show="showDConMsg"  @click="hideDConMsg" @hideMsg="hideDConMsg" ref="smsToList" :logType="logType"></smsToList>
        <!-- 短信变量 -->
        <smsVar v-show="showDVarMsg"  @click="hideDVarMsg" @hideMsg="hideDVarMsg" ref="smsVar"></smsVar>
        <!-- 微信联系人 -->
        <wxToList v-show="showWConMsg" @click="hideWConMsg" @hideMsg="hideWConMsg" ref="wxToList" :logType="logType"></wxToList>
        <!-- 微信变量 -->
        <wxVar v-show="showWVarMsg" @click="hideWVarMsg" @hideMsg="hideWVarMsg" ref="wxVar"></wxVar>
    </div>
</template>
 
<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
//字段定义
import fieldDefinition from './fieldDefinition'
//抄送人
import chosedContact from './chosedContact'
//变量
import mailVar from './mailVar'
//短信
import smsToList from './smsToList'
import smsVar from './smsVar'
//微信
 import wxToList from './wxToList'
import wxVar from './wxVar'
export default {
    data () {
        return {
            logType:'',
            showField:false,
            showConMsg: false,
            showVarMsg: false,
            showDConMsg:false,
            showDVarMsg:false,
            showWConMsg:false,
            showWVarMsg:false
        }
    },
    components: {
        autoChildTable,
        fieldDefinition,
        chosedContact,
        mailVar,
        smsToList,
        smsVar,
        wxToList,
        wxVar

    },
    mounted () {

    },
    destroyed () {

    },
    activated () {

    },
    methods: {
        specialButton (code, t) {
            console.log(code, "code");
        },
        btnEvents(code,t){
            if(code ==='button_y_field'){
                t.logType = "字段定义"
                this.defineField(t.updateId)
            }else if(code ==='button_y_variable'){
                 t.logType = "变量"
                this.vindicateVar(t.updateId)
            }else if(code ==='button_y_sysmail'){
                this.showContact(t.updateId,'02cc')
            }else if(code ==='button_y_syssms'){
                this.showContact(t.updateId,'01to')
            }else if(code ==='button_y_dsyssms'){

                this.showDContact(t.updateId)
            }else if(code ==='button_y_dvariable'){
                this.vinDdicateVar(t.updateId)
            }else if(code ==='button_y_wsyssms'){

                this.showWContact(t.updateId)
            }else if(code ==='button_y_wvariable'){
                this.vindicateWVar(t.updateId)
            }
        },
        getColumns () {
            this.$refs.autoChildTable.getColumns()
        },
          // 字段定义页面显示 start
        defineField(id) {
            const t = this
            this.showField = true
            t.$refs.fieldDefinition.getOptional(id)
            t.$refs.fieldDefinition.getselected(id)
            t.$refs.fieldDefinition.resetField()
        },
        hideField() {
            this.showField = false
        },
        //邮件接收人
        showContact(id, conttype, index) {
            const t = this
            t.showConMsg = true
            this.$store.commit('platApproval/setIndex', index)
            t.$refs.chosedContact.getData(id, conttype)
            t.$store.commit('platApproval/setChildId2', id)
        },
        hideConMsg() {
            this.showConMsg = false
        },
        //邮件变量
        vindicateVar(id, index) {
            const t = this
            // 将邮件的id存入路由中
            this.$store.commit('platApproval/setIndex', index)
            this.$store.commit('platApproval/setChildId2', id)
            t.showVarMsg = true
            if (id) {
                t.$refs.mailVar.getdata()
            }
      },
      hideVarMsg() {
        this.showVarMsg = false
      },
      //短信接收人
       showDContact(id, index) {
        const t = this
        t.showDConMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        t.$refs.smsToList.getdata(id)
      },
      hideDConMsg() {
        this.showDConMsg = false
      },
      //短信变量
      vinDdicateVar(id, index) {
        const t = this
        t.showDVarMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.smsVar.getdata()
        }
      },
      hideDVarMsg() {
        this.showDVarMsg = false
      },
      //微信
       showWContact(id, index) {
        const t = this
        t.showWConMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        t.$refs.wxToList.getdata(id)
      },
      hideWConMsg() {
        this.showWConMsg = false
      },
      //微信变量
       vindicateWVar(id, index) {
        const t = this
        t.showWVarMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.wxVar.getdata()
        }
      },
      hideWVarMsg() {
        this.showWVarMsg = false
      },
    },
}
</script>
<style lang="scss" scoped>
</style>