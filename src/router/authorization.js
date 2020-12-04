/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-06-29 18:30:28
 * @LastEditTime: 2020-08-13 13:23:02
 * @LastEditors: Sok
 */

export default [
  {
    path: 'authRole',
    name: 'authRole',
    component:resolve => require(['@/pages/authorization/authRole/authRole'], resolve)
  },
  {
    path: 'sysFunctions',
    name: 'sysFunctions',
    component:resolve => require(['@/pages/authorization/sysFunctions/sysFunctions'], resolve)
  },
  {
    path: 'sysUserinfo',
    name: 'sysUserinfo',
    component:resolve => require(['@/pages/authorization/sysUserinfo/sysUserinfo'], resolve)
  },
  {
    path: 'authRoleGroup',
    name: 'authRoleGroup',
    component:resolve => require(['@/pages/authorization/authRoleGroup/authRoleGroup'], resolve)
  },
  {
    path: 'authUserinfo',
    name: 'authUserinfo',
    component:resolve => require(['@/pages/authorization/authUserinfo/authUserinfo'], resolve)
  },
  {
    path: 'plainAuthRole',
    name: 'plainAuthRole',
    component:resolve => require(['@/pages/authorization/plainAuthRole/plainAuthRole'], resolve)
  },
  {
    path: 'plainAuthRoleGroup',
    name: 'plainAuthRoleGroup',
    component:resolve => require(['@/pages/authorization/plainAuthRoleGroup/plainAuthRoleGroup'], resolve)
  },
  {
    path: 'plainUserinfo',
    name: 'plainUserinfo',
    component:resolve => require(['@/pages/authorization/plainUserinfo/plainUserinfo'], resolve)
  },
  {
    path: 'sysLog',
    name: 'sysLog',
    component:resolve => require(['@/pages/authorization/sysLog/sysLog'], resolve)
  },
  {
  	path: 'essAuthRole',
  	name: 'essAuthRole',
    component:resolve => require(['@/pages/authorization/essAuthRole/essAuthRole'], resolve)
  },
  {
  	path: 'essAuthRoleGroup',
  	name: 'essAuthRoleGroup',
    component:resolve => require(['@/pages/authorization/essAuthRoleGroup/essAuthRoleGroup'], resolve)
  },
  {
  	path: 'essUserinfo',
  	name: 'essUserinfo',
    component:resolve => require(['@/pages/authorization/essUserinfo/essUserinfo'], resolve)
  },
  {
  	path: 'authTododefine',
  	name: 'authTododefine',
    component:resolve => require(['@/pages/authorization/authTododefine/authTododefine'], resolve)
  },
  {
    path: 'organizationPerm',
    name: 'organizationPerm',
    component:resolve => require(['@/pages/authorization/organizationPerm/organizationPerm'], resolve)
  },
]
