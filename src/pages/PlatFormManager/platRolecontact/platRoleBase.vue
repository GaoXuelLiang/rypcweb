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
                        {{$t('lang_authorization.platRolecont.title2')}}
                        </MenuItem>
                        <MenuItem name="content"
                                  v-show="$store.state.platRole.mainId">
                        {{$t('lang_authorization.platRole.title')}}
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
                                  :idname="idname"></mContent>
                    </div>
                </i-col>
            </row>
        </div>
    </div>
</template>
<script>
import mOption from './editRolecontact'
import mContent from './platRolechild'


export default {
    data () {
        return {
            title: this.$t('lang_authorization.platRolecont.title2'),
            active: 'option',
            option: true,
            content: false,
            id: NaN,
            logType: '',
            idname: '',
            data: {
                _mt: this.$global.mt + 'PlatRolecontact.getById',
                funId: '1',
            },
        }
    },
    components: {
        mOption,
        mContent,
    },
    props: {
        index: Number,
        params: Object,
    },
    mounted () {

    },
    methods: {
        handleReset () {
            this.title = this.$t('lang_authorization.platRolecont.title2')
            this.clear()
            this.$emit('closeUp')
        },
        changeMenu () {
            this.active = 'content'
        },
        getOptionData () {
            this.$refs.option.getdata()
        },
        getOption (logType) {
            this.data.id = this.$store.state.platRole.mainId
            this.logType = logType
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
                this.title = this.$t('lang_authorization.platRole.title')
                this.$refs.content.getdata();
                this.$refs.content.getTableHeight();
            } else {
                this.title = this.$t('lang_authorization.platRolecont.title2')
            }
        },
        clear () {
            this.option = true
            this.content = false
            this.id = NaN
            this.active = 'option'
            this.$refs.option.clear()
        },
        update (data) {
            this.$emit('updateArray', data)
        },
        newdata (data) {
            this.$emit('addNewArray', data)
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
