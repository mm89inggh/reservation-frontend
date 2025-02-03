import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../../models/transaction.model';

@Injectable()
export class TransactionService {
  private apiUrl = 'http://ec2-18-205-162-176.compute-1.amazonaws.com:8762/reservation-service/api/reservas';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de transacciones desde el backend.
   */
  getTransactions(): Observable<any> {
    const body = { targetMethod: "GET" };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Obtiene una transacción por su ID.
   */
  getTransactionById(id: number): Observable<any> {
    const body = {
      targetMethod: "GET",
      body: { id_transaccion: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea una nueva transacción.
   */
  createTransaction(transaction: Omit<Transaction, 'id_transaccion'>): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: transaction
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza el estado de una transacción.
   */
  updateTransactionStatus(id: number, estado: string): Observable<any> {
    const body = {
      targetMethod: "UPDATE",
      body: {
        id_transaccion: id,
        estado: estado
      }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
