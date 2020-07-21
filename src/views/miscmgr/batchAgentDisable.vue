<template>
  <div class="container">
    <div class="wai-file">
        <el-row class="row">
            <el-col :span="2" class="txt">外导文件</el-col>
            <el-col :span="4">
                <el-input size="mini" v-model="filename" placeholder=""></el-input>
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
          <el-table-column prop="userid" label="工号"></el-table-column>
          <el-table-column prop="deptname" label="组别"></el-table-column>
          <el-table-column prop="agentid" label="是否删除分机号" :formatter="resettabledata"></el-table-column>
          <el-table-column prop="result" label="导入结果"></el-table-column>
          <el-table-column prop="logs" label="导入信息"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {batchDisableUserPost} from '@/api/sysmgr'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import sumBatchRouter from '@/router/modules/miscmgr/sumBatch'
export default {
  mixins: [mixin,wares],
  name:'batchAgentDisable',
  data() {
    return {
      linklist:['导入','清空','模板下载'],
      sumBatchRouter:[], 
      filename:null,
      tableData:[],
      tableResult:[],
      tableHeader:[],
      templateData:[
        {
          userid:'1',
          deptname:'北京呼入一组',
          agentid:'',   
        },
        {
          userid:'2',
          deptname:'北京呼入二组',
          agentid:'',
        },
        {},
        {},
        {},
        {
          userid:'本模板用于失效坐席人员工号，填写说明如下：',
          deptname:'',
          agentid:'',
        },
        {
          userid:'1.填写内容仅限于汉字、数字、字母，不允许包含空格、逗号、回车符等特殊字符。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'2.填写格式必须是文本类型，不能使用数字或日期等格式。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'3.第一行的表头，不能随意变更文字。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'4.A到C列，不能缺失、不能更改顺序。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'5.每行每列不能隐藏，不必要显示的部分直接删除即可。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'6.不能合并单元格。',
          deptname:'',
          agentid:'',
        },
        {
          userid:'7.“Y”表示删除分机号,不填或其他字符均表示不删除。',
          deptname:'',
          agentid:'',
        }
      ],
      //excel表头转换对比表
      headerMap:{
        '工号':'userid',
        '组别':'deptname',
        '是否删除分机号':'agentid'
      },
      
    }
  },
  activated () {
    this.$parent.linksw(this.linklist)
  },
  methods: {
      export2Excel() {//111
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = this.getJsonKeys(this.headerMap);
          const filterVal = this.getJsonVals(this.headerMap);
          const list = this.templateData;
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '批量失效工号模板',
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
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
     },
     handleSuccess({ results, header,filename }) {
      this.tableData = results
      this.filename=filename
      console.log(this.tableData);
    },
    resettabledata(row, column, cellValue, index){
        if(cellValue=='Y'){
          return '是'
        }else if(cellValue=='N'){
          return '否'
        }
        return cellValue;
    },
     infoDao(e){
         let target=this.$parent.target;
         if(target=='模板下载'){
           this.export2Excel();
         }else if(target=='导入'){
           if(!this.filename || !this.tableData){
             this.alert('请选择导入文件!')
             return;
           }
           let param={user:[]};
           for(let i=0;i<this.tableData.length;i++){
             let r=this.transJsonkeys(this.tableData[i],this.headerMap)
             param.user.push(r);
           }
           batchDisableUserPost(param).then(res=>{
              console.log('batchDisableUserPost',res)
              let rdata=res.data;
              if(rdata.status==0)
                this.tableResult=rdata.data.implogs
              else
                this.alert('导入失败:'+rdata.statusText);
              
           }).catch((err)=>{console.log(err);})
         }else if(target=='清空'){
           this.filename=null;
           this.tableData=[];
           this.tableResult=[];
         }
     },
     batchBeforeUpload(){
         console.log(546897);
     }
  },
  mounted () {
   console.log(sumBatchRouter['children'])
   this.sumBatchRouter=sumBatchRouter['children']
    for(let i=1;i<this.sumBatchRouter.length;i++){
      if(this.$parent.isPageOpen(this.sumBatchRouter[i]['name'])) continue;
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
