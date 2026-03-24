<template>
    <div v-if="loading" class="text-center mt-5">
        <!--A carregar...-->
        <div class="spinner-border text-primary"></div>
    </div>

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
                            <h2 class="fw-bold">{{ totalFountains }}</h2>

                            <router-link to="/admin/dashboard-bebedouros"
                                class="btn btn-outline-dark dashboard-btn mt-2">
                                Gerir
                            </router-link>
                        </div>

                        <div class="col-4">
                            <div class="d-flex align-items-center mb-2">
                                <span class="status-dot active me-2"></span>
                                <span>Ativos: <strong>{{ active }}</strong></span>
                            </div>

                            <div class="d-flex align-items-center mb-2">
                                <span class="status-dot inactive me-2"></span>
                                <span>Inativos: <strong>{{ inactive }}</strong></span>
                            </div>

                            <div class="d-flex align-items-center">
                                <span class="status-dot pending me-2"></span>
                                <span>Pendentes: <strong>{{ pending }}</strong></span>
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
                    <small class="text-muted">
                        {{ bestFountain.reviews ?? 0 }} {{ bestFountain.reviews === 1 ? 'review' : 'reviews' }}
                    </small>
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
                    <small class="text-muted">
                        {{ worstFountain.reviews ?? 0 }} {{ worstFountain.reviews === 1 ? 'review' : 'reviews' }}
                    </small>
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

import { userService } from "../../services/userService.js"
import { aquapointService } from "../../services/aquapointService.js"
import { localsService } from "../../services/localsService.js"


import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const totalUsers = ref(0)

const totalFountains = ref(0)
const active = ref(0)
const inactive = ref(0)
const pending = ref(0)

let points = []
const loading = ref(true)

let pieChart = null
let cityChart = null

const bestFountain = ref({})
const worstFountain = ref({})
const topFountains = ref([])

onMounted(async () => {
    await getAllUsers()
    await getAllAquapoints()
    loading.value = false
})

async function getAllUsers() {
    try {
        const response = await userService.getAll()
        totalUsers.value = response.data.length
    } catch (error) {
        console.log("Erro ao buscar utilizadores", error)
    }

}

async function getAllAquapoints() {
    try {
        const response = await aquapointService.getAll()
        points = response.data

        active.value = points.filter(p => p.state_id === 1 || p.state_id === 2).length
        inactive.value = points.filter(p => p.state_id === 3).length
        pending.value = points.filter(p => p.isPending === 1).length

        totalFountains.value = active.value + inactive.value

        createPieChart()
        await createCityChart()

        ratingFountains()
    }
    catch (error) {
        console.error("Erro aquapoints:", error)
    }
}

function createPieChart() {

    if (pieChart) {
        pieChart.destroy()
    }
    pieChart = new Chart(
        document.getElementById('statusChart'),
        {
            type: "pie",
            data: {
                labels: ["Ativos", "Inativos", "Pendentes"],
                datasets: [{
                    data: [active.value, inactive.value, pending.value],
                    backgroundColor: ["#00cc00", "#e63946", "#f4a261"]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            boxWidth: 12,
                            padding: 14
                        }
                    }
                }
            }
        })

}

async function createCityChart() {
    const localsRes = await localsService.getAll()
    const locals = localsRes.data

    const cities = {}

    points.forEach(point => {

        const local = locals.find(l => Number(l.id) === Number(point.local_id))

        if (!local) return

        const cityName = local.zone_name

        if (!cities[cityName]) {
            cities[cityName] = 0
        }
        cities[cityName]++
    })

    const labels = Object.keys(cities)
    const data = Object.values(cities)

    if (cityChart) {
        cityChart.destroy()
    }

    cityChart = new Chart(
        document.getElementById('cityChart'),
        {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Bebedouros',
                    data,
                    backgroundColor: '#4DA6AC'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nº de Bebedouros'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Cidades'
                        }
                    }
                }
            }
        }
    )
}

function ratingFountains() {
    const validPoints = points.filter(p => p.ratingAVG !== null)

    if (validPoints.length === 0) return

    const sorted = [...validPoints].sort((p1, p2) =>
        (p2.ratingAVG - p1.ratingAVG) || (p2.ratingsAmount - p1.ratingsAmount)
    )

    //Best
    const best = sorted[0]
    bestFountain.value = {
        name: best.point_name,
        rating: Number(best.ratingAVG).toFixed(1),
        reviews: best.ratingsAmount,
        image: best.image || "/src/assets/images/defaultPointImage.jpg"
    }

    //worst
    const worst = sorted[sorted.length - 1]
    worstFountain.value = {
        name: worst.point_name,
        rating: Number(worst.ratingAVG).toFixed(1),
        reviews: worst.ratingsAmount,
        image: worst.image || "/src/assets/images/defaultPointImage.jpg"
    }

    //TOP FIVE
    topFountains.value = sorted.slice(0, 5).map(p => ({
        id: p.id,
        name: p.point_name,
        rating: Number(p.ratingAVG).toFixed(1)
    }))
}
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
    background: #e63946;
}

.status-dot.pending {
    background: #f4a261;
}

.dashboard-btn:hover {
    background: var(--aquapoint-logo-blue);
    color: white;
    border-color: var(--aquapoint-logo-blue);
}
</style>