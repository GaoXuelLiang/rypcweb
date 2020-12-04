<template >
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  v-if="loading"
                  fix></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{$t('lang_payroll.payFormula.title')}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Col span="4"
                 class="colTree">
            <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
            <Row>
                <span @dblclick="clearSalapro">
                    <Input placeholder="请选择薪资项目"
                           icon="ios-search"
                           :readonly="true"
                           v-model="SalaProName"
                           @on-click="selectSalaPro" />
                </span>
            </Row>
            <div class="divtree"
                 :style="{height:treeheight + 'px',width: 200 +'px'} ">
                <i-col class="meau-left">
                    <span v-for="(item,index) in items"
                          :key="index">
                        <DropdownItem @click.native="insert(' [' + item.proSalidDis + '] ')"
                                      style="color: #4495f1">{{item.proSalidDis}} &gt;</DropdownItem>
                        <!--<Menu :active-name="active" width="auto" @on-select="pageTo">-->
                        <!--&lt;!&ndash;<MenuItem name="option">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{$t('lang_payroll.paySalSet.title')}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
                        <!--&lt;!&ndash;<MenuItem name="content" >&ndash;&gt;-->
                        <!--&lt;!&ndash;{{$t('lang_payroll.paySalSetItem.title')}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
                        <!--</Menu>-->
                    </span>
                </i-col>
            </div>
            </Col>
            <Col span="4"
                 class="mula">
            <div class="Header">{{$t('lang_payroll.payFormula.contentHead')}}</div>
            <Input :style="{height:treeheight1 + 'px'}"
                   id="content"
                   v-model="form.proFormula"
                   type="textarea"
                   :autosize="{minRows: 15,maxRows: 15}"></Input>
            <!--<div :id="'editor'" style="z-index: 0;"></div>-->
            <!--<div id="txt" v-model="content" v-show="false"></div>-->
            </Col>
            <Col span="4"
                 class="mula">
            <div class="Header">{{$t('lang_payroll.payFormula.comment')}}</div>
            <Input :style="{height:treeheight2 + 'px'}"
                   v-model="form.proMulremark"
                   type="textarea"
                   :autosize="{minRows: 6,maxRows: 6}"></Input>
            <!--<div :id="'editor'" style="z-index: 0;"></div>-->
            <!--<div id="txt" v-model="content" v-show="false"></div>-->
            </Col>
            <div class="Header">{{$t('lang_payroll.payFormula.calHead')}}</div>
            <div class="right"
                 :style="{height:treeheight3 + 'px'} ">
                <i-col class="meau-left">
                    <Button type="info"
                            @click="insert('9')"
                            class="button">9</Button>
                    <Button type="info"
                            @click="insert('8')"
                            class="button">8</Button>
                    <Button type="info"
                            @click="insert('7')"
                            class="button">7</Button>
                    <Button type="info"
                            @click="insert(' + ')"
                            class="button">+</Button>
                    <Button type="info"
                            @click="insert(' - ')"
                            class="button">-</Button><br />
                    <Button type="info"
                            @click="insert('6')"
                            class="button">6</Button>
                    <Button type="info"
                            @click="insert('5')"
                            class="button">5</Button>
                    <Button type="info"
                            @click="insert('4')"
                            class="button">4</Button>
                    <Button type="info"
                            @click="insert(' * ')"
                            class="button">*</Button>
                    <Button type="info"
                            @click="insert(' / ')"
                            class="button">/</Button><br />
                    <Button type="info"
                            @click="insert('3')"
                            class="button">3</Button>
                    <Button type="info"
                            @click="insert('2')"
                            class="button">2</Button>
                    <Button type="info"
                            @click="insert('1')"
                            class="button">1</Button>
                    <Button type="info"
                            @click="insert(' ( ')"
                            class="button">(</Button>
                    <Button type="info"
                            @click="insert(' ) ')"
                            class="button">)</Button><br />
                    <Button type="info"
                            @click="insert('0')"
                            class="button">0</Button>
                    <Button type="info"
                            @click="insert('00')"
                            class="button">00</Button>
                    <Button type="info"
                            @click="insert('.')"
                            class="button">.</Button>
                    <Button type="info"
                            @click="insert(' 大于 ')"
                            class="button">&gt;</Button>
                    <Button type="info"
                            @click="insert(' 大于等于 ')"
                            class="button">&gt;=</Button><br />
                    <Button type="info"
                            @click="insert(' = ')"
                            class="button">=</Button>
                    <Button type="info"
                            @click="insert(' 等于 ')"
                            class="button">==</Button>
                    <Button type="info"
                            @click="insert(' 不等于 ')"
                            class="button">!=</Button>
                    <Button type="info"
                            @click="insert(' 小于 ')"
                            class="button">&lt;</Button>
                    <Button type="info"
                            @click="insert(' 小于等于 ')"
                            class="button">&lt;=</Button><br />
                    <Button type="info"
                            @click="insert('{')"
                            class="button">{</Button>
                    <Button type="info"
                            @click="insert('}')"
                            class="button">}</Button>
                    <Button type="info"
                            @click="insert(' 否则 ')"
                            class="button">否则</Button>
                    <Button type="info"
                            @click="insert(' 或 ')"
                            class="button">或</Button>
                    <Button type="info"
                            @click="insert(' 并且 ')"
                            class="button">并且</Button>
                    <br />
                    <Button type="info"
                            @click="insert(' 如果 ')"
                            class="button">如果</Button>
                    <Button type="info"
                            @click="insert(' 否则如果 ')"
                            style="width: 83px"
                            class="button">否则如果</Button>
                    <Button type="info"
                            @click="insert(' 结果 ')"
                            style="width: 84px"
                            class="button">结果</Button>
                </i-col>
            </div>
            <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
            <div class="right"
                 :style="{height:220 + 'px',width: 240 +'px'} ">
                <i-col class="meau-left">
                    <span v-for="(item,index) in dataTree"
                          :key="index">
                        <DropdownItem @click.native="insert(item.value)"
                                      style="color: #4495f1">{{item.title}}</DropdownItem>
                        <!--<Menu :active-name="active" width="auto" @on-select="pageTo">-->
                        <!--&lt;!&ndash;<MenuItem name="option">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{$t('lang_payroll.paySalSet.title')}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
                        <!--&lt;!&ndash;<MenuItem name="content" >&ndash;&gt;-->
                        <!--&lt;!&ndash;{{$t('lang_payroll.paySalSetItem.title')}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
                        <!--</Menu>-->
                    </span>
                </i-col>
            </div>
            <Row type="flex"
                 style="padding-top: 5px;"
                 justify="end">
                <Button @click="close"
                        style="margin-left: 5px;">{{$t('button.cal')}}</Button>
                <Button type="primary"
                        @click="save"
                        style="margin-left: 5px;">{{$t('button.sav')}}</Button>
                <Button type="primary"
                        @click="check"
                        style="margin-left: 5px;">{{$t('button.cek')}}</Button>
            </Row>
            <!--<Button class="btn" type="primary" @click="close">取消</Button>-->
            <!--<Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>-->
            <!--<Button class="btn" type="primary" @click="save" >检查</Button>-->
        </div>
        <!--基准岗位-->
        <transition name="fade">
            <searchSalaPro v-show="openPick"
                           @closeUp="closeSalaPro"
                           :searchCloumns="searchCloumns"
                           @changeinput="changeinput"
                           :params="params"
                           ref="searchSalaPro"></searchSalaPro>
        </transition>
    </div>
</template>
<script>
import { isSuccess, deepCopy } from '../../../lib/util'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import searchSalaPro from '@/components/searchTable/searchSalaPro'
export default {
    data () {
        return {
            loading: false,
            form: {
                proMulremark: '',
                proFormula: '',
            },
            rowId: '',
            dataTree: [
                {
                    title: 'toFixed(2)------四舍五入',
                    expand: true,
                    value: ' toFixed() ',
                },
                {
                    title: 'abs()------取绝对值',
                    expand: true,
                    value: ' abs() ',
                },
                {
                    title: 'floor()------取整数部分',
                    expand: true,
                    value: ' floor() ',
                },
                {
                    title: 'min(,)------取小',
                    expand: true,
                    value: ' min(,) ',
                },
                {
                    title: 'max(,)------取大',
                    expand: true,
                    value: ' max(,) ',
                },
                {
                    title: 'round------新四舍五入',
                    expand: true,
                    value: ' round ',
                },
            ],
            items: [],
            treeheight: 466,
            treeheight1: 350,
            treeheight2: 150,
            treeheight3: 270,
            openPick: false,
            searchCloumns: [
                {
                    title: '项目名称',
                    key: 'salNamecn',
                    sortable: 'custom',
                },
                {
                    title: '数据类型',
                    key: 'salProtypeDis',
                    sortable: 'custom',
                },
                {
                    title: '缺省数据源',
                    key: 'salQssourcesDis',
                    sortable: 'custom',
                },

            ],
            params: {
                _mt: this.$global.mt + 'PaysSalyman.getPage',
                APsort: 'id',
                APorder: 'asc',
                AProws: '10',
                APpage: '1',
                APffk: 'gep1322'
            },
            SalaProName: '',
            SalaProId: '',
            getProFormula: true,
            mainDataId: ''
        }
    },
    components: {
        searchSalaPro
    },
    props: {
        id: String,
    },
    mounted () {
        //      editor = new E('#editor')
        //      editor.customConfig.onchange = function (html) {
        //        alert(html)
        //        document.getElementById('txt').innerHTML = html
        //      }
        //      editor.customConfig.menus = []
        //      editor.create()
    },
    computed: {
        mainId () {
            return this.$store.state.autoCommonPage.mainId;
        },
        funId () {
            return this.$store.state.user.childFunId
        }
    },
    methods: {
        getData (id, mainId) {
            const t = this;
            if (id) {
                t.rowId = id
            }
            t.loading = true;
            if (mainId) {
                t.mainDataId = mainId;
            }
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PaysProject.getPage',
                APsort: "id",
                APorder: "desc",
                AProws: "0",
                APpage: "1",
                APffk: `glc${t.funId}`,
                atyId: t.mainDataId,
                proSalid: t.SalaProId

            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.items = res.data.content[0].rows
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.loading = false
            }).finally(() => {
                t.loading = false
            })
            if (t.getProFormula) {
                const params = {
                    _mt: this.$global.mt + 'PaysProject.getById',
                    APid: t.rowId,
                    APlogType: '查询信息',
                    APffk: `gec${t.funId}`
                }
                getDataLevelUserLoginData(params).then((res) => {
                    if (isSuccess(res, t)) {
                        const nice = res.data.content[0]
                        this.form.proFormula = nice.proFormula
                        this.form.proMulremark = nice.proMulremark
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        insert (value) {
            if (!this.form.proFormula) {
                this.form.proFormula = value
            } else {
                this.form.proFormula = this.form.proFormula + value
            }
            // document.getElementById('content').value = document.getElementById('content').value + value
        },
        close () {
            this.$emit('hideMsg')
            this.form = { proMulremark: '', proFormula: '' }
            this.rowId = ''
            this.SalaProName = ''
            this.SalaProId = ''
            this.getProFormula = true;
        },
        save () {
            const t = this
            const params = deepCopy(t.form)
            params._mt = this.$global.mt + 'PaysProject.addOrUpd'
            params.id = t.rowId
            params.APlogType = this.$t('button.upd')
            // params.isValid = 'yes'
            getDataLevelUserLoginData(params).then((res) => {
                if (isSuccess(res, t)) {
                    t.close()
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: this.$t('reminder.updsuccess'),
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        check () {
            const t = this
            // const params = deepCopy(t.form)
            const params = {}
            params._mt = this.$global.mt + 'PaysProject.checkJs'
            params.APatyId = t.mainDataId
            // params.APlogType = this.$t('button.upd')
            // params.isValid = 'yes'
            params.APpayssiFormula = t.form.proFormula
            getDataLevelUserLoginData(params).then((res) => {
                if (res.data.content[0].value === 1) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '校验通过!',
                    })
                } else {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: '公式异常!请重新检查!',
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //关闭弹出框
        closeSalaPro () {
            const t = this
            t.openPick = false
        },
        changeinput (name, id) {
            const t = this
            t.SalaProName = name
            t.SalaProId = id;
            t.getProFormula = false;
            t.getData()

        },
        selectSalaPro () {
            const t = this
            t.$refs.searchSalaPro.getData(this.params)
            t.openPick = true
        },
        clearSalapro () {
            const t = this
            t.SalaProName = ''
            t.SalaProId = ''
            t.getProFormula = false;
            t.getData()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 220px;
}
.mula {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 500px;
}
.right {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
}
.mulabody {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
}
.divtree {
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
    margin-top: 10px;
}

.cover .box {
    padding: 50px 20px 5px 20px;
    width: 1000px;
}
.button {
    color: #000000;
    width: 40px;
    margin-top: 5px;
    padding-left: 1%;
    padding-right: 1%;
    background-color: rgba(213, 243, 255, 0.56);
    border: none;
}
.btn {
    position: relative;
    bottom: 20px;
    right: 36px;
}
.cover .box {
    max-height: 620px;
}
</style>
