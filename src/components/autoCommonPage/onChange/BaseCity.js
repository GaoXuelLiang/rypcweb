/*
 * @Author: guwenjiang
 * @Date: 2020-11-13 16:27:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-17 16:16:14
 */
import { displayEvent, setValue } from './public'
const BaseCity = {
    all_dis () {
        BaseCity.initFilter(this)
    },
    /**
     * @description: 城市类型控制所属上级的过滤条件
     * @param {*} node
     * @return {*}
     */
    cityType (node) {
        const t = this;
        let cityType = t.formDataSubmit[node.ruleText];
        if(t.$global.mt !== 'znjs') {
            return
        }
        t.formData.columns.forEach(item => {
            if(item.clmName === 'cityPid') {
                switch(cityType) {
                    case '02city':
                        item.clmfilter = 'cityType=$01prov'
                        break;
                    case '03county':
                        item.clmfilter = 'cityType=$02city'
                        break;
                }
            }
        })
        setTimeout(()=>{
            if (node.thisValue == '02city') {
                t.$refs.cityPid.$children[0].$children[0].isRequired = true;
                t.$set(t.ruler.cityPid[0], 'required', true)
            } else {
                t.$refs.cityPid.$children[0].$children[0].isRequired = false;
                t.$set(this.ruler.cityPid[0], 'required', false)
            }
            t.$refs.cityPid.$children[0].$children[0].resetField()
        },50)
    },

    /**
     * @description: 初始化所属上级的过滤条件
     * @param {*} this
     * @return {*}
     */
    initFilter (t) {
        if(t.$global.mt !== 'znjs') {
            return
        }
        let cityType = t.formlist.form.cityType;
        t.formData.columns.forEach(item => {
            if(item.clmName === 'cityPid') {
                switch(cityType) {
                    case '02city':
                        item.clmfilter = 'cityType=$01prov'
                        break;
                    case '03county':
                        item.clmfilter = 'cityType=$02city'
                        break;
                }
            }
        })
    },
    status (t,node) {
    let dom = this.$refs.cityPid.$children[0].$children[0].isRequired;
    if (node == '02city') {
        this.$refs.cityPid.$children[0].$children[0].isRequired = true;
        this.$set(this.ruler.cityPid[0], 'required', true)
    } else {
        this.$refs.cityPid.$children[0].$children[0].isRequired = false;
        this.$set(this.ruler.cityPid[0], 'required', false)
    }
    this.$refs.cityPid.$children[0].$children[0].resetField()
        console.log(t,'55555')

        // if (node.value == '03invalid') {
        //     this.$refs.unitEdate.$children[0].$children[0].isRequired = true;
        //     this.$set(this.ruler.unitEdate[0], 'required', true)
        // } else {
        //     this.$refs.unitEdate.$children[0].$children[0].isRequired = false;
        //     this.$set(this.ruler.unitEdate[0], 'required', false)
        // }
        // this.$refs.unitEdate.$children[0].$children[0].resetField()
    },
}
export default BaseCity