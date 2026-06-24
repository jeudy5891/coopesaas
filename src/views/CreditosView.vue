<template>
  <div class="module-page">

    <!-- Encabezado -->
    <div class="page-header">
      <div>
        <h2 class="page-title">Créditos</h2>
        <p class="page-subtitle">Administración de préstamos, seguimiento de cartera y control de morosidad</p>
      </div>
      <div class="header-actions">
        <button v-if="['solicitudes','desembolsos','pagos'].includes(activeTab)" class="btn-primary" @click="modalOpen = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {{ modalLabel }}
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

    <!-- ═══════════════════ TAB: TIPOS DE CRÉDITO ═══════════════════ -->
    <template v-if="activeTab === 'tipos'">
      <div class="kpi-row">
        <div class="kpi-card"><div><div class="kpi-value">4</div><div class="kpi-label">Productos activos</div></div></div>
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">8%</div><div class="kpi-label">Tasa mínima (Vivienda)</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">240</div><div class="kpi-label">Plazo máximo (meses)</div></div></div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">₡5M</div><div class="kpi-label">Monto máximo general</div></div></div>
      </div>

      <div class="data-card">
        <div class="card-header-row" style="margin-bottom:0;padding:16px">
          <h3 class="card-title">Productos de crédito</h3>
          <button class="btn-primary btn-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nuevo tipo
          </button>
        </div>
        <table class="data-table">
          <thead><tr><th>Tipo de crédito</th><th>Tasa anual</th><th>Plazo máximo</th><th>Monto mínimo</th><th>Monto máximo</th><th>Requiere garantía</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            <tr v-for="t in tiposCredito" :key="t.id">
              <td><span class="fw-600">{{ t.nombre }}</span><div class="td-sub">{{ t.descripcion }}</div></td>
              <td class="fw-600 txt-navy">{{ t.tasa }}</td>
              <td>{{ t.plazo }}</td>
              <td class="td-muted">{{ t.montoMin }}</td>
              <td class="td-muted">{{ t.montoMax }}</td>
              <td><span :class="['badge', t.garantia ? 'badge--yellow' : 'badge--blue']">{{ t.garantia ? 'Sí' : 'No' }}</span></td>
              <td><span class="badge badge--green">Activo</span></td>
              <td class="td-actions"><button class="link-btn">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: SOLICITUDES ═══════════════════ -->
    <template v-if="activeTab === 'solicitudes'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">24</div><div class="kpi-label">Total solicitudes (mes)</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">7</div><div class="kpi-label">Pendientes de revisión</div></div></div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">14</div><div class="kpi-label">Aprobadas</div></div></div>
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">3</div><div class="kpi-label">Rechazadas</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar por asociado o N° solicitud..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todos los estados</option><option>Pendiente</option><option>En revisión</option><option>Aprobado</option><option>Rechazado</option></select>
        <select class="filter-select"><option>Todos los tipos</option><option>Personal</option><option>Emergencia</option><option>Vivienda</option><option>Educación</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>N° Solicitud</th><th>Asociado</th><th>Fecha</th><th>Tipo</th><th>Monto solicitado</th><th>Plazo</th><th>Destino</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>
            <tr v-for="s in solicitudes" :key="s.id">
              <td class="fw-600 txt-navy">{{ s.numero }}</td>
              <td>{{ s.asociado }}</td>
              <td class="td-muted">{{ s.fecha }}</td>
              <td><span class="badge badge--blue">{{ s.tipo }}</span></td>
              <td class="fw-600">{{ s.monto }}</td>
              <td class="td-muted">{{ s.plazo }}</td>
              <td class="td-muted">{{ s.destino }}</td>
              <td><span :class="['badge', estadoBadge(s.estado)]">{{ s.estado }}</span></td>
              <td><button class="link-btn" @click="activeTab = 'evaluacion'">Evaluar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: EVALUACIÓN ═══════════════════ -->
    <template v-if="activeTab === 'evaluacion'">
      <div class="eval-grid">

        <!-- Lista de solicitudes pendientes -->
        <div class="data-card eval-list">
          <div class="card-header-row" style="padding:14px 16px;margin-bottom:0">
            <h3 class="card-title">En evaluación</h3>
            <span class="badge badge--yellow">7 pendientes</span>
          </div>
          <div v-for="s in solicitudesEval" :key="s.id" class="eval-item" :class="{ 'eval-item--active': evalSelected === s.id }" @click="evalSelected = s.id">
            <div class="eval-item-header">
              <span class="fw-600">{{ s.asociado }}</span>
              <span class="fw-600 txt-navy">{{ s.monto }}</span>
            </div>
            <div class="eval-item-sub">
              <span class="td-muted">{{ s.numero }}</span>
              <span class="badge badge--blue" style="font-size:10px">{{ s.tipo }}</span>
            </div>
          </div>
        </div>

        <!-- Panel de evaluación -->
        <div v-if="evalSelected" class="eval-detail">
          <div class="eval-section">
            <div class="eval-section-title">Análisis financiero del asociado</div>
            <div class="eval-criteria-grid">
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Ingresos mensuales</span>
                <span class="eval-criteria-val txt-green">₡850.000</span>
              </div>
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Gastos mensuales</span>
                <span class="eval-criteria-val txt-red">₡420.000</span>
              </div>
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Deudas actuales</span>
                <span class="eval-criteria-val txt-red">₡180.000/mes</span>
              </div>
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Aportaciones acumuladas</span>
                <span class="eval-criteria-val txt-navy">₡1.240.000</span>
              </div>
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Historial de crédito</span>
                <span class="eval-criteria-val"><span class="badge badge--green">Sin mora</span></span>
              </div>
              <div class="eval-criteria-item">
                <span class="eval-criteria-label">Antigüedad como asociado</span>
                <span class="eval-criteria-val">4 años 3 meses</span>
              </div>
            </div>
          </div>

          <div class="eval-section">
            <div class="eval-section-title">Indicadores de riesgo</div>
            <div class="indicadores-grid">
              <div class="indicador-card indicador--green">
                <div class="ind-label">Capacidad de pago</div>
                <div class="ind-value">₡250.000/mes</div>
                <div class="ind-sub">Excedente disponible</div>
              </div>
              <div class="indicador-card indicador--yellow">
                <div class="ind-label">Relación cuota-ingreso</div>
                <div class="ind-value">28.2%</div>
                <div class="ind-sub">Máximo recomendado: 30%</div>
              </div>
              <div class="indicador-card indicador--green">
                <div class="ind-label">Nivel de endeudamiento</div>
                <div class="ind-value">21.2%</div>
                <div class="ind-sub">Sobre ingresos</div>
              </div>
              <div class="indicador-card indicador--green">
                <div class="ind-label">Riesgo</div>
                <div class="ind-value">Bajo</div>
                <div class="ind-sub">Score 720/850</div>
              </div>
            </div>
          </div>

          <div class="eval-section eval-section--last">
            <div class="eval-section-title">Decisión</div>
            <div class="decision-btns">
              <button class="btn-decision btn-decision--approve">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Aprobar
              </button>
              <button class="btn-decision btn-decision--condition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Aprobar con condiciones
              </button>
              <button class="btn-decision btn-decision--reject">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Rechazar
              </button>
            </div>
            <textarea class="eval-obs" placeholder="Observaciones de la evaluación..."></textarea>
          </div>
        </div>

        <div v-else class="eval-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>
          <p>Selecciona una solicitud para evaluar</p>
        </div>

      </div>
    </template>

    <!-- ═══════════════════ TAB: GARANTÍAS ═══════════════════ -->
    <template v-if="activeTab === 'garantias'">
      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar por crédito o asociado..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todos los tipos</option><option>Fiador</option><option>Aportaciones</option><option>Prenda</option><option>Hipoteca</option><option>Certificado</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Vigente</option><option>Liberada</option><option>Ejecutada</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>N° Crédito</th><th>Asociado</th><th>Tipo garantía</th><th>Descripción</th><th>Valor estimado</th><th>Estado garantía</th><th>Estado crédito</th></tr></thead>
          <tbody>
            <tr v-for="g in garantias" :key="g.id">
              <td class="fw-600 txt-navy">{{ g.credito }}</td>
              <td>{{ g.asociado }}</td>
              <td><span class="badge badge--blue">{{ g.tipo }}</span></td>
              <td class="td-muted">{{ g.descripcion }}</td>
              <td class="fw-600">{{ g.valor }}</td>
              <td><span :class="['badge', g.estadoGar === 'Vigente' ? 'badge--green' : g.estadoGar === 'Liberada' ? 'badge--blue' : 'badge--red']">{{ g.estadoGar }}</span></td>
              <td><span :class="['badge', g.estadoCred === 'Activo' ? 'badge--green' : 'badge--yellow']">{{ g.estadoCred }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: DESEMBOLSOS ═══════════════════ -->
    <template v-if="activeTab === 'desembolsos'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">₡18.500.000</div><div class="kpi-label">Desembolsado este mes</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">12</div><div class="kpi-label">Créditos desembolsados</div></div></div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">₡1.541.667</div><div class="kpi-label">Promedio por crédito</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">2</div><div class="kpi-label">Pendientes de desembolso</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar desembolso..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todos los métodos</option><option>Transferencia</option><option>Cheque</option><option>Efectivo</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>N° Crédito</th><th>Asociado</th><th>Tipo crédito</th><th>Monto</th><th>Cuenta bancaria</th><th>Método</th><th>Responsable</th><th>Estado</th></tr></thead>
          <tbody>
            <tr v-for="d in desembolsos" :key="d.id">
              <td class="td-muted">{{ d.fecha }}</td>
              <td class="fw-600 txt-navy">{{ d.credito }}</td>
              <td>{{ d.asociado }}</td>
              <td><span class="badge badge--blue">{{ d.tipo }}</span></td>
              <td class="fw-600">{{ d.monto }}</td>
              <td class="td-muted">{{ d.cuenta }}</td>
              <td><span class="badge badge--blue">{{ d.metodo }}</span></td>
              <td class="td-muted">{{ d.responsable }}</td>
              <td><span :class="['badge', d.estado === 'Procesado' ? 'badge--green' : 'badge--yellow']">{{ d.estado }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: CRÉDITOS ACTIVOS ═══════════════════ -->
    <template v-if="activeTab === 'activos'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--navy">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
          <div><div class="kpi-value">₡124.350.000</div><div class="kpi-label">Cartera total activa</div></div>
        </div>
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">87</div><div class="kpi-label">Créditos activos</div></div></div>
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">9</div><div class="kpi-label">En mora</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">7.2%</div><div class="kpi-label">Índice de morosidad</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar por asociado o N° crédito..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todos los estados</option><option>Activo</option><option>Moroso</option><option>Reestructurado</option><option>Castigado</option></select>
        <select class="filter-select"><option>Todos los tipos</option><option>Personal</option><option>Emergencia</option><option>Vivienda</option><option>Educación</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>N° Crédito</th><th>Asociado</th><th>Tipo</th><th>Monto original</th><th>Saldo actual</th><th>Cuota mensual</th><th>Próximo vcto.</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>
            <tr v-for="c in creditosActivos" :key="c.id">
              <td class="fw-600 txt-navy">{{ c.numero }}</td>
              <td>{{ c.asociado }}</td>
              <td><span class="badge badge--blue">{{ c.tipo }}</span></td>
              <td class="td-muted">{{ c.montoOriginal }}</td>
              <td class="fw-600">{{ c.saldo }}</td>
              <td class="td-muted">{{ c.cuota }}</td>
              <td :class="c.vencido ? 'txt-red fw-600' : 'td-muted'">{{ c.proximo }}</td>
              <td><span :class="['badge', estadoCreditoBadge(c.estado)]">{{ c.estado }}</span></td>
              <td><button class="link-btn">Ver detalle</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: PAGOS ═══════════════════ -->
    <template v-if="activeTab === 'pagos'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">₡9.840.000</div><div class="kpi-label">Recaudado este mes</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">68</div><div class="kpi-label">Pagos del mes</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡144.706</div><div class="kpi-label">Promedio por pago</div></div></div>
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">₡1.200.000</div><div class="kpi-label">Abonos extraordinarios</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar por crédito o asociado..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todos los tipos</option><option>Pago de cuota</option><option>Abono extraordinario</option><option>Cancelación total</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Aplicado</option><option>Pendiente</option><option>Anulado</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>N° Crédito</th><th>Asociado</th><th>Tipo de pago</th><th>Saldo anterior</th><th>Monto pagado</th><th>Saldo nuevo</th><th>Responsable</th><th>Estado</th></tr></thead>
          <tbody>
            <tr v-for="p in pagos" :key="p.id">
              <td class="td-muted">{{ p.fecha }}</td>
              <td class="fw-600 txt-navy">{{ p.credito }}</td>
              <td>{{ p.asociado }}</td>
              <td><span :class="['badge', p.tipo === 'Pago de cuota' ? 'badge--blue' : p.tipo === 'Abono extraordinario' ? 'badge--yellow' : 'badge--green']">{{ p.tipo }}</span></td>
              <td class="td-muted">{{ p.saldoAnt }}</td>
              <td class="fw-600 txt-green">{{ p.monto }}</td>
              <td class="fw-600">{{ p.saldoNuevo }}</td>
              <td class="td-muted">{{ p.responsable }}</td>
              <td><span class="badge badge--green">{{ p.estado }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: MOROSIDAD ═══════════════════ -->
    <template v-if="activeTab === 'morosidad'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--red">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div><div class="kpi-value">₡8.960.000</div><div class="kpi-label">Monto en mora</div></div>
        </div>
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">9</div><div class="kpi-label">Créditos morosos</div></div></div>
        <div class="kpi-card kpi-card--yellow"><div><div class="kpi-value">7.2%</div><div class="kpi-label">Índice de morosidad</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">4</div><div class="kpi-label">Gestiones esta semana</div></div></div>
      </div>

      <!-- Clasificación por días de atraso -->
      <div class="mora-clasificacion">
        <div v-for="cl in clasificacionMora" :key="cl.dias" class="mora-clase" :class="`mora-clase--${cl.color}`">
          <div class="mora-clase-dias">{{ cl.dias }}</div>
          <div class="mora-clase-label">{{ cl.label }}</div>
          <div class="mora-clase-count">{{ cl.count }} créditos</div>
          <div class="mora-clase-monto">{{ cl.monto }}</div>
        </div>
      </div>

      <div class="data-card">
        <div class="card-header-row" style="padding:14px 16px 0">
          <h3 class="card-title">Listado de morosos</h3>
          <div style="display:flex;gap:8px">
            <button class="btn-outline btn-sm">Exportar</button>
            <button class="btn-primary btn-sm">Nueva gestión</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>N° Crédito</th><th>Asociado</th><th>Tipo</th><th>Saldo en mora</th><th>Días de atraso</th><th>Clasificación</th><th>Última gestión</th><th>Próxima acción</th><th>Seguimiento</th></tr></thead>
          <tbody>
            <tr v-for="m in morosos" :key="m.id">
              <td class="fw-600 txt-navy">{{ m.credito }}</td>
              <td>{{ m.asociado }}</td>
              <td><span class="badge badge--blue">{{ m.tipo }}</span></td>
              <td class="fw-600 txt-red">{{ m.saldoMora }}</td>
              <td :class="m.dias > 90 ? 'txt-red fw-600' : m.dias > 60 ? 'txt-yellow fw-600' : ''">{{ m.dias }} días</td>
              <td><span :class="['badge', moraBadge(m.dias)]">{{ moraLabel(m.dias) }}</span></td>
              <td class="td-muted">{{ m.ultimaGestion }}</td>
              <td class="td-muted">{{ m.proximaAccion }}</td>
              <td><button class="link-btn">Ver historial</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ═══════════════════ TAB: REPORTES ═══════════════════ -->
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
            <select class="filter-select filter-select--sm"><option>Junio 2026</option><option>Mayo 2026</option><option>2025</option></select>
            <button class="btn-primary btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Generar
            </button>
          </div>
        </div>
      </div>

      <!-- Resumen de cartera rápido -->
      <div class="data-card" style="margin-top:4px">
        <div class="card-header-row" style="padding:16px;margin-bottom:0">
          <h3 class="card-title">Resumen de cartera — Junio 2026</h3>
        </div>
        <table class="data-table">
          <thead><tr><th>Tipo de crédito</th><th class="td-right">Créditos activos</th><th class="td-right">Saldo total</th><th class="td-right">Cuota promedio</th><th class="td-right">En mora</th><th class="td-right">% Mora</th></tr></thead>
          <tbody>
            <tr v-for="rc in resumenCartera" :key="rc.tipo">
              <td class="fw-600">{{ rc.tipo }}</td>
              <td class="td-right">{{ rc.activos }}</td>
              <td class="td-right fw-600">{{ rc.saldo }}</td>
              <td class="td-right td-muted">{{ rc.cuotaProm }}</td>
              <td class="td-right" :class="parseInt(rc.mora) > 0 ? 'txt-red' : 'td-muted'">{{ rc.mora }}</td>
              <td class="td-right"><span :class="['badge', parseFloat(rc.pctMora) > 10 ? 'badge--red' : parseFloat(rc.pctMora) > 5 ? 'badge--yellow' : 'badge--green']">{{ rc.pctMora }}</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="tfoot-total">
              <td><strong>TOTAL</strong></td>
              <td class="td-right"><strong>87</strong></td>
              <td class="td-right"><strong>₡124.350.000</strong></td>
              <td class="td-right"><strong>₡144.706</strong></td>
              <td class="td-right txt-red"><strong>9</strong></td>
              <td class="td-right"><strong>7.2%</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('activos')
const modalOpen = ref(false)
const evalSelected = ref(1)

const tabs = [
  { key: 'tipos',        label: 'Tipos de crédito', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
  { key: 'solicitudes',  label: 'Solicitudes',       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>` },
  { key: 'evaluacion',   label: 'Evaluación',        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { key: 'garantias',    label: 'Garantías',          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
  { key: 'desembolsos',  label: 'Desembolsos',        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { key: 'activos',      label: 'Créditos activos',  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` },
  { key: 'pagos',        label: 'Pagos',              icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>` },
  { key: 'morosidad',    label: 'Morosidad',          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
  { key: 'reportes',     label: 'Reportes',           icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
]

const modalLabel = ref('Nueva solicitud')

const tiposCredito = [
  { id: 1, nombre: 'Personal',   descripcion: 'Préstamo de libre consumo', tasa: '12% anual', plazo: '60 meses',  montoMin: '₡50.000',   montoMax: '₡2.000.000', garantia: false },
  { id: 2, nombre: 'Emergencia', descripcion: 'Atención de emergencias',    tasa: '10% anual', plazo: '24 meses',  montoMin: '₡25.000',   montoMax: '₡500.000',   garantia: false },
  { id: 3, nombre: 'Vivienda',   descripcion: 'Compra o mejora de vivienda',tasa: '8% anual',  plazo: '240 meses', montoMin: '₡500.000',  montoMax: '₡50.000.000',garantia: true  },
  { id: 4, nombre: 'Educación',  descripcion: 'Estudios y capacitación',    tasa: '9% anual',  plazo: '84 meses',  montoMin: '₡100.000',  montoMax: '₡5.000.000', garantia: false },
]

const solicitudes = [
  { id: 1, numero: 'SOL-2406-001', asociado: 'Carlos Mora Jiménez',    fecha: '24/06/2026', tipo: 'Personal',   monto: '₡400.000',   plazo: '24 meses', destino: 'Consumo personal', estado: 'Pendiente'  },
  { id: 2, numero: 'SOL-2406-002', asociado: 'Ana Solís Rojas',        fecha: '23/06/2026', tipo: 'Educación',  monto: '₡800.000',   plazo: '36 meses', destino: 'Universidad',      estado: 'En revisión'},
  { id: 3, numero: 'SOL-2406-003', asociado: 'Luis Ureña Vargas',      fecha: '22/06/2026', tipo: 'Emergencia', monto: '₡200.000',   plazo: '12 meses', destino: 'Gastos médicos',   estado: 'Aprobado'   },
  { id: 4, numero: 'SOL-2406-004', asociado: 'María Campos Blanco',    fecha: '20/06/2026', tipo: 'Personal',   monto: '₡1.200.000', plazo: '48 meses', destino: 'Vehículo',         estado: 'Aprobado'   },
  { id: 5, numero: 'SOL-2406-005', asociado: 'Jorge Sandoval Cruz',    fecha: '18/06/2026', tipo: 'Vivienda',   monto: '₡8.000.000', plazo: '120 meses',destino: 'Remodelación',     estado: 'En revisión'},
  { id: 6, numero: 'SOL-2406-006', asociado: 'Patricia Flores Mora',   fecha: '15/06/2026', tipo: 'Personal',   monto: '₡350.000',   plazo: '18 meses', destino: 'Deudas',           estado: 'Rechazado'  },
]

const solicitudesEval = solicitudes.filter(s => ['Pendiente','En revisión'].includes(s.estado))

const garantias = [
  { id: 1, credito: 'CRE-2026-031', asociado: 'Carlos Mora Jiménez',  tipo: 'Fiador',       descripcion: 'Fiador solidario',          valor: '₡800.000',    estadoGar: 'Vigente',  estadoCred: 'Activo' },
  { id: 2, credito: 'CRE-2026-018', asociado: 'María Campos Blanco',  tipo: 'Hipoteca',     descripcion: 'Casa habitación, Alajuela', valor: '₡45.000.000', estadoGar: 'Vigente',  estadoCred: 'Activo' },
  { id: 3, credito: 'CRE-2025-092', asociado: 'Luis Ureña Vargas',    tipo: 'Aportaciones', descripcion: 'Garantía sobre aportaciones',valor: '₡1.240.000',  estadoGar: 'Vigente',  estadoCred: 'Moroso' },
  { id: 4, credito: 'CRE-2025-071', asociado: 'Jorge Sandoval Cruz',  tipo: 'Certificado',  descripcion: 'CDP Banco Nacional',        valor: '₡2.500.000',  estadoGar: 'Liberada', estadoCred: 'Activo' },
  { id: 5, credito: 'CRE-2025-044', asociado: 'Ana Solís Rojas',      tipo: 'Prenda',       descripcion: 'Vehículo 2020 Toyota',      valor: '₡6.000.000',  estadoGar: 'Vigente',  estadoCred: 'Activo' },
]

const desembolsos = [
  { id: 1, fecha: '24/06/2026', credito: 'CRE-2026-035', asociado: 'Carlos Mora Jiménez', tipo: 'Personal',   monto: '₡400.000',   cuenta: 'BN **3421', metodo: 'Transferencia', responsable: 'J. Paniagua', estado: 'Procesado' },
  { id: 2, fecha: '22/06/2026', credito: 'CRE-2026-034', asociado: 'Luis Ureña Vargas',   tipo: 'Emergencia', monto: '₡200.000',   cuenta: 'BCR **8821',metodo: 'Transferencia', responsable: 'M. Vargas',   estado: 'Procesado' },
  { id: 3, fecha: '20/06/2026', credito: 'CRE-2026-033', asociado: 'María Campos Blanco', tipo: 'Personal',   monto: '₡1.200.000', cuenta: 'BN **6612', metodo: 'Transferencia', responsable: 'J. Paniagua', estado: 'Procesado' },
  { id: 4, fecha: '18/06/2026', credito: 'CRE-2026-032', asociado: 'Ana Solís Rojas',     tipo: 'Educación',  monto: '₡800.000',   cuenta: 'BN **1134', metodo: 'Cheque',         responsable: 'M. Vargas',   estado: 'Procesado' },
  { id: 5, fecha: '25/06/2026', credito: 'CRE-2026-036', asociado: 'Jorge Sandoval Cruz', tipo: 'Vivienda',   monto: '₡8.000.000', cuenta: 'BCR **4490',metodo: 'Transferencia', responsable: 'J. Paniagua', estado: 'Pendiente' },
]

const creditosActivos = [
  { id: 1, numero: 'CRE-2026-031', asociado: 'Carlos Mora Jiménez', tipo: 'Personal',   montoOriginal: '₡400.000',    saldo: '₡388.000',     cuota: '₡18.500',   proximo: '24/07/2026', vencido: false, estado: 'Activo'        },
  { id: 2, numero: 'CRE-2026-018', asociado: 'María Campos Blanco', tipo: 'Vivienda',   montoOriginal: '₡15.000.000', saldo: '₡14.200.000',  cuota: '₡185.000',  proximo: '01/07/2026', vencido: false, estado: 'Activo'        },
  { id: 3, numero: 'CRE-2025-092', asociado: 'Luis Ureña Vargas',   tipo: 'Personal',   montoOriginal: '₡600.000',    saldo: '₡312.000',     cuota: '₡22.000',   proximo: '15/06/2026', vencido: true,  estado: 'Moroso'        },
  { id: 4, numero: 'CRE-2025-071', asociado: 'Jorge Sandoval Cruz', tipo: 'Educación',  montoOriginal: '₡2.000.000',  saldo: '₡1.650.000',   cuota: '₡35.000',   proximo: '30/06/2026', vencido: true,  estado: 'Moroso'        },
  { id: 5, numero: 'CRE-2025-044', asociado: 'Ana Solís Rojas',     tipo: 'Personal',   montoOriginal: '₡800.000',    saldo: '₡450.000',     cuota: '₡28.000',   proximo: '05/07/2026', vencido: false, estado: 'Activo'        },
  { id: 6, numero: 'CRE-2025-033', asociado: 'Patricia Flores',     tipo: 'Personal',   montoOriginal: '₡500.000',    saldo: '₡198.000',     cuota: '₡19.500',   proximo: '10/07/2026', vencido: false, estado: 'Reestructurado' },
  { id: 7, numero: 'CRE-2024-118', asociado: 'Roberto Vega Mora',   tipo: 'Emergencia', montoOriginal: '₡250.000',    saldo: '₡89.000',      cuota: '₡12.000',   proximo: '20/07/2026', vencido: false, estado: 'Activo'        },
]

const pagos = [
  { id: 1, fecha: '24/06/2026', credito: 'CRE-2026-031', asociado: 'Carlos Mora Jiménez',  tipo: 'Pago de cuota',       saldoAnt: '₡406.500',   monto: '₡18.500',   saldoNuevo: '₡388.000', responsable: 'Sistema', estado: 'Aplicado' },
  { id: 2, fecha: '23/06/2026', credito: 'CRE-2026-018', asociado: 'María Campos Blanco',  tipo: 'Pago de cuota',       saldoAnt: '₡14.385.000',monto: '₡185.000',  saldoNuevo: '₡14.200.000',responsable: 'Sistema',estado: 'Aplicado' },
  { id: 3, fecha: '22/06/2026', credito: 'CRE-2025-044', asociado: 'Ana Solís Rojas',      tipo: 'Abono extraordinario',saldoAnt: '₡478.000',   monto: '₡28.000',   saldoNuevo: '₡450.000', responsable: 'J. Paniagua',estado: 'Aplicado'},
  { id: 4, fecha: '20/06/2026', credito: 'CRE-2025-033', asociado: 'Patricia Flores Mora', tipo: 'Pago de cuota',       saldoAnt: '₡217.500',   monto: '₡19.500',   saldoNuevo: '₡198.000', responsable: 'Sistema', estado: 'Aplicado' },
  { id: 5, fecha: '18/06/2026', credito: 'CRE-2024-118', asociado: 'Roberto Vega Mora',    tipo: 'Cancelación total',   saldoAnt: '₡101.000',   monto: '₡101.000',  saldoNuevo: '₡0',       responsable: 'J. Paniagua',estado: 'Aplicado'},
]

const morosos = [
  { id: 1, credito: 'CRE-2025-092', asociado: 'Luis Ureña Vargas',   tipo: 'Personal',   saldoMora: '₡44.000',    dias: 9,   ultimaGestion: '20/06/2026', proximaAccion: 'Llamada de cobro'    },
  { id: 2, credito: 'CRE-2025-071', asociado: 'Jorge Sandoval Cruz', tipo: 'Educación',  saldoMora: '₡105.000',   dias: 24,  ultimaGestion: '18/06/2026', proximaAccion: 'Notificación escrita' },
  { id: 3, credito: 'CRE-2024-085', asociado: 'Ramón Quesada Arce',  tipo: 'Personal',   saldoMora: '₡198.000',   dias: 55,  ultimaGestion: '10/06/2026', proximaAccion: 'Cobro formal'         },
  { id: 4, credito: 'CRE-2024-061', asociado: 'Silvia Monge López',  tipo: 'Educación',  saldoMora: '₡310.000',   dias: 72,  ultimaGestion: '05/06/2026', proximaAccion: 'Arreglo de pago'      },
  { id: 5, credito: 'CRE-2023-044', asociado: 'Fernando Arce Mena',  tipo: 'Personal',   saldoMora: '₡780.000',   dias: 118, ultimaGestion: '01/06/2026', proximaAccion: 'Proceso legal'        },
]

const clasificacionMora = [
  { dias: '1–30 días',  label: 'Temprana', count: 2, monto: '₡149.000',   color: 'yellow' },
  { dias: '31–60 días', label: 'Media',    count: 2, monto: '₡508.000',   color: 'orange' },
  { dias: '61–90 días', label: 'Alta',     count: 4, monto: '₡7.523.000', color: 'red'    },
  { dias: '+90 días',   label: 'Crítica',  count: 1, monto: '₡780.000',   color: 'dark'   },
]

const reportes = [
  { id: 1, nombre: 'Cartera de crédito',     descripcion: 'Estado de todos los préstamos activos por tipo y monto.', bg: '#EBF3FF', color: '#133C65', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>` },
  { id: 2, nombre: 'Índice de morosidad',    descripcion: 'Análisis de créditos atrasados por período y clasificación.', bg: '#FEF2F2', color: '#991B1B', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>` },
  { id: 3, nombre: 'Colocaciones del mes',   descripcion: 'Nuevos créditos otorgados, montos y tipos en el período.', bg: '#F0FAF4', color: '#166534', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>` },
  { id: 4, nombre: 'Recuperación',           descripcion: 'Pagos recibidos, amortizaciones y cancelaciones del período.', bg: '#FFFBEB', color: '#92400E', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
  { id: 5, nombre: 'Vencimientos próximos',  descripcion: 'Créditos con cuotas que vencen en los próximos 30 días.', bg: '#F0FAF4', color: '#166534', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
  { id: 6, nombre: 'Gestiones de cobro',     descripcion: 'Historial de acciones de cobro sobre créditos morosos.', bg: '#EBF3FF', color: '#133C65', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>` },
]

const resumenCartera = [
  { tipo: 'Personal',   activos: 42, saldo: '₡38.400.000',  cuotaProm: '₡92.000',  mora: '5',  pctMora: '11.9%' },
  { tipo: 'Emergencia', activos: 18, saldo: '₡6.750.000',   cuotaProm: '₡48.000',  mora: '2',  pctMora: '11.1%' },
  { tipo: 'Vivienda',   activos: 12, saldo: '₡72.400.000',  cuotaProm: '₡380.000', mora: '1',  pctMora: '8.3%'  },
  { tipo: 'Educación',  activos: 15, saldo: '₡6.800.000',   cuotaProm: '₡95.000',  mora: '1',  pctMora: '6.7%'  },
]

// Helpers
function estadoBadge(estado) {
  return { 'Pendiente': 'badge--yellow', 'En revisión': 'badge--blue', 'Aprobado': 'badge--green', 'Rechazado': 'badge--red' }[estado] || 'badge--blue'
}
function estadoCreditoBadge(estado) {
  return { 'Activo': 'badge--green', 'Moroso': 'badge--red', 'Reestructurado': 'badge--yellow', 'Cancelado': 'badge--blue', 'Castigado': 'badge--red' }[estado] || 'badge--blue'
}
function moraBadge(dias) {
  if (dias > 90) return 'badge--red'
  if (dias > 60) return 'badge--red'
  if (dias > 30) return 'badge--yellow'
  return 'badge--yellow'
}
function moraLabel(dias) {
  if (dias > 90) return 'Crítica'
  if (dias > 60) return 'Alta'
  if (dias > 30) return 'Media'
  return 'Temprana'
}
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
.btn-outline { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: white; color: #133C65; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
.btn-outline:hover { background: #EBF3FF; border-color: #133C65; }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.link-btn { background: none; border: none; color: #1B5490; font-size: 12px; cursor: pointer; padding: 0; }
.link-btn:hover { text-decoration: underline; }
.dark .btn-outline { background: #1D293D; color: #93B8D8; border-color: #3D5069; }
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
.kpi-card--navy   { background: #133C65; border-color: #133C65; color: white; }
.kpi-card--green  { background: #F0FAF4; border-color: #B7E4CC; }
.kpi-card--red    { background: #FEF2F2; border-color: #FECACA; }
.kpi-card--yellow { background: #FFFBEB; border-color: #FDE68A; }
.kpi-value { font-size: 20px; font-weight: 700; color: #133C65; white-space: nowrap; }
.kpi-card--navy .kpi-value   { color: white; }
.kpi-card--green .kpi-value  { color: #166534; }
.kpi-card--red .kpi-value    { color: #991B1B; }
.kpi-card--yellow .kpi-value { color: #92400E; }
.kpi-label { font-size: 12px; color: #4A6070; margin-top: 2px; }
.kpi-card--navy .kpi-label { color: rgba(255,255,255,0.7); }
.kpi-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(255,255,255,0.15); color: white; }
.kpi-card--red .kpi-icon { background: #FEE2E2; color: #991B1B; }
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
.tfoot-total td { border-top: 2px solid #D4E4F4; padding: 12px 14px; background: #F5F7FB; font-size: 13px; }
.dark .data-card { background: #1D293D; border-color: #3D5069; }
.dark .data-table th { color: #94A3B8; border-color: #3D5069; }
.dark .data-table td { color: #E2E8F0; border-color: #243553; }
.dark .data-table tbody tr:hover { background: #243553; }
.dark .tfoot-total td { background: #162033; border-color: #3D5069; color: #E2E8F0; }
.card-header-row { display: flex; align-items: center; justify-content: space-between; }
.card-title { font-size: 14px; font-weight: 700; color: #133C65; }
.dark .card-title { color: #93B8D8; }

/* ── Badges ──────────────────────────── */
.badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.badge--green  { background: #F0FAF4; color: #166534; }
.badge--red    { background: #FEF2F2; color: #991B1B; }
.badge--yellow { background: #FFFBEB; color: #92400E; }
.badge--blue   { background: #EBF3FF; color: #133C65; }
.dark .badge--green  { background: rgba(16,185,129,0.15); color: #6EE7B7; }
.dark .badge--red    { background: rgba(239,68,68,0.15);  color: #FCA5A5; }
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

/* ── Evaluación ──────────────────────── */
.eval-grid { display: grid; grid-template-columns: 300px 1fr; gap: 20px; align-items: start; }
.eval-list { overflow: visible; }
.eval-item { padding: 12px 16px; border-bottom: 1px solid #F4F6F8; cursor: pointer; transition: background 0.15s; }
.eval-item:last-child { border-bottom: none; }
.eval-item:hover { background: #F8FAFE; }
.eval-item--active { background: #EBF3FF; border-left: 3px solid #133C65; }
.eval-item-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 4px; }
.eval-item-sub { display: flex; align-items: center; gap: 8px; }
.dark .eval-item:hover { background: #243553; }
.dark .eval-item--active { background: #1D3A5E; border-color: #1B5490; }

.eval-detail { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 20px; }
.dark .eval-detail { background: #1D293D; border-color: #3D5069; }
.eval-section { border-bottom: 1px solid #F0F4F8; padding-bottom: 18px; }
.eval-section--last { border-bottom: none; padding-bottom: 0; }
.eval-section-title { font-size: 13px; font-weight: 700; color: #133C65; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.04em; }
.dark .eval-section-title { color: #93B8D8; }
.eval-criteria-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.eval-criteria-item { display: flex; justify-content: space-between; align-items: center; padding: 9px 12px; background: #F8FAFE; border-radius: 8px; font-size: 13px; }
.eval-criteria-label { color: #4A6070; }
.eval-criteria-val   { font-weight: 600; }
.dark .eval-criteria-item { background: #162033; }
.dark .eval-criteria-label { color: #94A3B8; }
.dark .eval-criteria-val   { color: #E2E8F0; }

.indicadores-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.indicador-card { padding: 14px; border-radius: 10px; border: 1px solid #E8EEF4; text-align: center; }
.indicador--green { background: #F0FAF4; border-color: #B7E4CC; }
.indicador--yellow { background: #FFFBEB; border-color: #FDE68A; }
.indicador--red    { background: #FEF2F2; border-color: #FECACA; }
.ind-label { font-size: 11px; color: #4A6070; margin-bottom: 6px; }
.ind-value { font-size: 18px; font-weight: 700; color: #133C65; }
.indicador--green .ind-value  { color: #166534; }
.indicador--yellow .ind-value { color: #92400E; }
.indicador--red .ind-value    { color: #991B1B; }
.ind-sub   { font-size: 10px; color: #7A90A0; margin-top: 4px; }

.decision-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.btn-decision { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; border: 2px solid; cursor: pointer; transition: all 0.15s; }
.btn-decision--approve  { background: #F0FAF4; color: #166534; border-color: #22C55E; }
.btn-decision--approve:hover { background: #22C55E; color: white; }
.btn-decision--condition{ background: #FFFBEB; color: #92400E; border-color: #F59E0B; }
.btn-decision--condition:hover { background: #F59E0B; color: white; }
.btn-decision--reject   { background: #FEF2F2; color: #991B1B; border-color: #EF4444; }
.btn-decision--reject:hover   { background: #EF4444; color: white; }
.eval-obs { width: 100%; min-height: 72px; padding: 10px 12px; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; resize: vertical; color: #1A2B3C; background: white; box-sizing: border-box; }
.eval-obs:focus { outline: none; border-color: #133C65; }
.dark .eval-obs { background: #162033; border-color: #3D5069; color: #E2E8F0; }

.eval-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 60px 20px; color: #7A90A0; font-size: 14px; background: white; border: 1px dashed #D4E4F4; border-radius: 12px; }
.dark .eval-empty { background: #1D293D; border-color: #3D5069; }

/* ── Morosidad ───────────────────────── */
.mora-clasificacion { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.mora-clase { border-radius: 12px; padding: 18px; text-align: center; border: 1px solid; }
.mora-clase--yellow { background: #FFFBEB; border-color: #FDE68A; }
.mora-clase--orange { background: #FFF7ED; border-color: #FED7AA; }
.mora-clase--red    { background: #FEF2F2; border-color: #FECACA; }
.mora-clase--dark   { background: #1A0A0A; border-color: #991B1B; }
.mora-clase-dias    { font-size: 18px; font-weight: 800; margin-bottom: 2px; }
.mora-clase--yellow .mora-clase-dias { color: #92400E; }
.mora-clase--orange .mora-clase-dias { color: #C2410C; }
.mora-clase--red .mora-clase-dias    { color: #991B1B; }
.mora-clase--dark .mora-clase-dias   { color: #FCA5A5; }
.mora-clase-label   { font-size: 13px; font-weight: 600; color: #4A6070; margin-bottom: 8px; }
.mora-clase--dark .mora-clase-label  { color: #FCA5A5; }
.mora-clase-count   { font-size: 24px; font-weight: 700; }
.mora-clase--yellow .mora-clase-count { color: #92400E; }
.mora-clase--orange .mora-clase-count { color: #C2410C; }
.mora-clase--red .mora-clase-count    { color: #991B1B; }
.mora-clase--dark .mora-clase-count   { color: #FCA5A5; }
.mora-clase-monto   { font-size: 12px; color: #7A90A0; margin-top: 4px; }
.mora-clase--dark .mora-clase-monto   { color: #94A3B8; }

/* ── Reportes ────────────────────────── */
.reportes-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.reporte-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 12px; }
.dark .reporte-card { background: #1D293D; border-color: #3D5069; }
.reporte-icon { width: 46px; height: 46px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.reporte-nombre { font-size: 14px; font-weight: 700; color: #1A2B3C; margin-bottom: 2px; }
.reporte-desc   { font-size: 12px; color: #4A6070; }
.dark .reporte-nombre { color: #E2E8F0; }
.dark .reporte-desc   { color: #94A3B8; }
.reporte-actions { display: flex; gap: 8px; align-items: center; margin-top: auto; }

/* ── Responsive ─────────────────────── */
@media (max-width: 1100px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .eval-grid { grid-template-columns: 260px 1fr; }
  .indicadores-grid { grid-template-columns: 1fr 1fr; }
  .reportes-grid { grid-template-columns: 1fr 1fr; }
  .mora-clasificacion { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .page-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .header-actions { width: 100%; }
  .kpi-row { grid-template-columns: 1fr 1fr; }
  .eval-grid { grid-template-columns: 1fr; }
  .eval-criteria-grid { grid-template-columns: 1fr; }
  .indicadores-grid { grid-template-columns: 1fr 1fr; }
  .decision-btns { flex-direction: column; }
  .reportes-grid { grid-template-columns: 1fr; }
  .mora-clasificacion { grid-template-columns: 1fr 1fr; }
}
</style>
