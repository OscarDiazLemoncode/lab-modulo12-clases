import { Reserva, reservas } from './model';

class ReservaBase {
  reservas: Reserva[];
  precioHabitacionSuite: number;
  precioHabitacionStandar: number;
  subtotal: number;
  cargoAdicional: number;
  constructor(reservas: Reserva[], cargoAdicional: number) {
    this.reservas = reservas;
    this.precioHabitacionSuite = 150;
    this.precioHabitacionStandar = 100;
    this.subtotal = 0;
    this.cargoAdicional = cargoAdicional;
  }
  calcularSubTotal() {
    return this.reservas.reduce((acc, reserva) => {
      const precioPorHabitacion =
        reserva.tipoHabitacion === 'standard'
          ? this.precioHabitacionStandar
          : this.precioHabitacionSuite;
      const subtotalReserva = precioPorHabitacion * reserva.noches;
      console.log(reserva, acc, subtotalReserva);
      return acc + subtotalReserva;
    }, 0);
    return this.subtotal;
  }
}
/* CASO 1 */
// Cliente particular
class ReservaClienteParticular extends ReservaBase {
  cargoAdicional: number;
  constructor(reservas: Reserva[], cargoAdicional: number) {
    super(reservas, cargoAdicional);
    this.cargoAdicional = cargoAdicional;
  }
}
const reservaClienteParticular = new ReservaClienteParticular(reservas, 40);
console.log(reservaClienteParticular.calcularSubTotal());

/* CASO 2 */
// Tour operador
class ReservaTourOperador extends ReservaBase {
  cargoAdicional: number;
  constructor(reservas: Reserva[], cargoAdicional: number) {
    super(reservas, cargoAdicional);
    this.cargoAdicional = cargoAdicional;
  }
}
const reservaTourOperador = new ReservaTourOperador(reservas, 15);
console.log(reservaTourOperador.calcularSubTotal());
