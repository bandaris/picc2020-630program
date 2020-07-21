<template>
 <div class="clear histroybox">
     <ul class="histroylist fl" @click="togglehistory">
       <li v-for="(item,index) in histlist" :key="index" :data-value="item.value" :class="histactive==item.value?'histroylistactive':''">
           {{item.label}}
       </li>
    </ul>
    <el-button size="mini" round type="primary" @click="showhistory" class="fr supermini" style="margin-top:9px">{{height?'隐藏':'展开'}}</el-button>
 </div>
</template>

<script>
import eventBus from '@u/vueEvent'
 export default {
 name:'',
 props:[''],
 data () {
 return {
     histactive:null,
     height:true,
     histlist:[
         {
             value:'contacthist',
             label:'联系历史'
         },
         {
              value:'wechathist',
            label:'微信对话历史'
         },
         {
             value:'orderhist',
             label:'投保历史'
         },
         {
             value:'casehist',
             label:'事件历史'
         },
         {
             value:'insurcalchist',
             label:'试算历史'
         },
         {
             value:'custtaskhist',
             label:'分配历史'
         },
         {
             value:'workhist',
             label:'工单历史'
         },
         {
             value:'errordialnotehist',
             label:'错误件历史'
         },
         {
             value:'messagehist',
             label:'短信历史'
         },
         {
             value:'insurrecallhist',
             label:'回访历史'
         },
         {
             value:'eacontracthist',
             label:'家电延保历史历史'
         },
         {
             value:'insurfaxhist',
             label:'传真历史'
         },
         {
             value:'insuremailhist',
             label:'邮件历史'
         },
         {
             value:'outcalldetails',
             label:'智能外呼详情'
         },
     ]
 };
 },

 components: {},

 computed: {},

 beforeMount() {},

 mounted() {},

 methods: {
     showhistory(){
         this.$parent.showInsur();
     },
     togglehistory(e){
         let target=e.target;
         if(target.nodeName=="LI"){
             this.histactive=target.dataset.value;
            //  this.$parent.toggleInsur(this.histactive)
            eventBus.$emit('toggletable',this.histactive)

         }
        //  if(e.target.nodeName)
     }
 },

 watch: {}

 }

</script>
<style lang='less' scoped>
@import url('./../styles/index');
.histroybox{
    background-image:linear-gradient(to bottom, rgb(209,209,209), rgb(255,255,255));
}
     .histroylist{
         padding: 0;
         margin: 0;
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
</style>