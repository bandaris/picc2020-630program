<template>
  <!-- 添加微店链接页面 -->
  <div class="container">
    <!-- 添加微店链接页面开始 -->
    <div class="addMicroStoreLink-main">
      <!-- 顶部表单 -->
      <div class="top-form">
        <el-row class="row">
          <el-col :span="2" class="txt">员工工号</el-col>
          <el-col :span="4">
            <el-input v-model="form.userid" disabled></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="0" :span="2" class="txt">长链接地址</el-col>
          <el-col :span="20">
            <el-input v-model="form.longlink"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :offset="0" :span="2" class="txt">短链接地址</el-col>
          <el-col :span="20">
            <el-input v-model="form.shortlink" disabled></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 微信店链接查询页面开始 -->
  </div>
</template>

<script>
import mixin from './mixins/micro'
import {updateMicroShopPost } from "@/api/sysmgr"
import wares from '@u/mixinWares'
export default {
  name:'updateMicro',
  mixins: [mixin,wares],
  data() {
    return {
      form: {},
      linklist:['保存','关闭'],
    };
  },
  activated () {
    this.form=this.$route.query.userid?this.$route.query:this.form;
    this.$parent.linksw(this.linklist)
  },
  methods: {
    //处理导航栏信息的点击事件方法
    infoDao(){
        let target=this.$parent.target;
        if(target=='关闭'){
          this.closePage();
        }
        else if(target=='保存'){
          this.confirm('确定保存操作吗?','提示').then(()=>{
          let param={microshop:[]}
          param.microshop.push(this.form);
          updateMicroShopPost(param).then((res)=>{
              let rdata=res.data;
              if(rdata.status=="0"){
                this.alert('保存成功!')
                this.form=rdata.data[0];
              }
              else{
                this.alert(rdata.statusText+'！')
              }
            }).catch((err)=>{console.log(err);})
          }).catch((err)=>{console.log("updateMicro",err)})
        }
    }    
  },
  
};
</script>

<style lang="less" scoped>
@import url('./../../styles/index');
//添加微店链接包裹
.container {
  background-color: #ffffff;
  font-size: 14px;
  p {
    margin: 0;
  }
  //添加微店链接页面开始
  .addMicroStoreLink-main {
    padding: 0 16px;
    .table-bottom {
      height: 370px;
    }
  }
}
</style>

<style lang="less" scoped>
//表格样式改变
/deep/.picc-table.picc-table-normal th .cell {
  text-align: center;
  padding: 0 5px;
}
/deep/.picc-table.picc-table-selectable tr th:first-child .cell {
  text-align: center;
  padding: 0 5px;
}
/deep/.picc-table.picc-table-selectable tr td:first-child .cell,
.picc-table.picc-table-selectable tr th:first-child .cell {
  text-align: center;
  padding: 0 5px;
}
/deep/.picc-table.picc-table-selectable tr .cell {
  text-align: center;
  padding: 0 5px;
}
//elementUi下拉列表样式重置
/deep/.el-dropdown {
  color: #1c61fc;
}
/deep/.el-dropdown-menu__item {
  font-weight: bold;
  color: #1c61fc;
  line-height: 24px;
}
/* 滚动条样式重置 */
/deep/::-webkit-scrollbar {
  width: 4px;
}
/deep/::-webkit-scrollbar-thumb {
  width: 4px;
  height: 40px;
  background-color: rgba(205, 205, 205, 0.4);
  border-radius: 2px;
}
/deep/::-webkit-scrollbar-thumb:hover {
  background-color: rgba(205, 205, 205, 1);
}
/* 栅格布局样式 */
.row {
  margin: 18px 0;
}
.row-last {
  background-color: #f7f8fd;
  overflow: hidden;
  margin-bottom: 0;
  &::before {
    content: "";
    height: 2px;
    width: 100%;
    margin-left: 20px;
    border-bottom: 1px dotted #cecece;
    margin-bottom: 20px;
  }
}
.el-row {
  line-height: 28px;
  .txt {
    text-align: center;
  }
  .txt2 {
    text-align: right;
    padding-right: 20px;
  }
  .ct {
    text-align: center;
  }
}
/* 表格行高重置 */
/deep/.picc-table.picc-table-normal th .cell {
  line-height: 16px;
}
/deep/.picc-table.picc-table-normal td,
/deep/.picc-table.picc-table-normal th {
  padding: 0;
  height: 44px;
  border-bottom: 1px dashed rgba(41, 43, 52, 0.2);
  background-color: #fff !important;
}

/* 角色选择弹窗样式*/
/deep/.el-dialog__header .dialog-title .dialog-vac {
  line-height: 27px;
  overflow: hidden;
  .title-text {
    float: left;
    font-size: 20px;
  }
  .title-nav {
    float: right;
    ul {
      float: left;
      margin-right: 30px;
      li {
        float: left;
        margin: 0 10px;
        cursor: pointer;
        color: #1c61fc;
      }
    }
    img {
      float: left;
      margin-top: 4px;
      cursor: pointer;
    }
  }
}
.table-grop {
  height: 231px;
}
/deep/ .el-dialog__wrapper {
  .el-dialog.picc-dialog-table .el-dialog__header {
    border-width: 2px;
  }
  .has-gutter tr th {
    background-color: #f1f1f1;
    border-bottom: 0;
  }
}
/deep/.el-dialog__header .dialog-title .dialog-form {
  margin-top: 20px;
  .el-row {
    &:last-of-type {
      margin-top: 19px;
    }
  }
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-row {
  line-height: 27px;
}
/deep/.quan {
  margin-top: 10px;
}
/deep/.el-dialog.picc-dialog-table .el-dialog__header {
  padding-bottom: 16px;
}
/deep/.picc-table.picc-table-normal th {
  border-top: 0;
}
/deep/.el-checkbox__inner {
  width: 17px;
  height: 17px;
}
/deep/.el-table td,
.el-table th {
  padding: 9.5px 0;
}
/deep/.picc-table.picc-table-normal tr:last-child td {
  border-bottom: 1px dashed rgba(41, 43, 52, 0.2);
  margin-bottom: 1px;
}
/deep/.el-dialog__footer {
  border-top: 2px solid #dfdfdf;
  margin-top: 15px;
  text-align: center;
  padding: 15px;
}
//分页器样式重置
.el-pagination {
  text-align: center;
}
</style>