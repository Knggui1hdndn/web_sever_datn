
<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Chi tiết đơn hàng</h3>
    <div>
      <strong>Tên người đặt Hàng :</strong> {{ data.name }}<br>
      <strong>Địa chỉ :</strong> {{ data.address }}<br>
      <strong>Số điện thoại :</strong> {{ data.phoneNumber }}<br>
    </div>

    <div>
      <strong>Mô tả :</strong> {{ data.description }}<br>
      <strong>Tổng tiền:</strong> {{ data.totalAmount }}<br>
      <strong>Trạng thái thanh toán :</strong> {{ data.isPay ? 'Đã Thanh toán' : 'Chưa thanh toán' }}<br>
      <strong>Phương thức thanh toán :</strong> {{ data.payments }}<br>
      <strong>Trạng thái đơn hàng  :</strong> {{ data.status }}<br>
      <strong>Mã đơn hàng :</strong>   {{ data.codeOrders }}<br>
    </div>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Ảnh Sản Phẩm</th> 
          <th scope="col">Màu sắc</th>
          <th scope="col">Size</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Giảm giá </th>
          <th scope="col">Thành tiền</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.detailsOrder" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>
            <img :src="item.image" alt="Product Image" style="max-width: 100px; max-height: 100px;">
          </td>
          <td>{{ item.color }}</td>
          <td>{{ item.size }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.sale ? item.sale + '%' : '--' }}</td>
          <td>{{ item.intoMoney }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
  
    
  
</template>

<script setup>
import InputComp from '../../components/InputComp.vue';
import ApiService from "@/services/api.service";
import { ref } from "vue";
import { useRoute } from 'vue-router';

const notBlank = [
  (v) => !!v || "Không được để trống"
];

const route = useRoute();
const { id } = route.params;


const data = ref({});

async function fetchData() {
  try {
    const response = await ApiService.get(`order/detail-order?idOrder=${id}`);
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



fetchData();
</script>

<style scoped>
/* Your CSS styles here */
</style>