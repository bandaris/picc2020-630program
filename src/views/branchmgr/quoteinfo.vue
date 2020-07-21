<template>
  <!-- 报价信息配置页面 -->
  <div class="container">
    <!-- 报价信息配置页面开始 -->
    <div class="configurationOfQuoteInformation-main">
      <!-- 顶部表单 -->
      <div class="form-wrap box-border">
        <el-row class="row">
          <el-col :span="3" class="txt txtmi">
            归属部门
          </el-col>
          <el-col :span="2">
            <el-input v-model="selectdeptitem.comcode" disabled></el-input>
          </el-col>
          <el-col :span="2" style="padding-left:10px;">
            <el-input v-model="selectdeptitem.comcname" disabled></el-input>
          </el-col>
           <el-col :span="1" class="dian">
            <span @click="dlgGComVisible = true">...</span>
          </el-col>
        </el-row>
      </div>
      <div class=" box-border">
        <el-row class="row">
          <el-col :span="3" class="txt txtmi">
            归属部门
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.comcode" disabled></el-input>
          </el-col>
          <el-col :span="2" style="padding-left:10px;">
            <el-input v-model="form.comcname" disabled></el-input>
          </el-col>
          <el-col :span="1" class="dian">
          </el-col>
          <el-col :span="2" :offset="1" class="txt txtmi">
            归属人
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.handler1code" disabled></el-input>
          </el-col>
          <el-col :span="2" style="padding-left:10px;">
            <el-input v-model="form.handler1name" disabled></el-input>
          </el-col>
          <el-col :span="1" class="dian"> <span @click="isshowdlg('dlgGUserVisible')">...</span> </el-col>

          <el-col :span="2" class="txt txtmi">
            配置名称
          </el-col>
          <el-col :span="4">
            <el-input v-model.trim="form.name" ></el-input>
          </el-col>
          <el-col :offset="1" :span="1">
            <el-button size="mini" type="primary" round plain @click="save">保存</el-button>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="3" class="txt">
            操作员
            <span class="xing">*</span>
          </el-col>
          <el-col :span="2" >
            <el-input v-model="form.operatecode" disabled></el-input> 
          </el-col>
          <el-col :span="2" style="padding-left:10px;">
            <el-input v-model="form.operatename" disabled></el-input>
          </el-col>
          <el-col :span="1" class="dian">
            <span @click="dialogVisible3=true">...</span>
          </el-col> -->
          <el-col :span="2" :offset="1" class="txt txtmi">
            经办人
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.handlercode" disabled></el-input>
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.handlername" style="padding-left:10px;" disabled></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgJUserVisible')">...</span>
          </el-col>
          <el-col :span="2" class="txt txtmi">
            出单机构
          </el-col>
          <!-- <el-col :span="2">
            <el-input v-model="form.makecomid" disabled></el-input>
          </el-col> -->
          <el-col :span="4">
            <el-input v-model="form.makecom" disabled></el-input>
          </el-col>
          <!-- <el-col :span="2">
            <el-input v-model="form.makecname" disabled style="padding-left:10px;"></el-input>
          </el-col> -->
          <el-col :span="1" class="dian"> <span @click="isshowdlg('dlgCComVisible')">...</span></el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <el-row>
              <el-col :span="3" style="  text-align: right;">
                <el-checkbox v-model="form.flag">是否默认</el-checkbox>
              </el-col>
              <el-col :span="3" style="  text-align: right;">
                <el-checkbox v-model="form.validstatus" >是否有效</el-checkbox>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </div>
      <v-result ref="result" :config="dgConfig" class="tablebox"></v-result>
    </div>
    <!-- 报价信息配置页面结束 -->
   
    <!-- 机构选择网页对话框的弹窗 -->
     <v-comselect :title="dlgGComTitle" :dlgid="dlgGComId" :dlgvisible.sync="dlgGComVisible"></v-comselect>
    <!-- 归属人弹窗 -->
    <v-userselect :title="dlgGUserTitle" :dlgid="dlgGUserId" :comcode="form.comcode"
                :dlgvisible.sync="dlgGUserVisible" ref="quoteuser"></v-userselect>
    
    <!-- 经办人弹框 -->
    <v-userselect :title="dlgJUserTitle" :dlgid="dlgJUserId" :comcode="form.comcode" ref="quotejuser"
                :dlgvisible.sync="dlgJUserVisible"></v-userselect>
    <!-- 出单机构弹窗 -->
    <v-comselect :title="dlgCComTitle" :dlgid="dlgCComId" :dlgvisible.sync="dlgCComVisible"></v-comselect>
  </div>
</template>

