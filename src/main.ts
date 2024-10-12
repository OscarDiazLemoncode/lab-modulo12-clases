import { reservas } from './model';

class Reserva {
  tipoHabitacion: string;
  pax: number;
  noches: number;
  precioSinIVa: number;
  cargosAdicionales: number;
  precioConIva: number;
  constructor(
    tipoHabitacion: string,
    pax: number,
    noches: number,
    precioSinIVa: number,
    cargosAdicionales: number,
    precioConIva: number
  ) {
    this.tipoHabitacion = tipoHabitacion;
    this.pax = pax;
    this.noches = noches;
    this.precioSinIVa = precioSinIVa;
    this.cargosAdicionales = cargosAdicionales;
    this.precioConIva = precioConIva;
  }
  calcularSubtotal() {
    const listado = reservas.forEach((reserva) => {
      console.log(reserva);
    });
    console.log(listado);
  }
}
/* CASO 1 */
// Cliente particular
const reservaClienteParticular = new Reserva('suite', 2, 5, 500, 40, 21);
console.log(reservaClienteParticular);
console.log(reservaClienteParticular.calcularSubtotal());
