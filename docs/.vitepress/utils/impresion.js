export function imprimirFactura(factura, cliente, productos) {
  try {
    // Calcular totales
    const subtotal = factura.items.reduce((sum, item) => {
      const producto = productos.find(p => p.id === Number(item.productoId))
      return sum + (producto?.precio || 0) * item.cantidad
    }, 0)
    
    const iva = subtotal * 0.21
    const total = subtotal + iva

    // Crear contenido HTML
    const contenidoFactura = `
      <div class="factura-impresion">
        <style>
          @media print {
            .factura-impresion {
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .cabecera { margin-bottom: 30px; }
            .datos-empresa { margin-bottom: 20px; }
            .datos-cliente { margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 8px; border-bottom: 1px solid #ddd; text-align: left; }
            .totales { margin-top: 30px; margin-left: auto; width: 300px; }
            .total-final { font-weight: bold; border-top: 2px solid #000; }
          }
        </style>
        
        <div class="cabecera">
          <div class="datos-empresa">
            <h2>${factura.empresa?.nombre || 'Mi Empresa S.L.'}</h2>
            <p>CIF: ${factura.empresa?.cif || 'B12345678'}</p>
            <p>${factura.empresa?.direccion || ''}</p>
          </div>
          
          <div class="datos-factura">
            <h3>Factura Nº ${factura.numero}</h3>
            <p>Fecha: ${new Date(factura.fecha).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="datos-cliente">
          <h3>Cliente</h3>
          <p>${cliente.nombre}</p>
          <p>${cliente.direccion || ''}</p>
          <p>Tel: ${cliente.telefono || ''}</p>
          <p>Email: ${cliente.email || ''}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${factura.items.map(item => {
              const producto = productos.find(p => p.id === Number(item.productoId))
              return `
                <tr>
                  <td>${producto?.nombre || ''}</td>
                  <td>${item.cantidad}</td>
                  <td>$${producto?.precio || 0}</td>
                  <td>$${((producto?.precio || 0) * item.cantidad).toFixed(2)}</td>
                </tr>
              `
            }).join('')}
          </tbody>
        </table>

        <div class="totales">
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>IVA (21%): $${iva.toFixed(2)}</p>
          <p class="total-final">Total: $${total.toFixed(2)}</p>
        </div>
      </div>
    `

    // Crear un elemento temporal para imprimir
    const printElement = document.createElement('iframe')
    printElement.style.position = 'fixed'
    printElement.style.left = '-9999px'
    document.body.appendChild(printElement)

    // Escribir el contenido y manejar la impresión
    const frameDoc = printElement.contentWindow.document
    frameDoc.open()
    frameDoc.write(contenidoFactura)
    frameDoc.close()

    // Esperar a que los estilos se carguen
    setTimeout(() => {
      try {
        printElement.contentWindow.print()
        setTimeout(() => {
          document.body.removeChild(printElement)
        }, 1000)
      } catch (error) {
        console.error('Error al imprimir:', error)
        alert('No se pudo imprimir la factura. Por favor, inténtelo de nuevo.')
      }
    }, 500)

  } catch (error) {
    console.error('Error al preparar la impresión:', error)
    alert('Hubo un error al preparar la factura para imprimir. Por favor, inténtelo de nuevo.')
  }
}