<template> 
    <div>
        <div class="time-wrapper">
            <span class="time">{{ msg.time }}</span>
        </div>
        <template v-if="msg.sourceType === 1">
            <span class="nickname">{{ msg.nickname }}</span>
            <span>: </span>
            <span>{{ msg.content }}</span>
        </template>
        <template v-else>
            <span>{{ msg.content }}</span>
            <span>: </span>
            <span class="nickname">{{ msg.nickname }}</span>
        </template>
    </div>     
</template>

<script >
    export default {
        props: ['msg'],
    }
</script>

<style lang='scss' scoped>
    .nickname {
        font-size: 14px;
        color: #666;
    }

    .time-wrapper {
        font-size: 14px;
        text-align: center;
        color: #888;
    }
</style>