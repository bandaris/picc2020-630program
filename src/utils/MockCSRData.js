import Mock from 'mockjs'
const baseURL='http://11.207.3.173:3000/mock/36/csrdata/';
Mock.mock(baseURL+'crsdata/newtest',function(options){
  console.log(options);
  let _req=JSON.parse(options.body);
  
  
   return {
    "status": 0,
    "statusText": "≤‚ ‘∑µªÿ",
    "data":""
    }
  
})
