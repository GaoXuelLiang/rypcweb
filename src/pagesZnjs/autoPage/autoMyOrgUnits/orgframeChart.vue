<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{$t('lang_organization.orgChart.title')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div>
                <Button type="primary"
                        @click="setOrigent">{{origent}}</Button>
                <Button type="primary"
                        @click="setExpand">{{expand}}</Button>
                <!-- <Button type="primary"
                        @click="savecanvas">{{$t('lang_organization.orgChart.savImg')}}</Button> -->
                <Dropdown>
                    <Button type="primary">
                        {{select}}
                        <Icon type="md-arrow-dropdown"
                              size="18"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <span v-for="(item,index) in ColorList"
                              :key="index"
                              @click="selected(item.color,item.name)">
                            <DropdownItem>{{item.name}}</DropdownItem>
                        </span>
                    </DropdownMenu>
                </Dropdown>
                <Button type="primary"
                        @click="setUnitCharger">{{charger}}</Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 500px;overflow-y: auto;position: relative">
                    <Spin v-if="loading"
                          size="large"
                          style="width: 100px;margin: auto"></Spin>
                    <div v-if="!loading"
                         class="text-center"
                         style="height: 420px">
                        <orgTree class="tree"
                                 :data="data"
                                 :horizontal="horizontal"
                                 :collapsable="collapsable"
                                 :label-class-name="labelClassName"
                                 :render-content="renderContent"
                                 @on-expand="onExpand"
                                 @on-node-click="onNodeClick" />
                    </div>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
import orgTree from '@/components/vueOrgTree/org-tree'
import { getDataLevelUserLoginData, uploadFile } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            loading: true,
            file: '',
            filekey: '',
            thisValue: '',
            thisId: '',
            url: '',
            data: {},
            data1: {},
            data2: {},
            isHaveCharger: false,
            charger: '显示负责人',
            showCharger: '显示负责人',
            hiddenCharger: '隐藏负责人',
            horizontal: false,
            collapsable: true,
            expandAll: true,
            origent: this.$t('lang_organization.orgChart.horrization'),
            expand: this.$t('lang_organization.orgChart.shrinkage'),
            labelClassName: 'bg-green',
            type: 'default',
            select: this.$t('lang_organization.orgChart.green'),
            ColorList: [
                {
                    name: this.$t('lang_organization.orgChart.white'),
                    color: 'bg-white',
                },
                {
                    name: this.$t('lang_organization.orgChart.orange'),
                    color: 'bg-orange',
                },
                {
                    name: this.$t('lang_organization.orgChart.gold'),
                    color: 'bg-gold',
                },
                {
                    name: this.$t('lang_organization.orgChart.gray'),
                    color: 'bg-gray',
                },
                {
                    name: this.$t('lang_organization.orgChart.lightpink'),
                    color: 'bg-lightpink',
                },
                {
                    name: this.$t('lang_organization.orgChart.reseda'),
                    color: 'bg-reseda',
                },
                {
                    name: this.$t('lang_organization.orgChart.green'),
                    color: 'bg-green',
                },
            ],
        }
    },
    components: {
        orgTree,
        html2canvas,
    },
    methods: {
        getData (id) {
            const t = this
            t.loading = true
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'OrgUnits.getChart',
                APunitId: id
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data1 = res.data.content[0].value[0] // 不带负责人的数据
                    t.data2 = res.data.content[0].value[1] // 带负责人的数据
                    if (t.isHaveCharger) {
                        t.data = t.data2
                    } else {
                        t.data = t.data1
                    }
                    this.loading = false
                    t.expandChange()
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        selected (color, name) {
            this.labelClassName = color
            this.select = name
        },
        setUnitCharger () {
            const t = this
            if (t.charger === t.showCharger) { // 显示负责人
                t.charger = t.hiddenCharger
                t.isHaveCharger = true
                t.data = t.data2
                t.collapsable = true // 展开
            } else {
                t.charger = t.showCharger
                t.isHaveCharger = false
                t.data = t.data1
                t.collapsable = true // 展开
            }
        },
        setOrigent () {
            if (this.origent === this.$t('lang_organization.orgChart.horrization')) {
                this.origent = this.$t('lang_organization.orgChart.vertical')
            } else {
                this.origent = this.$t('lang_organization.orgChart.horrization')
            }
            this.horizontal = !this.horizontal
        },
        setExpand () {
            if (this.expand === this.$t('lang_organization.orgChart.expand')) {
                this.expand = this.$t('lang_organization.orgChart.shrinkage')
            } else {
                this.expand = this.$t('lang_organization.orgChart.expand')
            }
            this.expandAll = !this.expandAll
            this.expandChange()
        },
        handleReset () {
            const t = this
            t.data = {}
            t.data1 = {}
            t.data2 = {}
            t.type = 'default'
            t.horizontal = false
            t.collapsable = true
            t.expandAll = true
            t.origent = this.$t('lang_organization.orgChart.horrization')
            t.expand = this.$t('lang_organization.orgChart.shrinkage')
            t.labelClassName = 'bg-green'
            t.select = this.$t('lang_organization.orgChart.green')
            this.$emit('closeChart')
        },
        renderContent: function (h, data) {
            return data.label
        },
        onExpand: function (data) {
            if ('expand' in data) {
                data.expand = !data.expand
                if (!data.expand && data.children) {
                    this.collapse(data.children)
                }
            } else {
                this.$set(data, 'expand', true)
            }
        },
        onNodeClick: function (e, data) {
        },
        collapse: function (list) {
            let _this = this
            list.forEach(function (child) {
                if (child.expand) {
                    child.expand = false
                }
                child.children && _this.collapse(child.children)
            })
        },
        expandChange: function () {
            this.toggleExpand(this.data, this.expandAll)
        },
        toggleExpand: function (data, val) {
            let _this = this
            if (Array.isArray(data)) {
                data.forEach(function (item) {
                    _this.$set(item, 'expand', val)
                    if (item.children) {
                        _this.toggleExpand(item.children, val)
                    }
                })
            } else {
                this.$set(data, 'expand', val)
                if (data.children) {
                    _this.toggleExpand(data.children, val)
                }
            }
        },
        savecanvas () {
            let file
            let canvas = document.querySelector('.tree')
            let t = this
            var blob = new Blob()
            html2canvas(canvas, { scale: 2, logging: false, useCORS: true }).then(function (canvas) {
                // 将base64转换成file对象
                let type = 'png'
                let imgData = canvas.toDataURL(type)
                let arr = imgData.split(',')
                let mime = arr[0].match(/:(.*?);/)[1]
                let suffix = mime.split('/')[1]
                let bstr = atob(arr[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                let blob = new Blob([u8arr], { type: mime })
                let formData = new FormData()
                formData.append('upfile', blob, '组织架构图.png')
                t.uploadFile1(formData)
            })
        },
        saveFile (data, filename) {
            let savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
            savelink.href = data
            savelink.download = filename
            let event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            savelink.dispatchEvent(event)
        },
        uploadFile1 (formData) {
            const t = this
            uploadFile(formData).then(res => {
                for (const key in res.data) {
                    t.filekey = res.data[key]
                    t.thisValue = key
                    t.thisId = key + ':' + res.data[key]
                }
                if (t.filekey) {
                    t.uploadFile2()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        uploadFile2 () {
            const t = this
            let data = {
                _mt: t.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APfilekey: t.filekey,
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.thisValue)
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
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
.option-main {
    position: relative;
    height: 450px;
    margin-top: 30px;
}
.text-center {
    text-align: center;
}
.btn {
    position: absolute;
    bottom: 20px;
    right: 60px;
}
.btn1 {
    position: absolute;
    bottom: 20px;
    right: 124px;
}
.cover .box {
    width: 1200px;
}
.demo-spin-container {
    display: inline-block;
    position: relative;
    border: 1px solid #eee;
}
</style>
<style type="text/css">
.org-tree-node-label {
    white-space: nowrap;
}
.bg-white {
    background-color: white;
}
.bg-orange {
    background-color: orange;
}
.bg-gold {
    background-color: gold;
}
.bg-gray {
    background-color: gray;
}
.bg-lightpink {
    background-color: lightpink;
}
.bg-chocolate {
    background-color: chocolate;
}
.bg-tomato {
    background-color: tomato;
}
.bg-reseda {
    background-color: #2faf98;
}
.bg-green {
    background-color: #3c9664;
}
</style>
