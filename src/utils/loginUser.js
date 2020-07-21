import store from '@/store'

class LoginUser{
  //用户登录信息
  set infoset(uinfo){
    store.dispatch('user/setuserinfo',uinfo);
  }
  //存储staticinfo的内容
  set setStaticInfo(staticinfo){
    store.dispatch('staticinfo/setstaticinfo',staticinfo);
  }
  //存储cookie信息
  set CookieInfo(cinfo){
    store.dispatch('cookie/setcookieinfo',cinfo)
  }
  get CookieInfo(){
    return store.getters.cookieinfo;
  }


  get userinfo(){
    return store.getters.userinfo;
  }
  
  get deptinfo(){
    return store.getters.deptinfo;
  }

  

  hasPurview(pvid){
    let ret=false;
    let pattr=store.getters.purviews;
    if(!pattr)
      return ret;
    if(pattr.indexOf(pvid)>=0) 
      ret=true;
    return ret;
  }
  
  getStaticInfo(itemids){
    let ret={};
    let nitems=[];
    let sinfo=store.getters.staticinfo;
    console.log(sinfo);
    for(let i=0;i<itemids.length;i++){
      let itemid=itemids[i];
      if(!sinfo[itemid]){
        let nn={dictname:itemid};
        nitems.push(nn);
        continue;
      }
      ret[itemid]=sinfo[itemid];
    }
    ret['nitems']=nitems; //追加可能不存在的静态数据id
    return ret;
  }
}

let lu=new LoginUser();

export default lu;