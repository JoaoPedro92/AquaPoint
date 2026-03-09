<template>

    <div class="container py-4">
    <h1>Dashboard Users</h1>

    <!-- Loading -->
        <div v-if="loading">A carregar...</div>

        <!-- Users table-->
        <table v-else class="table table-striped table-hover mt-3">
            <thead>
                <tr>
                <th scope="col" class="text-center">Imagem Perfil</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col" style="padding-right: 40px;">Função</th>
                <th scope="col" class="text-center">Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="text-center"><img :src="user.profilePicture || '/src/assets/images/user_image.png'" class="rounded-circle" width="40" height="40"></td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.isAdmin ? 'Admin' : 'User' }}</td>
                    <td class="text-start pe-0" style="width: 30%;">
                        <button class="btn btn-sm btn-primary mt-1 me-2" @click="editUser(user)">Editar</button>
                        <button class="btn btn-sm btn-danger mt-1 me-2" @click="deleteUser(user.id)">Eliminar</button>
                        <button v-if="!user.isAdmin" class="btn btn-sm btn-success mt-1" @click="markUserAsAdmin(user.id)">Marcar como Admin</button>
                        <button v-else-if="user.isAdmin && user.id !== Auth.user.id" class="btn btn-sm btn-warning mt-1" @click="markUserAsAdmin(user.id, user.isAdmin)">Remover como admin</button>
                    </td>
                </tr>                
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification';
import { userService } from '../../services/userService' 
import { useAuth } from '../../utilities/useAuth'

const users = ref([])
const toast = useToast()
const loading = ref(true)
const Auth = useAuth()

onMounted(async () => {
    
    users.value = (await userService.getAll()).data;

    loading.value = false
})

function editUser(user){
    console.log('editar', user)
    // abrir popup para editar user
}

function deleteUser(userId){
    // enviar para backend para delete
}

async function markUserAsAdmin(userId, userIsAdmin){
    try{
        const response = await userService.changeIsAdmin(3, { isAdmin: !userIsAdmin });
        toast.success('Permissões alteradas com sucesso.')
        users.value = (await userService.getAll()).data
    }
    catch(err){
        toast.error('Erro ao alterar as permissões.')
    }

}
</script>