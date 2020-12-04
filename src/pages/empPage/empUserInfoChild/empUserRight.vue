<template>
  <div class="empUserRightt">
    <ul>
      <li v-for="(item,index) in empUserInfoList" :key="index" @click="openUserEdit(item)">
        <p>
          <img :src="item.imgUrl" alt="">
        </p>
        <p>{{item.title}}</p>
      </li>
    </ul>
    <emp-userInfoEdit v-show="empEditShow" @closeUp="closeUp" ref="update" :logType="logType" :empUserInfoList="empUserInfoList" :empUserInfoAllList="empUserInfoAllList" :isShowSpin="isShowSpin"  @refresh="refresh"></emp-userInfoEdit>
  </div>
</template>
<script>
  import empUserInfoEdit from '../components/empUserInfoEdit'
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    data() {
      return {
        empUserInfoList: [
          {
            title: this.$t('lang_homePage.myMessage.officeMessage'),
            imgUrl: '../../../../static/empPage/emp_01.png',
            type: 'comp',
          },
          {
            title: this.$t('lang_homePage.myMessage.contractMessage'),
            imgUrl: '../../../../static/empPage/emp_03.png',
            type: 'contract',
          },
          {
            title: this.$t('lang_homePage.myMessage.bankMessage'),
            imgUrl: '../../../../static/empPage/emp_05.png',
            type: 'bank',
          },
          {
            title: this.$t('lang_homePage.myMessage.qualificaMessage'),
            imgUrl: '../../../../static/empPage/emp_06.png',
            type: 'edu',
          },
          {
            title: this.$t('lang_homePage.myMessage.trackRecord'),
            imgUrl: '../../../../static/empPage/emp_07.png',
            type: 'work',
          },
          {
            title: this.$t('lang_homePage.myMessage.contactMessage'),
            imgUrl: '../../../../static/empPage/emp_08.png',
            type: 'contact',
          },
          {
            title: this.$t('lang_homePage.myMessage.addressMessage'),
            imgUrl: '../../../../static/empPage/emp_09.png',
            type: 'address',
          },
          {
            title: this.$t('lang_homePage.myMessage.familyMessage'),
            imgUrl: '../../../../static/empPage/emp_10.png',
            type: 'family',
          }
        ],
        empEditShow: false,
        logType: '',
        typee: '',
        empUserInfoAllList: {},
        isShowSpin: false,
      }
    },
    components: {
      empUserInfoEdit,
    },
    methods: {
      openUserEdit(item) {
        const t = this
        t.empEditShow = true
        t.logType = item.title
        t.typee = item.type
        t.getData(item.type)
      },
      closeUp() {
        const t = this
        t.empEditShow = false
      },
      getData(type) {
        const t = this
        const data = {
          _mt:  this.$global.mt+'EmpSelfInfo.getEmpInfo',
          funId: t.funId,
          logType: '员工首页右边字段',
          empId: localStorage.getItem('empId'),
          type: type,
        }
//        console.log(data)
        t.isShowSpin = true
        getDataLevelUserLogin(data).then((res) => {
          t.isShowSpin = false
//          if (isSuccess(res, t)) {
//          }
          t.empUserInfoAllList = JSON.parse(res.data.content[0].value)
//          console.log(88888, t.empUserInfoAllList);
          if (type === 'base') {
            // this.$refs.update.userImg = pubsource.pub_pubf_downlink + empUserInfoAllList.empphotoupload.split(':')[1]
          }
        }).catch(() => {
          t.isShowSpin = false
//          t.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
        })
      },
      refresh(num) {
        switch (num) {
          case '6':
            this.getData('bank')
            break
          case '7':
            this.getData('edu')
            break
          case '8':
            this.getData('work')
            break
          case '9':
            this.getData('contact')
            break
          case '10':
            this.getData('address')
            break
          case '11':
            this.getData('family')
            break
        }
      },
    },
    computed: {
      roleType() {
        return this.$store.state.user.roleType
      },
    },
  }
</script>
<style lang="scss" scoped>
  .empUserRightt{
    flex: 1;
    height: 100%;
    ul{
      display: flex;
      height: 100%;
      flex-wrap: wrap;
      li{
        /*width: 100px;*/
        width: 40%;
        height: 60px;
        text-align: center;
        margin-left: 20px;
        margin-top: 15px;
        border:1px solid rgba(0,137,221,1);
        border-radius:4px;
        cursor: pointer;
        p{
          width: 100%;
        }
        p:nth-of-type(1) {
          padding-top: 5px;
        }
        p:nth-of-type(2) {
          font-size:14px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(102,102,102,1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      li:nth-child(1){
        margin-top: 0;
      }
      li:nth-child(2){
        margin-top: 0;
      }
    }
  }
</style>
