<template>
  <!-- 可展开列表组件 -->
  <div class="expandableList">
    <p class="title-style">
      <span></span>
      <b>{{title}}</b>
      <i @click="isShow = !isShow">{{isShow | showText}}</i>
    </p>
    <template>
      <div class="content" v-show="isShow">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "expandableList",
  props: ["title"],
  data() {
    return {
      isShow: false //开关
    };
  },
  filters:{
    showText(value){
      if(value){
        return '显示填写'
      }else{
        return '展开填写'
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../styles/index');
.expandableList{
  .title-style{
    margin: 15px 0;
  }
}
</style>