<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_root.getDefine.title')}}
        </p>
        <Row class="btnHeight">
          <Input :placeholder="$t('lang_root.getDefine.p_markorname')" style="width: 200px" v-model="gvfMarkOrName"/>

          <span style="margin-left: 5px;"><Button type="info"  style="width:56px" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="warning"  style="margin-left: 5px;" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>

          <Button type="error" style="margin-left: 5px;" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table @on-select="selectedtable" :no-data-text="noDataImg" :loading='loading' :height='tableheight' @on-select-cancel="selectedtable"@on-sort-change="sortable"  @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"  size="small" stripe ref="selection" :columns="columns" :data="$store.state.platGetValDefine.mainTable"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" :current="page" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" @closeUp="closeUp" :logType="logType" :index="index" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './updAndAdd'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'

  export default{
    name: 'platGetValDefineList',
    data() {
      return {
        noDataImg: '<div id="noData"></div>',
        isSpin:false,
        loading:false,
        tableheight: document.body.offsetHeight - 240,
        value: '',
        logType: '',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_root.getDefine.gvfMark'),
            key: 'gvfMark',
//          width: 180,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_root.getDefine.gvfName'),
            key: 'gvfName',
//          width: 180,
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    // marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        total: NaN, // 总页数
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        gvfMarkOrName: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.gvfMarkOrName = ''
        t.getData(1)
      }
    },
        mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
      getData(page) {
        const t = this
        t.loading = true
        t.isSpin = true
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatGetValDefine.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: t.funId,
          logType: this.$t('button.ser'),
          gvfMark: t.gvfMarkOrName,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
//          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('platGetValDefine/setMainTable', res.data.content[0].rows)
            } else {
              this.$store.commit('platGetValDefine/setMainTable', [])
            }
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false
          t.isSpin = false
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
          _mt:  this.$global.mt+'PlatGetValDefine.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected.toString(),
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
      /*
      * 打开弹出页面的方法
      * */
      openUp(id, logType, index) {
        const t = this
        t.logType = logType
        t.openUpdate = true
        t.index = index
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('platGetValDefine/setMainId', id)
        this.$store.commit('platGetValDefine/setIndex', index)
        if (id) {
          t.$refs.update.getOptionData()
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }

</style>
