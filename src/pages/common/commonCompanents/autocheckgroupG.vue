<template>
    <div style="width: 100%"
         v-if="isshow"
         class="tag_box">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <CheckboxGroup v-model="thisValue"
                               @on-change="change">
                    <Checkbox v-for="(item, index) in data"
                              :key="index"
                              :label="item.code"
                              :disabled="thisDis">{{item.name}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
        </i-col>
        <i-col span="21"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    data () {
        return {
            thisValue: this.value,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
            data: [],
            checkKey: '',
            checkValue: ''
        }
    },
    props: {
        value: Array,
        itemLabel: String,
        message: String,
        ruleText: String,
        required: Boolean,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
        dataKey: String
    },
    methods: {
        change (value) {
            this.$emit('on-change', value)
        },
        change111 () {
            let t = this;
            t.$emit('change', t);
        },
        getColumn () {
            const t = this
            t.isSpin = true
            let data = {
                _mt: t.$global.mt + 'PlatAutoLayoutGetFlowList.getEditPopup',
                APlogType: 'getColumns',
                APid: t.dataKey
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    t.tbName = data.tbName;

                    t.checkKey = data.columns[0].key;
                    t.checkValue = data.columns[1].key;

                    t.param = {
                        _mt: t.$global.mt + t.tbName + ".getPage",
                        APsort: "id",
                        APorder: "asc",
                        AProws: 0,
                        APpage: 1,
                        APffk: `gep${t.dataKey}`
                    }
                    t.getData()
                }

            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getData () {
            const t = this
            t.isSpin = true
            let data = deepCopy(t.param);
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows;
                    t.data = t.data.map((item) => {
                        return {
                            code: item[t.checkKey],
                            name: item[t.checkValue],
                        };
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
            })
        },
    },
    mounted () {
        this.getColumn()
    },
    watch: {
        dataKey (val) {
            console.log(val, "val");
        },
        value: function (val) {
            this.thisValue = val;
        },
        thisValue (val) {
            val = val.toString()
            this.change(val)
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
            },
            deep: true,
        },
        dis: {
            handler: function (val) {
                this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
            },
            deep: true,
        },
    },
}
</script>
<style lang="scss" scoped>
.message {
    width: 100%;
    // border: 2px solid #f2f7fd;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #f2f7fd;
}
/deep/.ivu-checkbox-wrapper {
    margin-right: 25px;
}
</style>
