<template>
  <h3 class="fs-5 mb-4">Thêm Thể Loại</h3>
  <div class="container-fluid">
    <div class="p-3">
      <div v-if="alertMessage" class="alert alert-success" role="alert">
        {{ alertMessage }}
      </div>
      <div class=" col-12 col-md2">
        <InputComp v-model="newCategory" name="newCategory" label="Thêm Thể Loại" />
        <div class="text-center">
          <button type="button" class="btn btn-primary btn-block mb-4" @click="addNewCategory">Thêm thể loại </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md2">
          <div class="row">
            <table class="table table-hover">

              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Thể Loại</th>
                  <th>Trạng Thái</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <!-- Use v-for to loop through categories -->
                <tr v-for="(category, index) in categories" :key="category.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="col-12 col-md-6">
                      <InputComp v-model="category.category" />
                    </div>
                  </td>
                  <td>
                    <select v-model="category.status">
                      <option value="true">Hoạt Động bình thường</option>
                      <option value="false">Tạm thời bị khóa</option>
                    </select>
                    <button @click="() => confirm(category._id, category.status)">Confirm</button>
                  </td>
                  <td>
                    <div class="text-center">
                      <button type="button" class="btn btn-primary btn-block mb-4"
                        @click="() => UpdateCategory(category._id, category.category)">Cập nhật
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import ApiService from "@/services/api.service";
import { ref } from "vue";
const alertMessage = ref('');


const newCategory = ref("");
const categories = ref([]);

const Getcategories = async () => {
  try {
    const response = await ApiService.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const addNewCategory = async () => {
  try {
    const response = await ApiService.post("/categories", { category: newCategory.value });
    categories.value.push(response.data);
    newCategory.value = "";
    window.alert("Thêm thể loại thành công!");
  } catch (error) {
    console.log(error);
    window.alert("Đã xảy ra lỗi khi thêm thể loại.");
  }
};
const confirm = async (id, status) => {
  try {
    const response = await ApiService.put(`/categories/visibility?idCategory=${id}`, {
      status: status,
      id: id
    });

    // Fix the typo here
    window.alert("Cập nhật trạng thái thành công!");

    // Kiểm tra nếu cập nhật thành công
    if (response.status === 200) {
      showAlert('Cập nhật trạng thái thành công!');
    } else {
      showAlert('Cập nhật trạng thái không thành công!');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái:', error);
  }
};
const UpdateCategory = async (id, category) => {
  try {
    const response = await ApiService.put(`/categories/updateCategories/${id}`, {
      category: category
    });

    if (response.status === 200) {
      window.alert('Cập nhật thể loại thành công!');
    } else {
      window.alert('Cập nhật thể loại không thành công!');
    }

    console.log(response);
  } catch (error) {
    console.error('Lỗi khi cập nhật thể loại:', error);
  }
};
Getcategories();
</script>