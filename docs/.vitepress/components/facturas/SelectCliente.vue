<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  clientes: {
    type: Array,
    required: true
  },
  selectedId: {
    type: [Number, String],
    default: ''
  }
})

const emit = defineEmits(['update:selectedId'])
</script>

<template>
  <div class="select-container">
    <label class="label">Cliente:</label>
    <select 
      class="select-input"
      :value="selectedId"
      @change="e => emit('update:selectedId', e.target.value)"
    >
      <option value="">Seleccionar cliente</option>
      <option 
        v-for="cliente in clientes" 
        :key="cliente.id" 
        :value="cliente.id"
      >
        {{ cliente.nombre }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-container {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.select-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
}
</style>