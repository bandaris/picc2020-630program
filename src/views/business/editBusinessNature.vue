<template>
  <div>
    <div class="form-grop">
         <el-row class="row">
              <el-col :offset="1" :span="2" class="txt">营销工号</el-col>
              <el-col :span="4">
                <el-input size="mini" v-model="form.usercode" clearable ></el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">电销工号</el-col>
              <el-col :span="4">
                 <el-input size="mini" v-model="form.userid" clearable ></el-input>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">姓名</el-col>
              <el-col :span="4">
                 <el-input size="mini" v-model="form.username" clearable ></el-input>
              </el-col>
          </el-row>
         <el-row class="row">
              <el-col :offset="1" :span="2" class="txt">绑定渠道</el-col>
              <el-col :span="4">
                <el-select v-model="form.newbusinessnature" placeholder="请选择" clearable :disabled="isdisabled">
                   <el-option v-for="(item,index) in usertypelist" :key="index" :label="item.channelbindcodename" :value="item.channelbindcode"></el-option>
                 </el-select>
              </el-col>
              <el-col :span="2" :offset="1" class="txt">手续费修改权限</el-col>
              <el-col :span="4">
                 <el-select v-model="form.commissionflag" placeholder="请选择" clearable >
                   <el-option label="关闭" value="2"></el-option>
                   <el-option label="开通" value="1"></el-option>
                 </el-select>
              </el-col>
          </el-row>
     </div>
     <div class="table-box">
         <v-result ref="result" :config="dgConfig" :showpage="false" style="height:calc(100vh - 244px)"></v-result>
     </div>
  </div>
</template>

<script>
import {getSalesChannelpost} from '@a/sysmgr'
import result from '@/components/datagrid.vue'
import wares from '@u/mixinWares'
import mixin from './mixins/index'
export default {
  name:'editBusinessNature',
  mixins: [mixin,wares],
  data() {
    return {
      linklist:['保存','关闭'],
      form:{},
      usertypelist:[],
      isdisabled:false,
      dgConfig:{
         height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['isdefault','','',true,false],
          ['monopolycode','推荐送修码','',true,false],
          ['monopolyname','修理厂名称','',true,false],
          ['flag','是否默认','',true,false],
        ],
        //table行按钮：span width
        commands:[
        ],
        pageSize:10,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
        requestCurData:true
     }
    }
  },
  methods: {
    infoDao(){
     let target=this.$parent.target;
     if(target=='关闭'){
        this.closePage();
     }
    },
    CreateDataGrid(usercode,newbusinessnature){
      if(newbusinessnature!='3H1') return;
      
    }
  },
  components: {
    'v-result':result
  },
  activated(){
      this.$parent.linksw(this.linklist)
  },
  mounted(){
    let {usercode,userid,username,newbusinessnature,commissionflag,isdisabled}=this.$route.query;
    this.CreateDataGrid(usercode,newbusinessnature)
    Object.assign(this.form,{
      usercode,
      userid,
      username,
      newbusinessnature,
      commissionflag
    })
    if(isdisabled=='1'&&newbusinessnature!=''){
      this.isdisabled=true
    }else{
      this.isdisabled=false;
    }
    getSalesChannelpost({}).then(res=>{
     if(res.data.status==0){
            let usertypelist=res.data.data.ts_saleschannel;
            this.usertypelist=this.unique(usertypelist,'channelbindcodename');
         }else{
             this.alert('提示',res.data.statusText)
        }
    })
  }
}
</script>

<style lang='less' scoped>
  /deep/.table-info{
    margin: 24px 20px 0 20px;
  }
</style>