<template>
 <div :class="config.isRadio?'treeBox radio':'treeBox'" ref="treeBox">
     <el-tree :data="treedata" ref="tree" node-key="comcode"  :highlight-current="true"
     :show-checkbox="config.showCheckbox"  
     :lazy="config.isLazy" 
     :load="loadTreeNodes" 
     :check-strictly="config.checkStrictly"   
     :default-checked-keys="defaultChecked"
     @check-change="handleClick" 
     @node-click="getCompanyInfo" @check="checkUpdata" >
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <img src="./../assets/image/treeIcon.png" alt="" v-if="config.isShowIcon">
            <span :class="data.comcode==activeitem?'activeitemfocus':''">{{ data.comcname }}</span>
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
                showCheckbox:true,//是否可以选择
                isRadio:true,//是否单选
		            checkStrictly:ture, //建议 单选:true 多选: false
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
     activeitem:null,
     scrolltreeBoxtop:0,
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
   eventBus.$on('treebranch-reloadnode',edata=>this.reloadNode(edata))
   
   let _rNode = this.currentNode.childNodes[0];
    //_rNode.checked = true;
    _rNode.expanded = true;
    _rNode.loadData();
    //_rNode.loadData();
    this.$refs.treeBox.parentNode.onscroll=(e)=>{
        e=e||window.event
        this.scrolltreeBox(e.target)
    }
 },
 activated(){
    this.$refs.treeBox.parentNode.scrollTop=this.scrolltreeBoxtop;
    console.log(document.querySelector('.redio .el-checkbox__inner'))
 },
 methods: {
     scrolltreeBox(res){
         this.scrolltreeBoxtop=res.scrollTop;
     },
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
    handleClick(data,checked,node){//实现单选
        if(checked === true&&this.config.isRadio) {
          this.$refs.tree.setCheckedKeys([data.comcode]);
          this.subordinateGrop=data
        } 
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
    getCompanyInfo(node){//点击树中的项时
      //console.log(this.$refs.tree)
      if(this.config.showCheckbox==false){//当不显示多选框时点击项时调用函数
      this.activeitem=node.comcode
            if(this.$parent.$options.name=="ElDialog"){
                this.$parent.$parent.getCompanyInfo(node);
            }else{
                this.$parent.getCompanyInfo(node);
            }
        }
      },
    getChildNodes(curItem){
      let cnd=this.$refs.tree.getNode(curItem);
      if(cnd)
        return cnd.childNodes;
    },
    checkUpdata(checkedNodes,checkedKeys){
      this.checkeddata=checkedKeys.checkedNodes
    },
    getCheckedNodes(){
      return this.$refs.tree.getCheckedNodes();
    }
 },
 destroyed(){
     this.scrolltreeBoxtop=0
 }

 }

</script>
<style lang='less' scoped>
@import url('../styles/index');
/deep/.el-tree-node:focus > .el-tree-node__content ,.activeitemfocus{
    color:@txt_active_color
  }
// /deep/.el-checkbox__inner{
//     width: 11px !important;
//     height: 11px !important;
//     border-radius: 50%;
//     border-color: #282B33 !important;
// }
// /deep/.is-checked .is-checked .el-checkbox__inner{
//     border-color: #282B33 !important;
//     background: #fff !important;
//     position: relative;
// }
// /deep/.el-checkbox__inner:hover{
//     border-color: #282B33;
// }
// /deep/.is-checked .is-checked .el-checkbox__inner::after{
//     content: "·";
//     width: 6px;
//     height: 6px;
//     position: absolute;
//     background-color: #282B33;
//     border-radius: 50%;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%,-50%);
// }

// /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner{
//     background-color: #fff;
//     border-color: #282B33;
// }
//以上代码是配置checkbox的
.radio /deep/.el-checkbox__inner {
    width: 14px !important;
    height: 14px !important;
    border-radius: 50%;
}
.radio /deep/.el-checkbox .el-checkbox__input .el-checkbox__inner::after{
    left: 4px;
    top:1px;
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