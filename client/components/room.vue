<template>
    <div class="room">
        <li-header @headerLeftEvent="loginEvent" @headerRightEvent="configEvent" :config="headerConfig">
            <div slot="title">匿名聊天室</div>
        </li-header>
        <div class="content" ref="scroll">
            <div class="height-hook">
                <div v-for="item in messageList">
                    <!-- 系统通知 -->
                    <div class="item-box center-hook" v-if="item.type === 1">
                        <span class="tip">{{ item.msg }}</span>
                    </div>
                    <!-- 广播的消息 -->
                    <div class="item-box left-hook" v-if="item.type === 2">
                        <div class="left">
                            <!-- 头像应该是有多少要打包多少 如果是动态的话...此处取巧 利用随机背景颜色设置多种不同头像 -->
                            <img src="../assets/images/avatar.png" :style="'background-color:' + item.msgUser.userBg" />
                        </div>
                        <div class="center">
                            <div class="user">
                                {{ item.msgUser.userName }}
                            </div>
                            <div class="text">
                                {{ item.msg }}
                            </div>
                        </div>
                    </div>
                    <!-- 我发的消息 -->
                    <div class="item-box right-hook" v-if="item.type === 3">
                        <div class="right">
                            <img src="../assets/images/avatar.png" :style="'background-color:' + item.msgUser.userBg" />
                        </div>
                        <div class="center">
                            <div class="user">
                                {{ item.msgUser.userName }}
                            </div>
                            <div class="text">
                                {{ item.msg }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="main">
                <input type="text" class="input" v-model="inputValue" @keyup.enter="sendEvent"/>
                <div class="send" @click="sendEvent">发送</div>
            </div>
        </div>
    </div>
</template>

<script>
import header from './header'

export default {
    name: 'room',
    components: {
        'li-header': header
    },
    data () {
        return {
            headerConfig: {
                left: '#000000',
                right: '设置'
            },
            userNameList: ['钢铁侠', '绿巨人', '黑寡妇', '鹰眼', '蜘蛛侠', '美国队长', '雷神', '暴风女', '毁灭博士', '死侍', '哨兵', '万磁王', '金刚狼', '镭射眼', '红骷髅', '冬日战士', '灭霸', '章鱼博士', '幻视', '霹雳火'],
            connectState: false,
            userInfo: {},
            messageList: [],
            onlineUserList: [],
            inputValue: ''
        }
    },
    created () {
        this.userInfo = {};
        this.messageList = [];
    },
    updated () {
        this.scroll();
    },
    mounted () {
        this.connectEvent();
    },
    methods: {
        connectEvent () {
            var _this = this;
            var randomNum = Math.floor(Math.random() * _this.userNameList.length);
            var userBg = this.randomColor();
            // 用户信息
            this.userInfo = {
                userId: this.getUserId(),
                userName: this.userNameList[randomNum],
                userBg: userBg
            };
            this.httpServer = io.connect('http://192.168.1.106:9080');
            this.httpServer.emit('login', this.userInfo);
            this.onlineUserList.push(this.userInfo);
            this.httpServer.on('login', function (obj) {
                _this.onlineUserList = obj.onlineUserList;
                _this.messageList.push({
                    type: 1,
                    msg: '用户 ' + obj.msgUser.userName + ' 加入聊天',
                    msgUser: obj.msgUser
                });
            });
            this.httpServer.on('loginSuccess', function (obj) {
                if (obj.sign === 1) {
                    _this.onlineUserList = obj.onlineUserList;
                    _this.connectState = true;// 登录状态
                    _this.headerConfig.left = _this.userInfo.userBg.toString();
                    console.log('连接ok');
                }
            });
            this.httpServer.on('logout', function (obj) {
                _this.messageList.push({
                    type: 1,
                    msg: '用户 ' + obj.msgUser.userName + ' 退出聊天',
                    msgUser: obj.msgUser
                });
            });
            this.httpServer.on('message', function (obj) {
                _this.onlineUserList = obj.onlineUserList;
                _this.messageList.push({
                    type: 2,
                    msg: obj.msg,
                    msgUser: obj.user
                });
            });
        },
        configEvent () {
            console.log('聊天室设置触发事件');
        },
        loginEvent () {
            console.log('加入聊天室事件');
        },
        sendEvent () {
            this.inputValue = this.trim(this.inputValue);
            if (this.inputValue.length > 0) {
                if (this.connectState) {
                    this.httpServer.emit('message', {
                        msg: this.inputValue,
                        user: this.userInfo
                    });
                    this.messageList.push({
                        type: 3,
                        msg: this.inputValue,
                        msgUser: this.userInfo
                    });
                    this.inputValue = '';
                }
            }
        },
        getUserId () {
            return (Date.now() + '' + Math.floor(Math.random() * 100000 + 100)) - 0;
        },
        trim (s) {
            return s.replace(/(^\s*)|(\s*$)/g, '');
        },
        randomColor () {
            return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
        },
        scroll () {
            // 有新消息 滚动容器
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
        }
    }
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
        .item-box {
            width: 100%;
            margin-bottom: 10px;
            overflow: hidden;
            .left {
                float: left;
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .right {
                float: right;
                width: 40px;
                img {
                    height: 40px;
                }
            }
            .center {
                max-width: 65%;
                .text {
                    position: relative;
                    font-size: 13px;
                    padding: 8px 10px 5px 10px;
                    border-radius: 3px;
                    line-height: 20px;
                    word-break:break-all;
                    &:after {
                        position: absolute;
                        display: block;
                        content: '';
                        width: 0;
                        height: 0;
                        border: 5px solid transparent;
                        top: 5px;
                    }
                }
            }
            .user {
                margin-bottom: 5px;
                font-size: 12px;
                color: #aaa;
                line-height: 12px;
            }
            &.center-hook {
                text-align: center;
                padding: 20px 0;
                .tip {
                    padding: 6px 12px;
                    border-radius: 3px;
                    color: #fff;
                    font-size: 12px;
                    line-height: 12px;
                    background-color: #ccc;
                }
            }
            &.left-hook {
                .center {
                    float: left;
                    margin-left: 10px;
                    .text {
                        float: left;
                        background-color: #fff;
                        color: #333;
                        &:after {
                            border-right-color: #fff;
                            left: -10px;
                        }
                    }
                }
            }
            &.right-hook {
                .center {
                    float: right;
                    text-align: left;
                    margin-right: 10px;
                    .text {
                        float: right;
                        background-color: #a2e562;
                        color: #333;
                        &:after {
                            border-left-color: #a2e562;
                            right: -10px;
                        }
                    }
                    .user {
                        text-align: right;
                    }
                }
            }
        }
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
                background-color: #28282d;
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
