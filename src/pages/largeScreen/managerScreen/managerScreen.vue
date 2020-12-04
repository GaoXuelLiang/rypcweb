<template>
    <div class="bg">
        <div class="tit color-white">
            业务经理人力资源看板
        </div>
        <div class="inner">
            <div class="left h100">
                <div class="in_tit color-white">团队构成</div>
                <structure ref="structure"></structure>
                <div class="in_tit color-white">团队人力成本</div>
                <human ref="human"></human>
            </div>
            <div class="center h100">
                <div class="w100 h64 chang_com">
                    <Input class="inp"
                           placeholder="组织机构选择"
                           @on-click="pickDepart"
                           v-model="percaseDeptDis"
                           icon="ios-search"
                           :readonly="true"></Input>
                    <centerCompany ref="centerCompany"
                                   :isFullScreen='isFullScreen'></centerCompany>
                </div>
                <div class="in_tit color-white"
                     style="margin-bottom: 1.3%;">团队流动率</div>
                <empFlow ref="empFlow"></empFlow>
            </div>
            <div class="right h100">
                <div class="in_tit color-white">团队编制</div>
                <compile ref="compile"></compile>
                <div class="in_tit color-white">团队排行榜</div>
                <ranking ref="ranking"
                         class="marb"></ranking>
                <div class="in_tit color-white">九宫格模型</div>
                <sudo ref="sudo"></sudo>
            </div>
        </div>
        <!--雇佣公司-->
        <transition name="fade">
            <searchDept v-show="openDept"
                        :params="paramsDept"
                        :searchDeptClo="searchDeptClo"
                        @inputDept="inputDept"
                        @closeDept="closeDept"
                        ref="searchDept">
            </searchDept>
        </transition>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import searchDept from '../components/searchDept'
import structure from './structure/structure'
import ranking from './ranking/ranking'
import centerCompany from './centerCompany/centerCompany'
import compile from './compile/compile'
import human from './human/human'
import empFlow from './empFlow/empFlow'
import sudo from './sudo/sudo'
export default {
    name: 'adScreen',
    data () {
        return {
            percaseDeptDis: '',
            //      部门
            openDept: false,
            searchDeptClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.departCnFullName'),
                    key: 'compFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.departEnFullName'),
                    key: 'compFnameEnDis',
                },
            ],
            paramsDept: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1106',
                logType: '部门',
                unitType: '70dept',
            },
            isFullScreen: false,
            innerHeight: '',

        }
    },
    components: {
        structure,
        ranking,
        centerCompany,
        compile,
        human,
        empFlow,
        sudo,
        searchDept,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
        }
    },
    mounted () {
        this.getData()
        const t = this
        window.onresize = () => {
            t.innerHeight = document.body.scrollHeight
        }
        t.innerHeight = document.body.scrollHeight
        //   if (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width) {
        //     console.log("全屏");
        //     t.isFullScreen = true
        // } else {
        //     t.isFullScreen = false
        //     console.log("不是全屏");
        // }
    },
    computed: {
        selectDept () {
            return this.$store.state.pubBoardSave.selectDept
        },
    },
    watch: {
        selectDept (val) {
            const t = this
            if (val === '') {
                return
            }
            t.$refs.structure.getData()
            t.$refs.compile.getData()
            t.$refs.human.getData()
            t.$refs.empFlow.getData('', '')
            t.$refs.ranking.getData() //员工排行榜
            t.$refs.centerCompany.getData() //
            t.$refs.centerCompany.getData2() //
        },
        innerHeight (val) {
            if (val == window.screen.height) {
                this.isFullScreen = true
            } else {
                this.isFullScreen = false
            }
        }
    },
    methods: {
        pickDepart () {
            const t = this
            t.$refs.searchDept.getData()
            t.openDept = true
        },
        inputDept (name, id) {
            const t = this
            t.percaseDeptDis = name
            this.$store.commit('pubBoardSave/setSelectDept', id)
        },
        clearDepart () {
            const t = this
            t.percaseDeptDis = ''
            t.formValidate.percaseDept = ''
            t.dbPost()
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
        getData () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpChg.getDefaultComp',
                logType: '获取公司id',
                tempValue: '1',
            }
            getDataLevelUserLogin(data).then((res) => {
                if (res.data.content[0].hasOwnProperty('value')) {
                    let mapData = JSON.parse(res.data.content[0].value)
                    t.$store.commit('pubBoardSave/setSelectDept', mapData.id)
                    t.percaseDeptDis = mapData.unitsSname
                    t.$refs.structure.getData() // 员工结构
                    t.$refs.compile.getData() //编制分析
                    t.$refs.human.getData() //人力成本
                    t.$refs.empFlow.getData('', '') //员工流动率
                    t.$refs.ranking.getData() //员工排行榜
                    t.$refs.centerCompany.getData() //
                    t.$refs.centerCompany.getData2() //
                }
            }).catch((err) => {
                console.log('HR管理看板2_1')
            })
        },
    },
}

