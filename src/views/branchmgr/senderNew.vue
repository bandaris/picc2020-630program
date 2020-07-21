<template>
  <div class="container">
    <!-- 新建送单员页面开始 -->
    <div class="createSender-main">
      <div class="top-form">
        <el-row class="row">
          <el-col :span="2" class="txt">姓名</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model="form.name" type="text"></el-input>
          </el-col>
          <el-col :span="2" class="txt">工号</el-col>
          <el-col :span="4">
            <el-input v-model="form.workernumber"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="txt">联系电话</el-col>
          <el-col :span="4">
            <el-input type="text" v-model="form.phone"></el-input>
          </el-col>
          <el-col :span="2" class="txt" >所属机构</el-col>
          <el-col :span="4">
            <el-input  type="text" v-model="form.branch"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 新建送单员页面结束 -->
  </div>
</template>

<script>
import mixin from './mixins/branch'
export default {
  name:'senderNew',
  mixins: [mixin],
  data() {
  return {
     linklist:['保存','关闭'],
    form: {
      name:'',
      workernumber:'',
      branch:''
    }
  };
  },
  activated () {
    this.$parent.linksw(this.linklist)
    this.form.branch=this.$route.query.title?this.$route.query.title:this.form.branch;
    console.log(this.form);
  },
  methods: {
    infoDao(){
        let target=this.$parent.target;
        if(target=='关闭'){
           this.closePage();
        }
    }
  },
  
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
</style>
