<template>
  <!-- 禁拨名单列表 -->
  <div class="container">
    <!-- 顶部表单 -->
    <div class="top-form">
      <el-row class="row">
        <el-col :span="2" class="txt">禁拨名单号码</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('禁拨名单号码')"></el-input>
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
        <el-col :offset="1" :span="2" class="txt">有效状态</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.recflag">
            <el-option label="有效" value="E"></el-option>
            <el-option label="无效" value="X"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="2" class="txt">禁拨名单类型</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.btype">
            <el-option label="黑名单" value="B"></el-option>
            <el-option label="代理人" value="D"></el-option>
          </el-select>
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
            @blur="BlurCheck('禁拨开始时间')"
          ></el-date-picker>
        </el-col>
        <el-col :span="2" class="txt" :offset="1">审核状态</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.audittype">
            <el-option label="未审核" value="N"></el-option>
            <el-option label="已审核" value="Y"></el-option>
            <el-option label="无需审核" value="A"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="2" class="txt">机构</el-col>
        <el-col :span="3">
          <el-input v-model="form.branchcode" @blur="BlurCheck('机构')" style="width:120%"></el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <button
            class="col-button"
            @click="handaleChooseButtonClick"
            style="font-size:12px"
          >{{this.form.branchcode?'重新选择':'选择'}}</button>
        </el-col>
        <el-col :span="2" :offset="1" class="txt">号码类别</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.ptype">
            <el-option label="电话" value="1"></el-option>
            <el-option label="身份证" value="2"></el-option>
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
      <v-result
        ref="result"
        :config="dgConfig"
        :showpage="true"
        class="tablebox"
        style="height:calc(100vh - 380px)"
      ></v-result>
    </div>
    <!-- 弹窗 -->
    <!-- 机构选择弹框 -->
    <v-dlg
      :dlgid="dlgRegionId"
      :checkStrictly="true"
      :dlgvisible.sync="dlgRegionVisible"
      treeType="S"
    ></v-dlg>
  </div>
</template>

