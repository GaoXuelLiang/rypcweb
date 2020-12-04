
export default [
    {
        path: '/oatodohandle',
        name: 'oatodohandle',
        component: resolve => require(['@/pages/oatodohandle/oatodohandle'], resolve),
        meta: {
            title: '待办',
        }
    },
    {
        path: "/ansrptPage",
        name: "ansrptPage",
        component: resolve =>
            require(["@/pagesZnjs/ansrptPage/ansrptPage"], resolve)
    },
]
