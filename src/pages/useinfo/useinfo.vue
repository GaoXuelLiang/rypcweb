<template>
    <div class="useInfoMain">
        <Form ref="formValidate"
              class="form"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="135">
            <div v-show="!isEmpty"
                 class="userInfo_head"
                 style="position:relative;">
                <!-- <img src="../../../static/img/userinfo_img.png"
                     height="140"
                     width="833"
                     class="userImg"> -->
                <Button icon="ios-arrow-back"
                        type="text"
                        @click="back"
                        class="backBtn">返回</Button>
                <div class="header-box">
                    <div class="header-cover"
                         @click="render1">点击上传头像</div>
                    <div class="header">
                        <img :src="cropedImg===''?'../../../static/img/head_logo.png':cropedImg"
                             width="100"
                             height="100">
                    </div>
                </div>
            </div>
            <Row style="margin-top:20px;">
                <i-col span="10"
                       offset="1">
                    <FormItem label="登录名"
                              prop="loginName">
                        <Input v-model="formValidate.loginName"
                               placeholder="登录名"
                               disabled></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1">
                    <FormItem label="出生日期"
                              prop="birthDate">
                        <DatePicker type="date"
                                    placeholder="选择出生日期"
                                    :editable="false"
                                    v-model="formValidate.birthDate"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="10"
                       offset="1">
                    <FormItem label="真实姓名"
                              prop="name">
                        <Input v-model="formValidate.name"
                               placeholder="请输入真实姓名"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1">
                    <FormItem label="性别"
                              prop="gender">
                        <Select v-model="formValidate.gender"
                                placeholder="选择性别">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectSex"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="10"
                       offset="1">
                    <FormItem label="证件类型"
                              prop="idType">
                        <Select v-model="formValidate.idType"
                                placeholder="选择证件类型">
                            <Option value="01id">身份证</Option>
                            <Option value="02armyid">军官证</Option>
                            <Option value="03passport">护照</Option>
                            <Option value="04hkm">港澳通行证</Option>
                            <Option value="99other">其它卡证</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1">
                    <FormItem label="邮箱"
                              prop="email">
                        <Input v-model="formValidate.email"
                               placeholder="请输入邮箱"></Input>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="10"
                       offset="1">
                    <FormItem label="身份证号码"
                              prop="idNo">
                        <Input v-model="formValidate.idNo"
                               placeholder="请输入身份证号码"
                               @on-change="idNOChange"></Input>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="21"
                       offset="1">
                    <FormItem label="备注"
                              prop="memo">
                        <Input v-model="formValidate.memo"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="请输入备注..."></Input>
                    </FormItem>
                </i-col>
            </Row>
            <Row>
                <i-col span="21"
                       offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem style="margin:10px 0 14px">
                            <!--              <Button type="primary" @click="changePhone">更换手机号</Button>-->
                            <Button type="primary"
                                    @click="changePassWord">修改密码</Button>
                            <Button type="primary"
                                    @click="save"
                                    style="margin-left:10px">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                </i-col>
            </Row>

        </Form>
        <changePhone v-show="showPhone"
                     @closePhone="closePhone"
                     ref="changePhone"></changePhone>
        <changePassWord v-show="showPassWord"
                        @closePassWord="closePassWord"
                        ref="changePassWord"></changePassWord>
    </div>
</template>
<script>
import imgEdit from '../../components/imgUpdate/imgEdit'
import changePhone from './changePhone'
import changePassWord from './changePassWord'
import { getDataLevelUserLoginData, uploadimage } from '../../axios/axios'
import { isSuccess, deepCopy, getCookie } from '../../lib/util'
import valid from '../../lib/pub_valid'


