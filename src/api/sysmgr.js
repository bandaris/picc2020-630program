//========系统管理微服务=================
//ajax请求测试类
import httpRequest from '@/utils/request'

const BASE_API=process.env.VUE_APP_BASE_API+process.env.VUE_APP_SYSMGR;

//Get调用
export function getTestDataByGet(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'/mocktest/queryget';//?page=1&pageSize=10';
  return httpRequest.get(url,params);
}

//POST调用
export function userLoginPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/userLogin';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取部门树信息
export function getLoadTreePost(params) {
  
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'dept/loadDeptTree';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取机构树信息
export function loadCompanyTreePost(params) {
  
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/loadCompanyTree';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//用户查询
export function getSearchInfoPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/searchInfo';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function getUserRoleVisiblePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/getUserRoleVisible';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function updateUserRoleVisiblePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/updateUserRoleVisible';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//编辑页面中用户管理工作组
export function getWorkingGropPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/managementWorkingGrop';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//查询用户
export function queryUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/queryUser';
  console.log(url);
  return httpRequest.post(url,params);
}
//获取用户详细信息
export function getUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/getUser';
  console.log(url);
  return httpRequest.post(url,params);
}

//添加可见角色数据说明
export function getvisibleRolePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/visibleRole';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//在新建部门模块获取出单权限的部门树信息
export function getissueSettingTreePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/issueSettingTree';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//新建部门模块出单权限二级机构数据
export function getSecondaryInstitutionsPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/SecondaryInstitutions';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//新建部门模块出单权限三级级机构数据
export function getTertiaryInstitutionsPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/tertiaryInstitutions';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//新建部门模块角色选择查询数据
export function getRoleQueryPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/roleAddQuery';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//设置坐席选择模拟数据
export function getroleAddQueryPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/userlistdQuery';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//数据权限弹框列表
export function getDataPermissionDataPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/dataPermissionData';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//修改部门信息数据
export function updateDeptPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'dept/updateDept';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//删除部门信息数据
export function deleteDeptPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'dept/deleteDept';
  console.log(url);
  return httpRequest.post(url,params);
}
export function loadDataDictPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/loadDataDict';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function queryStaticInfoPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/queryStaticInfo';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function createStaticInfoPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/createStaticInfo';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function getQueryUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/queryUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function updateUserPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/updateUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function enableUserPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/updateUserByAdmin/enableUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function disableUserPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/updateUserByAdmin/disableUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function createUserPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/createUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function getDeptPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'dept/getDept';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

export function transferUserGroupPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/transferUserGroup';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//微店信息查询
export function queryMicroShopPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/queryMicroShop';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//失效微店信息
export function deleteMicroShopPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/deleteMicroShop';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//编辑微店信息
export function updateMicroShopPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/updateMicroShop';
  console.log(url);
  return httpRequest.post(url,params);
}

//编辑微店信息
export function createMicroShopPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/createMicroShop';
  console.log(url);
  return httpRequest.post(url,params);
}

//批量导入微店信息的返回数据
export function batchCreateMicroShopPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'misc/batchCreateMicroShop';
  console.log(url);
  return httpRequest.post(url,params);
}
//获取角色查询信息
export function getCompanyBusinessnaturePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/getCompanyBusinessnature';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取落地部门树形控件信息
export function getbranchtreeinfo(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'branch/getcompanyList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取机构电商个性属性传值
export function getCompanyTSPropPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/getCompanyTSProp';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取机构电商个性属性传值
export function updateCompanyTSPropPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/updateCompanyTSProp';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//获取编辑落地人员信息
export function getgetbranchListProp(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'branch/getbranchList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//--------------------报价配置---------------
export function queryBNUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/queryBNUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function queryBNComcodePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/queryBNComcode';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
export function updateCompanyBusinessnaturePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'company/updateCompanyBusinessnature';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//人员批量导入
export function batchCreateUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/batchCreateUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//人员批量失效
export function batchDisableUserPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/updateUserByAdmin/batchDisableUser';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
//获取权限列表
export function getPurviewListPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'purview/getPurviewList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//获取对应角色的权限
export function getRolePurviewPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'purview/getRolePurview';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//获取角色查询信息
export function queryRolePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'purview/queryRole';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}


// 保存角色信息
export function updateRolePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'purview/updateRole';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}


// 删除角色信息
export function deleteRolePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'purview/deleteRole';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

// 销售部门批量追加出单机构
export function batchAddDeptComcodePost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'dept/batchAddDeptComcode';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}


//--------------多渠道报价配置--------------
//多渠道报价配置个人已绑定渠道代码加载
export function selectAgentPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'selectAgent';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//多渠道报价配置查询
export function getPriceInfoPost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'getPriceInfo';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//多渠道报价配置报价配置新增/修改/删除
export function sendPriceDatapost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'sendPriceData';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//多渠道绑定可配置绑定渠道加载
export function getSalesChannelpost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'getSalesChannel';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//多渠道渠道绑定查询
export function getBusinessNatureListpost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'getBusinessNatureList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}

//渠道绑定渠道绑定解除绑定
export function delBusinessNaturepost(params){
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'delBusinessNature';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
