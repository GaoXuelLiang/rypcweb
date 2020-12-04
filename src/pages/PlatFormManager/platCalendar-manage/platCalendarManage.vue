<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title"
                   style="height: 33px;line-height: 33px;">
                    <Icon type="ios-bookmark"></Icon>{{$t('lang_platform.platCalendar.title1')}}
                    <Button class="lbtn"
                            v-bind:class="{checked: ischecked2}"
                            @click="TransformationMode($event,2)">
                        <Icon type="calendar"></Icon>{{$t('lang_platform.platCalendar.calendartitle')}}
                    </Button>
                    <Button class="lbtn"
                            v-bind:class="{checked: ischecked1}"
                            @click="TransformationMode($event,1)">
                        <Icon type="clipboard"></Icon>{{$t('lang_platform.platCalendar.clipboardtitle')}}
                    </Button>
                </p>
                <!-- table表格 日历-->
                <div v-show="calendarModel1">
                    <Row class="btnHeight">
                        <!-- <Select v-model="year"
                                v
                                style="width: 200px">
                            <Option :value="item"
                                    v-for="(item,index) in selectYearType"
                                    :key="index">{{item}}</Option>
                        </Select> -->
                        <span @dblclick="dblClear">
                            <Input v-model="unitName"
                                class="sInput"
                                placeholder="请选择业务单位"
                                icon="ios-search"
                                :readonly="true"
                                style="width:200px"
                                @on-click="openUnit" />
                        </span>
                        <DatePicker class="sInput" v-model="year" type="year" :placeholder="$t('lang_platform.platCalendar.cYear')" style="width: 200px"></DatePicker>
                        <Select class="sInput" v-model="month"
                                style="width: 200px;">
                            <Option value="01">01</Option>
                            <Option value="02">02</Option>
                            <Option value="03">03</Option>
                            <Option value="04">04</Option>
                            <Option value="05">05</Option>
                            <Option value="06">06</Option>
                            <Option value="07">07</Option>
                            <Option value="08">08</Option>
                            <Option value="09">09</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                        </Select>
                        <!-- <span style="margin: 0;"><Button type="info" class="btn" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button></span> -->
                        <!-- <Button type="primary" class="btn" style="margin-left:5px" @click="openIn($t('button.ini'))">{{$t('button.ini')}}</Button> -->
                        <!-- <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button> -->
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        <btnList @operatorBtn="operatorBtn"
                                 @openUp="btnEvent"
                                 ref="btnList"></btnList>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               size="small"
                               :no-data-text="noDataImg"
                               stripe
                               ref="selection"
                               :columns="columns"
                               :data="data"
                               :height="tableheight-12"></Table>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              size="small"
                              show-elevator
                              show-sizer
                              placement="top"
                              :current="page"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="getData(1)"></Button>
                    </Row>
                </div>

                <!-- 日历 -->
                <div v-show="calendarModel2"
                     class="calendar_table">
                    <Spin size="large" fix v-if="btnLoading"></Spin>
                    <Row class="btnHeight">
                        <Button type="primary"
                                class="brn-mar"
                                :loading="btnLoading"
                                style="width:56px"
                                @click="getCaldearData(1)"><span v-if="!btnLoading">{{$t('lang_platform.platCalendar.lastM')}}</span></Button>
                        <!-- <Select v-model="year"
                                style="width: 200px"
                                @on-change="getCaldearData()">
                            <Option :value="item"
                                    v-for="(item,index) in selectYearType"
                                    :key="index">{{item}}</Option>
                        </Select> -->
                        <DatePicker class="brn-mar" v-model="year" @on-change="selectYear2" type="year" :placeholder="$t('lang_platform.platCalendar.cYear')" style="width: 200px"></DatePicker>
                        <Select class="brn-mar" v-model="month"
                                style="width: 200px"
                                @on-change="getCaldearData()">
                            <Option value="01">01</Option>
                            <Option value="02">02</Option>
                            <Option value="03">03</Option>
                            <Option value="04">04</Option>
                            <Option value="05">05</Option>
                            <Option value="06">06</Option>
                            <Option value="07">07</Option>
                            <Option value="08">08</Option>
                            <Option value="09">09</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                        </Select>
                        <Button type="primary"
                                class="brn-mar"
                                :loading="btnLoading"
                                style="width:56px"
                                @click="getCaldearData(2)"><span v-if="!btnLoading">{{$t('lang_platform.platCalendar.nextM')}}</span></Button>
                        <Button type="warning"
                                class="brn-mar"
                                v-if="AccessControl.toString().includes('button_init')"
                                @click="openIn($t('button.ini'))">{{$t('button.ini')}}</Button>
                        <!-- <span class="unitName">{{unitName}}</span> -->
                    </Row>
                    <Row style="min-width: 1200px;">
                        <Col span="20">
                        <Row class="table_header_box">
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.sun')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.mon')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.tues')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.wed')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.thurs')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.fri')}}</Col>
                            <Col span='3'
                                 class="table_header">{{$t('lang_platform.platCalendar.sat')}}</Col>
                        </Row>
                        <Row class="table_body_box">
                            <Col span="3"
                                 class="table_body"
                                 v-for="(days,index1) in calendar_data"
                                 :key="index1">
                            <!-- 工作日样式 -->
                            <div v-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'"
                                 class="conbox area bgWhite">
                                <div class="day">{{days.calendarDate}}</div>
                                <!-- 法定 -->
                                <p class="LegalDay"
                                   :class="{Legalholiday: days.calendarLegaltype === '03holiday', Legalrest: days.calendarLegaltype === '02weekend'}">
                                    <!-- <img src="../../../../static/img/law1.png"
                                         class="lawicon"
                                         v-if="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                                    <img src="../../../../static/img/law2.png"
                                         class="lawicon"
                                         v-else="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'"> -->
                                    {{days.calendarLegaltypeDis}}<span v-if="days.calendarDesc">（{{days.calendarDesc}}）</span>
                                </p>
                                <!-- 公司定 -->
                                <p :class="{comrest: days.calendarComptype === '02weekend', comholiday: days.calendarComptype === '03holiday'}">
                                    <!-- <Icon type="podium"
                                          size="16"
                                          class="lawicon"></Icon> -->
                                    {{days.calendarComptypeDis}}
                                </p>
                                <div class="edit"
                                     v-if="days.calendarDate"
                                     @click="openUp(days.id, $t('button.y.upd'), index1)">{{$t('button.edi')}}</div>
                            </div>
                            <!-- 休息日、节假日样式 -->
                            <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                                 class="conbox area bgWhite">
                                <div class="day">{{days.calendarDate}}</div>
                                <!-- 法定 -->
                                <p class="LegalDay"
                                   :class="{Legalholiday: days.calendarLegaltype === '03holiday', Legalrest: days.calendarLegaltype === '02weekend'}">
                                    <!-- <img src="../../../../static/img/law1.png"
                                         class="lawicon"
                                         v-if="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'">
                                    <img src="../../../../static/img/law2.png"
                                         class="lawicon"
                                         v-else="days.calendarLegaltype === '02weekend'
                                                                                      || days.calendarLegaltype === '03holiday'"> -->
                                    {{days.calendarLegaltypeDis}}<span v-if="days.calendarDesc">（{{days.calendarDesc}}）</span>
                                </p>
                                <!-- 公司定 -->
                                <p :class="{comrest: days.calendarComptype === '02weekend', comholiday: days.calendarComptype === '03holiday'}">
                                    <!-- <Icon type="podium"
                                          size="16"
                                          class="lawicon"></Icon>{{days.calendarComptypeName}} -->
                                    {{days.calendarComptypeDis}}
                                </p>
                                <div class="edit"
                                     v-if="days.calendarDate"
                                     @click="openUp(days.id, $t('button.y.upd'), index1)">{{$t('button.edi')}}</div>
                            </div>

                            <!-- 没有日期的样式 -->
                            <div v-else="days.calendarComptypeDis"
                                 class="conbox area"></div>
                            </Col>
                        </Row>
                        </Col>
                        <Col span="3"
                             class="tableNote">
                        <!-- <Row class="noteTitle">
                            <Col span="24"
                                 offset="0"><img src="../../../../static/img/law2.png"
                                 class="lawicon">{{$t('lang_platform.platCalendar.legHoliday')}}</Col>
                        </Row>
                        <Row class="noteTitle"
                             style="margin-bottom:20px;">
                            <Col span="24">
                            <Icon type="podium"
                                  color="#5c6b77"
                                  size="18"
                                  class="lawicon"></Icon>{{$t('lang_platform.platCalendar.comHoliday')}}</Col>
                        </Row> -->
                        <Row class="unit">
                            <!-- <Icon type="md-sunny" style="vertical-align:middle" size="20" color="#ff9900"/> -->
                            <span class="unitName">{{unit}}</span>
                        </Row>
                        <Row class="colorOne">
                            <Col span="18"
                                 class="colorOnel">
                            </Col>
                            <Col span="6"
                                 class="colorOner">{{$t('lang_platform.platCalendar.legHoliday')}}</Col>
                        </Row>
                        <Row class="colorFour">
                            <Col span="18"
                                 class="colorFourl">
                            </Col>
                            <Col span="6"
                                 class="colorFourr">{{$t('lang_platform.platCalendar.legRestDay')}}</Col>
                        </Row>
                        <Row class="colorThree">
                            <Col span="18"
                                 class="colorThreel">
                            </Col>
                            <Col span="6"
                                 class="colorThreer">{{$t('lang_platform.platCalendar.comHoliday')}}</Col>
                        </Row>
                        <Row class="colorTwo">
                            <Col span="18"
                                 class="colorTwol">
                            </Col>
                            <Col span="6"
                                 class="colorTwor">{{$t('lang_platform.platCalendar.comRestDay')}}</Col>
                        </Row>
                        </Col>
                    </Row>
                </div>
                <!-- 日历 结束 -->
            </card>
            </Col>

        </Row>

        <!-- 进行修改操作弹出的页面 start -->
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!-- 进行修改操作弹出的页面 end -->

        <!-- 初始化时间页面 start-->
        <transition name="fade">
            <init v-show="openInit"
                  :id="updateId"
                  :logType="logType"
                  @closeUp="closeInit"
                  ref="init"></init>
        </transition>
        <!-- 初始化时间页面 end-->
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <transition name="fade">
            <searchUnit v-show="isUnit" 
                        ref="searchUnit" 
                        @closeUnit="closeUnit" 
                        @changeinput="changeinput"></searchUnit>
        </transition>
    </div>
