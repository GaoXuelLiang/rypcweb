 <template>
    <div class=""
         v-if="isshow">
        <i-col span="21" offset="1">
            <FormItem :prop="ruleText"
                    :label="itemLabel"
                      class="">
                <Row>
                    <!-- <div class="header-box">
                        <div class="header-cover"
                             @click="render1">
                            点击上传
                        </div>
                        <div class="header">
                            <img :src="thisValue"
                                 width="100"
                                 height="100">
                        </div>
                    </div>
                    <div class="header-label">{{itemLabel}}</div> -->
                  
                    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index" >
                        <template>
                            <img :src="item">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <!-- <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template> -->
                    </div>
                    <div class="likeClick" @click="render1">
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            action="/action"
                            :on-success="handleSuccess"
                            disabled
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </div>
                        <Modal title="图片预览" v-model="visible" @on-ok="handelisOk">
                            <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                </Row>
            </FormItem>
        </i-col>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadFile, uploadimage } from '../../../axios/axios'
// import pubsources from '../../../lib/pub_source'
import { isSuccess, deepCopy } from '../../../lib/util'
import imgEdit from '../../../components/imgUpdate/imgEdit'

export default {
    data () {
        return {
            httpImg: pubsource.pub_pubf_downlink,
            cropedImg: '',
            updateImg: false,
            imgPack: {},
            pictureDis: {},
            file: '',
            items:{},
            filekey: this.fileKey,
            loadingStatus: false,
            thisValue: this.value ? pubsource.pub_pubf_downlink + this.value.split(this.value.includes(':') ? ':' : ',')[1] : '../../../static/img/head_logo.png',
            thisId: this.id,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
            imgName: '',
            visible: false,
            uploadList: []
            
        }
    },
    props: {
        fileKey: String,
        value: String,
        id: String,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    created () {
        this.httpImg = pubsource.pub_pubf_downlink
        //      console.log('value----', this.value)
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    },  
    methods: {
       
        handelisOk(){
            
        },
        handleView (name,item) {
            const t = this  
            t.visible = true
            t.imgName = name
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            console.log(res, 'ressss')
            console.log(file, 'fileeeee')
        },
        handleFormatError (file) {
            const t = this
            t.$Modal.warning({
                title: '文件格式不正确',
                content:'文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片',
            })
        },
        handleMaxSize (file) {
            const t = this
            t.$Modal.warning({
                title: '超出文件大小限制',
                content:'文件 ' + file.name + ' 太大，不能超过 2M',
            })
        },
        handleBeforeUpload (file) {
            const t = this
            const check = this.uploadList.length < 5;
            if (!check) {
               t.$Modal.warning({
                    title: '超出文件大小限制',
                    content:'文件不数不能能超过5个',
                })
            }else{
                t.render1()
                let reader = new FileReader()

               // reader.readAsDataURL(file)
                reader.onloadend = function (e) {
                    // file.url = reader.result
                    // t.uploadList.push(file)
                    t.$emit('on-change', file)
                }
            }
        },
        formValidate () {
        this.$emit('on-change', this.thisId)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        handleUpload (file) {
            this.file = file
            //        console.log('file----', file)
            this.thisValue = file.name
            this.loadingStatus = true
        },
        render1 () {
            const t = this
            // console.log(t.thisDis)
            if(t.thisDis) return;
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
                    uploadimage(formData).then((res) => {
                        if (res) {
                          
                            for (const key in res.data) {
                                t.thisValue = t.httpImg + res.data[key]
                                t.uploadList.push(t.thisValue)
                                console.log( t.uploadList,'saaaaaaa')
                                //                  t.pictureDis = key + ',' + res.data[key]
                                this.$emit('on-change', key + ',' + res.data[key])
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
    },
    watch: {
        thisId (val) {
            this.formValidate()
        },
        thisValue (val) {
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
            },
            deep: true,
        },
        dis: {
            handler: function (val) {
                this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
            },
            deep: true,
        },
    },
}
</script>
<style lang="scss" scoped>
.likeClick{
    display: inline-block;
}
.message {
    width: 100%;
    // border: 2px solid #f2f7fd;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #f2f7fd;
}
.header-cover {
    display: none;
    top: 0;
    /*left: 0px;*/
    right: 35px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.3);
}
.header-box:hover .header-cover {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-box:hover {
    cursor: pointer;
}
.header {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
}
.header-box {
    display: flex;
    position: relative;
    justify-content: flex-end;
    width: 170px;
    height: 100px;
    text-align: center;
    margin: 0  auto;
}
.tab-box {
    overflow-y: auto;
    height: 370px;
}

.header-label{
    margin-top: 10px;
    line-height: 1;
    text-align:center;
}
/deep/ .ivu-form-item-content {
    margin-left: 0 !important;
}
/deep/ .ivu-form-item-error-tip {
    left: calc(50% - 52px);
}
.img-center {
    text-align: -webkit-center;
}
 .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
