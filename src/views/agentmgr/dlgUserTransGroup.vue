<template>
  <el-dialog
      title="坐席转组"
      custom-class="picc-dialog-table"
      width="800px"
      :show-close="false"
      :visible="dlgvisible" @close="close" 
    >
    <div slot="title" class="dialog-title">
        <div class="dialog-vac">
          <div class="title-text">坐席转组设置</div>
          <div class="title-nav">
            <img src="./../../assets/image/Close-nor.png" alt @click="close" />
          </div>
        </div>
    </div>
    <div class="dialog-tab" 
      v-loading="loading"
      element-loading-text="坐席转组中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table :data="transinfo" style="width: 100%" size="mini" :fit="true" class="picc-table picc-table-normal picc-table-1st-col-icon">
          <el-table-column
              prop="userid"
              label="坐席工号"
              width="100"
              align="center">
            </el-table-column>
          <el-table-column
              width="100"
              prop="username"
              label="坐席姓名"
              align="center"
              >
            </el-table-column>
          <el-table-column
              width="100"
              prop="olddeptname"
              label="原组名"
              align="center">
            </el-table-column>
          <el-table-column
              width="100"
              prop="newdeptname"
              label="转组后"
              align="center">
            </el-table-column>
          <el-table-column
              width="170"
              prop="taskrecontact"
              label="是否转移再次联系的任务">
              <template slot-scope="scope">
                  <el-select v-model='scope.row.taskrecontact'>
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
              </template>
            </el-table-column>
          <el-table-column
              width="170"
              prop="taskunconnect"
              label="是否转移未接通的任务">
              <template slot-scope="scope">
                  <el-select v-model='scope.row.taskunconnect'>
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
              </template>
            </el-table-column>
          <el-table-column
              width="170"
              prop="taskuncontact"
              label="是否转移未联系的任务">
              <template slot-scope="scope">
                  <el-select v-model='scope.row.taskuncontact'>
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
              </template>
            </el-table-column>
          <el-table-column
              width="170"
              prop="delmanagegroup"
              label="是否删除可管理的组">
              <template slot-scope="scope">
                  <el-select v-model='scope.row.delmanagegroup'>
                    <el-option label="是" value="Y"></el-option>
                    <el-option label="否" value="N"></el-option>
                  </el-select>
              </template>
            </el-table-column>
        </el-table>
    </div>
    <div slot="footer" class="footer">
      <el-button size="mini" round type="primary" plain @click="close">取消</el-button>
      <el-button size="mini" round type="primary" @click="transGroup">确定</el-button>
    </div>
    </el-dialog>
</template>

<script>
import {transferUserGroupPost} from '@/api/sysmgr'
import wares from '@u/mixinWares'
export default {
  name:'dlgUserTransGroup',
  mixins: [wares],
  data() {
    return {
      loading:false
    }
  },
  props:{
        dlgvisible:{
          type:Boolean,
          default:false
        },
        dlgid:{
          type:String,
          defaule:'dlgtrans'
        },
        transinfo:{
          type:Array,
          default:()=>[]
        }
    },
  methods: {
    transGroup(){
      console.log('dlgUserTransGroup transGroup',this.transinfo);
      this.loading=true;
      let param={user:this.transinfo};
      transferUserGroupPost(param).then(res=>{
        console.log('transferUserGroupPost',res)
        let rdata=res.data;
        if(rdata.status==0){
          this.loading=false;
          this.alert('执行成功').then(
            setTimeout(()=>{this.close();},500)
          )
        }
        else{
          this.loading=false;
          this.alert('执行失败:'+rdata.statusText);
        }
      }).catch((err)=>{
        console.log('dlgUserTransGroup transGroup',err);
        this.alert('执行失败:'+rdata.statusText);
      })
    },
    close(){
      this.$emit('update:dlgvisible',false);
    },
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  @import url('./../../styles/index');
</style>
