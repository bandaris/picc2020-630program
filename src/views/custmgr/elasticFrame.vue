<template>
 <div>
     <customerHist ref="hist" />
     <customerInsur ref="insur" :height="height" />
 </div>
</template>

<script>
import customerHist from './customerHist'
import customerInsur from './customerInsur'
 export default {
 name:'',
 props:[''],
 data () {
 return {
     height:false  
 };
 },

 components: {
     customerHist,
     customerInsur
 },

 computed: {},

 beforeMount() {},

 mounted() {},

 methods: {
     showInsur(){
         this.height=!this.height
         if(this.height&&this.$refs.hist.histactive==null){
             this.$refs.hist.histactive='contacthist';
             this.$refs.insur.toggletable('contacthist');
         }
     },
    //  toggleInsur(res){
    //      this.$refs.insur.toggletable(res);
    //  }
 },

 watch: {}

 }

</script>
<style lang='less' scoped>

</style>