export default {
    data () {
        return {
            value: '',
            imgPack: {},
            showPhone: false,
            showPassWord: false,
            cropedImg: '',
            cropedImgkey: '',
            selectSex: [],
            imgEdit: false,
            formValidate: {
                pictureDis: '',
                loginName: '',
                name: '',
                email: '',
                idNo: '',
                gender: '',
                birthDate: '',
                memo: '',
                idType: '',
            },
            ruleValidate: {
                loginName: [
                    { required: true, message: '请填写登录名', trigger: 'blur' },
                ],
                birthDate: [
                    { required: true, type: 'date', message: '请填写生日日期', trigger: 'change' },
                ],
                name: [
                    { required: true, message: '请填写真实姓名', trigger: 'change' },
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ],
                idType: [
                    { required: true, message: '请选择证件类型', trigger: 'change' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' },
                ],
                idNo: [
                    { required: true, message: '请输入身份证号码', trigger: 'change' },
                ],
            },
            httpImg: '',
        }
    },
    components: {
        changePhone,
        changePassWord,
    },
    props: {
        isEmpty: false,
    },
    mounted () {
    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
        back () {
            this.$emit('close')
        },
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'gender',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectSex = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        changePhone () {
            this.showPhone = true
            this.$refs.changePhone.init(this.formValidate.loginName)
        },
        closePhone () {
            this.showPhone = false
        },
        changePassWord () {
            this.showPassWord = true
        },
        closePassWord () {
            this.showPassWord = false
        },
        render1 () {
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
                                t.cropedImgkey = res.data[key]
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
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            data['_mt'] = this.$global.mt + 'UserInfo.addOrUpd'
            data['APlogType'] = '修改'
            data['id'] = getCookie('useId')
            data.birthDate = data.birthDate === '' ? '' : new Date(data.birthDate).format('yyyy-MM-dd')
            this.$refs.formValidate.validate((valid1) => {
                if (valid1) {
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            this.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: '保存成功',
                            })
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        getInfo () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'UserInfo.getuserbyid',
                APid: getCookie('useId'),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.loginName = res.data.content[0].loginName
                    t.formValidate.birthDate = new Date(res.data.content[0].birthDate).format('yyyy-MM-dd')
                    t.formValidate.email = res.data.content[0].email
                    t.formValidate.idNo = res.data.content[0].idNo
                    t.formValidate.name = res.data.content[0].name
                    t.formValidate.gender = res.data.content[0].gender
                    t.formValidate.memo = res.data.content[0].memo
                    t.formValidate.idType = res.data.content[0].idType
                    if (res.data.content[0].picture) {
                        const a = res.data.content[0].pictureShrink.split(',')
                        t.cropedImg = t.httpImg + a[1]
                        console.log(t.cropedImg)
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        idNOChange () {
            const t = this
            if (t.formValidate.idNo.includes('x')) {
                t.formValidate.idNo = t.formValidate.idNo.toUpperCase()
            }
            if (t.formValidate.idType === '01id' && valid.val_IdCard(t.formValidate.idNo)) {
                t.formValidate.birthDate = t.formValidate.idNo.slice(6, 14)
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.useInfoMain {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    .userInfo_head {
        height: 140px;
        background: url(../../../static/img/userinfo_img.png) no-repeat center
            center;
        background-size: cover;
    }
    .form {
        position: relative;
        // border: 1px solid #efefef;
        background-color: #fff;
        border-radius: 6px;
        width: 835px;
        margin-left: auto;
        margin-right: auto;
        padding: 0px 0px 20px 0px;
        .userImg {
            width: 100%;
        }
        .header-box {
            position: absolute;
            display: flex;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
            .header {
                height: 100px;
                width: 100px;
                border-radius: 50%;
                // box-shadow: 0 0 60px #888888;
                overflow: hidden;
            }
            .header-cover {
                display: none;
                top: 0;
                right: 0;
                color: #fff;
                border-radius: 50%;
                position: absolute;
                width: 100px;
                height: 100px;
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
        .header-box:hover .header-cover {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .header-box:hover {
            cursor: pointer;
        }
    }
}
.backBtn {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    font-size: 14px;
}
</style>
