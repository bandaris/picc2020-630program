<template>
  <div class="container">
    <v-loading msg="正在拼命删除中..." :loadflag="loadingTestShow"></v-loading>
    <div class="form-grop">
      <el-row>
        <el-col :span="2" class="txt">角色名称</el-col>
        <el-col :span="4">
          <el-input size="mini" v-model="form.rolename" placeholder="模糊查询请使用%"></el-input>
        </el-col>
        <el-col :span="2" :offset="2" class="txt">角色类型</el-col>
        <el-col :span="4">
          <el-select v-model="form.roletype" placeholder="请选择">
              <el-option :label="item.dicttext" :value="item.dictvalue" v-for="(item,index) in RoleTypeOptions" :key="index"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="2" class="txt">具备权限</el-col>
        <el-col :span="4">
          <el-input size="mini" v-model="form.purviewname" placeholder="模糊查询请使用%"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="content" style="height:calc(100vh - 247px)" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table :data="currentData"  class="picc-table picc-table-normal picc-table-1st-col-icon" style="width:100%;" 
        @cell-click="handleClick"
        height="100%">
          <el-table-column prop="roleid" label="角色编号"></el-table-column>
          <el-table-column prop="rolename" label="角色名称"></el-table-column>
          <el-table-column prop="roletype" label="角色类型" :formatter="TransRoleType"></el-table-column>
          <el-table-column prop="" label="" align="center" width="60">
            <span class="color">编辑</span>
          </el-table-column>
          <el-table-column prop="" label="" align="center" width="60">
            <span class="color">删除</span>
          </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {loadDataDictPost,queryRolePost,deleteRolePost} from '@/api/sysmgr.js'
import lu from '@/utils/loginUser'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
export default {
  name:'searchRole',
  mixins: [mixin,wares],
  data() {
    return {
      loading:false,
      form:{
        rolename:'',
        roletype:'',
        purviewname:''
      },
      tableData:[],
      linklist:['查询','新建','清空'],
      RoleTypeOptions:[],
      RoleTypeTrans:{},
      //分页列表相关数据
      total:0,//总行数
      pageSize:10,//每页行数
      pageSizes:[10,20,30], //每页行数选项
      currentPage:1, //当前页
      currentData:[], //当前table显示的数据
      allData:[],  //全部的数据
      selection:[], //保存选择的数组
      loadingTestShow:false
    }
  },
   mounted () {
    this.getStatinfo();
  },
  activated () {
    this.$parent.linksw(this.linklist)
    // this.$parent.isActive('/home/sumRole/searchRole');
    // this.$parent.addnav({title:'角色查询',path:'/home/sumRole/searchRole'});
  },
  methods: {
    getStatinfo(){
      let oret=lu.getStaticInfo(['RoleType']);
      let nitems=oret.nitems;
      if(nitems.length==0){
        this.RoleTypeOptions=oret['RoleType'].options;
        this.SetRoleTypeTrans();
      }
      else{
          loadDataDictPost(nitems).then((res)=>{
              lu.setStaticInfo=res.data.data;
              oret=lu.getStaticInfo(['RoleType']);
              this.RoleTypeOptions=oret['RoleType'].options;
              this.SetRoleTypeTrans();
            }).catch((err)=>{console.log(err);})
      }
    },
    SetRoleTypeTrans(){
      for(let i=0;i<this.RoleTypeOptions.length;i++){
        let oid=this.RoleTypeOptions[i]['dictvalue']
        let oval=this.RoleTypeOptions[i]['dicttext']
        this.RoleTypeTrans[oid]=oval;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.showTableData();
   },
   handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.showTableData();
   },
   showTableData(){
     this.total=this.allData.length;
     this.selection=[];//清空选项
     let cdata=[];
     let page=this.currentPage;
     let pageSize=this.pageSize;
     let start=(page-1)*pageSize;
     let len=(this.total-pageSize*(page-1))<pageSize?(this.total-pageSize*(page-1)):pageSize;
     for(let i=start;i<(len+start);i++){
       this.allData[i]['_seqno']=i;
       cdata.push(this.allData[i]);
     }
     this.currentData=cdata;
   },
   removeRow(row){
     let seqno=row['_seqno'];
     this.allData.splice(seqno,1);
     this.showTableData();
   },
   handleClick(row,column,cell,event){
     let target=cell.firstElementChild.firstElementChild;
     if(target&&target.innerHTML=="编辑"){
        if(this.$parent.isPageOpen('editRole')){
          this.alert('当前有正在编辑的角色,请关闭再试!', '提示')
          return;
        }
        this.openPage('editRole',row);
     }else if(target&&target.innerHTML=="删除"){
       this.confirm('确定删除角色:'+row.rolename+'吗?', '提示').then(()=>{
            this.loadingTestShow=true
            let reqo={role:{roleid:row.roleid}}
            deleteRolePost(reqo).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0"){
                this.success('操作成功!')
                this.loadingTestShow=false
                this.removeRow(row);
              } else{
                this.loadingTestShow=false;
                this.alert(rdata.statusText,'操作失败')}
            }
            ).catch((err)=>{
              console.log(err);
            })
        })
     }
   },
   infoDao(e){
     let target=this.$parent.target;
     if(target=='查询'){
        let sflag=false;
        for(let key in this.form){
          if(!this.form[key])
          continue;
          sflag=true;
          break;
        }
        if(sflag==false){
          this.alert('请选择查询条件!', '提示')
          return;
      }
      this.loading=true;
      queryRolePost(this.form).then((res)=>{
        if(res.data.status=='0'){
          this.allData=res.data.data.role;
          this.showTableData();
          this.loading=false; 
        }else{
          this.loading=false;
          this.alert(res.data.statusText, '提示');
          this.currentData=[]
        }
          // this.allData=res.data.data.role?res.data.data.role:[];
          // this.showTableData();
          // this.loading=false;  
          // console.log(res.data);
          // if(res.data.status!=0){
          //   this.alert(res.data.data.statusText, '提示');
          //   this.currentData=[]
          // }
        }).catch((err)=>{
          this.loading=false;
          console.log(err);
        })
     }else if(target=='清空'){
       this.currentData=[]
        let form=this.form;
        for(var key in form){
          form[key]='';
        }
     }else if(target=='新建'){
       if(this.$parent.isPageOpen('newRole')){
          this.alert('新建角色已经打开,请关闭再试!', '提示')
          return;
        }
       this.openPage('newRole');
     }
    },
    TransRoleType(row, column, cellValue, index){
      return this.RoleTypeTrans[cellValue];
    }
  },
  // components: {

  // },
 
}
</script>

<style scoped lang="less">
@import url('./../../styles/index');
.content{
  margin: 15px @aside_w 0 @aside_w;
}
.pagination{
  text-align: center;
  margin-bottom: 10px;
}
</style>
