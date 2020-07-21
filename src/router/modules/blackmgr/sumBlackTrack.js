/** When your routing table is too long, you can split it into small modules **/

const sumBlackTrack = {
    path: '/procmgr/sumBlackTrack',
    name: 'sumBlackTrack',
    component: () => import('@/views/blackmgr/sumBlackTrack.vue'),
    children: [{
        path: '/procmgr/sumBlackTrack',
        redirect: 'blackTrack'
    }, {
        path: '/procmgr/sumBlackTrack/blackTrack',
        title: '禁拨轨迹查询',
        name: 'blackTrack',
        component: () => import('@/views/blackmgr/blackTrack.vue'),
    }]
}
export default sumBlackTrack