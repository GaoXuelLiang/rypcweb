<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_platform.syswx.syswxInfo')}}
            </MenuItem>
            <MenuItem name="content" v-show="id">
              {{$t('lang_platform.syswx.syswxvarInfo')}}
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
            <mOption v-show="option" :logType="logType" ref="option" @getid="getid" :id="id" @update="update" @newdata="newdata" @close="handleReset"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :id="id"></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './editPlatSyswx'
  import mContent from './platSyswxVarBase'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        id: NaN,
        syswxContent: '',
        syswxTo: '',
        syswxSendcondition: '',
        data: {
          _mt:  this.$global.mt+'PlatSyswx.getById',
          funId: '1',
        },
      }
    },
    components: {
      mOption,
      mContent,
    },
    props: {
      logType: String,
      index: Number,
      params: Object,
    },
    mounted() {

    },
    methods: {
      handleReset() {
        this.clear()
        this.$refs.option.clear()
        this.$emit('closeUp')
      },
      changeMenu() {
        this.active = 'content'
      },
      getOption(id, logType) {
        this.id = parseInt(id, 10)
        this.data.id = id
        this.data.logType = logType
        this.$refs.option.getdata(this.data)
      },
      getid(id, content, syswxTo, condition) {
        this.id = parseInt(id, 10)
        this.syswxContent = content
        this.syswxTo = syswxTo
        this.syswxSendcondition = condition
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.get(this.id, this.syswxContent, this.syswxTo, this.syswxSendcondition)
          this.$refs.content.getTableHeight()
        }
      },
      clear() {
        this.option = true
        this.content = false
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
