<template>
    <h1>Mapa</h1>

    <div style="position: relative">
        <div id="mapa" style="height: 80vh; width: 100%"></div>

        <!-- Botão Adicionar / Cancelar novo bebedouro -->
        <button :class="modoAdicionar  ? 'btn btn-danger' : 'btn btn-success'" style="position: absolute; bottom: 20px; right: 20px; z-index: 1000;"
            v-on:click="modoAdicionar = !modoAdicionar">

            <i :class="modoAdicionar ? 'bi bi-x-lg' : 'bi bi-plus-lg' "></i>
            {{ modoAdicionar ? 'Cancelar' : 'Adicionar Aquapoint' }}
        </button>
        <!------------------------------------------------>
    </div>

    <!-- Modal detalhes do bebedouro selecionado -->
    <div v-if="showAquapointPopup" class="modal-overlay" @click="showAquapointPopup = false">
        <div class="modal-box" @click.stop>
            <button class="btn-close" @click="showAquapointPopup = false"></button>

            <!-- Imagem Bebedouro e informações -->
            <img :src="selectedAquapoint.image" width="100%" height="300" alt="Imagem do bebedouro" style=" border-radius: 12px 12px 0 0;">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center mt-2">
                    <h4>{{ selectedAquapoint.nome }}</h4>
                    <i v-if="selectedAquapoint.estado === 'Inativo'" class="bi bi-exclamation-octagon-fill text-warning ms-2" title="Estado Inativo"></i>
                </div>
                <!-- Flag Reportar -->
                <div class="hex-bg">
                    <i class="bi bi-flag-fill text-white" style="font-size: 0.7rem" title="Reportar" v-on:click="ReportProblem"></i>
                </div>
                <!------------------->
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <i class="bi bi-star-fill text-warning"></i>
                    <span class="ms-1">{{ selectedAquapoint.ratingAvg}}</span> <span class="ms-1" style="font-size:0.8rem"> - {{selectedAquapoint.nrReviews }} opiniões</span>
                </div>
                <span>15min - 3,8km</span>
            </div>
            <!----------------------------------------->

            <!-- Nivel de Credibilidade -->
            <div class="mt-3">
                <span style="font-size: 0.8rem">Nivel de Credibilidade</span>
                <div class="d-flex">
                    <div class="progress" style="height: 12px; width: 30%; cursor:pointer;" title="Clicar para votar na credibilidade" v-on:click="VoteTrustLevel">
                        <div 
                            class="progress-bar" 
                            :class="{ 
                                'bg-orange': selectedAquapoint?.trustLevel === 1,
                                'bg-warning': selectedAquapoint?.trustLevel === 2,
                                'bg-success': selectedAquapoint?.trustLevel === 3
                            }"
                            style="width: 100%;">
                        </div>
                    </div>

                    <div v-if="showTrustLevelVote" class="vote-trustLevelBox">
                        <div class="d-flex gap-2 ms-2">
                            <button class="btn btn-sm btn-success btn-trustLevelVote">
                                <i class="bi bi-hand-thumbs-up-fill me-1"></i>Existe</button>
                            <button class="btn btn-sm btn-danger btn-trustLevelVote">
                               <i class="bi bi-hand-thumbs-down-fill me-1"></i>Não Existe</button>

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
                                <img src="/src/assets/images/defaultUserImage.jpg" width="20" height="20" alt="imagem utilizador">
                                <span class="ms-2">{{ review.userNome }}</span>
                                <span class="ms-auto" style="font-size:0.8rem">{{ review.createdDate }}</span>
                            </div>

                            <!-- Stars Rating -->
                            <span :title="review.pontuacao + ' estrelas'">
                                <StarsRating :rating="review.pontuacao" :isReadonly="true"></StarsRating> 
                            </span>

                            <p class="mb-0">{{ review.descrição }}</p>
                        </div>
                    </div>
                </div>
             </template>
            <!------------------------------------->

            <!-- Nova avaliação do bebedouro -->
             <h5 class="mt-5 mb-0">AVALIA ESTE BEBEDOURO</h5>
             <p class="mb-1" style="font-size: 0.9rem; color:gray;">Partilha a tua experiência</p>

             <StarsRating v-model:rating="newReviewNumber" ></StarsRating>
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
                    <img :src="newAquapointImagePreview" class="aquapoint-image-preview">
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
                :class="newAquapointType === type.nome ? 'btn bg-aquapoint-blue text-white' : 'btn bg-aquapoint-gray'"
                 v-on:click="newAquapointType = type.nome"> {{ type.nome }}</button>
                 <!----------------------->
            </div>

            <div class="d-flex justify-content-center mt-5">
                <button class="btn btn-success" style="width: 60%" v-on:click="SubmitNewAquapoint">SUBMETER</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Offcanvas } from 'bootstrap';