<script>
import result from '@/components/datagrid.vue'
import comselect from '@/views/branchmgr/dlgQuoteCom.vue'
import userselect from '@/views/branchmgr/dlgQuoteUser.vue'
import {getCompanyBusinessnaturePost,updateCompanyBusinessnaturePost} from '@/api/sysmgr.js'
import sumQuoteInfoRouter from '@/router/modules/branchmgr/sumQuoteInfo'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
export default {
  name:'quoteinfo',
  mixins: [mixin,wares],
  data() {
    return {
      sumQuoteInfoRouter:[],
      linklist: ["新增"], //二级Nav信息
      form: {
        comcode:'',
        comcname:'',
        flag:false,
        validstatus:false
      },
      
      dlgGComVisible: false, //机构选择网页对话框的弹窗开关
      dlgGComId:'dlggcomid',
      dlgGComTitle:'归属机构选择',

      dlgCComVisible: false, //出单机构弹窗开关
      dlgCComId:'dlgccomid',
      dlgCComTitle:'出单机构选择',

      dlgGUserVisible: false, //归属人弹窗开款
      dlgGUserId:'handler1code',
      dlgGUserTitle:'归属人选择',

      dlgJUserVisible: false, //经办人开关
      dlgJUserId:'handlercode',
      dlgJUserTitle:'经办人选择',
      
      dgConfig:{
        height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['name','配置名称','',true,false],
          ['comcode','归属部门代码','',true,false],
          ['comcname','归属部门名称','',true,false],
          ['handler1code','归属人工号','',true,false],
          ['handler1name','归属人姓名','',true,false],
          ['handlercode','经办人工号','',true,false],
          ['handlername','经办人姓名','',true,false],
          ['makecom','出单机构','',true,false],
          ['flag','是否默认','',true,true],
          ['validstatus','是否有效','',true,true]
        ],
      //table行按钮：span width
        commands:[
          ['cmdEdit','编辑','40'],
          ['cmdDisable','删除','40']
        ],
        pageSize:5,//每页行数
        pageSizes:[5,10], //每页行数选项
        currentPage:1, //当前页
      },
      channel:[],
      source:[],
      selectdeptitem:{}//保存搜索归属部门的选择项
    };
  },
  components: {
     'v-result':result,
     'v-comselect':comselect,
     'v-userselect':userselect
  },
  mounted () {
    this.sumQuoteInfoRouter=sumQuoteInfoRouter['children']
    for(let i=1;i<this.sumQuoteInfoRouter.length;i++){
      if(this.$parent.isPageOpen(this.sumQuoteInfoRouter[i]['name'])) 
        continue;
      this.$parent.addnav(this.sumQuoteInfoRouter[i])
    }
  },
  activated () {
    this.$parent.linksw(this.linklist)
  },
  methods: {
    //处理导航栏信息的点击事件方法
    infoDao(){
      let target=this.$parent.target;
      if(target=='新增'){
        if(!this.selectdeptitem.comcode){
          this.alert('请选择归属机构')
          return;
        }
        let ocode=this.form.comcode;
        let oname=this.form.comcname;
        this.form={
          flag:false,
          validstatus:false
        };
        this.form.comcode=ocode;
        this.form.comcname=oname;
        this.$refs.quoteuser.dlgquery={};
        this.$refs.quoteuser.depttableData=[];  
        this.$refs.quotejuser.dlgquery={};
        this.$refs.quotejuser.depttableData=[];  
      }
    },
    isshowdlg(value){
      if(!this.selectdeptitem.comcode){
        this.alert('请选择归属机构','提示');
        return;
      }else{
        this[value]=true;
      }
    },
    TransValtoDesc(id,val){
      if(id=='flag')
        return val=='0'?'是':'否'
      else if(id=='validstatus')
        return val=='0'? '有效' :'无效'
    },
    save(){
      let cvals=[
        ['name','配置信息名称不能为空'],
        ['comcode','归属机构不能为空'],
        ['handler1name','归属人信息不能为空'],
        ['handlername','经办人信息不能为空'],
        ['makecom','出单机构不能为空']
      ]
      for(let i=0;i<cvals.length;i++){
        if(!this.form[cvals[i][0]]){
          this.alert(cvals[i][1]);
          return;
        }
      }
      this.$parent.loading=true;      
      let sf=JSON.parse(JSON.stringify(this.form));
      sf.flag=sf.flag?'0':'1'
      sf.validstatus=sf.validstatus?'0':'1'
      console.log(sf.flag);
      // sf.flag?sf.flag-=0:sf.flag=1;
      // sf.validstatus?sf.validstatus-=0:sf.validstatus=1
      // sf.validstatus-=0;
      let param={directquoteinfoconfig:sf};
      updateCompanyBusinessnaturePost(param).then((res)=>{
         if(res.data.status=='0'){
             this.success('保存成功');
             this.$parent.loading=false;
            this.$refs.result.allData=res.data.data;
            this.$refs.result.showTableData();
            // 回写form
            for(let i=0;i<res.data.data.length;i++){
              let qio=res.data.data[i];
              if(qio.modifydata!='1')
                continue;
                for(let key in qio){
                  if(/^[01]$/.test(qio[key])){
                    this.form[key]=qio[key]=='0'?true:false
                  }else{
                    this.form[key]=qio[key]
                  }
                }
              // this.form=qio.map(n=>{
              //   let obj={};
              //   for(key in n){
              //     if(n[key]=='0'){
              //       obj[key]=false
              //     }else if(n[key]=='1'){
              //       obj[key]=true
              //     }else{
              //       obj[key]=n[key]
              //     }
              //   }
              //   return obj;
              // });
              break;
            }
            console.log('updateCompanyBusinessnaturePost form',this.form)
            //回写完毕
         }
         else{
           this.alert('保存失败:'+res.data.statusText)
         }
         this.$nextTick(()=>{
           this.$parent.loading=false;
         })
      }).catch((err)=>{
          console.log(err);
         })
      
    },
    handleClick(row,column,cell,event){
      let target=cell.firstElementChild.firstElementChild.innerHTML;
      console.log(target)
      if(target=='编辑'){
        this.form=JSON.parse(JSON.stringify(row));
        console.log(this.form);
        this.form.flag=this.form.flag==0?true:false;
        this.form.validstatus=this.form.validstatus==0?true:false;
      }else if(target=='删除'){
        this.confirm('确定删除:'+row.name+'吗?', '提示',true).then(()=>{
          this.$parent.loading=true;      
          let sf=JSON.parse(JSON.stringify(row));
          // sf.flag?sf.flag-=0:sf.flag=0;
          // sf.validstatus?sf.validstatus-=0:sf.validstatus=0
          sf['updateflag']='1';//标识是删除还是保存
          // sf.validstatus-=0;
          let param={directquoteinfoconfig:sf};
          updateCompanyBusinessnaturePost(param).then(res=>{
            if(res.data.status=='0'){
              this.success('删除成功');
              this.$parent.loading=false;
              if(this.form.id==row.id){
                this.form={};
                this.form.comcode=row.comcode;
                this.form.comcname=row.comcname;
              }
               this.$refs.result.allData=res.data.data;
              this.$refs.result.showTableData();
            }else{
              this.alert('删除失败'+res.data.statusText);
              this.$parent.loading=false;
            }
          }).catch(err=>{
            console.log(err);
          })
        })
      }
    },
    getQuoteInfo(){
      let param={directquoteinfoconfig:{comcode:this.selectdeptitem.comcode}}
      getCompanyBusinessnaturePost(param).then((res)=>{
        if(res.data.status==0){
          // console.log(this.form);
          // this.form.comcode='123'
          // console.log(this.form);
          //this.$set(this.form,'comcode','123')
          this.$refs.result.allData=res.data.data//?res.data.data:[];
          this.$refs.result.showTableData();
        }
        else{
          this.alert('查询失败:'+res.data.statusText);
          this.$refs.result.allData=[];
        }
      
      }).catch((err)=>{
          console.log(err);
          this.alert('查询异常');
          this.$refs.result.allData=[];
         })
    },
    handleConfirm(sData,dlgid){
      if(dlgid==this.dlgGComId){
        this.dlgGComVisible=false;
        this.form={
          flag:false,
           validstatus:false
        };
        if(sData)
          this.selectdeptitem=sData;//归属机构
        if(Object.keys(this.selectdeptitem).length!=0){
           //只要查询成功了，如果没有任何报价信息，归属机构信息也应该赋值
          this.form.comcode=this.selectdeptitem.comcode;
          this.form.comcname=this.selectdeptitem.comcname;
          this.form.flag=false;
          this.form.validstatus=false;
          this.$refs.quoteuser.dlgquery={};
          this.$refs.quoteuser.depttableData=[];  
          this.$refs.quotejuser.dlgquery={};
          this.$refs.quotejuser.depttableData=[];  
          this.getQuoteInfo();
        }
          
      }
      else if(dlgid==this.dlgCComId){
        this.dlgCComVisible=false; //出单机构
        if(sData){
          this.form.makecname=sData.comcname;
          this.form.makecom=sData.comcode;
        }
      }
      else if(dlgid==this.dlgGUserId){
        this.dlgGUserVisible=false;
        if(sData){
          this.form.handler1code_uni=sData.groupusercode
          this.form.handler1name=sData.username
          this.form.handler1code=sData.usercode
        }
      }
      else if(dlgid==this.dlgJUserId){
        this.dlgJUserVisible=false;
        if(sData){
          this.form.handlercode_uni=sData.groupusercode
          this.form.handlername=sData.username
          this.form.handlercode=sData.usercode
        }
      }
    },
  }
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
/deep/.table-info{
  margin: 20px 20px 10px 20px;
  height: auto;
  height: calc(100vh - 449px);
}
.configurationOfQuoteInformation-main{
  height: 100%;
  /deep/.current-row{
    background-color: @txt_active_color !important;
  }
  margin: 0 @aside_w;
  .form-wrap{
    margin-top: 0;
  }
  .tablebox{
    height: calc(~ "100vh - 378px");
    &::before{
      content: "";
      display: table;
    }
    &::after{
      content: "";
      display: table;
    }
  }
  .dian{
    padding-left: 5px;
    cursor: pointer;
  }
}
</style>
