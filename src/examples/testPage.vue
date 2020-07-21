<template>
 <div>
     <h1><b>组件测试页面</b></h1>
     <el-button @click="rtest">获取静态数据</el-button>

     
 </div>
</template>

<script>
import {getTestDataByPost} from '@/api/test.js'
import lu from '@/utils/loginUser'

 export default {
 name:'testpage',
 props:[''],
 data () {
    return {

    };
 },

//  components: {},

//  computed: {},

//  beforeMount() {},

//  mounted() {},

 methods: {
     rtest(){
       getTestDataByPost({page:1,pageSize:10})
                .then((response)=>{
                  let rdata=response.data.data;
                  console.log(rdata);
                  lu.setStaticInfo=rdata;
                  let ops=lu.getStaticInfo('accflag');
                  console.log(ops);
                  ops=lu.getStaticInfo('saletype');
                  console.log(ops);
                  ops=lu.getStaticInfo('recflagall');
                  console.log(ops);
                  ops=lu.getStaticInfo('posttype');
                  console.log(ops);
                })
                .catch((error)=>{
                  console.log(error);
                });
     }
 },

//  watch: {}

 }

</script>
<style lang='less' scoped>
 ul{
        li{
            margin: 5px;
        }
    }
</style>