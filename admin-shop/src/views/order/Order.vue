<template>
  <div class="p-3">
    <div class="model-body">
  <form>
    <h6>Ngày bắt đầu</h6>
    <input type="datetime-local" class="from">
  </form>
  
  <form>
    <h6>Ngày kết thúc</h6>
    <input type="datetime-local" class="from">
  </form>
  <form>
    <h6>Số điện thoại</h6>
    <input type="tel" class="form">
  </form>
  <div class>
            <button type="button" class="btn btn-primary btn-block mb-4" @click="AddProduct">Thêm mới</button>
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
          <th scope="col">Trạng thái Đơn Hàng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for ="(item,index) in data" :key="item.id" >
          <th scope="row">{{ ++index }}</th>
          <td>{{ item.createAt }}</td>
          <td>{{ item.name }} </td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.isPay }}</td>
          <td>{{ item.totalAmount }}</td>
          <td>{{ item.status }}</td>
          <td class="">
            
            <RouterLink to="orders/1/details" class="nav-link"><span class="action-icon"><font-awesome-icon icon="fa-solid fa-edit" class="icon edit"/></span></RouterLink>
          
            <span class="action-icon" data-bs-toggle="modal" data-bs-target="#deleteModel">
              <font-awesome-icon icon="fa-solid fa-trash" class="icon delete"/>
            </span>
            <!-- Modal -->
            <div class="modal fade" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Bạn có chắc muốn xóa sản phẩm ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger">Save changes</button>
                  </div>
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
import { ref } from "vue";
const data = ref([])
async function fetchData(){
  const response = await ApiService.get("/order/search");
  data.value = response.data;
  console.log(response.data);
}
fetchData();
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
.action-icon  .icon {
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
  margin-right: 20px; /* hoặc bất kỳ giá trị margin nào phù hợp */
}
.button-form {
  margin-top: 20px; /* Khoảng cách từ button đến form */
}

</style>