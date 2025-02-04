import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-transactions-info',
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
  templateUrl: './transactions-info.component.html',
  styleUrls: ['./transactions-info.component.css']
})
export class TransactionsInfoComponent implements OnInit { 
  transactionForm: FormGroup;

  estadoOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      id: [null],  // Se ajusta el nombre según la interfaz
      monto: [null, [Validators.required, Validators.min(1)]],
      estado: [true, Validators.required], // Cambia a booleano
      reservaId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTransactionInfo(id);
    }
  }

  loadTransactionInfo(id: number): void {
    this.transactionService.getTransactionById(id).subscribe(
      (response) => {
        if (response) {
          this.transactionForm.patchValue(response);
        }
      },
      (error) => {
        console.error('Error al obtener la transacción:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.transactionForm.valid) {
      this.transactionService.updateTransaction(this.transactionForm.value).subscribe(
        () => {
          alert('Transacción actualizada correctamente');
          this.router.navigate(['/transactions']);
        },
        (error) => {
          console.error('Error al actualizar la transacción:', error);
          alert('Error al actualizar la transacción');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/transactions']);
  }
}