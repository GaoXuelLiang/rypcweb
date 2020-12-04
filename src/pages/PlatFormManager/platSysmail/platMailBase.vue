<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_platdoc.platMail.baseTitle1')}}
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.platSysMailJS.mainId">
              {{$t('lang_platdoc.platMail.baseTitle2')}}
            </MenuItem>
            <MenuItem name="mailVar" v-show="$store.state.platSysMailJS.mainId">
              {{$t('lang_platdoc.platMail.baseTitle3')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="ios-bookmark" size="16"></Icon>
              {{logType}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="md-close" size="20"></Icon>
            </Button>
          </div>
          <div class="menu_content">
            <mOption v-show="option" :logType="logType" ref="option" @getid="getid" :id="id" @update="update" @close="handleReset" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :id="id" :idname="idname"></mContent>
            <mMailVar v-show="mailVar" :logType="logType" ref="mailVar" :id="id" :idname="idname"></mMailVar>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './editSysmail'
  import mContent from './platMailAttrchild'
  import mMailVar from './platMailVar'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        mailVar: false,
        logType: '',
        id: NaN,
        idname: '',
        data: {
          _mt:  this.$global.mt+'PlatRolecontact.getById',
        },
      }
    },
    components: {
      mOption,
      mContent,
      mMailVar,
    },
    props: {
      index: Number,
      params: Object,
    },
    mounted() {

    },
    methods: {
      handleReset() {
        this.clear()
        this.$emit('closeUp')
      },
      changeMenu() {
        this.active = 'content'
      },
      getOptionData() {
        this.$refs.option.getdata()
      },
      getOption(logType) {
        this.data.id = this.$store.state.platSysMailJS.mainId
        this.logType = logType
      },
      getid(id, name) {
        this.id = parseInt(id, 10)
        this.idname = name
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.mailVar = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.getdata()
          this.$refs.content.getTableHeight()
        }
        if (name === 'mailVar') {
          this.$refs.mailVar.getdata()
          this.$refs.mailVar.getTableHeight()
        }
      },
      clear() {
        this.option = true
        this.content = false
        this.mailVar = false
        this.id = NaN
        this.active = 'option'
        this.$refs.option.clear()
      },
      update(data) {
        this.$emit('update', data)
      },
      newdata(data) {
        this.$emit('getData', data)
      },
    },
  }
</script>
<style>
  .ivu-menu-vertical.ivu-menu-light:after{
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/mainChildUpdate.scss";
</style>
