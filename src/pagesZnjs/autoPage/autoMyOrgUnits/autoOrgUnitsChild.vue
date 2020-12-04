<!--
 * @Author: your name
 * @Date: 2020-11-05 09:53:59
 * @LastEditTime: 2020-11-06 22:04:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pagesZnjs\autoPage\autoMyOrgUnits\autoOrgUnitsChild.vue
-->
<template>
    <div>
        <autoChildTable @specialButton="specialButton"
                        :isSpecial="isSpecial"
                        ref="autoChildTable"></autoChildTable>
        <transition>
            <moreAdd ref="moreAdd"
                     @refrsh="refrsh"></moreAdd>
        </transition>
    </div>
</template>

<script>
import moreAdd from "@/components/autoCommonPage/moreAdd";
import autoChildTable from "@/components/autoCommonPage/autoChildTable";
import { getDataLevelUserLogin } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
export default {
    data () {
        return {
            titleName: "",
            mainId: "",
            openOrder: false,
            isSpecial: true,
            moreAddPop: false,
            isSpecial: true,
            columns: [
                { align: "left", type: "selection", title: "序号", width: 60 },
                { align: "center", key: "postCode", title: "岗位编码" },
                { align: "center", key: "postCname", title: "中文名称" },
                { align: "center", key: "postTypeDis", title: "岗位分类" },
                { align: "center", key: "postPtodidDis", title: "序列" },
                { align: "center", key: "postBusridDis", title: "职类" },
                { align: "center", key: "postBumdidDis", title: "职能" },
                { align: "center", key: "postDutyidDis", title: "职务" },
                { align: "center", key: "postRankidDis", title: "职等" },
            ],
            searchInp: [{ clmDname: "中文名称", clmName: "postCname", clmLayout: 1 ,name:''},{ clmDname: "职类", clmName: "postBusridDis",clmLayout: 1 ,name:''}],
        };
    },
    components: {
        autoChildTable,
        moreAdd,
    },
    mounted () { },
    destroyed () { },
    mouted () { },
    methods: {
        refrsh () {
            console.log("here");
            this.$refs.autoChildTable.getData();
        },
        specialButton (code, t) {

            this.mainId = t.mainId;
            this.titleName = t.titleName;
            let columns = [];
            let searchInp = [];
            let obj = { tableName: "", id: "" };
            let paramObj = {}
            if (code === "button_moreAdd") {
                if (t.titleName === "部门岗位管理") {
                    obj.tableName = "OrgPost";
                    obj.id = "1981";
                    columns = this.columns;
                    searchInp = this.searchInp;
                    paramObj['unptDeptid'] = ''
                    paramObj['unptPostid'] = ''
                    paramObj['mt'] = 'OrgUnitpost'
                    let { unitHcityid, unitWcityid, unitCotcid, status, unitSdate } = this.$store.state.flowClmkMap.popForm
                    let mainObj = { unitHcityid, unitWcityid, unitCotcid, status, unitSdate }
                    paramObj = Object.assign({}, paramObj, mainObj)
                    paramObj.unptEdate = '9999-12-31'
                }
                this.$refs.moreAdd.initData(obj, columns, searchInp, this.mainId, paramObj);
            }
        },
        getColumns () {
            this.$refs.autoChildTable.getColumns();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>