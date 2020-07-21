<template>
 <div>
     <p> <b> This is Branchmgr</b></p>
     <ul>
         <router-link tag="li" to="/home/agentmgr">去到坐席管理</router-link>
         <router-link tag="li" to="/home/purviewmgr">去到权限管理</router-link>
         <router-link tag="li" to="/home/branchmgr">去到机构管理</router-link>
         <router-link tag="li" to="/home/iscmgr">去到杂项管理</router-link>
     </ul>
 </div>
</template>

<script>

 export default {
 name:'branchmgr',
 props:[''],
 data () {
 return {

 };
 },

//  components: {},

//  computed: {},

//  beforeMount() {},

//  mounted() {},

//  methods: {},

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