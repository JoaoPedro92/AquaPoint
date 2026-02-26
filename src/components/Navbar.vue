<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">AquaPoint</a>

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

        <a href="#" class="btn btn-outline-light mt-2 mt-lg-0">Login</a>
      </div>
    </div>
  </nav>
  </template>

<script>
  export default {
    name: 'Navbar'
}
</script>