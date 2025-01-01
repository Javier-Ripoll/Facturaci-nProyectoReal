import { ref, readonly } from 'vue'

const datosEmpresa = ref({
  nombre: 'Mi Empresa S.L.',
  cif: 'B12345678',
  direccion: 'Calle Principal, 123',
  codigoPostal: '28001',
  ciudad: 'Madrid',
  telefono: '912345678',
  email: 'contacto@miempresa.com'
})

export function useEmpresaService() {
  return {
    datosEmpresa: readonly(datosEmpresa)
  }
}