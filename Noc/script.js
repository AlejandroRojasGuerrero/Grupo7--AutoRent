
const listaClientes = document.getElementById('listaClientes');
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let editandoClienteID = null;

function renderizarClientes() {
  listaClientes.innerHTML = '';
  clientes.forEach((cli, index) => {
    listaClientes.innerHTML += `
      <div class="client">
        <div>${cli.nombre} - ${cli.documento} - Estado: ${cli.estado}</div>
        <div class="icons">
          <button onclick="editarCliente(${index})">✏️</button>
          <button onclick="eliminarCliente(${index})">🗑️</button>
          <button onclick="cambiarEstadoCliente(${index})">🔁</button>
        </div>
      </div>
    `;
  });
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function agregarCliente() {
  const nombre = document.getElementById('nombre').value.trim();
  const documento = document.getElementById('documento').value.trim();

  if (nombre && documento) {
    if (editandoClienteID !== null) {
      clientes[editandoClienteID] = { ...clientes[editandoClienteID], nombre, documento };
      editandoClienteID = null;
    } else {
      clientes.push({ nombre, documento, estado: 'Activo' });
    }
    document.getElementById('nombre').value = '';
    document.getElementById('documento').value = '';
    renderizarClientes();
  }
}

function editarCliente(id) {
  const cliente = clientes[id];
  document.getElementById('nombre').value = cliente.nombre;
  document.getElementById('documento').value = cliente.documento;
  editandoClienteID = id;
}

function eliminarCliente(id) {
  if (confirm('¿Eliminar cliente?')) {
    clientes.splice(id, 1);
    renderizarClientes();
  }
}

function cambiarEstadoCliente(id) {
  clientes[id].estado = clientes[id].estado === 'Activo' ? 'Inactivo' : 'Activo';
  renderizarClientes();
}


const listaVehiculos = document.getElementById('listaVehiculos');
let vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
let editandoVehiculoID = null;

function renderizarVehiculos() {
  listaVehiculos.innerHTML = '';
  vehiculos.forEach((veh, index) => {
    listaVehiculos.innerHTML += `
      <div class="vehicle">
        <div>${veh.modelo} - ${veh.placa} - Estado: ${veh.estado}</div>
        <div class="icons">
          <button onclick="editarVehiculo(${index})">✏️</button>
          <button onclick="eliminarVehiculo(${index})">🗑️</button>
          <button onclick="cambiarEstadoVehiculo(${index})">🔁</button>
        </div>
      </div>
    `;
  });
  localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
}

function agregarVehiculo() {
  const modelo = document.getElementById('modelo').value.trim();
  const placa = document.getElementById('placa').value.trim();

  if (modelo && placa) {
    if (editandoVehiculoID !== null) {
      vehiculos[editandoVehiculoID] = { ...vehiculos[editandoVehiculoID], modelo, placa };
      editandoVehiculoID = null;
    } else {
      vehiculos.push({ modelo, placa, estado: 'Disponible' });
    }
    document.getElementById('modelo').value = '';
    document.getElementById('placa').value = '';
    renderizarVehiculos();
  }
}

function editarVehiculo(id) {
  const vehiculo = vehiculos[id];
  document.getElementById('modelo').value = vehiculo.modelo;
  document.getElementById('placa').value = vehiculo.placa;
  editandoVehiculoID = id;
}

function eliminarVehiculo(id) {
  if (confirm('¿Eliminar vehículo?')) {
    vehiculos.splice(id, 1);
    renderizarVehiculos();
  }
}

function cambiarEstadoVehiculo(id) {
  const estados = ['Disponible', 'Alquilado', 'Mantenimiento'];
  const actual = estados.indexOf(vehiculos[id].estado);
  const siguiente = (actual + 1) % estados.length;
  vehiculos[id].estado = estados[siguiente];
  renderizarVehiculos();
}

document.getElementById("fecha").textContent = new Date().toLocaleDateString();
renderizarClientes();
renderizarVehiculos();
