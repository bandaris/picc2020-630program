<template>
   <el-dialog title="角色选择" custom-class="picc-dialog-table" 
      :show-close="false" :visible="dlgvisible" @close="close">
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">
            角色选择
          </div>
          <div class="title-nav">
            <ul>
              <!-- <li>查询</li>
              <li>清空</li> -->
              <el-button size="mini" class="search" @click="operation" :loading="loading">查询</el-button>
              <el-button size="mini" class="search" @click="operation">清空</el-button>
            </ul>
            <img src="./../../assets/image/Close-nor.png" alt="" @click="close">
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="2">角色名称</el-col>
            <el-col :span="6">
              <el-input  v-model="selectRole.rolename" placeholder="模糊查询请使用%"></el-input>
            </el-col>
            <el-col :span="2" :offset="4">角色类型</el-col>
            <el-col :span="6">
              <el-select v-model="selectRole.roletype" clearable placeholder="请选择">
                <el-option :label="item.dicttext" :value="item.dictvalue" v-for="(item,index) in RoleTypeOptions" :key="index"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" >具备权限</el-col>
            <el-col :span="6">
              <el-input v-model="selectRole.purviewname" placeholder="模糊查询请使用%"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="table-grop">
        <el-table
          height="198"
         class="picc-table picc-table-normal picc-table-1st-col-icon" :data="dlgRoleData" style="width: 100%" @select-all="selectAll" @select="selectAll">
          <el-table-column type="selection" width="90"></el-table-column>
          <el-table-column  label="角色编号" prop="roleid"></el-table-column>
          <el-table-column  label="角色名称" prop="rolename"></el-table-column>
          <el-table-column  label="角色类型" prop="roletype" :formatter="handleFormat" ></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
          <el-button round type="primary" plain @click="close">取消</el-button>
          <el-button type="primary" round class="el-button-no-border" @click="addRoleData">确定</el-button>
      </div>
      <v-loading msg="正在加载信息" :loadflag="loading"></v-loading>
    </el-dialog>
</template>

<script>
import {loadDataDictPost,queryRolePost} from '@/api/sysmgr.js'
import lu from '@/utils/loginUser'
import wares from '@u/mixinWares'

export default {
    name:'dlgQueryRole',
    mixins: [wares],
    props:{
        dlgvisible:{
          type:Boolean,
          default:false
        },
        dlgid:{
          type:String,
          defaule:'aaa'
      },
    },
    data () {
      return {
        loading:false,
        RoleTypeOptions:[],//角色类别下拉框
        dlgRoleData:[],
        selectRole:{//保存追加所具有角色弹框表单
          rolename:'',
          roletype:'',
          purviewname:''
        },
        diaList:[]
      };
    },
    // components: {},
    // computed: {},
    // beforeMount() {},
    mounted() { 
      let oret=lu.getStaticInfo(['RoleType']);
      let nitems=oret.nitems;
      if(nitems.length==0){
        this.RoleTypeOptions=oret['RoleType'].options;
      }
      else{
          loadDataDictPost(nitems).then((res)=>{
              lu.setStaticInfo=res.data.data;
              oret=lu.getStaticInfo(['RoleType']);
              this.RoleTypeOptions=oret['RoleType'].options;
            }).catch((err)=>{console.log(err);})
      }
    },
    activated(){
      //console.log('activated');
    },
    deactivated(){
      //console.log('deactivated')
    },
    methods: {
      operation(e){
          let target=e.target.innerText;
          console.log('target',target)
          if(target=="查询"){
            let sflag=false;
            for(let key in this.selectRole){
              if(!this.selectRole[key])
                continue;
              sflag=true;
              break;
            }
            if(sflag==false){
              this.fail('请选择查询条件!')
                return;
            }

            this.loading=true;
            queryRolePost(this.selectRole).then((res)=>{
              this.dlgRoleData= res.data.data && res.data.data.role ? res.data.data.role :[];
              console.log('queryRolePost',res.data.data.role);
            }).catch((err)=>{console.log(err);}).finally(() => {
                  this.loading=false;
            });
          }else if(target=="清空"){
            for(let key in this.selectRole){
              this.selectRole[key]='';
            }
          }
        },
        close(){
          this.$emit('update:dlgvisible',false);
        },
        addRoleData(){
         if(this.$parent.handleConfirm){
           this.$parent.handleConfirm(this.diaList,this.dlgid)
         }
        },
        selectAll(selection){
          this.diaList=selection;
        },
        handleFormat(row, column, cellValue, index){
          if(!cellValue)
            return '';
          let mar=this.RoleTypeOptions.find(item=>item.dictvalue==cellValue)
          if(mar)
              return mar['dicttext']
          else
              return cellValue;
        }
    },
    watch: {}
 
 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
</style>
