<template>
    <div>
        <h1>input校验</h1>
        <el-input class='input' v-model="value" @blur="check(value)"></el-input>
        <el-input class='input' v-model='result' disabled style='width:200px'></el-input>
    </div>
</template>

<script>
import vchecker from '@/utils/vChecker.js'
export default {
    data() {
        return {
            value:'',
            result:'校验结果'
        }
    },
    methods: {
        check(value){
            console.log(123)
            this.result =  vchecker.valildFixedTelephone(value)
            console.log(result)
        }
    },
}
</script>

<style lang="less">
    .input{
        width: 400px;
    }
</style>