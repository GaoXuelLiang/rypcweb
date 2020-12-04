/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-09-01 10:00:32
 * @LastEditTime: 2020-11-28 13:14:53
 * @LastEditors: Sok
 */
export default [
    {
      path: '/individualStaffMange',
      name: 'individualStaffMange',
      component:resolve => require(['@/pages/individualStaff/updateParamInfo'], resolve)
    },
    {
      path: '/individualStaffUpload',
      name: 'individualStaffUpload',
      component:resolve => require(['@/pages/individualStaff/individualStaffUpload'], resolve)
    },
    {
      path: '/NewemployeeLoginmain',
      name: 'NewemployeeLoginmain', // 登录主页
      component:resolve => require(['@/pages/individualStaff/loginemployee/NewemployeeLoginmain'], resolve),
      children:[
        {
          path: 'NewemployeeLogin', // 登录
          name: 'NewemployeeLogin',
          component:resolve => require(['@/pages/individualStaff/loginemployee/NewemployeeLogin'], resolve),
        },
      ]
    },
  ]