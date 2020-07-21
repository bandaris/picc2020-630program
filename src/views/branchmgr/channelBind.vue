<template>
  <!-- 报价信息配置页面 -->
  <div class="container">
    <v-loading :loadflag="loadflag"></v-loading>
    <!-- 报价信息配置页面开始 -->
    <div class="configurationOfQuoteInformation-main">
      <div class="box-border">
        <el-row class="row">
          <el-col :span="3" class="txt">
            绑定账号
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.usercode"></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">
            绑定渠道
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.channelbindcodename" placeholder="请选择" clearable >
              <el-option v-for="(item,index) in channelbindlist" :key="index"  :label="item.channelbindcodename" :value="item.channelbindcode"></el-option>
            </el-select>
          </el-col>

          <el-col :span="2" class="txt txtmi" :offset="1">
            业务来源
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.businessnaturename" placeholder="请选择" clearable >
              
            </el-select>
          </el-col>
          <!-- <el-col :offset="1" :span="1">
            <el-button size="mini" type="primary" round plain @click="save">保存</el-button>
          </el-col> -->
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
            归属部门
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.comcode"></el-input>
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.comcname" style="padding-left:10px;"></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="dlgGComVisible=true">...</span>
          </el-col>
          <el-col :span="2" class="txt txtmi">
            归属人
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.handler1code"></el-input>
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.handler1name" style="padding-left:10px;"></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgGUserVisible')">...</span>
          </el-col>
          <el-col :span="2" class="txt txtmi" >
            渠道名称
          </el-col>
           <el-col :span="4">
            <el-input v-model="form.agentname" ></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgCHannerVisible')">...</span>
          </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="3" class="txt txtmi">
            操作员
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.operatecode"></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgOPerateVisible')">...</span>
          </el-col>
          <el-col :span="2"  class="txt txtmi">
            经办人
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.handlername"></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgJUserVisible')">...</span>
          </el-col>
          <el-col :span="2" class="txt" >
            出单机构
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.makecom"></el-input>
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.makecname" style="padding-left:10px;"></el-input>
          </el-col>
          <el-col class="dian" :span="1">
            <span @click="isshowdlg('dlgCComVisible')">...</span>
          </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="3" class="txt txtmi">
            配置名称
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="2"  class="txt" :offset="1">
            险种代码
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.riskcode"></el-input>
          </el-col>
          <el-col :span="4" :offset="3" class="txt" >
              <el-row style="margin:0">
                <el-col :span="10" style="text-align: right;">
                    <el-checkbox v-model="form.flag">是否默认</el-checkbox>
                </el-col>
                <el-col :span="10" style="  text-align: right;" :offset="3">
                    <el-checkbox v-model="form.validstatus" >是否有效</el-checkbox>
                </el-col>
              </el-row>
          </el-col>
        </el-row>
        <el-row class="row">
            <el-col :span="3" class="txt">
            SAM设备编码
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.samcode"></el-input>
          </el-col>
          <el-col :span="2">
              北分专属
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

    <!-- 操作员弹框 -->
    <v-userselect :title="dlgOPerateTitle" :dlgid="dlgOPerateId" :comcode="form.comcode" ref="operate"
                :dlgvisible.sync="dlgOPerateVisible"></v-userselect>
    <!-- 出单机构弹窗 -->
    <v-comselect :title="dlgCComTitle" :dlgid="dlgCComId" :dlgvisible.sync="dlgCComVisible"></v-comselect>

    <!-- 渠道名称弹出框 -->
    <v-channel :businessnature="form.businessnature" :title="dlgCHannerTitle" :dlgid="dlgCHannerId" :comcode="form.comcode" :dlgvisible.sync="dlgCHannerVisible"></v-channel>
  </div>
</template>

