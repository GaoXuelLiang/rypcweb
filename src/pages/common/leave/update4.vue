<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{ logType }}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div class="content-all">


        <div class="block">
          <div class="blocksTitle">
            <Icon type="compose" style="margin-right: 5px;"></Icon>
            员工基本信息
          </div>
          <div class="dataContent">
            <Form class="content" :label-width="135" ref="form" :model="form">
              <Row>
                <Col span="10" offset="1">
                <FormItem label="姓名">
                  <Input disabled v-model="form.applvName"  placeholder="请输入姓名"></Input>
                </FormItem>
                </Col>
                <Col span="10" offset="1">
                <FormItem label="原单据编号">
                  <Input disabled v-model="form.applvOrder" placeholder="请输入单据编号"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10" offset="1">
                <FormItem label="公司">
                  <Input disabled v-model="form.applvHirecompanyDis"  placeholder="请输入公司"></Input>
                </FormItem>
                </Col>
                <Col span="10" offset="1">
                <FormItem label="部门">
                  <Input disabled v-model="form.applvDeptDis"  placeholder="请输入部门"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10" offset="1">
                <FormItem label="岗位">
                  <Input disabled v-model="form.applvPostDis"  placeholder="请输入岗位"></Input>
                </FormItem>
                </Col>
                <Col span="10" offset="1">
                <FormItem label="职级">
                  <Input disabled v-model="form.applvPostlevel" placeholder="请输入职级"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10" offset="1">
                <FormItem label="人员类型">
                  <Input disabled v-model="form.applvEmpmappingDis" placeholder="请输入人员类型"></Input>
                </FormItem>
                </Col>
                <Col span="10" offset="1">
                <FormItem label="汇报人">
                  <Input disabled v-model="form.applvBusipmpDis"  placeholder="请选择汇报人"></Input>
                </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>


        <div class="block">
          <div class="blocksTitle">
            <Icon type="compose" style="margin-right: 5px;"></Icon>
            休假信息
          </div>
          <div class="dataContent">
            <Form class="content" :label-width="135" ref="form" :model="form" :rules="ruleValidate">
              <Row>

                <row>

                <Col span="10" offset="1">
                <FormItem label="请假类型">
                  <!--appsoTypeDis-->
                  <Input disabled v-model="form.applvTypeDis" placeholder="请输入休假类型"></Input>
                </FormItem>
                </Col>

                <!--<Col span="10" offset="1">-->
                <!--<FormItem label="汇报人">-->
                  <!--<Input disabled v-model="form.applvBusipmpDis"  placeholder="请选择汇报人"></Input>-->
                <!--</FormItem>-->
                <!--</Col>-->
                </row>


                <Col span="21" offset="1">
                <FormItem label="休假事由">
                  <Input disabled type="textarea" v-model="form.applvReson" placeholder="请输入休假事由"></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>

                <Col span="10" offset="1">
                <FormItem label="开始时间">
                  <DatePicker disabled type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 220px"
                              v-model="form.applvSdate"></DatePicker>
                </FormItem>
                </Col>

                <Col span="10" offset="1">
                <FormItem label="结束时间">
                  <DatePicker disabled type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 220px"
                              v-model="form.applvEdate"></DatePicker>
                </FormItem>
                </Col>

                <row>
                <Col span="10" offset="1">
                <FormItem label="休假时长">
                  <Input disabled v-model="form.applvDuration" placeholder="请输入休假时长"></Input>
                </FormItem>
                </Col>
                </row>


                <Col span="10" offset="1">
                <FormItem label="实际开始时间" prop="applvFinalstime">
                  <DatePicker :disabled="form.applvFinalstime === 'all' || part === 'xxx' || parts === 'yyy'" type="datetime" format="yyyy-MM-dd HH:mm"
                              placeholder="实际开始时间"
                              v-model="form.applvFinalstime" style="width: 220px"  @on-ok="onOk(1)"></DatePicker>
                </FormItem>
                </Col>

                <Col span="10" offset="1">
                <FormItem label="实际结束时间" prop="appsoFinaledate">
                  <DatePicker :disabled="form.isGenerate === 'all'|| part === 'xxx'" type="datetime" format="yyyy-MM-dd HH:mm"
                              placeholder="实际结束时间"
                              v-model="form.appsoFinaledate" style="width: 220px"  @on-ok="onOk(2)"></DatePicker>
                </FormItem>
                </Col>

                <row>
                  <Col span="10" offset="1">
                  <FormItem label="实际休假时长" prop="appsoFinalduration">
                    <Input :disabled="form.isGenerate === 'all'|| part === 'xxx'" v-model="form.appsoFinalduration"
                           placeholder="请输入实际休假时长"></Input>
                  </FormItem>
                  </Col>
                </row>

                <Col span="21" offset="1">
                <FormItem label="销假原因" prop="appsoCanclerea">
                  <Input type="textarea" v-model="form.appsoCanclerea" placeholder="请输入销假事由"></Input>
                </FormItem>
                </Col>


              </Row>
            </Form>
          </div>
        </div>
      </div>
      <div class="footer-button">
        <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
        <Button type="primary" @click="handleSubmit">保存</Button>
      </div>
    </div>
    <!--<transition name="fade">-->
    <!--<addResume v-show="openUpdate1" :btnControl="btnControl" @closeUp="closeUp"  :logType="logType" ref="addResume"></addResume>-->
    <!--</transition>-->
  </div>
