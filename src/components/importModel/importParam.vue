<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  v-if="loadingStatus"
                  fix></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{$t('button.imp')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row type="flex"
                 justify="space-between">
                <i-col span="24">
                    <span style="font-weight: bold;"></span>
                    <!-- <Button icon="ios-download" size="small" @click="dowFile">{{$t('lang_fileOperation.import.downTemplate')}}</Button> -->
                </i-col>
                <i-col span="24"
                       class="col">
                    <span style="font-weight: bold;margin-right:10px">{{$t('lang_fileOperation.import.selectImpType')}} </span>
                    <RadioGroup v-model="imptype">
                        <Radio label="1">{{$t('button.add')}}</Radio>
                        <Radio label="2">{{$t('lang_fileOperation.import.upd')}}</Radio>
                    </RadioGroup>
                    <!-- <Button icon="ios-download" size="small" @click="dowFile">{{$t('lang_fileOperation.import.downTemplate')}}</Button> -->
                    <div class="downloadBtn"
                         @click="dowFile">
                        <!-- <img class="downloadImg" src="../../../static/fileImg/downloadImg.png" alt=""> -->
                        <i class="el-icon-download downloadImg"></i>
                        <span>{{$t('lang_fileOperation.import.downTemplate')}}</span>
                    </div>
                </i-col>
                <i-col span="24">
                    <div class="tip"
                         v-if="imptype == '1'">
                        <!-- <img class="tipImg" src="../../../static/fileImg/tipImg.png" alt=""> -->
                        <i class="el-icon-info tipImg"></i>
                        <span>{{$t('lang_fileOperation.import.addReminder')}}</span>
                    </div>
                    <div class="tip"
                         v-if="imptype == '2'">
                        <!-- <img class="tipImg" src="../../../static/fileImg/tipImg.png" alt=""> -->
                        <i class="el-icon-info tipImg"></i>
                        <span>{{$t('lang_fileOperation.import.updReminder')}}</span>
                    </div>
                </i-col>

                <i-col span="24">
                    <Row class="row">
                        <i-col>
                            <p style="font-weight: bold;">{{$t('lang_fileOperation.import.selectFile')}}</p>
                        </i-col>
                        <i-col>
                            <Upload :before-upload="handleUpload"
                                    :format="['xls','xlsx']"
                                    action="">
                                <span class="uploadBtn">
                                    <Icon type="md-cloud-upload"
                                          size="24" />
                                    <span>点击选择文件</span>
                                </span>
                            </Upload>
                        </i-col>
                        <i-col span="15"
                               style="margin:0 10px"
                               v-if="file !== ''">
                            <!--<span style="line-height: 35px;"><Icon type="folder" size="12" style="margin-right: 10px;"></Icon>{{ file.name }}</span>-->
                            <!-- <Input v-model="file.name" readonly="readonly" >
        				<span slot="prepend">
                  <Icon type="md-cloud-upload" size="16"/>
        				</span>
        			</Input> -->
                            <div class="file">
                                <img class="fileImg"
                                     src="../../../static/fileImg/fileImg.png"
                                     alt="">
                                <span>{{file.name}}</span>
                            </div>
                        </i-col>
                        <i-col v-if="file !== ''">
                            <Button type="primary"
                                    style="width:78px"
                                    @click="uploadFile1">{{ loadingStatus ? $t('lang_fileOperation.import.importing') : $t('lang_fileOperation.import.confirmImp') }}</Button>
                        </i-col>
                    </Row>
                    <!-- <Row>
        		<i-col span="17" v-if="file !== ''" >
        			<span style="line-height: 35px;"><Icon type="folder" size="12" style="margin-right: 10px;"></Icon>{{ file.name }}</span>
        			<Input v-model="file.name" readonly="readonly" >
        				<span slot="prepend">
                  <Icon type="md-cloud-upload" size="16"/>
        				</span>
        			</Input>
        		</i-col>
        		<i-col span="3">
        			<Upload
		            :before-upload="handleUpload" :format="['xls','xlsx']" action="" >
		            <Button  icon="ios-cloud-upload-outline">{{$t('lang_fileOperation.import.browsing')}}</Button>
              </Upload>
        		</i-col>
        		<i-col span="4" v-if="file !== ''">
        			<Button type="primary"  @click="uploadFile1" :loading="loadingStatus">{{ loadingStatus ? $t('lang_fileOperation.import.importing') : $t('lang_fileOperation.import.confirmImp') }}</Button>
        		</i-col>
        	</Row> -->
                </i-col>
                <i-col span="24">
                    <div class="tip">
                        <!-- <img class="tipImg" src="../../../static/fileImg/tipImg.png" alt=""> -->
                        <i class="el-icon-info tipImg"></i>
                        <span>{{$t('lang_fileOperation.import.importReminder')}}</span>
                    </div>
                </i-col>

                <!--<i-col span="24" style="line-height: 32px;height: 40px;" v-if="file !== ''">
          <div style="display: flex;justify-content: space-between">
            <span><Icon type="folder" size="12" style="margin-right: 10px;"></Icon>{{ file.name }}</span>
            <Button type="primary" size="small" @click="uploadFile1" :loading="loadingStatus">{{ loadingStatus ? '正在导入' : '确认导入' }}</Button>
          </div>
        </i-col>-->

                <i-col span="24"
                       class="progress"
                       v-if="imp_status !== 0">
                    <Progress :stroke-width="5"
                              :percent='imp_status'
                              :status="activeState"
                              :hide-info="true"></Progress>
                </i-col>
            </Row>
        </div>
        <transition name="fade">
            <importFail v-show="openImportFail"
                        @closeImportFail="closeImportFail"
                        ref="importFail"></importFail>
        </transition>
    </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData, uploadFile } from '../../axios/axios'
