import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/reservation-service/api/transacciones`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las transacciones.
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
      body: { id: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Crea una nueva transacción.
   */
  createTransaction(transaction: Omit<Transaction, 'id'>): Observable<any> {
    const body = {
      targetMethod: "POST",
      body: transaction
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Actualiza una transacción existente.
   * Se envía el objeto completo de la transacción.
   */
  updateTransaction(transaction: Transaction): Observable<any> {
    const body = {
      targetMethod: "UPDATE",
      body: transaction
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }

  /**
   * Elimina una transacción por su ID.
   */
  deleteTransaction(id: number): Observable<any> {
    const body = {
      targetMethod: "DELETE",
      body: { id: id }
    };
    return this.http.post<any>(this.apiUrl, JSON.stringify(body), { headers: this.headers });
  }
}
