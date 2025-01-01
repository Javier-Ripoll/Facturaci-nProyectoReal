<script setup>
defineProps({
  clientes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['editar', 'eliminar'])
</script>

<template>
  <div class="lista-clientes">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>
            <button @click="emit('editar', cliente.id)">Editar</button>
            <button @click="emit('eliminar', cliente.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.lista-clientes {
  margin-top: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>