//  import pubsources from '../../lib/pub_source'
import importFail from './importFail'


import { isSuccess, deepCopy } from '../../lib/util'

export default {
    data () {
        return {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: { groupId: 1 },
            loadingStatus: false,
            openImportFail: false,
            downloadStatus: true,
            logType: '',
            filekey: '',
            filename: '',
            jobQueueId: '',
            redisKey: '',
            file: '',
            priToken: '',
            imp: '',
            imp_status: 0,
            imptype: '1',
            activeState: 'normal',
        }
    },
    props: {
        impid: Number,
        imp_mt: String,
        mainId: String,
        funCode: String
    },
    components: {
        importFail,
    },
    updated () {

    },
    methods: {
        handleReset () {
            this.file = ''
            this.imp_status = 0
            this.priToken = ''
            this.loadingStatus = false;
            this.$emit('closeImport')
        },
        closeImportFail () {
            this.openImportFail = false
        },
        handleUpload (file) {
            let fileName = file.name
            let fileType = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
            if (fileType === 'xls' || fileType === 'xlsx') {
                this.file = file
            } else {
                this.$Message.error({
                    content: this.$t('lang_fileOperation.import.importErr'),
                    duration: '2',
                })
            }
            return false
        },
        uploadFile1 () {
            const t = this
            t.loadingStatus = true
            const formData = new FormData()
            formData.append('upfile', t.file)
            console.log(t.file)
            console.log(formData)
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    // console.log(res.data)
                    t.filekey = res.data[key]
                    t.filename = key
                    t.importData(res.data[key])
                }
                t.loadingStatus = false
            }).catch(() => {
                t.loadingStatus = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        importData (filekey) {
            const t = this
            getDataLevelUserLoginData({
                _mt: t.imp_mt,
                APlogType: this.$t('button.imp'),
                APimptype: t.imptype,
                APimportfile: filekey,
                APimportParams: '',
                mainId: t.mainId
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.redisKey = res.data.content[0].redisKey
                    t.jobQueueId = res.data.content[0].jobQueueId
                    t.imp = window.setInterval(t.getImportState, 1000)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getImportState () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'UserJobQueue.impStatusQuery',
                APredisKey: t.redisKey,
                APjobueueId: t.jobQueueId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].imp_status === -1) {
                        clearInterval(t.imp)
                        t.openImportFail = true
                        t.activeState = 'wrong'
                        t.$refs.importFail.setFailstatusDesc(res.data.content[0].imp_status_desc)
                        return
                    }
                    if (res.data.content[0].imp_status !== 100) {
                        t.imp_status = res.data.content[0].imp_status
                        t.activeState = 'active'
                    } else {
                        clearInterval(t.imp)
                        t.activeState = 'normal'
                        if (res.data.content[0].imp_errfile !== '') {
                            t.openImportFail = true
                            t.$refs.importFail.importFailDowFile(res.data.content[0].imp_errfile)
                        } else {
                            t.openImportFail = false
                        }
                        if (res.data.content[0].imp_rows_nomatch !== '') {
                            // t.openImportFail = true
                            t.$refs.importFail.setFailMessage(res.data.content[0].imp_rows_nomatch)
                        }
                        if (!t.openImportFail) {
                            t.$emit('getData')
                            t.openImportFail = true
                            t.imp_status = res.data.content[0].imp_status
                            //   t.$Modal.success({
                            //   title: this.$t('reminder.suc'),
                            //   content: this.$t('lang_fileOperation.import.uploadSuc'),
                            // })
                        } else {
                            t.imp_status = 99
                            t.activeState = 'wrong'
                        }
                    }
                } else {
                    clearInterval(t.imp)
                }
            }).catch(() => {
                clearInterval(t.imp)
                // t.$Modal.error({
                //   title: this.$t('reminder.err'),
                //   content: this.$t('reminder.errormessage'),
                // })
            })
        },
        getDowModelFile () {
            const t = this;
            let funcode = t.$store.state.user.childFunCode ? t.$store.state.user.childFunCode : t.$store.state.user.funCode
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatFileexcel.getByFuncode',
                APfuncode: funcode,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (this.$global.mt === "xian" && JSON.stringify(res.data.content[0]) !== '{}') {
                        // this.filekey = res.data.content[0].fileFkey.split(':')[1]
                        // this.filename = res.data.content[0].fileFkey.split(':')[0]
                        // this.getPriToken(res.data.content[0].fileFkey.split(':')[1])
                        this.filekey = res.data.content[0].fileKey.split(':')[1]
                        this.filename = res.data.content[0].fileKey.split(':')[0]
                        this.getPriToken(res.data.content[0].fileKey.split(':')[1])
                    } else if (this.$global.mt === "znjs" && JSON.stringify(res.data.content[0]) !== '{}') {
                        this.filekey = res.data.content[0].fileKey.split(':')[1]
                        this.filename = res.data.content[0].fileKey.split(':')[0]
                        this.getPriToken(res.data.content[0].fileKey.split(':')[1])
                    } else {
                        this.$Modal.warning({
                            title: '提示',
                            content: '暂无模板',
                        });
                    }
                }
                this.loadingStatus = false;
            }).catch(() => {
                this.loadingStatus = false;
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        dowFile () {
            this.getDowModelFile();
        },
        getPriToken (filekey) {
            const t = this
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APfilekey: filekey,
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.priToken = res.data.content[0].value
                        if (t.priToken !== '') {
                            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                            if (this.isIE()) {
                                window.location.href = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
                            } else {
                                let doclink = pubsource.pub_prvf_downlink + this.priToken + '&fname=' + encodeURI(this.filekey)
                                let link = document.createElement('a')
                                link.href = doclink
                                link.download = 'downloadfiletemp'
                                link.click()
                            }
                            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                        }
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
    watch: {
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
.cover {
    .box {
        padding: 60px 20px 20px 20px;
    }
}
.col {
    display: flex;
    justify-content: start;
    align-items: center;
    .ivu-radio-wrapper {
        margin-right: 10px;
    }
}
.row {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
}
.downloadBtn {
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 12px;
    border-color: rgba(58, 141, 224, 1);
    background: rgba(45, 140, 240, 0.07);
    color: rgba(58, 141, 224, 1);
    width: 90px;
    height: 32px;
    border: 1px solid rgba(58, 141, 224, 1);
    border-radius: 4px;
    .downloadImg {
        font-size: 16px;
        margin: 0 5px 0 10px;
    }
}
.uploadBtn {
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 112px;
    height: 32px;
    border: 1px dashed rgba(181, 181, 181, 1);
    border-radius: 4px;

    .ivu-icon {
        color: rgba(106, 177, 255, 1);
    }
}
.file {
    height: 32px;
    display: flex;
    justify-content: start;
    align-items: center;
    background: rgba(234, 244, 255, 1);
    border-radius: 4px;
    color: rgba(153, 153, 153, 1);
    .fileImg {
        margin: 0 10px;
        width: 18px;
        height: 18px;
    }
}
.tip {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 10px;
    height: 38px;
    background: #f2f7fd;
    border-radius: 4px;
    // padding: 12px;
    overflow: hidden;

    .tipImg {
        margin: 0 10px;
        font-size: 16px;
        color: #6ab1ff;
    }
}
.progress {
    margin-top: 10px;
}
.ivu-radio-group {
    vertical-align: baseline;
}
/deep/ .ivu-upload-list {
    margin-top: 0;
}
</style>
