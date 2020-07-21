<template>
  <div class="container">
    <div class="form-grop">
      <div class="forms">
        <el-row class="row">
          <el-col :offset="1" :span="2" class="txt">坐席姓名</el-col>
          <el-col :span="4">
            <el-input
              placeholder="模糊查询请使用%"
              size="mini"
              v-model.trim="form.username"
              type="text"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">工号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.userid" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">所属部门</el-col>
          <el-col :span="4" class="department">
            <el-input size="mini" v-model="form.deptname" disabled></el-input>
          </el-col>
          <el-col :span="1" class="suo-shu">
            <div @click="dlgDeptTreeSingleVisible=true">
              <img src="./../../assets/image/subordinateIcon.png" alt style="cursor:pointer" />
            </div>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="1" :span="2" class="txt">职务类别</el-col>
          <el-col :span="4">
            <el-select v-model="form.posttype" placeholder="请选择" clearable>
              <el-option
                :label="item.dicttext"
                :value="item.dictvalue"
                v-for="(item,index) in jobType"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">创建时间</el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="transdate"
              unlink-panels
              clearable
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">用户类型</el-col>
          <el-col :span="4">
            <el-select v-model="form.recflag" placeholder="请选择" clearable>
              <el-option
                :label="item.dicttext"
                :value="item.dictvalue"
                v-for="(item,index) in recflagall"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="1" :span="2" class="txt">分机号</el-col>
          <el-col :span="4">
            <el-input size="mini" v-model.trim="form.agentid" placeholder="模糊查询请使用%" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">身份证号</el-col>
          <el-col :span="4">
            <el-input size="moni" v-model.trim="form.idno" clearable></el-input>
          </el-col>
          <el-col :span="2" :offset="1" class="txt">销售类型</el-col>
          <el-col :span="4">
            <el-select v-model="form.saletype" placeholder="请选择" clearable>
              <el-option
                :label="item.dicttext"
                :value="item.dictvalue"
                v-for="(item,index) in forSale"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- <el-row v-if="isDownOpen">
        </el-row>-->
        <!-- <div class="open-down">
            <span @click="open">展开</span>
        </div>-->
      </div>
    </div>
    <v-result ref="result" :config="dgConfig" :showpage="true" style="height:calc(100vh - 386px)"></v-result>
    <v-dlgDeptTreeSingle :dlgvisible.sync="dlgDeptTreeSingleVisible" dlgid="seldept" treeType="S"></v-dlgDeptTreeSingle>
    <v-dlgTransTreeSingle :dlgvisible.sync="transDeptTreeVisible" dlgid="transdept"></v-dlgTransTreeSingle>
    <v-dlgUserTransGroup :dlgvisible.sync="userTransGroupVisible" :transinfo="transinfo"></v-dlgUserTransGroup>
  </div>
</template>

<script>
import { queryUserPost, enableUserPost, disableUserPost, loadDataDictPost } from '@/api/sysmgr.js'
import lu from '@/utils/loginUser'
import wares from '@u/mixinWares'
import mixin from './mixins/index'
import result from '@/components/datagrid.vue'
//import dlgDeptTreeSingle from '@/views/agentmgr/dlgDeptTreeSingle'
import dlgDeptTreeSingle from '@c/dlgDeptTree'
import dlgUserTransGroup from '@/views/agentmgr/dlgUserTransGroup'

