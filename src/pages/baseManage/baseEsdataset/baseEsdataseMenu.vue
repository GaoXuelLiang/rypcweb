<template>
  <div class="cover">
    <div class="box">
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
            <MenuItem name="1">详细信息</MenuItem>
            <MenuItem name="2" v-if="masterPublicList">数据对应</MenuItem>
            <!-- -->
          </Menu>
        </div>

        </Col>
        <Col span="19">
            <baseEsdatasetEdit
              v-show="active === '1'"
              ref="baseEsdatasetEdit"
              :logType="logType"
              :labelDesc="labelDesc"
              :placeHolderDesc="placeHolderDesc"
              @closeUpMenu="closeUpMenu"
              :id="id"
              @update="update"
              @newData="newData"
            ></baseEsdatasetEdit>
            <baseEsdsmapList
              v-show="active === '2'"
              ref="baseEsdsmapList"
              @getBaseEsdateEdit="getBaseEsdateEdit"
            ></baseEsdsmapList>
        </Col>
      </Row>
    </div>

  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '@/axios/axios'
  import { isSuccess, deepCopy } from '@/lib/util'
  import baseEsdatasetEdit from './baseEsdatasetEdit.vue'
  import baseEsdsmapList from './baseEsdsmapList.vue'
  export default {
    data() {
      return {
        active: '1',
        selectMetric: false,
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
      labelDesc: Object,
      placeHolderDesc: Object,
    },
    computed: {
      masterPublicList() {
        return this.$store.state.user.masterPublicList
      },
      masterPublicId() {
        return this.$store.state.user.masterPublicId
      },
    },
    methods: {
      closePower() {
        this.selectMetric = false
      },
      assessInfo() {
        this.$emit('changeData')
      },
      pageTo(name) {
        const t = this
        t.active = name
        let obj = {
          bsesdsmSdid: t.masterPublicId,
        }
        switch (name) {
          case '2' :
            t.$refs.baseEsdsmapList.getColumns()
            t.$store.commit('commonPage/setChildParams', obj)
            t.$refs.baseEsdsmapList.getData()
            break
        }
      },
      // 做修改的方法
      getData(id) {
        const t = this
        t.$refs.baseEsdatasetEdit.getData(id)
      },
      handleReset() {
        const t = this
        t.active = '1'
        t.$emit('closeUp')
        t.$refs.baseEsdatasetEdit.handleReset()
        t.$store.commit('setMasterPublicListHide') //  做子表控制显示与隐藏  不必修改
        t.$store.commit('setMasterPublicId', '') // 做主表的ID存储  用做查询子表用的  不必修改
      },
      closeUpMenu() {
        const t = this
        t.active = '1'
        t.$emit('closeUp')
        t.$store.commit('setMasterPublicListHide') //  做子表控制显示与隐藏  不必修改
        t.$store.commit('setMasterPublicId', '') // 做主表的ID存储  用做查询子表用的  不必修改
      },
      ruleValidate() {
        return this.$refs.baseEsdatasetEdit.ruleValidate
      },
      update(data) {
        const t = this
        t.$emit('update', data)
      },
      newData(data) {
        const t = this
        t.$emit('newData', data)
      },
      getBaseEsdateEdit() {
        const t = this
        let data = t.$refs.baseEsdatasetEdit.formValidate
        delete data._mt
        t.$refs.baseEsdsmapList.initData = data
      },
    },
    components: {
      baseEsdatasetEdit,
      baseEsdsmapList,
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
