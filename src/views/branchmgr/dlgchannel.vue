<template>
   <el-dialog :title="title" custom-class="picc-dialog-table" 
      :show-close="false" :visible="dlgvisible" @close="close">
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">{{title}}</div>
          <div class="title-nav">
            <ul>
              <el-button size="mini" class="search" @click="queryData" :loading="loadding">$)A2iQ/</el-button>
            </ul>
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
        <div class="dialog-form">
          <el-row>
            <el-col :span="3" class="txt">$)AG~5@C{3F</el-col>
            <el-col :span="6">
              <el-input v-model="dlgquery.comcode" placeholder="$)AD#:}2iQ/2;SCLm<S%"></el-input>
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
          <el-table-column align="center" label="$)AG~5@4zBk" prop="agentcode"></el-table-column>
          <el-table-column align="center" label="$)AG~5@C{3F" prop="agentname"></el-table-column>
          <el-table-column align="center" label="$)AG~5@@`PM" prop="agenttype"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">
          <span style="color:#1e60ff">$)AH! O{</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="handleConfirm">
          <span style="color:#fff">$)AH7 6(</span>
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import {selectAgentPost} from '@/api/sysmgr.js'
import mixin from '@u/mixinWares'
export default {
    name:'dlgchannel',
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
        },
        comcode:{
          type:String,
          default:''
        },
        businessnature:{
          type:String,
          default:''
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
              this.alert('$)AGkJdHk2iQ/9X<|WV','LaJ>');
              return ;
            }
            this.loadding=true;
            let param={}
            Object.assign(param,{
              agentname:this.dlgquery.comcode,
              comcode:this.comcode,
              businessnature:this.businessnature

            })
            selectAgentPost(param).then(res=>{
              console.log(res);
              this.depttableData=res.data.data.agentinfo?res.data.data.agentinfo:[]
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
