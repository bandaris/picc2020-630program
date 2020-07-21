<template>
  <div class="container">
    <div class="wai-file">
        <el-row class="row">
            <el-col :span="2" class="txt">外导文件</el-col>
            <el-col :span="4">
                <el-input size="mini" v-model="filename"></el-input>
            </el-col>
            <el-col :span="3" class="btn-text">
               <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" :returnAll="false" />
            </el-col>
        </el-row>
    </div>
    <div class="dao-tabl">
      <p class="title-style">
        <span></span>
        <b>导入预览</b>
      </p>
      <div class="table-box">
        <el-table :data="tableData"  highlight-current-row class="picc-table picc-table-normal picc-table-1st-col-icon"
        height="175"
        style="width: 100%;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" :formatter="reseattabledata" />
        </el-table>
      </div>
      <p class="title-style">
        <span></span>
        <b>导入日志</b>
      </p>
      <div class="table-box">
        <el-table :data="tableResult" height="175" style="width:100%" class="picc-table picc-table-normal picc-table-1st-col-icon">
          <el-table-column prop="deptname" label="组别"></el-table-column>
          <el-table-column prop="userid" label="坐席工号"></el-table-column>
          <el-table-column prop="datacnt_1" label="处理再次联系任务数"></el-table-column>
          <el-table-column prop="datacnt_2" label="处理未接通的任务数"></el-table-column>
          <el-table-column prop="datacnt_3" label="处理未联系的任务数"></el-table-column>
          <el-table-column prop="result" label="导入结果"></el-table-column>
          <el-table-column prop="logs" label="导入信息"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import sumBatchRouter from '@/router/modules/miscmgr/sumBatch'
import {transferUserGroupPost} from '@/api/sysmgr'

export default {
  mixins: [mixin,wares],
  name:'batchTransGroup',
  data() {
    return {
      linklist:['导入','导出结果','清空','模板下载'],
      sumBatchRouter:[], 
      tableHeader: [],
      filename:null,
      tableData:[],
      tableResult:[],
      templateData:[{
       userid:'00001089',
       username:'张三',
       olddeptname:'主管组',
       newdeptname:'北京呼入一组',
       taskrecontact:'Y',
       taskunconnect:'N',
       taskuncontact:'N',
       delmanagegroup:'N'
     }],
     //excel表头转换对比表
     headerMap:{
       '工号':'userid',
       '姓名':'username',
       '现在组别':'olddeptname',
       '调整后组别':'newdeptname',
       '是否转移设置为再次联系的任务':'taskrecontact',
       '是否转移未接通的任务':'taskunconnect',
       '是否转移未联系的任务':'taskuncontact',
       '是否删除可管理的组':'delmanagegroup'
     },
     //导出结果excel表头转换对比表
     headerresultMap:{
       '组别':'deptname',
       '坐席工号':'userid',
       '处理再次联系任务数':'datacnt_1',
       '处理未接通的任务数':'datacnt_1',
       '处理未联系的任务数':'datacnt_3',
       '导入结果':'result',
       '导入信息':'logs'
     }
    }
  },
  activated () {
    this.$parent.linksw(this.linklist)
  },
  methods: {
      export2Excel(filename,headerMap,list) {//111
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = this.getJsonKeys(headerMap);
          const filterVal = this.getJsonVals(headerMap);
          // const list = this.templateData;
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
    　 },
     handleSuccess({ results, header,filename }) {
      this.tableData = results
      this.tableHeader = header
      this.filename=filename
    },
     infoDao(e){
         let target=this.$parent.target;
         if(target=='模板下载'){
           this.export2Excel('批量转组模板',this.headerMap,this.templateData);
         }
         else if(target=='导入'){
           if(!this.filename || !this.tableData){
             this.alert('请选择导入文件!')
             return;
           }
           let param={user:[]};
           for(let i=0;i<this.tableData.length;i++){
             let r=this.transJsonkeys(this.tableData[i],this.headerMap)
             param.user.push(r);
           }
           transferUserGroupPost(param).then(res=>{
              console.log('transferUserGroupPost',res)
              let rdata=res.data;
              if(rdata.status==0)
                this.tableResult=rdata.data.user
              else
                this.alert('导入失败:'+rdata.statusText);
              
           }).catch((err)=>{console.log(err);})
         }else if(target=='导出结果'){
           this.export2Excel('人员批量转组导出结果',this.headerresultMap,this.tableResult)
         }else if(target=='清空'){
           this.filename=null;
           this.tableData=[];
           this.tableResult=[];
         }
     },
     batchBeforeUpload(){
         console.log(546897);
     },
     reseattabledata(row, column, cellValue, index){
       if(cellValue=='N'){
         return '否'
       }else if(cellValue=='Y'){
         return '是'
       }else{
         return cellValue
       }
        // return '';
     }
  },
  mounted () {
   console.log(sumBatchRouter['children'])
   this.sumBatchRouter=sumBatchRouter['children']
    for(let i=1;i<this.sumBatchRouter.length;i++){
      if(this.$parent.isPageOpen(this.sumBatchRouter[i]['name'])) 
        continue;
      this.$parent.addnav(this.sumBatchRouter[i])
      console.log(this.$parent.isPageOpen(this.sumBatchRouter[i]['name']))
    }
    for(let key in this.headerMap){
      this.tableHeader.push(key)
    }
  },
  components: {
    UploadExcelComponent
  }
}
</script>

<style scoped lang="less">
@import url('./../../styles/index');
.container{
  margin: 0 @aside_w;
}
/deep/.drop{
  border: none !important;
  width: auto;
  height: auto;
  line-height: 40px;
  height: 40px;
  position: relative;
  color: #fff;
  transform: translateY(-1px);
  .el-button{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
