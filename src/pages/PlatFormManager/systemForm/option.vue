<template>
  <div class="option-main">
    <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
    <div class="form_box"
             ref="scrollBox">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  label-position="right" :label-width="120">
        <Row>
        <i-col span="10">
          <FormItem :label="$t('lang_sysform.sysForm.sformCode')" prop="sformCode">
            <Input v-model="formValidate.sformCode" :placeholder="$t('lang_sysform.sysForm.p_sformCode')"></Input>
          </FormItem>
        </i-col>
        <i-col span="10" offset="1">
          <FormItem :label="$t('lang_sysform.sysForm.sformTbname')" prop="sformTbname">
            <!-- <Input v-model="formValidate.sformTbname" :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"></Input> -->
             <span @dblclick="clearSformTbname">
                                    <Input v-model="formValidate.sformTbname"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"
                                           @on-click="pickSformTbname" />
                                </span>
          </FormItem>
        </i-col>
        </Row>
        <Row>
        <i-col span="10">
          <FormItem :label="$t('lang_sysform.sysForm.sformName')" prop="sformName">
            <Input disabled v-model="formValidate.sformName" readonly :placeholder="$t('lang_sysform.sysForm.p_sformName')"></Input>
          </FormItem>
        </i-col>
        <!-- <i-col span="10">
          <FormItem :label="$t('lang_sysform.sysForm.sformTbname')" prop="sformTbname">
            <Input v-model="formValidate.sformTbname" :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"></Input>
             <span @dblclick="clearSformTbname">
                                    <Input v-model="formValidate.sformTbname"
                                           icon="ios-search"
                                           :readonly="true"
                                           :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"
                                           @on-click="pickSformTbname" />
                                </span>
          </FormItem>
        </i-col> -->
        <i-col span="10" offset="1">
          <FormItem :label="$t('lang_sysform.sysForm.sformParentfield')" prop="sformParentfield">
            <Input disabled v-model="formValidate.sformParentfield" :placeholder="$t('lang_sysform.sysForm.p_sformParentfield')"></Input>
          </FormItem>
        </i-col>
        </Row>
        <!-- <i-col span="21">
          <FormItem :label="$t('lang_sysform.sysForm.sformAfthdClass')" prop="sformAfthdClass">
            <Input v-model="formValidate.sformAfthdClass"  :placeholder="$t('lang_sysform.sysForm.p_sformAfthdClass')"></Input>
          </FormItem>
        </i-col> -->
        <i-col span="21">
          <FormItem :label="$t('lang_sysform.sysForm.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_sysform.sysForm.p_comment')"></Input>
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
     <!-- 选择表名字 -->
        <transition name="fade">
            <searchTableSformTbname v-show="openTableSformTbname"
                         @closeUp="close"
                         @changeinput="changeTableSformTbname"
                      
                         ref="searchTableSformTbname"></searchTableSformTbname>
        </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import searchTableSformTbname   from '../../../components/searchTable/searchTableSformTbname'
  export default {
    data() {
      return {
        // 物理表名
        openTableSformTbname:false,
        spinShow: false,
        formValidate: {
          _mt:  this.$global.mt+'PlatSysform.addOrUpd',
          funId: '1',
          sformCode: '',
          sformName: '',
          sformTbname: '',
          // sformAfthdClass: '',
          sformParentfield: '',
          comment: '',
        },
        ruleValidate: {
          sformCode: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformCode'), trigger: 'blur' },
          ],
          sformName: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformName'), trigger: 'blur' },
          ],
          sformTbname: [
            { required: true, message: this.$t('lang_sysform.sysForm.rule_sformTbname'), trigger: 'blur' },
          ],
        },
      }
    },
    components:{
      searchTableSformTbname
    },
    methods: {
      clearSformTbname(){
        const t = this 
        t.formValidate.sformTbname = ''
        t.formValidate.sformName = ''
      },
      // 选择物理表明弹窗
      pickSformTbname(){
        const t = this
        t.openTableSformTbname = true
        t.$refs.searchTableSformTbname.getData()
      },
      changeTableSformTbname(name,annotation,sformParentfield){
          const t = this
          t.formValidate.sformTbname = name
          t.formValidate.sformName = annotation
          t.formValidate.sformParentfield = sformParentfield
      },
      close(){
        const t = this
        t.openTableSformTbname = false
      },
        /*
        * 修改时初始数据
        * */
      getdata() {
        const t = this;
        t.spinShow = true;
        const data = {
          _mt:  this.$global.mt+'PlatSysform.getById',
          id: t.$store.state.sysData.mainId,
          funId: '1',
          logType: this.$t('button.ser'),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.formValidate.sformCode = res.data.content[0].sformCode
            this.formValidate.sformName = res.data.content[0].sformName
            this.formValidate.sformTbname = res.data.content[0].sformTbname
            this.formValidate.sformAfthdClass = res.data.content[0].sformAfthdClass
            this.formValidate.sformParentfield = res.data.content[0].sformParentfield
            this.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      handleReset (){
        this.$emit("close");
      },
      /*
      * 新增或者修改
      * */
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        if (!t.$store.state.sysData.mainId) {
          data.logType = '新增'
        } else {
          data.logType = '修改'
          data.id = t.$store.state.sysData.mainId
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (!t.$store.state.sysData.mainId) {
//            更新vuex中的mainId
              t.$store.commit('sysData/setMainId', res.data.content[0].id)
//            更新主表数据（无需重新加载）
              t.$store.commit('sysData/addNewArrayMainTable', res.data.content[0])
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.addsuccess'),
              })
            } else {
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: this.$t('reminder.updsuccess'),
              })
              //            更新主表数据（无需重新加载）
              t.$store.commit('sysData/updateArrayMainTable', res.data.content[0])
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.formValidate.sformCode = ''
        this.formValidate.sformName = ''
        this.formValidate.sformTbname = ''
        this.formValidate.sformAfthdClass = ''
        this.formValidate.sformParentfield = ''
        this.formValidate.comment = ''
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/mainChildUpdate.scss";
</style>
