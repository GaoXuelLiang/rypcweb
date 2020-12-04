<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{title}}
                </div>
                <Button type="text"  @click="close">
                    <Icon type="md-close" size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <Input :placeholder="'请输入' + title" style="width: 200px" v-model="cityName"/>
                <span style="margin: 0 0 0 10px;">
                    <Button type="primary" style="width: 56px" :loading="isSpin" @click="getData(1)">
                        <span v-if="!isSpin">{{$t('button.ser')}}</span>
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
                        :data="data" 
                        stripe 
                        @on-row-dblclick="dbCkick"></Table>
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
            data: [],
            total: NaN,
            cityName: '',
            searchCloumns: [
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeDis',
                    sortable: 'custom',
                },
            ],
            params: {
                _mt:  this.$global.mt + 'BaseCity.getPage',
                APsort: 'id',
                APorder: 'desc',
                AProws: 10,
                APpage: 1,
                APlogType: this.$t('button.ser'),
                APffk: 0,
                cityType: '02city',
            },
        }
    },
    props: {
        title: String
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
            if(t.cityName) {
                data.cityName = t.cityName;
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
        close() {
            this.cityName = ''
            this.params.APpage = 1
            this.$emit('closeUp')
        },
        dbCkick(row) {
            const t = this
            if(t.title === '社保缴纳地') {
                t.$emit('changeinputSec', row)
            }else if (t.title === '报税地') {
                t.$emit('changeinputTax', row)
            }else if (t.title === '工作地') {
                t.$emit('changeinputWork', row)
            }
            t.close()
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
@import "../../sass/searchTable";
</style>
