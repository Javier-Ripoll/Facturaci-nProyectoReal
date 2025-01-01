# Gestión de Clientes

<script setup>
// Importación de componentes y servicio necesarios
import FormularioCliente from './.vitepress/components/clientes/FormularioCliente.vue'
import ListaClientes from './.vitepress/components/clientes/ListaClientes.vue'
import { useClienteService } from './.vitepress/services/clienteService'

// Obtiene las funciones y estado del servicio de clientes
const { clientes, agregarCliente, eliminarCliente } = useClienteService()

// Función que maneja el guardado de un nuevo cliente
function guardarCliente(cliente) {
  agregarCliente(cliente)
}

// Función que maneja la edición de un cliente existente
function editarCliente(id) {
  console.log('Editar cliente:', id)
}

// Función que maneja la eliminación de un cliente
function eliminarClienteHandler(id) {
  eliminarCliente(id)
}
</script>

## Nuevo Cliente

<!-- Componente de formulario para crear nuevos clientes -->
<FormularioCliente @guardar="guardarCliente" />

## Listado de Clientes

<!-- Componente que muestra la lista de clientes -->
<ListaClientes 
  :clientes="clientes"
  @editar="editarCliente"
  @eliminar="eliminarClienteHandler"
/>