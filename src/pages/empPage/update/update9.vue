<template>
  <div class="cover">
    <div class="box">
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
            <FormItem label="手机号码" prop='empctaMobile'>
              <Input v-model="upFormData.empctaMobile"  placeholder="请输入手机号码"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="联系电话（固定）" prop='empctaPhone'>
              <Input v-model="upFormData.empctaPhone" placeholder="请输入联系电话（固定）"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="个人邮箱" prop='empctaPersmail'>
              <Input v-model="upFormData.empctaPersmail"  placeholder="请输入个人邮箱"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="公司邮箱" prop='empctaCompmail'>
              <Input v-model="upFormData.empctaCompmail" placeholder="请输入公司邮箱"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="QQ" prop='empctaQq'>
              <Input v-model="upFormData.empctaQq"  placeholder="请输入QQ"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="微信号" prop='empctaWechat'>
              <Input v-model="upFormData.empctaWechat" placeholder="请输入微信号"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="紧急联系人" prop='empctaEmergcontact'>
              <Input v-model="upFormData.empctaEmergcontact"  placeholder="请输入紧急联系人"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="紧急联系人关系" prop="empctaEmcrelation">
              <Select v-model="upFormData.empctaEmcrelation" >
                <Option :value="item.paramCode" :key="index" v-for="(item,index) in select">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="紧急联系电话" prop='empctaEmcphone'>
              <Input v-model="upFormData.empctaEmcphone"  placeholder="请输入紧急联系电话"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="紧急联系地址" prop='empctaEmcaddr'>
              <Input v-model="upFormData.empctaEmcaddr"  placeholder="请输入紧急联系地址"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="备注" prop="empctaComment">
              <Input v-model="upFormData.empctaComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" ></Input>
            </FormItem>
          </i-col>
        </Row>

        <Row>
          <i-col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
          </i-col>
        </Row>
      </Form>
    </div>
    <!-- 弹出搜索 -->
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
        showModal: false, // 弹出搜索
        modiaContent: '', // 弹出搜索
        dataParame: {}, // 弹出搜索
        type: '', // 弹出搜索
        isSpin: false,
        selectYesNo: [],
        select: [],
        id: '',
        upFormData: {
          empctaMobile: '',
          empctaPhone: '',
          empctaPersmail: '',
          empctaCompmail: '',
          empctaQq: '',
          empctaWechat: '',
          empctaEmergcontact: '',
          empctaEmcrelation: '',
          empctaEmcphone: '',
          empctaEmcaddr: '',
          empctaComment: '',
        },
        ruleValidate: {
          empctaMobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
          ],
          empctaCompmail: [
            {required: true, message: '请输入公司邮箱', trigger: 'blur'},
          ],
          empctaEmergcontact: [
            {required: true, message: '请输入紧急联系人', trigger: 'blur'},
          ],
          empctaEmcphone: [
            {required: true, message: '请输入紧急联系电话', trigger: 'blur'},
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
      getData(item) {
        console.log(444444, item)
        this.upFormData = item
      },
//      getData(id) {
//        const t = this
//        if (id) {
//          t.id = id
//          getDataLevelUserLogin({
//            _mt:  this.$global.mt+'AttendShift.getById',
//            logType: '查询单条数据',
//            id: id,
//          }).then((res) => {
//            if (isSuccess(res, t)) {
//              t.upFormData = res.data.content[0];
////              t.upFormData.id = res.data.content[0].id;
//              t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
//            }
//          }).catch(() => {
//            this.$Modal.error({
//              title: this.$t('reminder.err'),
//              content: this.$t('reminder.errormessage'),
//            })
//          })
//        }
//      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'relationship',
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
        data._mt =  this.$global.mt+'EmpContact.addOrUpd'
        data.logType = t.logType
        data.empctaEmpid = localStorage.getItem('empId')
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
            t.isSpin = true
            if(data.createBy) delete data.createBy
            if(data.createTime) delete data.createTime
            if(data.deleteFlag) delete data.deleteFlag
            if(data.updateBy) delete data.updateBy
            if(data.updateTime) delete data.updateTime
            if (t.logType === '修改') {
//              data.id = t.id
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
//                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
//                  t.$emit('update', res.data.content[0])
                }
                t.$emit('refresh', '9')
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
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
              tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
//              t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项(具体滚动高度根据页面情况调整)
            })
          }
        })
      },
      /*
     *  弹出选择
     */
      opencompetType(type) {
        const t = this
        t.modiaContent = 'training-needs-company'
        t.type = type
        switch (type) {
          case 'tempSet' :
            t.dataParame = {
              tempSdate: 'all',
              // tempSdate: '01edit',
            }
            t.modiaContent = 'talent-pub-temp'
            break
        }
        t.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      changeinput1(row) {
        const t = this
        switch (t.type) {
          case 'tempSet' :
            t.setData(t.type, t.type + 'Dis', row.id, row.tempName, row)
            break
        }
      },
      setData(type, typeDis, NewId, name, row) {
        this[type] = NewId
        this[typeDis] = name
        this.temModul = row
        this.getCol()
        this.getData()
      },
      clearTempSet() {
        this.tempSet = ''
        this.tempSetDis = ''
        this.tempName = ''
        this.tableselected = []
        this.temCol = []
        this.columns = []
        this.expDataTital = []
        this.data = []
        this.total = 0
      },
      // 关闭弹窗
      handleReset() {
        const t = this
//        t.upFormData.attShifIslate = '0';
//        t.upFormData.attShifIsearly = '0';
        t.upFormData = {
          empctaMobile: '',
          empctaPhone: '',
          empctaPersmail: '',
          empctaCompmail: '',
          empctaQq: '',
          empctaWechat: '',
          empctaEmergcontact: '',
          empctaEmcrelation: '',
          empctaEmcphone: '',
          empctaEmcaddr: '',
          empctaComment: '',
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
</style>
