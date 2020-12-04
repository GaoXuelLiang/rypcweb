<template>
    <div class="cover">
        <div class="box"
             style="padding-bottom:20px;">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{$t('button.exp')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div style="padding-bottom:6px;margin-bottom:6px;">
                <Checkbox :indeterminate="indeterminate"
                          :value="checkAll"
                          border
                          @click.prevent.native="handleCheckAll">{{$t('lang_fileOperation.export.selectAll')}}</Checkbox>
            </div>
            <CheckboxGroup v-model="expDisFields"
                           @on-change="checkAllGroupChange"
                           style="margin:10px 0 20px;width: 100%">
                <Checkbox v-for="(item, index) in expDataTital"
                          :key="index"
                          :label="item.code+','+item[name]"
                          style="margin:10px 10px 10px 0;min-width: 16%;">{{item[name]}}</Checkbox>
            </CheckboxGroup>
            <Button type="primary"
                    @click="handleSubmit"
                    :loading="loading"
                    style="float: right;width:56px;"><span v-show="!loading">{{$t('button.exp')}}</span></Button>
        </div>
    </div>
</template>
<script>
// import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../axios/axios'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            expDisFields: [],
            filekey: '',
            filename: '',
            tedata: [],
            checkAll: false,
            indeterminate: false,
            ruleValidate: {
            },
            expDataTital: [],
            normal:false,
            methods: '',
            name:'name',
            loading: false,
        }
    },
    props: {
        id: Array,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (methods, tedata, expDataTital) {
            // console.log(methods, tedata, expDataTital, "expDataTitalexpDataTital")
            if(expDataTital && expDataTital !== '') {
                this.expDataTital = expDataTital;
                this.normal = true;
                this.name = 'name';
            }else {
                this.name = 'cName';
                getDataLevelUserLoginData({
                    _mt:this.$global.mt + 'PlatAutoLayoutGetEdit.getExportColumn',
    
                }).then(res => {
                    if(isSuccess(res, this)){

                        this.expDataTital = JSON.parse(res.data.content[0].value) 
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
            this.methods = methods
            this.tedata = tedata
        },
        handleSubmit1 (expDisFields, methods, tedata) {

            this.expDisFields = expDisFields
            this.methods = methods
            this.tedata = tedata
            this.handleSubmit()
        },
        handleSubmit () {

            const t = this
            t.loading = true;
            const tedata = this.tedata
            tedata.salbId = this.id.join()
            for (const dat in tedata) {
                if (tedata[dat] === '') {
                    delete tedata[dat]
                }
            }
            const fields = t.expDisFields.join(';')
            let expCode = [];
            expCode = t.expDisFields.map( item => {
                return item.split(',')[0]
            })
            let data = {
                _mt: this.methods,
                // salbId: this.id.join(),
                // APids: this.id.join(),
                // APlogType: this.$t('button.exp'),
                APexpFields:expCode.join(','),
                APexpDisFields: fields,//t.expDisFields.join(';'),
                APdata: JSON.stringify(tedata),
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.APexpDisFields) {
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.loading = false;
                        t.filekey = res.data.content[0].filekey
                        t.filename = res.data.content[0].filename
                        t.$emit('setFileKey', t.filekey, t.filename, true)
                        t.handleReset()
                    }else{
                        t.loading = false;
                    }
                }).catch(() => {
                    t.loading = false;
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                }).finally(()=>{

                })
            } else {
                t.loading = false;
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.exportErr'),
                })
            }
        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false
            } else {
                this.checkAll = !this.checkAll
            }
            this.indeterminate = false

            if (this.checkAll) {
                this.expDisFields = this.expDataTital.map(item => {
                    let name = this.normal?item.name:item.cName;
                    return item.code + ',' + name
                })
            } else {
                this.expDisFields = []
            }
        },
        checkAllGroupChange (data) {
            if (data.length === this.expDataTital.length) {
                this.indeterminate = false
                this.checkAll = true
            } else if (data.length > 0) {
                this.indeterminate = true
                this.checkAll = false
            } else {
                this.indeterminate = false
                this.checkAll = false
            }
        },
        handleReset () {
            this.checkAll = false
            this.indeterminate = false
            this.expDataTital = []
            this.expDisFields = []
            this.$emit('closeExp')
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
.cover {
    .box {
        .ivu-checkbox-group {
            max-height: 414px;
            overflow-y: auto;
        }
    }
}
</style>
