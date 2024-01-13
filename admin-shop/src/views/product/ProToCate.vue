<template>
  <div class="p-3">
    <div v-if="alertMessage" class="alert alert-success" role="alert">
      {{ alertMessage }}
    </div>
    <h3 class="fs-5 mb-4">Danh sách sản phẩm</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Thể Loại</th>
          <th scope="col">Số Lượng</th>
          <th scope="col">Đã Bán</th>
          <th scope="col">Giảm giá</th>
          <th scope="col">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.idCata.category }}</td>
         <td>
            <span v-for="(i, index) in countArr" :key="index">
              <span v-if="item._id === i.id">{{ i.total }}</span>
            </span>
          </td>
          <td>{{ item.sold }}</td>
          <td>{{ item.sale ? item.sale + '%' : '--' }}</td>
          <!-- Add your status dropdown and confirm button here if needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'

const route = useRoute();
const { id } = route.params;

const alertMessage = ref('');

const showAlert = (message) => {
  alertMessage.value = message;
  setTimeout(() => {
    alertMessage.value = '';
  }, 3000);
};

const data = ref([]);

const fetchData = async () => {
  try {
    const response = await ApiService.get(`/products/${id}`);
    data.value = response.data;
    response.data.map((e) => {
    count(e._id)
    })
  } catch (error) {
    console.error('Error fetching product details:', error);

  }
  
};
let countArr = ref([]);
const count = async (id) => {
  countArr.value = []
  try {
    let countValue = 0;
    const response = await ApiService.get(`/products/${id}/count`)
    countArr.value = [...countArr.value, { id: id, total: response.data }];
  } catch (err) {
    
    console.log(err)
  }
  
  
}


onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Your styling goes here */
</style>
