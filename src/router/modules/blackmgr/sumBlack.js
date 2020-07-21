/** When your routing table is too long, you can split it into small modules **/

const sumBlack = {
    path: '/procmgr/sumBlack',
    name: 'sumBlack',
    component: () => import('@/views/blackmgr/sumBlack.vue'),
    children: [{
        path: '/procmgr/sumBlack',
        redirect: 'blackList'
    }, {
        path: '/procmgr/sumBlack/blackList',
        title: '禁拨名单列表',
        name: 'blackList',
        component: () => import('@/views/blackmgr/blackList.vue'),
    }, {
        path: '/procmgr/sumblack/addBlack',
        title: '新建禁拨名单',
        name: 'addBlack',
        component: () => import('@/views/blackmgr/addBlack.vue'),
    }]
}
export default sumBlack