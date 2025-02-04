import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, FormsModule],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  transacciones: Transaction[] = [];

  constructor(private transactionService: TransactionService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllTransactions();
  }

  loadAllTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (response) => {
        this.transacciones = response;
      },
      (error) => {
        console.error('Error al obtener la lista de transacciones:', error);
      }
    );
  }

  verTransaccion(id_transaccion: number): void {
    this.router.navigate(['/transactions-info', id_transaccion]);
  }

  eliminarTransaccion(id_transaccion: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      this.transactionService.deleteTransaction(id_transaccion).subscribe(
        () => {
          alert('Transacción eliminada correctamente');
          this.loadAllTransactions();
        },
        (error) => {
          console.error('Error al eliminar la transacción:', error);
          alert('Error al eliminar la transacción');
        }
      );
    }
  }

  crearTransaccion(): void {
    this.router.navigate(['/transactions-create']);
  }

  /**
   * Retorna una clase CSS dependiendo del estado de la transacción
   */
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'estado-pendiente';
      case 'Completado':
        return 'estado-completado';
      case 'Cancelado':
        return 'estado-cancelado';
      default:
        return '';
    }
  }
}
