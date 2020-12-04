<template>
  <div class="empUserLeft">
    <div style="width: 100%;height: 100%" class="menuAll">
      <div class="menuLeft">
        <Row style="width: 104px;height: 114px;text-align: center">
          <img src="http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/060828381f30e924ce9f0a854e086e061d95f74f.jpg" class="userImg"
               alt="">
        </Row>
        <Row class="basInfo">
          {{$t('lang_homePage.myMessage.empTip')}}
        </Row>
      </div>
      <div class="menuRight">
        <!--  基本信息 -->
        <Row style="width:100%;height: 80%" >
          <i-col span="11" class="col1 ">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empNumber')}}:</span><span>{{empDataUser.empkiWorkno}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empName')}}:</span><span>{{empDataUser.empCname}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.empStatus')}}:</span><span>{{empDataUser.empState}}</span>
          </i-col>
          <i-col span="11" class="col1 ">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empCompany')}}:</span><span>{{empDataUser.empcompHirecompany}}</span>
          </i-col>
          <i-col span="11" class="col1 ">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empDepart')}}:</span><span>{{empDataUser.empcompDept}}</span>
          </i-col>
          <i-col span="11" class="col1 ">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empPost')}}:</span><span>{{empDataUser.empcompPost}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.empPLeve')}}:</span><span>{{empDataUser.empcompPostLevel}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.empEntime')}}:</span><span>{{empDataUser.empcompEntrydate}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span :class="lang?'firstLetter':''">{{$t('lang_homePage.myMessage.empSiling')}}:</span><span>{{empDataUser.empcompAge}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.empTjobtime')}}:</span><span>{{empDataUser.empFirstworkdate}}</span>
          </i-col>
         <!-- <i-col span="11" class="col1">
            <span>人员类型：</span><span>{{empInfo.empkiEmpmapping}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>编制类别：</span><span>{{empInfo.empkiEstablishment}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>管培生界数：</span><span>{{empInfo.empkiTraineeoundsDis}}</span>
          </i-col>-->
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.whetherRemote')}}:</span><span>{{empDataUser.empcompTravelaward}}</span>
          </i-col>
          <i-col span="11" class="col1">
            <span>{{$t('lang_homePage.myMessage.whetherForeign')}}:</span><span>{{empDataUser.empcompImportaward}}</span>
          </i-col>

         <!-- <i-col span="8" class="col1">
            <span>性&nbsp&nbsp&nbsp&nbsp别：</span><span>{{empDataUser.empGender}}</span>
          </i-col>
          <i-col span="8" class="col1 ">
            <span>民&nbsp;&nbsp;&nbsp;&nbsp;族：</span><span>{{empInfo.empNationDis}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>出生日期：</span><span>{{empDataUser.empBirthdate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>婚育状况：</span><span>{{empInfo.empMarriage}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>政治面貌：</span><span>{{empInfo.empPoliticalDis}}</span>
          </i-col>
          <i-col span="8" class="col1 ">
            <span>职&nbsp;&nbsp;&nbsp;&nbsp;称：</span><span>{{empInfo.empTechnicaltitle}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>职称专业：</span><span>{{empInfo.empTechspec}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>职称取得时间：</span><span>{{empInfo.empTechdate}}</span>
          </i-col>
          &lt;!&ndash;关键信息&ndash;&gt;
          <i-col span="8" class="col1">
            <span>生效日期：</span><span>{{empInfo.empkiSdate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>失效日期：</span><span>{{empInfo.empkiEdate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>薪制类别：</span><span>{{empInfo.empkiPaystyleDis}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>离职日期：</span><span>{{empInfo.empkiSeparatedate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>离职类型：</span><span>{{empInfo.empkiSeparateTypeDis}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>离职原因：</span><span>{{empInfo.empkiSeparatereason}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>离职去向：</span><span>{{empInfo.empkiSeparateTodirection}}</span>
          </i-col>
          &lt;!&ndash;证件信息&ndash;&gt;
          <i-col span="8" class="col1">
            <span>证件号码：</span><span>{{empInfo.empidTypeName}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>证件类型：</span><span>{{empInfo.empidTypeName}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>生效日期：</span><span>{{empInfo.empidSdate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>失效日期：</span><span>{{empInfo.empidEdate}}</span>
          </i-col>
          &lt;!&ndash;调动信息&ndash;&gt;
          <i-col span="8" class="col1">
            <span>Action类型：</span><span>{{empInfo.empactType}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>Action说明：</span><span>{{empInfo.empactDesc}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>生效时间：</span><span>{{empInfo.empactSdate}}</span>
          </i-col>
          <i-col span="8" class="col1">
            <span>失效时间：</span><span>{{empInfo.empactEdate}}</span>
          </i-col>-->
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        empDataUser: {},
        empInfo: {},
        lang:this.$store.state.app.lang !== 'en-US' ? true : false
//        guanjian: {},
//        zhengJian: {},
//        diaoDong: {},
      }
    },
    components: {
    },
    computed: {
      roleType() {
        return this.$store.state.user.roleType
      },
    },
    methods: {
      getData() {
        const t = this
        t.isSpin = true
        const data = {
          _mt:  this.$global.mt+'EmpSelfInfo.getByUser',
          funId: t.funId,
          logType: '员工首页左边字段',
        }
        getDataLevelUserLogin(data).then((res) => {
            t.empDataUser = res.data.content[0] || {}
            localStorage.setItem('empId', t.empDataUser.id)
//            if (t.empDataUser.id) t.getBase(t.empDataUser.id)
        }).catch(() => {
          t.isSpin = false
          // t.$Modal.error({
          //   title: this.$t('reminder.err'),
          //   content: this.$t('reminder.errormessage'),
          // })
        })
      },
      // 员工基本信息
//      getBase(empId) {
//        const t = this
//        const data = {
//          _mt:  this.$global.mt+'EmpSelfInfo.getEmpInfo',
//          funId: t.funId,
//          logType: '员工首页左边字段员工信息',
//          empId: empId,
//          type: 'base',
//        }
//        getDataLevelUserLogin(data).then((res) => {
//          t.empInfo = JSON.parse(res.data.content[0].value) || {}
//          console.log('t.empInfo----', t.empInfo)
//        }).catch(() => {
//        })
//      },

    },
    mounted() {
      this.getData()
//      this.getBase1()
//      this.getBase2()
//      this.getBase3()
    },
  }
</script>
<style lang="scss" scoped>
  .empUserLeft{
    /*width: 700px;*/
    .menuAll{
      display: flex;
      padding: 0px;
      padding-bottom: 0;
      box-sizing: border-box;
      .menuLeft {
        width: 20%;
        height: 100%;
        /*background: red;*/
        position: relative;
        .userImg {
          width:100%;
          height: 100%;
          margin: 5px 0;
        }
        .basInfo{
          width: 104px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          background: #0089DD;
          color: white;
          margin-top: 20px;
          border-radius:4px;
        }
      }
      .menuRight {
        flex: 1;
        height: 100%;
        /*margin-left: 5%;*/
        font-size: 14px;
        /*background: lawngreen;*/
        .col1{
          /*margin-right: 8%;*/
          /*margin-left: 1%;*/
          margin-bottom: 20px;
          color: #666666;
          font-family:Source Han Sans CN;
          font-weight:400;
          padding-right: 10px;
          overflow: hidden;
          line-height: 22px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .firstLetter::first-letter{
            letter-spacing: 14px;
          }
        }
        .col6{
          margin-right: 0;
        }
        span {
          display: inline-block;
          /*width: 30%;*/
          text-align: left;
        }
      }
    }
  }
</style>
