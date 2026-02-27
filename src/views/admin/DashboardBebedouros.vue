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
                    <td class="text-center"><img :src="aquapoint.image" class="rounded-circle" width="40" height="40"></td>
                    <td >{{ aquapoint.name }}</td>
                    <td>{{ typeDict[aquapoint.type] }}</td>
                    <td class="text-center">{{ aquapoint.ratingAVG }}</td>
                    <td class="text-center">{{ aquapoint.ratingsAmount }}</td>
                    <td class="text-center">{{ stateDict[aquapoint.state_id] }}</td>
                    <td>{{ trustLevelDict[aquapoint.trustLevel] }}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary mt-1 me-2" @click="editAquaPoint(aquapoint)">Editar</button>
                        <button class="btn btn-sm btn-danger mt-1 me-2" @click="deleteAquaPoint(aquapoint.id)">Eliminar</button>
                        <button class="btn btn-sm btn-success mt-1" @click="changePointState(aquapoint.id)">Marcar como Ativo / Inativo</button>
                    </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <!-- Users table-->
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { AquaPoint } from "/src/models/AquaPoint" 

    const aquapoints = ref([])
    const loading = ref(true)

    let trustLevelDict = {
        [1]: "Existe mas com pouca certeza",
        [2]: "Existe com alguma certeza",
        [3]: "Existe 100% certeza",
    }

    let typeDict = {
        [0]: "Humanos",
        [1]: "Animais",
        [2]: "Ambos",
    }

    let stateDict = {
        [0]: "Inativo",
        [1]: "Funcional",
        [2]: "Pendente"
    }

    onMounted(() => {
        aquapoints.value = [
            new AquaPoint({
                id: 1,
                name: "Bebedouro Praça Central",
                image: "/src/assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg",
                type: 0,
                longitude: -8.6110,
                latitude: 41.1496,
                state_id: 1,
                ratingAVG: 4.2,
                localId: 1,
                ratingsAmount: 5,
                trustLevel: 2,
            }),

            new AquaPoint({
                id: 2,
                name: "Bebedouro Jardim Norte",
                image: "/src/assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg",
                type: 0,
                longitude: -8.6125,
                latitude: 41.1502,
                state_id: 2,
                ratingAVG: 3.2,
                localId: 1,
                ratingsAmount: 9,
                trustLevel: 1,
            }),

            new AquaPoint({
                id: 3,
                name: "Bebedouro Escola Secundária",
                image: "/src/assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg",
                type: 1,
                longitude: -8.6098,
                latitude: 41.1489,
                state_id: 0,
                ratingAVG: 1.5,
                localId: 1,
                ratingsAmount: 9,
                trustLevel: 3,
            }),

            new AquaPoint({
                id: 4,
                name: "Bebedouro Parque Sul",
                image: "/src/assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg",
                type: 1,
                longitude: -8.6133,
                latitude: 41.1475,
                state_id: 2,
                ratingAVG: 3.24, 
                localId: 1,
                ratingsAmount: 52,
                trustLevel: 1,
            }),

            new AquaPoint({
                id: 5,
                name: "Bebedouro Câmara Municipal",
                image: "/src/assets/images/microcubo-TOWER1-Bebedouro-76.9.1.1.jpg",
                type: 2,
                longitude: -8.6087,
                latitude: 41.1510,
                state_id: 0,
                ratingAVG: 2.2,
                localId: 1,
                ratingsAmount: 8,
                trustLevel: 3,
            })
        ]

        loading.value = false
    })


    function GetInactiveAquaPoints() {
         return aquapoints.value.filter(a => a.state_id === 2).length
    }

    function editAquaPoint(aquapoint){
        console.log('editar', aquapoint)
        // abrir popup para editar user
    }

    function deleteAquaPoint(pointId){
        // enviar para backend para delete
    }

    function changePointState(pointId){
        // enviar para backend para marcar o user como admin
    }
</script>