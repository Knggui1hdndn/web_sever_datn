<template>

  <nav class="wrap">
   
    <div v-if="role === true" class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon icon="fa-solid fa-tag" class="icon"/>
      <RouterLink to="/products" class="nav-link">Quản lý sản phẩm</RouterLink>
    </div>
    <div v-if="role === true" class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon icon="fa-solid fa-users" class="icon"/>
      <RouterLink to="/users" class="nav-link">Quản lý người dùng</RouterLink>
    </div>
    <div class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon icon="fa-solid fa-cart-shopping" class="icon"/>
      <RouterLink to="/orders" class="nav-link">Đơn hàng</RouterLink>
    </div>
    <div v-if="role === true" class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon icon="fa-solid fa-home" class="icon"/>
      <RouterLink to="/" class="nav-link">Thống kê</RouterLink>
    </div>
    <div class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon :icon="['fas', 'comment']" />    
             <RouterLink to="/chat" class="nav-link">Chat</RouterLink>
    </div>
    
    <div v-if="role === true" class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon :icon="['fasr', 'users']" />    
        <RouterLink to="/membership" class="nav-link">Nhân viên</RouterLink>
    </div>
    <div v-if="role === false" class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon :icon="['fasr', 'users']" />    
        <RouterLink to="/nv" class="nav-link">Nhân viên</RouterLink>
    </div>

    <div class="d-flex align-items-center py-2 pe-2 nav-wrap">
      <font-awesome-icon icon="fa-solid fa-sign-out" class="icon"/>
      <RouterLink to="/login" class="nav-link">Đăng xuất</RouterLink>
    </div>

  </nav>
</template>

<script setup>
import {  isAdmin, isMember } from "../utils/authUtils";
const getUserRole = () => {
  return localStorage.getItem("role");
};
let role = isAdmin(localStorage.getItem("role"));
console.log(role);





</script>

<style scoped>
.wrap {
  padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
}

.nav-link {
  margin-left: 12px;
  color: #3A3541;
  font-weight: 600;
  font-size: 18px;
}
.nav-link.router-link-active {
  color: #9155FD;
}
.nav-wrap:has(.nav-link.router-link-active) .icon {
  color: #9155FD;
}
</style>