<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" fix v-if="spinShow"></Spin>
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
                    <FormItem :label="$t('lang_baseManage.baseCity.cityName')"
                              prop="cityName">
                        <Input v-model="formValidate.cityName"
                               :placeholder="$t('lang_baseManage.baseCity.cityNameDis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.cityTypeName')"
                              prop="cityType">
                        <Select v-model="formValidate.cityType"
                                @on-change="typeChange"
                                :placeholder="$t('lang_baseManage.baseCity.cityTypeNameDis')">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectCityType"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.cityCode1')"
                              prop="cityCode1">
                        <Input v-model="formValidate.cityCode1"
                               :placeholder="$t('lang_baseManage.baseCity.cityCode1Dis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.cityCode2')"
                              prop="cityCode2">
                        <Input v-model="formValidate.cityCode2"
                               :placeholder="$t('lang_baseManage.baseCity.cityCode2Dis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.cityCode3')"
                              prop="cityCode3">
                        <Input v-model="formValidate.cityCode3"
                               :placeholder="$t('lang_baseManage.baseCity.cityCode3Dis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem v-if="type !== 'none'"
                              :label="$t('lang_baseManage.baseCity.cityPname')"
                              prop="cityPname">
                        <span @dblclick="clearPid">
                            <Input v-model="formValidate.cityPname"
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_baseManage.baseCity.cityPnameDis')"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.cityIsvalidName')"
                              prop="cityIsvalid">
                        <RadioGroup v-model="formValidate.cityIsvalid" type="button" size="small">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in selectYesNo"
                                   :key="index">{{item.paramInfoCn}}</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <!--          <Col span="10" offset="1">-->
                    <!--          <FormItem :label="$t('lang_baseManage.baseCity.cityIssbName')" prop="cityIssb">-->
                    <!--            <RadioGroup v-model="formValidate.cityIssb">-->
                    <!--              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>-->
                    <!--            </RadioGroup>-->
                    <!--          </FormItem>-->
                    <!--          </Col>-->
                </Row>
                <Row>
                    <!--          <Col span="10" offset="1">-->
                    <!--          <FormItem :label="$t('lang_baseManage.baseCity.cityIshfName')" prop="cityIshf">-->
                    <!--            <RadioGroup v-model="formValidate.cityIshf">-->
                    <!--              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>-->
                    <!--            </RadioGroup>-->
                    <!--          </FormItem>-->
                    <!--          </Col>-->
                    <!--          <Col span="10" offset="1">-->
                    <!--          <FormItem :label="$t('lang_baseManage.baseCity.cityIstaxName')" prop="cityIstax">-->
                    <!--            <RadioGroup v-model="formValidate.cityIstax">-->
                    <!--              <Radio :label="item.paramCode" v-for="(item,index) in selectYesNo" :key="index">{{item.paramInfoCn}}</Radio>-->
                    <!--            </RadioGroup>-->
                    <!--          </FormItem>-->
                    <!--          </Col>-->
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseCity.comment')"
                              prop="comment">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_baseManage.baseCity.commentDis')"></Input>
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
                                    style="margin-left: 8px"
                                    :loading="isSpin"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        :searchText1="searchText1"
                        ref="searchCity"></searchCity>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchCity from '../../../components/searchTable/searchCity'

export default {
    data () {
        return {
            spinShow: false,
            isSpin: false,
            searchText1: '请选择上级地区',
            value: '',
            type: '',
            selectCityType: [],
            selectYesNo: [],
            updateImg: false,
            formValidate: {
                _mt:  this.$global.mt+'BaseCity.addOrUpd',
                funId: '1',
                cityName: '',
                cityCode1: '',
                cityCode2: '',
                cityCode3: '',
                cityPid: '',
                cityType: '',
                cityIsvalid: '1',
                cityIssb: '',
                cityIshf: '',
                cityIstax: '',
                comment: '',
                cityPname: ''
            },
            query: '',
            openPick: false,
            params: {
                _mt:  this.$global.mt+'BaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                logType: this.$t('button.ser'),
                data: '{}',
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
            ruleValidate: {
                cityName: [
                    { required: true, message: this.$t('lang_baseManage.baseCity.cityNameDis'), trigger: 'blur' },
                ],
                cityPname: [
                    { required: true, message: '请选择所属上级', trigger: 'change' },
                ],
                cityType: [
                    { required: true, message: this.$t('lang_baseManage.baseCity.cityTypeNameDis'), trigger: 'blur' },
                ],
            },
        }
    },
    components: {
        searchCity,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseCity.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.cityName = res.data.content[0].cityName
                    t.formValidate.cityCode1 = res.data.content[0].cityCode1
                    t.formValidate.cityCode2 = res.data.content[0].cityCode2
                    t.formValidate.cityCode3 = res.data.content[0].cityCode3
                    t.formValidate.cityType = res.data.content[0].cityType
                    t.typeChange(t.formValidate.cityType)
                    t.formValidate.cityPname = res.data.content[0].cityPname
                    t.formValidate.cityPid = res.data.content[0].cityPid
                    t.formValidate.cityIsvalid = res.data.content[0].cityIsvalid
                    t.formValidate.cityIssb = res.data.content[0].cityIssb
                    t.formValidate.cityIshf = res.data.content[0].cityIshf
                    t.formValidate.cityIstax = res.data.content[0].cityIstax
                    t.formValidate.comment = res.data.content[0].comment
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                this.spinShow = false
            })
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'citytype,yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectCityType = res.data.content[0].value[0].paramList
                    t.selectYesNo = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        render1 () {
            this.$Modal.confirm({
                ref: 'imgEdit',
                onOk: () => {
                    const formData = new FormData(document.getElementById('fileinput1'))
                    uploadimage(formData).then((res) => {
                        alert(res)
                    }).catch((res) => {
                        alert(res)
                    })
                },
                attrs: {
                    id: 'foo',
                },
                render: (h) => {
                    return h(imgEdit, {
                        props: {
                            value: this.value,
                        },
                        on: {
                            change: (val) => {
                                this.value = val
                            },
                        },

                    })
                },

            })
        },
        typeChange (value) {
            const t = this
            t.type = value
            if (value === '01prov') {
                t.formValidate.cityPid = '0'
                t.type = 'none'
            } else if (value === '02city') {
                t.type = '01prov'
            } else if (value === '03county') {
                t.type = '02city'
            }
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            data.cityIshf = data.cityIshf || 1
            data.cityIssb = data.cityIssb || 1
            data.cityIstax = data.cityIstax || 1
            data.cityIsvalid = data.cityIsvalid || 1
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        t.isSpin = false
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
                        t.isSpin = false
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
                    })
                }
            })
        },
        close () {
            const t = this
            //        t.params.sort = 'id'
            //        t.params.order = 'desc'
            //        t.params.rows = '10'
            //        t.params.page = '1'
            t.openPick = false
        },
        changeinput (name, id, type) {
            const t = this
            t.formValidate.cityPname = name
            t.formValidate.cityPid = id
        },
        pickData () {
            const t = this
            t.$refs.searchCity.getData(this.params, t.type)
            t.openPick = true
        },
        handleReset () {
            this.$emit('closeUp')
            this.$refs.formValidate.resetFields()
        },
        clearPid () {
            const t = this
            t.formValidate.cityPname = ''
            t.formValidate.cityPid = ''
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
/deep/ .ivu-radio-wrapper-checked{
    background: rgba(45, 140, 240, 1);
    color:#fff;
}
/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover{
    color:#fff;
}
</style>
