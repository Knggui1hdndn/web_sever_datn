<template>
  <ChatLayout>
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
              <div v-for="message in listMessage" :key="message._id" class="message-wrap">
                <div class="message-item self-message" v-if="message.isToUser">
                  <p v-if="message.message" class="message-content">{{ message.message }}</p>
                  <div v-for="(url, i) in message.url" :key="i" class="images">
                    <img :src="url" alt="">
                  </div>
                </div>
                <div v-else class="message-item other-message">
                  <div v-if="message.message" class="message-content">{{ message.message }}</div>
                  <div v-for="(url, i) in message.url" :key="i" class="images">
                    <img :src="url" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="footer">
        <input id="image" accept="image/gif, image/jpeg, image/png, image/jpg" type="file" style="display: none"
          ref="fileInput" @change="(e) => handleFileUpload(e)" />
        <label for="image" class="paperclip-label">
          <font-awesome-icon icon="fa-solid fa-paperclip" class="icon" />
        </label>
        <!-- <img :src="previewImage" alt="Preview Image" v-if="previewImage" /> -->

        <div class="input-wrap">
          <input class="input-msg" ref="messageInput" v-model="message" type="text" placeholder="Write a message">
        </div>
        <font-awesome-icon icon="fa-solid fa-paper-plane" class="icon" @click="sendMessage" />
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center wrapper">
      Hãy chọn một đoạn chat
    </div>

  </div>
  </ChatLayout>
</template>
<script >
import ApiService from "@/services/api.service";
import io from 'socket.io-client';
import ChatLayout from "./ChatLayout.vue";

export default {
  components:{
    ChatLayout
  },
  data() {
    return {
      listMessage: [],
      message: '',
      file: null,
      imageUrls: [],
    }
  },
  created() {
    this.initSocketConnection();
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
          id: this.convUserId
        }
      });
      this.listMessage = response.data
      console.log(this.listMessage);
    }, initSocketConnection() {

<<<<<<< HEAD
      this.socket = io('http://192.168.0.102:8000');
=======
      this.socket = io('http://192.168.1.181:8000');
>>>>>>> 0c73aac4a812c9623910135963d5fe202059d1fd

      this.socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      this.socket.on('receive_message', (message) => {
        console.log('Received message:', message);
        this.listMessage.push(message);
      });
    },
    sendMessage() {
      if (this.message.trim() !== "" || this.imageUrls.length > 0) {
        const messageData = {
          sender: "6580620f54359a69e67ae888",
          receiver: this.convUserId,
          message: this.imageUrls.length > 0 ? '' : this.message,
          isToUser: true,
          url: this.imageUrls
        };
        this.socket.emit("send_message", messageData)
        this.listMessage.push(messageData);

        this.message = "";
        this.imageUrls = [];
      }
    },
    showNotification(title, message) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body: message });
          }
        });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.uploadImage();
    },
    async uploadImage() {
      var formData = new FormData();
      formData.append("images", this.file);
      try {
          const response = await ApiService.post("/chat", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          this.imageUrls = response.data;
          this.sendMessage();
      } catch (error) {
          console.log(error);
      }
  }


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

.message-wrap:has(.other-message)+.message-wrap .other-message img {
  /* visibility: hidden; */
}

/* .message-wrap:not(.message-wrap:has(.other-message):has(+ .message-wrap .other-message)) .message-content {
  border-top-left-radius: 16px;
}

.message-wrap:not(.message-wrap:has(.self-message):has(+ .message-wrap .self-message)) .message-content {
  border-top-right-radius: 16px;
}

.message-wrap:has(.other-message)+.message-wrap:has(.self-message) .message-content {
  border-bottom-right-radius: 16px;
}

.message-wrap:has(.self-message)+.message-wrap:has(.other-message) .message-content {
  border-bottom-left-radius: 16px;
} */

.message-wrap:first-child .message-content {
  border-bottom-left-radius: 16px;
}

.message-wrap:first-child .message-content {
  border-bottom-right-radius: 16px;
}

.message-wrap .message-item.other-message {
  /* display: flex;
  align-items: center; */
}

.message-item.other-message img {
  /* width: 30px;
  height: auto;
  margin: 0 5px 5px;
  display: block;
  border-radius: 50%; */
}

.message-content {
  padding: 7px 12px 8px;
  border-radius: 5px;
  background: rgb(220, 220, 220);
  /* float: left; */
  display: inline-block;
  margin-bottom: 1px;
  color: rgb(19, 19, 19);
  font-size: 15px;
  line-height: 20px;
  max-width: 500px;
  text-wrap: wrap;
  overflow-wrap: break-word;
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
.images {
  display: flex;
  max-width: 500px;
  float: right;
}
.message-wrap .message-item.other-message .images {
  float: none;
}
.images img {
  width: 100px;
  height: 150px;
  object-fit: contain;
  border: 1px solid #888;
  border-radius: 4px;
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