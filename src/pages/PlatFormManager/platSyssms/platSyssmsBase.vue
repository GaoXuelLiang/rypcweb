<template>
  <div class="cover modal">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_platdoc.platSyssms.menuTitle1')}}
            </MenuItem>
            <MenuItem name="content" v-show="id">
              {{$t('lang_platdoc.platSyssms.menuTitle2')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="ios-bookmark" size="16"></Icon>{{logType}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="md-close" size="20"></Icon>
            </Button>
          </div>
          <!-- <div style="margin-top: 40px;padding: 10px;"> -->
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
  import mOption from './editPlatSyssms'
  import mContent from './platSyssmsVarBase'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        id: NaN,
        syssmsContent: '',
        syssmsTo: '',
        syssmsSendcondition: '',
        data: {
          _mt:  this.$global.mt+'PlatSyssms.getById',
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
      getid(id, content, syssmsTo, condition) {
        this.id = parseInt(id, 10)
        this.syssmsContent = content
        this.syssmsTo = syssmsTo
        this.syssmsSendcondition = condition
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.get(this.id, this.syssmsContent, this.syssmsTo, this.syssmsSendcondition)
          this.$refs[name].getTableHeight();
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
  // @import "../../../sass/updateAndAdd.scss";
  // .header-box{
  //   display: flex;
  //   position: relative;
  //   justify-content: flex-end;
  // }
  // .cover .box{
  //   padding: 0;
  // }
  // .cover .box .form{
  //   margin-top: 60px;
  // }
  // .meau-left{
  //   margin-top: 30px;
  // }
  // .meau-right{
  //   position: relative;
  //   border-left: 2px solid #efefef;
  // }
  // .header-cover{
  //   display: none;
  //   top: 0;
  //   right: 0;
  //   color: #fff;
  //   border-radius: 50%;
  //   position: absolute;
  //   width: 150px;
  //   height: 150px;
  //   background-color: rgba(0,0,0,.3);
  // }
  // .header-box:hover .header-cover{
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  // .header-box:hover {
  //   cursor: pointer;
  // }
  // .header{
  //   height: 150px;
  //   width: 150px;
  //   border-radius: 50%;
  //   overflow: hidden;
  // }
  // .fade-enter-active, .fade-leave-active {
  //   transition: opacity .2s
  // }
  // .fade-enter, .fade-leave-to {
  //   opacity: 0
  // }
   @import "../../../sass/mainChildUpdate.scss";
</style>
