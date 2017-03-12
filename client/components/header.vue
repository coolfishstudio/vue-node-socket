<template>
    <div class="header">
        <div class="left" @click="leftHandleEvent">
            <img src="../assets/images/avatar.png" :style="'background-color:' + config.left" />
        </div>
        <div class="center">
            <slot name="title"></slot>
        </div>
        <div class="right" @click="rightHandleEvent">{{ config.right }}</div>
    </div>
</template>
<script>
    export default {
        props: ['config'],
        data () {
            return {
                loading: false
            }
        },
        methods: {
            leftHandleEvent () {
                this.$emit('headerLeftEvent');
            },
            rightHandleEvent () {
                this.$emit('headerRightEvent');
            }
        }
    }
</script>
<style lang="less" scoped>
    .header {
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background-color: #28282d;
        line-height: 50px;
        color: #fff;
        z-index: 10;
        overflow: hidden;
        .left {
            width: 15%;
            height: 50px;
            float: left;
            text-align: center;
            position: relative;
            img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                border: 2px solid #fff;
            }
        }
        .center {
            width: 70%;
            height: 50px;
            float: left;
            text-align: center;
        }
        .right {
            width: 15%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            float: left;
        }
    }
</style>
