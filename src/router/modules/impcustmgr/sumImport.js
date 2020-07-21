/** When your routing table is too long, you can split it into small modules **/

const sumImport = {
    path: '/procmgr/sumImport',
    name: 'sumImport',
    component: () => import('@/views/impcustmgr/sumImport.vue'),
    children: [{
        path: '/procmgr/sumImport',
        redirect: 'getImport'
    }, {
        path: '/procmgr/sumImport/getImport',
        title: '重要客户',
        name: 'getImport',
        component: () => import('@/views/impcustmgr/getImport.vue'),
    }, {
        path: '/procmgr/sumImport/addImport',
        title: '添加重要客户信息',
        name: 'addImport',
        component: () => import('@/views/impcustmgr/addImport.vue'),
    }]
}
export default sumImport