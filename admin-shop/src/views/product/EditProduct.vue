<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Cập nhật sản phẩm</h3>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6">
          <InputComp
            v-model="product.name"
            name="name"
            label="Tên sản phẩm"
            :rules="notBlank"
          />
        </div>
        <div class="col-12 col-md-6">
          <InputComp
            v-model="product.price"
            name="price"
            label="Giá"
            :rules="notBlank"
          />
        </div>
        <div class="col-12 col-md-6">
          <InputComp
            v-model="product.quantity"
            name="quantity"
            label="Số lượng"
            :rules="notBlank"
          />
        </div>
        <div class="col-12 col-md-6">
          <InputComp
            v-model="product.sale"
            name="sale"
            label="Giảm giá"
            :rules="notBlank"
          />
        </div>
        <div class="col-12 col-md-6">
          <SelectComp
            v-model="product.category"
            :items="categories"
            name="category"
            label="Loại sản phẩm"
          />
        </div>
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6">
          <SelectComp
            v-model="product.color"
            :items="colors"
            name="color"
            label="Màu sắc"
          />
        </div>
        <div class="col-12 col-md-6">
          <SelectComp
            v-model="product.size"
            :items="sizes"
            name="size"
            label="Cỡ"
          />
        </div>
      </div>
      <div class="row">
        <h3 class="fs-5 mb-4 mt-2">Hình ảnh</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import { ref } from "vue";

let product = ref({
  name: "",
  price: "",
  quantity: "",
  sale: "",
  category: {},
  size: {},
  color: {},
})

let notBlank = [
  (v) => !!v || "Không được để trống"
]

let categories = [
  { title: "Quần âu", value: 0 },
  { title: "Áo dài tay", value: 1},
  { title: "Áo khoác", value: 2}
]
let colors = [
  { title: "Trắng", value: 0},
  { title: "Đen", value: 1},
  { title: "Be", value: 2},
  { title: "Nâu", value: 3},
]
let sizes = [
  { title: "S", value: 0},
  { title: "M", value: 1},
  { title: "L", value: 2},
  { title: "XL", value: 3},
]
</script>

<style scoped>

</style>