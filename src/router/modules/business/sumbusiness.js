const sumbusiness={
    path:'/procmgr/sumbusiness',
    name:'sumbusiness',
    component:()=>import('@/views/business/sumbusiness.vue'),
    children:[{
        path:'/procmgr/sumbusiness',
        redirect:'bindBusinessNature'
    },{
        path:'/procmgr/sumbusiness/bindBusinessNature',
        name:'bindBusinessNature',
        title:'渠道绑定查询',
        component:()=>import('@/views/business/bindBusinessNature.vue')
    },{
        path:'/procmgr/sumbusiness/editBusinessNature',
        name:'editBusinessNature',
        title:'渠道绑定',
        component:()=>import('@/views/business/editBusinessNature.vue')
    }]
}
export default sumbusiness