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
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col01" prop="trtb01Col01">
            <Input v-model="formValidate.trtb01Col01" :placeholder="placeHolderDesc.trtb01Col01"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col02" prop="trtb01Col02">
            <Input v-model="formValidate.trtb01Col02" :placeholder="placeHolderDesc.trtb01Col02"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col03" prop="trtb01Col03">
            <Input v-model="formValidate.trtb01Col03" :placeholder="placeHolderDesc.trtb01Col03"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col04" prop="trtb01Col04">
            <Input v-model="formValidate.trtb01Col04" :placeholder="placeHolderDesc.trtb01Col04"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col05" prop="trtb01Col05">
            <Input v-model="formValidate.trtb01Col05" :placeholder="placeHolderDesc.trtb01Col05"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col06" prop="trtb01Col06">
            <Input v-model="formValidate.trtb01Col06" :placeholder="placeHolderDesc.trtb01Col06"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col07" prop="trtb01Col07">
            <Input v-model="formValidate.trtb01Col07" :placeholder="placeHolderDesc.trtb01Col07"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trtb01Col08" prop="trtb01Col08">
            <Input v-model="formValidate.trtb01Col08" :placeholder="placeHolderDesc.trtb01Col08"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.comment" prop="comment">
            <Input v-model="formValidate.comment" :placeholder="placeHolderDesc.comment"></Input>
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
          _mt:  this.$global.mt+'TrainTesttb01.addOrUpd',
          trtb01Col01:'',
          trtb01Col02:'',
          trtb01Col03:'',
          trtb01Col04:'',
          trtb01Col05:'',
          trtb01Col06:'',
          trtb01Col07:'',
          trtb01Col08:'',
          comment:'',

        },
        ruleValidate: {
          trtb01Col01: [
            {required: true, message: '', trigger: 'blur'},
          ],
          trtb01Col02: [
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
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'TrainTesttb01.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.trtb01Col01 = res.data.content[0].trtb01Col01
            t.formValidate.trtb01Col02 = res.data.content[0].trtb01Col02
            t.formValidate.trtb01Col03 = res.data.content[0].trtb01Col03
            t.formValidate.trtb01Col04 = res.data.content[0].trtb01Col04
            t.formValidate.trtb01Col05 = res.data.content[0].trtb01Col05
            t.formValidate.trtb01Col06 = res.data.content[0].trtb01Col06
            t.formValidate.trtb01Col07 = res.data.content[0].trtb01Col07
            t.formValidate.trtb01Col08 = res.data.content[0].trtb01Col08
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
