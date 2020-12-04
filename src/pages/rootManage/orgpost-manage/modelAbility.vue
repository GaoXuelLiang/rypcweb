<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;
          选择能力指标
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Col class="col" span="18">
        <!--<Tree :data="data" show-checkbox  multiple ref="tree"></Tree>-->
        <Tree :data="data" multiple ref="tree" :render = "renderContent"></Tree>
        </Col>
        <Col span="4" offset="2">
        <div class="btn-group">
          <Button type="primary" @click="expand">{{$t('lang_evaluation.evaluation.expand')}}</Button>
          <Button type="primary" @click="disExpand">{{$t('lang_evaluation.evaluation.disExpand')}}</Button>
          <Button type="primary" @click="allPick">{{$t('lang_evaluation.evaluation.allPick')}}</Button>
          <Button type="primary" @click="resetTree">{{$t('lang_evaluation.evaluation.resetTree')}}</Button>
          <Button type="primary" :loading="isSpin" @click="save">{{$t('button.sav')}}</Button>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        id: NaN,
        data: [],
        wholeDdata: new Array(),
        selectData: [],
        nameData:[],
        dataPInput: [],
      }
    },
    components: {
    },
    props: {

    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        t.dataPInput = []
        if(t.nameData.length) {
          t.nameData.forEach(item => {
            t.dataPInput.push({id: item.pqdIndexnoDis,checked: true})
          })
        }
        t.id = id;
        const data = {
          _mt:  this.$global.mt+'CompetenceIndex.getTree',
          logType: '查询',
          id: '0',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value && res.data.content[0].value.length) {
              for (let i = 0; i< res.data.content[0].value.length; i++) {
                if(t.nameData.length) {
                  for(let j = 0; j < t.nameData.length; j++) {
                    if (res.data.content[0].value[i].id === t.nameData[j].pqdIndexnoDis){
                      res.data.content[0].value[i].checked = true
                    }
                  }
                }
              }
            }
            t.data = t.toTree(res.data.content[0].value) || [];
          }
        }).catch(() => {
//        t.$Modal.error({
//          title: this.$t('reminder.err'),
//          content: this.$t('reminder.errormessage'),
//        })
        })
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false;
//        item.checked = item.authRoleFunDis === '1'
          item.title = item.normName
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item // 上级ID
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.competSuperior]  // 区分级别的ID
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      },
      renderContent(h, { root, node, data }) {
        return h(
          'span',
          {
            style: {
              display: 'inline-block',
              width: '90%',
            },
          },
          [
            h('span', [h('span', data.competName)]),
            h(
              'span',
              {
                style: {
                  float: 'right',
                  marginRight: '20px',
                },
              },
              [
                h('input', {
                  props: Object.assign({}),
                  domProps: {
                    type: 'checkbox',
                    checked: data.checked
                  },
                  style: {
                    display: !(data.competSuperior - 0) ? 'none' : 'block',
                    marginRight: '8px',
                    padding: 0,
                  },
                  on: {
                    change: $event => {
                      let map = {}
                      map['id'] = data.id
                      map['checked'] = $event.target.checked
                      for (let i = 0; i < this.dataPInput.length; i++) {
                        if (map.id === this.dataPInput[i].id) {
                          this.dataPInput[i].checked = map.checked
                          return
                        }
                      }
                      this.dataPInput.push(map)
                    },
                  },
                }),
              ],
            ),
          ],
        )
      },
      save() {
        const t = this
        const checkedId = []
        this.dataPInput.forEach(item => {
          if (item.checked) checkedId.push(item.id)
        })
        const data = {
          _mt:  this.$global.mt+'OrgPostqualifiedmodel.saveInfo',
          logType: '选择指标',
          indexIds: checkedId.join(',') || '',
          pid: this.$store.state.user.masterPublicId
        }
        t.isSpin = true
        getDataLevelUserLogin(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            t.dataPInput = []
            t.$emit('getData')
            t.handleReset()
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box{
    width: 900px;
    height: 500px !important;
  }
  .col{
    height: 400px;
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
  }
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
