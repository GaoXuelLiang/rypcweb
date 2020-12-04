<!--九宫格分析-->
<template>
  <div style="width: 100%;height:100%;">
    <Row class="nine_tit">
       <Col class="nine_tit1">
          <Select v-model="timeName" placeholder="选择年份" @on-change="getData">
            <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index" >{{item.fyYear}}</Option>
          </Select>
      </Col>
    </Row>
    <Row style="width:100%;height:85%;color:rgba(255,255,255,1);">
      <div class="gridview_y" >{{indNamey}}</div>
      <div class="gridview_y" style="top: 14%" >{{y1}}</div>
      <div class="gridview_y" style="top: 38%">{{y2}}</div>
      <div class="gridview_y" style="top: 66%">{{y3}}</div>
      <div class="clearfloat gridview_bg">
        <div class="gridview_inner " v-for="(item,index) in tableAll" :key="index" @click="showStaff(item.children, item.id)"
          :class="item.showColor == 1 ? 'inner_1' : item.showColor == 2 ? 'inner_2': 'inner_3'">
            <Poptip class="gridview_pop" v-if="item.change == true" trigger="hover" :content="item.showName" >
              <span class="gridview_span"  v-html="item.childrenShow"></span>
            </Poptip>
            <span class="gridview_span"  v-else v-html="item.childrenShow"></span>
        </div>
      </div>
      <div class="gridview_x" style="left: 25%;">{{x3}}</div>
      <div class="gridview_x2">{{x2}}</div>
      <div class="gridview_x3">{{x1}}</div>
      <div class="gridview_x" style="left: 90%;">{{indNamex}}</div>
    </Row>
    <!-- <update v-if="showUpdate" @close = 'close' ref="update"></update> -->
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  // import update from './update'
  import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
  import Bus from '../../../../lib/bus'
  export default {
    data() {
      return {
        indNamex: '',
        indNamey: '',
        y1:  '',
        y2:  '',
        y3: '',
        x1: '',
        x2: '',
        x3: '',
        timeName: '',
        showModal: false,
        changeBg: false,
        data: '',
        dataCoords: '',
        statusCode: '',
        dropdownMenuList: [],
        selectFyear: [],
        tableAll: [],
        tableData: [
          {
            x_line:'C',
            y_line:'A',
            children:'E',
            childrenShow:'E',
            change:false,
            showColor: 1,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'A',
            children:'C',
            childrenShow:'C',
            change:false,
            showColor: 2,
            showName: '',
            id: '',
          },
          {
            x_line: 'A',
            y_line: 'A',
            children:'A',
            childrenShow:'A',
            change:false,
            showColor: 3,
            showName: '',
            id: '',
          },
          {
            x_line:'C',
            y_line:'B',
            children:'G',
            childrenShow:'G',
            change:false,
            showColor: 1,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'B',
            children:'H',
            childrenShow:'H',
            change:false,
            showColor: 2,
            showName: '',
            id: '',
          },
          {
            x_line:'A',
            y_line:'B',
            children:'B',
            childrenShow:'B',
            change:false,
            showColor: 3,
            showName: '',
            id: '',
          },
          {
            x_line:'C',
            y_line:'C',
            children:'I',
            childrenShow:'I',
            change:false,
            showColor: 1,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'C',
            children:'F',
            childrenShow:'F',
            change:false,
            showColor: 2,
            showName: '',
            id: '',
          },
          {
            x_line:'A',
            y_line:'C',
            children:'D',
            childrenShow:'D',
            change:false,
            showColor: 3,
            showName: '',
            id: '',
          },
        ],
        tableData2: [
          {
            x_line:'C',
            y_line:'A',
            children:'D',
            childrenShow:'D',
            change:false,
            showColor: 3,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'A',
            children:'B',
            childrenShow:'B',
            change:false,
            showColor: 3,
            showName: '',
            id: '',
          },
          {
            x_line:'A',
            y_line:'A',
            children:'A',
            childrenShow:'A',
            showColor: 3,
            change:false,
            showName: '',
            id: '',
          },
          {
            x_line:'C',
            y_line:'B',
            children:'F',
            childrenShow:'F',
            showColor: 2,
            change:false,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'B',
            children:'H',
            childrenShow:'H',
            showColor: 2,
            change:false,
            showName: '',
            id: '',
          },
          {
            x_line:'A',
            y_line:'B',
            children:'C',
            childrenShow:'C',
            showColor: 2,
            change:false,
            showName: '',
            id: '',
          },
          {
            x_line:'C',
            y_line:'C',
            children:'I',
            childrenShow:'I',
            change:false,
            showColor: 1,
            showName: '',
            id: '',
          },
          {
            x_line:'B',
            y_line:'C',
            children:'G',
            childrenShow:'G',
            showColor: 1,
            change:false,
            showName: '',
            id: '',
          },
          {
            x_line:'A',
            y_line:'C',
            children:'E',
            childrenShow:'E',
            showColor: 1,
            change:false,
            showName: '',
            id: '',
          },
        ],
        showUpdate: false,
        gridType: '',
      }
    },
    components: {
      // update,
    },
    mounted() {
     this.getType()
     this.getGridType()
     this.getYear()
//     this.getNowDate()
      Bus.$on('savePlatApvset', () => {
        this.getGridType()
        this.getData()
      })
    },
    watch: {
      jobPostId() {
        this.getNowDate()
      },
    },
    computed: {
      jobPostId() {
        return this.$store.state.inventoryPortaritSave.inventoryEmpId
      },
    },
    methods: {
      getType() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'DefinitionDataconver.getByObject',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')){
              t.dataCoords = res.data.content[0].value
              for(let i=0;i<t.dataCoords.length;i++){
                if(t.dataCoords[i].defiType ==='01personnelPostMatchingDegree'){
                    t.indNamey = t.dataCoords[i].defiTypeDis
                    if(t.dataCoords[i].defiLevel === '01high'){
                      t.y1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                    }else if (t.dataCoords[i].defiLevel === '02in'){
                      t.y2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                    } else {
                      t.y3 = t.dataCoords[i].defiLevelDis + ': <=' + t.dataCoords[i].defiMax
                    }
                }else {
                    t.indNamex = t.dataCoords[i].defiTypeDis
                    if(t.dataCoords[i].defiLevel === '01high'){
                      t.x1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                    }else if (t.dataCoords[i].defiLevel === '02in'){
                      t.x2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                    } else {
                      t.x3 = t.dataCoords[i].defiLevelDis + ': <=' + t.dataCoords[i].defiMax
                    }
                }
              }
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getData() {
        const t = this
        if (!t.timeName) {
          t.tableAll = []
          return
        }
        const data = {
          _mt:  this.$global.mt+'TalrtpSudoku.getByOrgId',
          year: t.timeName,
          logeType: '九宫格分析'
        }
        data.orgId = t.jobPostId
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')){
              t.data = JSON.parse(res.data.content[0].value)
              t.getGridType()
              if (t.statusCode === '01type') {
                t.tableAll = t.tableData
              } else {
                t.tableAll = t.tableData2
              }
              for (let i = 0; i < t.data.length; i++) {
                for (let j = 0; j < t.tableAll.length; j++) {
                  if (t.data[i].defiNo === t.tableAll[j].children) {
                    if (t.data[i].trptProportion) {
                      if (t.data[i].defiName) {
                        if (t.data[i].defiDefinition) {
                          t.tableAll[j].change = true
                          t.tableAll[j].showName = '定义：' + t.data[i].defiDefinition
                        }else {
                          t.tableAll[j].change = false
                          t.tableAll[j].showName = ''
                        }
                        t.tableAll[j].childrenShow = t.data[i].defiName +'</br>'+ t.data[i].trptProportion
                      } else {
                        t.tableAll[j].change = false
                        t.tableAll[j].showName = ''
                        t.tableAll[j].childrenShow = t.data[i].defiNo +'</br>'+t.data[i].trptProportion
                      }
                    } else {
                      t.tableAll[j].change = false
                      t.tableAll[j].showName = ''
                      t.tableAll[j].childrenShow = t.tableAll[j].children
                    }
                    if (t.data[i].empIds) {
                      t.tableAll[j].id = t.data[i].empIds
                    } else {
                      t.tableAll[j].id = ''
                    }
                  }
                }
              }
            } else {
                t.tableAll = []
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 获取九宫格状态
      getGridType() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatPersonalset.getByUserEmp',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if(res.data.content[0].hasOwnProperty('platSudokuset')){
              t.gridType = res.data.content[0].platSudokuset
            } else {
              t.gridType === '02type'
            }
            if (t.gridType === '01type') {
              t.statusCode =t.gridType
              for(let i=0;i<t.dataCoords.length;i++){
                  if(t.dataCoords[i].defiType ==='01personnelPostMatchingDegree'){
                      t.indNamey = t.dataCoords[i].defiTypeDis
                      if(t.dataCoords[i].defiLevel === '01high'){
                        t.y1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                      }else if (t.dataCoords[i].defiLevel === '02in'){
                        t.y2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                      } else {
                        t.y3 = t.dataCoords[i].defiLevelDis + ': <=' + t.dataCoords[i].defiMax
                      }
                  }else {
                      t.indNamex = t.dataCoords[i].defiTypeDis
                      if(t.dataCoords[i].defiLevel === '01high'){
                        t.x1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                      }else if (t.dataCoords[i].defiLevel === '02in'){
                        t.x2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                      } else {
                        t.x3 = t.dataCoords[i].defiLevelDis + ': <=' + t.dataCoords[i].defiMax
                      }
                  }
              }
            } else {
              t.statusCode = t.gridType
              for(let i=0;i<t.dataCoords.length;i++){
                if(t.dataCoords[i].defiType ==='01personnelPostMatchingDegree'){
                  t.indNamex = t.dataCoords[i].defiTypeDis
                  if(t.dataCoords[i].defiLevel === '01high'){
                    t.x1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                  }else if (t.dataCoords[i].defiLevel === '02in'){
                    t.x2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                  } else {
                    t.x3 = t.dataCoords[i].defiLevelDis + ': <='+ t.dataCoords[i].defiMax
                  }
                }else {
                  t.indNamey = t.dataCoords[i].defiTypeDis
                  if(t.dataCoords[i].defiLevel === '01high'){
                    t.y1 = t.dataCoords[i].defiLevelDis + ': >' + t.dataCoords[i].defiMin
                  }else if (t.dataCoords[i].defiLevel === '02in'){
                    t.y2 = t.dataCoords[i].defiLevelDis + ':' + t.dataCoords[i].defiMin + '-'+ t.dataCoords[i].defiMax
                  } else {
                    t.y3 = t.dataCoords[i].defiLevelDis + ': <=' + t.dataCoords[i].defiMax
                  }
                }
              }
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getNowDate() {
        const t = this
        const nowTime = new Date().format('yyyy-MM-dd')
        const data = {
          _mt:  this.$global.mt+'PlatFiscalyear.getByDate',
          logType: '查询财年',
          date: nowTime,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.timeName = res.data.content[0].fyYear || ''
            t.getData()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getYear() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatFiscalyear.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          logType: '财年列表',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFyear = res.data.content[0].rows
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 员工弹窗
      showStaff(name, id) {
        if(id){
          this.showUpdate = true
          this.$nextTick(() => {
            this.$refs.update.year = this.timeName
            this.$refs.update.name = name
            this.$refs.update.value = id
            this.$refs.update.getData()
          })
        }
      },
      close() {
        const t = this
        t.showUpdate = false
      }
    },
  }
</script>
<style lang="scss" scoped>
.clearfloat:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}
.clearfloat{
  zoom:1
}
/deep/ .ivu-select-selection{
  background-color: rgba(21,32,49,0.5);
  border: 1px solid rgba(67,85,121,1);
}
/deep/ .ivu-select{
  color:rgba(254,254,254,1);
}
/deep/ .ivu-input {
  background-color: rgba(21,32,49,0.5);
  border: 1px solid rgba(67,85,121,1);
  color:rgba(254,254,254,1) !important;
}
/deep/ .ivu-select-item-focus {
  background-color: none;
}
/deep/ .ivu-select-item {
  background-color:#11162f;
  color: #fff;
}
/deep/ .ivu-select-dropdown {
  background-color:#11162f;
}
.gridview_bg {
  width: 80%;
  height: 90%;
  position: absolute;
  left: 18%;
  padding: 6% 0% 0px 4%;
  background: url('../../../../../static/largeScreen/sudoku_zb.png') no-repeat;
  background-position: 4% 20%;
  background-size: 100% 100%;
  .gridview_inner{
    float: left;
    width: 28%;
    height: 25%;
    /*height: 25%;*/
    background-size: 100% 100%;
    box-sizing:border-box;
    text-align:center;
    vertical-align: middle;
    margin-bottom: 5%;
    margin-right: 3%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .gridview_span{
      display: inline-block;
      font-size: 12px;
      text-align: center;
      margin-top: 0;
      color:rgba(255,255,255,1);
    }
    .gridview_pop {
      margin-top: 0;
      display: inline-block;
      font-size: 12px;
      text-align: center;
    }
  }

}
/deep/ .ivu-select-item-focus, .ivu-select-item:hover{
  background: unset;
}
/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 25px;
  line-height: 25px;
}
/deep/ .ivu-select-single .ivu-select-selection {
  height: 25px;
}
.nine_tit {
  text-align: right;
  padding-top: 10px;
  padding-right: 10px;
  height: auto;
}
.nine_tit1 {
  width: 70px;
  height: 25px;
  display: inline-block;
}
.inner_1 {
  background: url('../../../../../static/largeScreen/sudoku_purple.png') no-repeat;
}
.inner_2 {
  background: url('../../../../../static/largeScreen/sudoku_pink.png') no-repeat;
}
.inner_3 {
  background: url('../../../../../static/largeScreen/sudoku_yellow.png') no-repeat;
}
.gridview_y {
  line-height: 12px;
  position: absolute;
  text-align:center;
  font-size:12px;
}
.gridview_x {
  position: absolute;
  font-size:12px;
  bottom: 1%;
}
.gridview_x2  {
  position: absolute;
  font-size:12px;
  left: 50%;
  bottom: 1%;
  }
.gridview_x3  {
  position: absolute;
  font-size:12px;
  left: 72%;
  bottom: 1%;
}
@media screen and (min-width:1400px){
  .nine_tit {
    height: 15%;
  }
  .gridview_x2 .gridview_x3{
    left: 15% !important;
  }
  .gridview_inner .gridview_span, .gridview_inner .gridview_pop {
    margin-top: 10% !important;

  }
  .gridview_bg .gridview_inner {
    margin-bottom: 10%;
    height: 24%;
  }
  .gridview_bg {
    height: 80%;
    left: 20%;
    padding: 5% 0% 0 4%;
  }
  .gridview_inner {
    height: 25%;
  }
  .gridview_x {
    position: absolute;
    font-size:12px;
    bottom: 8%;
  }
  .gridview_x2  {
    position: absolute;
    font-size:12px;
    left: 50%;
    bottom: 8%;
    }
  .gridview_x3  {
    position: absolute;
    font-size:12px;
    left: 72%;
    bottom: 8%;
  }

}
.drop_a {
  display:inline-block;
  border:1px solid #dddee1;
  color:#333;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  line-height: 12px;
  width: 105%;
  border-radius: 5px;
  padding: 7% 1%;
}
</style>
