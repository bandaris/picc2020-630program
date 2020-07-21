<template>
  <div class="container">
    <!-- 新建部门页面开始 -->
    <div class="createDeparitment">
      <!-- 锚点定位器 -->
      <!-- <AnchorPoint :pointList="testList" right="82px" top="273px"></AnchorPoint> -->
      <div class="main">
        <!-- 顶层表单 -->
        <div class="form-grop">
          <p class="title-style">
            <span></span>
            <b>部门信息(上级机构:{{authdeptname}})</b>
          </p>
          <!-- 表单域开始 -->
          <div class="form-box">
            <el-row class="row">
              <el-col :offset="1" :span="2" class="txt">销售组编号</el-col>
              <el-col :span="4">
                <el-input size="mini" disabled v-model="form.deptcode"></el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt txtmi">名称</el-col>
              <el-col :span="4">
                <el-input size="mini" v-model.trim="form.deptname" maxlength="20" show-word-limit></el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">ACD组号</el-col>
              <el-col :span="4">
                <el-input size="mini" v-model.trim="form.acdgroup" maxlength="20" clearable></el-input>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="1" :span="2" class="txt txtmi">业务类型</el-col>
              <el-col :span="4">
                <el-select size="mini" v-model="form.saledept" @change="ChangeSaleDept">
                  <el-option :label="item.dicttext" :value="item.dictvalue" 
                      v-for="(item,index) in saleDeptOptions" :key="index">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2" :offset="1" class="txt txtmi">销售类型</el-col>
              <el-col :span="4">
                <el-select size="mini" v-model="form.saletype" @change="ChangeSaleType">
                  <el-option :label="item.dicttext" :value="item.dictvalue" 
                      v-for="(item,index) in saletypeOptions" :key="index">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">销售子类</el-col>
              <el-col :span="4">
                <el-select size="mini" v-model="form.salesubtype" clearable>
                  <el-option :label="item.kdesc" :value="item.kval" 
                      v-for="(item,index) in salesubtypeOptions" :key="index">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="1" :span="2" class="txt txtmi">工号格式</el-col>
              <el-col :span="4">
                <el-input placeholder="输入8位工号格式数字"  maxlength="8" 
                  show-word-limit size="mini" v-model="form.uformat" @blur="checkuformat">
                </el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">联系次数</el-col>
              <el-col :span="4">
                <el-input-number v-model="form.stepcallcnt" placeholder="请输入整数" controls-position="right" :min="0" :max="10000">
                </el-input-number>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">接通次数</el-col>
              <el-col :span="4">
                <el-input-number v-model="form.stepactivecnt" placeholder="请输入整数" controls-position="right" :min="0" :max="10000">
                </el-input-number>
              </el-col>
            </el-row>
            <!-- 额外展开的表单 -->
            <el-row class="row row-last" v-if="isDownOpen">
              <el-col :span="24">
                <el-row :span="24">
                  <el-col :offset="1" :span="2" class="txt">二次促成</el-col>
                  <el-col :span="4">
                    <el-select size="mini" v-model="form.stepflag" clearable>
                      <el-option label="是" value="Y"></el-option>
                      <el-option label="否" value="N"></el-option>
                    </el-select>
                  </el-col>
                  
                  <el-col :offset="1" :span="2" class="txt">重复出单</el-col>
                  <el-col :span="4">
                    <el-select size="mini" v-model="form.insurrepeat" clearable>
                      <el-option label="是" value="Y"></el-option>
                      <el-option label="否" value="N"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :offset="1" :span="2" class="txt">组别系数</el-col>
                  <el-col :span="4">
                    <el-input-number v-model="form.factor" placeholder="请输入数字" controls-position="right" :precision="2" :step="0.1">
                    </el-input-number>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="24" style="margin-top:18px">
                <el-row :span="24">
                  <el-col :offset="1" :span="2" class="txt">区域类型</el-col>
                  <el-col :span="4">
                    <el-select sizi="mini" v-model="form.areacode" clearable>
                      <el-option :label="item.kdesc" :value="item.kval" 
                          v-for="(item,index) in areacodeOptions" :key="index">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :offset="0" :span="3" class="txt">归属机构代码</el-col>
                  <el-col :span="4">
                    <el-input size="mini" v-model.trim="form.comcode" maxlength="16" show-word-limit 
                            :disabled="fcomcodeVisible">
                    </el-input>
                  </el-col>
                  <el-col :offset="1" :span="2" class="txt">到期任务锁</el-col>
                  <el-col :span="4">
                    <el-select size="mini" v-model="form.tasklockflag" clearable>
                      <el-option label="关闭" value="N"></el-option>
                      <el-option label="开启" value="Y"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="open-down" :class="{isActive:isDownOpen}">
              <span @click="open">展开</span>
            </div>
          </div>
          <!-- 表单域结束 -->
        </div>
        <!-- 出单权限 -->
        <div class="left fl">
          <p class="title-style">
            <span></span>
            <b >出单权限</b>
            <i @click="batchesDelete">批量删除</i>
            <i @click="openDlgBatchImport">批量追加</i>
            <i @click="dlgPurviewVisible= true">追加</i>
          </p>
          <div class="box-border">
            <el-table
              :data="dept_comcodes"
              height="173"
              class="picc-table picc-table-normal picc-table-selectable single-table"
              style="width: 100%"
              @cell-click="deletesingle"
              @select="addSingchecked"
              @select-all="addSingchecked"
            >
              <el-table-column type="selection" width="56" />
              <el-table-column prop="comcode" label="机构代码" ></el-table-column>
              <el-table-column prop="comcname" min-width="200" label="名称" show-overflow-tooltip></el-table-column>
              <el-table-column >
                <span style="color:#1c61fc;cursor:pointer;font-size:12px;text-align:center;display:block">删除</span>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 角色 -->
        <div class="right fr">
          <p class="title-style">
            <span></span>
            <b >角色</b>
            <i @click="dlgRoleVisible=true">追加</i>
          </p>
          <div class="box-border">
            <el-table
              :data="dept_role"
              height="173"
              style="width: 100%"
              class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
              @cell-click="deleteRoleData"
            >
              <el-table-column prop="rolename" label="角色说明"></el-table-column>
              <el-table-column  width="60">
                <span style="color:#1c61fc;cursor:pointer;font-size:12px;text-align:center;display:block">删除</span>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 用户列表 -->
        <div class="left fl">
          <p class="title-style">
            <span></span>
            <b >用户列表</b>
            <i @click="dlgUserVisible = true">追加</i>
          </p>
          <div class="box-border">
            <el-table
              :data="dept_user"
              style="width: 100%"
              height="173"
              class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
              @cell-click="removeListInfo"
            >
              <el-table-column prop="userid" label="工号"></el-table-column>
              <el-table-column prop="username" label="用户名"></el-table-column>
              <el-table-column prop="" label="" >
                <span style="color:#1c61fc;cursor:pointer;font-size:12px;display:block;text-align:center">删除</span>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 任务列表金额 -->
        <div class="right fr">
          <p class="title-style">
            <span></span>
            <b >任务列表金额</b>
            <i @click="addTaskList">追加</i>
          </p>
          <div class="box-border">
            <el-table
              :data="dept_task"
              height="173"
              style="width: 100%"
              class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
              @cell-click="removeTaskInfo"
            >
              <el-table-column prop="validdt" label="有效年月" width="150px">
                <template slot-scope="scope">
                  <!-- <el-input v-model="scope.row.validdt" size="mini"></el-input> -->
                  <el-date-picker v-model="scope.row.validdt" type="month" value-format="yyyy-MM"></el-date-picker> 
                </template>
              </el-table-column>
              <el-table-column prop="taskname" label="任务名" width="200px">
                <template slot-scope="scope">
                  <el-input v-model.trim="scope.row.taskname" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额（万元）">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.amount" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column>
                <span style="color:#1c61fc;cursor:pointer;font-size:12px;text-align:center;display:block">删除</span>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 数据权限 -->
        <div class="right fr" style="width:100%;margin-bottom:15px">
          <p class="title-style">
            <span></span>
            <b >数据权限</b>
            <i @click="upload_deptbranch=[]">全删</i>
            <i @click="dlgRegionVisible=true">追加</i>
          </p>
          <div class="box-border">
            <el-table
              :data="upload_deptbranch"
              height="173"
              style="width: 100%"
              class="picc-table picc-table-normal picc-table-1st-col-icon single-table"
              @cell-click="deletepermissionTableData"
            >
              <el-table-column prop="branchcode" label="机构号"></el-table-column>
              <el-table-column prop="branchname" label="机构名称"></el-table-column>
              <el-table-column>
                <span style="color:#1c61fc;cursor:pointer;font-size:12px;display:block;text-align:center">删除</span>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
        
    <!-- 批量导入出单权限弹框-->
    <v-batchimport :title="dlgBatchTitle" :dlgid="dlgBatchId" 
              :dlgvisible.sync="dlgBatchVisible" :deptcode="form.deptcode"></v-batchimport>
    <!-- 追加出单权限 -->
    <v-addpurview  :dlgid="dlgPurviewId" :dlgvisible.sync="dlgPurviewVisible"></v-addpurview>
    <!-- 追加角色弹窗 -->
    <v-queryrole :dlgid="dlgRoleId" :dlgvisible.sync="dlgRoleVisible"></v-queryrole>
    <!-- 用户列表 -->
    <v-userlist :dlgid="dlgUserId" :dlgvisible.sync="dlgUserVisible"></v-userlist>
    <!-- 数据权限弹窗 -->
    <v-regionctro :dlgid="dlgRegionId" :dlgvisible.sync="dlgRegionVisible" treeType="M"></v-regionctro>
  </div>
