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
          <!--<Col span="10" offset="1">-->
          <!--<FormItem :label="labelDesc.bsesdsmSdid" prop="bsesdsmSdid">-->
            <!--<Input v-model="formValidate.bsesdsmSdid" :placeholder="placeHolderDesc.bsesdsmSdid"></Input>-->
          <!--</FormItem>-->
          <!--</Col>-->
          <Col span="10">
            <FormItem :label="labelDesc.bsesdsmField" prop="bsesdsmField">
              <Input v-model="formValidate.bsesdsmField" :placeholder="placeHolderDesc.bsesdsmField"></Input>
            </FormItem>
            </Col>
          <Col span="10" offset="1">
            <FormItem :label="labelDesc.bsesdsmProp" prop="bsesdsmProp">
              <Input v-model="formValidate.bsesdsmProp" :placeholder="placeHolderDesc.bsesdsmProp"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
            <FormItem :label="labelDesc.bsesdsmLength" prop="bsesdsmLength">
              <Input v-model="formValidate.bsesdsmLength" :placeholder="placeHolderDesc.bsesdsmLength"></Input>
            </FormItem>
          </Col>
          <Col span="10" style="text-align: left;color: red">
          (如果值为-1，获取所有！)
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem :label="labelDesc.comment" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :placeholder="placeHolderDesc.comment"></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="21" offset="1">
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
  import {isSuccess, deepCopy} from '@/lib/util'


  export default {
    data() {
      return {
        disabled: false,
        formValidate: {
          _mt:  this.$global.mt+'BaseEsdsmap.addOrUpd',
          bsesdsmField:'',
          bsesdsmProp:'',
          bsesdsmLength:'',
          comment:'',

        },
        ruleValidate: {
          bsesdsmField: [
            {required: true, message: '', trigger: 'blur'},
          ],
          bsesdsmProp: [
            {required: true, message: '', trigger: 'blur'},
          ],
          bsesdsmLength: [
            {required: true, message: '', trigger: 'blur'},
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
    computed: {
      masterPublicId() {
        return this.$store.state.user.masterPublicId
      },
      filterParams() {
        return this.$store.state.commonPage.childParams;
      }
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseEsdsmap.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.bsesdsmSdid = res.data.content[0].bsesdsmSdid
            t.formValidate.bsesdsmField = res.data.content[0].bsesdsmField
            t.formValidate.bsesdsmProp = res.data.content[0].bsesdsmProp
            t.formValidate.bsesdsmLength = res.data.content[0].bsesdsmLength
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
        for (let k in this.filterParams) {
          data[k] = this.filterParams[k]
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
