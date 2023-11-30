<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Cập nhật sản phẩm</h3>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-6">
          <InputComp v-model="product.name" name="name" label="Tên sản phẩm" :rules="notBlank" />
        </div>
        <div class="col-12 col-md-6">
          <InputComp v-model="product.price" name="price" label="Giá" :rules="notBlank" />
        </div>
        <div class="col-12 col-md-6">
          <InputComp v-model="product.quantity" name="quantity" label="Số lượng" :rules="notBlank" />
        </div>
        <div class="col-12 col-md-6">
          <InputComp v-model="product.description" name="description" label="Mô tả" :rules="notBlank" />
        </div>
        
        <div class="col-12 col-md-6">
          <SelectComp v-model="selectedSize" :items="size" itemTitle="size" itemValue="_id" name="Size" label="Size" />
        </div>
        <div class="col-12 col-md-6">
          <InputComp v-model="product.sale" name="sale" label="Giảm giá" :rules="notBlank" />
        </div>
        <div class="col-12 col-md-6">
          <SelectComp v-model="product.idCata" :items="categories" itemTitle="category" itemValue="_id" name="idCata"
            label="Loại sản phẩm" />
        </div>
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6">
          <SelectComp v-model="product.color" :items="colors" name="color" label="Màu sắc" />
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
import ApiService from "@/services/api.service";

import { ref } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute();
const { id } = route.params;
console.log(route);
console.log(id);
const {_id} = route.params;
console.log(_id);

let product = ref({
  name: "",
  price: "",
  sold: "",
  sale: "",
  description: "",
  idCata: "",

})
console.log(product);
async function fetchData() {
  const response = await ApiService.get("/products/details/" + id);
  product.value = response.data;
  // console.log(response.data);

}
const categories = ref([])
const Getcategories = async () => {
  try {
    const response = await ApiService.get("/categories");
    categories.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

}
const idCata = ref({
  _id:"",
  category:"",
})
const Getcate = async () =>{

    const response = await ApiService.get("/products/details/" + id);
    idCata.value = response.data
  
}
Getcate();
Getcategories();
fetchData();
const getSize = async () => {

}
// const getProducts = async () => {
//     try {
//         const response = await ApiService.post("products/"+id, {
//             size: product.value.size,
//         });
//         console.log(response);
//         if (response.status == 201 || response.status == 200) {
//             const responseQuatity = await ApiService.post("products/productQuantity/"+response.data._id, {
//                 idProductDetail: response.data._id,
//                 imageProduct: idProductImage.value,
//                 quantity: product.value.quantity
//             })
//             console.log(responseQuatity);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// } 

let notBlank = [
  (v) => !!v || "Không được để trống"
]


</script>

<style scoped></style>