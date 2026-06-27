import { ref, watch } from 'vue'

export const ALL_MODULE_KEYS = [
  'personal', 'asociados', 'organos', 'comites',
  'asambleas', 'votaciones', 'finanzas', 'creditos', 'riesgos', 'reportes',
]

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('coopesaas-modules')
    if (saved) return new Set(JSON.parse(saved))
  } catch {}
  return new Set(ALL_MODULE_KEYS)
}

const selectedModules = ref(loadFromStorage())

watch(selectedModules, (val) => {
  localStorage.setItem('coopesaas-modules', JSON.stringify([...val]))
}, { deep: true })

export function useModules() {
  function isModuleActive(key) {
    return selectedModules.value.has(key)
  }

  function toggleModule(key) {
    const next = new Set(selectedModules.value)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    selectedModules.value = next
  }

  function setModules(keys) {
    selectedModules.value = new Set(keys)
  }

  return { selectedModules, ALL_MODULE_KEYS, isModuleActive, toggleModule, setModules }
}
