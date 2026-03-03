<script setup>
import Footer from './components/Footer.vue';
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->

  <div class="d-flex flex-column min-vh-100">
    <NavBar/>
    <main class="flex-grow-1">
      <router-view/>
    </main>

    <Footer></Footer>
  </div>

  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