</template>
<script>
import update from './addNewPlatCalendar'
import init from './initPlatCalendar'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
import searchUnit from "@/components/searchTable/searchUnit"
export default {
    name: 'platCalendar',
    data () {
        return {
            isSpin: false,
            isTbtn: false,
            isUnit: false,
            btnLoading: false,
            noDataImg: '<div id="noData"></div>',
            tableheight: document.body.offsetHeight - 270,
            value: '',
            logType: '',
            unitName: '',
            unitId: '',
            unit: '',
            openUpdate: false,
            openInit: false,
            updateId: NaN,
            selectYearType: [],
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: '业务单位',
                    key: 'unitIdDis',
                    sortable: 'custom'
                },
                {
                    title: this.$t('lang_platform.platCalendar.calendarDate'),
                    key: 'calendarDate',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_platform.platCalendar.calendarLegaltypeName'),
                    key: 'calendarLegaltypeDis',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_platform.platCalendar.calendarComptypeName'),
                    key: 'calendarComptypeDis',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_platform.platCalendar.calendarDesc'),
                    key: 'calendarDesc',
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            calendar_index: 0,
            sort: 'calendarDate',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            year: '',
            month: '',
            calendarModel1: true,  //  表格日历
            ischecked1: true,
            ischecked2: false,
            calendarModel2: false,  //  月份日历
            calendar_data: [], // 日历日期数组
            getBlur1: false,
            getBlur2: false,
            showAdvanced: false,
            AccessControl: [],
            btnArr: []
        }
    },
    computed: {
        
    },
    components: {
        update,
        init,
        advanced,
        btnList,
        searchUnit
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func()
        this.getTime()
        // this.getData(1)
        // console.log(this.year,this.month,"-_-!")
        // this.getSelect()
    },
    destroyed () {
        window.onresize = null;
    },
    methods: {
        // 选择年份
        selectYear2 (year) {
            // console.log(year);
            // const t = this;
            // t.year = year;
            this.getCaldearData()
        },
        // 获取当前时间
        getTime () {
            const t = this
            let date = new Date()
            t.year = date.format('yyyy')
            t.month = date.format('MM')
            // t.getCaldearData()
        },
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            const t = this
            if(!t.unitId) {
                t.$Modal.warning({
                    title: '提示',
                    content: '请选择业务单位'
                })
                return;
            }
            // console.log(typeof(t.year))
            t.isSpin = true
            t.$refs.btnList.loading = true
            if (page) {
                t.page = page
            }
            if(typeof(t.year) === 'object') {
                t.year = (t.year).format('yyyy')
            }
            const data = {
                _mt: this.$global.mt + 'PlatCalendar.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APffk:0,
                APorder: t.order,
                calendarDate: t.year + '-' + t.month,
                unitId: t.unitId
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                t.isSpin = false
                t.$refs.btnList.loading = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    // console.log(t.data)
                    t.total = res.data.content[0].records
                    this.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        // console.log(err)
                    })
                }
            }).catch(() => {
                t.isSpin = false
                t.$refs.btnList.loading = false
                // t.$Modal.error({
                //   title: this.$t('reminder.err'),
                //   content: this.$t('reminder.errormessage'),
                // })
            })
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        // 更新日期
        updateArray (res) {
            const t = this
            if (t.calendarModel1 === true) {
                t.data.splice(t.index, 1, res)
            } else if (t.calendarModel2 === true) {
                if (res.calendarDate.length === 10) {
                    let dayNum = res.calendarDate
                    dayNum = dayNum.slice(8)
                    let newDayNum = parseInt(dayNum, 10)
                    res.calendarDate = newDayNum
                }
                t.calendar_data.splice(t.calendar_index, 1, res)
            }
        },
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : 'primary',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                this.openUp(params.row.id, item.name, params.index)
                            },
                        },
                    }, item.name),
                )
            })
            return arr
        },
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
            // console.log(btnList, '0000000')
        },
        btnEvent (code) {
            switch (code) {
                case 'button_add':
                    this.openUp(NaN, this.$t('button.add'))
                    break;
                case 'button_del':
                    this.deletemsg()
                    break;
                case 'button_export':
                    this.expData()
                    break;
                case 'button_import':
                    this.importExcel()
                    break;
                case 'button_pinyin':
                    this.send()
                    break
                case 'button_init':
                    this.openIn(this.$t('button.ini'))
                    break;
                case 'button_query':
                    this.getData(1)
                    break
            }
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
                this.getSelect()
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
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatCalendar.getList',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectYearType = res.data.content[0].value
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirmdelete'),
                    onOk: () => {
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + 'PlatCalendar.delByIds',
                            APlogType: this.$t('button.del'),
                            APids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                                t.getSelect()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        open () {
            const t = this
            t.opendialog = true
        },
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.calendar_index = index
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        openIn (logType) {
            const t = this
            t.logType = logType
            t.openInit = true
        },
        openUnit () {
            const t = this;
            t.isUnit = true;
            t.$refs.searchUnit.getData();
        },
        closeUnit () {
            const t = this;
            t.isUnit = false;
        },
        changeinput (name,id) {
            const t = this;
            t.unitName = name;
            t.unit = name;
            t.unitId = id;
        },
        dblClear () {
            const t = this;
            t.unitName = '';
            t.unitId = '';
        },
        closeUp () {
            const t = this
            t.openUpdate = false
        },
        closeInit () {
            const t = this
            t.openInit = false
            t.$refs.init.formValidate.sYear = ''
            t.$refs.init.formValidate.eYear = ''
            // t.getData()
            // t.getSelect()
            t.getCaldearData()
        },
        // 工作日历管理 样式转换  start
        TransformationMode (event, num) {
            const t = this
            if (num === 1) {
                t.ischecked1 = true
                t.ischecked2 = false
                t.calendarModel1 = true
                t.calendarModel2 = false
            } else if (num === 2) {
                t.ischecked2 = true
                t.ischecked1 = false
                t.calendarModel2 = true
                t.calendarModel1 = false
                t.getCaldearData()
            }
        },
        // 生成日历
        getCaldearData (preNum) {
            const t = this
            if(!t.unitId) {
                return;
            }
            t.btnLoading = true;
            // console.log(typeof(t.year))
            if(typeof(t.year) === 'object') {
                t.year = (t.year).format('yyyy')
            }
            if (preNum !== null && preNum !== undefined && preNum !== '') {
                if (t.month !== '' && t.year !== '') {
                    let getNum = preNum
                    let changeMonth = Number(t.month)
                    let changeYear = t.year
                    if (getNum === 1) { //  上个月
                        if (changeMonth <= 1) {
                            changeMonth = 12
                            changeYear--
                            // for (let i = 0; i < t.selectYearType.length; i++) {
                            //     if (changeYear === t.selectYearType[i]) {
                            //         if (i - 1 >= 0) {
                            //             changeYear = t.selectYearType[i - 1]
                            //         } else {
                            //             changeYear = t.selectYearType[t.selectYearType.length - 1]
                            //             break
                            //         }
                            //     }
                            // }
                        } else {
                            changeMonth--
                        }
                    } else if (getNum === 2) { //  下个月
                        if (changeMonth >= 12) {
                            changeMonth = '1'
                            changeYear++
                            // for (let i = 0; i < t.selectYearType.length; i++) {
                            //     if (changeYear === t.selectYearType[i]) {
                            //         if (i + 1 <= t.selectYearType.length - 1) {
                            //             changeYear = t.selectYearType[i + 1]
                            //             break
                            //         } else {
                            //             changeYear = t.selectYearType[0]
                            //         }
                            //     }
                            // }
                        } else {
                            changeMonth++
                        }
                    }
                    if (changeMonth < 10) {
                        changeMonth = '0' + changeMonth.toString()
                    }
                    t.month = changeMonth.toString()
                    t.year = changeYear.toString()
                } else {
                    t.$Modal.warning({
                        title: this.$t('reminder.err'),
                        content: this.$t('lang_platform.platCalendar.errReminder'),
                    })
                }
            }
            const data = {
                _mt: this.$global.mt + 'PlatCalendar.getPage',
                AProws: '31',
                APpage: '1',
                APsort: 'calendarDate',
                APorder: 'asc',
                APffk:0,
                calendarDate: t.year + '-' + t.month,
                unitId: t.unitId
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.calendar_data = res.data.content[0].rows
                    // console.log(t.calendar_data)
                    if (t.calendar_data && t.calendar_data.length) {
                        let firstWeek = t.calendar_data[0].calendarWeek //  得到第一天是星期几
                        // t.calendar_data.calendarDate = newDayNum           //  处理后的日期
                        // 删掉数组中的空值
                        for (let dat in t.calendar_data) {
                            if (data[dat] === '') {
                                delete data[dat]
                            }
                        }
                        // 向前边追加空值
                        for (let i = firstWeek; i > 1; i--) {
                            t.calendar_data.unshift('')
                        }
                        // 向后边追加空值，显示整个日历
                        for (let j = t.calendar_data.length; j < 35; j++) {
                            t.calendar_data.push('')
                        }
                        // 工作日和节假日添加不同的颜色
                        for (let k = 0; k < t.calendar_data.length; k++) {
                            if (t.calendar_data[k] !== '') {
                                t.getBlur1 = false
                            }
                        }
                        t.toNum()
                    }
                }
                t.btnLoading = false;
            }).catch(() => {
                t.btnLoading = false;
                // t.$Modal.error({
                //   title: this.$t('reminder.err'),
                //   content: this.$t('reminder.errormessage'),
                // })
            })
        },

        // 生成日历-----------------------------------------------------------
        //  循环修改日期
        toNum () {
            const t = this
            t.calendar_data.forEach((item, index) => {
                if (item.calendarDate && item.calendarDate.length === 10) {
                    let dayNum = item.calendarDate
                    if (dayNum) {
                        dayNum = dayNum.slice(8)
                        let newDayNum = parseInt(dayNum, 10)
                        item.calendarDate = newDayNum
                    }
                }
            })
        },
        // 工作日历管理 样式转换  end-----------------------------------------
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.table_header_box,
.table_body_box {
    width: 100%;
}
.table_header,
.table_body {
    width: 14.28%;
}
.area {
    // padding: 5px;
    font-size: 12px;
}
.table_header_box {
    margin-top: 10px;
    border-radius: 5px 5px 0 0;
}
.table_header {
    background-color: #2d8cf0;
    color: #ffffff;
    line-height: 40px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    // border-right: 1px solid #dddddd;
}
.table_body_box {
    border-left: 1px solid #dddddd;
    max-height: 665px;
    overflow-y: auto;
}
.table_body {
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background-color: #ffff;
    padding: 6px 10px 10px;
}
.table_body p {
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin-bottom: 6px;
    font-size: 14px;
    width: 144px;
}
.conbox {
    position: relative;
    height: 116px;
    text-align: -webkit-center;
    // padding-top: 25px;
}
.edit {
    // position: absolute;
    // right: 6px;
    // bottom: 0px;
    // color: #2d8cf0;
    // cursor: pointer;
    width: 58px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border: 1px solid rgba(45, 140, 240, 1);
    border-radius: 4px;
    cursor: pointer;
    color: #2d8cf0;
    position: absolute;
    right: 0;
}
.unit {
    height: 40px;
    line-height: 40px;
}
.unitName {
    font-size: 14px;
    color: #1c2438;
    font-weight: 700;
    vertical-align: middle;
}
// .bgWhite {
//     background-color: #ffffff;
// }
.bgFeedd3 {
    background-color: #feedd3;
}
.btnHeight {
    font-size: 0;
    .sInput {
        margin-right: 10px;
        font-size: 12px;
        vertical-align: middle;
    }
}
.lbtn {
    margin-left: 10px;
    background-color: #2d8cf0;
    color: #fff;
    border: none;
    float: right;
}
/deep/ .ivu-card-head .lbtn:hover {
    color: #fff !important;
}
.lbtn i {
    font-size: 14px;
    margin-right: 5px;
}
.checked {
    background-color: #18be6a;
}
.Legalholiday,
.Legalrest,
.comholiday,
.comrest {
    color: #fff;
    border-radius: 4px;
}
.Legalholiday {
    background-color: #49cc8a;
}
.day {
    // position: absolute;
    // right: 0;
    // top: 0;
    // padding-right: 10px;
    font-size: 28px;
    // font-weight: bold;
    text-align: center;
}
.tableNote {
    // width: 100px;
    padding-top: 9px;
    margin-left: 20px;
    // margin-top: 40px;
}
.noteTitle {
    margin: 5px 0;
}
.noteTitle col {
    font-weight: bold;
}
.lawicon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: middle;
    margin-top: -5px;
}
.colorOne,
.colorTwo,
.colorThree,
.colorFour {
    width: 100px;
    margin-bottom: 10px;
}
.colorOnel,
.colorTwol,
.colorThreel,
.colorFourl {
    background-color: #49cc8a;
    width: 15px;
    height: 15px;
}
.colorOner,
.colorTwor,
.colorThreer,
.colorFourr {
    width: 85px;
    text-align: left;
    font-size: 14px;
    padding-left: 12px;
    line-height: 15px;
    color: #49cc8a;
}
.colorTwol,
.comrest {
    background-color: #b58cde;
}
.colorThreel,
.comholiday {
    background-color: #ffae00;
}
.colorFourl,
.Legalrest {
    background-color: #699efd;
}
.colorTwor {
    color: #b58cde;
}
.colorThreer {
    color: #ffae00;
}
.colorFourr {
    color: #699efd;
}
.LegalDay {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
}
.brn-mar {
    font-size: 12px;
    vertical-align: middle;
    margin-right: 10px;
}
.calendar_table {
    height: 749px;
}
@media screen and (min-height: 1000px) {
    .conbox {
        position: relative;
        height: 145px;
        text-align: -webkit-center;
        // padding-top: 25px;
    }
    .table_body p {
        text-align: center;
        height: 20px;
        line-height: 20px;
        margin-bottom: 20px;
        font-size: 14px;
        width: 144px;
    }
    .calendar_table {
        height: auto;
    }
    .table_body_box {
        border-left: 1px solid #dddddd;
        max-height: 810px;
        overflow-y: auto;
    }
}
@media screen and (max-width: 1367px) {
    .table_body div {
        height: 76px;
    }
    .conbox {
        padding-top: 19px;
    }
    .table_body p {
        line-height: 20px;
        margin-bottom: 2px;
    }
    .day {
        font-size: 14px;
    }
    .edit {
        bottom: -1px;
    }
}
// .ivu-select {
//     margin-right: 5px;
// }
</style>
