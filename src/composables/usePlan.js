import { ref, watch } from 'vue'

export const PLAN_CONFIG = {
  basico: {
    label: 'Básico',
    modules: new Set(['personal', 'asociados', 'organos', 'asambleas', 'configuracion']),
  },
  pro: {
    label: 'Pro',
    modules: new Set(['personal', 'asociados', 'organos', 'asambleas', 'comites', 'votaciones', 'configuracion']),
  },
  empresarial: {
    label: 'Empresarial',
    modules: new Set(['personal', 'asociados', 'organos', 'asambleas', 'comites', 'votaciones', 'finanzas', 'creditos', 'riesgos', 'reportes', 'configuracion']),
  },
}

export const PLAN_KEYS = ['basico', 'pro', 'empresarial']

// Singleton ref — shared across all component imports
const currentPlan = ref(localStorage.getItem('coopesaas-plan') || 'empresarial')

watch(currentPlan, (val) => localStorage.setItem('coopesaas-plan', val))

export function usePlan() {
  function setPlan(key) {
    currentPlan.value = key
  }

  function canView(module) {
    return PLAN_CONFIG[currentPlan.value]?.modules.has(module) ?? true
  }

  function cyclePlan() {
    const idx = PLAN_KEYS.indexOf(currentPlan.value)
    currentPlan.value = PLAN_KEYS[(idx + 1) % PLAN_KEYS.length]
  }

  return { currentPlan, PLAN_CONFIG, PLAN_KEYS, setPlan, canView, cyclePlan }
}