</template>

<script>
//import tree from "@/components/tree";
import {getDeptPost,updateDeptPost,loadDataDictPost,queryStaticInfoPost} from "@/api/sysmgr";
import batchimport from './dlgBatchImport'
import addpurview from './dlgAddPurview'
import queryrole from './dlgQueryRole'
import userlist from './dlgUserList'
//import regionctro from './dlgRegionCtro'
//import regionctro from './dlgBranchTreeMulti'
import regionctro from '@c/dlgBranchTree'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import lu from '@/utils/loginUser'
import vchecker from '@u/vChecker'
import eventBus from '@u/vueEvent'

export default {
  name: "deptNew",
  mixins: [mixin,wares],
  props: [""],
  data() {
    return {
        tableHeader: [],
      linklist:['保存','关闭'],
      upload_deptbranch:[],//数据权限中显示的数据
      dept_task:[],//任务列表金额的数据
      dept_user:[],//用户列表中显示的数据
      dept_role:[],//角色中的显示的数据
      dept_comcodes:[],//出单权限表格数据
      multipleSelection: [], //表格中被选中的行
      //表格模拟数据
      secondaryTableData: [],

      isDownOpen: false, //表单是否被展开
      //表单中绑定的数据
      form: {
        deptcode:'',
        deptname:'',
        acdgroup:'',
        saledept:'',
        saletype:'',
        salesubtype:'',
        stepflag:'',
        stepcallcnt:'',
        stepactivecnt:'',
        uformat:'',
        insurrepeat:'',
        factor:'',
        areacode:'',
        comcode:'',
        tasklockflag:'N', //默认关闭
        depttype:'D', //记录后台传过来的数据
        authdeptcode:'',
        dlevel:''
      },
      authdeptname:'',
      miform:[
       {
         id:'deptname',
         desc:'销售组名称不能为空'
       },
       {
         id:'saledept',
         desc:'业务类型不能为空'
       },
       {
         id:'saletype',
         desc:'销售类型不能为空'
       },
       {
         id:'uformat',
         desc:'工号格式不能为空'
       }],
      
      saletypeOptions:[],
      e_saletypeOptions:[], //网销销售类型
      t_saletypeOptions:[], //电销销售类型
      salesubtypeOptions:[],
      saleDeptOptions:[],
      areacodeOptions:[],
      fcomcodeVisible:true,
      fcomcodeOriginVal:'',
      
      selectiontable:[],
      //批量导入出单权限弹框相关配置
      dlgBatchTitle:'批量导入出单机构',
      dlgBatchId:'dlgbatchid',
      dlgBatchVisible:false,

      //追加出单权限
      dlgPurviewId:'dlgPurviewId',
      dlgPurviewVisible:false,

      //角色追加
      dlgRoleId:'dlgroleid',
      dlgRoleVisible:false,

      //用户列表
      dlgUserId:'userid',
      dlgUserVisible:false,

      //数据权限弹窗
      dlgRegionId:'regionid',
      dlgRegionVisible:false,

      sel_dept_comcodes:[],//出单权限已选择数组
    };
  },

  components: {
    //tree,
    'v-batchimport':batchimport,
    'v-addpurview':addpurview,
    'v-queryrole':queryrole,
    'v-userlist':userlist,
    'v-regionctro':regionctro
  },

  // computed: {},

  // beforeMount() {},

  mounted() {
    //1.获取静态变量
   this.getStatinfo();
   
   //2.初始化uformat
   this.form.uformat=this.$route.query.uformat
   this.form.authdeptcode=this.$route.query.deptcode
   this.authdeptname=this.$route.query.deptname
   this.form.dlevel=this.$route.query.dlevel
   //console.log('deptNew form',this.form)
   
  },
  activated () {
    this.$parent.linksw(this.linklist);
  },
  methods: {
     addSingchecked(selection){
      this.sel_dept_comcodes=selection;
    },
    getStatinfo(){
      let oret=lu.getStaticInfo(['saledept','saletype','e_saletype']);
      let nitems=oret.nitems;
      if(nitems.length==0){
        this.saleDeptOptions=oret['saledept'].options;
        this.t_saletypeOptions=oret['saletype'].options;
        this.e_saletypeOptions=oret['e_saletype'].options;
        queryStaticInfoPost({kid:'areacode'}).then(res=>{
          if(res.data.status=='0')
              this.areacodeOptions=res.data.data.staticinfo;
          //this.loadDeptInfo();     
        }).catch((err)=>{console.log('getStaticInfo',err);})
      }
      else{
          loadDataDictPost(nitems).then((res)=>{
              lu.setStaticInfo=res.data.data;
              oret=lu.getStaticInfo(['saledept','saletype','e_saletype']);
              this.saleDeptOptions=oret['saledept']?oret['saledept'].options:[];
              this.t_saletypeOptions=oret['saletype']?oret['saletype'].options:[];
              this.e_saletypeOptions=oret['e_saletype']?oret['e_saletype'].options:[];
              queryStaticInfoPost({kid:'areacode'}).then(res=>{
                if(res.data.status=='0')
                    this.areacodeOptions=res.data.data.staticinfo;
                //this.loadDeptInfo();     
              }).catch((err)=>{console.log(err);})
            }).catch((err)=>{console.log(err);})
      }
   },
   loadDeptInfo(){
      //加载部门信息
      let param={
          deptcode:this.$route.query.deptcode
      }
      this.$parent.loading=true;
      getDeptPost(param).then((res)=>{
        this.initDeptInfo(res);
        this.$parent.loading=false;
      }).catch((err)=>{
        console.log(err);
        this.$parent.loading=false;
      })
   },
   initDeptInfo(res){
      console.log('initDeptInfo',res)
      this.ChangeSaleDept(res.data.data.dept['saledept']) //初始化销售类型的下拉框
      for(let key in this.form){
        this.form[key]=res.data.data.dept[key];
      }
      this.dept_task=res.data.data.dept_task? res.data.data.dept_task :[];
      this.dept_comcodes=res.data.data.dept_comcodes? res.data.data.dept_comcodes :[];
      this.dept_user=res.data.data.user? res.data.data.user :[];
      this.dept_role=res.data.data.dept_role? res.data.data.dept_role :[];
      this.upload_deptbranch=res.data.data.upload_deptbranch? res.data.data.upload_deptbranch :[];
      //记在前置归属机构的原始值并初始化comcode输入框的只读状态
      this.fcomcodeOriginVal=this.form.comcode
      if(this.form.saletype=='M')
        this.fcomcodeVisible=false;

      //初始化销售子类
      if(this.form.saletype){
        let param={parentval:this.form.saletype,kid:'salesubtype'};
        let sst=res.data.data.dept['salesubtype']
        queryStaticInfoPost(param).then(res=>{
          if(res.data.status=='0'){
              this.salesubtypeOptions=res.data.data.staticinfo;
              this.form.salesubtype=sst
          }
        }).catch((err)=>{console.log(err);})
      }

      this.$parent.loading=false;
   },
   ChangeSaleDept(val){
     this.form.saletype=''
     if(val=='T')
        this.saletypeOptions=this.t_saletypeOptions;
     else if(val=='N')
        this.saletypeOptions=this.e_saletypeOptions;
     else
        this.saletypeOptions=[]; 

      this.form.salesubtype='';
      this.salesubtypeOptions=[]
   },
   ChangeSaleType(val){
     
     console.log('ChangeSaleType',val);
     if(val=='M'){
       this.fcomcodeVisible=false;
       this.form.comcode=this.fcomcodeOriginVal;
       this.form.uformat='05000000';
     }
     else{
       this.fcomcodeVisible=true;
       this.form.comcode=''
       this.form.uformat=this.form.uformat=='05000000' ? '' : this.form.uformat;
     }
     //改变销售子类型
     this.form.salesubtype='';
     let param={parentval:val,kid:'salesubtype'};
     queryStaticInfoPost(param).then(res=>{
       if(res.data.status=='0')
          this.salesubtypeOptions=res.data.data.staticinfo;
     }).catch((err)=>{console.log(err);})

   },
    //点击弹框确定按钮时候
    handleConfirm(sData,dlgid){
      console.log(dlgid);
      if(!sData)
        return;
      
      if(dlgid==this.dlgBatchId){//批量追加出单权限
        // this.dlgBatchVisible=false;
        // for(let i=0;i<sData.length;i++){
        //   this.dept_comcodes.push(sData[i]);
        // }
        this.loadDeptInfo();
      }else if(dlgid==this.dlgPurviewId){//数据权限设置
        this.dlgPurviewVisible=false;
        for(let i=0;i<sData.length;i++){
          this.dept_comcodes.push(sData[i]);
        }
        this.dept_comcodes=this.unique(this.dept_comcodes,'comcode');
        
      }else if(dlgid==this.dlgRoleId){//角色选择弹框
        this.dlgRoleVisible=false;
        for(let i=0;i<sData.length;i++){
          this.dept_role.push(sData[i]);
        }
        this.dept_role=this.unique(this.dept_role,'roleid')
      }else if(dlgid==this.dlgUserId){//坐席选择弹出框
        this.dlgUserVisible=false
        for(let i=0;i<sData.length;i++){
          this.dept_user.push(sData[i]);
        }
        this.dept_user=this.unique(this.dept_user,'userid')
      }
    },
    addBranchDataArray(sData,dlgid){
      this.dlgRegionVisible=false;
         for(let i=0;i<sData.length;i++){
          let ud={branchcode:sData[i].comcode,branchname:sData[i].comcname}
          this.upload_deptbranch.push(ud);
        }
      console.log(sData);
      this.upload_deptbranch=this.unique(this.upload_deptbranch,'branchcode')
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
       //2.任务列表金额不能为空
       let cvt={};
       for(let i=0;i<this.dept_task.length;i++){
         if(!this.dept_task[i]['validdt']){
           this.alert('任务列表金额-有效年月不能为空');
           return false;
         }
         if(!this.dept_task[i]['taskname']){
           this.alert('任务列表金额-任务名不能为空');
           return false;
         }
         if(!this.dept_task[i]['amount']){
           this.alert('任务列表金额-金额不能为空');
           return false;
         }
         let tk=this.dept_task[i]['validdt']+this.dept_task[i]['taskname']
         if(!cvt[tk]){
           cvt[tk]=true;
           continue;
         }
         this.fail('此月已经存在该任务名,请确认后重新输入.');
         return false;
       }
       //3.数据权限不能为空
       if(this.upload_deptbranch.length<=0){
         this.alert('数据数据权限不能为空')
         return false;
       }
       //4.其它判断
       if(this.form.saletype=='M' && !this.form.comcode){
         this.alert('归属机构代码不能为空')
         return false;
       }
       if(this.form.uformat.substr(0,2)!='05'&&this.form.saletype=='M'){
         this.alert('前置业务的人员工号必须以05开头','提示')
         return false;
       }
      return true;
    },
    infoDao(){
      let target=this.$parent.target;
      if(target=="关闭"){
        //  this.$parent.close('/home/sumUser/ndept');
        this.closePage();
      }
      else if(target=="保存"){
        if(this.checkSave()==false)
              return;
        this.confirm('是否保存对部门信息的修改', '保存部门信息').then(()=>{
            let reqo={};
            reqo['dept']=this.form;
            reqo['dept_task']=this.dept_task
            reqo['dept_comcodes']=this.dept_comcodes
            reqo['user']=this.dept_user
            reqo['dept_role']=this.dept_role
            reqo['upload_deptbranch']=this.upload_deptbranch
            if(lu.hasPurview('renewal_team_management') 
                  && !lu.hasPurview('ts_admin') && !lu.hasPurview('ts_all')){
                reqo.attr={limit:'Y'}
                reqo.grouplimit={
                  crusr:lu.userinfo.userid,
                  deptcode:this.form.deptcode
                }
            }
            //console.log('reqo',reqo);
            this.$parent.loading=true;
            updateDeptPost(reqo).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0"){
                this.alert('保存成功!')
                eventBus.$emit('tree-reloadnode','deptNew')
                this.initDeptInfo(res);
              }
              else{
                this.alert('保存失败:'+rdata.statusText);
                this.$parent.loading=false;
              }
            }).catch((err)=>{
              console.log(err);
              this.$parent.loading=false;
              this.alert('保存异常');
            })
        })
      }
    },
    //手动删除出单权限
    deletesingle(row, column, cell, event){
      this.removeTableData(row, column, cell, event,'dept_comcodes','comcode')
    },
    //批量删除出单权限
    batchesDelete(){
        let ss=this.sel_dept_comcodes;
        let fr=this.dept_comcodes.filter(
          function(item){
            let fs=ss.filter(sitem => sitem.comcode==item.comcode)
            return fs && fs.length>0 ? false : true;
          })
        this.dept_comcodes=fr;
      // for(var i=this.dept_comcodes.length-1;i>=0;i--){
      //   let index=this.dept_comcodes[i].comcode;
      //   for(var j=0;j<this.singleChebox.length;j++){
      //     if(this.singleChebox[j].comcode==index){
      //       this.dept_comcodes.splice(i,1);
      //     }
      //   }
      // }
    },   
    //删除角色信息
    deleteRoleData(row, column, cell, event){
      this.removeTableData(row, column, cell, event,'dept_role','roleid')
    },
    //手动删除用户列表中的数据
    removeListInfo(row, column, cell, event){
      this.removeTableData(row, column, cell, event,'dept_user','seatsNumber')
    },
    //追加任务列表金额
    addTaskList(){
      let date=new Date();
      let year=date.getFullYear();
      let month=date.getMonth()+1
      let obj={};
      obj['validdt']=year+'-'+ (month<10 ? '0'+month : month);
      obj['taskname']='';
      obj['amount']='0';
      this.dept_task.push(obj);
    },
    //手动删除任务金额列表
    removeTaskInfo(row,column,cell,event){
      let target=cell.firstElementChild.firstElementChild;
      if(target&&target.innerHTML=="删除"){
        let list=this.dept_task;
        for(var i=0;i<list.length;i++){
          if(list[i].validdt==row.validdt && list[i].taskname==row.taskname){
            this.dept_task.splice(i,1);
          }
        }
      }
    },
    //删除数据权限表格中的数据
    deletepermissionTableData(row,column,cell,event){
      this.removeTableData(row,column,cell,event,'upload_deptbranch','branchcode')
    },
    //删除表格中的数据
    removeTableData(row,column,cell,event,tablename,attr){
      let target=cell.firstElementChild.firstElementChild;
      if(target&&target.innerHTML=="删除"){
        let list=this[tablename];
        for(var i=0;i<list.length;i++){
          if(list[i][attr]==row[attr]){
            this[tablename].splice(i,1);
          }
        }
      }
    },
    openDlgBatchImport(){
      if(!this.form.deptcode){
        this.alert('销售组编号为空，不能批量导入')
        return;
      }
      this.dlgBatchVisible=true;
    },
    checkuformat(e){
      let val=e.srcElement.value;
      let reg=/^\d{8}$/g;	
      let result=reg.test(val);	
      if(result==false){
        this.alert('工号格式不正确，输入8位数字工号格式!').then(()=>{
          e.srcElement.focus();
        })
      }
    },

  }
};
</script>
<style lang='less' scoped>
@import url('./../../styles/index');
/deep/.textform{
  input{
    border:none
  }
}
.container {
  //新建部门页面
  .createDeparitment {
    height: 100%;
    padding: 0 @aside_w;
    //左表格区域
    .main {
      &::after{
        content: "" !important;
        display: block;
        clear: both;
      }
      height: 100%;
      .form-grop {
        margin: 0 !important;
        .form-box {  
            margin: 15px 0 0 0;
            border: 1px solid @border_color;
            border-radius: @border_radius;
            padding-top: 15px;
            // height: 221px;
            background-color: @content_bgc;
          .open-down {
            line-height: 35px;
            text-align: center;
            span {
              color: #66697b;
              padding-right: 15px;
              background: url("./../../assets/image/downBox.png") no-repeat right
                center;
              cursor: pointer;
            }
          }
          .isActive {
            background-color: #f7f8fd;
          }
        }
      }  
      .left,
      .right {
        margin-top: 15px;
        width: 48.3%;
      }
    }
  }
}
</style>