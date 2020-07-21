<template>
 <div class="nav-left-box">
     <ul class="nav-left">
          <li v-for="(item,index) in navList" 
          :key="index" 
          :class="navIndex==index?'active':''" 
          @click="fn(item,index)">{{item.title}}</li>
     </ul>
 </div>
</template>
<script>

 export default {
 name:'navlist',
 props:{
 },
 data () {
 return {
   navIndex:0,
   navList:[]
  }
},

 methods: {
   fn(item,index){
    this.$router.push(item.path);
    this.setIndex(index); 
   },
   setIndex(target){
     this.navIndex=target;
   },
   getActivePage(){
     return this.navList[this.navIndex];
   }
 },

//  watch: {
//    navList(n,o){
//      console.log('navList:',o);
//      console.log('navList:',n);
//    },
//    navIndex(n,o){
//      console.log('navIndex:',o);
//      console.log('navIndex:',n);
//    }
//  }

 }

</script>
<style lang='less' scoped>
@import url('../styles/index');
.nav-left-box{
  float: left;
  margin-top: 11px;
}
.tab-nav{
    width: 100%;
    // height: 100px;
    .nav-link{
      margin: 0px 20px 0 20px;
      border-bottom: 2px solid @border_color;
      overflow: hidden;
      height: 40px;
      li{
        float: left; 
        cursor: pointer;
        font-size: @font_size;
      }
      .nav-left{
        float: left;
        padding-left: 10px;
        li{
          margin-right: 25px;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            width: 38px;
            height: 4px;
            background-color:transparent;
            border-radius: 2px;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .active{
          background-color: #fff;
          font-weight: bold;
          &::before{
            background-color: @style_color;
          }
        }
      }
    }
  }
</style>