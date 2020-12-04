<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row style='margin-bottom: 10px;'>
        <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
        <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
      </Row>
      <Row style='margin-bottom: 10px;'>
        <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border
               ref="selection" :columns="columns" :data="data"></Table>
      </Row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
              @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
        <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;"
                @click="getData(1)"></Button>
      </Row>
      <Row>
        <i-col span="21" offset="1">
          <Row type="flex" justify="end">
            <Button @click="handleReset">{{$t('button.cal')}}</Button>
            <Button type="primary" @click="handleSubmit" style="margin-left: 8px">{{$t('button.sav')}}</Button>
          </Row>
        </i-col>
      </Row>
    </div>
    <!--编辑-->
    <transition name="fade">
      <update v-show="openUpdate" :logType="logTittle" :mainId='id' @closeUpd="closeUpd" @getData="getdata"
              @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './update.vue'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import valid from '../../../lib/pub_valid'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        openUpdate: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '员工',
            key: 'attExerecEmpDis',
            width: 120,
            sortable: 'custom',
          },
          {
            title: '员工工号',
            key: 'attExerecEmpno',
            width: 160,
            sortable: 'custom',
          },
          {
            title: '打卡时间',
            key: 'attExerecChkintime',
            sortable: 'custom',
          },
          {
            title: '进出标志',
            key: 'attExerecRemarkDis',
            width: 160,
            sortable: 'custom',
          },
          {
            title: '是否原始数据',
            key: 'attExerecResource',
            width: 160,
            sortable: 'custom',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                }, params.row.attExerecResource === 'add' ? '是' : '否'),
              ])
            },
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  attrs: {
                    disabled: params.row.attExerecResource === 'add' ? true : false
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, '修改', params.index)
                    },
                  },
                }, '修改'),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt:  this.$global.mt+'AttendExcerec.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          evateActionid: Number,
        },
        total: NaN,
        id: '', // 主表id
        loadingStatus: false,
        logTittle: '',
        comp: '',
        isSend: false,
        jobQueueId: '',
        index: 0,
      }
    },
    props: {
      logType: String,
      years: Array,
    },
    components: {
      update
    },
    mounted() {

    },
    methods: {
      openUp(id, logTittle, index) {
        const t = this
        t.openUpdate = true
        t.logTittle = logTittle
        t.index = index
        t.$refs.update.getSelect()
        if (logTittle === this.$t('button.y.upd')) {
          t.$refs.update.getData(id)
        }
      },
      closeUpd() {
        const t = this
        t.openUpdate = false
      },
      // 新增修改后刷新页面
      updateArray(res) {
        const t = this
        t.getdata()
      },
      getdata(id) {
        const t = this
        t.id = id;
        t.params.logType = '异常考勤子表';
        t.params.attExerecExeid = t.id;
        let data = deepCopy(t.params)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },

      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
        } else {
          this.params.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'AttendExcerec.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
//                attExerecExeid: t.id,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = [] // 记得将选项数组清空
                  t.getdata(t.id)
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {
            },
          })
        }
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      // 保存
      handleSubmit() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AttendExcedata.saveDetermine',
          funId: '1',
          logType: '异常子表保存',
          id: t.id,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
//          if (isSuccess(res, t)) {
//            t.$Modal.success({
//              title: this.$t('reminder.suc'),
//              content: this.$t('reminder.savsuccess'),
//            })
//            t.$emit('closeUpd')
//          }
          if (isSuccess(res, t)) {
            t.comp = window.setInterval(t.countSihfCalcState, 1000)
            t.jobQueueId = res.data.content[0].jobQueueId
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '系统正在进行处理，请稍后。。。',
              onOk: () => {
                t.isSend = true
                clearInterval(t.comp)
              },
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      countSihfCalcState() {
        const t = this
        clearInterval(t.comp)
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'UserJobQueue.compStatusQuery',
          jobueueId: t.jobQueueId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].status !== '100') {
              setTimeout(() => {
                if (!t.isSend) {
                  t.countSihfCalcState()
                } else {
                  t.isSend = false
                }
              }, 1000)
            } else {
              t.isSend = false
              clearInterval(t.comp)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.suc'),
                onOk: () => {
                  t.isSend = false
                  t.$emit('closeUpd')
                },
              })
            }
          } else {
            clearInterval(t.comp)
          }
        }).catch(() => {
          clearInterval(t.comp)
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
//        t.attUpdrecDeptidDis = '';
        this.$emit('closeUpd')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover {
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
    background-color: rgba(0, 0, 0, .5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
      position: relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .form {
        max-height: 800px;
        overflow-y: auto;
      }
      .title {
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
        .title-text {
          font-weight: bold;
          font-size: 14px;
        }
      }
      .content {
        max-height: 400px;
        overflow: auto;
      }
    }
  }
</style>
