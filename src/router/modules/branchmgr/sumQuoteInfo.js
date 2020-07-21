/** When your routing table is too long, you can split it into small modules **/

const sumQuoteInfo = {
  path:'/procmgr/sumQuoteInfo',
  name:'sumQuoteInfo',
  component:()=>import('@/views/branchmgr/sumQuoteInfo.vue'),
  children:[{
      path:'/procmgr/sumQuoteInfo',
      redirect:'quoteinfo'
  },{
      path:'/procmgr/sumQuoteInfo/quoteinfo',
      name:'quoteinfo',
      title:'直销报价配置',
      component:()=>import('@/views/branchmgr/quoteinfo.vue')
  },{
    path:'/procmgr/sumQuoteInfo/channelBind',
    name:'channelBind',
    title:'多渠道报价配置',
    component:()=>import('@/views/branchmgr/channelBind.vue')
  }]
}

export default sumQuoteInfo
