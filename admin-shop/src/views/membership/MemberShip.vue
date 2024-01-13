<template>
  <div class="p-3">

    <h3 class="fs-5 mb-4">Danh sách Nhân viên </h3>
    <div class="row-container">
      <div class="cha">
        <div class="cate">
          <RouterLink to="/users/addNV" class="nav-link">
            <span>Thêm Nhân viên </span>
          </RouterLink>
        </div>
      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Nhân viên </th>
            <th scope="col">Số điện thoại </th>
            <th scope="col">Địa chỉ </th>


          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id">
            <th scope="row">{{ ++index }}</th>

            <td>{{ item.name }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.address }}</td>


          </tr>
        </tbody>
      </table>
      <h3 class="fs-5 mb-4">Số lượng đơn hàng bán được </h3>
      <div class="model-body">
        <form>
          <h6>Ngày bắt đầu</h6>
          <input type="datetime-local" class="from" :value="startDate" @input="getStartChange">
        </form>

        <form>
          <h6>Ngày kết thúc</h6>
          <input type="datetime-local" class="from" :value="endDate" @input="getEndChange">
        </form>
        <div class="button">
        <button type="button" class="btn btn-primary btn-block" @click="dem">Tìm kiếm </button>
      </div>

      </div>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Nhân viên </th>
            <th scope="col">Số đơn đã bán </th>
            <th scope="col">Chi tiết</th>



          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in Count" :key="item.id">
            <th scope="row">{{ ++index }}</th>

            <td>{{ item.name }}</td>
            <td>{{ item.totalCount }}</td>
            <td>
              <RouterLink :to="`membership/${item.id}/detail`" class="nav-link"><span
                  class="action-icon"><font-awesome-icon icon="fa-solid fa-edit" class="icon edit" /></span></RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

.cate {
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  background-color: #28a745;
  /* Green background color */
  transition: background-color 0.3s ease;

}

.model-body {
  position: relative;
  display: flex;
  align-items: center;
}

.cha {
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  padding: 7px 0px;
}

.button {
  margin-top: 20px;
  margin-bottom: 0px;
}
</style>
<script setup>
import ApiService from "@/services/api.service";
import { ref, onMounted } from "vue";
const data = ref({});
const Count = ref([]);
const startDate = ref('');
const endDate = ref('');
let start_date = "";
let end_date = "";
const getStartChange = (event) => {
  start_date = event.target.value.split('T')[0];
}
const getEndChange = (event) => {
  end_date = event.target.value.split('T')[0];
}
async function fetchData() {
  try {
    const response = await ApiService.get("/users/listMember");
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function dem() {
  try {
    const response = await ApiService.get(`/users/successfulDeliveries?startDate=${start_date}&endDate=${end_date}`);
    Count.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  fetchData();

  dem();



})

</script>
  