<template>
 <div class="historybox" :class="height?'height':''">
     <ul>
         <li v-for="(item,index) in DoShowlist" :key="index">
             <el-button size="mini supermini" type="primary" round  @click="DoShowMorethist(item.value)">{{item.label}}</el-button>
         </li>
     </ul>
    <datagrid :showpage="false" :config="historyconfig"></datagrid>
 </div>
</template>

<script>
import datagrid from '@c/datagrid.vue'
import eventBus from '@u/vueEvent'
 export default {
 name:'',
 props:{
     height:{
         type:Boolean,
         default:false
     }
 },
 data () {
 return {
     DoShowlist:[
         
     ],
     DoShowContactlist:[{
            value:'DoShowMoreContacthist',
            label:'更多历史'
     }],
     historyconfig:{},
     contactconfig:{
          height:'100%',
          select:false,
        columns:[
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
        ],
        commands:[
      ],
     },
     toncactconfig:{
         height:'100%',
          select:false,
        columns:[
            ['','核保日期','',true,false],
            ['','核保通过时间','',true,false],
            ['','投保单号/团协议号','',true,false],
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
            ['','投保类型','',true,false]
        ],
        commands:[
      ],
     }
 };
 },

 components: {
     datagrid

 },

 computed: {},

 beforeMount() {},

 mounted() {
     eventBus.$on('toggletable',res=>this.toggletable(res))
 },

 methods: {
     toggletable(res){
         switch(res){
             case 'contacthist':
                 this.historyconfig=this.contactconfig
                 for(let i=0;i<this.DoShowContactlist.length;i++){
                     this.DoShowlist.push(this.DoShowContactlist[i])
                 }
                 console.log(this.DoShowlist)
                 break;
             case 'orderhist':
                 this.historyconfig=this.toncactconfig;
                 this.DoShowlist=[]
                 break;
            default :
            this.historyconfig={},
            this.DoShowlist=[]
                break;

         }
     },
     DoShowMorethist(res){
         console.dir(res);
     }
 },

 watch: {
     
 }

 }

</script>
<style lang='less' scoped>
@import url('./../styles/index');
.historybox{
    height: 0;
    overflow: auto;
    transition: all 300ms linear;
    display: flex;
    flex-direction: column;
    ul{
        width: 100%;
        margin: 0;
        padding: 0;
        float: right;
        li{
            float: right;
        }
    }
    div{
        &:first-of-type{
            height: 100%;
            flex: 1;
        }
    }
}
.height{
    height: 148px;
}
</style>