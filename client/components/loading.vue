<template>
    <div>
        <div class="base load-once" :class="{remove: !loadState}" v-show="isLoadShow">
            <div class="text">聊天室</div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loadState: true,
                isLoadShow: true
            }
        },
        mounted () {
            var _this = this;
            // 1500ms 变淡
            // 2000ms 消失
            setTimeout(function () {
                _this.loadState = false;
                setTimeout(function () {
                    _this.isLoadShow = false;
                    // 通知事件
                    _this.$emit('loadFinishEvent');
                }, 500);
            }, 1500);
        }
    }
</script>
<style lang="less">
    .base {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        display: block;
    }
    .load-once {
        background-color: #1aad19;
        background-image: url('../assets/images/logo.png');
        background-position: center 35%;
        background-size: 120px;
        background-repeat: no-repeat;
        opacity: 1;
        transition: all 0.5s;
        &.remove {
            opacity: 0;
        }
        .text {
            width: 100%;
            height: 100%;
            color: #fff;
            text-align: center;
            font-size: 28px;
            line-height: 50%;
            padding-top: 120%;
        }
    }
</style>
