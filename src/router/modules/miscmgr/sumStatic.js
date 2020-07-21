/** When your routing table is too long, you can split it into small modules **/

const sumStatic = {
  path:'/procmgr/sumStatic',
  name:'sumStatic',
  component:()=>import('@/views/miscmgr/sumStatic.vue'),
  children:[{
      path:'/procmgr/sumStatic',
      redirect:'staticinfo'
  },{
      path:'/procmgr/sumStatic/staticinfo',
      title:'静态数据维护',
      name:'staticinfo',
      component:()=>import('@/views/miscmgr/staticinfo.vue')
  }]
}
export default sumStatic
