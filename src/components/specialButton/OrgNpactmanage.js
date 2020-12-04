import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";

const button_valid = (t) => {
    console.log(t);
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: t.$t("reminder.remind"),
          content: t.$t("reminder.leastone"),
        });
      } else {
        t.$Modal.confirm({
          title: t.$t("reminder.remind"),
          content: "是否生效",
          onOk: () => {
            getDataLevelUserLoginData({
              _mt: t.$global.mt + "OrgNpactmanage.updStatus",
              APlogType: "状态切换",
              APupdstatus:  "takeType02",
              APnpacid: t.tableselected.toString(),
            })
              .then((res) => {
                if(res.data.content[0].value === 1){
                    t.$Message.success({
                        content: "已生效",
                      });
                }
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getData();
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: t.$t("reminder.err"),
                  content: t.$t("reminder.errormessage"),
                });
              }); 
          },
          onCancel: () => {},
        });
      }
}

export default {
    button_valid,
}