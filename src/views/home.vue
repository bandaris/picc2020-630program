<template>
  <div  class="app-wrapper hideSidebar">
    <el-container direction="horizontal">
      <el-aside width="auto" class="picc-menu-side">
        <!-- 侧边导航栏 -->
        <el-piccmenu></el-piccmenu>
      </el-aside>
      <el-container :class="isMenuFirstOpen?'menuOpen':'menuClose'">
        <el-header class="picc-header">
          <!-- 顶部导航栏 -->
          <el-head></el-head>
        </el-header>
        <el-container style="height:auto">
          <el-main class="picc-main"
            v-loading="loading"
            element-loading-text="读取用户信息中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <!-- tab展示区 -->
            <el-tab ref="tab"></el-tab>
            <!-- 内容区 -->
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          
        </el-container>
      </el-container>
    </el-container>
    <navTree ref="navTree"/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import tab from '@c/tabs'
import navTree from '@/utils/navTree/index.vue'
import lu from '@u/loginUser'
import wares from '@u/mixinWares'
import {userLoginPost} from "@/api/sysmgr";
import tabTitle from '@/router/tabTitle'

export default {
  name: 'home',
  mixins: [wares],
  components: {
    navTree,
    'el-tab':tab
  },
  data() {
    return {
      loading:true,
      isMenuFirstOpen: true,
      openType: false,
      newInfo:true,
      sideBarSpread: false,
      routers:tabTitle
    }
  },
  created() {
    if(process.env.VUE_APP_FLAG=='dev' || process.env.VUE_APP_FLAG=='stage'  || process.env.VUE_APP_FLAG=='freeze'){
      document.onkeydown=function(e){
        // e.preventDefault();
        e=window.event||e;
        if(e.keyCode==18){
          document.onkeydown=function(e){
            e=e||window.event
            // e.preventDefault()
            if(e.keyCode==82){
              this.$refs.navTree.showV()
            }
          }.bind(this);
        }
      }.bind(this);
    }
  },
  methods: {
    saveHadTools(tools) {
      console.log(tools);
    },
    handleClickOutside() {
      console.log('handleClickOutside');
    },
    getLoginUserInfo(){
      let param={
            nusercode:'',
            passwd:'******'
      }
    
      if(process.env.VUE_APP_FLAG=='dev'){
        Cookies.set('usercode','DXJJ');//本机开发环境模拟写入cookie
        Cookies.set('jwt','formytest');//本机开发环境模拟写入cookie
      }
      
      let uid=Cookies.get('usercode')
      if(!uid){
        this.alert('获取登录用户信息失败!')
        return;
      }
      param.nusercode=uid;
      
      userLoginPost(param).then((res)=>{
        if(res.data.status!=0){
          this.alert('获取坐席信息失败!');
          if(process.env.VUE_APP_FLAG=='dev' || process.env.VUE_APP_FLAG=='stage' || process.env.VUE_APP_FLAG=='freeze')
            this.loading=false;
          return;
        }
        lu.infoset=res.data.data;
        this.loading=false;
      }).catch((err)=>{
        console.log(err);
        if(process.env.VUE_APP_FLAG=='dev' || process.env.VUE_APP_FLAG=='stage' || process.env.VUE_APP_FLAG=='freeze')
            this.loading=false;
      })
    },
    setitemtab(){
      let tlist=this.$refs.tab.tablist;
      // let ti=this.$refs.tab.tabIndex
      // if(tlist[ti]){
      //   //console.log('tablist',tlist[ti])
      //   let k=tlist[ti].path
      //   let v=route.path
      //   this.$refs.tab.tabDetail[k]=v
      //   console.log('tabDetail',this.$refs.tab.tabDetail)
      // }
      //回退键处理
      // for(let i=0;i<tlist.length;i++){
      //   let k=tlist[i].path;
      //   let v=route.path;
      //   if(v.indexOf(k)<0)
      //     continue;
      //   this.$refs.tab.tabIndex=i;
      //   this.$refs.tab.tabDetail[k]=v;
      //   break;
      // }
      let route=this.$route
      console.log(route)
      console.log('tabDetail',this.$refs.tab.tabDetail)
      let arr=route.path.match(/\/\w+/g);
      console.log(arr);
      if(arr.length<=1){
        this.resetTab()
         return;
      }
      let [,name]=route.path.match(/\/\w+/g)[1].split('/');
      console.log('name',name)
      if(!name){
        console.log('no name error.')
        this.resetTab();
        return;
      }
      if(this.isexist(name).is){
        let obj=this.isexist(name);
        this.$refs.tab.tabIndex=obj.index;
      }else{
        let item={};
        let target=this.routers.find(n=>n.id.toLowerCase()==name.toLowerCase());
        console.log('target',target);
        if(!target){
          console.log('no target defined.')
          this.resetTab();
          return;
        }
        Object.assign(item,{
          ...target,
          path:route.redirectedFrom||arr[0]+'/'+name
        })
        let index=this.$refs.tab.tablist.push(item);
        console.log('item',item);
        this.$refs.tab.tabIndex=index-1;
      }
    },
    resetTab(){
      this.$refs.tab.tablist=[];
      this.$refs.tab.tabDetail={};
      this.$refs.tab.tabIndex=null;
    },
    //判断是否存在当前name
    isexist(name){
      let target=this.$refs.tab.tablist;
      return{
        is:target.some(n=>n.id.toLowerCase()==name.toLowerCase()),
        index:target.findIndex(n=>n.id.toLowerCase()==name.toLowerCase())
      } 
    }
  },
  mounted () {
    //读取cookie并存储至vuex
    // let cinfo=JSON.parse(JSON.stringify(Cookies.get()));
    // lu.CookieInfo=cinfo;
    // console.log('lu.CookieInfo',lu.CookieInfo)
    console.log('my environment:',process.env.VUE_APP_FLAG)
    this.getLoginUserInfo();
    this.setitemtab();
  },
  watch: {
    '$route'(toRouter,fromRouter){
        console.log('toRouter',toRouter)
        console.log('fromRouter',fromRouter)
        console.log('routers watch',this.routers);
        this.setitemtab()
        console.log(toRouter);

    }
  }
}
</script>

<style lang="less" scoped>
@import url('../styles/index');
.picc-main>.conbox{
  height: calc(~"100vh - 92px");
  overflow: hidden;
  background-color: #fff;
  &::before{
    content: "";
    display: table;
  }
}
.picc-main{
  color: @font_color;
  margin-left: 80px;
  // margin-top: 0 !important;
  // margin-right: 56px;
  border: 1px solid #D7D7D7;
  height: 100%;
}
  .hideSidebar,.hideSidebar>.el-container{
    height: 100%;
  }
  .el-container{
    flex-direction: column;
  }
  .el-aside{
    margin-bottom: 0;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
  }
  #toolbar_container{
    background: #FAFAFA;
    box-shadow: inset 1px 0 0 0 #E2E2E2;
  }
  .mobile .fixed-header {
    width: 100%;
  }
  .el-main {
    padding: 0px;
    margin-top: 0;
  }
  .el-header {
    padding: 0px;
  }
</style>