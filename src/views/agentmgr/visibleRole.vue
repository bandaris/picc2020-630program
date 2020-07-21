<template>
 <div class="container">
    <div class="form">
        <el-row>
            <el-col :span="2" class="txt">工号</el-col>
            <el-col :span="4">
                <el-input disabled v-model="formdata.userid"></el-input>
            </el-col>
            <el-col :span="2" :offset="2" class="txt">名称</el-col>
            <el-col :span="4">
                <el-input disabled v-model="formdata.username"></el-input>
            </el-col>
        </el-row>
    </div>
    <div class="text">
        <div class="title-style">
            <span></span>
            <b>可见角色</b>
            <i @click="dlgAddRoleVisible=true">追加</i>
        </div>
    </div>
    <v-datagrid ref="datagrid" :config="dgConfig" style="height:calc(100vh - 255px);"></v-datagrid>
    <v-dlgqueryrole :dlgvisible.sync="dlgAddRoleVisible"></v-dlgqueryrole>
 </div>
</template>

<script>
import {getUserRoleVisiblePost,updateUserRoleVisiblePost,queryRolePost} from '@/api/sysmgr.js'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import datagrid from '@/components/datagrid.vue'
import dlgQueryRole from '@/views/agentmgr/dlgQueryRole'

export default {
 name:'visibleRole',
 props:[''],
 mixins:[mixin,wares],
 data () {
 return {
     linklist:['保存','关闭'],
     
     dlgAddRoleVisible:false,
     formdata:{
        
     },
     dgConfig:{
        height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['rolename','角色名称','',false,false]
        ],
        //table行按钮：span width
        commands:[
          ['cmdEdit','删除','40']
        ],
        pageSize:20,//每页行数
        pageSizes:[20,40], //每页行数选项
        currentPage:1, //当前页
    }
 };
 },

 components: {
   'v-datagrid':datagrid,
   "v-dlgqueryrole":dlgQueryRole,
 },

//  computed: {},

//  beforeMount() {},

 mounted() {
    this.formdata=this.$route.query;
    getUserRoleVisiblePost({userid:this.formdata.userid}).then((res)=>{
        //this.tableData=res.data.data.userrole_visible;
        this.$refs.datagrid.allData=res.data.data.userrole_visible;
        this.$refs.datagrid.showTableData();
    })
 },
 activated(){
    this.$parent.linksw(this.linklist)
    //this.formdata=this.$route.query.name?this.$route.query:this.formdata;
  },
 methods: {
    handleConfirm(diaList){
      this.dlgAddRoleVisible=false;
      //按照中台要求追加userid
      let uid=this.formdata.userid;
      let att=diaList.reduce(
        function(item,next){
          next['userid']=uid;
          item.push(next);
          return item;
        },[]);
      this.$refs.datagrid.addRowArray(att,'roleid')  
      // this.tableData=this.unique(this.tableData,'roleid');
    },
     infoDao(){
        let target=this.$parent.target;
        if(target=="关闭") {
            this.closePage();
        }
        else if(target=='保存'){
           this.confirm('是否保存对角色信息的修改', '保存角色信息').then(()=>{
              let param={user:{userid:this.formdata.userid}}
              param.userrole_visible=this.$refs.datagrid.allData.map(n=>{
                if(n['userrolecode']){
                  delete n.userrolecode
                }
                return n;
              })

              updateUserRoleVisiblePost(param).then(res=>{
                  if(res.data.status!="0"){
                    this.alert('保存失败');
                    return;
                  }
                  else{
                    this.alert('保存成功')
                    this.$refs.datagrid.allData=res.data.data.userrole_visible;
                    this.$refs.datagrid.showTableData();
                  }
              }).catch((err)=>{console.log(err);})
          })
        }
     },
     handleClick(row, column, cell, event){
        let target=cell.firstElementChild.firstElementChild;
        if(target.innerHTML=="删除"){
            this.$refs.datagrid.removeRow(row);
        }
     }
 }


 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
.text{
  margin: 0 20px;
}
/deep/.table-info{
  height: calc(100vh - 317px);
}
</style>