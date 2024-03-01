import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import lara from '@/presets/lara'

import SignIn from './pages/SignIn.vue'
import Home from './pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'SignIn', component: SignIn }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.use(PrimeVue, {
  unstyled: false,
  pt: lara
})
app.use(ToastService)

app.mount('#app')
