import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import PricingView from '../views/PricingView.vue'
import AboutView from '../views/AboutView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import DashboardHome from '../views/DashboardHome.vue'
import PersonalView from '../views/PersonalView.vue'
import AsociadosView from '../views/AsociadosView.vue'
import OrganosView from '../views/OrganosView.vue'
import ComitesView from '../views/ComitesView.vue'
import AsambleasView from '../views/AsambleasView.vue'
import VotacionesView from '../views/VotacionesView.vue'
import FinanzasView from '../views/FinanzasView.vue'
import CreditosView from '../views/CreditosView.vue'
import RiesgosView from '../views/RiesgosView.vue'
import ConfiguracionView from '../views/ConfiguracionView.vue'
import RolesView from '../views/RolesView.vue'

const routes = [
  { path: '/', component: LandingPage, meta: { title: 'CoopeSaaS — Gestión Cooperativa' } },
  { path: '/precios', component: PricingView, meta: { title: 'Planes — CoopeSaaS' } },
  { path: '/nosotros', component: AboutView, meta: { title: 'Nosotros — CoopeSaaS' } },
  { path: '/login', component: LoginPage, meta: { title: 'Iniciar sesión — CoopeSaaS' } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardHome, meta: { title: 'Inicio — CoopeSaaS' } },
      { path: 'personal', component: PersonalView, meta: { title: 'Personal — CoopeSaaS' } },
      { path: 'asociados', component: AsociadosView, meta: { title: 'Asociados — CoopeSaaS' } },
      { path: 'organos', component: OrganosView, meta: { title: 'Órganos Sociales — CoopeSaaS' } },
      { path: 'comites', component: ComitesView, meta: { title: 'Comités — CoopeSaaS' } },
      { path: 'asambleas', component: AsambleasView, meta: { title: 'Asambleas — CoopeSaaS' } },
      { path: 'votaciones', component: VotacionesView, meta: { title: 'Votaciones — CoopeSaaS' } },
      { path: 'finanzas', component: FinanzasView, meta: { title: 'Finanzas — CoopeSaaS' } },
      { path: 'creditos', component: CreditosView, meta: { title: 'Créditos — CoopeSaaS' } },
      { path: 'riesgos', component: RiesgosView, meta: { title: 'Riesgos — CoopeSaaS' } },
      { path: 'configuracion', component: ConfiguracionView, meta: { title: 'Configuración — CoopeSaaS' } },
      { path: 'configuracion/roles', component: RolesView, meta: { title: 'Roles — CoopeSaaS' } },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'CoopeSaaS'
})
