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
        <div class="col-12 col-md-12">
          <InputComp v-model="product.description" name="description" label="Mô tả" :rules="notBlank" />
        </div>

        <div class="col-12 col-md-6">
          <InputComp v-model="product.sale" name="sale" label="Giảm giá" :rules="notBlank" />
        </div>
        <div class="col-12 col-md-6">
          <SelectComp v-model="product.idCata" :items="categories" itemTitle="category" itemValue="_id" name="idCata"
            label="Loại sản phẩm" />
        </div>
        <div class="col-12 col-md-6"></div>


      </div>
      <div class="text-center">
        <button type="button" class="btn btn-primary btn-block mb-4" @click="UpdateProduct">Cập nhật
        </button>
      </div>
      <h3 class="fs-5 mb-4 mt-4">Cập nhật chi tiết sản phẩm</h3>
      <div>
        <div v-for="productDetail in product.productDetails" :key="productDetail._id"
          class="d-flex align-items-center product-detail">
          <div class="size">
            <InputComp v-model="productDetail.size" :rules="notBlank" label="Kích cỡ" />
            <div class="text-center">
              <button type="button" class="btn btn-primary"
                @click="UpdateProductDetail(productDetail._id, productDetail.size)">Cập nhật</button>
            </div>
          </div>
          <div class="flex-grow-1">
            <div v-for="imageProductQuantity in productDetail.imageProductQuantity" :key="imageProductQuantity._id"
              class="d-flex align-items-center image-product-quantity">
              <div class="flex-grow-1 pe-2">
                <InputComp v-model="imageProductQuantity.quantity" label="Số lượng" :rules="notBlank" />
              </div>
              <div class="flex-grow-1 pe-2">
                <InputComp v-model="imageProductQuantity.imageProduct.color" label="Màu sắc" :rules="notBlank" />
              </div>
              <div class="product-image">
                <img :src="imageProductQuantity.imageProduct.image" alt="">
              </div>
              <button type="button" class="btn btn-primary ms-2"
                @click="UpdateProductQuantity(imageProductQuantity._id, imageProductQuantity.quantity, imageProductQuantity._id)">
                <font-awesome-icon icon="fa-solid fa-repeat" class="icon delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <h6>Bình luận , đánh giá </h6>
      <div class="cmt">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col">Name</th>
              <th scope="col">Comment </th>
              <th scope="col">Đánh giá sao </th>
              <th scope="col">Hành động</th>


            </tr>
          </thead>
          <tbody>
  <tr v-for="(cmt, index) in data" :key="cmt.id">
    <th scope="row">{{ ++index }}</th>
    <td>
      <img :src="cmt.avatar" alt="Avatar" class="avatar-image" />
    </td>
    <td>{{ cmt.name }}</td>
    <td>{{ cmt.comment }}</td>
    <td>{{ cmt.star }}</td>
    <td class="">
      <span class="action-icon" data-bs-toggle="modal" v-bind:data-bs-target="`#deleteModel-${ cmt._id }`">
        <font-awesome-icon icon="fa-solid fa-trash" class="icon delete"/>
      </span>
      <div class="modal fade" v-bind:id="`deleteModel-${ cmt._id }`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa sản phẩm</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn xóa bình luận của <span class="fw-bold">{{ cmt.id }}</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="deletecmt(cmt._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</tbody>
        </table>

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

let product = ref({
  name: "",
  price: "",
  sold: "",
  sale: "",
  description: "",
  idCata: "",
})
async function fetchData() {
  const response = await ApiService.get("/products/details/" + id);
  product.value = response.data;
  console.log(product.value);
}
const categories = ref([])
const Getcategories = async () => {
  try {
    const response = await ApiService.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }

}
const UpdateProduct = async () => {
  const response = await ApiService.put("/products", {
    name: product.value.name,
    price: product.value.price,
    sale: product.value.sale,
    description: product.value.description,
    idCata: product.value.idCata._id,
    id: id,
  })
  console.log(response);
}

const UpdateProductDetail = async (id, size) => {
  const response = await ApiService.put("/products/details", {
    idProductDetail: id,
    size: size
  })
  console.log(response);
}

const UpdateProductQuantity = async (id, quantity, image) => {
  const response = await ApiService.put("/products/productQuantity", {
    idImageQuantity: id,
    quantity: quantity,
    image: image
  })
  console.log(response);
}

Getcategories();
fetchData();

let notBlank = [
  (v) => !!v || "Không được để trống"
]
const data = ref([])

async function Comment() {
  const response = await ApiService.get("/evaluate/admin/"+id);
  data.value = response.data;
  console.log("comment",response.data);
}
const deletecmt = async (id) => {
  console.log(id)
  try {
    const response = await ApiService.delete(`/evaluate/admin/`+id);
    if(response.data.message){
      alert(response.data.message)
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};
Comment();

</script>

<style scoped>
.product-detail {
  border: 1px solid #333;
}

.product-detail .size {
  padding: 12px 8px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.product-detail .image-product-quantity {
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  padding: 12px 8px;
  flex: 1;
  border-bottom: 1px solid #333;
}

.product-image {
  width: 100px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}</style>