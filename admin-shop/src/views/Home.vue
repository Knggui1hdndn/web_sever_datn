<template>
  <div>
    <!-- Top Section -->
    <div class="top-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card text-bg-primary">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 1</h5>
                <p class="card-text">{{ dataTop1 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-secondary">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 2</h5>
                <p class="card-text">{{ dataTop2 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 3</h5>
                <p class="card-text">{{ dataTop3 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bottom-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card text-bg-danger">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 4</h5>
                <p class="card-text">{{ dataBottom1 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-warning">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 5</h5>
                <p class="card-text">{{ dataBottom2 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-info">
              <div class="card-body">
                <h5 class="card-title">Tiêu Đề 6</h5>
                <p class="card-text">{{ dataBottom3 }}</p>
                <a href="#" class="arrow-link">Điều hướng <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
    <div>
      <b-form-group label="Chọn khoảng ngày">
      <b-row>
        <b-col>
          <b-form-datepicker
            v-model="startDate"
            placeholder="Ngày bắt đầu"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker
            v-model="endDate"
            placeholder="Ngày kết thúc"
          ></b-form-datepicker>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group label="Chọn khoảng ngày">
      <b-row>
        <b-col>
          <b-form-datepicker
            v-model="startDate"
            placeholder="Ngày bắt đầu"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
        <b-col>
          <b-form-datepicker
            v-model="endDate"
            placeholder="Ngày kết thúc"
          ></b-form-datepicker>
        </b-col>
      </b-row>
    </b-form-group>
  </div>
  </div>
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
  /* Add any custom styles as needed */
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
  </style>