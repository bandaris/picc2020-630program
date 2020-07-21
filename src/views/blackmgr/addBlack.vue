<template>
  <!-- 禁拨名单追加 -->
  <div class="container">
    <!-- 顶部表单 -->
    <div class="top-form">
      <el-row class="row">
        <el-col :span="2" class="txt txtmi">电话号码</el-col>
        <el-col :span="5">
          <el-input v-model="form.phone" @blur="BlurCheck('电话号码')"></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt">客户编号</el-col>
        <el-col :span="5">
          <el-input v-model="form.customercode" @blur="BlurCheck('客户编号')"></el-input>
        </el-col>
        <el-col :offset="1" :span="2" class="txt txtmi">禁拨名单类型</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.btype">
            <el-option label="黑名单" value="B"></el-option>
            <el-option label="代理人" value="D"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="2" class="txt">起始日期</el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="form.startdt"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :span="2" class="txt" :offset="1">截止日期</el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="form.validdt"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col :span="2" class="txt txtmi" :offset="1">机构代码</el-col>
        <el-col :span="5">
          <el-input v-model="form.branchcode" @blur="BlurCheck('机构代码')"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="2" class="txt txtmi">号码类别</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.ptype">
            <el-option label="电话" value="1"></el-option>
            <el-option label="身份证" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="1" class="txt">备注</el-col>
        <el-col :span="5">
          <el-input v-model="form.remark" @blur="BlurCheck('备注')"></el-input>
        </el-col>
        <el-col :span="2" :offset="1" class="txt txtmi">拨打类型</el-col>
        <el-col :span="5">
          <el-select size="mini" v-model="form.type">
            <el-option label="禁拨" value="0"></el-option>
            <el-option label="慎拨" value="1"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import lu from '@/utils/loginUser';
import mixin from './mixins/black';
import wares from '@u/mixinWares';
import { saveBlackList } from "@/api/csrdata"; //导入http请求方法
export default {
  name: 'addBlack',
  mixins: [mixin, wares],
  data() {
    return {
      linklist: ['保存', '关闭'],//右侧导航栏
      form: {},//顶部表单
    }
  },
  methods: {
    BlurCheck() { },
    infoDao() {//导航栏方法
      let target = this.$parent.target;
      switch (target) {
        case '保存': {
          let isAbleSave = false
          !this.form.phone ? this.alert('号码为空无法提交！', '提示') :
            !this.form.btype ? this.alert('请选择禁拨名单类型！', '提示') :
              !this.form.branchcode ? this.alert('请选输入机构代码！', '提示') :
                !this.form.ptype ? this.alert('请选择号码类别！', '提示') :
                  !this.form.type ? this.alert('请选择拨打类型！', '提示') :
                    this.form.type == '1' ? (!this.form.remark ? this.alert('拨打类型为慎拨时，备注信息不可为空！', '提示') : isAbleSave = true) : isAbleSave = true;
          if (!isAbleSave) { return }
          else {
            this.confirm('是否保存对禁拨名单信息的修改？', '提示').then(() => {
              let param = this.form;
              param.attr = {
                deptcode: lu.userinfo.deptcode
              }
              saveBlackList(this.form).then(res => {
                res.data.status == 0 ? (this.success('保存成功', '确定').then(() => {
                  this.closePage()
                })) : this.alert('保存失败', '提示')
              }).catch(err => {
                console.log(err);
              })
            }).catch((err) => { console.log(err); })

          }
        } break;
        case '关闭': {
          this.closePage();
        } break;
      }
    },
  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
}
</script>

<style lang="less">
@import url("./../../styles/index");
</style>