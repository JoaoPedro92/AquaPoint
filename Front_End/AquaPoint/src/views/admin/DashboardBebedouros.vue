<template>

    <div class="container py-4">
        <h1>Dashboard Bebedouros</h1>

        <!-- Loading -->
        <div v-if="loading">A carregar...</div>

        <div v-else>
            <button v-if="!showPendingOnly" type="button" class="btn btn-warning mb-4"
                @click="showPendingAquapoints">({{ pendingPointsCount }}) Bebedouros Pendentes</button>
            <button v-else type="button" class="btn btn-warning mb-4" @click="showNotPendingAquapoints">({{
                pendingPointsCount }}) Todos Bebedouros</button>

            <!-- Mobile: Cards -->
            <div class="d-md-none d-flex flex-column gap-3">
                <div v-for="aquapoint in aquapoints" :key="aquapoint.id" class="border rounded-3 p-3">
                    <!-- Nome + tipo + estado -->
                    <div class="d-flex align-items-center gap-3 mb-3">
                        <img :src="aquapoint.image" width="44" height="44"
                            class="rounded-2 object-fit-cover flex-shrink-0" />
                        <div class="flex-grow-1 overflow-hidden">
                            <p class="fw-medium mb-0 small">{{ aquapoint.point_name }}</p>
                            <p class="text-muted mb-0" style="font-size: 12px;">{{ aquapoint.type_name }}</p>
                        </div>
                        <span class="badge rounded-2 text-nowrap" :style="pointStateStyles(aquapoint.state_name)">
                            <i v-if="aquapoint.state_id == '1'" class="bi bi-exclamation-triangle-fill text-warning"></i>
                            <i v-else-if="aquapoint.state_id == '3'" class="bi bi-clock"></i>
                            {{ aquapoint.state_name }}
                        </span>
                    </div>

                    <!-- Pontuaçao + Reviews + Credibilidade -->
                    <div class="row g-2 mb-3">
                        <div class="col-4">
                            <div class="text-center bg-light rounded-2 p-2">
                                <p class="text-muted mb-0" style="font-size: 11px;">Pontuação</p>
                                <p class="mb-0 small fw-medium">{{ aquapoint.ratingAVG ?? 0.0 }}</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center bg-light rounded-2 p-2">
                                <p class="text-muted mb-0" style="font-size: 11px;">Reviews</p>
                                <p class="mb-0 small fw-medium">{{ aquapoint.ratingsAmount }}</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center bg-light rounded-2 p-2">
                                <p class="text-muted mb-0" style="font-size: 11px;">Credibilidade</p>
                                <p class="mb-0 small fw-medium">{{ aquapoint.trust_name }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Botões -->
                    <div class="d-flex gap-2 justify-content-center">
                        <div v-if="!showPendingOnly">
                            <button @click="editAquaPoint(aquapoint)"
                                class="btn btn-sm btn-primary flex-fill me-2">Editar</button>
                            <button @click="deleteAquapoint(aquapoint.id)" class="btn btn-sm btn-danger flex-fill me-2">
                                Eliminar
                            </button>
                            <button @click="changePointState(aquapoint)" class="btn btn-sm flex-fill text-white me-2" :class="{
                                'bg-success': aquapoint.state_id === 4,
                                'bg-secondary': aquapoint.state_id !== 4
                            }">
                                {{ aquapoint.state_id !== 4 ? 'Marcar como Inativo' : 'Marcar como Ativo' }}
                            </button>
                        </div>
                        <div v-else >
                            <button class="btn btn-sm btn-success mt-1 me-2"
                                @click="acceptPendingPoint(aquapoint)">Aceitar</button>
                            <button class="btn btn-sm btn-danger mt-1 me-2"
                                @click="declinePendingPoint(aquapoint.id)">Recusar</button>
                        </div>

                    </div>
                </div>
            </div>


        <!-- DESKTOP -->
        <table class="d-none d-md-table table table-striped table-hover mt-3">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Imagem</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Pontuação Média</th>
                    <th scope="col">Nº Reviews</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Credibilidade</th>
                    <th scope="col" class="text-center">Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="aquapoint in aquapoints" :key="aquapoint.id">
                    <td class="text-center">
                        <img :src="aquapoint.image" class="rounded-circle"
                            width="40" height="40">
                    </td>
                    <td>{{ aquapoint.point_name }}</td>
                    <td>{{ aquapoint.point_type }}</td>
                    <td class="text-center">{{ aquapoint.ratingAVG || 0.0 }}</td>
                    <td class="text-center">{{ aquapoint.ratingsAmount }}</td>
                    <td>{{ aquapoint.state_name }}</td>
                    <td>{{ aquapoint.trust_name }}</td>
                    <td class="text-center">
                        <div v-if="showPendingOnly">
                            <button class="btn btn-sm btn-success mt-1 me-2"
                                @click="acceptPendingPoint(aquapoint)">Aceitar</button>
                            <button class="btn btn-sm btn-danger mt-1 me-2"
                                @click="declinePendingPoint(aquapoint.id)">Recusar</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-sm btn-primary mt-1 me-2"
                                @click="editAquaPoint(aquapoint)">Editar</button>
                            <button class="btn btn-sm btn-danger mt-1 me-2"
                                @click="deleteAquaPoint(aquapoint.id)">Eliminar</button>

                            <button v-if="aquapoint.state_id == 3 || aquapoint.state_id == 4"
                                class="btn btn-sm btn-success mt-1" @click="changePointState(aquapoint)">Marcar como
                                ativo</button>
                            <button v-else class="btn btn-sm btn-warning mt-1"
                                @click="changePointState(aquapoint)">Marcar como inativo</button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
    <!-- Users table-->
    </div>

    <EditModal v-model:visible="showEditModal" :aquapoint="selectedAquaPoint"></EditModal>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification';
