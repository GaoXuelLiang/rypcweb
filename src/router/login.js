
export default [
  {
    path: '/loginmain',
    name: 'loginmain', // 登录主页
    component:resolve => require(['@/pages/login/login-main'], resolve),
    children:[
      {
        path: 'login', // 登录
        name: 'login',
        component:resolve => require(['@/pages/login/login'], resolve),
      },
      {
        path: 'register', // 注册
        name: 'register',
        component:resolve => require(['@/pages/login/register'], resolve),
      },
      {
        path: 'change', // 修改密码
        name: 'change',
        component:resolve => require(['@/pages/login/change'], resolve),
      },
    ]
  },
  {
    path: '/ssologin', // 单点登陆
    name: 'ssologin',
    component:resolve => require(['@/pages/login/ssologin'], resolve)
  },
  {
    path: '/oatodohandle', // 单点登陆
    name: 'oatodohandle',
    component:resolve => require(['@/pages/login/oatodohandle'], resolve)
  },
]
