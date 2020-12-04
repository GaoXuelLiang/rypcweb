<template>
  <div>
    <col>
      <h2 style="font-weight: bold">详细信息</h2>
    </col>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top: 20px">
      <Row>
        <Col span="11">
        <FormItem label="供应商类别" prop="hvType">
          <Select v-model="formValidate.hvType" :disabled="huntDisShow">
            <Option :value="item.paramCode" :key="index" v-for="(item,index) in vendorselect">{{item.paramInfoName}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="11" offset="1">
        <FormItem prop="hvCode" label="供应商编号">
          <Input v-model="formValidate.hvCode" :disabled="huntDisShow" placeholder="请输入供应商编号"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="11">
        <FormItem prop="hvCompname" label="公司名称">
          <Input v-model="formValidate.hvCompname" :disabled="huntDisShow" placeholder="请输入公司名称"></Input>
        </FormItem>
        </Col>
        <Col span="11" offset="1">
        <FormItem label="公司简称" prop="hvCompsname">
            <Input v-model="formValidate.hvCompsname" :disabled="huntDisShow"  placeholder="请输入考核方案"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="11">
        <FormItem label="联系人" prop="hvContrcact">
          <Input v-model="formValidate.hvContrcact" :disabled="huntDisShow" placeholder="请输入联系人"></Input>
        </FormItem>
        </Col>
        <Col span="11" offset="1">
        <FormItem label="联系电话" prop="hvTel">
          <Input v-model="formValidate.hvTel" :disabled="huntDisShow" placeholder="请输入联系电话"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="11">
        <FormItem label="邮箱" prop="hvMail">
          <Input v-model="formValidate.hvMail" :disabled="huntDisShow" placeholder="请输入邮箱"></Input>
        </FormItem>
        </Col>
        <Col span="11" offset="1">
        <FormItem label="状态" prop="hvStatus">
          <Select v-model="formValidate.hvStatus" disabled>
            <Option :value="item.paramCode" :key="index" v-for="(item,index) in formStatus">{{item.paramInfoName}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="23">
        <FormItem label="备注" prop="comment">
          <Input v-model="formValidate.comment" :disabled="huntDisShow" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="23">
        <Row type="flex" justify="end">
          <FormItem v-show="!huntDisShow">
            <Button type="primary" :loading="isSpin" @click="handleSubmit" v-if="!editDisbale">{{$t('button.sav')}}</Button>
          </FormItem>
        </Row>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  export default {
    data() {
      return {
        isSpin: false,
        formValidate: {
          _mt:  this.$global.mt+'BaseHuntervendor.addOrUpd',
          logType: '基本信息',
          funId: '1',
          hvCode: '',
          hvType: '',
          hvCompname: '',
          hvCompsname: '',
          hvContrcact: '',
          hvTel: '',
          hvMail: '',
          comment: '',
          hvStatus: '',
        },
        ruleValidate: {
          hvType: [
            { required: true, message: '请输入供应商类别', trigger: 'blur' },
          ],
          hvCode: [
            { required: true, message: '请输入供应商编号', trigger: 'blur' },
          ],
          hvCompname: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          hvCompsname: [
            { required: true, message: '请输入公司简称', trigger: 'change' },
          ],
          hvContrcact: [
            { required: true, message: '请输入联系人', trigger: 'change' },
          ],
          hvTel: [
            { required: true, message: '请输入联系电话', trigger: 'change' },
          ],
          hvMail: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
          ],
        },
        select: [],
        vendorselect: [],
        evaalWeight: ['01self', '02manage', '03peer', '04subor'],
        id: '',
        formStatus: [], // 职务状态初始化
        editDisbale: false, // 是否可编辑
      }
    },
    updated() {

    },
    mounted() {
    },
    props: {
      logType: String,
    },
    computed: {
      huntDisShow() {
        return this.$store.state.huntData.huntDisShow
      },
    },
    methods: {
      getData(id) {
        const t = this
        t.id = id
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseHuntervendor.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.hvCode = res.data.content[0].hvCode
            t.formValidate.hvType = res.data.content[0].hvType
            t.formValidate.hvCompname = res.data.content[0].hvCompname
            t.formValidate.hvCompsname = res.data.content[0].hvCompsname
            t.formValidate.hvContrcact = res.data.content[0].hvContrcact
            t.formValidate.hvTel = res.data.content[0].hvTel
            t.formValidate.hvMail = res.data.content[0].hvMail
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.hvStatus = res.data.content[0].hvStatus
            this.$store.commit('huntData/setHcVendorid', res.data.content[0].id)
            if (res.data.content[0].hvStatus !== '01draft') { // 不是编辑中的状态就不可修改
              t.editDisbale = true
            } else {
              t.editDisbale = false
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      formValidates() {
        this.$refs.formValidate.resetFields()
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
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
                        //                console.log(!res.data.content[0].hasOwnProperty('value'))
                if (!res.data.content[0].hasOwnProperty('value')) {
                  if (t.logType === '新增') {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: this.$t('reminder.addsuccess'),
                    })
                    this.$store.commit('huntData/setHcVendorid', res.data.content[0].id)
                    this.$store.commit('huntData/setHuntInfoShow')
                  }
                  if (t.logType === '修改') {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: this.$t('reminder.updsuccess'),
                    })
                  }
                }
              }
            }).catch(() => {
              t.isSpin = false
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
      getSelect(logType) {
        const t = this
        if(logType == '新增') {
          t.formValidate.hvStatus = '01draft'
        }
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'payratio,vendortype,pubstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.select = res.data.content[0].value[0].paramList
            this.vendorselect = res.data.content[0].value[1].paramList
            t.formStatus = res.data.content[0].value[2].paramList;
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
  @import "../../../../sass/updateAndAdd";
</style>
