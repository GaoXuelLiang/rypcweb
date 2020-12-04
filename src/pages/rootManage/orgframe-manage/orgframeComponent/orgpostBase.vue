<template>
    <div class="cover modal">
        <div class="box">
            <row>
                <i-col class="meau-left"
                       span="5">
                    <Menu :active-name="active"
                          width="auto"
                          @on-select="pageTo">
                        <MenuItem name="option">
                        基本信息
                        </MenuItem>
                        <MenuItem name="content"
                           v-show="logType=='修改'">
                        岗位信息
                        </MenuItem>
                    </Menu>
                </i-col>
                <i-col class="meau-right"
                       span="19">
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
                        <mOption v-show="option"
                                 :logType="logType"
                                 ref="option"
                                 @getid="getid"
                                 :id="id"

                                 @closeUp="handleReset"
                                 @update="update"
                                 @newdata="newdata"></mOption>
                        <mContent v-show="content"
                                  :logType="logType"
                                  ref="content"
                                  :id="id"
                                  :unitsSname="unitsSname"
                                  :idname="idname"></mContent>
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import mOption from '../orgframeInfoView'
import mContent from './orgpostChild'
export default {
    data () {
        return {
            unitsSname:'',
            //title: this.$t('lang_authorization.platRolecont.title2'),
            title:this.$t('lang_organization.orgpost.title'),
            active: 'option',
            option: true,
            content: false,
            id: NaN,
            logType: '',
            idname: '',
            data: {
                _mt: 'orgUnitPostService.deleteByIds',
                funId: '1',
            },
            formValidate: {
            _mt:  this.$global.mt+'BaseCountry.addOrUpd',
            funId: '1',
            postCode:'',
            countryCname: '',
            countryEname: '',
            countryCode1: '',
            countryCode3: '',
            countryCode2: '',
            comment: '',
            },
            ruleValidate: {

                },
                selectMetric: false,
                spinShow:false
        }
    },
    components: {
        mOption,
        mContent,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    mounted () {

    },
    methods: {
        // handleReset () {
        //     // this.title = this.$t('lang_authorization.platRolecont.title2')
        //     // this.clear()
        //     this.$emit('closeUp')
        // },
        
        changeMenu () {
            this.active = 'content'
        },
        getOptionData () {
            this.$refs.option.getdata()
        },
        resetFields () {
            this.$refs.option.resetFields()
        },
        getid (id, name) {
            this.id = parseInt(id, 10)
            this.idname = name
        },
        pageTo (name) {
            this.option = false
            this.content = false
            this.active = name
            this[name] = true
            if (name === 'content') {
                this.title = this.$t('岗位信息')
                this.$refs.content.getdata();
                this.$refs.content.getTableHeight();
            } else {
                this.title = this.$t('基本信息')
            }
        },
        clear () {
            this.option = true
            this.content = false
            this.id = NaN
            this.active = 'option'
            this.$refs.option.handleReset()
        },
        // clearData(){
        //     const t = this
        //     t.$refs.option.handleReset()
        // },
        update (data) {
            this.$emit('updateArray', data)
        },
        newdata (data) {
            this.$emit('addNewArray', data)
        },
        getJobList(id) {
            this.$refs.option.getJob(id)
        },
        getDataList(id,unitsSname) {
        const t = this
        t.spinShow = true
        t.unitsSname=unitsSname
        t.$refs.option.getData(id)
        t.$refs.option.Id = id
      },
      changeSpin(){
        this.spinShow = false
      },
      clearData(){
        const t = this
        t.$refs.option.handleReset()
      },
      handleReset() {
        this.$emit('closeUp')
        this.active = '1'
        this.clear()
        this.$store.commit('setMasterPublicListHide')
        this.$store.commit('setMasterPublicId', '')
        sessionStorage.removeItem('queryLevel')
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
@import "../../../../sass/mainChildUpdate.scss";
</style>
