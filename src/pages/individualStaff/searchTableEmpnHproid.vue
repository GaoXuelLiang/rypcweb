<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{title}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_baseManage.baseCity.cityNameDis')" style="width: 200px" v-model="cityName"/>
        <span style="margin-left: 10px;"><Button type="info"  @click="search" :loading='isSpinTable'><span v-if='!isSpinTable'>{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" stripe  ref="selection" :loading='loading' :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew,getDataLevelUserLoginData } from '../../axios/axios'
  import { isSuccessNew, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        name:'',
        type:'',
        isSpinTable:false,
        loading:false,
        data: [],
        total: NaN,
        cityName: '',
        theCityType: '',
        searchCloumns:[],
        params: {
          _mt:  this.$global.mt+'BaseCity.getPage',
          APsort: 'id',
          APorder: 'desc',
          AProws: 10,
          APpage: 1,
          APlogType: this.$t('button.ser'),
          cityType: '01prov',
          cityPid: '',
          APffk:0
//          data: '{"cityType":"02city","cityIsvalid" : "1"}',
        },
      }
    },
    props: {
        title:String
    },
    mounted() {
    },
    methods: {
        search() {
        this.params.APpage = 1
        this.getData()
      },
      getData(name,type,cityType,cityPid,col) {
        const t = this
        t.isSpinTable = true
        t.loading = true
        if(name&&type){
            t.name = name
            t.type = type
        }
        if(cityType){
            this.params.cityType = cityType
        }
        if(cityPid){
            this.params.cityPid = cityPid
        }
        t.searchCloumns= [
          {
            title: t.name,
            key: 'cityName',
            sortable: 'custom',
          },
          {
            title: t.type,
            key: 'cityTypeDis',
            sortable: 'custom',
          },
        ]
        if(col) {
          t.searchCloumns.unshift(col)
        }
        const data = deepCopy(this.params)
        data['cityName'] = t.cityName
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccessNew(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false
          t.isSpinTable = false
        })
      },
      close() {
        this.cityName = ''
        this.theCityType = ''
        this.searchCloumns = []
        this.params.APpage = 1
        this.params.cityPid  = ''
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
        if(t.title == '户口所在省'){
            this.$emit('changeinputEmpnHproid', row)
        }else if(t.title == '户口所在市'){
             this.$emit('changeinputEmpnHcityid', row)
        }else if(t.title == '户口所在区'){
             this.$emit('changeinputEmpnHcouid', row)
        }else if(t.title == '现居住地所在省'){
             this.$emit('changeinputaddrProid', row)
        }else if(t.title == '现居住地所在市'){
            this.$emit('changeinputaddrCityid', row)
        }else if(t.title == '现居住地所在区县'){
            this.$emit('changeinputaddrCouid', row)
        }else if(t.title == '身份证所在省'){
            this.$emit('changeinputaddrCardproid', row)
        }else if(t.title == '身份证所在市'){
            this.$emit('changeinputaddrCardid', row)
        }else if(t.title == '身份证所在区县'){
            this.$emit('changeinputaddrCardcouid', row)
        }else if(t.title == '主要联系人地址所在省'){
            this.$emit('changeinputfmAdmproid', row)
        }else if(t.title == '主要联系人地址所在市'){
           this.$emit('changeinputfmAdmcd', row)
        }else if(t.title == '主要联系人地址所在区县'){
            this.$emit('changeinputfmAdmcouid', row)
        }else if(t.title == '人事档案所在地'){
            this.$emit('changeinputempPerarch', row)
        }else if(t.title == '个税缴纳地'){
            this.$emit('changeinputSocialsecurity', row)
        }else if(t.title == '社保缴纳地') {
            this.$emit('changeinputsecSocplace', row)
        }else if(t.title == '出生地点') {
            this.$emit('changeinputempBirPlace', row)
        }else if(t.title == '籍贯') {
            this.$emit('changeinputEmpnProvid', row)
        }
        t.close()
      },
      sizeChange(size) {
        const t = this
        t.params.AProws = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.params.APpage = page
        t.getData()
      },
      clear() {
        this.cityName = ''
        this.theCityType = ''
        this.params.APpage = 1
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.params.APsort = column.key
        this.params.APorder = column.order
        if (column.order !== 'normal') {
          this.getData()
        } else {
          this.params.APorder = 'desc'
        }
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
      width: 800px;
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
</style>
