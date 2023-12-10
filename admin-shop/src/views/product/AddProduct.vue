<template>
    <div class="p-3">
        <h3 class="fs-5 mb-4">Thêm Sản phẩm</h3>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.name" name="name" label="Tên sản phẩm" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.price" name="price" label="Giá" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.description" name="description" label="Mô tả" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.sale" name="sale" label="Giảm giá" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <SelectComp v-model="selectedCate" :items="categories" itemTitle="category" itemValue="_id"
                        name="category" label="Loại sản phẩm" />
                </div>
                <div class="row">
                    <h3 class="fs-5 mb-4 mt-2">Hình ảnh</h3>
                  
                    <input id="image" accept="image/gif, image/jpeg, image/png, image/jpg" type="file"
                        @change="(e) => handleFileUpload(e)" />
                        <img :src="previewImage">
                </div>
                
            </div>

        </div>
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-block mb-4" @click="AddProduct">Thêm mới</button>
        </div>
    </div>
</template>
  
  
<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import ApiService from "@/services/api.service";
import { ref, } from "vue";

const product = ref({
    name: "",
    price: "",
    description: "",
    sale: "",
});
const selectedCate = ref(null)

const notBlank = [
    (v) => !!v || "Không được để trống"
];

const categories = ref([])

const Getcategories = async () => {
    try {
        const response = await ApiService.get("/categories");
        categories.value = response.data;

        console.log(categories.value);
    } catch (error) {
        console.log(error);
    }

}
const file = ref(null)
let previewImage = "";
const handleFileUpload = (event)=> {
    file.value = event.target.files[0];
    console.log(file.value);
    encodeImage(file.value);
}
const encodeImage = (file)=> {
    const reader = new FileReader();
    reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        previewImage = "data:image/jpeg;base64," + base64Image
    };
    reader.readAsDataURL(file);
}


Getcategories();
const AddProduct = async () => {
    try {
        product.value.idCata = selectedCate.value._id;
        const response = await ApiService.post("/products", product.value);
        if (response.status == 201 || response.status == 200) {

            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("image", file.value);
            const upload =ApiService.post("/products/image/" + response.data._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(upload);

   

        }
    } catch (error) {
        console.log(error)

    }
}


</script>
  