</template>
<script>
  //  import addResume from '../resumePool/components/addResume.vue'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'
  import valid from '../../../lib/pub_valid'

  export default {
    components: {
//      addResume,
    },
    data() {
      return {
        part: '',
        parts: '',
        openUpdate1: '',
        btnControl: false,
        openRcored: false,
        roundResultList: [],
        id: '',
        noticeResumeid: '',
        noticeRemark3: '',
        form: {
          applvBusipmpDis: '',
          applvBusipmp: '',
          applvName: '',
          applvTypeDis: '',
          applvDuration: '',
          applvIscancle: '',
          deleteFlag: '',
          applvDeptDis: '',
          id: '',
          isGenerate: '',
          applvEdate: '',
          applvReson: '',
          applvPost: '',
          applvPostDis: '',
          curStep: '',
          companyId: '',
          applvCanclestatus: '',
          curStepstate: '',
          applvWorkno: '',
          applvHirecompany: '',
          applvDept: '',
          updateBy: '',
          applvPostlevel: '',
          applvType: '',
          flowId: '',
          applvHirecompanyDis: '',
          leveaDate: '',
          applvEmpmapping: '',
          applvEmpmappingDis: '',
          updateTime: '',
          flowState: '',
          applvOrder: '',
          createBy: '',
          applvSdate: '',
          createTime: '',
          applvEmpidDis: '',
          applvEmpid: '',
          applvAppvresult: '',
          appsoFinaledate: '',
          appsoFinalduration: '',
          applvFinalstime: '',
          appsoCanclerea: '',
        },
        columns: [
          {
            title: '面试顺序',
            key: 'roundOrder',
          },
          {
            title: '面试官/小组',
            key: 'roundName',
          },
          {
            title: '面试结果',
            key: 'roundResultDis',
          },
          {
            title: '面试记录',
            key: 'roundRecord',
          },
          {
            title: '面试地点',
            key: 'roundPlace',
          },
          {
            title: '面试时间',
            key: 'roundTime',
          },
        ],
        ruleValidate: {
          applvFinalstime: [
            { required: true, message: '请选择实际开始时间' },
          ],
          appsoFinaledate: [
            { required: true, message: '请选择实际结束时间' },
          ],
          appsoFinalduration: [
            { required: true, message: '请填写实际休假时长' },
          ],
          appsoCanclerea: [
            { required: true, message: '请填写销假事由' },
          ],
        },
        data: [],
        total: NaN,
        page: 1,
        params: {
          _mt: 'recruiteRound.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
        },
      }
    },
    props: {
      logType: String,
    },
    mounted() {
//      this.getSelect()
//      this.getColumn()
//      this.getData1()
    },
    methods: {

      onOk(inde) {
        const t = this
//        实际开始时间
        let applvFinalstime = new Date(this.form.applvFinalstime).format('yyyy-MM-dd hh:mm')
//        实际结束时间
        let appsoFinaledate = new Date(this.form.appsoFinaledate).format('yyyy-MM-dd hh:mm')

//        开始时间
        let applvSdate = new Date(this.form.applvSdate).format('yyyy-MM-dd hh:mm')
//        结束时间
        let applvEdate = new Date(this.form.applvEdate).format('yyyy-MM-dd hh:mm')

        if (t.form.isGenerate === 'upd') {
          let _begintime = new Date(applvSdate).getTime()
          let _endtime = new Date(applvFinalstime).getTime()

          let _begintime1 = new Date(applvEdate).getTime()
          let _endtime1 = new Date(appsoFinaledate).getTime()
          if (inde === 1) {
            if (_endtime < _begintime) {
              this.form.applvFinalstime = ''
              this.$Modal.warning({
                title: '提示',
                content: '实际开始时间不能小于开始时间，请重新选择实际开始时间',
              })
            }
          } else {
            if (_endtime1 < _begintime1) {
              this.form.appsoFinaledate = ''
              this.$Modal.warning({
                title: '提示',
                content: '实际结束时间不能小于结束时间，请重新选择实际结束时间',
              })
            }
          }
        }

        if (applvFinalstime && appsoFinaledate) {
          let _begintime = new Date(applvFinalstime).getTime()
          let _endtime = new Date(appsoFinaledate).getTime()
          if (_endtime < _begintime) {
            if (inde === 1) {
              this.form.applvFinalstime = ''
              this.$Modal.warning({
                title: '提示',
                content: '实际结束时间不能小于实际开始时间，请重新选择实际开始时间',
              })
            } else {
              this.form.appsoFinaledate = ''
              this.$Modal.warning({
                title: '提示',
                content: '实际结束时间不能小于实际开始时间，请重新选择实际结束时间',
              })
            }
          } else {
            this.appsoFina()
          }
        }
//        if (applvFinalstime && appsoFinaledate && inde === 2) {
//          this.appsoFina()
//        }
      },
      getDatae(id) {
        const t = this
        let data = {}
        data._mt =  this.$global.mt+'ApplyLeaveorder.getApplySellingoffByLeave'
        data.id = id
        getDataLevelUserLogin(data).then((res) => {
          t.form.applvName = res.data.content[0].applvName
          t.form.applvTypeDis = res.data.content[0].applvTypeDis
          t.form.applvDuration = res.data.content[0].applvDuration
          t.form.applvIscancle = res.data.content[0].applvIscancle
          t.form.deleteFlag = res.data.content[0].deleteFlag
          t.form.applvDeptDis = res.data.content[0].applvDeptDis
          t.form.id = res.data.content[0].id
          t.form.isGenerate = res.data.content[0].isGenerate
          t.form.applvEdate = res.data.content[0].applvEdate
          t.form.applvReson = res.data.content[0].applvReson
          t.form.applvPost = res.data.content[0].applvPost
          t.form.applvPostDis = res.data.content[0].applvPostDis
          t.form.curStep = res.data.content[0].curStep
          t.form.companyId = res.data.content[0].companyId
          t.form.applvCanclestatus = res.data.content[0].applvCanclestatus
          t.form.curStepstate = res.data.content[0].curStepstate
          t.form.applvWorkno = res.data.content[0].applvWorkno
          t.form.applvHirecompany = res.data.content[0].applvHirecompany
          t.form.applvDept = res.data.content[0].applvDept
          t.form.updateBy = res.data.content[0].updateBy
          t.form.applvPostlevel = res.data.content[0].applvPostlevel
          t.form.applvType = res.data.content[0].applvType
          t.form.flowId = res.data.content[0].flowId
          t.form.applvHirecompanyDis = res.data.content[0].applvHirecompanyDis
          t.form.leveaDate = res.data.content[0].leveaDate
          t.form.applvEmpmapping = res.data.content[0].applvEmpmapping
          t.form.applvEmpmappingDis = res.data.content[0].applvEmpmappingDis
          t.form.updateTime = res.data.content[0].updateTime
          t.form.flowState = res.data.content[0].flowState
          t.form.applvOrder = res.data.content[0].applvOrder
          t.form.createBy = res.data.content[0].createBy
          t.form.applvSdate = res.data.content[0].applvSdate
          t.form.createTime = res.data.content[0].createTime
          t.form.applvEmpidDis = res.data.content[0].applvEmpidDis
          t.form.applvEmpid = res.data.content[0].applvEmpid
          t.form.applvAppvresult = res.data.content[0].applvAppvresult
          t.form.applvBusipmpDis = res.data.content[0].applvBusipmpDis
          t.form.applvBusipmp = res.data.content[0].applvBusipmp
          t.form.applvFinalstime = res.data.content[0].applvFinalstime
          t.form.appsoFinaledate = res.data.content[0].appsoFinaledate

          if (t.form.isGenerate === 'all') {
            this.part = 'xxx'
//          实际开始时间  ===  开始时间
            t.form.applvFinalstime = t.form.applvSdate
//          实际结束时间  ===  结束时间
            t.form.appsoFinaledate = t.form.applvEdate
//          实际休假时长  ===  休假时长
            t.form.appsoFinalduration = t.form.applvDuration
          } else if (t.form.isGenerate === 'upd') {
//          实际开始时间  ===  开始时间
            if (t.form.applvFinalstime === '0' || t.form.applvFinalstime === undefined) {
              t.form.applvFinalstime = t.form.applvSdate
            }
//          实际结束时间  ===  结束时间
            if (t.form.appsoFinaledate === '0' || t.form.appsoFinaledate === undefined) {
              t.form.appsoFinaledate = t.form.applvEdate
            }
//          实际休假时长  ===  休假时长
            t.form.appsoFinalduration = this.form.applvDuration
          } else if (t.form.isGenerate === 'part') {
            this.parts = 'yyy'
//          实际开始时间  ===  开始时间
            t.form.applvFinalstime = t.form.applvSdate
//          实际结束时间  ===  开始时间
            t.form.appsoFinaledate = t.form.applvSdate

            this.appsoFina()
          }
        })
      },
      appsoFina() {
        let data = {}
        data._mt =  this.$global.mt+'ApplyLeaveorder.caclVacationDuration'
        data.empId = this.form.applvEmpid
        data.vocationType = this.form.applvType
        data.startTime = new Date(this.form.applvFinalstime).format('yyyy-MM-dd hh:mm')
        data.endTime = new Date(this.form.appsoFinaledate).format('yyyy-MM-dd hh:mm')
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, this)) {
            this.form.appsoFinalduration = res.data.content[0].value
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
        if (t.form.applvFinalstime === '') {
          t.$Modal.warning({
            title: '提示',
            content: '请选择实际开始时间',
          })
          return
        }
        if (t.form.appsoFinaledate === '') {
          t.$Modal.warning({
            title: '提示',
            content: '请选择实际结束时间',
          })
          return
        }
        if (t.form.appsoFinalduration === '') {
          t.$Modal.warning({
            title: '提示',
            content: '请填写实际休假时长',
          })
          return
        }
        if (t.form.appsoCanclerea === '') {
          t.$Modal.warning({
            title: '提示',
            content: '请填写销假事由',
          })
          return
        }
        const data = {}
        data._mt =  this.$global.mt+'ApplySellingoff.addOrUpdByCode'
//        流程id
//        data.flowId = t.form.flowId
//        数据id
        data.appsoApplvid = t.form.id
//        实际开始时间
        data.appsoFinalsdate = new Date(t.form.applvFinalstime).format('yyyy-MM-dd hh:mm')
//        实际结束时间
        data.appsoFinaledate = new Date(t.form.appsoFinaledate).format('yyyy-MM-dd hh:mm')
//        实际休假时长
        data.appsoFinalduration = t.form.appsoFinalduration

//        汇报人
        data.appsoBusipmpDis = t.form.applvBusipmpDis
        data.appsoBusipmp = t.form.applvBusipmp

//        原单据编号
        data.appsoSourcecode = t.form.applvOrder

//        销假事由
        data.appsoCanclerea = this.form.appsoCanclerea

        data.appsoEmpid = localStorage.getItem('empId')
        data.appsoName = t.form.applvName
        data.appsoHirecompanyDis = t.form.applvHirecompanyDis
        data.appsoHirecompany = t.form.applvHirecompany
        data.appsoDeptDis = t.form.applvDeptDis
        data.appsoDept = t.form.applvDept
        data.appsoPostDis = t.form.applvPostDis
        data.appsoPost = t.form.applvPost
        data.appsoPostlevel = t.form.applvPostlevel
        data.appsoEmpmappingDis = t.form.applvEmpmappingDis
        data.appsoEmpmapping = t.form.applvEmpmapping
        data.appsoTypeDis = t.form.applvTypeDis
        data.appsoType = t.form.applvType
        data.appsoReson = t.form.applvReson
        data.appsoWorkno = t.form.applvWorkno
        data.appsoDuration = t.form.applvDuration
//        data.appsoFinalduration = t.form.appsoFinalduration
        data.appsoSdate = new Date(t.form.applvSdate).format('yyyy-MM-dd hh:mm')
        data.appsoEdate = new Date(t.form.applvEdate).format('yyyy-MM-dd hh:mm')
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$Message.success('销假发起成功')
            t.$emit('update1')
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 点击表格查看按钮
      openUp1() {
        let t = this
        t.$refs.addResume.getData(t.noticeResumeid)
        t.openUpdate1 = true
      },
      // 关闭查看简历弹窗
      closeUp() {
        let t = this
        t.openUpdate1 = false
      },
      // 关闭弹窗
      handleReset() {
        let t = this
        if (t.$refs.form) {
          t.$refs.form.resetFields()
        }
        this.$emit('closeUpd')
      },
      // 点击表格查看按钮
      pageChange(page) {
        let t = this
        t.params.page = page
        t.getData(t.id)
      },
      sortable(column) {
        let t = this
        t.params.sort = column.key
        t.params.order = column.order
        if (t.params.order !== 'normal') {
          t.getData(t.id)
        } else {
          t.params.order = 'desc'
        }
      },
      sizeChange(size) {
        let t = this
        t.params.rows = size
        t.getData(t.id)
      },
      refresh() {
        let t = this
        t.getData(t.id, t.noticeResumeid, t.noticeRemark3)
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'recrresult',
        }).then((res) => {
          if (isSuccess(res, t)) {
            let arr = []
            // t.roundResultList = res.data.content[0].value[0].paramList
            arr = res.data.content[0].value[0].paramList
            arr.forEach(item => {
              if (item.paramCode != '00processing') {
                t.roundResultList.push(item)
              }
            });
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getColumn(dataBlockId, dataBlockType) {
        const t = this
        const params = {
          _mt:  this.$global.mt+'PlatAutoLayoutGetFlowEdit.getDataBlockColumn',
          flowId: t.flowId, // 流程ID
          stepId: t.thisStepId, // 流程步骤ID
          dataBlockId: dataBlockId,
          dataBlockType: dataBlockType,
          roleType: t.$store.state.user.roleType, // 角色类型
          logType: 'getBlockColumn', // 主键值
          pkValue: t.thisPkValue,
        }
        getDataLevelUserLogin(params).then((res) => {
          t.dataBlocks = []    // 进入之后每次清空datablock里的数据
          t.finishCount = t.finishCount + 1
          let bb = t.dataBlocksFake
          for (let i = 0; i < bb.length; i++) {
            if (bb[i].id === dataBlockId) {
              bb[i]['blockColumn'] = res.data.content[0]
              bb[i]['formlist'] = t.getFormDataSubmit(res.data.content[0].columns)
            }
          }
          t.dataBlocksFake = bb // 临时block存储变量最后赋值给正式的block，
          t.dataBlocks = t.dataBlocksFake
          /* 非子集数据块 有columns */
          t.dataBlocksDad = []
          for (let j = 0; j < t.dataBlocks.length; j++) {
            if (t.dataBlocks[j].flsdbType !== '02subtable') {
              t.dataBlocksDad.push(t.dataBlocks[j])
            }
          }
          /**
           * 收集弹出选择的 (key:value)(字段物理名, 字段值)
           */
          for (let m = 0; m < res.data.content[0].columns.length; m++) {
            if (res.data.content[0].columns[m].clmLayout === 13) {
              t.clmkvMap[res.data.content[0].columns[m].clmName] = res.data.content[0].columns[m].clmDname
            }
          }
          if (t.finishCount + t.ChildDataBloks.length === t.requirCount) {
            this.$store.commit('flowClmkMap/setClmkvMap', t.clmkvMap)
            t.clmkvMap = {} // 清空
            this.$store.commit('flowClmkMap/setPopForm', t.popForm)
            t.popForm = {} // 清空
            this.getValueMap(t.dataBlocksDad)
            Bus.map = t.valueMap
            Bus.father = t
            if (onChange.hasOwnProperty(this.tbName)) {
              setTimeout(() => {
                onChange[this.tbName].all_dis.call(this)
              }, 500)
            }
          }
        }).catch((res) => {
        })
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
      padding: 60px 20px 24px 20px;
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
      .content-all {
        max-height: 400px;
        overflow: auto;
      }
      .block {
        .blocksTitle {
          background-color: rgba(39, 142, 255, 0.2);
          font-size: 14px;
          padding: 0 20px;
          margin-bottom: 10px;
          height: 26px;
          font-weight: bold;
          line-height: 26px;
        }
      }
      .footer-button {
        text-align: right;
        padding-right: 80px;
      }
    }
  }
</style>
