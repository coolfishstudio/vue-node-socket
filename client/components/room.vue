<template>
    <div class="room">
        <div>头部</div>
        <div class="content">内容</div>
        <div class="footer">
            <div class="main">
                <input type="text" class="input" />
                <div class="send">发送</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'room',
    data () {
        return {
        }
    },

}
</script>

<style lang="less" scoped>
.room {
    width: 100%;
    height: 100%;
    position: relative;
    .content {
        position: absolute;
        top: 50px;
        bottom: 50px;
        left: 0;
        right: 0;
        padding: 10px;
        overflow-y: auto;
        box-sizing: border-box;
    }
    .footer {
        position: fixed;
        bottom: 0;
        height: 50px;
        left: 0;
        right: 0;
        background-color: #fff;
        border-top: 1px solid #dedede;
        padding: 8px 10px;
        box-sizing: border-box;
        .main {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .input {
                float: left;
                width: 78%;
                height: 33px;
                outline: none;
                border: 1px solid #ddd;
                border-radius: 5px 0 0 5px;
                color: #444;
                font-size: 14px;
                padding: 0 10px;
                background-color: #efefef;
                box-sizing: border-box;
            }
            .send {
                float: right;
                width: 22%;
                height: 33px;
                outline: none;
                background-color: #499eff;
                border-radius: 0 5px 5px 0;
                text-align: center;
                line-height: 33px;
                color: #fff;
                box-sizing: border-box;
                cursor: pointer;
            }
        }
    }
}
</style>
