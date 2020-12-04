<template>
    <div class="coverw">
        
        <!-- <div class="box"> -->
        <div>

            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table_form"
                 ref="scrollBox"
                 >
                <Spin size="large" fix v-if="isSpinTable"></Spin>
            <Form ref="formValidate"
                  :model="formValidate"
                    :rules="ruleValidate"
                  :label-width="120">
                <!-- <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="发件人"
                              prop="empAddresser">
                         <Input v-model="formValidate.empAddresser"
                                        placeholder="请输入发件人"
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="收件人"
                              prop="empRecipients">
                         <Input v-model="formValidate.empRecipients"
                                        placeholder="请输入发件人"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="抄送人"
                              prop="empCarbon">
                         <Input v-model="formValidate.empCarbon"
                                        placeholder="请输入抄送人"
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="主题"
                              prop="empTheme">
                         <Input v-model="formValidate.empTheme"
                                        placeholder="请输入主题"
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="内容"
                              prop="empDemo">
                         <!-- <Input v-model="formValidate.empnName"
                                        placeholder="请输入主题"
                                         type="textarea" :rows="6"
                                        ></Input>、 -->
                            <div id="editor"></div>
                            <Input type="text" v-show="false" v-model="formValidate.empDemo" />
                    </FormItem>
                    </Col>
                </Row>
               <!-- <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="附件"
                              prop="empAccessory">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload">
                                <span class="uploadBtn">
                                    <Icon type="md-cloud-upload"
                                        size="24" />
                                    <span>浏览</span>
                                </span>
                        </Upload>
                    </i-col>
                    <Row type="flex"
                         span="21"
                         class="flex-1">
                        <span :key='index'
                              v-for="(item,index) in formValidate.empAccessory"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile1(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row> -->
            </Form>
             </div>
             <Row>
                <Col span="21"
                     offset="1">
                <Row type="flex"
                     justify="end"
                     :class="[isScorllY?'btnSize1':'btnSize']">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            @click="handleSubmit" :loading="butloading"><span v-show='!butloading'>发送</span></Button>
                </Row>
                </Col>
            </Row>
             
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile ,getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
import E from 'wangeditor'

let editor = new E('#editor')
export default {
    data () {
        return {
            butloading:false,
            isSpinTable:false,
            loading: [],
            isScorllY: null,
            spinShow: false,
            filekey:[],
            empName:'',
            empCompany:'',
            formValidate: {
                empAddresser:'',
                empRecipients:'',
                empCarbon: '',
                empDemo:` <h5>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新员工入职欢迎信</h5><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;尊敬的${this.empName}先生/女士：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诚挚地邀请您加入${this.empCompany}。</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里，有城市量级的舞台，让您可以施展才华、得到锻炼与成长的机会，从而成就超乎想象的更好的自己，让成长的时间注入未来发展的空间。<br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;让我们一起，通过共同的努力，让城市更加美好。</p><p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心有理想，鲜花盛开。</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this.empCompany}<br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;人力资源中心<br></p>`,
                empTheme:'新员工入职欢迎信',
                // empAccessory: []
            },
            // 基本信息验证
            ruleValidate: {
                empAddresser: [
                    { required: true, message: '发件人不能为空', trigger: 'blur' },
                ],
                empTheme: [
                    { required: true, message: '主题不能为空', trigger: 'blur' },
                ],
                empRecipients: [
                    { required: true, message: '收件人不能为空', trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        ids: String,
        logType: String,
        selectionAlldata : Array,
        tableselected:Array,
        paramsNice:Object
    },
    components: {
    },
    mounted () {
        this.init()    
         //降低富文本编辑器的z-index
        editor.customConfig.zIndex = 0
        editor.customConfig.onchange = (html) => {
        //   this.formValidate.empAccessory = editor.txt.text() // 绑定当前逐渐地值
        this.formValidate.empDemo = html // 绑定当前逐渐地值
        }
        editor.create() 
    },
    updated () {

    },
    methods: {
        init(){
            const t = this
            console.log(t.selectionAlldata)
            t.isSpinTable = true
            // const msg = this.$Message.loading({
            //         content: 'Loading...',
            //         duration: 0,
            //         top:500
            //     });
            const data={
                _mt:this.$global.mt + 'EmpMaemp.catchContent',
                APlogType:'捕获offer内容',
                APids:t.paramsNice.row.id
            }
            getDataLevelUserLoginData(data).then((res) => {
                 if (isSuccess(res, t)) {
                    let result = res.data.content[0]
                    t.formValidate.empCarbon = result.mail_cc
                    t.formValidate.empDemo = result.mail_content
                   
                this.$nextTick(()=>{editor.txt.html(this.formValidate.empDemo)})
                 }
            }).catch(()=>{
                t.isSpinTable =false
            }).finally(()=>{
                t.isSpinTable =false
                //  setTimeout(msg, 500);
            })
            this.formValidate.empRecipients = t.paramsNice.row.maemEmail
            // t.empName = t.paramsNice.row.emphIdDis
            // t.empCompany =  t.paramsNice.row.unitIdDis
            // t.formValidate.empDemo = `<h5>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;新员工入职欢迎信</h5><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;尊敬的${this.empName}先生/女士：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诚挚地邀请您加入${this.empCompany}。</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在这里，有城市量级的舞台，让您可以施展才华、得到锻炼与成长的机会，从而成就超乎想象的更好的自己，让成长的时间注入未来发展的空间。<br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;让我们一起，通过共同的努力，让城市更加美好。</p><p>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心有理想，鲜花盛开。</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${this.empCompany}<br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;人力资源中心<br></p>`
        },
        handleReset () {
            this.$emit('closeUp');
            this.$refs.formValidate.resetFields()
            editor.create()
            editor.txt.html(this.formValidate.empDemo)
            // this.formValidate.empAccessory = []
        },
        handleUpload (file) {
            const t = this
            t.loadingStatus = true
            t.loading.push(false)
            if (t.formValidate.empAccessory.length >= 5) {
                t.$Modal.warning({
                    title: t.$t('reminder.remind'),
                    content: '附件最多只能上传五个',
                })
                return
            }
            this.uploadFile1(file)
        },
        removeFile (filename, index) {
            const t = this
            let fileName = ''
            t.filekey.splice(index, 1)
            t.formValidate.empAccessory.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
        },
        uploadFile1 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            uploadFile(formData).then(res => {
                // 上传一个
                //          for (const key in res.data) {
                //          	t.filekey = res.data[key]
                //          	t.formValidate.empAccessory = key
                //        		t.thisId = key + ':' + res.data[key]
                //          }
                // 上传多个
                let fileName = ''
                for (const key in res.data) {
                    t.filekey.push(key + ':' + res.data[key])
                    t.formValidate.empAccessory.push(res.data[key])
                }
                t.filekey.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
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
        uploadFile2 (fileName, index) {
            const t = this
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APlogType: '导出',
                APfilekey: t.filekey[index].split(':')[1],
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
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
        handleSubmit () {
            const t = this
            t.butloading = true
             t.isSpinTable = true;
            let data = deepCopy(t.formValidate)
            for(let  dat in data) {
                if (data[dat] === '' || data[dat] === undefined ||   data[dat].length === 0) {
                delete data[dat]
                }
                if(typeof (data[dat]) == 'object'){
                    data[dat] = data[dat].toString()
                }
            }
             const ids = t.tableselected.toString()
            data._mt= t.$global.mt + "EmpMaemp.sendOffer",
            data.APlogType= t.$t("button.sponsor"),
            data.APids = t.paramsNice.row.id,
            data.url=pubsource.pub_prvf_cur+'/NewemployeeLoginmain/NewemployeeLogin',
            
            
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    // const data = {
                    //     _mt: t.$global.mt + "EmpMaemp.sendOffer",
                    //     APlogType: t.$t("button.sponsor"),
                    //     APids: t.tableselected.toString(),
                    //     url:pubsource.pub_prvf_cur+'/NewemployeeLoginmain/NewemployeeLogin',
                    //     APdata:datas
                    // };
                    getDataLevelUserLoginData(data).then(res => {
                               
                                    try {
                                        if (isSuccess(res, t)) {
                                            if (res.data.content[0].value == "1") {
                                                t.tableselected = [];
                                                // t.getData();
                                                t.$Modal.success({
                                                    title: t.$t("reminder.suc"),
                                                    content: t.$t("reminder.sponsorSucess"),
                                                });
                                            }else{
                                                t.$Modal.success({
                                                    title: t.$t("reminder.err"),
                                                    content: t.$t("reminder.sponsorError"),
                                                });
                                            }
                                        }
                                    } catch (res) {
                                        t.$Modal.error({
                                            title: t.$t("reminder.err"),
                                            content: t.$t("reminder.errormessage")
                                        });
                                        t.butloading = false
                                    }
                                }).catch(() => {
                                    t.$Modal.error({
                                        title: t.$t("reminder.err"),
                                        content: t.$t("reminder.errormessage")
                                    });
                                    t.butloading = false
                                }).finally(() => {
                                    t.isSpinTable = false;
                                    t.butloading = false
                                });               
                 }else {
                        this.$nextTick(function () {
                            let tt = document.querySelectorAll('.ivu-form-item-error');
                            this.$refs.formValidate.$el.scrollTop = tt[0].parentNode.offsetTop
                    })
                }
            })
        }
    },
    watch: {
    },
     //form滚动事件
     formScroll () {
        let selectDom = document.getElementsByClassName("ivu-select-visible");
        let datePickerDom = document.getElementsByClassName(
            "ivu-date-picker-focused"
        );
        if (selectDom.length > 0 || datePickerDom.length > 0) {
            let modal = document.getElementsByClassName("cover")[0];
            modal.click();
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
.coverw .box {
    position: absolute;
    width: 900px;
    background-color: #fff;
    padding: 60px 20px 0px 20px;
    border-radius: 10px;
     max-height: 730px; 
    /* overflow-y: auto; */
}
/deep/ .ivu-spin-fix {
    position: absolute;
    top: 0px;
    left: 100%;
    z-index: 8;
    width: 100%;
    height: 100%;
    // background-color: rgb(190 29 29 / 50%);
    border-radius: 5px;
}
.flex {
    display: flex;
}
.flex-1 {
    flex: 1;
}
.width-100 {
    width: 100%;
}
.w-e-droplist{
    z-index: 10000;
}
#editor :first-child {
    :first-child{
        z-index: 2 !important;
    }
}
</style>
