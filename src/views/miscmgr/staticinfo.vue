<template>
  <div class="container">
    <div class="parentlist">
      <p>
        <span></span>
        <b>父项目列表</b>
      </p>
      <div class="table-box">
        <el-table
          :data="parenttabledata"
          class="picc-table picc-table-normal picc-table-1st-col-icon"
          @cell-click="handleBtn"
        >
          <el-table-column prop="kdesc" label="项目说明"></el-table-column>
          <el-table-column width="60">
            <span style="color:#1c61fc;cursor: pointer;">编辑</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="childlist">
      <template v-if="true">
        <p>
          <span></span>
          <b>子项目列表</b>
        </p>
        <div class="table-box">
          <el-table
            :data="childtabledata"
            class="picc-table picc-table-normal picc-table-1st-col-icon"
            @cell-click="handleBtn"
          >
            <el-table-column prop="kval" label="项目代码"></el-table-column>
            <el-table-column prop="kdesc" label="项目名称"></el-table-column>
            <el-table-column prop="parentval" label="项目联动" :formatter="handleFormatter"></el-table-column>
            <el-table-column prop="recflag" label="有效性">
              <!-- E代表有效否则为无效 -->
              <template slot-scope="scope">
                <span v-if="scope.row.recflag == 'E'">有效</span>
                <span v-else>无效</span>
              </template>
            </el-table-column>
            <el-table-column prop="bysort" label="显示排序(数字)"></el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <span
                  style="color:#1c61fc;cursor: pointer;"
                  @click="handleUpdata(scope.$index, scope.row)"
                >修改</span>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot-scope="scope">
                <span
                  style="color:#1c61fc;cursor: pointer;"
                  @click="handleDelete(scope.$index, scope.row)"
                >失效</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </div>

    <el-dialog
      title="追加子项目列表"
      custom-class="picc-dialog-table"
      :show-close="false"
      :visible.sync="dialogVisible"
    >
      <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">追加子项目列表</div>
          <div class="title-nav">
            <img src="./../../assets/image/Close-nor.png" alt @click="dialogVisible=false" />
          </div>
        </div>
      </div>
      <div class="form-box">
        <el-row>
          <el-col :span="4">项目代码</el-col>
          <el-col :span="4">
            <el-input type="text" v-model="form.kval" size="mini" disabled></el-input>
          </el-col>
          <el-col :span="4">项目名称</el-col>
          <el-col :span="4">
            <el-input type="text" v-model="form.kdesc" size="mini" @blur="BlurCheck('项目名称')"></el-input>
          </el-col>
          <el-col :span="3">联动项目</el-col>
          <el-col :span="4">
            <el-select size="mini" v-model="form.parentval">
              <el-option
                :label="item.dicttext"
                :value="item.dictvalue"
                v-for="(item,index) in curSelOptions"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">显示排序(数字)</el-col>
          <el-col :span="4">
            <el-input type="text" v-model="form.bysort" size="mini" @blur="BlurCheck('显示排序')"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button round type="primary" plain @click="dialogVisible=false;upDataIndex='x'">
          <span style="color:#1e60ff">取 消</span>
        </el-button>
        <el-button
          type="primary"
          round
          class="el-button-no-border"
          @click="addNewSubItem(upDataIndex)"
        >
          <span style="color:#fff">确 定</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryStaticInfoPost,
  createStaticInfoPost,
  loadDataDictPost
} from '@/api/sysmgr';
import lu from '@/utils/loginUser';
import mixin from './mixins/static';
import wares from '@u/mixinWares';
export default {
  name: 'staticinfo',
  mixins: [mixin, wares],
  data() {
    return {
      upDataIndex: 'x',//当前正在编辑的项目的位置，默认为x表示没有
      isSaved: false, //当前页面是否有被保存
      dialogVisible: false,
      linklist: ['追加项目', '保存'],
      parenttabledata: [],
      childtabledata: [],
      originalLength: null,
      form: {
        kval: '',
        kdesc: '',
        parentval: '',
        bysort: ''
      },
      curParent: null, //当前编辑父项目节点
      curSelOptions: [], //当前联动项目下拉选项
    };
  },
  methods: {
    //处理移除操作
    handleDelete(index, row) {
      if (this.isSaved == false && index + 1 > this.originalLength) {
        //如果当前页面未保存且不是初始化的数据则执行删除操作（是初始化的数据再有效性项上显示失效）
        this.childtabledata.splice(index, 1);
      }
      else {
        let obj = this.childtabledata[index]
        obj.recflag = 'x'
        this.$set(this.childtabledata, index, obj)
        // this.childtabledata[index].recflag = 'x'
        // this.$forceUpdate()
        // row.recflag = 'X';
      }
    },
    //处理修改操作
    handleUpdata(index, row) {
      this.dialogVisible = true;
      this.form.kval = row.kval
      this.form.kdesc = row.kdesc
      this.form.parentval = row.parentval
      this.form.bysort = row.bysort
      this.upDataIndex = index
    },
    //失焦检测
    BlurCheck(item, row) {
      if (item == '项目名称') {
        //去除首尾空格
        let value = this.form.kdesc = this.form.kdesc.trim();
        let arr = this.childtabledata;
        if (this.upDataIndex == "x") {//如果当前是新添加的项目则检测名称是否重复
          for (let i = 0; i < arr.length; i++) {
            if (value == arr[i].kdesc) {
              this.alert('该项目名称已存在，请重新输入！');
              this.form.kdesc = '';
              return;
            }
          }
        }
      } else if (item == '显示排序') {
        this.form.bysort = this.form.bysort.trim();
        if (!isNaN(Number(this.form.bysort))) {//如果是数字 
          if (this.form.bysort < -2147483648 || this.form.bysort > 2147483647) {
            this.alert('您输入的排序数字过于夸张！')
            this.form.bysort = ''
            return
          }
          if (this.form.bysort % 1 === 0 && this.form.bysort >= 0)//如果是大于等于0的整数
          {
            return;
          } else {
            this.form.bysort = '';
            this.alert('必须输入大于等于0的整数！')
            return
          }
        } else {
          this.form.bysort = '';
          this.alert('必须输入数字！');
          return
        }
      }
    },
    addNewSubItem(index) {
      if (!isNaN(index) && this.form.kdesc != '') {
        this.childtabledata.splice(index, 1);
      }
      if (this.form.kdesc == '') {
        this.alert('项目名称不能为空否则不无法创建！');
        return;
      }
      //添加新的项
      this.dialogVisible = false;
      let obj = this.form;
      obj.recflag = 'E';
      obj.kid = this.curParent.kval;
      this.childtabledata.splice(index, 0, obj);
      this.form = {};
      this.upDataIndex = 'x'
    },
    getSumItemKid() {
      let ret = '';
      for (let i = 0; i < this.childtabledata.length; i++) {
        if (!this.childtabledata[i]['kid']) continue;
        ret = this.childtabledata[i]['kid'];
        break;
      }
      return ret;
    },
    handleBtn(row, column, cell, event) {
      let target = cell.firstElementChild.firstElementChild;
      if (target && target.innerHTML == '编辑') {
        this.childtabledata = [];
        this.curParent = row;
        let pkid = this.curParent.kid;
        if (!pkid || pkid == 'null') {
          this.curSelOptions = []
          this.querySubItems(this.curParent);
        }
        else {
          let oret = lu.getStaticInfo([this.curParent.kid]);
          let nitems = oret.nitems;
          if (nitems.length == 0) {
            this.curSelOptions = oret[this.curParent.kid].options;
            this.querySubItems(this.curParent);
          } else {
            loadDataDictPost(nitems)
              .then(res => {
                lu.setStaticInfo = res.data.data;
                oret = lu.getStaticInfo([this.curParent.kid]);
                this.curSelOptions = oret[this.curParent.kid]
                  ? oret[this.curParent.kid].options
                  : [];
                this.querySubItems(this.curParent);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      }
      // else if (target && target.innerHTML == '失效') {
      //   row.recflag = 'X';
      // }
    },
    querySubItems(pitem) {
      queryStaticInfoPost({ kid: pitem.kval })
        .then(res => {
          if (res.data.status == '0') {
            //如果状态码是0则将数据赋值给childtabledata
            this.childtabledata = res.data.data.staticinfo;
            this.originalLength = this.childtabledata.length;
          } else this.alert('查询失败:' + res.data.statusText);
        })
        .catch(err => {
          console.log(err);
        });
    },
    infoDao() {
      let target = this.$parent.target;
      if (target == '追加项目') {
        if (!this.curParent) {
          this.alert('请选择需要编辑父项目');
          return;
        }
        this.isSaved = false;
        this.dialogVisible = true;
      } else if (target == '保存') {
        this.isSaved = true;
        let param = {};
        param.staticinfo = this.childtabledata;
        createStaticInfoPost(param)
          .then(res => {
            if (res.data.status == '0') {
              this.alert('保存成功');
              this.querySubItems(this.curParent);
            } else {
              this.alert('保存失败:' + res.data.statusText);
              this.isSaved = false
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleFormatter(row, column, cellValue, index) {
      let ret = cellValue;
      for (let i = 0; i < this.curSelOptions.length; i++) {
        let oval = this.curSelOptions[i]['dictvalue'];
        if (cellValue != oval) continue;
        ret = this.curSelOptions[i]['dicttext'];
        break;
      }
      return ret;
    }
  },
  mounted() {
    //父列表的数据初始化
    queryStaticInfoPost({ recflag: 'A' })
      .then(res => {
        if (res.data.status == '0')
          this.parenttabledata = res.data.data.staticinfo;
        else this.alert('查询失败:' + res.data.statusText);
      })
      .catch(err => {
        console.log(err);
      });
  },
  activated() {
    this.$parent.linksw(this.linklist);
  },
  watch: {
    dialogVisible: function (val) {
      if (val == false) {
        this.form = {
          kval: '',
          kdesc: '',
          parentval: '',
          bysort: ''
        };
      }
    }
  },
};
</script>

<style scoped lang="less">
@import url("./../../styles/index");
/deep/.el-table__body-wrapper {
  width: 100%;
  max-height: calc(100vh - 249px);
  overflow: auto;
}
/deep/.el-table--enable-row-transition {
  max-height: calc(100vh - 209px);
}

.el-row {
  line-height: 28px;
  margin-bottom: 10px;
  .el-col {
    &:nth-of-type(odd) {
      text-align: right;
      padding-right: 10px;
    }
  }
}
/deep/.el-col .el-input {
  .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
}
/deep/.el-dialog.picc-dialog-table .el-dialog__header .el-dialog__title {
  font-size: 20px;
}
/deep/.el-dialog__header .dialog-title .dialog-vac .title-nav ul {
  margin: 0;
}
/deep/.el-dialog__header {
  padding: 1px 20px 0;
  border-bottom: 2px solid #ececec;
}
/deep/.title-text {
  font-size: 20px;
}
/deep/.el-dialog__footer {
  border-top: 2px solid #ececec;
  text-align: center;
}
/deep/.dialog-vac {
  display: flex;
  justify-content: space-between;
}
.container {
  padding: 15px 15px 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .parentlist,
  .childlist {
    width: 48% !important;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .table-box {
      padding-top: 2px;
      flex: 1;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    p {
      height: 31px;
      overflow: hidden;
      line-height: 30px;
      margin-top: 13px;
      span {
        float: left;
        width: 7px;
        height: 25px;
        margin-top: 2px;
        background-color: #e6390e;
        margin-right: 2px;
      }
      b {
        font-size: 16px;
        float: left;
      }
      i {
        font-style: normal;
        float: right;
        cursor: pointer;
        color: #1c61fc;
        margin-right: 32px;
      }
    }
    &::before {
      content: "";
      display: table;
      clear: both;
    }
  }
}
</style>
