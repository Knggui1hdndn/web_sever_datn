<template>
  <div class="p-3">
    <div class="model-body">
      <form>
        <h6>Tên người dùng </h6>
        <input type="tel" class="form" :value="nameChange" @input="getNamechange">
      </form>
      <div class="button">
        <button type="button" class="btn btn-primary btn-block" @click="search">Tìm kiếm </button>
      </div>

    </div>
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
          <th scope="col">Trạng thái hoạt động</th>
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
        <select v-model="item.status" :style="{ color: getStatusColor(item.status) }" >
          <option value="true">Hoạt Động bình thường</option>
          <option value="false">Tạm thời bị khóa</option>
        </select>
        <button @click="() => confirm(item._id, item.status)">Confirm</button>
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

.model-body {
  position: relative;
  display: flex;
  align-items: center;
}

.model-body form {
  margin-right: 20px;
  /* hoặc bất kỳ giá trị margin nào phù hợp */
}


.button {
  margin-top: 20px;
  margin-bottom: 0px;
}


</style>

<script setup>
import ApiService from "@/services/api.service";
import { ref, onMounted } from "vue";
const nameChange = ref('');
import { useRoute } from 'vue-router'


let name = "";
const getNamechange = (event) => {
  name = event.target.value;
  console.log(name)
}
const data = ref({});

const confirm = async (_id, status) => {
  try {
    const response = await ApiService.put(`/users?idUser=${_id}`, { status });
    console.log(response.data);
    window.alert("Cập nhật trạng thái thành công !");
  } catch (error) {
    console.error('Error confirming user:', error);
  }
};

async function fetchData() {
  try {
    const response = await ApiService.get("/users/listUser");
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function search() {
  const response = await ApiService.get(`/users?name=${name}`);
  data.value = response.data;
  console.log(response.data);
}
fetchData();
onMounted(() => {

  search();
  
})
const getStatusColor = (status) => {
  switch (status) {
   
    case 'true':
      return 'green';
    
    case 'false':
      return 'red';
      default:
      return  '';
  }
};
</script>
