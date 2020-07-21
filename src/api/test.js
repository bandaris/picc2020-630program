//ajax请求测试类
import httpRequest from '@/utils/request'

const BASE_API=process.env.VUE_APP_BASE_API;

//Get调用
export function getTestDataByGet(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'/mocktest/queryget';//?page=1&pageSize=10';
  return httpRequest.get(url,params);
}

//POST调用
export function getTestDataByPost(params) {
  console.log('BASE_API:',BASE_API);
  let url=BASE_API+'user/staticinfo';
  console.log(url);
  //let url='http://11.205.52.69:7300/mock/5d9163a1376a601e48a04b4b/mocktest/querypost';
  return httpRequest.post(url,params);
}
