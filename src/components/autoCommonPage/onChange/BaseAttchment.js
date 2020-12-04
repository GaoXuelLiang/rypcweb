
import { displayEvent, setValue } from './public'
// let list = ["01doc", "02docx", "03pdf", "04jpg", "05jpeg", "06png"];
let list = []
let formType = ""
const BaseAttchment = {
    all_dis () {
        // 获取
        const t = this;
        BaseAttchment.attchAllowlyDis(this);
    },
    attchBjtype (node) {
        const t = this;
        let bjType = t.formDataSubmit[node.ruleText];
        let arr = []
        if (bjType) {
            list.forEach(item => {
                switch (bjType) {
                    case "01file":
                        arr = list.filter(item => {
                            return item.key === "01doc" || item.key === "02docx" || item.key === "03pdf"
                        })
                        break;
                    case "02picture":
                        arr = list.filter(item => {
                            return item.key === "04jpg" || item.key === "05jpeg" || item.key === "06png"
                        })
                        break;
                    case "03head":
                        arr = list.filter(item => {
                            return item.key === "04jpg" || item.key === "05jpeg" || item.key === "06png"
                        })
                        break;
                }
            })
        }
        this.formData.columnOptions.forEach(item => {
            if (item.clmName === "attchAllowly") {
                item.clmOptionList = arr;
            }
        })
        let checkDom = t.$refs.attchAllowly.$children[0].$children[0].$children[0].$children
        for (let v of checkDom) {
            v.currentValue = false;
        }
        setValue(t, { 'attchAllowly': [] })
    },
    attchAllowlyDis (t) {
        t.formData.columnOptions.forEach(item => {
            if (item.clmName === "attchAllowly") {
                list = item.clmOptionList;
            }
        })
        // 
        formType = t.formlist.form.attchBjtype;
        let arr = []
        if (formType) {
            list.forEach(item => {
                switch (formType) {
                    case "01file":
                        arr = list.filter(item => {
                            return item.key === "01doc" || item.key === "02docx" || item.key === "03pdf"
                        })
                        break;
                    case "02picture":
                        arr = list.filter(item => {
                            return item.key === "04jpg" || item.key === "05jpeg" || item.key === "06png"
                        })
                        break;
                    case "03head":
                        arr = list.filter(item => {
                            return item.key === "04jpg" || item.key === "05jpeg" || item.key === "06png"
                        })
                        break;
                }
            })
            t.formData.columnOptions.forEach(item => {
                if (item.clmName === "attchAllowly") {
                    item.clmOptionList = arr;
                }
            })
        } else {
        }
    }
}
export default BaseAttchment