<template>
  <div class="background">
    <div class="backbox">
      <Spin size="large" fix v-if="spinShow">
      </Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择岗位
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <i-col span="14">
           <span @dblclick="clearData()" class="searchInput">
               <Input v-model="postbsSeqDis"  style="width: 200px" placeholder="请选择岗位条线"  @on-click="selectOpen()"></Input>
          </span>
          <Input placeholder="请输入岗位名称" class="searchInput" style="width: 200px" v-model="postbsName"/>
          <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin" @click="getData(params, '', '1')">
           <span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        </i-col>
        <i-col span="10" style="text-align: center">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;请选择基准岗位
        </i-col>
      </Row>
      <Row>
        <i-col span="14">
          <row class="table-form" ref="table-form">
            <Table height="320" size="small" stripe :no-data-text="noDataImg" ref="selection" :columns="searchBnchClo"  @on-select="selectedtable"  @on-select-cancel="selectedtableCancel" @on-select-all="selectedtable" @on-select-all-cancel="selectedtableCancel" @on-sort-change="sortable" :data="data"></Table>
          </row>
        </i-col>
        <i-col span="3" style="height: 320px;line-height: 320px;text-align: center">
          <Button icon="ios-arrow-round-forward" type="dashed" size="small" @click="moveData">添加</Button>
        </i-col>
        <i-col span="7" style="height: 320px;overflow-y: scroll">
          <Tag v-for="(item,index) in orgPostTag" :key="index" :name="index" closable @on-close="handleClose2" size="large">{{item.orgPostName}}</Tag>
          <!--        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>-->
        </i-col>
      </Row>
      <Row style="display: flex">
        <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
        <Button style="position: absolute;right: 0;" type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </Row>
    </div>
    <autoSearchtable
      v-if="showModal"
      @closeUp="closeModal"
      :modiaContent=modiaContent
      :dataParame=dataParame
      dataType="row"
      @changeinput="changeinput1"
      urlType="loginNew">
    </autoSearchtable>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import {isSuccess, deepCopy, uniqObj} from '../../lib/util'

  export default{
    data() {
      return {
        data: [],
        spinShow:false,
        noDataImg: '<div id="noData"></div>',
        total: NaN,
        current: NaN,
        postbsName: '',
        postbsSeqDis: '',
        postbsSeq: '',
        theCityType: '',
        tableselected: [],
        tableselected1: [],
        isSpin: false,
        showModal: false,
        modiaContent: 'org-Postseq-std',
        dataParame: {},
        orgPostTag: [],
        selectionArr: [],
      }
    },
    props: {
      searchText: String,
      searchBnchClo: Array,
      params: Object,
      searchText1: String,
      searchText2: String,
    },
    mounted() {
    },
    methods: {
      getData(params, cityType, page) {
        const t = this
        t.spinShow = true
        const data = deepCopy(params)
//        if (t.theCityType === '') {
//          t.theCityType = cityType
//        }
        if (page) {
          data.page = page
        }
//        data.cityType = t.theCityType
        data.postbsName = t.postbsName
        data.postbsSeq = t.postbsSeq
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin =true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin =false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            t.current = res.data.content[0].page
          }
        }).catch(() => {
          t.isSpin =false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false
        })
      },
      close() {
        this.postbsName = ''
        this.theCityType = ''
        this.postbsSeqDis = ''
        this.postbsSeq = ''
        this.params.page = 1
        this.$emit('closeUpBn')
      },
      dbCkick(row) {
        const t = this
        this.$emit('changeinput', row[t.searchBnchClo[0].key], row.id, row['cityType'])
        t.close()
      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getData(t.params)
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getData(t.params)
      },
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.order = 'desc'
        }
      },
      handleClose2(event, tagIndex) {
        const t = this
        t.orgPostTag.forEach((item, index) => {
          if (index === tagIndex) {
            for (let i in t.$refs.selection.objData) {
              if (item.id === t.$refs.selection.objData[i].id) {
                t.$refs.selection.objData[i]._isChecked = false
              }
            }
          }
        })
        this.orgPostTag.splice(tagIndex, 1)
        this.selectionArr.splice(tagIndex, 1)
      },
      selectedtable(selection) {
        const t = this
        selection.forEach((item) => {
          let obj = {}
          obj.id = item.id
          obj.orgPostName = item.postbsName
          this.selectionArr.push(obj)
        })
        t.selectionArr = uniqObj(t.selectionArr)
      },
      selectedtableCancel(selection, row) {
        const t = this
        if (row === undefined) {
          t.selectionArr = []
          return
        }
        t.selectionArr = t.selectionArr.filter((item, index) => {
          return item.id !== row.id
        })
      },
      moveData() {
        const t = this
        t.orgPostTag = []
        this.selectionArr.forEach((item, index) => {
          let obj = {}
          obj.id = item.id
          obj.orgPostName = item.orgPostName
          t.orgPostTag.push(obj)
        })
        t.orgPostTag = uniqObj(t.orgPostTag)
      },
      handleSubmit() {
        const t = this
        let id = []
        let value = []
        this.orgPostTag.forEach((item, index) => {
          id.push(item.id)
          value.push(item.orgPostName)
        })
        this.$emit('inputBnchClo', id, value)
        this.$emit('closeUp')
        this.selectionArr = []
      },
      changTagData(id, value) {
        console.log(value)
        console.log(id)
        const t = this
        if (value && id) {
          id.split(',').forEach((item, index) => {
            let obj = {}
            obj.id = item
            obj.orgPostName = value.split(',')[index]
            t.orgPostTag.push(obj)
            t.selectionArr.push(obj)
          })
        }
        t.orgPostTag = uniqObj(t.orgPostTag)
      },
      /*
      * 弹出选择
      * */
      selectOpen() {
        const t = this
        t.showModal = true
      },
      clearData() {
        const t = this
        t.postbsSeqDis = ''
        t.postbsSeq = ''
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        t.postbsSeqDis = row.seqName
        t.postbsSeq = row.id
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
      width: 900px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
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
  .searchInput{
    margin-right: 5px;
  }
</style>
