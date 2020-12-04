<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <row class="table-form"
                 ref="table-form">
                <Form :model="upFormData"
                      :rules="ruleValidate"
                      ref="upFormData"
                      :label-width="120">
                    <Row>
                        <i-col span="19"
                               style='width: 617px;'>
                            <FormItem label="地址"
                                      prop="attTmlcLocation">
                                <span @dblclick="clearUserid">
                                    <Input v-model="upFormData.attTmlcLocation"
                                           disabled
                                           placeholder="地址"
                                           @on-click="pickUserData" />
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col span='4'>
                            <Button type="primary"
                                    @click="openMap">选取地点</Button>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="22">
                            <FormItem label="详细地址">
                                <Input v-model="upFormData.attTmlcDetaillc"
                                       placeholder="请输入详细地址"></Input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="11">
                            <FormItem label="经度"
                                      icon="ios-search"
                                      :readonly="true">
                                <Input v-model="upFormData.attTmlcLong"
                                       disabled
                                       placeholder="经度" />
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="纬度">
                                <Input v-model="upFormData.attTmlcLati"
                                       disabled
                                       placeholder="纬度"></Input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="11">
                            <FormItem label="最大范围(米)"
                                      prop="attTmlcMaxsize">
                                <Input v-model="upFormData.attTmlcMaxsize"
                                       placeholder="请输入最大范围"></Input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="22">
                            <FormItem label="备注"
                                      icon="ios-search"
                                      :readonly="true">
                                <Input v-model="upFormData.comment"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注" />
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="22">
                            <Row type="flex"
                                 justify="end">
                                <FormItem>
                                    <Button type="primary"
                                            :loading="isSpin"
                                            @click="save">{{$t('button.sav')}}</Button>
                                </FormItem>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
            </row>
        </div>
        <!--选择地点-->
        <transition name='fade'>
            <map-select ref="mapSelect"
                        :position="position"
                        @set-position="setPostion"
                        @set-position-error="positionError" />
        </transition>
    </div>
