import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    CardModule,
    HttpClientModule
  ],
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css'],
   providers: [BusinessService]
})
export class BusinessInfoComponent implements OnInit {
  businessForm: FormGroup;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.businessForm = this.fb.group({
      id_negocio: [0],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      coordenadas: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id_negocio = +params['id'];
      if (id_negocio) {
        this.loadBusinessInfo(id_negocio);
      }
    });
  }

  /**
   * Carga la información de un negocio por su ID.
   */
  loadBusinessInfo(id_negocio: number): void {
    this.businessService.getBusinessById(id_negocio).subscribe(
      (response) => {
        this.businessForm.patchValue(response);
      },
      (error) => {
        console.error('Error al obtener la información del negocio:', error);
      }
    );
  }

  /**
   * Guarda los cambios en la información del negocio.
   */
  guardarCambios(): void {
    if (this.businessForm.valid) {
      this.businessService.updateBusiness(
        this.businessForm.value.id_negocio,
        this.businessForm.value
      ).subscribe(
        () => {
          alert('Negocio actualizado correctamente');
          this.router.navigate(['/business-list']);
        },
        (error) => {
          console.error('Error al actualizar el negocio:', error);
          alert('Error al actualizar el negocio');
        }
      );
    }
  }

  /**
   * Cancela la edición y regresa a la lista de negocios.
   */
  cancelar(): void {
    this.router.navigate(['/business-list']);
  }
}
