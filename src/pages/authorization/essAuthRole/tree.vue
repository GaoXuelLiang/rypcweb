<template>
  <div class="cover" style="overflow: hidden;">
    <div class="box" id="kd">
      <div style="height: 100%;">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{roleName}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Tabs name="name1" @on-click="tabChange" type="card">
        <TabPane :label="$t('lang_role.adminrole.placfun')" tab="name1">
          <Row>
            <Col class="col" span="6" id="col2">
            <Spin fix v-if="isSpin1" size="large"></Spin>
            <Tree :data="data" show-checkbox multiple ref="tree"></Tree>
            </Col>
            <Col span="8" >
            <div class="btn-group">
              <Button type="primary" @click="expand">{{$t('lang_user.rootrole.expand')}}</Button>
              <Button type="primary" @click="disExpand">{{$t('lang_user.rootrole.disExpand')}}</Button>
              <Button type="primary" @click="allPick">{{$t('lang_user.rootrole.allPick')}}</Button>
              <Button type="primary" @click="resetTree">{{$t('lang_user.rootrole.resetTree')}}</Button>
              <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
            </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane :label="$t('lang_role.adminrole.placauthset')"  tab="name1">
          <authSet :id="id" ref="authSet"></authSet>
        </TabPane>
<!--        <TabPane :label="$t('lang_role.adminrole.pletodo')"  tab="name1">-->
<!--          <todoDistribution :id="id"></todoDistribution>-->
<!--        </TabPane>-->
      </Tabs>
    </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
import authSet from './authSet'
import todoDistribution from './todoDistribution'

  export default {
    data() {
      return {
        isSpin1: false,
        data: [],
        disabled: true,
        params: {
          _mt:  this.$global.mt+'SysESSMSSAgwService.selSysFunctionsByTree',
          funType: '1admin',
        },
      }
    },
    components: {
      authSet,
      todoDistribution,
    },
    props: {
      id: '',
      roleName: String,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
//        console.log(11111, document.body.clientHeight)
        this.$nextTick(() => {
          if (document.body.clientHeight <= 630) {
            document.getElementById('kd').style.height = '90%'
            document.getElementById('col2').style.height = '410px'
          }
        })
        const t = this
        const data = deepCopy(t.params)
        data.authRoleId = t.id
        data.funType = '6essmss'
        data.valid = '1'
        t.isSpin1 = true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin1 = false
          if (isSuccess(res, t)) {
            if (res.data.content[0]) {
              t.data = t.toTree(res.data.content[0].value)
            }
          }
        }).catch(() => {
          t.isSpin1 = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const checkedId = []

        let ids = []
        for (let i = 0; i < t.$refs.tree.flatState.length; i++) {
          if (t.$refs.tree.flatState[i].node.indeterminate === true) {
            ids.push({
              sysFunctionsId: t.$refs.tree.flatState[i].node.id,
              funState: 2,
            })
          }
        }
        const checked = t.$refs.tree.getCheckedNodes()
        for (let i = 0; i < checked.length; i++) {
          checkedId.push(checked[i].id)
        }
        for (let j = 0; j < checkedId.length; j++) {
          ids.push({
            sysFunctionsId: checkedId[j],
            funState: 1,
          })
        }
        const data = {
          _mt:  this.$global.mt+'AuthRole.addOrUpdRoleFun',
          funId: '1',
          companyId: '1',
          logType: '节点分配',
          authRoleId: t.id,
          data: JSON.stringify(ids),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '保存成功',
            })
            t.disabled = false
//            t.$emit('closePower')
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.funLancodeDis
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.funPid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            item.expand = true
            val.push(item)
          }
        })
        return val
      },
      handleReset() {
        const t = this
        t.$emit('closePower')
      },
      resetTree() {
        this.treeData2(this.data, 'checked', false)
        this.treeData(this.data, 'checked', false)
      },
      allPick() {
        this.treeData2(this.data, 'checked', true)
      },
      expand() {
        this.treeData(this.data, 'expand', true)
      },
      disExpand() {
        this.treeData(this.data, 'expand', false)
      },
      /* 遍历树形数组对象 */
      treeData(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            data[i][item] = value
            t.treeData(data[i].children, item, value)
          }
        }
      },
      treeData2(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            t.treeData2(data[i].children, item, value)
          } else {
            data[i][item] = value
          }
        }
      },
      tabChange(index) {
        if (index === 1) this.$refs.authSet.getData()
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover {
  }
  .cover .box{
    width: 900px;
    max-height: 600px;
    // width: 80%;
    padding: 50px 20px 10px 20px;

  }
.col{
  height: 470px;
  border-top: 2px solid rgba(9,161,252,1);
  overflow: auto;
  position: relative;
}
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  /deep/ .ivu-tree-title{
    width: auto !important;
  }
</style>
