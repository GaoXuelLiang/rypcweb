<template>
    <div class="cover">
        <div class="box">
             <Spin size="large" fix  v-if="isSpinTable"></Spin>
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
            <Form ref="formValidate"
                  :model="formValidate"
                    :rules="ruleValidate"
                  :label-width="135">
                <!-- <Row>
                     <Col span="10"
                         offset="1">
                    <FormItem label="附件类型"
                              prop="hfileFtype">
                         <Select v-model="formValidate.hfileFtype"
                                            placeholder="请选择附件类型" 
                                            :label-in-value="true"
                                            @on-change='hfileFtypechange'>
                                        <Option v-for="item in hfileFtypeList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                    </FormItem>
                    </Col>
                </Row> -->
               <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="学历证"
                              prop="maemXlfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload1">
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
                              v-for="(item,index) in formValidate.maemXlfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
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
                                            @click="removeFile1(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="工牌照片"
                              prop="maemGzfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload2">
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
                              v-for="(item,index) in formValidate.maemGzfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile2(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button>
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="简历"
                              prop="maemJlfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload3">
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
                              v-for="(item,index) in formValidate.maemJlfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile3(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile3(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="线下审批表"
                              prop="maemXsfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload4">
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
                              v-for="(item,index) in formValidate.maemXsfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile4(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile4(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button>
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="背景调查信息表"
                              prop="maemBdfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload5">
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
                              v-for="(item,index) in formValidate.maemBdfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile5(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile5(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="背景调查授权书"
                              prop="maemBdsfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload6">
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
                              v-for="(item,index) in formValidate.maemBdsfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile6(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile6(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="薪酬证明"
                              prop="maemXcfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload7">
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
                              v-for="(item,index) in formValidate.maemXcfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile7(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile7(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button>
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row> -->
                <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="身份证"
                              prop="maemSffile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload8">
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
                              v-for="(item,index) in formValidate.maemSffile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile8(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile8(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="面试评估表"
                              prop="maemMsfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload9">
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
                              v-for="(item,index) in formValidate.maemMsfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile9(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile9(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button>
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row> -->
                 <Row >
                    <Col span="21"
                         offset="1">
                    <FormItem label="其他附件"
                              prop="maemOtfile">
                    <i-col span="3">
                        <Upload action=""
                                :before-upload="handleUpload10">
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
                              v-for="(item,index) in formValidate.maemOtfile"
                              class="width-100">
                            <i-col span="19"
                                   class="moreFile">
                                <img class="fileImg"
                                         src="../../../../static/fileImg/fileImg.png"
                                         alt="">
                                <span class="fileName">{{$t('lang_role.imp.up2')}} {{item.fileName}}</span>
                            </i-col>
                            <i-col 
                                   class="flex">
                                <Button type="text"
                                        @click="uploadFile10(item,index)"
                                        v-if="loading[index]">
                                    上传
                                </Button>
                                <span >
                                    <Button type="text"
                                            @click="removeFile9(item,index)"
                                            v-if="!loading[index]">
                                        删除
                                    </Button>
                                </span>
                                <!-- <Button type="text"
                                        @click="uploadFile2(item,index)"
                                        v-if="!loading[index]">
                                    下载
                                </Button> -->
                            </i-col>
                        </span>
                    </Row>
                    </FormItem>
                    </Col>
                </Row>
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
                            @click="handleSubmit">{{$t('button.sav')}}</Button>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile ,getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            hfileFtypeList:[],
            isSpinTable:false,
            loading: [],
            isScorllY: null,
            spinShow: false,
            filekey1:[],
            filekey2:[],
            filekey3:[],
            filekey4:[],
            filekey5:[],
            filekey6:[],
            filekey7:[],
            filekey8:[],
            filekey9:[],
            filekey10:[],
            maemXlfile:'',
            // maemGzfile:'',
            maemJlfile:'',
            // maemXsfile:'',
            maemBdfile:'',
            maemBdsfile:'',
            // maemXcfile:'',
            maemSffile:'',
            // maemMsfile:'',
            maemOtfile:'',
            formValidate: {
                // hfileFtype:'',
                // hfileFtypeDis :'',
                // hfileFilekey: []
                maemXlfile:[],
                // maemGzfile:[],
                maemJlfile:[],
                // maemXsfile:[],
                maemBdfile:[],
                maemBdsfile:[],
                // maemXcfile:[],
                maemSffile:[],
                // maemMsfile:[],
                maemOtfile:[]
            },
            // 基本信息验证
            ruleValidate: {
              
            },
        }
    },
    props: {
        // id: String,
        ids: String,
        logType: String,
        selectionAlldata : Array,
        tableselected:Array
    },
    components: {

    },
    mounted () {
       
    },
    updated () {

    },
    methods: {
        init(){
            const t = this
            console.log(t.selectionAlldata)
             for(let i = 0; i <  t.selectionAlldata.length; i++){
                // 添加到
               this.formValidate.empRecipients=t.selectionAlldata[i].maemEmail;
            }
        },
        hfileFtypechange(value){
            const t = this
             if(value){
               t.formValidate.hfileFtypeDis = value.label
           }
        },
       // 获取form数据
        getByid (id) {
            const t = this;
            t.isSpinTable = true
            getDataLevelUserLoginData({
                _mt: this.$global.mt + "EmpMaemp.getById",
                APid: id,
                APffk: `gec1984`
            })
                .then((res) => {
                    if(res.data.content[0].maemXlfile!==''&&res.data.content[0].maemXlfile!==undefined){
                        for(let i of res.data.content[0].maemXlfile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemXlfile.push(obj)
                            t.filekey1.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemXlfile = res.data.content[0].maemXlfile
                        }
                    }
                    // if(res.data.content[0].maemGzfile!==''&&res.data.content[0].maemGzfile!==undefined){
                    //     for(let i of res.data.content[0].maemGzfile.split("|")){
                    //         let obj = {
                    //             fileName:i.split(':')[0],
                    //             fileKey: i.split(':')[1]
                    //         }
                    //         t.formValidate.maemGzfile.push(obj)
                    //         t.filekey2.push(i.split(':')[0]+":"+i.split(':')[1])
                    //         t.maemGzfile = res.data.content[0].maemGzfile
                    //     }
                    // }
                    if(res.data.content[0].maemJlfile!==''&&res.data.content[0].maemJlfile!==undefined){
                        for(let i of res.data.content[0].maemJlfile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemJlfile.push(obj)
                            t.filekey3.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemJlfile = res.data.content[0].maemJlfile
                        }
                    }
                    // if(res.data.content[0].maemXsfile!==''&&res.data.content[0].maemXsfile!==undefined){
                    //     for(let i of res.data.content[0].maemXsfile.split("|")){
                    //         let obj = {
                    //             fileName:i.split(':')[0],
                    //             fileKey: i.split(':')[1]
                    //         }
                    //         t.formValidate.maemXsfile.push(obj)
                    //         t.filekey4.push(i.split(':')[0]+":"+i.split(':')[1])
                    //         t.maemXsfile = res.data.content[0].maemXsfile
                    //     }
                    // }
                    if(res.data.content[0].maemBdfile!==''&&res.data.content[0].maemBdfile!==undefined){
                        for(let i of res.data.content[0].maemBdfile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemBdfile.push(obj)
                            t.filekey5.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemBdfile = res.data.content[0].maemBdfile
                        }
                    }
                    if(res.data.content[0].maemBdsfile!==''&&res.data.content[0].maemBdsfile!==undefined){
                        for(let i of res.data.content[0].maemBdsfile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemBdsfile.push(obj)
                            t.filekey6.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemBdsfile = res.data.content[0].maemBdsfile
                        }
                    }
                    // if(res.data.content[0].maemXcfile!==''&&res.data.content[0].maemXcfile!==undefined){
                    //     for(let i of res.data.content[0].maemXcfile.split("|")){
                    //         let obj = {
                    //             fileName:i.split(':')[0],
                    //             fileKey: i.split(':')[1]
                    //         }
                    //         t.formValidate.maemXcfile.push(obj)
                    //         t.filekey7.push(i.split(':')[0]+":"+i.split(':')[1])
                    //         t.maemXcfile = res.data.content[0].maemXcfile
                    //     }
                    // }
                    if(res.data.content[0].maemSffile!==''&&res.data.content[0].maemSffile!==undefined){
                        for(let i of res.data.content[0].maemSffile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemSffile.push(obj)
                            t.filekey8.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemSffile = res.data.content[0].maemSffile
                        }
                    }
                    // if(res.data.content[0].maemMsfile!==''&&res.data.content[0].maemMsfile!==undefined){
                    //     for(let i of res.data.content[0].maemMsfile.split("|")){
                    //         let obj = {
                    //             fileName:i.split(':')[0],
                    //             fileKey: i.split(':')[1]
                    //         }
                    //         t.formValidate.maemMsfile.push(obj)
                    //         t.filekey9.push(i.split(':')[0]+":"+i.split(':')[1])
                    //         t.maemMsfile = res.data.content[0].maemMsfile
                    //     }
                    // }
                    if(res.data.content[0].maemOtfile!==''&&res.data.content[0].maemOtfile!==undefined){
                        for(let i of res.data.content[0].maemOtfile.split("|")){
                            let obj = {
                                fileName:i.split(':')[0],
                                fileKey: i.split(':')[1]
                            }
                            t.formValidate.maemOtfile.push(obj)
                            t.filekey10.push(i.split(':')[0]+":"+i.split(':')[1])
                            t.maemOtfile = res.data.content[0].maemOtfile
                        }
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                })
                .finally(() => {
                    t.isSpinTable = false;
                });
        },
        // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'attachmenttype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.hfileFtypeList = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleReset () {
            this.$emit('closeUp');
            this.$refs.formValidate.resetFields()
            this.formValidate.maemXlfile = []
            // this.formValidate.maemGzfile = []
            this.formValidate.maemJlfile = []
            // this.formValidate.maemXsfile = []
            this.formValidate.maemBdfile = []
            // this.formValidate.maemXcfile = []
            this.formValidate.maemBdsfile = []
            this.formValidate.maemSffile = []
            // this.formValidate.maemMsfile = []
            this.formValidate.maemOtfile = []

            this.maemXlfile = ''
            // this.maemGzfile = ''
            this.maemJlfile = ''
            // this.maemXsfile = ''
            this.maemBdfile = ''
            // this.maemXcfile = ''
            this.maemBdsfile = ''
            this.maemSffile = ''
            // this.maemMsfile = ''
            this.maemOtfile = ''
        },
        // 学历证
        handleUpload1 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemXlfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile1(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
           
        },
        removeFile1 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey1.splice(index, 1)
            t.formValidate.maemXlfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey1.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemXlfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile1 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemXlfile = []
            t.maemXlfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey1.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey1.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemXlfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemXlfile = fileName.substr(0, fileName.length - 1)
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
        // 工牌照片
        handleUpload2 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemGzfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile2(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
           
        },
        removeFile2 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey2.splice(index, 1)
            t.formValidate.maemGzfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey2.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemGzfile  = fileName.substr(0, fileName.length - 1)
        },
        uploadFile2 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemXlfile = []
            t.maemXlfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey2.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey2.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemGzfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemGzfile = fileName.substr(0, fileName.length - 1)
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
        // 简历
        handleUpload3 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemJlfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile3(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile3 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey3.splice(index, 1)
            t.formValidate.maemJlfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey3.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemJlfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile3 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemJlfile = []
            t.maemJlfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey3.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey3.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemJlfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemJlfile = fileName.substr(0, fileName.length - 1)
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
        // 线下审批表
        handleUpload4 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemXsfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile4(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile4 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey4.splice(index, 1)
            t.formValidate.maemXsfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey4.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemXsfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile4 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemXsfile = []
            t.maemXsfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey4.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey4.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemXsfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemXsfile = fileName.substr(0, fileName.length - 1)
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
        // 背景调查信息表
        handleUpload5 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemBdfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile5(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile5 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey5.splice(index, 1)
            t.formValidate.maemBdfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey5.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemBdfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile5 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemBdfile = []
            t.maemBdfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey5.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey5.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemBdfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemBdfile = fileName.substr(0, fileName.length - 1)
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
        // 背景调查授权表
        handleUpload6 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemBdsfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile6(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile6 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey6.splice(index, 1)
            t.formValidate.maemBdsfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey6.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemBdsfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile6 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemBdsfile = []
            t.maemBdsfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey6.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey6.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemBdsfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemBdsfile = fileName.substr(0, fileName.length - 1)
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
         // 薪酬证明
        handleUpload7 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemXcfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile7(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile7 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey7.splice(index, 1)
            t.formValidate.maemXcfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey7.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemXcfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile7 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemXcfile = []
            t.maemXcfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey7.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey7.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemXcfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemXcfile = fileName.substr(0, fileName.length - 1)
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
        // 身份证
        handleUpload8 (file) {
            const t = this
            let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemSffile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile8(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile8 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey8.splice(index, 1)
            t.formValidate.maemSffile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey8.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemSffile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile8 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemSffile = []
            t.maemSffile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey8.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey8.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemSffile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemSffile = fileName.substr(0, fileName.length - 1)
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
        // 面试评估表
        handleUpload9 (file) {
            const t = this
             let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemMsfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile9(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile9 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey9.splice(index, 1)
            t.formValidate.maemMsfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey9.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemMsfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile9 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemMsfile = []
            t.maemMsfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey9.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey9.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemMsfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemMsfile = fileName.substr(0, fileName.length - 1)
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
        // 其他附件
        handleUpload10 (file) {
            const t = this
             let fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'jpg' || fileType === 'gif' || fileType === 'png' || fileType === 'jpeg' || fileType === 'txt' || fileType === 'doc' || fileType === 'docx' || fileType === 'xlsx' || fileType === 'xls' || fileType === 'pdf') {
                t.loadingStatus = true
                t.loading.push(false)
                if (t.formValidate.maemOtfile.length >= 5) {
                    t.$Modal.warning({
                        title: t.$t('reminder.remind'),
                        content: '附件最多只能上传五个',
                    })
                    return
                }
                this.uploadFile10(file)
            } else {
                t.$Message.error({
                    content: '暂不支持该格式文件！',
                    duration: 2,
                })
                return false
            }
        },
        removeFile10 (filename, index) {
            const t = this
            let fileName = ''
            t.filekey10.splice(index, 1)
            t.formValidate.maemOtfile.splice(index, 1)
            t.loading.splice(index, 1)
            t.filekey10.forEach((item, index) => {
                fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
            })
            t.thisId = fileName.substr(0, fileName.length - 1)
            t.maemOtfile = fileName.substr(0, fileName.length - 1)
        },
        uploadFile10 (file) {
            const t = this
            const formData = new FormData()
            formData.append('upfile', file)
            t.formValidate.maemOtfile = []
            t.maemOtfile = ''
            uploadFile(formData).then(res => {
                let fileName = ''
                for (const key in res.data) {
                    t.filekey10.push(key + ':' + res.data[key])
                    // t.formValidate.hfileFilekey.push(res.data[key])
                }
                t.filekey10.forEach((item, index) => {
                    fileName += (item.split(':')[0] + ':' + item.split(':')[1] + '|')
                    let obj = {
                        fileName:item.split(':')[0],
                          fileKey: item.split(':')[1]
                    }
                    t.formValidate.maemOtfile.push(obj);
                })
                t.thisId = fileName.substr(0, fileName.length - 1)
                t.maemOtfile = fileName.substr(0, fileName.length - 1)
                t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: '上传成功',
                    onOk: () => {
                        t.loadingStatus = false
                        t.$parent.$refs.commonMainTable.getData()
                    },
                })
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // uploadFile2 (fileName, index) {
        //     const t = this
        //     let data = {
        //         _mt: this.$global.mt + 'UserInfo.getfiletoken',
        //         APisprivate: true,
        //         APlogType: '导出',
        //         APfilekey: t.filekey[index].split(':')[1],
        //         APexpiresecs: 180,
        //     }
        //     getDataLevelUserLoginData(data).then((res) => {
        //         if (isSuccess(res, t)) {
        //             localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
        //             if (this.isIE()) {
        //                 window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
        //             } else {
        //                 let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
        //                 let link = document.createElement('a')
        //                 link.href = doclink
        //                 link.download = 'downloadfiletemp'
        //                 link.click()
        //             }
        //             this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
        //             localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
        //         }
        //     }).catch(() => {
        //         t.$Modal.error({
        //             title: this.$t('reminder.err'),
        //             content: this.$t('reminder.errormessage'),
        //         })
        //     })
        // },
        handleSubmit () {
            const t = this
            t.isSpinTable = true;
            // let data = deepCopy(t.formValidate)
            let data = {}
            const ids = t.tableselected.toString()
            // data._mt= t.$global.mt + "EmpMaemp.sendOffer",
            data._mt = t.$global.mt + "EmpMaemp.addOrUpd"
            // data.APlogType= t.$t("button.sponsor"),
            data.APlogType = t.logType
            data.id = ids
            // data.maemXlfile = JSON.stringify(data.maemXlfile);
            data.maemXlfile = t.maemXlfile
            // data.maemGzfile = t.maemGzfile;
            data.maemJlfile = t.maemJlfile;
            // data.maemXsfile = t.maemXsfile;
            data.maemBdfile = t.maemBdfile;
            data.maemBdsfile = t.maemBdsfile;
            // data.maemXcfile = t.maemXcfile;
            data.maemSffile = t.maemSffile;
            // data.maemMsfile = t.maemMsfile;
            data.maemOtfile = t.maemOtfile;
            // console.log(data,"Data")
            for(let  dat in data) {
                if (data[dat] === '' || data[dat] === undefined ||   data[dat].length === 0) {
                delete data[dat]
                }
                if(typeof (data[dat]) == 'object'){
                    data[dat] = data[dat].toString()
                }
            }
            
            // data.url=pubsource.pub_prvf_cur+'/NewemployeeLoginmain/NewemployeeLogin',
            
            
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then(res => {
                                // t.isSpinTable = true;
                                    try {
                                        if (isSuccess(res, t)) {
                                            // if (res.data.content[0].value == "1") {
                                                // t.tableselected = [];
                                                // t.getData();
                                                t.isSpinTable = false;
                                                t.$Modal.success({
                                                    title: t.$t("reminder.suc"),
                                                    content: t.$t("reminder.savsuccess"),
                                                });
                                            // }else{
                                            //     t.$Modal.success({
                                            //         title: t.$t("reminder.err"),
                                            //         content: t.$t("reminder.sponsorError"),
                                            //     });
                                            // }
                                        }
                                    } catch (res) {
                                        t.isSpinTable = false;
                                        t.$Modal.error({
                                            title: t.$t("reminder.err"),
                                            content: t.$t("reminder.errormessage")
                                        });
                                    }
                                }).catch(() => {
                                    t.isSpinTable = false;
                                    t.$Modal.error({
                                        title: t.$t("reminder.err"),
                                        content: t.$t("reminder.errormessage")
                                    });
                                }).finally(() => {
                                    t.isSpinTable = false;
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
.cover .box {
    position: absolute;
    width: 900px;
    background-color: #fff;
    padding: 60px 20px 0px 20px;
    border-radius: 10px;
     max-height: 730px; 
    /* overflow-y: auto; */
}
/deep/ .cover .box .table_form {
    max-height: 470px;
    /* overflow-y: auto; */

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
.ivu-upload{
    cursor: pointer;
}
</style>
