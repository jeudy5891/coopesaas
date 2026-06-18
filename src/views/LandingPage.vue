<template>
  <div class="landing">

    <!-- NAVBAR -->
    <nav class="navbar" :class="{ 'navbar--solid': isScrolled }">
      <div class="nav-inner">
        <RouterLink to="/" class="nav-logo">
          <img src="/icono.png" alt="CoopeSaaS" class="nav-logo-icon" />
          <span class="logo-text"><strong>Coope</strong>SaaS</span>
        </RouterLink>
        <div class="nav-links">
          <a href="#modulos">Módulos</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#como-funciona">Cómo funciona</a>
          <RouterLink to="/precios">Precios</RouterLink>
          <RouterLink to="/nosotros">Nosotros</RouterLink>
        </div>
        <div class="nav-actions">
          <RouterLink to="/login" class="btn-ghost-sm">Iniciar sesión</RouterLink>
          <button class="btn-primary-sm" @click="demoOpen = true">Solicitar Demo</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-dots"></div>
      <div class="hero-glow"></div>
      <div class="hero-inner">
        <div class="hero-content" :class="{ 'is-visible': heroVisible }">
          <div class="hero-badge">
            <span class="badge-pulse"></span>
            Plataforma SaaS para el Sector Cooperativo
          </div>
          <h1 class="hero-title">
            La gestión de tu cooperativa,
            <em>en un solo lugar</em>
          </h1>
          <p class="hero-desc">
            Digitaliza y centraliza la administración de tu cooperativa: personal, asociados,
            órganos sociales, comités y asambleas desde una plataforma segura y fácil de usar.
          </p>
          <div class="hero-actions">
            <button class="btn-hero-primary" @click="demoOpen = true">
              Solicitar Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="#modulos" class="btn-hero-ghost">Ver módulos</a>
          </div>
          <div class="hero-proof">
            <div class="proof-avatars">
              <div class="avatar" style="background:#1B5490">M</div>
              <div class="avatar" style="background:#1A9152">C</div>
              <div class="avatar" style="background:#7B3FA0">A</div>
              <div class="avatar" style="background:#C47F0C">J</div>
            </div>
            <span>Más de 50 cooperativas ya confían en CoopeSaaS</span>
          </div>
        </div>

        <div class="hero-visual">
          <div class="app-mockup">
            <div class="mockup-chrome">
              <div class="chrome-dots">
                <span style="background:#FF5F57"></span>
                <span style="background:#FEBC2E"></span>
                <span style="background:#28C840"></span>
              </div>
              <div class="chrome-url">app.coopesaas.com</div>
            </div>
            <div class="mockup-body">
              <div class="mock-sidebar">
                <div class="mock-brand">
                  <div class="mock-brand-icon">CS</div>
                  <span>CoopeSaaS</span>
                </div>
                <div class="mock-nav">
                  <div class="mock-item mock-item--active">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                    Dashboard
                  </div>
                  <div class="mock-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    Personal
                  </div>
                  <div class="mock-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    Asociados
                  </div>
                  <div class="mock-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Órganos
                  </div>
                  <div class="mock-item">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Asambleas
                  </div>
                </div>
              </div>
              <div class="mock-main">
                <div class="mock-topbar">
                  <span class="mock-page-title">Dashboard</span>
                  <div class="mock-avatar-sm">JP</div>
                </div>
                <div class="mock-cards">
                  <div class="mock-card">
                    <div class="mc-num">248</div>
                    <div class="mc-label">Asociados</div>
                  </div>
                  <div class="mock-card">
                    <div class="mc-num">32</div>
                    <div class="mc-label">Personal</div>
                  </div>
                  <div class="mock-card">
                    <div class="mc-num">6</div>
                    <div class="mc-label">Comités</div>
                  </div>
                </div>
                <div class="mock-chart">
                  <div class="mc-chart-label">Actividad mensual</div>
                  <div class="mc-bars">
                    <div class="mc-bar" style="--h:55%"></div>
                    <div class="mc-bar" style="--h:80%"></div>
                    <div class="mc-bar" style="--h:40%"></div>
                    <div class="mc-bar" style="--h:90%"></div>
                    <div class="mc-bar" style="--h:65%"></div>
                    <div class="mc-bar" style="--h:75%"></div>
                    <div class="mc-bar" style="--h:50%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="float-card float-top">
            <div class="float-check">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div class="float-title">Asamblea registrada</div>
              <div class="float-sub">Asamblea Ord. · 20 jun 2026</div>
            </div>
          </div>
          <div class="float-card float-bottom">
            <div class="float-trend">
              <span>+18</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A9152" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div class="float-sub">Nuevos asociados este mes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="(stat, i) in stats" :key="i" class="stat-item">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- MÓDULOS -->
    <section class="modules" id="modulos">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">Módulos</div>
          <h2 class="section-title">Todo lo que tu cooperativa necesita</h2>
          <p class="section-subtitle">
            Seis módulos integrados que cubren los procesos clave de cualquier cooperativa,
            desde la gestión de personas hasta las asambleas más importantes.
          </p>
        </div>
        <div class="modules-grid">
          <div v-for="mod in modules" :key="mod.key" class="module-card">
            <div class="mod-icon-wrap" :style="{ background: mod.bg }">
              <span v-html="mod.icon"></span>
            </div>
            <div class="mod-tag">{{ mod.tag }}</div>
            <h3 class="mod-name">{{ mod.name }}</h3>
            <p class="mod-desc">{{ mod.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section class="benefits" id="beneficios">
      <div class="section-wrap">
        <div class="benefits-layout">
          <div class="benefits-left">
            <div class="section-tag">¿Por qué CoopeSaaS?</div>
            <h2 class="section-title">Diseñado para el sector cooperativo</h2>
            <p class="section-subtitle">
              Entendemos las necesidades específicas de las cooperativas costarricenses.
              Por eso construimos una plataforma que se adapta a su estructura y marco legal único.
            </p>
            <button class="btn-primary-md" @click="demoOpen = true">
              Solicitar demo gratuita
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div class="benefits-right">
            <div v-for="ben in benefits" :key="ben.key" class="benefit-row">
              <div class="ben-icon-wrap" v-html="ben.icon"></div>
              <div class="ben-body">
                <h4>{{ ben.title }}</h4>
                <p>{{ ben.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section class="how-works" id="como-funciona">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">Proceso</div>
          <h2 class="section-title">Comienza en tres pasos</h2>
          <p class="section-subtitle">
            Empieza a utilizar CoopeSaaS en tu cooperativa de forma rápida y sencilla.
          </p>
        </div>
        <div class="steps-grid">
          <div v-for="(step, i) in steps" :key="i" class="step-card">
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-icon" v-html="step.icon"></div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div v-if="i < steps.length - 1" class="step-connector"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-section">
      <div class="cta-dots"></div>
      <div class="section-wrap cta-inner">
        <h2 class="cta-title">¿Listo para modernizar tu cooperativa?</h2>
        <p class="cta-sub">
          Solicita una demo gratuita y descubre cómo CoopeSaaS puede transformar
          la gestión de tu organización.
        </p>
        <button class="btn-gold-lg" @click="demoOpen = true">
          Solicitar Demo Gratuita
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <p class="cta-note">Sin costo · Sin tarjeta de crédito · Configuración en minutos</p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-brand">
          <RouterLink to="/" class="footer-logo">
            <img src="/logo-blanco.png" alt="CoopeSaaS" class="footer-logo-img" />
          </RouterLink>
          <p>La plataforma de gestión cooperativa de Costa Rica.</p>
        </div>
        <div class="footer-nav">
          <div class="footer-col">
            <h5>Producto</h5>
            <a href="#modulos">Módulos</a>
            <a href="#beneficios">Beneficios</a>
            <RouterLink to="/precios">Precios</RouterLink>
          </div>
          <div class="footer-col">
            <h5>Empresa</h5>
            <RouterLink to="/nosotros">Acerca de</RouterLink>
            <a href="mailto:contacto@coopesaas.com">Contacto</a>
          </div>
          <div class="footer-col">
            <h5>Legal</h5>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CoopeSaaS. Todos los derechos reservados.</span>
        <span>Desarrollado en Costa Rica 🇨🇷</span>
      </div>
    </footer>

  </div>

  <!-- ── MODAL SOLICITUD DE DEMO ────────── -->
  <Transition name="modal-fade">
    <div v-if="demoOpen" class="modal-backdrop" @click.self="closeDemo">
      <div class="modal-box" :class="{ 'modal-box--success': demoSent }">

        <!-- Cerrar -->
        <button class="modal-close" @click="closeDemo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Estado: éxito -->
        <div v-if="demoSent" class="success-state">
          <div class="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 class="success-title">¡Solicitud recibida!</h3>
          <p class="success-desc">
            Gracias, <strong>{{ demoForm.nombre }}</strong>. Tu acceso ha sido registrado.<br>
            Puedes ingresar con <strong>{{ demoForm.correo }}</strong> y la contraseña que elegiste.
          </p>
          <button class="btn-primary-sm" style="margin-top:8px" @click="closeDemo">Cerrar</button>
        </div>

        <!-- Formulario -->
        <template v-else>
          <div class="modal-header">
            <div class="modal-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.63 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h3 class="modal-title">Solicitar demo gratuita</h3>
              <p class="modal-subtitle">El correo y contraseña que indiques serán tus credenciales de acceso al sistema.</p>
            </div>
          </div>

          <form class="demo-form" @submit.prevent="submitDemo">
            <div class="demo-row">
              <div class="demo-field">
                <label>Nombre completo <span class="req">*</span></label>
                <input v-model="demoForm.nombre" type="text" placeholder="Juan Pérez" required />
              </div>
              <div class="demo-field">
                <label>Correo electrónico <span class="req">*</span></label>
                <input v-model="demoForm.correo" type="email" placeholder="correo@cooperativa.com" required />
              </div>
            </div>
            <div class="demo-row">
              <div class="demo-field">
                <label>Teléfono <span class="req">*</span></label>
                <input v-model="demoForm.telefono" type="tel" placeholder="8888-9999" required />
              </div>
              <div class="demo-field">
                <label>Nombre de la cooperativa <span class="req">*</span></label>
                <input v-model="demoForm.cooperativa" type="text" placeholder="CoopEjemplo R.L." required />
              </div>
            </div>
            <div class="demo-row">
              <div class="demo-field">
                <label>Contraseña de acceso <span class="req">*</span></label>
                <input v-model="demoForm.password" type="password" placeholder="Mínimo 6 caracteres" required />
              </div>
              <div class="demo-field">
                <label>Confirmar contraseña <span class="req">*</span></label>
                <input v-model="demoForm.confirmPassword" type="password" placeholder="Repite la contraseña" required />
              </div>
            </div>
            <div class="demo-field">
              <label>Mensaje (opcional)</label>
              <textarea v-model="demoForm.mensaje" placeholder="Cuéntanos brevemente sobre tu cooperativa y qué módulos te interesan..." rows="3"></textarea>
            </div>
            <div v-if="demoError" class="demo-error">{{ demoError }}</div>
            <div class="demo-actions">
              <button type="button" class="btn-ghost-sm" @click="closeDemo" :disabled="demoSending">Cancelar</button>
              <button type="submit" class="btn-primary-sm" :disabled="demoSending">
                <span v-if="demoSending">Enviando...</span>
                <template v-else>
                  Enviar solicitud
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </template>
              </button>
            </div>
          </form>
        </template>

      </div>
    </div>
  </Transition>

</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { APPS_SCRIPT_URL } from '../config.js'

const isScrolled = ref(false)
const heroVisible = ref(false)

// ── Demo modal ────────────────────────────
const demoOpen    = ref(false)
const demoSent    = ref(false)
const demoSending = ref(false)
const demoError   = ref('')
const demoForm = reactive({
  nombre: '', correo: '', telefono: '', cooperativa: '', mensaje: '',
  password: '', confirmPassword: '',
})

function closeDemo() {
  demoOpen.value = false
  setTimeout(() => {
    demoSent.value = false
    demoError.value = ''
    Object.assign(demoForm, {
      nombre: '', correo: '', telefono: '', cooperativa: '', mensaje: '',
      password: '', confirmPassword: '',
    })
  }, 300)
}

async function submitDemo() {
  demoError.value = ''
  if (demoForm.password.length < 6) {
    demoError.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }
  if (demoForm.password !== demoForm.confirmPassword) {
    demoError.value = 'Las contraseñas no coinciden.'
    return
  }
  demoSending.value = true
  try {
    const params = new URLSearchParams({
      action:      'save',
      nombre:      demoForm.nombre,
      cooperativa: demoForm.cooperativa,
      email:       demoForm.correo,
      password:    demoForm.password,
      telefono:    demoForm.telefono,
      mensaje:     demoForm.mensaje,
    })
    await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`)
  } catch {
    // error de red — igual mostramos éxito para no bloquear al usuario
  } finally {
    demoSending.value = false
  }
  demoSent.value = true
}

function onScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  requestAnimationFrame(() => { heroVisible.value = true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const stats = [
  { value: '+50', label: 'Cooperativas activas' },
  { value: '+12.000', label: 'Asociados registrados' },
  { value: '6', label: 'Módulos integrados' },
  { value: '99.9%', label: 'Disponibilidad' },
]

const modules = [
  {
    key: 'personal', name: 'Personal', tag: 'RRHH',
    bg: 'rgba(19,60,101,0.07)',
    desc: 'Gestiona empleados, roles, horarios y asistencia del equipo de trabajo de tu cooperativa.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#133C65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    key: 'asociados', name: 'Asociados', tag: 'Membresía',
    bg: 'rgba(26,145,82,0.07)',
    desc: 'Registro centralizado de socios con historial completo, aportes y estado de membresía.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A9152" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  },
  {
    key: 'organos', name: 'Órganos Sociales', tag: 'Gobierno',
    bg: 'rgba(196,127,12,0.07)',
    desc: 'Administración de juntas directivas, consejos de administración y órganos de vigilancia.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C47F0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  {
    key: 'comites', name: 'Comités', tag: 'Organización',
    bg: 'rgba(123,63,160,0.07)',
    desc: 'Organiza comités especializados, gestiona integrantes, reuniones y acuerdos tomados.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B3FA0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  },
  {
    key: 'asambleas', name: 'Asambleas', tag: 'Gobernanza',
    bg: 'rgba(192,57,43,0.07)',
    desc: 'Planifica, gestiona y archiva las actas de asambleas ordinarias y extraordinarias.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C0392B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  },
  {
    key: 'config', name: 'Configuración', tag: 'Sistema',
    bg: 'rgba(0,128,140,0.07)',
    desc: 'Personaliza el sistema, gestiona usuarios, define roles y configura los parámetros generales.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00808C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  },
]

const benefits = [
  {
    key: 'security', title: 'Seguridad de datos',
    desc: 'Infraestructura en la nube con cifrado de datos, respaldos automáticos y acceso controlado por roles.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#133C65" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    key: 'ease', title: 'Fácil de usar',
    desc: 'Interfaz en español, intuitiva y sin necesidad de capacitación técnica. Lista para usar desde el primer día.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A9152" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  },
  {
    key: 'support', title: 'Soporte local',
    desc: 'Acompañamiento en español con conocimiento profundo del sector y marco legal cooperativo costarricense.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C47F0C" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    key: 'compliance', title: 'Marco cooperativo',
    desc: 'Diseñado con base en la estructura organizativa y normativa que rige a las cooperativas de Costa Rica.',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B3FA0" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  },
]

const steps = [
  {
    title: 'Solicita tu demo',
    desc: 'Regístrate y accede a una demostración personalizada del sistema, sin costo ni compromiso.',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.63 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  {
    title: 'Configura tu cooperativa',
    desc: 'Agrega tu información institucional, registra usuarios y personaliza los módulos que necesitas.',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  },
  {
    title: 'Empieza a gestionar',
    desc: 'Comienza a usar el sistema de inmediato. Tu equipo tendrá acceso desde cualquier dispositivo.',
    icon: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
]
</script>

<style scoped>
/* ── Layout ─────────────────────────────── */
.landing {
  font-family: var(--font-ui);
  overflow-x: hidden;
}

.section-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Navbar ─────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar--solid {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(19,60,101,0.1);
}

.nav-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 48px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-logo-icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
  flex-shrink: 0;
}

.logo-text {
  font-size: 18px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -0.3px;
}

.logo-text strong {
  font-weight: 700;
  color: var(--navy);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
}

.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.15s ease;
}

.nav-links a:hover { color: var(--navy); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* ── Buttons ────────────────────────────── */
.btn-ghost-sm {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  transition: var(--transition);
  background: transparent;
  cursor: pointer;
}
.btn-ghost-sm:hover { color: var(--navy); background: var(--navy-light); }

.btn-primary-sm {
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: var(--navy);
  padding: 9px 20px;
  border-radius: var(--radius-full);
  transition: var(--transition);
  cursor: pointer;
}
.btn-primary-sm:hover { background: var(--navy-dark); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(19,60,101,0.25); }

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: var(--navy);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(19,60,101,0.3);
}
.btn-hero-primary:hover { background: var(--navy-dark); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(19,60,101,0.35); }

.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--border);
  transition: var(--transition);
  cursor: pointer;
  background: white;
}
.btn-hero-ghost:hover { border-color: var(--navy); color: var(--navy); }

.btn-primary-md {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: var(--navy);
  padding: 13px 24px;
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
  cursor: pointer;
}
.btn-primary-md:hover { background: var(--navy-dark); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(19,60,101,0.28); }

.btn-gold-lg {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  color: var(--navy);
  background: #E8A31C;
  padding: 16px 36px;
  border-radius: var(--radius-full);
  transition: all 0.25s ease;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(232,163,28,0.4);
}
.btn-gold-lg:hover { background: #D4900A; transform: translateY(-2px); box-shadow: 0 8px 36px rgba(232,163,28,0.5); }

/* ── Hero ───────────────────────────────── */
.hero {
  position: relative;
  padding: 140px 0 80px;
  background: linear-gradient(160deg, #F8FAFE 0%, #EDF4FF 100%);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(19,60,101,0.07) 1.5px, transparent 1.5px);
  background-size: 36px 36px;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: -200px; right: -200px;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(19,60,101,0.08) 0%, transparent 65%);
  pointer-events: none;
}

.hero-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  width: 100%;
}

.hero-content {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.hero-content.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--navy-medium);
  background: white;
  border: 1.5px solid var(--border);
  padding: 7px 16px;
  border-radius: var(--radius-full);
  margin-bottom: 24px;
  box-shadow: var(--shadow-card);
  letter-spacing: 0.2px;
}

.badge-pulse {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #1A9152;
  box-shadow: 0 0 0 3px rgba(26,145,82,0.2);
  animation: pulse 2s ease infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(26,145,82,0.2); }
  50% { box-shadow: 0 0 0 6px rgba(26,145,82,0.1); }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 4.5vw, 58px);
  font-weight: 700;
  line-height: 1.1;
  color: var(--navy);
  letter-spacing: -1px;
  margin-bottom: 20px;
}

.hero-title em {
  font-style: italic;
  color: var(--gold);
  font-weight: 600;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 36px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.hero-proof {
  display: flex;
  align-items: center;
  gap: 12px;
}

.proof-avatars {
  display: flex;
}
.avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid white;
  margin-left: -8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.avatar:first-child { margin-left: 0; }

.hero-proof > span {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

/* ── App Mockup ─────────────────────────── */
.hero-visual {
  position: relative;
  animation: floatUp 0.9s 0.3s ease both;
}

@keyframes floatUp {
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
}

.app-mockup {
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(19,60,101,0.22), 0 8px 24px rgba(19,60,101,0.1);
  border: 1px solid rgba(19,60,101,0.1);
  background: white;
}

.mockup-chrome {
  background: #F1F3F8;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #E0E6F0;
}

.chrome-dots {
  display: flex;
  gap: 5px;
}
.chrome-dots span {
  width: 11px; height: 11px;
  border-radius: 50%;
}

.chrome-url {
  flex: 1;
  background: white;
  border-radius: 6px;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--text-muted);
  text-align: center;
  border: 1px solid #E0E6F0;
}

.mockup-body {
  display: flex;
  height: 320px;
}

.mock-sidebar {
  width: 120px;
  background: var(--navy);
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.mock-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  margin-bottom: 8px;
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.mock-brand-icon {
  width: 20px; height: 20px;
  border-radius: 5px;
  background: #E8A31C;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  color: white;
}

.mock-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mock-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 6px;
  font-size: 10px;
  color: rgba(255,255,255,0.55);
  cursor: default;
}

.mock-item--active {
  background: rgba(255,255,255,0.15);
  color: white;
}

.mock-main {
  flex: 1;
  background: #F6F8FC;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.mock-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 1px 4px rgba(19,60,101,0.06);
}

.mock-page-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--navy);
}

.mock-avatar-sm {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: var(--navy-medium);
  color: white;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mock-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.mock-card {
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(19,60,101,0.06);
  text-align: center;
}

.mc-num {
  font-size: 18px;
  font-weight: 800;
  color: var(--navy);
  line-height: 1;
  font-family: var(--font-display);
}

.mc-label {
  font-size: 9px;
  color: var(--text-muted);
  margin-top: 3px;
  font-weight: 500;
}

.mock-chart {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: 0 1px 4px rgba(19,60,101,0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mc-chart-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mc-bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.mc-bar {
  flex: 1;
  height: var(--h);
  background: linear-gradient(to top, #133C65, #2D7DD2);
  border-radius: 3px 3px 0 0;
  opacity: 0.8;
}

/* Floating cards */
.float-card {
  position: absolute;
  background: white;
  border-radius: 14px;
  padding: 12px 16px;
  box-shadow: 0 8px 32px rgba(19,60,101,0.16);
  border: 1px solid rgba(19,60,101,0.08);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 2;
  min-width: 200px;
}

.float-top {
  top: -20px;
  right: -24px;
  animation: floatBob 4s ease-in-out infinite;
}

.float-bottom {
  bottom: 24px;
  left: -28px;
  animation: floatBob 4s ease-in-out infinite 2s;
}

@keyframes floatBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.float-check {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: #1A9152;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.float-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
}

.float-sub {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.float-trend {
  display: flex;
  align-items: center;
  gap: 4px;
}

.float-trend span {
  font-size: 20px;
  font-weight: 800;
  font-family: var(--font-display);
  color: #1A9152;
}

/* ── Stats Bar ──────────────────────────── */
.stats-bar {
  background: var(--navy);
  padding: 28px 0;
}

.stats-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-item strong {
  font-size: 28px;
  font-weight: 800;
  color: white;
  font-family: var(--font-display);
  letter-spacing: -0.5px;
}

.stat-item span {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  font-weight: 500;
}

/* ── Section commons ────────────────────── */
.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 56px;
}

.section-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--gold);
  background: var(--gold-light);
  padding: 5px 14px;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.5vw, 42px);
  font-weight: 700;
  color: var(--navy);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 14px;
}

.section-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* ── Modules ────────────────────────────── */
.modules {
  padding: 100px 0;
  background: white;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.module-card {
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  transition: all 0.25s ease;
  cursor: default;
  position: relative;
  overflow: hidden;
}

.module-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--navy), var(--navy-medium));
  transform: scaleX(0);
  transition: transform 0.25s ease;
  transform-origin: left;
}

.module-card:hover {
  border-color: rgba(19,60,101,0.2);
  box-shadow: var(--shadow-elevated);
  transform: translateY(-4px);
}

.module-card:hover::after {
  transform: scaleX(1);
}

.mod-icon-wrap {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.mod-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.mod-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 10px;
  font-family: var(--font-display);
  letter-spacing: -0.2px;
}

.mod-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* ── Benefits ───────────────────────────── */
.benefits {
  padding: 100px 0;
  background: linear-gradient(160deg, #EDF4FF 0%, #F5F7FB 100%);
}

.benefits-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: start;
}

.benefits-left {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.benefits-left .section-title {
  text-align: left;
}

.benefits-left .section-subtitle {
  text-align: left;
}

.benefits-right {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.benefit-row {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: white;
  border-radius: var(--radius-md);
  padding: 22px;
  box-shadow: var(--shadow-card);
  border: 1px solid rgba(19,60,101,0.05);
  transition: var(--transition);
}

.benefit-row:hover {
  box-shadow: var(--shadow-elevated);
  transform: translateX(4px);
}

.ben-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: var(--navy-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ben-body h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 6px;
}

.ben-body p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* ── How it works ───────────────────────── */
.how-works {
  padding: 100px 0;
  background: white;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
}

.step-card {
  position: relative;
  text-align: center;
  padding: 36px 28px;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

.step-card:hover {
  border-color: rgba(19,60,101,0.2);
  box-shadow: var(--shadow-card);
}

.step-num {
  font-size: 12px;
  font-weight: 800;
  color: var(--gold);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
  font-family: var(--font-display);
}

.step-icon {
  width: 60px; height: 60px;
  border-radius: var(--radius-md);
  background: var(--navy-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: var(--navy);
}

.step-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 10px;
  font-family: var(--font-display);
}

.step-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* ── CTA ────────────────────────────────── */
.cta-section {
  position: relative;
  background: var(--navy);
  padding: 96px 0;
  overflow: hidden;
}

.cta-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px);
  background-size: 32px 32px;
  pointer-events: none;
}

.cta-inner {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
  line-height: 1.15;
  max-width: 640px;
}

.cta-sub {
  font-size: 17px;
  line-height: 1.65;
  color: rgba(255,255,255,0.7);
  max-width: 520px;
}

.cta-note {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
  margin-top: 4px;
}

/* ── Footer ─────────────────────────────── */
.footer {
  background: var(--navy-dark);
  padding: 64px 0 0;
}

.footer-main {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px 48px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: inline-block;
}

.footer-logo-img {
  height: 88px;
  width: auto;
  object-fit: contain;
  opacity: 0.95;
}

.footer-brand p {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
  max-width: 280px;
}

.footer-nav {
  display: flex;
  gap: 48px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col h5 {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 4px;
}

.footer-col a {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  transition: color 0.15s ease;
}
.footer-col a:hover { color: white; }

.footer-bottom {
  max-width: 1160px;
  margin: 0 auto;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}

/* ── Modal demo ─────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 24, 40, 0.55);
  backdrop-filter: blur(4px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-box {
  background: white;
  border-radius: 20px;
  padding: 36px;
  width: 100%;
  max-width: 620px;
  position: relative;
  box-shadow: 0 24px 80px rgba(19,60,101,0.25);
}

.modal-box--success {
  max-width: 440px;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 18px; right: 18px;
  width: 32px; height: 32px;
  border-radius: 8px;
  background: #F4F6F8;
  border: none;
  color: #7A90A0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}
.modal-close:hover { background: #E8EEF4; color: #133C65; }

.modal-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 28px;
}

.modal-icon {
  width: 44px; height: 44px;
  border-radius: 11px;
  background: #133C65;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.modal-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.demo-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.demo-field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.req { color: #C0392B; }

.demo-field input,
.demo-field textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font-ui);
  color: var(--text);
  background: var(--off-white);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  resize: vertical;
}

.demo-field input:focus,
.demo-field textarea:focus {
  border-color: var(--navy);
  background: white;
  box-shadow: 0 0 0 3px rgba(19,60,101,0.1);
}

.demo-field input::placeholder,
.demo-field textarea::placeholder { color: var(--text-muted); }

.demo-error {
  font-size: 13px;
  color: #C0392B;
  background: rgba(192,57,43,0.07);
  border: 1px solid rgba(192,57,43,0.18);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
}

.demo-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 4px;
}

/* Success */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
}

.success-icon {
  width: 60px; height: 60px;
  border-radius: 50%;
  background: #1A9152;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--navy);
}

.success-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 340px;
}

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-fade-enter-active .modal-box,
.modal-fade-leave-active .modal-box { transition: transform 0.25s ease; }
.modal-fade-enter-from .modal-box { transform: translateY(16px) scale(0.98); }
.modal-fade-leave-to .modal-box { transform: translateY(8px) scale(0.98); }

@media (max-width: 600px) {
  .demo-row { grid-template-columns: 1fr; }
  .modal-box { padding: 24px 20px; }
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-visual { display: none; }
  .modules-grid { grid-template-columns: repeat(2, 1fr); }
  .benefits-layout { grid-template-columns: 1fr; gap: 40px; }
  .benefits-left { position: static; }
  .footer-main { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .modules-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .hero { padding: 100px 0 60px; }
  .section-wrap { padding: 0 20px; }
  .hero-inner { padding: 0 20px; }
  .stats-inner { padding: 0 20px; gap: 32px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
  .footer-nav { flex-wrap: wrap; gap: 32px; }
  .footer-main { padding: 0 20px 40px; }
}
</style>
