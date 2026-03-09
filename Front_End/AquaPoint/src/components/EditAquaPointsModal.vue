<template>
    <div v-if="visible" class="modal-overlay" @click="ChangeVisibility(!visible)">
        <div class="modal-box col-lg-6" @click.stop>
            <button class="btn-close" @click="ChangeVisibility(!visible)"></button>

            <section class="main-container container-spacer">
                <div class="container">
                    <div class="spacer"></div>
                    <h1 class="main-titles">EDITAR BEBEDOURO</h1>
                    <div class="spacer"></div>

                    <div class="row">
                        <div class="col-lg-6 mt-5 mt-lg-0">
                            <img
                                :src="newAquapointImage"
                                alt="defaultPointImage"
                                class="edit-zone-image"
                                @click="openFileInput"
                                style="cursor:pointer"
                            >

                            <input
                                type="file"
                                ref="fileInput"
                                style="display:none"
                                @change="onFileChange"
                                accept="image/*"
                            >
                        </div>

                        <div class="col-lg-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="label" for="name"></label>
                                        <input v-model="nameValue" type="text" class="form-control edit-form" name="name" id="name" placeholder="Nome do bebedouro" tabindex="0" required>
                                    </div>
                                </div>
                                <div class="col-md-6"> 
                                    <div class="form-group">
                                        <label class="label" for="state"></label>
                                        <select v-model="stateValue" class="form-control edit-form" name="state" id="state" required>
                                            <option value="1">Ativo</option>
                                            <option value="2">Inativo</option>
                                            <option value="3">Pendente</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="label" for="trust"></label>
                                        <select v-model="trustValue" class="form-control edit-form" name="trust" id="trust" required>
                                            <option value="2">Existe mas com pouca certeza</option>
                                            <option value="3">Existe com alguma certeza</option>
                                            <option value="4">Verificado</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6"> 
                                    <div class="form-group">
                                        <label class="label" for="latitude"></label>
                                        <input v-model="latitudeValue" type="text" class="form-control edit-form" name="latitude" id="latitude" placeholder="Latitude" tabindex="0" required>
                                    </div>
                                </div>
                                
                                
                                <div class="col-md-6"> 
                                    <div class="form-group">
                                        <label class="label" for="longitude"></label>
                                        <input v-model="longitudeValue" type="text" class="form-control edit-form" name="longitude" id="longitude" placeholder="Longitude" tabindex="0" required>
                                    </div>
                                </div>

                                <div class="col-md-6"> 
                                    <div class="form-group">
                                        <label class="label" for="zone"></label>
                                        <input v-model="zoneValue" type="text" class="form-control edit-form" name="zone" id="zone" placeholder="Zona" tabindex="0" required>
                                    </div>
                                </div>

                                
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="submit" value="Submeter" class="btn btn-form bg-primary" style="width: 100% !important; height: 40px !important; margin-top: 4%; color: white;" tabindex="0">
                                    </div>
                                </div>
                            </div>
                        </div><!-- Col end -->

                        
                    </div><!-- Content row end -->

                </div><!-- Container end -->
            </section>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'

    const fileInput = ref(null)
    let newAquapointImage = ref(null)
    const props = defineProps({
        visible: {
            type: Boolean,
            default: false
        },
        aquapoint: {
            type: Object,
            default: null
        }
    })

    const emit = defineEmits(['update:visible'])

    const nameValue = ref('')
    const stateValue = ref('')
    const trustValue = ref('')
    const latitudeValue = ref('')
    const longitudeValue = ref('')
    const zoneValue = ref('')

    function ChangeVisibility(value) {
        emit('update:visible', value)
    }

    watch(
        () => props.aquapoint,
            (newValue) => {
                if (newValue) {
                    nameValue.value = newValue.point_name ?? ''
                    stateValue.value = newValue.state_id ?? ''
                    trustValue.value = newValue.point_trust ?? ''
                    latitudeValue.value = newValue.latitude ?? ''
                    longitudeValue.value = newValue.longitude ?? ''
                    zoneValue.value = newValue.zone_name ?? ''
                    newAquapointImage.value = newValue.image ?? "/src/assets/images/defaultPointImage.jpg"
                } else {
                    nameValue.value = ''
                    stateValue.value = ''
                    trustValue.value = ''
                    latitudeValue.value = ''
                    longitudeValue.value = ''
                    zoneValue.value = ''
                    newAquapointImage.value = "/src/assets/images/defaultPointImage.jpg"
                }
            },
        { immediate: true }
    )

    function openFileInput() {
        fileInput.value.click()
    }

    function onFileChange(event) {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            newAquapointImage.value = e.target.result
        }
        reader.readAsDataURL(file)
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
        max-height: 95%;
        position: relative;
        overflow-y: auto;
    }

    .btn-close {
        position: absolute;
        top: 5px;
        right: 5px;
    }
</style>