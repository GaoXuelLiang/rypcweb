<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;新增
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" style="max-height: 450px;" :rules="ruleValidate"
            :label-width="135" :disabled="logType === this.$t('button.view')">

        <row>
          <Col span="10">
          <FormItem label="出发城市" prop="apptrrecScity">
              <span @dblclick="clearData()">
                  <Input v-model="formValidate.apptrrecScityDis" placeholder="请选择出发城市" style="width: 220px;"
                          @on-click="selectComp(1)"></Input>
              </span>
          </FormItem>
          </Col>

          <Col span="10">
          <FormItem label="目的城市" prop="apptrrecTgcity">
              <span @dblclick="clearData()">
                  <Input v-model="formValidate.apptrrecTgcityDis" placeholder="请选择目的城市" style="width: 220px;"
                          @on-click="selectComp(2)"></Input>
              </span>
          </FormItem>
          </Col>


        </row>

        <row>
          <Col span="10">
          <FormItem label='开始时间' prop="apptrrecSdate">
            <DatePicker @on-change="onChange" v-model="formValidate.apptrrecSdate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间"
                        style="width: 220px"></DatePicker>
          </FormItem>
          </Col>

          <Col span="10">
          <FormItem label='结束时间' prop="apptrrecEdate">
            <DatePicker  @on-change="onChange" v-model="formValidate.apptrrecEdate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间"
                         style="width: 220px"></DatePicker>
          </FormItem>
          </Col>
        </row>

        <row>
          <Col span="10">
          <FormItem label="交通方式" prop="apptrrecTrtype">
            <Select v-model="formValidate.apptrrecTrtype">
              <Option :value="item.paramCode" v-for="(item,index) in selectList1" :key="index">
                {{item.paramInfoName}}
              </Option>
            </Select>
          </FormItem>
          </Col>

          <Col span="10" style="margin-right: 40px">
          <FormItem label='出差时长(小时)' prop="apptrrecDuration">
            <Input disabled v-model="formValidate.apptrrecDuration" :max="10" :min="1" :placeholder="$t('出差时长')"
                   style="width:220px;"></Input>
          </FormItem>
          </Col>
        </row>


        <!-- <row>
          <Col span="10">
          <FormItem label="是否完成" prop="apptrrecIsfinish">
            <RadioGroup v-model="formValidate.apptrrecIsfinish">
              <Radio label="1">
                <span>是</span>
              </Radio>
              <Radio label="0">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10">
          <FormItem label="津贴城市" prop="apptrrecAllowancecity">
              <span @dblclick="clearData()">
                  <Input v-model="formValidate.apptrrecAllowancecityDis" placeholder="请选择津贴城市" style="width: 220px;"
                          @on-click="selectComp(3)"></Input>
              </span>
          </FormItem>
          </Col>
        </row> -->
        <br>

        <Row type="flex" justify="end" style="margin-right: 140px">
          <FormItem>
            <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
          </FormItem>
        </Row>


      </Form>
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
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../../lib/util'

  export default {
    data() {
      return {
        showModal: false,
        inde: 1,
        isSpin: false,
        modiaContent: 'base-basemccity-std',
        dataParame: {},
        selectList1: [],
        formValidate: {
          apptrrecScity: '',
          apptrrecScityDis: '',
          apptrrecTgcity: '',
          apptrrecTgcityDis: '',
          apptrrecTrtype: '',
          apptrrecSdate: '',
          apptrrecEdate: '',
          apptrrecDuration: '',
          // apptrrecAllowancecity: '',
          // apptrrecAllowancecityDis: '',
          id: '',
          // apptrrecIsfinish: '1',
        },
        ruleValidate: {
          apptrrecScity: [
            {required: true, message: '不能为空'},
          ],
          apptrrecTgcity: [
            {required: true, message: '不能为空'},
          ],
          apptrrecTrtype: [
            {required: true, message: '不能为空'},
          ],
          apptrrecSdate: [
            {required: true, message: '不能为空'},
          ],
          apptrrecEdate: [
            {required: true, message: '不能为空'},
          ],
          apptrrecDuration: [
            {required: true, message: '不能为空'},
          ],
          // apptrrecIsfinish: [
          //   {required: true, message: '不能为空'},
          // ],
          // apptrrecAllowancecity: [
          //   {required: true, message: '不能为空'},
          // ],
        },
        selectType1: [],
      }
    },
    props: {
      id: Number,
      selectIds: String,
      logType: String,
      index: Number,
      flowInfo: Object,
      roleContrl: Object,
    },
    mouted() {
      this.getSelect()
    },
    methods: {
      onChange() {
//        console.log(this.formValidate.apptrrecDuration)
        if (this.formValidate.apptrrecDuration === '' || this.formValidate.apptrrecDuration === '选择开始日期跟结束日期有误') {
          this.formValidate.apptrrecDuration = 0
        } else {
          let oDate1 = new Date(this.formValidate.apptrrecSdate)
          let oDate2 = new Date(this.formValidate.apptrrecEdate)
          let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60)
          if (oDate2 < oDate1) {
            this.formValidate.apptrrecDuration = '选择开始日期跟结束日期有误'
            this.formValidate.apptrrecSdate = ''
            this.formValidate.apptrrecEdate = ''
            return false
          } else {
            this.formValidate.apptrrecDuration = iDays
          }
        }
      },
      // 选择公司的弹出处理
      closeModal() {
        const t = this
        t.showModal = false
      },
      getData(id) {
//        console.log(id)
        const t = this
//        获取到下拉列表数据
        t.getSelect()
        if (id) {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'ApplyTravelrecord.getById',
            id: id,
            logType: '根据id获取数据',
          }).then((res) => {
          //  if (isSuccess(res, t)) {
             t.formValidate = res.data.content[0]
          //  }
          }).catch(() => {
            // this.$Modal.error({
            //   title: this.$t('reminder.err'),
            //   content: this.$t('reminder.errormessage'),
            // })
          })
        } else {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'ProReport.getById',
            id: id,
            logType: '根据id获取数据',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.formValidate = res.data.content[0]
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      handleSubmit() {

//      console.log(444444, this.flowInfo.flowId)
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        data.apptrrecEmpid = localStorage.getItem('empId')
        data.apptrrecTrid = t.flowInfo.flowId
        data.apptrrecStepid = t.flowInfo.stepId
//        data.apptrrecDataid = t.flowInfo.pkValue
        // data.apptrrecDataid = localStorage.getItem('apptrOrder')
        data._mt =  this.$global.mt+'ApplyTravelrecord.addOrUpd'
        // if (localStorage.getItem('flowStatus') === 'add') {
        //   data.apptrrecDataid = localStorage.getItem('apptrOrder')
        // } else if (localStorage.getItem('flowStatus') === 'upd') {
        //   data.apptrrecDataid = t.flowInfo.pkValue
        // }
        data.apptrrecDataid = t.flowInfo.flowId
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        } else {
          delete data.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        data.apptrrecSdate = new Date(data.apptrrecSdate).format('yyyy-MM-dd hh:mm')
        data.apptrrecEdate = new Date(data.apptrrecEdate).format('yyyy-MM-dd hh:mm')
//        console.log(data)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                t.$emit('closeUps', res.data.content[0])
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.formValidate.apptrrecScityDis = ''
                t.formValidate.apptrrecTgcityDis = ''
                // t.formValidate.apptrrecAllowancecityDis = ''
              }
            }).catch(() => {
              t.isSpin = false
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      handleReset() {
        this.formValidate = {}
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
      /*
      * 弹出选择
      * */
      selectComp(ind) {
        const t = this
        if (ind === 1) {
          t.modiaContent = 'base-basemccity-std'
        } else if (ind === 2) {
          t.modiaContent = 'base-basemccity-std'
        } else if (ind === 3) {
          t.modiaContent = 'base-basemccity-std'
        }
        t.inde = ind
//        console.log(t.inde)
        t.showModal = true
      },
      clearData() {
        const t = this
        t.formValidate.concompUnitDis = ''
        t.formValidate.concompUnit = ''
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
//        console.log(t.inde)
//        console.log(row)
        if (t.inde === 1) {
          // 公司名称
          t.formValidate.apptrrecScityDis = row.cityName
          t.formValidate.apptrrecScity = row.id
        } else if (t.inde === 2) {
          // 公司名称
          t.formValidate.apptrrecTgcityDis = row.cityName
          t.formValidate.apptrrecTgcity = row.id
        } else if (t.inde === 3) {
          // 公司名称
          // t.formValidate.apptrrecAllowancecityDis = row.cityName
          // t.formValidate.apptrrecAllowancecity = row.id
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'vehicle',
        }).then((res) => {
          if (isSuccess(res, t)) {
//            console.log(res.data.content[0].value[0].paramList)
            t.selectList1 = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
//      onChange(inde) {
//        const t = this
//        console.log(inde)
////        if (inde === '占编') {
////          t.form.empkiEstablishment = t.paramCode.paramCode1
////        } else if (inde === '管培生') {
////          t.form.empkiEstablishment = t.paramCode.paramCode2
////        } else if (inde === '司机') {
////          t.form.empkiEstablishment = t.paramCode.paramCode3
////        } else if (inde === '项目销售/渠道岗') {
////          t.form.empkiEstablishment = t.paramCode.paramCode4
////        } else if (inde === '其他不占编') {
////          t.form.empkiEstablishment = t.paramCode.paramCode5
////        }
////        console.log(t.formValidate.empkiEstablishment)
//      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
