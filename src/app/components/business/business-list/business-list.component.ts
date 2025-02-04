import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { BusinessService } from '../../../services/business/business.service';
import { Business } from '../../../models/business.model';
import { Router } from '@angular/router';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, 
    TableModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css'],
  providers: [MessageService, ConfirmationService, BusinessService]
})
export class BusinessListComponent implements OnInit {
  negocios: Business[] = [];

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAllBusinesses();
  }

  /**
   * Carga la lista de todos los negocios.
   */
  loadAllBusinesses(): void {
    this.businessService.getAllBusinesses().subscribe(
      (response) => {
        this.negocios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

  /**
   * Navega a la vista de información de un negocio.
   */
  verNegocio(id_negocio: number): void {
    this.router.navigate(['/business-info', id_negocio]);
  }

  /**
   * Confirma y elimina un negocio.
   */
  eliminarNegocio(id_negocio: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este negocio?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.businessService.deleteBusiness(id_negocio).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Negocio eliminado correctamente' });
            this.loadAllBusinesses();
          },
          (error) => {
            console.error('Error al eliminar el negocio:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el negocio' });
          }
        );
      }
    });
  }

  /**
   * Navega a la vista de creación de un nuevo negocio.
   */
  crearNegocio(): void {
    this.router.navigate(['/business-create']);
  }
}