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
const PaysHanedMse = {
    all_dis () {
    },
    hmseProvinceid (node) {
      const t = this;
      let obj = {
        hmseCityid:'',
        hmseCityidDis:'',
        hmseCountyid:'',
        hmseCountyidDis:''
      }
      setModalValue(t,obj)
      // t.setJLData(obj)
    }

}
export default PaysHanedMse
