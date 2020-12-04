<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"                   
                               fix
                               v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <div ref="scrollBox"
                         style="max-height: 420px;overflow-y: auto;">
                        <Form ref="formValidate"
                              :model="formValidate"
                              :rules="ruleValidate"
                              label-position="right"
                              :label-width="120">
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffOrder')"
                                          prop="sffOrder">
                                    <Input v-model="formValidate.sffOrder"
                                           :placeholder="$t('lang_sysform.formField.p_sffOrder')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffPhyfield')"
                                          prop="sffPhyfield">
                                    <span @dblclick="clearSffPhyfield">
                                        <Input v-model="formValidate.sffPhyfield"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_sysform.formField.p_sffPhyfield')"
                                               @on-click="pickData('sffPhyfield')"></Input>
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffFieldNameCnDis')"
                                          prop="sffFieldNameCnDis">
                                    <Input v-model="formValidate.sffFieldNameCnDis"
                                           disabled
                                           :placeholder="$t('lang_sysform.formField.p_sffFieldNameCnDis')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffFieldNameEnDis')"
                                          prop="sffFieldNameEnDis">
                                    <Input v-model="formValidate.sffFieldNameEnDis"
                                           disabled
                                           :placeholder="$t('lang_sysform.formField.p_sffFieldNameEnDis')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffType')"
                                          prop="sffType">
                                    <Select v-model="formValidate.sffType">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in fieldphyTypeOption"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffIsvalid')"
                                          prop="sffIsvalid">
                                    <RadioGroup v-model="formValidate.sffIsvalid"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffLayout')"
                                          prop="sffLayout">
                                    <Select v-model="formValidate.sffLayout"
                                            @on-change="setLayOut"
                                            :placeholder="$t('lang_sysform.formField.p_sffLayout')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in layOutOption"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffProperty')"
                                          prop="sffProperty">
                                    <Select v-model="formValidate.sffProperty"
                                            :placeholder="$t('lang_sysform.formField.p_sffProperty')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in fieldprop"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show="formValidate.sffLayout === 'p_layout_9999'">
                                <FormItem :label="$t('lang_sysform.formField.sffCustomrouter')"
                                          prop="sffCustomrouter">
                                    <Input v-model="formValidate.sffCustomrouter"
                                           :placeholder="$t('lang_sysform.formField.sffCustomrouter')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffFilter')"
                                          prop="sffFilter">
                                    <Input v-model="formValidate.sffFilter"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.p_sffFilter')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffCascadeget')"
                                          prop="sffCascadeget">
                                    <Input v-model="formValidate.sffCascadeget"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.p_sffCascadeget')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffIsupdate')"
                                          prop="sffIsupdate">
                                    <RadioGroup v-model="formValidate.sffIsupdate"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffDisdefault')"
                                          prop="sffDisdefault">
                                    <RadioGroup v-model="formValidate.sffDisdefault"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show=" layOutValue === 'p_layout_02' ">
                                <FormItem :label="$t('lang_sysform.formField.sffLength')">
                                    <Input v-model="formValidate.sffLength"
                                           :placeholder="$t('lang_sysform.formField.p_sffLength')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show=" layOutValue === 'p_layout_02' ">
                                <FormItem :label="$t('lang_sysform.formField.sffPrecision')">
                                    <Input v-model="formValidate.sffPrecision"
                                           :placeholder="$t('lang_sysform.formField.p_sffPrecision')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffSelopt')"
                                          prop="sffSelopt">
                                    <Select v-model="formValidate.sffSelopt"
                                            @on-change="showAnysffSelopt"
                                            :placeholder="$t('lang_sysform.formField.p_sffSelopt')">
                                        <Option :value="item.paramCode"
                                                v-for="(item,index) in fieldChType"
                                                :key="index">{{item.paramInfoCn}}</Option>
                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show="formValidate.sffSelopt === '02system' ? true:false">
                                <FormItem :label="$t('lang_sysform.formField.sffSysoptDis')">
                                    <span @dblclick="clearSelect">
                                        <Input v-model="sffSysoptDis"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_sysform.formField.p_sffSysoptDis')"
                                               @on-click="pickData" />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show="formValidate.sffSelopt === '04customer' ? true:false">
                                <FormItem :label="$t('lang_sysform.formField.sffCustoptshow')">
                                    <Input v-model="sffCustoptshow"
                                           :placeholder="$t('lang_sysform.formField.p_sffCustoptshow')"
                                           readonly
                                           @on-click="openEditFiel"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffDefault')">
                                    <Input v-model="formValidate.sffDefault"
                                           :placeholder="$t('lang_sysform.formField.p_sffDefault')"></Input>
                                </FormItem>
                            </i-col>
                            <!-- <i-col span="21" offset="1"></i-col> -->
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffIslist')"
                                          prop="sffIslist">
                                    <RadioGroup v-model="formValidate.sffIslist"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffComplexsearch')"
                                          prop="sffComplexsearch">
                                    <RadioGroup v-model="formValidate.sffComplexsearch"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffQuicksearche')"
                                          prop="sffQuicksearche">
                                    <RadioGroup v-model="formValidate.sffQuicksearche"
                                                type="button"
                                                size="small">
                                        <Radio :label="item.paramCode"
                                               v-for="(item,index) in yerOrNoOption"
                                               :key="index">{{item.paramInfoCn}}</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </i-col>
                            <!-- <i-col span="10" offset="1">
                        <FormItem :label="$t('lang_sysform.formField.sffIsexport')"
                                  prop="sffIsexport">
                            <RadioGroup v-model="formValidate.sffIsexport">
                                <Radio :label="item.paramCode"
                                       v-for="(item,index) in yerOrNoOption"
                                       :key="index">{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </i-col> -->
                            <i-col span="21"
                                   offset="1"
                                   v-show=" layOutValue === 'p_layout_71' ">
                                <FormItem :label="$t('lang_sysform.formField.sffUpdformat')">
                                    <CheckboxGroup v-model="formValidate.sffUpdformat">
                                        <Checkbox :label="item.paramCode"
                                                  v-for="(item,index) in updfileformat"
                                                  :key="index">{{item.paramInfoCn}}</Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show="layOutValue === 'p_layout_71' ">
                                <FormItem :label="$t('lang_sysform.formField.sffLowersize')">
                                    <Input v-model="formValidate.sffLowersize"
                                           :placeholder="$t('lang_sysform.formField.p_sffLowersize')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset="1"
                                   v-show=" layOutValue === 'p_layout_71' ">
                                <FormItem :label="$t('lang_sysform.formField.sffUppersize')">
                                    <Input v-model="formValidate.sffUppersize"
                                           :placeholder="$t('lang_sysform.formField.p_sffUppersize')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="10"
                                   offset='1'
                                   v-show="formValidate.sffSelopt === '03dict' ">
                                <FormItem :label="$t('lang_sysform.sysForm.sffLexical')"
                                          prop="sffLexical">
                                    <!-- <Input v-model="formValidate.sformTbname" :placeholder="$t('lang_sysform.sysForm.p_sformTbname')"></Input> -->
                                    <span @dblclick="clearSffLexical">
                                        <Input v-model="formValidate.sffLexical"
                                               icon="ios-search"
                                               :readonly="true"
                                               :placeholder="$t('lang_sysform.sysForm.p_sffLexical')"
                                               @on-click="pickSffLexical" />
                                    </span>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffDesc')">
                                    <Input v-model="formValidate.sffDesc"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.p_sffDesc')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffSetvalue')">
                                    <Input v-model="formValidate.sffSetvalue"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.p_sffSetvalue')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.sffDislogic')">
                                    <Input v-model="formValidate.sffDislogic"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.p_sffDislogic')"></Input>
                                </FormItem>
                            </i-col>
                            <i-col span="21"
                                   offset="1">
                                <FormItem :label="$t('lang_sysform.formField.comment')"
                                          class="last-item">
                                    <Input v-model="formValidate.comment"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="$t('lang_sysform.formField.comment')"></Input>
                                </FormItem>
                            </i-col>
                        </Form>
                    </div>
                </Row>
            </div>
            <!--<Button style="margin-left: 8px">{{$t('button.cal')}}</Button>-->
            <Row class="row">
                <i-col span="21"
                       offset="1">
                    <Row type="flex"
                     justify="end"
                     class="btnSize1">
                        <Button @click="close">{{$t('button.cal')}}</Button>
                        <Button type="primary"
                                @click="save">{{$t('button.sav')}}</Button>
                    </Row>
                </i-col>
            </Row>
        </div>
        <editFiel v-show="showEditFiel"
                  @close="hidEditFiel"
                  @setsffCustopt="setsffCustopt"></editFiel>
        <transition name="fade">
            <searchZHAndEn v-show="openPick0"
                           :searchText1="searchText01"
                           :searchText2="searchText02"
                           :searchTitle="searchTitle0"
                           :searchCloumns="searchCloumns0"
                           :params="params0"
                           @closeUp="closeTable"
                           @changeinput="changeinput0"
                           ref="searchZHAndEn"></searchZHAndEn>
        </transition>
        <transition name="fade">
            <sffSysoptTable v-show="openPick"
                            :searchText="searchText"
                            :searchTitle="searchTitle"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="closeTable"
                            @changeinput="changeinput"
                            ref="sffSysoptTable"></sffSysoptTable>
        </transition>
        <!-- 字典类型 -->
        <transition name="fade">
            <searchTableSffLexical v-show="openTableSffLexical"
                                   @closeUp="closeSffLexical"
                                   @changeinput="changeTableSffLexical"
                                   @clear="clear"
                                   ref="searchTableSffLexical"></searchTableSffLexical>
        </transition>
    </div>
