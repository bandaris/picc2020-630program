<template>
 <div>
     <h1><b>Excel下载</b></h1>
     <el-button type="primary" :loading="downloadLoading" @click="export2Excel()">导出excel</el-button>
     <hr>
     <p></p>
     <p></p>
     <h1><b>Excel上传</b></h1>
     <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <div>文件名：{{filename}}</div>
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
    </div>
 </div>
</template>

<script>
 import UploadExcelComponent from '@/components/UploadExcel/index.vue'
 
 export default {
 name:'excelTest',
 components: {UploadExcelComponent},
 props:[''],
 data () {
    return {
        downloadLoading: false,
        goodsItems:[{
                name:'商品1',
                number:'MPM00112',
                salePrice:'￥999.00',
                stocknums:3423,
                salesnums:3423,
                sharenums:3423,
            },
            {
                name:'商品2',
                number:'MPM00112',
                salePrice:'￥999.00',
                stocknums:3423,
                salesnums:3423,
                sharenums:3423,
            }],
        tableData: [],
        tableHeader: [],
        filename:null
    };
 },

//  computed: {},

//  beforeMount() {},

//  mounted() {},

 methods: {
    formatJson(filterVal, jsonData) {
  　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　},
    export2Excel() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品名称','商品货号','售价','库存','销量','分享',];
        const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums', 'sharenums', ];
        const list = this.goodsItems
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '商品管理列表',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
  　 },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 10m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header,filename }) {
      this.tableData = results
      this.tableHeader = header
      this.filename=filename
    }
 },

//  watch: {}

 }

</script>
<style lang='less' scoped>
 ul{
        li{
            margin: 5px;
        }
    }
</style>