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
      <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
        <Row>
          <i-col span="10" offset="1">
            <FormItem label="ID"> <!--  prop='attShifCode' -->
              <Input v-model="upFormData.id" disabled  placeholder="ID"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="时间" prop='attShifName'>
              <Input v-model="upFormData.createTime" :disabled="logType ==='查看'" placeholder="时间"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10" offset="1">
            <FormItem label="接口类型"> <!--  prop='attShifCode' -->
              <Input v-model="upFormData.oalogInttype" disabled  placeholder="接口类型"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="请求类型" prop='attShifName'>
              <Input v-model="upFormData.oalogType" :disabled="logType ==='查看'" placeholder="请求类型"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" offset="1">
            <FormItem label="请求URL"> <!--  prop='attShifCode' -->
              <Input v-model="upFormData.oalogUrl" disabled  placeholder="请求URL"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" offset="1">
            <FormItem label="请求数据" prop="interviewertPscope">
              <Input v-model="upFormData.oalogReqbody" type="textarea" :autosize="{minRows: 2,maxRows: 30}" placeholder="请求数据" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" offset="1">
            <FormItem label="返回信息" prop="interviewertPscope">
              <Input v-model="upFormData.oalogResponse" type="textarea" :autosize="{minRows: 2,maxRows: 30}" placeholder="返回信息" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" offset="1">
            <FormItem label="备注" prop="interviewertPscope">
              <Input v-model="upFormData.comment" type="textarea" :disabled="logType ==='查看'" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <!-- <Row v-show="logType !=='查看'"> -->
      </Form>
        <Row class="btns">
          <i-col span="21">
            <Row type="flex" justify="end">
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            </Row>
          </i-col>
        </Row>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginData} from '../../../axios/axios'
  import validChenck from '../../../lib/pub_valid'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      const syssmsNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number101(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        spinShow: false,
        selectYesNo: [],
        id: '',
        upFormData: {
//          id: '',
//          attShifCode: '',
//          attShifName: '',
//          attShifSworktime: '',
//          attShifEworktime: '',
//          attShifUpstime: '',
//          attShifDownetime: '',
//          attShifIslate: '0',
//          attShifIsearly: '0',
//          attShifOutchktime: '', // 允许迟到时间
          comment: '',
        },
        ruleValidate: {
//          attShifCode: [
//            {required: true, message: '请输入班次编号', trigger: 'blur'},
//          ],
//          attShifName: [
//            {required: true, message: '请输入班次名称', trigger: 'blur'},
//          ],
//          attShifSworktime: [
//            {required: true, message: '请选择上班时间', trigger: 'blur'},
//          ],
//          attShifEworktime: [
//            {required: true, message: '请选择下班时间', trigger: 'blur'},
//          ],
//          attShifUpstime: [
//            {required: true, message: '请输入上班上限', trigger: 'blur'},
//            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
//          ],
//          attShifDownetime: [
//            {required: true, message: '请输入下班下限', trigger: 'blur'},
//            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
//          ],
//          attShifOutchktime: [
//            {required: true, message: '请选择下班卡开始时间', trigger: 'blur'},
//          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {},
    mounted() {
//      this.getSelect();
    },
    methods: {
//      getCode() {
//        const t = this
//        getDataLevelUserLogin({
//          _mt: 'BaseOalog.getCode',
//          logType: '获取编号',
//        }).then((res) => {
//          if (isSuccess(res, t)) {
//            t.upFormData.attShifCode = res.data.content[0].value;
//          }
//        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
//        })
//      },
      getData(id) {
        const t = this;
        t.spinShow = true;
        if (id) {
          t.id = id
          getDataLevelUserLoginData({
            _mt: 'BaseOalog.getById',
            APlogType: '查询单条数据',
            APid: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.upFormData = res.data.content[0];
//              t.upFormData.id = res.data.content[0].id;
//              t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          }).finally(()=>{
          t.spinShow = false;
        })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          APtypeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesNo = res.data.content[0].value[0].paramList
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
        const data = deepCopy(t.upFormData)
        data._mt =  this.$global.mt+'AttendShift.addOrUpd'
        data.APlogType = t.logType
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.upFormData.validate((valid) => {
          t.$nextTick(() => {
            let tt = document.querySelectorAll('.ivu-form-item-error')
            tt[0].querySelector('.ivu-input').focus()
          })
          if (valid) {
            if (t.logType === '修改') {
              data.APid = t.id
            } else {
              if(data.id) delete data.id
              if(data.createTime) delete data.createTime
              if(data.attShifIslateDis) delete data.attShifIslateDis
              if(data.attShifIsearlyDis) delete data.attShifIsearlyDis
              if(data.deleteFlag) delete data.deleteFlag
            }
            getDataLevelUserLoginData(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.upFormData.resetFields()
                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
                t.handleReset()
              }
            }).catch(() => {
//              t.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
            })
          } else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
//              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
//        t.upFormData.attShifIslate = '0';
//        t.upFormData.attShifIsearly = '0';
        t.upFormData = {}
        this.$refs.upFormData.resetFields()
        this.$emit('closeUpd')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .cover {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
      position: relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .form {
        max-height: 600px;
        overflow-y: auto;
      }
      .title {
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text {
          font-weight: bold;
          font-size: 14px;
        }
      }
      .content {
        max-height: 400px;
        overflow: auto;
      }
    }
  }
  @import "../../../sass/updateAndAdd.scss";
  .btns{
    margin: 20px 0;
  }
</style>
