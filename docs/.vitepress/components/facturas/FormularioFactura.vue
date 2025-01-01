<script setup>
import { ref, computed } from 'vue'
import SelectCliente from './SelectCliente.vue'
import ProductoItem from './ProductoItem.vue'

const props = defineProps({
  clientes: {
    type: Array,
    required: true
  },
  productos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['guardar'])

const factura = ref({
  clienteId: '',
  items: [{ productoId: '', cantidad: 1 }]
})

const total = computed(() => {
  return factura.value.items.reduce((sum, item) => {
    const producto = props.productos.find(p => p.id === Number(item.productoId))
    return sum + (producto?.precio || 0) * item.cantidad
  }, 0)
})

function agregarProducto() {
  factura.value.items.push({ productoId: '', cantidad: 1 })
}

function eliminarProducto(index) {
  factura.value.items.splice(index, 1)
}

function guardarFactura() {
  if (!factura.value.clienteId) {
    alert('Por favor seleccione un cliente')
    return
  }
  
  if (!factura.value.items.every(item => item.productoId)) {
    alert('Por favor seleccione todos los productos')
    return
  }
  
  emit('guardar', { ...factura.value })
  
  // Resetear formulario
  factura.value = {
    clienteId: '',
    items: [{ productoId: '', cantidad: 1 }]
  }
}
</script>

<template>
  <div class="formulario-factura">
    <form @submit.prevent="guardarFactura">
      <SelectCliente 
        :clientes="clientes"
        v-model:selectedId="factura.clienteId"
      />
      
      <div class="productos-section">
        <h3>Productos</h3>
        <ProductoItem
          v-for="(item, index) in factura.items"
          :key="index"
          :productos="productos"
          v-model:productoId="item.productoId"
          v-model:cantidad="item.cantidad"
          @eliminar="eliminarProducto(index)"
        />
        
        <button 
          type="button"
          class="btn-agregar"
          @click="agregarProducto"
        >
          Agregar Producto
        </button>
      </div>

      <div class="total-section">
        <span class="total-label">Total:</span>
        <span class="total-amount">${{ total.toFixed(2) }}</span>
      </div>

      <button type="submit" class="btn-guardar">
        Guardar Factura
      </button>
    </form>
  </div>
</template>

<style scoped>
.formulario-factura {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
}

.productos-section {
  margin: 1.5rem 0;
}

.productos-section h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 500;
}

.btn-agregar {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-agregar:hover {
  background-color: #2563eb;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
}

.total-label {
  font-weight: 500;
}

.total-amount {
  font-size: 1.25rem;
  font-weight: 600;
}

.btn-guardar {
  width: 100%;
  padding: 0.75rem;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
}

.btn-guardar:hover {
  background-color: #16a34a;
}
</style>