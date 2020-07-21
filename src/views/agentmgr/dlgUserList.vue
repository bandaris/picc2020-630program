<template>
  <el-dialog
      title="坐席选择"
      custom-class="picc-dialog-table"
      :show-close="false"
      :visible="dlgvisible" @close="close"
      :close-on-click-modal="true"
    >
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">坐席选择</div>
          <div class="title-nav">
            <ul>
              <li>
               <el-button size="mini" class="search" :loading="loading" @click="seatOperation">查询</el-button>
               <el-button size="mini" class="search" @click="seatOperation">清空</el-button>
              </li>
            </ul>
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="2">工号</el-col>
            <el-col :span="6">
              <el-input v-model="form.userid"></el-input>
            </el-col>
            <el-col :span="2" :offset="4">坐席姓名</el-col>
            <el-col :span="6">
              <el-input placeholder="模糊查询请使用%" v-model="form.username"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">创建时间</el-col>
            <el-col :span="6">
                <el-date-picker
                  v-model="transdate"
                  unlink-panels
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  value-format="yyyy-MM-dd"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="table-grop" v-loading="loading">
        <!-- <el-table
          class="picc-table picc-table-normal picc-table-1st-col-icon role-table"
          :data="seatTableData"
          style="width: 100%"
          height="250"
          @select="seatAddData"
          @select-all="seatAddData"
        >
          <el-table-column type="selection" width="90"></el-table-column>
          <el-table-column label="坐席工号" prop="userid"></el-table-column>
          <el-table-column label="坐席名称" prop="username"></el-table-column>
          <el-table-column label="所属部门" prop="deptname"></el-table-column>
          <el-table-column label="创建时间" prop="inserttimeforhis"></el-table-column>
        </el-table> -->
        <v-result ref="result" :config="dgConfig" :showpage="true" style="height:179px;"></v-result>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="addSeatTableData">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import {queryUserPost} from '@/api/sysmgr.js'
import wares from '@u/mixinWares'
import result from '@/components/datagrid.vue'

export default {
  name:'dlgUserList',
  mixins: [wares],
  data() {
    return {
      form:{},
      seatTableData:[],
      seatSelectData:[],
      transdate:[],
      loading:false,
      dgConfig:{
        height:179, //table高度
        select:true, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['userid','工号','150',true,false],
          ['username','姓名','100',true,false],
          ['deptname','所属部门','',true,false],
          ['insert_time_for_his','工号开通时间','',true,false]
        ],
        pageSize:10,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
        requestCurData:true
      },
    }
  },
  props:{
        dlgvisible:{
          type:Boolean,
          default:false
        },
        dlgid:{
          type:String,
          defaule:'aaa'
      },
    },
  methods: {
    datechange(date){
     this.form['startdt']=date[0];
     this.form['enddt']=date[1];
    },
    addSeatTableData(){
      if(this.$parent.handleConfirm){
        this.$parent.handleConfirm(this.$refs.result.selection,this.dlgid)
      }
    },
    seatAddData(selection){
       this.seatSelectData=selection;
    },
    seatOperation(e){
      let target=e.srcElement.innerText;
       if(target=="查询"){
        let isSearch=false;
        for(var key in this.form){
          if(this.form[key]=='')
            continue;
          isSearch=true;
          break;
        }
        if(isSearch==false){
          this.alert('请输入查询条件')
          return;
        }
        this.loading=true;
        queryUserPost(this.form).then((res)=>{
          // this.seatTableData=res.data.data;
          // this.$nextTick(()=>{
          //   this.loading=false
          // })
          if(res.data.status=='0'){
            this.$refs.result.allData=res.data.data.user;
            if(res.data.data.pagenum==1)
              this.$refs.result.showTableData(res.data.data.total);
            else
              this.$refs.result.showTableData();
          }
          else{
            this.alert('查询结果:'+res.data.statusText)
            this.$refs.result.allData=[];
            this.$refs.result.showTableData();
          }
          this.loading=false
        }).catch((err)=>{
          this.loading=false
          this.alert('查询异常')
          this.$refs.result.allData=[];
          this.$refs.result.showTableData();
          console.log(err);
        })
      }
      else if(target=='清空'){
        this.form={};
        this.transdate=[];
      }
    },
    close(){
      this.$emit('update:dlgvisible',false);
    },
  },
  components: {
    'v-result':result,
  },
  watch:{
    'transdate'(nval,oval){
      this.form.startdt=nval&&nval[0]?nval[0]:'';
      this.form.enddt=nval&&nval[1]?nval[1]:'';
    }
  }
}
</script>

<style scoped lang="less">
  @import url('./../../styles/index');
  /deep/.el-dialog.picc-dialog-table .el-dialog__body{
    height: 214px !important;
  }
  /deep/.table-info{
    margin: 0 20px 0 20px;
  }
</style>
