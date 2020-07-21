/** When your routing table is too long, you can split it into small modules **/

const sumBlackAudit = {
    path: '/procmgr/sumBlackAudit',
    name: 'sumBlackAudit',
    component: () => import('@/views/blackmgr/sumBlackAudit.vue'),
    children: [{
        path: '/procmgr/sumBlackAudit',
        redirect: 'blackAudit'
    }, {
        path: '/procmgr/sumBlackAudit/blackAudit',
        title: '禁拨名单审核',
        name: 'blackAudit',
        component: () => import('@/views/blackmgr/blackAudit.vue'),
    }]
}
export default sumBlackAudit