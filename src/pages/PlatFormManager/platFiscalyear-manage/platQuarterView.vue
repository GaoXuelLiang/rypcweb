<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Form :model="form" ref="form" label-position="right" :rules="ruleValidate" :label-width="100">
          <Row>
            <i-col span="11" >
              <FormItem :label="$t('lang_platform.PlatQuarter.fypdPeriod')"  prop="fyqtCode">
                <Input v-model="form.fyqtCode" disabled :placeholder="$t('lang_platform.PlatQuarter.fypdPeriodDis')" ></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="11">
              <FormItem :label="$t('lang_platform.PlatQuarter.fypdMark1')" prop="fyqtMark1">
                <Input v-model="form.fyqtMark1" :placeholder="$t('lang_platform.PlatQuarter.fypdMark1Dis')" ></Input>
              </FormItem>
            </i-col>
            <i-col span="11"  offset="1">
              <FormItem :label="$t('lang_platform.PlatQuarter.fypdMark2')" prop="fyqtMark2">
                <Input v-model="form.fyqtMark2" :placeholder="$t('lang_platform.PlatQuarter.fypdMark2Dis')" ></Input>
              </FormItem>
            </i-col>
          </Row>
          <!--<i-col span="11" offset="1">-->
            <!--<FormItem :label="$t('lang_platform.PlatQuarter.fypdMark3')" prop="fypdMark3">-->
              <!--<Input v-model="form.fypdMark3" :placeholder="$t('lang_platform.PlatQuarter.fypdMark3Dis')" ></Input>-->
            <!--</FormItem>-->
          <!--</i-col>-->
         <Row>
           <i-col span="11" >
             <FormItem :label="$t('lang_platform.PlatQuarter.fypdStartdate')" prop="fyqtStartdate">
               <DatePicker type="date" :placeholder="$t('lang_platform.PlatQuarter.fypdStartdateDis')" disabled  v-model="form.fyqtStartdate" style="width: 100%"></DatePicker>
             </FormItem>
           </i-col>
           <i-col span="11" offset="1">
             <FormItem :label="$t('lang_platform.PlatQuarter.fypdEnddate')" prop="fyqtEnddate">
               <DatePicker type="date" :placeholder="$t('lang_platform.PlatQuarter.fypdEnddateDis')" disabled v-model="form.fyqtEnddate" style="width: 100%"></DatePicker>
             </FormItem>
           </i-col>
         </Row>
          <i-col span="23">
            <FormItem :label="$t('lang_platform.PlatQuarter.comment')" prop="comment">
              <Input v-model="form.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.PlatQuarter.commentDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="23">
            <row type="flex" justify="end">
              <FormItem label="" prop="comment">
                <Button @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" :loading="isSpin" @click="save">{{$t('button.sav')}}</Button>
              </FormItem>
            </row>
          </i-col>
        </Form>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        form: {
          fyqtYear: '',
          fyqtCode: '',
          fyqtMark1: '',
          fyqtMark2: '',
          fyqtStartdate: '',
          fyqtEnddate: '',
          comment: '',
        },
        ruleValidate: {
          fyqtCode: [
            { required: true, message: this.$t('lang_platform.PlatQuarter.fypdPeriodDis'), trigger: 'blur' },
          ],
          fyqtStartdate: [
            { required: true, type: 'date', message: this.$t('lang_platform.PlatQuarter.fypdStartdateDis'), trigger: 'change' },
          ],
          fyqtEnddate: [
            { required: true, type: 'date', message: this.$t('lang_platform.PlatQuarter.fypdEnddateDis'), trigger: 'change' },
          ],
        },
        rowId: '',
      }
    },
    props: {
      id: Number,
      logType: String,
    },
    mounted() {
    },
    methods: {
      setRowId(id) {
        const t = this
        t.rowId = id
        t.getdata(id)
      },
      setIdname(idname) {
        const t = this
//        t.form.cptcOptionDis = idname
      },
      getdata(rowId) {
        const t = this
        const params = {
          _mt:  this.$global.mt+'PlatFyquarter.getById',
          id: rowId,
          logType: '查询List信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.form.fyqtCode = res.data.content[0].fyqtCode
            t.form.fyqtMark1 = res.data.content[0].fyqtMark1
            t.form.fyqtMark2 = res.data.content[0].fyqtMark2
            t.form.fyqtStartdate = res.data.content[0].fyqtStartdate
            t.form.fyqtEnddate = res.data.content[0].fyqtEnddate
            t.form.comment = res.data.content[0].comment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt =  this.$global.mt+'PlatFyquarter.addOrUpd'
        params.logType = this.$t('button.add')
        params.fyqtYear = t.$store.state.platFis.childId1
        if (t.logType === this.$t('button.y.upd')) {
          params.id = t.id
        }
        for (const dat in params) {
          if (t.rowId) {
            params.logType = this.$t('button.y.upd')
            params.id = t.rowId
          }
        }
        if (params.fyqtStartdate !== undefined) {
          params.fyqtStartdate = new Date(params.fyqtStartdate).format('yyyy-MM-dd')
        }
        if (params.fyqtEnddate !== undefined) {
          params.fyqtEnddate = new Date(params.fyqtEnddate).format('yyyy-MM-dd')
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginNew(params).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                t.close()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.form.resetFields()
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
              t.isSpin = false
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
        t.rowId = null
        t.form.fyqtCode = ''
        t.form.fyqtMark1 = ''
        t.form.fyqtMark2 = ''
        t.form.fyqtStartdate = ''
        t.form.fyqtEnddate = ''
        t.form.comment = ''
        t.$refs.form.resetFields()
      },
      close() {
        this.$emit('hideMsg')
        this.$refs.form.resetFields()
        this.clear()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
