<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <DatePicker
          v-model="sdate"
          :placeholder="'请选择生效日期'"
          @on-change="DataChange(sdate)"
          :editable="false"
        ></DatePicker>
        <span style="margin-left: 10px;">
          <Button type="info" :loading="isSpin" @click="getData(1)"><span v-if='!isSpin'>{{$t('button.ser')}}</span></Button>
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table
          stripe
          :loading="loading"
          height="320"
          size="small"
          border
          ref="selection"
          :columns="searchCloumns"
          @on-sort-change="sortable"
          :data="data"
        ></Table>
      </row>
      <Row style="display: flex">
        <Page
          :total="total"
          size="small"
          show-elevator
          show-sizer
          placement="top"
          :current="params.APpage"
          @on-page-size-change="sizeChange"
          @on-change="pageChange"
          :page-size-opts="[10, 20, 50, 100]"
        ></Page>
        <span style="margin-left: 10px;margin-top: 2px">
          {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}} {{$t('reminder.of')}}
          <span>{{total}}</span>
        </span>
      </Row>
    </div>
    <transition name="fade">
      <viewtree
        v-show="openViewtree"
        :logType="logType"
        @closeUp="closeUp"
        ref="viewtree"
      ></viewtree>
    </transition>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import viewtree from './updaOrgTree'
export default{
  data() {
    return {
        sdate:'',
        openViewtree:false,
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      pmtypeCode: '',
      params:{
          _mt:  this.$global.mt+'OrgUnits.getsDateList',
          APsort: 'id',
          APorder: 'desc',
          AProws: '10',
          APpage: 1,
          APffk:'0'
      },
    searchCloumns: [
          {
            title: '公司',
            key: 'companyIdDis',
          },
          {
            title: '时间',
            key: 'opeTimeDis',
          },
          {
                    title: "操作",
                    key: "action",
                    width: 130,
                    fixed: "right",
                    align: "center",
                    render: (h, params) => {
                        return h("div", {
                        }, [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.openViewOrUpModel(
                                                params.row.id,
                                                params.row.opeTimeDis,
                                                "查看组织树"
                                            );
                                        }
                                    }
                                },
                                "查看组织树"
                            ),

                        ]);
                    }
                }
        ],
    }
  },
  props: {
    logType: String,
  },
  components:{
      viewtree
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this;
      t.loading = true;
      t.isSpin = true;
      if (page) {
        t.params.APpage = page
      }
      const data = deepCopy(t.params)
        data.sdate = t.sdate
      getDataLevelUserLoginData(data).then((res) => {
        if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      }).finally(()=>{
          t.loading = false;
          t.isSpin = false;
        })
    },
     //日期修改
    DataChange (item) {
        if (item) {
            this.sdate = new Date(item).format('yyyy-MM-dd')
        }
    },
    // 查看组织树
    openViewOrUpModel(id, time, logType){
        const t = this
        t.openViewtree = true
        t.$refs.viewtree.getData(id, time)
    },
    close() {
      this.params.APpage = 1
      this.sdate = ''
      this.$emit('closeUp')
    },
    closeUp(){
        const t = this
        t.openViewtree = false
    },
    // dbCkick(row) {
    //   const t = this
    //   this.close()
    //   this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
    //   this.$emit('closeUp')
    // },
    // clear() {
    //   this.$emit('clear')
    //   this.$emit('closeUp')
    // },
    sizeChange(size) {
      const t = this
      t.params.AProws = size
      t.getData(t.params)
    },
    pageChange(page) {
      const t = this
      t.params.APpage = page
      t.getData(t.params)
    },
    sortable(column) {
      this.params.APsort = column.key
      this.params.APorder = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      } else {
        this.params.APorder = ''
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.table-form {
  margin-bottom: 10px;
}
.background {
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
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  .backbox {
    position: relative;
    width: 800px;
    background-color: #fff;
    padding: 50px 20px 10px 20px;
    border-radius: 10px;
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
  }
}
</style>
