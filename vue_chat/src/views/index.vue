<template>
    <div class="register-container">
        <page-header></page-header>
        <div class="register-div">
            <div class="register-wrapper">
                <div class="register-title">免费注册</div>
                <div class="register-item">
                    <input class="rect phone" type="text" placeholder="您的手机号">
                </div>
                <div class="register-item">
                    <input type="text" class="rect password" placeholder="密码为6-16位数字和英文字母组合">
                </div>
                <div class="register-item">
                    <input type="text" class="rect" placeholder="短信验证码">
                    <div class="get-msg-code">获取短信验证码</div>
                </div>
                <div class="register-item">
                    <div class="register-btn">注册</div>
                </div>
                <div class="switch-to-login">
                    已有账号?
                    <a href="">立即登录</a>
                </div>
            </div>
        </div>
        <div class="nickname-wrapper">
            <input v-model="username" type="text" class="nickname" id="nickname" v-bind:placeholder="message" v-on:keyup.enter="login"/>
        </div>
    </div>
</template>

<script>
    import {socket} from '@/service/getData'
    import PageHeader from '@/components/header'

    export default {
        data() {
            return {
                username: '',
                message: '请输入用户名,回车键进入'
            }
        },
        components: {
            PageHeader
        },
        methods: {
            login: function() {
                let user = {};
                user['userId'] = parseInt(10000 * Math.random());
                user['userName'] = this.username;
                socket.emit('login', user);
                socket.on('login', (data) => {
                    if (data && data.user.userId === user['userId']) {
                        // 编程式导航
                        this.$router.push({
                            path: 'chat',
                            query: {currentUser: user}
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/styles/common.scss';

    .chat-container {
        // border: 1px solid green;
        margin: 0 auto;
    }

    .register-div {
        // border: 1px solid red;
        margin-top: 60px;
        padding: 40px 0px;
    }

    .register-title {
        padding: 20px 0px;
        font-size: 18px;
    }

    .register-wrapper {
        max-width: 360px;
        height: 580px;
        border-top: 3px solid #03a9f4;
        border-radius: 2px;
        margin: 0 auto;
        padding: 0 37px;
        box-shadow: 0 0 10px lightgrey;
        background-color: white;
    }

    .register-item {
        // border: 1px solid red; 
        width: 100%;
        margin-bottom: 10px;
        position: relative;
    }

    .rect {
        width: 100%;
        padding: 0 10px;
        border: 1px solid lightgrey;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-radius: 2px;
    }

    .rect:focus {
        border: 1px solid #03a9f4;
    }

    .get-msg-code {
        position: absolute;
        top: 0px;
        right: 0px;
        cursor: pointer;
        line-height: 40px;
        font-size: 12px;
        color: #03a9f4;
        display: block;
    }

    .get-msg-code:hover {
        color: #038fcd;
    }

    .nickname-wrapper {
        margin-top: 80px;
    }

    .register-btn {
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        border: 1px solid #03a9f4;
        border-radius: 2px;
        background-color: #03a9f4;
        cursor: pointer;
        color: white;
    }

    .register-btn:hover {
        background-color: #03b0ff;
    }

    .switch-to-login {
        width: 100%;
        margin-top: 20px;
        padding: 10px 10px;
        border-top: 1px solid lightgrey;
    }

    .switch-to-login a {
        color: #03a9f4;
        text-decoration: none;
        &:hover {
            color: #038fcd;
        }
    }

    .nickname {
        border: 1px solid #888;
        border-radius: 5px;
        height: 35px;
        box-shadow: none;
        outline: none;
        width: 29%;
        font-size: 20px;
        outline: none;
    }

    .nickname:focus {
        border: 1px solid #64D9EF;        
    }
</style>