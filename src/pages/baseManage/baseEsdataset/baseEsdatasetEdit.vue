<template>
  <div style="padding-left: 25px;max-height: 410px;overflow-y: auto;margin-right: 10px;margin-bottom: 20px;">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10">
          <FormItem :label="labelDesc.bsesdsCode" prop="bsesdsCode">
            <Input v-model="formValidate.bsesdsCode" :placeholder="placeHolderDesc.bsesdsCode"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.bsesdsName" prop="bsesdsName">
            <Input v-model="formValidate.bsesdsName" :placeholder="placeHolderDesc.bsesdsName"></Input>
          </FormItem>
          </Col>
        </Row>
       <Row>
        <Col span="10">
        <FormItem :label="labelDesc.bsesdsSubcode" prop="bsesdsSubcode">
          <Input v-model="formValidate.bsesdsSubcode" :placeholder="placeHolderDesc.bsesdsSubcode"></Input>
        </FormItem>
        </Col>
        <Col span="10" offset="1">
        <FormItem :label="labelDesc.bsesdsSubname" prop="bsesdsSubname">
          <Input v-model="formValidate.bsesdsSubname" :placeholder="placeHolderDesc.bsesdsSubname"></Input>
        </FormItem>
        </Col>
      </Row>
        <Row>
          <Col span="10">
          <FormItem :label="labelDesc.bsesdsClass" prop="bsesdsClass">
            <Input v-model="formValidate.bsesdsClass" :placeholder="placeHolderDesc.bsesdsClass"></Input>
          </FormItem>
          </Col>
          <Col span="10"  offset="1">
          <FormItem :label="labelDesc.bsesdsFuncode" prop="bsesdsFuncode">
            <Input v-model="formValidate.bsesdsFuncode" :placeholder="placeHolderDesc.bsesdsFuncode"  @on-click="opencompetType()"></Input>
          </FormItem>
          </Col>
        </Row>
       <Row>
        <Col span="20">
        <FormItem :label="labelDesc.bsesdsHidden" prop="bsesdsHidden">
          <Input v-model="formValidate.bsesdsHidden" type="textarea" :placeholder="placeHolderDesc.bsesdsHidden"></Input>
        </FormItem>
        </Col>
       </Row>
        <Row>
          <Col span="20">
          <FormItem :label="labelDesc.bsesdsTitle" prop="bsesdsTitle">
            <Input v-model="formValidate.bsesdsTitle" type="textarea" :placeholder="placeHolderDesc.bsesdsTitle"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
          <FormItem :label="labelDesc.bsesdsData" prop="bsesdsData">
            <Input v-model="formValidate.bsesdsData" type="textarea" :placeholder="placeHolderDesc.bsesdsData"></Input>
          </FormItem>
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
    <autoSearchtable
      v-if="showModal"
      @closeUp="closeModal"
      :modiaContent=modiaContent
      @changeinput="changeinput1"
      :dataParame="dataParame"
      dataType='row'
      urlType="loginNew">
    </autoSearchtable>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'

  export default {
    data() {
      return {
        disabled: false,
        showModal: false,
        modiaContent: 'search-syFunction-code',
        dataParame: {
          funType: '3user',
        },
        formValidate: {
          _mt:  this.$global.mt+'BaseEsdataset.addOrUpd',
          id: '',
          bsesdsCode: '',
          bsesdsName: '',
          bsesdsSubcode: '',
          bsesdsSubname: '',
          bsesdsHidden: '',
          bsesdsTitle: '',
          bsesdsData: '',
          bsesdsClass: '',
          comment: '',
          bsesdsFuncode: '',
          bsesdsIfFlow: '0',
          bsesdsRoute: '',
        },
        ruleValidate: {
          bsesdsCode: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsName: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsSubcode: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsSubname: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsHidden: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsTitle: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsData: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsClass: [
            { required: true, message: '', trigger: 'blur' },
          ],
          bsesdsFuncode: [
            { required: true, message: '', trigger: 'blur' },
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
          _mt:  this.$global.mt+'BaseEsdataset.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.id = res.data.content[0].id
            t.formValidate.bsesdsCode = res.data.content[0].bsesdsCode
            t.formValidate.bsesdsName = res.data.content[0].bsesdsName
            t.formValidate.bsesdsSubcode = res.data.content[0].bsesdsSubcode
            t.formValidate.bsesdsSubname = res.data.content[0].bsesdsSubname
            t.formValidate.bsesdsTitle = res.data.content[0].bsesdsTitle
            t.formValidate.bsesdsHidden = res.data.content[0].bsesdsHidden
            t.formValidate.bsesdsData = res.data.content[0].bsesdsData
            t.formValidate.bsesdsClass = res.data.content[0].bsesdsClass
            t.formValidate.comment = res.data.content[0].comment
            t.formValidate.bsesdsFuncode = res.data.content[0].bsesdsFuncode
            t.formValidate.bsesdsIfFlow = res.data.content[0].bsesdsIfFlow || '0'
            t.formValidate.bsesdsRoute = res.data.content[0].bsesdsRoute || ''
            this.$store.commit('setMasterPublicListShow')
            this.$store.commit('setMasterPublicId', res.data.content[0].id)
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
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  this.$store.commit('setMasterPublicListShow')
                  this.$store.commit('setMasterPublicId', res.data.content[0].id)
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
        this.id = ''
        this.$emit('closeUpMenu')
        this.$refs.formValidate.resetFields()
      },
      closeModal() {
        this.showModal = false
      },
      opencompetType() {
        this.showModal = true
      },
      changeinput1(row) {
        const t = this
        t.formValidate.bsesdsFuncode = row.funCode
        t.formValidate.bsesdsIfFlow = row.funIsprocess || '0'
        t.formValidate.bsesdsRoute = row.funAction || ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
