<template>
  <!-- 批量导入微店链接 -->
  <div class="container">
    <!-- 批量导入微店链接页面开始 -->
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
              <el-table-column prop="员工工号" label="员工工号"></el-table-column>
              <el-table-column prop="长链接地址" label="长链接地址"></el-table-column>
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
              <el-table-column prop="userid" label="员工工号"></el-table-column>
              <el-table-column prop="longlink" label="长链接地址"></el-table-column>
              <el-table-column prop="shortlink" label="短链接地址"></el-table-column>
              <el-table-column prop="result" label="导入结果"></el-table-column>
              <el-table-column prop="logs" label="导入信息"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信店链接查询页面开始 -->
  </div>
</template>

<script>
import { batchCreateMicroShopPost } from "@/api/sysmgr"; //导入http请求方法
import UploadExcelComponent from "@/components/UploadExcel/index";
import mixin from './mixins/micro'
import wares from '@u/mixinWares'
export default {
  name: 'microAgentImport',
  mixins: [mixin, wares],
  data() {
    return {
      linklist: ['导入', '导出结果', '清空', '模板下载', '关闭'],
      filename: null, //被上传的文件名称
      handleTime: null, //文件的上传时间
      tableHeader: [], //模板的表头数据
      items: [
        {
          userid: "e00016423",
          longlink:
            "https://shop15715887.koudaitong.com/v2/home/11tc41zic?scan=3&sf=wx_sm&from=singlemessage&isappinstalled=0"
        },
        {
          userid: "e00015200",
          longlink:
            "https://shop15715887.koudaitong.com/v2/home/11tc41zic?scan=3&sf=wx_sm&from=singlemessage&isappinstalled=1"
        },
        { userid: '' },
        { userid: '' },
        { userid: '' },
        {
          userid: "本模板用于导入微店链接，填写说明如下："
        },
        {
          userid: "1.员工工号必须存在，且为可用状态。"
        },
        {
          userid: "2.每条记录之间不能有空行。"
        },
        {
          userid: "3.员工工号或长链接地址不能为空。"
        }
      ], //模板的数据范例
      //模板下载的excel表头转换对比表
      headerMap: {
        '员工工号': 'userid',
        '长链接地址': 'longlink',
      },
      //导出结果的Excel表头转换对比表
      headerMapResult: {
        '员工工号': 'userid',
        '长链接地址': 'longlink',
        '短链接地址': 'shortlink',
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
            filename: "批量导入微店链接-模板",
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
        let param = { microshop: [] };
        for (let i = 0; i < this.tableData.length; i++) {
          let r = this.transJsonkeys(this.tableData[i], this.headerMap)
          param.microshop.push(r);
        }
        batchCreateMicroShopPost(param).then(res => {
          // console.log('batchCreateMicroShopPost',res)
          let rdata = res.data;
          if (rdata.status == 0) {
            this.alert('导入完毕')
            this.tableResult = rdata.data
          }
          else {
            this.alert(rdata.statusText);
            this.tableResult = rdata.data
          }
        }).catch((err) => { console.log(err); })
      } else if (target == '关闭') {
        this.closePage();
      } else if (target == '导出结果') {
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
          this.alert("请先导入！")
        }
      } else if (target == "清空") {
        this.tableData = [];
        this.tableResult = [];
        this.filename = null
      }
    },
    handleSuccess({ results, header, filename }) {
      // console.log(results);
      this.tableData = results; //直接将结果展示
      // this.tableResult = this.tableResult.concat(results); //在历史记录里面进行追加
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