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
              v-model="product.description"
              name="description"
              label="Mô tả"
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
          <!-- <div class="col-12 col-md-6"></div>
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
          </div> -->
        </div>
        <div class="row">
          <h3 class="fs-5 mb-4 mt-2">Hình ảnh</h3>
          <input type="file" @change="handleFileChange" />
      <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
    </div>
        
      </div>
      <div class="text-center">
            <button type="button" class="btn btn-primary btn-block mb-4" @click="saveProduct">Thêm mới</button>
          </div>
    </div>
  </template>
  
  <!-- <script setup>
  import InputComp from '../../components/InputComp.vue';
  import SelectComp from '../../components/SelectComp.vue';
  import ApiService from "@/services/api.service";
  import { ref } from "vue";
  
  
  
  let product = ref({
    name: "",
    price: "",
    description: "",
    sale: "",
    category: {},
    // size: {},
    // color: {},
  })
  const imageUrl = ref(""); 
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
  };
  async function fetchData() {
    const response = await ApiService.post("/products");
    data.value = response.data;
  }
  
  let notBlank = [
    (v) => !!v || "Không được để trống"
  ]
  
  let categories = [
    { title: "Quần âu", value: 0 },
    { title: "Áo dài tay", value: 1},
    { title: "Áo khoác", value: 2}
  ]
   
      const response = await ApiService.get(`/products/${productId}`);
      const fetchedProduct = response.data;
      
      // Initialize the product object with the fetched data
      product.value = {
        name: fetchedProduct.name,
        price: fetchedProduct.price,
        description: fetchedProduct.description,
        sale: fetchedProduct.sale,
        category: fetchedProduct.category,
      };
    
  </script>
  
  <style scoped>
  
  </style> -->
  <script setup>
  import InputComp from '../../components/InputComp.vue';
  import SelectComp from '../../components/SelectComp.vue';
  import ApiService from "@/services/api.service";
  import { ref, onMounted } from "vue";
  
  const generateUniqueId = () => Math.random().toString(36).substr(2, 9); // Simple ID generator
  
  const product = ref({
    id: generateUniqueId(),
    name: "",
    price: "",
    description: "",
    sale: "",
    category: {},
  });
  
  const notBlank = [
    (v) => !!v || "Không được để trống"
  ];
  
  const categories = [
    { title: "Quần âu", value: 0 },
    { title: "Áo dài tay", value: 1},
    { title: "Áo khoác", value: 2}
  ];
  
  const imageUrl = ref(""); // Assuming imageUrl is reactive
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Assuming you have a method to handle file changes and update the imageUrl
    // Example: updateImageUrl(file);
  };
  
  const saveProduct = async () => {
    try {
      // Assuming you have an API endpoint for saving a new product
      await ApiService.post("/products", this.product);
      console.log("Product saved successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  
  onMounted(async () => {
    try {
      // Assuming you have an API endpoint for fetching product details by ID
      // const productId = 123; // Replace with the actual product ID
      const response = await ApiService.get(`/products/${productId}`);
      const fetchedProduct = response.data;
  
      // Initialize the product object with the fetched data
      product.value = {
        id: fetchedProduct.id,
        name: fetchedProduct.name,
        price: fetchedProduct.price,
        description: fetchedProduct.description,
        sale: fetchedProduct.sale,
        category: fetchedProduct.category,
      };
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    console.log(onMounted);
  });
  </script>
  