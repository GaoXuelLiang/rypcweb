<template>
  <div class="option-main">
     <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
 <div class="form_box"
             ref="scrollBox">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_root.getDefine.gvfMark')" prop="gvfMark">
            <Input v-model="formValidate.gvfMark" :placeholder="$t('lang_root.getDefine.p_gvfMark')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1" >
          <FormItem :label="$t('lang_root.getDefine.gvfName')" prop="gvfName">
            <Input v-model="formValidate.gvfName" :placeholder="$t('lang_root.getDefine.p_gvfName')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_root.getDefine.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_root.getDefine.p_comment')"></Input>
          </FormItem>
          </Col>
        </Row>
         <Button class="btncal" @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
        <Button class="btn" type="primary" style="margin-left: 8px" @click="handleSubmit">{{$t('button.sav')}}</Button>
      </Form>
      </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow:false,
        selectLayoutMode: [],
        formValidate: {
          _mt:  this.$global.mt+'PlatGetValDefine.addOrUpd',
          funId: '1',
          gvfMark: '',
          gvfName: '',
          comment: '',
        },
        ruleValidate: {
          gvfMark: [
            { required: true, message: this.$t('lang_root.getDefine.rule_gvfMark'), trigger: 'blur' },
          ],
          gvfName: [
            { required: true, message: this.$t('lang_root.getDefine.rule_gvfName'), trigger: 'blur' },
          ],
        },
      }
    },
    components: {
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    methods: {
        handleReset () {
            this.$emit('closeUp')
        },
      getdata() {
        const t = this
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatGetValDefine.getById',
          funId: 1000,
          id: t.$store.state.platGetValDefine.mainId,
          logType: '根据id获取数据',
        }).then((res) => {
          console.log(res)
          if (isSuccess(res, t)) {
            t.formValidate.gvfMark = res.data.content[0].gvfMark
            t.formValidate.gvfName = res.data.content[0].gvfName
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
        if (t.$store.state.platGetValDefine.mainId) {
          data.logType = '修改'
          data.id = t.$store.state.platGetValDefine.mainId
        } else {
          data.logType = '新增'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.comment === undefined) {
          data.comment = ''
        }
        console.log(data)
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.platGetValDefine.mainId) {
                  t.$store.commit('platGetValDefine/addNewArrayMainTable', res.data.content[0])
                  t.$store.commit('platGetValDefine/setMainId', res.data.content[0].id)
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$store.commit('platGetValDefine/updateArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      clear() {
        const t = this
        t.formValidate.gvfMark = ''
        t.formValidate.gvfName = ''
        t.formValidate.comment = ''
        t.$refs.formValidate.resetFields()
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .option-main{
    // position: relative;
    // height: 388px;
    .btn{
      position: absolute;
      bottom: 20px;
      right: 75px;
    }
    .btncal{
      position: absolute;
      bottom: 20px;
      right: 139px;
    }
  }
  @import "../../../sass/childTable.scss";
</style>

