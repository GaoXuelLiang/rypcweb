<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div style="padding-left: 25px;height: 300px;overflow-y: auto;margin-right: 10px;margin-bottom: 20px;">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <Row>
            <Col span="11">
              <FormItem label="格式编号" prop="baseDesfmtNo">
                <Input v-model="formValidate.baseDesfmtNo" placeholder="请输入格式编号" :disabled="logType == '查看'"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="1">
              <FormItem label="格式名称" prop="baseDesfmtName">
                <Input v-model="formValidate.baseDesfmtName"  placeholder="请输入格式名称" :disabled="logType == '查看'"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11" >
              <FormItem label="格式" prop="baseDesfmtFormat">
                <Select v-model="formValidate.baseDesfmtFormat" :disabled="logType == '查看'">
                  <Option :value="item.paramCode" :key="index" v-for="(item,index) in formLevel" @click.native="getOption(item)">{{item.paramInfoName}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="首" style="width:50%;display:inline-block"  prop="baseDesfmtFbit" v-if="formValidate.baseDesfmtFormat == '01fxbit' || formValidate.baseDesfmtFormat == '03fexbit' || formValidate.baseDesfmtFormat == '11&domain' ">
                <Select v-model="formValidate.baseDesfmtFbit" style="width:67%" :disabled="logType == '查看'">
                  <Option :value="item.paramCode" :key="index" v-for="(item,index) in list">{{item.paramInfoName}}</Option>
                </Select>
                <span style="margin-left:5px">位</span>
              </FormItem>
              <FormItem label="末"  style="width:49%;display:inline-block" prop="baseDesfmtEbit" v-if="formValidate.baseDesfmtFormat == '02exbit' || formValidate.baseDesfmtFormat == '03fexbit'">
                <Select v-model="formValidate.baseDesfmtEbit" style="width:67%" :disabled="logType == '查看'">
                  <Option :value="item.paramCode" :key="index" v-for="(item,index) in list">{{item.paramInfoName}}</Option>
                </Select>
                <span style="margin-left:5px">位</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="23">
               <FormItem label="备注" prop="comment" >
                 <Input v-model="formValidate.comment" :disabled="logType == '查看'" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请备注"></Input>
               </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="23">
            <Row type="flex" justify="end">
              <FormItem>
                <Button style="margin-left: 8px" v-show="logType != '查看'" @click="handleReset">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="handleSubmit" v-show="logType != '查看'">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import validChenck from '../../../lib/pub_valid'
  import { isSuccess, deepCopy } from '../../../lib/util'
  export default {
    data() {
      const syssmsNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number101(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        formValidate: {
          _mt:  this.$global.mt+'BaseDesensitisefmt.addOrUpd',
          baseDesfmtNo: '',
          baseDesfmtName: '',
          baseDesfmtFormat: '',
          baseDesfmtFbit: '',
          baseDesfmtEbit: '',
          comment: '',
        },
        ruleValidate: {
          baseDesfmtName: [
            { required: true, message: '请输入格式名称', trigger: 'blur' },
          ],
          baseDesfmtNo: [
            { required: true, message: '请输入格式编号', trigger: 'blur' },
            { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
          ],
          baseDesfmtFormat: [
            { required: true, message: '请选择格式', trigger: 'change' },
          ],
          baseDesfmtEbit: [
            { required: true, message: '请选择末X位', trigger: 'change' },
          ],
          baseDesfmtFbit: [
            { required: true, message: '请选择首X位', trigger: 'change' },
          ],

        },
        formLevel: [],
        list: [
          {
            paramInfoName: '1',
            paramCode: '1',
          },
          {
            paramInfoName: '2',
            paramCode: '2',
          },
          {
            paramInfoName: '3',
            paramCode: '3',
          }
        ],
        id: '',
      }
    },
    props: {
      logType: String,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      handleReset() {
        this.$emit('closeUpd')
        this.$refs.formValidate.resetFields()
      },
      getData(id) {
        const t = this
        t.id = id
        t.getOption()
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseDesensitisefmt.getById',
          id: id,
          logType: this.$t("button.y.upd"),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.baseDesfmtNo = res.data.content[0].baseDesfmtNo
            t.formValidate.baseDesfmtName = res.data.content[0].baseDesfmtName
            t.formValidate.baseDesfmtFormat = res.data.content[0].baseDesfmtFormat
            t.formValidate.baseDesfmtFbit = res.data.content[0].baseDesfmtFbit
            t.formValidate.baseDesfmtEbit = res.data.content[0].baseDesfmtEbit
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      formValidates() {
        this.$refs.formValidate.resetFields()
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            if (t.logType === '修改') {
              data.id = t.id
            }
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  this.$emit('addNewArray' ,res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  this.$emit('update' ,res.data.content[0])
                }
                t.handleReset()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
            })
          }
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'desenfmt',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formLevel = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getOption() {
        this.formValidate.baseDesfmtFbit = ''
        this.formValidate.baseDesfmtEbit = ''
      }
    },
  }
</script>
<style lang="scss" scoped>
  .cover{
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
	  background-color: rgba(0,0,0,.5);
	  -webkit-overflow-scrolling: touch;
	  outline: 0;
	  .box{
	    position:relative;
	    width: 900px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .form{
	      max-height: 800px;
	      overflow-y: auto;
	    }
	    .title{
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
	      .title-text{
	        font-weight: bold;
	        font-size: 14px;
	      }
	    }
      .content{
        max-height: 450px;
        height: 400px;
        overflow:auto;
      }
	  }
	}
</style>
