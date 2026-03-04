<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3 px-5" >
      <!-- Aquapoint Logo -->
    <div class="col-md-3 mb-2 mb-md-0">
        <img src="../assets/images/aqua_point_logo_white.png" class="me-2" style="width: 250px">
    </div>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-lg-flex justify-content-between align-items-center" id="menu">
            
            <ul class="navbar-nav mx-auto gap-3">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/sobre-nos">Sobre Nós</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/mapa">Mapa</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/dashboard">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/contacto">Contacto</router-link>
                </li>
            </ul>
        
        <div class="col-md-3 text-end text-center text-md-end ">
            <a v-if="!Auth.isLoggedIn" href="#" class="btn btn-outline-light mt-2 mt-lg-0" v-on:click="loginModal.openLoginModal()">Login</a>
           <router-link 
                v-if="!Auth.isLoggedIn"
                to="/register"
                class="btn btn-primary ms-3 mt-2 mt-lg-0">
                Registar
                </router-link>
            <div v-else class="position-relative mt-2 mt-lg-0">
                <!-- overlay para fechar ao clicar fora -->
                <div v-if="showUserMenu" 
                    style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:999;" 
                    @click="showUserMenu = false">
                </div>

                <button class="btn btn-secondary" @click="showUserMenu = !showUserMenu">
                    {{ Auth.user.name }}
                    <i class="bi bi-chevron-down ms-1"></i>
                </button>

                <ul v-if="showUserMenu" class="dropdown-menu dropdown-menu-dark show" style="position:absolute; right:0; z-index:999; width: fit-content;">
                    <li>
                        <router-link to="/user/personal-area" class="dropdown-item">Perfil</router-link>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" style="cursor:pointer;" @click="LogoutUser">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

  </nav>

  
  </template>

<script setup>
import { ref } from 'vue';
import LoginModal from './LoginModal.vue';
import { useAuth } from '../utilities/useAuth';
import { useModalStore } from '../utilities/modal';

const loginModal = useModalStore()
const Auth = useAuth()
const loginModalVisible = ref(false)
const showUserMenu = ref(false)

function LogoutUser(){
    try{
        Auth.logout()
    }
    catch (e){
        alert(e)
    }
}
</script>