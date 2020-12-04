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
                    <FormItem label='序号'
                              prop="pchOrder">
                        <Input v-model="formValidate.pchOrder"
                               placeholder="请输入序号"></Input>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label='通道名字'
                              prop="pchName">
                        <Input v-model="formValidate.pchName"
                               placeholder="请输入通道名字"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label='目标岗位1'
                              prop="pchTarget1">
                        <span @dblclick="clearUserid1">
                            <Input placeholder="请选择目标岗位1"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="pchTarget1Dis"
                                   @on-click="pickUserData(1)" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label='目标岗位2'
                              prop="pchTarget2">
                        <span @dblclick="clearUserid2">
                            <Input placeholder="请选择目标岗位2"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="pchTarget2Dis"
                                   @on-click="pickUserData(2)" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label='目标岗位3'
                              prop="pchTarget3">
                        <span @dblclick="clearUserid3">
                            <Input placeholder="请选择目标岗位3"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="pchTarget3Dis"
                                   @on-click="pickUserData(3)" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem label='目标岗位4'
                              prop="pchTarget4">
                        <span @dblclick="clearUserid4">
                            <Input placeholder="请选择目标岗位4"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="pchTarget4Dis"
                                   @on-click="pickUserData(4)" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label='目标岗位5'
                              prop="pchTarget5">
                        <span @dblclick="clearUserid5">
                            <Input placeholder="请选择目标岗位"
                                   icon="ios-search"
                                   :readonly="true"
                                   v-model="pchTarget5Dis"
                                   @on-click="pickUserData(5)" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label='通道描述'
                              prop="pchDesc">
                        <Input v-model="formValidate.pchDesc"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入通道描述"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                    <FormItem label='备注'
                              prop="pchRemark">
                        <Input v-model="formValidate.pchRemark"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21">
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
        <!-- <transition name="fade">
      <searchPost v-show="openPickUser" @closeEmp="closeEmp" @inputEmp="inputEmp" ref="searchPost"></searchPost>
    </transition> -->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         modiaContent="org-post-std-cl"
                         @changeinput="changeinput1"
                         urlType=''
                         dataType="row"
                         :dataParame="dataParame">
            <!-- :dataParame='dataParame' -->
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import valid from "../../../lib/pub_valid";
import searchPost from '../../../components/searchTable/searchPost'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'

