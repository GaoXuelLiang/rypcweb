<template>
  <div class="content-main datablock2">
    <Row class="btnHeight">
<!--      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>-->
      <!-- <Button type="primary" @click="defineField">字段定义</Button> -->
<!--      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    </Row>
    <row class="table-form" ref="table-form">
      <Table :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" stripe ref="selection" :columns="columns" :data="$store.state.platApproval.childTable6"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>

    <!-- 新增页面 -->
    <updDataBloack v-show="showMsg" @hideMsg="hideMsg" ref="updDataBloack" :logType="logType"></updDataBloack>

    <!-- 字段定义页面 -->
    <fieldDefinition v-show="showField" @hideField="hideField" ref="fieldDefinition"></fieldDefinition>

  </div>
</template>
<script>
  import updDataBloack from './updDataBloack'
  import fieldDefinition from './fieldDefinition'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  //  引入字段定义页面

  export default {
    data() {
      return {
        loading: false,
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        childTableHeight: 0,
        pageHeight:'datablock2',
        noDataImg: '<div id="noData"></div>',
        showMsg: false,
        showField: false, //  控制字段定义页面是否显示
        getId: '',  //  获取步骤表单定义id
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
          },
          {
            title: this.$t('lang_approval.dataBlock.aprvdbOrder'),
            key: 'aprvdbOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.dataBlock.aprvdbTitlecn'),
            key: 'aprvdbTitlecn',
          },
          /*          {
                      title: this.$t('lang_approval.dataBlock.aprvdbTitleen'),
                      key: 'aprvdbTitleen',
                    }, */
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 150,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
//                    marginRight: '5px',
                    display: params.row.aprvdbType === '02subtable' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.defineField(params.row.id)
                    },
                  },
                }, this.$t('lang_approval.dataBlock.defineField')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updDataBloack,
      fieldDefinition,
    },
    methods: {
      getdata(page) {
        const t = this;
        t.loading = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatAprvdatablock.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          aprvdbAprvid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('platApproval/setChildTable6', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('platApproval/setChildTable6', [])
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false;
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getdata()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata()
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
                _mt:  this.$global.mt+'PlatAprvdatablock.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata()
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
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        this.$store.commit('platApproval/setIndex', index)
        this.$store.commit('platApproval/setChildId6', id)
        if (id) {
          t.$refs.updDataBloack.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      // 字段定义页面显示 start
      defineField(id) {
        const t = this
        this.showField = true
        t.$refs.fieldDefinition.getOptional(id)
        t.$refs.fieldDefinition.getselected(id)
        t.$refs.fieldDefinition.resetField()
      },
      hideField() {
        this.showField = false
      },
      // 字段定义页面显示 end
      getTableHeight () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
      }
    },
    destroyed () {
      window.onresize = null;
    },
  }
</script>
<style lang="scss" scoped>
@import "../../../sass/childTable.scss";
</style>
