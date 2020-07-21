import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Router Modules */
import sumUser from './modules/agentmgr/sumUser'
import sumRole from './modules/purviewmgr/sumRole'
import sumQuoteInfo from './modules/branchmgr/sumQuoteInfo'
import sumBranch from './modules/branchmgr/sumBranch'
import sumRatch from './modules/miscmgr/sumBatch'
import sumStatic from './modules/miscmgr/sumStatic'
import sumMicro from './modules/miscmgr/sumMicro'
import sumCust from './modules/custmgr/sumCust'
import sumbusiness from './modules/business/sumbusiness'
import sumBlack from './modules/blackmgr/sumBlack'
import sumBlackImport from './modules/blackmgr/sumBlackImport'
import sumBlackAudit from './modules/blackmgr/sumBlackAudit'
import sumBlackTrack from './modules/blackmgr/sumBlackTrack'
import sumImport from './modules/impcustmgr/sumImport'
const router = new Router({
    //mode:process.env.VUE_APP_FLAG=='dev'?'hash':'history',
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/procmgr'
        }
    ]
})
//动态加载
let arr = [
    {
        path: '/procmgr',
        component: () => import('@/views/home.vue'),
        children: [
            {
                path: '/',
                name: 'task',
                component: () => import('@/views/agentmgr/index.vue')
            },
            sumUser,
            sumRole,
            sumQuoteInfo,
            sumBranch,
            sumRatch,
            sumStatic,
            sumMicro,
            sumCust,
            sumbusiness,
            sumBlack,
            sumBlackImport,
            sumBlackAudit,
            sumBlackTrack,
            sumImport,
            {
                path: '/loginUser',
                name: 'loginUser',
                component: () => import('@/examples/loginTest.vue')
            },
            {
                path: 'examples/excelTest',
                name: 'excelTest',
                component: () => import('@/examples/excelTest.vue')
            },
            {
                path: '/examples/testPage',
                name: 'testPage',
                component: () => import('@/examples/testPage.vue')
            },
            {
                path: '/examples/checkerTest',
                name: 'checkerTest',
                component: () => import('@/examples/checkerTest.vue')
            }, {
                path: '/examples/CustomerBaseInfo',
                name: 'CustomerBaseInfo',
                component: () => import('@/examples/customerInfotest4.vue')
            }
        ]
    }
]

router.addRoutes(arr)

export default router


