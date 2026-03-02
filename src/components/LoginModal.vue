<template>
    <div v-if="visible" class="modal-overlay" @click="ChangeVisibility(!visible)">
        <div class="container py-5 h-100" >
            <div class="row d-flex justify-content-center align-items-center h-100">                
                <div class="col-12 col-md-8 col-lg-6 col-xl-5" @click.stop>                    
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">

                        <button class="btn-close" style="filter: invert(1);" @click="ChangeVisibility(!visible)"></button>

                        <div class="card-body p-5 text-center">                           

                            <div class="mb-md-5 mt-md-4 pb-5">
                            <img src="../assets/images/aqua_point_logo_white.png" class="me-2" style="width: 250px">
                            <h2 class="fw-bold mt-5 mb-2 text-uppercase">Login</h2>
                            <p class="text-white-50 mb-5">Por favor, insira o email e palavra-passe!</p>

                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <label class="form-label" for="typeEmailX">Email</label>
                                <input v-model="emailUser" type="email" id="typeEmailX" class="form-control form-control-lg" />
                            </div>

                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                <label class="form-label" for="typePasswordX">Palavra-Passe</label>
                                <input v-model="passwordUser" type="password" id="typePasswordX" class="form-control form-control-lg" />
                            </div>

                            <!--<p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>-->

                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit" v-on:click="ProcessLogin">Login</button>

                            <div class="d-flex justify-content-center text-center mt-4 pt-1">
                                <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                                <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                            </div>

                            </div>

                            <div>
                            <p class="mb-0">Não tem conta registada? <a href="#!" class="text-white-50 fw-bold" v-on:click="GoToRegistNewAccount">Registar</a>
                            </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

    defineProps({
        visible: {
            type: Boolean,
            default: false
        }
    })

    const emailUser = ref('')
    const passwordUser = ref('')

    const emit = defineEmits(['update:visible'])

    function ChangeVisibility(value){
        emit('update:visible', value)
    }

    function ProcessLogin(){
        console.log(`Email: ${emailUser.value}\nPassword: ${passwordUser.value}`)
    }

    function GoToRegistNewAccount(){
        console.log('GoToRegistNewAccount clicked.')
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