<template>
  <!-- 禁拨名单审核 -->
  <div class="container">
    <!-- 加载幕 -->
    <div class="importMicrostoreLinksInBatches-main">
      <!-- 顶部表单 -->
      <div class="forms">
        <el-row class="row">
          <el-col :offset="0" :span="3" class="txt">禁拨名单电话</el-col>
          <el-col :span="5">
            <el-input size="mini" clearable v-model="form.phone" type></el-input>
          </el-col>
          <el-col :offset="0" :span="2" class="txt">客户编号</el-col>
          <el-col :span="5">
            <el-input size="mini" clearable v-model="form.customercode" type></el-input>
          </el-col>
          <el-col :offset="1" :span="2" class="txt">禁拨开始时间</el-col>
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
        </el-row>
        <el-row class="row">
          <el-col :span="3" class="txt">禁拨名单类型</el-col>
          <el-col :span="5">
            <el-select size="mini" v-model="form.btype">
              <el-option label="黑名单" value="B"></el-option>
              <el-option label="代理人" value="D"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="0" :span="2" class="txt">创建坐席</el-col>
          <el-col :span="5">
            <el-input size="mini" clearable v-model="form.cruser" type></el-input>
          </el-col>
          <el-col :span="2" class="txt" :offset="1">禁拨截止时间</el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="queryDataC"
              unlink-panels
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @blur="BlurCheck('禁拨截止时间')"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="3" class="txt">有效范围</el-col>
          <el-col :span="5">
            <el-select size="mini" v-model="form.validmonth">
              <el-option label="1个月" value="1"></el-option>
              <el-option label="2个月" value="2"></el-option>
              <el-option label="3个月" value="3"></el-option>
              <el-option label="4个月" value="4"></el-option>
              <el-option label="5个月" value="5"></el-option>
              <el-option label="6个月" value="6"></el-option>
              <el-option label="7个月" value="7"></el-option>
              <el-option label="8个月" value="8"></el-option>
              <el-option label="9个月" value="9"></el-option>
              <el-option label="10个月" value="10"></el-option>
              <el-option label="11个月" value="11"></el-option>
              <el-option label="12个月" value="12"></el-option>
              <el-option label="24个月" value="24"></el-option>
              <el-option label="永久屏蔽" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="0" :span="2" class="txt">联系编号</el-col>
          <el-col :span="5">
            <el-input size="mini" clearable v-model="form.contacthistcode" type></el-input>
          </el-col>
          <el-col :span="2" class="txt" :offset="1">审核时间</el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="queryDataT"
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
        </el-row>
        <!-- 额外展开的表单 -->
        <div class="row-last" v-if="isDownOpen">
          <el-row>
            <el-col :offset="0" :span="3" class="txt">审核坐席</el-col>
            <el-col :span="4">
              <el-input size="mini" clearable v-model="form.audituser"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="open-down" :class="{isActive:isDownOpen}">
          <span @click="open">展开</span>
        </div>
      </div>
      <!-- 录音文件 -->
      <div class="recording" style="text-align:center;line-height:100px;color:#292C33">录音文件</div>
      <!-- 底部表格 -->
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="table-bottom"
      >
        <v-result
          ref="result"
          :config="dgConfig"
          class="tablebox"
          style="height:calc(100vh - 595px)"
        ></v-result>
      </div>
      <!-- 审核弹窗 -->
      <el-dialog
        title="审核理由--网页对话框"
        custom-class="picc-dialog-table"
        :show-close="false"
        :visible.sync="dialogVisible"
      >
        <div slot="title" class="dialog-title">
          <div class="dialog-vac">
            <div class="title-text">审核理由--网页对话框</div>
            <div class="title-nav">
              <img src="./../../assets/image/Close-nor.png" alt @click="dialogVisible=false" />
            </div>
          </div>
        </div>
        <div class="form-box">
          <el-input
            type="textarea"
            :rows="4"
            v-model="reason"
            style="font-size:16px;line-height:2;"
          ></el-input>
        </div>
        <div slot="footer">
          <el-button round type="primary" plain @click="deleteRowParam()">
            <span style="color:#1e60ff">驳 回</span>
          </el-button>
          <el-button type="primary" round class="el-button-no-border" @click="upRowParam()">
            <span style="color:#fff">通 过</span>
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import lu from '@/utils/loginUser' //登录信息
import { getBlackList, updateBlackList, deleteBlackList } from "@/api/csrdata"; //导入http请求方法
import mixin from './mixins/mixinAudit'//主公共混入文件
import wares from '@u/mixinWares'//公共弹窗样式混入文件
import result from '@/components/datagrid.vue'//底部表格封装组件引入
export default {
  name: 'blackAudit',
  mixins: [wares, mixin],
  data() {
    return {
      dialogVisible: false,//弹窗开关
      loading: false,//幕加载开关
      isDownOpen: false,//是否展开表单开关
      queryDataS: [],//禁拨开始时间选择器数组存放
      queryDataC: [],//禁拨截止时间选择器数组存放
      queryDataT: [],//审核时间选择器数组存放
      linklist: ["查询", "清空"],
      dgConfig: {//表格配置信息
        height: '100%', //table高度
        select: false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['phone', '电话号码', '120', true, false],
          ['btype', '类型', '', true, true],
          ['recflag', '状态', '', true, true],
          ['ptype', '号码类别', '', true, true],
          ['branchcode', '所属机构', '', true, false],
          ['startdt', '开始日期', '', true, false],
          ['validdt', '有效期', '', true, false],
          ['crdt', '创建时间', '', true, false],
          ['cruser', '创建者', '', true, false],
          ['audittype', '审核状态', '', true, true],
          ['audituser', '审核者', '', true, false],
          ['reason', '理由', '', true, false],
          ['auditreason', '审核说明', '', true, false],
        ],
        //table行按钮：span width
        commands: [
          ['cmdEdit', '审核', '60'],
          ['cmdDisable', '播放', '60'],
        ],
        pageSize: 7,//每页行数
        pageSizes: [5, 10], //每页行数选项
        currentPage: 1, //当前页
        requestCurData: true//是否每次都要请求数据
      },
      form: {},//form表单参数存放
      tableResult: [],//查询出的数据存放
      rowParam: {},//正在被审核的数据
      reason: ''//审核意见
    }
  },
  methods: {
    BlurCheck() { },
    open(e) {
      if (this.isDownOpen) {
        this.isDownOpen = false;
        e.target.innerHTML = "展开";
        e.target.style.backgroundImage = `url(${require("./../../assets/image/downBox.png")})`;
      } else {
        e.target.innerHTML = "收起";
        e.target.style.backgroundImage = `url(${require("./../../assets/image/upBox.png")})`;
        this.isDownOpen = true;
      }
    },
    infoDao() {//导航栏方法
      let target = this.$parent.target;
      if (target == '查询') {
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
      param.auditype = 'N'
      param.attr = {
        pagenum: this.dgConfig.currentPage,
        pagesize: this.dgConfig.pageSize
      }
      getBlackList(param).then((res) => {
        this.$parent.loading = false;
        if (res.data.status == '0') {
          // console.log(res.data.data.blacklist);
          this.tableResult = this.$refs.result.allData = res.data.data.blacklist;
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
    handleClick(row, column, cell, event) {//表格点击方法
      console.log(row, column, cell, event);
      let target = cell.firstElementChild.firstElementChild;
      if (target.innerHTML == '审核') {
        this.dialogVisible = true;
        this.rowParam = row
      }
      else if (target.innerHTML == '播放') {
        console.log('播放');
      }
    },
    TransValtoDesc(id, val) {//表格数据转换
      if (id == 'recflag')
        return val == 'E' ? '有效' : '无效'
      else if (id == 'audittype')
        return val == 'N' ? '未审核' : val == 'N' ? '已审核' : val == 'A' ? '无需审核' : '错误'
      else if (id == 'type') {
        return val == '1' ? '慎拨' : val == '0' ? '禁拨' : val == '' ? '禁拨' : '错误'
      } else if (id == 'ptype') {
        return val == '1' ? '电话' : val == '2' ? '身份证' : ''
      } else if (id = 'btype') {
        return val == 'B' ? '黑名单' : val == 'D' ? '代理人' : ''
      }
    },
    deleteRowParam() {
      if (this.reason == '') {
        this.alert('请输入审核内容', '提示')
        return
      }
      this.confirm('是否确定驳回？').then(() => {
        for (let i = 0; i < this.tableResult.length; i++) {
          if (this.tableResult[i].phone == this.rowParam.phone) {
            this.tableResult.splice(i, 1)
            this.$refs.result.allData = this.tableResult
            this.$refs.result.showTableData();
          }
        }
        let param = {};
        param.phone = this.rowParam.phone;
        param.reason = this.reason;
        param.attr = {
          deptcode: lu.userinfo.deptcode
        }
        deleteBlackList(param).then(res => {
          console.log(res);
          if (res.status == '200') this.$message('驳回成功!')
        }).catch(err => {
          console.log(err);
        })
        this.dialogVisible = false;
        this.reason = '';
      }).catch((err) => { console.log(err); })
    },
    upRowParam() {
      if (this.reason == '') {
        this.alert('请输入审核内容', '提示')
        return
      }
      this.confirm('是否确定完成审核？').then(() => {
        for (let i = 0; i < this.tableResult.length; i++) {
          if (this.tableResult[i].phone == this.rowParam.phone) {
            this.tableResult.splice(i, 1)
            this.$refs.result.allData = this.tableResult
            this.$refs.result.showTableData();
          }
        }

        let param = {};
        param.phone = this.rowParam.phone;
        param.auditype = 'Y'
        param.auditreason = this.reason;
        param.attr = {
          deptcode: lu.userinfo.deptcode
        }
        updateBlackList(param).then(res => {
          console.log(res);
          if (res.status == '200') this.$message('审核完毕!')
        }).catch(err => {
          console.log(err);
        })
        this.dialogVisible = false;
        this.reason = ''
      }).catch((err) => { console.log(err); })
    }
  },
  components: {
    'v-result': result,
  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
  watch: {
    queryDataS(nval, oval) {
      this.form.scrdt = nval && nval[0] ? nval[0] : '';
      this.form.ecrdt = nval && nval[1] ? nval[1] : '';
    },
    queryDataC(nval, oval) {
      this.form.svaliddt = nval && nval[0] ? nval[0] : '';
      this.form.evaliddt = nval && nval[1] ? nval[1] : '';
    },
    queryDataT(nval, oval) {
      this.form.sauditdt = nval && nval[0] ? nval[0] : '';
      this.form.eauditdt = nval && nval[1] ? nval[1] : '';
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
.container {
  // container外层包裹
  .importMicrostoreLinksInBatches-main {
    padding: 0 @aside_w;
    display: flex;
    flex-direction: column;
    height: 100%;
    .clearfix {
      flex: 1;
      height: 100%;
    }
  }
}
.forms {
  //form表单包裹
  border: 1px solid #cdcdcd;
  .open-down {
    line-height: 35px;
    text-align: center;
    span {
      color: #66697b;
      padding-right: 15px;
      background: url("./../../assets/image/downBox.png") no-repeat right center;
      cursor: pointer;
    }
  }
  .isActive {
    //点击展开样式改变
    background-color: #f7f8fd;
  }
}
.el-select-dropdown__wrap {
  //有效范围下拉框最大高度修改
  max-height: 590px;
}
.recording {
  //录音文件区域
  width: 100%;
  height: 100px;
  margin-top: 10px;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  padding: 0 40px;
}
.el-table__body-wrapper {
  height: 328px;
}
.el-dialog.picc-dialog-table .el-dialog__body {
  height: calc(100vh - 400px);
}
/deep/.el-range-input {
  //时间选择器
  text-align: center !important;
  color: #909199;
  font-size: 12px !important;
  padding-left: 10px;
}
/deep/.el-dialog {
  //弹窗
  max-width: 500px;
}
/deep/.el-textarea__inner {
  //弹窗文本域
  font: normal 16px Arial;
  line-height: 2;
}
</style>