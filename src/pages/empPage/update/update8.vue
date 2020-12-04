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
            <FormItem label="开始时间" prop="empweSdate">
              <DatePicker type="datetime" format="yyyy-MM-dd" clearable placeholder="请选择开始时间" :editable="false" v-model="upFormData.empweSdate" style="width: 223px"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="结束时间" prop="empweEdate">
              <DatePicker type="datetime" format="yyyy-MM-dd" clearable placeholder="请选择结束时间" :editable="false" v-model="upFormData.empweEdate" style="width: 223px"></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="工作单位" prop='empweComp'>
              <Input v-model="upFormData.empweComp"  placeholder="请输入工作单位"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="工作部门" prop='empweDept'>
              <Input v-model="upFormData.empweDept"  placeholder="请输入工作部门"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="工作职务/岗位" prop='empwePost'>
              <Input v-model="upFormData.empwePost"  placeholder="请输入工作职务/岗位"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="工作地点" prop='empweWorklocation'>
              <Input v-model="upFormData.empweWorklocation"  placeholder="请输入工作地点"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="主要职责" prop='empweJobduties'>
              <Input v-model="upFormData.empweJobduties"  placeholder="请输入主要职责"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="主要业绩/成果" prop="empwePerformance">
              <Input v-model="upFormData.empwePerformance" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入主要业绩/成果" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="证明人" prop='empweContact'>
              <Input v-model="upFormData.empweContact"  placeholder="请输入证明人"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="联系电话" prop='empwePhone'>
              <Input v-model="upFormData.empwePhone"  placeholder="请输入联系电话"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="薪资" prop='empweSalary'>
              <Input v-model="upFormData.empweSalary"  placeholder="请输入薪资"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="离职原因" prop="empweLeavereason">
              <Input v-model="upFormData.empweLeavereason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="离职原因" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="备注" prop="empweComment">
              <Input v-model="upFormData.empweComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" ></Input>
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
    <!--<autoSearchtable-->
      <!--v-if="showModal"-->
      <!--@closeUp="closeModal"-->
      <!--:modiaContent=modiaContent-->
      <!--@changeinput="changeinput1"-->
      <!--:dataParame="dataParame"-->
      <!--dataType='row'-->
      <!--urlType="loginNew">-->
    <!--</autoSearchtable>-->
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
        select1: [],
        select2: [],
        select3: [],
        select4: [],
        cityList: [],
        id: '',
        upFormData: {
          empweSdate: '',
          empweEdate: '',
          empweComp: '',
          empweDept: '',
          empwePost: '',
          empweWorklocation: '',
          empweJobduties: '',
          empwePerformance: '',
          empweContact: '',
          empwePhone: '',
          empweSalary: '',
          empweLeavereason: '',
          empweComment: '',
        },
        ruleValidate: {
          empweSdate: [
            {required: true, type: 'date', message: '请选择开始时间', trigger: 'change'},
          ],
          empweEdate: [
            {required: true, type: 'date', message: '请选择结束时间', trigger: 'change'},
          ],
          empweComp: [
            {required: true, message: '请输入工作单位', trigger: 'blur'},
          ],
          empwePost: [
            {required: true, message: '请输入工作职务/岗位', trigger: 'blur'},
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
//      getData(item) {
//        console.log(444444, item)
//        this.upFormData = item
//      },
      getData(id) {
        const t = this
        if (id) {
          t.id = id
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'EmpWorkExp.getById',
            logType: '查询单条数据',
            id: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.upFormData = res.data.content[0]
//              t.upFormData.rinterviewerPno = res.data.content[0].rinterviewerPno
            }
          }).catch(() => {
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno,education,degreelevel,schooltype,learnstyle',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectYesNo = res.data.content[0].value[0].paramList
            t.select1 = res.data.content[0].value[1].paramList
            t.select2 = res.data.content[0].value[2].paramList
            t.select3 = res.data.content[0].value[3].paramList
            t.select4 = res.data.content[0].value[4].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getCountry() {
        const t = this
        t.isSpin = true
        const data = {
          _mt:  this.$global.mt+'BaseCountry.getSelectValue',
          logType: t.$t('button.ser'),
        }
        t.cityList = []
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.cityList = res.data.content[0].value
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.upFormData)
        data._mt =  this.$global.mt+'EmpWorkExp.addOrUpd'
        data.logType = t.logType
        data.empweEmpid = localStorage.getItem('empId')
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        if (data.empweSdate !== undefined) {
          data.empweSdate = data.empweSdate === '' ? '' : new Date(data.empweSdate).format('yyyy-MM-dd')
        }
        if (data.empweEdate !== undefined) {
          data.empweEdate = data.empweEdate === '' ? '' : new Date(data.empweEdate).format('yyyy-MM-dd')
        }
        this.$refs.upFormData.validate((valid) => {
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
              if(data.attShifIslateDis) delete data.attShifIslateDis
              if(data.attShifIsearlyDis) delete data.attShifIsearlyDis
            }
            getDataLevelUserLoginNew(data).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                if (t.logType === '新增') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
//                  t.$refs.upFormData.resetFields()
//                  t.$emit('getData', res.data.content[0])
                }
                if (t.logType === '修改') {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                }
                t.$emit('refresh', '8')
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
        t.upFormData = {
          empweSdate: '',
          empweEdate: '',
          empweComp: '',
          empweDept: '',
          empwePost: '',
          empweWorklocation: '',
          empweJobduties: '',
          empwePerformance: '',
          empweContact: '',
          empwePhone: '',
          empweSalary: '',
          empweLeavereason: '',
          empweComment: '',
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
