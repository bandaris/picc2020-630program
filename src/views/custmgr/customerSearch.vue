<template>
 <div class="container">
    <div class="form-grop">
      <div class="forms">
        <el-row class="row">
          <el-col :span="2" :offset="1" class="txt">客户姓名</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.customercname" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">电话号码</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.phonenumber" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">被保人证件</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model="form.insuredidentinumber" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1" class="txt">客户编号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.customercode" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">投保单号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.applno" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">保单号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model="form.insurno" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" :offset="1" class="txt">车牌号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.plateno" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">车架号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.frameno" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">订单号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model="form.orderhistcode" clearable></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <v-result ref="result" :config="dgConfig" :showpage="true" style="height:calc(100vh - 386px)"></v-result>
 </div>
</template>

<script>
import {loadCustomerList} from '@/api/csrdata.js'
import lu from '@/utils/loginUser'
import wares from '@u/mixinWares'
import mixin from './mixins/index'
import result from '@/components/datagrid.vue'

export default {
 name:'customerSearch',
 props:[''],
 mixins: [mixin,wares],
 data () {
  return {
    dgConfig:{
        height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter fixec columntyp columnvalue
        columns:[
          ['customercode','客户编号','',true,false,null,'link'],
          ['customercname','姓名','100',true,false],
          ['province','省','',true,false],
          ['city','市','',true,false],
          ['phone','电话号码','',true,true],
          ['carnos','车牌号','',true,false],
          ['cmdEdit','','80',false,false,null,'cmd','历史信息']
        ],
        pageSize:10,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
        requestCurData:true
    },
    form:{
      
    },
    
    linklist:['查询','新建']
  };
 },
 components: {
   'v-result':result,
 },

 mounted() { 
   //this.getStatinfo();
  //  document.querySelector('.department').onclick=function(){
  //    this.getdepartment();
  //  }.bind(this);
 },
 activated(){
  this.$parent.linksw(this.linklist);
 },
 methods: { 
    
    handleClick(row,column,cell,event){
      let target=cell.firstElementChild.firstElementChild;
      if(target.innerHTML=="编辑"){
          if(this.$parent.isPageOpen('userEdit')){
            this.alert('当前有正在编辑的人员,请关闭再试!', '提示')
              return;
          }
          if(row.recflag =='X'){
            this.alert('此座席处于失效状态,不能进行编辑操作.请先点击相应生效按钮，再进行编辑操作。','提示')
            return;
          }
          else if(row.usertype !='E'){
            this.alert('非电销坐席类型人员无法进入坐席编辑页面','提示')
            return;
          }
          this.openPage('userEdit',row,row.username);
      }else if(target.innerHTML=="失效"){
          this.confirm('确定设置用户:'+row.userid+'失效吗?', '提示').then(()=>{
              let reqo={};
              reqo['user']=[{userid:row.userid}]
              console.log('row',row);
              console.log('reqo',reqo);
              disableUserPost(reqo).then((res)=>{
                let rdata=res.data;
                if(rdata.status=="0"){
                  //this.$message('操作成功!')
                  this.success('操作成功')
                }
                else
                  this.fail('操作失败'+rdata.statusText)
                
              }).catch((err)=>{
                console.log(err);
              })
          })
      }else if(target.innerHTML=="生效"){
          this.confirm('确定设置用户:'+row.userid+'生效吗?', '提示').then(()=>{
              let reqo={};
              reqo['user']=[{userid:row.userid}]
              console.log('row',row);
              console.log('reqo',reqo);
              enableUserPost(reqo).then((res)=>{
                let rdata=res.data;
                if(rdata.status=="0"){
                  this.success('操作成功!')
                }
                else
                  this.fail('操作失败'+rdata.statusText)
                
              }).catch((err)=>{
                console.log(err);
              })
          })
      }
    },
    
    infoDao(){
      let target=this.$parent.target;
      if(target=="查询"){
        let isSearch=false;
        for(let key in this.form){
          if(!this.form[key])
            continue;
          isSearch=true;
          break;
        }
        if(isSearch){
          this.dgConfig.currentPage=1;//点击查询按钮从第一页开始查询
          this.requestCurPageData();
        }else{
          this.fail('请输入查询条件')
        } 
      }
      else if(target=="新建"){       
        if(this.$parent.isPageOpen('customerNew')||this.$parent.isPageOpen('customerEdit')){
          this.alert('当前有客户信息正在编辑,请关闭再试!', '提示')
          return;
        }
        let gp={cctype:'new'}
        this.openPage('customerFrame',gp);
     }
    },
    requestCurPageData(){
      this.$parent.loading=true;
      let param=JSON.parse(JSON.stringify(this.form));
      param.attr={
        pagenum:this.dgConfig.currentPage,
        pagesize:this.dgConfig.pageSize
      }

      loadCustomerList(param).then((res)=>{
        if(res.data.status=='0'){
          this.$refs.result.allData=res.data.data.customer;
          if(res.data.data.pagenum==1)
            this.$refs.result.showTableData(res.data.data.total);
          else
            this.$refs.result.showTableData();
        }
        else{
          this.alert('查询结果:'+res.data.statusText)
          this.$refs.result.allData=[];
          this.$refs.result.showTableData();
        }
      }).catch((error)=>{
        this.alert('查询异常')
        this.$refs.result.allData=[];
        this.$refs.result.showTableData();
        console.log(error);
      }).finally(() => {
        console.log('finally');
        this.$parent.loading=false;
      });
    }
  }

 }

</script>
<style lang='less' scoped>
  @import url('./../../styles/index');
</style>