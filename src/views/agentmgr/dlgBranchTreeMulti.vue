<template>
   <el-dialog width="40%"  :visible="dlgvisible" custom-class="picc-dialog-table grop-dialog" 
      :show-close="false" @close="close">
        <div slot="title" class="dialog-title">
        <div class="select-grop">
            <h1>选择落地机构</h1>
        </div>
      </div>
      <div class="dialog-tree">
        <div>
          <tree ref="tree" :config="config"/>
        </div>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">取消</el-button>
        <el-button type="primary" round class="el-button-no-border" @click="addBranchDataArray">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import tree from '@/components/multiTreeBranch'
import lu from '@/utils/loginUser'

export default {
    name:'dlgBranchTreeSingle',
    props:{
        dlgvisible:{
          type:Boolean,
          default:false
        },
        dlgid:{
          type:String,
          defaule:'dstree'
        }
    },
    data () {
      return {
        config:{//配置树的配置项
          showCheckbox:true,
          isShowIcon:true,
          isLazy:true,
          rootNode:[{comcode:'10000000',comcname:'总公司'}]
        },
      };
    },
    components: {
      tree,
    },
    methods: {
        close(){
          this.$emit('update:dlgvisible',false);
        },
        addBranchDataArray(){
          if(this.$parent.addBranchDataArray){
            this.$parent.addBranchDataArray(this.$refs.tree.getCheckedNodes(),this.dlgid);
          }
          
        }
    } 
 }

</script>
<style lang='less' scoped>
@import url('./../../styles/index');
/deep/.grop-dialog{
  /deep/.dialog-tree{
    height: 300px;
    overflow: auto;
  }
.select-grop{
    overflow: hidden;
    h1{
        font-size: @dlg_title_size;
        float: left;
        font-weight: normal;
    }
    span{
        float: right;
        color: @txt_active_color;
        cursor: pointer;
    }
  }
}
</style>
