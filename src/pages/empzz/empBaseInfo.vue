<!--
 * @Author: your name
 * @Date: 2020-11-05 15:29:40
 * @LastEditTime: 2020-12-01 21:27:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\empzz\empBaseInfo.vue
-->
<template>
  <div class="card_box">
    <Card :bordered="false" class="card">
      <p slot="title" class="title">
        <span class="title-tip"></span>
        <span>基本信息</span>
      </p>
      <div class="block">
        <div class="myClass">
          <div class="nvleft">
            <div class="empHeader">
              <img
                :src="
                  cropedImg
                    ? cropedImg
                    : '../../../static/zizhuImg/user_img.png'
                "
                alt=""
              />
            </div>
            <div class="empResume">
              <ul class="myTeam">
                <li @click="openMyResume" class="myZizhuColor">我的简历</li>
                <li @click="openMyTeam" class="myZizhuColor">我的团队</li>
              </ul>
            </div>
          </div>
          <div class="nvright">
            <div class="empName">{{ dataInfo.empName || "" }}</div>
            <div class="empInfo">
              <ul class="ulClass">
                <!-- <li>
                                    性别：<span>{{dataInfo.empGenderDis || ''}}</span>
                                </li> -->
                <li>
                  公司：<span>{{ dataInfo.empUnitidDis || "" }}</span>
                </li>
                <li>
                  部门：<span>{{ dataInfo.empDeptidDis || "" }}</span>
                </li>
                <!-- <li>
                                    工号：<span>{{dataInfo.empEmpno || ''}}</span>
                                </li> -->
                <li>
                  岗位：<span>{{ dataInfo.empPostidDis || "" }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 员工标签 -->
        <div class="tagList" style="">
          <!-- <div style="padding:10px 0 0; margin-left:10px;"> -->
          <Tag
            class="tagBox"
            v-for="(item, index) in tagList"
            :key="index"
            style="border-radius: 4px"
            :style="{ border: '1px solid' + tagColor[index % 8] }"
            :color="tagBackColor[index % 8]"
            >{{ item.tagName }}
          </Tag>
          <!-- </div> -->
        </div>

        <div class="allMessage">
          <div
            class="empImgBlock"
            v-for="(item, index) of imgData"
            :key="index"
            @click="openFun(item.name, item.id, item.funCode, item.funAction)"
          >
            <img :src="'../../../static/zizhuImg/' + item.imgUrl" alt="" />
            <div class="imgDiscript">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </Card>
    <!-- 我的简历 -->
    <Modal
      v-model="myResumeShow"
      :width="100"
      :height="100"
      :closable="false"
      :draggable="true"
      :footer-hide="true"
    >
      <transition name="fade">
        <myResume
          v-show="myResumeShow"
          @closeEmpInfo="closeResume"
          :empId="empId"
          ref="myResume"
        ></myResume>
      </transition>
    </Modal>
  </div>
</template>
<script>
import myResume from "./myResume";
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, getCookie } from "@/lib/util";
import Bus from "@/lib/bus";
export default {
  data() {
    return {
      tagList: [],
      tagColor: [
        "#2E9FEE",
        "#E15D68",
        "#26C06D",
        "#A55BF7",
        "#F1924D",
        "#0263FF",
        "#E74BA2",
        "#ECC734",
      ],
      tagBackColor: [
        "rgba(150,207,246,.8)",
        "rgba(240,174,179,.8)",
        "rgba(146,223,182,.8)",
        "rgba(210,173,251,.8)",
        "rgba(248,200,166,.8)",
        "rgba(128,177,255,.8)",
        "rgba(241,147,199,.8)",
        "rgba(245,227,153,.8)",
      ],
      //打开我的简历
      myResumeShow: false,
      myResume: "",
      dataInfo: {
        empName: "",
        // empGenderDis:'',
        empDeptidDis: "",
        // empEmpno:'',
        empPostidDis: "",
        empUnitidDis: "",
      },
      myCodeList: [],
      httpImg: pubsource.pub_pubf_downlink,
      cropedImg: "",
      // colors:localStorage.getItem('myColors'),
      imgData: [
        {
          name: "银行信息",
          imgUrl: "bank.png",
          funAction: "autoCommonPage",
          funCode: "940200",
          id: "",
        },
        {
          name: "学历信息",
          imgUrl: "edu.png",
          funAction: "autoCommonPage",
          funCode: "940300",
          id: "",
        },
        {
          name: "职称证书",
          imgUrl: "award.png",
          funAction: "autoCommonPage",
          funCode: "940400",
          id: "",
        },
        {
          name: "履历信息",
          imgUrl: "work.png",
          funAction: "autoCommonPage",
          funCode: "940500",
          id: "",
        },
        {
          name: "地址信息",
          imgUrl: "address.png",
          funAction: "autoCommonPage",
          funCode: "940600",
          id: "",
        },
        {
          name: "联系信息",
          imgUrl: "conact.png",
          funAction: "autoCommonPage",
          funCode: "940650",
          id: "",
        },
        {
          name: "绩效信息",
          imgUrl: "rise.png",
          funAction: "autoCommonPage",
          funCode: "940700",
          id: "",
        },
        {
          name: "合同信息",
          imgUrl: "contract.png",
          funAction: "autoCommonPage",
          funCode: "940750",
          id: "",
        },
        {
          name: "家庭成员",
          imgUrl: "family.png",
          funAction: "autoCommonPage",
          funCode: "940800",
          id: "",
        },
        {
          name: "工资单",
          imgUrl: "wages.png",
          funAction: "autosalaryPass",
          funCode: "940150",
          id: "",
        },
        {
          name: "培训信息",
          imgUrl: "train.png",
          funAction: "autoCommonPage",
          funCode: "940850",
          id: "",
        },
        {
          name: "考勤信息",
          imgUrl: "check.png",
          funAction: "autoMonthattCalendar",
          funCode: "940900",
          id: "",
        },
        // {
        //     name:'评价标签',
        //     imgUrl:'evaluate.png'
        // },
        // {
        //     name:'企业知识库',
        //     imgUrl:'knowlege.png'
        // },
        {
          name: "离职发起",
          imgUrl: "hr_tj3.png",
          funAction: "commonFlowList",
          funCode: "930100",
          id: "",
        },
      ],
    };
  },
  computed: {
    roleType() {
      return this.$store.state.user.roleType;
    },
    empId() {
      return this.$store.state.user.empId;
    },
    colors() {
      return this.$store.state.user.userColor;
    },
  },
  components: {
    myResume,
  },
  mounted() {
    console.log(this.colors, "333333333");
    setTimeout(() => {
      this.getData();
    }, 50);
    this.getUserRole();
    this.getTag();
  },
  created() {
    this.httpImg = pubsource.pub_pubf_downlink;
  },
  methods: {
    getData() {
      const t = this;

      getDataLevelUserLoginData({
        _mt: this.$global.mt + "EmpInfo.getResume",
        APempId: t.empId,
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            //console.log(res,'222222')
            t.dataInfo = res.data.content[0].empInfo;
            if (t.dataInfo.empHead) {
              t.cropedImg = t.httpImg + t.dataInfo.empHead.split(",")[1];
              //t.cropedImg = t.httpImg + '/group1/default/20201127/14/32/7/a1e280cb-1ce0-4a26-9068-de36fb80a1e3.png'
            }
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    getTag(id) {
      const t = this;
      //   console.log("触发了", id);
      getDataLevelUserLoginData({
        _mt: this.$global.mt + "EmpInfo.getById",
        //   logType: this.$t("button.upd"),
        APid: t.empId,
        APffk: "gec1947",
        APfunId: "1947",
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].empTagList) {
              t.tagList = res.data.content[0].empTagList;
              // console.log(t.tagList, "单人标签");
            } else {
              t.tagList = [];
            }
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    getUserRole() {
      const t = this;
      getDataLevelUserLoginData({
        _mt: this.$global.mt + "AuthPost.getByUserId",
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            t.myCodeList = res.data.content[0].value;
            for (let i in t.imgData) {
              for (let j in t.myCodeList) {
                if (t.imgData[i].funCode == t.myCodeList[j].funCode) {
                  t.imgData[i].id = t.myCodeList[j].id;
                }
              }
            }
            //console.log(t.imgData,'222222')
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    openMyResume() {
      const t = this;
      console.log(2222222);
      t.$refs.myResume.getData();
      t.myResumeShow = true;
    },
    closeResume() {
      const t = this;
      t.myResumeShow = false;
    },
    openMyTeam() {
      this.openFun("我的团队", "2136", "940100", "autoMyteam");
    },
    openFun(name, id, code, funAction) {
      const t = this;
      const tag = {
        title: name,
        path: "/" + funAction,
        name: funAction,
        query: { id: id, code: code, state: true },
      };
      this.$store.commit("increateTag", tag);
      t.$router.push({
        path: funAction,
        query: {
          id: id,
          code: code,
          state: true,
        },
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.card_box {
  width: 100%;
  height: 100%;
  .card {
    width: 100%;
    height: 100%;
  }
  /deep/ .ivu-table-header thead tr th {
    background-color: #fff !important;
  }
  /deep/ .ivu-card-body {
    height: calc(100% - 37px);
  }
  .block {
    font-size: 13px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .myClass {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5%;
      .nvleft {
        width: 30%;
        .empHeader {
          width: 75px;
          height: 75px;
          // margin: 10px 0 10px 32px;
          margin: 0 auto 10px;
          img {
            border-radius: 50%;
            width: 100%;
          }
        }
        .empResume {
          .myTeam li {
            width: 80px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            padding: 4px 5px;
            cursor: pointer;
            border-radius: 4px;
            margin: 0 auto 10px;
          }
        }
      }
      .nvright {
        width: 70%;
        .empName {
          margin: 10px auto;
          text-align: left;
          font-size: 17px;
          padding-left: 30px;
          font-weight: bold;
        }
        .empInfo {
          margin-top: 10px;
          .ulClass {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-left: 15px;
            li {
              width: 100%;
              font-size: 13px;
              margin: 10px 0 0 5%;
              font-weight: bold;
              span {
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .allMessage {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .empImgBlock {
        width: 33%;
        height: 57px;
        margin: 8% 0;
        text-align: center;
        img {
          cursor: pointer;
          width: 50%;
        }
      }
    }
    .imgDiscript {
      font-size: 13px;
      margin-top: 10px;
    }
  }
  .title {
    display: flex;
    justify-content: start;
    align-items: center;
  }
}

.tagList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  padding: 0 5%;
}
@media(max-height:1920px){
    .tagBox{
        margin: 10px 0 0 10px;
    }
}

@media (max-width: 1366px) {
  .tagBox {
      margin: 10px 10px 0 0;
  }
}
/deep/ .ivu-card-extra {
  top: 8px;
}
/deep/ .ivu-modal-body {
  padding: 0;
}
</style>
