<template>
 <div class="container">
    <div class="main">
      <div class="form-grop">
          <p class="title-style">
            <span></span>
            <b>基本信息</b>
          </p>
          <div class="form-box">
            <div class="forms">
              <el-row class="row">
                <el-col :offset="1" :span="2" class="txt">坐席工号</el-col>
                <el-col :span="4">
                  <el-input size="mini" disabled v-model="form.userid"></el-input>
                </el-col>
                <el-col :span="2" :offset="1" class="txt txtmi">密码</el-col>
                <el-col :span="4">
                    <el-input size="mini" type="password" v-model="form.passwd" 
                        :show-password="showpasswd" @blur="checkpasswd"></el-input>
                </el-col>
                <el-col :span="2" :offset="1" class="txt txtmi">所属组</el-col>
                <el-col :span="4">
                  <el-input size="mini" disabled v-model="form.deptname"></el-input>
                </el-col>
                <!-- <el-col :span="1" class="suo-shu">
                  <div @click="dlgDeptTreeSingleVisible=true">
                    <img src="./../../assets/image/subordinateIcon.png" alt="" style="cursor:pointer">
                  </div>
                </el-col> -->
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="2" class="txt">分机号</el-col>
                <el-col :span="4">
                  <el-input placeholder="" size="mini"  v-model.trim="form.agentid" clearable></el-input>
                </el-col>
                <el-col :span="2" :offset="1" class="txt txtmi">姓名</el-col>
                <el-col :span="4">
                    <el-input size="mini" type="" v-model.trim="form.username" clearable></el-input>
                </el-col>
                <el-col :span="2" :offset="1" class="txt txtmi">身份证号</el-col>
                <el-col :span="4">
                  <el-input size="mini" v-model.trim="form.idno" clearable></el-input>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="2" class="txt txtmi">手机号</el-col>
                <el-col :span="4">
                  <el-input placeholder=""   v-model.trim="form.mobile" clearable></el-input>
                </el-col>
                <el-col :span="2" :offset="1" class="txt txtmi">职务类别</el-col>
                <el-col :span="4">
                  <el-select v-model="form.posttype" placeholder="请选择" @change="onPostTypeChange" clearable>
                      <el-option :label="item.dicttext" :value="item.dictvalue" v-for="(item,index) in postType" :key="index"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" :offset="1" class="txt">主管业务</el-col>
                <el-col :span="4">
                  <el-select v-model="form.admintype" clearable>
                    <el-option :label="item.kdesc" :value="item.kval" v-for="(item,index) in admintypeOptions" :key="index"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="row row-last" v-if="isDownOpen">
                <el-col :span="2" :offset="1" class="txt">关联工号</el-col>
                <el-col :span="4">
                    <el-input size="mini" type="" v-model.trim="form.pbinduserid" clearable></el-input>
                </el-col>
                <el-col :offset="1" :span="2" class="txt">团购ID</el-col>
                <el-col :span="4">
                  <el-input placeholder="" size="mini" v-model.trim="form.groupbuyid" clearable></el-input>
                </el-col>
              </el-row>
              <div class="open-down">
                <span @click="open">展开</span>
              </div>
            </div>
          </div>
        </div>
        <div class="table-grpm">
          <div class="jue-se">
            <p class="title-style">
              <span></span>
              <b >所具有角色</b>
              <i @click="dlgAddRoleVisible=true">追加</i>
            </p>
            <div class="jue-box box-border">
              <el-table
                :data="userRoleData"
                style="width: 100%"
                height="172"
                class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
               :cell-class-name="fn"
               @cell-click="remove"
               >
                <el-table-column
                  prop="rolename"
                  label="角色说明">
                </el-table-column>
                <el-table-column>
                  <span style="color:#1c61fc;cursor:pointer;font-size:12px;text-align:center;display:block">删除</span>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="woker-grop" >
             <p class="title-style">
              <span></span>
              <b >所管理工作组</b>
              <i @click="dlgDeptTreeMultiVisible=true">追加</i>
            </p>
            <div class="jue-box box-border">
              <el-table
                :data="userGroupData"
                style="width: 100%"
                height="172"
                class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
                :cell-class-name="fn1"
                @cell-click="removeWorkingGrop">
                <el-table-column
                  prop="deptcode"
                  label="编号">
                </el-table-column>
                <el-table-column
                  prop="deptname"
                  label="管理的工作组">
                </el-table-column>
                <el-table-column >
                  <span style="color:#1c61fc;cursor:pointer;font-size:12px;text-align:center;display:block">删除</span>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
    </div>
      
    <v-dlgqueryrole :dlgvisible.sync="dlgAddRoleVisible"></v-dlgqueryrole>
    <v-dlgDeptTreeSingle :dlgvisible.sync="dlgDeptTreeSingleVisible" treeType="S"></v-dlgDeptTreeSingle>
    <v-dlgdepttreemulti :dlgvisible.sync="dlgDeptTreeMultiVisible" treeType="M" checkStrictly="false"></v-dlgdepttreemulti>
 </div>
