<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix
                               v-if="spinShow"></Spin>
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
            <Row>
                <Form :model="form1"
                      ref="form1"
                      label-position="right"
                      :rules="ruleValidate"
                      :label-width="135">
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('lang_organization.popUp.dept')"
                               >
                                <Input v-model="form1.unitIdDis"
                                 :readonly="true"
                                    placeholder="请输入部门名称"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="10"
                               offset="1">
                            <FormItem :label="$t('lang_organization.popUp.post')">
                                <Input v-model="form1.postIdDis"
                                       icon="ios-search"
                                       :readonly="true"
                                       placeholder="请选择岗位名称"
                                       @on-click="selectPost"/>
                                <!--<Input v-model="platRolechildEmpidDis" icon="ios-search" :readonly="true" @on-click="pickGetData" placeholder="请选择员工"></Input>-->
                            </FormItem>
                        </i-col>
                    </Row>
                    <i-col span="21">
                        <FormItem :label="$t('lang_authorization.platRole.comment')"
                                  prop="comment">
                            <Input v-model="form1.Note"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_authorization.platRole.commentDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="21">
                        <row type="flex"
                             justify="end">
                            <FormItem label=""
                                      prop="comment">
                                <Button @click="close"
                                        style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        style="margin-left: 8px"
                                        :loading="isSpin"
                                        @click="save">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </row>
                    </i-col>
                </Form>
            </Row>
            <!-- <transition name="fade">
                <searchPost v-show="openManger"
                               :logType="logType1"
                               @closeManger="closeManger"
                               :searchMangerClo="searchMangerClo"
                               @inputManger="inputManger"
                               :params="paramsManger"
                               ref="searchManager"></searchPost>
            </transition> -->
            <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess, deepCopy } from '../../../../lib/util'
//import searchAPosition from '../../../../components/searchTable/searchAPosition'
import searchPost from '../../../../components/searchTable/searchPost'


export default {
    data () {
        return {
            spinShow: false,
            isSpin: false,
            isRe:false,
            openPost: false,
            platRolechildEmpidDis: '',
            openManger: false,
            //公司ID
            //postId:5,
            //岗位ID
            //unitId:7,
            form1:{
                unitIdDis:'',
                postIdDis:'',
                Note:''
            },
            form:{
                //unitIdDis:'人事岗',
                //postIdDis:this.unitsSname,
                postId:'',
                unitId:"",
                compPost:'',
                compPostPid:'',
                compCostcenter:'',
                compCostcenterPid:''
            },
            compDeptPid:'',
            logType1: this.$t('lang_authorization.platRole.searchColumn.title'),
            rolecontType: [],
            formEmpValidate:{
                compDeptPid:'',
            },
            ruleValidate: {
                platRolechildType: [
                    { required: true, message: this.$t('lang_authorization.platRole.platRolechildTypeDis'), trigger: 'blur' },
                ],
                platRolechildVailddate: [
                    { required: true, type: 'date', message: this.$t('lang_authorization.platRole.platRolechildVailddateDis'), trigger: 'change' },
                ],
            },
            paramsPost: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                rows: 11,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '岗位',
            },
            //      岗位
            searchPostClo: [
                // {
                //     title: this.$t('lang_employee.searchColumn.postCode'),
                //     key: 'postCode',
                //     sortable: 'custom',
                // },
                {
                    title: '岗位名称',
                    key: 'postFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                //            key: 'postFnameEnDis',
                //          },
            ],
            showDesc: false,
            rowId: '',
            searchMangerClo: [
                {
                    title: this.$t('lang_authorization.platRole.searchColumn.empCname'),
                    key: 'empCname',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_authorization.platRole.searchColumn.empGid'),
                    key: 'empGid',
                    sortable: 'custom',
                },
            ],
            paramsManger: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                logType: '员工查询',
                data: '{}',
            },
        }
    },
    props: {
        id: Number,
        unitsSname:String,
        logType: String,
    },
    watch:{
        unitsSname(val,oldval){
            this.form1.unitIdDis = val
            // if(val!==oldval){
            //     this.unitIdDis = val
            // }
            // if(val){
            //     this.isRe = true
            // }
            // debugger
        },
        id(val,oldval){
            this.form.unitId=val
            //debugger
        }
    },
    components: {
        searchPost,
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        setRowId (id) {
            const t = this
            t.rowId = id
            t.getdata(id)
            //debugger
        },
        // setIdname (idname) {
        //     const t = this
        //     t.form.cptcOptionDis = idname
        // },
        getdata (rowId) {
            const t = this
            t.spinShow = true
            const params = {
                _mt: 'orgUnitPostService.selectById',
                id: rowId,
                funId:'1',
                logType: '查询List信息',
            }
            getDataLevelUserLogin(params).then((res) => {
                if (isSuccess(res, t)) {
                    t.form1.unitIdDis = res.data.content[0].unitIdDis
                    t.form1.postIdDis = res.data.content[0].postIdDis
                    t.form1.Note =  res.data.content[0].comment
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false
            })
        },
        //  	岗位
        selectPost () {
            const t = this
            //console.log(this.unitsSname)
            // if (t.formEmpValidate.compDeptPid === '') {
            //     t.$Modal.warning({
            //         title: this.$t('reminder.remind'),
            //         content: this.$t('lang_employee.empmaster.empPostDis'),
            //     })
            // } else {
                const paramsPost = deepCopy(t.paramsPost)
                //paramsPost.postUnit = 'unit' + t.formEmpValidate.compDeptPid
                t.$refs.searchPost.getData(paramsPost)
                t.openPost = true
           // }
        },
        closePost () {
            const t = this
            t.$refs.searchPost.postCode = ''
            t.openPost = false
        },
        inputPost (name,  id, postName, postId,enName) {
            //debugger
            const t = this
            //t.form.compPost = name
            t.form.postId = id
            t.form1.postIdDis = enName
            //t.form.unitId = postId
        },
        save () {
            const t = this
            const params = deepCopy(t.form)
            params._mt = 'orgUnitPostService.addOrUpd'
            params.logType = this.$t('button.add')
            for (const dat in params) {
                if (t.rowId) {
                    params.logType = this.$t('button.y.upd')
                    params.id = t.rowId
                }
                if (params[dat] === '') {
                    delete params[dat]
                }
            }
            this.$refs.form1.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginNew(params).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            console.log(res,8989898989898989898)
                            t.close()
                            if(JSON.stringify(res.data.content[0]) == '{}'){
                                 t.$Modal.warning({
                                    title: '提示',
                                    content: '不可新增相同岗位',
                                })
                            }else if (!t.rowId) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                //              t.$refs.formValidate.resetFields()
                                t.$emit('getdata', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        t.isSpin = false
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        clear () {
            const t = this
            //t.form1.unitIdDis = ''
            t.form1.postIdDis = ''
            t.form1.Note = ''
            t.isRe = false
            t.$refs.form1.resetFields()
        },
        close () {
            this.$emit('hideMsg')
            this.clear()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../../sass/updateAndAdd.scss";
</style>
