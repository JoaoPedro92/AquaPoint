<template>
    <div class="container py-4">

        <h1 class="mb-5 text-black">Dashboard Geral</h1>

        <div class="row g-4">
            <!-- UTILIZADORES -->
            <div class="col-md-4">
                <div class="card p-4 bg-aquapoint-gray">
                    <div class="row align-items-center">
                        <div class="col-4 text-center">
                            <i class="bi bi-people" style="font-size:60px"></i>
                        </div>
                        <div class="col-8 text-center">
                            <h4>Utilizadores</h4>
                            <h2 class="fw-bold">{{ totalUsers }}</h2>

                            <router-link to="/admin/dashboard-users" class="btn btn-outline-dark dashboard-btn mt-2">
                                Gerir
                            </router-link>

                        </div>
                    </div>
                </div>
            </div>

            <!-- BEBEDOUROS -->
            <div class="col-md-5">
                <div class="card p-4 bg-aquapoint-gray">
                    <div class="row align-items-center">
                        <div class="col-3 text-center">
                            <div class="bebedouro-img">
                                Image
                            </div>
                        </div>
                        <div class="col-5 text-center">
                            <h4>Bebedouros</h4>
                            <h2 class="fw-bold">{{ totalBebedouros }}</h2>

                            <router-link to="/admin/dashboard-bebedouros"
                                class="btn btn-outline-dark dashboard-btn mt-2">
                                Gerir
                            </router-link>
                        </div>

                        <div class="col-4">
                            <div class="d-flex align-items-center mb-3">
                                <span class="status-dot active me-2"></span>
                                <div>
                                    <p class="mb-0">Ativos</p>
                                    <strong>{{ ativos }}</strong>
                                </div>
                            </div>

                            <div class="d-flex align-items-center">
                                <span class="status-dot inactive me-2"></span>
                                <div>
                                    <p class="mb-0">Inativos</p>
                                    <strong>{{ inativos }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- PIE CHART -->
            <div class="col-md-3">
                <div class="card p-4 bg-aquapoint-gray">
                    <canvas id="statusChart"></canvas>
                </div>
            </div>
        </div>


        <!-- GRÁFICO CIDADES -->

        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card p-4 bg-aquapoint-gray">
                    <h5 class="mb-3">Bebedouros / Cidade</h5>
                    <canvas id="cityChart"></canvas>
                </div>
            </div>
        </div>

        <!-- CARDS INFERIORES -->
        <div class="row mt-4 g-4">
            <!-- MAIOR RATING -->
            <div class="col-md-4">
                <div class="card p-4 bg-aquapoint-gray text-center">
                    <h5>Bebedouro Maior Rating</h5>
                    <img :src="bestFountain.image" class="img-fluid rounded mt-3 mb-3 rating-img">
                    <p class="fw-bold mb-1">{{ bestFountain.name }}</p>
                    <p class="mb-1">⭐ {{ bestFountain.rating }} / 5</p>
                    <small class="text-muted">{{ bestFountain.reviews }} reviews</small>
                    <div class="mt-2">
                        <span class="badge bg-success">
                            🏆 Melhor avaliado
                        </span>
                    </div>
                </div>
            </div>

            <!-- MENOR RATING -->
            <div class="col-md-4">
                <div class="card p-4 bg-aquapoint-gray text-center">
                    <h5>Bebedouro Menor Rating</h5>
                    <img :src="worstFountain.image" class="img-fluid rounded mt-3 mb-3 rating-img">
                    <p class="fw-bold mb-1">{{ worstFountain.name }}</p>
                    <p class="mb-1">⭐ {{ worstFountain.rating }} / 5</p>
                    <small class="text-muted">{{ worstFountain.reviews }} reviews</small>
                    <div class="mt-2">
                        <span class="badge bg-warning text-dark">
                            ⚠ Precisa de atenção
                        </span>
                    </div>
                </div>
            </div>

            <!-- TOP 5 -->
            <div class="col-md-4">
                <div class="card p-4 bg-aquapoint-gray">
                    <h5>Top 5 Bebedouros</h5>
                    <ol class="mt-3">
                        <li v-for="bebedouro in topFountains" :key="bebedouro.id">
                            {{ bebedouro.name }} - ⭐ {{ bebedouro.rating }}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const totalUsers = ref(20)
const totalBebedouros = ref(30)

const ativos = ref(25)
const inativos = ref(5)

const bestFountain = ref({
    name: "Praça Central",
    rating: 4.8,
    reviews: 52,
    image: "/src/assets/images/defaultPointImage.jpg"
})

const worstFountain = ref({
    name: "Zona Industrial",
    rating: 1.8,
    reviews: 12,
    image: "/src/assets/images/defaultPointImage.jpg"
})

const topFountains = ref([
    { id: 1, name: "Praça Central", rating: 4.8 },
    { id: 2, name: "Jardim Norte", rating: 4.6 },
    { id: 3, name: "Campus", rating: 4.5 },
    { id: 4, name: "Centro", rating: 4.3 },
    { id: 5, name: "Parque Sul", rating: 4.2 }
])

onMounted(() => {
    new Chart(
        document.getElementById('statusChart'),
        {
            type: 'pie',
            data: {
                labels: ['Ativos', 'Inativos'],
                datasets: [{
                    data: [ativos.value, inativos.value],
                    backgroundColor: ['#00cc00', '#f4a261']
                }]
            }
        })

    new Chart(
    document.getElementById('cityChart'),
    {
        type: 'bar',
        data: {
            labels: ['Lisboa', 'Porto', 'Coimbra'],
            datasets: [{
                label: 'Bebedouros',
                data: [2, 6, 14],
                backgroundColor: '#4DA6AC',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {

                y: {
                    beginAtZero: true,

                    title: {
                        display: true,
                        text: 'Nº de Bebedouros',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },

                    ticks: {
                        stepSize: 2
                    }
                },

                x: {
                    title: {
                        display: true,
                        text: 'Cidades',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }

            }

        }
    }
)

})

</script>

<style scoped>
.bebedouro-img {
    width: 80px;
    height: 120px;
    background: #9c9c9c;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}

.rating-img {
    height: 120px;
    object-fit: cover;
}

.status-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
}

.status-dot.active {
    background: #00cc00;
}

.status-dot.inactive {
    background: #f4a261;
}

.dashboard-btn:hover {
    background: var(--aquapoint-logo-blue);
    color: white;
    border-color: var(--aquapoint-logo-blue);
}
</style>