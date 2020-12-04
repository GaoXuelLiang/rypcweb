
<template>
    <div class="cover modal">
        <div class="box">
            <Spin fix
                  v-if="isSpin"
                  size="large"></Spin>
            <Col span="5"
                 class="meau-left">
                 <div class="headerBox">
                   <div class=""></div>
                 </div>
            <div class="menuInfo">
                <Menu active-name="postInfo"
                      width="auto">
                    <MenuItem name="postInfo">
                    <a href="#postInfo">
                        <img src="../../../static/home/items1.png" alt="" class="imgInline">
                        {{'岗位信息'}}</a>
                    </MenuItem>
                    <MenuItem name="basicProjectInfo">
                    <a href="#basicProjectInfo">
                        <img src="../../../static/home/items2.png" alt="" class="imgInline">
                        {{'项目基本信息'}}</a>
                    </MenuItem>
                    <MenuItem name="adminProjectInfo">
                    <a href="#adminProjectInfo">
                        <img src="../../../static/home/items3.png" alt="" class="imgInline">
                        {{'项目负责人信息'}}</a>
                    </MenuItem>
                    <MenuItem name="operatingProjectInfo" v-if="Yyshow">
                    <a href="#operatingProjectInfo">
                        <img src="../../../static/home/items4.png" alt="" class="imgInline">
                        {{'项目运营信息'}}</a>
                    </MenuItem>
                </Menu>
            </div>
            </Col>

            <Col span="20"
                 style="border-radius:0 10px 10px 0;"
                 class="right">
            <Row>
                <div class="title"
                     style="">
                    <div class="title-text">
                       
                    </div>
                    <Button type="text"
                            @click="handleClose">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div>
                <div ref="scrollBox"
                     class="topMar">
                        <a name="postInfo">
                            <Icon type="compose"
                                  size="15"
                                  class="iconStyle"
                                  style="margin-right: 5px;"></Icon>{{'岗位信息'}}
                        <span class="mine">
                            <Button type="success"  v-show="showTj" @click="tjMine">{{'我要投递'}}</Button>
                            <Button type="info"  v-show="iSshowTj" >{{'已投递'}}</Button>
                        </span>
                        </a>
                        <div class="empBaseInfo bottomMar">
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>招聘岗位</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>前端工程师</li> -->
                                        <li>{{data1.porePostidDis}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>双选活动</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2021年1季度双选</li> -->
                                        <li>{{data1.poreAcmidDis}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>公司</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>中南集团</li> -->
                                        <li>{{data1.poreUnitidDis}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>部门</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>研发部门</li> -->
                                        <li>{{data1.poreDeptidDis}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>招聘人数（人）</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                        <!-- <li>50人</li> -->
                                        <li>{{data1.poreRecnum}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone">任职条件</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                        <!-- <li>我们涉及的技术领域包含:软件工程方法与工具(包括但不限于软件研发工具、智能化开发、编程语言、软件分析技术、编译构建、持续集成、IDE、开源社区)我们涉及的技术领域包含:软件工程方法与工具(包括但不限于软件研发工具、智能化开发、编程语言、软件分析技术、编译构建、持续集成、IDE、开源社区)</li> -->
                                        <li>{{data1.poreServicenum}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone gz">工作内容</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                        <!-- <li class="borderNone">
                                          1、负责开发核心组件。进行表达层、逻辑层的开发实现，并进行自测，修改开发和测试过程中发现的的Bug ;
                                          2、负责技术选型和框架选择．性能优化、兼容性、安全性方案以及联调接口设计;
                                          3、理解用户和产品需求，从实现角度结合用户需求，评估交互与视觉设计方案，提出建设性意见并进行淘通;
                                          4、参与产品及项目的需求分析及评审,参与需求文档编写。</li> -->
                                          <li class="borderNone">{{data1.poreJobcontent}}</li>
                                    </ul>
                                </Col>
                          </Row>
                        </div>
                         <a name="basicProjectInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'项目基本信息'}}
                        <!-- <span class="mine">
                            <Button type="success" @click="downFil">{{'下载附件'}}</Button>
                        </span> -->
                        </a>
                        <div class="empBaseInfo bottomMar">
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>项目名称</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>中南项目</li> -->
                                        <li>{{data2.proBusrid}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>项目类型</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>外包项目</li> -->
                                        <li>{{data2.proType}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>项目地址</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>陕西省西安市雁塔区摩尔中心</li> -->
                                        <li>{{data2.proAddress}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>建筑面积(m²)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>40</li> -->
                                        <li>{{data2.proOverallfloor}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>容积率(%)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>20</li> -->
                                        <li>{{data2.proPlotratio}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>权益比例(%)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>30</li> -->
                                        <li>{{data2.proEquityratio}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>项目开始日期</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2020-10-11</li> -->
                                        <li>{{data2.proSdate}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>计划开工日期</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2020-10-20</li> -->
                                        <li>{{data2.proPlankgdate}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>计划开盘日期</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2020-11-15</li> -->
                                        <li>{{data2.proPlankpdate}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>计划竣工日期</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2021-11-20</li> -->
                                        <li>{{data2.proPlanjgdate}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>项目交付日期</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>2021-11-30</li> -->
                                        <li>{{data2.proPlanjfdate}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>操盘类型</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>A轮融资</li> -->
                                        <li>{{data2.proTraderstype}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone">优劣势</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                        <!-- <li class="borderNone">
                                          忧点:领悟力较强,对大多敛知识都能够很快入门,尽管很难深入。
                                          缺点:平时较为慵懒。</li> -->
                                          <li>{{data2.proPlanswot}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone gz">项目附件</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                          <li class="borderNone">
                                              <!-- <span @click="downFil" style="color: #2d8cf0;cursor: pointer;">{{data2.FileName}}</span> -->
                                              <span>{{data2.FileName}}</span>
                                              <span v-if="data2.FileName" class="down" @click="downFil" style="color: #2d8cf0;cursor: pointer;margin-left:20px;">下载</span>
                                          </li>
                                    </ul>
                                </Col>
                          </Row>
                        </div>
                         <a name="adminProjectInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'项目负责人信息'}}
                        </a>
                        <div class="empBaseInfo bottomMar">
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>名称</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                        <li>
                                            {{empName}}
                                          <!-- <span>{{'张三'}}</span> -->
                                          <!-- <span style="margin: 0 20px;"><Button type="success"  @click="openResumeModel">{{'简历'}}</Button></span> -->
                                          <!-- <span style="margin: 0 20px;">
                                            <div type="success"  @click="openResumeModel">{{'简历'}}</div>
                                          </span> -->
                                        </li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone">基本信息</li>
                                    </ul>
                                </Col>
                                <Col span='19'>
                                     <ul class="valueClass">
                                         <li class="borderNone">{{data2.proPrincipalinfo}}</li>
                                        <!-- <li class="borderNone">我们涉及的技术领域包含:软件工程方法与工具(包括但不限于软件研发工具、智能化开发、编程语言、软件分析技术、编译构建、持续集成、IDE、开源社区)</li> -->
                                    </ul>
                                </Col>
                          </Row>
                        </div>
                        <a name="operatingProjectInfo" v-if="Yyshow">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'项目运营信息'}}
                        </a>
                        <div class="empBaseInfo bottomMar" v-if="Yyshow">
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>人均净利润(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>15260</li> -->
                                        <li>{{data4.orgkb1NetprofitsByP}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>人均签约额-全口径(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>1300</li> -->
                                        <li>{{data4.orgkb1QkjqyamountByP}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>人均在建面积(m²)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>5000</li> -->
                                        <li>{{data4.orgkb1BuildareaByP}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>人均签约额-权益口径(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>5682</li> -->
                                        <li>{{data4.orgkb1QykjqyamountByP}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>人均签约额-操盘口径(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>15689</li> -->
                                        <li>{{data4.orgkb1CpqyamountByP}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li>管理费用总额(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li>52816</li> -->
                                        <li>{{data4.unitkbMgttamount}}</li>
                                    </ul>
                                </Col>
                          </Row>
                          <Row>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone">实际管理费率-权益(万元)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li class="borderNone">60000</li> -->
                                        <li>{{data4.unitkbMgtacamount}}</li>
                                    </ul>
                                </Col>
                                <Col span='5'>
                                    <ul class="titleClass">
                                        <li class="borderNone">管理费用偏差率(%)</li>
                                    </ul>
                                </Col>
                                <Col span='7'>
                                     <ul class="valueClass">
                                        <!-- <li class="borderNone">2.5</li> -->
                                        <li>{{data4.unitkbMgtdeviation}}</li>
                                    </ul>
                                </Col>
                          </Row>
                        </div>

                </div>
                
            </Row>
            </col>
        </div>
        <!-- 我的简历 -->
            <!-- <Modal v-model="myResumeShow"
                  :width="0"
                  :height="0"
                  :closable="false"
                  :footer-hide="true">
                <transition name="fade">
                    <myResume v-show="myResumeShow"
                              @closeEmpInfo="closeResume"
                              ref="myResume"></myResume>
                </transition>
            </Modal> -->
    </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

// import myResume from "../../pages/empzz/myResume";
export default {
    data () {
        return {
            isSpin: false,
            // myResumeShow: false,
            tdS: false,
            showTj: false,
            iSshowTj: false,
            tjStatic: true,
            Yyshow: false,
            id: "",
            compId: "",
            data1:{
                porePostidDis: "",
                poreAcmidDis: "",
                poreUnitidDis: "",
                poreDeptidDis: "",
                poreRecnum: "",
                poreServicenum: "",
                poreJobcontent: "",
            },
            data2:{
                proBusrid: "",
                proType: "",
                proAddress: "",
                proOverallfloor: "",
                proEquityratio: "",
                proPlotratio: "",
                proEquityratio: "",
                proSdate: "",
                proPlanjfdate: "",
                proPlanjgdate: "",
                proPlankgdate: "",
                proPlankpdate: "",
                proTraderstype: "",
                proPlanswot: "",
                // 项目基本信息
                proPrincipalinfo: "",
                // 附件
                proFilekey: "",
                FileName: "",
            },
            empName: "",
            data4:{
                orgkb1BuildareaByP: "",
                orgkb1CpqyamountByP: "",
                orgkb1NetprofitsByP: "",
                orgkb1QkjqyamountByP: "",
                orgkb1QykjqyamountByP: "",
                unitkbMgtacamount: "",
                unitkbMgtdeviation: "",
                unitkbMgttamount: "",
            },

        }
    },
    props: {
      
    },
    watch: {

    },
    components: {
        // myResume,
    },
    mounted () {

    },
    computed: {
        //角色
        userId () {
            return this.$store.state.user.empId;
        },
        companyId () {
            return this.$store.state.user.companyId;
        }
    },
    methods: {
        // 状态显示
        showMine (mine,comId) {
            if (mine === "Hr" ) {
                // 不显示投递
                this.showTj = false;
                this.iSshowTj = false;
            } else {
                // 显示投递
                if (comId && comId !== "") {
                    // 已投递状态
                    this.showTj = false;
                    this.iSshowTj = true;
                } else {
                    // 我要投递状态
                    this.showTj = true;
                    this.iSshowTj = false;
                }
            }
        },
        getFormData (id) {
            const t = this;
            t.isSpin = true;
            t.id = id;
            let data = {
                _mt: this.$global.mt + "OrgPostrelease.getPostMesId",
                APid: id,
                // APffk: `glc${t.funId}`,
                APffk:'glc1860'
            };
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    // console.log(res.data.content[0],"PostData")
                    // t.data = res.data.content[0].rows;
                    // t.data1 = res.data.content[0].postmes[0];
                    if (res.data.content[0].postmes[0]) {
                        let datav = res.data.content[0].postmes[0];
                        t.data1.porePostidDis = datav.porePostidDis;
                        t.data1.poreAcmidDis = datav.poreAcmidDis;
                        t.data1.poreUnitidDis = datav.poreUnitidDis;
                        t.data1.poreDeptidDis = datav.poreDeptidDis;
                        t.data1.poreRecnum = datav.poreRecnum;
                        t.data1.poreServicenum = datav.poreServicenum;
                        t.data1.poreJobcontent = datav.poreJobcontent;
                    }
                    // t.data2 = res.data.content[0].unitmes[0];
                    if (res.data.content[0].unitmes[0]) {
                        let datas = res.data.content[0].unitmes[0];
                        t.data2.proBusrid = datas.proBusrid;
                        t.data2.proType = datas.proType;
                        t.data2.proAddress = datas.proAddress;
                        t.data2.proOverallfloor = datas.proOverallfloor;
                        t.data2.proEquityratio = datas.proEquityratio;
                        t.data2.proPlotratio = datas.proPlotratio;
                        t.data2.proEquityratio = datas.proEquityratio;
                        t.data2.proSdate = datas.proSdate;
                        t.data2.proPlanjfdate = datas.proPlanjfdate;
                        t.data2.proPlanjgdate = datas.proPlanjgdate;
                        t.data2.proPlankgdate = datas.proPlankgdate;
                        t.data2.proPlankpdate = datas.proPlankpdate;
                        t.data2.proTraderstype = datas.proTraderstype;
                        t.data2.proPlanswot = datas.proPlanswot;
                        t.data2.proPrincipalinfo = datas.proPrincipalinfo;
                        // 附件
                        if (datas.proFilekey) {
                            t.data2.proFilekey = datas.proFilekey;
                            t.data2.FileName = datas.proFilekey.split(':')[0];
                        }
                    }
                    // 名称
                    if (res.data.content[0].ename[0]) {
                        t.empName = res.data.content[0].ename[0].empName;
                    }
                    if (t.data2.proIsshowyymes === "1") {
                        // 是
                        t.Yyshow = true;
                        t.compId = res.data.content[0].postmes[0].poreUnitid;
                        t.getYyData ();

                    }else {
                        t.isSpin = false;
                        t.Yyshow = false;
                    }
                    
                }
            }).catch(() => {
                t.isSpin = false;
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
            })
        },
        // openResumeModel () {
        //     const t = this;
        //     // t.modal1 = true;
        //     t.myResumeShow = true;
        // },
        // closeResume () {
        //     const t = this;
        //     // t.modal1 = false;
        //     t.myResumeShow = false;
        // },
        handleClose(){
            const t = this 
            t.clear()
            t.$emit('closehuntingJob',t.tdS)
            t.tdS = false;
        },
        clear () {
            const t = this 
            // t.data1 = [];
            t.data1.porePostidDis = "";
            t.data1.poreAcmidDis = "";
            t.data1.poreUnitidDis = "";
            t.data1.poreDeptidDis = "";
            t.data1.poreRecnum = "";
            t.data1.poreServicenum = "";
            t.data1.poreJobcontent = "";
            // t.data2 = [];   
            t.data2.proBusrid = "";
            t.data2.proType = "";
            t.data2.proAddress = "";
            t.data2.proOverallfloor = "";
            t.data2.proEquityratio = "";
            t.data2.proPlotratio = "";
            t.data2.proEquityratio = "";
            t.data2.proSdate = "";
            t.data2.proPlanjfdate = "";
            t.data2.proPlanjgdate = "";
            t.data2.proPlankgdate = "";
            t.data2.proPlankpdate = "";
            t.data2.proTraderstype = "";
            t.data2.proPlanswot = "";
            t.data2.proPrincipalinfo = "";
            t.data2.proFilekey = "";
            t.data2.FileName = "";
            // t.data3 = []
            t.empName = '';  
            // t.data4 = [];
            t.data4.orgkb1BuildareaByP = "";
            t.data4.orgkb1CpqyamountByP = "";
            t.data4.orgkb1NetprofitsByP = "";
            t.data4.orgkb1QkjqyamountByP = "";
            t.data4.orgkb1QykjqyamountByP = "";
            t.data4.unitkbMgtacamount = "";
            t.data4.unitkbMgtdeviation = "";
            t.data4.unitkbMgttamount = ""; 
        },
        // downList: [
        //     {
        //     name: "开发体系",
        //     id: "01develop",
        //     },
        //     {
        //     name: "营销体系",
        //     id: "02market",
        //     },
        // ],
        getYyData () {
            const t = this;
            let data = {
                _mt: this.$global.mt + "OrgKbrpt01.getByCompId",
                APcompId: t.compId,
                APset: "01develop",
                // APset: "02market"
            };
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.isSpin = false;
                    // console.log(res.data.content[0],"postYyData")
                    // t.data4 = res.data.content[0];
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        t.data4.orgkb1BuildareaByP = data.orgkb1BuildareaByP;
                        t.data4.orgkb1CpqyamountByP = data.orgkb1CpqyamountByP;
                        t.data4.orgkb1NetprofitsByP = data.orgkb1NetprofitsByP;
                        t.data4.orgkb1QkjqyamountByP = data.orgkb1QkjqyamountByP;
                        t.data4.orgkb1QykjqyamountByP = data.orgkb1QykjqyamountByP;
                        t.data4.unitkbMgtacamount = data.unitkbMgtacamount;
                        t.data4.unitkbMgtdeviation = data.unitkbMgtdeviation;
                        t.data4.unitkbMgttamount = data.unitkbMgttamount; 
                    }
                }
            }).catch(() => {
                t.isSpin = false;
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
            })
        },
        tjMine () {
            const t = this;
            this.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: "您确定投递该岗位吗？",
                onOk: () => {
                    let data = {
                        _mt: this.$global.mt + "EmpAcceptrec.setandadd",
                        // APsort: "id",
                        // APorder: "asc",
                        // AProws: 10,
                        // APpage: 1,
                        // APffk: `glc${t.funId}`,
                        APffk: `glc1860`,
                        APstatus: '02statusType',
                        // APuserId: t.userId,
                        APid: t.id,
                        APcompanyId: t.companyId
                    };
                    data.acrEmpid = t.userId;
                    getDataLevelUserLoginData(data).then((res) => {
                        // debugger
                        if (isSuccess(res, t)) {
                            if (res.data.content[0])
                            setTimeout(() => {
                                this.showTj = false;
                                this.iSshowTj = true;
                                this.tdS = true;
                                this.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: "投递成功",
                                })
                            }, 1000);
                        }
                    }).catch(() => {
                        t.isSpin = false
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }).finally(() => {
                        t.isSpin = false
                    })
                },
                onCancel: () => {},
            })
        },
        //文件下载
        downFil () {
            const t = this
            if (t.data2.proFilekey === "") {
                return
            }
            let data = {
                _mt: this.$global.mt + 'UserInfo.getfiletoken',
                APisprivate: true,
                APlogType: '导出',
                APfilekey: t.data2.proFilekey.split(':')[1],
                APexpiresecs: 180,
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (this.isIE()) {
                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.data2.proFilekey.split(':')[0])
                    } else {
                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.data2.proFilekey.split(':')[0])
                        let link = document.createElement('a')
                        link.href = doclink
                        link.download = 'downloadfiletemp'
                        link.click()
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })

        },
    }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/mainChildUpdate.scss";
@media (min-width: 600px) {
    // /deep/ .modal .box{
    //     width: 85%;
    // }
    .modal .box{
        // width: 1300px;
        // height: 780px;
        // width: 88%;
        width: 80%;
        height: 95%;
    }
    .topMar {
        padding-left: 15px;
        // max-height: 535px;
        height: calc(100% - 40px);
        // max-height: 80%;
        overflow-y: auto;
        padding-right: 10px;
        margin-right: 10px;
    }
}
@media (min-width: 1920px) {
    .modal .box{
        // width: 1300px;
        // height: 780px;
        // width: 88%;
        width: 60%;
        height: 65%;
    }
    .topMar {
        padding-left: 15px;
        // max-height: 545px;
        height: calc(100% - 40px);
        // max-height: 80%;
        overflow-y: auto;
        padding-right: 10px;
        margin-right: 10px;
    }
    // .meau-left {
    //     padding: 0;
    //     width: 16.5%;
    //     height: 100%;
    // }
}
// .cover {
//     width: 100vw;
//     // margin: 0 auto;
// }
.modal .box .title{
    border-bottom:none;
}
// .modal .box{
//     // width: 1300px;
//     // height: 780px;
//     // width: 88%;
//     width: 60%;
//     height: 65%;
// }
/deep/ .right {
    height: 100%;
    /deep/ .ivu-row {
        height: 100%;
    }
}
.headerBox{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
}
.ivu-form a {
    display: block;
    color: #000000;
    margin: 10px 0;
    padding-left: 10px;
    height: 26px;
    line-height: 26px;
    //border-bottom: #EEEEEE solid 1px;
    padding-bottom: 5px;
    font-weight: bold;
    //background: #d3e8ff;
    font-size: 14px;
}
.ivu-menu-item a {
    text-align: center !important;
}
.ivu-menu-vertical.ivu-menu-light:after {
    background: none;
}
.topMar a::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 18px;
    background: #333333;
    position: relative;
    top: 3px;
    margin-right: 10px;
}
.topMar a{
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    .mine {
        float: right;
        margin-right: 5%;
    }
}
.bottomMar{
    margin: 20px  0;
}
.cover .box {
    .meau-left {
        padding: 0;
        // width: 200px;
        // height: 780px;
        width: 16.5%;
        height: 100%;
    }
    // .right {
    //     width: 900px;
    // }
}
.menuInfo {
    margin-top: 10px;
}
.menuInfo .ivu-menu a:active {
    color: #318ef0;
}
// .menuInfo .ivu-menu-item:hover {
//     background: #ffffff;
//     /*color: #318EF0;*/
// }
.menuInfo .ivu-menu-item a:hover {
    color: #318ef0;
}
.menuInfo .ivu-menu-item {
    padding: 0;
}
// .menuInfo /deep/ .ivu-menu-item{
//     height:60px;
//     padding:10px 15px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
// }
.menuInfo a {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    font-family: "微软雅黑";
    width: 100%;
    padding: 14px 24px;

    // height: 40px;
    // padding-right: 15px;
    text-align: left;
    // padding-top: 15px;
    // padding-left: 20px;
}
.header-box {
    display: flex;
    position: relative;
    justify-content: flex-end;
}
.tab-box {
    overflow-y: auto;
    height: 370px;
}
.header-cover {
    display: none;
    top: 16px;
    right: 14px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.3);
}
.header-box:hover .header-cover {
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-box:hover {
    cursor: pointer;
}
.header {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.tab-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    // height: 50px;
}
// .topMar {
//     padding-left: 15px;
//     max-height: 720px;
//     // max-height: 80%;
//     overflow-y: auto;
//     padding-right: 15px;
// }
.imgInline{
    margin-right: 15px;
}
.btnAlign {
    text-align: end;
    margin-right: 59px;
    button {
        margin-left: 8px;
    }
}
.empBaseInfo{
      border: 1px solid #E6E6E6;
      background-color: #F5F5F5;
    .titleClass{
        background-color: #F5F5F5;
        // min-height: 30px;
        li{
            color: #333333;
            font-weight: bold;
            font-size: 12px;
            background-color: #F5F5F5;
            min-height: 30px;
            line-height: 30px;
            padding-left: 8px;
            border-bottom: 1px solid #E6E6E6;
            border-right: 1px solid  #E6E6E6;
        }
        .borderNone{
            border-bottom: none;
            // .down {
            //     color: #2d8cf0;
            // }
        }
        .gz {
            border-top: 1px solid #E6E6E6;
        }
    }
    .valueClass{
        background-color: #FFFFFF;
        // min-height: 30px;
        li{
            // background-color: #FFFFFF;
            min-height: 30px;
            font-size: 12px;
            line-height: 30px;
            padding-left: 8px;
            border-bottom: 1px solid #E6E6E6; 
            border-right: 1px solid  #E6E6E6;
        }
        .borderNone{
            border-bottom: none;
            border-right: none;
        }
    }
}
/deep/ .ivu-radio-wrapper-checked {
    background: rgba(45, 140, 240, 1);
    color: #fff;
}
/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    color: #fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #fff;
}
/deep/ .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    width: 4px !important;
    height: 70%;
    left: 0;
    top: 8px !important;
}
/deep/ .ivu-menu-vertical.ivu-menu-light:after {
    background: #fff !important;
}
/deep/ .ivu-menu-light {
    background: #f5f5f5;
}
/deep/
    .ivu-menu-light.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: #fff;
}
/deep/ .ivu-input-icon {
    cursor: pointer;
}
/deep/ .ivu-modal-body .ivu-btn-text {
  border: none;
}
</style>
