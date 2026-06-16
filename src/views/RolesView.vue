<template>
  <div class="module-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Roles y Accesos</h2>
        <p class="page-subtitle">Define roles y simula la experiencia de cada tipo de usuario</p>
      </div>
      <button class="btn-primary">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Crear rol
      </button>
    </div>

    <!-- Banner rol activo -->
    <div class="active-banner" :style="{ borderColor: activeRol?.color, background: activeRol?.color + '12' }">
      <div class="active-banner-icon" :style="{ background: activeRol?.color }">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div>
        <span class="active-banner-label">Rol activo</span>
        <span class="active-banner-name" :style="{ color: activeRol?.color }">{{ activeRol?.name }}</span>
        <span class="active-banner-user">{{ roleInfo.user }} — {{ roleInfo.email }}</span>
      </div>
    </div>

    <div class="roles-grid">
      <div v-for="rol in roles" :key="rol.id" class="role-card" :class="{ 'role-card--active': currentRole === rol.key }">
        <div class="role-top">
          <div class="role-icon" :style="{ background: rol.color }">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 class="role-name">{{ rol.name }}</h3>
            <span class="role-users">{{ rol.users }} usuario{{ rol.users !== 1 ? 's' : '' }}</span>
          </div>
          <span v-if="currentRole === rol.key" class="role-active-chip">Activo</span>
          <span v-else-if="rol.system" class="role-badge">Sistema</span>
        </div>
        <p class="role-desc">{{ rol.desc }}</p>
        <div class="role-modules">
          <span v-for="mod in rol.modules" :key="mod" class="role-mod">{{ mod }}</span>
        </div>
        <div class="role-footer">
          <button v-if="rol.key" class="btn-activate" :class="{ 'btn-activate--on': currentRole === rol.key }" @click="activar(rol.key)">
            <svg v-if="currentRole === rol.key" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            {{ currentRole === rol.key ? 'Activo' : 'Activar' }}
          </button>
          <button class="btn-outline" :disabled="rol.system">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRole } from '../composables/useRole.js'

const { currentRole, isAdmin, roleInfo, setRole, ROLES } = useRole()

const activeRol = computed(() => roles.find(r => r.key === currentRole.value))

function activar(key) {
  setRole(key)
}

const roles = [
  {
    id: 1, key: 'admin', name: 'Administrador', users: 2, system: true, color: '#133C65',
    desc: 'Acceso completo a todos los módulos, configuración y gestión del sistema.',
    modules: ['Personal', 'Asociados', 'Órganos', 'Comités', 'Asambleas', 'Configuración'],
  },
  {
    id: 2, key: null, name: 'Gerente', users: 1, system: false, color: '#1A9152',
    desc: 'Acceso de lectura y escritura a módulos operativos, sin acceso a configuración.',
    modules: ['Personal', 'Asociados', 'Órganos', 'Comités', 'Asambleas'],
  },
  {
    id: 3, key: 'operador', name: 'Operador', users: 4, system: false, color: '#C47F0C',
    desc: 'Personal de planta. Accede a su expediente, gestiona asociados y participa en asambleas.',
    modules: ['Inicio (entrada)', 'Expediente propio', 'Asociados', 'Asambleas'],
  },
  {
    id: 4, key: 'asociado', name: 'Asociado', users: 248, system: false, color: '#1A6B42',
    desc: 'Socio de la cooperativa. Consulta su expediente, órganos, comités y se postula a asambleas.',
    modules: ['Asociados', 'Órganos', 'Comités', 'Asambleas'],
  },
  {
    id: 5, key: 'consejo', name: 'Consejo', users: 1, system: false, color: '#7B3FA0',
    desc: 'Miembro del consejo. Gestiona actas e integrantes de órganos y comités. Accede a su expediente.',
    modules: ['Asociados (propio)', 'Órganos (actas + integrantes)', 'Comités (integrantes)', 'Asambleas'],
  },
]
</script>

