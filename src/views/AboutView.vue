<template>
  <div class="public-page">

    <!-- NAVBAR -->
    <nav class="navbar" :class="{ 'navbar--solid': isScrolled }">
      <div class="nav-inner">
        <RouterLink to="/" class="nav-logo">
          <img src="/icono.png" alt="CoopeSaaS" class="nav-logo-icon" />
          <span class="logo-text"><strong>Coope</strong>SaaS</span>
        </RouterLink>
        <div class="nav-links">
          <RouterLink to="/#modulos">Módulos</RouterLink>
          <RouterLink to="/#beneficios">Beneficios</RouterLink>
          <RouterLink to="/precios">Precios</RouterLink>
          <RouterLink to="/nosotros">Nosotros</RouterLink>
        </div>
        <div class="nav-actions">
          <RouterLink to="/login" class="btn-ghost-sm">Iniciar sesión</RouterLink>
          <RouterLink to="/" class="btn-primary-sm">Solicitar Demo</RouterLink>
        </div>
        <button class="nav-menu-btn" @click="menuOpen = !menuOpen">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      <div class="mobile-menu" :class="{ 'mobile-menu--open': menuOpen }">
        <RouterLink to="/#modulos" @click="menuOpen = false">Módulos</RouterLink>
        <RouterLink to="/#beneficios" @click="menuOpen = false">Beneficios</RouterLink>
        <RouterLink to="/precios" @click="menuOpen = false">Precios</RouterLink>
        <RouterLink to="/nosotros" @click="menuOpen = false">Nosotros</RouterLink>
        <RouterLink to="/login" @click="menuOpen = false">Iniciar sesión</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="page-hero">
      <div class="hero-dots"></div>
      <div class="section-wrap">
        <div class="section-tag">Sobre nosotros</div>
        <h1 class="page-hero-title">Construimos el futuro digital<br>del sector cooperativo</h1>
        <p class="page-hero-sub">
          Somos un equipo de desarrolladores costarricenses apasionados por
          resolver los desafíos reales que enfrentan las cooperativas del país.
        </p>
      </div>
    </section>

    <!-- HISTORIA -->
    <section class="story-section">
      <div class="section-wrap">
        <div class="story-layout">
          <div class="story-content">
            <div class="section-tag">Nuestra historia</div>
            <h2 class="section-title">Nacimos de una necesidad real</h2>
            <p>
              CoopeSaaS surgió al observar de cerca la operación diaria de cooperativas
              costarricenses: juntas directivas administrando listas de asociados en hojas de
              Excel, actas escritas a mano, y procesos de votación sin trazabilidad.
            </p>
            <p>
              Con experiencia en desarrollo de software y un profundo respeto por el modelo
              cooperativo, decidimos construir la solución que estas organizaciones necesitaban:
              una plataforma hecha en Costa Rica, para Costa Rica, que entiende la normativa
              local y habla el mismo idioma.
            </p>
            <p>
              Hoy estamos en etapa de lanzamiento, trabajando junto a cooperativas piloto
              para afinar cada detalle antes de abrir la plataforma a todo el sector.
            </p>
          </div>
          <div class="story-stats">
            <div class="story-stat">
              <span class="stat-big">3</span>
              <span class="stat-label">Desarrolladores<br>fundadores</span>
            </div>
            <div class="story-stat">
              <span class="stat-big">CR</span>
              <span class="stat-label">100% costarricense</span>
            </div>
            <div class="story-stat">
              <span class="stat-big">6</span>
              <span class="stat-label">Módulos<br>integrados</span>
            </div>
            <div class="story-stat">
              <span class="stat-big">2026</span>
              <span class="stat-label">Año de<br>lanzamiento</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISIÓN / VISIÓN -->
    <section class="mission-section">
      <div class="section-wrap">
        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>
            </div>
            <h3>Misión</h3>
            <p>Digitalizar y simplificar la gestión administrativa de las cooperativas costarricenses, permitiéndoles enfocarse en lo que más importa: el bienestar de sus asociados.</p>
          </div>
          <div class="mission-card mission-card--gold">
            <div class="mission-icon mission-icon--gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>Visión</h3>
            <p>Ser la plataforma de referencia para la gestión cooperativa en Costa Rica y expandirnos a toda Centroamérica, democratizando el acceso a tecnología moderna para el sector social y solidario.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon mission-icon--green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Compromiso</h3>
            <p>Construimos con transparencia, precios justos y soporte cercano. Entendemos que las cooperativas son el tejido social del país, y nuestra tecnología debe respetarlo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EQUIPO -->
    <section class="team-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">El equipo</div>
          <h2 class="section-title">Las personas detrás de CoopeSaaS</h2>
          <p class="section-subtitle">Tres desarrolladores con experiencia en tecnología, unidos por el objetivo de transformar el sector cooperativo.</p>
        </div>
        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card">
            <div class="team-avatar" :style="{ background: member.color }">
              {{ member.initials }}
            </div>
            <h3 class="team-name">{{ member.name }}</h3>
            <div class="team-role">{{ member.role }}</div>
            <p class="team-bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VALORES -->
    <section class="values-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">Valores</div>
          <h2 class="section-title">Lo que nos guía</h2>
        </div>
        <div class="values-grid">
          <div v-for="val in values" :key="val.title" class="value-card">
            <div class="value-icon" v-html="val.icon"></div>
            <h4 class="value-title">{{ val.title }}</h4>
            <p class="value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA CONTACTO -->
    <section class="cta-section">
      <div class="cta-dots"></div>
      <div class="section-wrap cta-inner">
        <h2 class="cta-title">¿Tienes preguntas o quieres conocernos?</h2>
        <p class="cta-sub">Escríbenos directamente. Somos un equipo pequeño y respondemos rápido.</p>
        <a href="mailto:contacto@coopesaas.com" class="btn-gold-lg">
          Escribirnos por correo
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
        <p class="cta-note">contacto@coopesaas.com · Respondemos en menos de 24 horas</p>
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
            <RouterLink to="/#modulos">Módulos</RouterLink>
            <RouterLink to="/#beneficios">Beneficios</RouterLink>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen   = ref(false)

