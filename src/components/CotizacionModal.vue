<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-box">

        <div class="modal-header">
          <div>
            <h2 class="modal-title">Generar cotización</h2>
            <p class="modal-sub" v-if="activeModules.length > 0">
              {{ activeModules.length }} módulo(s) · {{ formatCRC(totalCosto) }} · {{ totalSemanas }} semanas
            </p>
          </div>
          <button class="modal-close" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="hint">Ingresá los datos de tu cooperativa para personalizar la cotización.</p>

          <div class="form-grid">
            <label class="field field--full">
              <span>Nombre de la cooperativa <em>*</em></span>
              <input v-model="form.nombre" placeholder="Ej: CoopeCNE R.L." />
            </label>
            <label class="field">
              <span>Cédula jurídica</span>
              <input v-model="form.cedula" placeholder="3-004-XXXXXX" />
            </label>
            <label class="field">
              <span>Representante legal</span>
              <input v-model="form.representante" placeholder="Nombre completo" />
            </label>
            <label class="field">
              <span>Correo electrónico</span>
              <input v-model="form.email" type="email" placeholder="contacto@cooperativa.com" />
            </label>
            <label class="field">
              <span>Teléfono</span>
              <input v-model="form.telefono" placeholder="2222-XXXX" />
            </label>
            <label class="field field--full">
              <span>Código de descuento</span>
              <div class="discount-wrap">
                <input
                  v-model="form.descuento"
                  placeholder="Ingresá tu código"
                  class="discount-input"
                  :class="{ 'discount-input--valid': discountApplied, 'discount-input--invalid': form.descuento && !discountApplied }"
                />
                <span v-if="discountApplied" class="discount-tag discount-tag--ok">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                  20% de descuento aplicado — primer año
                </span>
                <span v-else-if="form.descuento" class="discount-tag discount-tag--err">Código inválido</span>
              </div>
            </label>
          </div>

          <div v-if="activeModules.length === 0" class="no-modules">
            No hay módulos seleccionados. Regresá al selector de módulos para elegir al menos uno.
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
          <button class="btn-generate" :disabled="!form.nombre || activeModules.length === 0" @click="generate">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Generar PDF
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useModules, ALL_MODULE_KEYS } from '../composables/useModules.js'

defineEmits(['close'])

const { isModuleActive } = useModules()

const MODULE_CATALOG = {
  personal:   { name: 'Personal',            semanas: 3,  costo: 1200000, complexity: 'Medio',      badge: 'mid'   },
  asociados:  { name: 'Asociados',            semanas: 4,  costo: 1600000, complexity: 'Medio-Alto', badge: 'high'  },
  organos:    { name: 'Órganos Sociales',     semanas: 3,  costo: 880000,  complexity: 'Medio',      badge: 'mid'   },
  comites:    { name: 'Comités',              semanas: 3,  costo: 840000,  complexity: 'Medio',      badge: 'mid'   },
  asambleas:  { name: 'Asambleas',            semanas: 4,  costo: 1240000, complexity: 'Medio-Alto', badge: 'high'  },
  votaciones: { name: 'Votaciones',           semanas: 5,  costo: 1840000, complexity: 'Alto',       badge: 'red'   },
  finanzas:   { name: 'Finanzas',             semanas: 7,  costo: 2760000, complexity: 'Muy Alto',   badge: 'xhigh' },
  creditos:   { name: 'Créditos',             semanas: 8,  costo: 2960000, complexity: 'Muy Alto',   badge: 'xhigh' },
  riesgos:    { name: 'Riesgos',              semanas: 6,  costo: 2000000, complexity: 'Alto',       badge: 'red'   },
  reportes:   { name: 'Reportes Gerenciales', semanas: 4,  costo: 1400000, complexity: 'Alto',       badge: 'red'   },
}

const FIXED_MODULES = [
  { key: 'dashboard',     name: 'Dashboard / Inicio', semanas: 2, costo: 0, complexity: 'Incluido', badge: 'free' },
  { key: 'configuracion', name: 'Configuración',       semanas: 2, costo: 0, complexity: 'Incluido', badge: 'free' },
]

