<!--
 * @Author: guwenjiang
 * @Date: 2020-11-20 23:02:43
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-21 10:49:54
-->

<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark" size="16"></Icon>&nbsp;提报单号
                </div>
                <Button type="text"  @click="close(0)">
                    <Icon type="md-close" size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input placeholder="请输入提报单号" style="width: 200px" v-model="proOddnum"/>
                <span style="margin: 0 0 0 10px;">
                    <Button type="primary" style="width: 56px" :loading="isSpin" @click="getData(1)">
                        <span v-if="!isSpin">{{$t('button.ser')}}</span>
                    </Button>
                </span>
                <span style="margin: 0 0 0 10px;">
                    <Button type="primary" style="width: 56px" :loading="loading" @click="confirm">
                        <span v-if="!loading">{{upTypeDis}}</span>
                    </Button>
                </span>
            </Row>
            <row class="table-form" ref="table-form">
                <Spin   fix
                        v-if="isSpin"
                        size="large"></Spin>
                <Table  height="320" 
                        size="small"
                        ref="selection" 
                        :columns="searchCloumns" 
                        @on-sort-change="sortable"
                        @on-selection-change="selectedtable" 
                        :data="data" 
                        stripe ></Table>
            </row>
            <Row style="display: flex">
                <Page   :total="total" 
                        :current="params.APpage" 
                        size="small" 
                        show-elevator 
                        show-sizer 
                        placement="top"
                        @on-page-size-change="sizeChange" 
                        @on-change="pageChange"
                        :page-size-opts = "[10, 20, 50, 100]" ></Page>
                <span style="margin-left: 10px;margin-top: 2px"> 
                    {{$t('reminder.view')}} 
                    {{((params.APpage - 1) * params.AProws + 1)}} - 
                    {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  
                    {{$t('reminder.of')}}  
                    <span>{{total}}</span>
                </span>
            </Row>
        </div>
    </div>
</template>
<script>
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess, deepCopy } from '@/lib/util'

  export default{
    data() {
        return {
            isSpin: false,
            loading: false,
            data: [],
            total: NaN,
            proOddnum: '',
            tableselected: [],
            oddNumselected: [],
            searchCloumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '提报单号',
                    key: 'proOddnum',
                    sortable: 'custom',
                }
            ],
            params: {
                _mt:  this.$global.mt + 'PaysMaperiodicPro.getPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: 10,
                APpage: 1,
                APlogType: this.$t('button.ser'),
                APffk: 0,
                status: '02staysubmission'
            },
        }
    },
    props: {
        upType: String,
        upTypeDis: String,
        searchInp: Array
    },
    mounted() {
    },
    methods: {
        getData(page) {
            const t = this;
            t.isSpin = true;
            const data = deepCopy(this.params);
            if(page) {
                data.APpage = page;
            }
            t.searchInp.forEach((e) => {
                if (e.id) {
                    data[e.clmName] = e.id
                }else {
                    if(e.name) {
                        data[e.clmName] = e.name
                    }else {
                        delete data[e.clmName]
                    }
                }
            })
            if(t.proOddnum) {
                data.proOddnum = t.proOddnum;
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows;
                    t.total = res.data.content[0].records;
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false;
            })
        },
        close(n) {
            this.proOddnum = ''
            this.params.APpage = 1
            this.$emit('closeUp', n)
        },
        confirm () {
            const t = this;
            const data = {}
            t.loading = true;
            if(t.tableselected.length === 0) {
                t.loading = false;
                t.$Modal.warning({
                    title: '警告',
                    content: '请先选择提报单号'
                })
                return;
            }
            t.$Modal.confirm({
                title: '提示',
                content: `确定将单号${t.oddNumselected.toString()}的提报进行${t.upTypeDis}吗？`,
                onOk: () => {
                    data._mt = t.$global.mt + 'PaysMaperiodicPro.stateUpdate';
                    data.APlogType = t.upTypeDis;
                    data.APupType = t.upType;
                    data.APids = t.tableselected.toString()
                    getDataLevelUserLoginData(data).then(res => {
                        if(isSuccess(res, t)) {
                            if(res.data.content[0].value === 1) {
                                this.$Message.success({
                                    content: `${t.upTypeDis}成功`,
                                    closable: true
                                })
                                t.close(1)
                            }else {
                                this.$Message.error({
                                    content: `${t.upTypeDis}失败`,
                                    closable: true
                                })
                            }
                        }
                    }).catch(() => {
                    }).finally(() => {
                        t.loading = false;
                    })
                },
                onCancel: () => {
                    t.loading = false;
                }
            })
        },
        //table勾选项
        selectedtable (selection) {
            const newArr = [];
            const oddArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
                oddArr.push(selection[i].proOddnum)
            }
            this.tableselected = newArr;
            this.oddNumselected = oddArr;
        },
        sizeChange(size) {
            const t = this
            t.params.AProws = size
            t.getData()
        },
        pageChange(page) {
            const t = this
            t.params.APpage = page
            t.getData()
        },
        clear() {
            this.cityName = ''
            this.params.APpage = 1
            this.$emit('closeUp')
        },
        sortable(column) {
            this.params.APsort = column.key
            this.params.APorder = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.params.APorder = 'desc'
            }
        },
    },
  }
</script>
<style lang="scss" scoped>
@import "~@/sass/searchTable";
</style>
