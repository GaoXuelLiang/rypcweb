
<template>
    <div class="cover modal">
        <div class="box">
            <Spin size="large" fix v-if="spinShow">
            </Spin>
            <Col span="5"
                 class="meau-left">
                 <div class="headerBox">
                    <div class="empHeader">
                        <img :src="header?header:'../../../static/zizhuImg/user_img.png'" alt="">
                    </div>
                 </div>
            <div class="menuInfo">
                <Menu active-name="baseInfo"
                      width="auto">
                    <MenuItem name="baseInfo">
                   <a href="#baseInfo">
                       <img src="../../../static/zizhuImg/item.png" alt="" class="imgInline">
                       {{'基本信息'}}</a>
                    </MenuItem>
                    <MenuItem name="companyInfo">
                    <a href="#companyInfo">
                         <img src="../../../static/zizhuImg/item1.png" alt="" class="imgInline">
                        {{'学历信息'}}</a>
                    </MenuItem>
                    <MenuItem name="contractInfo">
                    <a href="#contractInfo">
                         <img src="../../../static/zizhuImg/item2.png" alt="" class="imgInline">
                        {{'履历信息'}}</a>
                    </MenuItem>
                    <MenuItem name="bank">
                    <a href="#bank">
                         <img src="../../../static/zizhuImg/item3.png" alt="" class="imgInline">
                        {{'职称证书'}}</a>
                    </MenuItem>
                    <MenuItem name="educationInfo">
                    <a href="#educationInfo">
                         <img src="../../../static/zizhuImg/item4.png" alt="" class="imgInline">
                        {{'奖惩信息'}}</a>
                    </MenuItem>
                    <MenuItem name="addressInfo">
                    <a href="#addressInfo">
                         <img src="../../../static/zizhuImg/item5.png" alt="" class="imgInline">
                        {{'绩效信息'}}</a>
                    </MenuItem>
                    <MenuItem name="Inventory">
                    <a href="#Inventory">
                         <img src="../../../static/zizhuImg/item2.png" alt="" class="imgInline">
                        {{'盘点信息'}}</a>
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
                        <a name="baseInfo">
                            <Icon type="compose"
                                  size="15"
                                  class="iconStyle"
                                  style="margin-right: 5px;"></Icon>{{$t('lang_employee.baseInfo.title')}}
                        </a>
                        <div class="empBaseInfo bottomMar">
                            <Row>
                                <Col span='3'>
                                    <ul class="titleClass">
                                        <li>姓名</li>
                                        <li>籍贯</li>
                                        <li>婚育状况</li>
                                        <li>入职日期</li>
                                        <li>是否管培生</li>
                                        <li>紧急联系人</li>
                                        <li>公司邮箱</li>
                                        <!-- <li class="borderNone">员工标签</li> -->
                                    </ul>

                                </Col>
                                <Col span='5'>
                                     <ul class="valueClass">
                                        <li>{{dataInfo.empName?dataInfo.empName: ''}}</li>
                                        <li>{{dataInfo.empNative || ''}}</li>
                                        <li>{{dataInfo.empMarriageDis || ''}}</li>
                                        <li>{{dataInfo.empEndate}}</li>
                                        <li>{{dataInfo.empIsgpsDis}}</li>
                                        <li>{{dataInfo.empEmycontact}}</li>
                                        <li>{{dataInfo.empCompmail}}</li>
                                        <!-- <li class="borderNone">{{dataInfo.empTagDis}}</li> -->
                                    </ul>
                                </Col>
                                 <Col span='3'>
                                    <ul class="titleClass">
                                        <li>性别</li>
                                        <li>员工分类</li>
                                        <li>国籍</li>
                                        <li>公司资历日期</li>
                                        <li>是否重新雇佣</li>
                                        <li>紧急联系人关系</li>
                                        <li>个人邮箱</li>
                                    </ul>
                                </Col>
                                 <Col span='5'>
                                     <ul class="valueClass">
                                        <li>{{dataInfo.empGenderDis}}</li>
                                        <li>{{dataInfo.empEmpmodeDis}}</li>
                                        <li>{{dataInfo.empCitizenDis}}</li>
                                        <li>{{dataInfo.empSendate}}</li>
                                        <li>{{dataInfo.empIscxempDis}}</li>
                                        <li>{{dataInfo.empEmyrelationDis}}</li>
                                        <li class="bor-right">{{dataInfo.empPersmail}}</li>

                                    </ul>
                                </Col>
                                 <Col span='3'>
                                    <ul class="titleClass">
                                        <li>民族</li>
                                        <li>手机号</li>
                                        <li>实际出生日期</li>
                                        <li>进入中南集团日期</li>
                                        <li>是否退休返聘</li>
                                        <li>紧急联系人电话</li>
                                        <li class="borderBack"></li>
                                    </ul>

                                </Col>
                                <Col span='5'>
                                     <ul class="valueClass">
                                        <li class="bor-right">{{dataInfo.empNationDis}}</li>
                                        <li  class="bor-right">{{dataInfo.empMobile}}</li>
                                        <li  class="bor-right">{{dataInfo.empBirthdatereal}}</li>
                                        <li  class="bor-right">{{dataInfo.empEzndate}}</li>
                                        <li  class="bor-right">{{dataInfo.empIstxempDis}}</li>
                                        <li  class="bor-right">{{dataInfo.empEmyphone}}</li>
                                        <li  class="bor-right"></li>
                                    </ul>
                                </Col>
                                <Col span="24">
                                    <Col span="3">
                                      <div class="biaoqian">{{'员工标签'}}</div>
                                    </Col>
                                    <Col span="21"> 
                                      <div class="biaoData">{{dataInfo.empTagDis}}</div>
                                    </Col>  
                                </Col>
                            </Row>
                        </div>
                         <a name="companyInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'内部任职'}}
                        </a>
                        <div class="bottomMar">
                              <Table size="small"
                                ref="selection"
                                :columns="appointmentColumns"
                                border
                                :data="appointmentData"></Table>
                        </div>
                        <a name="bank">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'外部履历'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="workColums"
                                border
                                :data="workData"></Table>
                        </div>
                        <a name="contractInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'学历信息'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="educationColums"
                                border
                                :data="educationData"></Table>
                        </div>
                        <a name="educationInfo">
                            <Icon type="compose"
                                  size="15"
                                  border
                                  style="margin-right: 5px;"></Icon>{{'职称证书'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="certificateColums"
                                border
                                :data="certificateData"></Table>
                        </div>
                        <a name="addressInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'奖励信息'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="awarsColums"
                                border
                                :data="awarsData"></Table>
                        </div>
                        <a name="addressInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'惩罚信息'}}
                        </a>
                        <div class="bottomMar">
                            <Table size="small"
                                ref="selection"
                                :columns="punishmentColums"
                                border
                                :data="punishmentData"></Table>
                        </div>
                        <a name="addressInfo">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'绩效信息'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="achievementsColums"
                                border
                                :data="achievementsData"></Table>
                        </div>
                        <a name="Inventory">
                            <Icon type="compose"
                                  size="15"
                                  style="margin-right: 5px;"></Icon>{{'盘点信息'}}
                        </a>
                        <div class="bottomMar">
                             <Table size="small"
                                ref="selection"
                                :columns="inventoryColums"
                                border
                                :data="inventoryData"></Table>
                        </div>
                </div>
                
            </Row>
            </col>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage, getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
      
        return {
            dataInfo:{
                empName:'',
                empNative:'',
                empMarriageDis:'',
                empEndate:'',
                empIsgpsDis:'',
                empEmycontact:'',
                empCompmail:'',
                empTagDis:'',
                empGenderDis:'',
                empEmpmodeDis:'',
                empCitizenDis:'',
                empSendate:'',
                empIscxempDis:'',
                empEmyrelationDis:'',
                empPersmail:'',
                empNationDis:'',
                empMobile:'',
                empBirthdatereal:'',
                empEzndate:'',
                empIstxempDis:'',
                empEmyphone:''
            },
             noData: '<div id="noDataNote"></div>',
             type:'',
             spinShow:false,
             httpImg:pubsource.pub_pubf_downlink,
             header:'',
            //任职信息
            appointmentColumns:[
                {
                    title: '主岗/兼岗',
                    key: 'empappZjpostDis',
                    align: 'center',
                },
                {
                    title: '所属平台',
                    key: 'empappPanelDis',
                    align: 'center',
                },
                {
                    title: '任职公司',
                    key: 'empappUnitidDis',
                    align: 'center',
                },
                {
                    title: '任职岗位',
                    key: 'empappPostidDis',
                    align: 'center',
                },
                {
                    title: '职等',
                    key: 'postRankidDis',
                    align: 'center',
                },
                {
                    title: '直接上级',
                    key: 'empappZpidDis',
                    align: 'center',
                },
                {
                    title: '日常办公地',
                    key: 'empappWkcityDis',
                    align: 'center',
                },
            ],
            appointmentData:[],
            //学历信息
            educationColums:[
                {
                    title: '学校',
                    key: 'empedcSchool',
                    align: 'center',
                },
                {
                    title: '学历',
                    key: 'empedcBackgdDis',
                    align: 'center',
                },
                {
                    title: '入学年份',
                    key: 'empedcEsdate',
                    align: 'center',
                },
                {
                    title: '毕业时间',
                    key: 'empedcBydate',
                    align: 'center',
                },
                {
                    title: '国家',
                    key: 'empedcContidDis',
                    align: 'center',
                },
                {
                    title: '学校类型',
                    key: 'empedcSchooltypeDis',
                    align: 'center',
                },
                {
                    title: '学习方式',
                    key: 'empedcLearntypeDis',
                    align: 'center',
                },
                {
                    title: '学位',
                    key: 'empedcDegreeDis',
                    align: 'center',
                },
                {
                    title: '第一专业',
                    key: 'empedcFirstzy',
                    align: 'center',
                },
                {
                    title: '第二专业',
                    key: 'empedcSecondzy',
                    align: 'center',
                },
                {
                    title: '是否第一学历',
                    key: 'empedcFirstDis',
                    align: 'center',
                },
                {
                    title: '是否最高学历',
                    key: 'empedcIshighestDis',
                    align: 'center',
                },
            ],
            educationData:[],
            //履历信息
            workColums:[
                 {
                    title: '工作单位',
                    key: 'empwkeComp',
                    align: 'center',
                },
                {
                    title: '入职时间',
                    key: 'empwkeSdate',
                    align: 'center',
                },
                {
                    title: '离职时间',
                    key: 'empwkeEdate',
                    align: 'center',
                },
                {
                    title: '是否内部履历',
                    key: 'empwkeIsintercomDis',
                    align: 'center',
                },
                {
                    title: '工作部门',
                    key: 'empwkeDept',
                    align: 'center',
                },
                {
                    title: '工作岗位',
                    key: 'empwkePost',
                    align: 'center',
                },
                {
                    title: '工作地点',
                    key: 'empwkeWorkcity',
                    align: 'center',
                },
                {
                    title: '证明人',
                    key: 'empwkeContact',
                    align: 'center',
                },
                {
                    title: '联系电话',
                    key: 'empwkePhone',
                    align: 'center',
                },
                {
                    title: '离职原因',
                    key: 'empwkeLeavereasonDis',
                    align: 'center',
                },
            ],
            workData:[],
            //职称证书
            certificateColums:[
                 {
                    title: '证书名称',
                    key: 'empzcName',
                    align: 'center',
                },
                {
                    title: '证书级别',
                    key: 'empzcLevelDis',
                    align: 'center',
                },
                {
                    title: '证书专业',
                    key: 'empzcMajor',
                    align: 'center',
                },
                {
                    title: '认证日期',
                    key: 'empzcDate',
                    align: 'center',
                },
                {
                    title: '发证单位',
                    key: 'empzcCompany',
                    align: 'center',
                },
            ],
            certificateData:[],
            //奖励信息
             awarsColums:[
                {
                    title: '任职公司',
                    key: 'empapUnitidDis',
                    align: 'center',
                },
                {
                    title: '任职部门',
                    key: 'empapDeptidDis',
                    align: 'center',
                },
                {
                    title: '任职岗位',
                    key: 'empapPostidDis',
                    align: 'center',
                },
                {
                    title: '岗位序列',
                    key: 'empapPtodidDis',
                    align: 'center',
                },
                  {
                    title: '职等',
                    key: 'empapRankidDis',
                    align: 'center',
                },
                {
                    title: '奖励日期',
                    key: 'empapDate',
                    align: 'center',
                },
                {
                    title: '奖励类型',
                    key: 'empapAwtypeDis',
                    align: 'center',
                },
                {
                    title: '奖励方式',
                    key: 'empapAwwayDis',
                    align: 'center',
                },
            ],
            awarsData:[],
             //惩罚信息
             punishmentColums:[
                {
                    title: '任职公司',
                    key: 'empapUnitidDis',
                    align: 'center',
                },
                {
                    title: '任职部门',
                    key: 'empapDeptidDis',
                    align: 'center',
                },
                {
                    title: '任职岗位',
                    key: 'empapPostidDis',
                    align: 'center',
                },
                {
                    title: '岗位序列',
                    key: 'empapPtodidDis',
                    align: 'center',
                },
                {
                    title: '职务',
                    key: 'empapDutyidDis',
                    align: 'center',
                },
                {
                    title: '惩罚日期',
                    key: 'empapDate',
                    align: 'center',
                },
                {
                    title: '违规类型',
                    key: 'empapIegltypeDis',
                    align: 'center',
                },
                {
                    title: '处分方式',
                    key: 'empapDispway',
                    align: 'center',
                },
                {
                    title: '是否解除',
                    key: 'empapIsrelieveDis;',
                    align: 'center',
                },
                {
                    title: '解除日期',
                    key: 'empapRedate',
                    align: 'center',
                },
            ],
            punishmentData:[],
            //绩效信息
            achievementsColums:[
                {
                    title: '考核类型',
                    key: 'empperPertypeDis',
                    align: 'center',
                },
                // {
                //     title: '考核活动名称',
                //     key: 'empperName',
                //     align: 'center',
                // },
                {
                    title: '考核方案',
                    key: 'empperScheme',
                    align: 'center',
                },
                {
                    title: '考核周期',
                    // key: this.type=='05month'?'empperPermonth':(this.type=='10quarter'?'empperPerquarter':'empperPeryear'),
                    key: '',
                    align: 'center',
                },
                {
                    title: '考核评分',
                    key: 'empperScore',
                    align: 'center',
                },
                  {
                    title: '绩效等级',
                    key: 'empperRateDis',
                    align: 'center',
                },
                {
                    title: '评价中心',
                    key: 'empperAscenter',
                    align: 'center',
                },
            ],
            achievementsData:[],
            //盘点信息
            inventoryColums:[
                {
                    title: '考核类型',
                    key: 'talentTypeDis',
                    align: 'center',
                },
                {
                    title: '考核开始月',
                    key: 'talentSdate',
                    align: 'center',
                },
                {
                    title: '考核结束月',
                    key: 'talentEdate',
                    align: 'center',
                },
                // {
                //     title: '考评活动名称',
                //     key: 'talentActivname',
                //     align: 'center',
                // },
                {
                    title: '绩效结果',
                    key: 'talentJxresult',
                    align: 'center',
                },
                  {
                    title: '潜力结果',
                    key: 'talentQlresult',
                    align: 'center',
                },
                {
                    title: '九宫格落位',
                    key: 'talentSudoku',
                    align: 'center',
                },
            ],
            inventoryData:[],
        }   
    },
    props: {
        empId:String
    },
    watch: {

    },
    updated () {
    },
    computed:{
    },
    components: {

    },
    mounted () {
        //this.getData()


    },
    created () {

        this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
        handleClose(){
            const t = this 
            t.header = "";
            t.$emit('closeEmpInfo')
        },
        getData(){            
            const t = this;
            t.header = "";
            if(t.empId && t.empId!==""){
                t.spinShow = true
                let data = {
                    _mt: this.$global.mt + "EmpInfo.getResume",
                    APempId:t.empId
                };
                getDataLevelUserLoginData(data)
                    .then((res) => {
                        if (isSuccess(res, t)) {
                            console.log(res,t)
                            t.spinShow = false
                            t.dataInfo = res.data.content[0].empInfo
                            if(res.data.content[0].empInfo.empHead){
                            let myHeader = res.data.content[0].empInfo.empHead
                                t.header = t.httpImg+myHeader.split(',')[1]
                                //t.header = t.httpImg+'/group1/default/20201127/14/32/7/a1e280cb-1ce0-4a26-9068-de36fb80a1e3.png'
                            }
                            t.appointmentData = res.data.content[0].appinfoList
                            t.educationData = res.data.content[0].educationList
                            t.workData = res.data.content[0].workexpList
                            t.certificateData = res.data.content[0].zccertList
                            t.awarsData = res.data.content[0].rewardList
                            t.punishmentData = res.data.content[0].punishList
                            t.achievementsData = res.data.content[0].formancesList
                            t.inventoryData = res.data.content[0].talentList
                            t.type = res.data.content[0].formancesList[0].empperPertype
                            // 
                            if (t.type === "05month") {
                                t.achievementsColums[2].key = "empperPermonth"
                            } else if (t.type === "10quarter") {
                                t.achievementsColums[2].key = "empperPerquarter"
                            } else {
                                t.achievementsColums[2].key = "empperPeryear"
                            }
                        }
                    }).catch((err) => { 
                        t.spinShow = false
                    }).finally(()=>{
                        t.spinShow = false
                    })
            }
        },
    }
}
</script>
<style lang="scss" scoped>
//@import "../../../sass/updateAndAdd";
@import "~@/sass/mainChildUpdate.scss"; 
.modal .box .title{
    border-bottom:none;
}
/deep/ .ivu-table-cell{
    white-space:pre-wrap !important;
} 

