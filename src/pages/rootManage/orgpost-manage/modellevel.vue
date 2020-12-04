<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;
          批量调整指标等级
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Col class="col" span="18">
          <div style="height:25px;line-height:25px;">
            <span style="height:25px;display:inline-block;text-align:center">胜任指标名称</span>
            <!--<span style="height:25px;display:inline-block;float:right;width:100px;margin-right:50px;text-align:center">{{$t('lang_evaluation.evaluation.diagscore2')}}</span>-->
            <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:20px;text-align:center">胜任能力等级</span>
          </div>
          <Tree :data="data" multiple ref="tree" :render = "renderContent"></Tree>
        </Col>
        <Col span="4" offset="2">
          <div class="btn-group">
            <Button type="primary" @click="expand">{{$t('lang_evaluation.evaluation.expand')}}</Button>
            <Button type="primary" @click="disExpand">{{$t('lang_evaluation.evaluation.disExpand')}}</Button>
            <!-- <Button type="primary" @click="allPick">全选</Button>
            <Button type="primary" @click="resetTree">重置</Button> -->
            <Button type="primary" :loading="isSpin" @click="save">{{$t('button.sav')}}</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>

</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy, uniqArr } from '../../../lib/util'
  export default {
    data() {
      return {
        isSpin: false,
        id: NaN,
        selectId:'',
        score: '',
        data: [],
        temData: [],
        listLevel: [],
        nameData: [],
        dataDInput: [],
        dataPInput: [],
        selectModel: [],
        code:'',
        levelCode: []
      }
    },
    components: {
    },
    props: {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        const data = {
          _mt:  this.$global.mt+'CompetenceIndex.getTreeNew',
          funId: '',
          logType: '查询',
          ids: id.toString(),
        }
        t.dataPInput = []
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = t.toTree(res.data.content[0].value) || [];
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      renderContent(h, { root, node, data }) {
        this.dataInput = []
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
                  display: !(data.competSuperior - 0)  ? 'none' : 'block',
                  width: '100px',
                  float: 'right',
                  marginRight: '20px',
                },
              },
              [
                h('Select', {
                  on: {
                    'on-change': (v) => {
                      let i = v;
                      console.log(i)
                      let levelArr = []
                      for(let j=0; j<this.selectModel.length;j++){
                        if(i === this.selectModel[j].paramInfoName){
                          if (this.levelCode.length == 0) {
                            this.levelCode.push(this.selectModel[j].paramCode + '_' + data.id)
                          } else {
                            for(let k = 0; k < this.levelCode.length; k++) {
                              if (this.levelCode[k].split('_')[1] === data.id) {
                                this.levelCode[k] = this.selectModel[j].paramCode + '_' + data.id
                              } else {
                                this.levelCode.push(this.selectModel[j].paramCode + '_' + data.id)
                              }
                            }
                          }

                        }
                      }
                      console.log(typeof uniqArr(this.levelCode))
                    },
                  },
                  style: {
                    width: '150px',
                    display: this.selectId.includes(data.id)  ?  'block' : 'none',
                  },
                }, [
                  this.selectModel.map(item => {
                   return h('Option', {
                      props: {
                        value: item.paramInfoCn,
                        label: item.paramInfoName,
                      },
                    })
                  })
                ])
              ],
            ),
          ],
        )
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'grade',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectModel = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        let temData = []
        let code = t.code.split(',')
        for(let i = 0; i < code.length; i++) {
          let obj = {}
          obj['pqdBillid'] = t.$store.state.user.masterPublicId
          obj['pqdIndexno'] = code[i]
          obj['pqdLevel'] = uniqArr(t.levelCode)[i].split('_')[0]
          temData.push(obj)
        }
        const data = {
          _mt:  this.$global.mt+'OrgPostqualifiedmodel.updLevelByIds',
          logType: '结果保存',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        data.tag= temData
        t.isSpin = true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
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
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false;
          item.checked = item.authRoleFunDis === '1'
          // item.checked = false;
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
      handleReset() {
        const t = this
        t.$emit("closeLevel")
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
    width: 750px;
     height: 540px !important;
  }
  .col{
    height: 450px;
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
