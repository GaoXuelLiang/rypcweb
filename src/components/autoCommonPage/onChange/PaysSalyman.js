import { displayEvent, setValue } from './public'
let sourceData = [];
const PaysSalyman = {
    all_dis () {
        PaysSalyman.salDatasoces_dis(this);
    },
    salProtype (node) {
        // console.log(this,"this")
        let value = this.formDataSubmit[node.ruleText]
        let arr = [];
        if(value) {
            sourceData.forEach(item => {
                switch(value) {
                    case '01fixed':
                        arr = sourceData.filter(item => {
                          return item.key !== '02empperiod' && item.key !== '04empnoperiod'
                        })
                        break;
                    case '02MC':
                        arr = sourceData.filter(item => {
                            return item.key !== '01system' && item.key !== '04empnoperiod'
                        })
                        break;
                    case '03MA':
                        arr = sourceData.filter(item => {
                            return item.key !== '01system'
                        })
                        break;
                }
                setValue(this,{'salDatasoces':''})
            })
        }
        this.formData.columnOptions.forEach(item => {
            if(item.clmName === "salDatasoces") {
                item.clmOptionList = arr;
            }
        })
    },
    salDatasoces_dis(t) {
        // console.log(t,"this")
        let selectData = t.formData.columnOptions;
        selectData.forEach(item => {
            if(item.clmName === "salDatasoces") {
                sourceData = item.clmOptionList;
            }
        })
        setTimeout(() => {
            // console.log(t.$refs.commonSingleForm,"commonSingleForm")
            let form = t.$refs.commonSingleForm;
            let value = form.formDataSubmit.salProtype;
            let arr = []
            switch(value) {
                case '01fixed':
                    arr = sourceData.filter(item => {
                      return item.key !== '02empperiod' && item.key !== '04empnoperiod'
                    })
                    break;
                case '02MC':
                    arr = sourceData.filter(item => {
                        return item.key !== '01system' && item.key !== '04empnoperiod'
                    })
                    break;
                case '03MA':
                    arr = sourceData.filter(item => {
                        return item.key !== '01system'
                    })
                    break;
            }
            // console.log(arr,"arrr")
            t.formData.columnOptions.forEach(item => {
                if(item.clmName === "salDatasoces") {
                    item.clmOptionList = arr;
                }
            })
        },20)
    }
};

export default PaysSalyman;
