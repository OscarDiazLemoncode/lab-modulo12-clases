import { Reserva, reservas } from './model';

class ReservaBase {
  reservas: Reserva[];
  precioHabitacionSuite: number;
  precioHabitacionStandar: number;
  /* subtotal: number; */
  cargoAdicional: number;
  constructor(reservas: Reserva[], cargoAdicional: number) {
    this.reservas = reservas;
    this.precioHabitacionSuite = 150;
    this.precioHabitacionStandar = 100;
    /* s */
    this.cargoAdicional = cargoAdicional;
  }
  calcularSubTotal() {
    return this.reservas.reduce((acc, reserva) => {
      const precioPorHabitacion =
        reserva.tipoHabitacion === 'standard'
          ? this.precioHabitacionStandar
          : this.precioHabitacionSuite;
      const cargoPorPersonasAdicionales =
        (reserva.pax - 1) * this.cargoAdicional * reserva.noches;
      const subtotalReserva =
        precioPorHabitacion * reserva.noches + cargoPorPersonasAdicionales;
      console.log(reserva, acc, subtotalReserva);
      return acc + subtotalReserva;
    }, 0);
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
  calcularTotal(): number {
    const subtotal = this.calcularSubTotal();
    const iva = (subtotal * 21) / 100;
    console.log(subtotal + iva);
    return subtotal + iva;
  }
}
const reservaClienteParticular = new ReservaClienteParticular(reservas, 40);
console.log(
  `Subtotal sin IVA=> ${reservaClienteParticular.calcularSubTotal()}€`
);
console.log(`TOTAL sin IVA=> ${reservaClienteParticular.calcularTotal()}€`);

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
