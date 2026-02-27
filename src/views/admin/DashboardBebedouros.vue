<template>

    <div class="container py-4">
    <h1>Dashboard Bebedouros</h1>

    <!-- Loading -->
        <div v-if="loading">A carregar...</div>

        <div v-else >
            <button type="button" class="btn btn-warning">(2)</button>

            <table class="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                    <th scope="col" class="text-center">Imagem Perfil</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col" class="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="aquapoints in aquapoint" :key="aquapoint.id">
                    <td class="text-center"><img :src="aquapoint.profilePicture" class="rounded-circle" width="40" height="40"></td>
                    <td>{{ aquapoint.name }}</td>
                    <td>{{ aquapoint.type }}</td>
                    <td>{{ aquapoint.ratingAVG }}</td>
                    <td>{{ aquapoint.ratingAVG }}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary mt-1 me-2" @click="editUser(user)">Editar</button>
                        <button class="btn btn-sm btn-danger mt-1 me-2" @click="deleteUser(user.id)">Eliminar</button>
                        <button class="btn btn-sm btn-success mt-1" @click="markUserAsAdmin(user.id)">Marcar como Admin</button>
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

    const aquapoints = ref([])
    const loading = ref(true)

    onMounted(() => {
        aquapoints.value = [
            new AquaPoint({
                id: 1,
                name: "Bebedouro Praça Central",
                image: "/src/assets/images/defaultUserImage.jpg",
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
                image: "/src/assets/images/defaultUserImage.jpg",
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
                image: "/src/assets/images/defaultUserImage.jpg",
                type: 1,
                longitude: -8.6098,
                latitude: 41.1489,
                state_id: 1,
                ratingAVG: 1.5,
                localId: 1,
                ratingsAmount: 9,
                trustLevel: 3,
            }),

            new AquaPoint({
                id: 4,
                name: "Bebedouro Parque Sul",
                image: "/src/assets/images/defaultUserImage.jpg",
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
                image: "https://via.placeholder.com/150",
                type: 2,
                longitude: -8.6087,
                latitude: 41.1510,
                state_id: 1,
                ratingAVG: 2.2,
                localId: 1,
                ratingsAmount: 8,
                trustLevel: 3,
            })
        ]

        loading.value = false
    })
</script>