function onScroll() { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const team = [
  {
    name: 'Jeudy Paniagua',
    initials: 'JP',
    color: '#133C65',
    role: 'Co-fundador · Desarrollo Full Stack',
    bio: 'Desarrollador con experiencia en sistemas de gestión institucional. Lidera la arquitectura del producto y el desarrollo de los módulos principales.',
  },
  {
    name: 'Socio Fundador',
    initials: 'SF',
    color: '#1A9152',
    role: 'Co-fundador · Backend & Infraestructura',
    bio: 'Especialista en bases de datos y servicios en la nube. Garantiza la seguridad, disponibilidad y escalabilidad de la plataforma.',
  },
  {
    name: 'Socio Fundador',
    initials: 'SF',
    color: '#C47F0C',
    role: 'Co-fundador · Frontend & UX',
    bio: 'Diseñador y desarrollador frontend enfocado en la experiencia de usuario. Asegura que la plataforma sea intuitiva para cualquier perfil de usuario.',
  },
]

const values = [
  {
    title: 'Conocimiento local',
    desc: 'Entendemos la normativa cooperativa costarricense, la cultura organizacional y los procesos reales del sector.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#133C65" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    title: 'Transparencia',
    desc: 'Precios claros, sin letras pequeñas. Sabés exactamente qué incluye tu plan y cuánto pagarás cada mes.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A9152" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  },
  {
    title: 'Soporte cercano',
    desc: 'No somos un call center. Cuando necesitás ayuda, hablás con el equipo que construyó el sistema.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C47F0C" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    title: 'Mejora continua',
    desc: 'Escuchamos a nuestros clientes y evolucionamos el producto con sus necesidades reales, no con suposiciones.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B3FA0" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  },
]
</script>

<style scoped>
.public-page { font-family: var(--font-ui); overflow-x: hidden; }
.section-wrap { max-width: 1160px; margin: 0 auto; padding: 0 32px; }

/* ── Navbar ─── */
.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: background 0.3s, box-shadow 0.3s; }
.navbar--solid { background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); box-shadow: 0 1px 0 rgba(19,60,101,0.1); }
.nav-inner { max-width: 1160px; margin: 0 auto; padding: 0 32px; height: 72px; display: flex; align-items: center; gap: 48px; }
.nav-logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.nav-logo-icon { width: 34px; height: 34px; object-fit: contain; }
.logo-text { font-size: 18px; font-weight: 400; color: var(--text); letter-spacing: -0.3px; }
.logo-text strong { font-weight: 700; color: var(--navy); }
.nav-links { display: flex; align-items: center; gap: 32px; flex: 1; }
.nav-links a { font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: color 0.15s; }
.nav-links a:hover, .nav-links a.router-link-active { color: var(--navy); }
.nav-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.nav-menu-btn { display: none; background: none; border: none; cursor: pointer; color: var(--text); padding: 6px; }
.btn-ghost-sm { font-size: 14px; font-weight: 500; color: var(--text-secondary); padding: 8px 16px; border-radius: var(--radius-full); transition: var(--transition); background: transparent; cursor: pointer; }
.btn-ghost-sm:hover { color: var(--navy); background: var(--navy-light); }
.btn-primary-sm { font-size: 14px; font-weight: 600; color: white; background: var(--navy); padding: 9px 20px; border-radius: var(--radius-full); transition: var(--transition); cursor: pointer; }
.btn-primary-sm:hover { background: var(--navy-dark); transform: translateY(-1px); }
.mobile-menu { display: none; flex-direction: column; background: white; border-top: 1px solid var(--border); padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s; }
.mobile-menu--open { max-height: 400px; padding: 8px 0 16px; }
.mobile-menu a { padding: 12px 32px; font-size: 15px; font-weight: 500; color: var(--text-secondary); display: block; transition: color 0.15s, background 0.15s; }
.mobile-menu a:hover { color: var(--navy); background: var(--navy-light); }

/* ── Page Hero ─── */
.page-hero { position: relative; padding: 140px 0 80px; background: linear-gradient(160deg, #F8FAFE 0%, #EDF4FF 100%); text-align: center; overflow: hidden; }
.hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(19,60,101,0.07) 1.5px, transparent 1.5px); background-size: 36px 36px; pointer-events: none; }
.section-tag { display: inline-block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--gold); background: var(--gold-light); padding: 5px 14px; border-radius: var(--radius-full); margin-bottom: 16px; }
.page-hero-title { font-family: var(--font-display); font-size: clamp(30px, 4vw, 50px); font-weight: 700; color: var(--navy); letter-spacing: -0.8px; line-height: 1.2; margin-bottom: 16px; }
.page-hero-sub { font-size: 17px; line-height: 1.7; color: var(--text-secondary); max-width: 540px; margin: 0 auto; }

