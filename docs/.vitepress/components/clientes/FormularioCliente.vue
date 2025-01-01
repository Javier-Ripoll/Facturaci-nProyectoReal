<script setup>
import { ref } from 'vue'

const emit = defineEmits(['guardar'])

const cliente = ref({
  nombre: '',
  email: '',
  telefono: '',
  direccion: ''
})

function guardarCliente() {
  emit('guardar', { ...cliente.value })
  cliente.value = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  }
}
</script>

<template>
  <div class="formulario-cliente">
    <form @submit.prevent="guardarCliente">
      <div class="grupo-formulario">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="cliente.nombre" required>
      </div>

      <div class="grupo-formulario">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="cliente.email" required>
      </div>

      <div class="grupo-formulario">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="cliente.telefono">
      </div>

      <div class="grupo-formulario">
        <label for="direccion">Dirección:</label>
        <textarea id="direccion" v-model="cliente.direccion"></textarea>
      </div>

      <button type="submit">Guardar Cliente</button>
    </form>
  </div>
</template>

<style scoped>
.formulario-cliente {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.grupo-formulario {
  margin-bottom: 15px;
}

.grupo-formulario label {
  display: block;
  margin-bottom: 5px;
}

.grupo-formulario input,
.grupo-formulario textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>