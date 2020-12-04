export default [
    {
      path: '/updateParamInfo',
      name: 'updateParamInfo',
      component:resolve => require(['@/pages/znindividualStaff/updateParamInfo'], resolve)
    },
    {
      path: '/NewemployeeLoginmainzn',
      name: 'NewemployeeLoginmainzn',
      component:resolve => require(['@/pages/znindividualStaff/login/login-main'], resolve),
      children:[
            {
              path: 'NewemployeeLoginzn', // 登录
              name: 'NewemployeeLoginzn',
              component:resolve => require(['@/pages/znindividualStaff/login/login'], resolve),
            },
          ]
    },
    // {
    //   path: '/NewemployeeLoginmain',
    //   name: 'NewemployeeLoginmain', // 登录主页
    //   component:resolve => require(['@/pages/individualStaff/loginemployee/NewemployeeLoginmain'], resolve),
    //   children:[
    //     {
    //       path: 'NewemployeeLogin', // 登录
    //       name: 'NewemployeeLogin',
    //       component:resolve => require(['@/pages/individualStaff/loginemployee/NewemployeeLogin'], resolve),
    //     },
    //   ]
    // },
  ]