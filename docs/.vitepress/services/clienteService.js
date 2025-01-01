// Servicio para la gestión de clientes
import { ref, readonly } from 'vue'

// Estado inicial de clientes con datos de ejemplo
const initialClientes = [
  { 
    id: 1, 
    nombre: 'Cliente Ejemplo', 
    email: 'cliente@ejemplo.com', 
    telefono: '123456789' 
  }
]

// Creamos un estado persistente que no se reiniciará con hot-reloads
const state = {
  clientes: ref(initialClientes)
}

/**
 * Hook para gestionar clientes
 * @returns {Object} Objeto con el estado y métodos del servicio
 */
export function useClienteService() {
  /**
   * Agrega un nuevo cliente
   * @param {Object} cliente - Datos del cliente a agregar
   * @returns {Object} Cliente creado con ID
   */
  function agregarCliente(cliente) {
    try {
      const nuevoCliente = {
        ...cliente,
        id: Date.now()
      }
      state.clientes.value.push(nuevoCliente)
      return nuevoCliente
    } catch (error) {
      console.error('Error al agregar cliente:', error)
      throw new Error('No se pudo agregar el cliente')
    }
  }

  /**
   * Actualiza los datos de un cliente
   * @param {number} id - ID del cliente
   * @param {Object} datosCliente - Nuevos datos del cliente
   * @returns {Object|null} Cliente actualizado o null si no se encuentra
   */
  function actualizarCliente(id, datosCliente) {
    try {
      const index = state.clientes.value.findIndex(c => c.id === id)
      if (index !== -1) {
        state.clientes.value[index] = { 
          ...state.clientes.value[index], 
          ...datosCliente 
        }
        return state.clientes.value[index]
      }
      return null
    } catch (error) {
      console.error('Error al actualizar cliente:', error)
      throw new Error('No se pudo actualizar el cliente')
    }
  }

  /**
   * Elimina un cliente
   * @param {number} id - ID del cliente a eliminar
   * @returns {boolean} true si se eliminó, false si no se encontró
   */
  function eliminarCliente(id) {
    try {
      const index = state.clientes.value.findIndex(c => c.id === id)
      if (index !== -1) {
        state.clientes.value.splice(index, 1)
        return true
      }
      return false
    } catch (error) {
      console.error('Error al eliminar cliente:', error)
      throw new Error('No se pudo eliminar el cliente')
    }
  }

  return {
    clientes: readonly(state.clientes),
    agregarCliente,
    actualizarCliente,
    eliminarCliente
  }
}