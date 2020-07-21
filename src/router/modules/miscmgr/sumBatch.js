/** When your routing table is too long, you can split it into small modules **/

const sumBatch = {
  path:'/procmgr/sumBatch',
  name:'sumBatch',
  component:()=>import('@/views/miscmgr/sumBatch.vue'),
  children:[{
      path:'/procmgr/sumBatch',
      redirect:'batchTransGroup'
  },{
      path:'/procmgr/sumBatch/batchTransGroup',
      title:'人员批量转组',
      name:'batchTransGroup',
      component:()=>import('@/views/miscmgr/batchTransGroup.vue')
  },{
      path:'/procmgr/sumBatch/batchAgentImport',
      title:'人员批量导入',
      name:'batchAgentImport',
      component:()=>import('@/views/miscmgr/batchAgentImport.vue')
  },{
      path:'/procmgr/sumBatch/batchAgentDisable',
      title:'人员批量失效',
      name:'batchAgentDisable',
      component:()=>import('@/views/miscmgr/batchAgentDisable.vue')
  }]
}
export default sumBatch
