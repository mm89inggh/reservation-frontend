import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { inject } from '@angular/core';
import { User } from '../../../models/User.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  register(): void {
    const newUser: User = {
      id_usuario: 0, // Se asigna un valor por defecto, puede ser 0 o generado en el backend
      nombre: this.nombre,
      correo: this.correo,
      id_rol: 2, // Por defecto, se asume que el rol es Cliente (ajústalo según tu lógica)
      password: this.password
    };

    this.authService.register(newUser).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'No se pudo registrar. Intente nuevamente.';
        }
      },
      error => {
        this.errorMessage = 'Error en el servidor.';
      }
    );
  }
}
