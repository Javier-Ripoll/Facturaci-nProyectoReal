<script setup>
import { formatearFecha } from '../../utils/formateo'

defineProps({
  facturas: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['ver', 'imprimir'])
</script>

<template>
  <div class="lista-facturas">
    <table>
      <thead>
        <tr>
          <th>Nº Factura</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th class="acciones-header">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="factura in facturas" :key="factura.id">
          <td>{{ factura.numero }}</td>
          <td>{{ factura.cliente }}</td>
          <td>{{ formatearFecha(factura.fecha) }}</td>
          <td>${{ factura.total }}</td>
          <td class="acciones-celda">
            <button 
              class="btn-ver" 
              @click="emit('ver', factura.id)"
              title="Ver detalles de la factura"
            >
              <span class="icono">👁️</span>
              Ver
            </button>
            <button 
              class="btn-imprimir" 
              @click="emit('imprimir', factura.id)"
              title="Imprimir factura"
            >
              <span class="icono">🖨️</span>
              Imprimir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.lista-facturas {
  margin-top: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
}

.acciones-header {
  text-align: center;
}

.acciones-celda {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.5rem;
}

.btn-ver, .btn-imprimir {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-ver {
  background-color: #3b82f6;
  color: white;
}

.btn-ver:hover {
  background-color: #2563eb;
}

.btn-imprimir {
  background-color: #10b981;
  color: white;
}

.btn-imprimir:hover {
  background-color: #059669;
}

.icono {
  font-size: 1rem;
}

tr:hover {
  background-color: #f8fafc;
}
</style>