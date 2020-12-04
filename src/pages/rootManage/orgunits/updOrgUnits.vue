<template>
  <div class="cover">
    <div class="box">
       <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
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
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.unitCode1')" prop="unitCode">
            <Input v-model="formValidate.unitCode" :placeholder="$t('lang_organization.orgframe.unitCodeInp1')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.compFnameCnDis')" prop="compFnameCnDis">
            <Input v-model="formValidate.compFnameCnDis" :placeholder="$t('lang_organization.orgframe.compFnameCnDis')"></Input>
          </FormItem>
          </Col>
<!--          <Col span="10" offset="1" >-->
<!--          <FormItem :label="$t('lang_organization.orgframe.compFnameEnDis')" prop="compFnameEnDis">-->
<!--            <Input v-model="formValidate.compFnameEnDis" :placeholder="$t('lang_organization.orgframe.compFnameEnDisInp')"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
          <Col span="10" offset="1">
            <FormItem :label="$t('lang_organization.orgframe.compSnameCnDis')" prop="compSnameCnDis">
              <Input v-model="formValidate.compSnameCnDis" :placeholder="$t('lang_organization.orgframe.compSnameCnDisInp')"></Input>
            </FormItem>
          </Col>
        </Row>
<!--        <Row>-->

<!--          <Col span="10" offset="1" >-->
<!--          <FormItem :label="$t('lang_organization.orgframe.compSnameEnDis')" prop="compSnameEnDis">-->
<!--            <Input v-model="formValidate.compSnameEnDis" :placeholder="$t('lang_organization.orgframe.compSnameEnDisInp')"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.unitBkdesc')" prop="unitBkdesc">
            <Input v-model="formValidate.unitBkdesc" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="$t('lang_organization.orgframe.unitBkdescInp')"></Input>
          </FormItem>
          </Col>
        </Row>
<!--        <Row>-->
<!--          <Col span="21" offset="1">-->
<!--          <FormItem :label="$t('lang_organization.orgframe.unitAgentno')" prop="unitAgentno">-->
<!--            <Input v-model="formValidate.unitAgentno" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="$t('lang_organization.orgframe.unitAgentnoInp')"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
<!--        </Row>-->
        <Row>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_organization.orgframe.validdate')" prop="validdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.validdateInp')" :editable="false" v-model="formValidate.validdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_organization.orgframe.invdate')" prop="invdate">
            <DatePicker type="date" :placeholder="$t('lang_organization.orgframe.invdateInp')" :editable="false" v-model="formValidate.invdate" style="width: 100%"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.invreason')" prop="invreason">
            <Input v-model="formValidate.invreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.invreasonInp')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_organization.orgframe.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_organization.orgframe.commentInp')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" style="margin-left: 8px"  @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
      <!-- <div class="tab-btn">
         <Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </div> -->
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow:false,
        formValidate: {
          _mt:  this.$global.mt+'OrgUnits.addOrModifyOrgUnits',
          unitCode: '',
          validdate: '',
          compFnameCnDis: '',
          compFnameEnDis: '',
          compSnameCnDis: '',
          compSnameEnDis: '',
          invdate: '',
          invreason: '',
          unitAgentno: '',
          unitBkdesc: '',
          comment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          unitCode: [
            { required: true, message: this.$t('lang_organization.orgframe.unitCodeInp1'), trigger: 'blur' },
          ],
          compFnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compFnameCnDisInp'), trigger: 'blur' },
          ],
          compFnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compFnameEnDisInp'), trigger: 'blur' },
          ],
          compSnameCnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compSnameCnDisInp'), trigger: 'blur' },
          ],
          compSnameEnDis: [
            { required: true, message: this.$t('lang_organization.orgframe.compSnameEnDisInp'), trigger: 'blur' },
          ],
          unitAgentno: [
            { required: true, message: this.$t('lang_organization.orgframe.unitAgentnoInp'), trigger: 'blur' },
          ],
          validdate: [
            { required: true, type: 'date', message: this.$t('lang_organization.orgframe.validdateInp'), trigger: 'change' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    components: {
    },
    updated() {

    },
    methods: {
       handleReset () {
            this.$emit('closeUp')
        },
      getData(id) {
        const t = this
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgUnits.selectById',
          id: id,
          funId: '1',
          logType: 'Id查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.unitCode = res.data.content[0].unitCode
            t.formValidate.compFnameCnDis = res.data.content[0].compFnameCnDis
            t.formValidate.compFnameEnDis = res.data.content[0].compFnameEnDis
            t.formValidate.compSnameCnDis = res.data.content[0].compSnameCnDis
            t.formValidate.compSnameEnDis = res.data.content[0].compSnameEnDis
            t.formValidate.unitAgentno = res.data.content[0].unitAgentno
            t.formValidate.unitBkdesc = res.data.content[0].unitBkdesc
            t.formValidate.validdate = res.data.content[0].validdate
            t.formValidate.invdate = res.data.content[0].invdate
            t.formValidate.invreason = res.data.content[0].invreason
            t.formValidate.comment = res.data.content[0].comment
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
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType

        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        if (data.validdate !== undefined && data.validdate !== '') {
          data.validdate = new Date(data.validdate).format('yyyy-MM-dd')
        } else {
          data.validdate = ''
        }
        if (data.invdate !== undefined && data.invdate !== '') {
          data.invdate = new Date(data.invdate).format('yyyy-MM-dd')
        } else {
          data.invdate = ''
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
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .ivu-form-item {
    margin-bottom: 20px;
    vertical-align: top;
    zoom: 1;
}
</style>
