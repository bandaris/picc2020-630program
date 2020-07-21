<template>
  <div class="container">
    <v-loading msg="正在加载中" :loadflag="loadingTestShow"></v-loading>
    <!--主导航栏结束-->
    <!-- 落地部门页面开始 -->
    <div class="circle box-border fl">
      <div class="listOfcompanies">
        <tree ref="tree"  :config="config"></tree>
      </div>
    </div> 
    <div class="fr box">
     <!-- <div v-show="loadingTestShow" class="picc-loading picc-loading_text">
        <p>
          <i class="el-icon-loading"/>正在加载信息
        </p>
      </div> -->
      <div class="landingDepartment-main">
        
        <!-- 部门信息表单 -->
        <p class="title-style">
          <span></span>
          <b>部门信息</b>
        </p>
        <div class="form-grop">
          <!-- 表单域开始 -->
          <div style="display:block">
            <div class="form-box">
              <div class="forms">
                <el-form :model="form">
                  <el-row class="row">
                    <el-col   :span="3" class="txt">机构号</el-col>
                    <el-col :span="4">
                      <el-input size="mini" disabled  v-model="form.company.comcode" clearable maxlength="8" type="text"></el-input>
                    </el-col>
                    <el-col :span="3"  class="txt">机构名称</el-col>
                    <el-col :span="4">
                      <el-input size="mini" disabled v-model="form.company.comcname" clearable maxlength="128" type="text"></el-input>
                    </el-col>
                    <el-col :span="3"  class="txt">出单机构</el-col>
                    <el-col :span="4">
                      <el-select v-model="form.deptext.flag" disabled>
                        <el-option label="是" value="LD"></el-option>
                        <el-option label="否" value=""></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :offset="1" :span="2" class="txt">见费出单</el-col>
                    <el-col :span="4">
                      <el-select size="mini" v-model="form.deptext.payfirst" clearable>
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :offset="0" :span="3" class="txt">机构联系电话</el-col>
                    <el-col :span="4">
                        <el-input
                          size="mini"
                          clearable
                          v-model="form.deptext.phone"
                          type="text"
                          maxlength="32"
                        ></el-input>
                    </el-col>
                    <el-col :offset="0" :span="3" class="txt">接收短信手机</el-col>
                    <el-col :span="4">
                      <el-input size="mini" clearable v-model="form.deptext.msgphone" type></el-input>
                    </el-col>
                  </el-row>
                  <el-row class="row">
                    <el-col :offset="0" :span="3" class="txt">配送短信电话</el-col>
                    <el-col :span="4">
                      <el-input size="mini" clearable v-model="form.deptext.sendphone" type></el-input>
                    </el-col>
                    <el-col :offset="0" :span="3" class="txt">引导电销审核</el-col>
                    <el-col :span="4">
                      <el-select size="mini" v-model="form.deptext.checkflag" clearable>
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :offset="0" :span="3" class="txt">订单提醒短信</el-col>
                    <el-col :span="4">
                      <el-select size="mini" v-model="form.deptext.orderremindmsg" clearable>
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <!-- 额外展开的表单 -->
                  <div class="row-last" v-if="isDownOpen">
                    <el-row>
                    <el-col :offset="0" :span="3" class="txt">落地配送短信</el-col>
                    <el-col :span="4">
                      <el-select size="mini" v-model="form.deptext.sendflag" clearable>
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                      </el-select>
                    </el-col>
                      <el-col :offset="0" :span="3" class="txt">上门提醒短信</el-col>
                      <el-col :span="4">
                        <el-select size="mini" v-model="form.deptext.visitordermsg " clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="1" :span="2" class="txt">电销管控</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.insurcontrolflag" clearable @change="toggleinsurcontrolflag">
                          <el-option v-for="(item,index) in optioninsurcontrolflag" :key="index" :label="item.dicttext" :value="item.dictvalue"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">管控次数</el-col>

                      <el-col :span="4">
                          <el-input
                            size="mini"
                            clearable
                            v-model="form.deptext.checknumber"
                            type="text"
                            maxlength="32"
                            :disabled="checknumberdisabled"
                          ></el-input>
                      </el-col>
                      <el-col :offset="1" :span="2" class="txt">管控天数</el-col>
                      <el-col :span="4">
                        <el-input size="mini" :disabled="checkdaysdisabled" v-model="form.deptext.checkdays" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">管控通话时长</el-col>
                      <el-col :span="4">
                          <el-input size="mini" :disabled="checktalklength" v-model="form.deptext.checktalklength" clearable type="text"></el-input>
                        <!-- <el-input placeholder size="mini" v-model="form.deptext.guankongtonghuashichang"></el-input> -->
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col  :span="3" class="txt">管控95518</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.check95518" clearable :disabled="flagdisabled">
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">呼入95518号码</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.chg95518" clearable :disabled="flagdisabled">
                          <el-option label="可变更" value="Y"></el-option>
                          <el-option label="不可变更" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">批改管控号码</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.amendinsurphone" clearable :disabled="flagdisabled">
                          <el-option label="可批改" value="Y"></el-option>
                          <el-option label="不可批改" value="N"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="1" :span="2" class="txt">汇款账号</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.accountno" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">汇款账户名称</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.accountname" clearable></el-input>
                      </el-col>
                      <el-col  :span="3" class="txt">账户开户行</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.accountbank" clearable></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="1" :span="2" class="txt">交叉销售</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.crosssaleflag" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">投诉手机</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.wfphone" clearable></el-input>
                      </el-col>
                      <el-col :offset="1" :span="2" class="txt">二次促成</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.stepflag" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">机构联系地址</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.addr" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">收费时间管控</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.offeredtime_flag" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="1" :span="2" class="txt">管控阀值</el-col>
                      <el-col :span="4">
                        <el-input v-model="form.deptext.offeredtime_val"  placeholder="请输入正整数">
                        </el-input>
                        <!-- <el-input size="mini" v-model="form.deptext.offeredtime_val" clearable></el-input> -->
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="1" :span="2" class="txt">服务电话</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.servicephn" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">定时配送</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.timingdeliver" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="4" class="txt">保单机构赋订单机构</el-col>
                      <el-col :span="3">
                        <el-select sizi="mini" v-model="form.deptext.cbranchcode" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">前置续保短信</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.msg_preposition" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <!-- <el-col :offset="0" :span="3" class="txt">自动整合</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.automerge ">
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col> -->
                      <el-col :offset="0" :span="3" class="txt">续保短信提前日</el-col>
                      <el-col :span="4">
                          <el-input size="mini" v-model="form.deptext.msg_advance" type="text" clearable></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">引导续保短信</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.msg_guide" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="4" class="txt">车险管家导入开始日</el-col>
                      <el-col :span="3">
                        <el-input size="mini" v-model="form.deptext.ikimpstartdt" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">结束日（包含）</el-col>
                      <el-col :span="4">
                        <el-input v-model="form.deptext.ikimpenddt" clearable></el-input>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">应首次拨打时间</el-col>
                      <el-col :span="4">
                        <el-input v-model="form.deptext.fcalltime"  placeholder="请输入正整数">
                        </el-input>
                      </el-col>
                      <el-col :offset="1" :span="2" class="txt">报价时间</el-col>
                      <el-col :span="4">
                        <el-input v-model="form.deptext.quotetime"  placeholder="请输入正整数" >
                        </el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">跟进到期日区间</el-col>
                      <el-col :span="4">
                        <el-input v-model="form.deptext.followedt"  placeholder="请输入正整数" >
                        </el-input>
                        <!-- <el-input size="mini" v-model="form.deptext.followedt" clearable></el-input> -->
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">订单打印份数</el-col>
                      <el-col :span="4">
                        <el-input size="mini" v-model="form.deptext.pirntcopies" clearable></el-input>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">发票类型</el-col>
                      <el-col :span="4">
                        <el-select size="mini" v-model="form.deptext.showinvoicetype" clearable>
                          <el-option label="纸质发票和电子发票" value="PE"></el-option>
                          <el-option label="纸质发票" value="P"></el-option>
                          <el-option label="电子发票" value="E"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">默认发票类型</el-col>
                      <el-col :span="4">
                        <!-- <el-input size="mini" v-model="form.deptext.defaultInvoiceType" placeholder=""></el-input> -->
                        <el-select size="mini" v-model="form.deptext.defaultinvoicetype" clearable>
                          <el-option label="纸质发票" value="P"></el-option>
                          <el-option label="电子发票" value="E"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="4" class="txt" style="font-size:12px">地面电销服务团队号码屏蔽</el-col>
                      <el-col :span="3">
                        <el-select sizi="mini" v-model="form.deptext.teamnumberscreen" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <!-- <el-col  :span="3" class="txt">分公司回写</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" disabled v-model="form.deptext.branchback" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col> -->
                      <el-col :offset="0" :span="4" class="txt">是否开启电子社保</el-col>
                      <el-col :span="3">
                        <el-select sizi="mini" v-model="form.deptext.einsur" clearable>
                          <el-option label="开启" value="Y"></el-option>
                          <el-option label="关闭" value="N"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="0" :span="3" class="txt">获真电话配置</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.wbphoneconfig" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <!-- <el-col :offset="0" :span="3" class="txt">支付方式管控</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.data">
                          <el-option label="WAP支付" value="开启"></el-option>
                          <el-option label="微信支付" value="关闭"></el-option>
                          <el-option label="WAP支付和微信支付" value="WAP支付和微信支付"></el-option>
                          <el-option label="WAP支付和微信支付均不显示" value="WAP支付和微信支付均不显示"></el-option>
                        </el-select>
                      </el-col> -->
                      <el-col :offset="0" :span="3" class="txt">智能外呼</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" disabled v-model="form.deptext.outcall" clearable>
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :offset="1" :span="2" class="txt">自动整合</el-col>
                      <el-col :span="4">
                        <el-select sizi="mini" v-model="form.deptext.automerge" @change="changeAutomerge" clearable placeholder="请选择">
                          <el-option label="是" value="Y"></el-option>
                          <el-option label="否" value="N"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :offset="0" :span="3" class="txt">结束数据时间</el-col>
                      <el-col :span="3">
                        <el-input :disabled="form.deptext.automerge!='Y'" @input="change($event)" v-model="form.deptext.enddatatime" placeholder="0">
                        </el-input>
                      </el-col>
                      <el-col :span="1" class="txt" style="text-align: center">天</el-col>
                      <el-col :offset="0" :span="4" class="txt">生成保单数据时间</el-col>
                      <el-col :span="2">
                      <el-input :disabled="form.deptext.automerge!='Y'" @input="change($event)" v-model="form.deptext.policytime" placeholder="0">
                        </el-input>
                      </el-col>
                      <el-col :span="1" class="txt" style="text-align: center">天</el-col>
                    </el-row>
                    <el-row>
                    </el-row>
                  </div>
                  <div class="open-down" :class="{isActive:isDownOpen}">
                    <span @click="open">展开</span>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
          <!-- 表单域结束 -->
        </div>
      
        <!-- 快捷登录第三代业务系统表单 -->
        <expandableList title="快捷登录第三代业务系统">
          <div class="form1">
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">三代打印地址</el-col>
              <el-col :offset="0" :span="20">
                <el-input size="mini" type="text" v-model="form.deptext.policyprint_url"></el-input>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">三代见费地址</el-col>
              <el-col :offset="0" :span="20">
                <el-input size="mini" type="text" v-model="form.deptext.jf_url"></el-input>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">商业险单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.commercialtype"></el-input>
              </el-col>
              <el-col :offset="0" :span="6" class="txt">交强险保险标志打印单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.compulsoryprinttype"></el-input>
              </el-col>
            </el-row>
            <el-row class="row" :span="24">
              <el-col :offset="0" :span="4" class="txt">交强险单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.compulsorytype"></el-input>
              </el-col>
              <el-col :offset="0" :span="6" class="txt">意外单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.accidenttype"></el-input>
              </el-col>
            </el-row>
            <el-row class="row" :span="24">
              <el-col :offset="0" :span="4" class="txt">保险卡证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.insurancecardtype"></el-input>
              </el-col>
              <el-col :offset="0" :span="6" class="txt">机动车延保险单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.extendtype"></el-input>
              </el-col>
            </el-row>
            <el-row class="row" :span="24">
              <el-col :offset="0" :span="4" class="txt">随车行李险单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.luggagetype"></el-input>
              </el-col>
              <el-col :offset="0" :span="6" class="txt">如意行驾乘人员意外险单证类型</el-col>
              <el-col :offset="0" :span="7">
                <el-input size="mini" type="text" v-model="form.deptext.easydrivetype"></el-input>
              </el-col>
            </el-row>
          </div>
        </expandableList>
        <!-- 上报数据自动生成队列 -->
        <expandableList title="上报数据自动生成队列">
          <div class="form-auto">
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">按数据质量分析</el-col>
              <el-col :offset="0" :span="7">
                <el-select size="mini" v-model="form.deptext.dataqualitysplit">
                  <el-option label="继承上级" value=""></el-option>
                  <el-option label="是" value="Y"></el-option>
                  <el-option label="否" value="N"></el-option>
                </el-select>
              </el-col>
              <el-col :offset="0" :span="6" class="txt">阀值</el-col>
              <el-col :offset="0" :span="6">
                 <el-input :disabled="form.deptext.dataqualitysplit!='Y'"  v-model="form.deptext.splitrange" placeholder="请输入1-99之间的整数">
                  </el-input>
                  <!-- <el-input size="mini" type="number" :disabled="form.deptext.dataqualitysplit!='Y'" :max="99" v-model="form.deptext.splitrange" placeholder="请输入整数"  :min="1"></el-input> -->
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">自动生成队列</el-col>
              <el-col :offset="0" :span="7">
                <el-select size="mini" v-model="form.deptext.dul_buildqueue">
                  <el-option label="继承上级" value=""></el-option>
                  <el-option label="是" value="Y"></el-option>
                  <el-option label="否" value="N"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="table-auto">
            <el-table
            ref="extdultable"
            :data="resetdeptextdulinfo"
            class="picc-table picc-table-normal picc-table-1st-col-icon table-select"
            height="200"
            @select="resettabledata"
            @select-all="resettabledata"
            >
              <el-table-column type="selection" width="70"></el-table-column>
              <el-table-column label="上报数据类型" align="center" prop="dicttext"></el-table-column>
              <el-table-column label="客户信息除重" prop="imp_emnrep">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.imp_emnrep">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="保单信息除重" prop="imp_insurrep">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.imp_insurrep">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="本年批次除重" prop="imp_syearrep">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.imp_syearrep">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="屏蔽规则除重" prop="imp_masklistimport">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.imp_masklistimport">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="号码可为空" prop="imp_phoneis">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.imp_phoneis">
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </expandableList>
        <!-- 是否剔除黑名单 -->
        <expandableList title="是否剔除黑名单">
          <div class="form3">
            <el-row class="row">
              <el-col :offset="0" :span="4" class="txt">是否剔除黑名单</el-col>
              <el-col :offset="0" :span="7">
                <el-select size="mini" v-model="form.deptext.blacklisttype">
                  <el-option label="继承上级" value=""></el-option>
                  <el-option label="是" value="Y"></el-option>
                  <el-option label="否" value="N"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <el-table 
          ref="multipleTable"
            :data="blacktabledata"
            @select="changeuploadinfodata"
            @select-all="changeuploadinfodata"
            class="picc-table picc-table-normal picc-table-selectable single-table"
            height="572"
            :header-cell-style="headClass"
            style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="上报数据类型" prop="dicttext" ></el-table-column>       
          </el-table>
        </expandableList>
        <!-- 底部表格区域 -->
        <!-- <div class="bottom-table clearfix">
          <div class="left p">
            <p class="title-style">
              <span></span>
              <b>落地人员</b>
            </p>
            <div class="box-border">
              <el-table
                :data="landtableData"
                height="173"
                style="width: 100%"
                class="picc-table picc-table-normal picc-table-1st-col-icon"
                @cell-click="servantaperateinfo"
              >
                <el-table-column prop="number" label="用户工号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column width="40" align="center">
                  <span style="cursor:pointer;color:#1c61fc">编辑</span>
                </el-table-column>
                <el-table-column width="40" align="center">
                  <span style="cursor:pointer;color:#1c61fc">失效</span>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="right p">
            <p class="title-style">
              <span></span>
              <b>送单人员</b>
            </p>
            <div class="box-border">
              <el-table
                :data="tableData"
                height="173"
                style="width: 100%"
                class="picc-table picc-table-normal picc-table-1st-col-icon"
              >
                <el-table-column prop="date" label="送单员工号"></el-table-column>
                <el-table-column prop="date" label="送单员姓名"></el-table-column>
                <el-table-column prop="date" label="送单员联系电话"></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="right p"  style="width:100%">
            <p class="title-style">
              <span></span>
              <b>服务人员</b>
            </p>
            <div class="box-border">
              <el-table
                :data="ServicetableData"
                height="173"
                style="width: 100%"
                class="picc-table picc-table-normal picc-table-1st-col-icon"
                @cell-click="aperateinfo"
              >
                <el-table-column prop="serviceNumber" label="服务人员工号"></el-table-column>
                <el-table-column prop="serviceName" label="服务人员姓名"></el-table-column>
                <el-table-column prop="servicePhone" label="服务人员联系电话"></el-table-column>
                <el-table-column width="40" align="center">
                  <span style="cursor:pointer;color:#1c61fc">编辑</span>
                </el-table-column>
                <el-table-column width="40" align="center">
                  <span style="cursor:pointer;color:#1c61fc">失效</span>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 落地部门页面结束 -->
  </div>
