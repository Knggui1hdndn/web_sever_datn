<template>
  <div class="">
    <div v-if="!!convUserId" class="wrapper">
      <div class="header">
        <div>
          <div class="name">{{ 'Abcasdfsaf' }}</div>
          <div class="info">
            online
          </div>
        </div>
      </div>

      <div class="body">
        <div v-if="listMessage == null || listMessage.length == 0">
          
        </div>
        <template v-else>
          <div class="conversation-wrap">
            <div class="conversation-reverse">
              <div 
                v-for="message in listMessage"
                :key="message._id"
                class="message-wrap"
              >
                <div class="message-item self-message" v-if="message.isToUser">
                  <p class="message-content">{{message.message}}</p>
                </div>
                <div v-else class="message-item other-message">
                  <div class="message-content">{{message.message}}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="footer">
        <font-awesome-icon icon="fa-solid fa-paperclip" class="icon"/>
        <div class="input-wrap">
          <input 
          class="input-msg"
          ref="messageInput"
          v-model="message"
          type="text"
          placeholder="Write a message"
        >
        </div>
        <font-awesome-icon icon="fa-solid fa-paper-plane" class="icon"  @click="sendMessage"/>
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center wrapper">
      Hãy chọn một đoạn chat
    </div>
  </div>
</template>
<script>
import ApiService from "@/services/api.service";
import io from 'socket.io-client';


export default {
  data() {
    return {
      listMessage: [],
      message: ''
    }
  },
  computed: {
    convUserId() {
      return this.$route.params.userId;
    }
  },
  methods: {
    async getChatInfo() {
      const response = await ApiService.get("/chat/all", {
        params: {
          idUser: this.convUserId
        }
      });
      this.listMessage = response.data
      console.log(this.listMessage);
    },
    sendMessage() {
      if (this.message.trim() !== "") {
        const messageData = {
          idUser: this.convUserId,
          message: this.message,
          isToUser: true 
        };

        
        this.$socket.emit("send_message", messageData);

       
        this.message = "";
      }
    },


    
  },
  mounted() {
    this.getChatInfo();
  },
  watch: {
    convUserId() {
      this.getInfoConversation();
    }
  }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
}
.header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.header .name {
  font-weight: 500;
  color: rgb(19, 19, 19);
}
.header .info {
  font-size: 14px;
  color: rgb(120, 120, 120);
}

.body {
  height: 100%;
  flex: 1;
}

.conversation-wrap {
  height: calc(100vh - 78px - 64px);
  padding: 12px 12px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

.conversation-wrap::-webkit-scrollbar {
  width: 6px;
}
.conversation-wrap::-webkit-scrollbar-track {
  background: rgb(220, 220, 220); 
}
.conversation-wrap::-webkit-scrollbar-thumb {
  background: rgb(72, 166, 195); 
  border-radius: 8px;
}

.conversation-reverse {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.message-wrap:has(.other-message) + .message-wrap .other-message img {
  visibility: hidden;
}
.message-wrap:not(.message-wrap:has(.other-message):has(+ .message-wrap .other-message)) .message-content {
  border-top-left-radius: 16px;
}
.message-wrap:not(.message-wrap:has(.self-message):has(+ .message-wrap .self-message)) .message-content {
  border-top-right-radius: 16px;
}
.message-wrap:has(.other-message) + .message-wrap:has(.self-message) .message-content {
  border-bottom-right-radius: 16px;
}
.message-wrap:has(.self-message) + .message-wrap:has(.other-message) .message-content {
  border-bottom-left-radius: 16px;
}
.message-wrap:first-child .message-content {
  border-bottom-left-radius: 16px;
}
.message-wrap:first-child .message-content {
  border-bottom-right-radius: 16px;
}
.message-wrap

.message-item.other-message {
  display: flex;
  align-items: center;
}
.message-item.other-message img {
  width: 30px;
  height: auto;
  margin: 0 5px 5px;
  display: block;
  border-radius: 50%;
}

.message-content {
  padding: 7px 12px 8px;
  border-radius: 5px;
  background: rgb(220, 220, 220); 
  float: left;
  margin-bottom: 1px;
  color: rgb(19, 19, 19);
  font-size: 15px;
  line-height: 20px;
}
.other-message .message-content {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.self-message .message-content {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.message-content p {
  margin: 0;
}

.self-message .message-content {
  background-color: rgb(41, 95, 194);
  float: right;
  color: #fff;
}

.footer {
  padding: 12px 0;
  display: flex;
  align-items: center;
  width: 100%;
}
.input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  outline: none;
  background-color: rgb(220, 220, 220);
  padding: 6px 2px 6px 14px;
  border-radius: 99px;
  height: 40px;
  position: relative;
}
.input-msg {
  font-size: 15px;
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  color: rgb(19, 19, 19);
}
.input-msg::placeholder {
  color: rgb(120, 120, 120);
}
.footer .icon {
  color: var(--primary-color);
  font-size: 18px;
  margin: 0 10px;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid rgba(220, 220, 220, 0.8);
}
.footer .icon:hover {
  background-color: rgb(220, 220, 220);
}
.emoji-picker {
  position: absolute;
  bottom: calc(100% + 20px);
  right: 0;
}
</style>