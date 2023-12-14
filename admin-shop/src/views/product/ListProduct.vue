<template>
  <div class="p-3">
    <div v-if="alertMessage" class="alert alert-success" role="alert">
  {{ alertMessage }}
</div>
    <h3 class="fs-5 mb-4">Danh sách sản phẩm</h3>
    <div class="row-container">
      <div class="cha">
        <div class="pro">
          <RouterLink to="/products/add" class="nav-link">
            <span>Thêm sản phẩm</span>
          </RouterLink>
        </div>
        <div class="cate">
          <RouterLink to="/products/addCate" class="nav-link">
            <span>Thêm thể loại</span>
          </RouterLink>
        </div>

      </div>
      <div class="model-body">
        <form>
          <h6>Tên Sản Phẩm </h6>
          <input type="tel" class="form" :value="namepro" @input="getName">
        </form>
        <div class="button">
          <button type="button" class="btn btn-primary btn-block" @click="searchProduct">Tìm kiếm </button>
        </div>

      </div>

    </div>

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
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>

            {{ item.name }}
          </td>

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
              <option value="true" >Hiện</option>
              <option value="false">Ẩn</option>
            </select>
            <button @click="confirm(item._id, item.status)">Confirm</button>
          </td>
          <td class="">

            <RouterLink :to="`products/${item._id}/edit`" class="nav-link"><span class="action-icon"><font-awesome-icon
                  icon="fa-solid fa-edit" class="icon edit" /></span></RouterLink>
            <RouterLink :to="`products/${item._id}/addSP`" class="nav-link"><span class="action-icon"><font-awesome-icon
                  icon="fa-solid fa-add" class="icon add" /></span></RouterLink>


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
    <div class="pagination">
      <ul>
        <li v-for="(i, index) in arrPage" :key="index" @click="getPage(i.page)">{{ i.page }}</li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { ref, onMounted } from "vue";
const namepro = ref('');
const alertMessage = ref('');
const showAlert = (message) => {
  alertMessage.value = message;
  setTimeout(() => {
    alertMessage.value = '';
  }, 3000); // Thời gian hiển thị cảnh báo (3 giây trong ví dụ)
};
let nameproduct = "";
const getName = (event) => {
  nameproduct = event.target.value;
  console.log(nameproduct)
}
const data = ref([])
const totalPage = ref(0);
const perPage = ref(5);
const arrPage = ref([]);
let totalPageCounts = 0;
const fetchData = async (skip) => {
  console.log("skip", skip)
  arrPage.value = [];
  const response = await ApiService.get(`/products?skip=${skip ? skip : ''}`);
  data.value = response.data;
  const totalPageCount = totalPage.value / perPage.value;
  totalPageCounts = totalPage.value / perPage.value;
  for (let i = 0; i < totalPageCount; i++) {
    arrPage.value = [...arrPage.value, { page: i, }]
  }
  console.log("arrPage.value", arrPage.value);
  response.data.map((e) => {
    count(e._id)
  })
}
const getAll = async () => {
  const response = await ApiService.get(`/products/get-all`);
  totalPage.value = response.data.total.length;
}
const getPage = (page) => {
  let skipItem = (page + 1 - 1) * 5;
  fetchData(skipItem)
}
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
async function searchProduct() {
  const response = await ApiService.get(`/products/search?name=${nameproduct}`);
  data.value = response.data;
  console.log(response.data);
}
const getStatusColor = (status) => {
  // Determine the initial color based on the current status
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

    // Kiểm tra nếu cập nhật thành công
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
  getAll();

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

.row-container {
  display: flex;
  justify-content: center;
}

.cha {
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  padding: 7px 0px;
}

.pro {
  margin-right: 10px;
}

.pro .nav-link {
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  background-color: #dc3545;
  transition: background-color 0.3s ease;
}

.cate .nav-link {
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  background-color: #28a745;
  /* Green background color */
  transition: background-color 0.3s ease;
}

.nav-link span {
  font-size: 14px;
}

.nav-link:hover {
  background-color: #6c757d;
}

.pagination {
  width: 100%;
}

.pagination span {
  cursor: pointer;
  background-color: silver;
  height: 34px;
  font-weight: 800;
}

.pagination span:hover {
  background-color: #000;
  color: #fff;
}

.pagination ul {
  display: flex;
  justify-content: space-around;
  padding-left: 0px;
}

.pagination ul li {
  cursor: pointer;
  color: white;
  background-color: #09cd3d;
  padding: 5px 10px;
  list-style: none;
  margin-right: 5px;
  margin-left: 5px;
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