import { aquapointService } from '../../services/aquapointService'
import EditModal from '/src/components/EditAquaPointsModal.vue'

const allAquapoints = ref([])
const aquapoints = ref([])
const loading = ref(true)
const showEditModal = ref(false)
const selectedAquaPoint = ref(null)
const pendingPointsCount = ref(0)
const showPendingOnly = ref(false)
const toast = useToast()

onMounted(async () => {
    loadAquapoints()
})

function GetInactiveAquaPoints() {
    return aquapoints.value.filter(a => a.state_id === 4)
}

async function GetPendingAquaPointsCount() {
    pendingPointsCount.value = (await aquapointService.getPendingCount()).data.total_pending
}

function editAquaPoint(aquapoint) {
    selectedAquaPoint.value = { ...aquapoint }
    showEditModal.value = true
}

async function deleteAquaPoint(pointId) {
    if (pointId) {
        try {
            await aquapointService.delete(pointId)
            loadAquapoints()
        } catch (error) {
            console.error("Erro ao eliminar bebedouro:", error)
        }
    }
}

async function changePointState(aquapoint) {
    if (aquapoint) {
        if (aquapoint.state_id !== 4) {
            aquapoint.state_id = 4
        } else {
            aquapoint.state_id = 2
        }

        try {
            await aquapointService.update(aquapoint.id, aquapoint)

            loadAquapoints()
        } catch (error) {
            console.error("Erro ao atualizar estado:", error)
        }
    }
}

async function loadAquapoints() {
    loading.value = true
    allAquapoints.value = (await aquapointService.getAll()).data
    pendingPointsCount.value = allAquapoints.value.filter(a => a.state_id === 3).length
    if(showPendingOnly){ aquapoints.value = allAquapoints.value.filter(a => a.state_id === 3) }
    else{ aquapoints.value = allAquapoints.value.filter(a => a.state_id !== 3) }

    loading.value = false
}

async function showPendingAquapoints() {
    showPendingOnly.value = true
    aquapoints.value = allAquapoints.value.filter(a => a.state_id === 3)
}

async function showNotPendingAquapoints() {
    showPendingOnly.value = false
    aquapoints.value = allAquapoints.value.filter(a => a.state_id !== 3)
}

function pointStateStyles(state) {
    const styles = {
        'Funcional': { backgroundColor: '#166534', color: '#c1ebbc' },
        'Pendente': { backgroundColor: '#fef9c3', color: '#854d0e' },
        'Necessita manutenção': { backgroundColor: '#f97316', color: '#ffff' },
        'Inativo': { backgroundColor: '#b91c1c', color: '#fee2e2' }
    }
    return styles[state] || {}
}

async function acceptPendingPoint(aquapoint){
    try{
        aquapoint.state_id = 2
        await aquapointService.update(aquapoint.id, aquapoint)
        toast.info('Bebedouro foi aprovado com sucesso')
        await loadAquapoints()

    }
    catch(err){
        toast.error(`Erro ao aprovar bebedouro pendente: ${err.message}`)

    }
}

async function declinePendingPoint(id){
    try{
        await aquapointService.delete(id)
        toast.info('Bebedouro foi reprovado com sucesso')
        await loadAquapoints()
    }
    catch(err){
        toast.error(`Erro ao recusar bebedouro pendente: ${err.message}`)
    }
}
</script>