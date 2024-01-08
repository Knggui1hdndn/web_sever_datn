<template>
    <div class="d-flex">
        <div class="chat-list">
            <ChatList :items="listChat"/>
        </div>
        <div class="flex-grow-1">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import ChatList from '../../components/ChatList.vue';
import ApiService from "@/services/api.service";
export default {
    components: {
        ChatList,
    },
    data: () => ({
        listChat: null,
    }),
    methods: {
        async getListChat() {
            const response = await ApiService.get('/chat/user-chat');
            this.listChat = response.data;
            console.log(this.listChat);
        }
    },
    created() {
        this.getListChat();
    }
}

</script>

<style scoped>
.chat-list {
    width: 350px;
}
</style>