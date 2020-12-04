
export default [
    {
        path: '/largeScreen',
        name: 'largeScreen',
        component: resolve => require(['@/pagesZnjs/largeScreen/largeScreen'], resolve),
        meta: {
            title: '组织管理看板',
        }
    },
]
