<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Danh sách sản phẩm</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Sole</th>
          <th scope="col">Sale</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Product 1</td>
          <td>500000</td>
          <td>250</td>
          <td>120</td>
          <td>20%</td>
          <td class="">
            
            <RouterLink to="products/1/edit" class="nav-link"><span class="action-icon"><font-awesome-icon icon="fa-solid fa-edit" class="icon edit"/></span></RouterLink>
          
            <span class="action-icon" data-bs-toggle="modal" data-bs-target="#deleteModel">
              <font-awesome-icon icon="fa-solid fa-trash" class="icon delete"/>
            </span>
            <!-- Modal -->
            <div class="modal fade" id="deleteModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    Bạn có chắc muốn xóa sản phẩm ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger">Save changes</button>
                  </div>
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