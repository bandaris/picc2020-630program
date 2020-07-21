<template>
  <!-- 禁拨轨迹查询 -->
  <div class="container">
    <!-- 顶部表单 -->
    <div class="top-form">
      <el-row class="row">
        <el-col :span="2" class="txt">禁拨名单电话</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('禁拨名单号码')"></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">操作时间</el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="queryDataS"
            unlink-panels
            clearable
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @blur="BlurCheck('禁拨开始时间')"
          ></el-date-picker>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">操作方式</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.recflag">
            <el-option label="批量导入" value="B"></el-option>
            <el-option label="失效" value="S"></el-option>
            <el-option label="恢复" value="H"></el-option>
            <el-option label="追加" value="Z"></el-option>
            <el-option label="彻底删除" value="D"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="2" class="txt">操作人员工号</el-col>
        <el-col :span="5">
          <el-input v-model="form.mduser" @blur="BlurCheck('操作人员工号')"></el-input>
        </el-col>
        <el-col :span="2" class="txt" :offset="1">操作类型</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.type">
            <el-option label="慎拨" value="1"></el-option>
            <el-option label="禁拨" value="0"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <!-- 底部表格 -->
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="table-bottom"
    >
      <v-result ref="result" :config="dgConfig" class="tablebox" style="height:calc(100vh - 380px)"></v-result>
    </div>
  </div>
</template>

<script>
import { getBlackListHist } from "@/api/csrdata"; //导入http请求方法
import UploadExcelComponent from "@/components/UploadExcel/index";//excel处理
import result from '@/components/datagrid.vue'
import mixin from './mixins/blackTrack';
import wares from '@u/mixinWares';
export default {
  name: 'blackTrack',
  mixins: [mixin, wares],
  data() {
    return {
      loading: false,
      queryDataS: [],//操作时间集合
      linklist: ['查询', '清空'],
      form: {},
      dgConfig: {
        height: '100%', //table高度
        select: false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['mduser', '操作人员工号', '', true, false],
          ['phone', '电话号码', '', true, false],
          ['type', '操作类型', '', true, true],
          ['optdt', '操作时间', '', true, false],
          ['mddeptcode', '所属机构', '', true, false],
          ['remark', '备注', '', true, false],
          ['reason', '理由', '', true, false],
          ['recflag', '操作方式', '', true, true],
        ],
        pageSize: 10,//每页行数
        pageSizes: [5, 10], //每页行数选项
        currentPage: 1, //当前页
        requestCurData: true//是否每次都要请求数据
      },
      tableResult: [],
      downloadLoading: false,//记录下载状态的变量
    }
  },
  components: {
    'v-result': result,
  },
  methods: {
    BlurCheck() {

    },
    infoDao() {//导航栏方法
      let target = this.$parent.target;
      if (target == '查询') {
        console.log(this.form);//查询参数
        let length = Object.keys(this.form).length
        if (length === 0) { this.alert('请输入查询条件', '提示'); return }
        this.requestCurPageData()
      } else if (target == '清空') {
        this.form = {};
        this.tableResult = [];
        this.$refs.result.allData = [];
        this.$refs.result.showTableData();
        this.queryDataS = [],//禁拨开始时间集合
          this.queryDataC = []//禁拨截止时间集合
      }
    },
    requestCurPageData() {
      this.$parent.loading = true;
      let param = JSON.parse(JSON.stringify(this.form));
      param.attr = {
        pagenum: this.dgConfig.currentPage,
        pagesize: this.dgConfig.pageSize
      }
      getBlackListHist(param).then((res) => {
        this.$parent.loading = false;
        if (res.data.status == '0') {
          // console.log(res.data.data.blacklist);
          this.tableResult = this.$refs.result.allData = res.data.data.blacklisthist;
          if (res.data.data.pagenum == 1)
            this.$refs.result.showTableData(res.data.data.total);
          else
            this.$refs.result.showTableData();
        }
        else {
          this.alert('查询结果:' + res.data.statusText)
          this.$refs.result.allData = [];
          this.$refs.result.showTableData();
        }
      }).catch((error) => {
        this.$parent.loading = false;
        this.alert('查询异常')
        this.$refs.result.allData = [];
        this.$refs.result.showTableData();
        console.log(error);
      });
    },
    TransValtoDesc(id, val) {//表格数据转换
      if (id == 'recflag')
        return val == 'B' ? '批量导入' : val == 'S' ? '失效' : val == 'H' ? '恢复' : val == 'Z' ? '追加' : val == 'D' ? '彻底删除' : '错误'
      else if (id == 'audittype')
        return val == 'N' ? '未审核' : val == 'Y' ? '已审核' : val == 'A' ? '无需审核' : '错误'
      else if (id == 'type') {
        return val == '1' ? '慎拨' : val == '0' ? '禁拨' : val == '' ? '禁拨' : '错误'
      } else if (id == 'ptype') {
        return val == '1' ? '电话' : val == '2' ? '身份证' : ''
      } else if (id = 'btype') {
        return val == 'B' ? '黑名单' : val == 'D' ? '代理人' : ''
      }
    },
  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
  watch: {
    queryDataS(nval, oval) {
      this.form.scrdt = nval && nval[0] ? nval[0] : '';
      this.form.ecrdt = nval && nval[1] ? nval[1] : '';
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
.form-box {
  overflow: auto;
}
.top-form {
  border: 1px solid #d4d4d4;
  margin: 0 20px;
  border-radius: 5px;
}
.col-button {
  width: 120%;
  height: 34px;
  background-color: #77a0fa;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 5px;
  margin-left: -10px;
}
//单独写于此vue文件中
.dialog-tree {
  height: 100% !important;
}
// .el-dialog.picc-dialog-table .el-dialog__body {
//   height: calc(100vh - 400px);
// }
</style>