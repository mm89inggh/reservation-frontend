import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/service/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BusinessService } from '../../../services/business/business.service';
import { Business } from '../../../models/business.model';

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
export class ServiceCreateComponent implements OnInit {
  serviceForm: FormGroup;
  negocios!: Business[];

  constructor(
    private serviceService: ServiceService,
    private businessService: BusinessService, // Inyectamos el servicio de negocios
    private router: Router,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      negocioId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.cargarNegocios();
  }

  cargarNegocios(): void {
    this.businessService.getAllBusinesses().subscribe(
      (negocios) => {
        this.negocios = negocios;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

  crearServicio(): void {
    if (this.serviceForm.valid) {
      this.serviceService.createService(this.serviceForm.value).subscribe(
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