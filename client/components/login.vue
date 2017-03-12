<template>
    <div class="login">
        <li-load @loadFinishEvent="loadEvent"></li-load>
        <div class="loading">正在加载群聊信息...</div>
    </div>
</template>

<script>
import load from './loading'
export default {
    components: {
        'li-load': load
    },
    data () {
        return {
            load: false
        }
    },
    methods: {
        loadEvent () {
            this.$router.replace({path: '/room'});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #fff;
    .loading {
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #1aad19;
        text-align: center;
        line-height: 50;
    }
}
</style>
