<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{relieveTitle}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div ref="scrollBox">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col span="10" offset="1">
            <FormItem :label="labelDesc.ebpRelievedate" prop="ebpRelievedate">
              <DatePicker type="date" v-model="form.ebpRelievedate" :editable="false" :transfer="true" style="width: 100%" :placeholder="placeHolderDesc.ebpRelievedate" ></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="21" offset="1">
            <FormItem :label="labelDesc.ebpRelievereason" prop="ebpRelievereason">
              <Input v-model="form.ebpRelievereason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="placeHolderDesc.ebpRelievereason"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="21" offset="1">
            <FormItem :label="labelDesc.ebpRelievelink" prop="ebpRelievelink">
              <Input v-model="form.ebpRelievelink"  type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="placeHolderDesc.ebpRelievelink"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cle')}}</Button>
                <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        form: {
          ebpRelievereason: '', // 解除原因
          ebpRelievedate: '', // 解除日期
          ebpRelievelink: '', // 解除联系方式
        },
        ruleValidate: {
          ebpRelievedate: [
            { required: true, type: 'date', message: '解除日期不能为空!', trigger: 'change' },
          ],
          ebpRelievereason: [
            { required: true, message: '解除原因不能为空!', trigger: 'blur' },
          ],
          ebpRelievelink: [
            { required: true, message: '解除联系方式不能为空!', trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      ids: String,
      relieveTitle: String,
      labelDesc: Object,
      placeHolderDesc: Object,
      relieveType: String,
      reliveIds: String,
    },
    methods: {
      handleSubmit() {
        const t = this
        if (t.relieveType === '01relieve') {
            t.handleRelieve() // 解除惩罚的日期
        } else if (t.relieveType === '02brekfaith') {
            t.handleBreak() // 撤销失信名单
        }
      },
      handleRelieve() {
        const t = this
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (t.form.ebpRelievedate !== undefined) {
              t.form.ebpRelievedate = t.form.ebpRelievedate === '' ? '' : new Date(t.form.ebpRelievedate).format('yyyy-MM-dd')
            }
            getDataLevelUserLogin({
              _mt:  this.$global.mt+'EmpBonuspenalty.relieveData',
              ids: t.reliveIds,
              ebpRelievereason: t.form.ebpRelievereason,
              ebpRelievedate: t.form.ebpRelievedate,
              ebpRelievelink: t.form.ebpRelievelink,
            }).then((res) => {
              if (isSuccess(res, t)) {
                t.handleReset()
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: '解除数据成功!',
                })
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							// tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
      handleBreak() {
        const t = this
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (t.form.ebpRelievedate !== undefined) {
              t.form.ebpRelievedate = t.form.ebpRelievedate === '' ? '' : new Date(t.form.ebpRelievedate).format('yyyy-MM-dd')
            }
            getDataLevelUserLogin({
              _mt:  this.$global.mt+'EmpBonuspenalty.relieveBrkFaith',
              funId: '1',
              ids: t.reliveIds,
              brkfRelievereason: t.form.ebpRelievereason,
              brkfRelievedate: t.form.ebpRelievedate,
              brkfRelievelink: t.form.ebpRelievelink,
            }).then((res) => {
              if (isSuccess(res, t)) {
                t.handleReset()
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: '撤销失信名单成功!',
                })
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							// tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
      handleReset() {
        const t = this
        this.$emit('closeUp')
        t.form.ebpRelievereason = ''
        t.form.ebpRelievedate = ''
        t.form.ebpRelievelink = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  /*@import "../../../../sass/updateAndAdd";*/
  .cover{
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
    .box{
      position:relative;
      width: 800px;
      background-color: #fff;
      padding: 60px 10px 30px 10px;
      border-radius: 10px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
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

