<template>
    <div class="background"
         v-if="modal1">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"
                          style="margin-right: 10px;"></Icon>{{ '批量新增' }}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <span v-for="(item, index) in searchInp"
                      :key="index + 'c'"
                      @dblclick.stop="clear(item.clmLayout, item.id)">
                    <Input v-if="item.clmLayout == 1"
                           v-model="item.name"
                           :placeholder="'请输入'+ item.clmDname"
                           type="text"
                           class="table_search_int"
                           style="width:250px;margin-right:10px" />
                </span>
                <Button style="width:56px"
                        type="info"
                        :loading="isSpinTable"
                        @click="search">
                    <span v-show="!isSpinTable">
                        查询</span>
                </Button>
                <Button style="margin-left:8px"
                        type="primary"
                        @click="save">保存</Button>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Spin fix
                      v-if="isSpin"
                      size="large"></Spin>
                <Spin fix
                      v-if="isSpinTable"
                      size="large"></Spin>
                <Table @on-selection-change="selectedtable"
                       height="320"
                       :no-data-text="noData"
                       size="small"
                       ref="selection"
                       :columns="columns"
                       stripe
                       :data="data"></Table>
            </row>
            <Row type="flex"
                 style="margin-top: 10px">
                <Page :total="total"
                      size="small"
                      show-elevator
                      show-sizer
                      :current='page'
                      :page-size="rows"
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]">
                </Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                <Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="refresh">
                </Button>
            </Row>
        </div>
    </div>

</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy, getUrlKey } from "@/lib/util";
export default {
    data () {
        return {
            loading: false,
            searchField: "",
            btns: [{}],
            modal1: false,
            data: [],
            columns: [],
            noData: '<div id="noData"></div>',
            childTableHeight: 0,
            total: 0,
            page: 1,
            rows: 10,
            isSpin: false,
            isSpinTable: false,
            tableselected: [],
            mainId: "",
            searchInp: [],
            params: {},
            paramsField: {},
            dataSearch:{}
        };
    },
    methods: {
        handleReset () {
            this.dataSearch = {};
            this.searchInp = [];
            this.modal1 = false;
        },
        save () {
            this.loading = true;
            console.log(this.tableselected, "111");
            let data = {};
            this.modal1 = true;
            let arr = this.tableselected.join(",");
            if (this.paramsField.hasOwnProperty("pdinPtodid")) {
                data["pdinPtodid"] = this.mainId;
            }
            if (this.paramsField.hasOwnProperty("odrkRankid")) {
                data["odrkRankid"] = arr;
            }
            if (this.paramsField.hasOwnProperty("pdinBusrid")) {
                data["pdinBusrid"] = arr;
            }
            if (this.paramsField.hasOwnProperty("odrkPtodid")) {
                data["odrkPtodid"] = this.mainId;
            }
            if (this.paramsField.hasOwnProperty("busmBusrid")) {
                data["busmBusrid"] = this.mainId;
            }
            if (this.paramsField.hasOwnProperty("busmMdcode")) {
                data["busmMdcode"] = arr;
            }
            if (this.paramsField.hasOwnProperty("unptDeptid")) {
                data["unptDeptid"] = this.mainId;
            }
            if (this.paramsField.hasOwnProperty("unptPostid")) {
                data["unptPostid"] = arr;
            }
            if (this.paramsField.hasOwnProperty("unitHcityid")) {
                data["unptCityid"] = this.paramsField["unitHcityid"]
                    ? this.paramsField["unitHcityid"]
                    : "";
            }
            if (this.paramsField.hasOwnProperty("unitWcityid")) {
                data["unptWcityid"] = this.paramsField["unitWcityid"]
                    ? this.paramsField["unitWcityid"]
                    : "";
            }
            if (this.paramsField.hasOwnProperty("unitCotcid")) {
                data["unptCotcid"] = this.paramsField["unitCotcid"]
                    ? this.paramsField["unitCotcid"]
                    : "";
            }
            if (this.paramsField.hasOwnProperty("status")) {
                data["status"] = this.paramsField["status"]
                    ? this.paramsField["status"]
                    : "";
            }
            if (this.paramsField.hasOwnProperty("unitSdate")) {
                data["unptSdate"] = this.paramsField["unitSdate"]
                    ? this.paramsField["unitSdate"]
                    : "";
            }
            if (this.paramsField.hasOwnProperty("unptEdate")) {
                data["unptEdate"] = this.paramsField["unptEdate"]
                    ? this.paramsField["unptEdate"]
                    : "";
            }
            data.APlogType = "AllAdd";
            data._mt = this.$global.mt + `${this.paramsField.mt}.addList`;
            getDataLevelUserLoginData(data).then((res) => {
                try {
                    if (isSuccess(res,this)) {
                        this.modal1 = false;
                        this.$emit("refrsh");
                    } else {
                        this.$Modal.error(res.stat.desc);
                    }
                } catch (err) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            });
        },
        search () {
            let dataSearch = {}
            this.searchInp.forEach((e) => {
                if (e.clmName) {
                        dataSearch[e.clmName] = e.name

                } else {
                    delete dataSearch[e.clmName]
                }
                
            })
            this.page = 1;
            this.dataSearch = dataSearch;
            this.initValue();
        },
        cancel () {
            this.modal1 = false;
        },
        sizeChange (val) {
            this.rows = val;
            this.initValue();
        },
        pageChange (val) {
            this.page = val;
            this.initValue();
        },
        refresh () {
            this.page = 1;
            // this.$emit("refrsh");
            this.initValue();
        },
        changeData (data, columns, mainId, searchInp) {
            this.modal1 = true;
            this.data = data;
            this.columns = columns;
            this.mainId = mainId;
            this.searchInp = searchInp;
        },
        initValue () {
            let data = {};
            this.isSpinTable = true;
            if (Object.keys(this.dataSearch).length > 0) {
                data = deepCopy(this.dataSearch)
            }
            data._mt = this.$global.mt + this.params.tableName + ".getPage";
            data.APffk = `glc${this.params.id}`;
            data.APlogType = "getPage";
            data.APsort = "id";
            data.APorder = "desc";
            data.AProws = this.rows;
            data.APpage = this.page;
            // 中南组织架构批量新增
            // if (this.paramsField.mt === "OrgUnitpost") {
            //     data.APsDate = this.$store.state.flowClmkMap.localField.unitSdate
            // }
            getDataLevelUserLoginData(data).then((res) => {
                this.isSpinTable = false;
                try {
                    if (isSuccess(res,this)) {
                        const data = res.data.content[0].rows;
                        this.total = res.data.content[0].records;
                        this.changeData(data, this.columns, this.mainId, this.searchInp);
                    } else {
                    }
                } catch (res) {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                }
            }).catch(() => {
                this.isSpinTable = false;
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            });;
        },
        initData (val, columns, searchInp, mainId, paramsField) {
            this.params = val;
            this.columns = columns;
            for(let v of searchInp){
                v.name = ""
            }
            this.searchInp = searchInp;
            this.mainId = mainId;
            this.paramsField = paramsField;
            this.initValue();
        },
        selectedtable (selection) {
            const newArr = [];
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            this.tableselected = newArr;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/sass/searchTable.scss";
</style>