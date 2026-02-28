import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import SobreNos from '../views/SobreNos.vue'
import Mapa from '../views/Mapa.vue'
import Contacto from '../views/Contacto.vue'

// Protected views (only for admins)
import Dashboard from '../views/admin/Dashboard.vue'
import AdminUsers from '../views/admin/DashboardUsers.vue'
import AdminBebedouros from '../views/admin/DashboardBebedouros.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/sobre-nos', component: SobreNos },
    { path: '/mapa', component: Mapa },
    { path: '/contacto', component: Contacto },
    { 
        path: '/admin/dashboard', 
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    { 
        path: '/admin/dashboard-users', 
        component: AdminUsers,
        meta: { requiresAuth: false }
    },
    { 
        path: '/admin/dashboard-bebedouros', 
        component: AdminBebedouros,
        meta: { requiresAuth: false }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next('/');
    } else {
        next();
    }
})

export default router