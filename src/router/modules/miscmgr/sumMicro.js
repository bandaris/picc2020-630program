/** When your routing table is too long, you can split it into small modules **/

const sumMicro = {
  path:'/procmgr/sumMicro',
  name:'sumMicro',
  component:()=>import('@/views/miscmgr/sumMicro.vue'),
  children:[{
      path:'/procmgr/sumMicro/',
      redirect:'queryMicro'
  },{
      path:'/procmgr/sumMicro/queryMicro',
      title:'微店链接查询',
      name:'queryMicro',
      component:()=>import('@/views/miscmgr/queryMicro.vue')
  },{
    path:'/procmgr/sumMicro/microAgentImport',
    title:'批量导入微店链接',
    name:'microAgentImport',
    component:()=>import('@/views/miscmgr/microAgentImport.vue')
  },{
    path:'/procmgr/sumMicro/addMicro',
    title:'添加微店链接',
    name:'addMicro',
    component:()=>import('@/views/miscmgr/addMicro.vue')
  },{
    path:'/procmgr/sumMicro/updateMicro',
    title:'修改微店链接',
    name:'updateMicro',
    component:()=>import('@/views/miscmgr/updateMicro.vue')
  }]
}
export default sumMicro
