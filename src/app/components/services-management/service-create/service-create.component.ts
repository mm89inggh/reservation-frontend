import { Component } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextModule, // Corregido
    ButtonModule,
    CardModule
  ],
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent {
  serviceForm: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      duracion: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      id_negocio: [null, [Validators.required, Validators.min(1)]]
    });
  }

  crearServicio(): void {
    if (this.serviceForm.valid) {
      this.serviceService.createService(this.serviceForm.value, this.serviceForm.value.id_negocio).subscribe(
        () => {
          alert('Servicio creado correctamente');
          this.router.navigate(['/service-list']);
        },
        (error) => {
          console.error('Error al crear el servicio:', error);
          alert('Error al crear el servicio');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/service-list']);
  }
}
