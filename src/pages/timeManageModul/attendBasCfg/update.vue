<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div ref="scrollBox" style="max-height: 400px;">
        <Spin fix v-if="isSpin" size="large"></Spin>
        <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
          <Row>
            <i-col span="11">
              <FormItem label="月份" prop='month'>
                <DatePicker type="month" format="yyyy-MM" v-model="upFormData.month" placeholder="请选择月份" :editable="false" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11">
              <FormItem label="考勤数据截止日期" prop='finalDate'>
                <DatePicker type="date" v-model="upFormData.finalDate" placeholder="请选择考勤数据截止日期" :editable="false" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="22" >
              <FormItem label="备注" prop="remark">
                <Input v-model="upFormData.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="21" offset="1">
              <Row type="flex" justify="end">
                <FormItem>
                  <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                  <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
                </FormItem>
              </Row>
            </i-col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
//  import validChenck from '../../../../lib/pub_valid'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow:false,
        isSpin: false,
        id: '',
        upFormData: {
          month: '',
          finalDate: '',
          remark: '',
        },
        ruleValidate: {
          month: [
            {required: true, type: 'date', message: '请选择月份', trigger: 'change'},
          ],
          finalDate: [
            {required: true, type: 'date', message: '请选择考勤数据截止日期', trigger: 'change'},
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {},
    mounted() {
//      this.getSelect();
    },
    methods: {
      getData(id) {
        const t = this
        if (id) {
          t.id = id || t.id
          t.isSpin = true
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'AttendBaseconfig.getById',
            logType: '查询单条数据',
            id: id,
          }).then((res) => {
            t.isSpin = false
            if (isSuccess(res, t)) {
              t.upFormData = res.data.content[0]
            }
          }).catch(() => {
            t.isSpin = false
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          }).finally(()=>{
            t.spinShow = false
          })
        }
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.upFormData)
        data._mt =  this.$global.mt+'AttendBaseconfig.addOrUpd'
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.month) {
          data.month = new Date(data.month).format('yyyy-MM')
        }
        if (data.finalDate) {
          data.finalDate = new Date(data.finalDate).format('yyyy-MM-dd')
        }
        this.$refs.upFormData.validate((valid) => {
          if (valid) {
            t.isSpin = true
            if (t.logType === '修改') {
              data.id = t.id
            } else {
              if(data.id) delete data.id
              if(data.createTime) delete data.createTime
              if(data.attShifIslateDis) delete data.attShifIslateDis
              if(data.attShifIsearlyDis) delete data.attShifIsearlyDis
              if(data.deleteFlag) delete data.deleteFlag
            }
            getDataLevelUserLoginNew(data).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.upFormData.resetFields()
                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.handleReset()
              }
            }).catch(() => {
              t.isSpin = false
//              t.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
//        const t = this
//        t.upFormData.attShifIslate = '0';
        this.upFormData = {
          month: '',
          finalDate: '',
          remark: '',
        }
        this.$refs.upFormData.resetFields()
        this.$emit('closeUpd')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover {
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
    background-color: rgba(0, 0, 0, .5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
      position: relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .form {
        max-height: 800px;
        overflow-y: auto;
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
      .content {

      }
    }
  }
</style>
