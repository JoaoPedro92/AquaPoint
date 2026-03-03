<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- Aquapoint Logo -->
      <img src="../assets/images/aqua_point_logo_white.png" class="me-2" style="width: 250px">

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

        <a href="#" class="btn btn-outline-light mt-2 mt-lg-0" v-on:click="loginModalVisible = true">Login</a>
      </div>
    </div>
  </nav>

  <LoginModal v-model:visible="loginModalVisible"></LoginModal>
  
  </template>

<script setup>
import { ref } from 'vue';
import LoginModal from './LoginModal.vue';

const loginModalVisible = ref(false)

</script>