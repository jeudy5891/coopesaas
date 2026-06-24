<template>
  <div class="module-page">

    <!-- Encabezado -->
    <div class="page-header">
      <div>
        <h2 class="page-title">Gestión de Riesgos</h2>
        <p class="page-subtitle">Identificación, evaluación y control de riesgos de la cooperativa</p>
      </div>
      <div class="header-actions">
        <button v-if="activeTab === 'catalogo'" class="btn-primary" @click="modalOpen = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo riesgo
        </button>
        <button v-if="activeTab === 'incidentes'" class="btn-primary" @click="modalOpen = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Registrar incidente
        </button>
        <button v-if="activeTab === 'planes'" class="btn-primary" @click="modalOpen = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo plan
        </button>
      </div>
    </div>

    <!-- Pestañas -->
    <div class="tabs-wrap">
      <div class="tabs-nav">
        <button v-for="t in tabs" :key="t.key" class="tab-btn" :class="{ 'tab-btn--active': activeTab === t.key }" @click="activeTab = t.key">
          <span v-html="t.icon"></span>{{ t.label }}
        </button>
      </div>
    </div>

    <!-- ═══════════ TAB: INDICADORES Y ALERTAS (dashboard) ═══════════ -->
    <template v-if="activeTab === 'indicadores'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--red">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div><div class="kpi-value">3</div><div class="kpi-label">Riesgos críticos</div></div>
        </div>
        <div class="kpi-card kpi-card--yellow">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div><div class="kpi-value">5</div><div class="kpi-label">Incidentes del mes</div></div>
        </div>
        <div class="kpi-card kpi-card--orange">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          <div><div class="kpi-value">2</div><div class="kpi-label">Planes de acción vencidos</div></div>
        </div>
        <div class="kpi-card kpi-card--navy">
          <div><div class="kpi-value">8</div><div class="kpi-label">Riesgos identificados</div></div>
        </div>
      </div>

      <!-- Alertas activas -->
      <div class="data-card alertas-card">
        <div class="card-header-row" style="padding:16px;margin-bottom:0">
          <h3 class="card-title">Alertas activas</h3>
          <span class="badge badge--red">3 críticas</span>
        </div>
        <div v-for="a in alertas" :key="a.id" class="alerta-row" :class="`alerta-row--${a.nivel}`">
          <div class="alerta-nivel-dot" :class="`dot--${a.nivel}`"></div>
          <div class="alerta-body">
            <div class="alerta-titulo">{{ a.titulo }}</div>
            <div class="alerta-sub">{{ a.descripcion }}</div>
          </div>
          <div class="alerta-meta">
            <span :class="['badge', nivelBadge(a.nivel)]">{{ a.nivelLabel }}</span>
            <span class="td-muted">{{ a.fecha }}</span>
          </div>
        </div>
      </div>

      <!-- Resumen visual por categoría -->
      <div class="categorias-grid">
        <div v-for="cat in categoriaResumen" :key="cat.nombre" class="cat-card">
          <div class="cat-card-icon" :style="{ background: cat.bg, color: cat.color }">
            <span v-html="cat.icon"></span>
          </div>
          <div class="cat-card-nombre">{{ cat.nombre }}</div>
          <div class="cat-card-count">{{ cat.total }} riesgos</div>
          <div class="cat-card-bar">
            <div class="cat-bar-fill" :style="{ width: cat.pct + '%', background: cat.color }"></div>
          </div>
          <div v-if="cat.criticos > 0" class="cat-card-critico">{{ cat.criticos }} crítico{{ cat.criticos > 1 ? 's' : '' }}</div>
        </div>
      </div>
    </template>

    <!-- ═══════════ TAB: CATÁLOGO DE RIESGOS ═══════════ -->
    <template v-if="activeTab === 'catalogo'">
      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar riesgo..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todas las categorías</option><option>Crédito</option><option>Operativo</option><option>Tecnológico</option><option>Financiero</option><option>Cumplimiento</option><option>RRHH</option></select>
        <select class="filter-select"><option>Todos los niveles</option><option>Crítico</option><option>Alto</option><option>Moderado</option><option>Bajo</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Activo</option><option>Controlado</option><option>Cerrado</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Código</th><th>Riesgo</th><th>Categoría</th><th>Área responsable</th><th>Probabilidad</th><th>Impacto</th><th>Nivel</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr v-for="r in catalogoRiesgos" :key="r.codigo">
              <td class="fw-600 txt-navy">{{ r.codigo }}</td>
              <td>
                <div class="fw-600">{{ r.nombre }}</div>
                <div class="td-sub">{{ r.descripcion }}</div>
              </td>
              <td><span class="badge badge--blue">{{ r.categoria }}</span></td>
              <td class="td-muted">{{ r.area }}</td>
              <td><span :class="['badge', probBadge(r.probabilidad)]">{{ r.probabilidad }}</span></td>
              <td><span :class="['badge', impactoBadge(r.impacto)]">{{ r.impacto }}</span></td>
              <td><span :class="['badge', nivelBadge(r.nivel)]">{{ r.nivel }}</span></td>
              <td><span :class="['badge', r.estado === 'Activo' ? 'badge--yellow' : r.estado === 'Controlado' ? 'badge--green' : 'badge--blue']">{{ r.estado }}</span></td>
              <td class="td-actions">
                <button class="link-btn" @click="activeTab = 'matriz'">Ver en matriz</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════ TAB: MATRIZ DE RIESGOS ═══════════ -->
    <template v-if="activeTab === 'matriz'">
      <div class="matriz-layout">

        <div class="matriz-wrap">
          <div class="matriz-title">Matriz de Probabilidad × Impacto</div>

          <!-- Eje Y label -->
          <div class="matriz-container">
            <div class="eje-y-label">Probabilidad</div>

            <div class="matriz-grid-wrap">
              <!-- Eje X headers -->
              <div class="eje-x-headers">
                <div class="eje-corner"></div>
                <div class="eje-x-label">Bajo</div>
                <div class="eje-x-label">Medio</div>
                <div class="eje-x-label">Alto</div>
              </div>

              <!-- Filas de la matriz -->
              <div v-for="row in matrizFilas" :key="row.prob" class="matriz-fila">
                <div class="eje-y-tick">{{ row.prob }}</div>
                <div v-for="cell in row.celdas" :key="cell.impacto"
                     class="matriz-celda"
                     :class="`matriz-celda--${cell.nivel}`"
                     :title="cell.nivel">
                  <div class="celda-nivel">{{ cell.nivel }}</div>
                  <div class="celda-riesgos">
                    <span v-for="cod in cell.riesgos" :key="cod" class="celda-badge" :title="riesgoNombre(cod)">{{ cod }}</span>
                  </div>
                </div>
              </div>

              <!-- Label eje X -->
              <div class="eje-x-bottom">
                <div class="eje-corner-bottom"></div>
                <div class="eje-x-bottom-label" style="grid-column: 2 / 5">Impacto →</div>
              </div>
            </div>
          </div>

          <!-- Leyenda -->
          <div class="matriz-leyenda">
            <div v-for="l in leyenda" :key="l.nivel" class="leyenda-item">
              <div class="leyenda-dot" :class="`dot-nivel--${l.cls}`"></div>
              <span>{{ l.nivel }}</span>
            </div>
          </div>
        </div>

        <!-- Lista detallada -->
        <div class="data-card matriz-list">
          <div class="card-header-row" style="padding:14px 16px;margin-bottom:0">
            <h3 class="card-title">Detalle de riesgos</h3>
          </div>
          <div v-for="r in catalogoRiesgos" :key="r.codigo" class="matriz-list-item">
            <div class="mli-top">
              <span class="fw-600 txt-navy">{{ r.codigo }}</span>
              <span :class="['badge', nivelBadge(r.nivel)]">{{ r.nivel }}</span>
            </div>
            <div class="mli-nombre">{{ r.nombre }}</div>
            <div class="mli-meta">
              <span class="badge badge--blue" style="font-size:10px">{{ r.categoria }}</span>
              <span class="td-muted">P: {{ r.probabilidad }} · I: {{ r.impacto }}</span>
            </div>
          </div>
        </div>

      </div>
    </template>

    <!-- ═══════════ TAB: INCIDENTES ═══════════ -->
    <template v-if="activeTab === 'incidentes'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">5</div><div class="kpi-label">Incidentes del mes</div></div></div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">3</div><div class="kpi-label">Resueltos</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">2</div><div class="kpi-label">En proceso</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡175.000</div><div class="kpi-label">Impacto económico total</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar incidente..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todas las categorías</option><option>Operativo</option><option>Tecnológico</option><option>Financiero</option><option>Cumplimiento</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Resuelto</option><option>En proceso</option><option>Pendiente</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>N°</th><th>Fecha</th><th>Riesgo asociado</th><th>Descripción del incidente</th><th>Categoría</th><th>Impacto económico</th><th>Responsable</th><th>Estado</th></tr></thead>
          <tbody>
            <tr v-for="inc in incidentes" :key="inc.id">
              <td class="fw-600 txt-navy">{{ inc.numero }}</td>
              <td class="td-muted">{{ inc.fecha }}</td>
              <td><span class="badge badge--blue">{{ inc.riesgo }}</span></td>
              <td>{{ inc.descripcion }}</td>
              <td><span class="badge badge--blue">{{ inc.categoria }}</span></td>
              <td :class="inc.impacto !== '—' ? 'txt-red fw-600' : 'td-muted'">{{ inc.impacto }}</td>
              <td class="td-muted">{{ inc.responsable }}</td>
              <td><span :class="['badge', inc.estado === 'Resuelto' ? 'badge--green' : inc.estado === 'En proceso' ? 'badge--yellow' : 'badge--red']">{{ inc.estado }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════ TAB: PLANES DE ACCIÓN ═══════════ -->
    <template v-if="activeTab === 'planes'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">8</div><div class="kpi-label">Planes activos</div></div></div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">3</div><div class="kpi-label">Completados</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">3</div><div class="kpi-label">En progreso</div></div></div>
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">2</div><div class="kpi-label">Vencidos</div></div></div>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Riesgo</th><th>Acción de mitigación</th><th>Tipo</th><th>Responsable</th><th>Fecha límite</th><th>Progreso</th><th>Estado</th></tr></thead>
          <tbody>
            <tr v-for="plan in planesAccion" :key="plan.id">
              <td><span class="badge badge--blue">{{ plan.riesgo }}</span></td>
              <td>
                <div class="fw-600">{{ plan.accion }}</div>
                <div class="td-sub">{{ plan.descripcion }}</div>
              </td>
              <td><span class="badge badge--blue">{{ plan.tipo }}</span></td>
              <td class="td-muted">{{ plan.responsable }}</td>
              <td :class="plan.vencido ? 'txt-red fw-600' : 'td-muted'">{{ plan.fechaLimite }}</td>
              <td>
                <div class="prog-wrap">
                  <div class="prog-bg"><div class="prog-fill" :class="plan.estado === 'Vencido' ? 'prog--red' : plan.estado === 'Completado' ? 'prog--green' : 'prog--blue'" :style="{ width: plan.progreso + '%' }"></div></div>
                  <span class="prog-pct">{{ plan.progreso }}%</span>
                </div>
              </td>
              <td><span :class="['badge', estadoPlanBadge(plan.estado)]">{{ plan.estado }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════ TAB: SEGUIMIENTO Y MONITOREO ═══════════ -->
    <template v-if="activeTab === 'seguimiento'">
      <div class="filters-bar">
        <select class="filter-select"><option>Revisión mensual — Junio 2026</option><option>Revisión trimestral — Q2 2026</option><option>Revisión anual — 2026</option></select>
        <button class="btn-primary btn-sm">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Registrar revisión
        </button>
      </div>

      <div class="data-card">
        <div class="card-header-row" style="padding:14px 16px 0">
          <h3 class="card-title">Estado actual de riesgos — Junio 2026</h3>
          <span class="td-muted" style="font-size:12px">Última revisión: 15/06/2026</span>
        </div>
        <table class="data-table">
          <thead><tr><th>Código</th><th>Riesgo</th><th>Nivel anterior</th><th>Nivel actual</th><th>Tendencia</th><th>Última revisión</th><th>Próxima revisión</th><th>Acción requerida</th></tr></thead>
          <tbody>
            <tr v-for="seg in seguimientoData" :key="seg.codigo">
              <td class="fw-600 txt-navy">{{ seg.codigo }}</td>
              <td>{{ seg.nombre }}</td>
              <td><span :class="['badge', nivelBadge(seg.nivelAnterior)]">{{ seg.nivelAnterior }}</span></td>
              <td><span :class="['badge', nivelBadge(seg.nivelActual)]">{{ seg.nivelActual }}</span></td>
              <td>
                <span :class="['tendencia', `tendencia--${seg.tendencia}`]">
                  <svg v-if="seg.tendencia === 'sube'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                  <svg v-else-if="seg.tendencia === 'baja'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {{ seg.tendencia === 'sube' ? 'Aumenta' : seg.tendencia === 'baja' ? 'Mejora' : 'Estable' }}
                </span>
              </td>
              <td class="td-muted">{{ seg.ultimaRevision }}</td>
              <td class="td-muted">{{ seg.proximaRevision }}</td>
              <td>
                <span v-if="seg.accion" class="accion-req">{{ seg.accion }}</span>
                <span v-else class="td-muted">Ninguna</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Historial de revisiones -->
      <div class="data-card">
        <div class="card-header-row" style="padding:14px 16px 0">
          <h3 class="card-title">Historial de revisiones</h3>
        </div>
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Tipo revisión</th><th>Riesgos revisados</th><th>Cambios detectados</th><th>Responsable</th><th>Observaciones</th></tr></thead>
          <tbody>
            <tr v-for="rev in historialRevisiones" :key="rev.id">
              <td class="td-muted">{{ rev.fecha }}</td>
              <td><span class="badge badge--blue">{{ rev.tipo }}</span></td>
              <td class="td-right">{{ rev.revisados }}</td>
              <td :class="rev.cambios > 0 ? 'fw-600 txt-yellow' : 'td-muted'">{{ rev.cambios }}</td>
              <td class="td-muted">{{ rev.responsable }}</td>
              <td class="td-muted">{{ rev.obs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════ TAB: REPORTES ═══════════ -->
    <template v-if="activeTab === 'reportes'">
      <div class="reportes-grid">
        <div v-for="r in reportes" :key="r.id" class="reporte-card">
          <div class="reporte-icon" :style="{ background: r.bg, color: r.color }">
            <span v-html="r.icon"></span>
          </div>
          <div class="reporte-body">
            <div class="reporte-nombre">{{ r.nombre }}</div>
            <div class="reporte-desc">{{ r.descripcion }}</div>
          </div>
          <div class="reporte-actions">
            <select class="filter-select filter-select--sm"><option>Junio 2026</option><option>Q2 2026</option><option>2025</option></select>
            <button class="btn-primary btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Generar
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla resumen riesgos por categoría -->
      <div class="data-card" style="margin-top:4px">
        <div class="card-header-row" style="padding:16px;margin-bottom:0">
          <h3 class="card-title">Resumen general de riesgos</h3>
        </div>
        <table class="data-table">
          <thead><tr><th>Categoría</th><th class="td-right">Total</th><th class="td-right">Críticos</th><th class="td-right">Altos</th><th class="td-right">Moderados</th><th class="td-right">Bajos</th><th>Tendencia</th></tr></thead>
          <tbody>
            <tr v-for="rc in resumenCategorias" :key="rc.categoria">
              <td class="fw-600">{{ rc.categoria }}</td>
              <td class="td-right">{{ rc.total }}</td>
              <td class="td-right" :class="rc.criticos > 0 ? 'txt-red fw-600' : 'td-muted'">{{ rc.criticos }}</td>
              <td class="td-right" :class="rc.altos > 0 ? 'txt-yellow fw-600' : 'td-muted'">{{ rc.altos }}</td>
              <td class="td-right td-muted">{{ rc.moderados }}</td>
              <td class="td-right td-muted">{{ rc.bajos }}</td>
              <td><span :class="['tendencia', `tendencia--${rc.tendencia}`]">
                <svg v-if="rc.tendencia === 'sube'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                <svg v-else-if="rc.tendencia === 'baja'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                {{ rc.tendencia === 'sube' ? 'Aumenta' : rc.tendencia === 'baja' ? 'Mejora' : 'Estable' }}
              </span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('indicadores')
const modalOpen  = ref(false)

const tabs = [
  { key: 'indicadores', label: 'Indicadores',    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
  { key: 'catalogo',    label: 'Catálogo',        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>` },
  { key: 'matriz',      label: 'Matriz de riesgos',icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>` },
  { key: 'incidentes',  label: 'Incidentes',      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
  { key: 'planes',      label: 'Planes de acción',icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` },
  { key: 'seguimiento', label: 'Seguimiento',     icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
  { key: 'reportes',    label: 'Reportes',        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
]

const catalogoRiesgos = [
  { codigo: 'R001', nombre: 'Incremento de morosidad',      descripcion: 'Aumento del índice de mora en cartera de crédito',         categoria: 'Crédito',      area: 'Créditos',      probabilidad: 'Alta',  impacto: 'Alto',  nivel: 'Crítico',  estado: 'Activo'     },
  { codigo: 'R002', nombre: 'Pérdida de información',       descripcion: 'Pérdida o daño de datos críticos del sistema',              categoria: 'Tecnológico',  area: 'TI',            probabilidad: 'Media', impacto: 'Bajo',  nivel: 'Moderado', estado: 'Controlado' },
  { codigo: 'R003', nombre: 'Fraude interno',               descripcion: 'Apropiación indebida de fondos por funcionario',            categoria: 'Operativo',    area: 'Gerencia',      probabilidad: 'Baja',  impacto: 'Alto',  nivel: 'Moderado', estado: 'Activo'     },
  { codigo: 'R004', nombre: 'Falla de sistema de pagos',    descripcion: 'Interrupción del sistema en procesamiento de pagos',        categoria: 'Tecnológico',  area: 'TI',            probabilidad: 'Media', impacto: 'Bajo',  nivel: 'Moderado', estado: 'Controlado' },
  { codigo: 'R005', nombre: 'Incumplimiento normativo',     descripcion: 'Inobservancia de regulaciones de la SUGEF o Sugecoop',     categoria: 'Cumplimiento', area: 'Gerencia',      probabilidad: 'Media', impacto: 'Alto',  nivel: 'Alto',     estado: 'Activo'     },
  { codigo: 'R006', nombre: 'Robo o pérdida de activos',    descripcion: 'Pérdida de bienes físicos de la cooperativa',               categoria: 'Operativo',    area: 'Administración',probabilidad: 'Baja',  impacto: 'Medio', nivel: 'Bajo',     estado: 'Controlado' },
  { codigo: 'R007', nombre: 'Fluctuación de tasas',         descripcion: 'Variación de tasas de interés del mercado financiero',      categoria: 'Financiero',   area: 'Finanzas',      probabilidad: 'Alta',  impacto: 'Medio', nivel: 'Alto',     estado: 'Activo'     },
  { codigo: 'R008', nombre: 'Salida de personal clave',     descripcion: 'Renuncia de colaboradores con conocimiento crítico',        categoria: 'RRHH',         area: 'RRHH',          probabilidad: 'Media', impacto: 'Medio', nivel: 'Moderado', estado: 'Activo'     },
]

// Matriz 3×3: filas = probabilidad (Alta→Media→Baja), columnas = impacto (Bajo→Medio→Alto)
const matrizFilas = [
  {
    prob: 'Alta',
    celdas: [
      { impacto: 'Bajo',  nivel: 'moderado', riesgos: []      },
      { impacto: 'Medio', nivel: 'alto',     riesgos: ['R007']},
      { impacto: 'Alto',  nivel: 'critico',  riesgos: ['R001']},
    ]
  },
  {
    prob: 'Media',
    celdas: [
      { impacto: 'Bajo',  nivel: 'moderado', riesgos: ['R002','R004'] },
      { impacto: 'Medio', nivel: 'moderado', riesgos: ['R008']        },
      { impacto: 'Alto',  nivel: 'alto',     riesgos: ['R005']        },
    ]
  },
  {
    prob: 'Baja',
    celdas: [
      { impacto: 'Bajo',  nivel: 'bajo',     riesgos: []      },
      { impacto: 'Medio', nivel: 'bajo',     riesgos: ['R006']},
      { impacto: 'Alto',  nivel: 'moderado', riesgos: ['R003']},
    ]
  },
]

const leyenda = [
  { nivel: 'Crítico',  cls: 'critico'  },
  { nivel: 'Alto',     cls: 'alto'     },
  { nivel: 'Moderado', cls: 'moderado' },
  { nivel: 'Bajo',     cls: 'bajo'     },
]

const alertas = [
  { id: 1, titulo: 'R001 — Morosidad supera 7% de la cartera',      descripcion: 'El índice de morosidad alcanzó 7.2%, superando el umbral crítico de 7%.',    nivel: 'critico',  nivelLabel: 'Crítico',  fecha: '24/06/2026' },
  { id: 2, titulo: 'R005 — Reporte SUGEF pendiente de envío',        descripcion: 'El informe mensual debe enviarse antes del 30 de junio de 2026.',              nivel: 'alto',     nivelLabel: 'Alto',     fecha: '22/06/2026' },
  { id: 3, titulo: 'R007 — Variación de tasa de referencia BN',      descripcion: 'La tasa de referencia aumentó 0.5 puntos. Revisar condiciones de créditos.',   nivel: 'alto',     nivelLabel: 'Alto',     fecha: '20/06/2026' },
  { id: 4, titulo: 'R004 — Plan de acción vencido sin completar',    descripcion: 'La actualización del plan de contingencia de TI no se completó a tiempo.',     nivel: 'moderado', nivelLabel: 'Moderado', fecha: '15/06/2026' },
]

const categoriaResumen = [
  { nombre: 'Crédito',       total: 1, criticos: 1, pct: 90, bg: '#FEF2F2', color: '#991B1B', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` },
  { nombre: 'Tecnológico',   total: 2, criticos: 0, pct: 50, bg: '#EBF3FF', color: '#133C65', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>` },
  { nombre: 'Operativo',     total: 2, criticos: 0, pct: 40, bg: '#FFFBEB', color: '#92400E', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` },
  { nombre: 'Financiero',    total: 1, criticos: 0, pct: 70, bg: '#F0FAF4', color: '#166534', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { nombre: 'Cumplimiento',  total: 1, criticos: 0, pct: 80, bg: '#FFF7ED', color: '#C2410C', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
  { nombre: 'RRHH',          total: 1, criticos: 0, pct: 50, bg: '#EBF3FF', color: '#1B5490', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
]

const incidentes = [
  { id: 1, numero: 'INC-001', fecha: '15/03/2026', riesgo: 'R002',  descripcion: 'Error en transferencia bancaria — cargó monto incorrecto',    categoria: 'Tecnológico',  impacto: '₡75.000',  responsable: 'TI',        estado: 'Resuelto'  },
  { id: 2, numero: 'INC-002', fecha: '02/04/2026', riesgo: 'R003',  descripcion: 'Intento de acceso no autorizado al sistema',                   categoria: 'Operativo',    impacto: '—',         responsable: 'Gerencia',  estado: 'Resuelto'  },
  { id: 3, numero: 'INC-003', fecha: '18/05/2026', riesgo: 'R002',  descripcion: 'Documento de crédito extraviado en archivo',                   categoria: 'Operativo',    impacto: '—',         responsable: 'Créditos',  estado: 'En proceso'},
  { id: 4, numero: 'INC-004', fecha: '10/06/2026', riesgo: 'R004',  descripcion: 'Falla en sistema de pagos — 3 horas de interrupción',           categoria: 'Tecnológico',  impacto: '₡100.000', responsable: 'TI',        estado: 'Resuelto'  },
  { id: 5, numero: 'INC-005', fecha: '20/06/2026', riesgo: 'R005',  descripcion: 'Retraso en presentación de reporte regulatorio mensual',        categoria: 'Cumplimiento', impacto: '—',         responsable: 'Gerencia',  estado: 'En proceso'},
]

const planesAccion = [
  { id: 1, riesgo: 'R001', accion: 'Recordatorios automáticos de pago', descripcion: 'Enviar SMS/email 5 días antes del vencimiento',   tipo: 'Preventiva',  responsable: 'Gestor cobro',  fechaLimite: '30/06/2026', progreso: 80,  estado: 'En progreso', vencido: false },
  { id: 2, riesgo: 'R002', accion: 'Backups diarios cifrados',           descripcion: 'Implementar respaldo automático en nube privada', tipo: 'Correctiva',  responsable: 'TI',            fechaLimite: '15/07/2026', progreso: 45,  estado: 'En progreso', vencido: false },
  { id: 3, riesgo: 'R003', accion: 'Capacitación detección de fraude',   descripcion: 'Taller para todo el personal administrativo',     tipo: 'Preventiva',  responsable: 'RRHH',          fechaLimite: '31/07/2026', progreso: 10,  estado: 'Pendiente',   vencido: false },
  { id: 4, riesgo: 'R004', accion: 'Plan de contingencia TI',            descripcion: 'Documentar procedimientos ante falla de sistemas',tipo: 'Correctiva',  responsable: 'TI',            fechaLimite: '01/06/2026', progreso: 60,  estado: 'Vencido',     vencido: true  },
  { id: 5, riesgo: 'R005', accion: 'Auditoría de cumplimiento normativo',descripcion: 'Contratación de auditor externo especializado',   tipo: 'Correctiva',  responsable: 'Consejo Admin', fechaLimite: '31/08/2026', progreso: 0,   estado: 'Pendiente',   vencido: false },
  { id: 6, riesgo: 'R007', accion: 'Política de tasas variables',        descripcion: 'Revisar y actualizar condiciones de créditos vigentes',tipo:'Mitigación',responsable:'Finanzas',     fechaLimite: '15/06/2026', progreso: 100, estado: 'Completado',  vencido: false },
  { id: 7, riesgo: 'R008', accion: 'Plan de sucesión de cargos clave',   descripcion: 'Identificar y capacitar reemplazos potenciales',   tipo: 'Preventiva',  responsable: 'RRHH',          fechaLimite: '30/09/2026', progreso: 20,  estado: 'En progreso', vencido: false },
  { id: 8, riesgo: 'R001', accion: 'Protocolo de cobro judicial',        descripcion: 'Definir proceso para créditos +90 días de mora',   tipo: 'Correctiva',  responsable: 'Legal',         fechaLimite: '31/05/2026', progreso: 100, estado: 'Completado',  vencido: false },
]

const seguimientoData = [
  { codigo: 'R001', nombre: 'Incremento de morosidad',    nivelAnterior: 'Alto',     nivelActual: 'Crítico',  tendencia: 'sube',   ultimaRevision: '15/06/2026', proximaRevision: '01/07/2026', accion: 'Plan urgente en curso'   },
  { codigo: 'R002', nombre: 'Pérdida de información',     nivelAnterior: 'Alto',     nivelActual: 'Moderado', tendencia: 'baja',   ultimaRevision: '15/06/2026', proximaRevision: '15/07/2026', accion: null                      },
  { codigo: 'R003', nombre: 'Fraude interno',             nivelAnterior: 'Moderado', nivelActual: 'Moderado', tendencia: 'estable',ultimaRevision: '15/06/2026', proximaRevision: '15/07/2026', accion: null                      },
  { codigo: 'R004', nombre: 'Falla de sistema de pagos',  nivelAnterior: 'Alto',     nivelActual: 'Moderado', tendencia: 'baja',   ultimaRevision: '10/06/2026', proximaRevision: '10/07/2026', accion: 'Completar plan TI'       },
  { codigo: 'R005', nombre: 'Incumplimiento normativo',   nivelAnterior: 'Moderado', nivelActual: 'Alto',     tendencia: 'sube',   ultimaRevision: '20/06/2026', proximaRevision: '01/07/2026', accion: 'Enviar reporte SUGEF'    },
  { codigo: 'R006', nombre: 'Robo o pérdida de activos',  nivelAnterior: 'Bajo',     nivelActual: 'Bajo',     tendencia: 'estable',ultimaRevision: '15/06/2026', proximaRevision: '15/07/2026', accion: null                      },
  { codigo: 'R007', nombre: 'Fluctuación de tasas',       nivelAnterior: 'Moderado', nivelActual: 'Alto',     tendencia: 'sube',   ultimaRevision: '20/06/2026', proximaRevision: '01/07/2026', accion: 'Revisar contratos activos'},
  { codigo: 'R008', nombre: 'Salida de personal clave',   nivelAnterior: 'Moderado', nivelActual: 'Moderado', tendencia: 'estable',ultimaRevision: '15/06/2026', proximaRevision: '15/07/2026', accion: null                      },
]

const historialRevisiones = [
  { id: 1, fecha: '15/06/2026', tipo: 'Mensual',     revisados: 8, cambios: 3, responsable: 'Comité de riesgos', obs: 'R001 subió a Crítico, R004 y R002 mejoraron' },
  { id: 2, fecha: '01/04/2026', tipo: 'Trimestral',  revisados: 8, cambios: 1, responsable: 'Gerencia',          obs: 'R007 subió a Moderado por ajuste tasas BN'   },
  { id: 3, fecha: '15/03/2026', tipo: 'Mensual',     revisados: 8, cambios: 0, responsable: 'Comité de riesgos', obs: 'Sin cambios en niveles'                      },
  { id: 4, fecha: '15/02/2026', tipo: 'Mensual',     revisados: 8, cambios: 2, responsable: 'Comité de riesgos', obs: 'R004 subió, R006 mejoró a Bajo'               },
  { id: 5, fecha: '15/01/2026', tipo: 'Anual',       revisados: 8, cambios: 4, responsable: 'Consejo Admin',     obs: 'Revisión anual, incorporados R007 y R008'    },
]

const resumenCategorias = [
  { categoria: 'Crédito',      total: 1, criticos: 1, altos: 0, moderados: 0, bajos: 0, tendencia: 'sube'   },
  { categoria: 'Tecnológico',  total: 2, criticos: 0, altos: 0, moderados: 2, bajos: 0, tendencia: 'baja'   },
  { categoria: 'Operativo',    total: 2, criticos: 0, altos: 0, moderados: 1, bajos: 1, tendencia: 'estable'},
  { categoria: 'Financiero',   total: 1, criticos: 0, altos: 1, moderados: 0, bajos: 0, tendencia: 'sube'   },
  { categoria: 'Cumplimiento', total: 1, criticos: 0, altos: 1, moderados: 0, bajos: 0, tendencia: 'sube'   },
  { categoria: 'RRHH',         total: 1, criticos: 0, altos: 0, moderados: 1, bajos: 0, tendencia: 'estable'},
]

const reportes = [
  { id: 1, nombre: 'Riesgos activos',       descripcion: 'Listado completo de riesgos identificados con nivel actual.',   bg: '#FEF2F2', color: '#991B1B', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>` },
  { id: 2, nombre: 'Matriz de riesgos',     descripcion: 'Visualización de probabilidad vs impacto de todos los riesgos.',bg: '#EBF3FF', color: '#133C65', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>` },
  { id: 3, nombre: 'Incidentes del período',descripcion: 'Eventos registrados, impacto económico y estado de resolución.', bg: '#FFFBEB', color: '#92400E', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` },
  { id: 4, nombre: 'Planes de acción',      descripcion: 'Estado de avance de todas las acciones de mitigación activas.',  bg: '#F0FAF4', color: '#166534', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>` },
  { id: 5, nombre: 'Indicadores generales', descripcion: 'Dashboard ejecutivo de riesgos críticos, incidentes y planes.', bg: '#EBF3FF', color: '#133C65', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
  { id: 6, nombre: 'Seguimiento de cambios',descripcion: 'Evolución histórica de niveles de riesgo y tendencias.',          bg: '#F0FAF4', color: '#166534', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>` },
]

// Helpers
function nivelBadge(nivel) {
  return { 'Crítico': 'badge--red', 'Alto': 'badge--orange', 'Moderado': 'badge--yellow', 'Bajo': 'badge--green' }[nivel] || 'badge--blue'
}
function probBadge(p)     { return { 'Alta': 'badge--red', 'Media': 'badge--yellow', 'Baja': 'badge--green' }[p] || 'badge--blue' }
function impactoBadge(i)  { return { 'Alto': 'badge--red', 'Medio': 'badge--yellow', 'Bajo': 'badge--green' }[i] || 'badge--blue' }
function estadoPlanBadge(e){ return { 'Completado': 'badge--green', 'En progreso': 'badge--blue', 'Pendiente': 'badge--yellow', 'Vencido': 'badge--red' }[e] || 'badge--blue' }
function riesgoNombre(cod) { return catalogoRiesgos.find(r => r.codigo === cod)?.nombre || cod }
</script>

<style scoped>
.module-page { display: flex; flex-direction: column; gap: 20px; }

/* ── Header ──────────────────────────── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.page-title  { font-size: 22px; font-weight: 700; color: #133C65; letter-spacing: -0.3px; }
.page-subtitle { font-size: 13px; color: #4A6070; margin-top: 2px; }
.dark .page-title { color: #E2E8F0; }
.dark .page-subtitle { color: #94A3B8; }
.header-actions { display: flex; gap: 10px; align-items: center; flex-shrink: 0; }

/* ── Buttons ─────────────────────────── */
.btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #133C65; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-primary:hover { background: #1B5490; }
.btn-outline { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: white; color: #133C65; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.link-btn { background: none; border: none; color: #1B5490; font-size: 12px; cursor: pointer; padding: 0; }
.link-btn:hover { text-decoration: underline; }
.dark .link-btn { color: #93B8D8; }

/* ── Tabs ────────────────────────────── */
.tabs-wrap { background: white; border-radius: 12px; padding: 6px; border: 1px solid #E8EEF4; }
.tabs-nav { display: flex; gap: 2px; overflow-x: auto; }
.tabs-nav::-webkit-scrollbar { height: 0; }
.tab-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px; border: none; background: transparent; color: #4A6070; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.tab-btn:hover { background: #F4F6F8; color: #133C65; }
.tab-btn--active { background: #133C65; color: white; }
.dark .tabs-wrap { background: #1D293D; border-color: #3D5069; }
.dark .tab-btn { color: #94A3B8; }
.dark .tab-btn:hover { background: #243553; color: #E2E8F0; }
.dark .tab-btn--active { background: #1B5490; color: white; }

/* ── KPI row ─────────────────────────── */
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.kpi-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 14px; }
.kpi-card--navy   { background: #133C65; border-color: #133C65; }
.kpi-card--red    { background: #FEF2F2; border-color: #FECACA; }
.kpi-card--yellow { background: #FFFBEB; border-color: #FDE68A; }
.kpi-card--orange { background: #FFF7ED; border-color: #FED7AA; }
.kpi-card--green  { background: #F0FAF4; border-color: #B7E4CC; }
.kpi-value { font-size: 20px; font-weight: 700; color: #133C65; white-space: nowrap; }
.kpi-card--navy .kpi-value   { color: white; }
.kpi-card--red .kpi-value    { color: #991B1B; }
.kpi-card--yellow .kpi-value { color: #92400E; }
.kpi-card--orange .kpi-value { color: #C2410C; }
.kpi-card--green .kpi-value  { color: #166534; }
.kpi-label { font-size: 12px; color: #4A6070; margin-top: 2px; }
.kpi-card--navy .kpi-label   { color: rgba(255,255,255,0.7); }
.kpi-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-card--red .kpi-icon    { background: #FEE2E2; color: #991B1B; }
.kpi-card--yellow .kpi-icon { background: #FEF08A; color: #92400E; }
.kpi-card--orange .kpi-icon { background: #FED7AA; color: #C2410C; }
.dark .kpi-card { background: #1D293D; border-color: #3D5069; }
.dark .kpi-value { color: #E2E8F0; }
.dark .kpi-label { color: #94A3B8; }

/* ── Filters & Data ──────────────────── */
.filters-bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #7A90A0; }
.search-input { width: 100%; padding: 8px 10px 8px 32px; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; background: white; color: #1A2B3C; }
.search-input:focus { outline: none; border-color: #133C65; }
.filter-select { padding: 8px 12px; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; background: white; color: #1A2B3C; cursor: pointer; }
.filter-select--sm { padding: 5px 10px; font-size: 12px; }
.dark .search-input, .dark .filter-select { background: #1D293D; border-color: #3D5069; color: #E2E8F0; }

.data-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; min-width: 600px; }
.data-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; color: #4A6070; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #E8EEF4; white-space: nowrap; }
.data-table td { padding: 11px 14px; font-size: 13px; color: #1A2B3C; border-bottom: 1px solid #F4F6F8; vertical-align: middle; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover { background: #F8FAFE; }
.dark .data-card { background: #1D293D; border-color: #3D5069; }
.dark .data-table th { color: #94A3B8; border-color: #3D5069; }
.dark .data-table td { color: #E2E8F0; border-color: #243553; }
.dark .data-table tbody tr:hover { background: #243553; }
.card-header-row { display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 14px; font-weight: 700; color: #133C65; }
.dark .card-title { color: #93B8D8; }

/* ── Badges ──────────────────────────── */
.badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.badge--green  { background: #F0FAF4; color: #166534; }
.badge--red    { background: #FEF2F2; color: #991B1B; }
.badge--orange { background: #FFF7ED; color: #C2410C; }
.badge--yellow { background: #FFFBEB; color: #92400E; }
.badge--blue   { background: #EBF3FF; color: #133C65; }
.dark .badge--green  { background: rgba(16,185,129,0.15); color: #6EE7B7; }
.dark .badge--red    { background: rgba(239,68,68,0.15);  color: #FCA5A5; }
.dark .badge--orange { background: rgba(234,88,12,0.15);  color: #FDBA74; }
.dark .badge--yellow { background: rgba(245,158,11,0.15); color: #FCD34D; }
.dark .badge--blue   { background: rgba(147,184,216,0.12); color: #93B8D8; }

/* ── Utilities ───────────────────────── */
.td-right  { text-align: right !important; }
.td-muted  { color: #7A90A0 !important; font-size: 12px; }
.td-sub    { font-size: 11px; color: #7A90A0; margin-top: 2px; }
.td-actions { white-space: nowrap; }
.fw-600    { font-weight: 600; }
.fw-700    { font-weight: 700; }
.txt-green { color: #166534; }
.txt-red   { color: #991B1B; }
.txt-yellow{ color: #92400E; }
.txt-navy  { color: #133C65; }
.dark .txt-green { color: #6EE7B7; }
.dark .txt-red   { color: #FCA5A5; }
.dark .txt-navy  { color: #93B8D8; }

/* ── Alertas ─────────────────────────── */
.alertas-card { overflow: visible; }
.alerta-row { display: flex; align-items: center; gap: 14px; padding: 13px 16px; border-bottom: 1px solid #F4F6F8; }
.alerta-row:last-child { border-bottom: none; }
.alerta-nivel-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.dot--critico  { background: #EF4444; }
.dot--alto     { background: #F97316; }
.dot--moderado { background: #F59E0B; }
.dot--bajo     { background: #22C55E; }
.alerta-body { flex: 1; min-width: 0; }
.alerta-titulo { font-size: 13px; font-weight: 600; color: #1A2B3C; }
.alerta-sub    { font-size: 12px; color: #4A6070; margin-top: 2px; }
.alerta-meta   { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
.dark .alerta-titulo { color: #E2E8F0; }
.dark .alerta-sub    { color: #94A3B8; }

/* ── Categorías resumen ──────────────── */
.categorias-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.cat-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 16px; text-align: center; }
.dark .cat-card { background: #1D293D; border-color: #3D5069; }
.cat-card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
.cat-card-nombre { font-size: 12px; font-weight: 700; color: #1A2B3C; margin-bottom: 2px; }
.cat-card-count  { font-size: 11px; color: #7A90A0; margin-bottom: 8px; }
.cat-bar-fill    { height: 4px; border-radius: 2px; transition: width 0.4s; }
.cat-card-bar    { background: #E8EEF4; height: 4px; border-radius: 2px; overflow: hidden; margin-bottom: 6px; }
.cat-card-critico{ font-size: 11px; font-weight: 700; color: #991B1B; }
.dark .cat-card-nombre { color: #E2E8F0; }

/* ── Matriz de riesgos ───────────────── */
.matriz-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; align-items: start; }
.matriz-wrap { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 24px; }
.dark .matriz-wrap { background: #1D293D; border-color: #3D5069; }
.matriz-title { font-size: 14px; font-weight: 700; color: #133C65; margin-bottom: 20px; }
.dark .matriz-title { color: #93B8D8; }
.matriz-container { display: flex; gap: 8px; align-items: center; }
.eje-y-label { writing-mode: vertical-lr; transform: rotate(180deg); font-size: 11px; font-weight: 700; color: #7A90A0; text-transform: uppercase; letter-spacing: 0.06em; }
.matriz-grid-wrap { flex: 1; }
.eje-x-headers { display: grid; grid-template-columns: 56px repeat(3, 1fr); gap: 6px; margin-bottom: 6px; }
.eje-corner { }
.eje-x-label { text-align: center; font-size: 11px; font-weight: 700; color: #7A90A0; text-transform: uppercase; }
.matriz-fila { display: grid; grid-template-columns: 56px repeat(3, 1fr); gap: 6px; margin-bottom: 6px; }
.eje-y-tick { display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; font-size: 11px; font-weight: 700; color: #7A90A0; text-transform: uppercase; }
.matriz-celda { border-radius: 10px; padding: 12px; min-height: 80px; display: flex; flex-direction: column; justify-content: space-between; border: 2px solid transparent; transition: transform 0.15s; cursor: default; }
.matriz-celda:hover { transform: scale(1.03); }
.matriz-celda--bajo     { background: #F0FAF4; border-color: #86EFAC; }
.matriz-celda--moderado { background: #FFFBEB; border-color: #FDE68A; }
.matriz-celda--alto     { background: #FFF7ED; border-color: #FED7AA; }
.matriz-celda--critico  { background: #FEF2F2; border-color: #FECACA; }
.dark .matriz-celda--bajo     { background: rgba(16,185,129,0.1);  border-color: rgba(16,185,129,0.3);  }
.dark .matriz-celda--moderado { background: rgba(245,158,11,0.1);  border-color: rgba(245,158,11,0.3);  }
.dark .matriz-celda--alto     { background: rgba(234,88,12,0.1);   border-color: rgba(234,88,12,0.3);   }
.dark .matriz-celda--critico  { background: rgba(239,68,68,0.12);  border-color: rgba(239,68,68,0.3);   }
.celda-nivel { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.matriz-celda--bajo .celda-nivel     { color: #166534; }
.matriz-celda--moderado .celda-nivel { color: #92400E; }
.matriz-celda--alto .celda-nivel     { color: #C2410C; }
.matriz-celda--critico .celda-nivel  { color: #991B1B; }
.celda-riesgos { display: flex; flex-wrap: wrap; gap: 4px; }
.celda-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 8px; background: rgba(0,0,0,0.06); color: #1A2B3C; }
.dark .celda-badge { background: rgba(255,255,255,0.1); color: #E2E8F0; }
.eje-x-bottom { display: grid; grid-template-columns: 56px 1fr; margin-top: 4px; }
.eje-corner-bottom {}
.eje-x-bottom-label { text-align: center; font-size: 11px; font-weight: 700; color: #7A90A0; text-transform: uppercase; }

.matriz-leyenda { display: flex; gap: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid #F0F4F8; flex-wrap: wrap; }
.leyenda-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #4A6070; }
.leyenda-dot { width: 12px; height: 12px; border-radius: 3px; }
.dot-nivel--bajo     { background: #86EFAC; }
.dot-nivel--moderado { background: #FDE68A; }
.dot-nivel--alto     { background: #FED7AA; }
.dot-nivel--critico  { background: #FECACA; }
.dark .leyenda-item { color: #94A3B8; }

.matriz-list { overflow: visible; }
.matriz-list-item { padding: 12px 16px; border-bottom: 1px solid #F4F6F8; }
.matriz-list-item:last-child { border-bottom: none; }
.mli-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.mli-nombre { font-size: 13px; color: #1A2B3C; margin-bottom: 5px; }
.mli-meta { display: flex; align-items: center; gap: 8px; }
.dark .mli-nombre { color: #E2E8F0; }
.dark .matriz-list-item { border-color: #243553; }

/* ── Planes progreso ─────────────────── */
.prog-wrap { display: flex; align-items: center; gap: 8px; }
.prog-bg   { flex: 1; height: 6px; background: #E8EEF4; border-radius: 3px; overflow: hidden; min-width: 60px; }
.prog-fill { height: 100%; border-radius: 3px; transition: width 0.4s; }
.prog--green { background: #22C55E; }
.prog--blue  { background: #3B82F6; }
.prog--red   { background: #EF4444; }
.prog-pct  { font-size: 11px; font-weight: 600; color: #4A6070; white-space: nowrap; }

/* ── Seguimiento tendencia ───────────── */
.tendencia { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; }
.tendencia--sube   { color: #991B1B; }
.tendencia--baja   { color: #166534; }
.tendencia--estable{ color: #4A6070; }
.dark .tendencia--baja   { color: #6EE7B7; }
.dark .tendencia--estable{ color: #94A3B8; }
.accion-req { font-size: 12px; color: #92400E; font-weight: 500; }

/* ── Reportes ────────────────────────── */
.reportes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.reporte-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.dark .reporte-card { background: #1D293D; border-color: #3D5069; }
.reporte-icon { width: 46px; height: 46px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.reporte-nombre { font-size: 14px; font-weight: 700; color: #1A2B3C; margin-bottom: 2px; }
.reporte-desc   { font-size: 12px; color: #4A6070; }
.dark .reporte-nombre { color: #E2E8F0; }
.dark .reporte-desc   { color: #94A3B8; }
.reporte-actions { display: flex; gap: 8px; align-items: center; margin-top: auto; }

/* ── Responsive ─────────────────────── */
@media (max-width: 1200px) {
  .categorias-grid { grid-template-columns: repeat(3, 1fr); }
  .matriz-layout { grid-template-columns: 1fr; }
}
@media (max-width: 1100px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .reportes-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .page-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .header-actions { width: 100%; }
  .kpi-row { grid-template-columns: 1fr 1fr; }
  .categorias-grid { grid-template-columns: repeat(2, 1fr); }
  .reportes-grid { grid-template-columns: 1fr; }
  .matriz-layout { grid-template-columns: 1fr; }
  .matriz-fila, .eje-x-headers { grid-template-columns: 44px repeat(3, 1fr); }
  .matriz-celda { min-height: 64px; padding: 8px; }
}
</style>
