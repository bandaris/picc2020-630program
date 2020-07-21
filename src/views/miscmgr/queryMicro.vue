<template>
  <!-- 微店链接查询 -->
  <div class="container">
    <!-- 微信店链接查询页面开始 -->
    <div class="searchWeChatStoresLinks-main">
      <!-- 顶部表单 -->
      <div class="top-form">
        <el-row class="row">
          <el-col :span="2" class="txt">员工工号</el-col>
          <el-col :span="5">
            <el-input v-model="form.userid" @blur="BlurCheck('员工工号')"></el-input>
          </el-col>
          <el-col :offset="1" :span="2" class="txt">长链接地址</el-col>
          <el-col :span="5">
            <el-input v-model="form.longlink" @blur="BlurCheck('长链接')"></el-input>
          </el-col>
          <el-col :offset="1" :span="2" class="txt">短链接地址</el-col>
          <el-col :span="5">
            <el-input v-model="form.shortlink" @blur="BlurCheck('短链接')"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="2" class="txt">创建日期</el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="queryData"
              unlink-panels
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @blur="BlurCheck('创建日期')"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row></el-row>
      </div>
      <!-- 底部表格 -->
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        class="table-bottom"
      >
        <v-result ref="result" :config="dgConfig" class="tablebox"></v-result>
      </div>
    </div>
  </div>
</template>

<script>
import result from '@/components/datagrid.vue'
import { queryMicroShopPost, deleteMicroShopPost } from "@/api/sysmgr"; //导入http请求方法
import mixin from './mixins/micro'
import wares from '@u/mixinWares'
export default {
  mixins: [mixin, wares],
  name: 'queryMicro',
  data() {
    return {
      linklist: ['查询', '清空', '添加', '失效', '批量导入'],
      total: 0, //表格最大数据条目数量
      currentPage: 1, //当前页码
      pagesize: 5, //每页的数据量
      loading: false, //加载状态
      dialogVisible2: false, //角色选择弹窗开关
      queryData: [],
      form: {},
      //表格模拟数据
      tableData: [],
      dgConfig: {
        height: '100%', //table高度
        select: true, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['userid', '工号', '', true, false],
          ['username', '姓名', '', true, false],
          ['longlink', '长连接地址', '', true, false],
          ['shortlink', '短连接地址', '300', true, false],
          ['insert_time_for_his', '创建时间', '', true, false]
        ],
        //table行按钮：span width
        commands: [
          ['cmdEdit', '编辑', '60'],
          ['cmdDisable', '失效', '60'],
        ],
        pageSize: 5,//每页行数
        pageSizes: [5, 10], //每页行数选项
        currentPage: 1, //当前页
      },
    };
  },
  activated() {
    this.$parent.linksw(this.linklist)
  },
  components: {
    'v-result': result
  },
  methods: {
    //失焦检测
    BlurCheck(item) {
      if (item == '长链接' && this.form.longlink) {
        let str = this.form.longlink.trim();
        this.form.longlink = str
        console.log(this.form.a)
      } else if (item == '短链接' && this.form.shortlink) {
        let str = this.form.shortlink.trim();
        this.form.shortlink = str
      } else if (item == '员工工号' && this.form.userid) {
        let str = this.form.userid.trim();
        this.form.userid = str
      } else if (item == '创建日期' && this.form.data) {
        this.form.startdt = this.form.data[0];
        this.form.enddt = this.form.data[1];
        console.log(this.form.data)
        console.log(this.form.startdt, this.form.enddt)
      }
    },
    handleClick(row, column, cell, event) {
      let target = cell.firstElementChild.firstElementChild;
      if (target.innerHTML == '编辑') {
        this.openPage('updateMicro', row)
      } else if (target.innerHTML == '失效') {
        this.confirm('确定' + row.username + '失效吗?', '提示').then(() => {
          let param = { microshop: [] }
          param.microshop.push(row);
          deleteMicroShopPost(param).then((res) => {
            let rdata = res.data;
            if (rdata.status == "0") {
              this.$message('操作成功!')
              this.$refs.result.removeRow(row)
            }
            else
              this.$message.error('操作失败')

          }).catch((err) => {
            console.log(err);
          })
        })
      }
      console.log(target);
    },
    infoDao() {
      let target = this.$parent.target;
      if (target == '查询') {
        let issearch = false;
        for (var key in this.form) {
          this.form[key] != '' && (issearch = true)
        }
        if (issearch) {
          this.loading = true;
          console.log(this.form, "#")
          let param = { microshop: [] }
          param.microshop.push(this.form);
          queryMicroShopPost(param).then(res => {
            this.$refs.result.allData = res.data.data
            this.$refs.result.showTableData();
            this.loading = false;
          }
          ).catch(err => {
            console.log(err);
            this.loading = false;
          })
        } else {
          this.alert('请输入查询条件', '提示');
        }
      } else if (target == '清空') {
        this.form = {};
        this.$refs.result.allData = [];
        this.$refs.result.showTableData();
      } else if (target == '添加') {
        this.openPage('addMicro')
      } else if (target == '失效') {
        let mst = this.$refs.result.selection;
        if (mst.length != 0) {
          this.confirm('确定批量失效吗?', '提示').then(() => {
            let param = { microshop: [] }
            param.microshop = mst;
            deleteMicroShopPost(param).then((res) => {
              let rdata = res.data;
              if (rdata.status == "0") {
                this.$message('操作成功!')
                this.$refs.result.removeRowArray(mst);
              }
              else
                this.$message.error('操作失败')

            }).catch((err) => {
              console.log(err);
            })
          })
        } else {
          this.alert("请选择需要失效的微店链接！", "提示");
        }
      } else if (target == '批量导入') {
        this.openPage('microAgentImport');
      } else if (target == '保存') {
        this.warning("是否保存对用户信息的修改", "提示").then(() => {
        })
      }
    }


  },
  watch: {
    queryData(nval, oval) {
      this.form.startdt = nval && nval[0] ? nval[0] : '';
      this.form.enddt = nval && nval[1] ? nval[1] : '';
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
//input日期输入框样式用于兼容ie浏览器
/deep/.el-col .el-input .el-input__inner {
  height: 34px;
  line-height: 20px;
}
//input日期输入框占位符居中
/deep/
  .el-date-editor.el-range-editor.el-range-editor
  .el-range-input[placeholder="开始日期"],
/deep/.el-date-editor.el-range-editor.el-range-editor
  .el-range-input[placeholder="结束日期"] {
  text-align: center;
  color: #909199;
  font-size: 12px !important;
  padding-left: 10px;
}
//单独写于此vue文件中

.tablebox {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
/deep/.table-info{
  height: calc(100vh - 341px);
}
</style>