</template>

<script>
import vchecker from '@u/vChecker'
import {getCompanyTSPropPost,updateCompanyTSPropPost,loadDataDictPost} from '@/api/sysmgr'
import expandableList from "@/components/expandableList"; //可展开列表插件
import mixin from './mixins/branch'
import wares from '@u/mixinWares'
import tree from "@/components/treeBranch"; //树形控件
import lu from "@/utils/loginUser"; //vuex
export default {
  name: "branchManager",
  mixins: [mixin,wares],
  data() {
    return {
      node:{},//保存从tree组件传递来的对象
      ServicetableData:[],//服务人员数据
      deptextblackinfo:[],//是否剔除黑名单显示的数据
      blacktabledata:[],
      //linklist:['新建落地机构','删除落地机构','保存落地机构','新建落地用户','新建送单员','新建服务人员'],
      linklist:['保存落地机构'],
      isDownOpen: false, //额外展开更多的开关
      departmentInformationForm: {}, //部门信息表单
      config:{//配置树的配置项
        showCheckbox:false,
        isShowIcon:true,
        isLazy:true,
        rootNode:[{comcode:'10000000',comcname:'总公司'}]
      },
      loadingTestShow:false,
      //表格模拟数据
      tableData: [
      ],
      //表单数据
      form: {
       company:{},
       deptext:{
         enddatatime:'',
         policytime:'',
         splitrange:''
       }
      },
      optioninsurcontrolflag:[],
      landtableData:[],
      tableinfodata:[],
      resetdeptextdulinfo:[],
      deptextdulinfo:[],
      flagdisabled:false,//标识电销管控的选择与禁用input输入框
      checknumberdisabled:false,//管控次数的输入框的禁用与否
      checkdaysdisabled:false,//管控天数的输入框的禁用与否
      checktalklength:false//管控通话时长输入框的禁用与否
    };
  },
  mounted() {
    this.getStatinfo()
  },
  activated () {
    this.$parent.linksw(this.linklist)
  },
  components: {
    expandableList,
    tree
  },
  methods: {
    resettabledata(options){//格式化表格内容
     this.deptextdulinfo=options;
    },
    headClass () {
      return 'text-align: center;'
    },
    changeuploadinfodata(option){
      this.deptextblackinfo=option;
      console.log(option);
    },
    //获取静态数据
    getStatinfo(){
      let oret=lu.getStaticInfo(['uploaddatatype','insurcontrolflag']);
      let nitems=oret.nitems;
      if(nitems.length==0){
        this.blacktabledata=oret['uploaddatatype'].options;
        this.optioninsurcontrolflag=oret['insurcontrolflag'].options;
        this.setdeptextdulinfo(this.blacktabledata);
      }
      else{
        loadDataDictPost(nitems).then((res)=>{
          lu.setStaticInfo=res.data.data;
          oret=lu.getStaticInfo(['uploaddatatype','insurcontrolflag']);
          this.blacktabledata=oret['uploaddatatype']?oret['uploaddatatype'].options:[];
          this.optioninsurcontrolflag=oret['insurcontrolflag']?oret['insurcontrolflag'].options:[];
          this.setdeptextdulinfo(this.blacktabledata);
        }).catch((err)=>{console.log(err);})
      }
    },
    setdeptextdulinfo(options){
      if(options.length==0) return;
      let arr=[];
      for(let i=0;i<options.length;i++){
        let obj={};
        Object.assign(obj,{
          'uploaddatatype':options[i].dictvalue,
          'dicttext':options[i].dicttext,
          'imp_emnrep':'Y',
          'imp_insurrep':'N',
          'imp_syearrep':'N',
          'imp_masklistimport':'N',
          'imp_phoneisnull':'N'
        })
        arr.push(obj);
      }
      this.resetdeptextdulinfo=arr;
    },
    servantaperateinfo(row, column, cell, event){
      let target=cell.firstElementChild.firstElementChild
      console.log(target);
      if(target&&target.innerHTML=="编辑"){
          if(this.$parent.isPageOpen('visiblebranch')){
            this.alert('当前有正在修改的落地,请关闭再试','提示')
            return 
          }
          let obj=row;
          obj['branch']=this.form.comcname;
          this.openPage('visiblebranch',obj,row.name);
      }else if(target&&target.innerHTML=="失效"){
         this.warning('确定落地人员'+row.name+'失效吗?','提示').then(()=>{
           let tabledata=this.landtableData;
           for(var i=0;i<tabledata.length;i++){
             if(tabledata[i].name!=row.name) continue
             this.landtableData.splice(i,1);
           }
           this.alert('用户失效成功','提示','success')
         })
      }
    },
    aperateinfo(row, column, cell, event){
      let target=cell.firstElementChild.firstElementChild
      if(target&&target.innerHTML=="编辑"){
          if(this.$parent.isPageOpen('branchEdit')){
            this.alert('当前有正在修改的服务人员,请关闭再试','提示')
            return 
          }
          this.openPage('branchEdit',row,row.serviceName);
      }else if(target&&target.innerHTML=="失效"){
         this.warning('确定服务人员'+row.serviceName+'失效吗?','提示').then(()=>{
           let tabledata=this.ServicetableData;
           for(var i=0;i<tabledata.length;i++){
             if(tabledata[i].serviceName!=row.serviceName) continue
             this.ServicetableData.splice(i,1);
           }
           this.alert('用户失效成功','提示','success')
         })
      }
    },
    getCompanyInfo(node){
      this.$refs.extdultable.clearSelection();
      this.$refs.multipleTable.clearSelection();
      this.setdeptextdulinfo(this.blacktabledata);
      this.node=node;
      let param={deptext:{deptcode:node.comcode}}
      this.loadingTestShow=true;
      getCompanyTSPropPost(param).then((res)=>{

        console.log('res.data.data.company',res.data.data.company)
        this.form.company=res.data.data.company;
        console.log('this.form.company',this.form.company)
        console.log('res.data.data.deptext',res.data.data.deptext)
        this.form.deptext=res.data.data.deptext||{deptcode:this.form.company.comcode};
        console.log('this.form.deptext',this.form.deptext)
        if(res.data.data.deptext){
          console.log('res.data.data.deptext.automerge',res.data.data.deptext.automerge)
          console.log('res.data.data.deptext.enddatatime',res.data.data.deptext.enddatatime)
          console.log('res.data.data.deptext.policytime',res.data.data.deptext.policytime)
        }
        if(res.data.data.deptext.enddatatime===0)
          this.form.deptext.enddatatime=res.data.data.deptext.enddatatime
        else
          this.form.deptext.enddatatime=res.data.data.deptext.enddatatime||'';
        
        if(this.form.deptext.policytime===0)
          this.form.deptext.policytime=res.data.data.deptext.policytime
        else
          this.form.deptext.policytime=res.data.data.deptext.policytime||'';
        
        console.log('this.form',this.form)
        this.deptextdulinfo=res.data.data.deptextdulinfo.map((n)=>{
          let obj={};
            for(let key in n){
              obj[key]=n[key]||'N'
            }
            return obj;
        });
        // this.activauploadertable(this.deptextdulinfo,this.resetdeptextdulinfo,'extdultable')
        this.resetextdulinfo(this.deptextdulinfo)
        this.deptextblackinfo=res.data.data.deptextblackinfo
        // this.activauploadertable(this.deptextblackinfo,this.blacktabledata,'multipleTable')
        this.setblacktable(this.deptextblackinfo)
        this.$nextTick(()=>{
          this.loadingTestShow=false;
        })
      }).catch((err)=>{
          console.log(err);
          this.loadingTestShow=false;
         })
    },
    setblacktable(arr){
      for(let i=0;i<arr.length;i++){
        let target=this.blacktabledata.find(n=>(n.dictvalue==arr[i]['uploaddatatype']||n.uploaddatatype==arr[i]['uploaddatatype']))
        this.$refs.multipleTable.toggleRowSelection(target)
      }
    },
    resetextdulinfo(arr){
      for(let i=0;i<arr.length;i++){
        let target=this.resetdeptextdulinfo.find(n=>n.uploaddatatype==arr[i]['uploaddatatype'])
        let index=this.resetdeptextdulinfo.findIndex(n=>n.uploaddatatype==arr[i]['uploaddatatype'])
        this.$refs.extdultable.toggleRowSelection(target);
        for(let key in arr[i]){
          if(!this.resetdeptextdulinfo[index]) 
            continue;
          this.resetdeptextdulinfo[index][key]=arr[i][key]||'N'
        }
      }
    },
    infoDao(){
       let target=this.$parent.target;
       if(target=="新建落地机构"){
         console.log(this.node);
         if(!this.node.comcname){
           this.alert('请先选择一个落地部门在进行追加','提示');
           return;
         }
          for(let key in this.form.company){
            this.form.company[key]=''
          }
          // for(let key in this.form.deptext){
          //   this.form.deptext[key]=''
          // }
          this.$refs['multipleTable'].clearSelection();
           this.deptextblackinfo=[];
         this.ServicetableData=[];
         this.landtableData=[];
       }else if(target=="删除落地机构"){
         if(this.node.comcname&&!this.node.children){
           this.confirm('确定删除'+this.node.comcname+"机构吗?",'删除落地机构').then(()=>{
              console.log('删除成功');
           })
         }else{
           this.alert('请选择要删除没有子选项的机构','删除失败')
         }
       }else if(target=='保存落地机构'){
         if(!this.node.comcname){
            this.alert('请先选择待修改保存的落地部门','保存失败')
            return;
         }
         let param=this.form
         param['deptextblackinfo']=[];
         console.log(this.deptextblackinfo);
        for(let i=0;i<this.deptextblackinfo.length;i++){
          let obj={};
          obj['deptcode']=this.form.company.comcode;
          obj['uploaddatatype']=this.deptextblackinfo[i].dictvalue||this.deptextblackinfo[i].uploaddatatype;
          param['deptextblackinfo'].push(obj);
        }
        console.log(param['deptextblackinfo'])
        param['deptextdulinfo']=[];
        for(let i=0;i<this.deptextdulinfo.length;i++){
          let obj={};
          // obj['deptcode']=this.form.company.comcode;
          // obj['uploaddatatype']=this.deptextblackinfo[i].uploaddatatype;
          Object.assign(obj,{
            deptcode:this.form.company.comcode,
            ...this.deptextdulinfo[i]
          })
          param['deptextdulinfo'].push(obj);
        }
         //除基本信息deptext外，暂未添加...
         let list=[
           {'机构号':'comcode'},
           {'机构名称':'comcname'}
         ]
         for(let i=0;i<list.length;i++){
           if(!this.form.company[Object.values(list[i])[0]]){
             this.alert(`${Object.keys(list[i])[0]}不能为空`,'提示');
             return;
           }
         }
         let issend=this.test(param);
         if(issend){
           console.log(param);
           this.loadingTestShow=true;
         updateCompanyTSPropPost(param).then((res)=>{
            if(res.data.status!='0'){
              this.alert(res.data.statusText,'保存失败');
              this.loadingTestShow=false;
              return;
            }
            this.alert('保存成功')
            this.loadingTestShow=false;
            this.form.company=res.data.data.company;
            this.form.deptext=res.data.data.deptext;
            // this.ServicetableData=res.data.data.tableData
            // this.landtableData=res.data.data.landtableData;
            // this.$refs.tree.addtreebatch(this.form.company,this.node);
            }).catch((err)=>{
              console.log(err);
              this.loadingTestShow=false;
            })
          }
       }else if(target=="新建落地用户"){
          if(!this.node.comcname){
            this.alert('请先选择一个部门','新建失败')
          }else{
            this.openPage('branchNew',this.node)
          }
       }else if(target=='新建送单员'){
         if(!this.node.comcname){
           this.alert('请先选择一个部门','新建失败')
         }else{
           this.openPage('senderNew',this.node);
         }
       }else if(target=="新建服务人员"){
         if(!this.node.comcname){
           this.alert('请先选择一个部门','新建失败')
         }else{
           this.openPage('servantNew',this.node);
         }
       }
    },
    open(e) {
      if (this.isDownOpen) {
        this.isDownOpen = false;
        e.target.innerHTML = "展开";
        e.target.style.backgroundImage = `url(${require("./../../assets/image/downBox.png")})`;
      } else {
        e.target.innerHTML = "收起";
        e.target.style.backgroundImage = `url(${require("./../../assets/image/upBox.png")})`;
        this.isDownOpen = true;
      }
    },
    change(e){
      this.$forceUpdate()
    },
    //验证的方法
    test(obj){
      let target=obj.deptext;
      if(target.automerge=='Y'){
        if(target.enddatatime===''){
          this.alert('请设置结束数据时间','提示')
          return false;
        }
        if(target.policytime===''){
          this.alert('请设置生成保单数据时间','提示')
          return false;
        }
        if((target.policytime=='')&&(target.enddatatime=='')){
          this.alert('请设置结束数据时间和生成保单数据时间','提示')
          return false;
        }
        if(!this.IsInteger(target.policytime)||!this.IsInteger(target.enddatatime)){
          this.alert('设置的结束数据时间或生成保单数据时间不是正整数','提示')
          return false
        }
      }
      if(target.insurcontrolflag=='1'||target.insurcontrolflag=='3'){
        let n=target.checknumber,d=target.checkdays;
        if((n=='')||(d=='')){
          this.alert('请设置管控天数和管控次数','提示');
          return false
        }
        if((parseInt(n)<=0)||(parseInt(d)<=0)){
          this.alert('请设置大于0的管控天数和管控次数。','提示');
          return false
        }
      }
      console.log('1 target.dataqualitysplit',target.dataqualitysplit)
      console.log('2 target.splitrange',target.splitrange)
      if(target.dataqualitysplit=='Y'){
        if(target.splitrange==''){
          this.alert('阀值不允许为空','提示')
          return false;
        }
        if(!/^[1-9]\d?$/g.test(target.splitrange)){
          this.alert('阀值应为大于0小于100的正整数','提示')
          return false;
        }
      }
      //console.log('3',!/^[1-9]\d?$/g.test(target.splitrange))
      if(target.offeredtime_flag=='Y'&&target.offeredtime_val===''){
        this.alert('请输入预约时间管控阀值.','提示');
        return false;
      }
      if(target.offeredtime_val&&this.IsInteger(target.offeredtime_val)===false){
        this.alert('预约时间管控阀值不是正整数.','提示');
        return false;
      }
      if(target.fcalltime&&this.IsInteger(target.fcalltime)===false){
        this.alert('【应首次拨打时间】需要输入正整数.','提示');
        return false;
      }
      if(target.quotetime&&this.IsInteger(target.quotetime)===false){
        this.alert('【报价时间】需要输入正整数','提示');
        return false;
      }
      if(target.followedt&&this.IsInteger(target.followedt)===false){
        this.alert('【跟进到期日区间】需要输入正整数.','提示');
        return false;
      }
      if(target.insurcontrolflag=='2'||target.insurcontrolflag=='3'){
        let t=target.checktalklength
        if(Number.parseInt(t)<0){
          this.alert('请设置大于0的管控通话时长','提示')
          return false;
        }
      }
      let ikimpstartdt=Number.parseInt(target.ikimpstartdt),ikimpenddt=Number.parseInt(target.ikimpenddt);
      if(ikimpstartdt && ikimpenddt && ikimpenddt <= ikimpstartdt){
        this.alert('车险管家批量导入结束时间应晚于开始时间','提示')
        return false;
      }
      if(obj.deptextdulinfo.length<=0&&target.dul_buildqueue=='Y'){
        this.alert('请配置上报数据生成队列参数','提示');
        return false;
      }
      if(target.blacklisttype==''&&target.comcode=='10000000'){
        this.alert('剔除黑名单功能，总部不可以选择继承上一级','提示');
        return false
      }
      if(obj.deptextblackinfo.length<=0&&target.blacklisttype=='Y'){
        this.alert('请选择要剔除黑名单的上报数据类型','提示');
        return false;
      }
        return true;
    },
    IsInteger(value){
      return /^[+]{0,1}(\d+)$/.test(value);
    },
    //自动整合切换select
    changeAutomerge(v){
      if(v=='Y'){
         this.form.deptext.enddatatime=90;
         this.form.deptext.policytime=0;
      }
      else{
         this.form.deptext.enddatatime='';
         this.form.deptext.policytime='';
      }
    },
    toggleinsurcontrolflag(value){
        if(value==''){
        this.form.deptext.checknumber='';
        this.form.deptext.checkdays='';
        this.form.deptext.checktalklength='';
      }else if(value=='0'){
        this.form.deptext.checknumber='';
        this.form.deptext.checkdays='';
        this.form.deptext.checktalklength='';
      }else if(value=='1'){
        this.form.deptext.checknumber=5;
        this.form.deptext.checkdays=90;
        this.form.deptext.checktalklength='';
      }else if(value=='2'){
        this.form.deptext.checktalklength=90;
        this.form.deptext.checknumber='';
        this.form.deptext.checkdays='';
      }else if(value=='3'){
        this.form.deptext.checknumber=5;
        this.form.deptext.checkdays=90;
        this.form.deptext.checktalklength=90;
      }
    }

  },
  watch: {
    // 'form.deptext.automerge'(newvalue,oldvalue){
    //   if(newvalue=='Y'){
    //     this.form.deptext.enddatatime=90;
    //     this.form.deptext.policytime=0;
    //   }else{
    //     this.form.deptext.enddatatime='';
    //     this.form.deptext.policytime='';
    //   }
    // },
    'form.deptext.insurcontrolflag'(newvalue,oldvalue){
        if(newvalue==''){
        this.flagdisabled=true;
        this.checknumberdisabled=true;
        this.checkdaysdisabled=true;
        this.checktalklength=true;
      }else if(newvalue=='0'){
        this.flagdisabled=true;
        this.checknumberdisabled=true;
        this.checkdaysdisabled=true;
        this.checktalklength=true;
        
      }else if(newvalue=='1'){
        this.flagdisabled=false;
        this.checknumberdisabled=false;
        this.checkdaysdisabled=false;
        this.checktalklength=true;
      }else if(newvalue=='2'){
        this.checknumberdisabled=true;
        this.checkdaysdisabled=true;
        this.checktalklength=false;
        this.flagdisabled=false;
      }else if(newvalue=='3'){
        this.flagdisabled=false;
        this.checknumberdisabled=false;
      this.checkdaysdisabled=false;
      this.checktalklength=false
      }
    },
    'form.deptext.dataqualitysplit'(newvalue,oldvalue){
      if(newvalue==''||newvalue=='N'){
        this.form.deptext.splitrange='';
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
.box{
  height: 100%;
  position: relative;
  overflow: hidden;
    width: calc(~"100% - 268px");

}
/deep/.table-select .el-input__inner{
  border: none;
}
//落地部门包裹
.container{
.circle{
  height: calc(~"100vh - 167px");
  position: relative;
  overflow-y: auto;
  margin-top: 0;
  width: 247px;
  margin-bottom: @aside_w;
  margin-left:@aside_w;
    .treeBox{
      position: absolute;
    }
}
  //落地部门页面
  .landingDepartment-main {
    margin: 0 @aside_w;
    overflow: auto;
    box-sizing: border-box;
    overflow-x: hidden;
    padding-bottom:@aside_w;
    height:100%;
    //部门表单
    .form-grop {
      margin: 15px 0;
      .form-box {
        .open-down {
          line-height: 35px;
          text-align: center;
          span {
            color: #66697b;
            padding-right: 15px;
            background: url("./../../assets/image/downBox.png") no-repeat right
              center;
            cursor: pointer;
          }
        }
        .isActive {
          background-color: #f7f8fd;
        }
      }
    }    
  }
}
.right{
  margin-top: 15px;
}
/deep/.picc-table.picc-table-selectable tr th:first-child .cell,/deep/.picc-table.picc-table-selectable tr td:first-child .cell{
  padding: 0 8px 0 24px;
}
</style>