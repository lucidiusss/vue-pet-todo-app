import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { MotionPlugin } from '@vueuse/motion'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import lara from '@/presets/lara'

import Profile from './pages/Profile.vue'
import Home from './pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/profile', name: 'profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.use(MotionPlugin)
app.use(PrimeVue, {
  unstyled: false,
  pt: lara
})
app.use(ToastService)

app.mount('#app')
