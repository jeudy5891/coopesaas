<template>
  <div class="selector-page">

    <div class="selector-header">
      <RouterLink to="/" class="header-logo">
        <img src="/icono.png" alt="CoopeSaaS" class="header-icon" />
        <span class="header-brand"><strong>Coope</strong>SaaS</span>
      </RouterLink>
      <h1 class="header-title">Configura tu espacio de trabajo</h1>
      <p class="header-sub">Seleccioná los módulos que utilizará tu cooperativa. Podés ajustar esto en cualquier momento.</p>
      <div class="header-counter">
        <span class="counter-badge">{{ selectedCount }} de {{ MODULES.length }} módulos seleccionados</span>
        <button class="btn-toggle-all" @click="toggleAll">
          {{ selectedCount === MODULES.length ? 'Deseleccionar todos' : 'Seleccionar todos' }}
        </button>
      </div>
    </div>

    <div class="modules-grid">
      <div
        v-for="mod in MODULES"
        :key="mod.key"
        class="module-card"
        :class="{ 'module-card--selected': isModuleActive(mod.key) }"
        @click="toggleModule(mod.key)"
      >
        <div class="card-top">
          <div class="card-check">
            <svg v-if="isModuleActive(mod.key)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div class="card-icon" v-html="mod.icon"></div>
        </div>
        <h3 class="card-name">{{ mod.name }}</h3>
        <ul class="card-features">
          <li v-for="feat in mod.features" :key="feat">{{ feat }}</li>
        </ul>
      </div>
    </div>

    <div class="selector-footer">
      <button class="btn-enter" :disabled="selectedCount === 0" @click="enter">
        Ingresar al sistema
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      <p v-if="selectedCount === 0" class="footer-warning">Seleccioná al menos un módulo para continuar</p>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModules, ALL_MODULE_KEYS } from '../composables/useModules.js'

const router = useRouter()
const { isModuleActive, toggleModule, setModules } = useModules()

const selectedCount = computed(() =>
  ALL_MODULE_KEYS.filter(k => isModuleActive(k)).length
)

function toggleAll() {
  if (selectedCount.value === MODULES.length) setModules([])
  else setModules(ALL_MODULE_KEYS)
}

function enter() {
  router.push('/dashboard')
}

const MODULES = [
  {
    key: 'personal',
    name: 'Personal',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    features: ['Gestión de expedientes', 'Documentación', 'Vacaciones y permisos', 'Control de asistencia', 'Incapacidades', 'Capacitaciones', 'Evaluaciones de desempeño'],
  },
  {
    key: 'asociados',
    name: 'Asociados',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    features: ['Registro de miembros', 'Historial de aportes', 'Estado de cuenta', 'Solicitudes de ingreso', 'Certificaciones', 'Comunicaciones'],
  },
  {
    key: 'organos',
    name: 'Órganos Sociales',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    features: ['Consejo de Administración', 'Comité de Vigilancia', 'Comité de Educación y Bienestar Social', 'Tribunal Electoral', 'Actas de sesiones', 'Control de vencimientos'],
  },
  {
    key: 'comites',
    name: 'Comités',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    features: ['Creación de comités', 'Asignación de miembros', 'Sesiones y actas', 'Seguimiento de acuerdos', 'Reportes de gestión'],
  },
  {
    key: 'asambleas',
    name: 'Asambleas',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    features: ['Convocatorias', 'Registro de asistencia', 'Control de quórum', 'Actas y acuerdos', 'Documentos adjuntos'],
  },
  {
    key: 'votaciones',
    name: 'Votaciones',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    features: ['Votaciones electrónicas', 'Papeletas digitales', 'Conteo automático', 'Auditoría de votos', 'Resultados en tiempo real'],
  },
  {
    key: 'finanzas',
    name: 'Finanzas',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    features: ['Presupuesto anual', 'Ingresos y egresos', 'Cuentas por cobrar/pagar', 'Conciliaciones bancarias', 'Estados financieros'],
  },
  {
    key: 'creditos',
    name: 'Créditos',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    features: ['Solicitudes de crédito', 'Análisis de capacidad de pago', 'Tablas de amortización', 'Desembolsos', 'Cobros y cuotas'],
  },
  {
    key: 'riesgos',
    name: 'Riesgos',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    features: ['Matriz de riesgos', 'Indicadores de alerta', 'Planes de mitigación', 'Reportes de cumplimiento', 'Auditoría interna'],
  },
  {
    key: 'reportes',
    name: 'Reportes',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    features: ['Dashboard ejecutivo', 'Reportes financieros', 'Indicadores KPI', 'Exportación PDF / Excel', 'Gráficos interactivos'],
  },
]
</script>

<style scoped>
.selector-page {
  min-height: 100svh;
  background: #F4F6F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 24px 24px;
  gap: 20px;
}

/* ── Header ─────────────────────────────── */
.selector-header {
  text-align: center;
  max-width: 720px;
  width: 100%;
}

.header-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #133C65;
  margin-bottom: 14px;
}

.header-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.header-brand {
  font-size: 17px;
  color: #133C65;
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  color: #133C65;
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}

.header-sub {
  font-size: 13.5px;
  color: #5A7490;
  margin: 0 0 12px;
}

.header-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.counter-badge {
  display: inline-block;
  background: #133C65;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.btn-toggle-all {
  font-size: 12px;
  font-weight: 600;
  color: #133C65;
  background: none;
  border: 1.5px solid #133C65;
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn-toggle-all:hover {
  background: #133C65;
  color: white;
}

/* ── Grid ───────────────────────────────── */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 1180px;
}

/* ── Card ───────────────────────────────── */
.module-card {
  background: white;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  padding: 12px 14px 14px;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  user-select: none;
}

.module-card:hover {
  border-color: #93B8D8;
  box-shadow: 0 2px 8px rgba(19, 60, 101, 0.1);
}

.module-card--selected {
  border-color: #133C65;
  background: #EEF4FA;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
}

.card-check {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid #CBD5E1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
  color: white;
}

.module-card--selected .card-check {
  background: #133C65;
  border-color: #133C65;
}

.card-icon {
  color: #133C65;
  opacity: 0.6;
  flex-shrink: 0;
}

.module-card--selected .card-icon {
  opacity: 1;
  color: #E8A31C;
}

.card-name {
  font-size: 13px;
  font-weight: 700;
  color: #133C65;
  margin: 0 0 8px;
}

.card-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.card-features li {
  font-size: 11.5px;
  color: #5A7490;
  padding-left: 10px;
  position: relative;
  line-height: 1.4;
}

.card-features li::before {
  content: '·';
  position: absolute;
  left: 2px;
  color: #93B8D8;
  font-weight: 700;
}

.module-card--selected .card-features li {
  color: #2D4A64;
}

/* ── Footer ─────────────────────────────── */
.selector-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.btn-enter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #133C65;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 32px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s, opacity 0.15s;
  letter-spacing: 0.01em;
}

.btn-enter:hover:not(:disabled) {
  background: #1A5190;
  transform: translateY(-1px);
}

.btn-enter:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.footer-warning {
  font-size: 12px;
  color: #E8A31C;
  font-weight: 600;
  margin: 0;
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 1100px) {
  .modules-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 860px) {
  .modules-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 600px) {
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
  .selector-page { padding: 20px 14px; }
}
</style>