/deep/ .ivu-table td, .ivu-table th{
  border: 1px solid #E5E5E5 !important;
  border-bottom: none !important;
  border-left: none !important;
}
/deep/ .ivu-table-header thead tr th {
    background-color: #EDEDED;
    border-right: 1px solid #E5E5E5 !important;
}
// .cover {
//     width: 100vw;
//     // margin: 0 auto;
// }
.modal .box{
    // width: 1400px;
    // height: 780px;
    width: 80%;
}
.headerBox{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .empHeader{
        width: 83px;
        height: 83px;
        img{
            border-radius: 50%;
            width: 100%;
        }
    }
}
.ivu-form a {
    display: block;
    color: #515a6e;
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
.modal .box .meau-left .ivu-menu-light{
    height: auto;
}
.ivu-menu-vertical.ivu-menu-light:after {
    background: none;
}
.topMar a::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 14px;
    background: #333333;
    position: relative;
    top: 3px;
    margin-right: 10px;
}
.topMar a{
    color: #515a6e;
    font-size: 14px;
    font-weight: bold;
}
.bottomMar{
    margin: 20px  0;
}
.cover .box {
    .meau-left {
        padding: 0;
       // width: 200px;
       width: 13%;
        height: 757px;
    }
    // .right {
    //     width: 900px;
    // }
}
.headImg {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.headImg .header-box {
    background: none;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.headImg .header-box .empBorder {
    display: flex;
    justify-content: center;
}
.headImg .header-box .headerContent {
    padding: 8px;
}
.menuInfo {
    margin-top: 30px;
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
    display: block;
    font-size: 14px;
    color: #515a6e;
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
.topMar {
    padding-left: 15px;
    max-height: 720px;
    overflow-y: scroll;
    padding-right: 15px;
}
@media screen and (max-width: 1400px) {
    .topMar {
        padding-left: 15px;
        max-height: 527px;
        overflow-y: scroll;
        padding-right: 15px;
    }
    .modal .box{
    // width: 1400px;
    // height: 780px;
        width: 80%;
        height: 93%;
    }
    .menuInfo a {
        display: block;
        font-size: 14px;
        color: #515a6e;
        font-family: "微软雅黑";
        width: 100%;
        padding: 11% 9%;

        text-align: left;
      
    }
    .cover .box .meau-left{
        height: 580px;
    }
}
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
.borderBack{
    border-left: none !important;
    border-right: none !important;
    background-color: #fff !important;
}
.empBaseInfo{
      border: 1px solid #E6E6E6;
      background: #f5f5f5;
    .titleClass{
        li{
            color: #515a6e;
            font-weight: bold;
            font-size: 12px;
            background-color: #F5F5F5;
            height: 30px;
            line-height: 30px;
            padding-left: 8px;
            border-bottom: 1px solid #E6E6E6;
            border-right: 1px solid  #E6E6E6;
        }
        .borderNone{
            border-bottom: none;
        }
    }
    .valueClass{
        li{
            height: 30px;
            line-height: 30px;
            padding-left: 8px;
            background-color: #FFFFFF;
            border-bottom: 1px solid #E6E6E6; 
            border-right: 1px solid  #E6E6E6;
        }
        // li:last-child{
        //      border-right: none;
        // }
        .borderNone{
            border-bottom: none;
            border-right: none;
        }
    }
}
.bor-right{
    border-right: none !important;
}
/deep/ td.ivu-table-column-center, th.ivu-table-column-center {
    text-align: revert;
}
/deep/.ivu-col-span-20{
    width: 84.333333%;
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
/deep/.ivu-modal-body{
    font-size: 12px;
}
/deep/ .ivu-modal-body .ivu-btn-text {
  border: none;
}
/deep/ .ivu-table-cell {
    white-space: wrap !important;
   // text-overflow: clip !important;
}
/deep/ .ivu-table-small td .ivu-table-cell {
    text-overflow: normal !important;
    white-space: normal !important;
    overflow: hidden;
}
.biaoqian{
    background-color: #F5F5F5;
    height: 30px;
    line-height: 30px;
    padding-left: 8px;
    border-right: 1px solid #E6E6E6;
    font-weight: bold;
}
.biaoData{
    line-height: 30px;
    padding-left: 8px;
    background-color: #ffffff;
}
</style>
