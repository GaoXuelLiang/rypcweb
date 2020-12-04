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
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top: 20px">
          <Row>
            <Col span="11">
            <FormItem prop="hcOrder" label="序号">
              <Input :disabled="displayShow" v-model="formValidate.hcOrder" placeholder="请输入序号"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
            <FormItem prop="hcLower" label="年薪下限(万元)">
              <Input :disabled="displayShow" v-model="formValidate.hcLower" placeholder="请输入年薪下限(万元)"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="年薪上限(万元)" prop="hcUpper">
              <Input :disabled="displayShow" v-model="formValidate.hcUpper"   placeholder="请输入年薪上限(万元)"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
            <FormItem label="招聘费用" prop="hcRecruitcost">
              <Input :disabled="displayShow" v-model="formValidate.hcRecruitcost" placeholder="请输入招聘费用"></Input>
            </FormItem>
            </Col>
            <Col span="11" offset="1">
            <FormItem label="支付方式" prop="hcPaytype">
              <Select v-model="formValidate.hcPaytype">
                <Option  :disabled="displayShow" :value="item.paramCode" :key="index" v-for="(item,index) in select">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="23">
            <FormItem label="备注" prop="comment">
              <Input :disabled="displayShow" v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgcostcenter.commentDis')"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="23">
            <Row type="flex" justify="end">
              <FormItem v-if="!displayShow">
                <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../lib/util'
  export default {
    data() {
      return {
        formValidate: {
          _mt:  this.$global.mt+'BaseHuntercost.addOrUpd',
          logType: '基本信息',
          funId: '1',
          hcOrder: '',
          hcLower: '',
          hcUpper: '',
          hcRecruitcost: '',
          hcPaytype: '',
          comment: '',
        },
        ruleValidate: {
          hcOrder: [
            { required: true, message: '请输入序号', trigger: 'blur' },
          ],
          hcLower: [
            { required: true, message: '请输入年薪下限(万元)', trigger: 'blur' },
          ],
          hcUpper: [
            { required: true, message: '年薪上限(万元)', trigger: 'blur' },
          ],
          hcRecruitcost: [
            { required: true, message: '请输入招聘费用', trigger: 'change' },
          ],
          hcPaytype: [
            { required: true, message: '请输入支付方式', trigger: 'change' },
          ],
        },
        select: [],
        id: '',
        displayShow: true,
      }
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    props: {
      logType: String,
    },
    methods: {
      getData(id) {
        const t = this
        t.id = id
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseHuntercost.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.hcOrder = res.data.content[0].hcOrder
            t.formValidate.hcLower = res.data.content[0].hcLower
            t.formValidate.hcUpper = res.data.content[0].hcUpper
            t.formValidate.hcRecruitcost = res.data.content[0].hcRecruitcost
            t.formValidate.hcPaytype = res.data.content[0].hcPaytype
            t.formValidate.comment = res.data.content[0].comment
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
        data.hcVendorid = this.$store.state.huntData.hcVendorid
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            if (t.logType === '修改') {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
              //                console.log(!res.data.content[0].hasOwnProperty('value'))
                if (!res.data.content[0].hasOwnProperty('value')) {
                  if (t.logType === '新增') {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: this.$t('reminder.addsuccess'),
                    })
                    this.$emit('closeUp')
                    t.$refs.formValidate.resetFields()
                  }
                  if (t.logType === '修改') {
                    t.$Modal.success({
                      title: this.$t('reminder.suc'),
                      content: this.$t('reminder.updsuccess'),
                    })
                    this.$emit('closeUp')
                    t.$refs.formValidate.resetFields()
                  }
                }
              }
            }).catch(() => {
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'payratio',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.select = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../../sass/updateAndAdd";
</style>
