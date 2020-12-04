<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              班组信息
            </MenuItem>
            <MenuItem name="content" v-show="id">
              选择员工
            </MenuItem>
            <MenuItem name="location" v-show="id">
              考勤地点
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
            <mOption v-show="option" :logType="logType" ref="option" :id="id" @setId="setId" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :evaacStatus="evaacStatus" :id="id" :positionComp="positionComp" :idname="idname"></mContent>
            <mLocation v-show="location" :logType="logType" ref="location" :evaacStatus="evaacStatus" :id="id"></mLocation>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './updateGroup'
  import mContent from './interviewerTable'
  import mLocation from './locationTable'

  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        location: false,
        id: NaN,
        positionComp: '', // 公司id
        idname: '',
        data: {
          _mt: 'sihfPolicy.getById',
          funId: '1',
        },
      }
    },
    components: {
       mOption,
       mContent,
       mLocation,
    },
    props: {
      logType: String,
      index: Number,
      params: Object,
      evaacStatus: String,
    },
    mounted() {

    },
    methods: {
      getCode() {
        this.$refs.option.getCode()
      },
      getData(id){
        let t = this;
        this.id = Number(id);
        t.$refs.option.getdata(id);
      },
      handleReset() {
        let t = this
        t.$emit('closeUp')
        t.clear()
      },
      changeMenu() {
        this.active = 'content'
      },
      getOptionData() {
        this.$refs.option.getdata()
      },
      getOption(logType) {
        this.data.id = this.$store.state.providFund.mainId
        this.data.logType = logType
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.location = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.getdata(1)
        }
        if (name === 'location') {
          this.$refs.location.getdata(1)
        }
      },
      clear() {
        let t = this
        t.option = true
        t.content = false
        t.location = false
        t.id = NaN
        t.active = 'option'
        t.$refs.option.clear()
        t.$refs.content.clear()
      },
      newdata(res) {
        let t = this
        this.id = Number(res.id)
        this.positionComp = res.attTeamHircompany
        t.$emit('getData', res)
      },
      setId(res) {
        let t = this
        this.id = Number(res.id)
        this.positionComp = res.attTeamHircompany
        t.$emit('update', res)
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
