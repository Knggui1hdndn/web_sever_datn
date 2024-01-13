<template>
  <div class="p-3">
    <div class="model-body">

    </div>

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
              {{ item.status }}
          </td>
          <td class="">



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
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';  

const data = ref([])
const route = useRoute();
const { id } = route.params; 

console.log(id);
async function fetchData() {
  const response = await ApiService.get(`order/${id}`);
  data.value = response.data;
  console.log(response.data);
}
onMounted(() => {

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