//========拨打数据微服务=================
//ajax请求测试类
import httpRequest from '@/utils/request'

const BASE_API = process.env.VUE_APP_BASE_API + process.env.VUE_APP_CSRDATA;

export function newtest(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + 'crsdata/newtest';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}

//禁拨名单列表查询
export function getBlackList(params) {
  console.log(params);
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + 'sysmgr/blacklist/getBlackList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}

//禁拨名单列表失效|恢复
export function updateBlackList(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + '/sysmgr/blacklist/updateBlackList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}
//禁拨名单列表彻底删除
export function deleteBlackList(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + '/sysmgr/blacklist/deleteBlackList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}
//禁拨名单列表保存
export function saveBlackList(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + '/sysmgr/blacklist/saveBlackList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}
//禁拨名单列表保存
export function batchImportBlackList(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + '/sysmgr/blacklist/batchImportBlackList';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}
//禁拨轨迹查询
export function getBlackListHist(params) {
  console.log('BASE_API:', BASE_API);
  let url = BASE_API + '/sysmgr/blacklist/getBlackListHist';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url, params);
}