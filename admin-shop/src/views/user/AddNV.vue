<template>
    <div class="p-3">
        <h3 class="fs-5 mb-4">Thêm Nhân Viên </h3>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.username" name="username" label="Tên Nhân Viên" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.phoneNumber" name="phonenumber" label="Số điện thoại" :rules="notBlank" />
                </div>
               
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.password" name="password" label="Mật Khẩu" :rules="notBlank" />
                </div>
                <div class="col-12 col-md-6">
                    <InputComp v-model="product.address" name="address" label="Địa chỉ" :rules="notBlank" />
                </div>
               
                <!-- <div class="row">
                    <h3 class="fs-5 mb-4 mt-2">Hình ảnh</h3>
                   
                    <input id="image" accept="image/gif, image/jpeg, image/png, image/jpg" type="file"
                        @change="(e) => handleFileUpload(e)" />
                        <img :src="previewImage">
                </div> -->
                
            </div>

        </div>
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-block mb-4" @click="AddNv">Thêm mới</button>
        </div>
    </div>
</template>
<script setup>
import InputComp from '../../components/InputComp.vue';
import SelectComp from '../../components/SelectComp.vue';
import ApiService from "@/services/api.service";
import { ref } from "vue";
import { useRoute } from 'vue-router';

const product = ref({
    username: "",
    phoneNumber: "",
    password: "",
    address:"",
});



const notBlank = [
    (v) => !!v || "Không được để trống"
];

// const file = ref(null);
// let previewImage = "";
// const handleFileUpload = (event)=> {
//     file.value = event.target.files[0];
//     console.log(file.value);
//     encodeImage(file.value);
// }
// const encodeImage = (file)=> {
//     const reader = new FileReader();
//     reader.onload = () => {
//         const base64Image = reader.result.split(",")[1];
//         previewImage = "data:image/jpeg;base64," + base64Image;
//     };
//     reader.readAsDataURL(file);
// }
// const idProductImage = ref(null);

// const addColor = async () => {
//     var formData = new FormData();
//     var imagefile = document.querySelector('#file');
//     formData.append("image", file.value);
//     formData.append("color", product.value.color);

//     try {
//         const response = await ApiService.post("/products/image/"+id, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
        
//         idProductImage.value = response.data._id;

//         window.alert("Thêm màu sắc thành công!");
//     } catch (error) {
//         console.log(error);
//         window.alert("Đã xảy ra lỗi khi thêm màu sắc.");
//     }
// }

    const AddNv = async () => {
    try {
        const response = await ApiService.post("/auth/signUp?roleType=MEMBER", product.value);
        if (response.status == 201 || response.status == 200) {

            var formData = new FormData();
            var imagefile = document.querySelector('#file');
            formData.append("image", file.value);
            const upload = ApiService.post("/products/image/" + response.data._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            window.alert("Thêm sản phẩm thành công!");

        }
    } catch (error) {
        console.log(error);
    }

} 

const add = async () => {
    await AddNv();
}
</script>