<template>
 <div>
   <v-loading :loadflag="loadflag" :msg="msg"></v-loading>
     <div class="form-grop">
         <el-row class="row">
              <el-col :offset="1" :span="2" class="txt">营销工号</el-col>
              <el-col :span="4">
                <el-input size="mini" v-model="form.newbusinessnature" clearable ></el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">渠道绑定</el-col>
              <el-col :span="4">
                 <el-select v-model="form.usertype" placeholder="请选择" clearable >
                   <el-option v-for="(item,index) in usertypelist" :key="index" :label="item.channelbindcodename" :value="item.channelbindcode"></el-option>
                 </el-select>
              </el-col>
            </el-row>
     </div>
     <div class="table-box">
         <v-result ref="result" :config="dgConfig" :showpage="false" style="height:calc(100vh - 200px)"></v-result>
     </div>
 </div>
</template>

<script>
import loading from '@/components/loading'
import {getSalesChannelpost,getBusinessNatureListpost,delBusinessNaturepost} from '@a/sysmgr'
import result from '@/components/datagrid.vue'
import wares from '@u/mixinWares'
import mixin from './mixins/index'
 export default {
 name:'bindBusinessNature',
 mixins: [mixin,wares],
 data () {
 return {
   msg:'正在查询绑定信息...',
   loadflag:false,
     linklist:['查询'],
     form:{},
     usertypelist:[],
     dgConfig:{
         height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['usercode','营销工号','',true,false],
          ['newbusinessnature','绑定渠道','',true,true],
          ['commissionflag','手续费修改权限','',true,true],
          ['userid','电商工号','',true,false],
          ['username','姓名','',true,false],
          ['deptname','组名称','',true,false]
        ],
        //table行按钮：span width
        commands:[
          ['cmdadd','添加','40'],
          ['cmdEdit','编辑','40'],
          ['cmdDisable','解除绑定','80']
        ],
        pageSize:10,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
        requestCurData:true
     }
 };
 },

 components: {
     'v-result':result,
     'v-loading':loading
 },

 computed: {},

 beforeMount() {},

 mounted() {
     getSalesChannelpost({}).then(res=>{
         if(res.data.status==0){
            this.usertypelist=res.data.data.ts_saleschannel
         }else{
             this.alert('提示',res.data.statusText)
         }
     })
 },
 activated(){
     this.$parent.linksw(this.linklist)
 },
 methods: {
   infoDao(){
     let target=this.$parent.target;
     if(target=='查询'){
       this.loadflag=true;
       this.msg='正在查询绑定信息...';
       let params=JSON.parse(JSON.stringify(this.form));
       getBusinessNatureListpost(params).then(res=>{
         let rdata=res.data;
         if(rdata.status==0){
           let target=res.data.data.binduser;
           this.loadflag=false;
           this.$refs.result.allData=target;
            this.$refs.result.showTableData()
         }else{
           this.loadflag=false;
           this.fail('提示',rdata.statusText)
         }
       }).catch(err=>{
         console.log(err);
       })
     }
   },
   TransValtoDesc(id,val){
     if(id=='newbusinessnature'){
       return this.resetbusinessnature(val)
     }
     if(id=='commissionflag'){
       if(val==2){
         return '关闭'
       }
       if(val==1){
         return '开通'
       }
     }
   },
   resetbusinessnature(val){
     if(val=='0'){
         return '传统直销渠道'
       }
       if(val=='1'){
         return '个代渠道'
       }
       if(val=='3H1'){
         return '车商渠道'
       }
       if(val=='3J1'){
         return '银保渠道'
       }
       if(val=='3J2'){
         return '交叉销售渠道'
       }
       if(val=='4'){
         return '经代渠道'
       }
       if(val=='4'){
         return '经代渠道'
       }
       if(val=='4'){
         return '经代渠道'
       }
       if(val==''){
         return '未绑定'
       }
   },
   handleClick(row,column,cell,event){
     let target=cell.firstElementChild.firstElementChild;
      if(target.innerText=='解除绑定'){
        if(row.newbusinessnature==""){
          this.alert('此工号尚未绑定渠道，不需要解除绑定','提示');
          return ;
        }
        let businessnature=this.resetbusinessnature(row.newbusinessnature);
        this.confirm(`是否要解除营销工号【${row.usercode}】的【${businessnature}】的渠道绑定关系?`,'提示').then(()=>{
          this.loadflag=true;
          this.msg='正在保存绑定信息...'
          let params={};
          let {usercode,newbusinessnature}=row;
          Object.assign(params,{
            usercode,
            newbusinessnature
          })
          delBusinessNaturepost(params).then(res=>{
            if(res.data.status==0){
              this.loadflag=false;
              this.success('解除绑定成功');
              this.resettablebusinessnature(row);
            }else{
              this.loadflag=false;
              this.fail(`${res.data.statusText}`)
            }
          }).catch(err=>{
            console.log(err);
          })
        })
      }else if(target.innerText=='添加'||target.innerText=='编辑'){
        let  isdisabled='';
        if(this.$parent.isPageOpen('editBusinessNature')){
           this.alert('已经打开渠道绑定页面,请关闭后在操作', '提示')
            return;
         }
         if(target.innerText=='编辑'){
           isdisabled='1';
         }else{
           isdisabled='0';
          }
        Object.assign(row,{
          isdisabled
        })
         this.openPage('editBusinessNature',row);
      }
   },
   resettablebusinessnature(row){
     let target=JSON.parse(JSON.stringify(this.$refs.result.allData));
     let index=target.findIndex(n=>n.id==row.id)
      target[index]['newbusinessnature']='';
     this.$refs.result.allData=target;
     this.$refs.result.showTableData();
   }
 },

 watch: {}

 }

</script>
<style lang='less' scoped>
  /deep/.table-info{
    margin: 24px 20px 0 20px;
  }
</style>