<template>
  <div>
    <div class="model-body">
      <form>
        <h6>Ngày bắt đầu</h6>
        <input type="datetime-local" class="from" v-model="startDate" @input="getStartChange" />
      </form>

      <form>
        <h6>Ngày kết thúc</h6>
        <input v-model="endDate" type="datetime-local" class="from" @input="getEndChange"/>
      </form>
      <div class="button">
        <button type="button" class="btn btn-primary btn-block mb-4" @click="getToDate">Tìm kiếm</button>
      </div>
    </div>

    <h3>Bảng điều khiển</h3>
    <div class="top-section">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card text-bg-primary">

              <div class="card-body">
                <h5 class="card-title">Số  sản phẩm Mới</h5>
                <div class="col-12 col-md-6">
                  <p><strong></strong> {{ thongke.countProductNew }}</p>
        </div>
                <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-success">
                <div class="card-body">
                  <h5 class="card-title">Đơn hàng đang chờ xác nhận</h5>
                  <p class="card-text">{{ thongke.countWaitForConfirmation }}</p>
                  <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-secondary">
              <div class="card-body">
                <h5 class="card-title">Số lượng khách hàng </h5>
                <p class="card-text">{{ thongke.countUserNew }}</p>
                <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-success">
                <div class="card-body">
                  <h5 class="card-title"> Đơn hàng đã xác nhận </h5>
                  <p class="card-text">{{ thongke.countConfirmed }}</p>
                  <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-primary">

              <div class="card-body">
                <h5 class="card-title">Đơn giao thành công</h5>
                <div class="col-12 col-md-6">
                  <p><strong></strong> {{ thongke.countDelivered }}</p>
        </div>
                <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-success">
                <div class="card-body">
                  <h5 class="card-title">Đơn hàng đang  được giao</h5>
                  <p class="card-text">{{ thongke.countDelivering }}</p>
                  <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-bg-success">
              <div class="card-body">
                <h5 class="card-title"> Đơn hàng bị hủy </h5>
                <p class="card-text">{{ thongke.countCancel }}</p>
                <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            <div class="col">
              <div class="card text-bg-success">
                <div class="card-body">
                  <h5 class="card-title">Tổng doanh số </h5>
                  <p class="card-text">{{ thongke.revenue ? thongke.revenue + 'VND' : '--' }}</p>
                  <a href="#" class="arrow-link"><i class="fas fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>Tốp 5 sản phẩm bán chạy nhất </h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá</th>
          <th scope="col">Số Lượng đã bán</th>
          <th scope="col">Thể Loại</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for= "(top5Pro, index) in thongke.top5Product" :key="top5Pro._id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ top5Pro.name }}</td>
        
          <td>{{ top5Pro.price }}</td>
          <td>{{ top5Pro.sold }}</td>
          <td>{{ top5Pro.idCata }}</td>
        </tr>

      </tbody>
    </table>
    <h3>Tốp 5 sản phẩm được xem nhiều nhất </h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá</th>
          <th scope="col">Số Lượng đã bán</th>
          <th scope="col">Thể Loại</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for= "(top5Pro, index) in thongke.top5View" :key="top5Pro._id">
          <th scope="row">{{ ++index }}</th>
          <td>{{ top5Pro.name }}</td>
        
          <td>{{ top5Pro.price }}</td>
          <td>{{ top5Pro.view }}</td>
          <td>{{ top5Pro.idCata }}</td>
        </tr>

      </tbody>
    </table>
    <line-chart :data="chartData" :options="chartOptions"></line-chart>

  </div>
  <div id="app">
    <BarChart />
  </div>
</template>

<script setup>
import ApiService from "@/services/api.service";
import { onMounted, ref } from "vue";
import { Line } from "vue-chartjs";



let start_date = "";
let end_date = "";


const getStartChange = (event) => {
  start_date = event.target.value.split('T')[0];
  console.log(start_date);
}

const getEndChange = (event) => {
  end_date = event.target.value.split('T')[0];
  console.log(end_date);
}
const endDate = ref(getFormattedDate(new Date()));

let thongke = ref({
  countAllSp: "",
    countProductNew:"" ,
    countProductSold: "",
    countOrderNew: "",
    countUserNew: "",
    countWaitForConfirmation: "",
    countDelivering: "",
    countConfirmed: "",
    countDelivered: "",
    countCancel:"",
    countReturns:"",
    countEvaluateNew: "",
    revenue:"",
})

function getFormattedDate(date) {

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  console.log(`${year}-${month}-${day}T${hours}:${minutes}`);

  return `${year}-${month}-${day}T${hours}:${minutes}`;

}


const GetAll = async () => {
  try {
    const response = await ApiService.get(`/statistical?isGetall=true`);
    thongke.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
GetAll();

const getToDate = async()=>{
  try {
    const response = await ApiService.get( `/statistical?startDate=${start_date}&endDate=${end_date}`)
    thongke.value = response.data;
    console.log(response.data);
    
  } catch (error) {
    console.log(err);
    
  }
}
onMounted(()=>{
  
 

})
// const gradient = ref(null);
// const gradient2 = ref(null);

// const chartData = ref({
//   labels: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July'
//   ],
//   datasets: [
//     {
//       label: 'Data One',
//       borderColor: '#FC2525',
//       pointBackgroundColor: 'white',
//       borderWidth: 1,
//       pointBorderColor: 'white',
//       backgroundColor: gradient,
//       data: [40, 39, 10, 40, 39, 80, 40]
//     },
//     {
//       label: 'Data Two',
//       borderColor: '#05CBE1',
//       pointBackgroundColor: 'white',
//       pointBorderColor: 'white',
//       borderWidth: 1,
//       backgroundColor: gradient2,
//       data: [60, 55, 32, 10, 2, 12, 53]
//     }
//   ]
// });

// const chartOptions = ref({
//   responsive: true,
//   maintainAspectRatio: false
// });

// onMounted(() => {
//   gradient.value = createGradient('rgba(255, 0, 0, 0.5)', 'rgba(255, 0, 0, 0)');
//   gradient2.value = createGradient(
//     'rgba(0, 231, 255, 0.9)',
//     'rgba(0, 231, 255, 0)'
//   );

//   const chart = new Line();
//   chart.renderChart(chartData, chartOptions);
// });

// const createGradient = (color1, color2) => {
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   const gradient = ctx.createLinearGradient(0, 0, 0, 450);

//   gradient.addColorStop(0, color1);
//   gradient.addColorStop(0.5, color2);
//   gradient.addColorStop(1, color2);

//   return gradient;
// };

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
.button {
  margin-top: 20px;
  margin-bottom: 0px;
}
</style>
