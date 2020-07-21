<template>
  <!-- 批量导入禁拨页面 -->
  <div class="container">
    <!-- 批量导入禁拨页面开始 -->
    <div
      class="importMicrostoreLinksInBatches-main"
      v-loading="loading"
      element-loading-text="导入中请稍后"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <!-- 外导文件 -->
      <el-row>
        <el-col :span="2" style="text-align: center;">外导文件</el-col>
        <el-col :span="4">
          <el-input v-model="filename" disabled></el-input>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <upload-excel-component
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :returnAll="false"
          />
        </el-col>
      </el-row>
      <!-- 导入预览1 -->
      <div class="clearfix">
        <div class="left p" style="width:100%;height:100%">
          <p class="title-style">
            <span></span>
            <b>导入预览</b>
          </p>
          <div class="box-border">
            <el-table
              :data="tableData"
              height="260"
              style="width: 100%"
              class="picc-table picc-table-normal picc-table-1st-col-icon"
            >
              <el-table-column prop="电话号码" label="电话号码"></el-table-column>
              <el-table-column prop="禁拨起始日期" label="禁拨起始日期"></el-table-column>
              <el-table-column prop="禁拨截止日期" label="禁拨截止日期"></el-table-column>
              <el-table-column prop="类型" label="类型"></el-table-column>
              <el-table-column prop="备注" label="备注"></el-table-column>
              <el-table-column prop="机构" label="机构"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 导入预览2 -->
      <div class="clearfix">
        <div class="left p" style="width:100%;height:100%">
          <p class="title-style">
            <span></span>
            <b>导入日志</b>
          </p>
          <div class="box-border">
            <el-table
              :data="tableResult"
              height="260"
              style="width: 100%;height:100%"
              class="picc-table picc-table-normal picc-table-1st-col-icon"
            >
              <el-table-column prop="phone" label="电话号码"></el-table-column>
              <el-table-column prop="startdt" label="禁拨起始时间"></el-table-column>
              <el-table-column prop="validdt" label="禁拨截止时间"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="branchcode" label="机构"></el-table-column>
              <el-table-column prop="result" label="导入结果"></el-table-column>
              <el-table-column prop="logs" label="导入信息"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lu from '@/utils/loginUser'
import { batchImportBlackList } from "@/api/csrdata"; //导入http请求方法
import UploadExcelComponent from "@/components/UploadExcel/index";
import mixin from './mixins/blackImport'
import wares from '@u/mixinWares'
export default {
  name: 'blackAgentImport',
  mixins: [mixin, wares],
  data() {
    return {
      linklist: ['导入', '导出结果', '清空', '模板下载'],
      filename: null, //被上传的文件名称
      handleTime: null, //文件的上传时间
      tableHeader: [], //模板的表头数据
      items: [
        {
          'phone': "1",
          'startdt': '2',
          'validdt': "3",
          'branchcode': '4',
          'type': "5",
          'remark': '6',
        },
        {
          'phone': "1",
          'startdt': '注意：起始日期和截止日期格式为yyyy-mm-dd',
          'validdt': "3",
          'branchcode': '4',
          'type': "5",
          'remark': '注意：类型为禁拨或慎拨，当为慎拨时，备注不可为空',
        },
      ], //模板的数据范例
      //模板下载的excel表头转换对比表
      headerMap: {
        '电话号码': 'phone',
        '禁拨起始日期': 'startdt',
        '禁拨截止日期': 'validdt',
        '机构': 'branchcode',
        '类型': 'type',
        '备注': 'remark',
      },
      //导出结果的Excel表头转换对比表
      headerMapResult: {
        '电话号码': 'phone',
        '禁拨起始日期': 'startdt',
        '禁拨截止日期': 'validdt',
        '机构': 'branchcode',
        '类型': 'type',
        '备注': 'remark',
        '导入结果': 'result',
        '导入信息': 'logs'
      },
      loading: false, //加载状态
      downloadLoading: false, //记录当前的下载状态的变量
      //表格数据
      tableData: [], //单次上传excel数据的展示列表的展示
      tableResult: [] //导入的日志信息
    };
  },
  activated() {
    this.$parent.linksw(this.linklist)
  },
  components: {
    UploadExcelComponent
  },
  methods: {
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
    transJsonkeys(jsonData, jsonMap) {
      let ret = {};
      for (let key in jsonData) {
        let val = jsonData[key];
        let nk = jsonMap[key];
        ret[nk] = val;
      }
      return ret;
    },
    infoDao() {
      let target = this.$parent.target;
      if (target == '模板下载') {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = this.getJsonKeys(this.headerMap);
          const filterVal = this.getJsonVals(this.headerMap);
          const list = this.items;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "批量导入禁拨名单-模板",
            autoWidth: this.autoWidth,
            bookType: this.bookType
          });
          this.downloadLoading = false;
        }).catch((err) => { console.log("microAgentImport download", err) });
      } else if (target == '导入') {
        if (!this.filename || !this.tableData) {
          this.alert("请先进行上传!", "提示", "warning");
          return;
        }
        this.confirm('确定导入禁拨名单数据吗？').then(res => {
          let param = { blacklist: [] };
          for (let i = 0; i < this.tableData.length; i++) {
            let r = this.transJsonkeys(this.tableData[i], this.headerMap)
            param.blacklist.push(r);
          }
          for (let i = 0; i < param.blacklist.length; i++) {
            if (param.blacklist[i].type == '慎拨') {
              if (!param.blacklist[i].remark) {
                this.alert('当禁拨类型为慎拨时，备注不可为空！', '提示')
                return
              }
              param.blacklist[i].type = '1'
            } else if (param.blacklist[i].type == '禁拨') {
              param.blacklist[i].type = '0'
            }
          }
          param.attr = {
            deptcode: lu.userinfo.deptcode
          }
          batchImportBlackList(param).then(res => {
            console.log(res);
            if (res.data.status == 0) {
              this.success('导入成功')
              this.tableResult = res.data.data.implogs
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(rst => {
          console.log(rst);
        })

      } else if (target == '导出结果') {
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
          this.alert("请先导入！")
        }
      } else if (target == "清空") {
        this.tableData = [];
        this.tableResult = [];
        this.filename = null
      }
    },
    handleSuccess({ results, header, filename }) {
      console.log(results, header, filename);
      for (let i = 0; i < results.length; i++) {
        let startdt = results[i]["禁拨起始日期"];
        let enddt = results[i]["禁拨截止日期"];
        !startdt.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)
        if (!startdt.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) {
          console.log('不符合的格式是第', i + 1, '行的:' + startdt);
          this.alert('上传文件的日期格式必须为YYYY-MM-dd', '提示')
          return
        } else if (!enddt.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/i)) {
          console.log('不符合的格式是第', i + 1, '行的:' + enddt);
          this.alert('上传文件的日期格式必须为YYYY-MM-dd', '提示')
          return
        } else {
          this.success('上传成功')
        }
      }
      this.tableData = results; //直接将结果展示
      var myDate = new Date();
      this.handleTime = myDate.toLocaleString();
      this.tableHeader = header;
      this.filename = filename;
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "上传的文件不得超过10mb",
        type: "warning"
      });
      return false;
    }
  },

};
</script>

<style lang="less" scoped>
@import url("./../../styles/index");
//批量导入微店链接包裹
.container {
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
/deep/.drop {
  border: none !important;
  width: auto;
  height: auto;
  line-height: 40px;
  height: 40px;
  position: relative;
  color: #fff;
  transform: translateY(-1px);
  .el-button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
//上传按钮样式
/deep/.upload-demo {
  display: inline-block;
}
</style>