<template>

    <div class="container py-4">
    <h1>Dashboard Bebedouros</h1>

    <!-- Loading -->
        <div v-if="loading">A carregar...</div>

        <div v-else >
            <button type="button" class="btn btn-warning">{{GetInactiveAquaPoints()}} Bebedouros Pendentes</button>

            <table class="table table-striped table-hover mt-3">
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
                    <tr v-for="aquapoint  in aquapoints" :key="aquapoint.id">
                    <td class="text-center">
                        <img :src="aquapoint.image || '/src/assets/images/defaultPointImage.jpg'" class="rounded-circle" width="40" height="40">
                    </td>
                    <td >{{ aquapoint.point_name }}</td>
                    <td>{{ aquapoint.point_type }}</td>
                    <td class="text-center">{{ aquapoint.ratingAVG || 0.0}}</td>
                    <td class="text-center">{{ aquapoint.ratingsAmount }}</td>
                    <td>{{ aquapoint.state_name }}</td>
                    <td>{{ aquapoint.trust_name }}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary mt-1 me-2" @click="editAquaPoint(aquapoint)">Editar</button>
                        <button class="btn btn-sm btn-danger mt-1 me-2" @click="deleteAquaPoint(aquapoint.id)">Eliminar</button>
                        <button v-if="aquapoint.state_id == 1" class="btn btn-sm btn-success mt-1" @click="changePointState(aquapoint)">Marcar como ativo</button>
                        <button v-if="aquapoint.state_id == 2" class="btn btn-sm btn-warning mt-1" @click="changePointState(aquapoint)">Marcar como inativo</button>
                        <button v-if="aquapoint.state_id == 3" class="btn btn-sm btn-success mt-1" @click="changePointState(aquapoint)">Marcar como ativo</button>
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
    import { aquapointService } from '../../services/aquapointService' 
    import EditModal from '/src/components/EditAquaPointsModal.vue'

    const aquapoints = ref([])
    const loading = ref(true)
    const showEditModal = ref(false)
    const selectedAquaPoint = ref(null)

    onMounted(async () => {
        loadAquapoints()
    })

    function GetInactiveAquaPoints() {
        return aquapoints.value.filter(a => a.state_id === 3).length
    }

    function editAquaPoint(aquapoint){
        selectedAquaPoint.value = { ...aquapoint }
        showEditModal.value = true
    }

    function deleteAquaPoint(pointId){
        if (pointId) {
            try {
                aquapointService.delete(pointId)
                loadAquapoints()
            } catch (error) {
                console.error("Erro ao eliminar bebedouro:", error)
            }
        }
    }

    async function changePointState(aquapoint) {
        if (aquapoint) {
            if (aquapoint.state_id == 1) {
                aquapoint.state_id = 2
            } else {
                aquapoint.state_id = 1
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
        aquapoints.value = (await aquapointService.getAll()).data
        loading.value = false
    }
</script>