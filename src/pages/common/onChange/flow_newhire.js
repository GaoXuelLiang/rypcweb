/**
 * Created by Aaron on 2018/4/19.
 */

import { getDataLevelUserLogin } from "../../../axios/axios";

const emp_flow_newhire = {
  all_dis() {
    emp_flow_newhire.empnhIstrainer_dis(this);
    emp_flow_newhire.empnhIsentry_dis(this);
    emp_flow_newhire.empnhIsexpensecard_dis(this);
    emp_flow_newhire.empnhTechnicaltitle_dis(this);
    emp_flow_newhire.empnhDataisok_dis(this);
    // emp_flow_newhire.empnhContractsdate_set(this)
    emp_flow_newhire.empnhProbation_dis(this);
    emp_flow_newhire.empnhEntrydate_dis(this);
    emp_flow_newhire.empnhPostlevel_set(this);
    emp_flow_newhire.empnhFirstworkdate_set(this);
  },
  empnhPostlevel(node) {
    emp_flow_newhire.empnhPostlevel_set(this.$parent);
  },
  empnhFirstworkdate(node) {
    emp_flow_newhire.empnhFirstworkdate_set(this.$parent);
  },
  empnhIstrainer(node) {
    emp_flow_newhire.empnhIstrainer_set(this.$parent);
    emp_flow_newhire.empnhIstrainer_dis(this.$parent);
  },

  empnhTechnicaltitle(node) {
    emp_flow_newhire.empnhTechnicaltitle_set(this.$parent);
    emp_flow_newhire.empnhTechnicaltitle_dis(this.$parent);
  },

  empnhIsentry(node) {
    emp_flow_newhire.empnhIsentry_set(this.$parent);
    emp_flow_newhire.empnhIsentry_dis(this.$parent);
  },
  // empnhCname

  empnhIsexpensecard(node) {
    emp_flow_newhire.empnhIsexpensecard_set(this.$parent);
    emp_flow_newhire.empnhIsexpensecard_dis(this.$parent);
  },
  empnhDataisok(node) {
    emp_flow_newhire.empnhDataisok_set(this.$parent);
    emp_flow_newhire.empnhDataisok_dis(this.$parent);
  },
  empnhProbation(node) {
    emp_flow_newhire.empnhEntrydate_set(this.$parent);
    emp_flow_newhire.empnhEntrydate_dis(this.$parent);
    emp_flow_newhire.empnhProbation_dis(this.$parent);
  },
  empnhContractsdate(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent);
  },
  empnhContractperiod(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent);
  },
  empnhContracttype(node) {
    emp_flow_newhire.empnhContractsdate_set(this.$parent);
  },
  empnhHirelocation(node) {
    emp_flow_newhire.empnhHirelocation_set(this.$parent);
  },
  empnhWorklocation(node) {
    emp_flow_newhire.empnhWorklocation_set(this.$parent);
  },
  empnhEntrydate(node) {
    emp_flow_newhire.empnhEntrydate_set(this.$parent);
  },
  empnhIdtype(node) {
    emp_flow_newhire.empnhIdno_set(this.$parent);
  },
  empnhIdno(node) {
    emp_flow_newhire.empnhIdno_set(this.$parent);
  },
  empnhHirecompany(node) {
    emp_flow_newhire.empnhHirecompany_set(this.$parent);
  },
  empnhDept(node) {
    emp_flow_newhire.empnhDept_set(this.$parent);
  },
  empnhPost(node) {
    emp_flow_newhire.empnhPost_set(this.$parent);
  },
  empnhRegisterprovince(node) {
    emp_flow_newhire.empnhRegisterprovince_set(this.$parent);
  },
  empnhResideprovince(node) {
    emp_flow_newhire.empnhResideprovince_set(this.$parent);
  },
  empnhCname(node) {
    emp_flow_newhire.empnhCname_set(this.$parent);
  },
  /*
   * 人员职级>9，合同期限默认5年，工时默认不定时工时；其他默认3年，定时工时；试用期期限都默认为6个月
   *  合同期限 empnhContractperiod(5) empnhContractworktime(02flexible 不定时工时 01standard 标准工时) 试用期限 empnhProbation(6)
   * */
  empnhPostlevel_set(t) {
    if (t.valueMap.empnhPostlevel) {
      if (
        t.$refs[t.valueMap.empnhPostlevel][0].formDataSubmit.empnhPostlevel ===
          "其他" ||
        Number(
          t.$refs[t.valueMap.empnhPostlevel][0].formDataSubmit.empnhPostlevel
        ) <= 9
      ) {
        t.$refs[t.valueMap.empnhContractperiod][0].$set(
          t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit,
          "empnhContractperiod",
          "3"
        );
        t.$refs[t.valueMap.empnhContractworktime][0].$set(
          t.$refs[t.valueMap.empnhContractworktime][0].formDataSubmit,
          "empnhContractworktime",
          "01standard"
        );
        if (
          !t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation
        ) {
          t.$refs[t.valueMap.empnhProbation][0].$set(
            t.$refs[t.valueMap.empnhProbation][0].formDataSubmit,
            "empnhProbation",
            "6"
          );
        }
      }
      if (
        Number(
          t.$refs[t.valueMap.empnhPostlevel][0].formDataSubmit.empnhPostlevel
        ) > 9
      ) {
        if (t.valueMap.empnhPostlevel) {
          t.$refs[t.valueMap.empnhContractperiod][0].$set(
            t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit,
            "empnhContractperiod",
            "5"
          );
          t.$refs[t.valueMap.empnhContractworktime][0].$set(
            t.$refs[t.valueMap.empnhContractworktime][0].formDataSubmit,
            "empnhContractworktime",
            "02flexible"
          );
          if (
            !t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation
          ) {
            t.$refs[t.valueMap.empnhProbation][0].$set(
              t.$refs[t.valueMap.empnhProbation][0].formDataSubmit,
              "empnhProbation",
              "6"
            );
          }
        }
      }
    }
  },
  // empnhFirstworkdate_set(t) {
  //   let firstDate
  //   if (t.valueMap.empnhFirstworkdate) {
  //     firstDate = new Date(t.$refs[t.valueMap.empnhFirstworkdate][0].formDataSubmit.empnhFirstworkdate)
  //     let entrydate = new Date(t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate)
  //     let endYearDate = new Date(entrydate.getFullYear() + '-12' + '-31')
  //     let workDate = endYearDate.getTime() - entrydate.getTime()
  //     let workDateRate = Number(workDate / 1000 / 60 / 60 / 24 / 365).toFixed(1)
  //     let annual
  //     let date1 = new Date(firstDate.setFullYear(firstDate.getFullYear() + 10))
  //     let date2 = new Date()
  //     if (date1.getTime() - date2.getTime() > 0 && firstDate.getFullYear() !== entrydate.getFullYear()) {
  //       annual = workDateRate * 5
  //       t.$refs[t.valueMap.empnhAnnualleave][0].$set(t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit, 'empnhAnnualleave', annual)
  //     }
  //     let date3 = new Date(firstDate.setFullYear(firstDate.getFullYear() + 20))
  //     if ((date1.getTime() - date2.getTime() <= 0) && (date3.getTime() - date2.getTime() > 0) && firstDate.getFullYear() !== entrydate.getFullYear()) {
  //       annual = workDateRate * 10
  //       t.$refs[t.valueMap.empnhAnnualleave][0].$set(t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit, 'empnhAnnualleave', annual)
  //     }
  //     console.log('1111' + firstDate.getFullYear()+ '2222' +entrydate.getFullYear())
  //     if (date3.getTime() - date2.getTime() <= 0 && firstDate.getFullYear() !== entrydate.getFullYear()) {
  //       annual = workDateRate * 15
  //       t.$refs[t.valueMap.empnhAnnualleave][0].$set(t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit, 'empnhAnnualleave', annual)
  //     }
  //     if (firstDate.getFullYear() === entrydate.getFullYear()) {
  //       t.$refs[t.valueMap.empnhAnnualleave][0].$set(t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit, 'empnhAnnualleave', '0')
  //     }
  //   }
  // },
  empnhFirstworkdate_set(t) {
    let firstDate;
    if (t.valueMap.empnhFirstworkdate) {
      firstDate =
        t.$refs[t.valueMap.empnhFirstworkdate][0].formDataSubmit
          .empnhFirstworkdate; // 参加工作时间
      let entrydate =
        t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate; // 入职时间
      let dayDate = new Date().format("yyyy-MM-dd"); // 当前时间
      // console.log(firstDate)
      // console.log(dayDate)
      // console.log((DateMinus(firstDate, entrydate)) / 365)   // 工作比例
      // console.log(parseInt(DateMinus(firstDate, dayDate) / 365))
      let workPropo = (DateMinus(entrydate, "2020-12-31") / 365).toFixed(1);
      // console.log(workPropo)
      let dateNum = parseInt(DateMinus(firstDate, dayDate) / 365); // 年假区间范围
      // console.log(dateNum)
      if (dateNum < 1) {
        let annual = 0;
        t.$refs[t.valueMap.empnhAnnualleave][0].$set(
          t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit,
          "empnhAnnualleave",
          annual.toString()
        );
      } else if (dateNum < 10 && dateNum > 1) {
        let annual = workPropo * 5;
        t.$refs[t.valueMap.empnhAnnualleave][0].$set(
          t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit,
          "empnhAnnualleave",
          annual.toString()
        );
      } else if (dateNum < 20 && dateNum > 10) {
        let annual = workPropo * 10;
        t.$refs[t.valueMap.empnhAnnualleave][0].$set(
          t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit,
          "empnhAnnualleave",
          annual.toString()
        );
      } else {
        let annual = Number(workPropo) * 15;
        t.$refs[t.valueMap.empnhAnnualleave][0].$set(
          t.$refs[t.valueMap.empnhAnnualleave][0].formDataSubmit,
          "empnhAnnualleave",
          annual.toString()
        );
      }
    }
  },
  empnhIstrainer_set(t) {
    if (
      t.$refs[t.valueMap.empnhIstrainer][0].formDataSubmit.empnhIstrainer ===
      "0"
    ) {
      if (t.valueMap.empnhTraineeounds) {
        t.$refs[t.valueMap.empnhTraineeounds][0].$set(
          t.$refs[t.valueMap.empnhTraineeounds][0].formDataSubmit,
          "empnhTraineeounds",
          ""
        );
      }
    }
  },

  empnhIstrainer_dis(t) {
    if (t.valueMap.empnhIstrainer) {
      if (
        t.$refs[t.valueMap.empnhIstrainer][0].formDataSubmit.empnhIstrainer ===
        "1"
      ) {
        if (t.valueMap.empnhTraineeounds) {
          t.$refs[t.valueMap.empnhTraineeounds][0].$set(
            t.$refs[t.valueMap.empnhTraineeounds][0].formshow,
            "empnhTraineeounds",
            ""
          );
        }
      } else {
        if (t.valueMap.empnhTraineeounds) {
          t.$refs[t.valueMap.empnhTraineeounds][0].$delete(
            t.$refs[t.valueMap.empnhTraineeounds][0].formshow,
            "empnhTraineeounds"
          );
        }
      }
    }
  },

  empnhIsentry_dis(t) {
    if (t.valueMap.empnhIsentry) {
      if (
        t.$refs[t.valueMap.empnhIsentry][0].formDataSubmit.empnhIsentry ===
        "03cancle"
      ) {
        t.$refs[t.valueMap.empnhAfterhandle][0].$set(
          t.$refs[t.valueMap.empnhAfterhandle][0].formshow,
          "empnhAfterhandle",
          ""
        );
      } else {
        t.$refs[t.valueMap.empnhAfterhandle][0].$delete(
          t.$refs[t.valueMap.empnhAfterhandle][0].formshow,
          "empnhAfterhandle"
        );
      }
    }
  },
  empnhIsentry_set(t) {
    if (
      t.$refs[t.valueMap.empnhIsentry][0].formDataSubmit.empnhIsentry ===
      "03cancle"
    ) {
      t.$refs[t.valueMap.empnhAfterhandle][0].$set(
        t.$refs[t.valueMap.empnhAfterhandle][0].formDataSubmit,
        "empnhAfterhandle",
        ""
      );
    }
  },
  empnhRegisterprovince_set(t) {
    t.$refs[t.valueMap.empnhRegistercity][0].$set(
      t.$refs[t.valueMap.empnhRegistercity][0].formDataSubmit,
      "empnhRegistercity",
      ""
    );
    t.$refs[t.valueMap.empnhRegistercity][0].$refs.empnhRegistercity.thisValue =
      "";
  },
  empnhResideprovince_set(t) {
    t.$refs[t.valueMap.empnhResidecity][0].$set(
      t.$refs[t.valueMap.empnhResidecity][0].formDataSubmit,
      "empnhResidecity",
      ""
    );
    t.$refs[t.valueMap.empnhResidecity][0].$refs.empnhResidecity.thisValue = "";
  },
  // 清除雇佣公司后，同时清楚已选择的部门及岗位信息
  empnhHirecompany_set(t) {
    let com;
    let comDis;
    if (t.valueMap.empnhHirecompany) {
      com =
        t.$refs[t.valueMap.empnhHirecompany][0].formDataSubmit.empnhHirecompany;
      comDis =
        t.$refs[t.valueMap.empnhHirecompany][0].$refs.empnhHirecompany
          .thisValue;
    }
    t.$refs[t.valueMap.empnhDept][0].$set(
      t.$refs[t.valueMap.empnhDept][0].formDataSubmit,
      "empnhDept",
      ""
    );
    t.$refs[t.valueMap.empnhDept][0].$refs.empnhDept.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhDept = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhPost][0].$set(
      t.$refs[t.valueMap.empnhPost][0].formDataSubmit,
      "empnhPost",
      ""
    );
    t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhPost = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCostcenter][0].$set(
      t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit,
      "empnhCostcenter",
      ""
    );
    t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhCostcenter = "";

    t.$refs[t.valueMap.empnhBuspmp][0].$set(
      t.$refs[t.valueMap.empnhBuspmp][0].formDataSubmit,
      "empnhBuspmp",
      ""
    );
    t.$refs[t.valueMap.empnhBuspmp][0].$refs.empnhBuspmp.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhBuspmp = "";

    t.$refs[t.valueMap.empnhFunpmp][0].$set(
      t.$refs[t.valueMap.empnhFunpmp][0].formDataSubmit,
      "empnhFunpmp",
      ""
    );
    t.$refs[t.valueMap.empnhFunpmp][0].$refs.empnhFunpmp.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhFunpmp = "";

    t.$refs[t.valueMap.empnhRecruiter][0].$set(
      t.$refs[t.valueMap.empnhRecruiter][0].formDataSubmit,
      "empnhRecruiter",
      ""
    );
    t.$refs[t.valueMap.empnhRecruiter][0].$refs.empnhRecruiter.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhRecruiter = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhHr][0].$set(
      t.$refs[t.valueMap.empnhHr][0].formDataSubmit,
      "empnhHr",
      ""
    );
    t.$refs[t.valueMap.empnhHr][0].$refs.empnhHr.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhHr = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhDeptsiger][0].$set(
      t.$refs[t.valueMap.empnhDeptsiger][0].formDataSubmit,
      "empnhDeptsiger",
      ""
    );
    t.$refs[t.valueMap.empnhDeptsiger][0].$refs.empnhDeptsiger.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhDeptsiger = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCompsiger][0].$set(
      t.$refs[t.valueMap.empnhCompsiger][0].formDataSubmit,
      "empnhCompsiger",
      ""
    );
    t.$refs[t.valueMap.empnhCompsiger][0].$refs.empnhCompsiger.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhCompsiger = ""; //弹出框，清空存放的值
  },
  // 清除部门，同时清除已选择的岗位及成本中心信息
  empnhDept_set(t) {
    let dept;
    let deptDis;
    if (t.valueMap.empnhDept) {
      dept = t.$refs[t.valueMap.empnhDept][0].formDataSubmit.empnhDept;
      deptDis = t.$refs[t.valueMap.empnhDept][0].$refs.empnhDept.thisValue;
    }
    t.$refs[t.valueMap.empnhPost][0].$set(
      t.$refs[t.valueMap.empnhPost][0].formDataSubmit,
      "empnhPost",
      ""
    );
    t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhPost = ""; //弹出框，清空存放的值

    t.$refs[t.valueMap.empnhCostcenter][0].$set(
      t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit,
      "empnhCostcenter",
      ""
    );
    t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue = "";
    t.$store.state.flowClmkMap.popForm.empnhCostcenter = ""; //弹出框，清空存放的值
  },
  // 清除岗位后，同时清楚已选择的成本中心
  empnhPost_set(t) {
    let post;
    let postDis;
    if (t.valueMap.empnhPost) {
      post = t.$refs[t.valueMap.empnhPost][0].formDataSubmit.empnhPost;
      postDis = t.$refs[t.valueMap.empnhPost][0].$refs.empnhPost.thisValue;
    }
    if (post.length <= 0 || postDis.length <= 0) {
      // 级联获取的，需要加判断，不然，级联获取之后，又会清空
      t.$refs[t.valueMap.empnhCostcenter][0].$set(
        t.$refs[t.valueMap.empnhCostcenter][0].formDataSubmit,
        "empnhCostcenter",
        ""
      );
      t.$refs[t.valueMap.empnhCostcenter][0].$refs.empnhCostcenter.thisValue =
        "";
      t.$store.state.flowClmkMap.popForm.empnhCostcenter = "";
    }
  },
  // 报销是否令卡发放
  empnhIsexpensecard_dis(t) {
    if (t.valueMap.empnhIsexpensecard) {
      //   if (
      //     t.$refs[t.valueMap.empnhIsexpensecard][0].formDataSubmit
      //       .empnhIsexpensecard === "0" ||
      //     !t.$refs[t.valueMap.empnhIsexpensecard][0].formDataSubmit
      //       .empnhIsexpensecard
      //   ) {
      //     if (t.valueMap.empnhExpensebank) {
      //       t.$refs[t.valueMap.empnhExpensebank][0].$delete(
      //         t.$refs[t.valueMap.empnhExpensebank][0].formshow,
      //         "empnhExpensebank"
      //       );
      //     }
      //     if (t.valueMap.empnhExpenseaccount) {
      //       t.$refs[t.valueMap.empnhExpenseaccount][0].$delete(
      //         t.$refs[t.valueMap.empnhExpenseaccount][0].formshow,
      //         "empnhExpenseaccount"
      //       );
      //     }
      //     if (t.valueMap.empnhExpenseaccname) {
      //       t.$refs[t.valueMap.empnhExpenseaccname][0].$delete(
      //         t.$refs[t.valueMap.empnhExpenseaccname][0].formshow,
      //         "empnhExpenseaccname"
      //       );
      //     }
      //     if (t.valueMap.empnhSalexpensebank) {
      //       t.$refs[t.valueMap.empnhSalexpensebank][0].$delete(
      //         t.$refs[t.valueMap.empnhSalexpensebank][0].formshow,
      //         "empnhSalexpensebank"
      //       );
      //     }
      //   } else {
      //     if (t.valueMap.empnhExpensebank) {
      //       t.$refs[t.valueMap.empnhExpensebank][0].$set(
      //         t.$refs[t.valueMap.empnhExpensebank][0].formshow,
      //         "empnhExpensebank",
      //         ""
      //       );
      //     }
      //     if (t.valueMap.empnhExpenseaccount) {
      //       t.$refs[t.valueMap.empnhExpenseaccount][0].$set(
      //         t.$refs[t.valueMap.empnhExpenseaccount][0].formshow,
      //         "empnhExpenseaccount",
      //         ""
      //       );
      //     }
      //     if (t.valueMap.empnhExpenseaccname) {
      //       t.$refs[t.valueMap.empnhExpenseaccname][0].$set(
      //         t.$refs[t.valueMap.empnhExpenseaccname][0].formshow,
      //         "empnhExpenseaccname",
      //         ""
      //       );
      //     }
      //     if (t.valueMap.empnhSalexpensebank) {
      //       t.$refs[t.valueMap.empnhSalexpensebank][0].$set(
      //         t.$refs[t.valueMap.empnhSalexpensebank][0].formshow,
      //         "empnhSalexpensebank",
      //         ""
      //       );
      //     }
      //   }
    }
  },
  empnhIsexpensecard_set(t) {
    if (
      t.valueMap.empnhIsexpensecard &&
      t.$refs[t.valueMap.empnhIsexpensecard][0].formDataSubmit
        .empnhIsexpensecard.thisValue === "0"
    ) {
      if (t.valueMap.empnhSalexpensebank) {
        t.$refs[t.valueMap.empnhSalexpensebank][0].$delete(
          t.$refs[t.valueMap.empnhSalexpensebank][0].formshow,
          "empnhSalexpensebank"
        );
      }
      if (t.valueMap.empnhExpensebank) {
        t.$refs[t.valueMap.empnhExpensebank][0].$set(
          t.$refs[t.valueMap.empnhExpensebank][0].formDataSubmit,
          "empnhExpensebank",
          ""
        );
      }
      if (t.valueMap.empnhExpenseaccount) {
        t.$refs[t.valueMap.empnhExpenseaccount][0].$set(
          t.$refs[t.valueMap.empnhExpenseaccount][0].formDataSubmit,
          "empnhExpenseaccount",
          ""
        );
      }
      if (t.valueMap.empnhExpenseaccname) {
        t.$refs[t.valueMap.empnhExpenseaccname][0].$set(
          t.$refs[t.valueMap.empnhExpenseaccname][0].formDataSubmit,
          "empnhExpenseaccname",
          ""
        );
      }
    } else {
      if (t.valueMap.empnhExpenseaccname) {
        t.$refs[t.valueMap.empnhExpenseaccname][0].$set(
          t.$refs[t.valueMap.empnhExpenseaccname][0].formDataSubmit,
          "empnhExpenseaccname",
          t.$refs[t.valueMap.empnhCname][0].formDataSubmit.empnhCname
        );
      }
    }
  },

  empnhTechnicaltitle_dis(t) {
    // if (t.valueMap.empnhTechnicaltitle) {
    //   if (
    //     t.$refs[t.valueMap.empnhTechnicaltitle][0].formDataSubmit
    //       .empnhTechnicaltitle === "00common"
    //   ) {
    //     if (t.valueMap.empnhTechspec) {
    //       t.$refs[t.valueMap.empnhTechspec][0].$delete(
    //         t.$refs[t.valueMap.empnhTechspec][0].formshow,
    //         "empnhTechspec"
    //       );
    //     }
    //     if (t.valueMap.empnhTechdate) {
    //       t.$refs[t.valueMap.empnhTechdate][0].$delete(
    //         t.$refs[t.valueMap.empnhTechdate][0].formshow,
    //         "empnhTechdate"
    //       );
    //     }
    //   } else {
    //     if (t.valueMap.empnhTechspec) {
    //       t.$refs[t.valueMap.empnhTechspec][0].$set(
    //         t.$refs[t.valueMap.empnhTechspec][0].formshow,
    //         "empnhTechspec",
    //         ""
    //       );
    //     }
    //     if (t.valueMap.empnhTechdate) {
    //       t.$refs[t.valueMap.empnhTechdate][0].$set(
    //         t.$refs[t.valueMap.empnhTechdate][0].formshow,
    //         "empnhTechdate",
    //         ""
    //       );
    //     }
    //   }
    // }
  },
  empnhTechnicaltitle_set(t) {
    if (
      t.valueMap.empnhTechnicaltitle ||
      t.$refs[t.valueMap.empnhTechnicaltitle][0].formDataSubmit
        .empnhTechnicaltitle === "00common"
    ) {
      if (t.valueMap.empnhTechspec) {
        t.$refs[t.valueMap.empnhTechspec][0].$set(
          t.$refs[t.valueMap.empnhTechspec][0].formDataSubmit,
          "empnhTechspec",
          ""
        );
      }
      if (t.valueMap.empnhTechdate) {
        t.$refs[t.valueMap.empnhTechdate][0].$set(
          t.$refs[t.valueMap.empnhTechdate][0].formDataSubmit,
          "empnhTechdate",
          ""
        );
      }
    }
  },
  // 员工资料是否符合公司要求
  empnhDataisok_dis(t) {
    if (t.valueMap.empnhDataisok) {
      if (
        t.$refs[t.valueMap.empnhDataisok][0].formDataSubmit.empnhDataisok ===
        "0"
      ) {
        if (t.valueMap.empnhDataexpdesc) {
          t.$refs[t.valueMap.empnhDataexpdesc][0].$set(
            t.$refs[t.valueMap.empnhDataexpdesc][0].formshow,
            "empnhDataexpdesc",
            ""
          );
        }
      } else {
        if (t.valueMap.empnhDataexpdesc) {
          t.$refs[t.valueMap.empnhDataexpdesc][0].$delete(
            t.$refs[t.valueMap.empnhDataexpdesc][0].formshow,
            "empnhDataexpdesc"
          );
        }
      }
    }
  },
  empnhDataisok_set(t) {
    if (
      t.valueMap.empnhDataisok &&
      t.$refs[t.valueMap.empnhDataisok][0].formDataSubmit.empnhDataisok === "0"
    ) {
      if (t.valueMap.empnhDataexpdesc) {
        t.$refs[t.valueMap.empnhDataexpdesc][0].$set(
          t.$refs[t.valueMap.empnhDataexpdesc][0].formDataSubmit,
          "empnhDataexpdesc",
          ""
        );
      }
    }
  },
  // 雇佣地点 选取后同步更新其他地点
  empnhHirelocation_set(t) {
    let location;
    let locationDis;
    if (t.valueMap.empnhHirelocation) {
      location =
        t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit
          .empnhHirelocation;
      locationDis =
        t.$refs[t.valueMap.empnhHirelocation][0].$refs.empnhHirelocation
          .thisValue;
    }
    if (
      t.valueMap.empnhWorklocation &&
      !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation
    ) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhWorklocation
      ][0].$refs.empnhWorklocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhTaxlocation &&
      !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation
    ) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(
        t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit,
        "empnhTaxlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhTaxlocation
      ][0].$refs.empnhTaxlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhBenefitlocation &&
      !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit
        .empnhBenefitlocation
    ) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(
        t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit,
        "empnhBenefitlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhBenefitlocation
      ][0].$refs.empnhBenefitlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhHfundlocatio &&
      !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio
    ) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(
        t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit,
        "empnhHfundlocatio",
        location
      );
      t.$refs[
        t.valueMap.empnhHfundlocatio
      ][0].$refs.empnhHfundlocatio.thisValue = locationDis;
    }
  },
  // 工作地点 选取后同步更新其他地点
  empnhWorklocation_set(t) {
    let location;
    let locationDis;
    if (t.valueMap.empnhWorklocation) {
      location =
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit
          .empnhWorklocation;
      locationDis =
        t.$refs[t.valueMap.empnhWorklocation][0].$refs.empnhWorklocation
          .thisValue;
    }
    if (
      t.valueMap.empnhHirelocation &&
      !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation
    ) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(
        t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit,
        "empnhHirelocation",
        location
      );
      t.$refs[
        t.valueMap.empnhHirelocation
      ][0].$refs.empnhHirelocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhTaxlocation &&
      !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation
    ) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(
        t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit,
        "empnhTaxlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhTaxlocation
      ][0].$refs.empnhTaxlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhBenefitlocation &&
      !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit
        .empnhBenefitlocation
    ) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(
        t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit,
        "empnhBenefitlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhBenefitlocation
      ][0].$refs.empnhBenefitlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhHfundlocatio &&
      !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio
    ) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(
        t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit,
        "empnhHfundlocatio",
        location
      );
      t.$refs[
        t.valueMap.empnhHfundlocatio
      ][0].$refs.empnhHfundlocatio.thisValue = locationDis;
    }
  },
  // 个税缴纳地地点 选取后同步更新其他地点
  empnhTaxlocation_set(t) {
    let location;
    let locationDis;
    if (t.valueMap.empnhTaxlocation) {
      location =
        t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation;
      locationDis =
        t.$refs[t.valueMap.empnhTaxlocation][0].$refs.empnhTaxlocation
          .thisValue;
    }
    if (
      t.valueMap.empnhHirelocation &&
      !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation
    ) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhHirelocation
      ][0].$refs.empnhHirelocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhWorklocation &&
      !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation
    ) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhWorklocation
      ][0].$refs.empnhWorklocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhBenefitlocation &&
      !t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit
        .empnhBenefitlocation
    ) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(
        t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit,
        "empnhBenefitlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhBenefitlocation
      ][0].$refs.empnhBenefitlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhHfundlocatio &&
      !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio
    ) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(
        t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit,
        "empnhHfundlocatio",
        location
      );
      t.$refs[
        t.valueMap.empnhHfundlocatio
      ][0].$refs.empnhHfundlocatio.thisValue = locationDis;
    }
  },
  // 社保缴纳地 选取后同步更新其他地点
  empnhBenefitlocation_set(t) {
    let location;
    let locationDis;
    if (t.valueMap.empnhBenefitlocation) {
      location =
        t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit
          .empnhBenefitlocation;
      locationDis =
        t.$refs[t.valueMap.empnhBenefitlocation][0].$refs.empnhBenefitlocation
          .thisValue;
    }
    if (
      t.valueMap.empnhHirelocation &&
      !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation
    ) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhHirelocation
      ][0].$refs.empnhHirelocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhWorklocation &&
      !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation
    ) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhWorklocation
      ][0].$refs.empnhWorklocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhTaxlocation &&
      !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation
    ) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(
        t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit,
        "empnhTaxlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhTaxlocation
      ][0].$refs.empnhTaxlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhHfundlocatio &&
      !t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit.empnhHfundlocatio
    ) {
      t.$refs[t.valueMap.empnhHfundlocatio][0].$set(
        t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit,
        "empnhHfundlocatio",
        location
      );
      t.$refs[
        t.valueMap.empnhHfundlocatio
      ][0].$refs.empnhHfundlocatio.thisValue = locationDis;
    }
  },
  // 公积金缴纳地 选取后同步更新其他地点
  empnhHfundlocatio_set(t) {
    let location;
    let locationDis;
    if (t.valueMap.empnhHfundlocatio) {
      location =
        t.$refs[t.valueMap.empnhHfundlocatio][0].formDataSubmit
          .empnhHfundlocatio;
      locationDis =
        t.$refs[t.valueMap.empnhHfundlocatio][0].$refs.empnhHfundlocatio
          .thisValue;
    }
    if (
      t.valueMap.empnhHirelocation &&
      !t.$refs[t.valueMap.empnhHirelocation][0].formDataSubmit.empnhHirelocation
    ) {
      t.$refs[t.valueMap.empnhHirelocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhHirelocation
      ][0].$refs.empnhHirelocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhWorklocation &&
      !t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit.empnhWorklocation
    ) {
      t.$refs[t.valueMap.empnhWorklocation][0].$set(
        t.$refs[t.valueMap.empnhWorklocation][0].formDataSubmit,
        "empnhWorklocation",
        location
      );
      t.$refs[
        t.valueMap.empnhWorklocation
      ][0].$refs.empnhWorklocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhTaxlocation &&
      !t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit.empnhTaxlocation
    ) {
      t.$refs[t.valueMap.empnhTaxlocation][0].$set(
        t.$refs[t.valueMap.empnhTaxlocation][0].formDataSubmit,
        "empnhTaxlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhTaxlocation
      ][0].$refs.empnhTaxlocation.thisValue = locationDis;
    }
    if (
      t.valueMap.empnhBenefitlocation &&
      !t.$refs[t.valueMap.empnhHfunempnhBenefitlocationdlocatio][0]
        .formDataSubmit.empnhBenefitlocation
    ) {
      t.$refs[t.valueMap.empnhBenefitlocation][0].$set(
        t.$refs[t.valueMap.empnhBenefitlocation][0].formDataSubmit,
        "empnhBenefitlocation",
        location
      );
      t.$refs[
        t.valueMap.empnhBenefitlocation
      ][0].$refs.empnhBenefitlocation.thisValue = locationDis;
    }
  },
  // 计算试用期到期日
  empnhEntrydate_dis(t) {
    let entrydate;
    if (t.valueMap.empnhEntrydate) {
      entrydate = new Date(
        t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate
      );
    }
    if (t.valueMap.empnhContractsdate) {
      t.$refs[t.valueMap.empnhContractsdate][0].$set(
        t.$refs[t.valueMap.empnhContractsdate][0].formDataSubmit,
        "empnhContractsdate",
        entrydate.getFullYear() +
          "-" +
          (entrydate.getMonth() + 1) +
          "-" +
          entrydate.getDate()
      );
    }
    if (t.valueMap.empnhSchedsdate) {
      t.$refs[t.valueMap.empnhSchedsdate][0].$set(
        t.$refs[t.valueMap.empnhSchedsdate][0].formDataSubmit,
        "empnhSchedsdate",
        entrydate.getFullYear() +
          "-" +
          (entrydate.getMonth() + 1) +
          "-" +
          entrydate.getDate()
      );
    }
    let proPeriod;
    if (t.valueMap.empnhProbation) {
      proPeriod =
        t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation;
    }
    let entrydate2 = new Date(
      t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate
    );
    entrydate2.setMonth(entrydate2.getMonth() + Number(proPeriod));
    entrydate2.setDate(entrydate2.getDate() - 1);
    // t.$refs[t.valueMap.empnhProbationdate][0].$set(
    //   t.$refs[t.valueMap.empnhProbationdate][0].formDataSubmit,
    //   "empnhProbationdate",
    //   entrydate2.getFullYear() +
    //     "-" +
    //     (entrydate2.getMonth() + 1) +
    //     "-" +
    //     entrydate2.getDate()
    // );
  },
  // 计算试用期到期日
  empnhEntrydate_set(t) {
    let entrydate;
    if (t.valueMap.empnhEntrydate) {
      entrydate = new Date(
        t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate
      );
    }
    if (t.valueMap.empnhContractsdate) {
      t.$refs[t.valueMap.empnhContractsdate][0].$set(
        t.$refs[t.valueMap.empnhContractsdate][0].formDataSubmit,
        "empnhContractsdate",
        entrydate.getFullYear() +
          "-" +
          (entrydate.getMonth() + 1) +
          "-" +
          entrydate.getDate()
      );
    }
    let proPeriod;
    if (t.valueMap.empnhProbation) {
      proPeriod =
        t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation;
    }
    if (proPeriod === "0") {
      t.$refs[t.valueMap.empnhProbationdate][0].$set(
        t.$refs[t.valueMap.empnhProbationdate][0].formDataSubmit,
        "empnhProbationdate",
        ""
      );
      t.$refs[t.valueMap.empnhProbationprom][0].$set(
        t.$refs[t.valueMap.empnhProbationprom][0].formDataSubmit,
        "empnhProbationprom",
        ""
      );
    } else {
      let entrydate2 = new Date(
        t.$refs[t.valueMap.empnhEntrydate][0].formDataSubmit.empnhEntrydate
      );
      entrydate2.setMonth(entrydate2.getMonth() + Number(proPeriod));
      entrydate2.setDate(entrydate2.getDate() - 1);
      //   t.$refs[t.valueMap.empnhProbationdate][0].$set(
      //     t.$refs[t.valueMap.empnhProbationdate][0].formDataSubmit,
      //     "empnhProbationdate",
      //     entrydate2.getFullYear() +
      //       "-" +
      //       (entrydate2.getMonth() + 1) +
      //       "-" +
      //       entrydate2.getDate()
      //   );
    }
    // console.log(entrydate)
    // console.log(proPeriod)
  },
  // 计算试用期到期日
  empnhProbation_dis(t) {
    let proPeriod;
    // if (t.valueMap.empnhProbation) {
    //   proPeriod =
    //     t.$refs[t.valueMap.empnhProbation][0].formDataSubmit.empnhProbation;
    // }
    // if (proPeriod === "0") {
    //   t.$refs[t.valueMap.empnhProbationdate][0].$delete(
    //     t.$refs[t.valueMap.empnhProbationdate][0].formshow,
    //     "empnhProbationdate"
    //   );
    //   t.$refs[t.valueMap.empnhProbationprom][0].$delete(
    //     t.$refs[t.valueMap.empnhProbationprom][0].formshow,
    //     "empnhProbationprom"
    //   );
    // } else {
    //   t.$refs[t.valueMap.empnhProbationdate][0].$set(
    //     t.$refs[t.valueMap.empnhProbationdate][0].formshow,
    //     "empnhProbationdate",
    //     ""
    //   );
    //   t.$refs[t.valueMap.empnhProbationprom][0].$set(
    //     t.$refs[t.valueMap.empnhProbationprom][0].formshow,
    //     "empnhProbationprom",
    //     ""
    //   );
    // }
  },
  // 自动计算合同到期日
  // empnhContracttype 合同类别  empnhContractperiod 合同期限  empnhContractsdate 合同开始日期 empnhContractedate 合同结束日期
  empnhContractsdate_set(t) {
    if (
      t.$refs[t.valueMap.empnhContracttype][0].formDataSubmit
        .empnhContracttype === "01fixedperiod"
    ) {
      // t.$refs[t.valueMap.empnhContractperiod][0].$set(t.$refs[t.valueMap.empnhContractperiod][0].dis, 'empnhContractperiod', true)
      // t.$refs[t.valueMap.empnhContractperiod][0].$set(t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit, 'empnhContractperiod', '3')
      t.$refs[t.valueMap.empnhContractedate][0].$set(
        t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit,
        "empnhContractedate",
        ""
      );
      // t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].dis, 'empnhContractedate', false)

      let consdate; // 合同开始时间
      if (t.valueMap.empnhContractsdate) {
        consdate = new Date(
          t.$refs[
            t.valueMap.empnhContractsdate
          ][0].formDataSubmit.empnhContractsdate
        );
      }
      let conperiod;
      if (t.valueMap.empnhContractperiod) {
        conperiod =
          t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit
            .empnhContractperiod;
      }
      if (conperiod !== "99" && conperiod !== "0") {
        let sdate = consdate.getDate();
        let monthEndDate = new Date(
          consdate.getFullYear(),
          consdate.getMonth() + 1,
          0
        ).getDate();
        if (sdate === monthEndDate) {
          let conperiodnum = Number(conperiod);
          consdate.setFullYear(consdate.getFullYear() + conperiodnum);
          consdate.setDate(consdate.getDate());
          let currentMonth = consdate.getMonth(); // 取得月份数
          let lastDay = new Date(consdate.getFullYear(), currentMonth + 2, 0);
          t.$refs[t.valueMap.empconContractedate][0].$set(
            t.$refs[t.valueMap.empconContractedate][0].formDataSubmit,
            "empconContractedate",
            lastDay.getFullYear() +
              "-" +
              (lastDay.getMonth() + 1) +
              "-" +
              lastDay.getDate()
          );
        } else {
          let conperiodnum = Number(conperiod);
          consdate.setFullYear(consdate.getFullYear() + conperiodnum);
          consdate.setDate(consdate.getDate());
          let currentMonth = consdate.getMonth(); // 取得月份数
          let lastDay = new Date(consdate.getFullYear(), currentMonth + 1, 0);
          t.$refs[t.valueMap.empnhContractedate][0].$set(
            t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit,
            "empnhContractedate",
            lastDay.getFullYear() +
              "-" +
              (lastDay.getMonth() + 1) +
              "-" +
              lastDay.getDate()
          );
        }
      } else {
        // t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].dis, 'empnhContractedate', true)
        t.$refs[t.valueMap.empnhContractedate][0].$set(
          t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit,
          "empnhContractedate",
          ""
        );
      }
    } else {
      t.$refs[t.valueMap.empnhContractperiod][0].$set(
        t.$refs[t.valueMap.empnhContractperiod][0].formDataSubmit,
        "empnhContractperiod",
        "0"
      );
      // t.$refs[t.valueMap.empnhContractperiod][0].$set(t.$refs[t.valueMap.empnhContractperiod][0].dis, 'empnhContractperiod', false)
      // t.$refs[t.valueMap.empnhContractedate][0].$set(t.$refs[t.valueMap.empnhContractedate][0].dis, 'empnhContractedate', false)
      // t.$refs[t.valueMap.empnhContractsdate][0].$set(t.$refs[t.valueMap.empnhContractsdate][0].dis, 'empnhContractsdate', false)
      t.$refs[t.valueMap.empnhContractedate][0].$set(
        t.$refs[t.valueMap.empnhContractedate][0].formDataSubmit,
        "empnhContractedate",
        "9999-12-31"
      );
    }
  },
  // 根据身份证号码获取性别
  empnhIdno_set(t) {
    let idcard;
    if (
      t.$refs[t.valueMap.empnhIdtype][0].formDataSubmit.empnhIdtype === "01id"
    ) {
      if (t.valueMap.empnhIdno) {
        idcard = t.$refs[t.valueMap.empnhIdno][0].formDataSubmit.empnhIdno;
        if (idcard.length === 18) {
          if (idcard.substr(16, 1) % 2 === 1) {
            t.$refs[t.valueMap.empnhGender][0].$set(
              t.$refs[t.valueMap.empnhGender][0].formDataSubmit,
              "empnhGender",
              "01male"
            );
          } else {
            t.$refs[t.valueMap.empnhGender][0].$set(
              t.$refs[t.valueMap.empnhGender][0].formDataSubmit,
              "empnhGender",
              "02female"
            );
          }
          let birthday = idcard.substr(6, 8).replace(/(.{4})(.{2})/, "$1-$2-");
          t.$refs[t.valueMap.empnhBirthdate][0].$set(
            t.$refs[t.valueMap.empnhBirthdate][0].formDataSubmit,
            "empnhBirthdate",
            birthday
          );
        }
        let pwd = idcard.substr(idcard.length - 6, idcard.length);
        t.$refs[t.valueMap.empnhAccpwdOa][0].$set(
          t.$refs[t.valueMap.empnhAccpwdOa][0].formDataSubmit,
          "empnhAccpwdOa",
          pwd
        );
      }
    }
  },
  // 根据输入员工名字自动生成系统账号
  empnhCname_set(t) {
    let cname;
    if (t.valueMap.empnhCname) {
      cname = t.$refs[t.valueMap.empnhCname][0].formDataSubmit.empnhCname;
    }
    if (cname.length <= 0) {
      t.$refs[t.valueMap.empnhLastname][0].$set(
        t.$refs[t.valueMap.empnhLastname][0].formDataSubmit,
        "empnhLastname",
        ""
      );
      t.$refs[t.valueMap.empnhFirstname][0].$set(
        t.$refs[t.valueMap.empnhFirstname][0].formDataSubmit,
        "empnhFirstname",
        ""
      );
    } else {
      getDataLevelUserLogin({
        // _mt:  this.$global.mt+'BasePubTools.getPinYinByName',
        _mt: this.$global.mt + "BasePubTools.getShortPYAccount",
        name: cname
      })
        .then(res => {
          const data = JSON.parse(res.data.content[0].value);
          t.$refs[t.valueMap.empnhSysaccountOa][0].$set(
            t.$refs[t.valueMap.empnhSysaccountOa][0].formDataSubmit,
            "empnhSysaccountOa",
            data.Account
          );
          let compEmail = data.Account + "@sansheng.com";
          t.$refs[t.valueMap.empnhCompmail][0].$set(
            t.$refs[t.valueMap.empnhCompmail][0].formDataSubmit,
            "empnhCompmail",
            compEmail
          );
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    }
  },

  empnhHrsysupdate_dis(t) {
    if (t.valueMap.empnhHrsysupdate) {
      if (
        t.$refs[t.valueMap.empnhHrsysupdate][0].formDataSubmit
          .empnhHrsysupdate === "0"
      ) {
        if (t.valueMap.empnhHrsysfinishdate) {
          t.$refs[t.valueMap.empnhHrsysfinishdate][0].$delete(
            t.$refs[t.valueMap.empnhHrsysfinishdate][0].formshow,
            "empnhHrsysfinishdate"
          );
        }
      } else {
        if (t.valueMap.empnhHrsysfinishdate) {
          t.$refs[t.valueMap.empnhHrsysfinishdate][0].$set(
            t.$refs[t.valueMap.empnhHrsysfinishdate][0].formshow,
            "empnhHrsysfinishdate",
            ""
          );
        }
      }
    }
  },
  empnhHrsysupdate_set(t) {
    if (
      t.valueMap.empnhHrsysupdate &&
      t.$refs[t.valueMap.empnhHrsysupdate][0].formDataSubmit
        .empnhHrsysupdate === "0"
    ) {
      if (t.valueMap.empnhHrsysfinishdate) {
        t.$refs[t.valueMap.empnhHrsysfinishdate][0].$set(
          t.$refs[t.valueMap.empnhHrsysfinishdate][0].formDataSubmit,
          "empnhHrsysfinishdate",
          ""
        );
      }
    }
  }
};

export default emp_flow_newhire;
// export default flow1
let DateMinus = function(date1, date2) {
  // date1:小日期   date2:大日期
  let sdate = new Date(date1);
  let now = new Date(date2);
  let days = now.getTime() - sdate.getTime();
  let day = parseInt(days / (1000 * 60 * 60 * 24));
  return day;
};
