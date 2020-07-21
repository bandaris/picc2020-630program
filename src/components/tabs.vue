<template>
 <div class="tab">
     <div class="tab-item" v-for="(item,index) in tablist" :key="index" 
        @click="toggletab(item,index)" 
        :class="tabIndex==index?'tab-item-active':''">
        <span>{{item.title}}</span>
        <b @click.stop="romovetab(index)" v-show="item.showcloseicon" class="el-icon-close"></b>
      </div>
      <el-divider></el-divider>
 </div>
</template>

<script>

 export default {
 name:'tabs',
 props:[''],
 data () {
    return {
          tablist:[],
          tabIndex:null,
          tabDetail:{}, //存放tab二级路由与三级路由的map
    };
 },

//  components: {},

//  computed: {},

//  beforeMount() {},

//  mounted() {},

 methods: {
   toggletab(item,index){
     if(this.tabIndex!=index){
       let path=this.tabDetail[item.path] ? this.tabDetail[item.path] : item.path
       this.$router.push(path)
       this.tabIndex=index
     }
   },
   romovetab(index){
     this.tablist.splice(index,1);

     //1.删除最后一个tab页，默认返回首页
     if(this.tablist.length==0) {
       this.$router.push('/procmgr'); 
       return;
     }
     //2.如果是最后一个tab页，显示前一页；否则均显示后一页
     if(index==this.tablist.length){
       this.$router.push(this.tablist[index-1].path)
       this.tabIndex=index-1
     }
     else{
        this.$router.push(this.tablist[index].path)
        this.tabIndex=index
     } 
   }
 },

//  watch: {}

 }

</script>
<style lang='less' scoped>
.tab{
  width: 100%;
  height: 30px !important;
  // border-bottom: 1px solid #D1D1D1;
  overflow-y: hidden;
  position: relative;
  /deep/.el-divider {
    position: absolute;
    top: 5px;
  }
}
    .tab-item{
      font-size: 14px;
      position: relative;
      // width:87px;
      height: 26px;
      border-radius: 4px;
      text-align: left;
      float: left;
      margin: 2px auto;
      border: 1px solid transparent;
      line-height: 26px;
      padding-left: 15px;
      margin-left: 10px;
      overflow: hidden;
      cursor: pointer;
      span{
        padding-right: 16px;
      }
      &:first-of-type{
        margin-left: 16px;
      }
      b{
        font-size: 10px;
        position: absolute;
        // transform: scale(.5);
        top: 1px;
        right: 1px;
        border-radius: 50%;
        opacity: 0;
        &:hover{
          background-color: #D5402C;
          color: #fff;
          opacity: 1;
        }
      }
    }
    .tab-item-active{
      border-bottom: none;
      background-color: #fff;
      height: 32px;
      position: relative;
      border-color: #d1d1d1;
      span{
        color: #fff;
        font-weight: 700;
        color: #D5402C;
      }
      &:before{
        content: '';
        width: 100%;
        height: 1px;
        background-color: #fff;
        position: absolute;
        bottom: 4px;
        z-index: 999;
        left: 0px;
      }
      // background-color: #D5402C;
      // border: none;
      // &::after{
      //   content: '';
      //   position: absolute;
      //   min-width: 100px;
      //   height: 100px;
      //   border-radius: 50%;
      //   top: -3px;
      //   left: 74px;
      //   background-color: #282B34;
      // }
    }
</style>