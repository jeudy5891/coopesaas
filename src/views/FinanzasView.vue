<template>
  <div class="module-page">

    <!-- Encabezado -->
    <div class="page-header">
      <div>
        <h2 class="page-title">Finanzas</h2>
        <p class="page-subtitle">Control financiero integral de la cooperativa</p>
      </div>
      <div class="header-actions">
        <button class="btn-outline" @click="periodoOpen = !periodoOpen">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {{ periodoLabel }}
        </button>
        <button v-if="activeTab !== 'catalogo' && activeTab !== 'conciliacion'" class="btn-primary" @click="modalOpen = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nuevo registro
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

    <!-- ══════════════════════════ TAB: RESUMEN ══════════════════════════ -->
    <template v-if="activeTab === 'resumen'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--navy">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
          <div><div class="kpi-value">₡45.350.000</div><div class="kpi-label">Saldo total (Caja + Bancos)</div></div>
        </div>
        <div class="kpi-card kpi-card--green">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
          <div><div class="kpi-value">₡8.250.000</div><div class="kpi-label">Ingresos del mes</div></div>
        </div>
        <div class="kpi-card kpi-card--red">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg></div>
          <div><div class="kpi-value">₡6.100.000</div><div class="kpi-label">Egresos del mes</div></div>
        </div>
        <div class="kpi-card kpi-card--gold">
          <div class="kpi-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          <div><div class="kpi-value">₡2.150.000</div><div class="kpi-label">Excedente del mes</div></div>
        </div>
      </div>

      <div class="resumen-grid">
        <!-- Movimientos recientes -->
        <div class="data-card resumen-card">
          <div class="card-header-row">
            <h3 class="card-title">Movimientos recientes</h3>
            <button class="link-btn" @click="activeTab = 'ingresos'">Ver todos →</button>
          </div>
          <table class="data-table">
            <thead><tr><th>Fecha</th><th>Descripción</th><th>Tipo</th><th class="td-right">Monto</th></tr></thead>
            <tbody>
              <tr v-for="m in movimientosRecientes" :key="m.id">
                <td class="td-muted">{{ m.fecha }}</td>
                <td>{{ m.desc }}</td>
                <td><span :class="['badge', m.tipo === 'ingreso' ? 'badge--green' : 'badge--red']">{{ m.tipo === 'ingreso' ? 'Ingreso' : 'Egreso' }}</span></td>
                <td class="td-right" :class="m.tipo === 'ingreso' ? 'txt-green' : 'txt-red'">{{ m.tipo === 'ingreso' ? '+' : '-' }}{{ m.monto }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Saldos de cuentas -->
        <div class="resumen-right">
          <div class="data-card">
            <h3 class="card-title" style="margin-bottom:14px">Saldos de cuentas</h3>
            <div v-for="c in cuentas" :key="c.id" class="cuenta-item">
              <div class="cuenta-dot" :style="{ background: c.color }"></div>
              <div class="cuenta-info">
                <span class="cuenta-nombre">{{ c.nombre }}</span>
                <span class="cuenta-tipo">{{ c.tipo }}</span>
              </div>
              <span class="cuenta-saldo">{{ c.saldo }}</span>
            </div>
          </div>

          <div class="data-card alerta-card">
            <h3 class="card-title" style="margin-bottom:12px">Alertas financieras</h3>
            <div class="alerta-item alerta--warn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Conciliación bancaria pendiente (diferencia ₡50.000)
            </div>
            <div class="alerta-item alerta--info">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Salarios: 91.7% del presupuesto anual ejecutado
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: CAJA Y BANCOS ══════════════════════════ -->
    <template v-if="activeTab === 'caja'">
      <div class="kpi-row">
        <div class="kpi-card"><div><div class="kpi-value">₡850.000</div><div class="kpi-label">Caja General</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡150.000</div><div class="kpi-label">Caja Chica Admin</div></div></div>
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">₡32.500.000</div><div class="kpi-label">Banco Nacional CC</div></div></div>
        <div class="kpi-card kpi-card--navy"><div><div class="kpi-value">₡11.850.000</div><div class="kpi-label">Banco CR Ahorros</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar movimiento..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todas las cuentas</option><option>Caja General</option><option>Banco Nacional</option><option>Banco CR</option></select>
        <select class="filter-select"><option>Todos los tipos</option><option>Depósito</option><option>Retiro</option><option>Transferencia</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Cuenta</th><th>Tipo</th><th>Descripción</th><th>Referencia</th><th class="td-right">Débito</th><th class="td-right">Crédito</th><th class="td-right">Saldo</th></tr></thead>
          <tbody>
            <tr v-for="m in movimientosCaja" :key="m.id">
              <td class="td-muted">{{ m.fecha }}</td>
              <td>{{ m.cuenta }}</td>
              <td><span class="badge badge--blue">{{ m.tipo }}</span></td>
              <td>{{ m.desc }}</td>
              <td class="td-muted">{{ m.ref }}</td>
              <td class="td-right txt-red">{{ m.debito }}</td>
              <td class="td-right txt-green">{{ m.credito }}</td>
              <td class="td-right fw-600">{{ m.saldo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: INGRESOS ══════════════════════════ -->
    <template v-if="activeTab === 'ingresos'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--green"><div><div class="kpi-value">₡8.250.000</div><div class="kpi-label">Ingresos este mes</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡4.500.000</div><div class="kpi-label">Aportaciones</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡1.200.000</div><div class="kpi-label">Cuotas administrativas</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡2.550.000</div><div class="kpi-label">Otros ingresos</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar ingreso..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todas las categorías</option><option>Aportaciones</option><option>Cuotas</option><option>Intereses</option><option>Servicios</option><option>Otros</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Registrado</option><option>Pendiente</option><option>Anulado</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Categoría</th><th>Cuenta destino</th><th>Referencia</th><th>Estado</th><th class="td-right">Monto</th></tr></thead>
          <tbody>
            <tr v-for="ing in ingresos" :key="ing.id">
              <td class="td-muted">{{ ing.fecha }}</td>
              <td>{{ ing.concepto }}</td>
              <td><span class="badge badge--blue">{{ ing.categoria }}</span></td>
              <td class="td-muted">{{ ing.cuenta }}</td>
              <td class="td-muted">{{ ing.ref }}</td>
              <td><span :class="['badge', ing.estado === 'Registrado' ? 'badge--green' : 'badge--yellow']">{{ ing.estado }}</span></td>
              <td class="td-right fw-600 txt-green">{{ ing.monto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: EGRESOS ══════════════════════════ -->
    <template v-if="activeTab === 'egresos'">
      <div class="kpi-row">
        <div class="kpi-card kpi-card--red"><div><div class="kpi-value">₡6.100.000</div><div class="kpi-label">Egresos este mes</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡3.500.000</div><div class="kpi-label">Salarios</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡800.000</div><div class="kpi-label">Alquiler</div></div></div>
        <div class="kpi-card"><div><div class="kpi-value">₡1.800.000</div><div class="kpi-label">Otros egresos</div></div></div>
      </div>

      <div class="filters-bar">
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" placeholder="Buscar egreso..." class="search-input" />
        </div>
        <select class="filter-select"><option>Todas las categorías</option><option>Salarios</option><option>Servicios públicos</option><option>Alquiler</option><option>Papelería</option><option>Proveedores</option></select>
        <select class="filter-select"><option>Todos los estados</option><option>Pagado</option><option>Pendiente</option><option>Anulado</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Categoría</th><th>Cuenta origen</th><th>Beneficiario</th><th>Estado</th><th class="td-right">Monto</th></tr></thead>
          <tbody>
            <tr v-for="eg in egresos" :key="eg.id">
              <td class="td-muted">{{ eg.fecha }}</td>
              <td>{{ eg.concepto }}</td>
              <td><span class="badge badge--blue">{{ eg.categoria }}</span></td>
              <td class="td-muted">{{ eg.cuenta }}</td>
              <td class="td-muted">{{ eg.beneficiario }}</td>
              <td><span :class="['badge', eg.estado === 'Pagado' ? 'badge--green' : 'badge--yellow']">{{ eg.estado }}</span></td>
              <td class="td-right fw-600 txt-red">{{ eg.monto }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: CATÁLOGO ══════════════════════════ -->
    <template v-if="activeTab === 'catalogo'">
      <div class="catalogo-grid">
        <div class="catalogo-section">
          <div class="catalogo-header catalogo-header--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
            Ingresos
          </div>
          <div v-for="cat in catalogoIngresos" :key="cat.codigo" class="catalogo-item">
            <div class="cat-codigo">{{ cat.codigo }}</div>
            <div class="cat-body">
              <div class="cat-nombre">{{ cat.nombre }}</div>
              <div class="cat-subs">
                <span v-for="s in cat.subcuentas" :key="s" class="cat-sub">{{ s }}</span>
              </div>
            </div>
            <div class="cat-saldo txt-green">{{ cat.saldo }}</div>
          </div>
        </div>

        <div class="catalogo-section">
          <div class="catalogo-header catalogo-header--red">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/></svg>
            Gastos
          </div>
          <div v-for="cat in catalogoGastos" :key="cat.codigo" class="catalogo-item">
            <div class="cat-codigo">{{ cat.codigo }}</div>
            <div class="cat-body">
              <div class="cat-nombre">{{ cat.nombre }}</div>
              <div class="cat-subs">
                <span v-for="s in cat.subcuentas" :key="s" class="cat-sub">{{ s }}</span>
              </div>
            </div>
            <div class="cat-saldo txt-red">{{ cat.saldo }}</div>
          </div>
        </div>
      </div>

      <div class="catalogo-note">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        El sistema genera automáticamente los asientos contables al registrar cada movimiento. No es necesario conocimiento contable avanzado.
      </div>
    </template>

    <!-- ══════════════════════════ TAB: CONCILIACIÓN ══════════════════════════ -->
    <template v-if="activeTab === 'conciliacion'">
      <div class="concil-top">
        <div class="concil-selector">
          <label>Cuenta bancaria</label>
          <select v-model="cuentaSeleccionada" class="filter-select">
            <option value="bn">Banco Nacional — CC 001-12345-6</option>
            <option value="bcr">Banco CR — Ahorros 15-678901-2</option>
          </select>
          <label>Mes</label>
          <input type="month" v-model="mesConciliacion" class="filter-select" />
        </div>
      </div>

      <div class="concil-cards">
        <div class="concil-card concil-card--blue">
          <div class="concil-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
          <div class="concil-label">Saldo según banco</div>
          <div class="concil-val">₡5.000.000</div>
        </div>
        <div class="concil-card concil-card--navy">
          <div class="concil-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
          <div class="concil-label">Saldo según sistema</div>
          <div class="concil-val">₡4.950.000</div>
        </div>
        <div class="concil-card concil-card--warn">
          <div class="concil-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <div class="concil-label">Diferencia</div>
          <div class="concil-val concil-val--warn">₡50.000</div>
        </div>
      </div>

      <div class="data-card" style="margin-top:20px">
        <div class="card-header-row" style="margin-bottom:14px">
          <h3 class="card-title">Movimientos pendientes de conciliar</h3>
          <span class="badge badge--yellow">3 pendientes</span>
        </div>
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Descripción</th><th>Tipo</th><th class="td-right">Monto</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>
            <tr v-for="p in pendientesConcil" :key="p.id">
              <td class="td-muted">{{ p.fecha }}</td>
              <td>{{ p.desc }}</td>
              <td><span class="badge badge--blue">{{ p.tipo }}</span></td>
              <td class="td-right fw-600">{{ p.monto }}</td>
              <td><span class="badge badge--yellow">Pendiente</span></td>
              <td><button class="link-btn">Conciliar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: PRESUPUESTO ══════════════════════════ -->
    <template v-if="activeTab === 'presupuesto'">
      <div class="filters-bar">
        <select class="filter-select" v-model="anioPres">
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
        <select class="filter-select"><option>Todos los rubros</option><option>Ingresos</option><option>Gastos</option></select>
      </div>

      <div class="data-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Concepto</th>
              <th class="td-right">Presupuesto</th>
              <th class="td-right">Ejecutado</th>
              <th class="td-right">% Ejecución</th>
              <th class="td-right">Diferencia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in presupuesto" :key="p.concepto">
              <td>{{ p.concepto }}</td>
              <td class="td-right">{{ p.presupuesto }}</td>
              <td class="td-right">{{ p.ejecutado }}</td>
              <td class="td-right">
                <div class="pct-wrap">
                  <div class="pct-bar-bg"><div class="pct-bar-fill" :class="p.pct > 90 ? 'pct-bar--red' : p.pct > 75 ? 'pct-bar--yellow' : 'pct-bar--green'" :style="{ width: Math.min(p.pct, 100) + '%' }"></div></div>
                  <span :class="p.pct > 90 ? 'txt-red' : p.pct > 75 ? 'txt-yellow' : 'txt-green'">{{ p.pct }}%</span>
                </div>
              </td>
              <td class="td-right" :class="p.diferencia.startsWith('-') ? 'txt-red' : 'txt-green'">{{ p.diferencia }}</td>
              <td><span :class="['badge', p.pct > 100 ? 'badge--red' : p.pct > 90 ? 'badge--yellow' : 'badge--green']">{{ p.pct > 100 ? 'Excedido' : p.pct > 90 ? 'En riesgo' : 'Normal' }}</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="tfoot-total">
              <td><strong>TOTAL</strong></td>
              <td class="td-right"><strong>₡73.800.000</strong></td>
              <td class="td-right"><strong>₡62.080.000</strong></td>
              <td class="td-right"><strong>84.1%</strong></td>
              <td class="td-right txt-green"><strong>₡11.720.000</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </template>

    <!-- ══════════════════════════ TAB: ESTADOS FINANCIEROS ══════════════════════════ -->
    <template v-if="activeTab === 'estados'">
      <div class="filters-bar">
        <select class="filter-select"><option>Junio 2026</option><option>Mayo 2026</option><option>Abril 2026</option></select>
        <button class="btn-outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Exportar PDF
        </button>
      </div>

      <div class="estados-grid">
        <!-- Estado de Resultados -->
        <div class="data-card estado-card">
          <div class="estado-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Estado de Resultados
            <span class="estado-period">Junio 2026</span>
          </div>

          <div class="estado-section">
            <div class="estado-section-title estado-section-title--green">Ingresos</div>
            <div v-for="item in estadoResultados.ingresos" :key="item.concepto" class="estado-row">
              <span>{{ item.concepto }}</span>
              <span>{{ item.monto }}</span>
            </div>
            <div class="estado-subtotal">
              <span>Total Ingresos</span>
              <span class="txt-green fw-700">₡25.000.000</span>
            </div>
          </div>

          <div class="estado-section">
            <div class="estado-section-title estado-section-title--red">Gastos</div>
            <div v-for="item in estadoResultados.gastos" :key="item.concepto" class="estado-row">
              <span>{{ item.concepto }}</span>
              <span>{{ item.monto }}</span>
            </div>
            <div class="estado-subtotal">
              <span>Total Gastos</span>
              <span class="txt-red fw-700">₡18.000.000</span>
            </div>
          </div>

          <div class="estado-excedente">
            <span>Excedente del Período</span>
            <span class="txt-green fw-700 fs-20">₡7.000.000</span>
          </div>
        </div>

        <!-- Balance General -->
        <div class="data-card estado-card">
          <div class="estado-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Balance General
            <span class="estado-period">Al 30 Junio 2026</span>
          </div>

          <div class="estado-section">
            <div class="estado-section-title estado-section-title--navy">Activos</div>
            <div v-for="item in balanceGeneral.activos" :key="item.concepto" class="estado-row">
              <span>{{ item.concepto }}</span>
              <span>{{ item.monto }}</span>
            </div>
            <div class="estado-subtotal">
              <span>Total Activos</span>
              <span class="txt-navy fw-700">₡120.000.000</span>
            </div>
          </div>

          <div class="balance-cols">
            <div class="estado-section">
              <div class="estado-section-title estado-section-title--red">Pasivos</div>
              <div v-for="item in balanceGeneral.pasivos" :key="item.concepto" class="estado-row">
                <span>{{ item.concepto }}</span>
                <span>{{ item.monto }}</span>
              </div>
              <div class="estado-subtotal">
                <span>Total Pasivos</span>
                <span class="txt-red fw-700">₡40.000.000</span>
              </div>
            </div>
            <div class="estado-section">
              <div class="estado-section-title estado-section-title--green">Patrimonio</div>
              <div v-for="item in balanceGeneral.patrimonio" :key="item.concepto" class="estado-row">
                <span>{{ item.concepto }}</span>
                <span>{{ item.monto }}</span>
              </div>
              <div class="estado-subtotal">
                <span>Total Patrimonio</span>
                <span class="txt-green fw-700">₡80.000.000</span>
              </div>
            </div>
          </div>

          <div class="estado-excedente">
            <span>Pasivos + Patrimonio</span>
            <span class="txt-navy fw-700 fs-20">₡120.000.000</span>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('resumen')
const periodoLabel = ref('Junio 2026')
const periodoOpen = ref(false)
const modalOpen = ref(false)
const cuentaSeleccionada = ref('bn')
const mesConciliacion = ref('2026-06')
const anioPres = ref('2026')

const tabs = [
  { key: 'resumen',       label: 'Resumen',       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
  { key: 'caja',          label: 'Caja y Bancos', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
  { key: 'ingresos',      label: 'Ingresos',      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>` },
  { key: 'egresos',       label: 'Egresos',       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/></svg>` },
  { key: 'catalogo',      label: 'Catálogo',      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>` },
  { key: 'conciliacion',  label: 'Conciliación',  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>` },
  { key: 'presupuesto',   label: 'Presupuesto',   icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
  { key: 'estados',       label: 'Est. Financieros', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>` },
]

const cuentas = [
  { id: 1, nombre: 'Caja General',          tipo: 'Efectivo',   saldo: '₡850.000',     color: '#C47F0C' },
  { id: 2, nombre: 'Caja Chica Admin',       tipo: 'Efectivo',   saldo: '₡150.000',     color: '#C47F0C' },
  { id: 3, nombre: 'Banco Nacional CC',      tipo: 'Corriente',  saldo: '₡32.500.000',  color: '#133C65' },
  { id: 4, nombre: 'Banco CR Ahorros',       tipo: 'Ahorros',    saldo: '₡11.850.000',  color: '#1B5490' },
]

const movimientosRecientes = [
  { id: 1, fecha: '24/06/2026', desc: 'Aportaciones asociados jun.',  tipo: 'ingreso', monto: '₡1.200.000' },
  { id: 2, fecha: '23/06/2026', desc: 'Pago planilla quincenal',       tipo: 'egreso',  monto: '₡1.750.000' },
  { id: 3, fecha: '22/06/2026', desc: 'Cuota administrativa jun.',     tipo: 'ingreso', monto: '₡600.000'   },
  { id: 4, fecha: '20/06/2026', desc: 'Pago alquiler oficina',         tipo: 'egreso',  monto: '₡800.000'   },
  { id: 5, fecha: '18/06/2026', desc: 'Intereses recibidos BN',        tipo: 'ingreso', monto: '₡85.000'    },
]

const movimientosCaja = [
  { id: 1, fecha: '24/06/2026', cuenta: 'Banco Nacional', tipo: 'Depósito',      desc: 'Aportaciones asociados',   ref: 'DEP-2406',  debito: '—',          credito: '₡1.200.000', saldo: '₡32.500.000' },
  { id: 2, fecha: '23/06/2026', cuenta: 'Banco Nacional', tipo: 'Transferencia', desc: 'Pago planilla quincenal',  ref: 'TRF-2306',  debito: '₡1.750.000', credito: '—',          saldo: '₡31.300.000' },
  { id: 3, fecha: '22/06/2026', cuenta: 'Caja General',   tipo: 'Ingreso',       desc: 'Cuota administrativa',     ref: 'CAJ-2206',  debito: '—',          credito: '₡600.000',   saldo: '₡850.000'    },
  { id: 4, fecha: '20/06/2026', cuenta: 'Banco CR',        tipo: 'Cheque',        desc: 'Pago alquiler oficina',    ref: 'CHQ-2006',  debito: '₡800.000',   credito: '—',          saldo: '₡11.850.000' },
  { id: 5, fecha: '18/06/2026', cuenta: 'Banco Nacional', tipo: 'Crédito',       desc: 'Intereses recibidos',      ref: 'INT-1806',  debito: '—',          credito: '₡85.000',    saldo: '₡33.050.000' },
]

const ingresos = [
  { id: 1, fecha: '24/06/2026', concepto: 'Aportaciones asociados — Junio', categoria: 'Aportaciones', cuenta: 'Banco Nacional', ref: 'ING-001', estado: 'Registrado', monto: '₡4.500.000' },
  { id: 2, fecha: '22/06/2026', concepto: 'Cuotas administrativas',         categoria: 'Cuotas',       cuenta: 'Caja General',   ref: 'ING-002', estado: 'Registrado', monto: '₡1.200.000' },
  { id: 3, fecha: '18/06/2026', concepto: 'Intereses cuenta Banco Nacional',categoria: 'Intereses',    cuenta: 'Banco Nacional', ref: 'ING-003', estado: 'Registrado', monto: '₡850.000'   },
  { id: 4, fecha: '15/06/2026', concepto: 'Venta de servicios — Mayo',      categoria: 'Servicios',    cuenta: 'Banco Nacional', ref: 'ING-004', estado: 'Registrado', monto: '₡1.200.000' },
  { id: 5, fecha: '10/06/2026', concepto: 'Otros ingresos varios',          categoria: 'Otros',        cuenta: 'Caja General',   ref: 'ING-005', estado: 'Pendiente',  monto: '₡500.000'   },
]

const egresos = [
  { id: 1, fecha: '23/06/2026', concepto: 'Planilla quincenal (1-15 jun)',  categoria: 'Salarios',    cuenta: 'Banco Nacional', beneficiario: 'Personal',            estado: 'Pagado',   monto: '₡1.750.000' },
  { id: 2, fecha: '20/06/2026', concepto: 'Alquiler oficina central',       categoria: 'Alquiler',    cuenta: 'Banco CR',        beneficiario: 'Propietario S.A.',    estado: 'Pagado',   monto: '₡800.000'   },
  { id: 3, fecha: '15/06/2026', concepto: 'Servicios públicos (ICE, AyA)',  categoria: 'Servicios',   cuenta: 'Banco Nacional', beneficiario: 'ICE / AyA',           estado: 'Pagado',   monto: '₡450.000'   },
  { id: 4, fecha: '08/06/2026', concepto: 'Proveedor papelería',            categoria: 'Papelería',   cuenta: 'Caja General',   beneficiario: 'Distribuidora XYZ',   estado: 'Pagado',   monto: '₡120.000'   },
  { id: 5, fecha: '05/06/2026', concepto: 'Planilla quincenal (16-31 may)', categoria: 'Salarios',    cuenta: 'Banco Nacional', beneficiario: 'Personal',            estado: 'Pagado',   monto: '₡1.750.000' },
  { id: 6, fecha: '01/06/2026', concepto: 'Proveedor servicios varios',     categoria: 'Proveedores', cuenta: 'Banco CR',        beneficiario: 'TechServices CR',     estado: 'Pendiente',monto: '₡730.000'   },
  { id: 7, fecha: '01/06/2026', concepto: 'Gastos varios administración',   categoria: 'Adminis.',    cuenta: 'Caja General',   beneficiario: 'Varios',              estado: 'Pagado',   monto: '₡500.000'   },
]

const catalogoIngresos = [
  { codigo: '4.1', nombre: 'Aportaciones', subcuentas: ['Ordinarias', 'Extraordinarias'], saldo: '₡4.500.000' },
  { codigo: '4.2', nombre: 'Intereses',    subcuentas: ['Intereses cobrados', 'Intereses bancarios'], saldo: '₡850.000'   },
  { codigo: '4.3', nombre: 'Servicios',    subcuentas: ['Venta de servicios', 'Cuotas administrativas'], saldo: '₡2.900.000' },
  { codigo: '4.4', nombre: 'Otros ingresos', subcuentas: ['Misceláneos', 'Donaciones'], saldo: '₡500.000'   },
]

const catalogoGastos = [
  { codigo: '5.1', nombre: 'Personal',       subcuentas: ['Salarios', 'Cargas sociales', 'Vacaciones'], saldo: '₡3.500.000' },
  { codigo: '5.2', nombre: 'Operación',      subcuentas: ['Servicios públicos', 'Mantenimiento', 'Seguros'], saldo: '₡1.050.000' },
  { codigo: '5.3', nombre: 'Servicios',      subcuentas: ['Alquiler', 'Internet', 'Telefonía'], saldo: '₡1.050.000' },
  { codigo: '5.4', nombre: 'Administración', subcuentas: ['Papelería', 'Proveedores', 'Gastos varios'], saldo: '₡500.000'   },
]

const pendientesConcil = [
  { id: 1, fecha: '20/06/2026', desc: 'Cheque #4521 — no presentado',   tipo: 'Cheque',        monto: '₡30.000' },
  { id: 2, fecha: '18/06/2026', desc: 'Cargo bancario comisión manejo', tipo: 'Comisión banco', monto: '₡12.500' },
  { id: 3, fecha: '15/06/2026', desc: 'Depósito sin identificar',       tipo: 'Depósito',      monto: '₡7.500'  },
]

const presupuesto = [
  { concepto: 'Aportaciones de asociados', presupuesto: '₡54.000.000', ejecutado: '₡27.000.000', pct: 50.0, diferencia: '₡27.000.000'  },
  { concepto: 'Ingresos por servicios',    presupuesto: '₡12.000.000', ejecutado: '₡7.200.000',  pct: 60.0, diferencia: '₡4.800.000'   },
  { concepto: 'Salarios y cargas',         presupuesto: '₡42.000.000', ejecutado: '₡38.500.000', pct: 91.7, diferencia: '-₡3.500.000'  },
  { concepto: 'Servicios públicos',        presupuesto: '₡5.400.000',  ejecutado: '₡4.500.000',  pct: 83.3, diferencia: '₡900.000'     },
  { concepto: 'Alquiler',                  presupuesto: '₡9.600.000',  ejecutado: '₡8.000.000',  pct: 83.3, diferencia: '₡1.600.000'   },
  { concepto: 'Papelería e insumos',       presupuesto: '₡1.800.000',  ejecutado: '₡1.260.000',  pct: 70.0, diferencia: '₡540.000'     },
  { concepto: 'Proveedores y servicios',   presupuesto: '₡9.000.000',  ejecutado: '₡8.820.000',  pct: 98.0, diferencia: '-₡180.000'    },
]

const estadoResultados = {
  ingresos: [
    { concepto: 'Aportaciones de asociados', monto: '₡18.000.000' },
    { concepto: 'Cuotas administrativas',    monto: '₡3.000.000'  },
    { concepto: 'Intereses cobrados',        monto: '₡2.000.000'  },
    { concepto: 'Venta de servicios',        monto: '₡1.500.000'  },
    { concepto: 'Otros ingresos',            monto: '₡500.000'    },
  ],
  gastos: [
    { concepto: 'Salarios y cargas sociales', monto: '₡10.000.000' },
    { concepto: 'Alquiler de oficinas',        monto: '₡2.400.000'  },
    { concepto: 'Servicios públicos',          monto: '₡1.800.000'  },
    { concepto: 'Papelería y suministros',     monto: '₡800.000'    },
    { concepto: 'Proveedores y otros',         monto: '₡3.000.000'  },
  ],
}

const balanceGeneral = {
  activos: [
    { concepto: 'Efectivo y equivalentes',    monto: '₡45.350.000'  },
    { concepto: 'Cuentas por cobrar',          monto: '₡12.000.000'  },
    { concepto: 'Inventario y materiales',     monto: '₡3.500.000'   },
    { concepto: 'Propiedad y equipo (neto)',   monto: '₡59.150.000'  },
  ],
  pasivos: [
    { concepto: 'Cuentas por pagar',           monto: '₡8.000.000'   },
    { concepto: 'Préstamos bancarios',         monto: '₡25.000.000'  },
    { concepto: 'Obligaciones sociales',       monto: '₡7.000.000'   },
  ],
  patrimonio: [
    { concepto: 'Capital social',              monto: '₡65.000.000'  },
    { concepto: 'Reservas legales',            monto: '₡8.000.000'   },
    { concepto: 'Excedente del período',       monto: '₡7.000.000'   },
  ],
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
.dark .btn-outline { background: #1D293D; color: #93B8D8; border-color: #3D5069; }
.link-btn { background: none; border: none; color: #1B5490; font-size: 12px; cursor: pointer; padding: 0; }
.link-btn:hover { text-decoration: underline; }
.dark .link-btn { color: #93B8D8; }

/* ── Tabs ────────────────────────────── */
.tabs-wrap { background: white; border-radius: 12px; padding: 6px; border: 1px solid #E8EEF4; }
.tabs-nav { display: flex; gap: 2px; overflow-x: auto; }
.tabs-nav::-webkit-scrollbar { height: 0; }
.tab-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border: none; background: transparent; color: #4A6070; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.tab-btn:hover { background: #F4F6F8; color: #133C65; }
.tab-btn--active { background: #133C65; color: white; }
.dark .tabs-wrap { background: #1D293D; border-color: #3D5069; }
.dark .tab-btn { color: #94A3B8; }
.dark .tab-btn:hover { background: #243553; color: #E2E8F0; }
.dark .tab-btn--active { background: #1B5490; color: white; }

/* ── KPI row ─────────────────────────── */
.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.kpi-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 18px; display: flex; align-items: center; gap: 14px; }
.kpi-card--navy { background: #133C65; border-color: #133C65; color: white; }
.kpi-card--green { background: #F0FAF4; border-color: #B7E4CC; }
.kpi-card--red   { background: #FEF2F2; border-color: #FECACA; }
.kpi-card--gold  { background: #FFFBEB; border-color: #FDE68A; }
.kpi-value { font-size: 20px; font-weight: 700; color: #133C65; white-space: nowrap; }
.kpi-card--navy .kpi-value { color: white; }
.kpi-card--green .kpi-value { color: #166534; }
.kpi-card--red .kpi-value   { color: #991B1B; }
.kpi-card--gold .kpi-value  { color: #92400E; }
.kpi-label { font-size: 12px; color: #4A6070; margin-top: 2px; }
.kpi-card--navy .kpi-label { color: rgba(255,255,255,0.7); }
.kpi-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: rgba(255,255,255,0.15); color: white; }
.kpi-card--green .kpi-icon { background: #BBF7D0; color: #166534; }
.kpi-card--red .kpi-icon   { background: #FEE2E2; color: #991B1B; }
.kpi-card--gold .kpi-icon  { background: #FEF08A; color: #92400E; }
.dark .kpi-card { background: #1D293D; border-color: #3D5069; }
.dark .kpi-value { color: #E2E8F0; }
.dark .kpi-label { color: #94A3B8; }

/* ── Filters bar ─────────────────────── */
.filters-bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #7A90A0; }
.search-input { width: 100%; padding: 8px 10px 8px 32px; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; background: white; color: #1A2B3C; }
.search-input:focus { outline: none; border-color: #133C65; }
.filter-select { padding: 8px 12px; border: 1px solid #D4E4F4; border-radius: 8px; font-size: 13px; background: white; color: #1A2B3C; cursor: pointer; }
.dark .search-input, .dark .filter-select { background: #1D293D; border-color: #3D5069; color: #E2E8F0; }

/* ── Data card & table ───────────────── */
.data-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; min-width: 600px; }
.data-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; color: #4A6070; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #E8EEF4; white-space: nowrap; }
.data-table td { padding: 12px 14px; font-size: 13px; color: #1A2B3C; border-bottom: 1px solid #F4F6F8; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover { background: #F8FAFE; }
.dark .data-card { background: #1D293D; border-color: #3D5069; }
.dark .data-table th { color: #94A3B8; border-color: #3D5069; }
.dark .data-table td { color: #E2E8F0; border-color: #243553; }
.dark .data-table tbody tr:hover { background: #243553; }
.card-header-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 0; }
.card-title { font-size: 14px; font-weight: 700; color: #133C65; }
.dark .card-title { color: #93B8D8; }
.tfoot-total td { border-top: 2px solid #D4E4F4; padding: 12px 14px; background: #F5F7FB; font-size: 13px; }
.dark .tfoot-total td { background: #162033; border-color: #3D5069; color: #E2E8F0; }

/* ── Badges ──────────────────────────── */
.badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.badge--green  { background: #F0FAF4; color: #166534; }
.badge--red    { background: #FEF2F2; color: #991B1B; }
.badge--yellow { background: #FFFBEB; color: #92400E; }
.badge--blue   { background: #EBF3FF; color: #133C65; }
.dark .badge--green  { background: rgba(16,185,129,0.15); color: #6EE7B7; }
.dark .badge--red    { background: rgba(239,68,68,0.15);  color: #FCA5A5; }
.dark .badge--yellow { background: rgba(245,158,11,0.15); color: #FCD34D; }
.dark .badge--blue   { background: rgba(147,184,216,0.12); color: #93B8D8; }

/* ── Utility ─────────────────────────── */
.td-right  { text-align: right !important; }
.td-muted  { color: #7A90A0 !important; font-size: 12px; }
.fw-600    { font-weight: 600; }
.fw-700    { font-weight: 700; }
.fs-20     { font-size: 20px; }
.txt-green { color: #166534; }
.txt-red   { color: #991B1B; }
.txt-yellow{ color: #92400E; }
.txt-navy  { color: #133C65; }
.dark .txt-green { color: #6EE7B7; }
.dark .txt-red   { color: #FCA5A5; }
.dark .txt-navy  { color: #93B8D8; }

/* ── Resumen ─────────────────────────── */
.resumen-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
.resumen-card { padding: 0; }
.resumen-card .card-header-row { padding: 16px; }
.resumen-right { display: flex; flex-direction: column; gap: 16px; }
.cuenta-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-bottom: 1px solid #F4F6F8; }
.cuenta-item:last-child { border-bottom: none; }
.cuenta-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.cuenta-info { flex: 1; min-width: 0; }
.cuenta-nombre { display: block; font-size: 13px; font-weight: 600; color: #1A2B3C; }
.cuenta-tipo   { font-size: 11px; color: #7A90A0; }
.cuenta-saldo  { font-size: 13px; font-weight: 700; color: #133C65; white-space: nowrap; }
.dark .cuenta-nombre { color: #E2E8F0; }
.dark .cuenta-saldo  { color: #93B8D8; }
.alerta-card { padding: 16px !important; overflow: visible; }
.alerta-item { display: flex; align-items: flex-start; gap: 8px; font-size: 12.5px; padding: 9px 12px; border-radius: 8px; margin-bottom: 8px; }
.alerta-item:last-child { margin-bottom: 0; }
.alerta--warn { background: #FFFBEB; color: #92400E; }
.alerta--info { background: #EBF3FF; color: #133C65; }
.dark .alerta--warn { background: rgba(245,158,11,0.12); color: #FCD34D; }
.dark .alerta--info { background: rgba(147,184,216,0.1); color: #93B8D8; }

/* ── Catálogo ────────────────────────── */
.catalogo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.catalogo-section { background: white; border: 1px solid #E8EEF4; border-radius: 12px; overflow: hidden; }
.dark .catalogo-section { background: #1D293D; border-color: #3D5069; }
.catalogo-header { display: flex; align-items: center; gap: 8px; padding: 14px 18px; font-size: 14px; font-weight: 700; }
.catalogo-header--green { background: #F0FAF4; color: #166534; border-bottom: 1px solid #BBF7D0; }
.catalogo-header--red   { background: #FEF2F2; color: #991B1B; border-bottom: 1px solid #FEE2E2; }
.catalogo-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 18px; border-bottom: 1px solid #F4F6F8; }
.catalogo-item:last-child { border-bottom: none; }
.cat-codigo { font-size: 12px; font-weight: 700; color: #7A90A0; background: #F4F6F8; padding: 3px 8px; border-radius: 5px; flex-shrink: 0; margin-top: 2px; }
.cat-body   { flex: 1; min-width: 0; }
.cat-nombre { font-size: 13px; font-weight: 600; color: #1A2B3C; margin-bottom: 4px; }
.cat-subs   { display: flex; flex-wrap: wrap; gap: 4px; }
.cat-sub    { font-size: 11px; background: #F4F6F8; color: #4A6070; padding: 2px 7px; border-radius: 10px; }
.cat-saldo  { font-size: 13px; font-weight: 700; white-space: nowrap; }
.dark .cat-codigo { background: #243553; color: #94A3B8; }
.dark .cat-nombre { color: #E2E8F0; }
.dark .cat-sub    { background: #243553; color: #94A3B8; }
.catalogo-note { display: flex; align-items: flex-start; gap: 8px; padding: 12px 16px; background: #EBF3FF; border-radius: 10px; font-size: 12.5px; color: #133C65; }
.dark .catalogo-note { background: rgba(147,184,216,0.1); color: #93B8D8; }

/* ── Conciliación ────────────────────── */
.concil-top { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 16px 20px; }
.dark .concil-top { background: #1D293D; border-color: #3D5069; }
.concil-selector { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.concil-selector label { font-size: 13px; font-weight: 600; color: #4A6070; }
.concil-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.concil-card { background: white; border: 1px solid #E8EEF4; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.concil-card--blue { border-color: #BFDBFE; background: #EFF6FF; }
.concil-card--navy { border-color: #C5D8F0; background: #EBF3FF; }
.concil-card--warn { border-color: #FDE68A; background: #FFFBEB; }
.concil-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.concil-card--blue .concil-icon { background: #DBEAFE; color: #1D4ED8; }
.concil-card--navy .concil-icon { background: #C5D8F0; color: #133C65; }
.concil-card--warn .concil-icon { background: #FEF08A; color: #92400E; }
.concil-label { font-size: 12px; color: #4A6070; }
.concil-val { font-size: 22px; font-weight: 700; color: #133C65; }
.concil-val--warn { color: #92400E; }
.dark .concil-card { background: #1D293D; border-color: #3D5069; }
.dark .concil-label { color: #94A3B8; }
.dark .concil-val { color: #E2E8F0; }

/* ── Presupuesto ─────────────────────── */
.pct-wrap { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
.pct-bar-bg { width: 60px; height: 6px; background: #E8EEF4; border-radius: 3px; overflow: hidden; flex-shrink: 0; }
.pct-bar-fill { height: 100%; border-radius: 3px; transition: width 0.4s; }
.pct-bar--green  { background: #22C55E; }
.pct-bar--yellow { background: #F59E0B; }
.pct-bar--red    { background: #EF4444; }

/* ── Estados financieros ─────────────── */
.estados-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.estado-card  { padding: 0; overflow: visible; }
.estado-title { display: flex; align-items: center; gap: 8px; padding: 16px 20px; font-size: 15px; font-weight: 700; color: #133C65; border-bottom: 1px solid #E8EEF4; }
.dark .estado-title { color: #93B8D8; border-color: #3D5069; }
.estado-period { margin-left: auto; font-size: 12px; font-weight: 400; color: #7A90A0; }
.estado-section { padding: 14px 20px; border-bottom: 1px solid #F4F6F8; }
.estado-section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; padding: 4px 10px; border-radius: 5px; display: inline-block; }
.estado-section-title--green { background: #F0FAF4; color: #166534; }
.estado-section-title--red   { background: #FEF2F2; color: #991B1B; }
.estado-section-title--navy  { background: #EBF3FF; color: #133C65; }
.estado-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; color: #1A2B3C; border-bottom: 1px solid #F8FAFE; }
.estado-row:last-child { border-bottom: none; }
.dark .estado-row { color: #E2E8F0; border-color: #243553; }
.estado-subtotal { display: flex; justify-content: space-between; padding: 9px 0 0; font-size: 13px; font-weight: 600; border-top: 1px solid #E8EEF4; margin-top: 6px; }
.dark .estado-subtotal { border-color: #3D5069; }
.estado-excedente { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #F8FAFE; border-top: 2px solid #D4E4F4; }
.dark .estado-excedente { background: #162033; border-color: #3D5069; }
.balance-cols { display: grid; grid-template-columns: 1fr 1fr; }

/* ── Responsive ─────────────────────── */
@media (max-width: 1100px) {
  .kpi-row { grid-template-columns: repeat(2, 1fr); }
  .resumen-grid { grid-template-columns: 1fr; }
  .estados-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .page-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .header-actions { width: 100%; }
  .kpi-row { grid-template-columns: 1fr 1fr; }
  .catalogo-grid { grid-template-columns: 1fr; }
  .concil-cards { grid-template-columns: 1fr; }
  .balance-cols { grid-template-columns: 1fr; }
  .concil-selector { flex-direction: column; align-items: flex-start; }
}
</style>
