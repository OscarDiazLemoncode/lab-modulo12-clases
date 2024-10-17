import { Reserva, reservas } from './model';
// PARTICULAR
// subtotal=> 890€
// total=> 1076.9€
// OPERADOR
// subtotal=> 800
// total=> 822.8

class ReservaBase {
  reservas: Reserva[];
  precioHabitacionSuite: number;
  precioHabitacionStandar: number;
  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this.precioHabitacionSuite = 150;
    this.precioHabitacionStandar = 100;
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
  }
}
/* CASO 1 */
// Cliente particular
class ReservaClienteParticular extends ReservaBase {
  cargoAdicional: number;
  constructor(reservas: Reserva[], cargoAdicional: number) {
    super(reservas);
    this.cargoAdicional = cargoAdicional;
  }
  subTotal(): number {
    const subtotal = super.calcularSubTotal() + this.cargoAdicional;
    return subtotal;
  }
  calcularTotal(): number {
    const subtotal = this.subTotal();
    const iva = subtotal * 0.21;
    return subtotal + iva;
  }
}
const reservaClienteParticular = new ReservaClienteParticular(reservas, 40);
console.warn(`SUBTOTAL=> ${reservaClienteParticular.subTotal()}€`);
console.warn(`TOTAL=> ${reservaClienteParticular.calcularTotal()}€`);

/* CASO 2 */
// Tour operador
class ReservaTourOperador extends ReservaBase {
  descuentoAdicional: number;
  constructor(reservas: Reserva[], descuentoAdicional: number) {
    super(reservas);
    this.precioHabitacionSuite = 100;
    this.precioHabitacionStandar = 100;
    this.descuentoAdicional = descuentoAdicional;
  }
  calcularTotal() {
    const totalIva = super.calcularSubTotal() + super.calcularSubTotal() * 0.21;
    const descuento = (this.descuentoAdicional * totalIva) / 100;
    return totalIva - descuento;
  }
}
const reservaTourOperador = new ReservaTourOperador(reservas, 15);
console.warn(`Operador SUBTOTAL=> ${reservaTourOperador.calcularSubTotal()}`);
console.warn(`Operador TOTAL=> ${reservaTourOperador.calcularTotal()}`);
