<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;补卡申请
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="wrap">
        <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="80">
          <div class="blocksTitle">
            <Icon type="compose" style="margin-right: 5px;"></Icon>
            异常考勤
          </div>
          <row class="table-form" ref="table-form">
            <Spin fix v-if="isSpin" size="large"></Spin>
            <Table size="small" border ref="selection" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"
                  :columns="searchCloumns" @on-sort-change="sortable" :data="data" ></Table>
          </row>
          <Row style="display: flex">
            <span>共{{data.length || 0}}条</span>
          </Row>
        </Form>
      </Row>
      <div class="btn-save" style="border-top: 1px solid #ccc;padding-top: 6px;">
        <Button type="primary" style="margin-right: 30px " :loading="isSpin" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew, getDataLevelUserLoginNew2 } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default{
  data() {
    return {
      isSpin: false,
      data: [],
      total: 0,
      fypdYear: '',
      params: {
        _mt:  this.$global.mt+'ApplyAdditionaldetail.getPage',
        sort: 'id',
        order: 'asc',
        rows: 100,
        page: 1,
        logType: '异常考勤',
      },
      searchCloumns: [
        // {
        //   type: 'selection',
        //   width: 54,
        //   align: 'center',
        // },
        {
          title: '考勤日期',
          key: 'addiAttendance',
          // sortable: 'custom',
          width: 100,
        },
        {
          title: '进出标志',
          key: 'addiRemarkDis',
          // sortable: 'custom',
          width: 100,
        },
        {
          title: '考勤结果',
          key: 'addiResult',
          // sortable: 'custom',
          width: 100,
        },
        {
          title: '补卡原因',
          key: 'addiReason',
          width: 300,
          render: (h, params) => {
            return h('div', {
              style: {
                color: 'red',
                padding: '10px 0'
              }

            }, [
              h('Select', {
                style: {
                  marginBottom: '10px',
                },
                props: {
                  value: params.row.addiReason, // 获取选择的下拉框的值
                  clearable: true
                },
                on: {
                  'on-change': e => {
                    params.row.addiReason = e // 改变下拉框赋值
                    // this.data[params.index] = params.row
                    this.data.splice(params.index, 1, params.row)
                  }
                }
              }, this.select.map((item) => { // this.productTypeList下拉框里的data
                return h('Option', { // 下拉框的值
                  props: {
                    value: item.paramCode,
                    label: item.paramInfoName
                  }
                })
              })),
              h('div', {
              }, [
                h('Input', {
                  props: {
                    value: params.row.addiOutreason,
                    placeholder: '请输入公出原因'
                  },
                  style: {
                    display: params.row.addiReason === '03offBusiness' ? 'inline' : 'none',
                  },
                  on: {
                    'on-blur': e => {
                      params.row.addiOutreason = e.target.value // 改变下拉框赋值
                      // this.data[params.index] = params.row
                      this.data.splice(params.index, 1, params.row)
                    }
                  }
                }),
                  
                ], ''),

            ], 'qqq')
          }
        }
      ],
      tableselected: [],
      tableselectedDis: [],
      select: [],
      // stfType: '',
      addiEmpid: '',
      upFormData: {
        // stfType: '',
      },
      ruleValidate: {
        // stfType: [
        //   { required: true, message: '请选择补卡原因', trigger: 'change' },
        // ],
      },
      rows: 10,
      page: 1,
      sort: 'id', // 排序字段
      order: 'asc', // 排序类型
    }
  },
  props: {
  },
  methods: {
    getData(page) {
      const t = this
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      data.addiEmpid = localStorage.getItem('empId')
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      t.isSpin = true
      t.data = []
      t.tableselected = []
      t.total = 0
      getDataLevelUserLoginNew(data).then((res) => {
        t.isSpin = false
        if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          // t.total = res.data.content[0].records
        }
      }).catch(() => {
        t.isSpin = false
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    close() {
      const t = this
      t.data = []
      t.total = 0
      t.tableselected = []
      this.sort = 'id'
      this.order = 'desc'
      this.params.page = 1
      this.upFormData = {
      }
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row)
      this.$emit('closeUp')
    },
    clear() {
      this.sort = 'id'
      this.order = 'desc'
      this.params.page = 1
      this.fypdYear = ''
      this.$emit('clear')
      this.$emit('closeUp')
    },
    sizeChange(size) {
      const t = this
      t.params.rows = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.params.page = page
      t.getData()
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData()
      } else {
        this.params.order = 'desc'
      }
    },
    selectedtable(selection) {
      const newArr = []
      const newArrDis = []
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id)
      }
      this.tableselected = newArr
    },
    /**
     * @name: 保存
     * @param {type}
     * @return:
     */
    save() {
      const t = this
      // if (!t.tableselected.length) {
      //   t.$Modal.warning({
      //     title: this.$t('reminder.remind'),
      //     content: this.$t('reminder.leastone'),
      //   })
      //   return
      // }
      // let newArr = t.data.filter((item) => {
      //   return  t.tableselected.includes(item.id)
      // })
      // if (!newArr.length) {
      //   t.$Modal.warning({
      //     title: this.$t('reminder.remind'),
      //     content: '请选择勾选项的补卡原因',
      //   })
      //   return
      // }
      // let flag = true
      // let addlist = []
      // newArr.forEach((item, index) => {
      //   if (!item.addiReason) {
      //       t.$Modal.warning({
      //         title: this.$t('reminder.remind'),
      //         content: '请选择勾选项的补卡原因',
      //       })
      //       flag = false
      //   }
      //   addlist.push(item)
      // })
      
      let newArr = t.data.filter((item) => {
        return  !!item.addiReason
      })
      if (!newArr.length) {
        t.$Modal.warning({
          title: this.$t('reminder.remind'),
          content: '请选择补卡原因',
        })
        return
      }
      let flag = true
      newArr.forEach((item, index) => {
        if (item.addiReason === '03offBusiness' && !item.addiOutreason) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '请输入公出原因',
            })
            flag = false
        }
        if (item.addiReason !== '03offBusiness') item.addiOutreason = ''
      })
      if (!flag) return
      const data = {
        _mt:  this.$global.mt+'ApplyAdditionaldetail.genAddtitionProcess',
        logType: '保存补卡',
        addiDataid: localStorage.getItem('empId'),
        addlist: JSON.stringify(newArr),
      }
      t.isSpin = true
      getDataLevelUserLogin(data).then((res) => {
        t.isSpin = false
        if (isSuccess(res, t)) {
          t.$Modal.success({
            title: this.$t('reminder.suc'),
            content: '提交成功',
          })
          t.close()
        }
      }).catch(() => {
        t.isSpin = false
      })
    },
    // 下拉
    getSelect() {
      const t = this
      getDataLevelUserLogin({
        _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
        typeCode: 'attResrecReason',
      }).then((res) => {
        if (isSuccess(res, t)) {
          t.select = res.data.content[0].value[0].paramList || []
        }
      }).catch(() => {
        this.$Modal.warning({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },

  },
}
</script>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .background{
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
  .backbox{
    position:relative;
    width: 1000px;
    height: 80%;
    background-color: #fff;
    padding: 60px 20px 10px 20px;
    border-radius: 10px;
  .title{
    display: flex;
    position: absolute;
    height: 40px;
    width: 100%;
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
  }
  }
  .btn-save{
    text-align: right;
    margin-top: 10px;
  }
  .wrap{
    height: calc(100% - 50px);
    padding-right: 10px;
    overflow-y: scroll;
  }
  .blocksTitle {
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    margin-bottom: 10px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
  }
</style>
