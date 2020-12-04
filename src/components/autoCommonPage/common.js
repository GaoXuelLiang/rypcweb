import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export const commonApiJs = {
 methods: {
    btnFunction (btnId) {
        const t = this
        switch (btnId) {
            case "button_query":
                t.queryEvent()
                break
        }
    },
    queryEvent () {
        let dataSearch = {}
        this.searchInp.forEach((e) => {
            if (e.id) {
                dataSearch[e.clmName] = e.id
            } else {
                if (e.name) {
                    dataSearch[e.clmName] = e.name
                } else {
                    delete dataSearch[e.clmName]
                }
            }
        })
        console.log('data')
        this.getData(dataSearch)
    },
      getData (value, value1) {
            const t = this
            t.isSpinTable = true
            let data = {}
            if (value) {
                data = deepCopy(value)
            }
            if (value1) {
                data.searchData = JSON.stringify(value1)
            }
            data._mt = this.$global.mt + t.tbName + '.getPage';
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = t.rows;
            data.APpage = t.page;
            data.APlogType = 'getPage';
            data.APffk = `glc${this.funId}`;
            data[t.sformParentfield] = t.mainId
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let filterObj = {}   // 子表table带出显示
                    let obj = this.$store.state.flowClmkMap.localField
                    console.log(obj, 'table全局')
                    for (let k in obj) {
                        t.columns.find(item => {
                            if ('key' in item) {
                                if (k == item.key) {
                                    filterObj[k] = obj[k]
                                }
                            }
                        })
                    }
                    t.data = res.data.content[0].rows.map(item => {
                        return item = Object.assign({}, filterObj, item)
                    })
                    t.total = res.data.content[0].records
                    t.$store.commit('autoCommonPage/setChildTable', t.data)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpinTable = false
            })
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
 }
}