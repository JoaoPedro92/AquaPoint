<template>
    <div v-if="visible" class="modal-overlay" @click="ChangeVisibility(!visible)">
        <div class="modal-box" @click.stop>
            <button class="btn-close" @click="ChangeVisibility(!visible)"></button>

            <div class="d-flex align-items-center">
                <div class="hex-bg mb-1 me-2">
                    <i class="bi bi-flag-fill text-white" style="font-size: 0.7rem" title="Reportar" v-on:click="ReportProblem"></i>
                </div>
                <h5>Report Problem</h5>
            </div>
            

            <div class="form-floating mb-3 mt-4">
                <input v-model="userEmail" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating">
                <textarea v-model="reportDescription" class="form-control" id="floatingPassword" placeholder="Descrição" rows="6" style="min-height: 150px;"></textarea>
                <label for="floatingPassword">Descrição</label>
            </div>

            <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-success shadow-sm" style="width: 60%;" v-on:click="ReportProblem">SUBMETER</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const userEmail = ref('')
const reportDescription = ref('')

    defineProps({
        visible: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:visible'])

    function ChangeVisibility(value){
        emit('update:visible', value)
    }

    function ReportProblem(){
        console.log(`Email: ${userEmail.value}\nDescrição: ${reportDescription.value}`)
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
    width: 550px;
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