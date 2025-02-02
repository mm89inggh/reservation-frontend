import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transaction } from '../../models/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Simulación de transacciones realizadas
  private transacciones: Transaction[] = [
    {
      id_transaccion: 1,
      monto: 15.00,
      estado: 'completada',
      metodo_pago: 'tarjeta',
      fecha_transaccion: '2025-02-01T10:00:00',
      id_reserva: 1
    },
    {
      id_transaccion: 2,
      monto: 20.00,
      estado: 'pendiente',
      metodo_pago: 'efectivo',
      fecha_transaccion: '2025-02-01T11:00:00',
      id_reserva: 2
    }
  ];

  /**
   * Retorna la lista de transacciones.
   */
  getTransactions(): Observable<Transaction[]> {
    return of(this.transacciones);
  }
}
