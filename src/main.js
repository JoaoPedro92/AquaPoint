import { createApp } from 'vue'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router/index.js'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(Toast)
    .mount('#app')
