<template>
  <!-- 添加微店链接页面 -->
  <div class="container">
    <!-- 添加微店链接页面开始 -->
    <div class="addMicroStoreLink-main">
      <!-- 顶部表单 -->
      <div class="top-form">
        <el-row class="row">
          <el-col :span="2" class="txt">员工工号</el-col>
          <el-col :span="4">
            <el-input v-model="form.userid"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="0" :span="2" class="txt">长链接地址</el-col>
          <el-col :span="20">
            <el-input v-model="form.longlink"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="0" :span="2" class="txt">短链接地址</el-col>
          <el-col :span="20">
            <el-input v-model="form.shortlink" disabled></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 微信店链接查询页面开始 -->
  </div>
</template>

<script>
import mixin from './mixins/micro'
import wares from '@u/mixinWares'
import { createMicroShopPost } from "@/api/sysmgr"

export default {
  name: 'addMicro',
  mixins: [mixin, wares],
  data() {
    return {
      form: {
        userid: '',
        longlink: '',
        shortlink: ''
      },
      linklist: ['保存', '关闭'],
    };
  },
  activated() {
    this.$parent.linksw(this.linklist)
  },
  methods: {
    //处理导航栏信息的点击事件方法
    infoDao() {
      let target = this.$parent.target;
      if (target == '关闭') {
        this.closePage();
      }
      else if (target == '保存') {
        this.confirm('确定保存操作吗?', '提示').then(() => {
          let param = { microshop: [] }
          let newForm = {}
          newForm.longlink = this.form.longlink;
          newForm.userid = this.form.userid;
          param.microshop.push(newForm);
          createMicroShopPost(param).then((res) => {
            let rdata = res.data;
            if (rdata.status == "0") {
              this.alert('保存成功！')
              this.form.shortlink = rdata.data[0].shortlink;
            }
            else {
              this.alert(rdata.statusText + '!')
            }
          }).catch((err) => { console.log(err); })
        }).catch((err) => { console.log("addMicro", err) })
      }
    }
  },

};
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
</style>
