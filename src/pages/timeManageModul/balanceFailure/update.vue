<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div style="padding-left: 25px;max-height: 410px;margin-right: 10px;margin-bottom: 20px;">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Row>
            <i-col span="11">
              <FormItem label="年度" prop="applyplusYear">
                <Select clearable v-model="formValidate.applyplusYear" placeholder="请选择年度">
                  <Option :value="item.fyYear" v-for="(item,index) in select1" :key="index">{{item.fyYear}}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="11">
              <FormItem label="结转年假失效日期" prop="applyplusAninvdate">
                <DatePicker type="date" placeholder="请选择结转年假失效日期" :editable="false"
                            v-model="formValidate.applyplusAninvdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="结转剩余年假处理规则" prop="applyplusAnregud">
                <Select clearable v-model="formValidate.applyplusAnregud" placeholder="请选择规则">
                  <Option :value="item.paramCode" v-for="(item,index) in select" :key="index">{{item.paramInfoName}}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="11">
              <FormItem label="结转调休失效日期" prop="applyplusBkinvdate">
                <DatePicker type="date" placeholder="请选择结转调休失效日期" :editable="false"
                            v-model="formValidate.applyplusBkinvdate" style="width: 100%"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="11" offset="1">
              <FormItem label="结转剩余调休处理规则" prop="applyplusBkregud">
                <Select clearable v-model="formValidate.applyplusBkregud" placeholder="请选择规则">
                  <Option :value="item.paramCode" v-for="(item,index) in select" :key="index">{{item.paramInfoName}}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="23">
              <FormItem label="备注" prop="comment">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <Col span="23">
            <Row type="flex" justify="end">
              <FormItem>
                <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
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
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        id: '',
        formValidate: {
          applyplusYear: '',
          applyplusAninvdate: '',
          applyplusAnregud: '',
          applyplusBkinvdate: '',
          applyplusBkregud: '',
          comment: '',
        },
        ruleValidate: {
          applyplusYear: [
            {required: true, message: '请选择年度', trigger: 'change'},
          ],
          applyplusAninvdate: [
            {required: true, type: 'date', message: '请选择结转年假失效日期', trigger: 'blur'},
          ],
          applyplusBkinvdate: [
            {required: true, type: 'date', message: '请选择结转调休失效日期', trigger: 'blur'},
          ],
          applyplusAnregud: [
            {required: true, message: '请选择结转剩余年假处理规则', trigger: 'change'},
          ],
          applyplusBkregud: [
            {required: true, message: '请选择结转剩余调休处理规则', trigger: 'change'},
          ],

        },
        select: [],
        select1: [],
      }
    },
    props: {
      logType: String,
    },
    components: {},
    methods: {
      getData(id) {
        const t = this
        if (id) {
          t.id = id
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'ApplyPlusinvdate.getById',
            logType: '查询单条数据',
            id: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.formValidate.applyplusYear = res.data.content[0].applyplusYear
              t.formValidate.applyplusAninvdate = res.data.content[0].applyplusAninvdate
              t.formValidate.applyplusAnregud = res.data.content[0].applyplusAnregud
              t.formValidate.applyplusBkinvdate = res.data.content[0].applyplusBkinvdate
              t.formValidate.applyplusBkregud = res.data.content[0].applyplusBkregud
              t.formValidate.comment = res.data.content[0].comment
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      getYear() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.select1 = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'annualevalHandltype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.select = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data._mt =  this.$global.mt+'ApplyPlusinvdate.addOrUpd'
        data.logType = t.logType
        if (data.applyplusAninvdate !== undefined) {
          data.applyplusAninvdate = data.applyplusAninvdate === '' ? '' : new Date(data.applyplusAninvdate).format('yyyy-MM-dd')
        }
        if (data.applyplusBkinvdate !== undefined) {
          data.applyplusBkinvdate = data.applyplusBkinvdate === '' ? '' : new Date(data.applyplusBkinvdate).format('yyyy-MM-dd')
        }
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
          } else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
//         t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
        this.$refs.formValidate.resetFields()
        this.$emit('close')
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
        max-height: 400px;
        overflow: auto;
      }
    }
  }
</style>
