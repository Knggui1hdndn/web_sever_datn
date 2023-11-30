<template>
  <div class="p-3">
    <h3 class="fs-5 mb-4">Danh sách người dùng</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Email</th>
           <th scope="col">Employed</th>
          
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
          <td>  <select name="emp" disabled>
    <option>No</option>
    <option>Yes</option>
  </select></td>

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