/** When your routing table is too long, you can split it into small modules **/

const sumUser = {
  path:'/procmgr/sumUser',
  name:'sumUser',
  component:()=>import('@/views/agentmgr/sumUser.vue'),
  children:[{
      path:'/procmgr/sumUser',
      redirect:'userManager'
  },{
      path:'/procmgr/sumUser/userManager',
      title:'坐席管理',
      name:'userManager',
      component:()=>import('@/views/agentmgr/userManager.vue')
  },{
      path:'/procmgr/sumUser/userSearch',
      title:'查询坐席',
      name:'userSearch',
      component:()=>import('@/views/agentmgr/userSearch.vue')
  },{
      path:'/procmgr/sumUser/userEdit',
      title:'编辑坐席',
      name:'userEdit',
      component:()=>import('@/views/agentmgr/userEdit.vue')
  },{
      path:'/procmgr/sumUser/userNew',
      title:'新建坐席',
      name:'userNew',
      component:()=>import('@/views/agentmgr/userNew.vue')
  },{
      path:'/procmgr/sumUser/visibleRole',
      name:'visibleRole',
      title:'可见角色',
      component:()=>import('@/views/agentmgr/visibleRole.vue')
  },{
      path:'/procmgr/sumUser/deptNew',
      name:'deptNew',
      title:'新建部门',
      component:()=>import('@/views/agentmgr/deptNew.vue')
  },{
      path:'/procmgr/sumUser/deptEdit',
      title:'编辑部门',
      name:'deptEdit',
      component:()=>import('@/views/agentmgr/deptEdit.vue')
  }]
}

export default sumUser