export default {
    data () {
        return {
            isSpin: false,
            selectType: [],
            id: Number,
            seq: Number,
            showModal: false,
            openPickUser: false,
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: '',
            dataParame: {
                postDfpslevel: '',
            },
            formValidate: {
                _mt:  this.$global.mt+'OrgPostchannel.addOrUpd',
                funId: '',
                pchOrder: '',
                pchName: '',
                pchTarget1: '',
                pchTarget2: '',
                pchTarget3: '',
                pchTarget4: '',
                pchTarget5: '',
                pchDesc: '',
                pchRemark: '',
            },
            pchTarget1Dis: '',
            pchTarget2Dis: '',
            pchTarget3Dis: '',
            pchTarget4Dis: '',
            pchTarget5Dis: '',
            ruleValidate: {
                pchOrder: [
                    { required: true, message: '输入编号', trigger: 'blur' },
                ],
                pchName: [
                    { required: true, message: '通道名字', trigger: 'blur' },
                ],
                pchTarget1: [
                    { required: true, message: '目标岗位1', trigger: 'change' },
                ],
            },
        };
    },
    props: {
        logType: String
    },
    components: {
        searchPost
    },
    updated () { },
    mounted () { },
    methods: {
        getData (id) {
            const t = this;
            if (id) {
                t.id = id;
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'OrgPostchannel.getById',
                    logType: this.$t("button.y.upd"),
                    id: id
                })
                    .then(res => {
                        if (isSuccess(res, t)) {
                            t.formValidate = res.data.content[0] || []
                            t.pchTarget1Dis = res.data.content[0].pchTarget1Dis
                            t.pchTarget2Dis = res.data.content[0].pchTarget2Dis
                            t.pchTarget3Dis = res.data.content[0].pchTarget3Dis
                            t.pchTarget4Dis = res.data.content[0].pchTarget4Dis
                            t.pchTarget5Dis = res.data.content[0].pchTarget5Dis
                            t.level1 = res.data.content[0].pchTargetpslevel
                            t.level2 = res.data.content[0].pchTarget1pslevel
                            t.level3 = res.data.content[0].pchTarget2pslevel
                            t.level4 = res.data.content[0].pchTarget3pslevel
                            t.level5 = res.data.content[0].pchTarget4pslevel
                            t.formValidate._mt =  this.$global.mt+'OrgPostchannel.addOrUpd'
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
        handleSubmit () {
            const t = this;
            const data = deepCopy(t.formValidate);
            data.logType = t.logType;
            data.pchBillid = this.$store.state.user.masterPublicId
            if (t.logType === this.$t("button.y.upd")) {
                data.id = t.id;
            }
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                    t.isSpin = true
                    if (t.logType === "修改") {
                        data.id = t.id;
                    } else {
                        delete data.id;
                    }
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            t.isSpin = false
                            if (isSuccess(res, t)) {
                                if (t.logType === this.$t("button.add")) {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.addsuccess")
                                    });
                                    t.$refs.formValidate.resetFields();
                                    t.$emit("getData", res.data.content[0]);
                                } else {
                                    t.$Modal.success({
                                        title: this.$t("reminder.suc"),
                                        content: this.$t("reminder.updsuccess")
                                    });
                                    t.$emit("update", res.data.content[0]);
                                }
                                t.handleReset()
                            }
                        })
                        .catch(() => {
                            t.isSpin = false
                            this.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
                    })
                }
            });
        },
        handleReset () {
            this.pchTarget1Dis = '';
            this.pchTarget2Dis = '';
            this.pchTarget3Dis = '';
            this.pchTarget4Dis = '';
            this.pchTarget5Dis = '';
            this.level1 = ''
            this.level2 = ''
            this.level3 = ''
            this.level4 = ''
            this.level5 = ''
            this.$emit("closeUpd");
            this.$refs.formValidate.resetFields();
        },
        closeEmp () {
            const t = this
            t.openPickUser = false
        },
        inputEmp (row) {
            const t = this
            t.formValidate.pchTarget1 = row.postCode;
            t.pchTarget1Dis = row.postFnameDis;
            t.formValidate.pchTarget2 = row.postCode; // 岗位编码
            t.pchTarget2Dis = row.postFnameDis; // 岗位名称
            t.formValidate.pchTarget3 = row.postCode;
            t.pchTarget3Dis = row.postFnameDis;
            t.formValidate.pchTarget4 = row.postCode;
            t.pchTarget4Dis = row.postFnameDis;
            t.formValidate.pchTarget5 = row.postCode;
            t.pchTarget5Dis = row.postFnameDis;
        },
        pickUserData (type) {
            const t = this
            if (type === 1) {
                t.seq = 1
                if (!t.level1) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("当前岗位未定义岗位级别，无法建立通道，请前往设置！")
                    })
                    return
                }
                t.dataParame.postDfpslevel = t.level1
            } else if (type === 2) {
                if (!t.level2) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("请先选择正确的目标岗位1！")
                    })
                    return
                }
                t.seq = 2
                t.dataParame.postDfpslevel = t.level2
            } else if (type === 3) {
                if (!t.level3) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("请先选择正确的目标岗位2！")
                    })
                    return
                }
                t.seq = 3
                t.dataParame.postDfpslevel = t.level3
            } else if (type === 4) {
                if (!t.level4) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("请先选择正确的目标岗位3！")
                    })
                    return
                }
                t.seq = 4
                t.dataParame.postDfpslevel = t.level4
            } else if (type === 5) {
                if (!t.level5) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("请先选择正确的目标岗位4！")
                    })
                    return
                }
                t.seq = 5
                t.dataParame.postDfpslevel = t.level5
            }
            t.showModal = true
        },
        clearUserid1 () {
            const t = this
            t.formValidate.pchTarget1 = ''
            t.pchTarget1 = ''
            t.pchTarget1Dis = ''
            t.level2 = ''
            t.clearUserid2()
        },
        clearUserid2 () {
            const t = this
            t.formValidate.pchTarget2 = ''
            t.pchTarget2 = ''
            t.pchTarget2Dis = ''
            t.level3 = ''
            t.clearUserid3()
        },
        clearUserid3 () {
            const t = this
            t.formValidate.pchTarget3 = ''
            t.pchTarget3 = ''
            t.pchTarget3Dis = ''
            t.level4 = ''
            t.clearUserid4()
        },
        clearUserid4 () {
            const t = this
            t.formValidate.pchTarget4 = ''
            t.pchTarget4 = ''
            t.pchTarget4Dis = ''
            t.level5 = ''
            t.clearUserid5()
        },
        clearUserid5 () {
            const t = this
            t.formValidate.pchTarget5 = ''
            t.pchTarget5 = ''
            t.pchTarget5Dis = ''
        },
        /*
         弹出选择
        */
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            if (this.seq === 1) {
                this.pchTarget1Dis = row.postFnameDis
                this.formValidate.pchTarget1 = row.id
                if (this.level2 && this.level2 < row.postDfpslevel) {
                    this.clearUserid2()
                    this.clearUserid3()
                    this.clearUserid4()
                    this.clearUserid5()
                }
                this.level2 = row.postDfpslevel
            }
            if (this.seq === 2) {
                this.pchTarget2Dis = row.postFnameDis
                this.formValidate.pchTarget2 = row.id
                if (this.level3 && this.level3 < row.postDfpslevel) {
                    this.clearUserid3()
                    this.clearUserid4()
                    this.clearUserid5()
                }
                this.level3 = row.postDfpslevel
            }
            if (this.seq === 3) {
                this.pchTarget3Dis = row.postFnameDis
                this.formValidate.pchTarget3 = row.id
                if (this.level4 && this.level4 < row.postDfpslevel) {
                    this.clearUserid4()
                    this.clearUserid5()
                }
                this.level4 = row.postDfpslevel
            }
            if (this.seq === 4) {
                this.pchTarget4Dis = row.postFnameDis
                this.formValidate.pchTarget4 = row.id
                if (this.level5 && this.level5 < row.postDfpslevel) {
                    this.clearUserid5()
                }
                this.level5 = row.postDfpslevel
            }
            if (this.seq === 5) {
                this.pchTarget5Dis = row.postFnameDis
                this.formValidate.pchTarget5 = row.id
            }
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
