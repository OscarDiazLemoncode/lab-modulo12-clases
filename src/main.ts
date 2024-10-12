import { reservas } from './model';

class Reserva {
  constructor(cargoAdicional: number) {
    this.cargoAdicional = cargoAdicional;
    this.total = 0;
    this.subtotal = 0;
  }
  calcularTotal() {
    console.log((this.total = this.subtotal + this.cargoAdicional));
  }
}
/* CASO 1 */
// Cliente particular
const reservaClienteParticular = new Reserva(40);
console.log(reservaClienteParticular);
console.log(reservaClienteParticular.calcularTotal());
