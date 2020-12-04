<template>
  <div class="cover">
    <div class="box" :style="{width:['修改','新增','查看'].includes(logType) ? '900px' : '500px'}">
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
      <Form ref="formValidate" class="tab-box" :model="formValidate" :rules="ruleValidate" :label-width="100" :style="{height:['修改','新增','查看'].includes(logType) ? '370px' : ''}">
        <Row>
          <Col :span="['修改','新增','查看'].includes(logType) ? 14 : 24">
          <Row>
            <Col :span="['修改','新增','查看'].includes(logType) ? 24 : 22">
              <FormItem label="登录名" prop="loginName" >
                <Input v-model="formValidate.loginName" placeholder="登录名" :disabled="this.formValidate.status !=='01draft' || logType === '修改密码' ? true : false"></Input>
              </FormItem>
            </Col>
            </Row>
          <Row>
            <Col :span="['修改','新增','查看'].includes(logType) ? 24 : 22">
            <FormItem :label="$t('lang_user.rootuser.name')" prop="name" >
              <Input v-model="formValidate.name" :placeholder="$t('lang_user.rootuser.pname')":disabled="this.formValidate.status !=='01draft' || logType === '修改密码' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.idType')" prop="idType">
              <Select v-model="formValidate.idType"  :placeholder="$t('lang_user.rootuser.ppidType')" :disabled="this.formValidate.status !=='01draft' ? true : false">
                <Option :value="item.paramCode" v-for="(item,index) in idtypes" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <Col span="24" >
            <FormItem :label="$t('lang_user.rootuser.idNo')" prop="idNo" >
              <Input v-model="formValidate.idNo" @on-change="idNOChange" :placeholder="$t('lang_user.rootuser.pidNo')":disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <Col span="24">
            <FormItem :label="$t('lang_user.rootuser.birthDate')" prop="birthDate">
              <DatePicker type="date" :placeholder="$t('lang_user.rootuser.pbirthDate')" :editable="false" v-model="formValidate.birthDate" style="width: 100%"
                          :disabled="this.formValidate.status !=='01draft' ? true : false"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <Col span="24" >
            <FormItem :label="$t('lang_user.rootuser.genderDesc')" prop="gender">
              <Select v-model="formValidate.gender"  :placeholder="$t('lang_user.rootuser.pgender')" :disabled="this.formValidate.status !=='01draft' ? true : false">
                <Option :value="item.paramCode" v-for="(item,index) in selectSex" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
            <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
              <Col span="24">
                <FormItem label="手机号" prop="mobileNo" >
                  <Input v-model="formValidate.mobileNo" placeholder="手机号" :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
                </FormItem>
              </Col>
            </Row>
          <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <Col span="24">
            <FormItem  :label="$t('lang_user.rootuser.email')" prop="email" >
              <Input v-model="formValidate.email" :placeholder="$t('lang_user.rootuser.pemail')" :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
            </FormItem>
            </Col>
          </Row>
            <Row>
              <Col :span="['修改','新增','查看'].includes(logType) ? 24 : 22" v-if="logType === '修改密码' || logType === '新增'">
                <FormItem  label="输入新密码" prop="password" >
                  <Input v-model="formValidate.password" type="password" placeholder="请输入新密码" ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :span="['修改','新增','查看'].includes(logType) ? 24 : 22" v-if="logType === '修改密码' || logType === '新增'">
                <FormItem  label="确认新密码" prop="password1" >
                  <Input v-model="formValidate.password1" type="password" placeholder="请确认新密码"></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="6" offset="1" v-if="logType === '修改' || logType === '新增' || logType === '查看'">
            <div class="header-box">
              <div class="header-cover" v-if="this.formValidate.status !=='01draft' ? true : false">
                {{$t('lang_user.rootuser.pcropedImg')}}
              </div>
              <div class="header-cover" @click="render1"  v-else="this.formValidate.status !=='01draft' ? true : false">
                {{$t('lang_user.rootuser.pcropedImg')}}
              </div>
              <div class="header">
                <img :src="cropedImg=='' ? '../../../static/img/user_img.png':cropedImg" width="150" height="150">
              </div>
            </div>
          </Col>
        </Row>
        <Row v-if="logType === '修改' || logType === '新增' || logType === '查看'">
          <Col span="23">
          <FormItem  :label="$t('lang_user.rootuser.memo')" prop="memo">
            <Input v-model="formValidate.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_user.rootuser.pmemo')"
                   :disabled="this.formValidate.status !=='01draft' ? true : false"></Input>
          </FormItem>
          </Col>
        </Row>
        <!--<Row>-->
          <!--<Col span="23">-->
          <!--<Row type="flex" justify="end">-->
            <!--<FormItem>-->
            <!---->
            <!--</FormItem>-->
          <!--</Row>-->
          <!--</Col>-->
        <!--</Row>-->
      </Form>
      <div class="tab-btn">
        <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit" v-if="logType === '修改' || logType === '新增' || logType === '修改密码'">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import valid from '../../../lib/pub_valid'
  import imgEdit from '../../../components/imgUpdate/imgEdit'

  export default {
    data() {
      const idnocheck = (rule, value, caaaaa) => {
        if (this.formValidate.idType === '01id') {
          if (valid.val_IdCard(value)) {
            return caaaaa()
          }
          return caaaaa(new Error(rule.message))
        }
        return caaaaa()
      }
      const phonecheck = (rule, value, calphonecheck) => {
          if (valid.val_mobile(value)) {
            return calphonecheck()
          }
          return calphonecheck(new Error(rule.message))
      }
      const mailcheck = (rule, value, mailphonecheck) => {
          if (valid.val_mail2(value)) {
            return mailphonecheck()
          }
          return mailphonecheck(new Error(rule.message))
      }
      const isEnCn = (rule, value, encnCheck) => {
        if (valid.val_isEnCn(value)) {
          return encnCheck()
        }
        return encnCheck(new Error(rule.message))
      }
      return {
        spinShow:false,
        value: '',
        httpImg: '',
        cropedImg: '',
        selectSex: [],
        idtypes: [],
        selectState: [],
        updateImg: false,
        formValidate: {
          _mt:  this.$global.mt+'UserInfo.addOrModifyUser',
          funId: '1',
          mobileNo: '',
          loginName: '',
          name: '',
          email: '',
          idType: '',
          idNo: '',
          gender: '',
          status: '01draft',
          birthDate: '',
          memo: '',
          pictureDis: '',
          password: '',
          password1: '',
        },
        imgPack: {},
        ruleValidate: {
          mobileNo: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            // { validator: phonecheck, message: this.$t('lang_user.rootuser.cpmobileNo'), trigger: 'blur' },
          ],
          loginName: [
            { required: true, message: this.$t('lang_user.rootuser.pmobileNo'), trigger: 'blur' },
            { validator: isEnCn, message: '只能输入英文和数字', trigger: 'blur' },
          ],
          status: [
            { required: true, message: this.$t('lang_user.rootuser.cstatusDesc'), trigger: 'blur' },
          ],
          name: [
            { required: true, message: this.$t('lang_user.rootuser.pname'), trigger: 'blur' },
          ],
          idType: [
            { required: true, message: this.$t('lang_user.rootuser.ppidType'), trigger: 'blur' },
          ],
          birthDate: [
            { required: true, type: 'date', message: this.$t('lang_user.rootuser.pbirthDate'), trigger: 'change' },
//            { required: true, message: '请填写生日', trigger: 'blur' },
          ],
          idNo: [
            { required: true, message: this.$t('lang_user.rootuser.pidNo'), trigger: 'blur' },
            { validator: idnocheck, message: this.$t('lang_user.rootuser.cidNo'), trigger: 'change' },

          ],
          email: [
            { required: true, message: this.$t('lang_user.rootuser.pemail'), trigger: 'blur' },
            { validator: mailcheck, message: this.$t('lang_user.rootuser.cemail'), trigger: 'blur' },
          ],
          gender: [
            { required: true, message: this.$t('lang_user.rootuser.pgender'), trigger: 'blur' },
          ],
          password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
          ],
          password1: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {

    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
      getData(id) {
        const t = this
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'UserInfo.getuserbyid',
          id: id,
          purpose: '0',
        }).then((res) => {
          if (isSuccess(res, t)) {
            if (t.logType === '修改密码') {
              // t.formValidate.mobileNo = res.data.content[0].mobileNo
              t.formValidate.loginName = res.data.content[0].loginName
              t.formValidate.name = res.data.content[0].name
              t.formValidate.status = res.data.content[0].status
            } else {
              t.formValidate.mobileNo = res.data.content[0].mobileNo
              t.formValidate.name = res.data.content[0].name
              t.formValidate.email = res.data.content[0].email
              t.formValidate.idNo = res.data.content[0].idNo
              t.formValidate.idType = res.data.content[0].idType
              t.formValidate.gender = res.data.content[0].gender
              t.formValidate.status = res.data.content[0].status
              t.formValidate.loginName = res.data.content[0].loginName
              t.formValidate.birthDate = res.data.content[0].birthDate
              t.formValidate.memo = res.data.content[0].memo
              if (res.data.content[0].picture) {
                if(res.data.content[0].picture !=' '){
                  const a = res.data.content[0].pictureShrink.split(',')
                  t.cropedImg = t.httpImg + a[1]
                }else{
                  t.cropedImg=''
                }
              }else{
                t.cropedImg=''
              }
            }
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
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'gender,pubstatus,idtype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectSex = res.data.content[0].value[0].paramList
            t.selectState = res.data.content[0].value[1].paramList
            t.idtypes = res.data.content[0].value[2].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      render1() {
        const t = this
        this.$Modal.confirm({
          onOk: () => {
            t.imgPack.handlecrop1()
            // base64转图片的方法
            const arr = t.imgPack.option1.cropedImg.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            const obj = new Blob([u8arr], { type: mime })
            // base64转图片的方法
            const formData = new FormData()
            formData.append('upfile', obj, Date.parse(new Date()) + '.png')
            console.log(formData)
            uploadimage(formData).then((res) => {
              if (res) {
                for (const key in res.data) {
                  t.cropedImg = t.httpImg + res.data[key]
                  t.formValidate.pictureDis = key + ',' + res.data[key]
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              attrs: {
                id: 'imgEdit',
                ref: 'imgEdit',
              },
              on: {
                ok: (self) => {
                  t.imgPack = self
                },
              },

            })
          },
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.y.upd') || t.logType === '修改密码') {
          data.id = t.id
        }
        if (t.logType === '新增' || t.logType === '修改密码') {
          let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z!@#$%^&*.\d]{6,20}$/
          if (regx.test(t.formValidate.password)) {
            if (t.formValidate.password1 !== t.formValidate.password) {
              t.$Modal.warning({
                title: this.$t('reminder.remind'),
                content: '确认密码请输入正确',
              })
            } else {
//              for (const dat in data) {
//                if (data[dat] === '') {
//                  delete data[dat]
//                }
//              }
              delete data.password1
              data.password = md5(data.password)
              if (data.birthDate !== undefined) {
                data.birthDate = data.birthDate === '' ? '' : new Date(data.birthDate).format('yyyy-MM-dd')
              }
              if (t.logType === '修改密码') {
                delete data.mobileNo
                delete data.name
                delete data.loginName
                delete data.birthDate
                delete data.email
                delete data.gender
                delete data.idNo
                delete data.idType
                delete data.memo
                delete data.pictureDis
                delete data.status
              }
              console.log(data)
              this.$refs.formValidate.validate((valid1) => {
                if (valid1) {
                  getDataLevelUserLoginSenior(data).then((res) => {
                    if (isSuccess(res, t)) {
                      t.$emit('closeUp')
                      if (t.logType === this.$t('button.add')) {
                        t.$Modal.success({
                          title: this.$t('reminder.suc'),
                          content: this.$t('reminder.addsuccess'),
                        })
                        t.$refs.formValidate.resetFields()
                        t.$emit('getData', res.data.content[0])
                      } else if (t.logType === this.$t('button.y.upd')) {
                        t.$Modal.success({
                          title: this.$t('reminder.suc'),
                          content: this.$t('reminder.updsuccess'),
                        })
                        t.$emit('update', res.data.content[0])
                      } else {
                        t.$Modal.success({
                          title: this.$t('reminder.suc'),
                          content: this.$t('reminder.updsuccess'),
                        })
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
            }
          } else {
            t.$Modal.warning({
              title: this.$t('reminder.remind'),
              content: '密码必须包含数字和字母',
            })
          }
        } else {
//          for (const dat in data) {
//            if (data[dat] === '') {
//              delete data[dat]
//            }
//          }
          delete data.password1
          data.password = md5(data.password)
          if (data.birthDate !== undefined) {
            data.birthDate = data.birthDate === '' ? '' : new Date(data.birthDate).format('yyyy-MM-dd')
          }
          this.$refs.formValidate.validate((valid1) => {
            if (valid1) {
              getDataLevelUserLoginSenior(data).then((res) => {
                if (isSuccess(res, t)) {
                  t.$emit('closeUp')
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
                    t.$refs.formValidate.resetFields()
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
        }
      },
      handleReset() {
        this.$emit('closeUp')
        this.cropedImg = ''
        this.$refs.formValidate.resetFields()
      },
      idNOChange() {
        const t = this
        if (t.formValidate.idNo.includes('x')) {
          t.formValidate.idNo = t.formValidate.idNo.toUpperCase()
        }
        if (t.formValidate.idType === '01id' && valid.val_IdCard(t.formValidate.idNo)) {
          t.formValidate.birthDate = t.formValidate.idNo.slice(6, 14)
        }
      },
    },
    watch: {

    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";

  .cover /deep/.ivu-form-item {
    margin-top: 20px !important;
    margin-bottom: 0px;
  }
  .cover .box{
    padding:40px 20px 0px 20px 
  } 
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .tab-box{
    overflow-y: auto;
    /*height: 370px;*/
  }
  .header-cover{
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .tab-btn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
   margin: 20px 40px 20px 20px;
  }
</style>
