<template>
    <div class="cover">
        <div class="box">
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
                    <Col span="10">
                    <FormItem :label="$t('lang_platform.platCalendar.year')"
                              prop="sYear">
                        <!-- <Input v-model="formValidate.sYear"
                               :placeholder="$t('lang_platform.platCalendar.sYearDis')"></Input> -->
                        <DatePicker v-model="formValidate.sYear" @on-change="selectYear" type="year" :placeholder="$t('lang_platform.platCalendar.cYear')"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_platform.platCalendar.month')">
                        <!-- <Input v-model="formValidate.eYear"
                               :placeholder="$t('lang_platform.platCalendar.sYearDis')"></Input> -->
                        <Select v-model="formValidate.eYear">
                            <Option value="01">01</Option>
                            <Option value="02">02</Option>
                            <Option value="03">03</Option>
                            <Option value="04">04</Option>
                            <Option value="05">05</Option>
                            <Option value="06">06</Option>
                            <Option value="07">07</Option>
                            <Option value="08">08</Option>
                            <Option value="09">09</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                        </Select>
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
                                    style="margin-left: 8px"
                                    @click="handleSubmit">{{$t('button.gen')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            formValidate: {
                _mt: this.$global.mt + 'PlatCalendar.Init',
                sYear: '',
                eYear: '',
            },
            ruleValidate: {
                sYear: [
                    { required: true, message: this.$t('lang_platform.platCalendar.cYear'), trigger: 'blur' },
                ],
                // eYear: [
                //     { required: true, message: this.$t('lang_platform.platCalendar.eYearDis'), trigger: 'blur' },
                // ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
    },
    updated () {

    },
    mounted () {
    },
    methods: {
        // 选择年份
        selectYear (year) {
            console.log(year);
            const t = this;
            t.formValidate.sYear = year;
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.APlogType = t.logType
            // console.log(this,"this")
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    // getDataLevelUserLoginData(data).then((res) => {
                    //     if (isSuccess(res, t)) {
                    //         this.$refs.formValidate.resetFields()
                    //         t.$emit('closeUp')
                    //         t.$Modal.success({
                    //             title: this.$t('reminder.suc'),
                    //             content: this.$t('reminder.initSuccess'),
                    //         })
                    //         t.$emit('getData')
                    //         t.$emit('getSelect')
                    //     }
                    // }).catch(() => {
                    //     this.$Modal.error({
                    //         title: this.$t('reminder.err'),
                    //         content: this.$t('reminder.errormessage'),
                    //     })
                    // })
                    data.APiscover = ""
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (res.data.content[0].value === 1) {
                                this.$refs.formValidate.resetFields()
                                t.$emit('closeUp')
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.initSuccess'),
                                })
                                t.$emit('getData')
                                t.$emit('getSelect')
                            } else if (res.data.content[0].value === 2) {
                                t.$Modal.confirm({
                                    title: this.$t('reminder.remind'),
                                    content: "该年月数据已存在，是否覆盖数据重新初始化！",
                                    onOk: () => {
                                    const datas = deepCopy(t.formValidate)
                                    datas.APiscover = "2"
                                    getDataLevelUserLoginData(datas).then((res) => {
                                        if (isSuccess(res, t)) {
                                            t.$emit('closeUp')
                                            // t.$Modal.success({
                                            //     title: this.$t('reminder.suc'),
                                            //     content: this.$t('reminder.initSuccess'),
                                            // })
                                            this.$Message.success('初始化成功');
                                            t.handleReset();
                                            t.$emit('getData')
                                            t.$emit('getSelect')
                                        }
                                        }).catch(() => {
                                            t.$Modal.error({
                                            title: this.$t('reminder.err'),
                                            content: this.$t('reminder.errormessage'),
                                            })
                                        })
                                    },
                                    onCancel: () => {},
                                })
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
        handleReset () {
            this.$emit('closeUp')
            this.formValidate.sYear = "";
            this.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
