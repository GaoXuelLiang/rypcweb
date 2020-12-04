<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{title}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span class="btnStyle">
          <Button type="info" style="width:56px" :loading="isSpin"  @click="getData(param, 1)">
            <span v-if="!isSpin">{{$t('button.ser')}}</span>
          </Button>
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin fix v-if="isSpin" size="large"></Spin>
        <Table :no-data-text="noDataImg" height="320" size="small" stripe ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer :current="param.page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange"  :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((param.page - 1) * param.rows + 1)}} - {{param.page*param.rows > total ? total : param.page*param.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
      </Row>
    </div>
  </div>
</template>
<script>
  import searchTable from './searchTable'
  import { getDataLevelUserLoginData, getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'
  import Bus from '../../pages/common/bus'

  export default{
    data() {
      return {
        isSpin: false,
        data: [],
        total: NaN,
        pmtypeCode: '',
        title: searchTable[this.modiaContent].title,
        param: searchTable[this.modiaContent].param,
        valueText: searchTable[this.modiaContent].valueText,
        searchText: searchTable[this.modiaContent].searchText,
        searchCloumns: searchTable[this.modiaContent].searchCloumns,
        thisSffFilter: this.sffFilter,
        thisSffCascadeget: this.sffCascadeget,
        thisForm: this.form,
        noDataImg: '<div id="noData"></div>',
      }
    },
    props: {
      modiaContent: String,
      sffFilter: String, // 过滤条件
      sffCascadeget: String, // 级联条件
      form: Object, // 表单数据
      dataType: String, // 判断是需要返回一个row 还是返回单个数据 随便传一个String返回为row 反之为单个数据
      urlType: String, // 判断是用LoginNew 还是Login  随便传一个String为LoginNew 反之为Login
      dataParame: Object, // 判断LoginNew的方法是否需要在data中添加参数  需要就在父级传值一个对象  反之不用传  参考胜任能力指标页面
    },
    mounted() {
      this.getData(searchTable[this.modiaContent].param, 1)
    },
    methods: {
      // data's form is like this: 'key1=$value1;$value2=key2', the data has '$' is value
      formData(data) {
        let arr = []
        if (data === undefined) {
          return false
        } else {
          let a = data.split(';')
          for (let i = 0; i < a.length; i++) {
            let b = a[i].split('=')
            let obj = {}
            for (let j = 0; j < b.length; j++) {
              if (b[j].substring(0, 1) !== '$') {
                obj['key'] = b[j]
              } else {
                obj['value'] = b[j].substring(1)
              }
            }
            arr.push(obj)
          }
        }
        return arr
      },
      getData(param, page) {
        const t = this
        if (page) {
          t.param.APpage = page
        }
        const data = deepCopy(param)
        let rule = t.formData(t.thisSffFilter)
        if (rule) {
          for (let i = 0; i < rule.length; i++) {
            if (this.$store.state.flowClmkMap.popForm[rule[i].value]) {
              data[rule[i].key] = this.$store.state.flowClmkMap.popForm[rule[i].value]
            } else {
              for (let j = 0; j < Bus.arr.length; j++) {
                if (Bus.arr[j][rule[i].value]) {
                  data[rule[i].key] = Bus.arr[j][rule[i].value]
                  break
                }
              }
            }
          }
        }
        if (t.pmtypeCode !== '') {
          data[t.valueText] = t.pmtypeCode
          if (data['_mt'] ===  this.$global.mt+'BaseTmccity.getPage') data[t.valueText] = `${t.pmtypeCode}&&1` // 选择城市模糊查询单独判断
        }
        if ((JSON.stringify(t.dataParame) !== '{}')) {
          let data1 = t.dataParame
          for (const dat in data1) {
            data[dat] = data1[dat]
          }
        }
        if (t.urlType === undefined) {
          t.isSpin = true
          getDataLevelUserLoginData.then((res) => {
            t.isSpin = false
            if (isSuccess(res, t)) {
              t.data = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
          }).catch(() => {
            t.isSpin = false
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          }).finally(()=>{
            t.isSpin = false
          })
        } else {
          t.isSpin = true
          getDataLevelUserLoginData(data).then((res) => {
            t.isSpin = false
            if (isSuccess(res, t)) {
              t.data = res.data.content[0].rows
              t.total = res.data.content[0].records
            }
          }).catch(() => {
            t.isSpin = false
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      close() {
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
        let aa = t.formData(t.thisSffCascadeget)
        let jldata = {}
        for (let i = 0; i < aa.length; i++) {
          jldata[aa[i].key] = row[aa[i].value]
        }
        t.$emit('setJLData', jldata)
        if (searchTable[this.modiaContent].code) {
          this.$emit('changeinput', row[t.valueText], row[searchTable[this.modiaContent].code], t.modiaContent)
        } else {
          if (this.dataType === undefined) {
            this.$emit('changeinput', row[t.valueText], row.id, t.modiaContent)
          } else {
            this.$emit('changeinput', row, t.modiaContent)
          }
        }
        this.$emit('closeUp')
      },
      sizeChange(size) {
        const t = this
        t.param.AProws = size
        t.getData(t.param)
      },
      pageChange(page) {
        const t = this
        t.param.APpage = page
        t.getData(t.param)
      },
      sortable(column) {
        this.param.APsort = column.key
        this.param.APorder = column.order
        if (column.order !== 'normal') {
          this.getData(this.param)
        } else {
          this.param.APorder = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable";
</style>
