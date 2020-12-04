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
                    <Col span="10" offset="1">
                    <FormItem label="业务单位" prop="unitId">
                        <span @dblclick="dblClear">
                            <Input v-model="unitName"
                                class="sInput"
                                placeholder="请选择业务单位"
                                icon="ios-search"
                                :readonly="true"
                                @on-click="openUnit" />
                        </span>
                    </FormItem>
                    </Col>
                    <Col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platCalendar.year')"
                              prop="sYear">
                        <DatePicker v-model="formValidate.sYear" @on-change="selectYear" type="year" :placeholder="$t('lang_platform.platCalendar.cYear')"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platCalendar.month')">
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
        <transition name="fade">
            <searchUnit v-show="isUnit" 
                        ref="searchUnit" 
                        @closeUnit="closeUnit" 
                        @changeinput="changeinput"></searchUnit>
        </transition>
    </div>
</template>
<script>
import searchUnit from "@/components/searchTable/searchUnit"
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            formValidate: {
                _mt: this.$global.mt + 'PlatCalendar.Init',
                sYear: '',
                eYear: '',
                unitId: '',
            },
            isUnit: false,
            loading: false,
            unitName: '',
            ruleValidate: {
                sYear: [
                    { required: true, message: this.$t('lang_platform.platCalendar.cYear'), trigger: 'blur' },
                ],
                unitId: [
                    { required: true, message: '请选择业务单位', trigger: 'blur'}
                ]
            },
        }
    },
    props: {
        id: Number,
        logType: String,
    },
    components: {
        searchUnit
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
        openUnit () {
            const t = this;
            t.isUnit = true;
            t.$refs.searchUnit.getData();
        },
        closeUnit () {
            const t = this;
            t.isUnit = false;
        },
        changeinput (name,id) {
            const t = this;
            t.unitName = name;
            t.formValidate.unitId = id;
        },
        dblClear () {
            const t = this;
            t.unitName = '';
            t.formValidate.unitId = '';
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.APlogType = t.logType
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            let returnData = res.data.content[0].value;
                            if(returnData !== 1){
                                let warnText = returnData === 2 ? '月份' : '年份';
                                t.$Modal.confirm({
                                    title: this.$t('reminder.remind'),
                                    content: `该${warnText}已有日历数据，如果初始化将会覆盖，是否确认操作？`,
                                    okText: '确认',
                                    onOk: () => {
                                        const coverParams = deepCopy(t.formValidate);
                                        coverParams.APiscover = '1';
                                        getDataLevelUserLoginData(coverParams).then(res => {
                                            if(isSuccess(res, t)) {
                                                this.$Message.success('初始化成功');
                                                // setTimeout(() => {
                                                //     t.$Modal.remove();
                                                // },1000)
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
                                    onCancel: () => {}
                                })
                            }else {
                                t.handleReset();
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.initSuccess'),
                                })
                                t.$emit('getData')
                                t.$emit('getSelect')
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
            this.formValidate.sYear = '';
            this.formValidate.eYear = '';
            this.formValidate.unitId = '';
            this.unitName = ''
            this.$emit('closeUp')
            this.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
