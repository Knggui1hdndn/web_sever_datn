<template>
  <h3> Bảng điều khiển</h3>
  <div>
    <!-- Top Section -->
    <div class="top-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card text-bg-primary">
              <div class="card-body">
                <h5 class="card-title">Số lượng sản phâm</h5>
                <p class="card-text">{{ dataTop1 }}</p>
                <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title">Số Lượng sản phẩm đã bán</h5>
                <p class="card-text">{{ dataTop3 }}</p>
                <a href="#" class="arrow-link"> <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            
          </div>
          </div>
          <div class="col">
            <div class="card text-bg-secondary">
              <div class="card-body">
                <h5 class="card-title">Số lượng khách hàng </h5>
                <p class="card-text">{{ dataTop2 }}</p>
                <a href="#" class="arrow-link"> <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 3</h5>
                <p class="card-text">{{ dataTop3 }}</p>
                <a href="#" class="arrow-link"> <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          </div>
          <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title">Số lượng đơn hàng</h5>
                <p class="card-text">{{ dataTop3 }}</p>
                <a href="#" class="arrow-link"> <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title">Tổng doanh số </h5>
                <p class="card-text">{{ dataTop3 }}</p>
                <a href="#" class="arrow-link"> <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div>
      
  <div class="model-body">
  <form>
    <h6>Ngày bắt đầu</h6>
    <input type="datetime-local" class="from">
  </form>
  <form>
    <h6>Ngày kết thúc</h6>
    <input type="datetime-local" class="from">
  </form>
</div>
      </div>



    
    <h3>Tốp 5 sản phẩm bán chạy nhất </h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Ảnh </th>
          <th scope="col">Giá</th>
          <th scope="col">Số Lượng đã bán</th>
          <th scope="col">Thể Loại</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ item.name }}</td>
          <td>
            <img :src="item.avatar" alt="Avatar" class="avatar-image" />
          </td>
          <td>{{ item.email }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.address }}</td>
          <td>
            <select name="emp" :disabled="true">
              <option>{{ item.employed ? 'Yes' : 'No' }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  
</template>
<script setup>
  const dataTop1 = "123";
  const dataTop2 = "456";
  const dataTop3 = "789";
  const dataBottom1 = "111";
  const dataBottom2 = "222";
  const dataBottom3 = "333";
</script>

<style scoped>
  .top-section,
  .bottom-section {
    padding: 50px 0;
  }

  .card {
    border: none;
    margin-bottom: 20px;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .card-text {
    font-size: 1.2rem;
  }

  .arrow-link {
    display: block;
    margin-top: 10px;
    color: #007bff; /* Bootstrap primary color */
  }

  .arrow-link i {
    margin-left: 5px;
  }

  .text-bg-primary {
    background-color: #007bff; /* Bootstrap primary color */
    color: #fff;
  }

  .text-bg-secondary {
    background-color: #6c757d; /* Bootstrap secondary color */
    color: #fff;
  }

  .text-bg-success {
    background-color: #28a745; /* Bootstrap success color */
  }
  .model-body {
  display: flex;
}

.model-body form {
  margin-right: 20px; /* hoặc bất kỳ giá trị margin nào phù hợp */
}

  </style>