<template>
    <div class="wrapper">
        <div v-for="item in items" :key="item.user._id">
            <router-link :to="'/chat/'+item.user._id" @click="$emit('updateName', item.user.name)" class="contact-wrap" v-if="item.lastMessage != null">
                <img class="avatar" :src="item.user.avatar" :alt="item.user.name">
                <div class="detail" @click="handleItemClick(item)">
                    <div class="name">{{ item.user.name  }}</div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="msg" v-if="item.user._id == item.lastMessage.sender">
                            {{item.lastMessage.message}}
                        </div>
                        <div class="msg" v-else>{{ "Bạn: "+  item.lastMessage.message }}</div>
                    </div>
                </div>

            </router-link>
        </div>
    </div>

</template>
<script>
export default {
    name: 'ChatList',
    props: {
        items: {type: Array},
        item:{type:Object}
    },
    emits: ['updateName'],
    data: () => ({

    }),
    methods: {
        convertTime() {

        },
        handleItemClick(item) {
 
         this.$emit('item-clicked', item);
      },
    }
}

</script>

<style scoped>
.wrapper {
    padding: 16px 8px;
    border-right: 1px solid #999;
    height: 100vh;
}
.contact-wrap {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border-radius: 18px;
    margin-bottom: 6px;
    background-color: transparent;
    display: flex;
    cursor: pointer;
    text-decoration: none;
    color: #333;
}
.contact-wrap:hover {
    background-color: #ddd;
}
.avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid #999;
    object-fit: cover;
}
.detail {
    margin-left: 12px;
    flex: 1;
}
.name {
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.msg {
  margin-top: 4px;
  font-size: 14px;
  color: #919191;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>