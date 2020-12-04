
export default [
  {
    path: 'trainEmployee_Atgv',
    name: 'trainEmployee',
    component:resolve => require(['@/pages/traintest/trainemployee/trainEmployeeList'], resolve),
  },
  {
    path: 'trainTesttb01_Atgv',
    name: 'trainTesttb01_Atgv',
    component:resolve => require(['@/pages/traintest/trainTesttb01/trainTesttb01List'], resolve),
  },
  {
    path: 'testaxios',
    name: 'testaxios',
    component:resolve => require(['@/pages/traintest/testaxios'], resolve),
  },

]
