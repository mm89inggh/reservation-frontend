import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-business-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  templateUrl: './business-create.component.html',
  styleUrls: ['./business-create.component.css'],
  providers: [MessageService]
})
export class BusinessCreateComponent {
  businessForm: FormGroup;

  constructor(
    private businessService: BusinessService,
    public router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.businessForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      contacto: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
      coordenadas: ['']
    });
  }

  /**
   * Crea un nuevo negocio con validaciones y mensaje de éxito.
   */
  crearNegocio(): void {
    if (this.businessForm.valid) {
      this.businessService.createBusiness(this.businessForm.value).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Negocio creado correctamente' });
          setTimeout(() => {
            this.router.navigate(['/business-list']);
          }, 1500);
        },
        (error) => {
          console.error('Error al crear el negocio:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el negocio' });
        }
      );
    }
  }
}
