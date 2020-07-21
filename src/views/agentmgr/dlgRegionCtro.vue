<template>
 <el-dialog
      title="选择产品方案"
      custom-class="picc-dialog-table"
      :show-close="false"
      :visible.sync="dlgvisible"
      width="400px"
    >
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">机构选择</div>
          <div class="title-nav">
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
      </div>
      <!-- 树形组件 -->
      <div style="height:417px;" class="tree-box">
        <tree :config="config" :treedata="treedata" ref="tree" class="tree"></tree>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="close">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button type="primary" round class="el-button-no-border" @click="addDataAuthority">
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import tree from "@/components/multiTreeBranch"; //树形控件
import {loadCompanyTreePost} from '@/api/sysmgr.js'
export default {
  name:'dlgRegionCtro',
  data() {
    return {
      config:{
        showCheckbox:true,//是否启用多选框默认显示
        isShowIcon:false,//是否显示label前的小图标默认是不显示
        isLazy:false,//是否懒加载默认不是
        rootNode:[]//懒加载时候的根节点
      },
      treedata:[]
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
  mounted () {
     let param={
      comcode:10000000
    },
     list= [{comcode:'10000000',comcname:'总公司'}]
    loadCompanyTreePost(param).then(res=>{
      list[0]['children']=res.data.data.company
        this.$nextTick(()=>{
          this.treedata=list
        })
    })
  },
  methods: {
    close(){
      this.$emit('update:dlgvisible',false);
    },
    addDataAuthority(){
        if(this.$parent.handleConfirm){
          this.$parent.handleConfirm(this.$refs.tree.checkeddata,this.dlgid)
        }
    }
  },
  components: {
    tree
  }
}
</script>

<style scoped lang="less">
  @import url('./../../styles/index');
  .tree-box{
    position: relative;
    overflow-y: auto;
    .tree{
      position: absolute;
    }
  }
</style>
