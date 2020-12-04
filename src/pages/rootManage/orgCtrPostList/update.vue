<template>
  <div class="cover">
    <div class="box">
       <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
            <div ref="scrollBox" style="max-height: 420px;overflow-y: auto;">
              <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="135">
                <Row>
                  <Col span="10" offset="1">
                  <FormItem label="岗位代码" prop="postbsCode">
                    <Input v-model="formValidate.postbsCode" placeholder="请输入岗位代码"></Input>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem label="岗位名称" prop="postbsName">
                    <Input v-model="formValidate.postbsName" placeholder="请输入岗位名称"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" offset="1">
                  <FormItem label="岗位类别" prop="postbsType">
                    <Select v-model="formValidate.postbsType">
                      <Option :value="item.paramCode" v-for="(item,index) in benchposttype" :key="index">
                        {{item.paramInfoName}}
                      </Option>
                    </Select>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                    <FormItem label="条线" prop="postbsSeqDis">
                      <span @dblclick="clearData()">
                          <Input v-model="formValidate.postbsSeqDis" placeholder="请选择条线"  @on-click="selectOpen()"></Input>
                      </span>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" offset="1">
                  <FormItem label="排序号" prop="postbsOrder" class="last-item">
                    <Input v-model="formValidate.postbsOrder" placeholder="请输入排序号"></Input>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                    <FormItem label="岗位状态" prop="postbsStatus" class="last-item">
                      <Select v-model="formValidate.postbsStatus">
                        <Option :value="item.paramCode" v-for="(item,index) in benchpoststatus" :key="index">{{item.paramInfoName}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </Row>
        </div>
        <Row class="row">
          <i-col span="22" style="text-align:right;">
              <Button @click="handleReset" style="margin-right: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
          </i-col>
        </Row>
    </div>
    <autoSearchtable
      v-if="showModal"
      @closeUp="closeModal"
      :modiaContent=modiaContent
      :dataParame=dataParame
      dataType="row"
      @changeinput="changeinput1"
      urlType="loginNew">
    </autoSearchtable>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import validChenck from '../../../lib/pub_valid'

  export default {
    data() {
      const syssmsNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number101(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        isSpin: false,
        showModal: false,
        modiaContent: 'org-Postseq-std',
        dataParame: {},
        benchposttype: [],
        benchpoststatus: [],
        id: Number,
        formValidate: {
          _mt:  this.$global.mt+'OrgBenchmarkpost.addOrUpd',
          funId: '修改',
          postbsCode: this.postbsCode,
          postbsName: '',
          postbsType: '',
          postbsStatus: '1',
          postbsSeq: '',
          postbsOrder: '',
          postbsSeqDis: '',
        },
        ruleValidate: {
          postbsCode: [
            {required: true, message: '请输入岗位代码', trigger: 'blur'},
          ],
          postbsName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          postbsType: [
            {required: true, message: '请选择岗位类别', trigger: 'change'},
          ],
          postbsStatus: [
            {required: true, message: '请选择状态', trigger: 'change'},
          ],
          postbsSeqDis: [
            {required: true, message: '请选择条线', trigger: 'change'},
          ],
          postbsOrder: [
            {required: true, message: '请输入排序号', trigger: 'blur'},
            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
          ],
        },
        spinShow:false
      }
    },
    props: {
      logType: String,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        t.spinShow = true
        if (id) {
          t.id = id
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'OrgBenchmarkpost.getById',
            logType: this.$t('button.y.upd'),
            id: id,
          })
            .then(res => {
              if (isSuccess(res, t)) {
                t.formValidate.postbsCode = res.data.content[0].postbsCode
                t.formValidate.postbsName = res.data.content[0].postbsName
                t.formValidate.postbsType = res.data.content[0].postbsType
                t.formValidate.postbsStatus = res.data.content[0].postbsStatus
                t.formValidate.postbsSeqDis = res.data.content[0].postbsSeqDis
                t.formValidate.postbsOrder = res.data.content[0].postbsOrder
                t.formValidate.postbsSeq = res.data.content[0].postbsSeq
              }
            })
            .catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            }).finally(()=>{
              t.spinShow = false
            })
        }
      },
      // 获取下拉状态
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'benchposttype,benchpoststatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0].value[1].paramList)
            t.benchposttype = res.data.content[0].value[0].paramList
            t.benchpoststatus = res.data.content[0].value[1].paramList

            t.benchpoststatus.unshift(
              {
                postbsStatus: '1',
                paramInfoCn: '启用',
              },
            )
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
        this.$refs.formValidate.validate(valid => {
          if (valid) {
            t.isSpin = true
            if (t.logType === '修改') {
              data.id = t.id
            } else {
              delete data.id
            }
            console.log(data)
            getDataLevelUserLoginNew(data)
              .then(res => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                  t.$emit('closeUpd')
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
              })
              .catch(() => {
                t.isSpin = false
                this.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
          } else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
      handleReset() {
        this.$emit('closeUpd')
        this.$refs.formValidate.resetFields()
      },
      /*
      * 弹出选择
      * */
      selectOpen() {
        const t = this
        t.showModal = true
      },
      clearData() {
        const t = this
        t.formValidate.postbsSeqDis = ''
        t.formValidate.postbsSeq = ''
      },
      closeModal() {
        const t = this
        t.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        t.formValidate.postbsSeqDis = row.seqName
        t.formValidate.postbsSeq = row.id
      },
    },
  }
</script>
<style lang="scss" scoped>
   @import "../../../sass/updateAndAdd";
   .option-main {
    position: relative;
    }
    .last-item{
        margin-bottom: 0 !important;
    }
    .row{
        margin: 20px 0;
    }
</style>
