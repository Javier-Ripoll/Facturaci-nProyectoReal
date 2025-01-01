<script setup>
import { ref } from 'vue'
import FormularioFactura from './.vitepress/components/facturas/FormularioFactura.vue'
import ListaFacturas from './.vitepress/components/facturas/ListaFacturas.vue'
import VistaFactura from './.vitepress/components/facturas/VistaFactura.vue'
import { imprimirFactura } from './.vitepress/utils/impresion'

const mostrarVistaFactura = ref(false)
const facturaSeleccionada = ref(null)

const clientes = ref([
  { id: 1, nombre: 'Cliente 1', email: 'cliente1@ejemplo.com', telefono: '123456789', direccion: 'Calle 1, Ciudad' },
  { id: 2, nombre: 'Cliente 2', email: 'cliente2@ejemplo.com', telefono: '987654321', direccion: 'Calle 2, Ciudad' }
])

const productos = ref([
  { id: 1, nombre: 'Producto 1', precio: 100 },
  { id: 2, nombre: 'Producto 2', precio: 200 }
])

const facturas = ref([
  { 
    id: 1, 
    numero: 'F-001', 
    clienteId: 1,
    cliente: 'Cliente 1', 
    fecha: '2024-01-20', 
    total: 300,
    items: [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 }
    ]
  }
])

function guardarFactura(factura) {
  console.log('Guardar factura:', factura)
}

function verFactura(id) {
  facturaSeleccionada.value = facturas.value.find(f => f.id === id)
  mostrarVistaFactura.value = true
}

function imprimirFacturaHandler(id) {
  const factura = facturas.value.find(f => f.id === id)
  const cliente = clientes.value.find(c => c.id === factura.clienteId)
  imprimirFactura(factura, cliente, productos.value)
}
</script>

# Gestión de Facturas

<div v-if="mostrarVistaFactura" class="modal">
  <div class="modal-content">
    <button class="cerrar-modal" @click="mostrarVistaFactura = false">×</button>
    <VistaFactura 
      v-if="facturaSeleccionada"
      :factura="facturaSeleccionada"
      :cliente="clientes.find(c => c.id === facturaSeleccionada.clienteId)"
      :productos="productos"
    />
  </div>
</div>

## Nueva Factura

<FormularioFactura 
  :clientes="clientes" 
  :productos="productos" 
  @guardar="guardarFactura" 
/>

## Listado de Facturas

<ListaFacturas 
  :facturas="facturas" 
  @ver="verFactura"
  @imprimir="imprimirFacturaHandler"
/>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

.cerrar-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}
</style>