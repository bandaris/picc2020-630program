<template>
  <!-- 重要客户 -->
  <div class="container">
    <div class="top-form">
      <el-row class="row">
        <el-col :span="2" class="txt txtmi">手机号码</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('手机号码')"></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">车牌号</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('车牌号')"></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">客户姓名</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('客户姓名')"></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import lu from '@/utils/loginUser' //登录信息
import result from '@/components/datagrid.vue'
import mixin from './mixins/mixinImport';
import wares from '@u/mixinWares';
export default {
  name: 'addImport',
  mixins: [mixin, wares],
  data() {
    return {
      linklist: ['保存', '清空', '关闭'],
      form: {},
    }
  },
  methods: {

  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
}
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
.top-form {
  border: 1px solid #d4d4d4;
  margin: 0 20px;
  border-radius: 5px;
}
</style>