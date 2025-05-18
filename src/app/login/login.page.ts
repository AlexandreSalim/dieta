import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonIcon, IonNote } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AuthResponse, LoginRequest } from '../interfaces/login.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonNote, IonIcon, IonButton, IonInput, IonContent, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formulario = new FormGroup({
    email: new FormControl('',{nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  }); // Aplica o validador no FormGroup

  showError = false;
  errorMessage = '';
  isLoading = false;
  user: any;
  
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  
onLogin() {
  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }
  
  this.isLoading = true;
  const payload: LoginRequest = this.formulario.getRawValue();

  this.authenticationService.login(payload)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        // só aqui dentro, após o login ter sido aprovado,
        // chamamos getUser() e navegamos a partir dele
        this.authenticationService.getUser()
          .subscribe({
            next: user => {
              this.user = user;
              if (
                user.age    == null ||
                user.gender === 'Other' ||
                user.goal   == null ||
                user.height_cm == null ||
                user.weight_kg == null
              ) {
                this.router.navigate(['/escolha']);
              } else {
                this.router.navigate(['/home']);
              }
            },
            error: err => {
              console.error('Erro ao buscar usuário:', err);
              // opcional: tratamento ou fallback
            }
          });
      },
      error: err => {
        this.showError = true;
        this.errorMessage = err.status === 401
          ? err?.error?.message ?? 'Credenciais inválidas.'
          : err?.error?.message ?? 'Falha no login.';
        console.error('Erro de login:', err);
      }
    });
}


  cadastrar() {
    this.router.navigate(['/cadastro']);
  }
}