import L, { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import StarsRating from '../components/StarsRating.vue'
import { imageUrlToBase64 } from '../utilities/tools';
import { useToast } from 'vue-toastification';


const toast = useToast()
const reviews = ref([])
const mapaRef = ref(null)
const newReviewNumber = ref(0)
const reviewText = ref('')
const selectedAquapoint = ref(null)
const showAquapointPopup = ref(false)
const showTrustLevelVote = ref(false)
const modoAdicionar = ref(false)
const offcanvasRef = ref(null)
let offcanvasInstance = null
const newMarkerAquapoint = ref(null)
const aquapointTypes = [
    { id: 1, nome: 'Pessoas' },
    { id: 2, nome: 'Animais' },
    { id: 3, nome: 'Ambos' }
]
const newAquapointType = ref('Pessoas')
const fileInput = ref(null)
const fileName = ref('')
const newAquapointImagePreview = ref(null)
const newAquapointName = ref('')
const offcanvasClosedBySubmitButton = ref(false)
const aquapointsList = ref([])


onMounted(async() => {
    // Inicializa o offcanvas das informações no momento de adicionar um novo bebedouro
    offcanvasInstance = new Offcanvas(offcanvasRef.value)
    offcanvasRef.value.addEventListener('hide.bs.offcanvas', () => {
        console.log('offcanvas fechado')
        closeOffcanvas()
    })

    const imageBase64 = await imageUrlToBase64('https://scontent.flis9-2.fna.fbcdn.net/v/t1.6435-9/159226417_4049432591747023_5551976901920941269_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=4TYKScNiGWcQ7kNvwG6mRlw&_nc_oc=Adm-YNxGSIhNyQEL__HCr0HaqbtYLWFQRDxQh-ZanvMnr1WhLlaOMVN_j5R1mnU-P-M&_nc_zt=23&_nc_ht=scontent.flis9-2.fna&_nc_gid=7kr_Wj2Nkj7EQ0-dPZgkNw&oh=00_Afs7y1Mqp73JXjFta-li0d-usavddpMIJPW9lXojh3RGyQ&oe=69C8F988')
    const image2Base64 = await imageUrlToBase64('https://pbs.twimg.com/media/EPSkJ3GXUAAYjuI.jpg')

    aquapointsList.value = [
        { id: 1, nome: 'Aquapoint 1', image: imageBase64, estado: 'Ativo', lat: 38.781558, lng: -9.102584, ratingAvg: 4.7, nrReviews: 400, trustLevel: 3 },
        { id: 2, nome: 'Aquapoint 2', image: image2Base64, estado: 'Inativo', lat: 38.780195, lng: -9.104723, ratingAvg: 3.0, nrReviews: 52, trustLevel: 2 }
    ]

    reviews.value = [
         { id: 1, descrição: " Gostei muito deste bebedouro, agua de qualidade! boa localização, recomendo!", userNome: "Roberto Matias", pontuacao: 3, createdDate: '25/02/2026' },
         { id: 2, descrição: " Gostei muito deste bebedouro, agua de qualidade! boa localização, recomendo!", userNome: "Roberto Matias", pontuacao: 5 , createdDate: '25/02/2026'},
         { id: 3, descrição: " Gostei muito deste bebedouro, agua de qualidade! boa localização, recomendo!", userNome: "Roberto Matias", pontuacao: 4, createdDate: '25/02/2026' },
    ]

    mapaRef.value = L.map('mapa').setView([38.781558, -9.102584], 13)
    L.tileLayer('https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '© Jawg Maps',
    accessToken: 'BumVzniBYxFsvv2lUwvsZ8fQMn6WdPC2sS5bAqyeSyDrROwuULnZrt0lE1uKPHrT'
    }).addTo(mapaRef.value)

    mapaRef.value.on('click', (e) => {
        if(!modoAdicionar.value) return 
        const { lat, lng } = e.latlng

        newMarkerAquapoint.value = L.marker([lat, lng], { icon: getIcone('red')})
        .addTo(mapaRef.value)
        .bindPopup(`Lat: ${lat.toFixed(5)} <br> Lng: ${lng.toFixed(5)}`)
        .openPopup()

        openOffcanvas()
    })

    aquapointsList.value.forEach(point => {
        L.marker([point.lat, point.lng], { icon: getIcone(point.estado == 'Ativo' ? 'green' : 'orange') })
            .addTo(mapaRef.value)
            .on('click', () => {
                selectedAquapoint.value = point
                showAquapointPopup.value = true
                showTrustLevelVote.value = false
            })
        })

})

