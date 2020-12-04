<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{$t('lang_homePage.msg.show')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <row class="table-form"
                 ref="table-form">
                <div class="message_box"
                     style="max-height: 400px;"
                     v-show="isList">
                    <div class="message"
                         v-for="(item,index) in messageData"
                         :key="index"
                         @click="selectDetail(item)">
                        <div class="left1">
                            <h3>
                                <Icon type="volume-low"
                                      color='#ff990f'
                                      style="margin-right: 5px;" />
                                {{type == 1 ? item.cmutNoticeTitle : item.cmutKldTitle }}
                            </h3>
                        </div>
                        <div class="left3">{{$t('lang_homePage.msg.date')}}：{{type == 1 ? item.cmutNoticePublish : item.cmutKldPublish }}</div>
                    </div>
                </div>
                <div class="message_box"
                     style="max-height: 400px;"
                     v-show="!isList">
                    <div style="background:#eee;padding: 10px 20px;">
                        <span @click="fhsj"
                              class="clickSpan">
                            <Icon type="ios-undo"
                                  style="margin-right: 5px;"
                                  size="16"></Icon>{{$t('lang_homePage.bookStore.back')}}
                        </span>
                        <Card :bordered="false"
                              style="height: 100%;margin-top: 10px;">
                            <p slot="title"
                               style="font-size: 16px;color: #4D4D64;">{{titleName}}</p>
                            <div id="content">
                            </div>
                        </Card>
                    </div>
                </div>
            </row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from "../../axios/axios"
import { isSuccess, deepCopy } from "../../lib/util"
export default {
    data () {
        return {
            messageData: [],
            page: 1,
            order: "desc",
            sort: "id",
            rows: 10,
            total: 0,
            isList: true,
            titleName: '',
            type: '',
        };
    },
    props: {
    },
    mounted () {
    },
    methods: {
        getData (type) {
            const t = this
            t.type = type
            if (type == 1) {
                const data = {
                    _mt: this.$global.mt + 'CmutNotic.getPage',
                    APsort: "id",
                    APorder: "desc",
                    AProws: 10,
                    APpage: 1,
                    cmutNoticeState: "02valid"
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.messageData = res.data.content[0].rows || []
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            } else {
                const data = {
                    _mt: this.$global.mt + 'CmutKnowledge.getByRules',
                    APlogType: '查询政策法规',
                    APKnowCode: '185'
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        t.messageData = JSON.parse(res.data.content[0].value) || []
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        search () {
            this.page = 1
            this.getData()
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        refresh () {
            this.getData()
        },
        handleReset () {
            this.$emit("closeMore")
        },
        //点击查看详情
        selectDetail (item) {
            const t = this
            t.isList = false
            if (t.type == 1) {
                t.titleName = item.cmutNoticeTitle
                document.getElementById('content').innerHTML = item.cmutNoticeContent
            } else {
                t.titleName = item.cmutKldTitle
                document.getElementById('content').innerHTML = item.cmutKldContent
            }
        },
        fhsj () {
            this.isList = true
        },
    }
};
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
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
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
        .content {
            max-height: 400px;
            overflow: auto;
        }
        .message_box {
            border: 1px #efefef solid;
            overflow: auto;
        }
        .message {
            height: 70px;
            border-bottom: 1px #efefef solid;
            padding: 10px;
            cursor: pointer;
        }
        .message:hover {
            background-color: rgba(100, 100, 100, 0.1);
        }
        .left1 {
            color: #5cadff;
            overflow: hidden;
            white-space: nowrap;
        }
        .left3 {
            padding-left: 20px;
            font-size: 14px;
            color: #9499a8;
        }
        #content {
            overflow: auto;
            max-height: 400px;
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: solid 1px #dadada;
        }
        .clickSpan:hover {
            color: #2d8cf0;
        }
        .table-form {
            margin: 10px 0;
        }
    }
}
</style>
