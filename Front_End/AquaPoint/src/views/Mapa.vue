<template>
    <!--<h1>Mapa</h1>-->
    <div class="p-1" style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
    
        <!-- Botão Filtros -->
        <div style="position: relative;">
            <button @click="showFilters = !showFilters" 
                style="background: white; border: 0.5px solid #ccc; border-radius: 8px; padding: 8px 16px; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <i class="bi bi-sliders"></i>
                Filtros
                <i :class="showFilters ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            </button>

            <!-- Dropdown -->
            <div v-if="showFilters" 
                style="position: absolute; top: 44px; left: 0; background: white; border: 0.5px solid #ddd; border-radius: 12px; padding: 16px; min-width: 260px; z-index: 999; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                
                <!-- State Filter -->
                <p style="font-size: 12px; font-weight: 500; color: gray; margin: 0 0 10px; text-transform: uppercase;">Estado</p>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                    <label v-for="state in allPointStates" :key="state.id" style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px;">
                        <input type="checkbox" :value="state.state_name" v-model="filters.states">
                        <i :class="GetPointStateIcon(state.state_name, true)"></i>{{ state.state_name }}
                    </label>
                </div>

                <hr style="margin: 0 0 14px;">

                <!-- Type Filter -->
                <p style="font-size: 12px; font-weight: 500; color: gray; margin: 0 0 10px; text-transform: uppercase;">Tipo</p>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                    <label v-for="type in allTypes" :key="type.id" style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px;">
                        <input type="checkbox" :value="type.type_name" v-model="filters.types">
                        {{ type.type_name }}
                    </label>
                </div>

                <hr style="margin: 0 0 14px;">


                <!-- City Filter -->
                <p style="font-size: 12px; font-weight: 500; color: gray; margin: 0 0 10px; text-transform: uppercase;">Cidade</p>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                    <input v-model="filters.city" class="form-control form-control-sm" placeholder="Filtrar por cidade" @keyup.enter="activeCityFilter = filters.city;">
                </div>


                <!-- Filter dropdown button , clear and apply -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 0.5px solid #eee; padding-top: 12px;">
                    <button @click="ClearFilters" style="background: none; border: none; font-size: 13px; color: gray; cursor: pointer; text-decoration: underline;">Limpar</button>
                    <button @click="showFilters = false; AtualizarMarkers()" 
                        style="background: #378ADD; color: white; border: none; border-radius: 8px; padding: 6px 16px; font-size: 13px; cursor: pointer;">
                        Aplicar
                    </button>
                </div>

                
            </div>
        </div>

        <!-- Badges filtros ativos -->
        <span v-for="state in filters.states" :key="state"
            :style="[{ borderRadius: '20px', padding: '4px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }, GetStateStylesFromStateName(allPointStates, state)]">
            <i :class=GetPointStateIcon(state)></i>{{ state }}
            <span @click="removeStateFilter(state)" style="font-size: 14px; line-height: 1;">x</span>
        </span>

        <span v-for="type in filters.types" :key="type"
            style="background: #0c447c; color: #b5d4f4; border-radius: 20px; padding: 4px 10px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            {{ type }}
            <span @click="removeTypeFilter(type)" style="font-size: 14px; line-height: 1;">x</span>
        </span>

        <span v-if="activeCityFilter"
            :style="{ borderRadius: '20px', padding: '4px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: '#378ADD', color: 'white' }">
            <i class="bi bi-geo-alt me-1"></i>{{ activeCityFilter }}
            <span @click="activeCityFilter = ''; filters.city = ''; AtualizarMarkers()" style="font-size: 14px; line-height: 1;">×</span>
        </span>

    </div>

    <div style="position: relative">
        <!-- Loading Spinner while loading markers on map -->
        <div v-if="loadingMarkers" class="loading-markers-spinner">
            <img src="/src/assets/images/aqua_point_logo_white.png" class="loading-logo" />
        </div>

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
    <AquapointDetailsModal v-model:visible="showAquapointDetailsModal" v-model:aquapoint="selectedAquapoint" :aquapoint="selectedAquapoint" 
        @favoriteChanged="ChangeFavoriteSelectedMarker" @reviewChanged="RefreshSelectedMarker" />
    

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
                    <div class="image">
                        <img :src="newAquapointImagePreview" class="aquapoint-image-preview" style="cursor:pointer;" v-on:click="fileInput.click()">
                    </div>
                    <br>
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
                <button v-for="type in allTypes" :key="type.id" 
                :class="newAquapointType === type.id ? 'btn bg-aquapoint-blue text-white shadow-sm' : 'btn bg-aquapoint-gray'"
                 v-on:click="newAquapointType = type.id"> {{ type.nome }}</button>
                 <!----------------------->
                <h6>Estado do Bebedouro:</h6>
                <button v-for="state in allPointStates" :key="state.id" 
                :class="newAquapointState === state.id ? 'btn bg-aquapoint-blue text-white shadow-sm' : 'btn bg-aquapoint-gray'"
                 v-on:click="newAquapointState = state.id"> {{ state.nome }}</button>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success shadow-sm" style="width: 60%" v-on:click="SubmitNewAquapoint">SUBMETER</button>
            </div>
        </div>
    </div>

