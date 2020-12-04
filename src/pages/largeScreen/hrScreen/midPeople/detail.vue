<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;员工总数人员信息
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="18"></Icon>
        </Button>
      </div>
      <Row class="content" ref="table-form">
        <Spin fix size="large" v-if="loading"></Spin>
        <Table size="small" border ref="selection" height="400"
          :columns="columns" @on-sort-change="sortable" :data="data"
          @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" >
        </Table>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'

  export default {
    data() {
      return {
        data: [],
        tableheight: document.body.offsetHeight - 150,
        tableselected: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        columns: [
          {
            title: '员工姓名',
            key: 'empCname',
            width: 120,
          },
          {
            title: '员工性别',
            key: 'empGenderDis',
            width: 80,
            align: 'center',
          },
          {
            title: '公司',
            key: 'empcompHirecompanyDis',
            align: 'center',
            width: 200,
          },
          {
            title: '部门',
            key: 'empcompDeptDis',
            align: 'center',
            width: 120,
          },
          {
            title: '岗位',
            key: 'empcompPostDis',
            align: 'center',
            width: 120,

          },
        ],
        oneLvType: '',
        loading: false,
      }
    },
    props: {
      reportType: String,
      empcompHirecompany: String,
    },
    methods: {
      handleReset() {
        this.data = []
        this.dataObj = {}
        this.$emit('closeInfo')
      },
      getData() {
        const t = this
        t.loading = true
        const dataObj = {
          _mt:  this.$global.mt+'AnsrptEmpChg.rtnEveryStateEmpDetailPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '穿透查询',
          empcompHirecompany: '',
          type: '',
        }
        if (t.reportType) {
          dataObj.type = t.reportType
        }
        if (t.empcompHirecompany) {
          dataObj.empcompHirecompany = t.empcompHirecompany
        }
        console.log(t.dataObj)
        getDataLevelUserLoginNew(dataObj).then((res) => {
          t.loading = false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
    },
  }
</script>
<style lang="scss" scoped>
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
      .form{
        max-height: 600px;
        overflow-y: auto;
      }
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
      .content{
        min-height: 420px;
        // overflow:auto;
      }
    }
  }
</style>
