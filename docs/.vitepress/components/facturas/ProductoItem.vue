<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  productos: {
    type: Array,
    required: true
  },
  productoId: {
    type: [Number, String],
    default: ''
  },
  cantidad: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:productoId', 'update:cantidad', 'eliminar'])
</script>

<template>
  <div class="producto-item">
    <select 
      class="select-producto"
      :value="productoId"
      @change="e => emit('update:productoId', e.target.value)"
    >
      <option value="">Seleccionar producto</option>
      <option 
        v-for="producto in productos" 
        :key="producto.id" 
        :value="producto.id"
      >
        {{ producto.nombre }} - ${{ producto.precio }}
      </option>
    </select>
    
    <input 
      type="number"
      class="input-cantidad"
      :value="cantidad"
      min="1"
      @input="e => emit('update:cantidad', Number(e.target.value))"
    />
    
    <button 
      type="button"
      class="btn-eliminar"
      @click="emit('eliminar')"
    >
      Eliminar
    </button>
  </div>
</template>

<style scoped>
.producto-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.select-producto {
  flex: 2;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
}

.input-cantidad {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
}

.btn-eliminar {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-eliminar:hover {
  background-color: #dc2626;
}
</style>