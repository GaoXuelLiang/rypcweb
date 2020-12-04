<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;高级查询
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <i-col span="24">
          <Row >
            <Row :gutter="10">
              <i-col span="6">
                <Input v-model="dataValue" icon="ios-search" placeholder="请选择条件"  :readonly="true" @on-click="searchSelect"/>
              </i-col>
              <i-col span="6">
                <Select v-if="searchType == 2 || searchType == 3 || searchType == 4" v-model="searchCondition">
                  <Option label="等于" value="等于"></Option>
                  <Option label="不等于" value="不等于"></Option>
                  <Option label="大于" value="大于"></Option>
                  <Option label="大于等于" value="大于等于"></Option>
                  <Option label="小于" value="小于"></Option>
                  <Option label="小于等于" value="小于等于"></Option>
                </Select>
                <Select v-else v-model="searchCondition">
                  <Option label="等于" value="等于"></Option>
                  <Option label="不等于" value="不等于"></Option>
                  <Option label="包括" value="包括"></Option>
                  <Option label="不包括" value="不包括"></Option>
                </Select>
              </i-col>
              <i-col span="6">
                <Input v-if="searchType == ''" placeholder="请输入条件值" />
                <Input v-else-if="searchType == 1" v-model="searchInput" :placeholder="'请输入'+ dataValue" @on-blur="blurInput" />
                <InputNumber v-else-if="searchType == 2" :placeholder="'请输入'+ dataValue" style="width: 100%" v-model="searchInput" :min="0"></InputNumber>
                <Input v-else-if="searchType == 13" @on-click="pickData()" v-model='searchInput' :placeholder="'请选择'+ dataValue"   :readonly="true" />
                <Select v-else-if="searchType == 12"  v-model='searchInput' :placeholder="'请选择'+ dataValue"  clearable>
                  <Option :value="ite.key" v-for="(ite,index) in dataList " :key="index" >{{ite.value}}</Option>
                </Select>
                <RadioGroup type="button" size="small" style="line-height: 30px;text-align: center;" v-model="searchInput" v-else-if="searchType == 11">
                  <Radio label="1">是</Radio>
                  <Radio label="0">否</Radio>
                </RadioGroup>
                <DatePicker  v-else-if="searchType == 3" v-model='searchInput' type="date" placeholder="请选择时间..." style="width: 100%" ></DatePicker>
              </i-col>
              <i-col span="6"  v-show = "data.length > 0" style="line-height: 30px;">
                <RadioGroup v-model="logOperatorTypeDis">
                  <Radio label="与"></Radio>
                  <Radio label="或"></Radio>
                </RadioGroup>
              </i-col>
            </Row>
          </Row>
          <Row :gutter="10" style="margin: 10px 0;">
            <i-col span="20" style="padding:0">
              <Table :height="tableheight" stripe :no-data-text="noData" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" size="small" ref="selection" :columns="columns" :data="data"></Table>
            </i-col>
            <i-col span="3" offset="1" class="operBtn">
              <Row >
                <Button icon="plus-round" type="primary" @click="addCondition">添加</Button>
              </Row>
              <Row>
                <Button   type="error"  @click="deleteData" >删除</Button>
              </Row>
              <Row>
                <Button type="primary" @click="addBracket">( 添加 )</Button>
              </Row>
              <Row>
                <Button type="error" @click="removeBracket">( 去掉 )</Button>
              </Row>
              <Row>
                <Button  type="info" @click="newSearch">查询</Button>
              </Row>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
    <searchVar v-show="isSearchSelect" :searchData ='searchData' @closeUp= 'closeUp' @selectInput = 'selectInput'></searchVar>
    <autoSearchtable
      v-if="showModal"
      @closeUp="closeModal"
      :modiaContent="modiaContent"
      @changeinput="changeinput">
    </autoSearchtable>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'
  import searchVar from './searchAdvancedSelect'
  import autoSearchtable from '../../pages/common/searchTable/autoSearchtable.vue'
  export default {
    data() {
      return {
        searchData: [],
        dataValue: '', // 选择条件初始化
        dataValueName: '', // 选择条件传值初始化
        searchCondition: '', // 逻辑条件初始化
        searchConditionType: '',  // 逻辑条件初始化
        logOperatorType: 0,
        logOperatorTypeDis: '与',
        searchInput: '',
        searchInputId: '',
        showModal: false, // 输入选择弹出框初始化
        modiaContent: '',
        isSearchSelect: false, // 条件选择弹窗初始化
        searchType: '', // 布局类型初始化
        dataList: [],
        popupMark: '',
        tableheight: 350,
        inputSea: '',
        noData: '<div id="noData"></div>',
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '条件值',
            key: 'conditionValue',
          },
        ],
        data: [],
        oldDataNum: [],   // 勾选数据初始化
        num: 0,
        repetition: false, // 数据添加重复校验判断
        isChars: false,  //特殊字符校验判断
        listData: [],
      }
    },
    components: {
      searchVar,
      autoSearchtable,
    },
    watch: {
    },
    mounted() {
    },
    methods: {
      // 特殊字符校验
      blurInput() {
        const t = this
        let chars =/.*[\'\*\%\#\/\+\-\"\;\&\(\)\{\}\[\]\,\=]/
        if(chars.test(t.searchInput)) {
          t.isChars = true
        } else {
          t.isChars = false
        }
        if(t.isChars) {
          t.$Modal.warning({
            title: t.$t('reminder.remind'),
            content: '存在非安全性字符，请重新输入！',
          })
        }
      },
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatAutoLayoutGetList.getAdvancedColumnList',
          logType: '高级查询',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.searchData = res.data.content[0].columns
            t.listData = res.data.content[0].columnOptions
            t.data = []
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        const t = this
        t.dataValue = ''
        t.dataValueName = ''
        t.searchCondition = ''
        t.searchConditionType = ''
        t.searchInput = ''
        t.searchInputId = ''
        t.dataList = []
//        t.data = []
        t.num = 0
        t.logOperatorType = 0,
        t.logOperatorTypeDis = '与',
        t.$emit('closeAdvanced')
      },
      // 选择弹窗
      searchSelect() {
        const t = this
        t.isSearchSelect = true
        t.dataValue = ''
        t.dataValueName = ''
        t.searchCondition = ''
        t.searchConditionType = ''
        t.searchInput = ''
        t.searchInputId = ''
      },
      closeUp() {
        this.isSearchSelect = false
      },
      selectInput(params) {
        console.log(params)
        const t = this
        t.searchType = params.clmLayout
        t.dataValue = params.clmDname
        t.dataValueName = params.clmName
        t.popupMark = params.clmSelOptMark
        t.listData.forEach((ele) => {
          if (ele.clmName == params.clmName) {
            t.dataList = ele.clmOptionList
          }
        })
      },
      // 输入弹窗
      pickData() {
        this.modiaContent = this.popupMark
        this.showModal = true
      },
      clear(type) {

      },
      changeinput(value, id) {
        this.searchInput= value
        this.searchInputId = id
      },
      closeModal() {
        this.showModal = false
      },
      selectedtable(selection, row) {
			  const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].num)
        }
        this.oldDataNum = newArr
      },
      //添加
      addCondition() {
        const t = this
        //条件值类型
        switch (t.searchCondition) {
          case '大于':
            t.searchConditionType = '1'
            break
          case '小于':
            t.searchConditionType = '2'
            break
          case '等于':
            t.searchConditionType = '3'
            break
          case '不等于':
            t.searchConditionType = '4'
            break
          case '大于等于':
            t.searchConditionType = '5'
            break
          case '小于等于':
            t.searchConditionType = '6'
            break
          case '包括':
            t.searchConditionType = '7'
            break
          case '不包括':
            t.searchConditionType = '8'
            break
        }
        switch (t.logOperatorTypeDis) {
          case '或':
            t.logOperatorType = '1'
            break
          default:
            t.logOperatorType = '0'
        }
        if(t.dataValue && t.searchCondition && t.searchInput){
          let obj = {}
          if(t.searchType == 1){
            if(t.isChars) {
              t.$Modal.warning({
                title: t.$t('reminder.remind'),
                content: '存在非安全性字符，请重新输入！',
              })
              return
            }
          }
          if(t.searchType == 3){
            t.searchInput = new Date(t.searchInput).format('yyyy-MM-dd')
          }
          obj['leftBrackets'] = ''
          obj['rightBrackets'] = ''
          obj['conditionValue'] = t.dataValue + t.searchCondition + t.searchInput
          obj['centerType'] = t.searchConditionType
          obj['attribute'] = t.dataValueName
          obj['value'] =  t.searchInput
          obj['judgmentStytle'] =  t.searchConditionType + '&&' + 0
          if(t.searchType == 11){
            switch (t.searchInput) {
              case '1':
                obj['conditionValue'] = t.dataValue + t.searchCondition +  '是'
                break
              default:
                obj['conditionValue'] = t.dataValue + t.searchCondition +  '否'
            }
          }
          if(t.searchType == 12){
            t.dataList.forEach((ele)=>{
              if(t.searchInput == ele.key){
                obj['conditionValue'] = t.dataValue + t.searchCondition + ele.value
              }
            })
          }
          if(t.searchType == 13){
            obj['value'] =  t.searchInputId
          }
          // 重复校验
          if(t.data.length > 0){
            obj['conditionValue'] = t.logOperatorTypeDis +'"' + t.dataValue + t.searchCondition + t.searchInput+ '"',
            obj['judgmentStytle'] =  t.searchConditionType + '&&' + t.logOperatorType
            if(t.searchType == 13){
              t.inputSea = t.searchInputId
            }else {
              t.inputSea = t.searchInput
            }
            t.data.forEach((ele)=>{
              if(ele.attribute == t.dataValueName  &&  ele.value == t.inputSea && ele.centerType == t.searchConditionType) {
                t.$Modal.warning({
                  title: this.$t('reminder.remind'),
                  content: '条件不可重复',
                })
                t.repetition = true
              } else {
                t.repetition = false
              }
            })
          }
          if(!t.repetition){
            obj['num'] = t.num +=1
            t.data.push(obj)
          }
          console.log(t.data,'data')
        }else {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请完善条件！',
          })
        }
      },
      // 删除
      deleteData() {
        const t = this
        for (let i = 0; i < t.data.length; i++) {
          for(let j= 0; j< t.oldDataNum.length; j++){
            if(t.data[i].num == t.oldDataNum[j]) {
              t.data.splice(i,1)
            }
          }
        }
      },
      // 添加括号
      addBracket() {
        const t = this
        const arrUp = deepCopy(t.data)
        if(t.oldDataNum.length < 2) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请至少选择两条数据',
          })
        }else {
          for(let i=0; i<t.oldDataNum.length; i++){
            for(let j=0; j< arrUp.length; j++){
              if(t.oldDataNum[i] == arrUp[j].num){
                if(t.oldDataNum.length == 2) {  // 选择两条数据
                  if(arrUp[j].num != 1){
                    if(t.oldDataNum[t.oldDataNum.length -1] == arrUp[j].num){
                      arrUp[j].conditionValue =  arrUp[j].conditionValue + ')'
                    } else {
                      arrUp[j].conditionValue = arrUp[j].conditionValue.split('"')[0] + '("' + arrUp[j].conditionValue.split('"')[1] +'"'
                    }
                  }else {
                    arrUp[j].conditionValue = '('+ arrUp[j].conditionValue
                  }
                } else { // 选择多条数据
                  if (t.oldDataNum[0] == arrUp[j].num) {
                    if(arrUp[j].num != 1){
                      arrUp[j].conditionValue = arrUp[j].conditionValue.split('"')[0] + '("' + arrUp[j].conditionValue.split('"')[1] +'"'
                    } else {
                      arrUp[j].conditionValue = '('+ arrUp[j].conditionValue
                    }
                  } else if(t.oldDataNum[t.oldDataNum.length -1] == arrUp[j].num){
                    arrUp[j].conditionValue =  arrUp[j].conditionValue + ')'
                  }
                }
              }
            }
          }
          t.oldDataNum = []
        }
      },
      // 去掉括号
      removeBracket() {
        const t = this
        const arrDown = deepCopy(t.data)
        if(t.oldDataNum.length < 2) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请至少选择两条数据',
          })
        } else {
          let text = ''
          let step = 0
          for(let i=0; i<t.oldDataNum.length; i++){
            step += 1
            for(let j=0; j< arrDown.length; j++){
              if(t.oldDataNum[i] == arrDown[j].num){
                text += arrDown[j].conditionValue
                if (step === t.oldDataNum.length) {
                  if (text.indexOf('(') >= 0 &&  text.indexOf(')') >= 0) {
                    // 判断选择数据中有前后括号
                    for (let i=0; i<t.oldDataNum.length; i++){
                      for(let j=0; j< arrDown.length; j++) {
                        if(t.oldDataNum[i] == arrDown[j].num){
                          // 删除前括号
                          if(arrDown[j].conditionValue.includes('(')){
                            let strFront = arrDown[j].conditionValue.indexOf('(')
                            let strAll = arrDown[j].conditionValue.split('')
                            let str = strAll.splice(strFront + 1 ,strAll.length)
                            if(arrDown[j].num != 1){
                              arrDown[j].conditionValue = strAll[0] +str.join('')
                            }else {
                              arrDown[j].conditionValue = str.join('')
                            }
                          }
                        }
                      }
                    }
                    for (let i=0; i<t.oldDataNum.length; i++){
                      for(let j=0; j< arrDown.length; j++) {
                        if(t.oldDataNum[i] == arrDown[j].num){
                          // 删除后括号
                          if(arrDown[j].conditionValue.includes(')')){
                            if(t.oldDataNum[t.oldDataNum.length -1] == arrDown[j].num){
                              let strBack = arrDown[j].conditionValue.lastIndexOf(')')
                              let strAll = arrDown[j].conditionValue.split('')
                              let str = strAll.splice(0,strBack)
                              arrDown[j].conditionValue = str.join('')
                            }
                          }
                        }
                      }
                    }
                  } else {
                    t.$Modal.warning({
                      title: this.$t('reminder.remind'),
                      content: '请选择正确的数据！',
                    })
                  }
                }
              }
            }
          }
          t.oldDataNum = []
        }
      },
      // 查询
      newSearch() {
        const t = this
        if(t.data.length < 0){
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请完善条件！',
          })
        } else {
          for (let i = 0; i < t.data.length; i++) {
            if(t.data[i].conditionValue.includes('(')){
              let f = (t.data[i].conditionValue.split('(')).length-1
              for(let j = 0; j < f; j++){
                t.data[i].leftBrackets += '('
              }
            }
            if(t.data[i].conditionValue.includes(')')){
              let b = (t.data[i].conditionValue.split(')')).length-1
              for(let k = 0; k < b; k++){
                t.data[i].rightBrackets += ')'
              }
            }
            delete t.data[i].num;
            delete t.data[i].conditionValue;
            delete t.data[i].centerType
          }
          console.log(t.data)
          t.$emit('getData', 1, t.data)
          t.handleReset()
        }
      }
    },

  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";
  .operBtn .ivu-row{
    margin-bottom: 20px;
  }
  .cover .box{
    padding-top:50px;
  }
</style>
