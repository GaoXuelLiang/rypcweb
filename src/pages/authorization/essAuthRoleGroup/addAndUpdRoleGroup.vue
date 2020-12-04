<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.admingrprole.rolegrpCode')" prop="rolegrpCode">
            <Input v-model="formValidate.rolegrpCode" :placeholder="$t('lang_role.admingrprole.rolegrpCode')"
                   ></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.admingrprole.rolegrpCname')" prop="rolegrpCname">
            <Input v-model="formValidate.rolegrpCname" :placeholder="$t('lang_role.admingrprole.pprolegrpCname')"
                 ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
<!--          <Col span="10" offset="1">-->
<!--          <FormItem :label="$t('lang_role.admingrprole.rolegrpEname')" prop="rolegrpEname">-->
<!--            <Input v-model="formValidate.rolegrpEname" :placeholder="$t('lang_role.admingrprole.prolegrpEname')"-->
<!--                   ></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.admingrprole.validDis')"  prop="valid">
            <RadioGroup v-model="formValidate.valid" type="button" size="small" :placeholder="$t('lang_role.admingrprole.valid')"
                      @on-change="validChange()">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}
              </Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.admingrprole.rolegrpDesc')"  prop="rolegrpDesc">
            <Input v-model="formValidate.rolegrpDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.admingrprole.prolegrpDesc')" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_role.adminrole.invdate')"  prop="invdate">
            <span @dblclick="clear">
              <DatePicker type="date" :placeholder="$t('lang_role.adminrole.pinvdate')"
                          :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
            </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          </Col>
        </Row>
        <Row v-show="openInValid">
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminrole.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :placeholder="$t('lang_role.adminrole.pinvreason')"
                   :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_role.adminpmtype.comment')"  prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   :placeholder="$t('lang_role.adminpmtype.pcomment')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" style="margin-left: 8px" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '../../../axios/axios'
  import searchTable from '../../../components/searchTable/searchTable'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow: false,
        formValidate: {
          _mt:  this.$global.mt+'AuthRoleGroup.addOrUpdAuthRoleGroup',
          rolegrpCode: '',
          rolegrpType: '6essmss',
          rolegrpCname: '',
          rolegrpEname: '',
          rolegrpDesc: '',
          valid: '1',
          invdate: '',
          invreason: '',
          comment: '',
        },
        openInValid: false,
        ruleValidate: {
          rolegrpCode: [
            {required: true, message: this.$t('lang_role.admingrprole.prolegrpCode'), trigger: 'blur'},
          ],
          rolegrpCname: [
            {required: true, message: this.$t('lang_role.admingrprole.pprolegrpCname'), trigger: 'blur'},
          ],
          rolegrpEname: [
            {required: true, message: this.$t('lang_role.admingrprole.prolegrpEname'), trigger: 'blur'},
          ],
        },
        radioYesOrNo: [],
      }
    },
    components: {
      searchTable,
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this;
        t.spinShow = true;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'AuthRoleGroup.selAuthRoleGroupByIds',
          ids: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.rolegrpCode = res.data.content[0].value[0].rolegrpCode
            t.formValidate.rolegrpType = res.data.content[0].value[0].rolegrpType
            t.formValidate.rolegrpCname = res.data.content[0].value[0].rolegrpCname
            t.formValidate.rolegrpEname = res.data.content[0].value[0].rolegrpEname
            t.formValidate.rolegrpDesc = res.data.content[0].value[0].rolegrpDesc
            t.formValidate.valid = res.data.content[0].value[0].valid
            t.formValidate.invdate = res.data.content[0].value[0].invdate
            t.formValidate.invreason = res.data.content[0].value[0].invreason
            t.formValidate.comment = res.data.content[0].value[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      validChange() {
        if (this.formValidate.valid === '1') {
          this.openInValid = false
          this.formValidate.invdate = ''
          this.formValidate.invreason = ''
        } else {
          this.openInValid = true
        }
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        console.log(data)
        data.logType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.invdate !== undefined) {
          data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
        }
        this.$refs.formValidate.validate((valid) => {
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
                  t.$emit('getData', res.data.content[0])
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
      clear() {
        const t = this
        this.openInValid = false
        t.formValidate.invdate = ''
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.openInValid = false
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

</style>
