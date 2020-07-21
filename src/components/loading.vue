<template>
  <div class="lading-content" ref="loadding-box" v-show="loadflag">
    <div>
      <span class="el-icon-loading"></span>
      <span>{{msg}}...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
    let parentClass=this.$refs['loadding-box'].parentNode.className;
    if(parentClass.indexOf('loaddingparentstyle')<0){
      this.$refs['loadding-box'].parentNode.className=parentClass+" loaddingparentstyle"
    }
  },
  methods: {

  },
  components: {

  },
  props:{
    msg:{
        type:String,
        default:'拼命加载中'
    },
    loadflag:{
        type:Boolean,
        default:false
    }
  }
}
</script>

<style scoped lang="less">
  .lading-content{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 9999;
    div{
      position: relative;
      top: 50%;
      text-align: center;
      color: #1c61fc;
      transform: translateY(-50%);
      span{
        font-size:16px;
        color: #fff;
        &:first-of-type{
          font-size: 20px;
          margin-right: 8px;
        }
      }
    }
  }
</style>
