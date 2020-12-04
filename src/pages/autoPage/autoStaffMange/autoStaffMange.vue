<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-02 10:23:03
 * @LastEditTime: 2020-11-02 10:34:52
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable @specialButton="specialButton"
                         :isSpecialAdd="isSpecialAdd"
                         ref="commonMainTable"></commonMainTable>
        <transition>
            <staffMangeSpecile  v-show="openStaff"  
                            @closeUp="closeUp" 
                            @changeinput="changeinput" 
                            ref="staffMangeSpecile"></staffMangeSpecile>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import searchPubUser from './staffMangeSpecile'
import { getDataLevelUserLoginData } from '@/axios/axios'
import {isSuccess,getUrlKey} from '../../../lib/util'
export default {
    data () {
        return {
            isSpecialAdd:true,//特殊新增事件
            openStaff:false,
        }
    },
    components: {
        commonMainTable,
        staffMangeSpecile
    },
    mounted () {
    },
    destroyed () {

    },
    activated () {

    },
    methods: {
        specialButton (code,t) {
            console.log(code)
            switch(code){
                case 'button_add':
                    this.pickData();
                    break;
            }
        },
        // 打开新增弹框
        pickData() {
            const t = this;
            // t.$refs.searchPubUser.getData();
            t.openStaff = true;
        },
        // // 返回新增用户信息
        // changeinput(name, email, loginName, id) {
        //     const t = this;
        //     t.sysUserid = id;
        //     t.addSysRootUser();
        // },
        // addSysRootUser() {
        //     const t = this
        //     getDataLevelUserLoginData({
        //         _mt: t.$global.mt+'SysUserinfo.addOrUpdSysUserinfo',
        //         APlogType: '新增',
        //         // companyId: '1',
        //         APsysUserid: t.sysUserid,
        //     }).then((res) => {
        //         if (isSuccess(res, t)) {
        //             t.$Modal.success({
        //                 title: t.$t('reminder.suc'),
        //                 content: t.$t('reminder.addsuccess'),
        //                 onOk: () => {
        //                     t.$refs.commonMainTable.getData();
        //                     // console.log(res.data.content[0])
        //                 },
        //             })
        //         }
        //     }).catch(() => {
        //         t.$Modal.error({
        //             title: t.$t('reminder.err'),
        //             content: t.$t('reminder.errormessage'),
        //         })
        //     })
        // },
        // 关闭新增弹框
        closeUp() {
            const t = this
            t.openStaff = false
            // t.pmtypeCode = false
            // t.$refs.searchPubUser.pmtypeCode = ''
        },
    }
}
</script>

<style lang="scss" scoped>
</style>