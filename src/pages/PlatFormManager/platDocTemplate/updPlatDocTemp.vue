<template>
  <div class="option-main">
        <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
        <div class="form_box"
             ref="scrollBox">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="120">
          <Row>
            <i-col span="10">
              <FormItem :label="$t('lang_platdoc.platDoc.platDctpCode')" prop="platDctpCode">
                <Input v-model="formValidate.platDctpCode" :placeholder="$t('lang_platdoc.platDoc.p_platDctpCode')"></Input>
              </FormItem>
            </i-col>
            <i-col span="10" offset="1">
              <FormItem :label="$t('lang_platdoc.platDoc.platDctpName')" prop="platDctpName">
                <Input v-model="formValidate.platDctpName" :placeholder="$t('lang_platdoc.platDoc.p_platDctpName')"></Input>
              </FormItem>
            </i-col>
          </Row>
          <i-col span="21">
           <FormItem :label="$t('lang_platdoc.platDoc.platDctpAffix')" prop="platDctpAffix" class="formItem">
             <Row>
               <i-col span="6">
               <Upload :before-upload="handleUpload" action=" ">
                 <!-- <Button icon="ios-cloud-upload-outline">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button> -->
                  <span class="uploadBtn"> 
                    <Icon type="md-cloud-upload" size="24"/>
                    <span>点击选择文件</span> 
                  </span>
               </Upload>
               </i-col>
               <i-col span="18">
                <span v-if="file !== '' && file.name !== '0' " class="file"> 
                  <i-col span="20">
                    	<!-- <Input v-model="file.name" readonly="readonly" >
                        <span slot="prepend">
                          <Icon type="ios-folder" size="16"></Icon>
                        </span>
                      </Input> -->
                    <div class="upFile">
                      <img class="fileImg" src="../../../../static/fileImg/fileImg.png" alt="">
                      <span class="fileName">{{$t('lang_role.imp.up2')}} {{ file.name}}</span>
                    </div>
                  </i-col>
                  <i-col span="4">
                    <Button type="text"  @click="uploadLocalFile" v-if="loadingStatus">
                      {{$t('lang_platdoc.platDoc.plat_upload')}}
                    </Button>
                    <Button type="text"  @click="downloadFile" v-if="!loadingStatus">
                      {{$t('lang_platdoc.platDoc.plat_download')}}
                    </Button>
                  </i-col>
                </span>
               </i-col>
             </Row>
           </FormItem>
          </i-col>
          <i-col span="10">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpValidDis')"  prop="platDctpValid">
              <RadioGroup  v-model="formValidate.platDctpValid" type="button" size="small">
                <Radio :label="item.paramCode" v-for="(item,index) in yesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="21">
            <FormItem :label="$t('lang_platdoc.platDoc.platDctpComment')" prop="platDctpComment">
              <Input v-model="formValidate.platDctpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platDoc.platDctpComment')"></Input>
            </FormItem>
          </i-col>
        </Form>
        <Row>
          <i-col span="21"
                class="btn">
                  <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                  <Button type="primary" @click="save" style="margin-left: 10px">{{$t('button.sav')}}</Button>
          </i-col>
        </Row>
      </div>
      <!-- <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button> -->
    </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow: false,
        id: '',
        file: '',
        filekey: '',
        loadingStatus: false,
        yesOrNo: [],
        formValidate: {
          _mt:  this.$global.mt+'PlatDocTemplate.addOrUpd',
          platDctpCode: '',
          platDctpName: '',
          platDctpAffix: '',
          platDctpValid: '1',
          platDctpComment: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          platDctpCode: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpCode'), trigger: 'blur' },
          ],
          platDctpName: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpName'), trigger: 'blur' },
          ],
          platDctpValid: [
            { required: true, message: this.$t('lang_platdoc.platDoc.rule_platDctpValidDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
    },
    components: {
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getdata() {
        const t = this;
        t.spinShow = true;
        if (!t.$store.state.docTemp.mainId) {
          return
        }
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatDocTemplate.getById',
          id: t.$store.state.docTemp.mainId,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.platDctpCode = res.data.content[0].platDctpCode
            t.formValidate.platDctpName = res.data.content[0].platDctpName
            t.formValidate.platDctpValid = res.data.content[0].platDctpValid
            t.formValidate.platDctpComment = res.data.content[0].platDctpComment
            t.platDctpValidDis = res.data.content[0].platDctpValidDis
            if (res.data.content[0].platDctpAffix) {
              t.file = { name: res.data.content[0].platDctpAffix.split(':')[0] }
              t.filekey = res.data.content[0].platDctpAffix.split(':')[1]
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset () {
        this.$emit('closeModel');
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        if (t.$store.state.docTemp.mainId) {
          data.id = t.$store.state.docTemp.mainId
          data.logType = '修改'
        } else {
          data.logType = '新增'
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.docTemp.mainId) {
                  t.$store.commit('docTemp/setMainId', res.data.content[0].id)
                  t.$store.commit('docTemp/addNewArrayMainTable', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('docTemp/updateArrayMainTable', res.data.content[0])
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
      handleUpload(file) {
        this.file = file
        this.loadingStatus = true
        return false
      },
      uploadLocalFile() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', t.file)
        console.log(formData)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            t.file =  { name: key }
            t.filekey = res.data[key]
            t.formValidate.platDctpAffix = key + ':' + res.data[key]
          }
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '上传成功',
              onOk: () => {
              	t.loadingStatus = false
              },
            })
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      downloadFile() {
    		const t = this
    		let data = {
          _mt:  this.$global.mt+'UserInfo.getfiletoken',
          isprivate: true,
          logType: '导出',
          filekey: t.filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
      clear() {
        const t = this
        t.formValidate.platDctpCode = ''
        t.formValidate.platDctpName = ''
        t.formValidate.platDctpValid = ''
        t.formValidate.platDctpComment = ''
        t.platDctpValidDis = ''
        t.file = ''
        t.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/mainChildUpdate.scss";
  @import "../../../sass/upload.scss";
  /deep/ .ivu-radio-wrapper-checked{
    background: rgba(45, 140, 240, 1);
    color:#fff;
  }
  /deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover{
    color:#fff;
    border-color:none;
  }
</style>