</template>
<script>
import {updateUserPost,getUserPost,loadDataDictPost,queryRolePost,queryStaticInfoPost} from '@/api/sysmgr.js'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import lu from '@/utils/loginUser'
import vchecker from '@u/vChecker'
import dlgQueryRole from '@/views/agentmgr/dlgQueryRole'
//import dlgDeptTreeMulti from '@/views/agentmgr/dlgDeptTreeMulti'
//import dlgDeptTreeSingle from '@/views/agentmgr/dlgDeptTreeSingle'
import dlgDeptTreeMulti from '@c/dlgDeptTree'
import dlgDeptTreeSingle from '@c/dlgDeptTree'

 export default {
 name:'userEdit',
 mixins: [mixin,wares],
 props:[''],
 data () {
 return {
   linklist:['保存','可见角色','关闭'],  //取消接触锁定功能，有统一门户统一处理
     dlgDeptTreeSingleVisible:false,
     dlgAddRoleVisible:false,
     dlgDeptTreeMultiVisible:false,
     isDownOpen:false,
     form:{
        userid:'',
        passwd:'',
        deptname:'',
        deptcode:'',
        agentid:'',
        username:'',
        idno:'',
        mobile:'',
        pbinduserid:'',
        posttype:'',
        groupbuyid:'',
      usercode:'',
      admintype:''
     },
     miform:[
       {
         id:'username',
         desc:'坐席姓名不能为空'
       },
       {
         id:'passwd',
         desc:'坐席密码不能为空'
       },
       {
         id:'deptcode',
         desc:'所属组不能为空'
       },
       {
         id:'mobile',
         desc:'手机号不能为空'
       },
       {
         id:'idno',
         desc:'身份证号不能为空'
       },
       {
         id:'posttype',
         desc:'职务类别不能为空'
       }],
     postType:[],//职务类别下拉选项
     admintypeOptions:[],//主管业务下拉框
     userRoleData:[],
     userGroupData:[],//所管理的工作组
     query:{},//保存=所传递过来的数据
     showpasswd:false,
  }
 },
 components: {
   "v-dlgqueryrole":dlgQueryRole,
   "v-dlgdepttreemulti":dlgDeptTreeMulti,
   "v-dlgDeptTreeSingle":dlgDeptTreeSingle
 },

//  computed: {},

//  beforeMount() {},

 mounted() {
   //获取静态变量
   this.getStatinfo();
 },
 
 activated(){
   this.$parent.linksw(this.linklist)
 },

 methods: {
   loadUserInfo(){
      //读取坐席基本信息
      let param={userid:this.$route.query.userid}
      getUserPost(param).then((res)=>{
        this.initData(res);
      }).catch((err)=>{console.log(err);})
   },
   initData(res){
      //console.log('getuser',res)
      for(let key in this.form){
        this.form[key]=res.data.data.user[key];
      }
      this.userRoleData=res.data.data.userrole? res.data.data.userrole :[];
      this.userGroupData=res.data.data.usergroup? res.data.data.usergroup:[];
      //初始化主管业务
      let atv=res.data.data.user['admintype'];
      if(this.form.posttype){
        let param={parentval:this.form.posttype,kid:'admintype'};
        queryStaticInfoPost(param).then(res=>{
          if(res.data.status=='0'){
            this.admintypeOptions=res.data.data.staticinfo;
            this.form.admintype=atv;
          }    
        }).catch((err)=>{console.log(err);})
      }
      
   },
   getStatinfo(){
    let oret=lu.getStaticInfo(['posttype']);
    let nitems=oret.nitems;
    if(nitems.length==0){
       this.postType=oret['posttype'].options;
       this.loadUserInfo()
    }
    else{
        loadDataDictPost(nitems).then((res)=>{
            lu.setStaticInfo=res.data.data;
            oret=lu.getStaticInfo(['posttype']);
            this.postType=oret['posttype'].options;
            this.loadUserInfo();
          }).catch((err)=>{console.log(err);})
    }
   },

   open(e){
            if(this.isDownOpen){
                this.isDownOpen=false;
                e.target.innerHTML="展开";
                e.target.style.backgroundImage=`url(${require('./../../assets/image/downBox.png')})`
            }else{
                e.target.innerHTML="收起";
                e.target.style.backgroundImage=`url(${require('./../../assets/image/upBox.png')})`
                this.isDownOpen=true;
            }
        },
     checkSave(){
       //保存前检查
       //1.基本信息不能为空的检查
       for(let i=0;i<this.miform.length;i++){
         let cr=vchecker.validMustInput(this.form[this.miform[i].id])
         if(cr) continue;
         this.alert(this.miform[i].desc);
         return false;
       }
       
       //2.校验身份证号
       if(vchecker.validId(this.form.idno) == false){
         this.alert('请输入正确的身份证号')
         return false;
       }

       //3.校验手机号
       if(vchecker.validMobile(this.form.mobile) == false){
         this.alert('请输入正确的手机号')
         return false;
       }
       
       //4.主管业务价差
       if(this.form.posttype=='M' && !this.form.admintype){
         this.alert('请选择主管业务')
         return false;
       }

       return true;
     },
     infoDao(){
       let target=this.$parent.target;
       if(target=="保存"){
         if(this.checkSave()==false)
              return;
          this.confirm('是否保存对用户信息的修改', '保存用户信息').then(()=>{
            let reqo={};
            reqo['user']=this.form;
            reqo['userrole']=this.userRoleData
            reqo['usergroup']=this.userGroupData
            console.log('reqo',reqo);
            updateUserPost(reqo).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0"){
                this.alert('保存成功!')
                this.initData(res);
              }
              else
                this.alert('保存失败:'+rdata.statusText)
            }).catch((err)=>{console.log(err);})
          })
       }
       else if(target=="解除锁定"){
         this.confirm('是否对此用户解除锁定', '用户解除锁定').then(()=>{
           console.log('building...')
         })
       }else if(target=="可见角色"){
         if(this.$parent.isPageOpen('visibleRole')){
           this.alert('当前有正在编辑的可见角色,请关闭再试!', '提示')
            return;
         }
         this.openPage('visibleRole',{username:this.form.username,userid:this.form.userid});
      }else if(target=="关闭"){
         this.closePage();
      }
     },
     remove(row,column,cell,event){//所具有角色的删除方法
        let target=cell.firstElementChild.firstElementChild;
        let list=this.userRoleData;
        if(target&&target.innerHTML=="删除"){
            for(var i=0;i<list.length;i++){
              if(list[i].roleid==row.roleid){
                this.userRoleData.splice(i,1);
                return;
              }
            }
        }
     },
     fn1(row,column,rowIndex,columnIndex){
       if(row.columnIndex==2){
         return 'delete'
       }
     },
     fn(row,column,rowIndex,columnIndex){
        if(row.columnIndex==1){
         return 'delete'
       }
     },
     onPostTypeChange(val){
        console.log('onPostTypeChange',val);
        //改变主管业务类型
        this.form.admintype='';
        let param={parentval:val,kid:'admintype'};
        queryStaticInfoPost(param).then(res=>{
          if(res.data.status=='0')
              this.admintypeOptions=res.data.data.staticinfo;
        }).catch((err)=>{console.log(err);})
     },
     removeWorkingGrop(row,column,cell,event){//管理工作组
        let target=cell.firstElementChild.firstElementChild;
        let list=this.userGroupData;
        if(target&&target.innerHTML=="删除"){
            for(var i=0;i<list.length;i++){
              if(list[i].title==row.title){
                this.userGroupData.splice(i,1);
                return;
              }
            }
        }
     },
     addDeptData(sdata){//所属组的选择回调函数
          this.dlgDeptTreeSingleVisible=false;
          let rgo=sdata;
          this.form.deptcode=rgo.deptcode?rgo.deptcode:'';
          this.form.deptname=rgo.deptname?rgo.deptname:'';
     },
     addDeptDataArray(cdata){
       this.dlgDeptTreeMultiVisible=false;
       let userGroupData=cdata;
       for(var i=0;i<userGroupData.length;i++){
         this.userGroupData.push(userGroupData[i]);
       }
       this.userGroupData=this.unique(this.userGroupData,'deptcode');
     },
    handleConfirm(diaList){
      this.dlgAddRoleVisible=false;
      for(let i=0;i<diaList.length;i++){
        this.userRoleData.push(diaList[i]);   
      }
      // this.tableData.unique();
      this.userRoleData=this.unique(this.userRoleData,'roleid');
    },
    checkpasswd(e){
      let errormsg=vchecker.valildPassword(e.srcElement.value);
      if(!errormsg) return;
      this.alert(errormsg).then(()=>{
          e.srcElement.focus();
        })
    }
 },
 watch:{
   'form.passwd':{
     handler(nval, oval) {
      if(nval && oval && nval!=oval)
        this.showpasswd=true;
     },
     //immediate: true,
   }
 }

 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
.form-grop{
  margin-top: 0 !important;
  .form-box{
    width: 100%;
  .open-down{
    line-height: 35px;
    text-align: center;
    margin-bottom: 5px;
    span{
      color: #66697B;
      padding-right: 15px;
      background: url('./../../assets/image/downBox.png') no-repeat right center;
      cursor: pointer;
    }
  }
  }
}
.table-grpm{
  // margin-top: 30px;
  overflow: hidden;
  height:  calc(~ "100vh - 382px");
  flex: 1;
  .jue-se,.woker-grop{
    &::after{
      content: "";
      display: table;
    }
    float: left;
    width: calc(~"50% - 40px");
    height: 100%;
    overflow: hidden;
    margin-right: 0px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    .jue-box{
      height: 100%;
      flex: 1;
      margin-bottom: @aside_w;
    }
  }
  .woker-grop{
    margin-right: 0;
    height: 100%;
  }
}
</style>
