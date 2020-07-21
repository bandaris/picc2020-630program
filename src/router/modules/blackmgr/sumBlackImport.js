/** When your routing table is too long, you can split it into small modules **/

const sumBlackImport = {
    path: '/procmgr/sumBlackImport',
    name: 'sumBlackImport',
    component: () => import('@/views/blackmgr/sumBlackImport.vue'),
    children: [{
        path: '/procmgr/sumBlackImport',
        redirect: 'blackAgentImport'
    }, {
        path: '/procmgr/sumBlackImport/blackAgentImport',
        title: '禁拨名单批量导入',
        name: 'blackAgentImport',
        component: () => import('@/views/blackmgr/blackAgentImport.vue'),
    }]
}
export default sumBlackImport