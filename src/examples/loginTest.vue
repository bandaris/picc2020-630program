<template>
 <div>
     <h1><b>This is LoginTest</b></h1>
     <p></p>
     <div>坐席登陆</div>
     <hr>
     <el-input v-model.trim="userid" size="small" style="width:200px" placeholder="输入工号对应的nusercode"></el-input>
     <el-button @click="fn">登录</el-button>
     <p></p>
     <div>获取当前坐席信息</div>
     <hr>
     <el-button @click="printuserinfo">打印坐席信息</el-button>
      <p></p>
     <el-input v-model.trim="purviewid" size="small" style="width:200px" placeholder="请输入权限ID"></el-input>
     <el-button @click="checkPurview">权限权限</el-button>
     <v-loading msg="登录坐席中" :loadflag="loadflag"></v-loading>
 </div>
</template>

<script>
import {userLoginPost} from '@/api/sysmgr'
import lu from '@/utils/loginUser'
import wares from '@u/mixinWares'

 export default {
 name:'agentmgr',
 mixins: [wares],
 props:[''],
 data () {
 return {
   userid:'',
   purviewid:'',
   loadflag:false,
 };
 },

//  components: {
//    loading
//  },

//  computed: {},

//  beforeMount() {},

//  mounted() {},

 methods: {
     fn(){
       if(!this.userid){
         this.$message.error('输入工号对应的nusercode');
         return;
       }
       let param={
              nusercode:this.userid,
              passwd:'******'
        }
        this.loadflag=true;
        userLoginPost(param).then((res)=>{
        if(res.data.status!=0){
          this.$message.error('坐席登陆失败!');
          return;
        }
        else{
          this.$message('坐席登陆成功!');
          lu.infoset=res.data.data;
        }
        
        }).catch((err)=>{console.log(err);}).finally(() => {
            console.log('finally');
            this.loadflag=false;
        });
     },
     printuserinfo(){
      console.log('userinfo',lu.userinfo);
      console.log('deptinfo',lu.deptinfo);
      //console.log('purviews',lu.hasPurview('amenddeal'));
     },
     checkPurview(){
       if(!this.purviewid){
         this.$message.error('请输入权限ID');
         return;
       }
       let r=lu.hasPurview(this.purviewid);
       this.$message('坐席['+lu.userinfo.userid+']:'+r);
     }
 },

//  watch: {}

 }

</script>
<style lang='less' scoped>
 ul{
        li{
            margin: 5px;
        }
    }
</style>