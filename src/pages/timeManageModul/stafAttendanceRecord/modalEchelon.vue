<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"
                          style="margin-right: 10px;"></Icon>&nbsp;梯队库
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="18"></Icon>
                </Button>
            </div>
            <div ref="scrollBox"
                 style="max-height: 410px;">
                <Form class="content"
                      ref="upFormData"
                      :model="upFormData"
                      :rules="ruleValidate"
                      :label-width="135">
                    <Row>
                        <!--<i-col span="22" >-->
                        <!--<FormItem label="异常考勤" prop="tempSet">-->
                        <!--<span @dblclick="dbclick('tempSet')">-->
                        <!--<Input v-model="formView.tempSetDis" style="width: 100%;;"  icon="ios-search" :readonly="true" placeholder='请选择异常考勤'  @on-click="opencompetType('tempSet')"/>-->
                        <!--</span>-->
                        <!--</FormItem>-->
                        <!--</i-col>-->
                        <i-col span="22">
                            <FormItem label="异常考勤"
                                      prop="tempSet">
                                <span @dblclick="dbclick('tempSet')">
                                    <Input v-model="formView.tempSetDis"
                                           style="width: 100%;;"
                                           icon="ios-search"
                                           :readonly="true"
                                           placeholder='请选择异常考勤'
                                           @on-click="pickDataTeam" />
                                </span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="22">
                            <FormItem label="梯队类型"
                                      prop="name1">
                                <Select style="width: 100%;"
                                        placeholder="请选择梯队类型"
                                        v-model="upFormData.name1"
                                        clearable
                                        @on-change="selectChange">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in list"
                                            :key="index">{{item.paramInfoName}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <i-col span="22">
                            <Row type="flex"
                                 justify="end">
                                <FormItem>
                                    <Button @click="handleReset"
                                            style="margin-left: 8px">关闭</Button>
                                    <Button :loading="loading1"
                                            type="info"
                                            @click="handleSubmit">确认</Button>
                                </FormItem>
                            </Row>
                        </i-col>
                    </Row>

                </Form>
            </div>
        </div>
        <!-- 弹出搜索 -->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         @changeinput="changeinput1"
                         :dataParame="dataParame"
                         dataType='row'
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import valid from '../../../lib/pub_valid'
import { isSuccess, deepCopy } from '../../../lib/util'
export default {
    data () {
        return {
            showModal1: false,
            talentNum: '',
            showModal: false, // 弹出搜索
            modiaContent: '',
            dataParame: {},
            id: '',
            upFormData: {
                talentCurper: '',
                name1: '',
                tempSet: '',
                name2: '',
            },
            formView: {
                type: '',
                tempSetDis: '',
                talentCurperDis: '',
            },
            list: [], // 盘点年度
            ruleValidate: {
                talentCurper: [
                    { required: true, message: '请选择储备人员', trigger: 'change' },
                ],
                name1: [
                    { required: true, message: '请选择梯队类型', trigger: 'change' },
                ],
                tempSet: [
                    { required: true, message: '请选择关键岗位', trigger: 'change' },
                ],
                name2: [
                    { required: true, message: '请选择目标梯队', trigger: 'change' },
                ],
            },
            linkid: [],
            tempSet: '',
            loading1: false,
        }
    },
    props: {
    },
    components: {
    },
    mounted () {

    },
    methods: {
        handleSubmit () {
            const t = this
            const data = {
                _mt: 'cfldtalentEchelon.setechelonLibUp',
                logType: '梯队库更新',
                talentCurper: t.linkid.toString(),
                talentType: t.upFormData.name1,
                talentPost: t.upFormData.tempSet,
                level: t.upFormData.name2,
            }
            // for (const dat in data) {
            //   if (data[dat] === '') {
            //     delete data[dat]
            //   }
            // }
            this.$refs.upFormData.validate((valid) => {
                if (valid) {
                    t.loading1 = true
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.loading1 = false
                        if (isSuccess(res, t)) {
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: '更新成功',
                            })
                            this.$emit('getData')
                            t.handleReset()
                        }
                    }).catch(() => {
                        t.loading1 = false
                        //              t.$Modal.warning({
                        //                title: this.$t('reminder.err'),
                        //                content: this.$t('reminder.errormessage'),
                        //              })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        // tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
                    })
                }
            })
        },
        // 关闭弹窗
        handleReset () {
            const t = this
            this.$refs.upFormData.resetFields()
            this.upFormData = {
                name1: '',
                name2: '',
                tempSet: '',
            }
            this.formView = {
                type: '',
                tempSetDis: '',
            }
            this.$emit('closeEchelon')
        },
        // 下拉
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.list = res.data.content[0].value[0].paramList || []
                }
            }).catch(() => {
                this.$Modal.warning({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        selectChange (value) {
            this.upFormData.tempSet = ''
            this.formView.tempSetDis = ''
        },
        /*
       *  弹出选择
       */
        opencompetType (type) {
            const t = this
            t.modiaContent = 'training-needs-company'
            t.formView.type = type
            switch (type) {
                case 'tempSet':
                    if (t.upFormData.name1 === '01cruxpost') {
                        t.dataParame = {
                        }
                        t.modiaContent = 'talent-system-Cruxpost'
                    } else {
                        t.dataParame = {
                        }
                        t.modiaContent = 'base-choose-job'
                    }
                    break
            }
            t.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            switch (t.formView.type) {
                case 'tempSet':
                    if (t.upFormData.name1 === '01cruxpost') {
                        t.setData(t.formView.type, t.formView.type + 'Dis', row.id, row.cruxShortname)
                    } else {
                        t.setData(t.formView.type, t.formView.type + 'Dis', row.id, row.postShort)
                    }
                    break
            }
        },
        setData (type, typeDis, NewId, name) {
            this.upFormData[type] = NewId
            this.formView[typeDis] = name
        },
        dbclick (type) {
            this.upFormData[type] = ''
            this.formView[type + 'Dis'] = ''
        },
        dbclickEmp () {
            this.upFormData.talentCurper = ''
            this.formView.talentCurperDis = ''
            this.linkid = ''
        },
        hideMsg () {
            let t = this
            t.showModal1 = false
        },

    },
}
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
        width: 600px;
        background-color: #fff;
        padding: 60px 20px 10px 20px;
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
            .last_modul {
                border-bottom: 1px dashed #dedede;
                padding-bottom: 15px;
            }
            .edu-button {
                text-align: center;
                div {
                    display: inline-block;
                    padding: 10px 50px;
                    background-color: #f9f9f9;
                    border-radius: 5px;
                    cursor: pointer;
                    color: #bf0008;
                }
            }
        }
    }
}
</style>
