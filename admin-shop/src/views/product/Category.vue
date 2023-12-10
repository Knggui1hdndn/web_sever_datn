<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Thêm Sản phẩm</h3>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-6">
              <SelectComp v-model="selectedCate" :items="categories" itemTitle="category" itemValue="_id" name="category"
                label="Loại sản phẩm" />
            </div>
            <InputComp v-model="newCategory" name="newCategory" label="Thêm Thể Loại" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-primary btn-block mb-4" @click="addNewCategory">Thêm mới</button>
    </div>
    
    
  </div>
</template>

<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import ApiService from "@/services/api.service";
import { ref } from "vue";

const selectedCate = ref(null);
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
    newCategory.value = ""; // Clear the input after adding
    window.alert("Thêm thể loại thành công!");
  } catch (error) {
    console.log(error);
    window.alert("Đã xảy ra lỗi khi thêm thể loại.");
  }
};


Getcategories();
</script>
