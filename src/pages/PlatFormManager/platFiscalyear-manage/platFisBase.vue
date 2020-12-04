<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_platform.platFiscalyear.fyYearM')}}
            </MenuItem>
            <MenuItem name="quarter" v-show="$store.state.platFis.childId1">
              {{$t('lang_platform.PlatQuarter.title')}}
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.platFis.childId1">
              {{$t('lang_platform.PlatFyperiod.title')}}
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
          <div style="margin-top: 40px;padding: 10px;">
            <mOption v-show="option" :logType="logType" ref="option" @getid="getid" :id="id" @update="update" @newdata="newdata"></mOption>
           <mQuarter v-show="quarter" :logType="logType" ref="quarter" :id="id" :idname="idname"></mQuarter>
           <mContent v-show="content" :logType="logType" ref="content" :id="id" :idname="idname"></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './platFiscalyearView'
  import mQuarter from './platQuarterManage'
  import mContent from './platFyperiodManage'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        quarter: false,
        content: false,
        id: NaN,
        idname: '',
        data: {
          _mt:  this.$global.mt+'PlatFiscalyear.getById',
          funId: '1',
        },
      }
    },
    components: {
       mOption,
       mQuarter,
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
        this.$emit('closeUp')
      },
      changeMenu() {
        this.active = 'content'
      },
      getOptionData() {
        this.$refs.option.getdata()
      },
      getOption(logType) {
        this.data.id = this.$store.state.platFis.mainId
        this.data.logType = logType
      },
      getid(id, name) {
        this.id = parseInt(id, 10)
        this.idname = name
      },
      pageTo(name) {
        this.option = false
        this.quarter = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'quarter') {
          this.$refs.quarter.getdata()
        }
        if (name === 'content') {
          this.$refs.content.getdata()
        }
      },
      clear() {
        this.option = true
        this.quarter = false
        this.content = false
        this.id = NaN
        this.active = 'option'
        this.$refs.option.clear()
      },
      update(data) {
        this.$emit('getData')
      },
      newdata(data) {
        this.$emit('getData')
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
  @import "../../../sass/updateAndAdd.scss";
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
  }
  .cover .box{
    padding: 0;
  }
  .cover .box .form{
    margin-top: 60px;
  }
  .meau-left{
    margin-top: 30px;
  }
  .meau-right{
    position: relative;
    border-left: 2px solid #efefef;
  }
  .header-cover{
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