/* ── Story ─── */
.story-section { padding: 96px 0; background: white; }
.story-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.story-content { display: flex; flex-direction: column; gap: 16px; }
.section-title { font-family: var(--font-display); font-size: clamp(26px, 3vw, 38px); font-weight: 700; color: var(--navy); letter-spacing: -0.4px; line-height: 1.2; margin-bottom: 8px; }
.story-content p { font-size: 15px; color: var(--text-secondary); line-height: 1.75; }
.story-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.story-stat { background: #F7F9FC; border: 1px solid var(--border); border-radius: 14px; padding: 24px 20px; text-align: center; }
.stat-big { display: block; font-size: 42px; font-weight: 800; color: var(--navy); font-family: var(--font-display); line-height: 1; margin-bottom: 8px; }
.stat-label { font-size: 13px; color: var(--text-secondary); line-height: 1.4; }

/* ── Mission ─── */
.mission-section { padding: 80px 0; background: #F8FAFE; }
.mission-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.mission-card { background: white; border-radius: 16px; padding: 32px 28px; border: 1.5px solid var(--border); }
.mission-card--gold { border-color: rgba(196,127,12,0.3); background: linear-gradient(135deg, #FFFBF0 0%, white 100%); }
.mission-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--navy); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.mission-icon--gold { background: #C47F0C; }
.mission-icon--green { background: #1A9152; }
.mission-card h3 { font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 12px; font-family: var(--font-display); }
.mission-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

/* ── Team ─── */
.team-section { padding: 96px 0; background: white; }
.section-header { text-align: center; max-width: 640px; margin: 0 auto 56px; }
.section-subtitle { font-size: 16px; color: var(--text-secondary); line-height: 1.7; }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.team-card { text-align: center; padding: 36px 24px; border: 1.5px solid var(--border); border-radius: 16px; transition: all 0.25s; }
.team-card:hover { box-shadow: 0 8px 32px rgba(19,60,101,0.1); transform: translateY(-4px); }
.team-avatar { width: 80px; height: 80px; border-radius: 50%; color: white; font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-family: var(--font-display); letter-spacing: -0.5px; }
.team-name { font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.team-role { font-size: 13px; color: var(--gold); font-weight: 600; margin-bottom: 14px; }
.team-bio { font-size: 14px; color: var(--text-secondary); line-height: 1.65; }

/* ── Values ─── */
.values-section { padding: 80px 0; background: linear-gradient(160deg, #EDF4FF 0%, #F5F7FB 100%); }
.values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.value-card { background: white; border-radius: 14px; padding: 28px 24px; border: 1px solid rgba(19,60,101,0.06); transition: all 0.25s; }
.value-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(19,60,101,0.1); }
.value-icon { width: 44px; height: 44px; border-radius: 11px; background: #F0F4FB; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.value-title { font-size: 16px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.value-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.65; }

/* ── CTA ─── */
.cta-section { position: relative; background: var(--navy); padding: 96px 0; overflow: hidden; }
.cta-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px); background-size: 32px 32px; pointer-events: none; }
.cta-inner { position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.cta-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 42px); font-weight: 700; color: white; letter-spacing: -0.5px; line-height: 1.2; max-width: 600px; }
.cta-sub { font-size: 16px; line-height: 1.65; color: rgba(255,255,255,0.7); max-width: 460px; }
.cta-note { font-size: 13px; color: rgba(255,255,255,0.45); font-weight: 500; }
.btn-gold-lg { display: inline-flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 700; color: var(--navy); background: #E8A31C; padding: 16px 36px; border-radius: var(--radius-full); transition: all 0.25s; cursor: pointer; box-shadow: 0 4px 24px rgba(232,163,28,0.4); }
.btn-gold-lg:hover { background: #D4900A; transform: translateY(-2px); box-shadow: 0 8px 36px rgba(232,163,28,0.5); }

/* ── Footer ─── */
.footer { background: var(--navy-dark); padding: 64px 0 0; }
.footer-main { max-width: 1160px; margin: 0 auto; padding: 0 32px 48px; display: grid; grid-template-columns: 1.5fr 1fr; gap: 80px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-brand { display: flex; flex-direction: column; gap: 16px; }
.footer-logo { display: inline-block; }
.footer-logo-img { height: 88px; width: auto; object-fit: contain; opacity: 0.95; }
.footer-brand p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 280px; }
.footer-nav { display: flex; gap: 48px; }
.footer-col { display: flex; flex-direction: column; gap: 12px; }
.footer-col h5 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
.footer-col a { font-size: 14px; color: rgba(255,255,255,0.6); transition: color 0.15s; }
.footer-col a:hover { color: white; }
.footer-bottom { max-width: 1160px; margin: 0 auto; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: rgba(255,255,255,0.35); }

/* ── Responsive ─── */
@media (max-width: 1024px) {
  .story-layout { grid-template-columns: 1fr; gap: 48px; }
  .mission-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; }
  .team-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-main { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .nav-menu-btn { display: flex; margin-left: auto; }
  .mobile-menu { display: flex; }
  .section-wrap { padding: 0 20px; }
  .page-hero { padding: 110px 0 60px; }
  .story-section { padding: 64px 0; }
  .story-stats { grid-template-columns: repeat(2, 1fr); }
  .mission-section { padding: 64px 0; }
  .team-section { padding: 64px 0; }
  .values-section { padding: 64px 0; }
  .values-grid { grid-template-columns: 1fr; }
  .footer-main { padding: 0 20px 40px; }
  .footer-nav { flex-wrap: wrap; gap: 32px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; padding: 16px 20px; }
}
@media (max-width: 480px) {
  .story-stats { grid-template-columns: 1fr 1fr; }
  .stat-big { font-size: 32px; }
}
</style>
