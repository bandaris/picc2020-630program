<template>
 <div class="conbox">
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
      <router-view></router-view>
     </keep-alive>
 </div>
</template>

<script>
import navlist from '@/components/navlist.vue'
import lu from '@/utils/loginUser'
import sumRouter from '@/router/modules/purviewmgr/sumRole'
import msum from '@u/mixinSum'

 export default {
 name:'sumRole',
 props:[''],
 mixins: [msum],
 data () {
    return {
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
      
      //  let idx=0;
      //  for(var i=this.$children.length-1;i>=0;i--){
      //    if(this.$children[i].$options.name!=str) continue;
      //    idx=i;
      //  }
      //  this.$children.splice(idx,1);
    },
    getRedirect(){
        let rl=sumRouter.children;
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
      for(var i=0;i<list.length;i++){
        if(list[i].name==res.name){
          this.setIndex(i);//直接设置此页面为active
          return false;
        }
      }
      let index=this.$refs.navlist.navList.push(res);
      this.setIndex(index-1);
    },
    clearc(){//清空右侧链接项
      this.linkList=[];
    },
    linksw(res){//向右侧链接项赋值
      this.linkList=res;
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
  },
  
 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
</style>