</template> 

<style scoped>
    .aquapoint-image-preview {
        width: 100%;
        height: 14rem; 
        object-fit: contain;
    }
</style>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import addNewMarkerImg from '../assets/images/map-markers/add_new_aqua_point_marker.png'
    import { Offcanvas } from 'bootstrap';
    import L, { icon } from 'leaflet'
    import 'leaflet/dist/leaflet.css'
    import { GetPointStateStylesFromList, GetStateStylesFromStateName, GetPointStateIcon } from '../utilities/tools';
    import { useToast } from 'vue-toastification';
    import { useAuth } from '../utilities/useAuth';
    import { useModalStore } from '../utilities/modal';
    import { userService } from '../services/userService';
    import { aquapointService } from '../services/aquapointService' 
    import { localsService } from '../services/localsService';
    import { zonesService } from '../services/zonesService';
    import { statesService } from '../services/statesService';
    import { typesService } from '../services/typesService';
    import { point } from 'leaflet';
    import { favoriteService } from '../services/favoriteService';
    import AquapointDetailsModal from '../components/AquapointDetailsModal.vue';


    const useModal = useModalStore()
    const Auth = useAuth()
    const toast = useToast()
    const mapaRef = ref(null)
   
    const selectedAquapoint = ref(null)
    const showAquapointPopup = ref(false)
    const AddNewMode = ref(false)
    const offcanvasRef = ref(null)
    let offcanvasInstance = null
    const newMarkerAquapoint = ref(null)
    const newAquapointType = ref(1)
    const newAquapointState = ref(1)
    const fileInput = ref(null)
    const fileName = ref('')
    const newAquapointImagePreview = ref(null)
    const newAquapointName = ref('')
    const offcanvasClosedBySubmitButton = ref(false)
    const aquapointsList = ref([])
    const localValue = ref('')
    const loadingMarkers = ref(false)
    const selectedMarker = ref(null)
    const userFavoritePoints = ref([])
    const showAquapointDetailsModal = ref(false)
    const showFilters = ref(false)
    const activeCityFilter = ref('')
    const allPointStates = ref([])
    const allTypes = ref([])
    const filters = ref({
        states: [],
        types: [],
        city: ''
    })

    onMounted(async() => {
        allPointStates.value = (await statesService.getAll()).data
        allTypes.value = (await typesService.getAll()).data
        filters.value.states = allPointStates.value.map(e => e.state_name)
        filters.value.types = allTypes.value.map(e => e.type_name)

        // Inicializa o offcanvas das informações no momento de adicionar um novo bebedouro
        offcanvasInstance = new Offcanvas(offcanvasRef.value)
        offcanvasRef.value.addEventListener('hide.bs.offcanvas', () => {
            console.log('offcanvas fechado')
            closeOffcanvas()
        })

        mapaRef.value = L.map('mapa', { zoomControl: false }).setView([38.781558, -9.102584], 13)
        L.tileLayer('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
            attribution: '© Jawg Maps',
            accessToken: 'BumVzniBYxFsvv2lUwvsZ8fQMn6WdPC2sS5bAqyeSyDrROwuULnZrt0lE1uKPHrT'
        }).addTo(mapaRef.value)
        L.control.zoom({position: 'topright'}).addTo(mapaRef.value)

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

        if (Auth.isLoggedIn) {
            await GetUserFavoritePoints()
        }

        SetUpAquapointsOnMap()
    })

    // Fica a aguardar que a variavel modoAdicionar altere e reaja à mudança mudando o tipo de cursor
    watch(AddNewMode, (val) => {
        if (!mapaRef.value) return
        mapaRef.value.getContainer().style.cursor = val ? 'crosshair' : ''
    })

    function AddMarkerToMap(point){
        const marker = L.marker(
            [point.latitude, point.longitude], 
            { 
                icon: GetAquapointMarker(point) 
            }
        )
        .addTo(mapaRef.value)
        .on('click', async () => {

            selectedMarker.value = marker
            selectedAquapoint.value = (await aquapointService.getById(point.id)).data
            //showAquapointPopup.value = true
            showAquapointDetailsModal.value = true
        })
    }

    async function RefreshSelectedMarker(){
        selectedAquapoint.value = (await aquapointService.getById(selectedAquapoint.value.id)).data
    }

    async function ChangeFavoriteSelectedMarker(){
        selectedMarker.value.remove()
        selectedAquapoint.value = (await aquapointService.getById(selectedAquapoint.value.id)).data
        await GetUserFavoritePoints()
        AddMarkerToMap(selectedAquapoint.value)
    }

    function GetAquapointMarker(point) {
        var markerColor = 'var(--aquapoint-marker-blue)'

        if (point.state_name == 'Inativo') {
            markerColor = 'red'
        } else if (point.state_name == 'Necessita manutenção') {
            markerColor = 'orange'
        }
        
        if (point.isPending == 1) {
            markerColor = 'gray'
        }

        let markerIcon = getMarkerIcon(markerColor)

        if (userFavoritePoints.value.find(p => p.point_id === point.id)) {
            let image = 'src/assets/images/map-markers/favorite_working.png'

            if (point.state_name == 'Inativo') {
                image = 'src/assets/images/map-markers/favorite_broken.png'
            } else if (point.state_name == 'Necessita manutenção') {
                image = 'src/assets/images/map-markers/favorite_not_working.png'
            } else {
                image = 'src/assets/images/map-markers/favorite_working.png'
            }

            markerIcon = L.icon({
                iconUrl: image,
                iconSize: [50, 50],
            });
        }

        return markerIcon;
    }

    function ClearMapMarkers() {
        mapaRef.value.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapaRef.value.removeLayer(layer)
            }
        })
    }

    async function GetUserFavoritePoints(){
        userFavoritePoints.value = (await favoriteService.getByUserId(Auth.user.id)).data || null

        /*var favorites = await favoriteService.getByUserId(Auth.user.id)
        if (favorites) {
            return favorites.data
        }

        return null*/
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

    async function SetUpAquapointsOnMap() {
        loadingMarkers.value = true
        aquapointsList.value = await GetAquapointsList()
        console.log(aquapointsList)
        
        if (aquapointsList) {
            aquapointsList.value.forEach(point => {
                if (point.isPending != 1) {
                    AddMarkerToMap(point)
                } else if (Auth.isLoggedIn && Auth.user.id === point.createdBy) {
                    AddMarkerToMap(point)
                }
            })
        }

        loadingMarkers.value = false
    }

    function AddOrCancelMarkerClick(){
        if(!Auth.isLoggedIn){
            useModal.openLoginModal()
            return
        }

        AddNewMode.value = !AddNewMode.value
    }  

    async function CloseAquaPointPopUp(){
        showAquapointPopup.value = false
        isFavorite.value = false

        /// funciona mas dá um pequeno delay e um efeito estranho de os marcadores desaparecerem e voltarem a aparecer, por isso optei por não limpar os marcadores ao fechar o popup
        /*ClearMapMarkers()
        SetUpAquapointsOnMap()*/
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
        newAquapointState.value = 1
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
            state_id: newAquapointState.value, // Pendente
            latitude: coords.lat, 
            longitude: coords.lng,
            createdBy: Auth.user.id,
            isPending: 1,
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
</script>

<style scoped>
    

    .loading-markers-spinner{
        position: absolute; 
        top: 0; left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(106, 106, 106, 0.655); 
        z-index: 999;
        display: flex; 
        align-items: center; 
        justify-content: center;
    }

    .loading-logo {
        width: 20%;
        animation: pulse 1.2s ease-in-out infinite;
        filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
    }

    @keyframes pulse {
        0%   { transform: scale(1);    opacity: 1; }
        50%  { transform: scale(1.2);  opacity: 0.6; }
        100% { transform: scale(1);    opacity: 1; }
    }
</style>