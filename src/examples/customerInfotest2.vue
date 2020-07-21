<template>
 <div  class="drawer" :class="isheight?'height':''" ref="drawer">
     <slot></slot>
 </div>
</template>

<script>

 export default {
 name:'',
 props:[''],
 data () {
 return {
     isheight:false,
     timer:null,
     height:209
 };
 },

 components: {},

 computed: {},

 beforeMount() {},

 mounted() {
   
 },

 methods: {
     mainsrcoll(){
         if(this.timer==null){
             let top=document.querySelector('.container').scrollTop;
             let height=this.$refs.drawer.scrollHeight;
             let scroll=0;
             this.timer=setInterval(()=>{
                 scroll+=50;
            document.querySelector('.container').scrollTop=scroll+top;
            if(scroll>=height){
                clearInterval(this.timer);
                this.timer=null
            }
         },100)
     }
    }
 },

 watch: {
     
 }

 }

</script>
<style lang='less' scoped>
    .drawer{
        width: 100%;
        transition: all 500ms linear;
        overflow: hidden;
        height: 0;
    }
    .height{
        height: 209px;
    }
   
</style>