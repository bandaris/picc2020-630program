<template>
 <div class="conbox">
   <div class="loading" v-if="loading">
     <div class="loading-spinner">
       <i class="el-icon-loading"></i>
       <p>Loading</p>
     </div>
   </div>
     <div class="nav-tab">
         <div class="tab-nav">
             <div class="nav-link">
                <navlist ref="navlist"/>
                <ul class="nav-right" @click="infoDao">
                    <li v-for="(item,index) in linkList" :key="index">{{item}}</li>
                </ul>
             </div>
         </div>
     </div>
     <keep-alive>
        <router-view ></router-view>
     </keep-alive>
 </div>
</template>

<script>
import navlist from '@/components/navlist.vue'
import lu from '@/utils/loginUser'
import sumBatchRouter from '@/router/modules/miscmgr/sumBatch'
import msum from '@u/mixinSum'

export default {
 name:'sumBatch',
 props:[''],
 mixins: [msum],
 data () {
 return {
   loading:false,
   linkList:[],
   navIndex:0,
   target:null,
   
 };
 },

 components: {
     navlist
 },

//  computed: {},

//  beforeMount() {},

//  mounted() {
   
//  },
 methods: {
   close(str){//当点击关闭按钮的时候
     let list=this.$refs.navlist.navList;
     for(let i=list.length-1;i>=0;i--){
       if(str!=list[i].name)
        continue;
       
       this.$refs.navlist.navList.splice(i,1);
       
       let idx=i-1;
       if(idx>=0){
         //把前一个vue页面作为active页面
         this.$router.push(list[idx].path);
         this.setIndex(idx);
       }
       else{
         //如果已经是第一个页面，那么直接路由到默认页面
         this.$router.push(this.getRedirect());
         this.setIndex(0);
       }
       break;
      }
   },
   getRedirect(){
      let rl=sumBatchRouter.children;
      if(!rl) return;
      for(let i=0;i<rl.length;i++){
        let r=rl[i];
        if(!r.redirect) continue;
        return r.path;
      }
   },
   infoDao(e){//点击右侧的link按钮链接
     this.target=e.target.innerHTML;
     let child=this.$children;
     let ap=this.$refs.navlist.getActivePage();
     console.log('ap',ap);
     

    //  let name=lu.sumRoleNavName;
    //  let sumRoleNavName=lu.sumRoleNavName;
     //依然从入口的字组件拿点击的事件
     for(var i=child.length-1;i>=0;i--){
       if(child[i].$options.name!=ap.name) continue;
       child[i].infoDao();
         return;
     }
   },
   addnav(res){//向navList中添加项每次跳转时首先判断调用
     //如果在navlist中存在已保存的link则返回false退出函数执行否则添加
     let list=this.$refs.navlist.navList;
    //  for(var i=0;i<list.length;i++){
    //    if(list[i].name==res.name){
    //      this.setIndex(i);//直接设置此页面为active
    //      return false;
    //    }
    //  }
     let index=this.$refs.navlist.navList.push(res);
    //  this.setIndex(index-1);
   },
   isActive(str){//多页面同时展现时，避免页面刷新后，避免nav和页面不匹配时需要调用
      setTimeout(()=>{
        let list=this.$refs.navlist.navList;
        for(var i=list.length-1;i>=0;i--){
          if(list[i].name==str){
            this.setIndex(i);
            return i;
          }
        }
        return false;
      },50)
   },
   clearc(){//清空右侧链接项
     this.linkList=[];
   },
   linksw(res){//向右侧链接项赋值
     this.linkList=res;
    //  for(var i=0;i<res.length;i++){
    //    this.linkList.push(res[i])
    //  }
   },
   setIndex(target){//设置nav导航的焦点下标
     this.$refs.navlist.setIndex(target);
   },
   getListInfo(){
     return this.$refs.navlist.navList;
   },
   isPageOpen(name){       
     let rlist=this.$refs.navlist.navList;   
     for(let i=0;i<rlist.length;i++){
       let ro=rlist[i];
       if(!ro) continue;
       if(ro.name!=name) continue;
       return true;
     }
     return false;
   }
 }

 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
.el-container{
  height: 100%;
}
// @import url('./style/index');
.conbox{
  position: relative;
  .loading{
    position: absolute;
    background-color: rgba(0,0,0,.7);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    .loading-spinner{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      height: 50px;
      text-align: center;
      i{
        color: @txt_active_color;
      }
      p{
        margin: 3px 0;
        font-size: @font_size;
        color: @txt_active_color;
      }
    }
  }
}
</style>