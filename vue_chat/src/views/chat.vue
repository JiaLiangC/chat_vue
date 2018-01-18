<template>
	<div chatroom-container>
		<nav>
			<h1>聊天室</h1>
		</nav>
         <div class="chatroom-info">
            <span class="onlineCount">欢迎 {{ $route.query.currentUser.userName }} 登陆成功，当前{{ onlineUsersCount }}人在线</span>
        </div>

        <div class="content-wrapper">
            <div class="chatroom-content">
                <div class="msg-item" v-enter v-for="item in msgTempData" :class="item.sourceType === 1 ? 'left' : 'right'" :key="item.id">
                    <user-msg v-bind:msg="item"></user-msg>
                </div>
            </div>

            <div class="message-wrapper">
                <input v-model='userInput' v-on:keyup.enter="postMessage" class="message" type="text" id="message">
            </div>
        </div>
	</div>	
</template>

<script>
    let moment = require('moment');
    import {msgData} from '@/service/tempData/msgData'
    import UserMsg from '@/components/userMsg'
    import {enter} from '@/components/mixin'
    import {socket} from '@/service/getData'

    export default {

        components: {
            UserMsg,
        },
        mixins: [enter],
        data: function() {
            return {
                userInput: '',
                msgTempData: [],
                onlineUsersCount: 0
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            socket.on('sendMessage', (data) => {
                console.log(data);
                let sourceType = this.$route.query.currentUser.userName === data.userName ? 0 : 1;
                this.msgTempData.push({
                    id: this.msgTempData.length + 1,
                    sourceType: sourceType,
                    nickname: data.userName,
                    content: data.content,
                    time: moment().format("YYYY-MM-DD HH:mm"),
                });
                this.userInput = '';
            });
        },
        methods: {
            initData: function() {
                this.msgTempData = msgData;
                // 请求服务器
                socket.emit('chatMessage'); 
                socket.on('chatMessage', (data) => {
                    this.onlineUsersCount = data.onlineUsersCount;
                });
            },

            postMessage: function() {
                // 传给服务器端
                console.log(this.$route.query.currentUser.userName);
                socket.emit('sendMessage', {content: this.userInput, userName: this.$route.query.currentUser.userName});
            },
        }

    }
</script>
<style lang='scss' scoped>

    @import 'src/styles/common.scss';

    .chatroom-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    nav h1 {
        font-size: 30px;
        margin: 0;
    }

    .onlineCount {
        color: #F9266F;
    }

    .content-wrapper {
        width: 90%;
        position: fixed;
        bottom: 10px;
        top: 150px;
        left: 5%;
    }

    .chatroom-content {
        background-color: #f9f9f9;
        height: 90%;
        overflow: auto;
        border:1px solid #aaa;
        border-radius: 5px;
    }

    .message-wrapper {
        margin-top: 10px;
    }

    .message {
        width: 100%;
        height: 35px;
        border: 1px solid #888;
        border-radius: 5px;
        box-shadow: none;
        outline: none;
        font-size: 20px;
        outline: none;
    }

    .message:focus {
        border: 1px solid #64D9EF;        
    }

    // 消息
    .msg-item {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .left {
        text-align: left;
    }

   .right {
        text-align: right;
    }

</style>