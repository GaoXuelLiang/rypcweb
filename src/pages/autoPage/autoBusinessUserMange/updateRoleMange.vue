<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <!-- 选项卡 开始-->
            <Tabs value="name1"
                  @on-click="changeTab"
                  ref="tab"
                  type="card">
                <!-- <TabPane :label="$t('lang_role.adminuser.assignrole')"  name="name1">
          <Row class="table-form">
            <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
            <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpins" @click="getData(id)"><span v-if="!isSpins">{{$t('button.ser')}}</span></Button></span>
            <span style="margin: 0;"><Button type="warning" @click="clear(1)">{{$t('button.cle')}}</Button></span>
          </Row>
          <row class="table-form" ref="table-form">
            <i-col span="19">
             <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" height="320" :row-class-name="addRowClass" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
            </i-col>
            <i-col span="4" offset="1">
              <div class="btn-group">
                <Button type="primary" @click="handleSelectAll(true)" >{{$t('lang_user.rootrole.allPick')}}</Button>
                <Button type="primary" @click="handleSelectAll(false)">{{$t('lang_user.rootrole.resetTree')}}</Button>
                <Button type="primary" @click="updStateRoleMe()">{{$t('button.sav')}}</Button>
              </div>
            </i-col>
          </row>
        </TabPane> -->
                <TabPane :label="$t('lang_role.adminuser.assignorg')"
                         name="name1">
                    <Row>
                        <Col class="col border_2"
                             span="19"
                             style="position: relative;">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <!--<Tree :data="distribution_data" show-checkbox multiple ref="orangize_tree" ></Tree>-->
                        <Tree :data="dataTrees"
                              show-checkbox
                              multiple
                              ref="tree"
                              check-strictly
                              @on-contextmenu="handleContextMenu">
                            <template slot="contextMenu">
                                <DropdownItem @click.native="handleContextMenuAll">全选</DropdownItem>
                                <DropdownItem @click.native="handleContextMenuAllcal">取消全选</DropdownItem>
                            </template>
                        </Tree>
                        </Col>
                        <Col span="4"
                             offset="1">
                        <div class="btn-group">
                            <Button type="primary"
                                    @click="expand">{{$t('lang_user.rootrole.expand')}}</Button>
                            <Button type="primary"
                                    @click="disExpand">{{$t('lang_user.rootrole.disExpand')}}</Button>
                            <Button type="primary"
                                    @click="allPick">{{$t('lang_user.rootrole.allPick')}}</Button>
                            <Button type="primary"
                                    @click="resetTree">{{$t('lang_user.rootrole.resetTree')}}</Button>
                            <Button type="primary"
                                    @click="save">{{$t('button.sav')}}</Button>
                        </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            userId: '',
            dataTrees: [],
            companyId: '',
            loading: false,
            isSpins: false,
            noDataImg: '<div id="noData"></div>',
            id: '',
            tableselected: [],
            checkStrictly: false,
            total: NaN,
            //  分配角色
            pmtypeCode: '',
            params: {
                _mt: this.$global.mt + 'SysFunctions.selSysFunctionsByTree',
                funType: '1admin',
            },
            data: [],
            //  分配角色  ------------
            // 分配组织架构
            orangize_params: {
                // _mt:  this.$global.mt+'OrgUnits.getOrgAll',
                _mt: this.$global.mt + "OrgUnits.getTree",
                AProws: '100',
                APpage: 1,
                APsort: 'unitCode',
                APorder: 'asc',
                id: '0',
                // status: t.tbName == 'OrgUnits' ? t.status : '02valid'
            },
            distribution_data: [],
            distribution_checked: [],
            distribution_expanded: [],
            // 分配组织架构 -----------
            //  分配成本中心
            cost_searchText: this.$t('lang_role.adminuser.cost_searchText'),
            pmtypeCode_cost: '',
            costParams: {
                _mt: this.$global.mt + 'OrgCostcenter.getPage',
                APlogType: '操作类型',
                APsort: 'id',     //  排序字段
                APorder: 'desc',  //  排序类型
                AProws: '1000',     //  每页显示条数
                APpage: '1',      //  当前页
            },
            cost_columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminuser.costCode'),
                    key: 'costCode',
                },
                {
                    title: this.$t('lang_role.adminuser.cname'),
                    key: 'cname',
                },
            ],
            cost_data: [],
            get_cost_table: '', //  存放分配成本中心表的id值
            cost_total: 0,      //  分配成本中心分页总条数
            //  分配成本中心  ---------
            //分配工单类型
            knowledge_data: [],
            pmtypeCode_paySal: '',
            paySalParams: {
                _mt: this.$global.mt + 'PaySalSet.getPage',
                APlogType: '操作类型',
                APsort: 'id',     //  排序字段
                APorder: 'desc',  //  排序类型
                AProws: '1000',     //  每页显示条数
                APpage: '1',      //  当前页
            },
            paySal_columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminuser.payssCode'),
                    key: 'payssCode',
                },
                {
                    title: this.$t('lang_role.adminuser.payssCN'),
                    key: 'payssCN',
                },
                {
                    title: this.$t('lang_role.adminuser.payssEN'),
                    key: 'payssEN',
                },
            ],
            paySal_data: [],
            get_paySal_table: '', //  存放分配薪资账套表的id值
            paySal_total: 0,      //  分配薪资账套分页总条数
            knowledge_data: [], // 分配社保区域
            pmtypeCode_bfarea: '',
            bfareaParams: {
                _mt: this.$global.mt + 'PlatBenefitarea.getPage',
                APlogType: '操作类型',
                APsort: 'id',     //  排序字段
                APorder: 'desc',  //  排序类型
                AProws: '1000',     //  每页显示条数
                APpage: '1',      //  当前页
            },
            bfarea_columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminuser.bfareaCode'),
                    key: 'bfareaCode',
                },
                {
                    title: this.$t('lang_role.adminuser.bfareaCname'),
                    key: 'bfareaCname',
                },
                {
                    title: this.$t('lang_role.adminuser.bfareaEname'),
                    key: 'bfareaEname',
                },
            ],
            bfarea_data: [],
            wholeDdata: [],
            proceListAll: [],
            selectData: [],
            get_bfarea_table: '', //
            bfarea_total: 0,      //
            showAll: false,
            isSpin: false,
            dataObj: {},
            searchText: this.$t('lang_user.rootrole.proleCname'),
            searchCloumns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_user.rootgrprole.roleCname'),
                    key: 'roleCname',
                },
                {
                    title: this.$t('lang_user.rootuserrole.authGrpDis'),
                    key: 'authGrpDis',
                },
            ],
            // 分配角色
            sentParams: {
                _mt: this.$global.mt + 'AuthRole.getAuthRoleByPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: '1000',
                APpage: '1',
                AProleType: '3user',
            },

            contextData: null
        }
    },
    props: {
        // sentParams: Object,
        updateId: Number,
        logType: String,
    },
    mounted () {

    },
    methods: {
        changeTab (name) {
            const t = this
            t.distribution_data = []
            switch (name) {
                case 'name1':
                    // t.getData(t.id)
                    t.orangize_getData()
                    break;
                case 'name2':
                    t.orangize_getData()
                    break;
                case 'name3':
                    t.cost_getData(t.id)
                    break;
                case 'name4':
                    t.workOrderType_getData()
                    break;
                case 'name5':
                    t.paySal_getData(t.id)
                    break;
                case 'name6':
                    t.bfarea_getData(t.id)
                    break;
            }
        },
        nodeClick (data, node) {
            if (node.checked == true) {
                node.checked = false
            } else {
                node.checked = true
            }
            if (node.checked == true) {
                this.childNodesChange(node);
            }
        },
        childNodesChange (node) {
            let len = node.childNodes.length;
            for (let i = 0; i < len; i++) {
                node.childNodes[i].checked = true;
                this.childNodesChange(node.childNodes[i]);
            }
        },
        parentNodesChange (node) {
            if (node.parent) {
                for (let key in node) {
                    if (key == "parent") {
                        node[key].checked = true;
                        this.parentNodesChange(node[key]);
                    }
                }
            }
        },
        // 分配角色
        getData (id, companyId) {
            const t = this;
            t.loading = true;
            t.isSpins = true;
            if (companyId) {
                t.companyId = companyId
            }
            const data = deepCopy(t.sentParams)
            t.dataObj = deepCopy(t.sentParams)
            t.id = id || t.id
            data['companyId'] = t.companyId
            data['roleCname'] = t.pmtypeCode
            data['authGroupSign'] = 2
            data['userIdSign'] = t.id
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    for (const dat in res.data.content[0].rows) {
                        if (res.data.content[0].rows[dat].authGroupTitl === '1') {
                            res.data.content[0].rows[dat]['_checked'] = true
                            res.data.content[0].rows[dat]['_disabled'] = true
                        }
                        if (res.data.content[0].rows[dat].authGroupCheckd === '1') {
                            res.data.content[0].rows[dat]['_checked'] = true
                        }
                    }
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
                t.isSpins = false;
            })
        },
        addRowClass (row, index) {  // 添加高亮颜色
            if (row) {
                if (row.hasOwnProperty('authGroupTitl')) {
                    if (row.authGroupTitl === '1') {
                        return 'demo-table-error-row'
                    }
                }
                return ''
            }
        },
        // 分配角色 ---------------------------------
        //  分配组织架构获取树
        orangize_getData (id, userId, companyId, poroIsper) {
            const t = this
            t.isSpin = true
            const data = deepCopy(t.orangize_params)
            t.isSpin = true
            if (companyId) {
                t.companyId = companyId
            }
            t.userId = userId || t.userId
            t.id = id || t.id
            data.companyId = t.companyId
            getDataLevelUserLoginData(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    if (res.data.content[0]) {
                        t.wholeDdata = res.data.content[0].value;
                        t.wholeDdata[0].unitPid = '0'
                        t.getData1()
                        // setTimeout(() => {
                        //   t.dataTrees = t.toTrees(res.data.content[0].value)
                        // }, 500)
                    }
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /* 把后台数据转化为tree的格式 */
        toTrees (data) {
            data.forEach((item) => {
                item.expand = false;
                item.contextmenu = true;
                if (item.hasOwnProperty('checkedDes')) {
                    item.checked = item.checkedDes
                } else {
                    item.checked = undefined
                }
                //          item.checked = item.authRoleFunDis === '1'
                item.title = item.unitFnameCn + (item.unitEmpIdDis ? (' - ' + item.unitEmpIdDis) : '')
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.unitPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    item.expand = true
                    val.push(item)
                }
            })
            return val
        },
        getData1 () {
            const t = this
            const data = {}
            data._mt = this.$global.mt + 'AuthRolePower.getMgOrgForSysUser'
            data.APsysUserId = t.updateId
            data.companyId = t.companyId
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0]) {
                        t.selectData = res.data.content[0].value;
                        t.dataProcessing();
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        dataProcessing () {
            const t = this
            let proceList = []
            let shouldList = []
            t.proceListAll = []
            if (undefined === t.selectData || t.selectData.length === 0) {
                let list = []
                for (let i = 0; i < t.wholeDdata.length; i++) {
                    let map = {}
                    map['unitFnameCn'] = t.wholeDdata[i].unitFnameCn
                    map['unitEmpIdDis'] = t.wholeDdata[i].unitEmpIdDis
                    map['expand'] = false
                    map['unitPid'] = t.wholeDdata[i].unitPid
                    map['id'] = t.wholeDdata[i].id
                    list.push(map)
                }
                t.dataTrees = t.toTrees(list)
                return
            }
            for (let k = 0; k < t.selectData.length; k++) {
                proceList.push(t.selectData[k].orgunitid);
                t.proceListAll.push(t.selectData[k].orgunitid);
            }
            for (let p = 0; p < t.wholeDdata.length; p++) {
                let obj = {}
                obj['unitFnameCn'] = t.wholeDdata[p].unitFnameCn
                obj['unitEmpIdDis'] = t.wholeDdata[p].unitEmpIdDis
                obj['expand'] = false
                obj['unitPid'] = t.wholeDdata[p].unitPid
                obj['id'] = t.wholeDdata[p].id
                for (let j = 0; j < proceList.length; j++) {
                    if (obj['id'] === proceList[j]) {
                        obj['checkedDes'] = true
                    }
                }
                shouldList.push(obj)
            }
            t.dataTrees = t.toTrees(shouldList)
        },
        resetTree () {
            this.treeData2(this.dataTrees, 'checked', false)
            this.treeData(this.dataTrees, 'checked', false)
        },
        allPick () {
            this.treeData2(this.dataTrees, 'checked', true)
        },
        expand () {
            this.treeData(this.dataTrees, 'expand', true)
        },
        disExpand () {
            this.treeData(this.dataTrees, 'expand', false)
        },
        /* 把后台数据转化为tree的格式 */
        //      toTree(data) {
        //        data.forEach((item) => {
        //          item.expand = false
        //          item.checked = item.isCheck === '1'
        //          item.title = item.unitCode + ' ' + item.unitsSname
        //          delete item.children
        //        })
        //        const map = {}
        //        data.forEach((item) => {
        //          map[item.id] = item
        //        })
        //        const val = []
        //        data.forEach((item) => {
        //          const parent = map[item.unitPid]
        //          if (parent) {
        //            (parent.children || (parent.children = [])).push(item)
        //          } else {
        //            val.push(item)
        //          }
        //        })
        //        return val
        //      },
        /* 把后台数据转化为tree的格式 */
        //     toTree(data) {
        //       data.forEach((item) => {
        //         item.expand = false
        //         if (item.hasOwnProperty('checkedDes')) {
        //           item.checked = item.checkedDes
        //         } else {
        //           item.checked = undefined
        //         }
        // //          item.checked = item.authRoleFunDis === '1'
        //         item.title = item.compSnameCnDis
        //         delete item.children
        //       })
        //       const map = {}
        //       data.forEach((item) => {
        //         map[item.id] = item
        //       })
        //       const val = []
        //       data.forEach((item) => {
        //         const parent = map[item.unitPid]
        //         if (parent) {
        //           (parent.children || (parent.children = [])).push(item)
        //         } else {
        //           item.expand = true
        //           val.push(item)
        //         }
        //       })
        //       return val
        //     },
        DynamicScaling () {
            for (let j = 0; j < this.$refs.orangize_tree.store._getAllNodes().length; j++) {
                this.$refs.orangize_tree.store._getAllNodes()[j].expanded = this.showAll;
            }
        },
        setData (data) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    // data[i][item] = value
                    t.$refs.orangize_tree.setChecked(data[i], true)
                    t.setData(data[i].children)
                } else {
                    t.$refs.orangize_tree.setChecked(data[i], true)
                }
            }
        },
        //  保存（分配组织架构）
        save () {
            const t = this
            const checkedId = []
            const checked = t.$refs.tree.getCheckedNodes()
            for (let i = 0; i < checked.length; i++) {
                checkedId.push(checked[i].id)
            }
            const data = {
                _mt: this.$global.mt + 'AuthRolePower.addAuthUseorgunit',
                APlogType: '日志类型',
                APorgUserId: t.updateId,
                APorgunitid: checkedId.join(),
                APcompanyId: t.companyId
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    // t.$emit('closeUp')
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //  保存 END
        /* 遍历树形数组对象 */
        treeData (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    data[i][item] = value
                    t.treeData(data[i].children, item, value)
                }
            }
        },
        treeData2 (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    t.treeData2(data[i].children, item, value)
                } else {
                    data[i][item] = value
                }
            }
        },
        //  分配组织架构获取树  -------------------------
        // 分配成本中心
        cost_getData (id) {
            const t = this
            const data = deepCopy(t.costParams)
            data['userId'] = id
            data['costCode'] = t.pmtypeCode_cost
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    for (const dat in res.data.content[0].rows) {
                        // if (res.data.content[0].rows[dat].authGroupTitl === '1') {
                        //   res.data.content[0].rows[dat]['_checked'] = true
                        //   res.data.content[0].rows[dat]['_disabled'] = true
                        // }
                        if (res.data.content[0].rows[dat].isCheck === '1') {
                            res.data.content[0].rows[dat]['_checked'] = true
                        }
                    }
                    t.cost_data = res.data.content[0].rows
                    t.cost_total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        costSelectAll (status) {
            this.$refs.cost_select.selectAll(status)
        },
        // 拿多选框的值
        cost_select_table (option) {
            const newArr = []
            for (let i = 0; i < option.length; i++) {
                newArr.push(option[i].id)
            }
            this.get_cost_table = newArr.toString()
        },
        // 保存提交（分配成本中心）
        saveUpCost () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'AuthRolePower.addAuthUsecostcenter',
                APlogType: '日志类型',
                APcosUserId: t.id,
                APcostid: t.get_cost_table,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    // t.close()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addClostRowClass (row, index) {  // 添加高亮颜色
            if (row.isCheck === '1') {
                return 'demo-table-error-row'
            }
            return ''
        },
        // 分配成本中心 ---------------------------------
        // 分配薪资账套
        paySal_getData (id) {
            const t = this
            const data = deepCopy(t.paySalParams)
            data['paysaluserid'] = id
            data['payssCode'] = t.pmtypeCode_paySal
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    for (const dat in res.data.content[0].rows) {
                        if (res.data.content[0].rows[dat].isCheck === '1') {
                            res.data.content[0].rows[dat]['_checked'] = true
                        }
                    }
                    t.paySal_data = res.data.content[0].rows
                    t.paySal_total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        paySalSelectAll (status) {
            this.$refs.paySal_select.selectAll(status)
        },
        // 拿多选框的值
        paysal_select_table (option) {
            const newArr = []
            for (let i = 0; i < option.length; i++) {
                newArr.push(option[i].id)
            }
            this.get_paySal_table = newArr.toString()
        },
        // 保存提交（分配成本中心）
        saveUppaySal () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'AuthRolePower.addAuthUsepaysal',
                APlogType: '薪资账套保存',
                APpaysaluserid: t.id,
                APpaysalid: t.get_paySal_table,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    t.paySal_getData(t.id)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addpaySalRowClass (row, index) {  // 添加高亮颜色
            if (row.isCheck === '1') {
                return 'demo-table-error-row'
            }
            return ''
        },
        // 分配薪资账套 ---------------------------------
        // 分配社保区域
        bfarea_getData (id) {
            const t = this
            const data = deepCopy(t.bfareaParams)
            data['bfareauserid'] = id
            data['bfareaCode'] = t.pmtypeCode_bfarea
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    for (const dat in res.data.content[0].rows) {
                        if (res.data.content[0].rows[dat].isCheck === '1') {
                            res.data.content[0].rows[dat]['_checked'] = true
                        }
                    }
                    t.bfarea_data = res.data.content[0].rows
                    t.bfarea_total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        bfareaSelectAll (status) {
            this.$refs.paySal_select.selectAll(status)
        },
        // 拿多选框的值
        bfarea_select_table (option) {
            const newArr = []
            for (let i = 0; i < option.length; i++) {
                newArr.push(option[i].id)
            }
            this.get_bfarea_table = newArr.toString()
        },
        // 保存提交（分配社保区域）
        saveUpbfarea () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'AuthRolePower.addUsebfarea',
                APlogType: '薪资账套保存',
                APbfareauserid: t.id,
                APbfareaid: t.get_bfarea_table,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    t.bfarea_getData(t.id)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addbfareaRowClass (row, index) {  // 添加高亮颜色
            if (row.isCheck === '1') {
                return 'demo-table-error-row'
            }
            return ''
        },
        // 分配社保区域 ---------------------------------
        close () {
            this.$refs.tab.activeKey = 'name1'
            this.pmtypeCode = ''
            this.$emit('closeUp')
        },
        dbCkick (row) {
            const t = this
            this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
            this.$emit('closeUp')
        },
        clear (num) {  //  清空搜索条件
            if (num === 1) {
                this.pmtypeCode = ''
            } else if (num === 2) {
                this.pmtypeCode_cost = ''
            } else if (num === 3) {
                this.pmtypeCode_paySal = ''
            }
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status)
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr.toString()
        },
        updStateRoleMe () {
            const t = this
            const arr = t.$refs.selection.getSelection()
            let ids = ''
            const idsArr = []
            for (let i = 0; i < arr.length; i++) {
                idsArr.push(arr[i].id)
            }
            ids = idsArr.join(',')
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysUserinfo.setRoleByIds',
                APfunId: '1',
                APlogType: '分配权限',
                APauthRoleId: ids,
                AProletype: '3user',
                APid: t.id,
                APcompanyId: t.companyId
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    // t.close()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        sortable (column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (column.order !== 'normal') {
                this.getData(t.id)
            }
        },
        //工单类型分配------------------------------------------------------------------
        //工单类型树结构
        workOrderType_getData () {
            const t = this
            const data1 = {
                id: '0',
                sysUserid: t.id,
            }
            const data = {
                _mt: this.$global.mt + 'CmutKnlType.getMainTypeTreeAuth',
                APfunId: 1,
                APlogType: this.$t('button.ser'),
                APsort: 'cmutKntypeCode',
                APorder: 'desc',
                APdata: JSON.stringify(data1),
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.knowledge_data = t.toTree2(res.data.content[0].value)
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        toTree2 (data) {
            data.forEach((item) => {
                item.expand = false
                item.checked = item.knowTypeStatus === '1'
                item.title = item.cmutKntypeName
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.cmutKntypePid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        expand2 () {  //  展开
            this.treeData(this.knowledge_data, 'expand', true)
        },
        disExpand2 () { //  收缩
            this.treeData(this.knowledge_data, 'expand', false)
        },
        allPick2 () { //  全选
            this.treeData2(this.knowledge_data, 'checked', true)
        },
        resetTree2 () { //  重置
            this.treeData2(this.knowledge_data, 'checked', false)
            this.treeData(this.knowledge_data, 'checked', false)
        },
        //  保存（工单类型）
        save2 () {
            const t = this
            const checkedId = []
            let ids = []
            for (let i = 0; i < t.$refs.knowledge_tree.flatState.length; i++) {
                if (t.$refs.knowledge_tree.flatState[i].node.indeterminate === true) {
                    ids.push({
                        knowid: t.$refs.knowledge_tree.flatState[i].node.id,
                        knowstate: 2,
                    })
                }
            }
            const checked = t.$refs.knowledge_tree.getCheckedNodes()
            for (let i = 0; i < checked.length; i++) {
                checkedId.push(checked[i].id)
            }
            for (let j = 0; j < checkedId.length; j++) {
                ids.push({
                    knowid: checkedId[j],
                    knowstate: 1,
                })
            }
            const data = {
                _mt: this.$global.mt + 'AuthRolePower.addOrUpdUserKnow',
                APfunId: '1',
                APcompanyId: '1',
                APlogType: '分配工单',
                APsysUserId: t.id,
                APdata: JSON.stringify(ids),
            }
            //      console.log(data)
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.savsuccess'),
                    })
                    //          t.$emit('closePower')
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleContextMenuAll (e) {
            console.log(this.contextData, "this.contextData")
            let id = this.contextData.id
            this.nice(this.dataTrees, id, 'checked', true)
        },
        nice (data, id, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data[i][item] = value
                    if (data[i].children !== undefined) {
                        t.treeData3(data[i].children, item, value)
                    }
                } else if (data[i].children !== undefined) {
                    t.nice(data[i].children, id, item, value)
                }
            }
        },
        treeData3 (data, item, value) {
            const t = this
            for (let i = 0; i < data.length; i++) {
                if (data[i].children !== undefined) {
                    t.treeData3(data[i].children, item, value)
                    data[i][item] = value
                } else {
                    data[i][item] = value
                }
            }
        },
        handleContextMenuAllcal (e) {
            console.log(this.contextData, "this.contextData")
            let id = this.contextData.id
            this.nice(this.dataTrees, id, 'checked', false)
        },
        handleContextMenu (data) {
            this.contextData = data;
        },
    },
}
</script>
<style lang="scss">
@import "../../../sass/table";
</style>
<style lang="scss" scoped>
/deep/ .el-tree-node__label {
    position: relative !important;
}
/deep/ .el-tree-node__label:before {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top: 0px;
    left: -24px;
    z-index: 999;
}
/deep/ .el-checkbox__inner {
    top: 0 !important;
}
.border_l {
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
}
.border_2 {
    max-height: 500px;
    padding-left: 6px;
    /*height: 750px;*/
    border-top: 2px solid rgba(9, 161, 252, 1);
    overflow: auto;
    position: relative;
}
.table-form {
    margin-bottom: 10px;
    font-size: 0;
}
.btn-group {
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 900px;
        max-height: 600px;
        background-color: #fff;
        padding: 50px 20px 10px 20px;
        border-radius: 10px;
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
//
@import "../../../sass/table.scss";
@import "../../../sass/searchTable.scss";
.searchInput {
    margin-right: 10px;
}
.ivu-btn {
    margin-right: 10px;
}
/deep/ .ivu-tree-title {
    width: auto !important;
}
</style>
