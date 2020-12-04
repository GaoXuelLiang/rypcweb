<template>
  <div class="cover">
    <div class="box">
       <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType === "新增" ? '新增': '修改'}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <div ref="scrollBox" style="max-height: 420px;overflow-y: auto;">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
              <Row>
                <Col span="22">
                  <FormItem label="职位级别" prop="positionLevel">
                    <Input v-model="formValidate.positionLevel"  placeholder="请输入职位级别" ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <FormItem label="管理岗（集团本部）" prop="positionMgtgroup">
                    <Input v-model="formValidate.positionMgtgroup"  placeholder="请输入管理岗（集团本部）" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <FormItem label="管理岗（下属公司）" prop="positionMgtcomp" >
                    <Input v-model="formValidate.positionMgtcomp"  placeholder="请输入管理岗（下属公司）" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="22" >
                  <FormItem label="专业岗" prop="positionPerfision">
                    <Input v-model="formValidate.positionPerfision"  placeholder="请输入专业岗" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="22" >
                  <FormItem label="销售岗" prop="positionSaling">
                    <Input v-model="formValidate.positionSaling"  placeholder="请输入销售岗" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <FormItem label="备注" prop="comment" class="last-item">
                    <Input v-model="formValidate.comment" :disabled="editDisbale" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请备注"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Row>
      </div>
      <Row class="row">
        <i-col span="22" style="text-align:right;">
            <Button style="margin-right: 8px" v-show="!editDisbale" @click="handleReset">{{$t('button.cal')}}</Button>
            <Button type="primary" :loading="isSpin" v-show="!editDisbale" @click="handleSubmit" >{{$t('button.sav')}}</Button>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  export default {
    props: {
      logType: String,
    },
    data() {
      return {
        isSpin: false,
        openPickUser: false,
        props: {
          logType: '',
        },
        formValidate: {
          _mt:  this.$global.mt+'OrgPostlevelmapping.addOrUpd',
          funId: '1',
          positionLevel: '',
          positionMgtgroup: '',
          positionMgtcomp: '',
          positionPerfision: '',
          positionSaling: '',
          comment: '',
        },
        ruleValidate: {
          positionLevel: [
            { required: true, message: '请输入职务级别', trigger: 'blur' },
          ],
//          positionMgtgroup: [
//            { required: true, message: '请输入管理岗（集团本部）', trigger: 'blur' },
//          ],
//          positionMgtcomp: [
//            { required: true, message: '请输入管理岗（下属公司）', trigger: 'change' },
//          ],
//          positionPerfision: [
//            { required: true, message: '请输入专业岗', trigger: 'change' },
//          ],
//          positionSaling: [
//            { required: true, message: '请输入销售岗', trigger: 'change' },
//          ],
        },
        evaalPlan: false,
        id: '',
        openPost: false,
        editDisbale: false, // 是否可编辑
        dutyGroupDis: '',
        spinShow:false
      }
    },
    methods: {
      handleReset() {
        this.$emit('closeUpd')
        this.$refs.formValidate.resetFields()
      },
      getData(id) {
        const t = this
        t.id = id
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgPostlevelmapping.getById',
          id: id,
          logType: this.$t('button.y.upd'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.formValidate.positionLevel = res.data.content[0].positionLevel
            this.formValidate.positionMgtgroup = res.data.content[0].positionMgtgroup
            this.formValidate.positionMgtcomp = res.data.content[0].positionMgtcomp
            this.formValidate.positionPerfision = res.data.content[0].positionPerfision
            this.formValidate.positionSaling = res.data.content[0].positionSaling
            this.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false
        })
      },
      formValidates() {
        this.$refs.formValidate.resetFields()
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logTyp
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        console.log(data)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.isSpin = true
            if (t.logType === '修改') {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  this.$emit('getData', res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  this.$emit('update', res.data.content[0])
                }
                t.handleReset()
              }
            }).catch(() => {
              t.isSpin = false
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          } else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .last-item{
    margin-bottom: 0 !important;
  }
  .row{
      margin: 20px 0;
  }
</style>
