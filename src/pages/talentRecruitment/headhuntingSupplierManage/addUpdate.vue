<template>
  <div class="cover">
  <div class="box" style="width: 1075px;">
    <div class="title">
      <div class="title-text">
        <Icon type="ios-bookmark" size="16"></Icon>
        &nbsp;{{logType}}
      </div>
      <Button type="text" @click="handleReset">
        <Icon type="md-close" size="20"></Icon>
      </Button>
    </div>
    <Row>
      <Col span="5">
      <div class="menu">
        <Menu :active-name="active" width="auto" @on-select="pageTo">
          <MenuItem name="1">基本信息</MenuItem>
          <MenuItem name="2" v-show="huntInfoShow">猎头费信息</MenuItem>
        </Menu>
      </div>

      </Col>
      <Col span="18" style="margin-left: 20px">
      <basInfo   v-show="active === '1'" ref="basInfo" :logType="logType"></basInfo>
      <huntInfo   v-show="active === '2'" ref="huntInfo" :logType="logType"></huntInfo>
      </Col>
    </Row>

  </div>

</div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import basInfo from './components/basInfo.vue'
  import huntInfo from './components/huntInfo.vue'
//  import assessSuper from './components/assessSuper.vue'
//  import assessEqual from './components/assessEqual.vue'
//  import assessLower from './components/assessLower.vue'

  export default {
    data() {
      return {
        formValidate: {
          _mt:  this.$global.mt+'BaseCountry.addOrUpd',
          funId: '1',
          countryCname: '',
          countryEname: '',
          countryCode1: '',
          countryCode3: '',
          countryCode2: '',
          comment: '',
        },
        active: '1',
        ruleValidate: {
          countryCname: [
            { required: true, message: this.$t('lang_baseManage.baseCountry.countryCnameDis'), trigger: 'blur' },
          ],
          countryEname: [
            { required: true, message: this.$t('lang_baseManage.baseCountry.countryEnameDis'), trigger: 'blur' },
          ],
        },
        selectMetric: false,
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
      closePower() {
        this.selectMetric = false
      },
      pageTo(name) {
        this.active = name
        if (name === '2') {
          this.$refs.huntInfo.getData()
        }
      },
      getData(id) {
        this.$refs.basInfo.getData(id)
      },
      handleReset() {
        this.$emit('closeUp')
        this.$emit('getData')
        this.active = '1'
        this.$store.commit('huntData/setHuntInfoHide')
        this.$refs.basInfo.formValidates()
        this.$refs.basInfo.editDisbale = false
      },
      getSelectTem(logType) {
        this.$refs.basInfo.getSelect(logType)
      }
    },
    computed: {
      huntInfoShow() {
        return  this.$store.state.huntData.huntInfoShow
      },
    },
    components: {
      basInfo,
      huntInfo,
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
