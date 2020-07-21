/** When your routing table is too long, you can split it into small modules **/

const sumBranch = {
  path:'/procmgr/sumBranch',
  name:'sumBranch',
  component:()=>import('@/views/branchmgr/sumBranch.vue'),
  children:[{
      path:'/procmgr/sumBranch',
      redirect:'branchManager'
  },{
      path:'/procmgr/sumBranch/branchManager',
      name:'branchManager',
      title:'落地部门',
      component:()=>import('@/views/branchmgr/branchManager.vue')
  },{
    path:'/procmgr/sumBranch/branchNew',
    name:'branchNew',
    title:'新建落地用户',
    component:()=>import('@/views/branchmgr/branchNew.vue')
  },{
    path:'/procmgr/sumBranch/senderNew',
    name:'senderNew',
    title:'新建送单员',
    component:()=>import('@/views/branchmgr/senderNew.vue')
  },{
    path:'/procmgr/sumBranch/servantNew',
    name:'servantNew',
    title:'新建服务人员',
    component:()=>import('@/views/branchmgr/servantNew.vue') 
  },{
    path:'/procmgr/sumBranch/branchEdit',
    name:'branchEdit',
    title:'编辑服务人员',
    component:()=>import('@/views/branchmgr/branchEdit.vue')
  },{
    path:'/procmgr/sumBranch/visiblebranch',
    name:'visiblebranch',
    title:'编辑落地人员',
    component:()=>import('@/views/branchmgr/visiblebranch.vue')//visiblebranch
  }]
}

export default sumBranch
