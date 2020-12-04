<template>

    <div class="cover">
        <div class="box"
             style="width: 1150px">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                原组织单元-<Input placeholder="选择原组织单元"
                       style="width: 250px"
                       v-model="oldCompDis"
                       icon="ios-search"
                       :readonly="true"
                       @on-click="opencompetType" />
                新组织单元-<Input placeholder="新组织单元"
                       style="width: 250px"
                       v-model="NewCompDis"
                       icon="ios-search"
                       :readonly="true" />
                <span>
                    <Button type="primary"
                            @click="newOpenComp"
                            :disabled="disabled">编辑</Button>
                </span>
            </Row>
            <Row>
                <Tabs :value="tagName"
                      type="card"
                      @on-click="tabClick">
                    <TabPane label="所属组织单元"
                             name="name1">
                        <tagComp ref="tagComp"
                                 @pickDataType="pickDataType"
                                 @changeValue="changeValue"></tagComp>
                    </TabPane>
                    <TabPane label="所属岗位"
                             name="name2"
                             :disabled="tabPostShow">
                        <tabPost ref="tagPost"
                                 @pickDataTypePost="pickDataTypePost"></tabPost>
                    </TabPane>
                </Tabs>
            </Row>
            <Row style="text-align: right;margin-top: 10px"
                 v-show="submitShow">
                <Button @click="handleReset"
                        class="btn1">{{$t('button.cal')}}</Button>
                <Button type="primary"
                        @click="handleSubmit"
                        class="btn">确认复制</Button>
            </Row>
        </div>
        <!-- 新组织单元编辑页面-->
        <newComp v-show="newCompShow"
                 logType="新增"
                 @closeUp="closeUp"
                 ref="newComp"
                 @addNewComp="addNewComp"></newComp>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
        <!-- 员工 -->
        <transition name="fade">
            <staffPage v-show="openPick4"
                       :logType="logType"
                       ref="staffPage"
                       @hideMsg="close4"
                       @changeinput="changeinput4"></staffPage>
        </transition>
        <transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        ref="searchCity"></searchCity>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick2"
                            :searchCloumns="searchCloumns2"
                            :params="params2"
                            @closeUp="close2"
                            @changeinput="changeinput2"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>
        <transition name="fade">
            <searchOrgcostcenter v-show="openPick3"
                                 :searchCloumns="searchCloumns3"
                                 :params="params3"
                                 @closeUp="close3"
                                 @changeinput="changeinput3"
                                 ref="searchOrgcostcenter"></searchOrgcostcenter>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import tagComp from './components/tabComp.vue'
