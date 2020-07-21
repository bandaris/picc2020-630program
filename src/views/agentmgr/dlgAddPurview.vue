<template>
   <!-- 出单权限机构设置弹窗 -->
    <el-dialog
      custom-class="picc-dialog-table issueSetting"
       :show-close="false"
      :visible="dlgvisible"
      width="80%"
    >
    <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">出单机构权限设置</div>
          <div class="title-nav">
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
      </div>
      <div class="dialogVisible clearfix">
        <!-- 弹窗左侧树形控件 -->
        <div class="dialogVisible-left fl">
          <tree ref="tree" :config="config" :showLevel=2></tree>
        </div>
        <!-- 弹窗右侧表格区域 -->
        <div class="dialogVisible-right fr">
          <div class="right p">
            <p class="title-style">
              <span></span>
              <b >二级机构</b>
              
            </p>
            <div class="box-border">
              <el-table
                :data="secondaryTableData"
                height="140"
                class="picc-table picc-table-normal picc-table-selectable"
                style="width: 100%"
                @select="selectItems2Fn"
                @select-all="selectItems2Fn"
                @cell-click="addTertiary"
              >
                <el-table-column type="selection" width="56"/>
                <el-table-column prop="parentcom" label="省公司" width=""></el-table-column>
                <el-table-column prop="comcode" label="机构号" width="" show-overflow-tooltip></el-table-column>
                <el-table-column prop="comcname" label="机构名称" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="" show-overflow-tooltip>
                  <span style="color:#1c61fc;cursor:pointer;font-size:12px">下级机构</span>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="right p" style="margin-top:15px">
            <p class="title-style">
              <span></span>
              <b>三级级机构</b>
              
            </p>
            <div class="box-border">
              <el-table
                :data="tertiaryTableData"
                height="140"
                class="picc-table picc-table-normal picc-table-selectable"
                style="width: 100%"
                @select="selectItems3Fn"
                @select-all="selectItems3Fn"
              >
                <el-table-column type="selection" width="56" />
                <el-table-column prop="parentcom" label="分公司" ></el-table-column>
                <el-table-column prop="comcode" label="机构号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="comcname" label="机构名称" min-width="210" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer clearfix">
        <el-button
          round
          type="primary"
          @click="singleAuthority"
          class="fr"
          style="margin-left:10px"
        >
          <span style="color:#ffffff" >确 定</span>
        </el-button>
        <el-button round plain type="primary" @click="close" class="fr">
          <span style="color:#1C61FC">取 消</span>
        </el-button>
      </span>
    </el-dialog>
</template>

<script>
import {loadCompanyTreePost} from '@/api/sysmgr.js'
import wares from '@u/mixinWares'
import tree from "@/components/treeBranch"; //树形控件
export default {
  name:'dlgAddPurview',
  mixins: [wares],
  components: {
    tree
  },
  data() {
    return {
      secondaryTableData:[],//二级机构数据列表
       //出单权限中的树形构建的数据
      config:{//配置树的配置项
        showCheckbox:false,
        isShowIcon:false,
        isLazy:true,
        rootNode:[{comcode:'10000000',comcname:'总公司'}]
      },
      tertiaryTableData:[],//三级机构数据
      treedata:[],//树形构建的初始数据
      
      selitems2:[],//已选项二级机构
      selitems3:[],//已选项三级机构
    }
  },
  props: {
    title:{
      type:String,
      defaule:'弹框标题'
    },
    dlgid:{
      type:String,
      defaule:'aaa'
    },
    dlgvisible:{
      type:Boolean,
      defaule:true
    }
  },
  mounted () {
    // let param={
    //   comcode:10000000
    // },
    //  list= [{comcode:'10000000',comcname:'总公司'}]
    // loadCompanyTreePost(param).then(res=>{
    //   list[0]['children']=res.data.data.company
    //     this.$nextTick(()=>{
    //       this.treedata=list
    //     })
    // })
    // console.log(this.treedata);
  },
  methods: {
    close(){
      this.$emit('update:dlgvisible',false);
    },
    getCompanyInfo(node){
      if(node.comcode=='10000000'){
        this.secondaryTableData=[];
        return
      }
      let param={
        comcode:node.comcode
      }
      loadCompanyTreePost(param).then(res=>{
        let list=res.data.data.company;
        list.forEach(item=>{
          item['parentcom']=node.comcname
        })
        this.secondaryTableData=list;
        this.tertiaryTableData=[];
        this.selitems2=[];
        this.selitmes3=[];
      },err=>{
        console.log(err)
      }).catch(res=>{

      })
    },
    //根据选择的树形构建选择二级机构的数据
    addDeptDataArray(){
      // if(this.$parent.addDeptDataArray){
      //   this.$parent.addDeptDataArray(this.$refs.tree.checkeddata);
      // }   
      console.log(this.$refs.tree.checkeddata)
    },
    //出单权限中选择的数据
    addSingchecked(selection){
      this.singleChebox=selection;
    },
    //出单权限弹窗表格选择
    selectItems2Fn(selection){
      this.selitems2=selection;
      //console.log(this.selitems2);
    },
    //增加三级机构表格数据
    addTertiary(row, column, cell, event){
      let target=cell.firstElementChild.firstElementChild;
      if(target&&target.innerHTML=="下级机构"){
        let param={
          comcode:row.comcode
        }
        loadCompanyTreePost(param).then(res=>{
          let list=res.data.data.company;
          for(var i=0;i<list.length;i++){
            list[i]['parentcom']=row.comcname
          }
          this.tertiaryTableData=list
          this.selitems3=[];
        },err=>{
          console.log(err)
        }).catch(res=>{

        })
      }
    },
    //增加三级机构待删除的项
    selectItems3Fn(selection){
      this.selitems3=selection;
    },
     singleAuthority(){//当选择完二级机构和三级机构时
      if(this.$parent.handleConfirm){
        let sData=this.selitems2.concat(this.selitems3);
        if(sData.length==0){
          this.alert('请选择机构');
          return;
        }
        this.$parent.handleConfirm(sData,this.dlgid)
      }
    },
  },
  
}
</script>

<style scoped lang="less">
@import url('./../../styles/index');
 .treeBox{
   width: 300px;
 }
  /deep/.issueSetting{
    @media  (max-width: 1366px) {
      margin-top: 3vh !important;
    }
    @media  (min-width: 1367px) and (max-width: 1440px) {
      margin-top: 8vh !important;
    }
    @media  (min-width: 1441px)  {
      margin-top: 15vh !important;
    }
  /deep/.el-dialog__body{
    height: 406px;
    /deep/.el-table{
      height: 200px;
    }
  }
}
.dialogVisible-right{
  width: calc(~ "100% - 300px");
}
.dialogVisible-left{
  height: 390px;
  width: 300px;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  .treeBox{
    position: absolute;
    left: 0;
    top: 0;
  }
}

</style>
