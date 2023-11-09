<template>
    <div class="p-3">
      <h3 class="fs-5 mb-4">Chi tiết đơn hàng </h3>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Sản Phẩm </th>
            <th scope="col"> TỔng </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>áo dạ </td>
            <td>500000</td>
          </tr>
        <tr>
            <td>áo dạ </td>
            <td>500000</td>
        </tr>
        <tr>
            <th scope="row">Phương Thức Thanh toán </th>
            <th scope="row">Chuyển Khoản </th>
        </tr>
        <tr>
            <th scope="row">Tổng cộng </th>
            <th scope="row"></th>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="thongtin">
            <h2 class="fs-5 mb-4">Địa chỉ nhận hàng </h2>
            <td>Tên </td>
            <td>Địa chỉ</td>
            <td>Số điện thoại</td>
            <td>Email</td>
            <td></td>
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