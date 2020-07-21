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
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="idno" label="身份证号"></el-table-column>
          <el-table-column prop="agentid" label="分机号"></el-table-column>
          <el-table-column prop="posttype" label="职务类别"></el-table-column>
          <el-table-column prop="pbinduserid" label="关联工号"></el-table-column>
          <el-table-column prop="userid" label="人员工号"></el-table-column>
          <el-table-column prop="logs" label="导入信息"></el-table-column>
          <el-table-column prop="result" label="导入结果"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {batchCreateUserPost} from '@/api/sysmgr'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import sumBatchRouter from '@/router/modules/miscmgr/sumBatch'
export default {
  mixins: [mixin,wares],
  name:'batchAgentImport',
  data() {
    return {
      linklist:['导入','导出结果','清空','模板下载'],
      sumBatchRouter:[], 
      tableHeader: [],
      filename:null,
      tableData:[],
      tableResult:[],
      templateData:[
        {
          deptname:'北京呼入一组',
          username:'张三',
          idno:'410',
          agentid:'555',
          posttype:'',
          pbinduserid:'',
          mobile:''
        },{
          deptname:'北京呼入二组',
          username:'张四',
          idno:'89789',
          agentid:'456',
          posttype:'',
          pbinduserid:'',
          mobile:''
        },{
          deptname:'北京呼入二组',
          username:'张四',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
          mobile:''
        },
        {},{},{},
        {
          deptname:'本模板用于坐席人员开通人员工号，填写说明如下：',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'1.填写内容仅限于汉字、数字、字母，不允许包含空格、逗号、回车符等特殊字符。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'2.填写格式必须是文本类型，不能使用数字或日期等格式。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'3.第一行的表头，不能随意变更文字。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'4.A到D列，不能缺失、不能更改顺序。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'5.每行每列不能隐藏，不必要显示的部分直接删除即可。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'6.不能合并单元格。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'7.sheet页的名称必须是“新增人员”。',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'8.身份证号和分机号可不录入，如录入需符合规范',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        },{
          deptname:'9.职务类别必须是‘客服专员’、‘组长’、‘主管’、‘运营支持人员’、‘其他’,为空或填写错误时默认是客服专员',
          username:'',
          idno:'',
          agentid:'',
          posttype:'',
          pbinduserid:'',
           mobile:''
        }
      ],
      //excel表头转换对比表
      headerMap:{
        '组别':'deptname',
        '姓名':'username',
        '身份证号':'idno',
        '分机号':'agentid',
        '职务类别':'posttype',
        '关联工号':'pbinduserid',
        '手机号码':'mobile'
      },
      //导出结果excel表头转换对比表
      headerresultMap:{
       '组别':'deptname',
       '姓名':'username',
       '身份证号':'idno',
       '分机号':'agentid',
       '职务类别':'posttype',
       '关联工号':'pbinduserid',
       '人员工号':'userid',
       '导入信息':'logs',
       '导入结果':'result',
       '手机号码':'mobile'
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
      this.filename=filename
      console.log(this.tableData);
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
    infoDao(e){
         let target=this.$parent.target;
         if(target=='模板下载'){
           this.export2Excel('人员批量导入',this.headerMap,this.templateData);
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
           batchCreateUserPost(param).then(res=>{
              console.log('batchCreateUserPost',res)
              let rdata=res.data;
              if(rdata.status==0)
                this.tableResult=rdata.data.user
              else
                this.alert('导入失败:'+rdata.statusText);
              
           }).catch((err)=>{console.log(err);})
         }else if(target=='清空'){
           this.filename=null;
           this.tableData=[]
           this.tableResult=[];
         }else if(target=='导出结果'){
            this.export2Excel('人员批量导入导出结果',this.headerresultMap,this.tableResult);
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