import tabPost from './components/tabPost.vue'
import newComp from './components/newComp.vue'
import staffPage from './staffPage.vue'
import searchCity from '../../../components/searchTable/searchCity'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
export default {
    data () {
        return {
            value: '',
            oldCompDis: '',
            oldCompId: '',
            NewCompDis: '',
            NewCompId: '',
            showModal: false,
            tabPostShow: true,
            disabled: true,
            newCompShow: false,
            submitShow: false,
            dataParame: {},
            modiaContent: '',
            newCompList: {},
            openPick: false,
            openPick2: false,
            openPick3: false,
            openPick4: false,
            unitPname: '',
            params: {
                _mt:  this.$global.mt+'BaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
                data: '{"cityIsvalid" : "1"}',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            params2: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                unitPid: 0,
            },
            searchCloumns2: [
                {
                    title: this.$t('lang_organization.orgframe.unitCode'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgframe.compCOrEName'),
                    key: 'unitsName',
                },
                {
                    title: this.$t('lang_organization.orgframe.unitTypeName'),
                    key: 'unitTypeName',
                },
            ],
            params3: {
                _mt:  this.$global.mt+'OrgCostcenter.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '成本中心查询',
                data: '{}',
            },
            searchCloumns3: [
                {
                    title: this.$t('lang_organization.orgcostcenter.costCode'),
                    key: 'costCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.cname'),
                    key: 'cname',
                },
                {
                    title: this.$t('lang_organization.orgcostcenter.ename'),
                    key: 'ename',
                },
            ],
            pickType: '',
            NewPostId: '',
            unitCode: '',
            tagName: 'name1',
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    methods: {
        handleReset () {
            this.oldCompDis = ''
            this.NewCompDis = ''
            this.$emit('closeUp')
            this.$refs.tagComp.data = []
            this.tabPostShow = true
            this.submitShow = false
            this.disabled = true
            this.tagName = 'name1'
        },
        handleSubmit () {
            const t = this
            let postData = t.$refs.tagPost.data
            for (let i = 0; i < postData.length; i++) {
                if (postData[i].postDfcostcenter === '0') {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '岗位默认成本中心不能为空',
                    })
                    return
                }
                if (postData[i].postLocation === '0') {
                    t.$Modal.warning({
                        title: this.$t('reminder.err'),
                        content: '岗位工作地点不能为空',
                    })
                    return
                }
            }
            let data = {
                TopUnit: t.clearNewCompList(t.newCompList),
                SubUnit: t.clearSubUnit(t.$refs.tagComp.data),
                NewPost: t.clearNewPost(t.$refs.tagPost.data),
            }
            data._mt =  this.$global.mt+'OrgUnits.copyAndInsert'
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.$emit('closeUp')
                    this.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '复制成功',
                    })
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        clearNewCompList (obj) {
            delete obj.unitChargerDis
            delete obj.unitDfcostcenterName
            delete obj.unitDfhirecityName
            delete obj.unitDfworkcityName
            delete obj.unitPidCode
            delete obj.unitLevelDis
            delete obj.NewUnitCode
            delete obj.unitPname
            return obj
        },
        clearSubUnit (array) {
            array.forEach((item, index) => {
                delete item.oldUnitCode
                delete item.oldCompSnameCnDis
                delete item.oldCompSnameEnDis
            })
            return array
        },
        clearNewPost (array) {
            array.forEach((item, index) => {
                delete item.OldPostCode
                delete item.postDfcostcenterName
                delete item.postLocationDis
            })
            return array
        },
        /*
         弹出选择
       */
        opencompetType () {
            this.showModal = true
            this.modiaContent = 'training-needs-company'
            this.dataParame = {
                unitState: '0206valid',
            }
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            this.NewPostId = row.id
            this.oldCompDis = row.unitCode + ' - ' + row.compFnameCnDis
            this.oldCompId = row.id
            this.$refs.tagComp.getData(row.id)
            this.newCompList = row
            this.$refs.newComp.getData(this.newCompList)
            this.disabled = false
        },
        tabClick (value) {
            this.tagName = value
            if (value === 'name2') {
                this.$refs.tagPost.getData(this.NewPostId, this.unitCode)
                this.submitShow = true
            }
        },
        changeValue (value) {
            this.NewCompDis = value.unitCode + ' - ' + value.compFnameCnDis
            this.unitCode = value.unitCode
            this.newCompList = value
            this.tabPostShow = false
        },
        closeUp () {
            this.newCompShow = false
        },
        newOpenComp () {
            this.newCompShow = true
            this.$refs.newComp.getData(this.newCompList)
            this.tagName = 'name1'
        },
        addNewComp (row) {
            this.tagName = 'name1'
            this.$refs.tagComp.addData(row)
        },

        /*
           所属组织单元的弹出
        */
        close () {
            const t = this
            t.openPick = false
        },
        close2 () {
            const t = this
            t.openPick2 = false
        },
        close3 () {
            const t = this
            t.openPick3 = false
        },
        close4 () {
            const t = this
            t.openPick4 = false
        },
        changeinput (name, id) {
            const t = this
            if (t.pickType === 'postLocationDis') {
                t.$refs.tagPost.changePostValue(t.pickType, name, id)
            } else {
                t.$refs.tagComp.changeData(t.pickType, name, id)
            }
        },
        changeinput2 (name, id) {
            const t = this
            t.$refs.tagComp.changeData(t.pickType, name, id)
        },
        changeinput3 (name, id) {
            const t = this
            if (t.pickType === 'postDfcostcenterName') {
                t.$refs.tagPost.changePostValue(t.pickType, name, id)
            } else {
                t.$refs.tagComp.changeData(t.pickType, name, id)
            }
        },
        changeinput4 (name, id) {
            const t = this
            t.$refs.tagComp.changeData(t.pickType, name, id)
        },
        pickData () {
            const t = this
            t.popup = '0'
            t.$refs.searchCity.getData(this.params, '02city\',\'03county')
            t.openPick = true
        },
        pickData1 () {
            const t = this
            t.popup = '1'
            t.$refs.searchCity.getData(this.params)
            t.openPick = true
        },
        pickData2 () {
            if (this.forbidden === null) {
                const t = this
                t.$refs.searchOrgframe.getData(this.params2)
                t.openPick2 = true
            }
        },
        pickData3 () {
            const t = this
            t.$refs.searchOrgcostcenter.getData(this.params3)
            t.openPick3 = true
        },
        pickData4 () {
            const t = this
            t.openPick4 = true
            t.$refs.staffPage.getData()
        },
        pickDataType (type) {
            this.pickType = type
            switch (type) {
                case 'unitChargerDis':    // 负责人
                    this.pickData4()
                    break
                case 'unitDfhirecityName': // 雇佣点
                    this.pickData()
                    break
                case 'unitDfworkcityName': //  工作地点
                    this.pickData1()
                    break
                case 'unitDfcostcenterName': //  成本中心
                    this.pickData3()
                    break
            }
        },
        pickDataTypePost (type) {
            this.pickType = type
            switch (type) {
                case 'postLocationDis': //  工作地点
                    this.pickData1()
                    break
                case 'postDfcostcenterName': //  成本中心
                    this.pickData3()
                    break
            }
        },
    },
    components: {
        tagComp,
        tabPost,
        newComp,
        searchCity,
        searchOrgframe,
        searchOrgcostcenter,
        staffPage,
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";

.age .ivu-input-wrapper {
    width: 45%;
}

.ivu-form-item .ivu-form-item-content {
    margin-left: 0 !important;
}
</style>
