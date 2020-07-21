const powers=new Array("7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2");    
const parityBit=new Array("1","0","X","9","8","7","6","5","4","3","2");    
let sex="male"; 

class validChecker{
   
  //校验身份证号码的主调用    
  validId(_id){    
  
      var _valid=false;    
      if(_id.length==15){    
           _valid=this.validId15(_id);    
       }else if(_id.length==18){    
           _valid=this.validId18(_id);    
       }  
       else{
          return false;     
       }  
      if(!_valid){    
          return false;    
      }
      return true; 
  }        
  //校验18位的身份证号码    
  validId18(_id){    
       _id=_id+"";    
      var _num=_id.substr(0,17);    
      var _parityBit=_id.substr(17);    
      var _power=0;    
      for(var i=0;i< 17;i++){    
          //校验每一位的合法性    
  
          if(_num.charAt(i)<'0'||_num.charAt(i)>'9'){    
              return false;      
           }else{    
              //加权    
               _power+=parseInt(_num.charAt(i))*parseInt(powers[i]);    
              //设置性别    
  
              if(i==16&&parseInt(_num.charAt(i))%2==0){    
                   sex="female";    
               }else{    
                   sex="male";    
               }    
           }    
       }    
      //取模 
      var mod=parseInt(_power)%11;    
      if(parityBit[mod]==_parityBit){    
          return true;    
       }    
      return false;    
  }    
  
  
  //校验15位的身份证号码    
  validId15(_id){    
       _id=_id+"";    
      for(var i=0;i<_id.length;i++){    
          //校验每一位的合法性    
          if(_id.charAt(i)<'0'||_id.charAt(i)>'9'){    
              return false;     
           }    
       }    
      var year=_id.substr(6,2);    
      var month=_id.substr(8,2);    
      var day=_id.substr(10,2);    
      var sexBit=_id.substr(14);    
      //校验年份位    
  
      if(year<'01'||year >'90')return false;    
      //校验月份    
  
      if(month<'01'||month >'12')return false;    
      //校验日    
  
      if(day<'01'||day >'31')return false;    
      //设置性别    
  
      if(sexBit%2==0){    
           sex="female";    
       }else{    
           sex="male";    
       }    
      return true;    
  }
  //校验电话
  validMobile(val) {
    let reg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/g;
    let result = reg.test(val);
    if (!result)
      return false;
    return true;
  }
  //校验必填项
  validMustInput(val) {
    let tv = this.trim(val);
    if (tv)
      return true;
    else
      return false;
  }
  //去除首尾空格
  trim(str) {
    if (str)
        return str.toString().replace(/(^\s*)|(\s*$)/g, "");
    return str;
  }
  //校验密码长度
  valildPassword(passwd) {
    if (!passwd) {
      return;
    }
    let ret='';
    //密码长度不能超过16位
    let len=passwd.length;
    if(len>16){
      ret='密码长度不能超过16位!,请重设密码!';
      return ret;
    }

    //不允许输入全角字符
    let reg=/[ａ-ｚ]|[Ａ-Ｚ]|[０-９]|～|｀|！|＠|＃|￥|％|＾|＆|＊|（|）|＿|－|＋|＝|｛|｝|［|］|｜|＼|：|；|＂|＇|＜|＞|，|．|？|／|《|》|　|（|）|〈|〉|＜|＞|、/;
    if(reg.test(passwd)){
      ret='您所输入的密码有全角,请重新输入!';
      return ret;
    }

    //515 whm 20150526 密码管控功能 ADD
    //1.密码长度大于等于4位的仅限数字和字母 add..
    reg = /^[0-9A-Za-z]{4,}$/;
    if(!reg.test(passwd)){
        ret='密码长度要大于等于4位且仅限于数字和字母,请重设密码!';
        return ret;
    }
    //end..

    //除去非法字符
    let pd=passwd.toLowerCase();
    reg=/<|>|script|alert/;
    if(reg.test(pd)){
      ret='你输入的密码带有非法字母或字符,请重新输入!';
      return ret;
    }

    return ret;
  }
  //校验邮箱
  valildEmail(email) {
    let ret = ''
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (!email) {
      ret = '邮箱不可为空！'
    } else if (!reg.test(email)) {
      ret = '邮箱格式不正确'
    } else {
      return true
    }
    return ret
  }
  //校验固定电话
  valildFixedTelephone(value) {
    let ret = ''
    var reg = new RegExp("^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$"); //正则表达式
    if (!value) {
      ret = '固定电话不可为空！'
    } else if (!reg.test(value)) {
      ret = '固定电话格式不正确'
    } else {
      return true
    }
    return ret
  }
  //校验邮编
  valildPostcode(value) {
    let ret = ''
    var reg = new RegExp("^[0-9]{6}$"); //正则表达式
    if (!value) {
      ret = '邮编不可为空！'
    } else if (!reg.test(value)) {
      ret = '非法的邮编格式'
    } else {
      return true
    }
    return ret
  }
  //校验车牌号
  valildPlate(value) {
    let ret = ''
    var reg = new RegExp("(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)"); //正则表达式
    if (!value) {
      ret = '车牌号不可为空！'
    } else if (!reg.test(value)) {
      ret = '车牌号格式不正确'
    } else {
      return true
    }
    return ret
  }
  //校验是否是整数
  valildInteger(value) {
    let ret = ''
    var reg = new RegExp("^\d+$"); //正则表达式
    if (!value) {
      ret = '值为空'
    } else if (!reg.test(value)) {
      ret = '非整数'
    } else {
      return true
    }
    return ret
  }
}

let vchecker=new validChecker();

export default vchecker;