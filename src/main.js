import { createApp } from 'vue'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router/index.js'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
