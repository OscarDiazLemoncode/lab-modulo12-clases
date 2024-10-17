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
  desayuno: boolean;
  costeDesayuno: number;
  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this.precioHabitacionSuite = 150;
    this.precioHabitacionStandar = 100;
    this.desayuno = false;
    this.costeDesayuno = 15;
  }
  calcularSubTotal(): number {
    return this.reservas.reduce((acc, reserva) => {
      const precioPorHabitacion =
        reserva.tipoHabitacion === 'standard'
          ? this.precioHabitacionStandar
          : this.precioHabitacionSuite;
      const desayuno =
        reserva.desayuno === true ? this.costeDesayuno * reserva.noches : 0;
      const subtotalReserva = precioPorHabitacion * reserva.noches + desayuno;
      return acc + subtotalReserva;
    }, 0);
  }
  calcularTotal(): number {
    const subtotal = this.calcularSubTotal();
    const iva = subtotal * 0.21;
    return subtotal + iva;
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
  total(): number {
    const subtotal = this.subTotal();
    const iva = subtotal * 0.21;
    return subtotal + iva;
  }
}
const reservaClienteParticular = new ReservaClienteParticular(reservas, 40);
console.warn(`Particular - SUBTOTAL=> ${reservaClienteParticular.subTotal()}€`);
console.warn(`Particular - TOTAL=> ${reservaClienteParticular.total()}€`);

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
  total() {
    const descuento = (this.descuentoAdicional * super.calcularTotal()) / 100;
    return super.calcularTotal() - descuento;
  }
}
const reservaTourOperador = new ReservaTourOperador(reservas, 15);
console.warn(`Operador - SUBTOTAL=> ${reservaTourOperador.calcularSubTotal()}`);
console.warn(`Operador - TOTAL=> ${reservaTourOperador.total()}`);
