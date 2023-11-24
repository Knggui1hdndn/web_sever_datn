<template>
  <div>
    <h2>{{ product.name }}</h2>
    <p>Price: {{ product.price }}</p>
    <p>Sold: {{ product.sold }}</p>
    <p>Sale: {{ product.sale }}%</p>
    <p>Description: {{ product.description }}</p>

    <h3>Product Details</h3>
    <div v-for="detail in product.productDetails" :key="detail._id">
      <h4>Size: {{ detail.size }}</h4>

      <div v-for="imageQuantity in detail.imageProductQuantity" :key="imageQuantity._id">
        <h5>Color: {{ imageQuantity.imageProduct.color }}</h5>
        <img :src="imageQuantity.imageProduct.image" alt="Product Image" style="max-width: 200px; max-height: 200px;">
        <p>Quantity: {{ imageQuantity.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const product = ref(null);

onMounted(async () => {
  // Fetch the product data or set it from a parent component
  // For example, if this component is used in a route, you might use the route params to fetch the product details.
  // You can replace this part with your actual data-fetching logic.
  // For example:
  // const response = await ApiService.get(`/products/${productId}`);
  // product.value = response.data;

  // For the sake of the example, setting a mock product
  product.value = {
    "_id": "653890e702006aa106aff95a",
    "name": "Sample Product",
    "price": 10000000,
    "sold": 200,
    "sale": 10,
    "description": "Diện mạo đẳng cấp và cực kỳ sang trọng...",
    "idCata": "652fad8bb5ac76700c242f52",
    "__v": 0,
    "productDetails": [
      {
        "_id": "653890e702006aa106aff95c",
        "idProduct": "653890e702006aa106aff95a",
        "size": "L",
        "__v": 0,
        "imageProductQuantity": [
          {
            "_id": "653890e702006aa106aff960",
            "idProductDetail": "653890e702006aa106aff95c",
            "imageProduct": {
              "_id": "653890e702006aa106aff95e",
              "idProduct": "653890e702006aa106aff95a",
              "color": "Red",
              "image": "https://4.bp.blogspot.com/-soN7UfyIM54/W0dscJBgWII/AAAAAAAAwgE/kNJIrasnFjwnGT-IAHkYiZk6B8lTyAbGgCLcBGAs/s640/girl-xinh-thanh-hoa-3.jpg",
              "__v": 0
            },
            "quantity": 10,
            "__v": 0
          }
        ]
      }
    ]
  };
});
</script>

<style scoped>
/* Add your styling here if needed */
</style>