const form = ref({ nombre: '', cedula: '', representante: '', email: '', telefono: '', descuento: '' })
const discountApplied = computed(() => form.value.descuento.trim().toLowerCase() === '20saas')

const activeModules = computed(() =>
  ALL_MODULE_KEYS.filter(k => isModuleActive(k)).map(k => ({ key: k, ...MODULE_CATALOG[k] }))
)

const totalCosto   = computed(() => activeModules.value.reduce((s, m) => s + m.costo, 0))
const totalSemanas = computed(() => activeModules.value.reduce((s, m) => s + m.semanas, 0))

function formatCRC(n) {
  return '₡' + n.toLocaleString('es-CR')
}

function quoteNumber() {
  const next = (parseInt(localStorage.getItem('coopesaas-quote-seq') || '0') + 1)
  localStorage.setItem('coopesaas-quote-seq', String(next))
  return `COT-${new Date().getFullYear()}-${String(next).padStart(4, '0')}`
}

function buildGanttSVG(modules, totalW) {
  const total   = modules.reduce((s, m) => s + m.semanas, 0)
  const rowH    = 34
  const labelW  = 160
  const headerH = 32
  const chartW  = totalW - labelW - 8
  const colW    = Math.max(10, Math.floor(chartW / total))
  const svgW    = labelW + total * colW + 8
  const svgH    = headerH + modules.length * rowH + 8
  const step    = Math.ceil(total / 18)
  const barColors = ['#133C65','#1A5190','#1E6BB8','#1A9152','#C47F0C','#7B3FA0','#B03A2E','#117A65','#1F618D','#6C3483']

  let s = `<svg width="${svgW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg" style="font-family:Arial,sans-serif;display:block">`

  // Background + header bar
  s += `<rect width="${svgW}" height="${svgH}" fill="#F9FAFB" rx="6"/>`
  s += `<rect width="${svgW}" height="${headerH}" fill="#133C65" rx="6"/>`
  s += `<rect y="${headerH - 6}" width="${svgW}" height="6" fill="#133C65"/>`
  s += `<text x="10" y="20" fill="rgba(255,255,255,0.6)" font-size="10" font-weight="700">MÓDULO</text>`

  // Week headers + grid lines
  for (let w = 1; w <= total; w++) {
    const x = labelW + (w - 1) * colW
    if ((w - 1) % step === 0) {
      s += `<text x="${x + colW * step / 2}" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="600">S${w}</text>`
    }
    if (w > 1) s += `<line x1="${x}" y1="${headerH}" x2="${x}" y2="${svgH}" stroke="#E2E8F0" stroke-width="0.8"/>`
  }

  // Label separator
  s += `<line x1="${labelW}" y1="0" x2="${labelW}" y2="${svgH}" stroke="#CBD5E1" stroke-width="1"/>`

  // Rows
  let week = 0
  modules.forEach((mod, i) => {
    const y     = headerH + i * rowH
    const color = barColors[i % barColors.length]
    if (i % 2 === 0) s += `<rect x="0" y="${y}" width="${svgW}" height="${rowH}" fill="white"/>`
    s += `<line x1="0" y1="${y + rowH}" x2="${svgW}" y2="${y + rowH}" stroke="#E8EEF4" stroke-width="1"/>`

    // Label (truncate if long)
    const label = mod.name.length > 18 ? mod.name.slice(0, 17) + '…' : mod.name
    s += `<text x="10" y="${y + rowH / 2 + 4}" fill="#1a1a2e" font-size="11.5">${label}</text>`

    // Bar
    const bx = labelW + week * colW + 2
    const bw = mod.semanas * colW - 4
    s += `<rect x="${bx}" y="${y + 6}" width="${bw}" height="${rowH - 12}" rx="4" fill="${color}"/>`
    if (bw > 22) {
      s += `<text x="${bx + bw / 2}" y="${y + rowH / 2 + 5}" text-anchor="middle" fill="white" font-size="10" font-weight="700">${mod.semanas}s</text>`
    }
    week += mod.semanas
  })

  s += `</svg>`
  return s
}

