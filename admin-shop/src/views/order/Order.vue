<template>
  <div class="p-3">
    <div class="model-body">
      <form>
        <h6>Ngày bắt đầu</h6>
        <input type="datetime-local" class="from" :value="startDate" @input="getStartChange">
      </form>

      <form>
        <h6>Ngày kết thúc</h6>
        <input type="datetime-local" class="from" :value="endDate" @input="getEndChange">
      </form>
      <form>
        <h6>Số điện thoại</h6>
        <input type="tel" class="form" :value="phoneChange" @input="getPhoneChage">
      </form>
      <form>
        <h6>Mã Đơn Hàng </h6>
        <input type="text" class="form" :value="ladingChange" @input="getLading">
      </form>
      <div class="button">
        <button type="button" class="btn btn-primary btn-block" @click="fetchData">Tìm kiếm </button>
      </div>

    </div>
    <h3 class="fs-5 mb-4">Danh sách sản phẩm</h3>

    <table class="table table-striped table-bordered">

      <thead>
        <tr>
          <th scope="col">#</th>

          <th scope="col">Ngày đặt hàng </th>
          <th scope="col">Tên người nhận</th>
          <th scope="col">Số điện thoại </th>
          <th scope="col">Mô tả đơn hàng</th>
          <th scope="col">Trạng thái Thanh Toán</th>
          <th scope="col">Tổng giá tiền</th>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Trạng thái Đơn Hàng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ item.createAt }}</td>
          <td>{{ item.name }} </td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.isPay }}</td>
          <td>{{ item.totalAmount }}</td>

          <td>
            {{ item.codeOrders }}
          </td>
          <td>
  <select v-model="item.status" :style="{ color: getStatusColor(item.status) }">
    <option value="Chờ xác nhận" :disabled="item.status !== 'Chờ xác nhận'">Đang chờ xác nhận</option>
    <option value="Đã xác nhận" :disabled="item.status !== 'Chờ xác nhận' && item.status !== 'Đã xác nhận'">Đã xác nhận</option>
    <option value="Đang giao hàng" :disabled="item.status !== 'Đã xác nhận' && item.status !== 'Đang giao hàng'">Đang giao hàng</option>
    <option value="Đã giao hàng" :disabled="item.status !== 'Đang giao hàng' && item.status !== 'Đã giao hàng'">Giao Hàng thành công</option>
    <option value="Hủy" :disabled="item.status !== 'Chờ xác nhận' || item.isPay">Hủy Bỏ</option>
    <option value="Trả hàng" :disabled="item.status !== 'Đã giao hàng'">Trả Hàng</option>
  </select>
  <button @click="confirm(item._id, item.status)" :disabled="item.status === 'Hủy'">Confirm</button>
</td>
          <td class="">

            <RouterLink :to="`orders/${item._id}/details`" class="nav-link"><span class="action-icon"><font-awesome-icon
                  icon="fa-solid fa-edit" class="icon edit" /></span></RouterLink>


      
            <div class="modal fade" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">



                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { ref, onMounted } from "vue";
const data = ref([])
const startDate = ref('');
const endDate = ref('');
const phoneChange = ref('');
const ladingChange = ref('');
let start_date = "";
let end_date = "";
let phone = "";
let lading = "";
const getStartChange = (event) => {
  start_date = event.target.value.split('T')[0];
}
const getEndChange = (event) => {
  end_date = event.target.value.split('T')[0];
}
const getPhoneChage = (event) => {
  phone = event.target.value;
  console.log(phone)
}
const getLading = (event) => {
  lading = event.target.value;
  console.log(lading);
}
const confirm = async (id, status) => {
  const response = await ApiService.put(`/order?idOrder=${id}&status=${status}`)
  console.log(response);
  window.alert("Thay đổi trạng thái đơn hàng thành công")
}
async function fetchData() {
  const response = await ApiService.get(`/order/search?startDate=${start_date}&endDate=${end_date}&phoneNumber=${phone}&orderCode=${lading}`);
  data.value = response.data;
  console.log(response.data);
}
onMounted(() => {

  fetchData();
})
const getStatusColor = (status) => {
  switch (status) {
    case 'Chờ xác nhận':
      return 'blue';
    case 'Đã xác nhận':
      return 'green';
    case 'Đang giao hàng':
      return 'orange';
    case 'Đã giao hàng':
      return 'purple';
    case 'Hủy':
      return 'red';
    case 'Trả Hàng':
      return 'brown';
    default:
      return '';
  }
};
</script>

<style scoped>
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  margin: 0 4px;
  cursor: pointer;
  transition: all linear .3s;
}

.action-icon:hover {
  background-color: #ddd;
}

.action-icon .icon {
  font-size: 18px;
}

.icon.edit {
  color: #3267e4;
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
}</style>