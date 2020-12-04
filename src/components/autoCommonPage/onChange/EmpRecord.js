/*
 * @Author: your name
 * @Date: 2020-09-16 14:11:26
 * @LastEditTime: 2020-11-26 13:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\components\autoCommonPage\onChange\EmpRecord.js
 */
import { displayEvent, setValue } from './public'
const EmpRecord = {
    all_dis () {
        EmpRecord.setInitType(this)
    },
    emprecType(node, val){
        let _this = this
        if(node.thisValue === '01file' || node.thisValue === '02picture') {
            _this.formData.columns.find(item => {
                if(item.clmName === 'emprecYj') {
                    item.clmLayout = 71
                }
            })
        }else if(node.thisValue === '03head') {
            _this.formData.columns.find(item => {
                if(item.clmName === 'emprecYj') {
                    item.clmLayout = 8
                }
            })
        }
      
    },
    setInitType(t){
        let type = t.popFormNice.emprecType
        if(type === '01file' || type === '02picture') {
            t.formData.columns.find(item => {
                if(item.clmName === 'emprecYj') {
                    item.clmLayout = 71
                }
            })
        }else if(type === '03head') {
            t.formData.columns.find(item => {
                if(item.clmName === 'emprecYj') {
                    item.clmLayout = 8
                }
            })
        }

    }
    
};

export default EmpRecord;