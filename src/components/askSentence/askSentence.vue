<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;相似问法
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row style="font-size: 14px;margin-bottom: 15px;">
        标准问题：<span style="font-size: 16px;">{{cmutCorpTitle}}</span>
      </Row>
      <Row style="font-size: 14px;margin-bottom: 10px;">已有相似问句(<span style="font-weight: bold;">{{data.length}}</span>)</Row>
      <Row style="font-size: 14px;margin-bottom: 10px;">
        <Input placeholder="请输入相似问句添加" style="width: 300px" v-model.trim="content"/>
        <Button type="primary" @click="addAsk">添加</Button>
        <Button type="error" @click="deleteAsk">删除</Button>
      </Row>
      <row class="table-form" ref="table-form">
        <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
      </row>
      <Row type="flex" justify="end">
          <Button @click="handleReset" style="margin-left: 8px">{{$t('button.clo')}}</Button>
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
        cmutCorpTitle: '',
        askId: '',
        askType: '',
        tableselected: [],
        tableheight: 300,
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '相似问法',
            key: 'cmutSmlQuestion',
          },
        ],
        data: [],
        content: '',
      }
    },
    props: {},
    mounted() {
    },
    methods: {
      getData(id, name, type) {
        const t = this
        t.cmutCorpTitle = name || t.cmutCorpTitle
        t.askId = id || t.askId
        t.askType = type || t.askType
        t.data = []
        getDataLevelUserLoginNew({
          _mt:  this.$global.mt+'CmutSimilar.getByObject',
          logType: '相似问法',
          cmutSmlDataid: t.askId,
          cmutSmlType: t.askType,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].value || []
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      addAsk() {
        const t = this
        if (!t.content) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请输入相似问句',
          })
        } else {
          getDataLevelUserLoginNew({
            _mt:  this.$global.mt+'CmutSimilar.addOrUpd',
            logType: '相似问法新增',
            cmutSmlDataid: t.askId,
            cmutSmlType: t.askType,
            cmutSmlQuestion: t.content,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getData()
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      deleteAsk() {
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
                _mt:  this.$global.mt+'CmutSimilar.delByIds',
                funId: '1',
                companyId: '1',
                logType: t.$t('button.del'),
                ids: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {},
          })
        }
      },
      handleReset() {
        this.content = ''
        this.$emit('closeAsk')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
  .table-form{
    margin: 10px 0;
  }
</style>
