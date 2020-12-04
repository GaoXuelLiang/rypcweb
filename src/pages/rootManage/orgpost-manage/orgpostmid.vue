<template>
  <div class="cover">
    <div class="box">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
<!--        <Col span="3">-->
<!--        <div class="menu">-->
<!--          <Menu :active-name="active" width="auto" @on-select="pageTo">-->
<!--            <MenuItem name="1" >岗位基本信息</MenuItem>-->
<!--            <MenuItem name="2" v-if="masterPublicList">岗位价值领域</MenuItem>-->
<!--            <MenuItem name="3" v-if="masterPublicList">胜任能力模型</MenuItem>-->
<!--            <MenuItem name="4" v-if="masterPublicList">岗位发展通道</MenuItem>-->
<!--          </Menu>-->
<!--        </div>-->

<!--        </Col>-->
        <Col span="24" >
            <orgpostInfoView @changeSpin="changeSpin"  v-show="active === '1'" ref="orgpostInfoView"  :logType="logType" @closeDialog="handleReset" @closeUp='closeView'>
            </orgpostInfoView>
<!--            <orgpostValue v-show="active === '2'" ref="orgpostValue"></orgpostValue>-->
<!--            <orgpostModel  v-show="active === '3'" ref="orgpostModel"></orgpostModel>-->
<!--            <orgpostDevelop  v-show="active === '4'" ref="orgpostDevelop"></orgpostDevelop>-->
        </Col>
      </Row>
      
    </div>

  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import orgpostInfoView from './orgpostInfoView.vue'
  // import orgpostValue from './orgpostValue.vue'
  // import orgpostModel from './orgpostModel.vue'
  // import orgpostDevelop from './orgpostDevelop.vue'

  export default {
    data() {
      return {
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
        active: '1',
        ruleValidate: {

        },
        selectMetric: false,
        spinShow:false
      }
    },
    components: {
      orgpostInfoView,
      // orgpostValue,
      // orgpostModel,
      // orgpostDevelop
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    computed: {
      // assessList() {
      //   return this.$store.state.assessData.assessList
      // },
      // arrAssessList() {
      //   return this.$store.state.assessData.arrAssessList
      // },
      // masterPublicList() {
      //   return this.$store.state.user.masterPublicList
      // },
    },
    methods: {
      assessInfo() {
        this.$emit('changeData')
      },
      closeView() {
        this.$emit('closeUp')
      },
      pageTo(name) {
        this.active = name
        if (name === '2') {
          this.$refs.orgpostValue.getData(1)
        }
        if (name === '3') {
          this.$refs.orgpostModel.getData(1)
          this.$refs.orgpostModel.getTree()
        }
        if (name === '4') {
          this.$refs.orgpostDevelop.getData(1)
          this.queryLevel = JSON.parse(sessionStorage.getItem('queryLevel'))
          this.$refs.orgpostDevelop.levelAll = this.queryLevel
        }
      },
      getJobList(id) {
        this.$refs.orgpostInfoView.getJob(id)
      },
      getDataList(id) {
        const t = this
        t.spinShow = true
        t.$refs.orgpostInfoView.getData(id)
        t.$refs.orgpostInfoView.newId = id
        // t.$refs.orgpostValue.getData(id)
        // t.$refs.orgpostModel.getData(id)
        // t.$refs.orgpostDevelop.getData(id)
      },
      changeSpin(){
        this.spinShow = false
      },
      clearData(){
        const t = this
        t.$refs.orgpostInfoView.handleReset()
      },
      handleReset() {
        this.$emit('closeUp')
        this.active = '1'
        this.$store.commit('setMasterPublicListHide')
        this.$store.commit('setMasterPublicId', '')
        sessionStorage.removeItem('queryLevel')
      },
    },

  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .ivu-menu-vertical .ivu-menu-item {
    padding: 14px;
  }
</style>
