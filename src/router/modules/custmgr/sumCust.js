/** When your routing table is too long, you can split it into small modules **/

const sumCust = {
  path:'/procmgr/sumCust',
  name:'sumCust',
  component:()=>import('@/views/custmgr/sumCust.vue'),
  children:[{
      path:'/procmgr/sumCust',
      redirect:'customerSearch'
  },{
      path:'/procmgr/sumCust/customerSearch',
      title:'查询客户',
      name:'customerSearch',
      component:()=>import('@/views/custmgr/customerSearch.vue')
  },
  {
      path:'/procmgr/sumCust/customerFrame',
      title:'客户信息',
      name:'customerFrame',
      component:()=>import('@/views/custmgr/customerFrame.vue')
  }
  //{
  //     path:'/procmgr/sumCust/customerNew',
  //     title:'新建客户',
  //     name:'customerNew',
  //     component:()=>import('@/views/custmgr/customerNew.vue')
  // }
  ]
}

export default sumCust