</template>
<script>
import editFiel from './editFiel'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import searchZHAndEn from '../../../components/searchTable/searchZHAndEn'
import sffSysoptTable from '../../../components/searchTable/sffSysoptTable'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchTableSffLexical from '../../../components/searchTable/searchTableSffLexical'
export default {
    data () {
        return {
            openTableSffLexical: false,
            spinShow: false,
            showSffSelopt: '0',
            showEditFiel: false,
            value4: '',
            yerOrNoOption: [],
            fieldphyTypeOption: [],
            layOutOption: [],
            fieldChType: [],
            updfileformat: [],
            fieldprop: [],
            fieldType: '',
            //      自定义选项配置显示字段
            sffCustoptshow: '',
            openPick0: false,
            openPick: false,
            sffSysoptDis: '',
            sffTypeDis: '',
            sffLayoutDis: '',
            sffSeloptDis: '',
            sffIsvalidDis: '',
            sffQuicksearcheDis: '',
            // sffIsexportDis:'',
            sffComplexsearchDis: '',
            sffCustoptDis: '',
            sffIslistDis: '',
            sffIsupdateDis: '',
            sffDisdefaultDis: '',
            sffPropertyDis: '',
            // layOut控制字段
            layOutValue: '',
            formValidate: {
                _mt: this.$global.mt + 'PlatSformfield.addOrUpd',
                sffOrder: '',
                sffPhyfield: '',
                sffFieldNameCnDis: '',
                sffFieldNameEnDis: '',
                sffLayout: '',
                sffIsvalid: '1',
                sffType: '',
                sffLength: '',
                sffSysopt: '',
                sffCustomrouter: '',
                sffSelopt: '01none',
                sffComplexsearch: '0',
                sffQuicksearche: '0',
                // sffIsexport:'1',
                sffCustoptDis: '',
                sffDefault: '',
                sffPrecision: '',
                sffUpdformat: [],
                sffUppersize: '',
                sffLowersize: '',
                sffSetvalue: '',
                sffDislogic: '',
                sffIslist: '0',
                sffProperty: '',
                sffPropertyDis: '',
                sffIsupdate: '1',
                sffDisdefault: '1',
                comment: '',
                funId: '1',
                logType: '',
                isSffCustoptUpd: '0',
                sffDesc: '',
                sffFilter: '',
                sffCascadeget: '',
                // 字典类型
                sffLexical: ''
            },
            ruleValidate: {
                sffOrder: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffOrder'), trigger: 'blur' },
                ],
                sffPhyfield: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffPhyfield'), trigger: 'blur' },
                ],
                sffFieldNameCnDis: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffFieldNameCnDis'), trigger: 'blur' },
                ],
                sffFieldNameEnDis: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffFieldNameEnDis'), trigger: 'blur' },
                ],
                sffIsvalid: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffIsvalid'), trigger: 'blur' },
                ],
                sffLayout: [
                    { required: true, message: this.$t('lang_sysform.formField.rule_sffLayout'), trigger: 'blur' },
                ],
            },
            searchCloumns0: [
                {
                    title: this.$t('lang_sysform.promCloumns.lanCode'),
                    key: 'lanCode',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanCn'),
                    key: 'lanCn',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanEn'),
                    key: 'lanEn',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchCloumns: [
                {
                    title: this.$t('lang_sysform.formField.selCode'),
                    key: 'selCode',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.formField.selMark'),
                    key: 'selMark',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.formField.selName'),
                    key: 'selName',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchTitle0: this.$t('lang_sysform.promCloumns.title'),
            searchText01: this.$t('lang_sysform.promCloumns.searchText2'),
            searchText02: this.$t('lang_sysform.promCloumns.searchText3'),
            searchTitle: this.$t('lang_sysform.formField.searchTitle'),
            searchText: this.$t('lang_sysform.formField.searchText'),
            params0: {
                _mt: this.$global.mt + 'BaseLang.getPage',
                sort: 'lanCode',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            params: {
                _mt: this.$global.mt + 'PlatSelectDefine.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
        }
    },
    props: {
        logType: String,
    },
    components: {
        editFiel,
        sffSysoptTable,
        searchZHAndEn,
        searchTableSffLexical
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        // 选择字典类型
        pickSffLexical () {
            const t = this
            t.openTableSffLexical = true
            t.$refs.searchTableSffLexical.getData()
        },
        clearSffLexical () {
            const t = this
            t.formValidate.sffLexical = ''
        },
        changeTableSffLexical (code, name) {
            const t = this
            t.formValidate.sffLexical = code
        },
        closeSffLexical () {
            const t = this
            t.openTableSffLexical = false
        },
        showAnysffSelopt (value) {
            // debugger
            if (this.formValidate.sffSelopt === '02system') {
                this.showSffSelopt = '1'
                this.sffCustoptshow = ''
                this.formValidate.sffCustoptDis = ''
                this.formValidate.sffLexical = ''
            } else if (this.formValidate.sffSelopt === '03customer') {
                this.showSffSelopt = '2'
                this.sffSysoptDis = ''
                this.formValidate.sffSysopt = ''
                this.formValidate.sffLexical = ''
            } else if (this.formValidate.sffSelopt === '03dict') {
                //  this.showSffSelopt = '2'
                this.sffSysoptDis = ''
                this.formValidate.sffSysopt = ''
            } else {
                this.showSffSelopt = '0'
                this.sffCustoptshow = ''
                this.formValidate.sffCustoptDis = ''
                this.sffSysoptDis = ''
                this.formValidate.sffSysopt = ''
                this.formValidate.sffLexical = ''
            }
        },
        // 根据布局方式控制字段的显示隐藏
        setLayOut (value) {
            this.layOutValue = value
        },
        openEditFiel () {
            if (this.showSffSelopt !== '2') {
                return
            }
            this.showEditFiel = true
        },
        hidEditFiel () {
            this.showEditFiel = false
        },
        close () {
            this.clear()
            this.$emit('hideMsg')
        },
        closeTable () {
            const t = this
            t.openPick = false
            t.openPick0 = false
        },
        getFormData () {
            const t = this;
            t.spinShow = true;
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'PlatSformfield.getById',
                id: t.$store.state.sysData.childId1,
                logType: this.$t('button.ser'),
                funId: '1',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.sffLexical = res.data.content[0].sffLexical
                    t.formValidate.sffOrder = res.data.content[0].sffOrder
                    t.formValidate.sffPhyfield = res.data.content[0].sffPhyfield
                    t.formValidate.sffFieldNameCnDis = res.data.content[0].sffFieldNameCnDis
                    t.formValidate.sffFieldNameEnDis = res.data.content[0].sffFieldNameEnDis
                    t.formValidate.sffIsvalid = res.data.content[0].sffIsvalid
                    t.formValidate.sffLayout = res.data.content[0].sffLayout
                    t.formValidate.sffProperty = res.data.content[0].sffProperty
                    t.formValidate.sffPropertyDis = res.data.content[0].sffPropertyDis
                    t.formValidate.sffType = res.data.content[0].sffType
                    t.formValidate.sffLength = res.data.content[0].sffLength
                    t.formValidate.sffSysopt = res.data.content[0].sffSysopt
                    t.sffSysoptDis = res.data.content[0].sffSysoptDis
                    t.formValidate.sffCustoptDis = res.data.content[0].sffCustoptDis
                    t.formValidate.sffDefault = res.data.content[0].sffDefault
                    t.formValidate.sffPrecision = res.data.content[0].sffPrecision
                    t.formValidate.sffCascadeget = res.data.content[0].sffCascadeget
                    if (res.data.content[0].sffUpdformat) {
                        t.formValidate.sffUpdformat = res.data.content[0].sffUpdformat.split(',')
                    }
                    t.formValidate.sffUppersize = res.data.content[0].sffUppersize
                    t.formValidate.sffLowersize = res.data.content[0].sffLowersize
                    t.formValidate.sffSetvalue = res.data.content[0].sffSetvalue
                    t.formValidate.sffDislogic = res.data.content[0].sffDislogic
                    t.formValidate.sffSelopt = res.data.content[0].sffSelopt
                    // t.formValidate.sffSelopt = res.data.content[0].sffSelopt
                    if (res.data.content[0].sffSelopt === '02system') {
                        t.showSffSelopt = '1'
                    }
                    t.formValidate.sffComplexsearch = res.data.content[0].sffComplexsearch
                    t.formValidate.sffQuicksearche = res.data.content[0].sffQuicksearche
                    // t.formValidate.sffIsexport = res.data.content[0].sffIsexport==''?'1':'0'
                    t.formValidate.sffIslist = res.data.content[0].sffIslist
                    t.formValidate.sffIsupdate = res.data.content[0].sffIsupdate
                    t.formValidate.sffDisdefault = res.data.content[0].sffDisdefault
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.sffDesc = res.data.content[0].sffDesc
                    t.formValidate.sffFilter = res.data.content[0].sffFilter
                    t.formValidate.sffCustomrouter = res.data.content[0].sffCustomrouter
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false;
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                typeCode: 'yesno,fielddatatype,layout,fieldopttype,updfileformat,fieldprop',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.yerOrNoOption = res.data.content[0].value[0].paramList
                    t.fieldphyTypeOption = res.data.content[0].value[1].paramList
                    t.layOutOption = res.data.content[0].value[2].paramList
                    t.fieldChType = res.data.content[0].value[3].paramList
                    t.updfileformat = res.data.content[0].value[4].paramList
                    t.fieldprop = res.data.content[0].value[5].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        setsffCustopt (show, value) {
            this.formValidate.isSffCustoptUpd = '1'
            this.sffCustoptshow = show
            this.formValidate.sffCustoptDis = value
        },
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.sffUpdformat = data.sffUpdformat.join()
            if (!t.$store.state.sysData.childId1) {
                data.logType = '新增'
                data.sffForm = t.$store.state.sysData.mainId
            } else {
                data.logType = '修改'
                data.sffForm = t.$store.state.sysData.mainId
                data.id = t.$store.state.sysData.childId1
            }
            //        for (const dat in data) {
            //          if (data[dat] === '') {
            //            delete data[dat]
            //          }
            //        }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (!t.$store.state.sysData.childId1) {
                                //            更新主表数据（无需重新加载）
                                t.$store.commit('sysData/addNewArrayChildTable1', res.data.content[0])
                                //            更新vuex中的mainId
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$store.commit('sysData/updateArrayChildTable1', res.data.content[0])
                                //            更新主表数据（无需重新加载）
                            }
                            t.clear()
                            t.close()
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        clear () {
            const t = this
            t.formValidate.sffLexical = ''
            t.formValidate.sffPhyfield = ''
            t.formValidate.sffFieldNameCnDis = ''
            t.formValidate.sffFieldNameEnDis = ''
            t.formValidate.sffIsvalid = ''
            t.formValidate.sffOrder = ''
            t.formValidate.sffType = ''
            t.formValidate.sffLength = ''
            t.formValidate.sffPrecision = ''
            t.formValidate.sffLayout = ''
            t.formValidate.sffSelopt = '01none'
            t.formValidate.sffSysopt = ''
            t.formValidate.sffCustoptDis = ''
            t.formValidate.sffDefault = ''
            t.formValidate.sffQuicksearche = ''
            // t.formValidate.sffIsexport = ''
            t.formValidate.sffComplexsearch = ''
            t.formValidate.sffUpdformat = []
            t.formValidate.sffUppersize = ''
            t.formValidate.sffLowersize = ''
            t.formValidate.sffDislogic = ''
            t.formValidate.sffSetvalue = ''
            t.formValidate.sffIslist = ''
            t.formValidate.sffProperty = ''
            t.formValidate.sffDisdefault = ''
            t.formValidate.comment = ''
            t.formValidate.sffFilter = ''
            t.formValidate.sffCascadeget = ''
            t.formValidate.sffIsupdate = ''
            t.sffSysoptDis = ''
            t.sffTypeDis = ''
            t.sffLayoutDis = ''
            t.sffSeloptDis = ''
            t.sffIsvalidDis = ''
            t.showSffSelopt = '0'
            t.sffQuicksearcheDis = ''
            // t.sffIsexportDis = ''
            t.sffComplexsearchDis = ''
            t.sffCustoptDis = ''
            t.sffIslistDis = ''
            t.sffIsupdateDis = ''
            t.sffDisdefaultDis = ''
            t.sffPropertyDis = ''
            t.formValidate.sffDesc = ''
            t.formValidate.sffCustomrouter = ''
            t.$refs.formValidate.resetFields()
            t.$store.commit('sysData/setChildId1', '')
        },
        pickData (param) {
            const t = this
            if (param === 'sffPhyfield') {
                t.$refs.searchZHAndEn.getData(this.params0)
                t.openPick0 = true
            } else {
                if (t.showSffSelopt !== '1') {
                    return
                }
                t.$refs.sffSysoptTable.getData(this.params)
                t.openPick = true
            }
        },
        changeinput0 (row) {
            const t = this
            t.formValidate.sffPhyfield = row.lanCode
            t.formValidate.sffFieldNameCnDis = row.lanCn
            t.formValidate.sffFieldNameEnDis = row.lanEn
        },
        changeinput (name, code) {
            const t = this
            t.sffSysoptDis = name
            t.formValidate.sffSysopt = code
        },
        clearSelect () {
            const t = this
            t.sffSysoptDis = ''
            t.formValidate.sffSysopt = ''
        },
        clearSffPhyfield () {
            const t = this
            t.formValidate.sffPhyfield = ''
            t.formValidate.sffFieldNameCnDis = ''
            t.formValidate.sffFieldNameEnDis = ''
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
// .box {
//     max-height: 600px;
//     overflow: hidden;
//     .content {
//         overflow-y: auto;
//         // position: absolute;
//         // height: 420px;
//     }
// }
// .btn {
//     position: absolute;
//     bottom: 20px;
//     right: 40px;
// }
// .btn1 {
//     position: absolute;
//     bottom: 20px;
//     right: 108px;
// }
.option-main {
    position: relative;
}
.last-item {
    margin-bottom: 0 !important;
}
// .row {
//     margin: 0 0 20px 0;
// }
</style>
