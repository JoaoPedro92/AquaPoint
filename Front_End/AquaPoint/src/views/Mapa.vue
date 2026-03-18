<template>
    <h1>Mapa</h1>

    <div style="position: relative">
        <div id="mapa" style="height: 80vh; width: 100%"></div>

        <!-- Botão Adicionar / Cancelar novo bebedouro -->
        <button :class="AddNewMode  ? 'btn btn-danger' : 'btn btn-success'" style="position: absolute; bottom: 20px; right: 20px; z-index: 1000;"
            v-on:click="AddOrCancelMarkerClick">

            <i :class="AddNewMode ? 'bi bi-x-lg' : 'bi bi-plus-lg' "></i>
            {{ AddNewMode ? 'Cancelar' : 'Adicionar Aquapoint' }}
        </button>
        <!------------------------------------------------>
    </div>

    <!-- Modal detalhes do bebedouro selecionado -->
    <div v-if="showAquapointPopup" class="modal-overlay" @click="showAquapointPopup = false">
        <div class="modal-box" @click.stop>
            <button class="btn-close" @click="showAquapointPopup = false"></button>
            <div class="text-center">
            <!-- Aquapoint image and infos -->
            <img :src="selectedAquapoint.image" height="300" width="370" alt="Imagem do bebedouro" class="point-image">
            </div>
            <br><br>

            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                    <h4>{{ selectedAquapoint.point_name }}</h4>
                    <i v-if="selectedAquapoint.state_name == 'Inativo'" class="bi bi-exclamation-octagon-fill text-danger mb-1" title="Estado Inativo"></i>
                    <i v-if="selectedAquapoint.state_name == 'Necessita manutenção'" class="bi bi-exclamation-octagon-fill text-warning mb-1" title="Estado Necessita manutenção"></i>
                    <!-- Favorite Button -->
                    <i :class="isHeartHover ? 'bi bi-heart-fill text-danger': 'bi bi-heart text-danger'"  class="mb-1"
                        v-on:mouseover="isHeartHover = true" v-on:mouseleave="isHeartHover = false" style="font-size: 20px; cursor: pointer"></i>
                    
                   
                </div>
                <!-- Google Maps Directions and Report Flag -->
                <div class="d-flex align-items-center gap-2 mb-2">
                     <a  :href="`https://www.google.com/maps/dir/?api=1&destination=${selectedAquapoint.latitude},${selectedAquapoint.longitude}&travelmode=walking`" target="_blank">
                        <i class="bi bi-geo-alt-fill ms-2" style="font-size: 20px; cursor: pointer; color: var(--aquapoint-marker-blue);"></i>
                    </a>
                    <div class="hex-bg">                        
                        <i class="bi bi-flag-fill text-white" style="font-size: 0.7rem" title="Reportar" v-on:click="ReportProblem"></i>
                    </div>
                </div>
                <!------------------->
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <i class="bi bi-star-fill text-warning"></i>
                    <span class="ms-1">{{ selectedAquapoint.ratingAVG|| 0.0}}</span> <span class="ms-1" style="font-size:0.8rem"> - {{selectedAquapoint.ratingsAmount|| 0.0 }} opiniões</span>
                </div>
                <span>15min - 3,8km</span>
            </div>
            <!----------------------------------------->

            <!-- Nivel de Credibilidade -->
            <div class="mt-3">
                <span style="font-size: 0.8rem">Nivel de Credibilidade: <strong>({{ selectedAquapoint.trust_name }})</strong></span>
                <div class="d-flex">
                    <div class="progress" style="height: 12px; width: 30%; cursor:pointer;" title="Clicar para votar na credibilidade" v-on:click="ShowVoteTrustLevel">
                        <div 
                            class="progress-bar" 
                            :class="{ 
                                'bg-orange': selectedAquapoint?.point_trust === 2,
                                'bg-warning': selectedAquapoint?.point_trust === 3,
                                'bg-success': selectedAquapoint?.point_trust === 4
                            }"
                            style="width: 100%;">
                        </div>
                    </div>

                    <div v-if="showTrustLevelVote" class="vote-trustLevelBox">
                        <div class="d-flex gap-2 ms-2">
                            <button class="btn btn-sm btn-success btn-trustLevelVote" v-on:click="VoteTrustLevel(true)">
                                <i class="bi bi-hand-thumbs-up-fill me-1"></i>Existe</button>
                            <button class="btn btn-sm btn-danger btn-trustLevelVote" v-on:click="VoteTrustLevel(false)">
                               <i class="bi bi-hand-thumbs-down-fill me-1" ></i>Não Existe</button>

                        </div>
                    </div>
                </div>
            </div>
            <!----------------------------->


            <!-- Opinião dos Utilizadores -->
             <h5 class="mt-4">Opinião dos Utilizadores</h5>
            
             <template v-if="reviews.length === 0">
                <p class="text-muted">Ainda não há opiniões para este aquapoint.</p>
             </template>
             <template v-else>
                <div style="max-height: 400px; overflow-y: auto;">
                    <div v-for="review in reviews" :key="review.id">
                        <div class="user-review-card">
                            <div class="d-flex align-items-center">
                                <img :src="review.profilePicture || '/src/assets/images/user_image.png'" width="20" height="20" alt="imagem utilizador" style="background-color: white; border-radius: 50%; object-fit: cover;">
                                <span class="ms-2">{{ review.name }}</span>
                                <span class="ms-auto" style="font-size:0.8rem">{{ review.created_at }}</span>
                            </div>

                            <!-- Stars Rating -->
                            <span :title="review.rating + ' estrelas'">
                                <StarsRating :rating="review.rating" :isReadonly="true"></StarsRating> 
                            </span>

                            <p class="mb-0">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
             </template>
            <!------------------------------------->

            <!-- Nova avaliação do bebedouro -->
             <h5 class="mt-5 mb-0">AVALIA ESTE BEBEDOURO</h5>
             <p class="mb-1" style="font-size: 0.9rem; color:gray;">Partilha a tua experiência</p>

             <StarsRating v-model:rating="newReviewNumber" ></StarsRating>
             
             <br><br>

             <textarea v-model="reviewText" class="form-control mt-1" placeholder="Escreve um comentário" id="exampleFormControlTextarea1" rows="4"></textarea>
             <button class="btn btn-primary mt-3" style="width:100%;" v-on:click="SubmitReview">SUBMETER</button>
             <!---------------------------------->
        </div>
    </div>

    <!-- Offcanvas Informações Adicionar Bebedouro-->
    <div class="offcanvas offcanvas-end" style="width:500px;" ref="offcanvasRef" tabindex="-1">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">Adicionar Bebedouro</h5>
            <button class="btn-close" v-on:click="offcanvasInstance.hide()"></button>
        </div>
        <div class="offcanvas-body">
            <div class="d-flex flex-column gap-2">
                
                <!-- Upload imagem bebedouro -->
                <div class="mb-3">
                    <img :src="newAquapointImagePreview" class="aquapoint-image-preview" style="cursor:pointer;" v-on:click="fileInput.click()">
                    <input type="file" ref="fileInput" style="display:none" @change="onFileChange" accept="image/*">
                    <button class="btn btn-outline-secondary btn-file-input w-100" @click="fileInput.click()">
                        <i class="bi bi-upload me-2"></i>Escolher ficheiro
                    </button>
                </div>
                <!----------------------------->

                <div class="mb-3">
                    <h6>Nome do Bebedouro:</h6>
                    <input v-model="newAquapointName" type="text" class="form-control" id="nome-aquapoint">
                </div>
                <!-- Tipo de bebedouro -->
                <h6>Tipo de Bebedouro:</h6>
                <button v-for="type in aquapointTypes" :key="type.id" 
                :class="newAquapointType === type.id ? 'btn bg-aquapoint-blue text-white shadow-sm' : 'btn bg-aquapoint-gray'"
                 v-on:click="newAquapointType = type.id"> {{ type.nome }}</button>
                 <!----------------------->
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success shadow-sm" style="width: 60%" v-on:click="SubmitNewAquapoint">SUBMETER</button>
            </div>
        </div>
    </div>

    <ReportProblemModal v-model:visible="showReportProblemModal"></ReportProblemModal>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import addNewMarkerImg from '../assets/images/map-markers/add_new_aqua_point_marker.png'
    import { Offcanvas } from 'bootstrap';
    import L, { icon } from 'leaflet'
    import 'leaflet/dist/leaflet.css'
    import StarsRating from '../components/StarsRating.vue'
    import { imageUrlToBase64 } from '../utilities/tools';
    import { useToast } from 'vue-toastification';
    import { useAuth } from '../utilities/useAuth';
    import { useModalStore } from '../utilities/modal';
    import ReportProblemModal from '../components/ReportProblemModal.vue';
    import { userService } from '../services/userService';
    import { aquapointService } from '../services/aquapointService' 
    import { reviewsService } from '../services/reviewsService' 
    import { localsService } from '../services/localsService';
    import { zonesService } from '../services/zonesService';
    import { point } from 'leaflet';

    const loginModal = useModalStore()
    const Auth = useAuth()
    const toast = useToast()
    const reviews = ref([])
    const mapaRef = ref(null)
    const newReviewNumber = ref(0)
    const reviewText = ref('')
    const selectedAquapoint = ref(null)
    const showAquapointPopup = ref(false)
    const showReportProblemModal = ref(false)
    const showTrustLevelVote = ref(false)
    const AddNewMode = ref(false)
    const offcanvasRef = ref(null)
    let offcanvasInstance = null
    const newMarkerAquapoint = ref(null)
    const aquapointTypes = [
        { id: 1, nome: 'Pessoas' },
        { id: 2, nome: 'Animais' },
        { id: 3, nome: 'Ambos' }
    ]
    const newAquapointType = ref(1)
    const fileInput = ref(null)
    const fileName = ref('')
    const newAquapointImagePreview = ref(null)
    const newAquapointName = ref('')
    const offcanvasClosedBySubmitButton = ref(false)
    const aquapointsList = ref([])
    const localValue = ref('')
    const isHeartHover = ref(false)


    onMounted(async() => {
        // Inicializa o offcanvas das informações no momento de adicionar um novo bebedouro
        offcanvasInstance = new Offcanvas(offcanvasRef.value)
        offcanvasRef.value.addEventListener('hide.bs.offcanvas', () => {
            console.log('offcanvas fechado')
            closeOffcanvas()
        })

        mapaRef.value = L.map('mapa').setView([38.781558, -9.102584], 13)
        L.tileLayer('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
            attribution: '© Jawg Maps',
            accessToken: 'BumVzniBYxFsvv2lUwvsZ8fQMn6WdPC2sS5bAqyeSyDrROwuULnZrt0lE1uKPHrT'
        }).addTo(mapaRef.value)

        mapaRef.value.on('click', async (e) => {
            if(!AddNewMode.value) return 

            const { lat, lng } = e.latlng

            newMarkerAquapoint.value = L.marker([lat, lng], { icon: getAddNewMarkerIcon()})
            .addTo(mapaRef.value)

            openOffcanvas()

            try {
                const localData = await GetPlaceDataByCoords(lat, lng)
                localValue.value = localData.zone

                newMarkerAquapoint.value
                    .bindPopup(localValue.value)
                    .openPopup()
            } catch (err) {
                console.error('Erro ao obter localização:', err)
            }
        })

        aquapointsList.value = await GetAquapointsList()
        
        if (aquapointsList) {
            aquapointsList.value.forEach(point => {
                if (point.state_name != "Pendente") {
                    AddMarkerToMap(point)
                }
            })
        }
    })

    // Fica a aguardar que a variavel modoAdicionar altere e reaja à mudança mudando o tipo de cursor
    watch(AddNewMode, (val) => {
        if (!mapaRef.value) return
        mapaRef.value.getContainer().style.cursor = val ? 'crosshair' : ''
    })

    function AddMarkerToMap(point){
        var markerColor = 'var(--aquapoint-marker-blue)'

        if (point.state_name == 'Inativo') {
            markerColor = 'red'
        } else if (point.state_name == 'Necessita manutenção') {
            markerColor = 'orange'
        }

        L.marker(
            [point.latitude, point.longitude], 
            { 
                icon: getMarkerIcon(markerColor) 
            }
        )
        .addTo(mapaRef.value)
        .on('click', async () => {
            reviews.value = await GetReviewsByPointId(point.id)
  
            selectedAquapoint.value = point
            showAquapointPopup.value = true
            showTrustLevelVote.value = false
        })
    }

    async function GetAquapointsList(){
        var aquapoints = await aquapointService.getAll()

        if (aquapoints) {
            return aquapoints.data
        }

        return null
    }

    async function GetReviewsByPointId(pointId){
        var reviews = await reviewsService.getByPointId(pointId)

        if (reviews) {
            return reviews.data
        }

        return null
    }

    function AddOrCancelMarkerClick(){
        if(!Auth.isLoggedIn){
            loginModal.openLoginModal()
            return
        }

        AddNewMode.value = !AddNewMode.value
    }
    function SubmitReview(){
        console.log('Rating: ' + newReviewNumber.value + '\nReview: ' + reviewText.value)
        newReviewNumber.value = 0
        reviewText.value = ''
    }

    function ReportProblem(){
        console.log('Report Problem clicked')

        showReportProblemModal.value = true
    }

    function ShowVoteTrustLevel(){
        console.log('VoteTrustLevel clicked')
        showTrustLevelVote.value = !showTrustLevelVote.value
    }

    function openOffcanvas(){
        newAquapointImagePreview.value = '/src/assets/images/add_new_point.png'
        offcanvasInstance.show()
    }

    function closeOffcanvas(){
        if(!newMarkerAquapoint.value) return;    

        mapaRef.value.removeLayer(newMarkerAquapoint.value)
        newMarkerAquapoint.value = null

        AddNewMode.value = false
        newAquapointType.value = 1
        newAquapointName.value = null
        newAquapointImagePreview.value = null
        localValue.value = ''
    }

    function onFileChange(e) {
        const file = e.target.files[0]
        if(!file) return
        
        fileName.value = file.name
        const reader = new FileReader()
        reader.onload = (e) => {
            newAquapointImagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
        
    }

    async function SubmitNewAquapoint(){
        if (!newAquapointName.value || newAquapointName.value.trim() === ''){
            // failed
            console.log('Failed to submit, name is null')
            return;
        }

        console.log(`${newAquapointName.value} \n${newAquapointType.value}`)
        //offcanvasClosedBySubmitButton.value = true

        const coords = newMarkerAquapoint.value.getLatLng()

        var zoneData = await GetLocalFromBackEnd(localValue.value)
        var localId = null

        if (!zoneData || !zoneData.id) {
            const coordsData = await GetPlaceDataByCoords(coords.lat, coords.lng)
            let cityName = coordsData?.city || 'Desconhecido'

            var zoneId = await GetZoneByName(cityName)

            if (!zoneId) {
                zoneId = await CreateNewZone(cityName)
            }

            localId = await CreateNewLocal(localValue.value, zoneId)
        } else {
            localId = zoneData.id
        }
  
        const newPoint = { 
            point_name: newAquapointName.value, 
            image: newAquapointImagePreview.value, 
            point_type: newAquapointType.value,
            point_trust: 2,
            local_id: localId,
            state_id: 3, // Pendente
            latitude: coords.lat, 
            longitude: coords.lng
        }

        AddNewAquaPoint(newPoint)
    }

    async function GetPlaceDataByCoords(lat, lng) {
        return fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
        .then(response => response.json())
        .then(data => {
            return {
                city: data.address.city || data.address.town || '',
                zone: data.address.village || data.address.town || data.address.neighbourhood || data.address.hamlet || data.display_name || ''
            }
        })
        .catch(error => {
            console.error("Erro ao obter dados de zona:", error)
            return ''
        })
    }

    async function GetLocalFromBackEnd(local) {
        try {

            const { data } = await localsService.getByName(local)

            return data

        } catch (error) {

            if (error.response?.status === 404) {
                return false
            }

            return false
        }
    }

    async function CreateNewLocal(local_name, zone_id) {
        try {
            const { data } = await localsService.create({ name: local_name, zone_id: zone_id })

            return data.id
        } catch (error) {
            return null
        }
    }

    async function GetZoneByName(name) {
        try {
            const { data } = await zonesService.getByName(name)

            return data.id
        } catch (error) {
            return null
        }
    }

    async function CreateNewZone(zone_name) {
        try {
            const { data } = await zonesService.create({ name: zone_name })

            return data.id
        } catch (error) {
            return null
        }
    }

    async function AddNewAquaPoint(newPoint) {
        try {
            const createdPoint = await aquapointService.create(newPoint)
            if (createdPoint) {
                toast.warning('Bebedouro pendente de aprovação da administração!')
                closeOffcanvas()
                offcanvasInstance.hide()

                aquapointsList.value = await GetAquapointsList()
            }
        } catch (err) {
            console.log("Status:", err.response?.status)
            console.log("Data:", err.response?.data)
            console.log("Headers:", err.response?.headers)
        }
    }

    function getMarkerIcon(color = 'blue') {
        return L.divIcon({
            className: '',
            html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 24">
                <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>`,
            iconSize: [100, 60],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        })
    }

    function getAddNewMarkerIcon(){
        return L.divIcon({
            className: '',
            html: `<img src="${addNewMarkerImg}" style="width: 50px; height: 50px;">`,
            iconSize: [100, 60],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        })
    }

    async function VoteTrustLevel(vote){
        if(vote === true){
            if(selectedAquapoint.value.point_trust < 4){
                await aquapointService.changeTrustLevel(selectedAquapoint.value.id, { point_trust: selectedAquapoint.value.point_trust + 1 })
            }
        }
        else{
            if(selectedAquapoint.value.point_trust > 1){
                await aquapointService.changeTrustLevel(selectedAquapoint.value.id, { point_trust: selectedAquapoint.value.point_trust - 1 })
            }
        }

        toast.info('Voto realizado com sucesso. Obrigado pelo contributo.')
        showTrustLevelVote.value = false;
        selectedAquapoint.value = { ... (await aquapointService.getById(selectedAquapoint.value.id)).data }
    }

    function GoToGoogleMaps(){
        window.open('https://www.google.com/maps/@38.6008316,-9.0898432,14')
    }
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal-box {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 600px;
        max-height: 95%;
        position: relative;
        overflow-y: auto;
    }

    .btn-close {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .user-review-card {
        background-color: rgb(216, 216, 216);
        padding: 10px;
        margin: 10px 0px 10px 0px;
        border-radius: 12px;
        border: 1px solid #e9ecef;
        transition: box-shadow 0.2s;
    }

    .user-review-card:hover{
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .btn-trustLevelVote{
        padding: 2px 5px;
        font-size: 0.7rem;
    }

    .aquapoint-image-preview {
        position: relative;
        margin-bottom: 10px;
        width: 50%;
        left: 25%;
        border-radius: 8px;
        object-fit: contain;
    }

    .modal-box > img {
        object-fit: cover;
    }

    .point-image{
        border-radius: 12px 12px 0 0; /* Ou 16px */
        object-fit: cover; /* Ou fill */
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    }
</style>