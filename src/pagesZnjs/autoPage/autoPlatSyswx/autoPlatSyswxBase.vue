<template>
    <div class="cover modal">
        <div class="box autoPage"
             id="dragBox">
            <Row class="main_box">
                <Col class="meau-left"
                     span="5">
                <Menu :active-name="active"
                      width="auto"
                      @on-select="pageTo">
                    <MenuItem :name="$store.state.user.funId">
                    {{mainTitle}}
                    </MenuItem>
                    <MenuItem :name="item.id"
                              v-show="logType!=$t('button.add')"
                              v-for="(item, index) in childFun"
                              :key="index">
                    {{item.funLancodeDis}}
                    </MenuItem>
                </Menu>
                </Col>
                <Col class="meau-right width-900"
                     span="19">
                <div class="title"
                     v-drag="`dragBox`">
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
                <div class="menu_content">
                    <keep-alive>
                        <mOption v-if="option"
                                 class="content-main"
                                 ref="option"></mOption>
                        <mContent v-show="content"
                                  ref="autoMainUpd"
                                  @updataTable="update"
                                  @getUpData="newdata"
                                  @closeUpd="handleReset"></mContent>
                    </keep-alive>
                </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import mOption from '@/pages/autoPage/autoPlatSyswx/autoPlatSyswxChild'
import mContent from '@/components/autoCommonPage/autoChildUpd'
import { isSuccess, deepCopy } from '@/lib/util'
import { getDataLevelUserLoginData } from '@/axios/axios'
import validCode from '@/pages/common/commonCompanents/validCode'
export default {
    data () {
        return {
            active: this.$store.state.user.funId,
            option: false,
            loading: true,
            dataForm: {},
            childFun: [],
            formData: {},
            formlist: {},
            tbName: '',
            content: false,
            idname: '',
            childLogType: ""
        }
    },
    components: {
        mOption,
        mContent,
    },
    props: {
        mainTitle: String,
        index: Number,
        id: Number,
        logType: String
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        }
    },
    mounted () {
        this.getChildId()
        this.getOptionData()
    },
    methods: {
        handleReset () {
            this.$store.commit('setChildFunId', '')
            this.$store.commit('setChildFunCode', '')
            this.$emit('closeUp')
        },
        changeMenu () {
            this.active = 'content'
        },
        getOptionData () {
            if (this.logType == this.$t('button.add')) {
                this.content = true
                this.$nextTick(() => this.$refs.autoMainUpd.getColumn(this.id))
            } else {
                this.content = true
                this.$nextTick(() => this.$refs.autoMainUpd.getColumn(this.id))
            }
        },
        getChildId () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'SysFunctions.getChiSysFunctionsList',
                APfunId: '1111'
            }).then(res => {
                if (isSuccess(res, t)) {
                    t.childFun = res.data.content[0].value
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pageTo (name) {
            const t = this
            t.option = false
            t.content = false
            t.active = name
            t.$store.commit('setChildFunId', name)
            for(let v of t.childFun) {
                if(v.id === name) {
                    t.$store.commit('setChildFunCode', v.funCode)
                }
            }
            if (name == this.funId) {
                t.content = true
            } else {
                t.option = true;
                t.$nextTick(() => {
                    t.$refs.option.getColumns()
                })

            }
        },
        update (data) {
            this.$emit('updateArray', data)
        },
        newdata (data, logType) {
            // this.logType = logType
            this.$emit('changeLogtype', logType)
            this.$emit('addNewArray', data)
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/mainChildUpdate.scss";
</style>