<style scoped>
.module-page { display: flex; flex-direction: column; gap: 20px; }
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.page-title { font-size: 21px; font-weight: 700; color: #133C65; letter-spacing: -0.3px; }
.dark .page-title { color: #E2E8F0; }
.page-subtitle { font-size: 13.5px; color: #4A6070; margin-top: 3px; }
.dark .page-subtitle { color: #94A3B8; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 13.5px; font-weight: 600; color: white; background: #133C65;
  border: none; padding: 9px 18px; border-radius: 8px; cursor: pointer;
  transition: background 0.15s; white-space: nowrap; flex-shrink: 0;
}
.btn-primary:hover { background: #0D2A47; }

/* ── Banner rol activo ─────────────────── */
.active-banner {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border-radius: 10px; border: 1.5px solid;
}
.active-banner-icon {
  width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.active-banner-label {
  display: block; font-size: 10.5px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.8px; color: #7A90A0;
}
.active-banner-name { display: block; font-size: 15px; font-weight: 700; margin-top: 1px; }
.active-banner-user { display: block; font-size: 12px; color: #7A90A0; margin-top: 1px; }

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.role-card {
  background: white; border: 1px solid #E8EEF4; border-radius: 12px;
  padding: 18px 20px; box-shadow: 0 1px 4px rgba(19,60,101,0.06);
  display: flex; flex-direction: column; gap: 12px;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.role-card--active {
  border-color: var(--active-color, #133C65);
  box-shadow: 0 0 0 3px rgba(19,60,101,0.08);
}
.dark .role-card { background: #1D293D; border-color: #3D5069; }
.dark .role-card--active { border-color: #4A7FAF; box-shadow: 0 0 0 3px rgba(74,127,175,0.15); }

.role-top { display: flex; align-items: center; gap: 10px; }
.role-icon {
  width: 36px; height: 36px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.role-name { font-size: 14.5px; font-weight: 700; color: #133C65; }
.dark .role-name { color: #E2E8F0; }
.role-users { font-size: 12px; color: #7A90A0; display: block; margin-top: 1px; }
.role-badge {
  margin-left: auto; font-size: 10.5px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; background: rgba(19,60,101,0.1); color: #133C65;
  padding: 2px 8px; border-radius: 12px; flex-shrink: 0;
}
.dark .role-badge { background: rgba(147,184,216,0.15); color: #93B8D8; }
.role-active-chip {
  margin-left: auto; font-size: 10.5px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; background: rgba(26,145,82,0.12); color: #1A6B42;
  padding: 2px 8px; border-radius: 12px; flex-shrink: 0;
}
.dark .role-active-chip { background: rgba(74,222,128,0.15); color: #4ADE80; }

.role-desc { font-size: 13px; color: #4A6070; line-height: 1.5; }
.dark .role-desc { color: #94A3B8; }

.role-modules { display: flex; flex-wrap: wrap; gap: 5px; }
.role-mod {
  font-size: 11px; font-weight: 600;
  background: #F0F4F8; color: #4A6070;
  padding: 3px 9px; border-radius: 12px;
}
.dark .role-mod { background: #162033; color: #94A3B8; }

.role-footer {
  padding-top: 4px; border-top: 1px solid #F0F4F8;
  display: flex; gap: 8px;
}
.dark .role-footer { border-color: #3D5069; }

.btn-activate {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12.5px; font-weight: 600; color: #133C65;
  background: rgba(19,60,101,0.08); border: 1.5px solid rgba(19,60,101,0.2);
  padding: 6px 14px; border-radius: 7px; cursor: pointer; transition: all 0.15s;
}
.btn-activate:hover { background: rgba(19,60,101,0.14); border-color: #133C65; }
.btn-activate--on {
  background: rgba(26,145,82,0.1); border-color: rgba(26,145,82,0.3); color: #1A6B42;
}
.btn-activate--on:hover { background: rgba(26,145,82,0.16); }
.dark .btn-activate { color: #93B8D8; background: rgba(147,184,216,0.1); border-color: rgba(147,184,216,0.2); }
.dark .btn-activate--on { color: #4ADE80; background: rgba(74,222,128,0.1); border-color: rgba(74,222,128,0.2); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12.5px; font-weight: 600; color: #133C65;
  background: none; border: 1.5px solid #D4E4F4;
  padding: 6px 14px; border-radius: 7px; cursor: pointer; transition: all 0.15s;
}
.btn-outline:hover:not(:disabled) { background: #EBF3FF; border-color: #133C65; }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }
.dark .btn-outline { color: #93B8D8; border-color: #3D5069; }
.dark .btn-outline:hover:not(:disabled) { background: rgba(147,184,216,0.1); border-color: #93B8D8; }
</style>