</template>
<script>
import MapSelect from './MapSelect.vue';
import validChenck from '../../../lib/pub_valid'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        const syssmsNocheck = (rule, value, callbackFun) => {
            if (validChenck.val_number101(value)) {
                return callbackFun()
            }
            return callbackFun(new Error(rule.message))
        }
        return {
            isSpin: false,
            showLocation: false,
            id: '',
            openPickUser: false,
            upFormData: {
                attTmlcTeamid: '',
                attTmlcLocation: '',
                attTmlcDetaillc: '',
                attTmlcLong: '',
                attTmlcLati: '',
                attTmlcMaxsize: '',
                comment: '',
            },
            ruleValidate: {
                attTmlcLocation: [
                    { required: true, message: '请选择地址', trigger: 'blur' },
                ],
                attTmlcMaxsize: [
                    { required: true, message: '请填写最大范围', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
            },
            position: {},


        }
    },
    props: {
        tinterviewertTeamid: '', // 小组id   tinterviewertTeamid
        logType: String,
    },
    components: {
        MapSelect,

    },
    methods: {
        getData (id) {
            const t = this
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'AttendTeamlocation.getById',
                    logType: '班组地址详情',
                    id: id,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.upFormData = res.data.content[0];
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
        save () {
            const t = this
            const data = deepCopy(t.upFormData)
            data._mt =  this.$global.mt+'AttendTeamlocation.addOrUpd'
            data.logType = '班组地址新增修改'
            data.attTmlcTeamid = t.tinterviewertTeamid
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.updateTime) delete data.updateTime
            if (data.createTime) delete data.createTime
            if (data.createBy) delete data.createBy
            if (data.updateBy) delete data.updateBy
            if (data.updateTime) delete data.updateTime
            if (data.deleteFlag) delete data.deleteFlag
            if (t.logType === '新增' && data.id) {
                delete data.id
            }
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginNew(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            if (t.logType === '新增') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.upFormData.resetFields()
                            }
                            if (t.logType === '修改') {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                            }
                            t.close();
                            t.$emit('getData')
                        }
                    }).catch(() => {
                        t.isSpin = false
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        close () {
            let t = this
            t.$refs.upFormData.resetFields()
            t.upFormData.attTmlcLocation = ''
            t.upFormData.attTmlcDetaillc = ''
            t.upFormData.attTmlcLong = ''
            t.upFormData.attTmlcLati = ''
            t.upFormData.attTmlcMaxsize = ''
            t.upFormData.comment = ''
            t.clearUserid()
            this.$emit('hideChangeCharge');
        },
        /**
         * 选择雇员
         */
        pickUserData () {
            const t = this;
            t.$refs.searchEmpMaster.getData();
            t.openPickUser = true;
        },
        closeEmp () {
            const t = this
            t.openPickUser = false
        },
        inputEmp (row) {
            const t = this
            console.log('row---', row);
            t.upFormData.id = row.id;
            //        t.upFormData.attTmlcLocation = row.rinterviewerPno;
            //        t.upFormData.attTmlcDetaillc = row.rinterviewerGid;
            //        t.upFormData.tinterviewertName = row.rinterviewerName;
            //        t.tinterviewerCompDis = row.rinterviewerCompDis; // 公司id
            //        t.upFormData.tinterviewerComp = row.rinterviewerComp;
            //        t.tinterviewerDeptDis = row.rinterviewerDeptDis; // 部门id
            //        t.upFormData.tinterviewerDept = row.rinterviewerDept;
            //        t.upFormData.tinterviewertPosition = row.rinterviewerPosition;
        },
        clearUserid () {
            const t = this
            this.$refs.upFormData.resetFields()
            //        t.upFormData.attTmlcLocation = '';
            //        t.upFormData.attTmlcDetaillc = '';
            //        t.upFormData.tinterviewertName = '';
            //        t.tinterviewerCompDis = '';
            //        t.upFormData.tinterviewerComp = '';
            //        t.tinterviewerDeptDis = '';
            //        t.upFormData.tinterviewerDept = '';
            //        t.upFormData.tinterviewertPosition = '';
        },

        // 打开地图
        openMap () {
            this.$refs.mapSelect.showMap();
        },
        setPostion (position) {
            console.log(position, '----position');
            this.position = position;
            this.isShow = true;
            this.upFormData.attTmlcLocation = this.position.name;
            this.upFormData.attTmlcLong = this.position.longitude;
            this.upFormData.attTmlcLati = this.position.latitude;
        },
        positionError (msg) {
            this.showTip(msg || '地址选择失败');
        },
    }
}
</script>
<!--<style lang="scss" scoped>-->
  <!--.background {-->
    <!--position: fixed;-->
    <!--overflow: auto;-->
    <!--top: 0;-->
    <!--right: 0;-->
    <!--bottom: 0;-->
    <!--left: 0;-->
    <!--z-index: 1000;-->
    <!--display: flex;-->
    <!--justify-content: center;-->
    <!--align-items: center;-->
    <!--background-color: rgba(0, 0, 0, .5);-->
    <!-- -webkit-overflow-scrolling: touch;-->
    <!--outline: 0;-->
    <!--.backbox {-->
      <!--position: relative;-->
      <!--width: 800px;-->
      <!--background-color: #fff;-->
      <!--padding: 20px 20px 30px 20px;-->
      <!--border-radius: 10px;-->
      <!--.title-text {-->
        <!--font-weight: bold;-->
        <!--font-size: 14px;-->
        <!--padding: 20px;-->
        <!--padding-top: 0;-->
      <!--}-->
      <!--.btn {-->
        <!--text-align: right;-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--.upd-goal {-->
    <!--z-index: 1001;-->
  <!--}-->
<!--</style>-->
<style lang="scss" scoped>
.table-form {
    margin-bottom: 10px;
}

.background {
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
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 800px;
        background-color: #fff;
        padding: 60px 20px 0px 20px;
        border-radius: 10px;
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
    }
    .btn {
        text-align: right;
    }
}
</style>

