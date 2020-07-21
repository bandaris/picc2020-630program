<template>
  <div class="container">
    <div class="content-info">
      <div class="form-grop">
        <el-row>
          <el-col :span="2" class="txt">角色名称</el-col>
          <el-col :span="5">
            <el-input class="el-input-style" v-model="dataInfo.rolename" size="mini"></el-input>
          </el-col>
          <el-col :span="2" :offset="3" class="txt">角色类型</el-col>
          <el-col :span="5">
            <el-select v-model="dataInfo.roletype" placeholder="请选择">
              <el-option :label="item.dicttext" :value="item.dictvalue" v-for="(item,index) in RoleTypeOptions" :key="index"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <p class="title-style">
        <span></span>
        <b>权限列表</b>
      </p>
      <div class="jurisdiction-main" >
        <div class="jurisdiction-list">
          <div class="jurisdiction-box" v-for="(item,index) in checkboxInfo" :key="index">
            <p>{{item.title}}</p>
            <el-checkbox-group v-model="checkedList" @change="changChebox">
              <div v-for="(item,index) in item.purviews" :key="index">
                 <el-tooltip class="item" effect="dark" :content="item.title" v-if="item.title.length>=10" placement="top-start">
                  <el-checkbox :label="item.purviewid">{{item.title}}</el-checkbox>
                 </el-tooltip>
                <el-checkbox :label="item.purviewid" v-if="item.title.length<10">{{item.title}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {loadDataDictPost,getPurviewListPost,getRolePurviewPost,updateRolePost} from '@/api/sysmgr.js'
import lu from '@/utils/loginUser'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
export default {
  name:'editRole',
   mixins: [mixin,wares],
  data() {
    return {
      dataInfo:{//表单数据
       
      },
      linklist:['保存','关闭'],
      RoleTypeOptions:[],
      checkboxInfo:[],//所有权限的列表
      checkedList:[]//多选框组
    }
  },
  mounted () {
    //1.获取所有权限列表
    this.dataInfo=this.$route.query;
    getPurviewListPost({}).then((res)=>{
      console.log(res.data.data);
      this.checkboxInfo=res.data.data.purview
      //this.checkboxInfo=res.data.data.purview.slice(0,1)//for test
      this.getStatinfo();
    }).catch((err)=>{console.log(err);})
  },
  activated () {
    this.$parent.linksw(this.linklist);
    //this.dataInfo=this.$route.query.roleName?this.$route.query:this.dataInfo;
  },
  methods: {
    getStatinfo(){
      let oret=lu.getStaticInfo(['RoleType']);
      let nitems=oret.nitems;
      if(nitems.length==0){
        this.RoleTypeOptions=oret['RoleType'].options;
        this.loadDataInfo();
      }
      else{
          loadDataDictPost(nitems).then((res)=>{
              lu.setStaticInfo=res.data.data;
              oret=lu.getStaticInfo(['RoleType']);
              this.RoleTypeOptions=oret['RoleType'].options;
              this.loadDataInfo();
            }).catch((err)=>{console.log(err);})
      }
    },
    loadDataInfo(){
      let param={
          roleid:this.$route.query.roleid
      }
      getRolePurviewPost(param).then((res)=>{
        console.log(res.data.data);
        this.showDataInfo(res.data.data)
      }).catch((err)=>{console.log(err);})
    },
    showDataInfo(rdata){
        this.dataInfo=rdata.role;
        this.checkedList=[];
        for(let i=0;i<rdata.rolepurview.length;i++){
          this.checkedList.push(rdata.rolepurview[i].purviewid)
        }
    },
    infoDao(){
      let target=this.$parent.target;
      if(target=='关闭'){
        this.closePage();
      }
      else if(target=='保存'){
        let params={};
        params.role=this.dataInfo
        params.rolepurview=[];
        for(let i=0;i<this.checkedList.length;i++){
          let po=this.getPurviewInfo(this.checkedList[i])
          if(po)
            params.rolepurview.push(po);
        }
        console.log('updateRolePost',params);
        updateRolePost(params).then((res)=>{
          if(res.data.status!=0){
            this.alert(res.data.statusText,'保存失败')
            // this.$message('保存失败:',res.data.statusText);
            return;
          }
          this.alert('保存成功','提示','success')
          // this.$message('保存成功!')
          //重新加载
          this.showDataInfo(res.data.data)
          
        }).catch((err)=>{console.log(err);})
      }
    },
    getPurviewInfo(pid){
      for(let k=0;k<this.checkboxInfo.length;k++){
        let pvs=this.checkboxInfo[k].purviews;
        for(let j=0;j<pvs.length;j++){
          let po=pvs[j]
          if(po.purviewid!=pid) 
            continue;
          return {purviewid:pid,purviewname:po.title};
        }
      }
      return;
    },
    changChebox(){
      console.log( this.checkedList);
    }
  },
  // components: {

  // }
}
</script>

<style scoped lang="less">
@import url('./../../styles/index');
.content-info{
  margin: 0 @aside_w;
  .jurisdiction-main{
    height: calc(~"100vh - 232px");
    position: relative;
    overflow: auto;
    .jurisdiction-list{
      position: absolute;
      width: 100%;
    }
    .jurisdiction-box{
      border: 1px solid @border_color;
          border-radius: @border_radius;
          margin-top: 15px;
          overflow: hidden;
          padding-bottom: 10px;
          /deep/.el-checkbox{
            width: 176px;
            margin-top: 15px;
            float: left;
            padding-left: 22px;
            display: flex;
            align-items: center;
            /deep/.el-checkbox__label{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
              width: 150px;
              display: inline-block;
            }
          }
          p{
            line-height: 40px;
            height: 40px;
            background-color: #EDEEF0;
            padding-left: 10px;
            font-size: 12px;
          }
    }
  }
}
</style>
