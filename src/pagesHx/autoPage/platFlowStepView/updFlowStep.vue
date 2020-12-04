<template>
    <div class="cover modal">
        <div class="box">
            <row>
                <i-col class="meau-left"
                       span="4">
                    <Menu :active-name="active"
                          width="auto"
                          @on-select="pageTo">
                        <MenuItem name="baseInfo">
                        {{$t('lang_flow.step.baseInfo')}}
                        </MenuItem>
                        <MenuItem name="dataBlock"
                                  v-show="$store.state.flowStepData.flstepDisorder">
                        {{$t('lang_flow.step.dataBlock')}}
                        </MenuItem>
                        <MenuItem name="genDocument"
                                  v-show="$store.state.flowStepData.flstepDisorder">
                        {{$t('lang_flow.step.genDocument')}}
                        </MenuItem>
                        <MenuItem name="mailList"
                                  v-show="$store.state.flowStepData.flstepDisorder">
                        {{$t('lang_flow.step.mailList')}}
                        </MenuItem>
                        <MenuItem name="smsList"
                                  v-show="$store.state.flowStepData.flstepDisorder">
                        {{$t('lang_flow.step.smsList')}}
                        </MenuItem>
                        <MenuItem name="wxList"
                                  v-show="$store.state.flowStepData.flstepDisorder">
                        {{$t('lang_flow.step.wxList')}}
                        </MenuItem>
                    </Menu>
                </i-col>
                <i-col class="meau-right"
                       span="20">
                    <div class="title">
                        <div class="title-text">
                            <Icon type="ios-bookmark"
                                  size="16"></Icon>{{title}}
                        </div>
                        <Button type="text"
                                @click="handleReset">
                            <Icon type="md-close"
                                  size="20"></Icon>
                        </Button>
                    </div>
                    <div class="menu_content">
                        <baseInfo v-show="baseInfo"
                                  ref="baseInfo"
                                  @editNodeFlowChart="editNodeFlowChart"
                                  @close="handleReset"></baseInfo>
                        <dataBlock v-show="dataBlock"
                                   ref="dataBlock"></dataBlock>
                        <genDocument v-show="genDocument"
                                     ref="genDocument"></genDocument>
                        <mailList v-show="mailList"
                                  ref="mailList"></mailList>
                        <smsList v-show="smsList"
                                 ref="smsList"></smsList>
                        <wxList v-show="wxList"
                                ref="wxList"></wxList>
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import baseInfo from './baseInfo'          //  步骤信息页面
import dataBlock from './dataBlock'        //  步骤表单定义页面
import genDocument from './genDocument'    //  步骤生成文件页面
import mailList from './mailList'          //  步骤邮件页面
import smsList from './smsList'            //  步骤短信
import wxList from './wxList'            //  步骤微信

export default {
    data () {
        return {
            title: this.$t('lang_flow.step.baseInfo'),
            active: 'baseInfo',
            baseInfo: true,
            dataBlock: false,
            genDocument: false,
            mailList: false,
            smsList: false,
            wxList: false,
        }
    },
    components: {
        baseInfo,
        dataBlock,
        genDocument,
        mailList,
        smsList,
        wxList,
    },
    methods: {
        handleReset () {
            this.reset()
            this.$emit('closeUp')
        },
        editNodeFlowChart (data) {
            this.$emit('editNodeFlowChart', data) // 新加的流程
        },
        /*
         * Option修改时初始数据
         * */
        getOptionData () {
            this.$refs.baseInfo.getdata()
        },
        setMainId (id) {
            this.$store.commit('flowStepData/setMainId', id)
            this.$refs.baseInfo.getdata()
        },
        reset () {
            this.baseInfo = true
            this.dataBlock = false
            this.genDocument = false
            this.mailList = false
            this.smsList = false
            this.wxList = false
            this.active = 'baseInfo'
            this.title = this.$t('lang_flow.step.baseInfo')
            this.$store.commit('flowStepData/setflstepDisorder', '')
            this.$refs.baseInfo.clear()
        },
        pageTo (name) {
            this.active = name
            this.baseInfo = false
            this.dataBlock = false
            this.genDocument = false
            this.mailList = false
            this.smsList = false
            this.wxList = false
            switch (name) {
                case 'baseInfo': this.title = this.$t('lang_flow.step.baseInfo')
                    break
                case 'dataBlock': this.title = this.$t('lang_flow.step.dataBlock')
                    break
                case 'genDocument': this.title = this.$t('lang_flow.step.genDocument')
                    break
                case 'mailList': this.title = this.$t('lang_flow.step.mailList')
                    break
                case 'smsList': this.title = this.$t('lang_flow.step.smsList')
                    break
                case 'wxList': this.title = this.$t('lang_flow.step.wxList')
                    break
            }
            this[name] = true
            if (name === 'baseInfo') {
                this.$refs[name].getdata()
            } else {
                this.$refs[name].getdata(1)
                this.$refs[name].getTableHeight()
            }
        },
    },
}
</script>
<style>
.ivu-menu-vertical.ivu-menu-light:after {
    background-color: transparent;
}
</style>
<style lang="scss" scoped>
@import "../../../sass/mainChildUpdate.scss";
</style>
