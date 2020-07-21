<template>
 <div class="treeBox">
     <el-tree :data="treedata" ref="tree" node-key="comcode"  :highlight-current="true"
     :show-checkbox="config.showCheckbox"  
     :lazy="config.isLazy" 
     :load="loadTreeNodes" 
     :check-strictly="false"   
     :default-checked-keys="defaultChecked"
     @node-click="getCompanyInfo" @check="checkUpdata" >
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <img src="./../assets/image/treeIcon.png" alt="" v-if="config.isShowIcon">
            <span>{{ data.comcname }}</span>
        </span>
    </el-tree>
 </div>
</template>

<script>
import {loadCompanyTreePost} from '@a/sysmgr.js'
import eventBus from '@u/vueEvent'

export default {
 name:'tree',
 props:{
     config:{
         type:Object,
         default:function(){
             return {
                showCheckbox:true,//是否启用多选框默认显示
                isShowIcon:false,//是否显示label前的小图标默认是不显示
                isLazy:false,//是否懒加载默认不是
                rootNode:[]//懒加载时候的根节点
             }
         }
     },
     //设定最多可以显示的级别
     showLevel:{
       type:Number,
       default:99
     },
     treedata:{
         type:Array,
         default:function(){
             return []
         }
     }
 },
 data () {
  return {
      defaultChecked:[],
      checkedId:'',//保存选中的radio框的id
      subordinateGrop:'',//保存所属组
      checkeddata:[],
      defaultProps: {
          children: 'children',
          label: 'label'
    },
    currentNode:null,
    currentNodeResolve:null,
    rNode:null //待重新加载的节点
 };
 },

 mounted() {
   eventBus.$on('multitreebranch-reloadnode',edata=>this.reloadNode(edata))
   
   let _rNode = this.currentNode.childNodes[0];
    //_rNode.checked = true;
    _rNode.expanded = true;
    _rNode.loadData();
    //_rNode.loadData();

 },
 methods: {
     loadTreeNodes(node,resolve){
      this.currentNode=node;
      this.currentNodeResolve=resolve;
      if (node.level === 0) { // 第一次调用    
          resolve(this.config.rootNode)
      }
      if (node.level >=1) { // 点击之后触发
         this.getIndex(node, resolve);
      }
     },
     reloadNode(edata){
       console.log('reloadNode',edata)
       //设定此节点需重新加载
       let cnd=this.$refs.tree.getNode(this.rNode);
       if(!cnd) return;
       cnd.expanded=false;
       cnd.loaded=false;
       cnd.isLeaf=false;
      //  cnd.childNodes=null;
      //  cnd.loadData();
     },
    getIndex(node,resolve){
        if(node.data.dlevel>=3 || node.level>=this.showLevel){
          resolve([]); //默认仅加载到0、1、2、3级（销售组级）
          return;
        }
        let param={
            comcode:node.data.comcode
        }
        loadCompanyTreePost(param).then((res)=>{
            if(res.data.status!=0){
                this.$message.error(res.data.statusText);
                return;
            }
            setTimeout(()=>{resolve(res.data.data.company);},500)
        }).catch((error)=>{console.log(error);});
    },
    // requestTree(resolve){
       
    // },
    getCompanyInfo(node){//点击树中的项时
        if(this.config.showCheckbox==false){
            if(this.$parent.$options.name=="ElDialog"){
                this.$parent.$parent.getCompanyInfo(node);
            }else{
                this.$parent.getCompanyInfo(node);
            }
        }
      },
    checkUpdata(checkedNodes,checkedKeys){
      this.checkeddata=checkedKeys.checkedNodes
      // console.log('data',this.checkeddata)
      // console.log('nodes',this.$refs.tree.getCheckedNodes());
      // console.log('check',this.$refs.tree.getCheckedKeys());
    },
    getCheckedNodes(){
      return this.$refs.tree.getCheckedNodes();
    }
 },
 watch: {}

 }

</script>
<style lang='less' scoped>
@import url('../styles/index');
/deep/.el-tree-node:focus > .el-tree-node__content {
    color:@txt_active_color
  }
 /deep/.el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/deep/.el-icon-caret-right:before{
    content: '';
    height: 16px;
    width: 16px;
    text-align: center;
    display: inline-block;
    border-radius: 50%;
    color: #32323B;
    background: url('./../assets/image/addIcon.png') no-repeat center center;
}
/deep/.expanded:before{
    content: "";
    background: url('./../assets/image/reduceIcon.png') no-repeat center center;
}
/deep/.is-leaf:before{
    content: '';
    // display: none;
    opacity: 0;
}
</style>