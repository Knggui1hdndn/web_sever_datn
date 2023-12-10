<template>
    <div class="p-3">
        <h3 class="fs-5 mb-4">Thêm Sản phẩm</h3>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.size" name="size" label="Size" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.color" name="color" label="Màu săc" :rules="notBlank" />
                </div>
               
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.quantity" name="quantity" label=" Số lượng" :rules="notBlank" />
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
            <button type="button" class="btn btn-primary btn-block mb-4" @click="add">Thêm mới</button>
        </div>
    </div>
</template>
<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import ApiService from "@/services/api.service";
import { ref, } from "vue";
import { useRoute } from 'vue-router'

const product = ref({
    size: "",
    color: "",
    quantity: "",
});
const route = useRoute();
const { id } = route.params; 

const notBlank = [
    (v) => !!v || "Không được để trống"
];
// upload image
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
const idProductImage = ref(null);
const addColor = async () => {
    var formData = new FormData();
    var imagefile = document.querySelector('#file');
    formData.append("image", file.value);
    formData.append("color", product.value.color);
    const response = await ApiService.post("/products/image/"+id, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    idProductImage.value = response.data._id;
}
const addSize = async () => {
    try {
        const response = await ApiService.post("products/details/"+id, {
            size: product.value.size,
        });
        console.log(response);
        if (response.status == 201 || response.status == 200) {
            const responseQuatity = await ApiService.post("products/productQuantity/"+response.data._id, {
                idProductDetail: response.data._id,
                imageProduct: idProductImage.value,
                quantity: product.value.quantity
            })
            console.log(responseQuatity);
        }
    } catch (error) {
        console.log(error)
    }
} 
const add = async () => {
    await addColor();
    await addSize();
}
</script>
  