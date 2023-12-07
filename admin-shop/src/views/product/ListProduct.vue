<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Danh sách sản phẩm</h3>
    <RouterLink to="/products/add" class="nav-link"><span class="action-icon"><font-awesome-icon icon="fa-solid fa-add" class="icon edit"/></span></RouterLink>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Thể Loại </th>
          <th scope="col">Quantity</th>
          <th scope="col">Sole</th>
          <th scope="col">Sale</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>
  <RouterLink :to="`products/${item._id}/details`" class="nav-link">

    {{ item.name }}
  </RouterLink>
</td>

          <td>{{ item.price }}</td>
          <td>{{ item.idCata }}</td>

          <td>{{ getTotalQuatity(item
          ) }}</td>
          
          <td>{{ item.Sole }}</td>
          <td>{{ item.sale ? item.sale + '%' : '--' }}</td>
          <td class="">
            
            <RouterLink :to="`products/${item._id}/edit`" class="nav-link"><span class="action-icon"><font-awesome-icon icon="fa-solid fa-edit" class="icon edit"/></span></RouterLink>
            <RouterLink :to="`products/${item._id}/addSP`" class="nav-link"><span class="action-icon"><font-awesome-icon icon="fa-solid fa-add" class="icon add"/></span></RouterLink>

            <span class="action-icon" data-bs-toggle="modal" data-bs-target="#deleteModel">
              <font-awesome-icon icon="fa-solid fa-trash" class="icon delete"/>
            </span>
            <!-- Modal -->
            <div class="modal fade" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                 
                  
                
                
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { ref } from "vue";
const data = ref([])

async function fetchData() {
  const response = await ApiService.get("/products");
  data.value = response.data;
  console.log(response.data);

}

function getTotalQuatity(product) {
  return product.quantity;

}

fetchData();

</script>

<style scoped>
.action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  /* background-color: #ddd; */
  font-size: 20px;
  margin: 0 4px;
  cursor: pointer;
  transition: all linear .3s;
}
.action-icon:hover {
  background-color: #ddd;
}
.action-icon  .icon {
  font-size: 18px;
}
.icon.edit {
  color: #3267e4;
}
.icon.delete {
  color: #FF4C51;
}
</style>