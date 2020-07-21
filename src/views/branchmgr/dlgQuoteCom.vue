<template>
   <el-dialog :title="title" custom-class="picc-dialog-table" 
      :show-close="false" :visible="dlgvisible" @close="close">
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">{{title}}</div>
          <div class="title-nav">
            <ul>
              <el-button size="mini" class="search" @click="queryData" :loading="loadding">查询</el-button>
            </ul>
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="3" class="txt">机构代码</el-col>
            <el-col :span="6">
              <el-input v-model="dlgquery.comcode" placeholder="模糊查询不用添加%"></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="table-grop">
        <el-table
          class="picc-table picc-table-normal picc-table-1st-col-icon"
          :data="depttableData"
           highlight-current-row
            @current-change="handleCurrentChange"
          style="width: 100%"
          height="231"
        >
          <el-table-column align="center" label="机构代码" prop="comcode"></el-table-column>
          <el-table-column align="center" label="机构名称" prop="comcname"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="handleConfirm">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import {queryBNComcodePost} from '@/api/sysmgr.js'
import mixin from '@u/mixinWares'
export default {
    name:'dlgQueryRole',
    mixins: [mixin],
    props:{
        dlgvisible:{
          type:Boolean,
          default:false
        },
        title:{
          type:String,
          default:'aaa'
        },
        dlgid:{
          type:String,
          default:'dc1'
        }
    },
    data () {
      return {
        dlgquery:{},
        depttableData:[],
        selectedData:{},
        loadding:false
      };
    },
    // components: {},
    // computed: {},
    // beforeMount() {},
    // mounted() { 
    // },
    // activated(){
    //   //console.log('activated');
    // },
    // deactivated(){
    //   //console.log('deactivated')
    // },
    methods: {
        queryData(e){
            if(!this.dlgquery.comcode){
              this.alert('请输入查询关键字','提示');
              return ;
            }
            this.loadding=true;
            let param={comcode:this.dlgquery.comcode}
            queryBNComcodePost(param).then(res=>{
              this.depttableData=res.data.data.data?res.data.data.data:[]
              this.$nextTick(()=>{
                this.loadding=false;
              })
            }).catch(err=>{console.log(err);this.loadding=false; })
        },
        handleCurrentChange(currentRow,oldCurrentRow){
          this.selectedData=currentRow;
        },
        close(){
          this.$emit('update:dlgvisible',false);
        },
        handleConfirm(){
          if(this.$parent.handleConfirm)
            this.$parent.handleConfirm(this.selectedData,this.dlgid)
        }
    }
 
 }

</script>
<style lang="less" scoped>
@import url('../../styles/index');
/deep/ .picc-table.picc-table-normal .current-row td{
  background-color: rgba(233, 57, 14,.2) !important;
}
</style>
