<template>
  <!-- 重要客户 -->
  <div class="container">
    <!-- 查询区 -->
    <div>
      <el-row class="row">
        <el-col :span="2" class="txt">手机号</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('手机号')"></el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 结果反馈表 -->
    <div class="top-form">
      <el-row class="row">
        <el-col :span="2" class="txt">客户姓名</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" disabled></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">手机号</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" disabled></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">车牌号</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" disabled></el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 重点客户信息表 -->
    <v-result
      ref="result"
      :config="dgConfig"
      :showpage="false"
      class="tablebox"
      style="height:calc(100vh - 380px)"
    ></v-result>
    <!-- 底部两个小按钮 -->
    <div class="bottom-button-wrap">
      <el-button type="primary" round class="el-button-no-border" @click="BindCustomer()">
        <span style="color:#fff">绑定重点客户</span>
      </el-button>
      <el-button round type="primary" plain @click="untieCustomers()">
        <span style="color:#1e60ff">解绑重点客户</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import lu from '@/utils/loginUser' //登录信息
import result from '@/components/datagrid.vue'
import mixin from './mixins/mixinImport';
import wares from '@u/mixinWares';
export default {
  name: 'getImport',
  mixins: [mixin, wares],

  data() {
    return {
      linklist: ['查询', '新建', '清空'],
      form: {},
      dgConfig: {
        height: '100%', //table高度
        select: true, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['phone', '禁拨号码', '', true, false],
          ['btype', '类型', '', true, false],
          ['type', '拨打类型', '', true, false],
        ],
        //table行按钮：span width
        commands: [
          ['cmdEdit', '失效', '60'],
          ['cmdDisable', '恢复', '60'],
          ['cmdDisable', '彻底删除', '60'],
        ],
        pageSize: 10,//每页行数
        pageSizes: [5, 10], //每页行数选项
        currentPage: 1, //当前页
        requestCurData: true//是否每次都要请求数据
      },
    }
  },
  components: {
    'v-result': result,
  },
  methods: {
    infoDao() {//导航栏方法
      let target = this.$parent.target;
      if (target == '查询') {
        // let length = Object.keys(this.form).length
        // if (length === 0) { this.alert('请输入查询条件', '提示'); return }
        // this.requestCurPageData();
      } else if (target == '清空') {
        // this.form = {};
        // this.tableResult = [];
        // this.$refs.result.allData = [];
        // this.$refs.result.showTableData();
        // this.queryDataS = [],//禁拨开始时间集合
        //   this.queryDataC = []//禁拨截止时间集合
      } else if (target == '新建') {
        this.openPage('addImport')
      }
    },
    BindCustomer() {
      console.log('绑定');
    },
    untieCustomers() {
      console.log('解绑');
    },
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
.bottom-button-wrap {
  margin: 0 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  button {
    width: 126px;
  }
}
</style>