/**
 * Exporta un array de objetos como archivo CSV (compatible con Excel).
 * @param {Array}  rows     - Datos a exportar
 * @param {Array}  headers  - [{ key, label }] columnas a incluir (en orden)
 * @param {string} filename - Nombre del archivo sin extensión
 */
export function exportCSV(rows, headers, filename = 'reporte') {
  if (!rows?.length) return
  const cols = headers ?? Object.keys(rows[0]).map(k => ({ key: k, label: k }))
  const head = cols.map(c => c.label).join(',')
  const body = rows.map(row =>
    cols.map(c => {
      const v = row[c.key] ?? ''
      const s = String(v).replace(/"/g, '""')
      return s.includes(',') || s.includes('\n') ? `"${s}"` : s
    }).join(',')
  )
  const csv = '﻿' + [head, ...body].join('\r\n')   // BOM para Excel
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Abre el diálogo de impresión del navegador para generar el PDF.
 * En producción se puede reemplazar por una librería como jsPDF.
 */
export function exportPDF(title = '') {
  if (title) document.title = title
  window.print()
}
