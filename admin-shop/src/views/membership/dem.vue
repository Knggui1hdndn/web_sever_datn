<template>
  <h3 class="fs-5 mb-4">Số lượng đơn hàng bán được </h3>
  <div class="model-body">
    <form>
      <h6>Ngày bắt đầu</h6>
      <input type="datetime-local" class="from" :value="startDate" @input="getStartChange">
    </form>

    <form>
      <h6>Ngày kết thúc</h6>
      <input v-model="endDate" type="datetime-local" class="from" @input="getEndChange"/>
    </form>
    <div class="button">
      <button type="button" class="btn btn-primary btn-block" @click="loc">Tìm kiếm </button>
    </div>

  </div>
  <table class="table table-striped table-bordered">
    <thead>
      <tr>

        <th scope="col">Tên Nhân viên </th>
        <th scope="col">Số đơn đã bán </th>
        <th scope="col">Tổng tiền</th>
        <th scope="col">Chi tiết</th>

      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ data.name }}</td>
        <td>{{ data.totalCount }}</td>
        <td>{{ data.totalAmount }}</td>
        <td>
          <RouterLink :to="`membership/${data.id}/detail`" class="nav-link">
            <span class="action-icon">
              <font-awesome-icon icon="fa-solid fa-edit" class="icon edit" />
            </span>
          </RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
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
const data = ref([]);
const startDate = ref('');
let start_date = "";
let end_date = "";
const getStartChange = (event) => {
  start_date = event.target.value.split('T')[0];
}
const getEndChange = (event) => {
  end_date = event.target.value.split('T')[0];
  console.log(end_date);
}
const endDate = ref(getFormattedDate(new Date()));
function getFormattedDate(date) {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  console.log(`${year}-${month}-${day}T${hours}:${minutes}`);

  return `${year}-${month}-${day}T${hours}:${minutes}`;

}
async function dem() {
  try {
    const response = await ApiService.get(`/users/totalCountOrder`);
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function loc() {
  try {
    const response = await ApiService.get(`/users/totalCountOrder?startDate=${start_date}&endDate=${end_date}`);
    data.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
loc();

  dem();



})

</script>
    