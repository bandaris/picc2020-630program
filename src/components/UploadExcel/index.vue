<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      {{tipdata}}
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        浏 览
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function,// eslint-disable-line
    //如果中间有空行，是否返回空行后面的所有内容
    returnAll:{
          type:Boolean,
          default:false
        }
  },
  data() {
    return {
      loading: false,
      tipdata:'拖拽或选取excel文件',
      excelData: {
        filename:null,
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData({ header, results,fname }) {
      this.excelData.header = header
      //20200311 暂时取消空行判断，在这处理不太合适
      //追加空行的判断
      // this.excelData.results=[];
      // for(let i=0;i<results.length;i++){
      //   let res=results[i];
      //   let isadd=false;
      //   for(let key in res){
      //     if(!res[key])
      //       continue;
      //     isadd=true;
      //     break;
      //   }
      //   if(isadd)
      //     this.excelData.results.push(res);
      //   else
      //     break;
      // }
      this.excelData.results = results
      this.excelData.filename = fname
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      let fname=rawFile.name
      let rbflag=this.returnAll
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)

          let results=null;
          if(rbflag)
            results = XLSX.utils.sheet_to_json(worksheet)
          else{
            let tws=this.processWorksheet(worksheet)
            results=XLSX.utils.sheet_to_json(tws)
          }

          this.generateData({ header, results,fname})
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    processWorksheet(ws){
      let ret={};
      let crk=1; //行
      let lrk=1; //列
      let eref='';
      for(let key in ws){
        let sk=key.substr(0,1).toUpperCase();
        let rk=parseInt(key.substr(1),10);
        if(isNaN(rk)==true)
          continue;//非数字的key不必处理
        
        if(sk!='A'){
          ret[key]=ws[key];
          eref=key;
          continue;
        }
        if(rk-crk>1)
          break;
        ret[key]=ws[key];
        crk=rk;
      }
      ret['!ref']='A1:'+ (eref==''?'A'+crk:eref);
      return ret;
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 400px;
  /* height: 160px; */
  line-height: 80px;
  margin: 0 auto;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
