<template>
 <div class="container">
     <div class="infos">
         <div class="trees">
            <tree ref="tree" :config="config"/>
         </div>
         <div class="tables">
           <div class="table-info">
             <!-- <div v-show="loadingTestShow" class="picc-loading picc-loading_text">
                <p>
                  <i class="el-icon-loading"/>正在加载信息
                </p>
             </div> -->
             <v-loading msg="正在加载信息" :loadflag="loadingTestShow"></v-loading>
             <v-result ref="result" :config="dgConfig"></v-result>
            </div>
         </div>
     </div>
 </div>
</template>

<script>
import {queryUserPost,disableUserPost,deleteDeptPost} from '@/api/sysmgr.js'
import getBrowserType from '@u/browserType'
import tree from '@/components/tree.vue'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import result from '@/components/datagrid.vue'
import lu from '@/utils/loginUser'

 export default {
 name:'userManager',
 props:[''],
 inject:['reload'],
 mixins: [mixin,wares],
 data () {
  return {
    treeItem:null,//保存当前选中的树的项的id
    loadingTestShow:false,//是否显示加载状态
    config:{//配置树的配置项
        showCheckbox:false,
        isShowIcon:true,
        isRadio:true,
        checkStrictly:true,
        isLazy:true,
        rootNode:[{deptcode:'',deptname:'部门/工作组',dlevel:'0'}]
    },
    linklist:(!(lu.hasPurview('renewal_team_management') && !lu.hasPurview('ts_admin'))) 
            ? ['刷新','新建部门','修改部门','删除部门','新建坐席','查询坐席']:['刷新','新建部门','修改部门','新建坐席','查询坐席'],
    //table及分页相关数据
    // total:0,//总行数
    // pageSize:10,//每页行数
    // pageSizes:[10,20], //每页行数选项
    // currentPage:1, //当前页
    // currentData:[], //当前table显示的数据
    // allData:[],  //全部的数据
    // selection:[], //保存选择的数组
    dgConfig:{
        height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['userid','坐席工号','',true,false],
          ['username','姓名','',true,false],
          ['idno','身份证号','200',true,false],
          ['agentid','CIT分机号','',true,false]
        ],
        //table行按钮：span width
        commands:[
          ['cmdEdit','编辑','70'],
          ['cmdDisable','失效','70']
        ],
        pageSize:20,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
        requestCurData:true
    },
  };
 },

 components: {
     tree,
     'v-result':result,
 },

//  computed: {},

