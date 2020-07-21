/** When your routing table is too long, you can split it into small modules **/

const sumRole = {
  path:'/procmgr/sumRole',
  name:'sumRole',
  component:()=>import('@/views/purviewmgr/sumRole.vue'),
  children:[{
      path:'/procmgr/sumRole',
      redirect:'searchRole'
  },{
      path:'/procmgr/sumRole/searchRole',
      name:'searchRole',
      title:'角色查询',
      component:()=>import('@/views/purviewmgr/searchRole.vue')
  },{
      path:'/procmgr/sumRole/editRole',
      name:'editRole',
      title:'编辑角色',
      component:()=>import('@/views/purviewmgr/editRole.vue')
  },{
      path:'/procmgr/sumRole/newRole',
      name:'newRole',
      title:'新建角色',
      component:()=>import('@/views/purviewmgr/newRole.vue')
  }]
}

export default sumRole
