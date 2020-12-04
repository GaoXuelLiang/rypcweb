<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpminfo.paramTypeDis')"
                              prop="paramType">
                        <span @dblclick="dubClear">
                            <Input v-model="paramTypeDis"
                                   :disabled="logType === $t('button.y.upd')? true : false "
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_role.adminpminfo.pparamName')"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpminfo.paramCode')"
                              prop="paramCode">
                        <!-- <span @dblclick="clearParamCode">
                            <Input v-model="formValidate.paramCode"
                                :disabled="logType === $t('button.y.upd')? true : false "
                                icon="ios-search"
                                :readonly="true"
                                :placeholder="$t('lang_role.adminpminfo.pparamCode')"
                                @on-click="pickData('paramCode')"></Input>
                        </span> -->
                         <Input v-model="formValidate.paramCode"
                               :placeholder="$t('lang_role.adminpminfo.pparamCode')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpminfo.paramInfoName')"
                              prop="paramInfoName">
                        <Input v-model="formValidate.paramInfoName"
                               :placeholder="$t('lang_role.adminpminfo.pparamInfoName')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpminfo.paramInfoEn')"
                              prop="paramInfoEname">
                        <Input v-model="formValidate.paramInfoEname"
                               
                               :placeholder="$t('lang_role.adminpminfo.pparamInfoEn')" />
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpminfo.paramInfoEn')"
                              prop="paramInfoEn">
                        <Input v-model="formValidate.paramInfoEn"
                                disabled
                               :placeholder="$t('lang_role.adminpminfo.pparamInfoEn')"></Input>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem :label="$t('lang_role.adminpmtype.comment')"
                              prop="desc">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_role.adminpmtype.pcomment')"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    @click="handleSubmit"
                                    style="margin-left: 8px">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <transition name="fade">
        <searchZHAndEn v-show="openPick0"
                        :searchText1="searchText01"
                        :searchText2="searchText02"
                        :searchTitle="searchTitle0"
                        :searchCloumns="searchCloumns0"
                        :params="params0"
                        @closeUp="closeTable"
                        @changeinput="changeinput0"
                        ref="searchZHAndEn"></searchZHAndEn>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="close"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchZHAndEn from '../../../components/searchTable/searchZHAndEn'
import searchTable from '../../../components/searchTable/searchParamType'

export default {
    data () {
        return {
            spinShow: false,
            formValidate: {
                _mt:  this.$global.mt+'BaseParamInfo.addOrUpdBaseParamInfo',
                funId: '1',
                companyId: '1',
                paramType: '',
                paramCode: '',
                paramInfoName: '',
                paramInfoCn: '',
                paramInfoEn: '',
                comment: '',
                paramInfoEname:''
            },
            openPick: false,
            openPick0:false,
            paramTypeDis: '',
            ruleValidate: {
                paramType: [
                    { required: true, message: this.$t('lang_role.adminpminfo.pparamName'), trigger: 'blur' },
                ],
                paramCode: [
                    { required: true, message: this.$t('lang_role.adminpminfo.pparamCode'), trigger: 'blur' },
                ],
                paramInfoName: [
                    { required: true, message: this.$t('lang_role.adminpminfo.pparamInfoName'), trigger: 'blur' },
                ],
            },
            searchCloumns0: [
                {
                    title: this.$t('lang_sysform.promCloumns.lanCode'),
                    key: 'lanCode',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanCn'),
                    key: 'lanCn',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanEn'),
                    key: 'lanEn',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchTitle0: this.$t('lang_sysform.promCloumns.title'),
            searchText01: this.$t('lang_sysform.promCloumns.searchText2'),
            searchText02: this.$t('lang_sysform.promCloumns.searchText3'),
            params0: {
                _mt:  this.$global.mt+'BaseLang.getPage',
                sort: 'lanCode',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
        }
    },
    components: {
        searchTable,
        searchZHAndEn
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (id) {
            //debugger
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getParamInfoById',
                id: id,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.paramType = res.data.content[0].paramType
                    t.paramTypeDis = res.data.content[0].paramTypeDis
                    t.formValidate.paramCode = res.data.content[0].paramCode
                    t.formValidate.paramInfoName = res.data.content[0].paramInfoName
                    t.formValidate.comment = res.data.content[0].comment
                    // t.formValidate.paramInfoEn = res.data.content[0].paramInfoEn
                    // t.formValidate.paramInfoCn = res.data.content[0].paramInfoCn
                    t.formValidate.paramInfoEname = res.data.content[0].paramInfoEname
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        dubClear () {
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.paramTypeDis = ''
                t.formValidate.paramTypeDis = ''
            }
        },
        close () {
            const t = this
            t.openPick = false
            t.$refs.searchTable.pmtypeCode = ''
        },
        closeTable(){
            const t = this
            t.openPick0 = false
        },
        changeinput0(row){
            const t = this
            t.formValidate.paramCode = row.lanCode
            t.formValidate.paramInfoCn = row.lanCn
            t.formValidate.paramInfoEn =  row.lanEn
        },
        changeinput (name, id) {
            const t = this
            t.paramTypeDis = name
            t.formValidate.paramType = id
        },
        pickData (param) {
            const t = this
            if(param==='paramCode'){
                if (t.logType !== this.$t('button.y.upd')) {
                    t.$refs.searchZHAndEn.getData(this.params0)
                    t.openPick0 = true
                }
            } else {
                if (t.logType !== this.$t('button.y.upd')) {
                    t.$refs.searchTable.getData()
                    t.openPick = true
                }
            }
        },
        clearParamCode(){
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.formValidate.paramCode = ''
                t.formValidate.paramInfoCn = ''
                t.formValidate.paramInfoEn = ''
            }
        },
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
        },
    },
    watch: {},
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
