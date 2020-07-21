<template>
  <div class="container">
    <!-- 新建落地部门页面开始 -->
    <div class="createLandingDepartment-main">
      <!-- 顶层表单 -->
      <div class="top-form">
        <el-row class="row">
          <el-col :span="2" class="txt">姓名</el-col>
          <el-col :span="4">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-col>
          <el-col :span="2" class="txt">登录工号</el-col>
          <el-col :span="4">
            <el-input v-model="form.number" size="mini"></el-input>
          </el-col>
          <el-col :span="2" class="txt">三代工号</el-col>
          <el-col :span="4">
            <el-input v-model="form.threecode" size="mini"></el-input>
          </el-col>
          <el-col :span="2" class="txt">三代密码</el-col>
          <el-col :span="4">
            <el-input v-model="form.threepwd" size="mini"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="txt">密码</el-col>
          <el-col :span="4">
            <el-input v-model="form.pwd" size="mini"></el-input>
          </el-col>
          <el-col :span="2" class="txt">所属机构</el-col>
          <el-col :span="4">
            <el-input v-model="form.branch" size="mini"></el-input>
          </el-col>
          <el-col :span="2" class="txt">子部门</el-col>
          <el-col :span="4">
            <el-select size="mini" v-model="form.childbranch">
              <el-option label="一级部门" value="一级部门"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <!-- 底部表格区域 -->
      <div class="bottom-table clearfix">
        <!-- 角色选择 -->
        <div class="left p" >
          <p class="title-style">
            <span></span>
            <b>角色选择</b>
            <i @click="dialogVisible2 = !dialogVisible2">追加</i>
          </p>
          <div class="box-border jue-box">
            <el-table
              :data="tableData"
              max-height="308"
              style="width: 100%;"
              class="picc-table picc-table-normal picc-table-1st-col-icon"
            >
              <el-table-column prop="roleName" label="角色名称"></el-table-column>
              <el-table-column prop="" label width="120">
                <template slot-scope="scope">
                  <el-button @click="deleteRow(scope.$index, tableData)" type="text" size="small">
                    <span style="font-size:14px;">删除</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 所管理机构 -->
        <div class="right p" >
          <p class="title-style">
            <span></span>
            <b>所管理机构</b>
            <i @click="addbranch">追加</i>
          </p>
          <div class="box-border jue-box">
            <el-table
              :data="wortabledata"
              max-height="308"
              style="width: 100%;"
              class="picc-table picc-table-normal picc-table-1st-col-icon"
            >
              <el-table-column prop="code" label="编号"></el-table-column>
              <el-table-column prop="title" label="管理的工作组"></el-table-column>
              <el-table-column prop="" label width="120">
                <template slot-scope="scope">
                  <el-button @click="deleteRow(scope.$index, wortabledata)" type="text" size="small">
                    <span style="font-size:14px;">删除</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建落地部门页面结束 -->

    <!-- 角色选择弹窗 -->
    <el-dialog
      title="选择产品方案"
      custom-class="picc-dialog-table"
      :show-close="false"
      :visible.sync="dialogVisible2"
    >
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">角色选择</div>
          <div class="title-nav">
            <ul @click="roleAdd">
              <li>查询</li>
              <li>清空</li>
            </ul>
            <img src="./../../assets/image/Close-nor.png" alt @click="dialogVisible2=false" />
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="2" :offset="0">角色名称</el-col>
            <el-col :span="6">
              <el-input v-model="tableroleform.rolename" placeholder="模糊查询请使用%"></el-input>
            </el-col>
            <el-col :span="2" :offset="4">角色类型</el-col>
            <el-col :span="6">
              <el-select v-model="tableroleform.roletype">
                <el-option label="电话中心" value='电话中心'></el-option>
                <el-option label="落地部门" value="落地部门"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">具备权限</el-col>
            <el-col :span="6">
              <el-input v-model="tableroleform.apply" placeholder="模糊查询请使用%"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="table-grop" >
        <el-table
          class="picc-table picc-table-normal picc-table-1st-col-icon"
          :data="roletableData"
          style="width: 100%;"
          height="231"
          @select="addroleinfo"
          @select-all="addroleinfo"
          ref="roletable"
        >
          <el-table-column type="selection" width="90"></el-table-column>
          <el-table-column label="角色编号" prop="roleNumber"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色类型" prop="roleType"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="dialogVisible2=false">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="successrole">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
    <!-- 机构选择弹窗 -->
    <el-dialog
      title="选择产品方案"
      custom-class="picc-dialog-table"
      :show-close="false"
      :visible.sync="dialogVisible4"
      width="400px"
    >
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">机构选择</div>
          <div class="title-nav">
            <img src="./../../assets/image/Close-nor.png" alt @click="dialogVisible4=false" />
          </div>
        </div>
      </div>
      <div class="dialog-box">
        <tree :config="config" :treedata="treedata" ref="tree"></tree>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="dialogVisible4=false">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="successBranch">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tree from "@/components/tree";