export default {
  name: 'userSearch',
  props: [''],
  mixins: [mixin, wares],
  data() {
    return {
      loading: true,
      staticinfo: [],//保存静态数据
      forSale: [],//销售类型
      recflagall: [],//用户类型
      jobType: [],//职务类别


      grop: null,//保存选择的组
      config: {
        showCheckbox: true,//是否启用多选框默认显示
        isShowIcon: false,//是否显示label前的小图标默认是不显示
        isLazy: true,//是否懒加载默认不是
        isradio: true//是否单选
      },
      dgConfig: {
        height: '100%', //table高度
        select: true, //是否可以选择
        //table展示列：prop label width show-overflow-tooltip formatter
        columns: [
          ['userid', '工号', '', true, false],
          ['username', '姓名', '50', true, false],
          ['agentid', 'CIT分机号', '', true, false],
          ['deptname', '所属部门', '', true, false],
          ['saletype', '销售类型', '', true, true],
          ['pbinduserid', '关联工号', '', true, false],
          ['idno', '身份证号', '200', true, false],
          ['mobile', '手机号码', '', true, false],
          ['posttype', '职务类别', '', true, true],
          ['insert_time_for_his', '工号开通时间', '', true, false]
        ],
        //table行按钮：span width
        commands: [
          ['cmdEdit', '编辑', '40'],
          ['cmdDisable', '失效', '40'],
          ['cmdEnable', '生效', '40']
        ],
        pageSize: 10,//每页行数
        pageSizes: [5, 10], //每页行数选项
        currentPage: 1, //当前页
        requestCurData: true
      },
      dialogVisibleb: false,
      dlgDeptTreeSingleVisible: false,
      transDeptTreeVisible: false,
      userTransGroupVisible: false,
      selTransDept: {}, //转组时所选择组的信息
      transinfo: [],

      //isDownOpen:false,
      form: {
        username: '',
        userid: '',
        deptcode: '',
        deptname: '',
        posttype: '',
        recflag: '',
        agentid: '',
        idno: '',
        saletype: '',
        startdt: '',
        enddt: ''
      },
      transdate: [],//保存日期选择器的初始值和结尾值
      formdisplay: {

      },
      tabIndex: 0,
      tableData1: {
        voList: []
      },
      linklist: ['信息导出', '查询', '转组', '清空', '关闭']
    };
  },
  components: {
    'v-result': result,
    "v-dlgDeptTreeSingle": dlgDeptTreeSingle,
    "v-dlgTransTreeSingle": dlgDeptTreeSingle,
    'v-dlgUserTransGroup': dlgUserTransGroup
  },

  mounted() {
    this.getStatinfo();
    //  document.querySelector('.department').onclick=function(){
    //    this.getdepartment();
    //  }.bind(this);
  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
  methods: {
    getStatinfo() {
      let oret = lu.getStaticInfo(['saletype_all', 'recflagall', 'posttype']);
      let nitems = oret.nitems;
      if (nitems.length == 0) {
        this.forSale = oret['saletype_all'].options;
        this.recflagall = oret['recflagall'].options;
        this.jobType = oret['posttype'].options;
      }
      else {
        loadDataDictPost(nitems).then((res) => {
          lu.setStaticInfo = res.data.data;
          oret = lu.getStaticInfo(['saletype_all', 'recflagall', 'posttype']);
          this.forSale = oret['saletype_all'].options;
          this.recflagall = oret['recflagall'].options;
          this.jobType = oret['posttype'].options;
        }).catch((err) => { console.log(err); })
      }
    },
    TransValtoDesc(id, val) {
      let mar = [];
      if (id == 'saletype')
        mar = this.forSale.find(item => item.dictvalue == val)
      if (id == 'posttype')
        mar = this.jobType.find(item => item.dictvalue == val)

      if (mar)
        return mar['dicttext']
      else
        return val;
    },

    addDeptData(sdata, dlgid) {
      if (dlgid == 'transdept') {
        //转组选择工作需要的回调函数
        this.selTransDept.deptcode = sdata.deptcode ? sdata.deptcode : '';
        this.selTransDept.deptname = sdata.deptname ? sdata.deptname : '';
        this.transDeptTreeVisible = false
        this.userTransGroupVisible = true;

        this.transinfo = this.$refs.result.selection.map(item => {
          return {
            userid: item.userid,
            username: item.username,
            olddeptname: item.deptname,
            newdeptname: sdata.deptname,
            taskrecontact: 'Y',
            taskunconnect: 'N',
            taskuncontact: 'N',
            delmanagegroup: 'N',
          }
        })
      }
      else {
        //所属组的选择回调函数
        this.form.deptcode = sdata.deptcode ? sdata.deptcode : '';
        this.form.deptname = sdata.deptname ? sdata.deptname : '';
        this.dlgDeptTreeSingleVisible = false;
      }
    },
    handleClick(row, column, cell, event) {
      let target = cell.firstElementChild.firstElementChild;
      if (target.innerHTML == "编辑") {
        if (this.$parent.isPageOpen('userEdit')) {
          this.alert('当前有正在编辑的人员,请关闭再试!', '提示')
          return;
        }
        if (row.recflag == 'X') {
          this.alert('此座席处于失效状态,不能进行编辑操作.请先点击相应生效按钮，再进行编辑操作。', '提示')
          return;
        }
        else if (row.usertype != 'E') {
          this.alert('非电销坐席类型人员无法进入坐席编辑页面', '提示')
          return;
        }
        this.openPage('userEdit', row, row.username);
      } else if (target.innerHTML == "失效") {
        this.confirm('确定设置用户:' + row.userid + '失效吗?', '提示').then(() => {
          let reqo = {};
          reqo['user'] = [{ userid: row.userid }]
          console.log('row', row);
          console.log('reqo', reqo);
          disableUserPost(reqo).then((res) => {
            let rdata = res.data;
            if (rdata.status == "0") {
              //this.$message('操作成功!')
              this.success('操作成功')
            }
            else
              this.fail('操作失败' + rdata.statusText)

          }).catch((err) => {
            console.log(err);
          })
        })
      } else if (target.innerHTML == "生效") {
        this.confirm('确定设置用户:' + row.userid + '生效吗?', '提示').then(() => {
          let reqo = {};
          reqo['user'] = [{ userid: row.userid }]
          console.log('row', row);
          console.log('reqo', reqo);
          enableUserPost(reqo).then((res) => {
            let rdata = res.data;
            if (rdata.status == "0") {
              this.success('操作成功!')
            }
            else
              this.fail('操作失败' + rdata.statusText)

          }).catch((err) => {
            console.log(err);
          })
        })
      }
    },
    export2Excel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['工号', '姓名', 'CIT分级号', '所属部门', '销售类型', '关联工号', '身份证号', '手机号码', '职务类别', '工号开通时间'];
        const filterVal = ['userid', 'username', 'extensionNumner', 'deptname', 'saletype', 'relevanceWorking', 'idno', 'phoneNumber', 'posttype', 'insert_time_for_his'];
        const list = this.$refs.result.selection;
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户信息列表',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j == 'saletype' || j == 'posttype')
          return this.TransValtoDesc(j, v[j])
        else
          return v[j]
      }))
    },
    infoDao() {
      let target = this.$parent.target;
      if (target == "信息导出") {
        if (this.$refs.result.selection.length == 0) {
          this.alert('请选择要导出的信息', '导出失败')
        } else {
          this.export2Excel();
        }
      } else if (target == "转组") {
        if (this.$refs.result.selection.length > 0) {
          this.diaTitle = "用户转组";
          this.transDeptTreeVisible = true;
        } else {
          this.alert('请勾选待转组的坐席')
        }
      } else if (target == "关闭") {
        this.closePage();
      } else if (target == "查询") {
        let isSearch = false;
        for (var key in this.form) {
          if (!this.form[key])
            continue;
          isSearch = true;
          break;
        }

        if (isSearch) {
          this.dgConfig.currentPage = 1;//点击查询按钮从第一页开始查询
          this.requestCurPageData();
        } else {
          this.alert('请输入查询条件', '查询失败')
        }
      } else if (target == "清空") {
        this.transdate = [];
        for (var key in this.form) {
          this.form[key] = '';
        }

      }
    },
    requestCurPageData() {
      this.$parent.loading = true;
      let param = JSON.parse(JSON.stringify(this.form)); 
      param.attr = {
        pagenum: this.dgConfig.currentPage,
        pagesize: this.dgConfig.pageSize
      }

      queryUserPost(param).then((res) => {
        //console.log('userSearch',res.data);
        this.$parent.loading = false;
        if (res.data.status == '0') {
          this.$refs.result.allData = res.data.data.user;
          if (res.data.data.pagenum == 1)
            this.$refs.result.showTableData(res.data.data.total);
          else
            this.$refs.result.showTableData();
        }
        else {
          this.alert('查询结果:' + res.data.statusText)
          this.$refs.result.allData = [];
          this.$refs.result.showTableData();
        }
      }).catch((error) => {
        this.$parent.loading = false;
        this.alert('查询异常')
        this.$refs.result.allData = [];
        this.$refs.result.showTableData();
        console.log(error);
      });
    }
  },
  watch: {
    'transdate'(nval, oval) {
      this.form.startdt = nval && nval[0] ? nval[0] : '';
      this.form.enddt = nval && nval[1] ? nval[1] : '';
    }
  }

}

</script>
<style lang='less' scoped>
@import url("./../../styles/index");
/deep/.table-info {
  height: calc(100vh - 387px);
}
</style>