<script>
import loading from '@/components/loading'
import lu from '@/utils/loginUser'
import result from '@/components/datagrid.vue'
import comselect from '@/views/branchmgr/dlgQuoteCom.vue'
import userselect from '@/views/branchmgr/dlgQuoteUser.vue'
import channel from '@/views/branchmgr/dlgchannel.vue'
import {sendPriceDatapost,getPriceInfoPost} from '@/api/sysmgr.js'
import sumQuoteInfoRouter from '@/router/modules/branchmgr/sumQuoteInfo'
import mixin from './mixins/index'
import wares from '@u/mixinWares'
export default {
  name:'channelBind',
  mixins: [mixin,wares],
  data() {
    return {
      loadflag:false,
      sumQuoteInfoRouter:[],
      linklist: ["新增",'修改','重置'], //二级Nav信息
      channelbindlist:[],//绑定渠道列表
      form: {
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


      dlgOPerateVisible: false, //操作员开关
      dlgOPerateId:'operatecode',
      dlgOPerateTitle:'操作员选择',
      

      dlgCHannerVisible:false,//渠道名称弹出框
      dlgCHannerId:'channel',
      dlgCHannerTitle:'渠道名称选择',
      dgConfig:{
        height:'100%', //table高度
        select:false, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns:[
          ['name','配置名称','',true,false],
          ['channelbindcodename','绑定渠道','',true,false],
          ['comcode','归属部门代码','',true,false],
          ['comcname','归属部门名称','',true,false],
          ['handler1code_uni','归属人集团工号','',true,false],
          ['handler1name','归属人姓名','',true,false],//
          ['handlercode','经办人工号','',true,false],//
          ['handlername','经办人姓名','',true,false],//
          ['operatecode_uni','操作员集团代码','',true,false],//
          ['operatecode','操作员名称','',true,false],//
          ['businessnaturename','业务来源','',true,false],//
          ['agentname','渠道名称','',true,false],//
          ['makecom','出单机构','',true,false],//
          ['riskcode','险种代码','',true,false],//
          ['flag','是否默认','',true,true],//
          ['validstatus','是否有效','',true,true],//
        ],
      //table行按钮：span width
        commands:[
          ['cmdDisable','删除','40'],
          ['cmdEdit','编辑','40'],
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
     'v-userselect':userselect,
     'v-channel':channel,
     'v-loading':loading
  },
  mounted () {
    this.InitData();
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
      if(target=='重置'){
        let list=['usercode','channelbindcodename','businessnaturename','riskcode']
          for(let key in this.form){
            if(list.includes(key)) continue;
            this.form[key]='';
          }
      }else{
        let obj=this.form;
        for(let key in obj){
          if(key=='samcode') continue;
          if(obj[key]===''){
            this.fail('请填写必填项');
            return ;
          }
        }
        if(target=='新增'){
          let param=JSON.parse(JSON.stringify(this.form));
          if(param.id) delete param.id
          this.getQuoteInfo(param);
        }else if(target=='修改'){
          let param=JSON.parse(JSON.stringify(this.form));
          this.getQuoteInfo(param);
        }
      }
    },
    //初始化数据
    InitData(){
      this.loadflag=true;
    getPriceInfoPost({}).then(res=>{
       let rdata=res.data;
      if(rdata.status==0){
        this.loadflag=false;
        let target=res.data.data.DataRecord;
        for(let i=0;i<target.length;i++){
          if(target[i].agentcode){
            this.form.usercode=target[i].usercode;
            this.form.channelbindcodename=target[i].channelbindcodename
            this.form.businessnaturename=target[i].businessnaturename;
            this.form.riskcode=target[i].riskcode
            this.$refs.result.allData.push(target[i])
            this.$refs.result.showTableData()
          }else{
            this.channelbindlist.push(target[i])
          }
        }
        console.log(this.channelbindlist);
      }else{
        this.fail('操作失败'+rdata.statusText)
      }
    }).catch(err=>{
      console.log(err)
    })
    },
    isshowdlg(value){
      console.log(value);
      if(!this.form.usercode){
        this.alert('请绑定营销工号','提示');
        return;
      }
      if(!this.selectdeptitem.comcode){
        this.alert('请选择归属机构','提示');
        return;
      }
      if(value=='dlgCHannerVisible'){
        this.alert('请选择业务来源','提示');
        return;
      }
      this[value]=true;
    },
    getQuoteInfo(params){
      sendPriceDatapost(params).then(res=>{
         if(res.data.status==0){
          this.$refs.result.allData=res.data.data//?res.data.data:[];
          this.$refs.result.showTableData();
        }
        else{
          this.fail('保存失败:'+res.data.statusText);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    TransValtoDesc(id,val){
      if(id=='flag')
        return val=='0'?'是':'否'
      else if(id=='validstatus')
        return val=='0'? '有效' :'无效'
    },
    handleClick(row,column,cell,event){
      let target=cell.firstElementChild.firstElementChild.innerHTML;
      console.log(target)
      if(target=='编辑'){
        let form=JSON.parse(JSON.stringify(row));
        for(let key in this.form){
          this.form[key]=form[key]
        }
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
          sendPriceDatapost(param).then(res=>{
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
    handleConfirm(sData,dlgid){
      console.log(sData,dlgid)
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
          // this.getQuoteInfo();
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
      }else if(dlgid==this.dlgOPerateId){
        this.dlgOPerateVisible=false;
        if(sData){
          this.form.operatecode=sData.username
        }
      }else if(dlgid==this.dlgCHannerId){
        this.dlgCHannerVisible=false;
        if(sData){
          this.form.agentname=sData.agentname;
        }
      }
    },
  }
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
/deep/.table-info{
  margin: 20px 0 10px 0;
  height: auto;
  height: calc(100vh - 450px);
}
/deep/.box-border{
    margin-top: 0;
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
    height: calc(~ "100vh - 378px") !important;
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