// Fica a aguardar que a variavel modoAdicionar altere e reaja à mudança mudando o tipo de cursor
watch(modoAdicionar, (val) => {
    if (!mapaRef.value) return
    mapaRef.value.getContainer().style.cursor = val ? 'crosshair' : ''
})

function getIcone(cor = 'blue') {
    return L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 24">
            <path fill="${cor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
        iconSize: [100, 60],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    })
}

function SubmitReview(){
    console.log('Rating: ' + newReviewNumber.value + '\nReview: ' + reviewText.value)
    newReviewNumber.value = 0
    reviewText.value = ''
}

function ReportProblem(){
    console.log('Report Problem clicked')
}

function VoteTrustLevel(){
    console.log('VoteTrustLevel clicked')
    showTrustLevelVote.value = !showTrustLevelVote.value
}

function openOffcanvas(){
    newAquapointImagePreview.value = '/src/assets/images/add_new_point.png'
    offcanvasInstance.show()
}

function closeOffcanvas(){
    if(!newMarkerAquapoint.value) return;    

    //if(!offcanvasClosedBySubmitButton.value) {
        mapaRef.value.removeLayer(newMarkerAquapoint.value)
        newMarkerAquapoint.value = null
    //}

    //offcanvasClosedBySubmitButton.value = false

    modoAdicionar.value = false
    newAquapointType.value = 'Pessoas'
    newAquapointName.value = null
    newAquapointImagePreview.value = null
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

function SubmitNewAquapoint(){
    if (!newAquapointName.value || newAquapointName.value.trim() === ''){
        // failed
        console.log('Failed to submit, name is null')
        return;
    }

    console.log(`${newAquapointName.value} \n${newAquapointType.value}`)
    //offcanvasClosedBySubmitButton.value = true

    const coords = newMarkerAquapoint.value.getLatLng()
    const newPoint = { id: aquapointsList.length + 1, nome: newAquapointName.value, image: newAquapointImagePreview.value, estado: 'Ativo', lat: coords.lat, lng: coords.lng, ratingAvg: 0, nrReviews: 0, trustLevel: 1 }
    aquapointsList.value.push(newPoint)

    AddMarkerToMap(newPoint)
    offcanvasInstance.hide()
    toast.success('Aquapoint criado com sucesso!')
}

function AddMarkerToMap(point){
    L.marker([point.lat, point.lng], { icon: getIcone(point.estado === 'Ativo' ? 'green' : 'orange') })
        .addTo(mapaRef.value)
        .on('click', () => {
            selectedAquapoint.value = point
            showAquapointPopup.value = true
            showTrustLevelVote = false
        })
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
    width: 500px;
    max-height: 95%;
    position: relative;
    overflow-y: auto;
}

.btn-close {
    position: absolute;
    top: 5px;
    right: 5px;
}

.btn-close-popup {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 4px 12px;
    font-size: 0.7rem;
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

.hex-bg {
    width: 20px;
    height: 20px;
    background-color: #af0202;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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


</style>