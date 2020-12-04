<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
        <Row>
          <i-col span="10">
            <FormItem label="项目编号" prop='attBsitNo'>
              <Input v-model="upFormData.attBsitNo" placeholder="请输入项目编号"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="项目名称" prop='attBsitName'>
              <Input v-model="upFormData.attBsitName" placeholder="请输入项目名称"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="项目说明" prop="attBsitDesc">
              <Input v-model="upFormData.attBsitDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入项目说明" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="单位" prop="attBsitUnit">
              <Select v-model="upFormData.attBsitUnit" clearable>
                <Option :value="item.paramCode" :key="index" v-for="(item,index) in select">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="备注" prop="attBsitComment">
              <Input v-model="upFormData.attBsitComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" :loading="isSpin" style="margin-left: 8px" @click="handleSubmit">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
          </i-col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
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
        spinShow:false,
        isSpin: false,
        select: [],
        id: '',
        upFormData: {
          attBsitNo: '',
          attBsitName: '',
          attBsitDesc: '',
          attBsitUnit: '',
          attBsitComment: '',
        },
        ruleValidate: {
          attBsitNo: [
            {required: true, message: '请输入项目编号', trigger: 'blur'},
          ],
          attBsitName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          attBsitUnit: [
            {required: true, message: '请选择单位', trigger: 'change'},
          ],
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
//          _mt: 'attendBaseitem.getCode',
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
        const t = this
        t.spinShow = true
        if (id) {
          t.id = id
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'AttendBaseitem.getById',
            logType: '查询单条数据',
            id: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.upFormData = res.data.content[0];
              t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          }).finally(()=>{
            t.spinShow = false
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'timeunit',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.select = res.data.content[0].value[0].paramList
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
        data._mt =  this.$global.mt+'AttendBaseitem.addOrUpd'
        data.logType = t.logType
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.upFormData.validate((valid) => {
//          t.$nextTick(() => {
//            let tt = document.querySelectorAll('.ivu-form-item-error')
//            tt[0].querySelector('.ivu-input').focus()
//          })
          if (valid) {
            t.isSpin = true
            if (t.logType === '修改') {
              data.id = t.id
            } else {
              if(data.id) delete data.id
              if(data.createTime) delete data.createTime
              if(data.attShifIslateDis) delete data.attShifIslateDis
              if(data.attShifIsearlyDis) delete data.attShifIsearlyDis
              if(data.deleteFlag) delete data.deleteFlag
            }
            getDataLevelUserLoginNew(data).then((res) => {
              t.isSpin = false
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
              t.isSpin = false
//              t.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
            })
          } else {
//            t.$nextTick(() => {
//              let tt = document.querySelectorAll('.ivu-form-item-error')
//              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
////              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
//            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
        t.upFormData = {
          attBsitNo: '',
          attBsitName: '',
          attBsitDesc: '',
          attBsitUnit: '',
          attBsitComment: '',
        }
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
        max-height: 800px;
        /*overflow-y: auto;*/
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
        /*overflow: auto;*/
      }
    }
  }
</style>
