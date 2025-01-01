<script setup>
import { computed } from 'vue'
import { useEmpresaService } from '../../services/empresaService'

const props = defineProps({
  factura: {
    type: Object,
    required: true
  },
  cliente: {
    type: Object,
    required: true
  },
  productos: {
    type: Array,
    required: true
  }
})

const { datosEmpresa } = useEmpresaService()

const subtotal = computed(() => {
  return props.factura.items.reduce((sum, item) => {
    const producto = props.productos.find(p => p.id === Number(item.productoId))
    return sum + (producto?.precio || 0) * item.cantidad
  }, 0)
})

const iva = computed(() => subtotal.value * 0.21)
const total = computed(() => subtotal.value + iva.value)
</script>

<template>
  <div class="vista-factura">
    <!-- Datos de la empresa -->
    <div class="cabecera">
      <div class="datos-empresa">
        <h2>{{ datosEmpresa.nombre }}</h2>
        <p>CIF: {{ datosEmpresa.cif }}</p>
        <p>{{ datosEmpresa.direccion }}</p>
        <p>{{ datosEmpresa.codigoPostal }} {{ datosEmpresa.ciudad }}</p>
        <p>Tel: {{ datosEmpresa.telefono }}</p>
        <p>Email: {{ datosEmpresa.email }}</p>
      </div>
      <div class="datos-factura">
        <h3>Factura Nº {{ factura.numero }}</h3>
        <p>Fecha: {{ factura.fecha }}</p>
      </div>
    </div>

    <!-- Datos del cliente -->
    <div class="datos-cliente">
      <h3>Cliente</h3>
      <p>{{ cliente.nombre }}</p>
      <p>{{ cliente.direccion }}</p>
      <p>Tel: {{ cliente.telefono }}</p>
      <p>Email: {{ cliente.email }}</p>
    </div>

    <!-- Detalle de productos -->
    <table class="detalle-productos">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unit.</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in factura.items" :key="item.productoId">
          <td>{{ productos.find(p => p.id === Number(item.productoId))?.nombre }}</td>
          <td>{{ item.cantidad }}</td>
          <td>${{ productos.find(p => p.id === Number(item.productoId))?.precio }}</td>
          <td>${{ (productos.find(p => p.id === Number(item.productoId))?.precio * item.cantidad).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Totales -->
    <div class="totales">
      <div class="total-item">
        <span>Subtotal:</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="total-item">
        <span>IVA (21%):</span>
        <span>${{ iva.toFixed(2) }}</span>
      </div>
      <div class="total-item total-final">
        <span>Total:</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vista-factura {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
}

.cabecera {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.datos-empresa h2 {
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.datos-factura {
  text-align: right;
}

.datos-cliente {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.detalle-productos {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.detalle-productos th,
.detalle-productos td {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.totales {
  margin-left: auto;
  width: 300px;
}

.total-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.total-final {
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 2px solid #e2e8f0;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}
</style>