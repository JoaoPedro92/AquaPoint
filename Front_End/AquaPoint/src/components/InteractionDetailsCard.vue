<template>
    <div class="border rounded-3 overflow-hidden">
  
        <!-- Aquapoint Image -->
        <img :src="aquapoint?.image" style="width: 100%; height: 200px; object-fit: cover;">

        <div class="p-3">
            <!-- Aquapoint name -->
            <p class="fw-medium mb-2">{{ aquapoint?.point_name }}</p>

            <!-- Badges Type Interaction and Aquapoint's state -->
            <div class="d-flex gap-2 flex-wrap mb-3">
                <span class="badge rounded-pill" style="background: var(--bs-secondary-bg); color: var(--bs-secondary-color);">
                    Comentário
                </span>
                <span class="badge rounded-pill" :style="GetPointStateStyles(aquapoint?.state_name)">
                    {{ aquapoint?.state_name }}
                </span>
            </div>

            <!-- Comment -->
            <div class="p-2 mb-3 rounded-end" :style="`background: var(--bs-secondary-bg); border-left: 3px solid ${GetPointStateColor(aquapoint?.state_name)};`">
                <p class="mb-0 fst-italic text-muted" style="font-size: 13px;">"{{ props.interaction.comment }}"</p>
            </div>

            <!-- Footer -->
            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted" style="font-size: 12px;">{{ formatDate(props.interaction.createdAt) }}</span>
                <button class="btn btn-sm btn-outline-primary" >Verificar</button>
            </div>
        </div>

    </div>

    <AquapointDetailsModal v-model:visible="showPointDetailsModal" :title="'DETALHES DO BEBEDOURO'" :aquapoint="aquapoint" :view-only="true" />
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import StarsRating from './StarsRating.vue';
    import AquapointDetailsModal from '../components/EditAquaPointsModal.vue'
    import { GetPointStateStyles, GetPointStateColor, formatDate } from '../utilities/tools';
    import { useToast } from 'vue-toastification';
    import { useAuth } from '../utilities/useAuth';
    import { aquapointService } from '../services/aquapointService';

    const props = defineProps({
        interaction: {
            type: Object,
            default: () => null
        }
    })

    const aquapoint = ref(null)

    onMounted(async () => {
        console.log(props.interaction)
        console.log(props.interaction.point_id)
        aquapoint.value = (await aquapointService.getById(props.interaction.point_id)).data
    })

    const emit = defineEmits(['favoriteChanged'])

    const Auth = useAuth()
    const toast = useToast()
    const showPointDetailsModal = ref(false)

    async function RemoveFavoritePoint(){
        try{
            await favoritesService.deleteByUserAndPointId({user_id: Auth.user.id, point_id: props.aquapoint.id})
            emit('favoriteChanged')
            toast.success('Favorito apagado com sucesso')
        }
        catch(err){
            toast.error(`Erro ao apagar bebedouro favorito ${err.message}`)
        }
    }
</script>

<style scoped>
.featured-product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
     
 }
 .featured-product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

 .featured-product-image {
     height: 200px;
     background-color: #f1f1f1;
     overflow: hidden;
 }

 .featured-product-image img {
     width: 100%;
     height: 100%;
     object-fit: cover;
     object-position: center;
 }

 .featured-product-details {
     padding: 20px;
 }
</style>