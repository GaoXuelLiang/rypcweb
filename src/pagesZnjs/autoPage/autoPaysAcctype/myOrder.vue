<template>
    <div class="cover">
        <div class="box"
             style="width: 460px">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    排序
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row>
                <Col span="20">
                <div class="order">
                    <div class="order-head">
                        <Checkbox :value="checkAll"
                                  @click.prevent.native="handleCheckAll">源列表</Checkbox>
                        <span><span>{{checkAllGroup.length}}/</span>{{data.length}}</span>
                    </div>
                    <div class="order-body">
                        <CheckboxGroup v-model="checkAllGroup"
                                       @on-change="checkAllGroupChange">
                            <Checkbox v-for="(item,index) in data"
                                      :key="item.id"
                                      :label="item.id">{{item[showName]}}</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
                </Col>
                <Col span="3"
                     offset="1"
                     class="moveBtn">
                <Row type="flex"
                     justify="end">
                    <Button class="upmoveBtn"
                            type="primary"
                            @click="upTop">
                        置顶
                    </Button>
                </Row>
                <Row type="flex"
                     justify="end">
                    <Button class="upmoveBtn"
                            type="primary"
                            @click="upMove">
                        <Icon type="ios-arrow-up" />
                    </Button>
                </Row>
                <Row type="flex"
                     justify="end">
                    <Button class="downmoveBtn"
                            type="primary"
                            @click="downMove">
                        <Icon type="ios-arrow-down" />
                    </Button>
                </Row>
                <Row type="flex"
                     justify="end">
                    <Button class="upmoveBtn"
                            type="primary"
                            @click="downEnd">
                       置底
                    </Button>
                </Row>
                </Col>
            </Row>
            <div :style="{float: 'right', marginTop: '20px', marginBottom: '20px',fontSize:'0'}">
                <Button @click="close"
                        style="margin-right: 10px">{{$t('button.cal')}}</Button>
                <Button type="primary"
                        @click="save">{{$t('button.sav')}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess } from '@/lib/util'

export default {
    data () {
        return {
            data: [],
            checkAllGroup: [],
            checkAll: false,
            rows: 0,
            page: 1,
            sort: 'id',
            order: 'asc',
            dom: null
        }
    },
    props: {
        showName: String,
        tbName: String
    },
    computed: {
        orderIds: {
            get: function () {
                let ids = [];
                this.data.forEach(item => {
                    ids.push(item.id)
                })
                return ids;
            }
        }
    },
    methods: {
        getData (dom) {
            const t = this;
            t.dom = dom;
            let data = {};
            data._mt = t.$global.mt + dom.tbName + '.getPage';//PlatSformfield:表单字段 sort：sffOrder；GenColumn：字段配置 sort:orderBy;
            // switch(dom.tbName){
            //     case 'PlatSformfield':
            //         data.APsort = 'sffOrder';
            //         break;
            //     case 'GenColumn':
            //         data.APsort = 'orderBy';
            //         break;
            // }
            data.APsort = 'id';
            data.APlogType = 'getPage',
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APffk = `glc${dom.funId}`;
            data[dom.sformParentfield] = dom.mainId
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    res.data.content[0].rows.forEach(item => {
                        item.swatch = false
                    })
                    t.data = res.data.content[0].rows
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
            })
        },
        handleCheckAll () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                for (let i = 0; i < this.data.length; i++) {
                    this.checkAllGroup.push(this.data[i].id)
                }
            } else {
                this.checkAllGroup = [];
            }
        },
        checkAllGroupChange (data) {
            // console.log(data, 'adaaaa')
        },
        upTop(){
            const t = this;
            let selectArr = t.checkAllGroup;
            let data = t.data;
            for (let i = data.length - 1; i > -1; i--) {
                for (let j = 0; j < selectArr.length; j++) {
                    if (data[i].id === selectArr[j]) {
                        if (i > data.length - 1) {
                            break;
                        }
                        
                        let tempOption = this.data[j];
                        this.$set(this.data, j, this.data[i]);
                        this.$set(this.data, i, tempOption)
                    }
                }
            }
        },
        downMove (val) {
            const t = this;
            let selectArr = t.checkAllGroup;
            let data = t.data;
            for (let i = data.length - 1; i > -1; i--) {
                for (let j = 0; j < selectArr.length; j++) {
                    if (data[i].id === selectArr[j]) {
                        if (i > data.length - 2) {
                            break;
                        }
                        let tempOption = this.data[i + 1];
                        this.$set(this.data, i + 1, this.data[i]);
                        this.$set(this.data, i, tempOption)
                    }
                }
            }
            // console.log(this.orderIds)
        },
        upMove () {
            const t = this;
            let selectArr = t.checkAllGroup;
            let data = t.data;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < selectArr.length; j++) {
                    if (data[i].id === selectArr[j]) {
                        if (i < 1) {
                            break;
                        }
                        let tempOption = this.data[i - 1];
                        this.$set(this.data, i - 1, this.data[i]);
                        this.$set(this.data, i, tempOption)
                    }
                }
            }
            // console.log(this.orderIds)
        },
        downEnd(){
            const t = this;
            let selectArr = t.checkAllGroup;
            let data = t.data;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < selectArr.length; j++) {
                    if (data[i].id === selectArr[j]) {
                        let tempOption = this.data[data.length-(j+1)];
                        this.$set(this.data, data.length-(j+1), this.data[i]);
                        this.$set(this.data, i, tempOption)
                    }
                }
            }
        },
        save () {
            const t = this;
            getDataLevelUserLoginData({
                _mt: t.$global.mt + t.dom['tbName'] + '.changeOrder',
                APlogType:'调整顺序',
                APfunId:t.dom.funId,
                proSalid : t.orderIds.toString()
                //proSalid : ''
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res)
                    t.$emit('getData')
                    t.close()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.data = [];
            this.checkAllGroup = [];
            this.checkAll = false;
            this.$emit('closeOrder')
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.moveBtn {
    .ivu-row-flex {
        margin-bottom: 10px;
    }
}
.downmoveBtn{
    width: 54px;
}
.upmoveBtn{
      width: 54px;
}
.order-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #f9fafc;
    color: #515a6e;
    border: 1px solid #dcdee2;
    border-bottom: 1px solid #e8eaec;
    border-radius: 6px 6px 0 0;
}
.order-body {
    border: 1px solid #dcdee2;
    border-top: none;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
}
/deep/ .ivu-checkbox-group {
    height: 300px;
    overflow: auto;
    scrollbar-width: thin;
}
/deep/ .ivu-checkbox {
    margin-right: 15px;
}
/deep/ .ivu-checkbox-group-item {
    display: block;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 14px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
}
</style>
