<template>
 <div class="container">
     <div class="box">
        <div class="user-info">
            <p class="title-style">
                <span></span>
                <b>个人基本信息</b>
            </p>
            <div class="forms">
                    <el-row class="row">
                    <el-col :offset="1" :span="2" class="txt">客户编号</el-col>
                    <el-col :span="4">
                        <el-input size="mini"  v-model="form.deptcode"></el-input>
                    </el-col>
                    <el-col :span="2" :offset="1" class="txt txtmi">姓名</el-col>
                    <el-col :span="4">
                        <el-input size="mini" v-model.trim="form.deptname" maxlength="20"></el-input>
                    </el-col>
                    <el-col :span="1"  class="txt" style="color:#e6390e">重要客户</el-col>
                    <el-col :span="2"  class="txt txtmi">性别</el-col>
                    <el-col :span="4">
                        <el-input size="mini" v-model.trim="form.acdgroup" maxlength="20" clearable></el-input>
                    </el-col>
                    </el-row>
                    <el-row class="row">
                    <el-col :offset="1" :span="2" class="txt txtmi">证件类型</el-col>
                    <el-col :span="4">
                        <el-input size="mini" v-model.trim="form.acdgroup" maxlength="20" clearable></el-input>
                    </el-col>
                    <el-col :span="2" :offset="1" class="txt txtmi">证件号码</el-col>
                    <el-col :span="4">
                        <el-input size="mini" v-model.trim="form.acdgroup" maxlength="20" clearable></el-input>
                    </el-col>
                    <el-col :span="1" class="txt" style="padding-left:10px">
                        <el-button type="primary" size="mini" style="min-width:61px">ECIF</el-button>
                    </el-col>
                    <el-col :span="2"  class="txt">邮政编码</el-col>
                    <el-col :span="4">
                        <el-input size="mini" v-model.trim="form.acdgroup" maxlength="20" clearable></el-input>
                    </el-col>
                    </el-row>
                    <el-row class="row">
                        <el-col :offset="1" :span="2" class="txt txtmi">省/市/县</el-col>
                        <el-col :span="3">
                            <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                        <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2"> 
                            <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="2">
                            <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2" :offset="1" class="txt">备注</el-col>
                        <el-col :span="18">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-col>
                    </el-row>
                    <!-- 额外展开的表单 -->
                    <el-row class="row row-last" v-if="isDownOpen">
                        <el-col :offset="1" :span="2" class="txt">机构号</el-col>
                        <el-col :span="4">
                            <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        
                        <el-col :offset="1" :span="2" class="txt">白名单</el-col>
                        <el-col :span="4">
                            <el-select size="mini" v-model="form.insurrepeat" clearable>
                            <el-option label="是" value="Y"></el-option>
                            <el-option label="否" value="N"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :offset="1" :span="2" class="txt">客户归属</el-col>
                        <el-col :span="4">
                        <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                    </el-row>
                    <div class="open-down" :class="{isActive:isDownOpen}">
                    <span @click="open">展开</span>
                    </div>
                </div>
        </div>
        <div class="contact">
            <p class="title-style">
                <span></span>
                <b>联系方式</b>
                <i>失联外呼</i>
                <i>失联外呼历史</i>
                <i>无效电话</i>
                <i>追加</i>
            </p>
            <div class="box-border">
                    <datagrid :showpage="false" :config="contactconfig"></datagrid>
                </div>
        </div>
        <div class="cars-info">
            <p class="title-style">
                <span></span>
                <b>车辆信息</b>
                <i>无效车辆</i>
                <i>追加</i>
            </p>
            <div class="box-border">
                    <datagrid :showpage="false" :config="carconfig"></datagrid>
                </div>
                
        </div>
     </div>
    <ul class="histroylist" @click="togglehistory">
    <li>联系历史</li>
    <li>微信对话历史</li>
    <li>投保历史</li>
    <li>事件历史</li>
    <li>试算历史</li>
    <li>分配历史</li>
    <li>工单历史</li>
    <li>错误件历史</li>
    <li>短信历史</li>
    <li>回访历史</li>
    <li>家电延保历史</li>
    <li>传真历史</li>
    <li>邮件历史</li>
    <li>智能外呼详情</li>
    <li><el-button size="mini" round type="primary" @click="showhistory" class="fl">{{height?'隐藏':'展开'}}</el-button></li>
    </ul>
     <div class="historybox" :class="height?'height':''">
        <datagrid :showpage="false" :config="historyconfig"></datagrid>
    </div>
   <!-- <el-drawer
   size="50%"
   direction="btt"
  :visible.sync="drawer"
  :modal="false"
  :with-header="false">
    <ul class="histroylist" @click="togglehistory">
      <li>联系历史</li>
      <li>微信对话历史</li>
      <li>投保历史</li>
      <li>事件历史</li>
      <li>试算历史</li>
      <li>分配历史</li>
      <li>工单历史</li>
      <li>错误件历史</li>
      <li>短信历史</li>
      <li>回访历史</li>
      <li>家电延保历史</li>
      <li>传真历史</li>
      <li>邮件历史</li>
      <li>智能外呼详情</li>
  </ul>
    <datagrid :showpage="false" :config="historyconfig"></datagrid>
   </el-drawer> -->
 </div>
</template>

