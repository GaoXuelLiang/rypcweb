<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <i-col span="20">
                    <Input v-model="thisValue"
                           @change="change"
                           disabled
                           :placeholder="'请选择' + itemLabel"></Input>
                </i-col>
                <i-col span="4">
                    <Button style='width: 100%;'
                            type="primary"
                            :disabled="thisDis"
                            @click="openMap">选取地点</Button>
                </i-col>
            </FormItem>
        </i-col>
        <i-col span="10"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
        <!--选择地点-->
        <transition name='fade'>
            <map-search ref="mapSearch"
                        :position="position"
                        @set-position="setPostion"
                        @set-position-error="positionError" />
        </transition>
    </div>
</template>
<script>
import mapSearch from '@/components/mapSearch/mapSearch';
export default {
    data () {
        return {
            thisValue: this.value,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
            position: {}
        }
    },
    props: {
        value: String,
        initPosition: Object,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    methods: {
        change () {
            let dd = JSON.stringify(this.position)
            this.$emit('on-change', dd)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        // 打开地图
        openMap () {
            this.$refs.mapSearch.showMap(this.initPosition);
        },
        setPostion (position) {
            this.isShow = true;
            this.thisValue = position.name;
            this.position = position;
            let dd = JSON.stringify(this.position)
            this.$emit('on-change', dd)
        },
        positionError (msg) {
            this.$Modal.error({
                title: this.$t('reminder.err'),
                content: msg,
            })
        },
    },
    components: {
        mapSearch,
    },
    watch: {
        value: function (val) {
            this.thisValue = val
        },
        initPosition (val) {
            this.position = val
        },
        thisValue (val) {
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
</style>
