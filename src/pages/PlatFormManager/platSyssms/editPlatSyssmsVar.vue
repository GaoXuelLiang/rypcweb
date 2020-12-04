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
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="135">
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_platdoc.platSyssmsVar.syssmsvarMark')" prop="syssmsvarMark">
              <Input v-model="form.syssmsvarMark" :placeholder="$t('lang_platdoc.platSyssmsVar.syssmsvarMarkDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_platdoc.platSyssmsVar.syssmsvarName')">
              <Input v-model="form.syssmsvarName" :placeholder="$t('lang_platdoc.platSyssmsVar.syssmsvarNameDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <FormItem :label="$t('lang_platdoc.platSyssmsVar.syssmsvarValdesc')" prop="syssmsvarValdesc">
              <Input v-model="form.syssmsvarValdesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssmsVar.syssmsvarValdescDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <FormItem :label="$t('lang_platdoc.platSyssmsVar.syssmsvarComment')" prop="syssmsvarComment">
              <Input v-model="form.syssmsvarComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssmsVar.syssmsvarCommentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" style="margin-left: 8px" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import validChenck from '../../../lib/pub_valid'

  export default {
    data() {
      return {
        spinShow: false,
        form: {
          syssmsvarMark: '',
          syssmsvarName: '',
          syssmsvarValdesc: '',
          syssmsvarComment: '',
        },
        rowId: '',
        ruleValidate: {
          syssmsvarMark: [
            { required: true, message: this.$t('lang_platdoc.platSyssmsVar.syssmsvarMarkDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      getdata(rowId) {
        const t = this;
        t.spinShow = true;
        const params = {
          _mt:  this.$global.mt+'PlatSyssmsVar.getById',
          id: rowId,
          funId: '1',
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.syssmsvarMark = res.data.content[0].syssmsvarMark
            t.form.syssmsvarName = res.data.content[0].syssmsvarName
            t.form.syssmsvarValdesc = res.data.content[0].syssmsvarValdesc
            t.form.syssmsvarComment = res.data.content[0].syssmsvarComment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt =  this.$global.mt+'PlatSyssmsVar.addOrUpd'
        params.funId = '1'
        params.logType = this.$t('button.add')
        params.syssmsvarSmsid = t.id
        if (t.rowId) {
          params.logType = this.$t('button.y.upd')
          params.id = t.rowId
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(params).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.rowId) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.close()
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
        t.rowId = ''
        t.form.syssmsvarMark = ''
        t.form.syssmsvarName = ''
        t.form.syssmsvarValdesc = ''
        t.form.syssmsvarComment = ''
        this.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
</style>
