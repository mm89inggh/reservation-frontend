import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business/business.service';

@Component({
  selector: 'app-business-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.css']
})
export class BusinessInfoComponent implements OnInit {
  negocio: any = {};

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.loadBusinessInfo();
  }

  loadBusinessInfo(): void {
    this.businessService.getBusinessInfo().subscribe(data => {
      this.negocio = data;
    });
  }

  guardarCambios(): void {
    this.businessService.updateBusinessInfo(this.negocio).subscribe(success => {
      if (success) {
        alert('Información actualizada correctamente');
      }
    });
  }
}
