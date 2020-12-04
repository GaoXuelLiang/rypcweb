
export default [
  {
    path: 'userManage',
    name: 'userManage',
    component:resolve => require(['@/pages/userManage/userinfo/userManage'], resolve),
  },
  {
    path: 'useinfo',
    name: 'useinfo',
    component:resolve => require(['@/pages/useinfo/useinfo'], resolve),
  },
  {
    path: 'authorized',
    name: 'authorized',
    component:resolve => require(['@/pages/useinfo/authorized'], resolve),
  },
  {
    path: 'searchAuth',
    name: 'searchAuth',
    component:resolve => require(['@/pages/useinfo/searchAuth'], resolve),
  }
]
