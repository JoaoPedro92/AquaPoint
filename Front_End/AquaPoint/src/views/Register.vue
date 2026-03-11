<template>

<div class="spacer"></div>

<section class="register-section">

  <div class="container">

    <div class="row align-items-center">

      <div class="col-lg-6 register-image-area">

        <img
          src="/src/assets/images/aqua_point_logo.png"
          class="register-image"
          alt="Register User">

      </div>

      <!-- FORMULÁRIO -->
      <div class="col-lg-6 register-form-area">

        <div class="register-form-wrapper">

          <h3 class="main-titles mb-5">REGISTAR UTILIZADOR</h3>

          <form @submit.prevent="RegisterUser">

            <div class="form-group mb-3">
              <label class="form-label">Nome</label>
              <input
                v-model="nameValue"
                type="text"
                class="form-control contact-form"
                placeholder="Introduza o seu nome"
                required>
            </div>

            <div class="form-group mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="emailValue"
                type="email"
                class="form-control contact-form"
                placeholder="Introduza o seu email"
                required>
            </div>

            <div class="form-group mb-3">
  <label class="form-label">Password</label>

  <div class="password-wrapper">

        <input
        v-model="passwordValue"
        :type="showPassword ? 'text' : 'password'"
        class="form-control password-input"
        placeholder="Introduza uma password" required>

          <i 
          class="toggle-password"
          :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
          @click="showPassword = !showPassword">
           </i>

          </div>

          </div>

            <input
              type="submit"
              value="Registar"
              class="btn btn-register"
            >

          </form>

        </div>

      </div>

    </div>

  </div>

</section>

</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'


const nameValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
const showPassword = ref(false)
const router = useRouter()

function RegisterUser(){

  console.log(
    "Nome:", nameValue.value,
    "Email:", emailValue.value,
    "Password:", passwordValue.value
  )

  nameValue.value = ''
  emailValue.value = ''
  passwordValue.value = ''

  router.push("/")

}

</script>

<style scoped>

@import "/src/assets/css/style.css";

.register-section{
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.register-image-area{
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-image{
  width: 60%;
  max-width: 320px;
}

.register-form-area{
  display: flex;
  justify-content: center;
}

.register-form-wrapper{
  width: 100%;
  max-width: 420px;
}

.form-label{
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.password-wrapper{
  position: relative;
  width: 95%;
}

.password-input{
  width: 100%;
  height: 40px;
  padding: 0 45px 0 0.5vh;
}

.toggle-password{
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #6c757d;
}

.toggle-password:hover{
  color: var(--aquapoint-logo-blue);
}

.btn-register{
  width: 95%;
  max-width: 220px;
  height: 40px;
  margin: 20px auto 0 auto;
  background-color: var(--aquapoint-logo-blue);
  color: white;
  border: none;
}

.btn-register:hover{
  background-color: var(--aquapoint-marker-blue);
}

/* MOBILE */
@media (max-width: 992px){

.register-section{
  text-align:center;
}

.register-image-area{
  margin-bottom: 30px;
}

.register-image{
  width: 40%;
}

}

</style>