<script>
import datagrid from '@c/datagrid.vue'
import drawer from './customerInfotest2'
 export default {
 name:'',
 props:[''],
 data () {
 return {
     height:false,
   drawer:false,
   form:{},
   isDownOpen:false,
   contactconfig:{
     height:170,
     select:false,
     columns:[
        ['','电话类型','',true,false],
         ['','区号','',true,false],
         ['','号码','',true,false],
         ['','联系人姓名','',true,false],
         ['','车主关系','',true,false],
         ['','重要联络人','',true,false],
         ['','禁播名单','',true,false],
         ['','有效性','',true,false],
         ['','来源','',true,false],
         ['','创建者','',true,false],
         ['','创建时间','',true,false],
         ['','真实度','',true,false],
    ],
    commands:[
      ],
   },
   carconfig:{
     height:170,
     select:false,
     columns:[
        ['','车型代码','',true,false],
         ['','厂牌型号','',true,false],
         ['','车牌号','',true,false],
         ['','发动机号','',true,false],
         ['','车架号','',true,false],
         ['','初登日期','',true,false],
         ['','商业险终保日期','',true,false],
         ['','交强险终保日期','',true,false],

    ],
    commands:[
      ],
   },
   historyconfig:{
     height:'100%',
     select:false,
     columns:[
       

    ],
    commands:[
      ],
   }
 };
 },

 components: {
   datagrid,
   drawer
 },

 computed: {},

 beforeMount() {},

 mounted() {
  
 },

 methods: {
  open(e){
        if(this.isDownOpen){
            this.isDownOpen=false;
            e.target.innerHTML="展开";
            e.target.style.backgroundImage=`url(${require('./../assets/image/downBox.png')})`
        }else{
            e.target.innerHTML="收起";
            e.target.style.backgroundImage=`url(${require('./../assets/image/upBox.png')})`
            this.isDownOpen=true;
        }
    },
    showhistory(){
      // this.drawer=true
      this.height=!this.height
    },
    togglehistory(e){
        if(e.target.nodeName=='LI'){
            let sibling=e.target.parentNode.childNodes;
      sibling.forEach(n=>{
          n.className=''
      })
      e.target.className='histroylistactive'
      switch(e.target.innerHTML){
        case '联系历史' :
          this.historyconfig.columns=[
             ['','联系时间','',true,false],
             ['','再次联系时间','',true,false],
             ['','来源','',true,false],
             ['','联系类型','',true,false],
             ['','振铃时长','',true,false],
             ['','联系结果','',true,false],
             ['','工号','',true,false],
             ['','组别','',true,false],
             ['','主叫','',true,false],
             ['','被叫','',true,false],
             ['','是否接通','',true,false],
             ['','互动','',true,false],
             ['','跟进车辆','',true,false],
             ['','销售阶段','',true,false],
             ['','业务处理','',true,false],
             ['','转接原因','',true,false],
             ['','备注','',true,false],
             ['','录音','',true,false],
             ['','相关问卷','',true,false],
             ['','二次促成类型','',true,false],
          ]
        break;
        case '微信对话历史':
          this.historyconfig.columns=[
             ['','联系日期','',true,false],
             ['','车牌号','',true,false],
             ['','坐席工号','',true,false],
             ['','组别','',true,false],
          ]
          break;
        case '投保历史':
          this.historyconfig.columns=[
             ['','投保日期','',true,false],
             ['','核保通过时间','',true,false],
             ['','投保单号/团单协议号','',true,false],
             ['','保单号','',true,false],
             ['','起保日期','',true,false],
             ['','终保日期','',true,false],
             ['','机构号','',true,false],
             ['','状态','',true,false],
             ['','状态日期','',true,false],
             ['','创建人','',true,false],
             ['','双录状态','',true,false],
             ['','配送状态','',true,false],
             ['','订单号','',true,false],
             ['','网电融合业务','',true,false],
             ['','电子保单','',true,false],
             ['','意外险投保情况','',true,false],
             ['','涉农标志','',true,false],
             ['','投保类型','',true,false],
          ]
      }
      }
    }
 },

 watch: {}

 }

</script>
<style lang='less' scoped>
  @import url('./../styles/index');
  .container{
    padding: 0 20px;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .box{
        overflow: auto;
        flex: 3;
    }
  }
  .open-down {
            line-height: 35px;
            text-align: center;
            span {
              color: #66697b;
              padding-right: 15px;
              background: url("./../assets/image/downBox.png") no-repeat right
                center;
              cursor: pointer;
            }
          }
          .isActive {
            background-color: #f7f8fd;
          }
          /deep/.table-info{
            margin: 0 0 0 0;
          }
          
         



//****----- */
.historybox{
    flex: 0;
    overflow: auto;
    transition: flex 300ms linear;
    // display: flex;
    // flex-direction: column;

}
.height{
    flex: 2;
    // height: 100%;
    // animation: identifier 500ms linear;
}
    .historybox>div:nth-of-type(1){
        height: 100%;
            // @media screen and (max-width: 1400px) and (min-width: 1360px) {
            //     height: calc(~"100vh - 481px");
            // }
            // @media screen and (max-width: 1680px) and (min-width: 1441px) {
                
            //     height: calc(~"100vh - 546px");
            // }
            // @media screen and (max-width: 1960px) and (min-width: 1681px) {
                
            //     height: calc(~"100vh - 672px");
            // }
    
}
</style>