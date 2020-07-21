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
                    <el-col :span="1"  class="txt" style="color:#e6390e">
                      <span style="display:inline-block;width:59px">重要客户</span>
                      </el-col>
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
                        <el-col :span="3" :offset="1">
                        <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="1"> 
                            <el-input placeholder=""  maxlength="8"  size="mini" v-model="form.uformat"></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-input placeholder=""  maxlength="32"  size="mini" v-model="form.uformat"></el-input>
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
    <elasticFrame/>
 </div>
</template>

<script>
import elasticFrame from './elasticFrame'
import datagrid from '@c/datagrid.vue'
import wares from '@u/mixinWares'
import mixin from './mixins/index'

export default {
  name: "customerFrame",
  mixins: [mixin,wares],
  props: [""],
  data () {
    return {
        height:false,
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
    
    };
 },

 components: {
   elasticFrame,
   datagrid
 },

 computed: {},

 activated() {},

 mounted() {
  
 },

 methods: {
    open(e){
        if(this.isDownOpen){
            this.isDownOpen=false;
            e.target.innerHTML="展开";
            e.target.style.backgroundImage=`url(${require('../../assets/image/downBox.png')})`
        }else{
            e.target.innerHTML="收起";
            e.target.style.backgroundImage=`url(${require('../../assets/image/upBox.png')})`
            this.isDownOpen=true;
        }
    },
    // showhistory(){
    //   this.height=!this.height
    // },
    // togglehistory(e){
    //     if(e.target.nodeName=='LI'){
    //         let sibling=e.target.parentNode.childNodes;
    //   sibling.forEach(n=>{
    //       n.className=''
    //   })
    //   e.target.className='histroylistactive'
    //   switch(e.target.innerHTML){
    //     case '联系历史' :
    //       this.historyconfig.columns=[
    //          ['','联系时间','',true,false],
    //          ['','再次联系时间','',true,false],
    //          ['','来源','',true,false],
    //          ['','联系类型','',true,false],
    //          ['','振铃时长','',true,false],
    //          ['','联系结果','',true,false],
    //          ['','工号','',true,false],
    //          ['','组别','',true,false],
    //          ['','主叫','',true,false],
    //          ['','被叫','',true,false],
    //          ['','是否接通','',true,false],
    //          ['','互动','',true,false],
    //          ['','跟进车辆','',true,false],
    //          ['','销售阶段','',true,false],
    //          ['','业务处理','',true,false],
    //          ['','转接原因','',true,false],
    //          ['','备注','',true,false],
    //          ['','录音','',true,false],
    //          ['','相关问卷','',true,false],
    //          ['','二次促成类型','',true,false],
    //       ]
    //     break;
    //     case '微信对话历史':
    //       this.historyconfig.columns=[
    //          ['','联系日期','',true,false],
    //          ['','车牌号','',true,false],
    //          ['','坐席工号','',true,false],
    //          ['','组别','',true,false],
    //       ]
    //       break;
    //     case '投保历史':
    //       this.historyconfig.columns=[
    //          ['','投保日期','',true,false],
    //          ['','核保通过时间','',true,false],
    //          ['','投保单号/团单协议号','',true,false],
    //          ['','保单号','',true,false],
    //          ['','起保日期','',true,false],
    //          ['','终保日期','',true,false],
    //          ['','机构号','',true,false],
    //          ['','状态','',true,false],
    //          ['','状态日期','',true,false],
    //          ['','创建人','',true,false],
    //          ['','双录状态','',true,false],
    //          ['','配送状态','',true,false],
    //          ['','订单号','',true,false],
    //          ['','网电融合业务','',true,false],
    //          ['','电子保单','',true,false],
    //          ['','意外险投保情况','',true,false],
    //          ['','涉农标志','',true,false],
    //          ['','投保类型','',true,false],
    //       ]
    //   }
    //   }
    // }
 },

 watch: {}

 }

</script>
<style lang='less' scoped>
  @import url('./../../styles/index');
  .container{
    padding: 0 20px;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .box{
        height: calc(100vh - 167px);
        overflow: auto;
        //  flex: 3;
    }
  }
  .open-down {
            line-height: 35px;
            text-align: center;
            span {
              color: #66697b;
              padding-right: 15px;
              background: url("../../assets/image/downBox.png") no-repeat right
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
          
          .histroylist{
            overflow: hidden;
            li{
              float: left;
              margin: 10px 10px;
              font-size: 12px;
              .el-button{
                  min-width: 66px;
                  height: 21px;
              }
              cursor: pointer;
              position: relative;
              &:last-of-type{
                  float: right;
              }
            }
            .histroylistactive{
            &::before{
              content: "";
              position: absolute;
              width: 100%;
              height: 3px;
              background-color: #f00;
              border-radius: 2px;
              top: 19px;
            }
          }
          }



//****----- */
.historybox{
    flex: 0;
    overflow: auto;
    transition: flex 300ms linear;
}
.height{
    flex: 2;
}
.historybox>div:nth-of-type(1){
    height: 100%;
}
</style>