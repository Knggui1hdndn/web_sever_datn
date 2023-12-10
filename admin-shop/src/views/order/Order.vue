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
      <div class>
        <button type="button" class="btn btn-primary btn-block mb-4" @click="fetchData">Tìm kiếm </button>
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
          <th scope="col">Mã đơn hàng </th>
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
            {{ item.ladingCode }}
          </td>
          <td>
            <select v-model="item.status">
              <option value="Wait for confirmation">WAIT_FOR_CONFIRMATION</option>
              <option value="Confirmed">CONFIRMED</option>
              <option value="Delivering">DELIVERING</option>
              <option value="Delivered">DELIVERED</option>
              <option value="Cancel">CANCEL</option>
              <option value="Returns">RETURNS</option>
              <option value="Hollow">HOLLOW</option>
            </select>
            <button @click="confirm(item._id,item.status)">Confirm</button>
          </td>
          <td class="">

            <RouterLink :to="`orders/${item._id}/details`" class="nav-link"><span class="action-icon"><font-awesome-icon
                  icon="fa-solid fa-edit" class="icon edit" /></span></RouterLink>


            <!-- Modal -->
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
import { ref,onMounted } from "vue";
const data = ref([])
const startDate = ref('');
const endDate = ref('');
const phoneChange = ref('');
let start_date = "";
let end_date = "";
let phone = "";
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
const confirm = async(id,status)=>{
  const response = await ApiService.put(`/order?idOrder=${id}&status=${status}`)
  console.log(response);
}
async function fetchData() {
  const response = await ApiService.get(`/order/search?startDate=${start_date}&endDate=${end_date}&phoneNumber=${phone}`);
  data.value = response.data;
  console.log(response.data);
}
onMounted(()=>{
 
  fetchData();
})
</script>

<style scoped>
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  /* background-color: #ddd; */
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

.icon.delete {
  color: #FF4C51;
}

.model-body {
  display: flex;
}

.model-body form {
  margin-right: 20px;
  /* hoặc bất kỳ giá trị margin nào phù hợp */
}

.button-form {
  margin-top: 20px;
  /* Khoảng cách từ button đến form */
}</style>