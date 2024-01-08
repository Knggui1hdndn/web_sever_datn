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
            <th scope="col">Thể Loại </th>
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
            <td>{{ item.idCata }}</td>
            <td>
              <span v-for="(i, index) in countArr" :key="index">
                <span v-if="item._id === i.id">{{ i.total }}</span>
              </span>
            </td>
            <td>{{ item.sold }}</td>
            <td>{{ item.sale ? item.sale + '%' : '--' }}</td>
            <td>
              <select v-model="item.status" :style="{ color: getStatusColor(item.status) }">
                <option value="true">Hiện</option>
                <option value="false">Ẩn</option>
              </select>
              <button @click="confirm(item._id, item.status)">Confirm</button>
            </td>
            <!-- <td class="">
              <RouterLink :to="`products/${item._id}/edit`" class="nav-link"><span class="action-icon"><font-awesome-icon
                    icon="fa-solid fa-edit" class="icon edit" /></span></RouterLink>
              <RouterLink :to="`products/${item._id}/addSP`" class="nav-link"><span class="action-icon"><font-awesome-icon
                    icon="fa-solid fa-add" class="icon add" /></span></RouterLink>
              <div class="modal fade" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content"></div>
                </div>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import ApiService from "@/services/api.service";
  import { ref, onMounted } from "vue";
  
  const alertMessage = ref('');
  
  const showAlert = (message) => {
    alertMessage.value = message;
    setTimeout(() => {
      alertMessage.value = '';
    }, 3000); // Thời gian hiển thị cảnh báo (3 giây trong ví dụ)
  };
  
  const data = ref([]);
  const countArr = ref([]);
  
  const fetchData = async () => {
    const response = await ApiService.get(`/products`);
    data.value = response.data;
    response.data.map((e) => {
      count(e._id);
    });
  };
  
  const count = async (id) => {
    try {
      let countValue = 0;
      const response = await ApiService.get(`/products/${id}/count`);
      countArr.value = [...countArr.value, { id: id, total: response.data }];
    } catch (err) {
      console.log(err);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'true':
        return 'green';
      case 'false':
        return 'red';
      default:
        return '';
    }
  };
  
  const confirm = async (id, status) => {
    try {
      const response = await ApiService.put(`/products/visibility?idProduct=${id}`, {
        status: status,
        id: id
      });
  
      if (response.status === 200) {
        showAlert('Cập nhật trạng thái thành công!');
      } else {
        showAlert('Cập nhật trạng thái không thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      showAlert('Đã xảy ra lỗi khi cập nhật trạng thái!');
    }
  };
  
  onMounted(() => {
    fetchData();
  });
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
  
  .icon.add {
    color: #28a745;
  }
  
  .row-container {
    display: flex;
    justify-content: center;
  }
  
  .cha {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 7px 0px;
  }
  
  .model-body {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .model-body form {
    margin-right: 20px;
  }
  
  .button {
    margin-top: 20px;
    margin-bottom: 0px;
  }
  
  select option[value="true"] {
    color: green !important;
  }
  
  select option[value="false"] {
    color: red !important;
  }
  </style>
  