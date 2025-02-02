import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      success => {
        if (success) {
          // Redirige al dashboard según el rol (en este ejemplo se asume dashboard para cualquier rol)
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Credenciales inválidas';
        }
      },
      error => {
        this.errorMessage = 'Error en el servidor. Intente más tarde.';
      }
    );
  }
}