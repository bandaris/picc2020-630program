<template>
   <el-dialog width="40%"  :visible="dlgvisible" custom-class="picc-dialog-table grop-dialog" 
      :show-close="false" @close="close">
        <div slot="title" class="dialog-title">
        <div class="select-grop">
            <h1>选择工作组</h1>
        </div>
      </div>
      <div class="dialog-tree">
        <div>
          <tree ref="tree" :config="config"/>
        </div>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">取消</el-button>
        <el-button type="primary" round class="el-button-no-border" @click="addDeptDataArray">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import tree from '@/components/multiTree'
import lu from '@/utils/loginUser'

export default {
    name:'dlgDeptTreeMulti',
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
        config:{//传递树形控件的配置项
          showCheckbox:true,//是否启用多选框默认显示
          isShowIcon:false,//是否显示label前的小图标默认是不显示
          isLazy:true,//是否懒加载默认不是
          rootNode:[{deptcode:'',deptname:'部门/工作组',dlevel:'0'}]
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
        addDeptDataArray(){
          if(this.$parent.addDeptDataArray ){
            let cret=this.$refs.tree.getCheckedNodes().filter(sitem => sitem.deptcode)
            this.$parent.addDeptDataArray(cret,this.dlgid);
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
    overflow-y: auto;
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
