<template>
  <div>
    <div class="table-info">
      <el-table ref="multipleTable" 
        :data="currentData" 
        tooltip-effect="dark" 
        style="width: 100%" 
        
        :height="config.height"
        @cell-click="handleClick" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="70" v-if="config.select"></el-table-column>
        <el-table-column v-for="(column,index) in config.columns" 
            :key="index"
            :prop="column[0]" 
            :label="column[1]"
            :width="column[2]"
            :show-overflow-tooltip="column[3]"
            :fixed="column[5]"
            >
              <template slot-scope="scope">
                <span v-if="column[4]" :class="column[6]=='link'?'links':''">{{ TransValtoDesc(column[0],scope.row[column[0]]) }}</span>
                <span v-else-if="column[6]=='cmd'" class="links">{{ column[7] }}</span>
                <span v-else :class="column[6]=='link'?'links':''">{{ scope.row[column[0]] }}</span>
              </template>
        </el-table-column>
        <el-table-column v-for="(column,index) in config.commands" 
            :key="config.commands+'_'+index"
            :prop="column[0]"
            :width="column[2]">
              <span class="links">{{ column[1] }}</span>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="this.showpage">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="config.currentPage"
        :page-sizes="config.pageSizes"
        :page-size="config.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
 name:'datagrid',
 props:{
   config:{
      type:Object,
      default:function(){
          return {
            height:180, //table高度
            select:true, //是否可以选择
            //table展示列：prop label width show-overflow-tooltip formatter fixed(Boolean/left/right) columntyep(cmd/link/others) columnvalue(if columntype==cmd then need set)
            columns:[
            ],
            //table行按钮：span width
            commands:[
            ],
            pageSize:5,//每页行数
            pageSizes:[5,10], //每页行数选项
            currentPage:1, //当前页
            requestCurData:false,//每次分页数据是否请求后台 true:每次都请求后台 false或其它均为不再请求后台
          }
      }
   },
   showpage:{
     type:Boolean,//是否显示分页，如果不显示，不再分页
     default:true,
   }
 },
 data () {
  return {
      total:0,//总行数
      currentData:[], //当前table显示的数据
      allData:[],  //全部的数据
      selection:[], //保存选择的数组
      
  };
 },
 methods: {
   handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.config.pageSize=val;
      this.preTableData();
   },
   handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.config.currentPage=val;
      this.preTableData();
   },
   preTableData(){
      if(!this.config.requestCurData){
        this.showTableData();
        return;
      }
      let maxnum=Math.ceil(this.total/this.config.pageSize);
      this.config.currentPage=this.config.currentPage>maxnum ? maxnum :this.config.currentPage;
      
      this.$parent.requestCurPageData()
   },
   showTableData(ptotal){
     this.selection=[];//清空选项
     let cdata=[];
     if(this.showpage==false){
       //不分页，那么就在一页显示所有内容
       for(let i=0;i<this.allData.length;i++){
          this.allData[i]['_seqno']=i;
          cdata.push(this.allData[i]);
       }
     }
     else{
       if(!this.config.requestCurData){
          this.total=this.allData.length;
          let page=this.config.currentPage;
          let pageSize=this.config.pageSize;
          let start=(page-1)*pageSize;
          let len=(this.total-pageSize*(page-1))<pageSize?(this.total-pageSize*(page-1)):pageSize;
          for(let i=start;i<(len+start);i++){
              this.allData[i]['_seqno']=i;
              cdata.push(this.allData[i]);
          }
        }
        else{
          this.total=ptotal?ptotal:this.total;
          for(let i=0;i<this.allData.length;i++){
              this.allData[i]['_seqno']=i;
              cdata.push(this.allData[i]);
          }
        }
     }
     this.currentData=cdata;
   },
   handleSelectionChange(selection){
     console.log('selection',selection);
     this.selection=selection;
     console.log('this.selection',this.selection)
   },
   handleClick(row,column,cell,event){
     if(this.$parent.handleClick)
      this.$parent.handleClick(row,column,cell,event)
   },
   TransValtoDesc(id,val){
     let ret=val;
     //console.log(`TransValtoDesc id:${id} val:${val}`)
     if(this.$parent.TransValtoDesc)
      ret=this.$parent.TransValtoDesc(id,val);
     return ret;
   },
   removeRow(row){
     let seqno=row['_seqno'];
     this.allData.splice(seqno,1);
     this.showTableData();
   },
   removeRowArray(rows){
     for(let i=0;i<rows.length;i++){
       let seqno=rows[i]['_seqno'];
       this.allData.splice(seqno,1);
     }
     this.showTableData();
   },
   addRow(row,id){
     this.allData.push(row);
     if(id)
      this.allData=this.unique(this.allData,id)
     this.showTableData();
   },
   addRowArray(rows,id){
     this.allData=this.allData.concat(rows);
     if(id)
      this.allData=this.unique(this.allData,id)
     this.showTableData();
   },
   unique(arr,name) {
      var hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
        return item;
      }, []);
    }
 }
 
 }

</script>
<style lang='less' scoped>
@import url('../styles/index');
/deep/.el-table{
  min-width: 702px !important;
}
  .table-info{
    overflow: auto;
    margin: 24px @aside_w 20px @aside_w;
    height: 100%;
    // .data
    /deep/.el-table td{
       padding:10px 0;
    }
    .links{
      color:@txt_active_color;
      cursor: pointer;
    }
    .links:hover{ 
      text-decoration:underline;
    }
    // /deep/.el-table{
    //   position: absolute;
    // } 
  }
  .pagination{
    text-align: center;
    margin-bottom: 10px;
  }
</style>
