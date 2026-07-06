import { ref, computed } from 'vue'

const _user = ref(JSON.parse(localStorage.getItem('coopesaas-user') || 'null'))

export function useAuth() {
  function setUser(data) {
    _user.value = data
    localStorage.setItem('coopesaas-user', JSON.stringify(data))
  }

  function clearUser() {
    _user.value = null
    localStorage.removeItem('coopesaas-user')
  }

  const fullName = computed(() => {
    if (!_user.value) return 'Usuario'
    return _user.value.name || _user.value.nombre || _user.value.email?.split('@')[0] || 'Usuario'
  })

  const firstName = computed(() => fullName.value.split(' ')[0])

  const userEmail = computed(() => _user.value?.email || '')

  const initials = computed(() => {
    const parts = fullName.value.split(' ').filter(Boolean)
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return parts[0]?.slice(0, 2).toUpperCase() || 'U'
  })

  return { currentUser: _user, fullName, firstName, userEmail, initials, setUser, clearUser }
}