function generate() {
  const num     = quoteNumber()
  const today   = new Date()
  const dateStr = today.toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })
  const mods    = activeModules.value
  const allMods = [...FIXED_MODULES, ...mods]
  const allTotalSemanas = allMods.reduce((s, m) => s + m.semanas, 0)
  const logoSrc = window.location.origin + (import.meta.env.BASE_URL || '/') + 'icono.png'

  const badgeStyles = {
    free:  'background:#DCFCE7;color:#166534',
    mid:   'background:#FEF9C3;color:#854D0E',
    high:  'background:#FFEDD5;color:#9A3412',
    red:   'background:#FEE2E2;color:#991B1B',
    xhigh: 'background:#EDE9FE;color:#5B21B6',
  }

  const tableRows = allMods.map((m, i) => {
    const bs = badgeStyles[m.badge] || ''
    const priceCell = m.costo === 0
      ? `<span style="color:#166534;font-weight:700">Gratis</span>`
      : formatCRC(m.costo)
    return `<tr>
      <td style="text-align:center;color:#7A90A0">${i + 1}</td>
      <td><strong>${m.name}</strong></td>
      <td><span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;${bs}">${m.complexity}</span></td>
      <td style="text-align:center">${m.semanas} sem.</td>
      <td style="text-align:right;font-weight:600">${priceCell}</td>
    </tr>`
  }).join('')

  const gantt = buildGanttSVG(allMods, 720)

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Cotización ${num} — CoopeSaaS</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:#111;padding:32px 36px;background:white}
  /* ── Header ── */
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:18px;border-bottom:2px solid #133C65;margin-bottom:24px}
  .brand{display:flex;align-items:center;gap:12px}
  .brand-name{font-size:22px;font-weight:800;color:#133C65;letter-spacing:-0.5px}
  .brand-sub{font-size:11px;color:#5A7490;margin-top:2px}
  .quote-meta{text-align:right}
  .quote-num{font-size:16px;font-weight:800;color:#133C65}
  .quote-date{font-size:12px;color:#5A7490;margin-top:3px}
  /* ── Info boxes ── */
  .info-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
  .box{background:#F4F6F8;border-radius:8px;padding:14px 16px}
  .box-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#7A90A0;margin-bottom:8px}
  .box p{font-size:12.5px;color:#1a1a2e;margin-bottom:3px}
  .box p strong{color:#133C65}
  /* ── Section heading ── */
  .sh{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#7A90A0;margin-bottom:10px}
  /* ── Table ── */
  table{width:100%;border-collapse:collapse;margin-bottom:6px;font-size:12.5px}
  thead tr{background:#133C65;color:white}
  th{padding:9px 12px;text-align:left;font-size:11px;font-weight:700}
  td{padding:8px 12px;border-bottom:1px solid #E8EEF4}
  tr:nth-child(even) td{background:#F9FAFB}
  .total-row td{background:#EEF4FA!important;font-weight:700;color:#133C65;border-top:2px solid #133C65;font-size:13px}
  /* ── Gantt ── */
  .gantt-wrap{margin-top:24px}
  /* ── Footer ── */
  .footer{margin-top:28px;padding-top:14px;border-top:1px solid #E8EEF4;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#7A90A0}
  .footer strong{color:#133C65}
  /* ── Actions (hidden on print) ── */
  .actions{position:fixed;bottom:24px;right:28px;display:flex;gap:10px;z-index:999}
  .btn-p{background:#133C65;color:white;border:none;padding:11px 26px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}
  .btn-p:hover{background:#1A5190}
  .btn-c{background:white;color:#5A7490;border:1.5px solid #CBD5E1;padding:11px 22px;border-radius:8px;font-size:13px;cursor:pointer}
  .btn-c:hover{background:#F4F6F8}
  @media print{
    .actions{display:none}
    body{padding:18px 22px}
  }
</style>
</head>
<body>

<!-- Header -->
<div class="hdr">
  <div class="brand">
    <img src="${logoSrc}" width="44" height="44" style="object-fit:contain" onerror="this.style.display='none'"/>
    <div>
      <div class="brand-name">CoopeSaaS</div>
      <div class="brand-sub">Gestión cooperativa inteligente · Costa Rica</div>
    </div>
  </div>
  <div class="quote-meta">
    <div class="quote-num">${num}</div>
    <div class="quote-date">Fecha: ${dateStr}</div>
    <div class="quote-date" style="color:#E8A31C;font-weight:600">Válida por 30 días</div>
  </div>
</div>

<!-- Info boxes -->
<div class="info-row">
  <div class="box">
    <div class="box-title">Datos del cliente</div>
    <p><strong>${form.value.nombre}</strong></p>
    ${form.value.cedula        ? `<p>Cédula jurídica: ${form.value.cedula}</p>` : ''}
    ${form.value.representante ? `<p>Rep. legal: ${form.value.representante}</p>` : ''}
    ${form.value.email         ? `<p>${form.value.email}</p>` : ''}
    ${form.value.telefono      ? `<p>${form.value.telefono}</p>` : ''}
  </div>
  <div class="box">
    <div class="box-title">Proveedor</div>
    <p><strong>CoopeSaaS S.A.</strong></p>
    <p>Plataforma SaaS de Gestión Cooperativa</p>
    <p>info@coopesaas.cr</p>
    <p>Costa Rica</p>
  </div>
</div>

<!-- Module table -->
<div class="sh">Módulos cotizados</div>
<table>
  <thead>
    <tr>
      <th style="width:36px">#</th>
      <th>Módulo</th>
      <th>Complejidad</th>
      <th style="text-align:center">Duración</th>
      <th style="text-align:right">Costo estimado</th>
    </tr>
  </thead>
  <tbody>
    ${tableRows}
    <tr class="total-row">
      <td colspan="3">TOTAL</td>
      <td style="text-align:center">${allTotalSemanas} semanas</td>
      <td style="text-align:right">${formatCRC(totalCosto.value)}</td>
    </tr>
    ${discountApplied.value ? `<tr style="background:#F0FDF4!important">
      <td colspan="3" style="color:#166534;font-weight:700">20% de descuento</td>
      <td></td>
      <td style="text-align:right">
        <div style="text-decoration:line-through;color:#7A90A0;font-size:12px;white-space:nowrap">${formatCRC(totalCosto.value)}</div>
        <div style="font-weight:700;color:#16A34A;white-space:nowrap">${formatCRC(Math.round(totalCosto.value * 0.80))}</div>
      </td>
    </tr>` : ''}
  </tbody>
</table>

<!-- Notas legales -->
<div style="margin-bottom:20px;padding:14px 16px;background:#F8FAFC;border-left:3px solid #CBD5E1;border-radius:0 8px 8px 0">
  <p style="font-size:11px;color:#5A7490;margin-bottom:6px;line-height:1.6">
    <strong style="color:#133C65">①</strong> Se suscribirá un contrato formal que establecerá el alcance del proyecto, los módulos cotizados, los entregables específicos, los plazos de ejecución y los criterios de aceptación acordados por ambas partes.
  </p>
  <p style="font-size:11px;color:#5A7490;margin-bottom:6px;line-height:1.6">
    <strong style="color:#133C65">②</strong> El costo de desarrollo se cancelará en dos tractos: el <strong>60%</strong> al momento de la firma del contrato y el <strong>40%</strong> restante contra la entrega y aceptación formal del sistema por parte del cliente.
  </p>
  <p style="font-size:11px;color:#5A7490;line-height:1.6">
    <strong style="color:#133C65">③</strong> La incorporación de módulos adicionales posteriores a la firma del contrato será cotizada de forma independiente. El costo de mantenimiento mensual se recalculará e incrementará proporcionalmente según los módulos vigentes.
  </p>
</div>

<!-- Mantenimiento mensual -->
<div style="margin-bottom:24px">
  <div class="sh">Costo de mantenimiento mensual</div>
  <div style="background:#FFF8E7;border:1.5px solid #E8A31C;border-radius:10px;padding:14px 20px;display:flex;justify-content:space-between;align-items:center">
    <div>
      <div style="font-size:13px;font-weight:700;color:#133C65">Mantenimiento y soporte mensual</div>
      <div style="font-size:12px;color:#7A90A0;margin-top:3px">Corresponde al 5% del costo total de los módulos implementados</div>
    </div>
    <div>
      ${discountApplied.value
        ? `<div style="font-size:13px;color:#7A90A0;text-decoration:line-through;white-space:nowrap">${formatCRC(Math.round(totalCosto.value * 0.05))} / mes</div>
           <div style="font-size:13px;font-weight:600;color:#16A34A;white-space:nowrap;margin-top:3px">${formatCRC(Math.round(totalCosto.value * 0.05 * 0.80))} / mes</div>
           <div style="font-size:10px;color:#7A90A0;margin-top:2px">Con 20% de descuento — primer año</div>`
        : `<div style="font-size:13px;font-weight:500;color:#C47F0C;white-space:nowrap">${formatCRC(Math.round(totalCosto.value * 0.05))}<span style="color:#7A90A0"> / mes</span></div>`
      }
    </div>
  </div>
</div>

<!-- Gantt -->
<div class="gantt-wrap">
  <div class="sh">Cronograma estimado de implementación</div>
  ${gantt}
  <p style="font-size:11px;color:#7A90A0;margin-top:8px">*No se incluye la duración del levantamiento de requerimientos y migración de datos.</p>
  <p style="font-size:11px;color:#7A90A0;margin-top:4px">*Los precios indicados incluyen el Impuesto al Valor Agregado (IVA) vigente.</p>
</div>

<!-- Footer -->
<div class="footer">
  <span><strong>CoopeSaaS</strong> · ${new Date().getFullYear()}</span>
</div>

<!-- Action buttons -->
<div class="actions">
  <button class="btn-c" onclick="window.close()">Cerrar</button>
  <button class="btn-p" onclick="window.print()">
    🖨 Imprimir / Guardar PDF
  </button>
</div>

</body>
</html>`

  const win = window.open('', '_blank', 'width=960,height=780')
  if (!win) {
    alert('El navegador bloqueó la ventana emergente. Permitila para generar la cotización.')
    return
  }
  win.document.write(html)
  win.document.close()
  win.focus()
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: white;
  border-radius: 14px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #E8EEF4;
  flex-shrink: 0;
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  color: #133C65;
}

.modal-sub {
  font-size: 12px;
  color: #5A7490;
  margin-top: 3px;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #F4F6F8;
  color: #5A7490;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}
.modal-close:hover { background: #E8EEF4; color: #133C65; }

.modal-body {
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
}

.hint {
  font-size: 13px;
  color: #5A7490;
  margin-bottom: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field--full { grid-column: 1 / -1; }

.field span {
  font-size: 12px;
  font-weight: 600;
  color: #3D5069;
}

.field span em {
  color: #E8A31C;
  font-style: normal;
  margin-left: 2px;
}

.field input {
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.15s;
}

.field input:focus { border-color: #133C65; }
.field input::placeholder { color: #A0B0BF; }

.discount-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.discount-input {
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #1a1a2e;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
}
.discount-input:focus { border-color: #133C65; }
.discount-input--valid  { border-color: #16A34A !important; background: #F0FDF4; }
.discount-input--invalid { border-color: #DC2626 !important; background: #FEF2F2; }
.discount-input::placeholder { color: #A0B0BF; }

.discount-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  width: fit-content;
}
.discount-tag--ok  { background: #DCFCE7; color: #166534; }
.discount-tag--err { background: #FEE2E2; color: #991B1B; }

.no-modules {
  margin-top: 16px;
  padding: 12px 16px;
  background: #FEF9C3;
  border-radius: 8px;
  font-size: 13px;
  color: #854D0E;
  font-weight: 500;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E8EEF4;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.btn-cancel {
  padding: 9px 20px;
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  background: white;
  color: #5A7490;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-cancel:hover { background: #F4F6F8; }

.btn-generate {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 22px;
  border: none;
  border-radius: 8px;
  background: #133C65;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.btn-generate:hover:not(:disabled) { background: #1A5190; }
.btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
