<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10">
          <FormItem :label="labelDesc.baseTrseptNo" prop="baseTrseptNo">
            <Input v-model="formValidate.baseTrseptNo" :disabled="logType == '查看'" :placeholder="placeHolderDesc.baseTrseptNo"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.baseTrseptProperty" prop="baseTrseptProperty">
            <Input v-model="formValidate.baseTrseptProperty" :disabled="logType == '查看'" :placeholder="placeHolderDesc.baseTrseptProperty"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" >
            <FormItem :label="labelDesc.baseTrseptDesc" prop="baseTrseptDesc">
              <Input v-model="formValidate.baseTrseptDesc" type="textarea" :disabled="logType == '查看'" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.baseTrseptDesc"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" >
            <FormItem :label="labelDesc.baseTrseptStatusDis" prop="baseTrseptStatusDis">
              <Input v-model="formValidate.baseTrseptStatusDis" disabled :placeholder="placeHolderDesc.baseTrseptStatusDis"></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem :label="labelDesc.baseTrseptVdate" prop="baseTrseptVdate">
              <DatePicker v-model="formValidate.baseTrseptVdate"  disabled  readonly  type="datetime" format="yyyy-MM-dd HH:mm" placeholder="生效时间" style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
            <FormItem :label="labelDesc.comment" prop="comment">
              <Input v-model="formValidate.comment" type="textarea" :disabled="logType == '查看'" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.comment"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button :disabled="disabled" type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '@/axios/axios'
  import validChenck from '@/lib/pub_valid'
  import {isSuccess, deepCopy} from '@/lib/util'

  export default {
    data() {
      const syssmsNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number101(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        disabled: false,
        formValidate: {
          _mt:  this.$global.mt+'BaseTransencrypt.addOrUpd',
          baseTrseptNo:'',
          baseTrseptProperty:'',
          baseTrseptDesc:'',
          baseTrseptStatusDis: '编辑中',
          baseTrseptVdate: '',
          comment:'',
          baseTrseptStatus: '01draft'
        },
        ruleValidate: {
          baseTrseptProperty: [
            { required: true, message: '请输入字段属性', trigger: 'blur' },
          ],
          baseTrseptNo: [
            { required: true, message: '请输入序号', trigger: 'blur' },
            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
          ],
          baseTrseptDesc: [
            { required: true, message: '请输入安全说明', trigger: 'blur' },
          ],
        },
      }
    },
    components: {},
    props: {
      id: Number,
      logType: String,
      index: Number,
      labelDesc: Object,
      placeHolderDesc: Object,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseTransencrypt.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.baseTrseptNo = res.data.content[0].baseTrseptNo
            t.formValidate.baseTrseptProperty = res.data.content[0].baseTrseptProperty
            t.formValidate.baseTrseptDesc = res.data.content[0].baseTrseptDesc
            t.formValidate.baseTrseptStatusDis = res.data.content[0].baseTrseptStatusDis
            t.formValidate.baseTrseptVdate = res.data.content[0].baseTrseptVdate
            t.formValidate.comment = res.data.content[0].comment
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
        data.logType = t.logType
        if(data.baseTrseptVdate){
          data.baseTrseptVdate = new Date(data.baseTrseptVdate).format('yyyy-MM-dd hh:mm')
        }
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('newData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