//  beforeMount() {},

 mounted() {  
  //  if(!(lu.hasPurview('renewal_team_management') && !lu.hasPurview('ts_admin'))){
  //    this.linklist=['刷新','新建部门','修改部门','删除部门','新建坐席','查询坐席']
  //  }
 },
 beforeMount(){
  //  let browserType=getBrowserType()
  // console.log('浏览器的版本为'+browserType);
  // if(/(^IE[11])|[Edge]/.test(browserType)){
  //   this.dgConfig.height=366
  // }
 },
 activated () {
   this.$parent.linksw(this.linklist)
 },
 methods: {
  //  test(row, column, cellValue, index){
  //    console.log(cellValue);
  //    return 'test';
  //  },
  //  handleSizeChange(val) {
  //     console.log(`每页 ${val} 条`);
  //     this.pageSize=val;
  //     this.showTableData();
  //  },
  //  handleCurrentChange(val) {
  //     console.log(`当前页: ${val}`);
  //     this.currentPage=val;
  //     this.showTableData();
  //  },
  //  showTableData(){
  //    this.total=this.allData.length;
  //    this.selection=[];//清空选项
  //    let cdata=[];
  //    let page=this.currentPage;
  //    let pageSize=this.pageSize;
  //    let start=(page-1)*pageSize;
  //    let len=(this.total-pageSize*(page-1))<pageSize?(this.total-pageSize*(page-1)):pageSize;
  //    for(let i=start;i<(len+start);i++){
  //      this.allData[i]['_seqno']=i;
  //      cdata.push(this.allData[i]);
  //    }
  //    this.currentData=cdata;
  //  },
  //  removeRow(row){
  //    let seqno=row['_seqno'];
  //    this.allData.splice(seqno,1);
  //    this.showTableData();
  //  },
   infoDao(){
     let target=this.$parent.target;
     if(target=="查询坐席"){
      //  this.$router.push('/home/sumUser/userSearch');
      this.openPage('userSearch')
     }
     else if(target=="新建部门"){
       if(this.treeItem){
         if(this.$parent.isPageOpen('deptNew')){
           this.alert('当前有正在新建的部门,请关闭再试!', '提示')
           return;
         }
          //console.log(this.treeItem.dlevel)
         if(this.treeItem.dlevel>=3){
            this.alert('【'+this.treeItem.deptname+'】是三级部门不能向下新建部门,请点击上级机构新建.')
            return;
         }
         this.$refs.tree.rNode=this.treeItem;//设定新建部门后需要重新加载的节点
         let gp={deptcode:this.treeItem.deptcode,
                  deptname:this.treeItem.deptname,
                  dlevel:(parseInt(this.treeItem.dlevel,10)+1),
                  uformat:this.treeItem.uformat}
         this.openPage('deptNew',gp);
       }
       else{
         this.alert('请先选择一个部门再进行追加操作', '无法进行追加操作')
       }
     }
     else if(target=="修改部门"){
       if(this.treeItem && this.treeItem.dlevel!=0){
         if(this.$parent.isPageOpen('deptEdit')){
           this.alert('当前有正在修改的部门,请关闭再试!', '提示')
           return;
         }
        let gp={deptcode:this.treeItem.deptcode}
        this.openPage('deptEdit',gp)
       }else{
          this.$alert('请先选择待修改的部门', '无法修改')
      }
     }
     else if(target=="删除部门"){
       if(!this.treeItem || this.treeItem.dlevel==0){
          this.alert('请选择需要删除的部门')
          return;
        }
        let cns=this.$refs.tree.getChildNodes(this.treeItem);
        if(cns && cns.length>0){
          this.alert('含有下级部门的机构,不能删除')
          return;
        }
        if(this.$refs.result.allData && this.$refs.result.allData.length>0){
          this.alert('此部门下有坐席信息,不能删除')
          return;
        }
        
        this.confirm('确定删除部门:'+this.treeItem.deptname+'吗?', '提示').then(()=>{
            let reqo={};
            reqo['deptcode']=this.treeItem.deptcode;
            deleteDeptPost(reqo).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0")
                this.alert('删除成功').then(()=>{
                  this.reload();
                })
              else
                this.alert('操作失败:'+rdata.statusText)
            }).catch((err)=>{
              this.alert('操作异常')
              console.log(err);
            })
          })
     }
     else if(target=="新建坐席"){
        if(!this.treeItem || this.treeItem.dlevel==0){
          this.alert('请选择新建用户所在部门')
          return;
        }
        if(this.$parent.isPageOpen('userNew')){
           this.alert('当前有正在新建的人员,请关闭再试!', '提示')
            return;
         }
        let gp={deptcode:this.treeItem.deptcode,deptname:this.treeItem.deptname}
        this.openPage('userNew',gp)
     }
     else if(target=="刷新"){
       this.getUserInfo(this.treeItem)
     }
   },
  
   getUserInfo(node){
     if(!node){
       this.alert('请选择销售部门')
       return;
     }
     this.treeItem=node;
     if(node.dlevel==0){
       //点击根节点，不需要查询数据
       this.$refs.result.allData=[];
       this.$refs.result.showTableData();
       return;
     }
     this.dgConfig.currentPage=1
     this.requestCurPageData()
   },
   requestCurPageData(){
     let param={
       deptcode:this.treeItem.deptcode
     }
     param.attr={
        pagenum:this.dgConfig.currentPage,
        pagesize:this.dgConfig.pageSize
     }
     this.loadingTestShow=true;
     queryUserPost(param).then((res)=>{
        if(res.data.status=='0'){
          // this.allData=res.data.data.user
          // this.showTableData();
          this.$refs.result.allData=res.data.data.user;
          if(res.data.data.pagenum==1)
            this.$refs.result.showTableData(res.data.data.total);
          else
            this.$refs.result.showTableData();
        }
        else{
          //this.alert('查询失败:'+res.data.statusText);
          // this.allData=[];
          // this.showTableData();
          this.$refs.result.allData=[];
          this.$refs.result.showTableData();
        }
        this.loadingTestShow=false;
      }).catch((err)=>{
        console.log(err);
        this.alert('查询异常')
        // this.allData=[];
        // this.showTableData();
        this.loadingTestShow=false;
        this.$refs.result.allData=[];
        this.$refs.result.showTableData();
        
      })
   },
   handleClick(row,column,cell,event){//点击失效或者编辑按钮时
     let target=cell.firstElementChild.firstElementChild;
     if(target){
       if(target.innerHTML=="失效"){
         this.confirm('确定用户:'+row.username+'失效吗?', '提示',true).then(()=>{
            let reqo={};
            reqo['user']=[{userid:row.userid}]
            console.log('row',row);
            console.log('reqo',reqo);
            disableUserPost(reqo).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0"){
                this.alert('操作成功!')
                this.$refs.result.removeRow(row);
              }
              else
                this.alert('操作失败')
              
            }).catch((err)=>{
              console.log(err);
            })
          },()=>{console.log('cancel')})
       }else if(target.innerHTML=="编辑"){
         if(this.$parent.isPageOpen('userEdit')){
           this.alert('当前有正在编辑的人员,请关闭再试!', '提示')
            return;
         }
         let gp={userid:row.userid}
         this.openPage('userEdit',gp,row.username);
       }
     }
   }
 },
 //watch: {}

 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
/deep/.table-info{
  margin: 0 0 20px 20px;
  height: calc(100vh - 213px);
}
.infos{
    height: 100%;
    padding:0 20px;
    overflow: hidden;
    .trees{
      float: left;
      border: 1px solid @border_color;
      width: 40%;
      height: calc(~ "100vh - 161px");
      border-radius: 4px;
      position: relative;
      overflow: auto;
      .treeBox{
        position: absolute;
      }
    }
    .tables{
      width: 60%;
      height: 100%;
      float: left;
      box-sizing:border-box;
      height: calc(~ "100vh - 161px");
      .table-info{
        // padding-left: 30px;
        box-sizing:border-box;
        overflow: auto;
        margin:0 0 0 20px;
        position: relative;
        height:100%;
        /deep/.picc-loading{
          position: absolute;
          z-index: 999;
        }
        .tic{
          color: @txt_active_color;
          cursor: pointer;
        }
      }
      /deep/.pagination{
        text-align: center;
        margin-bottom: 0 !important;
      }
    }
}
</style>