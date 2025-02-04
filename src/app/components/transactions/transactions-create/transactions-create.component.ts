import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-transactions-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './transactions-create.component.html',
  styleUrls: ['./transactions-create.component.css']
})
export class TransactionsCreateComponent {
  transactionForm: FormGroup;

  estadoOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(1)]],
      estado: [true, Validators.required], // Cambiado a booleano
      reservaId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  crearTransaccion(): void {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe(
        () => {
          alert('Transacción creada correctamente');
          this.router.navigate(['/transactions-info']);
        },
        (error) => {
          console.error('Error al crear la transacción:', error);
          alert('Error al crear la transacción');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/transactions']);
  }
}