<script>
import lu from '@/utils/loginUser' //登录信息
import { getBlackList, updateBlackList, deleteBlackList } from "@/api/csrdata"; //导入http请求方法
import UploadExcelComponent from "@/components/UploadExcel/index";//excel处理
import result from '@/components/datagrid.vue'
import dlgBranchTree from "@/components/dlgBranchTree.vue"; //树形控件
import mixin from './mixins/black';
import wares from '@u/mixinWares';
export default {
  name: 'blackList',
  mixins: [mixin, wares],
  data() {
    return {
      loading: false,
      queryDataS: [],//禁拨开始时间集合
      queryDataC: [],//禁拨截止时间集合
      linklist: ['查询', '导出', '清空', '追加'],
      form: {},
      dgConfig: {
        height: '100%', //table高度
        select: false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['phone', '禁拨号码', '120', true, false],
          ['btype', '类型', '', true, true],
          ['type', '拨打类型', '', true, true],
          ['recflag', '状态', '', true, true],
          ['ptype', '号码类别', '', true, true],
          ['branchcode', '所属机构', '', true, false],
          ['startdt', '开始日期', '', true, false],
          ['validdt', '截止日期', '', true, false],
          ['crdt', '创建时间', '', true, false],
          ['cruser', '创建者', '', true, false],
          ['audittype', '审核状态', '', true, true],
          ['auditdt', '审核时间', '', true, false],
          ['audituser', '审核者', '', true, false],
          ['reason', '理由', '', true, false],
          ['auditreason', '审核说明', '', true, false],
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
      //导出结果的Excel表头转换对比表
      headerMapResult: {
        '禁拨号码': 'phone',
        '类型': 'btype',
        '拨打类型': 'type',
        '状态': 'recflag',
        '号码类别': 'ptype',
        '所属机构': 'branchcode',
        '开始日期': 'startdt',
        '截止日期': 'validdt',
        '创建时间': 'crdt',
        '创建者': 'cruser',
        '审核状态': 'audittype',
        '审核时间': 'auditdt',
        '审核者': 'audituser',
        '理由': 'reason',
        '审核说明': 'auditreason'
      },
      config: {//配置树的配置项
        isRadio: true,
        showCheckbox: true,
        isShowIcon: true,
        checkStrictly: true, //建议 单选:true 多选: false
        isLazy: true,
        rootNode: [{ comcode: '10000000', comcname: '总公司' }]
      },
      tableResult: [],
      downloadLoading: false,//记录下载状态的变量

      //数据权限弹窗
      dlgRegionId: 'regionid',
      dlgRegionVisible: false,
    }
  },
  components: {
    'v-result': result,
    'v-dlg': dlgBranchTree,
  },
  methods: {
    BlurCheck() {

    },
    //excel导出所需的子方法
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getJsonKeys(jsonData) {
      let keys = [];
      for (let key in jsonData) {
        keys.push(key);
      }
      return keys;
    },
    getJsonVals(jsonData) {
      let vals = [];
      for (let key in jsonData) {
        vals.push(jsonData[key]);
      }
      return vals;
    },
    handaleChooseButtonClick() {//机构选择按钮
      this.dlgRegionVisible = true;
    },
    addBranchData(treeNodeInfo, name) {
      this.form.branchcode = treeNodeInfo.comcode
      this.dlgRegionVisible = false;
    },
    infoDao() {//导航栏方法
      let target = this.$parent.target;
      if (target == '查询') {
        let length = Object.keys(this.form).length
        if (length === 0) { this.alert('请输入查询条件', '提示'); return }
        this.requestCurPageData();
      } else if (target == '清空') {
        this.form = {};
        this.tableResult = [];
        this.$refs.result.allData = [];
        this.$refs.result.showTableData();
        this.queryDataS = [],//禁拨开始时间集合
          this.queryDataC = []//禁拨截止时间集合
      } else if (target == '导出') {
        console.log(this.tableResult)
        if (this.tableResult.length != 0) {
          this.downloadLoading = true;
          import("@/vendor/Export2Excel").then(excel => {
            const tHeader = this.getJsonKeys(this.headerMapResult);
            const filterVal = this.getJsonVals(this.headerMapResult);
            const list = this.tableResult;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: "导出结果",
              autoWidth: this.autoWidth,
              bookType: this.bookType
            });
            this.downloadLoading = false;
          }).catch((err) => { console.log("infoDao", err) });
        } else {
          this.alert("请先查询结果！")
        }
      } else if (target == '追加') {
        this.openPage('addBlack')
      }
    },
    handleClick(row, column, cell, event) {//表格点击方法
      console.log(row, column, cell, event);
      let target = cell.firstElementChild.firstElementChild;
      if (target.innerHTML == '恢复') {
        if (row.recflag == 'E') {
          this.alert('当前数据已经处于生效状态', '提示')
          return
        }
        this.confirm('确定' + row.phone + '恢复吗?', '提示').then(() => {
          let param = {}
          param.phone = row.phone;
          param.recflag = 'E';
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          for (let i = 0; i < this.tableResult.length; i++) {
            if (this.tableResult[i].phone == row.phone) {
              this.$set(this.tableResult, i, param)
            }
          }
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          updateBlackList(param).then(res => {
            console.log(res);
            if (res.status == '200') this.$message('操作成功!')
          }).catch(err => {
            console.log(err);
          })
        })
      } else if (target.innerHTML == '失效') {
        if (row.recflag == 'X') {
          this.alert('当前数据已经处于失效状态', '提示')
          return
        }
        this.confirm('确定' + row.phone + '失效吗?', '提示').then(() => {
          let param = {}
          param.phone = row.phone;
          param.recflag = 'X'
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          for (let i = 0; i < this.tableResult.length; i++) {
            if (this.tableResult[i].phone == row.phone) {
              this.$set(this.tableResult, i, param)
            }
          }
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          updateBlackList(param).then(res => {
            if (res.status == '200') this.$message('操作成功!')
          }).catch(err => {
            console.log(err);
          })
        })
      } else if (target.innerHTML == '彻底删除') {
        this.confirm('确定彻底删除' + row.phone + '吗?', '提示').then(() => {
          for (let i = 0; i < this.tableResult.length; i++) {
            if (this.tableResult[i].phone == row.phone) {
              this.tableResult.splice(i, 1)
              this.$refs.result.allData = this.tableResult
              this.$refs.result.showTableData();
            }
          }
          let param = {};
          param.phone = row.phone
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          deleteBlackList(param).then(res => {
            if (res.status == '200') this.$message('操作成功!')
          }).catch(err => {
            console.log(err);
          })
        })
      }
      console.log(target);
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
    requestCurPageData() {
      this.$parent.loading = true;
      let param = JSON.parse(JSON.stringify(this.form));
      param.attr = {
        pagenum: this.dgConfig.currentPage,
        pagesize: this.dgConfig.pageSize
      }
      getBlackList(param).then((res) => {
        //console.log('userSearch',res.data);
        this.$parent.loading = false;
        if (res.data.status == '0') {
          console.log(res.data.data.blacklist);
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
    }
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
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