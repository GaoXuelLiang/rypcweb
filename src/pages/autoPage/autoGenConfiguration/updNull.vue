<template>
    <div class="cover">
        <div class="box">
             <Spin size="large" fix  v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;字段必填
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate"
                  :model="formValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="是否主键"
                              prop="isPrimaryKey">
                        <Checkbox v-model="formValidate.isPrimaryKey"></Checkbox>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="导入主键"
                              prop="isImpPk">
                        <Checkbox v-model="formValidate.isImpPk"></Checkbox>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="导入不能为null"
                              prop="isImpNotNull">
                        <Checkbox v-model="formValidate.isImpNotNull"></Checkbox>
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
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            spinShow: false,
            formValidate: {
                _mt:  this.$global.mt+'OrgUnits.addOrModifyOrgUnits',
                isPrimaryKey: '',
                isImpPk: '',
                isImpNotNull: '',
            },
        }
    },
    props: {
        ids: String,
        logType: String,
    },
    components: {
    },
    updated () {

    },
    methods: {
        handleReset () {
            this.$emit('closeUpdNull');
            this.formValidate.isPrimaryKey = false;
            this.formValidate.isImpPk = false;
            this.formValidate.isImpNotNull = false;
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            getDataLevelUserLoginNew({
                _mt:  this.$global.mt+'GenColumn.UpdOrimport',
                funId: '1',
                logType: "字段必填",
                statusbutton: 1,
                ids: this.ids,
                data: data
            }).then((res) => {
                try {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].value == '1') {
                            t.$emit('updNullChange')
                        }
                    }
                } catch (res) {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
</style>
