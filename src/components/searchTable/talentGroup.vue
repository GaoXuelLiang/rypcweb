<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16" style="margin-right: 10px;"></Icon>&nbsp;组织信息
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="18"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Col span="24" class="colTree" >
          <div class="divtree"  >
            <Tree v-if="dataTree != ''" :data="dataTree" :load-data="loadData"
              @on-select-change="selectChange" :render="renderContent"></Tree>
            <Spin v-if="leftloading" size="large" fix></Spin>
          </div>
          <div  class="inners">
            <Row>
              <span>
                组织范围：
              </span>
              <span>
                {{groupScope}}
              </span>
            </Row>
            <Row v-show="isShowRadio">
              <RadioGroup v-model="isDeptChilds">
                <Radio label="1">所选组织及其下属组织</Radio>
                <Radio label="0">仅所选组织</Radio>
              </RadioGroup>
            </Row>
          </div>
          <Row type="flex" justify="end" style="margin-top:10px">
            <Button :loading="loading2" type="info" @click="saveData()">确认</Button>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'
export default {
  data() {
    return {
      data: [],
      dataTree: '',
      loading1: false,
      leftloading: false,
      loading2: false,
      groupScope: '',
      isDeptChilds: '1',
      rowData: {},
      isShowRadio: true,
    }
  },
  props: {

  },
  mounted() {
    this.getTree('0')
  },
  methods: {
    loadData(item, callback) {
      const t = this
      const data = {
        _mt:  this.$global.mt+'OrgUnits.getTreeChildByOrg',
        logType: this.$t('button.ser'),
        unitPid: item.id,
        isNeedEmp: false
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          t.leftloading = false
          if(res.data.content[0].hasOwnProperty('value')){
            const newData = t.toTree(res.data.content[0].value)
            callback(newData)
          } else {
            callback([])
            if (item.expand) {
              item.expand = false
            } else {
              item.expand = true
            }
          }
        }
      }).catch(() => {
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    getTree(id) {
      const t = this
      t.leftloading = true
      const data = {
        _mt:  this.$global.mt+'OrgUnits.getTreeChildByOrg',
        logType: '集团树查询',
        unitPid: id,
        isNeedEmp: false
      }
      getDataLevelUserLoginNew(data).then((res) => {
        t.leftloading = false
        if (isSuccess(res, t)) {
          if(res.data.content[0].hasOwnProperty('value')){
            setTimeout(() => {
              if (res.data.content[0].value) {
                t.dataTree = t.toTree(res.data.content[0].value)
              } else {
                return;
              }
            }, 500)
          } else {
            t.dataTree = [];
          }
        }
      }).catch(() => {
        t.leftloading = false
        t.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    /* 把后台数据转化为tree的格式 左侧 */
    toTree(data) {
      data.forEach((item) => {
        item.expand = false
        item.title = item.unitDesc
        item.children = []
        item.loading = false
        if (item.id === 'unit1000') {
          item.expand = true
        }
      })
      const map = {}
      data.forEach((item) => {
        map[item.id] = item
      })
      const val = []
      data.forEach((item) => {
        const parent = map[item.cruxOrg]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          val.push(item)
        }
      })
      return val
    },
    renderContent(h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%',
        },
      }, [
        h('Button', {
          props: {
            type: 'text',
            size: 'small',
          },
          on: {
            click: () => { this.selectChange(data) },
          },
        }, [
          h('span', data.title),
        ]),
      ])
    },
    /* 树点击事件 */
    selectChange(e) {
      const t = this
      t.rowData = e
      t.groupScope = e.unitOrgscope
    },
    saveData(){
      const t = this
      t.$emit('inputGroup', t.rowData.id, t.rowData.unitDesc, t.isDeptChilds, t.rowData.unitOrgscope)
      t.$emit('closeGroup')
    },
    handleReset() {
      const t = this
      t.$emit('closeGroup')
    },
    hideRadio() {
      this.isShowRadio = false
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
  .cover{
	  position: fixed;
	  overflow: auto;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: rgba(0,0,0,.5);
	  -webkit-overflow-scrolling: touch;
	  outline: 0;
	  .box{
	    position:relative;
	    width: 900px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .title{
	      display: flex;
	      position: absolute;
	      height: 40px;
	      width: 98%;
	      line-height: 40px;
	      justify-content: space-between;
	      align-items: center;
	      padding-left: 20px;
	      top: 0;
	      border-bottom: 1px solid #efefef;
	      left: 0;
	      .title-text{
	        font-weight: bold;
	        font-size: 14px;
	      }
	    }
      .content{
        max-height: 450px;
        overflow:auto;
        .divtree {
          height: 300px;
          overflow: auto;
          width: 100%;
        }
        .inners {
          margin-top: 10px;
          div {
            height: 40px;
            line-height: 40px;
            vertical-align: baseline;
          }
        }
      }
	  }
	}

</style>
