<template>
  <div class="cover">
    <div class="box">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
            <div ref="scrollBox"
                  style="max-height: 420px;overflow-y: auto;">
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
                <Row>
                  <Col span="10" offset="1">
                    <FormItem :label="labelDesc.brkfCompany" prop="brkfCompany">
                      <Input v-model="formValidate.brkfCompany"  @on-click="opencompetType('brkfCompany')" :placeholder="placeHolderDesc.brkfCompany"></Input>
                    </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfDept" prop="brkfDept">
                    <Input v-model="formValidate.brkfDept"  @on-click="opencompetType('brkfDept')" :placeholder="placeHolderDesc.brkfDept"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfPosition" prop="brkfPosition">
                    <Input v-model="formValidate.brkfPosition"  @on-click="opencompetType('brkfPosition')" :placeholder="placeHolderDesc.brkfPosition"></Input>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfBusiarea" prop="brkfBusiarea">
                    <Input v-model="formValidate.brkfBusiarea" :placeholder="placeHolderDesc.brkfBusiarea"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10" offset="1">
                  <FormItem label="姓名" prop="brkfCname">
                    <Input v-model="formValidate.brkfCname"  @on-click="opencompetType('brkfCname')" :placeholder="placeHolderDesc.brkfCname"></Input>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfIdtype" prop="brkfIdtype">
                    <Select v-model="formValidate.brkfIdtype" >
                      <Option :value="item.paramCode"  v-for="(item,index) in form.selectList1" :key="index" :placeholder="placeHolderDesc.brkfIdtype">{{item.paramInfoCn}}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                  <!--<Col span="10" offset="1">-->
                  <!--<FormItem :label="labelDesc.brkfAlias" prop="brkfAlias">-->
                    <!--<Input v-model="formValidate.brkfAlias"  :placeholder="placeHolderDesc.brkfAlias"></Input>-->
                  <!--</FormItem>-->
                  <!--</Col>-->
                </Row>
                <!--<Row>-->
                  <!--<Col span="10" offset="1">-->
                  <!--<FormItem :label="labelDesc.brkfFirstname" prop="brkfFirstname">-->
                    <!--<Input v-model="formValidate.brkfFirstname"  :placeholder="placeHolderDesc.brkfFirstname"></Input>-->
                  <!--</FormItem>-->
                  <!--</Col>-->
                  <!--<Col span="10" offset="1">-->
                  <!--<FormItem :label="labelDesc.brkfLastname" prop="brkfLastname">-->
                    <!--<Input v-model="formValidate.brkfLastname"  :placeholder="placeHolderDesc.brkfLastname"></Input>-->
                  <!--</FormItem>-->
                  <!--</Col>-->
                <!--</Row>-->
                <Row>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfIdno" prop="brkfIdno">
                    <Input v-model="formValidate.brkfIdno"  :placeholder="placeHolderDesc.brkfIdno"></Input>
                  </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfBreaktype" prop="brkfBreaktype">
                    <Select v-model="formValidate.brkfBreaktype">
                      <Option :value="item.paramCode" v-for="(item,index) in form.selectList2" :key="index" :placeholder="placeHolderDesc.brkfBreaktype">{{item.paramInfoCn}}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col span="10" offset="1">
                    <FormItem :label="labelDesc.brkfPunishtype" prop="brkfPunishtype">
                      <Select v-model="formValidate.brkfPunishtype">
                        <Option :value="item.paramCode" v-for="(item,index) in form.selectList3" :key="index" :placeholder="placeHolderDesc.brkfPunishtype">{{item.paramInfoCn}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="10" offset="1">
                  <FormItem :label="labelDesc.brkfPunishdate" prop="brkfPunishdate">
                    <DatePicker type="date" v-model="formValidate.brkfPunishdate" :placeholder="placeHolderDesc.brkfPunishdate" :editable="false" style="width: 100%"></DatePicker>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="21" offset="1">
                  <FormItem :label="labelDesc.brkfBreaklink" prop="brkfBreaklink">
                    <Input v-model="formValidate.brkfBreaklink" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.brkfBreaklink"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <!-- 是否解除 -->
                <Row>
                  <Col span="10" offset="1">
                    <FormItem :label="labelDesc.brkfRelieve" prop="brkfRelieve" >
                      <Select v-model="formValidate.brkfRelieve" disabled>
                        <Option :value="item.paramCode" v-for="(item,index) in form.selectList4" :placeholder="placeHolderDesc.brkfRelieve" :key="index">{{item.paramInfoCn}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="10" offset="1" v-if="formValidate.brkfRelieve === '1'">
                    <FormItem :label="labelDesc.brkfRelievedate" prop="brkfRelievedate" >
                      <DatePicker type="date" disabled v-model="formValidate.brkfRelievedate" :placeholder="placeHolderDesc.brkfRelievedate" :editable="false" style="width: 100%"></DatePicker>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="21" offset="1" v-if="formValidate.brkfRelieve === '1'">
                  <FormItem label="解除原因" prop="brkfRelievereason">
                    <Input v-model="formValidate.brkfRelievereason" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.brkfRelievereason"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="21" offset="1" v-if="formValidate.brkfRelieve === '1'">
                  <FormItem :label="labelDesc.brkfRelievelink" prop="brkfRelievelink">
                    <Input v-model="formValidate.brkfRelievelink" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.brkfRelievelink"></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                <Row>
                  <Col span="10" offset="1">
                    <FormItem :label="labelDesc.brkfStatus" >
                      <Select v-model="formValidate.brkfStatus" disabled >
                        <Option :value="item.paramCode" v-for="(item,index) in form.selectList5" :placeholder="placeHolderDesc.brkfStatus" :key="index">{{item.paramInfoCn}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                  <!--<Col span="10" offset="1">-->
                  <!--<FormItem :label="labelDesc.brkfEbpid" prop="brkfEbpid">-->
                    <!--<Input v-model="formValidate.brkfEbpid" :placeholder="placeHolderDesc.brkfEbpid"></Input>-->
                  <!--</FormItem>-->
                  <!--</Col>-->
                  <Col span="21" offset="1">
                  <FormItem :label="labelDesc.ebpComment" prop="ebpComment" class="last-item">
                    <Input v-model="formValidate.ebpComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="placeHolderDesc.ebpComment"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
        </Row>
      </div>
      <Row class="row">
        <i-col span="21" offset="1" style="text-align:right;padding-right: 7px;">
          <Button @click="handleReset">{{$t('button.cal')}}</Button>
          <Button :disabled="disabled" style="margin-left: 8px" type="primary" @click="handleSubmit" v-show="!isSearch">{{$t('button.sav')}}</Button>
        </i-col>
      </Row>
    </div>
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
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, deepCopy,getUrlKey} from '@/lib/util'
  import { getSysLananges } from '@/lib/pub_fun'


  export default {
    data() {
      return {
        //显示隐藏新增修改弹窗的变量
//        openUpdate: false,
        spinShow:false,
        labelDesc: {brkfCname:"",brkfAlias:"",brkfFirstname:"",brkfLastname:"",brkfIdtype:"",brkfIdno:"",brkfCompany:"",brkfDept:"",brkfPosition:"",brkfBusiarea:"",brkfBreaktype:"",brkfPunishtype:"",brkfPunishdate:"",brkfBreaklink:"",brkfRelieve:"",brkfRelievedate:"",brkfRelievelink:"",brkfStatus:"",brkfEbpid:"",ebpComment:"",},
        placeHolderDesc: {brkfCname:"",brkfAlias:"",brkfFirstname:"",brkfLastname:"",brkfIdtype:"",brkfIdno:"",brkfCompany:"",brkfDept:"",brkfPosition:"",brkfBusiarea:"",brkfBreaktype:"",brkfPunishtype:"",brkfPunishdate:"",brkfBreaklink:"",brkfRelieve:"",brkfRelievedate:"",brkfRelievelink:"",brkfStatus:"",brkfEbpid:"",ebpComment:"",},
        ruleDesc: {brkfCname:"",brkfAlias:"",brkfFirstname:"",brkfLastname:"",brkfIdtype:"",brkfIdno:"",brkfCompany:"",brkfDept:"",brkfPosition:"",brkfBusiarea:"",brkfBreaktype:"",brkfPunishtype:"",brkfPunishdate:"",brkfBreaklink:"",brkfRelieve:"",brkfRelievedate:"",brkfRelievelink:"",brkfStatus:"",brkfEbpid:"",ebpComment:"",},
        disabled: false,
        formValidate: {
          _mt:  this.$global.mt+'EmpBreakfaith.addOrUpd',
          brkfCname: '',
          brkfAlias: '',
          brkfFirstname: '',
          brkfLastname: '',
          brkfIdtype: '',
          brkfIdno: '',
          brkfCompany: '',
          brkfDept: '',
          brkfPosition: '',
          brkfBusiarea: '',
          brkfBreaktype: '',
          brkfPunishtype: '',
          brkfPunishdate: '',
          brkfBreaklink: '',
          brkfRelieve: '0', // 处分联系方式默认0
          brkfRelievereason: '',
          brkfRelievedate: '',
          brkfRelievelink: '',
          brkfStatus: '01draft',
          brkfEbpid: '',
          ebpComment: '',
        },
        brkfCompany: '',
        brkfDept: '',
        brkfPosition: '',
        ruleValidate: {
          brkfCname: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfAlias: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfFirstname: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfLastname: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfIdtype: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfIdno: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfCompany: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfDept: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfPosition: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfBusiarea: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfBreaktype: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfPunishtype: [
            {required: true, message: '', trigger: 'blur'},
          ],
          brkfPunishdate: [
            {required: true, type: 'date', message: '', trigger: 'blur'},
          ],
          brkfBreaklink: [
            {required: true, message: '', trigger: 'blur'},
          ],
//          brkfRelieve: [
//            {required: true, message: '', trigger: 'blur'},
//          ],
//          brkfRelievedate: [
//            {required: true, type: 'date', message: '', trigger: 'blur'},
//          ],
//          brkfRelievelink: [
//            {required: true, message: '', trigger: 'blur'},
//          ],
//          brkfStatus: [
//            {required: true, message: '', trigger: 'blur'},
//          ],
        },
        showModal: false,
        modiaContent: '',
        dataParame: {},
        brkfCnameDis: '',
        brkfCompanyDis: '',
        brkfDeptDis: '',
        brkfPositionDis: '',
        form: {
          selectList1: [],
          selectList2: [],
          selectList3: [],
          selectList4: [],
          selectList5: [],
        },
        id: Number,
        logType: String,
        isSearch: false,
      }
    },
    components: {},
    props: {
//      id: Number,
//      logType: String,
//      index: Number,
//      labelDesc: Object,
//      placeHolderDesc: Object,
    },
    updated() {

    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        this.getColumns()
        this.getSelectValue()
        if (this.$route.name.endsWith('_Edit')) {
          this.id = this.$route.query.dataid
          this.logType = decodeURI(decodeURI(this.$route.query.logType))
          this.isSearch = this.$route.query.isSearch
          this.getData(this.id)
        }
      }
    },
    // mounted() {
    //   // 列表字段存储
    //   this.getColumns()
    //   this.getSelectValue()
    //   if (this.$route.name.endsWith('_Edit')) {
    //     this.id = this.$route.query.dataid
    //     this.logType = decodeURI(decodeURI(this.$route.query.logType))
    //     this.isSearch = this.$route.query.isSearch
    //     this.getData(this.id)
    //   }
    //   // if (this.id) {

    //   // }
    // },
    methods: {
      // 获取列表项字段
      getColumns() {
        const t = this
        let lanCodes = 'brkf_cname,brkf_alias,brkf_firstname,brkf_lastname,brkf_idtype,brkf_idno,brkf_company,brkf_dept,brkf_position,brkf_busiarea,brkf_breaktype,brkf_punishtype,brkf_punishdate,brkf_breaklink,brkf_relieve,brkf_relievereason,brkf_relievedate,brkf_relievelink,brkf_status,brkf_ebpid,ebp_comment'
        getSysLananges('common', lanCodes).then((res) => {
          if (isSuccess(res, t)) {
            let lans = res.data.content[0]
            if (lans !== undefined) {
              lans = lans.value
//                console.info('lans', lans)
              lans.forEach((item, index) => {
                t.labelDesc[item.lanCode] = item.lanDesc
                t.placeHolderDesc[item.lanCode] = t.$t('reminder.plsInput') + item.lanDesc
                t.ruleDesc[item.lanCode] = item.lanDesc + t.$t('reminder.notNull')
              })
            }
            // 设置修改页面字段的rule message
            const updRule = t.ruleValidate
            for (let prop in updRule) {
              for (let i = 0; i < updRule[prop].length; i++) {
                if (updRule[prop][i].required) {
                  updRule[prop][i].message = t.ruleDesc[prop]
                  break
                }
              }
            }
          }
        })
//          .catch((err, t) => {
//          this.$Modal.error({
//            title: t.$t('reminder.err'),
//            content: t.$t('reminder.errormessage'),
//          })
//        })

        t.$store.commit('commonPage/setColumns', this.columns)
      },
      getData(id) {
        const t = this
        if (id) {
          t.spinShow = true
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'EmpBreakfaith.getById',
            id: id,
            logType: '根据id获取数据',
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.formValidate.brkfCname = res.data.content[0].brkfCname
              t.formValidate.brkfAlias = res.data.content[0].brkfAlias
              t.formValidate.brkfFirstname = res.data.content[0].brkfFirstname
              t.formValidate.brkfLastname = res.data.content[0].brkfLastname
              t.formValidate.brkfIdtype = res.data.content[0].brkfIdtype
              t.formValidate.brkfIdno = res.data.content[0].brkfIdno
              t.formValidate.brkfCompany = res.data.content[0].brkfCompany
              t.formValidate.brkfDept = res.data.content[0].brkfDept
              t.formValidate.brkfPosition = res.data.content[0].brkfPosition
              t.formValidate.brkfBusiarea = res.data.content[0].brkfBusiarea
              t.formValidate.brkfBreaktype = res.data.content[0].brkfBreaktype
              t.formValidate.brkfPunishtype = res.data.content[0].brkfPunishtype
              if (res.data.content[0].brkfPunishdate !== undefined) {
                t.formValidate.brkfPunishdate = res.data.content[0].brkfPunishdate === '' ? '' : new Date(res.data.content[0].brkfPunishdate)
              }
              t.formValidate.brkfBreaklink = res.data.content[0].brkfBreaklink
              t.formValidate.brkfRelieve = res.data.content[0].brkfRelieve
              t.formValidate.brkfRelievedate = res.data.content[0].brkfRelievedate
              if (res.data.content[0].brkfRelievedate !== undefined) {
                t.formValidate.brkfRelievedate = res.data.content[0].brkfRelievedate === '' ? '' : new Date(res.data.content[0].brkfRelievedate)
              }
              t.formValidate.brkfRelievereason = res.data.content[0].brkfRelievereason
              t.formValidate.brkfRelievelink = res.data.content[0].brkfRelievelink
              t.formValidate.brkfStatus = res.data.content[0].brkfStatus
              t.formValidate.brkfEbpid = res.data.content[0].brkfEbpid
              t.formValidate.ebpComment = res.data.content[0].ebpComment
              t.brkfCnameDis = res.data.content[0].brkfCname
              t.brkfCompanyDis = res.data.content[0].brkfCompany
              t.brkfDeptDis = res.data.content[0].brkfDept
              t.brkfPositionDis = res.data.content[0].brkfPosition
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
//          .catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
//        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        if (data.brkfRelievedate !== undefined) {
          data.brkfRelievedate = data.brkfRelievedate === '' ? '' : new Date(data.brkfRelievedate).format('yyyy-MM-dd')
        }
        if (data.brkfPunishdate !== undefined) {
          data.brkfPunishdate = data.brkfPunishdate === '' ? '' : new Date(data.brkfPunishdate).format('yyyy-MM-dd')
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
//                if (this.$route.name.endsWith('_Edit')) {
//                  t.$router.push('/ansrptSearch')
//                } else {
//                  t.$emit('closeUp')
//                  t.handleReset()
//                }
                t.handleReset()
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('newData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            })
//              .catch(() => {
//              this.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
//            })
          }
        })
      },
      handleReset() {
        const t = this
//        if (this.$route.name.endsWith('_Edit')) {
//          t.$router.push('/ansrptSearch')
//          return
//        } else {
//          t.openUpdate = false;
//        }
        this.$router.go(-1)
//        t.$emit('closeUp')
        t.$refs.formValidate.resetFields()
        t.brkfCnameDis = ''
        t.brkfCompanyDis = ''
        t.brkfDeptDis = ''
        t.brkfPositionDis = ''
        t.formValidate.brkfEmpid = ''
        t.formValidate.brkfCname = ''
        t.formValidate.brkfAlias = ''
        t.formValidate.brkfFirstname = ''
        t.formValidate.brkfLastname = ''
        t.formValidate.brkfIdtype = ''
        t.formValidate.brkfIdno = ''
        t.formValidate.brkfCompany = ''
        t.formValidate.brkfDept = ''
        t.formValidate.brkfPosition = ''
        t.formValidate.brkfBusiarea = ''
        t.formValidate.brkfBreaktype = ''
        t.formValidate.brkfPunishtype = ''
        t.formValidate.brkfPunishdate = ''
        t.formValidate.brkfBreaklink = ''
        t.formValidate.brkfRelieve = '0'
        t.formValidate.brkfRelievedate = ''
        t.formValidate.brkfRelievereason = ''
        t.formValidate.brkfRelievelink = ''
        t.formValidate.brkfStatus = '01draft'
        t.formValidate.brkfEbpid = ''
        t.formValidate.ebpComment = ''
      },
      /*
       弹出选择
     */
      opencompetType(type) {
        this.dataParame = {}
        switch (type) {
          case 'brkfCname' :
            if (this.brkfPosition === '') {
              this.$Modal.warning({
                title: this.$t('reminder.err'),
                content: '请先选择岗位',
              })
              return
            }
            this.modiaContent = 'emp-base-std-name'
            this.dataParame = {
              empcompPost: this.brkfPosition,
            }
                break
          case 'brkfCompany' :
            this.modiaContent = 'org-company-std'
            this.dataParame = {
              unitState: '0206valid',
            }
            break
          case 'brkfDept' :
            if (this.brkfCompany === '') {
              this.$Modal.warning({
                title: this.$t('reminder.err'),
                content: '请先选择公司',
              })
              return
            }
            this.modiaContent = 'org-department-std'
            this.dataParame = {
              unitPid: this.brkfCompany,
              unitState: '0206valid',
            }
            break
          case 'brkfPosition' :
            if (this.brkfDept === '') {
              this.$Modal.warning({
                title: this.$t('reminder.err'),
                content: '请先选择部门',
              })
              return
            }
            this.modiaContent = 'org-post-std'
            this.dataParame = {
              postUnit: this.brkfDept,
            }
            break
        }
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      changeinput1(row, type) {
        const t = this
        switch (type) {
          case 'emp-base-std-name' :
            t.formValidate.brkfCname = row.empCname
            t.formValidate.brkfFirstname = row.empFirstname
            t.formValidate.brkfLastname = row.empEname
            t.formValidate.brkfIdtype = row.empidType
            t.formValidate.brkfIdno = row.empidNo
            t.brkfCnameDis = row.empCname
            break
          case 'org-company-std' :
            if (row.id === t.brkfCompany) {
              t.brkfCompany = row.id
              t.formValidate.brkfCompany = row.unitsSname
              t.brkfCompanyDis = row.unitsSname
            } else {
              t.brkfCompany = row.id
              t.formValidate.brkfCompany = row.unitsSname
              t.brkfCompanyDis = row.unitsSname
              t.formValidate.brkfDept = ''
              t.brkfDeptDis = ''
              t.formValidate.brkfPosition = ''
              t.brkfPositionDis = ''
            }
            break
          case 'org-department-std' :
            t.brkfDept = row.id
            t.formValidate.brkfDept = row.unitsName
            t.brkfDeptDis = row.unitsName
            break
          case 'org-post-std' :
            t.brkfPosition = row.id
            t.formValidate.brkfPosition = row.postFnameDis
            t.brkfPositionDis = row.postFnameDis
            break
        }
      },
      //获取下拉列表数据
      getSelectValue() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          logType: 'rpstatus,idtype,illegaltype,punishtype,yesno,rpstatus',
          typeCode: 'rpstatus,idtype,illegaltype,punishtype,yesno,rpstatus',
        }).then(res => {
          if (isSuccess(res, t)) {
            t.form.selectList1 = res.data.content[0].value[1].paramList
            t.form.selectList2 = res.data.content[0].value[2].paramList
            t.form.selectList3 = res.data.content[0].value[3].paramList
            t.form.selectList4 = res.data.content[0].value[4].paramList
            t.form.selectList5 = res.data.content[0].value[5].paramList
          }
        })
//          .catch(() => {
//            this.$Message.error(this.$t("reminder.errormessage"))
//          })
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
