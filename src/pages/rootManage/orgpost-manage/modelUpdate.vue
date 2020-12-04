<template>
    <div class="cover">
        <div class="box">
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
            <Form ref="formValidate"
                  :rules="ruleValidate"
                  :model="formValidate"
                  :label-width="135">
                <Row>
                    <Col span="11">
                    <FormItem label='胜任指标编号'
                              prop="pqdIndexno">
                        <span @dblclick="clearid">
                            <Input placeholder="胜任指标编号"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="formValidate.pqdIndexno"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label="胜任指标类型"
                              prop="pqdIndiType">
                        <Input v-model="formValidate.pqdIndiType"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label="胜任指标名称"
                              prop="pqdIndiName">
                        <Input v-model="formValidate.pqdIndiName"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label="胜任指标描述"
                              prop="pqdIndiDec">
                        <Input v-model="formValidate.pqdIndiDec"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label="关键行为描述"
                              prop="pqdIndiActionDec">
                        <Input v-model="formValidate.pqdIndiActionDec"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label="胜任能力等级"
                              prop="pqdLevel">
                        <Select v-model="formValidate.pqdLevel"
                                placeholder="选择胜任能力等级">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectExpreReq"
                                    :key="index">{{item.paramInfoName}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label='备注'
                              prop="pqdRemark">
                        <Input v-model="formValidate.pqdRemark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    :loading="isSpin"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <transition name="fade">
            <searchEmpMaster v-show="openPickUser"
                             @closeEmp="closeEmp"
                             @inputEmp="inputEmp"
                             ref="searchEmpMaster"></searchEmpMaster>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import valid from "../../../lib/pub_valid";
import searchEmpMaster from '../../../components/searchTable/searchOrgCompetNew'

export default {
    components: {
        searchEmpMaster,
    },
    data () {
        return {
            isSpin: false,
            selectType: [],
            id: Number,
            selectExpreReq: [],
            openPickUser: false,
            formValidate: {
                _mt:  this.$global.mt+'OrgPostqualifiedmodel.addOrUpd',
                funId: '',
                pqdIndexno: '', //胜任指标编号
                pqdIndiType: '', // 胜任指标类型
                pqdIndiName: '',// 胜任指标名称
                pqdIndiDec: '', // 胜任指标描述
                pqdIndiActionDec: '', //关键行为描述
                pqdLevel: '', //胜任能力等级
                pqdRemark: '', // 备注
            },
            pqdIndiTypeDis: '',
            ruleValidate: {
                pqdIndexno: [
                    { required: true, message: '请选择胜任指标编号', trigger: 'change' }
                ],
                pqdLevel: [
                    { required: true, message: '请选择胜任能力等级', trigger: 'blur' }
                ],
            },
        };
    },
    props: {
        logType: String
    },
    updated () { },
    mounted () {
        this.getSelect()
    },
    methods: {
        getData (id) {
            const t = this;
            if (id) {
                t.id = id;
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'OrgPostqualifiedmodel.getById',
                    logType: this.$t("button.y.upd"),
                    funId: '',
                    id: id
                })
                    .then(res => {
                        if (isSuccess(res, t)) {
                            t.formValidate = res.data.content[0];
                            t.formValidate._mt =  this.$global.mt+'OrgPostqualifiedmodel.addOrUpd'
                        }
                    })
                    .catch(() => {
                        this.$Modal.error({
                            title: this.$t("reminder.err"),
                            content: this.$t("reminder.errormessage")
                        });
                    });
            }
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'grade',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectExpreReq = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this;
            const data = deepCopy(t.formValidate);
            data.logType = t.logType;
            if (t.logType === this.$t("button.y.upd")) {
                data.id = t.id;
            }
            console.log(data)
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                    t.isSpin = true
                    console.log(data)
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            t.isSpin = false
                            if (isSuccess(res, t)) {
                                t.$emit("closeUp");
                                if (t.logType === this.$t("button.add")) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$refs.formValidate.resetFields()
                                    t.$emit("getData", res.data.content[0])
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    t.$emit("update", res.data.content[0])
                                }
                                t.$refs.formValidate.resetFields()
                            }
                        })
                        .catch(() => {
                            t.isSpin = false
                            this.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                }
            });
        },
        handleReset () {
            this.$emit("closeUp");
            this.$refs.formValidate.resetFields();
        },
        pickData () {
            const t = this;
            t.$refs.searchEmpMaster.getData(1);
            t.openPickUser = true;
        },
        clearid () {
            const t = this
            t.formValidate.pqdIndexno = ''
            t.formValidate.pqdIndiType = ''
            t.pqdIndiTypeDis = ''
            t.formValidate.pqdIndiName = ''
            t.formValidate.pqdIndiDec = ''
            t.formValidate.pqdIndiActionDec = ''
            t.formValidate.pqdLevel = ''
            t.formValidate.pqdRemark = ''
        },
        closeEmp () {
            const t = this
            t.openPickUser = false
        },
        inputEmp (row) {
            const t = this
            t.formValidate.pqdIndexno = row.competNo
            t.formValidate.pqdIndiType = row.competType
            t.pqdIndiTypeDis = row.competTypeDis
            t.formValidate.pqdIndiName = row.competName
            t.formValidate.pqdIndiDec = row.competContent
            t.formValidate.pqdIndiActionDec = row.competBehavior
        },
    }
};
</script>
<style lang="scss" scoped>
.cover {
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
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .form {
            max-height: 800px;
            overflow-y: auto;
        }
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
        .content {
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
