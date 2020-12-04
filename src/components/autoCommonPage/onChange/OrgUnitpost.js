import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const OrgUnitpost = {
    all_dis () {
      // unptDeptid
      // t.$nextTick(() => {

      // })
    },
    // 子表生效时间卡主表生效时间
    unptSdate (node) {
        // console.log(this,"this")
        const t = this;
        // console.log(this.$store.state.flowClmkMap.localField,'localField')
        let unitsdate = this.$store.state.flowClmkMap.localField.unitSdate
        // let unitsdate = this.$store.state.flowClmkMap.unptSdate
        let unpts = t.formDataSubmit[node.ruleText];
        if (unpts && unitsdate) {
          unitsdate = new Date(unitsdate).getTime();
          unpts = new Date(unpts).getTime();
          if (unpts < unitsdate) {
            this.$Modal.warning({
              title: "警告",
              content: '岗位生效时间不能小于组织生效时间',
            })
            // this.$Message.success('初始化成功');
          }
        }
    }
}
export default OrgUnitpost;