<template>
  <div class="">
    <Header />
    <div>
      <LeftBar class="left-bar"/>
      <div class="view"><router-view></router-view></div>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import LeftBar from "./components/LeftBar.vue";
</script>

<style scoped>
.left-bar {
  width: 300px;
  border-right: 1px solid #f2f3f2;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 60px;
}
.view {
  padding-top: 60px;
  padding-left: 300px;
  height: 100%;
}
</style>