import mixin from './mixins/branch'
import wares from '@u/mixinWares'
import {getRoleQueryPost,getbranchtreeinfo} from '@/api/sysmgr'
export default {
  mixins: [mixin,wares],
  name:'branchNew',
   data() {
    return {
      roletableData:[],
      linklist:['保存','可见角色','关闭'],
      isSave:false,//当前页面信息是否被保存
      dialogVisible2: false, //角色选择的弹窗开关true
      dialogVisible4: false, //席位选择的弹窗开关
      navIndex: 2, //当前选中的副tab
      tabIndex: 2, //当前选中的主Tab
      departmentInformationForm: {}, //部门信息表单
      config: {
        //树形控件的配置项
        showCheckbox:true,//是否启用多选框默认显示
        isShowIcon:false,//是否显示label前的小图标默认是不显示
        isLazy:false,//是否懒加载默认不是
        isradio:false,//是否单选
         isstrictly:false
      },
      //表格模拟数据
      tableData: [],
      wartableData:[],
      form:{
        name:'',
        number:'',
        threecode:'',
        threepwd:'',
        pwd:'',
        branch:'',
        childbranch:''
      },
      tableroleform:{
        rolename:'',
        roletype:'',
        apply:''
      },
      treedata:[],
      wortabledata:[],
      isrole:false,//是否可以打开可见角色
    };
  },
  components: {
    tree
  },
  activated () {
    this.$parent.linksw(this.linklist)
    this.form.branch=this.$route.query.title?this.$route.query.title:this.form.branch;
  },
  methods: {
    successBranch(){
      this.dialogVisible4=false;
      let list= this.$refs.tree.checkeddata;
      for(var i=0;i<list.length;i++){
        this.wortabledata.push(list[i]);
      }
      this.wortabledata=this.unique(this.wortabledata,'code');
    },
    addbranch(){
      this.dialogVisible4=true;
      // this.$refs.tree.check-strictly=false;
      getbranchtreeinfo().then((res)=>{
          this.treedata=res.data.data.list;
          this.$refs.tree.setdefaultselect([this.treedata[0].id])
      })
    },
    successrole(){
      this.dialogVisible2=false;
      for(var i=0;i<this.wartableData.length;i++){
        this.tableData.push(this.wartableData[i]);
      }
      this.tableData=this.unique(this.tableData,'roleName');
      this.$refs.roletable.clearSelection();
    },
    addroleinfo(selection){
      this.wartableData=selection;
    },
    roleAdd(e){
      let target=e.target.innerHTML;
      if(target=='查询'){
        getRoleQueryPost().then((res)=>{
          this.roletableData=res.data.data.list;
          console.log(res.data.data);
        })
      }else if(target=="清空"){
          for(var key in this.tableroleform){
            this.tableroleform[key]=''
          }
      }
    },
    infoDao(){
       let target=this.$parent.target;
       if(target=='关闭'){
         this.closePage();
       }else if(target=='保存'){
         if(!this.form.name){
            this.alert('请输入落地人员名称','保存失败')
            return
         }else if(!this.form.pwd){
            this.alert('请输入登录密码','保存失败')
            return
         }
         this.warning('是否保存对落地人员信息的修改?','提示').then(()=>{
           this.alert('保存成功','提示','success');
           this.isrole=true;
            this.form.number=123456
         })
       }else if(target=='可见角色'){
        //  if(!this.isrole){
        //    this.alert('请先保存','提示');
        //    return
        //  }
         this.openPage('visibleRole',this.form)
       }
    },
    //删除表格中的一行数据事件方法
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
 
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
.container {
  .createLandingDepartment-main {
    padding: 0 @aside_w;
    height: 100%;
    display: flex;
    flex-direction: column;
    .bottom-table{
      flex: 1;
    }
    .top-form {
      margin-bottom: 15px;
    }
    .left,
    .right {
      float: left;
      width: 48.3%;
      .jue-box {
        margin-top: 15px;
        height: calc(~"100vh - 335px");
      }
    }
    .right {
      float: right;
      margin-right: 0;
    }
    .el-table--fit {
      height: 308px;
    }
  }
}
  .dialog-box{
    height: 400px;
    position: relative;
    overflow: auto;
    .treeBox{
      position: absolute;
    }
  }
</style>
