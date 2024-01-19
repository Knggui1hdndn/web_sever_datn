<template>
    <Bar :data="data" :options="options" />
</template>
  
<script lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'
import ApiService from '../services/api.service';
import { onMounted } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
    name: 'App',
    components: {
        Bar
    },
    data() {
        return chartConfig;
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const currentYear = new Date().getFullYear();

                const response = await ApiService.get<any>(`/statistical/calculateYearlyProfits?year=${currentYear}`);
                response.data.forEach((v) => {
                    switch (v.month) {
                        case 1:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[0] = v.profit
                            break;
                        case 2:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[1] = v.profit
                            break;
                        case 3:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[2] = v.profit
                            break;
                        case 4:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[3] = v.profit
                            break;
                        case 5:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[4] = v.profit
                            break;
                        case 6:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[5] = v.profit
                            break;
                        case 7:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[6] = v.profit
                            break;
                        case 8:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[7] = v.profit
                            break;
                        case 9:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[8] = v.profit
                            break;
                        case 10:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[9] = v.profit
                            break;
                        case 11:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[10] = v.profit
                            break;
                        case 12:
                            console.log(v.profit)
                            chartConfig.data.datasets[0].data[11] = v.profit
                            break;
                    }
                })
                this.chartInstance.update();
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
  