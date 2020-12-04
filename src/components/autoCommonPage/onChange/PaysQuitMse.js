/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-10 20:43:53
 * @LastEditTime: 2020-11-10 21:32:04
 * @LastEditors: Sok
 */
import { displayEvent, setValue,setModalValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const PaysQuitMse = {
    all_dis () {
    },
    mseProvid (node) {
      const t = this;
      let obj = {
        mseCityid:'',
        mseCityidDis:'',
        mseCountyid:'',
        mseCountyidDis:''
      }
      setModalValue(t,obj)
      // t.setJLData(obj)
    }

}
export default PaysQuitMse
