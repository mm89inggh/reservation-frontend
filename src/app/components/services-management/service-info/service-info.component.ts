import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../../services/service/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-service-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.css']
})
export class ServiceInfoComponent implements OnInit {
  serviceForm: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.fb.group({
      id_servicio: [null],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      duracion: [null, [Validators.required, Validators.min(1)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      id_negocio: [{ value: null, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_servicio = +params['id'];
      if (id_servicio) {
        this.loadServiceInfo(id_servicio);
      }
    });
  }

  /**
   * Carga la información de un servicio por su ID.
   * @param id_servicio ID del servicio a cargar.
   */
  loadServiceInfo(id_servicio: number): void {
    this.serviceService.getServiceById(id_servicio).subscribe(
      (response) => {
        if (response) {
          this.serviceForm.patchValue(response);
        }
      },
      (error) => {
        console.error('Error al obtener la información del servicio:', error);
      }
    );
  }

  /**
   * Guarda los cambios en la información del servicio.
   */
  guardarCambios(): void {
    if (this.serviceForm.valid) {
      this.serviceService.updateService(this.serviceForm.value.id_servicio, this.serviceForm.getRawValue()).subscribe(
        () => {
          alert('Información del servicio actualizada correctamente');
          this.router.navigate(['/service-list']);
        },
        (error) => {
          console.error('Error al actualizar la información del servicio:', error);
          alert('Error al actualizar la información');
        }
      );
    }
  }

  cancelar(): void {
    this.router.navigate(['/service-list']);
  }
}
