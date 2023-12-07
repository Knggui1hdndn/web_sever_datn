<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Danh sách người dùng</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Ảnh đại diện</th>
          <th scope="col">Email</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Employed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ item.name }}</td>
          <td>
            <img :src="item.avatar" alt="Avatar" class="avatar-image" />
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.address }}</td>
          <td>
            <select name="emp" :disabled="true">
              <option>{{ item.employed ? 'Yes' : 'No' }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.avatar-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

<script setup>
import ApiService from "@/services/api.service";
import { ref } from "vue";

const data = ref([]);

async function fetchData() {
  const response = await ApiService.get("/users/listUser");
  data.value = response.data;
  console.log(response.data);
}

fetchData();
</script>
