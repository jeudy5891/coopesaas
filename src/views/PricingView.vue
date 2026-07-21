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
          <RouterLink to="/precios">Planes</RouterLink>
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
      <!-- Mobile menu -->
      <div class="mobile-menu" :class="{ 'mobile-menu--open': menuOpen }">
        <RouterLink to="/#modulos" @click="menuOpen = false">Módulos</RouterLink>
        <RouterLink to="/#beneficios" @click="menuOpen = false">Beneficios</RouterLink>
        <RouterLink to="/precios" @click="menuOpen = false">Planes</RouterLink>
        <RouterLink to="/nosotros" @click="menuOpen = false">Nosotros</RouterLink>
        <RouterLink to="/login" @click="menuOpen = false">Iniciar sesión</RouterLink>
      </div>
    </nav>

    <!-- HERO -->
    <section class="page-hero">
      <div class="hero-dots"></div>
      <div class="section-wrap">
        <div class="section-tag">Planes</div>
        <h1 class="page-hero-title">Elige el plan ideal para tu cooperativa</h1>
        <p class="page-hero-sub">
          Módulos diseñados para la gestión cooperativa. Sin contratos de largo plazo,
          sin cargos ocultos. 30 días de prueba gratuita.
        </p>
      </div>
    </section>

    <!-- PLANES -->
    <section class="plans-section">
      <div class="section-wrap">

        <!-- Sticker promo + toggle moneda -->
        <div class="plans-promo-row">
          <div class="currency-toggle">
            <button
              class="currency-btn"
              :class="{ 'currency-btn--active': currency === 'USD' }"
              @click="currency = 'USD'"
            >USD $</button>
            <button
              class="currency-btn"
              :class="{ 'currency-btn--active': currency === 'CRC' }"
              @click="currency = 'CRC'"
            >CRC ₡</button>
          </div>
          <div class="promo-sticker">
            <span class="promo-pct">-20%</span>
            <span class="promo-sub">mes de julio</span>
          </div>
        </div>

        <div class="plans-grid">

          <!-- Básico -->
          <div class="plan-card">
            <div class="plan-header">
              <div class="plan-name">Básico</div>
              <div class="plan-desc">Ideal para cooperativas pequeñas que inician su digitalización.</div>
            </div>
            <div class="plan-price-block">
              <div class="plan-price-original">$1,077<span class="plan-price-period-sm">/mes</span></div>
              <div class="plan-price-row">
                <span class="plan-price-usd plan-price-usd--green">{{ fmt('basico') }}</span>
                <span class="plan-price-period">/mes</span>
              </div>
              <div class="plan-price-note">Con 20% de descuento — primer año</div>
            </div>
            <RouterLink to="/" class="plan-cta plan-cta--outline">Solicitar demo gratuita</RouterLink>
            <div class="plan-features-label">Módulos incluidos:</div>
            <ul class="plan-features">
              <li>Dashboard / Inicio</li>
              <li>Configuración</li>
              <li>Personal</li>
              <li>Órganos Sociales</li>
              <li>Asociados</li>
              <li>Asambleas</li>
              <li>Migración de datos incluida</li>
              <li>Capacitación incluida</li>
              <li>Soporte por correo</li>
            </ul>
          </div>

          <!-- Pro -->
          <div class="plan-card plan-card--featured">
            <div class="plan-featured-badge">Más popular</div>
            <div class="plan-header">
              <div class="plan-name">Pro</div>
              <div class="plan-desc">Para cooperativas en crecimiento con gobernanza democrática avanzada.</div>
            </div>
            <div class="plan-price-block">
              <div class="plan-price-original">$1,824<span class="plan-price-period-sm">/mes</span></div>
              <div class="plan-price-row">
                <span class="plan-price-usd plan-price-usd--green">{{ fmt('pro') }}</span>
                <span class="plan-price-period">/mes</span>
              </div>
              <div class="plan-price-note">Con 20% de descuento — primer año</div>
            </div>
            <RouterLink to="/" class="plan-cta plan-cta--primary">Solicitar demo gratuita</RouterLink>
            <div class="plan-features-label">Todo lo del plan Básico, más:</div>
            <ul class="plan-features">
              <li>Comités</li>
              <li>Votaciones electrónicas</li>
              <li>Reportes Gerenciales</li>
              <li>Exportar a Excel / PDF</li>
              <li>Soporte prioritario</li>
            </ul>
          </div>

          <!-- Empresarial -->
          <div class="plan-card">
            <div class="plan-header">
              <div class="plan-name">Empresarial</div>
              <div class="plan-desc">Para cooperativas consolidadas con gestión financiera y de riesgos completa.</div>
            </div>
            <div class="plan-price-block">
              <div class="plan-price-original">$3,238<span class="plan-price-period-sm">/mes</span></div>
              <div class="plan-price-row">
                <span class="plan-price-usd plan-price-usd--green">{{ fmt('empresarial') }}</span>
                <span class="plan-price-period">/mes</span>
              </div>
              <div class="plan-price-note">Con 20% de descuento — primer año</div>
            </div>
            <RouterLink to="/" class="plan-cta plan-cta--outline">Solicitar demo gratuita</RouterLink>
            <div class="plan-features-label">Todo lo del plan Pro, más:</div>
            <ul class="plan-features">
              <li>Finanzas</li>
              <li>Créditos</li>
              <li>Riesgos</li>
              <li>Soporte dedicado</li>
            </ul>
          </div>

        </div>


      </div>
    </section>

    <!-- COMPARACIÓN -->
    <section class="compare-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">Comparar</div>
          <h2 class="section-title">¿Qué incluye cada plan?</h2>
        </div>
        <div class="compare-wrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th class="feat-col">Módulo / Funcionalidad</th>
                <th>Básico</th>
                <th class="featured-col">Pro</th>
                <th>Empresarial</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in compareRows" :key="row.feature">
                <td class="feat-col">{{ row.feature }}</td>
                <td><span v-html="renderCell(row.basico)"></span></td>
                <td class="featured-col"><span v-html="renderCell(row.pro)"></span></td>
                <td><span v-html="renderCell(row.empresas)"></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="section-tag">FAQ</div>
          <h2 class="section-title">Preguntas frecuentes</h2>
        </div>
        <div class="faq-list">
          <div v-for="(item, i) in faqs" :key="i" class="faq-item" :class="{ open: openFaq === i }">
            <button class="faq-question" @click="openFaq = openFaq === i ? null : i">
              {{ item.q }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="faq-icon"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-answer">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-dots"></div>
      <div class="section-wrap cta-inner">
        <h2 class="cta-title">Empieza gratis hoy mismo</h2>
        <p class="cta-sub">30 días sin costo, sin tarjeta de crédito. Tu cooperativa lista en minutos.</p>
        <RouterLink to="/" class="btn-gold-lg">
          Solicitar Demo Gratuita
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </RouterLink>
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
            <RouterLink to="/#modulos">Módulos</RouterLink>
            <RouterLink to="/#beneficios">Beneficios</RouterLink>
            <RouterLink to="/precios">Planes</RouterLink>
          </div>
          <div class="footer-col">
            <h5>Empresa</h5>
            <RouterLink to="/nosotros">Acerca de</RouterLink>
            <a href="mailto:jeupma@gmail.com">Contacto</a>
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
const openFaq    = ref(null)
const currency   = ref('USD')

const RATE = 455

const prices = {
  basico:      { usd: 862,   crc: Math.round(862   * RATE) },
  pro:         { usd: 1459,  crc: Math.round(1459  * RATE) },
  empresarial: { usd: 2590,  crc: Math.round(2590  * RATE) },
}

function fmt(plan) {
  if (currency.value === 'USD') return `$${prices[plan].usd.toLocaleString('en-US')}`
  return `₡${prices[plan].crc.toLocaleString('es-CR')}`
}

function onScroll() { isScrolled.value = window.scrollY > 50 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const checkSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A9152" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
const xSvg     = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`

function renderCell(val) {
  if (val === true) return checkSvg
  if (val === false) return xSvg
  return `<span style="font-size:13px;color:#374151;font-weight:500">${val}</span>`
}

const compareRows = [
  { feature: 'Personal',              basico: true,  pro: true,             empresas: true },
  { feature: 'Asociados',             basico: true,  pro: true,             empresas: true },
  { feature: 'Órganos Sociales',      basico: true,  pro: true,             empresas: true },
  { feature: 'Asambleas',             basico: true,  pro: true,             empresas: true },
  { feature: 'Comités',               basico: false, pro: true,             empresas: true },
  { feature: 'Votaciones',            basico: false, pro: true,             empresas: true },
  { feature: 'Reportes Gerenciales',  basico: false, pro: true,             empresas: true },
  { feature: 'Finanzas',              basico: false, pro: false,            empresas: true },
  { feature: 'Créditos',              basico: false, pro: false,            empresas: true },
  { feature: 'Riesgos',               basico: false, pro: false,            empresas: true },
  { feature: 'Exportar Excel / PDF',  basico: false, pro: true,             empresas: true },
  { feature: 'Capacitación incluida', basico: true,  pro: true,             empresas: true },
  { feature: 'Migración de datos',    basico: true,  pro: true,             empresas: true },
  { feature: 'Soporte',               basico: 'Correo', pro: 'Prioritario', empresas: 'Dedicado' },
]

const faqs = [
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Sí. Puedes subir o bajar de plan en cualquier momento desde la configuración de tu cuenta. El cobro se ajusta proporcionalmente al tiempo restante del ciclo de facturación.',
  },
  {
    q: '¿Cómo funciona la prueba gratuita de 30 días?',
    a: 'Al solicitar la demo, obtienes acceso completo al plan Pro por 30 días sin necesidad de ingresar datos de tarjeta. Al final del período puedes elegir el plan que mejor se adapte a tu cooperativa.',
  },
  {
    q: '¿Qué pasa con mis datos si cancelo?',
    a: 'Tus datos son tuyos. Si decides cancelar, te entregamos una exportación completa de toda la información registrada en formato Excel y PDF antes de eliminar la cuenta.',
  },
  {
    q: '¿El precio incluye la migración de datos existentes?',
    a: 'Sí. Todos los planes incluyen asistencia para importar tu listado de asociados, personal y demás información desde archivos Excel sin costo adicional.',
  },
  {
    q: '¿Se puede pagar en colones costarricenses?',
    a: 'Actualmente los precios están en dólares (USD) para mantener la estabilidad, pero aceptamos métodos de pago locales como SINPE Móvil para clientes en Costa Rica.',
  },
  {
    q: '¿Hay descuentos para cooperativas con recursos limitados?',
    a: 'Sí. Tenemos un programa de apoyo para cooperativas pequeñas de primer grado con dificultades económicas. Contáctanos directamente para evaluar tu caso.',
  },
]
</script>

<style scoped>
.public-page {
  font-family: var(--font-ui);
  overflow-x: hidden;
}
.section-wrap {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Navbar ─── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: background 0.3s, box-shadow 0.3s;
}
.navbar--solid {
  background: rgba(255,255,255,0.96);
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

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: white;
  border-top: 1px solid var(--border);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s;
}
.mobile-menu--open {
  max-height: 400px;
  padding: 8px 0 16px;
}
.mobile-menu a {
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  display: block;
  transition: color 0.15s, background 0.15s;
}
.mobile-menu a:hover { color: var(--navy); background: var(--navy-light); }

/* ── Page Hero ─── */
.page-hero {
  position: relative;
  padding: 140px 0 80px;
  background: linear-gradient(160deg, #F8FAFE 0%, #EDF4FF 100%);
  text-align: center;
  overflow: hidden;
}
.hero-dots {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle, rgba(19,60,101,0.07) 1.5px, transparent 1.5px);
  background-size: 36px 36px;
  pointer-events: none;
}
.section-tag {
  display: inline-block;
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: var(--gold); background: var(--gold-light);
  padding: 5px 14px; border-radius: var(--radius-full);
  margin-bottom: 16px;
}
.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700; color: var(--navy);
  letter-spacing: -0.8px; line-height: 1.15;
  margin-bottom: 16px;
}
.page-hero-sub {
  font-size: 17px; line-height: 1.7;
  color: var(--text-secondary);
  max-width: 520px; margin: 0 auto 36px;
}

/* Billing toggle */
.billing-toggle {
  display: inline-flex;
  background: white;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-full);
  padding: 4px;
  gap: 4px;
  box-shadow: var(--shadow-card);
}
.billing-toggle button {
  padding: 8px 22px;
  border-radius: var(--radius-full);
  font-size: 14px; font-weight: 600;
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.billing-toggle button.active {
  background: var(--navy);
  color: white;
  box-shadow: 0 2px 8px rgba(19,60,101,0.25);
}
.discount-badge {
  background: #1A9152;
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 700;
}

/* ── Plans ─── */
.plans-section {
  padding: 64px 0 80px;
  background: white;
}

/* Promo sticker row */
.plans-promo-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

/* Currency toggle */
.currency-toggle {
  display: flex;
  background: #F1F5F9;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.currency-btn {
  padding: 6px 18px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}

.currency-btn--active {
  background: white;
  color: #1E293B;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

.promo-sticker {
  width: 130px;
  height: 130px;
  background: radial-gradient(ellipse at 38% 35%, #4ade80, #15803d);
  clip-path: polygon(
    50% 0%,  58% 19%, 75% 7%,  73% 27%, 93% 25%, 81% 42%,
    100% 50%, 81% 58%, 93% 75%, 73% 73%, 75% 93%, 58% 81%,
    50% 100%, 42% 81%, 25% 93%, 27% 73%, 7%  75%, 19% 58%,
    0%  50%,  19% 42%, 7%  25%, 27% 27%, 25% 7%,  42% 19%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-8deg);
  filter:
    drop-shadow(0 3px 0 rgba(0,80,0,0.5))
    drop-shadow(3px 5px 10px rgba(0,0,0,0.45))
    drop-shadow(0 0 16px rgba(22,163,74,0.35));
  cursor: default;
  flex-shrink: 0;
  transition: transform 0.2s, filter 0.2s;
}
.promo-sticker:hover {
  transform: rotate(-8deg) scale(1.08);
  filter:
    drop-shadow(0 3px 0 rgba(0,80,0,0.6))
    drop-shadow(4px 7px 14px rgba(0,0,0,0.5))
    drop-shadow(0 0 22px rgba(22,163,74,0.5));
}

.promo-pct {
  color: white;
  font-size: 34px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 6px rgba(0,80,0,0.5), 0 1px 0 rgba(0,0,0,0.2);
}

.promo-sub {
  color: white;
  font-size: 10px;
  font-weight: 800;
  text-align: center;
  line-height: 1.25;
  max-width: 72px;
  margin-top: 3px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

/* Plan price block */
.plan-price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 20px;
}

.plan-price-original {
  font-size: 22px;
  font-weight: 400;
  color: var(--text-secondary);
  text-decoration: line-through;
  line-height: 1.2;
}

.plan-price-period-sm {
  font-size: 13px;
  margin-left: 2px;
}

.plan-price-row {
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.plan-price-usd {
  font-size: 38px;
  font-weight: 800;
  color: var(--navy);
  line-height: 1;
  letter-spacing: -1px;
}

.plan-price-usd--green {
  color: #15803d;
}

.plan-price-note {
  font-size: 12px;
  color: #15803d;
  font-weight: 500;
  margin-top: 2px;
}

.plan-price-period {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-weight: 500;
}
.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}
.plan-card {
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 32px 28px;
  position: relative;
  transition: box-shadow 0.25s, transform 0.25s;
  background: white;
}
.plan-card:hover {
  box-shadow: 0 12px 40px rgba(19,60,101,0.12);
  transform: translateY(-4px);
}
.plan-card--featured {
  border-color: var(--navy);
  box-shadow: 0 8px 32px rgba(19,60,101,0.14);
}
.plan-featured-badge {
  position: absolute;
  top: -13px; left: 50%;
  transform: translateX(-50%);
  background: var(--navy);
  color: white;
  font-size: 11px; font-weight: 700;
  padding: 4px 16px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  letter-spacing: 0.5px;
}
.plan-header { margin-bottom: 20px; }
.plan-name { font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.plan-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.55; }
.plan-price-wrap { display: flex; align-items: flex-end; gap: 4px; margin-bottom: 4px; }
.plan-price { font-size: 48px; font-weight: 800; color: var(--navy); font-family: var(--font-ui); line-height: 1; }
.plan-period { font-size: 16px; color: var(--text-secondary); margin-bottom: 8px; }
.plan-annual-note { font-size: 12px; color: #1A9152; font-weight: 500; min-height: 18px; margin-bottom: 6px; }
.plan-limit { font-size: 13px; color: var(--text-muted); margin-bottom: 20px; }
.plan-cta {
  display: block; text-align: center;
  padding: 11px 16px;
  border-radius: var(--radius-full);
  font-size: 14px; font-weight: 600;
  margin-bottom: 24px;
  transition: all 0.2s;
}
.plan-cta--outline {
  border: 1.5px solid var(--navy);
  color: var(--navy);
  background: transparent;
}
.plan-cta--outline:hover { background: var(--navy-light); }
.plan-cta--primary {
  background: var(--navy);
  color: white;
  border: 1.5px solid var(--navy);
}
.plan-cta--primary:hover { background: var(--navy-dark); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(19,60,101,0.3); }
.plan-features-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 12px; }
.plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.plan-features li { font-size: 14px; color: var(--text-secondary); padding-left: 22px; position: relative; line-height: 1.4; }
.plan-features li::before { content: '✓'; position: absolute; left: 0; color: #1A9152; font-weight: 700; font-size: 13px; }
.plans-note { text-align: center; font-size: 13px; color: var(--text-muted); padding-top: 8px; }

/* ── Compare ─── */
.compare-section {
  padding: 80px 0;
  background: #F8FAFE;
}
.section-header { text-align: center; max-width: 640px; margin: 0 auto 48px; }
.section-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 38px);
  font-weight: 700; color: var(--navy);
  letter-spacing: -0.4px; line-height: 1.2; margin-bottom: 12px;
}
.compare-wrap { overflow-x: auto; border-radius: 12px; box-shadow: var(--shadow-card); }
.compare-table {
  width: 100%; border-collapse: collapse;
  background: white; border-radius: 12px; overflow: hidden;
  min-width: 560px;
}
.compare-table th {
  padding: 14px 20px; text-align: center;
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.3px;
  background: #F1F5FB; color: var(--navy);
  border-bottom: 2px solid var(--border);
}
.compare-table th.feat-col { text-align: left; width: 38%; }
.compare-table th.featured-col { background: var(--navy); color: white; }
.compare-table td {
  padding: 13px 20px; text-align: center;
  font-size: 13px; border-bottom: 1px solid #F0F4FA;
  vertical-align: middle;
}
.compare-table tr:last-child td { border-bottom: none; }
.compare-table tr:nth-child(even) td { background: #FAFBFD; }
.compare-table tr:nth-child(even) td.featured-col { background: #EEF3FC; }
.compare-table td.feat-col { text-align: left; color: var(--text); font-weight: 500; }
.compare-table td.featured-col { background: #F5F8FF; }

/* ── FAQ ─── */
.faq-section { padding: 80px 0; background: white; }
.faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; }
.faq-item { border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; transition: border-color 0.2s; }
.faq-item.open { border-color: rgba(19,60,101,0.3); }
.faq-question {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  padding: 18px 22px; text-align: left;
  font-size: 15px; font-weight: 600; color: var(--navy);
  background: none; cursor: pointer;
  transition: background 0.15s;
  gap: 12px;
}
.faq-question:hover { background: #F8FAFE; }
.faq-icon { flex-shrink: 0; transition: transform 0.25s; }
.faq-item.open .faq-icon { transform: rotate(180deg); }
.faq-answer {
  max-height: 0; overflow: hidden;
  font-size: 14px; color: var(--text-secondary); line-height: 1.7;
  transition: max-height 0.3s ease, padding 0.3s;
  padding: 0 22px;
}
.faq-item.open .faq-answer { max-height: 200px; padding: 0 22px 18px; }

/* ── CTA ─── */
.cta-section { position: relative; background: var(--navy); padding: 96px 0; overflow: hidden; }
.cta-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1.5px, transparent 1.5px); background-size: 32px 32px; pointer-events: none; }
.cta-inner { position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.cta-title { font-family: var(--font-display); font-size: clamp(30px, 4vw, 44px); font-weight: 700; color: white; letter-spacing: -0.5px; line-height: 1.15; max-width: 580px; }
.cta-sub { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,0.7); max-width: 460px; }
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
  .plans-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto 28px; }
  .footer-main { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .nav-links, .nav-actions { display: none; }
  .nav-menu-btn { display: flex; margin-left: auto; }
  .mobile-menu { display: flex; }
  .section-wrap { padding: 0 20px; }
  .page-hero { padding: 110px 0 60px; }
  .plans-section { padding: 40px 0 60px; }
  .compare-section { padding: 60px 0; }
  .faq-section { padding: 60px 0; }
  .footer-main { padding: 0 20px 40px; }
  .footer-nav { flex-wrap: wrap; gap: 32px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; padding: 16px 20px; }
  .billing-toggle button { padding: 8px 14px; font-size: 13px; }
  .discount-badge { display: none; }
}
@media (max-width: 480px) {
  .plan-card { padding: 24px 20px; }
  .plan-price { font-size: 40px; }
}
</style>
