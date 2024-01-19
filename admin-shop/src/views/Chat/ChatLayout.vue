<template>
    <div class="d-flex">
        <div class="chat-list">
            <ChatList @update-name="handleUpdateName" :items="listChat"/>
        </div>
        <div class="flex-grow-1">
         <!-- <slot></slot> -->
         <Chat :name="currentUser"/>
        </div>
    </div>
</template>
<script>
import ChatList from '../../components/ChatList.vue';
import Chat from './Chat.vue';
import ApiService from "@/services/api.service";
export default {
    components: {
        ChatList,
        Chat,
    },
    data: () => ({
        listChat: null,
        currentUser: "",
    }),
    methods: {
        async getListChat() {
            const response = await ApiService.get('/chat/user-chat');
            this.listChat = response.data;
            console.log(this.listChat);
        },
        handleUpdateName(data) {
            this.currentUser = data;
            console.log(this.currentUser);
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