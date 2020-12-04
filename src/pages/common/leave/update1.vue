<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form class="content"  ref="upFormData" :model="upFormData" :label-width="135">
        <div class="content-all">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <div class="block">
            <div class="blocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>
              员工基本信息
            </div>
            <div class="dataContent">
                <Row>
                  <i-col span="10" offset="1">
                    <FormItem label="姓名">
                      <Input disabled v-model="form.apptrName"  placeholder="姓名"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="10" offset="1">
                    <FormItem label="员工工号">
                      <Input disabled v-model="form.apptrWorkno" placeholder="员工工号"></Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="10" offset="1"  v-show="addType !== 'bian'">
                    <FormItem label="单据编号">
                      <Input disabled v-model="form.apptrOrder" placeholder="单据编号"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="10" offset="1"  v-show="addType === 'bian'">
                    <FormItem label="原单据编号">
                      <Input disabled v-model="form.apptrOrder" placeholder="原单据编号"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="10" offset="1">
                    <FormItem label="公司">
                      <Input disabled v-model="form.apptrHirecompanyDis"  placeholder="公司"></Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="10" offset="1">
                    <FormItem label="部门">
                      <Input disabled v-model="form.apptrDeptDis"  placeholder="部门"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="10" offset="1">
                    <FormItem label="岗位">
                      <Input disabled v-model="form.apptrPostDis"  placeholder="岗位"></Input>
                    </FormItem>
                  </i-col>
                </Row>
                <Row>
                  <i-col span="10" offset="1">
                    <FormItem label="职级">
                      <Input disabled v-model="form.apptrPostlevel" placeholder="职级"></Input>
                    </FormItem>
                  </i-col>
                  <!-- <i-col span="10" offset="1">
                    <FormItem label="人员类型">
                      <Input disabled v-model="form.apptrEmpmappingDis" placeholder="人员类型"></Input>
                    </FormItem>
                  </i-col> -->
                </Row>
                <Row>
                  <!-- <i-col span="10" offset="1">
                    <FormItem label="汇报人">
                      <Input disabled v-model="form.apptrBusipmpDis" placeholder="汇报人"></Input>
                    </FormItem>
                  </i-col> -->
                </Row>
            </div>
          </div>

          <!-- 出差事由、出差天数 -->
          <div class="block">
            <div class="blocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>
              出差信息
            </div>
            <div class="dataContent">
                <Row>
                  <i-col span="21" offset="1">
                    <FormItem label="出差事由" class="specil_label">
                      <Input  :disabled="logType !== $t('button.add')" v-model.trim="form.apptrReson" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="出差事由" ></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="10" offset="1" v-if="addType !== 'add'">
                    <FormItem label="出差天数">
                      <Input disabled v-model.trim="form.apptrDuration" placeholder="出差天数"></Input>
                    </FormItem>
                  </i-col>
                </Row>
            </div>
          </div>

          <!-- 变更/撤销原因 -->
          <div class="block" style="margin-top: 20px;" v-if="addType !== 'add'">
            <div class="blocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>
              确认{{ logType }}
            </div>
            <div class="dataContent">
                <Row>
                  <i-col span="21" offset="1">
                    <FormItem :label="addType === 'bian' ? '变更理由' : '撤销理由'" prop="apptrReason">
                      <Input type="textarea" v-model.trim="upFormData.apptrReason" :placeholder="addType === 'bian' ? '请输入变更理由' : '请输入撤销理由'"></Input>
                    </FormItem>
                  </i-col>
                </Row>
            </div>
          </div>

          <!-- 出差详情 -->
          <div class="block">
            <div class="blocksTitle">
              <Icon type="compose" style="margin-right: 5px;"></Icon>
              出差详细信息
            </div>
            <div class="dataContent">
              <div v-for="(item, index) in travlArr" :key="index" class="travl_item">
                <Row class="edu-button-delete">
                  <span>行程{{index + 1}}： </span>
                  <Button class="btn" type="error" @click="deleteItem(index)"  v-show="addType !== 'che' && item.chgStatus !== 'not'">删除行程</Button>
                </Row>
                <Form :ref="'formProject' + index" :model="item" :rules="ruleValidate" :label-width="135">
                  <Row>
                    <i-col span="10" offset="1">
                      <FormItem label="出发城市" prop="apptrrecScity">
                          <span @dblclick="clearData(1, index)">
                              <Input v-show="addType !== 'che' &&  item.chgStatus !== 'not' && item.chgStatus !== 'end'" readonly v-model="item.apptrrecScityDis" placeholder="请选择出发城市"  @on-click="selectComp(1, index)"></Input>
                              <Input v-show="addType !== 'che' &&  (item.chgStatus === 'not' ||  item.chgStatus === 'end')" readonly v-model="item.apptrrecScityDis" placeholder="请选择出发城市"  disabled></Input>
                              <Input v-show="addType === 'che'" readonly v-model="item.apptrrecScityDis" placeholder="请选择出发城市"  disabled></Input>
                          </span>
                      </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                      <FormItem label="目的城市" prop="apptrrecTgcity">
                          <span @dblclick="clearData(2, index)">
                              <Input v-show="addType !== 'che' &&  item.chgStatus !== 'not'" readonly v-model="item.apptrrecTgcityDis" placeholder="请选择目的城市"  @on-click="selectComp(2, index)"></Input>
                              <Input v-show="addType !== 'che' &&  item.chgStatus === 'not'" readonly v-model="item.apptrrecTgcityDis" placeholder="请选择目的城市"  disabled></Input>
                              <Input v-show="addType === 'che'" readonly v-model="item.apptrrecTgcityDis" placeholder="请选择目的城市"  disabled></Input>
                          </span>
                      </FormItem>
                    </i-col>
                  </Row>
                  <Row>
                    <i-col span="10" offset="1">
                      <FormItem label='开始时间' prop="apptrrecSdate">
                        <DatePicker :disabled="addType === 'che' || item.chgStatus === 'not' || item.chgStatus === 'end'" @on-open-change="checkDate(index)" confirm :editable='false' v-model="item.apptrrecSdate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间" style="width: 100%"></DatePicker>
                      </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                      <FormItem label='结束时间' prop="apptrrecEdate">
                        <DatePicker :disabled="addType === 'che' || item.chgStatus === 'not'" @on-open-change="checkDate(index)" confirm :editable='false' v-model="item.apptrrecEdate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间" style="width: 100%"></DatePicker>
                      </FormItem>
                    </i-col>
                  </Row>
                  <Row>
                    <i-col span="10" offset="1">
                      <FormItem label="交通方式" prop="apptrrecTrtype">
                        <Select v-model="item.apptrrecTrtype" :disabled="addType === 'che' || item.chgStatus === 'not'">
                          <Option :value="item.paramCode" v-for="(item,index) in selectList1" :key="index">{{item.paramInfoName}}</Option>
                        </Select>
                      </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                      <FormItem label='出差时长(小时)' prop="apptrrecDuration">
                        <Input disabled v-model="item.apptrrecDuration" placeholder="出差时长"></Input>
                      </FormItem>
                    </i-col>
                  </Row>
                </Form>
              </div>
              <Row v-show="addType !== 'che'" class="edu-button"><Icon type="" />
                <Button type="primary" @click="addWork" icon="md-add">增加行程</Button>
              </Row>
            </div>
          </div>

        </div>
      </Form>
      <div class="footer-button">
        <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
        <Button type="primary" @click="save" :loading="isSpin">提交</Button>
      </div>
    </div>

    <!-- 弹出搜索 -->
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
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginNew2} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import valid from '../../../lib/pub_valid'

  export default {
    props: {
      form: Object,
      travlArr: Array,
      logType: String,
      addType: String,
    },
    data() {
      return {
        currentIndex: 0,
        inde: 1,
        showModal: false, // 弹出搜索
        modiaContent: 'org-org-std', // 弹出搜索
        dataParame: {}, // 弹出搜索
        isSpin: false,
        selectIds: '',
        upFormData: {
          apptrConfirm: '1',
          apptrReason: '',
        },
        btnControl: false,
        openRcored: false,
        roundResultList: [],
        id: '',
        selectList1: [],
        formValidate: {
          apptrrecScity: '',
          apptrrecScityDis: '',
          apptrrecTgcity: '',
          apptrrecTgcityDis: '',
          apptrrecSdate: '',
          apptrrecEdate: '',
          // apptrrecDuration: '',
          apptrrecTrtype: '',
          id: '',
        },
        ruleValidate: {
          // apptrrecScity: [
          //   {required: true, message: '请选择出发城市', trigger: 'change'},
          // ],
          // apptrrecTgcity: [
          //   {required: true, message: '请选择目的城市', trigger: 'change'},
          // ],
          // apptrrecTrtype: [
          //   {required: true, message: '请选择交通方式', trigger: 'change'},
          // ],
          // apptrrecSdate: [
          //   {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'},
          // ],
          // apptrrecEdate: [
          //   {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'},
          // ],
        },
      }
    },
    components: {
    },
    mounted() {
     this.getSelect()
    },
    methods: {
      // 增加行程
      addWork() {
        this.travlArr.push({})
      },
      // 删除行程
      deleteItem(index) {
        this.travlArr.splice(index, 1)
      },
      // 选择时间比较
      checkDate(index) {
        const t = this
        let start = this.travlArr[index].apptrrecSdate
        let end =  this.travlArr[index].apptrrecEdate
        if (!start || !end) {
            this.$set(t.travlArr[index],'apptrrecDuration', '')
        } else {
          let oDate1 = new Date(start).getTime()
          let oDate2 = new Date(end).getTime()
          let iDays = Math.ceil((oDate2 - oDate1) / 1000 / 60 / 60)
          if (oDate2 <= oDate1) {
            this.$Message.warning('开始时间应早与结束时间');
            this.$set(t.travlArr[index],'apptrrecEdate', '')
            this.$set(t.travlArr[index],'apptrrecDuration', '')
            return false
          } else {
            // this.$set(t.travlArr[index],'apptrrecDuration', iDays)
            this.apiCheckDate(index, start, end)
          }
        }
      },
      apiCheckDate(index, start, end) {
        const t = this
        let data = {
          _mt:  this.$global.mt+'ApplyTravelrecord.calTravelDuration',
          logType: '保存',
          starTime: start,
          endTime: end
        }
        data.starTime = new Date(data.starTime).format('yyyy-MM-dd hh:mm')
        data.endTime = new Date(data.endTime).format('yyyy-MM-dd hh:mm')
        getDataLevelUserLogin(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$set(t.travlArr[index],'apptrrecDuration', res.data.content[0].value)
            // t.$Modal.success({
            //   title: this.$t('reminder.suc'),
            //   content: this.$t('reminder.addsuccess'),
            // })
          }
        }).catch(() => {
            t.isSpin = false
        })
      },
      // 点击提交按钮
      save() {
        const t = this
        switch (t.addType) {
          case 'add':
            t.submitSave() // 新增
            break;
          case 'bian':
            t.submitBian() // 变更
            break;
          case 'che':
            t.submitChe() // 撤销
            break;
          default:
            break;
        }
      },

      // 新增
      submitSave() {
        const t = this
        let flag = false
        if (!t.form.apptrReson) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '请输入出差事由',
            })
            return
        }
        if (!t.travlArr.length) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '至少有一条行程',
            })
            return
        }
        t.travlArr.forEach((item, index) => {
          if (!item.apptrrecScity) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '出发城市必填',
            })
            flag = true
          } else if (!item.apptrrecTgcity) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '目的城市必填',
            })
            flag = true
          } else if (!item.apptrrecSdate) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '开始时间必填',
            })
            flag = true
          } else if (!item.apptrrecEdate) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '结束时间必填',
            })
            flag = true
          } else if (!item.apptrrecTrtype) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '交通方式必填',
            })
            flag = true
          } else {
            flag = false
          }
        })
        if (flag) return
        const req = {
          _mt:  this.$global.mt+'ApplyTravel.insertTravelData',
          logType: '保存',
          apptrReson: t.form.apptrReson,
          travlArr: [...t.travlArr]
        }
        req.travlArr.forEach(item => {
          item.apptrrecSdate = new Date(item.apptrrecSdate).format('yyyy-MM-dd hh:mm')
          item.apptrrecEdate = new Date(item.apptrrecEdate).format('yyyy-MM-dd hh:mm')
        })
        t.isSpin = true
        getDataLevelUserLoginNew(req).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.addsuccess'),
            })
            t.handleReset()
            t.$emit('getData')
          }
        }).catch(() => {
            t.isSpin = false
        })
      },
      // 变更
      submitBian() {
        const t = this
        let flag = false
        if (!t.upFormData.apptrReason) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请输入变更理由',
          })
          return
        }
        if (!t.travlArr.length) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '至少有一条行程',
            })
            return
        }
        t.travlArr.forEach((item, index) => {
          if (!item.apptrrecScity) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '出发城市必填',
            })
            flag = true
          } else if (!item.apptrrecTgcity) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '目的城市必填',
            })
            flag = true
          } else if (!item.apptrrecSdate) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '开始时间必填',
            })
            flag = true
          } else if (!item.apptrrecEdate) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '结束时间必填',
            })
            flag = true
          } else if (!item.apptrrecTrtype) {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '交通方式必填',
            })
            flag = true
          } else {
            flag = false
          }
        })
        if (flag) return
        
        t.form.apptrReason = t.upFormData.apptrReason
        t.form.apptrOldorder = t.form.apptrOrder // 赋值给原单据号
        t.form.apptrOrder = '' 
        if (t.form.id) delete t.form.id
        if (t.form.apptrCancelstatus) delete t.form.apptrCancelstatus
        t.form._mt =  this.$global.mt+'ApplyTravel.genChgData'
        t.form.recordList.forEach(item => {
          if (item.id) delete item.id
          item.apptrrecSdate = new Date(item.apptrrecSdate).format('yyyy-MM-dd hh:mm')
          item.apptrrecEdate = new Date(item.apptrrecEdate).format('yyyy-MM-dd hh:mm')
        })
        t.isSpin = true
        getDataLevelUserLoginNew(t.form).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '变更成功',
            })
            t.handleReset()
            t.$emit('getData')
          }
        }).catch(() => {
            t.isSpin = false
        })
      },
      // 撤销
      submitChe() {
        const t = this
        if (!t.upFormData.apptrReason) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请输入撤销理由',
          })
          return
        }
        const req = {
          _mt:  this.$global.mt+'ApplyTravel.genCancleData',
          id: t.form.id,
          apptrReson: t.upFormData.apptrReason,
          flowId: t.form.flowId,
        }
        t.isSpin = true
        getDataLevelUserLogin(req).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '撤销成功',
            })
            t.handleReset()
            t.$emit('getData')
          }
        }).catch(() => {
            t.isSpin = false
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
        t.upFormData.apptrReason = ''
        this.$emit('closeUpd')
      },
      /*
      * 弹出选择
      * */
      selectComp(ind, index) {
        const t = this
        t.currentIndex = index
        if (ind === 1) {
          t.modiaContent = 'base-basemccity-std'
        } else if (ind === 2) {
          t.modiaContent = 'base-basemccity-std'
        }
        t.inde = ind
        t.showModal = true
      },
      clearData(type, index) {
        console.log('type---index', type, index);
        
        const t = this
        if (type === 1) {
          // 出发城市
          t.$set(t.travlArr[index], 'apptrrecScityDis', '')
          t.$set(t.travlArr[index], 'apptrrecScity', '')
        } else if (type === 2) {
          // 目的城市
          t.$set(t.travlArr[index], 'apptrrecTgcityDis', '')
          t.$set(t.travlArr[index], 'apptrrecTgcity', '')
        }
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        if (t.inde === 1) {
          // 公司名称
          t.travlArr[t.currentIndex].apptrrecScityDis = row.tmccityName
          t.travlArr[t.currentIndex].apptrrecScity = row.tmccityCode
        } else if (t.inde === 2) {
          // 公司名称
          t.travlArr[t.currentIndex].apptrrecTgcityDis = row.tmccityName
          t.travlArr[t.currentIndex].apptrrecTgcity = row.tmccityCode
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'vehicle',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectList1 = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover {
    position: fixed;
    // overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
      position: relative;
      // width: 1000px;
      width: 80%;
      height: 90%;
      background-color: #fff;
      padding: 60px 20px 24px 20px;
      border-radius: 10px;
      .form {
      }
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
      .content{
        position: relative;
        max-height: calc(100% - 60px);
        overflow-y: scroll;
      }
      .content-all {
        position: relative;
      }
      .block {
        .blocksTitle {
          background-color: rgba(39, 142, 255, 0.2);
          font-size: 14px;
          padding: 0 20px;
          margin-bottom: 10px;
          height: 26px;
          font-weight: bold;
          line-height: 26px;
        }
      }
      .footer-button {
        text-align: right;
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        border-top: 1px solid #ccc;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
      }
    }
  }
  .edu-button{
    border-top: 1px solid #ccc;
    text-align: center;
    padding: 20px 0;
    div{
      display: inline-block;
      padding: 10px 50px;
      background-color: #f9f9f9;
      border-radius: 5px;
      cursor: pointer;
      color: #2b85e4;
    }
  }
  .edu-button-delete{
    padding: 0 20px 20px 30px;
    overflow: hidden;
    span{
      float: left;
      font-size: 14px;
      color: #2b85e4;
    }
    .btn{
      float: right;
    }
  }
  .travl_item{
    border-top: 1px solid #ccc;
    padding: 20px 0 10px 0;
  }
  .specil_label{
    .ivu-form-item-label:before{
      content: '啊哈哈哈*' !important;
      display: inline-block;
      margin-right: 4px;
      line-height: 1;
      font-family: SimSun;
      font-size: 14px;
      color: #ed4014;
    }
  }
</style>