</script>
<style lang="scss" scoped>
@media screen and (max-width: 1366px) {
    .in_tit {
        margin-bottom: 0 !important;
        font-size: 14px !important;
    }
    .marb {
        margin-bottom: 3.5% !important;
    }
    .chang_com {
        margin-top: 4% !important;
    }
}
.color-white {
    color: rgba(254, 254, 254, 1);
}
.clearfix:after {
    content: "";
    display: table;
    line-height: 0;
    clear: both;
}
.left {
    width: 29%;
}
.inner {
    display: flex;
    height: 89%;
}
.center {
    width: 42%;
    padding: 0 1%;
    flex: 1;
}
.right {
    width: 29%;
}
.float_right {
    float: right;
}
.float_left {
    float: left;
}
.h100 {
    height: 100%;
}
.w100 {
    width: 100%;
}
.h64 {
    height: 64%;
}
.dis_flex {
    display: flex;
}
.f1 {
    flex: 1;
}
.ivu-table td.demo-table-info-column {
    background-color: #11162f;
    color: #fff;
    border-bottom: 1px solid rgba(0, 144, 255, 1);
}
/deep/ .ivu-input {
    background-color: rgba(21, 32, 49, 0.5);
    border: 1px solid rgba(67, 85, 121, 1);
    color: rgba(254, 254, 254, 1) !important;
}
/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 25px;
    line-height: 25px;
}
/deep/ .ivu-select-single .ivu-select-selection {
    height: 25px;
}
/deep/ .ivu-input {
    height: 25px;
    line-height: 25px;
}
/deep/ .ivu-input-icon {
    height: 25px;
    width: 25px;
    line-height: 25px;
}
.marb {
    margin-bottom: 3.5%;
}
.bg {
    background: url("../../../../static/largeScreen/screen_bg.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
}
.inner {
    padding: 0 1%;
}
.tit {
    background: url("../../../../static/largeScreen/screen_title.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    width: 100%;
    height: 9%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    // font-weight: bold;
}
.in_tit {
    background: url("../../../../static/largeScreen/all_title.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    width: 230px;
    height: 20px;
    line-height: 17px;
    font-weight: bold;
    font-size: 16px;
    padding-left: 60px;
    margin-bottom: 2%;
    display: inline-block;
}
.chang_com {
    margin-top: 4%;
    margin-bottom: 3%;
    position: relative;
    overflow: hidden;
    .inp {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 150px;
        background-color: rgba(21, 32, 49, 0.5);
        color: rgba(254, 254, 254, 1) !important;
        border-radius: 4px;
        border: 1px solid;
        border-image: linear-gradient(
                -90deg,
                rgba(64, 127, 255, 1),
                rgba(79, 230, 228, 1)
            )
            10 10;
        .ivu-input {
            border-radius: 0 !important;
        }
    }
}
</style>
