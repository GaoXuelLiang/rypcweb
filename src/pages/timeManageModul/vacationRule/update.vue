<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form class="content" ref="upFormData" :model="upFormData" :rules="ruleValidate" :label-width="135">
        <Row>
          <i-col span="10">
            <FormItem label="项目类别" prop="attRptitType">
              <Select v-model="upFormData.attRptitType" disabled>
                <Option :value="item.paramCode" :key="index" v-for="(item,index) in select">{{item.paramInfoName}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem label="项目编号" prop="attRptitNo">
              <Input v-model="upFormData.attRptitNo" disabled placeholder="请输入项目编号" />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="10">
            <FormItem label="项目名称" prop="attRptitName">
              <Input v-model="upFormData.attRptitName"  placeholder="请输入项目名称" />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="21">
            <FormItem label="项目说明">
              <Input v-model="upFormData.attRptitDesc" type="textarea"  placeholder="请输入项目说明" />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="18">
            <FormItem label="公式"  prop="attRptitFormula">
              <Input v-model="upFormData.attRptitFormula" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled ></Input>
            </FormItem>
          </i-col>
          <Button type="primary" style='margin-left: 10px;' @click="showformual">编辑公式</Button>
        </Row>
        <Row>
          <FormItem label='是否启用'>
            <RadioGroup v-model="upFormData.attRptitState" type="button" size="small">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <i-col span="21" >
            <FormItem label="备注" prop="attRptitComment">
              <Input v-model="upFormData.attRptitComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" ></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row >
          <i-col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary"  style="margin-left:8px" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
              </FormItem>
            </Row>
          </i-col>
        </Row>
      </Form>
    </div>
    <formula v-show="showMsg" @hideMsg="hideMsg" @htem="htem" :id="id" ref="formula" ></formula>
  </div>
</template>
<script>
  import formula from './formulaView'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow:false,
        isSpin: false,
        showMsg: false,
        id: '',
        attRptitType: '',
        upFormData: {
          attRptitType: '',
          attRptitNo: '',
          attRptitName: '',
          attRptitDesc: '',
          attRptitFormula: '',
          attRptitComment: '',
          attRptitFormulacomment: '',
          attRptitState: '1',
        },
        ruleValidate: {
          attRptitType: [
            { required: true, message: '请选择项目类别', trigger: 'blur' },
          ],
          attRptitNo: [
            { required: true, message: '请输入项目编号', trigger: 'blur' },
          ],
          attRptitName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          attRptitFormula: [
            { required: true, message: '请填写公式', trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
      select: Array,
    },
    components: {
      formula,
    },
    methods: {
      getData(id, attRptitType) {
        const t = this
        t.spinShow = true
        if (id) {
          t.id = id
          t.attRptitType = attRptitType
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'AttendRptitem.getById',
            logType: '查询单条数据',
            id: id,
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.upFormData = res.data.content[0]
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
      // 公式编辑页面
      showformual() {
        const t = this
        t.showMsg = true
        t.$refs.formula.getItem(t.attRptitType) // 获取薪资项目
        if (t.id) { // 如果是修改操作显示
          t.$refs.formula.getData(t.upFormData)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      /**
       * @param attRptitFormula 公式显示
       * @param attRptitFormulacomment 公式备注
       */
      htem(attRptitFormula, attRptitFormulacomment) {
        this.upFormData.attRptitFormula = attRptitFormula
        this.upFormData.attRptitFormulacomment = attRptitFormulacomment
        this.showMsg = false
      },
      //
      handleSubmit() {
        const t = this
        const params = deepCopy(t.upFormData)
        params._mt =  this.$global.mt+'AttendRptitem.addOrUpd'
        params.logType = t.logType
        if (t.upFormData.attRptitState === '1') {
          params.attRptitStateDis = '是'
        } else {
          params.attRptitStateDis = '否'
        }
        this.$refs.upFormData.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginNew(params).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('getData', res.data.content[0])
                } else {
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
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      // 关闭弹窗
      handleReset() {
        const t = this
        t.id = ''
        t.upFormData = {}
        this.$refs.upFormData.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
