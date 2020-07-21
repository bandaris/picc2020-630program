<template>
    <el-dialog
      :title="title"
      custom-class="picc-dialog-table dialogVisible"
      :show-close="true"
      :visible="dlgvisible"
      @close="close"
    >
      <div slot="title" class="dialog-title" >
        <div class="dialog-vac">
          <div class="title-text">{{title}}</div>
          <div class="title-nav">
            <ul @click="menuFn">
              <li v-loading="loading" id="import">导入</li>
              <li id="export">导出结果</li>
              <li id="empty">清空</li>
              <li id="template">模板下载</li>
            </ul>
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="2">外导文件</el-col>
            <el-col :span="6">
              <el-input v-model="filename"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="clearfix">
        <div class="right ">
          <p class="title-style">
            <span></span>
            <b>导入预览</b>
          </p>
          <div class="box-border">
            <el-table
              :data="pewtableData"
              height="108"
              class="picc-table picc-table-normal picc-table-selectable"
              style="width: 100%"  @select="addtableInfo" @select-all="addtableInfo"
            >
              <!-- <el-table-column type="selection" width="56" /> -->
              <el-table-column prop="comcode" label="机构代码"  />
            </el-table>
          </div>
        </div>
        <div class="right " style="margin-top:15px">
          <p class="title-style">
            <span></span>
            <b>导入日志</b>
          </p>
          <div class="box-border">
            <el-table
              :data="tableData"
              height="108"
              class="picc-table picc-table-normal picc-table-selectable"
              style="width: 100%"
            >
              <!-- <el-table-column type="selection" width="56" /> -->
              <el-table-column prop="comcode" label="机构代码" width="120"></el-table-column>
              <el-table-column prop="result" label="导入结果" show-overflow-tooltip></el-table-column>
              <el-table-column prop="logs" label="导入信息" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="close">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    
    </el-dialog>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {batchAddDeptComcodePost} from "@/api/sysmgr";
import wares from '@u/mixinWares'

export default {
  name:'dlgBatchImport',
  mixins: [wares],
  data() {
    return {
      filename:'',
      pewtableData:[],
      selectiontable:[],
      tableData:[],
      loading:false,
      optflag:false, //是否导入过的标识位
    }
  },
  props: {
    title:{
      type:String,
      defaule:'弹框标题'
    },
    deptcode:{
      type:String,
      defaule:''
    },
    dlgid:{
      type:String,
      defaule:'aaa'
    },
    dlgvisible:{
      type:Boolean,
      defaule:true
    }
  },
  methods: {
    menuFn(e){//操作批量追加菜单
      let target=e.target.id;
      if(target=="template"){
          this.export2Excel();
      }
      else if(target=='empty'){
        this.filename='';
        this.pewtableData=[]
      }
      else if(target=='import'){
        let param={};
        param.company=this.pewtableData;
        if(this.pewtableData.length<=0){
          this.alert('请选择有效的上传文件')
          return;
        }
        param.deptcode=this.deptcode;
        this.loading=true;
        batchAddDeptComcodePost(param).then((res)=>{
          this.loading=false;
          this.optflag=true;
          this.tableData=res.data.data.implogs;
        }).catch((err)=>{
          console.log(err);
          this.loading=false;
        })
      }
      else if(target=='export'){
        this.exportLogs();
      }
    },
    export2Excel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['机构代码'];
        const filterVal = ['comcode'];
        const list = [];
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '出单机构批量导入模板',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
  　 },
    exportLogs() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['机构代码','导入结果','导入信息'];
        const filterVal = ['comcode','result','logs'];
        const list = this.tableData;
        if(list.length<=0){
          this.alert('没有结果需要导出')
          return;
        }
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '出单机构批量导入结果',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
  　 },
    formatJson(filterVal, jsonData) {
　　　　return jsonData.map(v => filterVal.map(j => v[j]))
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
    addtableInfo(section){//追加待选出单权限数据
      this.selectiontable=section;
    },
    handleSuccess({ results, header,filename }) {
      for(let i=0;i<results.length;i++){
        this.pewtableData.push({'comcode':results[i]['机构代码']})
      }
      this.tableHeader = header
      this.filename=filename
      console.log(this.pewtableData);
    },
    close(){
      this.$emit('update:dlgvisible',false);
      if(this.optflag){
        this.optflag=false;
        this.filename='';
        this.pewtableData=[]
        this.tableData=[]
        this.$parent.handleConfirm(this.selectiontable,this.dlgid)
      }
        
    }
  },
  components: {
    UploadExcelComponent
  }
}
</script>

<style scoped lang="less">  
@import url('./../../styles/index');
  .dialogVisible{
  width: 100%;
  height: auto;
  .right {
    float: left;
    width: 100%;
  }
}
/deep/.drop{
  border: none !important;
  width: auto;
  height: auto;
  line-height: 40px;
  height: 40px;
  position: relative;
  color: @content_bgc;
  transform: translateY(-5px);
  .el-button{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>

